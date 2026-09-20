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
