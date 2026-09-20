// @vitest-environment jsdom
import { beforeEach, afterEach, expect, it, vi } from "vitest";
import { RadiantDots } from "../src/components/RadiantDots";
import {
  createVueTestRoot,
  flushVueAsync,
  flushVueEffects,
  vnode,
  type VueTestRoot,
} from "./helpers";
const mock = vi.hoisted(() => ({
  init: vi.fn(),
  dispose: vi.fn(),
  create: vi.fn(),
  destroy: vi.fn(),
  render: vi.fn(),
  present: vi.fn(),
}));
vi.mock("vgpu", () => ({
  init: mock.init,
  surface: () => ({ format: "rgba8unorm" }),
}));
vi.mock("../src/components/RadianceEngine", () => ({
  scaledSize: () => [320, 200],
  createScene: mock.create,
  destroyScene: mock.destroy,
  prepareScene: async () => {},
  renderLighting: mock.render,
  presentScene: mock.present,
}));
let root: VueTestRoot;
let host: HTMLDivElement;
let frames: Map<number, FrameRequestCallback>;
let next = 0;
let reduced = false;
let changes: Set<() => void>;
let intersect: (entries: { isIntersecting: boolean }[]) => void;
async function step(time = 40) {
  const callbacks = [...frames.values()];
  frames.clear();
  callbacks.forEach((fn) => fn(time));
  await flushVueEffects();
}
beforeEach(() => {
  vi.clearAllMocks();
  next = 0;
  reduced = false;
  frames = new Map();
  changes = new Set();
  mock.init.mockResolvedValue({ dispose: mock.dispose });
  mock.create.mockReturnValue({ size: [320, 200] });
  vi.stubGlobal("requestAnimationFrame", (fn: FrameRequestCallback) => {
    frames.set(++next, fn);
    return next;
  });
  vi.stubGlobal("cancelAnimationFrame", (id: number) => frames.delete(id));
  vi.stubGlobal("matchMedia", () => ({
    get matches() {
      return reduced;
    },
    addEventListener: (_: string, fn: () => void) => changes.add(fn),
    removeEventListener: (_: string, fn: () => void) => changes.delete(fn),
  }));
  vi.stubGlobal(
    "ResizeObserver",
    class {
      observe() {}
      disconnect() {}
    },
  );
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(fn: typeof intersect) {
        intersect = fn;
      }
      observe() {}
      disconnect() {}
    },
  );
  host = document.createElement("div");
  document.body.append(host);
  root = createVueTestRoot(host);
});
afterEach(async () => {
  await root.unmount();
  host.remove();
  vi.unstubAllGlobals();
});
it("suspends offscreen and under reduced motion, resumes, then releases GPU resources", async () => {
  await root.render(vnode(RadiantDots));
  await flushVueAsync();
  await step();
  expect(mock.render).toHaveBeenCalledOnce();
  expect(frames.size).toBe(1);
  intersect([{ isIntersecting: false }]);
  await flushVueEffects();
  expect(frames.size).toBe(0);
  intersect([{ isIntersecting: true }]);
  await flushVueEffects();
  await step(100);
  expect(frames.size).toBe(1);
  reduced = true;
  changes.forEach((fn) => fn());
  await flushVueEffects();
  await step(140);
  expect(frames.size).toBe(0);
  reduced = false;
  changes.forEach((fn) => fn());
  await flushVueEffects();
  await step(180);
  expect(frames.size).toBe(1);
  await root.render(null);
  expect(frames.size).toBe(0);
  expect(mock.destroy).toHaveBeenCalledOnce();
  expect(mock.dispose).toHaveBeenCalledOnce();
});
it("updates a paused composition without starting an animation loop", async () => {
  await root.render(vnode(RadiantDots, { animate: false }));
  await flushVueAsync();
  await step();
  expect(frames.size).toBe(0);
  await root.render(
    vnode(RadiantDots, { animate: false, layout: "grid", color: "#ff0000" }),
  );
  await step(100);
  expect(mock.render.mock.lastCall?.[4]).toMatchObject({
    layout: 1,
    color: [1, 0, 0],
  });
  expect(frames.size).toBe(0);
});
it("disposes a device that arrives after unmount without allocating the field", async () => {
  let finish: (value: unknown) => void = () => {};
  mock.init.mockImplementation(
    () =>
      new Promise((resolve) => {
        finish = resolve;
      }),
  );
  await root.render(vnode(RadiantDots));
  await root.render(null);
  finish({ dispose: mock.dispose });
  await flushVueEffects();
  expect(mock.create).not.toHaveBeenCalled();
  expect(mock.dispose).toHaveBeenCalledOnce();
  expect(frames.size).toBe(0);
});
it("shows the supplied fallback when GPU initialization fails", async () => {
  const error = vi.spyOn(console, "error").mockImplementation(() => {});
  mock.init.mockRejectedValue(new Error("WebGPU unavailable"));
  await root.render(
    vnode(RadiantDots, { fallback: vnode("span", null, "Static artwork") }),
  );
  await flushVueAsync();
  expect(host.textContent).toBe("Static artwork");
  expect(frames.size).toBe(0);
  error.mockRestore();
});
