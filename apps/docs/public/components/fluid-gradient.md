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
