import { useState } from "vfx-ui-vue/compat";
import type { ReadyShader } from "../data/registry";
import { CopyIcon, TocIcon } from "./icons";
import { INSTALL_COMMANDS, InstallationSteps } from "./InstallationSteps";
import { SyntaxHighlightedCode } from "./SyntaxHighlightedCode";

type InstallationDocumentationProps = {
  onSelect: (id: ReadyShader["id"]) => void;
};

const REQUIREMENTS = [
  { name: "vue", type: "peer", value: ">= 3.5" },
  { name: "vgpu", type: "bundled runtime", value: "0.3.1 (GPU components)" },
  { name: "Node.js", type: "tooling", value: ">= 22" },
  { name: "WebGPU", type: "browser", value: "WebGPU-capable browser" },
] as const;

const INSTALLATION_TOC = [
  { id: "package", label: "Install package" },
  { id: "requirements", label: "Requirements" },
  { id: "usage", label: "First component" },
  { id: "verify", label: "Verify setup" },
] as const;

const FIRST_COMPONENT_SNIPPET = `<script setup lang="ts">
import { WaveBackground } from "vfx-ui-vue";
</script>

<template>
  <div class="shader-frame">
    <WaveBackground />
  </div>
</template>`;

async function copyText(text: string) {
  await navigator.clipboard.writeText(text);
}

export function InstallationDocumentation({ onSelect }: InstallationDocumentationProps) {
  const [toast, setToast] = useState("");

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 1600);
  };

  return (
    <>
      <div class="pane-inner">
        <main class="doc" id="doc">
          <div class="crumb">Getting started</div>
          <h1>Installation</h1>
          <p class="lede">Install vfx-ui-vue from npm and render GPU shader components with a single import.</p>
          <div class="tagrow">
            <span class="tag">vfx-ui-vue</span>
          </div>
          <div class="divider" />

          <h2 id="package">Install the package</h2>
          <InstallationSteps importName="WaveBackground" onNotify={notify} />

          <h2 id="requirements">Requirements</h2>
          <div class="table-wrap card">
            <table>
              <thead><tr><th>Dependency</th><th>Type</th><th class="col-default">Version</th></tr></thead>
              <tbody>
                {REQUIREMENTS.map((row) => (
                  <tr key={row.name}>
                    <td><span class="mono-chip">{row.name}</span></td>
                    <td><span class="mono-chip">{row.type}</span></td>
                    <td class="col-default">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 id="usage">Render your first component</h2>
          <p>Every component renders through the shared WebGPU canvas host. Drop it into any sized container:</p>
          <div class="code-card padded card code-inline">
            <button
              class="icon-btn inset-shadow copy-corner"
              aria-label="Copy first component snippet"
              onClick={() => copyText(FIRST_COMPONENT_SNIPPET).then(() => notify("Copied"))}
            >
              <CopyIcon />
            </button>
            <pre class="code"><SyntaxHighlightedCode code={FIRST_COMPONENT_SNIPPET} language="vue" /></pre>
          </div>

          <h2 id="verify">Verify setup</h2>
          <div class="integrity card">
            <span class="integrity-icon"><span class="status-dot" /></span>
            <div>
              <strong>Choose a ready component</strong>
              <p>Every component page includes a live preview, exact import name, prop contract, and agent-ready notes.</p>
            </div>
          </div>

          <nav class="pager" aria-label="Installation pagination">
            <span />
            <button class="card next" onClick={() => onSelect("wave-background")}>
              <span class="k">Next</span><span class="v">Wave Background</span>
            </button>
          </nav>
        </main>

        <aside class="rail">
          <div class="toc-head"><TocIcon />On this page</div>
          <nav class="toc" aria-label="On this page">
            {INSTALLATION_TOC.map((item, index) => (
              <div class={`toc-item${index === 0 ? " on" : ""}`} key={item.id}>
                <span class="rl" /><span class="dot" />
                <a href={`#${item.id}`}>{item.label}</a>
              </div>
            ))}
          </nav>
          <div class="actions">
            <button onClick={() => copyText(INSTALL_COMMANDS.npm).then(() => notify("Copied"))}>
              <CopyIcon />Copy install command
            </button>
            <button onClick={() => onSelect("wave-background")}>
              <span class="action-check">→</span>Browse components
            </button>
          </div>
        </aside>
      </div>
      <div class={`toast${toast ? " show" : ""}`}>{toast}</div>
    </>
  );
}
