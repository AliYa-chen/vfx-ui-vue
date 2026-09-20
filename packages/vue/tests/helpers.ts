import { expect } from "vitest";
import {
  h,
  nextTick,
  render as renderVNode,
  type Component,
  type VNode,
  type VNodeChild,
} from "vue";
import { flushCompatEffects } from "../src/vueCompat";

/**
 * Flushes both Vue's scheduler and the hook-shaped compatibility effects used
 * by the components. A few passes also cover promises that resolve during an
 * effect (for example a mocked GPU initialization).
 */
export async function flushVueEffects(): Promise<void> {
  for (let pass = 0; pass < 3; pass += 1) {
    flushCompatEffects();
    await nextTick();
    await Promise.resolve();
  }
  flushCompatEffects();
  await nextTick();
}

/** Also yields once to module loading and other queued async initialization. */
export async function flushVueAsync(): Promise<void> {
  await flushVueEffects();
  await new Promise<void>((resolve) => setTimeout(resolve, 0));
  await flushVueEffects();
}

/** Minimal Vue renderer used by DOM lifecycle tests. */
export interface VueTestRoot {
  render(vnode: VNode | null): Promise<void>;
  unmount(): Promise<void>;
}

export function createVueTestRoot(container: Element): VueTestRoot {
  return {
    async render(vnode) {
      renderVNode(vnode, container);
      await flushVueEffects();
    },
    async unmount() {
      renderVNode(null, container);
      await flushVueEffects();
    },
  };
}

/** Typed shorthand that also keeps tests independent from JSX transforms. */
export function vnode(
  component: Component | string,
  props?: Record<string, unknown> | null,
  children?: VNodeChild,
): VNode {
  if (typeof component === "string") return h(component, props, children as never);
  return h(
    component,
    props,
    children === undefined ? undefined : { default: () => children },
  );
}

/** Offscreen target edge used by every component pixel test. */
export const SIZE = 16;

/**
 * Dawn test harness: boots vgpu/node once and returns a render function
 * that rasterizes a shader into a 16x16 rgba8unorm target and reads it back.
 */
export async function createRenderer(): Promise<
  (shader: string, uniforms: Record<string, number>) => Promise<Uint8Array>
> {
  const { init, effect, target, frame } = await import("vgpu/node");
  const gpu = await init();
  return async (shader, uniforms) => {
    const t = target(gpu, { size: [SIZE, SIZE], format: "rgba8unorm" });
    const fx = effect(gpu, shader, { set: uniforms });
    frame(gpu, (f) => f.pass({ target: t }, (p) => p.draw(fx)));
    return t.read();
  };
}

/** Mean of every byte in the RGBA readback. */
export function mean(rgba: Uint8Array): number {
  let sum = 0;
  for (const v of rgba) sum += v;
  return sum / rgba.length;
}

/** Number of pixels whose brightest channel exceeds the threshold. */
export function brightCount(rgba: Uint8Array, threshold: number): number {
  let count = 0;
  for (let i = 0; i < rgba.length; i += 4) {
    const r = rgba[i] ?? 0;
    const g = rgba[i + 1] ?? 0;
    const b = rgba[i + 2] ?? 0;
    if (Math.max(r, g, b) > threshold) count += 1;
  }
  return count;
}

/** Shared assertions: deterministic for identical uniforms, alive over time. */
export async function expectDeterministicAndAnimated(
  render: (shader: string, uniforms: Record<string, number>) => Promise<Uint8Array>,
  shader: string,
  uniformsAt: (time: number) => Record<string, number>,
): Promise<void> {
  const a = await render(shader, uniformsAt(0.37));
  const a2 = await render(shader, uniformsAt(0.37));
  const b = await render(shader, uniformsAt(2.1));

  expect(a.length).toBe(SIZE * SIZE * 4);
  expect(a[3]).toBe(255);
  expect([...a]).toEqual([...a2]);
  expect([...a]).not.toEqual([...b]);
}
