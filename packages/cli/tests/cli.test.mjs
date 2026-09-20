import assert from "node:assert/strict";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const cli = fileURLToPath(new URL("../bin/cli.mjs", import.meta.url));
const workspace = mkdtempSync(join(tmpdir(), "vfx-ui-vue-cli-"));
const registry = join(workspace, "registry");
const project = join(workspace, "project");
mkdirSync(registry);
mkdirSync(project);

const run = (...args) => spawnSync(process.execPath, [cli, ...args], {
  cwd: project,
  encoding: "utf8",
});

writeFileSync(join(registry, "safe.json"), JSON.stringify({
  files: [{ target: "components/vfx/Safe.tsx", content: "export const safe = true;\n" }],
}));
let result = run("add", "safe", "--registry", registry);
assert.equal(result.status, 0, result.stderr || result.stdout);
assert.match(readFileSync(join(project, "components/vfx/Safe.tsx"), "utf8"), /safe = true/);

writeFileSync(join(registry, "escape.json"), JSON.stringify({
  files: [{ target: "../escaped.ts", content: "export const escaped = true;\n" }],
}));
result = run("add", "escape", "--registry", registry);
assert.notEqual(result.status, 0);
assert.match(result.stdout, /escapes the project directory/);
assert.equal(existsSync(join(workspace, "escaped.ts")), false);

result = run("add", "missing", "--registry", registry);
assert.notEqual(result.status, 0);
assert.match(result.stdout, /registry item not found/);

console.log("cli: safe writes pass; traversal and missing items fail closed");
