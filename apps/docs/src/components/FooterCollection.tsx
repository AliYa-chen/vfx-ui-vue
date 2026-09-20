import { useState } from "vfx-ui-vue/compat";
import { FooterFold, FooterPhosphor, FooterTidal, FooterVinyl } from "vfx-ui-vue";

const ENDINGS = [
  { id: "footer-vinyl", label: "Vinyl", Component: FooterVinyl },
  { id: "footer-tidal", label: "Tidal", Component: FooterTidal },
  { id: "footer-fold", label: "Fold", Component: FooterFold },
  { id: "footer-phosphor", label: "Phosphor", Component: FooterPhosphor },
] as const;
const GROUPS = [
  {
    label: "The library",
    links: [
      { label: "Heroes", href: "/heroes" },
      { label: "Footers", href: "/footers" },
      { label: "All components", href: "/components" },
    ],
  },
  {
    label: "Resources",
    links: [
      { label: "Installation", href: "/installation" },
      { label: "GitHub", href: "https://github.com/AliYa-chen/vfx-ui-vue" },
      { label: "For agents", href: "/llms.txt" },
    ],
  },
];

/** The site's own footer is a working specimen of the exported footers. */
export function FooterCollection() {
  const [selected, setSelected] = useState(0);
  const { id, Component } = ENDINGS[selected]!;
  return (
    <section class="footer-collection" aria-label="Footer collection">
      <div class="footer-collection-heading">
        <h2>The last impression.</h2>
        <div
          class="footer-selector"
          role="group"
          aria-label="Choose a footer"
        >
          {ENDINGS.map((ending, index) => (
            <button
              key={ending.id}
              aria-pressed={selected === index}
              onClick={() => setSelected(index)}
            >
              {ending.label}
            </button>
          ))}
        </div>
      </div>
      <Component
        key={id}
        brand="VFX UI VUE"
        title={
          id === "footer-fold"
            ? "Make room for\nsomething different."
            : id === "footer-phosphor"
              ? "See you around."
              : id === "footer-vinyl" ? "Good things\nstay on repeat." : "A little atmosphere.\nAll yours."
        }
        cta={{ label: "Use this footer", href: `/footers/${id}` }}
        groups={GROUPS}
        copyright={`© ${new Date().getFullYear()} VFX UI VUE`}
        legal={[
          {
            label: "MIT licensed",
            href: "https://github.com/AliYa-chen/vfx-ui-vue/blob/main/LICENSE",
          },
        ]}
      />
    </section>
  );
}
