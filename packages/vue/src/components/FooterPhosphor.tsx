import { childrenFromSlots, useRef, type CSSProperties } from "../vueCompat";
import {
  FooterFrame,
  FooterWordmark,
  type FooterContentProps,
} from "./FooterFrame";
import { FooterArtwork } from "./FooterArtwork";

export interface FooterPhosphorProps extends FooterContentProps {
  color?: string;
  background?: string;
}

/** A field of lit cells forms your wordmark, disperses, then finds its way home. */
export function FooterPhosphor({
  brand = "STILL",
  title = "Keep in touch.",
  color = "#d2f8a2",
  background = "#17201b",
  interactive = true,
  style,
  ...content
}: FooterPhosphorProps) {
  const surface = useRef<HTMLElement>(null);
  return (
    <FooterFrame
      {...content}
      children={childrenFromSlots(content.children)}
      brand={brand}
      title={title}
      kind="phosphor"
      surfaceRef={surface}
      style={
        {
          "--vf-bg": background,
          "--vf-ink": color,
          "--vf-accent": color,
          ...style,
        } as CSSProperties
      }
      artwork={
        <div class="vfx-footer-art vfx-phosphor-art">
          <div class="vfx-phosphor-fallback">
            <FooterWordmark text={brand} />
          </div>
          <FooterArtwork
            kind="phosphor"
            surface={surface}
            brand={brand}
            color={color}
            interactive={interactive}
          />
        </div>
      }
    />
  );
}
