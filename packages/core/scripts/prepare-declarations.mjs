import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const declaration = fileURLToPath(new URL("../dist/types/index.d.ts", import.meta.url));
const reference = '/// <reference types="@webgpu/types" />\n';
const contents = readFileSync(declaration, "utf8");
if (!contents.startsWith(reference)) writeFileSync(declaration, reference + contents);
