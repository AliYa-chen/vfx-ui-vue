# vfx-ui-vue-cli

Copy-paste [vfx-ui-vue](https://vfx.2t.hk) shader components into your project (shadcn registry format). Self-contained sources land in `components/` — you own the code.

## Usage

```bash
npx vfx-ui-vue-cli add wave-background
npx vfx-ui-vue-cli add wave-background fluid-gradient --overwrite
npx vfx-ui-vue-cli add hero-fluid --registry https://vfx.2t.hk/r
```

The default registry is `https://vfx.2t.hk/r`; pass `--registry <url|dir>` to point elsewhere (e.g. a locally built `registry/dist/r`).

After adding, install the Vue and WebGPU runtime dependencies:

```bash
npm install vue@^3.5.0 vgpu@0.3.1
```

Then enable `@vitejs/plugin-vue-jsx` and import from `components/vfx/*`. See the [component gallery](https://vfx.2t.hk/components) for the full catalog.

## License

MIT — © vfx-ui-vue contributors.
