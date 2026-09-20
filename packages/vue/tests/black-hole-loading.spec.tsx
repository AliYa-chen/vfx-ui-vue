// @vitest-environment jsdom
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { BlackHole } from "../src/components/BlackHole";
import { createVueTestRoot, vnode, type VueTestRoot } from "./helpers";

vi.mock("vgpu", () => ({
  init: () => new Promise(() => {}),
}));

let host: HTMLDivElement;
let root: VueTestRoot;

beforeEach(() => {
  vi.stubGlobal("matchMedia", () => ({ matches: false, addEventListener() {}, removeEventListener() {} }));
  host = document.createElement("div");
  document.body.append(host);
  root = createVueTestRoot(host);
});

afterEach(async () => {
  await root.unmount();
  host.remove();
  vi.unstubAllGlobals();
});

it("shows the fallback poster while the GPU pipeline initializes", async () => {
  await root.render(vnode(BlackHole, {
    fallback: vnode("img", { src: "/poster.png", alt: "" }),
  }));

  expect(host.querySelector('img[src="/poster.png"]')).not.toBeNull();
  expect((host.querySelector("canvas") as HTMLCanvasElement).style.opacity).toBe("0");
});
