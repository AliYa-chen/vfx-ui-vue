#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { copyFileSync, mkdirSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const runNode = (script) => execFileSync(process.execPath, [join(root, script)], {
  cwd: root,
  stdio: "inherit",
});

runNode("registry/build.mjs");
runNode("registry/validate.mjs");
runNode("scripts/generate-agentic.mjs");

const registryDir = join(root, "registry", "dist");
const publicRegistryDir = join(root, "apps", "docs", "public", "r");
mkdirSync(publicRegistryDir, { recursive: true });

for (const file of readdirSync(join(registryDir, "r"))) {
  if (file.endsWith(".json")) {
    copyFileSync(join(registryDir, "r", file), join(publicRegistryDir, file));
  }
}
copyFileSync(join(registryDir, "index.json"), join(publicRegistryDir, "index.json"));

console.log("site: staged registry and generated documentation");
