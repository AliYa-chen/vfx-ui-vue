// @vitest-environment jsdom
import { renderToString } from "@vue/server-renderer";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { HeroEclipse } from "../src/components/HeroEclipse";
import { HeroContour } from "../src/components/HeroContour";
import { FooterVinyl } from "../src/components/FooterVinyl";
import { HeroAurora } from "../src/components/HeroAurora";
import { Magnetic } from "../src/components/Magnetic";
import { SpectralCard } from "../src/components/SpectralCard";
import { KineticText } from "../src/components/KineticText";
import {
  createVueTestRoot,
  flushVueEffects,
  vnode,
  type VueTestRoot,
} from "./helpers";

const capture = vi.hoisted(() => ({ uniforms: {} as Record<string, number> }));
vi.mock("../src/VfxCanvas.tsx", () => ({
  VfxCanvas: ({ uniforms }: { uniforms: Record<string, number> }) => {
    capture.uniforms = uniforms;
    return vnode("canvas");
  },
}));
let container: HTMLDivElement;
let root: VueTestRoot;
let frames: Map<number, FrameRequestCallback>;
let frameId = 0;
let reduced = false;
async function settle() {
  let count = 0;
  while (frames.size && count < 220) {
    const callbacks = [...frames.values()];
    frames.clear();
    callbacks.forEach((fn) => fn(++count * 16));
    await flushVueEffects();
  }
  expect(frames.size).toBe(0);
}
function bounds(el: Element) {
  el.getBoundingClientRect = () => ({
    x: 0,
    y: 0,
    left: 0,
    top: 0,
    width: 200,
    height: 100,
    right: 200,
    bottom: 100,
    toJSON() {},
  });
}
async function move(el: Element) {
  el.dispatchEvent(
    new MouseEvent("pointermove", {
      bubbles: true,
      clientX: 180,
      clientY: 80,
    }),
  );
  await flushVueEffects();
}
beforeEach(() => {
  reduced = false;
  frames = new Map();
  frameId = 0;
  vi.stubGlobal("requestAnimationFrame", (fn: FrameRequestCallback) => {
    frames.set(++frameId, fn);
    return frameId;
  });
  vi.stubGlobal("cancelAnimationFrame", (id: number) => frames.delete(id));
  vi.stubGlobal("matchMedia", () => ({
    get matches() {
      return reduced;
    },
    addEventListener() {},
    removeEventListener() {},
  }));
  container = document.createElement("div");
  document.body.append(container);
  root = createVueTestRoot(container);
});
afterEach(async () => {
  await root.unmount();
  container.remove();
  vi.unstubAllGlobals();
});

describe("consumer interaction contracts", () => {
  it("delivers pointer movement over Hero text to the decorative background", async () => {
    await root.render(vnode(HeroAurora, { interactive: true, title: "My headline" }));
    bounds(container.querySelector("section")!);
    await move(container.querySelector("h1")!);
    await settle();
    expect(capture.uniforms.px).toBeCloseTo(0.9);
    expect(capture.uniforms.py).toBeCloseTo(0.8);
  });
  it("leaves a disabled Hero background at rest", async () => {
    await root.render(vnode(HeroAurora, { interactive: false }));
    bounds(container.querySelector("section")!);
    await move(container.querySelector("h1")!);
    expect(frames.size).toBe(0);
    expect(capture.uniforms.px).toBe(0.5);
  });
  it("preserves real CTA destinations and button behavior", async () => {
    const click = vi.fn();
    await root.render(
      vnode(HeroAurora, {
        primaryCta: { label: "Start", href: "/start" },
        secondaryCta: { label: "Open", onClick: click },
      }),
    );
    expect(container.querySelector("a")?.getAttribute("href")).toBe("/start");
    container.querySelector("button")!.click();
    await flushVueEffects();
    expect(click).toHaveBeenCalledOnce();
    expect(container.querySelector('a[href="#"]')).toBeNull();
  });
  it("lets consumers replace the content and remove default CTAs", async () => {
    await root.render(
      vnode(HeroAurora, {
        primaryCta: null,
        secondaryCta: null,
      }, vnode("h2", null, "Custom composition")),
    );
    expect(container.querySelector("h2")?.textContent).toBe(
      "Custom composition",
    );
    expect(container.querySelector("h1, a, button")).toBeNull();
  });
  it("magnetic content moves, settles, and releases all animation frames", async () => {
    await root.render(
      vnode(Magnetic, {
        strength: 20,
      }, vnode("a", { href: "/go" }, "Go")),
    );
    const outer = container.firstElementChild!;
    bounds(outer);
    await move(outer);
    await settle();
    const inner = outer.firstElementChild as HTMLElement;
    expect(inner.style.transform).toContain("16");
    outer.dispatchEvent(new Event("pointerleave"));
    await flushVueEffects();
    await settle();
    expect(inner.style.transform).toBe("translate3d(0px,0px,0)");
    expect(container.querySelector("a")?.getAttribute("href")).toBe("/go");
  });
  it("does not animate interaction components with reduced motion", async () => {
    reduced = true;
    await root.render(
      vnode(SpectralCard, null, vnode("button", null, "Content")),
    );
    const outer = container.firstElementChild!;
    bounds(outer);
    await move(outer);
    expect(frames.size).toBe(0);
    expect(container.querySelector("button")?.textContent).toBe("Content");
  });
  it("cancels pending motion on unmount", async () => {
    await root.render(vnode(Magnetic));
    const outer = container.firstElementChild!;
    bounds(outer);
    await move(outer);
    expect(frames.size).toBeGreaterThan(0);
    await root.render(null);
    expect(frames.size).toBe(0);
  });
  it("renders the new components on the server with one accessible text label", async () => {
    const html = await renderToString(
      vnode("div", null, [
        vnode(KineticText, { text: "Hello world" }),
        vnode(SpectralCard, null, vnode("h2", null, "Your content")),
        vnode(Magnetic, null, vnode("a", { href: "/start" }, "Start")),
      ]),
    );
    expect(html).toContain('aria-label="Hello world"');
    expect(html).toContain("Your content");
    expect(html).not.toContain("<canvas");
  });
});


describe("new editorial component contracts", () => {
  it.each([
    [HeroEclipse, "section", "--eclipse-x"],
    [HeroContour, "section", "--contour-x"],
    [FooterVinyl, "footer", "--vinyl-turn"],
  ] as const)("settles pointer motion, resets, and cleans up frames", async (Component, tag, property) => {
    await root.render(vnode(Component, { interactive: true }));
    const element = container.querySelector(tag)!;
    bounds(element);
    const rest = element.style.getPropertyValue(property);
    await move(element);
    await settle();
    expect(element.style.getPropertyValue(property)).not.toBe(rest);
    element.dispatchEvent(new Event("pointerleave"));
    await flushVueEffects();
    await settle();
    expect(element.style.getPropertyValue(property)).toBe(rest);
    await move(element);
    await root.render(null);
    expect(frames.size).toBe(0);
  });
  it.each([HeroEclipse, HeroContour, FooterVinyl])("honors reduced motion and disabled interaction", async (Component) => {
    reduced = true;
    await root.render(vnode(Component, { interactive: true }));
    const element = container.querySelector("section,footer")!;
    bounds(element);
    await move(element);
    expect(frames.size).toBe(0);
    reduced = false;
    await root.render(vnode(Component, { interactive: false }));
    await move(element);
    expect(frames.size).toBe(0);
  });
  it.each([HeroEclipse, HeroContour])("keeps user actions and custom content functional", async (Component) => {
    const onClick = vi.fn();
    await root.render(vnode(Component, {
      title: "Our own headline",
      primaryCta: { label: "Explore", href: "/work" },
      secondaryCta: { label: "Open", onClick },
    }));
    expect(container.querySelector("h1")?.textContent).toBe("Our own headline");
    expect(container.querySelector("a")?.getAttribute("href")).toBe("/work");
    container.querySelector("button")!.click();
    await flushVueEffects();
    expect(onClick).toHaveBeenCalledOnce();
    await root.render(vnode(Component, null, vnode("h2", null, "Custom content")));
    expect(container.querySelector("h1")).toBeNull();
    expect(container.querySelector("h2")?.textContent).toBe("Custom content");
  });
  it("produces stable seeded terrain for SSR and changes the landscape with the seed", async () => {
    const first = await renderToString(vnode(HeroContour, { seed: 17 }));
    expect(first).toBe(await renderToString(vnode(HeroContour, { seed: 17 })));
    expect(first).not.toBe(await renderToString(vnode(HeroContour, { seed: 29 })));
    expect(
      await renderToString(vnode(HeroContour, { seed: NaN, relief: Infinity })),
    ).not.toMatch(/NaN|Infinity/);
  });
});
