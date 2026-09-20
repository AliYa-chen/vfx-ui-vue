import { describe, expect, it } from "vitest";
import { renderToString } from "@vue/server-renderer";
import {
  Aurora,
  BlackHole,
  ChromaFlow,
  FiberFlow,
  FluidGradient,
  GlassCard,
  GlassLens,
  HeroAurora,
  HeroBlackHole,
  HeroChroma,
  HeroFiber,
  HeroFluid,
  HeroGlobe,
  HeroIridescent,
  HeroMesh,
  HeroParticles,
  HeroRibbon,
  HeroStarfield,
  HeroVortex,
  Iridescent,
  LightPrism,
  LiquidGlass,
  MeshGradient,
  ParticleField,
  RibbonField,
  Starfield,
  Vortex,
  VfxCanvas,
  WaveBackground,
} from "../src/index.ts";
import { vnode } from "./helpers";

/** SSR contract: every component must render an inert canvas with zero server-side GPU access. */
describe("SSR safety", () => {
  it("renders every component server-side without touching GPU APIs", async () => {
    const tree = await renderToString(
      vnode("div", null, [
        vnode(WaveBackground),
        vnode(FluidGradient),
        vnode(Aurora),
        vnode(Starfield),
        vnode(ParticleField),
        vnode(GlassCard),
        vnode(GlassLens),
        vnode(LiquidGlass),
        vnode(BlackHole),
        vnode(MeshGradient),
        vnode(Iridescent),
        vnode(Vortex),
        vnode(RibbonField),
        vnode(FiberFlow),
        vnode(LightPrism),
        vnode(ChromaFlow),
        vnode(HeroFluid),
        vnode(HeroAurora),
        vnode(HeroFiber),
        vnode(HeroGlobe),
        vnode(HeroMesh),
        vnode(HeroIridescent),
        vnode(HeroVortex),
        vnode(HeroRibbon),
        vnode(HeroParticles),
        vnode(HeroStarfield),
        vnode(HeroBlackHole),
        vnode(HeroChroma),
        vnode(VfxCanvas, {
          shader: "/* empty */",
          fallback: vnode("span", null, "no webgpu"),
        }),
      ]),
    );
    const canvasCount = (tree.match(/<canvas/g) ?? []).length;
    // 16 base effects, 12 Heroes, and the bare VfxCanvas.
    expect(canvasCount).toBe(29);
    expect(tree).not.toContain("no webgpu");
    // Heroes must ship real selectable DOM text, not texture-rendered type.
    expect(tree).toContain("<h1");
    expect(tree).toContain("Your product, in one sentence.");
    expect(tree).toContain("aria-hidden");
  });

  it("keeps uniform props out of the server payload", async () => {
    const tree = await renderToString(vnode(WaveBackground, { from: "#123456" }));
    expect(tree).toContain("<canvas");
    expect(tree).not.toContain("#123456");
  });
});
