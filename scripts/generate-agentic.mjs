#!/usr/bin/env node
/**
 * Agentic docs generator (M4 differentiator).
 *
 * Reads the built registry (registry/dist) and emits machine-consumable
 * documentation: llms.txt (index), agents.md, and one .md per component
 * with props, variants, usage, and pitfalls — so coding agents can pick
 * and integrate components without browsing a website.
 *
 * Usage: node scripts/generate-agentic.mjs [--out <dir>]
 */
import { existsSync, readFileSync, readdirSync, rmSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const registryDir = join(root, "registry", "dist");
const outDir = process.argv.includes("--out")
  ? resolve(process.argv[process.argv.indexOf("--out") + 1])
  : join(root, "apps", "docs", "public");

if (!existsSync(join(registryDir, "index.json"))) {
  console.error("agentic: registry/dist/index.json missing — run `node registry/build.mjs` first.");
  process.exit(1);
}

const index = JSON.parse(readFileSync(join(registryDir, "index.json"), "utf8"));

function itemDoc(name) {
  const item = JSON.parse(readFileSync(join(registryDir, "r", `${name}.json`), "utf8"));
  // The item's own component lands at components/<Name>.tsx; every dependency
  // (shared runtime + base shaders) is namespaced under components/vfx/.
  const componentFile = item.files.find((f) => (f.target ?? f.path).endsWith(".tsx") && !(f.target ?? f.path).includes("vfx/"));
  const source = componentFile?.content ?? "";
  const propsMatch = source.match(/export interface (\w+Props)[^{]*\{([\s\S]*?)\n\}/);
  const presetsMatch = source.match(/export const (\w+_PRESETS)/);
  // Shader detection spans the whole bundle: heroes carry their base shader's
  // WGSL export inside the embedded vfx/ dependency file.
  const shaderMatch = source.match(/export const (\w+_SHADER)/)
    ?? item.files.map((f) => f.content.match(/export const (\w+_SHADER)/)).find(Boolean);
  const inheritedContent = /extends HeroContentProps/.test(source) ? [
    "title?: VueNode", "subtitle?: VueNode", "eyebrow?: string",
    "primaryCta?: string | { label: string; href?: string; onClick?: MouseEventHandler<HTMLButtonElement> } | null",
    "secondaryCta?: string | { label: string; href?: string; onClick?: MouseEventHandler<HTMLButtonElement> } | null",
    "children/default slot?: VueNode (replaces default content)", "interactive?: boolean (default false)",
    "className?: string", "style?: CSSProperties", ...(/StudioHeroFrame/.test(source) ? [] : ["fallback?: VueNode"]),
  ] : [];
  const props = propsMatch
    ? propsMatch[2]
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l && !l.startsWith("/") && !l.startsWith("*"))
        .map((l) => l.replace(/\s*;$/, ""))
    : [];
  props.push(...inheritedContent);
  if (/extends FooterContentProps/.test(source)) props.push(
    "brand?: string (artwork is generated from your text)", "title?: VueNode", "description?: VueNode",
    "cta?: { label: string; href: string } | null", "groups?: readonly { label: string; links: readonly { label: string; href: string }[] }[]",
    "legal?: readonly { label: string; href: string }[]", "copyright?: VueNode",
    "children/default slot?: VueNode (replaces introduction and navigation)", "interactive?: boolean (default true)",
    "className?: string", "style?: CSSProperties (--vfx-footer-display sets the brand font)",
  );
  const isOptical = ["glass-card", "glass-lens", "liquid-glass", "light-prism"].includes(name);
  const isRadiance = name === "radiant-dots";
  const deps = item.dependencies ?? [];
  const needsVgpu = deps.some((d) => d.startsWith("vgpu"));
  // vgpu and cobe are runtime dependencies of vfx-ui-vue; consumers only
  // install the public package (Vue remains its peer dependency).
  const extraDeps = deps.filter((d) => !d.startsWith("vgpu") && !d.startsWith("vue@") && !d.startsWith("cobe@"));
  const lines = [
    `# ${item.title ?? name}`,
    "",
    item.description ?? "",
    "",
    "## Install",
    "",
    "```bash",
    `npm install vfx-ui-vue${extraDeps.length ? ` ${extraDeps.join(" ")}` : ""}`,
    "```",
    "",
    "```vue",
    `<script setup lang="ts">`,
    `import { ${nameToComponent(name)} } from "vfx-ui-vue";`,
    `</script>`,
    "",
    `<template>`,
    ...(name.startsWith("hero-") ? [
      `  <${nameToComponent(name)} title="Your next big idea." :primary-cta="{ label: 'Get started', href: '/start' }" :secondary-cta="null" interactive />`,
    ] : name.startsWith("footer-") ? [
      `  <${nameToComponent(name)} brand="YOUR BRAND" title="Let’s talk." :cta="{ label: 'Contact', href: 'mailto:hello@example.com' }" copyright="© Your studio" />`,
    ] : isOptical || isRadiance || name === "astra-field" ? [`  <div style="height: 520px"><${nameToComponent(name)} interactive /></div>`] : [`  <${nameToComponent(name)} />`]),
    `</template>`,
    "```",
    "",
    "## Props",
    "",
    ...(props.length ? props.map((p) => `- \`${p}\``) : ["(see source)"]),
    "",
  ];
  if (presetsMatch) {
    lines.push("## Variants", "", "Import the preset bag and bind it with `v-bind`:", "", "```vue", `<script setup lang="ts">`, `import { ${presetsMatch[1]} } from "vfx-ui-vue";`, `</script>`, "```", "");
  }
  if (shaderMatch && name !== "light-prism") {
    lines.push("## Shader", "", `WGSL source is exported as \`${shaderMatch[1]}\` — read it to learn how the effect works.`, "");
  }
  lines.push(
    "## Notes for agents",
    "",
    ...(name === "astra-field" ? [
      "- Original WebGL spiral star field inspired by OpenAI Astra. No external assets or Three.js dependency.",
      "- Stars gather from a scattered 3D cloud on mount. intro defaults to true; introDuration defaults to 4.8 seconds, independent of ambient speed. Reduced motion skips assembly.",
      "- Drag or use arrow keys to orbit; Home resets. Place your own copy in a sibling DOM layer.",
      "- Offscreen and hidden tabs pause. Reduced motion freezes ambient movement. Provide a sized parent.",
    ] : name === "light-prism" ? [
      "- Complete Vercel VGPU MIT light pipeline, including beveled solid geometry, spectral optics, environment and wall baking, and multiple glass passes.",
      "- Source and license are bundled. No remote assets. Use a sized parent; pointer changes beam incidence and camera orbit.",
      "- LIGHT_PRISM_SHADER, to and accent are deprecated compatibility exports/props. The live component uses a multi-pass pipeline and optical spectral colors.",
    ] : isRadiance ? [
      "- Requires WebGPU. Render a sized parent and provide fallback for unsupported browsers.",
      "- SSR yields an inert decorative canvas; loading/status text belongs in your own DOM.",
      "- Real jump flood, distance field and radiance cascades adapted from Vercel's MIT example, with original orbit/grid arrangements.",
      "- Working field capped at 320px; animation capped at 30fps and suspended offscreen, in hidden tabs and under reduced motion.",
      "- animate=false or speed=0 freezes time; changes to other props still redraw the paused field.",
    ] : isOptical ? [
      "- Original ray-marched glass solids over procedural studio scenes; arbitrary DOM behind the canvas is not refracted.",
      "- Requires WebGPU. Provide a sized parent. Existing public prop names and preset IDs remain; visual output has changed.",
      "- Pointer tilts the object. Reduced motion freezes time and disables pointer movement. No demonstration text is baked into the shader.",
      "- Configure the documented component props. For raw uniforms, use the exported shader with VfxCanvas instead.",
    ] : shaderMatch
      ? [
          "- Requires a WebGPU-capable browser; the component degrades gracefully otherwise (use the `fallback` prop).",
          "- SSR-safe: rendering on the server produces an inert canvas; init happens on mount.",
          "- `prefers-reduced-motion` freezes animation automatically.",
          "- Uniforms are plain f32 fields; pass them via `uniforms` — no shader edits needed.",
        ]
      : [
          needsVgpu || extraDeps.length ? "- Rendered with a third-party runtime (see Install dependencies)." : "- DOM/CSS/Canvas interaction; works without WebGPU. Supply your own content through the documented props.",
          "- SSR-safe: content and navigation render on the server; animation starts after mount.",
          "- `prefers-reduced-motion` skips animation automatically.",
        ]),
    "",
  );
  return lines.join("\n");
}

function nameToComponent(name) {
  return name.split("-").map((s) => s[0].toUpperCase() + s.slice(1)).join("");
}

function main() {
  mkdirSync(join(outDir, "components"), { recursive: true });
  const names = readdirSync(join(registryDir, "r")).map((f) => f.replace(/\.json$/, ""));

  const llms = [
    "# vfx-ui-vue",
    "",
    "> Shader-native visual effect components for Vue 3, rendered via WebGPU (vgpu).",
    "> Expressive hero and footer sections, GPU backgrounds, and focused DOM interactions for your own content.",
    "",
    "## Install",
    "",
    "```bash",
    "npm install vfx-ui-vue",
    "```",
    "",
    "## Component catalog",
    "",
    ...index.items.map((it) => `- [${it.title}](https://vfx.2t.hk/components/${it.name}.md): ${it.description}`),
    "",
    "## Per-component docs (machine-readable)",
    "",
    ...names.map((n) => `- https://vfx.2t.hk/components/${n}.md`),
    "",
    "## Scope guard",
    "",
    "This library focuses on customizable hero and footer sections, supported by GPU visuals and focused interactions.",
    "Hero sample copy is replaceable. Pass title/subtitle or children and configure CTA href/onClick.",
    "Footer sample copy is replaceable. Configure brand, title, CTA, groups, legal links and copyright. Supply children for your own introduction/navigation layout.",
    "DOM interaction components do not require WebGPU. This is not a general-purpose UI kit.",
    "",
  ].join("\n");
  writeFileSync(join(outDir, "llms.txt"), llms);

  const agents = [
    "# vfx-ui-vue — agent guide",
    "",
    llms,
    "",
    ...names.map((n) => itemDoc(n)),
  ].join("\n");
  writeFileSync(join(outDir, "agents.md"), agents);

  for (const n of names) {
    writeFileSync(join(outDir, "components", `${n}.md`), itemDoc(n));
  }
  // Drop stale docs for components that no longer exist in the registry.
  const keep = new Set(names.map((n) => `${n}.md`));
  for (const f of readdirSync(join(outDir, "components"))) {
    if (f.endsWith(".md") && !keep.has(f)) rmSync(join(outDir, "components", f));
  }
  console.log(`agentic: wrote llms.txt, agents.md, and ${names.length} component docs to ${outDir}`);
}

main();
