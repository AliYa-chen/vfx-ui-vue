# Hero Contour

A seeded topographic paper landscape that lifts around the pointer.

## Install

```bash
npm install vfx-ui-vue
```

```vue
<script setup lang="ts">
import { HeroContour } from "vfx-ui-vue";
</script>

<template>
  <HeroContour title="Your next big idea." :primary-cta="{ label: 'Get started', href: '/start' }" :secondary-cta="null" interactive />
</template>
```

## Props

- `color?: string`
- `background?: string`
- `seed?: number`
- `relief?: number`
- `title?: VueNode`
- `subtitle?: VueNode`
- `eyebrow?: string`
- `primaryCta?: string | { label: string; href?: string; onClick?: MouseEventHandler<HTMLButtonElement> } | null`
- `secondaryCta?: string | { label: string; href?: string; onClick?: MouseEventHandler<HTMLButtonElement> } | null`
- `children/default slot?: VueNode (replaces default content)`
- `interactive?: boolean (default false)`
- `className?: string`
- `style?: CSSProperties`

## Notes for agents

- DOM/CSS/Canvas interaction; works without WebGPU. Supply your own content through the documented props.
- SSR-safe: content and navigation render on the server; animation starts after mount.
- `prefers-reduced-motion` skips animation automatically.
