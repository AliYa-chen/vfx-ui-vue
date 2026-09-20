// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POINTER_REST, POINTER_STILL, usePointerUniforms, type PointerUniform, type PointerVelocity } from "../src/usePointerUniforms.ts";
import type { RefObject } from "../src/vueCompat";
import {
  createVueTestRoot,
  flushVueEffects,
  vnode,
  type VueTestRoot,
} from "./helpers";

/** Manual rAF queue: the hook only schedules frames while converging. */
let rafQueue: FrameRequestCallback[] = [];

async function flushFrames(max = 300): Promise<number> {
  let ran = 0;
  while (rafQueue.length && ran < max) {
    const cb = rafQueue.shift()!;
    cb(performance.now());
    ran += 1;
    await flushVueEffects();
  }
  return ran;
}

interface Probe {
  ref: RefObject<HTMLDivElement>;
  pointer: PointerUniform;
  active: boolean;
  velocity: PointerVelocity;
}

let latest: Probe;

function ProbeComponent() {
  const [ref, pointer, active, velocity] = usePointerUniforms<HTMLDivElement>();
  latest = { ref, pointer, active, velocity };
  return vnode("div", { ref });
}

const RECT = { left: 0, top: 0, width: 100, height: 100, right: 100, bottom: 100, x: 0, y: 0, toJSON: () => ({}) };

async function move(el: HTMLDivElement, x: number, y: number) {
  el.dispatchEvent(new MouseEvent("pointermove", { bubbles: true, clientX: x, clientY: y }));
  await flushVueEffects();
}

describe("usePointerUniforms", () => {
  let container: HTMLDivElement;
  let root: VueTestRoot;

  beforeEach(async () => {
    rafQueue = [];
    vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => {
      rafQueue.push(cb);
      return rafQueue.length;
    });
    vi.stubGlobal("cancelAnimationFrame", () => {});
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createVueTestRoot(container);
    await root.render(vnode(ProbeComponent));
    const el = latest.ref.current!;
    el.getBoundingClientRect = () => RECT as DOMRect;
  });

  afterEach(async () => {
    await root.unmount();
    container.remove();
    vi.unstubAllGlobals();
  });

  it("rests at POINTER_REST with no scheduled frames", async () => {
    expect(latest.pointer).toEqual(POINTER_REST);
    expect(latest.velocity).toEqual(POINTER_STILL);
    expect(latest.active).toBe(false);
    expect(await flushFrames()).toBe(0);
  });

  it("eases toward the pointer and stops once converged", async () => {
    const el = latest.ref.current!;
    await move(el, 25, 75);
    const frames = await flushFrames();
    expect(frames).toBeGreaterThan(10); // eased over many frames, not a snap
    expect(latest.pointer.x).toBeCloseTo(0.25, 3);
    expect(latest.pointer.y).toBeCloseTo(0.75, 3);
    expect(latest.active).toBe(true);
    expect(latest.velocity).toEqual(POINTER_STILL); // converged: sweep killed
    expect(rafQueue.length).toBe(0); // loop stopped after converging
  });

  it("reports the sweep direction while moving and decays it to still", async () => {
    const el = latest.ref.current!;
    await move(el, 75, 25);
    // Drain exactly one frame: the eased step is right/down at 0.08 ease.
    const cb = rafQueue.shift()!;
    cb(performance.now());
    await flushVueEffects();
    expect(latest.velocity.vx).toBeGreaterThan(0.01); // sweeping right
    expect(latest.velocity.vy).toBeLessThan(-0.01); // and up (y-down coords)
    // Later frames shrink the step; convergence zeroes it.
    await move(el, 95, 5);
    await flushFrames();
    expect(latest.velocity).toEqual(POINTER_STILL);
  });

  it("tracks successive moves through the same loop", async () => {
    const el = latest.ref.current!;
    await move(el, 90, 10);
    await flushFrames();
    expect(latest.pointer.x).toBeCloseTo(0.9, 3);
    await move(el, 10, 90);
    await flushFrames();
    expect(latest.pointer.x).toBeCloseTo(0.1, 3);
    expect(latest.pointer.y).toBeCloseTo(0.9, 3);
  });

  it("returns to rest and inactive on pointerleave", async () => {
    const el = latest.ref.current!;
    await move(el, 80, 20);
    await flushFrames();
    expect(latest.active).toBe(true);
    el.dispatchEvent(new MouseEvent("pointerleave"));
    await flushVueEffects();
    await flushFrames();
    expect(latest.pointer).toEqual(POINTER_REST);
    expect(latest.active).toBe(false);
    expect(rafQueue.length).toBe(0);
  });

  it("clamps coordinates at the element edges", async () => {
    const el = latest.ref.current!;
    await move(el, 250, -50);
    await flushFrames();
    expect(latest.pointer).toEqual({ x: 1, y: 0 });
  });
});
