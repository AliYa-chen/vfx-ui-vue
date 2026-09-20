import { defineComponent, onErrorCaptured, ref } from "vue";

/**
 * Keeps one broken live preview from unmounting the whole Vue app.
 */
export const ErrorBoundary = defineComponent({
  name: "ErrorBoundary",
  setup(_props, { slots }) {
    const error = ref<Error | null>(null);
    onErrorCaptured((caught) => {
      error.value = caught instanceof Error ? caught : new Error(String(caught));
      console.error("[vfx-ui-vue docs] preview crashed:", caught);
      return false;
    });

    return () => error.value ? (
      <main class="browse-page" aria-labelledby="preview-error-title">
        <header class="browse-header">
          <h1 id="preview-error-title">Preview failed to render</h1>
          <p class="lede">
            The live preview threw an error ({error.value.message}). The rest of the docs still work —
            pick another component from the sidebar.
          </p>
        </header>
      </main>
    ) : slots.default?.();
  },
});
