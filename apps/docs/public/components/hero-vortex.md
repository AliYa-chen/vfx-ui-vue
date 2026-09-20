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
