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
