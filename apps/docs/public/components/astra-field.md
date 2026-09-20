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
