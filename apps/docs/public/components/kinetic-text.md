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
