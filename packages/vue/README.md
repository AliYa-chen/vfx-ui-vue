# vfx-ui-vue

Expressive Vue 3 components: GPU atmospheres via [vgpu](https://github.com/vercel-labs/vgpu), customizable Hero and Footer sections, and focused DOM/CSS interactions.

## Install

```bash
npm install vfx-ui-vue
```

Requires Vue >= 3.5. GPU effects need WebGPU and accept a `fallback`; the Footers, `Magnetic`, `SpectralCard`, and `KineticText` work without it.

## Usage

```vue
<script setup lang="ts">
import { HeroFluid } from "vfx-ui-vue";
</script>

<template>
  <section style="height: 680px">
    <HeroFluid title="Your next big idea." interactive
      :primary-cta="{ label: 'Get started', href: '/start' }"
      :secondary-cta="null" />
  </section>
</template>
```

## Components

Effects: `AstraField` · `RadiantDots` · `WaveBackground` · `FluidGradient` · `Aurora` · `Starfield` · `ParticleField` · `GlassCard` · `LiquidGlass` · `GlassLens` · `BlackHole` · `MeshGradient` · `Iridescent` · `Vortex` · `RibbonField` · `FiberFlow` · `LightPrism` · `ChromaFlow`

Drop-in hero sections: `HeroEclipse` · `HeroContour` · `HeroFluid` · `HeroAurora` · `HeroFiber` · `HeroGlobe` · `HeroMesh` · `HeroIridescent` · `HeroVortex` · `HeroRibbon` · `HeroParticles` · `HeroStarfield` · `HeroBlackHole` · `HeroChroma`

Live previews, props, and variants for every component: [vfx.2t.hk/components](https://vfx.2t.hk/components). Machine-readable docs: [llms.txt](https://vfx.2t.hk/llms.txt).

Prefer copy-paste over an npm dependency? Use [the registry](https://vfx.2t.hk/r) via `npx vfx-ui-vue-cli add <name>`.

## License

MIT — © vfx-ui-vue contributors. Renderer core: [vercel-labs/vgpu](https://github.com/vercel-labs/vgpu) (MIT).

## Content and interaction

Hero defaults are examples, not required copy. `title` and `subtitle` accept Vue VNodes. CTA objects accept a real `href` or a button `onClick`; `null` hides an action. The default slot replaces the entire content stack. Vue `class` and `style` attributes apply to the section.

`Magnetic` and `SpectralCard` accept your own default-slot content; `KineticText` accepts `text`. Pointer motion is smoothed without per-frame component renders, stops at rest, and respects reduced motion and touch. `GlassCard` also accepts DOM content above its decorative shader; it does not refract arbitrary DOM behind it.

```vue
<script setup lang="ts">
import { SpectralCard, Magnetic, KineticText } from "vfx-ui-vue";
</script>

<template>
  <SpectralCard>
    <div style="padding: 40px">
      <h2><KineticText text="Stay curious." /></h2>
      <Magnetic><a href="/explore">Explore</a></Magnetic>
    </div>
  </SpectralCard>
</template>
```

## Footer sections

`FooterVinyl`, `FooterTidal`, `FooterFold`, and `FooterPhosphor` accept `brand`, `title`, `description`, `cta: { label, href }`, `groups: [{ label, links: [{ label, href }] }]`, `legal`, and `copyright`. The default slot replaces the intro and navigation; the artwork remains. Brand text is generated into the artwork, not baked into an image. `interactive` defaults to true and respects reduced motion and touch. The canvas-based effects sleep offscreen. `FooterTidal` also accepts `animate`; `FooterFold` accepts `depth` (0–55 degrees). All accept `color`, `background`, Vue `class`, and `style`.

The current source removes `LiveChart`, `WebGlobe`, and `EnergyOrb`. Keep an earlier published version if you still rely on those exports; `HeroGlobe` is unaffected.


The Glass components render original optical solids over procedural scenes. `RadiantDots` implements a multi-pass light field adapted from the MIT-licensed Vercel VGPU example. It accepts `layout`, `motion`, `color`, `intensity`, `speed`, `animate`, and `interactive`; it does not include status text or imply a real loading state.
