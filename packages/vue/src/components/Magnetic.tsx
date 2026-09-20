import { childrenFromSlots, type CSSProperties, type VueNode } from "../vueCompat";
import { usePointerMotion } from "../usePointerMotion";

export interface MagneticProps {
  children?: VueNode;
  /** Maximum travel in pixels. */
  strength?: number;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

/** A stable hit area with a movable content layer. Links keep native semantics. */
export function Magnetic({
  children,
  strength = 18,
  disabled = false,
  className,
  style,
}: MagneticProps) {
  const content = childrenFromSlots(children);
  const ref = usePointerMotion<HTMLSpanElement>((el, p) => {
    const content = el.firstElementChild as HTMLElement | null;
    if (content)
      content.style.transform = `translate3d(${p.x * strength}px,${p.y * strength}px,0)`;
  }, disabled);
  return (
    <span
      ref={ref}
      class={className}
      style={{ display: "inline-flex", padding: 18, ...style }}
    >
      <span style={{ display: "inline-flex" }}>
        {content ?? (
          <button
            type="button"
            style={{
              padding: "18px 30px",
              borderRadius: 99,
              border: 0,
              background: "#e9efef",
              color: "#111",
              font: "inherit",
              cursor: "pointer",
            }}
          >
            Move closer
          </button>
        )}
      </span>
    </span>
  );
}
