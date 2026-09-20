# Footer Tidal

Copper tidal lines beneath your brand, with pointer-driven currents.

## Install

```bash
npm install vfx-ui-vue
```

```vue
<script setup lang="ts">
import { FooterTidal } from "vfx-ui-vue";
</script>

<template>
  <FooterTidal brand="YOUR BRAND" title="Let’s talk." :cta="{ label: 'Contact', href: 'mailto:hello@example.com' }" copyright="© Your studio" />
</template>
```

## Props

- `color?: string`
- `background?: string`
- `animate?: boolean`
- `brand?: string (artwork is generated from your text)`
- `title?: VueNode`
- `description?: VueNode`
- `cta?: { label: string; href: string } | null`
- `groups?: readonly { label: string; links: readonly { label: string; href: string }[] }[]`
- `legal?: readonly { label: string; href: string }[]`
- `copyright?: VueNode`
- `children/default slot?: VueNode (replaces introduction and navigation)`
- `interactive?: boolean (default true)`
- `className?: string`
- `style?: CSSProperties (--vfx-footer-display sets the brand font)`

## Notes for agents

- DOM/CSS/Canvas interaction; works without WebGPU. Supply your own content through the documented props.
- SSR-safe: content and navigation render on the server; animation starts after mount.
- `prefers-reduced-motion` skips animation automatically.
