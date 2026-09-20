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
