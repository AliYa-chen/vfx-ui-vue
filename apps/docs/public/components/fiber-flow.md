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
