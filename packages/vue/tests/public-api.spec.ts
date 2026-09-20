import { renderToString } from "@vue/server-renderer";
import { describe, expect, it } from "vitest";
import * as library from "../src/index.ts";
import { vnode } from "./helpers";

const PUBLIC_COMPONENTS = [
  "VfxCanvas",
  "WaveBackground", "FluidGradient", "Aurora", "Starfield", "ParticleField",
  "GlassCard", "LiquidGlass", "GlassLens", "BlackHole", "MeshGradient",
  "Iridescent", "Vortex", "RibbonField", "FiberFlow", "ChromaFlow",
  "LightPrism", "RadiantDots", "AstraField", "Magnetic", "SpectralCard",
  "KineticText", "HeroShell", "HeroFluid", "HeroAurora", "HeroFiber",
  "HeroGlobe", "HeroMesh", "HeroIridescent", "HeroVortex", "HeroRibbon",
  "HeroParticles", "HeroStarfield", "HeroBlackHole", "HeroChroma",
  "HeroEclipse", "HeroContour", "FooterTidal", "FooterFold",
  "FooterPhosphor", "FooterVinyl",
] as const;

describe("Vue public API", () => {
  it("exposes every component as a Vue-renderable export", async () => {
    for (const name of PUBLIC_COMPONENTS) {
      const component = library[name];
      expect(component, `${name} export`).toBeTypeOf("function");
      const required = name === "VfxCanvas"
        ? { shader: "/* empty */" }
        : name === "HeroShell"
          ? { background: vnode("span") }
          : undefined;
      await expect(renderToString(vnode(component, required))).resolves.toBeTypeOf("string");
    }
  });

  it("accepts Vue default slots on every public component", async () => {
    for (const name of PUBLIC_COMPONENTS) {
      const component = library[name];
      const marker = `slot-${name}`;
      const required = name === "VfxCanvas"
        ? { shader: "/* empty */" }
        : name === "HeroShell"
          ? { background: vnode("span") }
          : undefined;
      const html = await renderToString(vnode(component, required, vnode("i", null, marker)));
      expect(html, `${name} default slot`).toContain(marker);
    }
  });
});
