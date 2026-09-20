import { useState } from "vfx-ui-vue/compat";
import { CopyIcon } from "./icons";
import { SyntaxHighlightedCode } from "./SyntaxHighlightedCode";

export const INSTALL_COMMANDS = {
  npm: "npm install vfx-ui-vue",
  pnpm: "pnpm add vfx-ui-vue",
  bun: "bun add vfx-ui-vue",
  yarn: "yarn add vfx-ui-vue",
} as const;

type PackageManager = keyof typeof INSTALL_COMMANDS;

type InstallationStepsProps = {
  importName: string;
  onNotify: (message: string) => void;
};

async function copyText(text: string) {
  await navigator.clipboard.writeText(text);
}

export function InstallationSteps({ importName, onNotify }: InstallationStepsProps) {
  const [packageManager, setPackageManager] = useState<PackageManager>("npm");

  return (
    <div class="steps">
      <div class="step">
        <div class="num card">1</div>
        <div class="h3row"><h3>Install the package</h3></div>
        <p>Add vfx-ui-vue and its Vue 3 peer dependency to your project:</p>
        <div class="code-card card">
          <div class="tabbar">
            <div class="tabs" role="tablist" aria-label="Package manager">
              {(Object.keys(INSTALL_COMMANDS) as PackageManager[]).map((manager) => (
                <button
                  class="tab"
                  role="tab"
                  aria-selected={packageManager === manager}
                  key={manager}
                  onClick={() => setPackageManager(manager)}
                >
                  {manager}
                </button>
              ))}
            </div>
            <button
              class="icon-btn inset-shadow"
              aria-label="Copy install command"
              onClick={() => copyText(INSTALL_COMMANDS[packageManager]).then(() => onNotify("Copied"))}
            >
              <CopyIcon />
            </button>
          </div>
          <pre class="code"><SyntaxHighlightedCode code={INSTALL_COMMANDS[packageManager]} language="text" /></pre>
        </div>
      </div>

      <div class="step">
        <div class="num card">2</div>
        <div class="h3row"><h3>Import the component</h3></div>
        <p class="gap32">Import only from the package entrypoint:</p>
        <div class="code-card padded card code-inline">
          <button
            class="icon-btn inset-shadow copy-corner"
            aria-label="Copy component import"
            onClick={() => copyText(`<script setup lang="ts">\nimport { ${importName} } from "vfx-ui-vue";\n</script>`).then(() => onNotify("Copied"))}
          >
            <CopyIcon />
          </button>
          <pre class="code"><SyntaxHighlightedCode code={`<script setup lang="ts">\nimport { ${importName} } from "vfx-ui-vue";\n</script>`} language="vue" /></pre>
        </div>
      </div>
    </div>
  );
}
