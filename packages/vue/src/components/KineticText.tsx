import { childrenFromSlots, type CSSProperties, type VueNode } from "../vueCompat";
import { usePointerMotion } from "../usePointerMotion";

export interface KineticTextProps {
  text?: string;
  /** Letter displacement in pixels. */
  strength?: number;
  /** Field width as a fraction of the text. */
  spread?: number;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: VueNode;
}

/** A local force field lifts letters as the pointer passes. One accessible label. */
export function KineticText({
  text = "Feel something.",
  strength = 32,
  spread = 0.28,
  disabled = false,
  className,
  style,
  children,
}: KineticTextProps) {
  const content = childrenFromSlots(children);
  const letters = Array.from(text);
  const ref = usePointerMotion<HTMLSpanElement>((el, p) => {
    const cursor = (p.x + 1) / 2;
    const width = Math.max(0.05, spread);
    Array.from(el.children).forEach((child, index) => {
      const distance = (index + 0.5) / Math.max(1, letters.length) - cursor;
      const force =
        Math.exp(-(distance * distance) / (width * width)) * p.active;
      (child as HTMLElement).style.transform =
        `translateY(${-force * strength}px) rotate(${distance * force * 16}deg)`;
    });
  }, disabled);
  return (
    <span
      ref={ref}
      role={content == null ? "img" : undefined}
      aria-label={content == null ? text : undefined}
      class={className}
      style={{
        display: "inline-block",
        paddingBlock: Math.max(0, strength),
        ...style,
      }}
    >
      {content ?? letters.map((letter, index) => (
        <span
          key={`${index}-${letter}`}
          aria-hidden="true"
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {letter}
        </span>
      ))}
    </span>
  );
}
