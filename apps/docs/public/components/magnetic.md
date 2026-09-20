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
