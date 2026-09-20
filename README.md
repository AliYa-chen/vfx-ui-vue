# vfx-ui-vue

**Expressive Vue 3 components: GPU atmospheres, customizable Hero and Footer sections, and tactile content interactions.** Explore the real effects, tune their props, and bring your own words, images, links, and buttons.

GPU effects use [vgpu](https://github.com/vercel-labs/vgpu). The Footers, Magnetic, SpectralCard, and KineticText use DOM/CSS/Canvas and work without WebGPU. All ship as TypeScript Vue 3 components and copy-paste registry items.

```bash
npm install vfx-ui-vue
```

```vue
<script setup lang="ts">
import { WaveBackground } from "vfx-ui-vue";
</script>

<template>
  <section class="hero">
    <WaveBackground />
    <h1>GPU effects, native Vue.</h1>
  </section>
</template>
```

## The catalog

| Category | Components |
|---|---|
| Heroes | HeroEclipse · HeroContour · HeroFluid · HeroAurora · HeroFiber · HeroGlobe · HeroMesh · HeroIridescent · HeroVortex · HeroRibbon · HeroParticles · HeroStarfield · HeroBlackHole · HeroChroma |
| Footers | FooterVinyl · FooterTidal · FooterFold · FooterPhosphor |
| Backgrounds | AstraField · RadiantDots · BlackHole · WaveBackground · FluidGradient · Aurora · Starfield · ParticleField · MeshGradient · Iridescent · Vortex · RibbonField · FiberFlow · ChromaFlow |
| Glass | GlassCard · LiquidGlass · GlassLens · LightPrism |
| Interactions | SpectralCard · Magnetic |
| Text | KineticText |

Components ship typed props, SSR-safe rendering and `prefers-reduced-motion` handling. GPU effects include presets and a fallback for unsupported browsers; Footers expose brand, content, navigation and colors.

## What it is not

The library focuses on visual atmosphere and content interaction, not general UI primitives or full-page templates. Hero sample copy is replaceable: pass `title`/`subtitle`, configure CTA objects with `href` or `onClick`, or use the default slot to replace the content layout.

## Copy-paste instead of install

```bash
npx @vfx-ui-vue/cli add wave-background liquid-glass
npm install vue@^3.5.0 vgpu@0.3.1
```

Self-contained sources land in `components/` — you own the code. Registry follows the [shadcn registry format](https://ui.shadcn.com/docs/registry); index at [`registry/dist/index.json`](registry/dist/index.json).

## For AI agents

Machine-readable docs: [`public/llms.txt`](apps/docs/public/llms.txt), [`public/agents.md`](apps/docs/public/agents.md), and one markdown doc per component (props, variants, guardrails). Deterministic GPU testing is built in — `vgpu/mock` + Dawn readback pixel tests run in CI without a GPU.

## Development

```bash
pnpm install
pnpm -r typecheck && pnpm -r test   # deterministic tests incl. Dawn pixel readback
pnpm -r build
pnpm dev:docs                        # catalog at localhost:5173
node registry/build.mjs              # rebuild copy-paste registry from sources
node registry/validate.mjs           # compile every standalone Vue TSX bundle
node scripts/generate-agentic.mjs    # rebuild llms.txt / agents.md
```

Monorepo: `packages/core` (vgpu-backed renderer contract) · `packages/vue` (components) · `packages/cli` · `apps/docs` (catalog site) · `registry` · `scripts`.

## Website deployment

[vfx.2t.hk](https://vfx.2t.hk) is hosted by the Cloudflare Pages project
`vfx-ui-vue`, connected directly to this GitHub repository. Every push to `main`
automatically rebuilds and publishes the landing page, component catalog,
copy-paste registry, and agent documentation. Local edits must be committed and
pushed to trigger an update. Preview branch deployments are disabled.

Pages build settings: repository root, Node.js `22`, pnpm `8.15.9`, output
`apps/docs/dist`, and this build command:

```sh
node registry/build.mjs && node scripts/generate-agentic.mjs && mkdir -p apps/docs/public/r && cp registry/dist/r/*.json apps/docs/public/r/ && cp registry/dist/index.json apps/docs/public/r/index.json && pnpm --filter @vfx-ui-vue/docs build
```

The `Check docs build` GitHub workflow validates builds; Cloudflare handles
publishing through its GitHub integration without a GitHub Actions API token.
Custom domains are configured in Pages and use proxied CNAME records pointing
to `vfx-ui-vue.pages.dev`. This is the sole Pages project for this website.

## License & credits

MIT. The docs shell is derived from [MengTo/threeui](https://github.com/MengTo/threeui) (MIT, © 2026 Meng To) — thank you for showing what a component catalog can be. Renderer core: [vercel-labs/vgpu](https://github.com/vercel-labs/vgpu) (MIT). HeroGlobe uses [shuding/cobe](https://github.com/shuding/cobe) (MIT).

## Footers

`FooterVinyl` closes on a responsive record sleeve, `FooterTidal` draws copper tidal lines beneath your wordmark, `FooterFold` prints it across hinged paper panels, and `FooterPhosphor` builds it from light cells that scatter around the pointer. All four are complete semantic footers, with real DOM navigation and a static reduced-motion composition.

```vue
<script setup lang="ts">
import { FooterTidal } from "vfx-ui-vue";
</script>

<template>
  <FooterTidal
    brand="YOUR STUDIO"
    title="Let’s talk."
    :cta="{ label: 'Contact', href: 'mailto:hello@example.com' }"
    :groups="[{ label: 'Explore', links: [{ label: 'Work', href: '/work' }] }]"
    copyright="© Your studio"
  />
</template>
```

Use your own destinations and copy. The default slot replaces the introduction and navigation while retaining the artwork and legal row. The font inherits your site; `--vfx-footer-display` overrides the wordmark face.

LiveChart, WebGlobe and EnergyOrb have been removed from the current source and install catalog. Their old exports and routes are no longer available. HeroGlobe remains supported.

### Optical glass and radiance

The Glass collection now uses original ray-marched solids: a beveled card, a biconvex lens, a molten loop, and a triangular glass frame. Rays cross entry and exit interfaces, with spectral transmission and studio reflections. These are procedural scenes, not filters that refract arbitrary DOM. Existing exports and preset URLs remain available; their appearance has changed.

`RadiantDots` adds an orbital or square light field with real jump-flooded distance fields and radiance cascades. The pipeline is adapted from [Vercel's MIT example](https://vgpu.labs.vercel.dev/examples/agent-radiance-cascades); the arrangement and choreography are VFX UI VUE's. It suspends continuous rendering offscreen, in hidden tabs, and under reduced motion. See [the design and implementation record](docs/design/glass.md).
