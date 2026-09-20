#!/usr/bin/env node
/** Compile every generated copy-paste entry as an independent Vue TSX graph. */
import { readFileSync } from "node:fs";
import { dirname, join, posix, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const registryDir = join(root, "registry", "dist", "r");
const index = JSON.parse(readFileSync(join(root, "registry", "dist", "index.json"), "utf8"));
if (index.name !== "vfx-ui-vue") throw new Error(`Unexpected registry name: ${index.name}`);

for (const entry of index.items) {
  const item = JSON.parse(readFileSync(join(registryDir, `${entry.name}.json`), "utf8"));
  const files = new Map(item.files.map((file) => [file.target ?? file.path, file.content]));
  const entryPath = `components/${entry.name.split("-").map((part) => part[0].toUpperCase() + part.slice(1)).join("")}.tsx`;
  if (!files.has(entryPath)) throw new Error(`${entry.name}: missing ${entryPath}`);
  const legacyPackage = ["@", "vfx", "-", "ui", "/", "react"].join("");
  const legacyDomain = ["vfx", "-", "ui", ".", "com"].join("");
  if ([...files.values()].some((content) => content.includes(legacyPackage) || content.includes(legacyDomain))) {
    throw new Error(`${entry.name}: legacy package or domain in generated source`);
  }

  await build({
    entryPoints: [entryPath],
    bundle: true,
    write: false,
    platform: "browser",
    format: "esm",
    jsx: "automatic",
    jsxImportSource: "vue",
    plugins: [{
      name: "registry-files",
      setup(plugin) {
        plugin.onResolve({ filter: /.*/ }, (args) => {
          if (args.kind === "entry-point") return { path: args.path, namespace: "registry" };
          if (!args.path.startsWith(".")) {
            return /^(vue(?:\/jsx-runtime)?|vgpu(?:\/scene)?|cobe)$/.test(args.path)
              ? { path: args.path, external: true }
              : { errors: [{ text: `undeclared external dependency ${args.path}` }] };
          }
          const requested = posix.normalize(posix.join(posix.dirname(args.importer), args.path));
          const path = [requested, `${requested}.tsx`, `${requested}.ts`].find((candidate) => files.has(candidate));
          return path
            ? { path, namespace: "registry" }
            : { errors: [{ text: `missing registry file ${requested}` }] };
        });
        plugin.onLoad({ filter: /.*/, namespace: "registry" }, (args) => ({
          contents: files.get(args.path),
          loader: args.path.endsWith(".tsx") ? "tsx" : "ts",
        }));
      },
    }],
  });
}

console.log(`registry: validated ${index.items.length} independent Vue TSX bundles`);
