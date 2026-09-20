# vfx-ui-vue — agent guide

# vfx-ui-vue

> Shader-native visual effect components for Vue 3, rendered via WebGPU (vgpu).
> Expressive hero and footer sections, GPU backgrounds, and focused DOM interactions for your own content.

## Install

```bash
npm install vfx-ui-vue
```

## Component catalog

- [Hero Eclipse](https://vfx.2t.hk/components/hero-eclipse.md): An engraved astronomical dial with a pointer-controlled eclipse.
- [Hero Contour](https://vfx.2t.hk/components/hero-contour.md): A seeded topographic paper landscape that lifts around the pointer.
- [Footer Vinyl](https://vfx.2t.hk/components/footer-vinyl.md): A record-sleeve footer with a pointer-rotated vinyl and your own label.
- [Astra Field](https://vfx.2t.hk/components/astra-field.md): A rotatable spiral galaxy of glowing stars.
- [Radiant Dots](https://vfx.2t.hk/components/radiant-dots.md): Orbital emitters with jump-flooded distance fields and radiance cascades.
- [Footer Tidal](https://vfx.2t.hk/components/footer-tidal.md): Copper tidal lines beneath your brand, with pointer-driven currents.
- [Footer Fold](https://vfx.2t.hk/components/footer-fold.md): A wordmark printed across hinged paper panels that respond to the pointer.
- [Footer Phosphor](https://vfx.2t.hk/components/footer-phosphor.md): A luminous cell wordmark that disperses around your pointer and settles home.
- [Spectral Card](https://vfx.2t.hk/components/spectral-card.md): Holographic light and spatial tilt around your own content.
- [Kinetic Text](https://vfx.2t.hk/components/kinetic-text.md): A pointer-driven force field lifts your words into a soft wave.
- [Magnetic](https://vfx.2t.hk/components/magnetic.md): A gentle magnetic pull for your own buttons, links, and content.
- [Wave Background](https://vfx.2t.hk/components/wave-background.md): Three layered sine bands sweeping over a tri-color gradient. GPU-rendered via WebGPU; DOM cannot reproduce it.
- [Fluid Gradient](https://vfx.2t.hk/components/fluid-gradient.md): Domain-warped fBm noise flowing through a tri-color palette.
- [Aurora](https://vfx.2t.hk/components/aurora.md): Vertical light curtains driven by fBm perturbation and gaussian bands.
- [Starfield](https://vfx.2t.hk/components/starfield.md): Hashed star grid with twinkle and slow parallax drift.
- [Particle Field](https://vfx.2t.hk/components/particle-field.md): Procedural cell-hashed particles with drift and size breathing.
- [Glass Card](https://vfx.2t.hk/components/glass-card.md): Thick-cut optical glass with two-interface refraction and studio reflections.
- [Liquid Glass](https://vfx.2t.hk/components/liquid-glass.md): A molten glass annulus with a travelling silhouette and spectral transmission.
- [Glass Lens](https://vfx.2t.hk/components/glass-lens.md): A biconvex glass lens that magnifies and inverts a printed studio scene.
- [Black Hole](https://vfx.2t.hk/components/black-hole.md): The vgpu optimized-black-hole pipeline as a component: baked null-geodesic G-buffer, HDR bloom, prefiltered lensed star field, Doppler beaming — a verbatim port (MIT, Vercel).
- [Mesh Gradient](https://vfx.2t.hk/components/mesh-gradient.md): Voronoi-cell color fields flowing through a curated palette.
- [Iridescent](https://vfx.2t.hk/components/iridescent.md): Silky thin-film interference colors drifting across the surface.
- [Vortex](https://vfx.2t.hk/components/vortex.md): Spiral galaxy swirl with star speckles and trailing arms.
- [Ribbon Field](https://vfx.2t.hk/components/ribbon-field.md): Three Gaussian light ribbons over a dot-matrix grid with bloom and grain — WGSL port of ThreeUI's RibbonField (MIT, Copyright 2026 Meng To).
- [Fiber Flow](https://vfx.2t.hk/components/fiber-flow.md): Luminous silk fibers streaming through the dark — domain-warped fbm ridge field with pointer parallax (opt-in).
- [Light Prism](https://vfx.2t.hk/components/light-prism.md): A solid beveled optical prism using Vercel’s complete MIT spectral optics and multi-pass glass pipeline.
- [Hero Fluid](https://vfx.2t.hk/components/hero-fluid.md): Drop-in hero section: centered headline over a GPU liquid-gradient field with real selectable DOM text, scrim-backed contrast, and a reduced-motion static fallback.
- [Hero Aurora](https://vfx.2t.hk/components/hero-aurora.md): Drop-in hero section: bottom-left copy anchored under full-bleed aurora curtains rendered per-pixel on the GPU.
- [Hero Fiber](https://vfx.2t.hk/components/hero-fiber.md): Drop-in hero section: top-weighted headline over luminous silk fibers streaming through the dark.
- [Hero Globe](https://vfx.2t.hk/components/hero-globe.md): Drop-in split hero: copy on the left, the dot-matrix cobe planet (the globe behind vercel.com) glowing on the right.
- [Hero Mesh](https://vfx.2t.hk/components/hero-mesh.md): Drop-in hero section: centered headline over a slow Voronoi mesh-gradient field — every frame a different poster.
- [Hero Iridescent](https://vfx.2t.hk/components/hero-iridescent.md): Drop-in hero section: left copy over a holographic thin-film sheen — the premium product-launch look, computed per-pixel.
- [Hero Vortex](https://vfx.2t.hk/components/hero-vortex.md): Drop-in hero section: centered headline at the eye of a spiral galaxy with star speckles and trailing arms.
- [Hero Ribbon](https://vfx.2t.hk/components/hero-ribbon.md): Drop-in split hero: copy left, three Gaussian light ribbons sweeping the right over a dot-matrix grid.
- [Hero Particles](https://vfx.2t.hk/components/hero-particles.md): Drop-in hero section: top-weighted headline with a badge row over a drifting GPU particle field.
- [Hero Starfield](https://vfx.2t.hk/components/hero-starfield.md): Drop-in hero section: bottom-left copy under a twinkling hashed star grid with parallax drift.
- [Hero Black Hole](https://vfx.2t.hk/components/hero-black-hole.md): Drop-in hero section: left copy beside a ray-traced accretion disk with relativistic beaming and a lensed star field.
- [Chroma Flow](https://vfx.2t.hk/components/chroma-flow.md): Four-edge liquid color field that floods inward toward the direction the cursor sweeps — fbm-noise bleed boundaries driven by pointer velocity.
- [Hero Chroma](https://vfx.2t.hk/components/hero-chroma.md): Drop-in hero section: bottom-left copy over a four-edge liquid color field that floods toward the cursor's sweep direction.

## Per-component docs (machine-readable)

- https://vfx.2t.hk/components/astra-field.md
- https://vfx.2t.hk/components/aurora.md
- https://vfx.2t.hk/components/black-hole.md
- https://vfx.2t.hk/components/chroma-flow.md
- https://vfx.2t.hk/components/fiber-flow.md
- https://vfx.2t.hk/components/fluid-gradient.md
- https://vfx.2t.hk/components/footer-fold.md
- https://vfx.2t.hk/components/footer-phosphor.md
- https://vfx.2t.hk/components/footer-tidal.md
- https://vfx.2t.hk/components/footer-vinyl.md
- https://vfx.2t.hk/components/glass-card.md
- https://vfx.2t.hk/components/glass-lens.md
- https://vfx.2t.hk/components/hero-aurora.md
- https://vfx.2t.hk/components/hero-black-hole.md
- https://vfx.2t.hk/components/hero-chroma.md
- https://vfx.2t.hk/components/hero-contour.md
- https://vfx.2t.hk/components/hero-eclipse.md
- https://vfx.2t.hk/components/hero-fiber.md
- https://vfx.2t.hk/components/hero-fluid.md
- https://vfx.2t.hk/components/hero-globe.md
- https://vfx.2t.hk/components/hero-iridescent.md
- https://vfx.2t.hk/components/hero-mesh.md
- https://vfx.2t.hk/components/hero-particles.md
- https://vfx.2t.hk/components/hero-ribbon.md
- https://vfx.2t.hk/components/hero-starfield.md
- https://vfx.2t.hk/components/hero-vortex.md
- https://vfx.2t.hk/components/iridescent.md
- https://vfx.2t.hk/components/kinetic-text.md
- https://vfx.2t.hk/components/light-prism.md
- https://vfx.2t.hk/components/liquid-glass.md
- https://vfx.2t.hk/components/magnetic.md
- https://vfx.2t.hk/components/mesh-gradient.md
- https://vfx.2t.hk/components/particle-field.md
- https://vfx.2t.hk/components/radiant-dots.md
- https://vfx.2t.hk/components/ribbon-field.md
- https://vfx.2t.hk/components/spectral-card.md
- https://vfx.2t.hk/components/starfield.md
- https://vfx.2t.hk/components/vortex.md
- https://vfx.2t.hk/components/wave-background.md

## Scope guard

This library focuses on customizable hero and footer sections, supported by GPU visuals and focused interactions.
Hero sample copy is replaceable. Pass title/subtitle or children and configure CTA href/onClick.
Footer sample copy is replaceable. Configure brand, title, CTA, groups, legal links and copyright. Supply children for your own introduction/navigation layout.
DOM interaction components do not require WebGPU. This is not a general-purpose UI kit.


# Astra Field

A rotatable spiral galaxy of glowing stars.

## Install

```bash
npm install vfx-ui-vue
```

```vue
<script setup lang="ts">
import { AstraField } from "vfx-ui-vue";
</script>

<template>
  <div style="height: 520px"><AstraField interactive /></div>
</template>
```

## Props

- `shape?: "six" | "galaxy"`
- `color?: string`
- `intensity?: number`
- `speed?: number`
- `seed?: number`
- `intro?: boolean`
- `introDuration?: number`
- `interactive?: boolean`
- `className?: string`
- `style?: CSSProperties`
- `fallback?: VueNode`
- `children?: VueNode`

## Variants

Import the preset bag and bind it with `v-bind`:

```vue
<script setup lang="ts">
import { ASTRA_FIELD_PRESETS } from "vfx-ui-vue";
</script>
```

## Notes for agents

- Original WebGL spiral star field inspired by OpenAI Astra. No external assets or Three.js dependency.
- Stars gather from a scattered 3D cloud on mount. intro defaults to true; introDuration defaults to 4.8 seconds, independent of ambient speed. Reduced motion skips assembly.
- Drag or use arrow keys to orbit; Home resets. Place your own copy in a sibling DOM layer.
- Offscreen and hidden tabs pause. Reduced motion freezes ambient movement. Provide a sized parent.

# Aurora

Vertical light curtains driven by fBm perturbation and gaussian bands.

## Install

```bash
npm install vfx-ui-vue
```

```vue
<script setup lang="ts">
import { Aurora } from "vfx-ui-vue";
</script>

<template>
  <Aurora />
</template>
```

## Props

- `speed?: number`
- `intensity?: number`
- `bands?: number`
- `primary?: string`
- `secondary?: string`
- `interactive?: boolean`
- `className?: string`
- `style?: VfxCanvasProps["style"]`
- `fallback?: VfxCanvasProps["fallback"]`
- `children?: VueNode`

## Variants

Import the preset bag and bind it with `v-bind`:

```vue
<script setup lang="ts">
import { AURORA_PRESETS } from "vfx-ui-vue";
</script>
```

## Shader

WGSL source is exported as `AURORA_SHADER` — read it to learn how the effect works.

## Notes for agents

- Requires a WebGPU-capable browser; the component degrades gracefully otherwise (use the `fallback` prop).
- SSR-safe: rendering on the server produces an inert canvas; init happens on mount.
- `prefers-reduced-motion` freezes animation automatically.
- Uniforms are plain f32 fields; pass them via `uniforms` — no shader edits needed.

# Black Hole

The vgpu optimized-black-hole pipeline as a component: baked null-geodesic G-buffer, HDR bloom, prefiltered lensed star field, Doppler beaming — a verbatim port (MIT, Vercel).

## Install

```bash
npm install vfx-ui-vue
```

```vue
<script setup lang="ts">
import { BlackHole } from "vfx-ui-vue";
</script>

<template>
  <BlackHole />
</template>
```

## Props

- `speed?: number`
- `brightness?: number`
- `distance?: number`
- `diskRadius?: number`
- `fov?: number`
- `tilt?: number`
- `centerX?: number`
- `centerY?: number`
- `roll?: number`
- `turbulence?: number`
- `density?: number`
- `doppler?: number`
- `stars?: number`
- `centerFade?: number`
- `bloom?: number`
- `interactive?: boolean`
- `className?: string`
- `style?: CSSProperties`
- `fallback?: VueNode`
- `children?: VueNode`

## Variants

Import the preset bag and bind it with `v-bind`:

```vue
<script setup lang="ts">
import { BLACK_HOLE_PRESETS } from "vfx-ui-vue";
</script>
```

## Shader

WGSL source is exported as `BLACK_HOLE_BAKE_SHADER` — read it to learn how the effect works.

## Notes for agents

- Requires a WebGPU-capable browser; the component degrades gracefully otherwise (use the `fallback` prop).
- SSR-safe: rendering on the server produces an inert canvas; init happens on mount.
- `prefers-reduced-motion` freezes animation automatically.
- Uniforms are plain f32 fields; pass them via `uniforms` — no shader edits needed.

# Chroma Flow

Four-edge liquid color field that floods inward toward the direction the cursor sweeps — fbm-noise bleed boundaries driven by pointer velocity.

## Install

```bash
npm install vfx-ui-vue
```

```vue
<script setup lang="ts">
import { ChromaFlow } from "vfx-ui-vue";
</script>

<template>
  <ChromaFlow />
</template>
```

## Props

- `speed?: number`
- `intensity?: number`
- `radius?: number`
- `momentum?: number`
- `ambient?: number`
- `baseColor?: string`
- `upColor?: string`
- `downColor?: string`
- `leftColor?: string`
- `rightColor?: string`
- `interactive?: boolean`
- `className?: string`
- `style?: VfxCanvasProps["style"]`
- `fallback?: VfxCanvasProps["fallback"]`
- `children?: VueNode`

## Variants

Import the preset bag and bind it with `v-bind`:

```vue
<script setup lang="ts">
import { CHROMA_FLOW_PRESETS } from "vfx-ui-vue";
</script>
```

## Shader

WGSL source is exported as `CHROMA_FLOW_SHADER` — read it to learn how the effect works.

## Notes for agents

- Requires a WebGPU-capable browser; the component degrades gracefully otherwise (use the `fallback` prop).
- SSR-safe: rendering on the server produces an inert canvas; init happens on mount.
- `prefers-reduced-motion` freezes animation automatically.
- Uniforms are plain f32 fields; pass them via `uniforms` — no shader edits needed.

# Fiber Flow

Luminous silk fibers streaming through the dark — domain-warped fbm ridge field with pointer parallax (opt-in).

## Install

```bash
npm install vfx-ui-vue
```

```vue
<script setup lang="ts">
import { FiberFlow } from "vfx-ui-vue";
</script>

<template>
  <FiberFlow />
</template>
```

## Props

- `speed?: number`
- `intensity?: number`
- `scale?: number`
- `strands?: number`
- `sharp?: number`
- `from?: string`
- `to?: string`
- `accent?: string`
- `interactive?: boolean`
- `className?: string`
- `style?: VfxCanvasProps["style"]`
- `fallback?: VfxCanvasProps["fallback"]`
- `children?: VueNode`

## Variants

Import the preset bag and bind it with `v-bind`:

```vue
<script setup lang="ts">
import { FIBER_FLOW_PRESETS } from "vfx-ui-vue";
</script>
```

## Shader

WGSL source is exported as `FIBER_FLOW_SHADER` — read it to learn how the effect works.

## Notes for agents

- Requires a WebGPU-capable browser; the component degrades gracefully otherwise (use the `fallback` prop).
- SSR-safe: rendering on the server produces an inert canvas; init happens on mount.
- `prefers-reduced-motion` freezes animation automatically.
- Uniforms are plain f32 fields; pass them via `uniforms` — no shader edits needed.

# Fluid Gradient

Domain-warped fBm noise flowing through a tri-color palette.

## Install

```bash
npm install vfx-ui-vue
```

```vue
<script setup lang="ts">
import { FluidGradient } from "vfx-ui-vue";
</script>

<template>
  <FluidGradient />
</template>
```

## Props

- `speed?: number`
- `warp?: number`
- `scale?: number`
- `from?: string`
- `to?: string`
- `accent?: string`
- `interactive?: boolean`
- `className?: string`
- `style?: VfxCanvasProps["style"]`
- `fallback?: VfxCanvasProps["fallback"]`
- `children?: VueNode`

## Variants

Import the preset bag and bind it with `v-bind`:

```vue
<script setup lang="ts">
import { FLUID_PRESETS } from "vfx-ui-vue";
</script>
```

## Shader

WGSL source is exported as `FLUID_SHADER` — read it to learn how the effect works.

## Notes for agents

- Requires a WebGPU-capable browser; the component degrades gracefully otherwise (use the `fallback` prop).
- SSR-safe: rendering on the server produces an inert canvas; init happens on mount.
- `prefers-reduced-motion` freezes animation automatically.
- Uniforms are plain f32 fields; pass them via `uniforms` — no shader edits needed.

# Footer Fold

A wordmark printed across hinged paper panels that respond to the pointer.

## Install

```bash
npm install vfx-ui-vue
```

```vue
<script setup lang="ts">
import { FooterFold } from "vfx-ui-vue";
</script>

<template>
  <FooterFold brand="YOUR BRAND" title="Let’s talk." :cta="{ label: 'Contact', href: 'mailto:hello@example.com' }" copyright="© Your studio" />
</template>
```

## Props

- `color?: string`
- `background?: string`
- `depth?: number`
- `brand?: string (artwork is generated from your text)`
- `title?: VueNode`
- `description?: VueNode`
- `cta?: { label: string; href: string } | null`
- `groups?: readonly { label: string; links: readonly { label: string; href: string }[] }[]`
- `legal?: readonly { label: string; href: string }[]`
- `copyright?: VueNode`
- `children/default slot?: VueNode (replaces introduction and navigation)`
- `interactive?: boolean (default true)`
- `className?: string`
- `style?: CSSProperties (--vfx-footer-display sets the brand font)`

## Notes for agents

- DOM/CSS/Canvas interaction; works without WebGPU. Supply your own content through the documented props.
- SSR-safe: content and navigation render on the server; animation starts after mount.
- `prefers-reduced-motion` skips animation automatically.

# Footer Phosphor

A luminous cell wordmark that disperses around your pointer and settles home.

## Install

```bash
npm install vfx-ui-vue
```

```vue
<script setup lang="ts">
import { FooterPhosphor } from "vfx-ui-vue";
</script>

<template>
  <FooterPhosphor brand="YOUR BRAND" title="Let’s talk." :cta="{ label: 'Contact', href: 'mailto:hello@example.com' }" copyright="© Your studio" />
</template>
```

## Props

- `color?: string`
- `background?: string`
- `brand?: string (artwork is generated from your text)`
- `title?: VueNode`
- `description?: VueNode`
- `cta?: { label: string; href: string } | null`
- `groups?: readonly { label: string; links: readonly { label: string; href: string }[] }[]`
- `legal?: readonly { label: string; href: string }[]`
- `copyright?: VueNode`
- `children/default slot?: VueNode (replaces introduction and navigation)`
- `interactive?: boolean (default true)`
- `className?: string`
- `style?: CSSProperties (--vfx-footer-display sets the brand font)`

## Notes for agents

- DOM/CSS/Canvas interaction; works without WebGPU. Supply your own content through the documented props.
- SSR-safe: content and navigation render on the server; animation starts after mount.
- `prefers-reduced-motion` skips animation automatically.

# Footer Tidal

Copper tidal lines beneath your brand, with pointer-driven currents.

## Install

```bash
npm install vfx-ui-vue
```

```vue
<script setup lang="ts">
import { FooterTidal } from "vfx-ui-vue";
</script>

<template>
  <FooterTidal brand="YOUR BRAND" title="Let’s talk." :cta="{ label: 'Contact', href: 'mailto:hello@example.com' }" copyright="© Your studio" />
</template>
```

## Props

- `color?: string`
- `background?: string`
- `animate?: boolean`
- `brand?: string (artwork is generated from your text)`
- `title?: VueNode`
- `description?: VueNode`
- `cta?: { label: string; href: string } | null`
- `groups?: readonly { label: string; links: readonly { label: string; href: string }[] }[]`
- `legal?: readonly { label: string; href: string }[]`
- `copyright?: VueNode`
- `children/default slot?: VueNode (replaces introduction and navigation)`
- `interactive?: boolean (default true)`
- `className?: string`
- `style?: CSSProperties (--vfx-footer-display sets the brand font)`

## Notes for agents

- DOM/CSS/Canvas interaction; works without WebGPU. Supply your own content through the documented props.
- SSR-safe: content and navigation render on the server; animation starts after mount.
- `prefers-reduced-motion` skips animation automatically.

# Footer Vinyl

A record-sleeve footer with a pointer-rotated vinyl and your own label.

## Install

```bash
npm install vfx-ui-vue
```

```vue
<script setup lang="ts">
import { FooterVinyl } from "vfx-ui-vue";
</script>

<template>
  <FooterVinyl brand="YOUR BRAND" title="Let’s talk." :cta="{ label: 'Contact', href: 'mailto:hello@example.com' }" copyright="© Your studio" />
</template>
```

## Props

- `color?: string`
- `background?: string`
- `labelColor?: string`
- `brand?: string (artwork is generated from your text)`
- `title?: VueNode`
- `description?: VueNode`
- `cta?: { label: string; href: string } | null`
- `groups?: readonly { label: string; links: readonly { label: string; href: string }[] }[]`
- `legal?: readonly { label: string; href: string }[]`
- `copyright?: VueNode`
- `children/default slot?: VueNode (replaces introduction and navigation)`
- `interactive?: boolean (default true)`
- `className?: string`
- `style?: CSSProperties (--vfx-footer-display sets the brand font)`

## Notes for agents

- DOM/CSS/Canvas interaction; works without WebGPU. Supply your own content through the documented props.
- SSR-safe: content and navigation render on the server; animation starts after mount.
- `prefers-reduced-motion` skips animation automatically.

# Glass Card

Thick-cut optical glass with two-interface refraction and studio reflections.

## Install

```bash
npm install vfx-ui-vue
```

```vue
<script setup lang="ts">
import { GlassCard } from "vfx-ui-vue";
</script>

<template>
  <div style="height: 520px"><GlassCard interactive /></div>
</template>
```

## Props

- `children?: VueNode`
- `radius?: number`
- `borderGlow?: number`
- `shine?: number`
- `cardScale?: number`
- `tint?: string`
- `interactive?: boolean`
- `className?: string`
- `style?: VfxCanvasProps["style"]`
- `fallback?: VfxCanvasProps["fallback"]`

## Variants

Import the preset bag and bind it with `v-bind`:

```vue
<script setup lang="ts">
import { GLASS_CARD_PRESETS } from "vfx-ui-vue";
</script>
```

## Shader

WGSL source is exported as `GLASS_CARD_SHADER` — read it to learn how the effect works.

## Notes for agents

- Original ray-marched glass solids over procedural studio scenes; arbitrary DOM behind the canvas is not refracted.
- Requires WebGPU. Provide a sized parent. Existing public prop names and preset IDs remain; visual output has changed.
- Pointer tilts the object. Reduced motion freezes time and disables pointer movement. No demonstration text is baked into the shader.
- Configure the documented component props. For raw uniforms, use the exported shader with VfxCanvas instead.

# Glass Lens

A biconvex glass lens that magnifies and inverts a printed studio scene.

## Install

```bash
npm install vfx-ui-vue
```

```vue
<script setup lang="ts">
import { GlassLens } from "vfx-ui-vue";
</script>

<template>
  <div style="height: 520px"><GlassLens interactive /></div>
</template>
```

## Props

- `speed?: number`
- `refraction?: number`
- `dispersion?: number`
- `blur?: number`
- `rim?: number`
- `tint?: string`
- `interactive?: boolean`
- `className?: string`
- `style?: VfxCanvasProps["style"]`
- `fallback?: VfxCanvasProps["fallback"]`
- `children?: VueNode`

## Variants

Import the preset bag and bind it with `v-bind`:

```vue
<script setup lang="ts">
import { GLASS_LENS_PRESETS } from "vfx-ui-vue";
</script>
```

## Shader

WGSL source is exported as `GLASS_LENS_SHADER` — read it to learn how the effect works.

## Notes for agents

- Original ray-marched glass solids over procedural studio scenes; arbitrary DOM behind the canvas is not refracted.
- Requires WebGPU. Provide a sized parent. Existing public prop names and preset IDs remain; visual output has changed.
- Pointer tilts the object. Reduced motion freezes time and disables pointer movement. No demonstration text is baked into the shader.
- Configure the documented component props. For raw uniforms, use the exported shader with VfxCanvas instead.

# Hero Aurora

Drop-in hero section: bottom-left copy anchored under full-bleed aurora curtains rendered per-pixel on the GPU.

## Install

```bash
npm install vfx-ui-vue
```

```vue
<script setup lang="ts">
import { HeroAurora } from "vfx-ui-vue";
</script>

<template>
  <HeroAurora title="Your next big idea." :primary-cta="{ label: 'Get started', href: '/start' }" :secondary-cta="null" interactive />
</template>
```

## Props

- `scheme?: "dark" | "light"`
- `speed?: number`
- `intensity?: number`
- `bands?: number`
- `primary?: string`
- `secondary?: string`
- `title?: VueNode`
- `subtitle?: VueNode`
- `eyebrow?: string`
- `primaryCta?: string | { label: string; href?: string; onClick?: MouseEventHandler<HTMLButtonElement> } | null`
- `secondaryCta?: string | { label: string; href?: string; onClick?: MouseEventHandler<HTMLButtonElement> } | null`
- `children/default slot?: VueNode (replaces default content)`
- `interactive?: boolean (default false)`
- `className?: string`
- `style?: CSSProperties`
- `fallback?: VueNode`

## Variants

Import the preset bag and bind it with `v-bind`:

```vue
<script setup lang="ts">
import { HERO_AURORA_PRESETS } from "vfx-ui-vue";
</script>
```

## Shader

WGSL source is exported as `AURORA_SHADER` — read it to learn how the effect works.

## Notes for agents

- Requires a WebGPU-capable browser; the component degrades gracefully otherwise (use the `fallback` prop).
- SSR-safe: rendering on the server produces an inert canvas; init happens on mount.
- `prefers-reduced-motion` freezes animation automatically.
- Uniforms are plain f32 fields; pass them via `uniforms` — no shader edits needed.

# Hero Black Hole

Drop-in hero section: left copy beside a ray-traced accretion disk with relativistic beaming and a lensed star field.

## Install

```bash
npm install vfx-ui-vue
```

```vue
<script setup lang="ts">
import { HeroBlackHole } from "vfx-ui-vue";
</script>

<template>
  <HeroBlackHole title="Your next big idea." :primary-cta="{ label: 'Get started', href: '/start' }" :secondary-cta="null" interactive />
</template>
```

## Props

- `badges?: readonly string[]`
- `scheme?: "dark" | "light"`
- `speed?: number`
- `distance?: number`
- `diskRadius?: number`
- `tilt?: number`
- `brightness?: number`
- `doppler?: number`
- `stars?: number`
- `centerX?: number`
- `centerY?: number`
- `title?: VueNode`
- `subtitle?: VueNode`
- `eyebrow?: string`
- `primaryCta?: string | { label: string; href?: string; onClick?: MouseEventHandler<HTMLButtonElement> } | null`
- `secondaryCta?: string | { label: string; href?: string; onClick?: MouseEventHandler<HTMLButtonElement> } | null`
- `children/default slot?: VueNode (replaces default content)`
- `interactive?: boolean (default false)`
- `className?: string`
- `style?: CSSProperties`
- `fallback?: VueNode`

## Variants

Import the preset bag and bind it with `v-bind`:

```vue
<script setup lang="ts">
import { HERO_BLACK_HOLE_PRESETS } from "vfx-ui-vue";
</script>
```

## Shader

WGSL source is exported as `BLACK_HOLE_BAKE_SHADER` — read it to learn how the effect works.

## Notes for agents

- Requires a WebGPU-capable browser; the component degrades gracefully otherwise (use the `fallback` prop).
- SSR-safe: rendering on the server produces an inert canvas; init happens on mount.
- `prefers-reduced-motion` freezes animation automatically.
- Uniforms are plain f32 fields; pass them via `uniforms` — no shader edits needed.

# Hero Chroma

Drop-in hero section: bottom-left copy over a four-edge liquid color field that floods toward the cursor's sweep direction.

## Install

```bash
npm install vfx-ui-vue
```

```vue
<script setup lang="ts">
import { HeroChroma } from "vfx-ui-vue";
</script>

<template>
  <HeroChroma title="Your next big idea." :primary-cta="{ label: 'Get started', href: '/start' }" :secondary-cta="null" interactive />
</template>
```

## Props

- `scheme?: "dark" | "light"`
- `speed?: number`
- `radius?: number`
- `momentum?: number`
- `ambient?: number`
- `baseColor?: string`
- `upColor?: string`
- `downColor?: string`
- `leftColor?: string`
- `rightColor?: string`
- `title?: VueNode`
- `subtitle?: VueNode`
- `eyebrow?: string`
- `primaryCta?: string | { label: string; href?: string; onClick?: MouseEventHandler<HTMLButtonElement> } | null`
- `secondaryCta?: string | { label: string; href?: string; onClick?: MouseEventHandler<HTMLButtonElement> } | null`
- `children/default slot?: VueNode (replaces default content)`
- `interactive?: boolean (default false)`
- `className?: string`
- `style?: CSSProperties`
- `fallback?: VueNode`

## Variants

Import the preset bag and bind it with `v-bind`:

```vue
<script setup lang="ts">
import { HERO_CHROMA_PRESETS } from "vfx-ui-vue";
</script>
```

## Shader

WGSL source is exported as `CHROMA_FLOW_SHADER` — read it to learn how the effect works.

## Notes for agents

- Requires a WebGPU-capable browser; the component degrades gracefully otherwise (use the `fallback` prop).
- SSR-safe: rendering on the server produces an inert canvas; init happens on mount.
- `prefers-reduced-motion` freezes animation automatically.
- Uniforms are plain f32 fields; pass them via `uniforms` — no shader edits needed.

# Hero Contour

A seeded topographic paper landscape that lifts around the pointer.

## Install

```bash
npm install vfx-ui-vue
```

```vue
<script setup lang="ts">
import { HeroContour } from "vfx-ui-vue";
</script>

<template>
  <HeroContour title="Your next big idea." :primary-cta="{ label: 'Get started', href: '/start' }" :secondary-cta="null" interactive />
</template>
```

## Props

- `color?: string`
- `background?: string`
- `seed?: number`
- `relief?: number`
- `title?: VueNode`
- `subtitle?: VueNode`
- `eyebrow?: string`
- `primaryCta?: string | { label: string; href?: string; onClick?: MouseEventHandler<HTMLButtonElement> } | null`
- `secondaryCta?: string | { label: string; href?: string; onClick?: MouseEventHandler<HTMLButtonElement> } | null`
- `children/default slot?: VueNode (replaces default content)`
- `interactive?: boolean (default false)`
- `className?: string`
- `style?: CSSProperties`

## Notes for agents

- DOM/CSS/Canvas interaction; works without WebGPU. Supply your own content through the documented props.
- SSR-safe: content and navigation render on the server; animation starts after mount.
- `prefers-reduced-motion` skips animation automatically.

# Hero Eclipse

An engraved astronomical dial with a pointer-controlled eclipse.

## Install

```bash
npm install vfx-ui-vue
```

```vue
<script setup lang="ts">
import { HeroEclipse } from "vfx-ui-vue";
</script>

<template>
  <HeroEclipse title="Your next big idea." :primary-cta="{ label: 'Get started', href: '/start' }" :secondary-cta="null" interactive />
</template>
```

## Props

- `color?: string`
- `background?: string`
- `parallax?: number`
- `title?: VueNode`
- `subtitle?: VueNode`
- `eyebrow?: string`
- `primaryCta?: string | { label: string; href?: string; onClick?: MouseEventHandler<HTMLButtonElement> } | null`
- `secondaryCta?: string | { label: string; href?: string; onClick?: MouseEventHandler<HTMLButtonElement> } | null`
- `children/default slot?: VueNode (replaces default content)`
- `interactive?: boolean (default false)`
- `className?: string`
- `style?: CSSProperties`

## Notes for agents

- DOM/CSS/Canvas interaction; works without WebGPU. Supply your own content through the documented props.
- SSR-safe: content and navigation render on the server; animation starts after mount.
- `prefers-reduced-motion` skips animation automatically.

# Hero Fiber

Drop-in hero section: top-weighted headline over luminous silk fibers streaming through the dark.

## Install

```bash
npm install vfx-ui-vue
```

```vue
<script setup lang="ts">
import { HeroFiber } from "vfx-ui-vue";
</script>

<template>
  <HeroFiber title="Your next big idea." :primary-cta="{ label: 'Get started', href: '/start' }" :secondary-cta="null" interactive />
</template>
```

## Props

- `badges?: readonly string[]`
- `scheme?: "dark" | "light"`
- `speed?: number`
- `intensity?: number`
- `scale?: number`
- `strands?: number`
- `sharp?: number`
- `from?: string`
- `to?: string`
- `accent?: string`
- `title?: VueNode`
- `subtitle?: VueNode`
- `eyebrow?: string`
- `primaryCta?: string | { label: string; href?: string; onClick?: MouseEventHandler<HTMLButtonElement> } | null`
- `secondaryCta?: string | { label: string; href?: string; onClick?: MouseEventHandler<HTMLButtonElement> } | null`
- `children/default slot?: VueNode (replaces default content)`
- `interactive?: boolean (default false)`
- `className?: string`
- `style?: CSSProperties`
- `fallback?: VueNode`

## Variants

Import the preset bag and bind it with `v-bind`:

```vue
<script setup lang="ts">
import { HERO_FIBER_PRESETS } from "vfx-ui-vue";
</script>
```

## Shader

WGSL source is exported as `FIBER_FLOW_SHADER` — read it to learn how the effect works.

## Notes for agents

- Requires a WebGPU-capable browser; the component degrades gracefully otherwise (use the `fallback` prop).
- SSR-safe: rendering on the server produces an inert canvas; init happens on mount.
- `prefers-reduced-motion` freezes animation automatically.
- Uniforms are plain f32 fields; pass them via `uniforms` — no shader edits needed.

# Hero Fluid

Drop-in hero section: centered headline over a GPU liquid-gradient field with real selectable DOM text, scrim-backed contrast, and a reduced-motion static fallback.

## Install

```bash
npm install vfx-ui-vue
```

```vue
<script setup lang="ts">
import { HeroFluid } from "vfx-ui-vue";
</script>

<template>
  <HeroFluid title="Your next big idea." :primary-cta="{ label: 'Get started', href: '/start' }" :secondary-cta="null" interactive />
</template>
```

## Props

- `scheme?: "dark" | "light"`
- `speed?: number`
- `warp?: number`
- `scale?: number`
- `from?: string`
- `to?: string`
- `accent?: string`
- `title?: VueNode`
- `subtitle?: VueNode`
- `eyebrow?: string`
- `primaryCta?: string | { label: string; href?: string; onClick?: MouseEventHandler<HTMLButtonElement> } | null`
- `secondaryCta?: string | { label: string; href?: string; onClick?: MouseEventHandler<HTMLButtonElement> } | null`
- `children/default slot?: VueNode (replaces default content)`
- `interactive?: boolean (default false)`
- `className?: string`
- `style?: CSSProperties`
- `fallback?: VueNode`

## Variants

Import the preset bag and bind it with `v-bind`:

```vue
<script setup lang="ts">
import { HERO_FLUID_PRESETS } from "vfx-ui-vue";
</script>
```

## Shader

WGSL source is exported as `FLUID_SHADER` — read it to learn how the effect works.

## Notes for agents

- Requires a WebGPU-capable browser; the component degrades gracefully otherwise (use the `fallback` prop).
- SSR-safe: rendering on the server produces an inert canvas; init happens on mount.
- `prefers-reduced-motion` freezes animation automatically.
- Uniforms are plain f32 fields; pass them via `uniforms` — no shader edits needed.

# Hero Globe

Drop-in split hero: copy on the left, the dot-matrix cobe planet (the globe behind vercel.com) glowing on the right.

## Install

```bash
npm install vfx-ui-vue
```

```vue
<script setup lang="ts">
import { HeroGlobe } from "vfx-ui-vue";
</script>

<template>
  <HeroGlobe title="Your next big idea." :primary-cta="{ label: 'Get started', href: '/start' }" :secondary-cta="null" interactive />
</template>
```

## Props

- `scheme?: "dark" | "light"`
- `spin?: number`
- `mapSamples?: number`
- `baseColor?: [number, number, number]`
- `markerColor?: [number, number, number]`
- `glowColor?: [number, number, number]`
- `markers?: CobeMarker[]`
- `globeProps?: Record<string, unknown>`
- `title?: VueNode`
- `subtitle?: VueNode`
- `eyebrow?: string`
- `primaryCta?: string | { label: string; href?: string; onClick?: MouseEventHandler<HTMLButtonElement> } | null`
- `secondaryCta?: string | { label: string; href?: string; onClick?: MouseEventHandler<HTMLButtonElement> } | null`
- `children/default slot?: VueNode (replaces default content)`
- `interactive?: boolean (default false)`
- `className?: string`
- `style?: CSSProperties`
- `fallback?: VueNode`

## Variants

Import the preset bag and bind it with `v-bind`:

```vue
<script setup lang="ts">
import { HERO_GLOBE_PRESETS } from "vfx-ui-vue";
</script>
```

## Notes for agents

- DOM/CSS/Canvas interaction; works without WebGPU. Supply your own content through the documented props.
- SSR-safe: content and navigation render on the server; animation starts after mount.
- `prefers-reduced-motion` skips animation automatically.

# Hero Iridescent

Drop-in hero section: left copy over a holographic thin-film sheen — the premium product-launch look, computed per-pixel.

## Install

```bash
npm install vfx-ui-vue
```

```vue
<script setup lang="ts">
import { HeroIridescent } from "vfx-ui-vue";
</script>

<template>
  <HeroIridescent title="Your next big idea." :primary-cta="{ label: 'Get started', href: '/start' }" :secondary-cta="null" interactive />
</template>
```

## Props

- `scheme?: "dark" | "light"`
- `speed?: number`
- `scale?: number`
- `hueShift?: number`
- `saturation?: number`
- `brightness?: number`
- `title?: VueNode`
- `subtitle?: VueNode`
- `eyebrow?: string`
- `primaryCta?: string | { label: string; href?: string; onClick?: MouseEventHandler<HTMLButtonElement> } | null`
- `secondaryCta?: string | { label: string; href?: string; onClick?: MouseEventHandler<HTMLButtonElement> } | null`
- `children/default slot?: VueNode (replaces default content)`
- `interactive?: boolean (default false)`
- `className?: string`
- `style?: CSSProperties`
- `fallback?: VueNode`

## Variants

Import the preset bag and bind it with `v-bind`:

```vue
<script setup lang="ts">
import { HERO_IRIDESCENT_PRESETS } from "vfx-ui-vue";
</script>
```

## Shader

WGSL source is exported as `IRIDESCENT_SHADER` — read it to learn how the effect works.

## Notes for agents

- Requires a WebGPU-capable browser; the component degrades gracefully otherwise (use the `fallback` prop).
- SSR-safe: rendering on the server produces an inert canvas; init happens on mount.
- `prefers-reduced-motion` freezes animation automatically.
- Uniforms are plain f32 fields; pass them via `uniforms` — no shader edits needed.

# Hero Mesh

Drop-in hero section: centered headline over a slow Voronoi mesh-gradient field — every frame a different poster.

## Install

```bash
npm install vfx-ui-vue
```

```vue
<script setup lang="ts">
import { HeroMesh } from "vfx-ui-vue";
</script>

<template>
  <HeroMesh title="Your next big idea." :primary-cta="{ label: 'Get started', href: '/start' }" :secondary-cta="null" interactive />
</template>
```

## Props

- `scheme?: "dark" | "light"`
- `speed?: number`
- `scale?: number`
- `softness?: number`
- `from?: string`
- `to?: string`
- `accent?: string`
- `deep?: string`
- `title?: VueNode`
- `subtitle?: VueNode`
- `eyebrow?: string`
- `primaryCta?: string | { label: string; href?: string; onClick?: MouseEventHandler<HTMLButtonElement> } | null`
- `secondaryCta?: string | { label: string; href?: string; onClick?: MouseEventHandler<HTMLButtonElement> } | null`
- `children/default slot?: VueNode (replaces default content)`
- `interactive?: boolean (default false)`
- `className?: string`
- `style?: CSSProperties`
- `fallback?: VueNode`

## Variants

Import the preset bag and bind it with `v-bind`:

```vue
<script setup lang="ts">
import { HERO_MESH_PRESETS } from "vfx-ui-vue";
</script>
```

## Shader

WGSL source is exported as `MESH_GRADIENT_SHADER` — read it to learn how the effect works.

## Notes for agents

- Requires a WebGPU-capable browser; the component degrades gracefully otherwise (use the `fallback` prop).
- SSR-safe: rendering on the server produces an inert canvas; init happens on mount.
- `prefers-reduced-motion` freezes animation automatically.
- Uniforms are plain f32 fields; pass them via `uniforms` — no shader edits needed.

# Hero Particles

Drop-in hero section: top-weighted headline with a badge row over a drifting GPU particle field.

## Install

```bash
npm install vfx-ui-vue
```

```vue
<script setup lang="ts">
import { HeroParticles } from "vfx-ui-vue";
</script>

<template>
  <HeroParticles title="Your next big idea." :primary-cta="{ label: 'Get started', href: '/start' }" :secondary-cta="null" interactive />
</template>
```

## Props

- `badges?: readonly string[]`
- `scheme?: "dark" | "light"`
- `density?: number`
- `speed?: number`
- `size?: number`
- `color?: string`
- `title?: VueNode`
- `subtitle?: VueNode`
- `eyebrow?: string`
- `primaryCta?: string | { label: string; href?: string; onClick?: MouseEventHandler<HTMLButtonElement> } | null`
- `secondaryCta?: string | { label: string; href?: string; onClick?: MouseEventHandler<HTMLButtonElement> } | null`
- `children/default slot?: VueNode (replaces default content)`
- `interactive?: boolean (default false)`
- `className?: string`
- `style?: CSSProperties`
- `fallback?: VueNode`

## Variants

Import the preset bag and bind it with `v-bind`:

```vue
<script setup lang="ts">
import { HERO_PARTICLES_PRESETS } from "vfx-ui-vue";
</script>
```

## Shader

WGSL source is exported as `PARTICLE_SHADER` — read it to learn how the effect works.

## Notes for agents

- Requires a WebGPU-capable browser; the component degrades gracefully otherwise (use the `fallback` prop).
- SSR-safe: rendering on the server produces an inert canvas; init happens on mount.
- `prefers-reduced-motion` freezes animation automatically.
- Uniforms are plain f32 fields; pass them via `uniforms` — no shader edits needed.

# Hero Ribbon

Drop-in split hero: copy left, three Gaussian light ribbons sweeping the right over a dot-matrix grid.

## Install

```bash
npm install vfx-ui-vue
```

```vue
<script setup lang="ts">
import { HeroRibbon } from "vfx-ui-vue";
</script>

<template>
  <HeroRibbon title="Your next big idea." :primary-cta="{ label: 'Get started', href: '/start' }" :secondary-cta="null" interactive />
</template>
```

## Props

- `scheme?: "dark" | "light"`
- `speed?: number`
- `intensity?: number`
- `drift?: number`
- `grain?: number`
- `title?: VueNode`
- `subtitle?: VueNode`
- `eyebrow?: string`
- `primaryCta?: string | { label: string; href?: string; onClick?: MouseEventHandler<HTMLButtonElement> } | null`
- `secondaryCta?: string | { label: string; href?: string; onClick?: MouseEventHandler<HTMLButtonElement> } | null`
- `children/default slot?: VueNode (replaces default content)`
- `interactive?: boolean (default false)`
- `className?: string`
- `style?: CSSProperties`
- `fallback?: VueNode`

## Variants

Import the preset bag and bind it with `v-bind`:

```vue
<script setup lang="ts">
import { HERO_RIBBON_PRESETS } from "vfx-ui-vue";
</script>
```

## Shader

WGSL source is exported as `RIBBON_FIELD_SHADER` — read it to learn how the effect works.

## Notes for agents

- Requires a WebGPU-capable browser; the component degrades gracefully otherwise (use the `fallback` prop).
- SSR-safe: rendering on the server produces an inert canvas; init happens on mount.
- `prefers-reduced-motion` freezes animation automatically.
- Uniforms are plain f32 fields; pass them via `uniforms` — no shader edits needed.

# Hero Starfield

Drop-in hero section: bottom-left copy under a twinkling hashed star grid with parallax drift.

## Install

```bash
npm install vfx-ui-vue
```

```vue
<script setup lang="ts">
import { HeroStarfield } from "vfx-ui-vue";
</script>

<template>
  <HeroStarfield title="Your next big idea." :primary-cta="{ label: 'Get started', href: '/start' }" :secondary-cta="null" interactive />
</template>
```

## Props

- `scheme?: "dark" | "light"`
- `density?: number`
- `speed?: number`
- `twinkle?: number`
- `color?: string`
- `title?: VueNode`
- `subtitle?: VueNode`
- `eyebrow?: string`
- `primaryCta?: string | { label: string; href?: string; onClick?: MouseEventHandler<HTMLButtonElement> } | null`
- `secondaryCta?: string | { label: string; href?: string; onClick?: MouseEventHandler<HTMLButtonElement> } | null`
- `children/default slot?: VueNode (replaces default content)`
- `interactive?: boolean (default false)`
- `className?: string`
- `style?: CSSProperties`
- `fallback?: VueNode`

## Variants

Import the preset bag and bind it with `v-bind`:

```vue
<script setup lang="ts">
import { HERO_STARFIELD_PRESETS } from "vfx-ui-vue";
</script>
```

## Shader

WGSL source is exported as `STARFIELD_SHADER` — read it to learn how the effect works.

## Notes for agents

- Requires a WebGPU-capable browser; the component degrades gracefully otherwise (use the `fallback` prop).
- SSR-safe: rendering on the server produces an inert canvas; init happens on mount.
- `prefers-reduced-motion` freezes animation automatically.
- Uniforms are plain f32 fields; pass them via `uniforms` — no shader edits needed.

# Hero Vortex

Drop-in hero section: centered headline at the eye of a spiral galaxy with star speckles and trailing arms.

## Install

```bash
npm install vfx-ui-vue
```

```vue
<script setup lang="ts">
import { HeroVortex } from "vfx-ui-vue";
</script>

<template>
  <HeroVortex title="Your next big idea." :primary-cta="{ label: 'Get started', href: '/start' }" :secondary-cta="null" interactive />
</template>
```

## Props

- `scheme?: "dark" | "light"`
- `speed?: number`
- `swirl?: number`
- `arms?: number`
- `coreGlow?: number`
- `color?: string`
- `emission?: string`
- `title?: VueNode`
- `subtitle?: VueNode`
- `eyebrow?: string`
- `primaryCta?: string | { label: string; href?: string; onClick?: MouseEventHandler<HTMLButtonElement> } | null`
- `secondaryCta?: string | { label: string; href?: string; onClick?: MouseEventHandler<HTMLButtonElement> } | null`
- `children/default slot?: VueNode (replaces default content)`
- `interactive?: boolean (default false)`
- `className?: string`
- `style?: CSSProperties`
- `fallback?: VueNode`

## Variants

Import the preset bag and bind it with `v-bind`:

```vue
<script setup lang="ts">
import { HERO_VORTEX_PRESETS } from "vfx-ui-vue";
</script>
```

## Shader

WGSL source is exported as `VORTEX_SHADER` — read it to learn how the effect works.

## Notes for agents

- Requires a WebGPU-capable browser; the component degrades gracefully otherwise (use the `fallback` prop).
- SSR-safe: rendering on the server produces an inert canvas; init happens on mount.
- `prefers-reduced-motion` freezes animation automatically.
- Uniforms are plain f32 fields; pass them via `uniforms` — no shader edits needed.

# Iridescent

Silky thin-film interference colors drifting across the surface.

## Install

```bash
npm install vfx-ui-vue
```

```vue
<script setup lang="ts">
import { Iridescent } from "vfx-ui-vue";
</script>

<template>
  <Iridescent />
</template>
```

## Props

- `speed?: number`
- `scale?: number`
- `hueShift?: number`
- `saturation?: number`
- `brightness?: number`
- `interactive?: boolean`
- `className?: string`
- `style?: VfxCanvasProps["style"]`
- `fallback?: VfxCanvasProps["fallback"]`
- `children?: VueNode`

## Variants

Import the preset bag and bind it with `v-bind`:

```vue
<script setup lang="ts">
import { IRIDESCENT_PRESETS } from "vfx-ui-vue";
</script>
```

## Shader

WGSL source is exported as `IRIDESCENT_SHADER` — read it to learn how the effect works.

## Notes for agents

- Requires a WebGPU-capable browser; the component degrades gracefully otherwise (use the `fallback` prop).
- SSR-safe: rendering on the server produces an inert canvas; init happens on mount.
- `prefers-reduced-motion` freezes animation automatically.
- Uniforms are plain f32 fields; pass them via `uniforms` — no shader edits needed.

# Kinetic Text

A pointer-driven force field lifts your words into a soft wave.

## Install

```bash
npm install vfx-ui-vue
```

```vue
<script setup lang="ts">
import { KineticText } from "vfx-ui-vue";
</script>

<template>
  <KineticText />
</template>
```

## Props

- `text?: string`
- `strength?: number`
- `spread?: number`
- `disabled?: boolean`
- `className?: string`
- `style?: CSSProperties`
- `children?: VueNode`

## Notes for agents

- DOM/CSS/Canvas interaction; works without WebGPU. Supply your own content through the documented props.
- SSR-safe: content and navigation render on the server; animation starts after mount.
- `prefers-reduced-motion` skips animation automatically.

# Light Prism

A solid beveled optical prism using Vercel’s complete MIT spectral optics and multi-pass glass pipeline.

## Install

```bash
npm install vfx-ui-vue
```

```vue
<script setup lang="ts">
import { LightPrism } from "vfx-ui-vue";
</script>

<template>
  <div style="height: 520px"><LightPrism interactive /></div>
</template>
```

## Props

- `speed?: number`
- `prismSize?: number`
- `beamWidth?: number`
- `refraction?: number`
- `dispersion?: number`
- `shadow?: number`
- `from?: string`
- `to?: string`
- `accent?: string`
- `interactive?: boolean`
- `className?: string`
- `style?: VfxCanvasProps["style"]`
- `fallback?: VfxCanvasProps["fallback"]`
- `children?: VueNode`

## Variants

Import the preset bag and bind it with `v-bind`:

```vue
<script setup lang="ts">
import { LIGHT_PRISM_PRESETS } from "vfx-ui-vue";
</script>
```

## Notes for agents

- Complete Vercel VGPU MIT light pipeline, including beveled solid geometry, spectral optics, environment and wall baking, and multiple glass passes.
- Source and license are bundled. No remote assets. Use a sized parent; pointer changes beam incidence and camera orbit.
- LIGHT_PRISM_SHADER, to and accent are deprecated compatibility exports/props. The live component uses a multi-pass pipeline and optical spectral colors.

# Liquid Glass

A molten glass annulus with a travelling silhouette and spectral transmission.

## Install

```bash
npm install vfx-ui-vue
```

```vue
<script setup lang="ts">
import { LiquidGlass } from "vfx-ui-vue";
</script>

<template>
  <div style="height: 520px"><LiquidGlass interactive /></div>
</template>
```

## Props

- `speed?: number`
- `distortion?: number`
- `chromatic?: number`
- `scale?: number`
- `interactive?: boolean`
- `className?: string`
- `style?: VfxCanvasProps["style"]`
- `fallback?: VfxCanvasProps["fallback"]`
- `children?: VueNode`

## Variants

Import the preset bag and bind it with `v-bind`:

```vue
<script setup lang="ts">
import { LIQUID_GLASS_PRESETS } from "vfx-ui-vue";
</script>
```

## Shader

WGSL source is exported as `LIQUID_GLASS_SHADER` — read it to learn how the effect works.

## Notes for agents

- Original ray-marched glass solids over procedural studio scenes; arbitrary DOM behind the canvas is not refracted.
- Requires WebGPU. Provide a sized parent. Existing public prop names and preset IDs remain; visual output has changed.
- Pointer tilts the object. Reduced motion freezes time and disables pointer movement. No demonstration text is baked into the shader.
- Configure the documented component props. For raw uniforms, use the exported shader with VfxCanvas instead.

# Magnetic

A gentle magnetic pull for your own buttons, links, and content.

## Install

```bash
npm install vfx-ui-vue
```

```vue
<script setup lang="ts">
import { Magnetic } from "vfx-ui-vue";
</script>

<template>
  <Magnetic />
</template>
```

## Props

- `children?: VueNode`
- `strength?: number`
- `disabled?: boolean`
- `className?: string`
- `style?: CSSProperties`

## Notes for agents

- DOM/CSS/Canvas interaction; works without WebGPU. Supply your own content through the documented props.
- SSR-safe: content and navigation render on the server; animation starts after mount.
- `prefers-reduced-motion` skips animation automatically.

# Mesh Gradient

Voronoi-cell color fields flowing through a curated palette.

## Install

```bash
npm install vfx-ui-vue
```

```vue
<script setup lang="ts">
import { MeshGradient } from "vfx-ui-vue";
</script>

<template>
  <MeshGradient />
</template>
```

## Props

- `speed?: number`
- `scale?: number`
- `softness?: number`
- `from?: string`
- `to?: string`
- `accent?: string`
- `deep?: string`
- `interactive?: boolean`
- `className?: string`
- `style?: VfxCanvasProps["style"]`
- `fallback?: VfxCanvasProps["fallback"]`
- `children?: VueNode`

## Variants

Import the preset bag and bind it with `v-bind`:

```vue
<script setup lang="ts">
import { MESH_GRADIENT_PRESETS } from "vfx-ui-vue";
</script>
```

## Shader

WGSL source is exported as `MESH_GRADIENT_SHADER` — read it to learn how the effect works.

## Notes for agents

- Requires a WebGPU-capable browser; the component degrades gracefully otherwise (use the `fallback` prop).
- SSR-safe: rendering on the server produces an inert canvas; init happens on mount.
- `prefers-reduced-motion` freezes animation automatically.
- Uniforms are plain f32 fields; pass them via `uniforms` — no shader edits needed.

# Particle Field

Procedural cell-hashed particles with drift and size breathing.

## Install

```bash
npm install vfx-ui-vue
```

```vue
<script setup lang="ts">
import { ParticleField } from "vfx-ui-vue";
</script>

<template>
  <ParticleField />
</template>
```

## Props

- `density?: number`
- `speed?: number`
- `size?: number`
- `color?: string`
- `interactive?: boolean`
- `className?: string`
- `style?: VfxCanvasProps["style"]`
- `fallback?: VfxCanvasProps["fallback"]`
- `children?: VueNode`

## Variants

Import the preset bag and bind it with `v-bind`:

```vue
<script setup lang="ts">
import { PARTICLE_PRESETS } from "vfx-ui-vue";
</script>
```

## Shader

WGSL source is exported as `PARTICLE_SHADER` — read it to learn how the effect works.

## Notes for agents

- Requires a WebGPU-capable browser; the component degrades gracefully otherwise (use the `fallback` prop).
- SSR-safe: rendering on the server produces an inert canvas; init happens on mount.
- `prefers-reduced-motion` freezes animation automatically.
- Uniforms are plain f32 fields; pass them via `uniforms` — no shader edits needed.

# Radiant Dots

Orbital emitters with jump-flooded distance fields and radiance cascades.

## Install

```bash
npm install vfx-ui-vue
```

```vue
<script setup lang="ts">
import { RadiantDots } from "vfx-ui-vue";
</script>

<template>
  <div style="height: 520px"><RadiantDots interactive /></div>
</template>
```

## Props

- `layout?: "orbit" | "grid"`
- `motion?: "wave" | "chase" | "pulse"`
- `color?: string`
- `intensity?: number`
- `speed?: number`
- `interactive?: boolean`
- `animate?: boolean`
- `className?: string`
- `style?: CSSProperties`
- `fallback?: VueNode`
- `children?: VueNode`

## Variants

Import the preset bag and bind it with `v-bind`:

```vue
<script setup lang="ts">
import { RADIANT_DOTS_PRESETS } from "vfx-ui-vue";
</script>
```

## Notes for agents

- Requires WebGPU. Render a sized parent and provide fallback for unsupported browsers.
- SSR yields an inert decorative canvas; loading/status text belongs in your own DOM.
- Real jump flood, distance field and radiance cascades adapted from Vercel's MIT example, with original orbit/grid arrangements.
- Working field capped at 320px; animation capped at 30fps and suspended offscreen, in hidden tabs and under reduced motion.
- animate=false or speed=0 freezes time; changes to other props still redraw the paused field.

# Ribbon Field

Three Gaussian light ribbons over a dot-matrix grid with bloom and grain — WGSL port of ThreeUI's RibbonField (MIT, Copyright 2026 Meng To).

## Install

```bash
npm install vfx-ui-vue
```

```vue
<script setup lang="ts">
import { RibbonField } from "vfx-ui-vue";
</script>

<template>
  <RibbonField />
</template>
```

## Props

- `speed?: number`
- `intensity?: number`
- `drift?: number`
- `grain?: number`
- `interactive?: boolean`
- `className?: string`
- `style?: VfxCanvasProps["style"]`
- `fallback?: VfxCanvasProps["fallback"]`
- `children?: VueNode`

## Variants

Import the preset bag and bind it with `v-bind`:

```vue
<script setup lang="ts">
import { RIBBON_FIELD_PRESETS } from "vfx-ui-vue";
</script>
```

## Shader

WGSL source is exported as `RIBBON_FIELD_SHADER` — read it to learn how the effect works.

## Notes for agents

- Requires a WebGPU-capable browser; the component degrades gracefully otherwise (use the `fallback` prop).
- SSR-safe: rendering on the server produces an inert canvas; init happens on mount.
- `prefers-reduced-motion` freezes animation automatically.
- Uniforms are plain f32 fields; pass them via `uniforms` — no shader edits needed.

# Spectral Card

Holographic light and spatial tilt around your own content.

## Install

```bash
npm install vfx-ui-vue
```

```vue
<script setup lang="ts">
import { SpectralCard } from "vfx-ui-vue";
</script>

<template>
  <SpectralCard />
</template>
```

## Props

- `children?: VueNode`
- `tilt?: number`
- `glare?: number`
- `radius?: number`
- `disabled?: boolean`
- `className?: string`
- `style?: CSSProperties`

## Notes for agents

- DOM/CSS/Canvas interaction; works without WebGPU. Supply your own content through the documented props.
- SSR-safe: content and navigation render on the server; animation starts after mount.
- `prefers-reduced-motion` skips animation automatically.

# Starfield

Hashed star grid with twinkle and slow parallax drift.

## Install

```bash
npm install vfx-ui-vue
```

```vue
<script setup lang="ts">
import { Starfield } from "vfx-ui-vue";
</script>

<template>
  <Starfield />
</template>
```

## Props

- `density?: number`
- `speed?: number`
- `twinkle?: number`
- `color?: string`
- `interactive?: boolean`
- `className?: string`
- `style?: VfxCanvasProps["style"]`
- `fallback?: VfxCanvasProps["fallback"]`
- `children?: VueNode`

## Variants

Import the preset bag and bind it with `v-bind`:

```vue
<script setup lang="ts">
import { STARFIELD_PRESETS } from "vfx-ui-vue";
</script>
```

## Shader

WGSL source is exported as `STARFIELD_SHADER` — read it to learn how the effect works.

## Notes for agents

- Requires a WebGPU-capable browser; the component degrades gracefully otherwise (use the `fallback` prop).
- SSR-safe: rendering on the server produces an inert canvas; init happens on mount.
- `prefers-reduced-motion` freezes animation automatically.
- Uniforms are plain f32 fields; pass them via `uniforms` — no shader edits needed.

# Vortex

Spiral galaxy swirl with star speckles and trailing arms.

## Install

```bash
npm install vfx-ui-vue
```

```vue
<script setup lang="ts">
import { Vortex } from "vfx-ui-vue";
</script>

<template>
  <Vortex />
</template>
```

## Props

- `speed?: number`
- `swirl?: number`
- `arms?: number`
- `coreGlow?: number`
- `color?: string`
- `emission?: string`
- `interactive?: boolean`
- `className?: string`
- `style?: VfxCanvasProps["style"]`
- `fallback?: VfxCanvasProps["fallback"]`
- `children?: VueNode`

## Variants

Import the preset bag and bind it with `v-bind`:

```vue
<script setup lang="ts">
import { VORTEX_PRESETS } from "vfx-ui-vue";
</script>
```

## Shader

WGSL source is exported as `VORTEX_SHADER` — read it to learn how the effect works.

## Notes for agents

- Requires a WebGPU-capable browser; the component degrades gracefully otherwise (use the `fallback` prop).
- SSR-safe: rendering on the server produces an inert canvas; init happens on mount.
- `prefers-reduced-motion` freezes animation automatically.
- Uniforms are plain f32 fields; pass them via `uniforms` — no shader edits needed.

# Wave Background

Three layered sine bands sweeping over a tri-color gradient. GPU-rendered via WebGPU; DOM cannot reproduce it.

## Install

```bash
npm install vfx-ui-vue
```

```vue
<script setup lang="ts">
import { WaveBackground } from "vfx-ui-vue";
</script>

<template>
  <WaveBackground />
</template>
```

## Props

- `speed?: number`
- `amplitude?: number`
- `frequency?: number`
- `from?: string`
- `to?: string`
- `accent?: string`
- `interactive?: boolean`
- `className?: string`
- `style?: VfxCanvasProps["style"]`
- `fallback?: VfxCanvasProps["fallback"]`
- `children?: VueNode`

## Shader

WGSL source is exported as `WAVE_SHADER` — read it to learn how the effect works.

## Notes for agents

- Requires a WebGPU-capable browser; the component degrades gracefully otherwise (use the `fallback` prop).
- SSR-safe: rendering on the server produces an inert canvas; init happens on mount.
- `prefers-reduced-motion` freezes animation automatically.
- Uniforms are plain f32 fields; pass them via `uniforms` — no shader edits needed.
