#!/usr/bin/env node
/**
 * vfx-ui-vue CLI — copy-paste shader components (shadcn registry format).
 *
 *   npx vfx-ui-vue-cli add wave-background
 *   npx vfx-ui-vue-cli add wave-background fluid-gradient --overwrite
 *   npx vfx-ui-vue-cli add wave-background --registry ./registry/dist/r
 *
 * Zero runtime dependencies by design: the CLI must run anywhere npx runs.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve, sep } from "node:path";
import process from "node:process";

const DEFAULT_REGISTRY = "https://vfx.2t.hk/r";
const TARGET_ROOT = "components/vfx";

function parseArgs(argv) {
  const names = [];
  let registry = DEFAULT_REGISTRY;
  let overwrite = false;
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "add") continue; // subcommand
    if (a === "--registry") registry = argv[++i] ?? registry;
    else if (a === "--overwrite") overwrite = true;
    else if (a === "-h" || a === "--help") names.push("__help");
    else names.push(a);
  }
  return { names, registry, overwrite };
}

async function fetchItem(registry, name) {
  if (!/^[a-z0-9][a-z0-9-]*$/.test(name)) {
    throw new Error(`invalid component name: ${name}`);
  }
  const isUrl = /^https?:\/\//.test(registry);
  const url = isUrl ? `${registry.replace(/\/$/, "")}/${name}.json` : resolve(registry, `${name}.json`);
  const res = isUrl ? await fetch(url) : { ok: existsSync(url), json: async () => JSON.parse(readFileSync(url, "utf8")) };
  if (!res.ok) throw new Error(`registry item not found: ${url}`);
  return res.json();
}

function writeFiles(item, overwrite) {
  const written = [];
  const projectRoot = resolve(process.cwd());
  for (const file of item.files ?? []) {
    const requested = file.target ?? file.path;
    if (typeof requested !== "string" || typeof file.content !== "string") {
      throw new Error("registry item contains an invalid file entry");
    }
    const target = resolve(projectRoot, requested);
    if (!target.startsWith(`${projectRoot}${sep}`)) {
      throw new Error(`registry file escapes the project directory: ${requested}`);
    }
    if (existsSync(target) && !overwrite) {
      console.log(`  skip (exists, use --overwrite): ${target}`);
      continue;
    }
    mkdirSync(resolve(target, ".."), { recursive: true });
    writeFileSync(target, file.content);
    written.push(target);
  }
  return written;
}

async function main() {
  const { names, registry, overwrite } = parseArgs(process.argv.slice(2));
  if (!names.length || names.includes("__help")) {
    console.log(`vfx-ui-vue — shader effect components for Vue 3 (WebGPU via vgpu)

Usage:
  npx vfx-ui-vue-cli add <component> [more...] [--overwrite] [--registry <url|dir>]

Components: wave-background, fluid-gradient, aurora, starfield, particle-field,
glass-card, liquid-glass, footer-tidal, footer-fold, footer-phosphor

After adding, install the runtime dependencies:
  npm install vue@^3.5.0 vgpu@0.3.1

The copied components use Vue TSX. Enable @vitejs/plugin-vue-jsx in Vite.
`);
    return;
  }

  let failed = false;
  for (const name of names) {
    process.stdout.write(`add ${name} … `);
    let item;
    try {
      item = await fetchItem(registry, name);
    } catch (err) {
      console.log(`failed: ${err.message}`);
      failed = true;
      continue;
    }
    try {
      const written = writeFiles(item, overwrite);
      console.log(`${written.length} file(s) → ${TARGET_ROOT}/`);
      for (const w of written) console.log(`  + ${w}`);
    } catch (err) {
      console.log(`failed: ${err.message}`);
      failed = true;
    }
  }
  if (failed) process.exitCode = 1;
  console.log("\nNext: npm install vue@^3.5.0 vgpu@0.3.1, enable @vitejs/plugin-vue-jsx, then import from components/vfx/*.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
