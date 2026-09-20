import { useEffect, useMemo, useRef, useState, type CSSProperties } from "vfx-ui-vue/compat";
import { Suspense } from "vue";
import {
  type CatalogResult,
  catalogResultId,
  catalogResultLabel,
  catalogResultMatchesQuery,
} from "../data/catalogResults";
import type { ReadyShader } from "../data/registry";
import { READY_SHADERS, VISIBLE_READY_SHADERS } from "../data/publicShaders";

import { BROWSE_CATEGORIES, browseRouteContent } from "../browseTaxonomy.js";
import {
  browseCategoryRoutePath,
  browseTagRoutePath,
  shaderRoutePath,
  STATIC_ROUTE_PATHS,
} from "../routes.js";
import { RECENT_SHADERS } from "./Sidebar";
import "./browse-sort-toggle.css";
import { SearchIcon } from "./icons";

type BrowsePageProps = {
  activeCategory?: ReadyShader["category"];
  activeTag?: string;
  onCategorySelect: (category?: ReadyShader["category"]) => void;
  onSelect: (id: ReadyShader["id"], variantId?: string) => void;
  onTagSelect: (tag: string) => void;
};

const MAX_VISIBLE_TAGS = 3;

const BROWSE_SORT_MODES = [
  { id: "popular", label: "Selected" },
  { id: "recent", label: "Recent" },
] as const;

type BrowseSortMode = (typeof BROWSE_SORT_MODES)[number]["id"];

const SELECTED_IDS = ["glass-card", "radiant-dots", "liquid-glass", "hero-black-hole", "footer-tidal", "footer-fold", "footer-phosphor", "spectral-card", "kinetic-text", "hero-aurora", "chroma-flow", "magnetic", "light-prism", "hero-fiber", "glass-lens"];

export const SITE_TITLE = "Shader effect components for Vue 3";
export const SITE_DESCRIPTION = "Fully customizable. Copyable as prompts.";

const RECENT_SHADER_IDS = new Set<ReadyShader["id"]>(RECENT_SHADERS.map((shader) => shader.id));
const BROWSE_RESULTS: CatalogResult[] = VISIBLE_READY_SHADERS.map((shader) => ({ shader, variant: undefined }));

const COMING_SOON_SHADERS = READY_SHADERS.filter((shader) => !shader.visible);

function useInView<T extends HTMLElement = HTMLElement>(rootMargin = "256px 0px") {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) setInView(entry.isIntersecting);
    }, { rootMargin });
    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, inView };
}

type LivePreviewProps = {
  shader: ReadyShader;
  props: Readonly<Record<string, boolean | number | string | number[]>>;
  thumbnail: string;
};

// Small live instance of the component. Mounts on viewport entry and unmounts
// on exit so a large grid never keeps dozens of WebGPU renderers alive.
function LivePreview({ shader, props, thumbnail }: LivePreviewProps) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const Preview = shader.component;
  const [hovering, setHovering] = useState(false);
  const canPlay = shader.category !== "Heroes" && shader.runtime !== "dom";

  return (
    <span ref={ref} class={`browse-media${shader.category === "Footers" ? " browse-media-footer" : ""}`} aria-hidden="true" onPointerenter={() => setHovering(true)} onPointerleave={() => setHovering(false)}>
      {inView && hovering && canPlay && Preview ? (
        <Suspense v-slots={{
          default: () => <Preview {...props} interactive />,
          fallback: () => <img src={thumbnail} alt="" width="640" height="360" decoding="async" />,
        }} />
      ) : (
        <img src={thumbnail} alt="" width="640" height="360" loading="lazy" decoding="async" />
      )}
    </span>
  );
}

export function BrowsePage({ activeCategory, activeTag, onCategorySelect, onSelect, onTagSelect }: BrowsePageProps) {
  const [query, setQuery] = useState("");
  const [sortMode, setSortMode] = useState<BrowseSortMode>("popular");
  const visibleBrowseResults = useMemo(
    () => sortMode === "recent"
      ? [...BROWSE_RESULTS].sort((a, b) => Number(RECENT_SHADER_IDS.has(b.shader.id)) - Number(RECENT_SHADER_IDS.has(a.shader.id)))
      : [...BROWSE_RESULTS].sort((a, b) => {
        const rank = (id: string) => { const i = SELECTED_IDS.indexOf(id); return i < 0 ? SELECTED_IDS.length : i; };
        return rank(a.shader.id) - rank(b.shader.id);
      }),
    [sortMode],
  );
  const filteredResults = useMemo(
    () => visibleBrowseResults.filter((result) => (
      (!activeCategory || result.shader.category === activeCategory)
      && (!activeTag || result.shader.tags.includes(activeTag))
      && catalogResultMatchesQuery(result, query)
    )),
    [activeCategory, activeTag, query, visibleBrowseResults],
  );
  const filteredComingSoon = useMemo(
    () => COMING_SOON_SHADERS.filter((shader) => (
      (!activeCategory || shader.category === activeCategory)
      && (!activeTag || shader.tags.includes(activeTag))
      && catalogResultMatchesQuery({ shader }, query)
    )),
    [activeCategory, activeTag, query],
  );
  const routeResultCount = BROWSE_RESULTS.filter(({ shader }) => (
    (!activeCategory || shader.category === activeCategory)
    && (!activeTag || shader.tags.includes(activeTag))
  )).length;
  const pageContent = browseRouteContent({ browseCategory: activeCategory, browseTag: activeTag }, routeResultCount);

  return (
    <main class={`browse-page${activeCategory === "Footers" ? " browse-page-footers" : ""}`} aria-labelledby="browse-title">
      <header class="browse-header">
        <div class="browse-heading-row">
          <div>
            <h1 id="browse-title">{pageContent.heading}</h1>
            <p class="lede">{pageContent.description}</p>
            {activeTag ? (
              <a
                class="browse-active-filter"
                href={STATIC_ROUTE_PATHS.browse}
                onClick={(event) => {
                  event.preventDefault();
                  onCategorySelect();
                }}
              >
                Tagged {activeTag} <span aria-hidden="true">×</span>
              </a>
            ) : null}
          </div>
        </div>
        <div class="browse-controls-row">
          <div class="browse-category-filters" role="group" aria-label="Filter components by category">
            {(BROWSE_CATEGORIES as readonly ReadyShader["category"][]).map((category) => {
              const isActive = activeCategory === category;
              const href = isActive ? STATIC_ROUTE_PATHS.browse : browseCategoryRoutePath(category);
              return (
                <a
                  key={category}
                  aria-current={isActive ? "page" : undefined}
                  href={href}
                  title={isActive ? "Show all categories" : `Filter by ${category}`}
                  onClick={(event) => {
                    event.preventDefault();
                    onCategorySelect(isActive ? undefined : category);
                  }}
                >
                  {category}
                </a>
              );
            })}
          </div>
          <div class="browse-search-controls">
            <label class="browse-filter">
              <SearchIcon />
              <input
                type="search"
                value={query}
                placeholder={`Search ${routeResultCount} components`}
                aria-label={`Search ${routeResultCount} components`}
                autocomplete="off"
                spellcheck={false}
                onInput={(event) => setQuery((event.currentTarget as HTMLInputElement).value)}
              />
            </label>
            <div class="browse-sort-toggle" role="group" aria-label="Sort components">
              {BROWSE_SORT_MODES.map((mode) => (
                <button
                  type="button"
                  key={mode.id}
                  aria-pressed={sortMode === mode.id}
                  onClick={() => setSortMode(mode.id)}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {filteredResults.length ? (
        <div class="browse-grid">
          {filteredResults.map(({ shader, variant }, index) => {
            const result = { shader, variant };
            const resultId = catalogResultId(result);
            const label = catalogResultLabel(result);
            const thumbnail = variant?.thumbnail ?? shader.thumbnail;
            const variantProps = variant?.props ?? {};
            return (
              <article class={`browse-item${index === 0 && !activeCategory && !activeTag && !query ? " browse-item-featured" : ""}`} key={resultId} style={{ "--browse-index": index } as CSSProperties}>
                <a
                  class="browse-item-link"
                  href={shaderRoutePath(shader, variant?.id)}
                  aria-label={`${label}. ${shader.tags.slice(0, MAX_VISIBLE_TAGS).join(", ")}. Vue component.`}
                  onClick={(event) => {
                    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                    event.preventDefault();
                    onSelect(shader.id, variant?.id);
                  }}
                >
                  <LivePreview shader={shader} props={variantProps} thumbnail={thumbnail} />
                  <span class="browse-details">
                    <span class="browse-title-row">
                      <strong>{label}</strong><span class="browse-preset-count">{shader.variants?.length ? `${shader.variants.length} presets` : "Interactive"}</span>
                    </span>
                  </span>
                </a>
                <nav class="browse-tags" aria-label={`${label} tags`}>
                  {shader.tags.slice(0, MAX_VISIBLE_TAGS).map((tag) => (
                    <a
                      href={browseTagRoutePath(tag)}
                      key={tag}
                      onClick={(event) => {
                        event.preventDefault();
                        onTagSelect(tag);
                      }}
                    >
                      {tag}
                    </a>
                  ))}
                </nav>
              </article>
            );
          })}
        </div>
      ) : (
        <div class="browse-empty" role="status">
          <strong>{query ? `No components match “${query}”.` : "No components match this category."}</strong>
          <span>Try another title, tag, category, or technology.</span>
        </div>
      )}

      {filteredComingSoon.length ? (
        <section class="browse-coming-soon" aria-labelledby="coming-soon-title">
          <h2 id="coming-soon-title">Coming soon</h2>
          <div class="browse-grid">
            {filteredComingSoon.map((shader, index) => (
              <article class="browse-item is-coming-soon" key={shader.id} style={{ "--browse-index": index } as CSSProperties}>
                <span class="browse-item-link" aria-disabled="true">
                  <span class="browse-media" aria-hidden="true">
                    <img src={shader.thumbnail} alt="" width="640" height="360" loading="lazy" decoding="async" />
                    <span class="coming-soon-badge">Coming soon</span>
                  </span>
                  <span class="browse-details">
                    <span class="browse-title-row">
                      <strong>{shader.label}</strong>
                      <span class="coming-soon-note">{shader.category}</span>
                    </span>
                  </span>
                </span>
                <p class="coming-soon-description">{shader.description}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
