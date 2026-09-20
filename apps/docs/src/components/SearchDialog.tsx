import { useEffect, useMemo, useRef, useState, type CSSProperties } from "vfx-ui-vue/compat";
import { Suspense } from "vue";
import {
  CATALOG_RESULTS,
  catalogResultId,
  catalogResultLabel,
  catalogResultMatchesQuery,
  type CatalogResult,
} from "../data/catalogResults";
import type { ReadyShader } from "../data/registry";
import { SearchIcon } from "./icons";

type SearchDialogProps = {
  open: boolean;
  initialQuery?: string;
  onClose: () => void;
  onSelect: (id: ReadyShader["id"], variantId?: string) => void;
};

const DISMISS_DELAY = 180;
/* Hovering down the result list would otherwise mount a full WebGPU pipeline
   (Black Hole's bake, WebGlobe's three.js) per row it crosses. The delay only
   pays that cost for rows the pointer actually rests on. */
const PREVIEW_DELAY = 160;
export function SearchDialog({ open, initialQuery = "", onClose, onSelect }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [activePreview, setActivePreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dismissTimerRef = useRef<number | undefined>(undefined);
  const previewTimerRef = useRef<number | undefined>(undefined);
  const results = useMemo(
    () => CATALOG_RESULTS.filter((result) => catalogResultMatchesQuery(result, query)),
    [query],
  );

  const cancelDismiss = () => {
    if (dismissTimerRef.current === undefined) return;
    window.clearTimeout(dismissTimerRef.current);
    dismissTimerRef.current = undefined;
  };

  const cancelPreview = () => {
    if (previewTimerRef.current === undefined) return;
    window.clearTimeout(previewTimerRef.current);
    previewTimerRef.current = undefined;
  };

  const dismissResult = (id: string) => {
    cancelPreview();
    setActivePreview((current) => current === id ? null : current);
  };

  const scheduleDismiss = (id: string) => {
    cancelDismiss();
    dismissTimerRef.current = window.setTimeout(() => {
      dismissTimerRef.current = undefined;
      dismissResult(id);
    }, DISMISS_DELAY);
  };

  useEffect(() => {
    cancelDismiss();
    cancelPreview();
    if (!open) {
      setActivePreview(null);
      return;
    }
    setQuery(initialQuery);
    const frame = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [initialQuery, open]);

  useEffect(() => () => { cancelDismiss(); cancelPreview(); }, []);

  const beginPreview = (id: string) => {
    cancelDismiss();
    cancelPreview();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    previewTimerRef.current = window.setTimeout(() => {
      previewTimerRef.current = undefined;
      setActivePreview(id);
    }, PREVIEW_DELAY);
  };

  if (!open) return null;
  return (
    <>
      <button class="scrim open" aria-label="Close search" onClick={onClose} />
      <div class="dialog card open" role="dialog" aria-modal="true" aria-label="Search verified shaders">
        <div class="field">
          <SearchIcon width={18} height={18} style={{ opacity: 0.6 }} />
          <input
            ref={inputRef}
            value={query}
            onInput={(event) => setQuery((event.currentTarget as HTMLInputElement).value)}
            onKeydown={(event) => {
              if (event.key === "Escape") onClose();
              if (event.key === "Enter" && results[0]) onSelect(results[0].shader.id, results[0].variant?.id);
            }}
            placeholder="Search shaders..."
            autocomplete="off"
            spellcheck={false}
          />
          <kbd>ESC</kbd>
        </div>
        <div class="results" onScroll={() => {
          cancelDismiss();
          cancelPreview();
          setActivePreview(null);
        }}>
          {results.length ? (
            results.map((result) => {
              const { shader, variant } = result;
              const resultId = catalogResultId(result);
              const label = catalogResultLabel(result);
              const description = variant?.description ?? shader.description;
              // Heroes show the real still (palette gradients say nothing);
              // shaders keep the variant-level thumbnail.
              const thumbnail = shader.category === "Heroes"
                ? shader.thumbnail
                : variant?.thumbnail ?? shader.thumbnail;
              const Preview = shader.component;
              return (
                <button
                  key={resultId}
                  aria-label={`${label}: ${description} ${shader.category}, ${shader.runtime}. Tags: ${shader.tags.join(", ")}`}
                  onMouseenter={() => beginPreview(resultId)}
                  onMouseleave={() => scheduleDismiss(resultId)}
                  onFocus={() => beginPreview(resultId)}
                  onBlur={() => scheduleDismiss(resultId)}
                  onClick={() => onSelect(shader.id, variant?.id)}
                >
                  <span class="search-result-thumbnail" aria-hidden="true">
                    <img src={thumbnail} alt="" width="320" height="180" decoding="async" />
                    {/* Heroes are full-page layouts — a thumbnail-sized live
                        render reads broken and costs the heaviest init. */}
                    {activePreview === resultId && Preview && shader.category !== "Heroes" ? (
                      <Suspense>
                        <span
                          class="search-result-preview-live"
                          style={{ "--hero-min-height": "0px" } as CSSProperties}
                        >
                          <Preview {...(variant?.props ?? {})} />
                        </span>
                      </Suspense>
                    ) : null}
                  </span>
                  <span class="search-result-meta">
                    <span class="search-result-label">{label}</span>
                    <span class="search-result-desc">{description}</span>
                  </span>
                  <span class="search-result-category" aria-hidden="true">{shader.category}</span>
                </button>
              );
            })
          ) : (
            <div class="empty">No verified shader found.</div>
          )}
        </div>
      </div>
    </>
  );
}
