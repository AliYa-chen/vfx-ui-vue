// @vitest-environment jsdom
import { renderToString } from "@vue/server-renderer";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { FooterTidal } from "../src/components/FooterTidal";
import { FooterVinyl } from "../src/components/FooterVinyl";
import { FooterFold } from "../src/components/FooterFold";
import { FooterPhosphor } from "../src/components/FooterPhosphor";
import {
  createVueTestRoot,
  flushVueEffects,
  vnode,
  type VueTestRoot,
} from "./helpers";

let root: VueTestRoot, host: HTMLDivElement;
let frames: Map<number, FrameRequestCallback>, next: number;
let reduced = false;
let preference: () => void;
let visibility: (entries: { isIntersecting: boolean }[]) => void;
const disconnect = vi.fn();
const context = {
  clearRect: vi.fn(),
  fillRect: vi.fn(),
  beginPath: vi.fn(),
  moveTo: vi.fn(),
  lineTo: vi.fn(),
  stroke: vi.fn(),
  setTransform: vi.fn(),
  fillText: vi.fn(),
  measureText: () => ({ width: 400 }),
  getImageData: () => ({
    data: new Uint8ClampedArray(640 * 280 * 4).fill(255),
  }),
};
async function advance(times = 1) {
  for (let i = 0; i < times; i++) {
    const pending = [...frames.values()];
    frames.clear();
    pending.forEach((fn) => fn((i + 1) * 16));
    await flushVueEffects();
  }
}
async function move(el: Element, pointerType = "mouse") {
  const event = new MouseEvent("pointermove", {
    bubbles: true,
    clientX: 500,
    clientY: 180,
  });
  Object.defineProperty(event, "pointerType", { value: pointerType });
  el.dispatchEvent(event);
  await flushVueEffects();
}
beforeEach(() => {
  vi.clearAllMocks();
  frames = new Map();
  next = 0;
  reduced = false;
  vi.stubGlobal("requestAnimationFrame", (fn: FrameRequestCallback) => {
    frames.set(++next, fn);
    return next;
  });
  vi.stubGlobal("cancelAnimationFrame", (id: number) => frames.delete(id));
  vi.stubGlobal("matchMedia", () => ({
    get matches() {
      return reduced;
    },
    addEventListener: (_: string, fn: () => void) => {
      preference = fn;
    },
    removeEventListener() {},
  }));
  vi.stubGlobal(
    "ResizeObserver",
    class {
      observe() {}
      disconnect = disconnect;
    },
  );
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(fn: typeof visibility) {
        visibility = fn;
      }
      observe() {}
      disconnect = disconnect;
    },
  );
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(
    context as never,
  );
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
    x: 0,
    y: 0,
    left: 0,
    top: 0,
    width: 640,
    height: 280,
    right: 640,
    bottom: 280,
    toJSON() {},
  });
  host = document.createElement("div");
  document.body.append(host);
  root = createVueTestRoot(host);
});
afterEach(async () => {
  await root.unmount();
  host.remove();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("complete footer contracts", () => {
  it.each([FooterTidal, FooterFold, FooterPhosphor, FooterVinyl])(
    "renders real consumer content and destinations on the server",
    async (Component) => {
      const html = await renderToString(
        vnode(Component, {
          brand: "ACME",
          title: "Your next chapter",
          cta: { label: "Contact", href: "mailto:hello@acme.test" },
          groups: [
            { label: "Product", links: [{ label: "Docs", href: "/docs" }] },
          ],
          copyright: "© ACME",
          legal: [{ label: "Privacy", href: "/privacy" }],
        }),
      );
      expect(html).toContain("<footer");
      expect(html).toContain('aria-label="ACME footer"');
      expect(html).toContain('href="/docs"');
      expect(html).toContain('href="mailto:hello@acme.test"');
      expect(html).toContain('href="/privacy"');
      expect(html).not.toContain('href="#"');
      expect(html).toContain("Your next chapter");
    },
  );
  it("lets custom children replace copy/navigation while retaining the artwork and legal row", async () => {
    await root.render(
      vnode(FooterFold, {
        brand: "ACME",
        title: "Discard",
        copyright: "© ACME",
      }, vnode("a", { href: "/custom" }, "Custom layout")),
    );
    expect(host.textContent).not.toContain("Discard");
    expect(host.querySelector('a[href="/custom"]')).not.toBeNull();
    expect(host.querySelector(".vfx-fold-art")).not.toBeNull();
    expect(host.querySelector(".vfx-footer-legal")?.textContent).toContain(
      "© ACME",
    );
  });
  it("fold motion settles, resets on leave, and changes depth without pointer movement", async () => {
    await root.render(vnode(FooterFold, { depth: 20 }));
    const footer = host.querySelector("footer")!;
    const panel = host.querySelector(".vfx-fold-panel") as HTMLElement;
    const resting = panel.style.getPropertyValue("--fold-turn");
    await move(footer);
    await advance(140);
    expect(frames.size).toBe(0);
    expect(panel.style.getPropertyValue("--fold-turn")).not.toBe(resting);
    footer.dispatchEvent(new Event("pointerleave"));
    await flushVueEffects();
    await advance(140);
    expect(panel.style.getPropertyValue("--fold-turn")).toBe(resting);
    await root.render(vnode(FooterFold, { depth: 45 }));
    expect(footer.style.getPropertyValue("--vf-depth")).toBe("45");
  });
  it("stops the flowing tide offscreen and resumes when visible", async () => {
    await root.render(vnode(FooterTidal));
    await advance();
    expect(frames.size).toBe(1);
    visibility([{ isIntersecting: false }]);
    await flushVueEffects();
    expect(frames.size).toBe(0);
    visibility([{ isIntersecting: true }]);
    await flushVueEffects();
    expect(frames.size).toBe(1);
    await root.render(null);
    expect(frames.size).toBe(0);
    expect(disconnect).toHaveBeenCalledTimes(2);
  });
  it("responds immediately to system reduced-motion changes", async () => {
    await root.render(vnode(FooterTidal));
    await advance();
    reduced = true;
    preference();
    await flushVueEffects();
    expect(frames.size).toBe(0);
    await move(host.querySelector("footer")!);
    expect(frames.size).toBe(0);
    reduced = false;
    preference();
    await flushVueEffects();
    expect(frames.size).toBe(1);
  });
  it("preserves a still composition for touch and interactive=false", async () => {
    await root.render(vnode(FooterTidal, { animate: false }));
    await advance();
    await move(host.querySelector("footer")!, "touch");
    expect(frames.size).toBe(0);
    await root.render(vnode(FooterTidal, { animate: false, interactive: false }));
    await advance();
    await move(host.querySelector("footer")!);
    expect(frames.size).toBe(0);
  });
  it("updates the point cloud when the brand changes, then sleeps after dispersal", async () => {
    await root.render(vnode(FooterPhosphor, { brand: "FIRST" }));
    await advance();
    expect(frames.size).toBe(0);
    expect(context.fillText).toHaveBeenLastCalledWith(
      "FIRST",
      expect.any(Number),
      142.8,
    );
    await root.render(vnode(FooterPhosphor, { brand: "NEXT" }));
    await advance();
    expect(context.fillText).toHaveBeenLastCalledWith(
      "NEXT",
      expect.any(Number),
      142.8,
    );
    await move(host.querySelector("footer")!);
    await advance(140);
    expect(frames.size).toBe(0);
    expect(context.fillRect).toHaveBeenCalled();
  });
  it("keeps the DOM footer usable when no canvas context is available", async () => {
    vi.mocked(HTMLCanvasElement.prototype.getContext).mockReturnValue(null);
    await root.render(
      vnode(FooterPhosphor, {
        brand: "STILL",
        cta: { label: "Contact", href: "/contact" },
      }),
    );
    expect(host.querySelector("a")?.getAttribute("href")).toBe("/contact");
    expect(host.querySelector(".vfx-phosphor-fallback")?.textContent).toBe(
      "STILL",
    );
    expect(frames.size).toBe(0);
  });
});
