# vfx-ui-vue-core

Renderer core for [vfx-ui-vue](https://vfx.2t.hk): the vgpu-backed WebGPU effect renderer with deterministic test support (`vgpu/mock` + Dawn pixel readback). You normally don't install this directly — use [`vfx-ui-vue`](https://www.npmjs.com/package/vfx-ui-vue), which depends on it.

## What's inside

- `renderer.ts` — effect lifecycle on top of [vgpu](https://github.com/vercel-labs/vgpu) (device acquire, pipeline setup, frame loop, cleanup)
- `capability.ts` — WebGPU feature/adapter probing and fallback signaling
- `report.ts` — deterministic frame report used by the pixel-readback tests
- `types.ts` — shared contract between core and the Vue components

## Install

```bash
npm install vfx-ui-vue-core vgpu@0.3.1
```

## License

MIT — © vfx-ui-vue contributors.
