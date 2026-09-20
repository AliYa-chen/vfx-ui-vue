// @vitest-environment jsdom
import { beforeEach, afterEach, expect, it, vi } from "vitest";
import { VfxCanvas } from "../src/VfxCanvas";
import {
  createVueTestRoot,
  flushVueEffects,
  vnode,
  type VueTestRoot,
} from "./helpers";
const mock = vi.hoisted(() => ({ create: vi.fn() }));
vi.mock("@vfx-ui-vue/core", () => ({ createVfxRenderer: mock.create }));
let root: VueTestRoot;
let host: HTMLDivElement;
let reduced = false;
let change: (() => void) | undefined;
let resolve: (renderer: any) => void;
const renderer = {
  setUniforms: vi.fn(),
  setAnimate: vi.fn(),
  dispose: vi.fn(),
  label: "test",
};
beforeEach(() => {
  vi.clearAllMocks();
  reduced = false;
  change = undefined;
  vi.stubGlobal("matchMedia", () => ({
    get matches() {
      return reduced;
    },
    addEventListener: (_: string, fn: () => void) => {
      change = fn;
    },
    removeEventListener() {},
  }));
  mock.create.mockImplementation(
    () =>
      new Promise((done) => {
        resolve = done;
      }),
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
it("applies the latest uniforms after asynchronous GPU initialization", async () => {
  await root.render(vnode(VfxCanvas, { shader: "test", uniforms: { px: 0.5 } }));
  await root.render(vnode(VfxCanvas, { shader: "test", uniforms: { px: 0.9 } }));
  resolve(renderer);
  await flushVueEffects();
  expect(mock.create).toHaveBeenCalledOnce();
  expect(renderer.setUniforms).toHaveBeenLastCalledWith({ px: 0.9 });
});
it("reacts to reduced-motion changes and does not let animate=true override them", async () => {
  await root.render(vnode(VfxCanvas, { shader: "test", animate: false }));
  resolve(renderer);
  await flushVueEffects();
  reduced = true;
  change?.();
  await flushVueEffects();
  await root.render(vnode(VfxCanvas, { shader: "test", animate: true }));
  expect(renderer.setAnimate).toHaveBeenLastCalledWith(false);
  reduced = false;
  change?.();
  await flushVueEffects();
  expect(renderer.setAnimate).toHaveBeenLastCalledWith(true);
});
it("disposes a renderer that arrives after its canvas unmounted", async () => {
  await root.render(vnode(VfxCanvas, { shader: "test" }));
  await root.render(null);
  expect(mock.create.mock.calls[0]![1].signal.aborted).toBe(true);
  resolve(renderer);
  await flushVueEffects();
  expect(renderer.dispose).toHaveBeenCalledOnce();
  expect(renderer.setUniforms).not.toHaveBeenCalled();
});
