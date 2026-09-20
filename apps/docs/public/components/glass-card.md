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
