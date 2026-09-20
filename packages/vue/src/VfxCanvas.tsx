import { childrenFromSlots, useEffect, useRef, useState, type CSSProperties, type VueNode } from "./vueCompat";
import { createVfxRenderer } from "vfx-ui-vue-core";

// Public canvas types stay local so installing vfx-ui-vue does not require
// publishing or installing the workspace's renderer implementation package.
type CanvasUniforms = Record<string, number | number[][]>;
export interface CanvasRenderer {
  readonly label: string;
  setUniforms(values: CanvasUniforms): void;
  setAnimate(animate: boolean): void;
  dispose(): void;
}
interface CanvasRendererOptions {
  shader: string;
  uniforms?: CanvasUniforms;
  animate?: boolean;
  dpr?: number | readonly [number, number];
  fps?: number;
  label?: string;
  signal?: AbortSignal;
}

export interface VfxCanvasProps extends Omit<CanvasRendererOptions, "uniforms"> {
  shader: string;
  /** Uniform values (WGSL field names). Updated on change without re-init. */
  uniforms?: CanvasRendererOptions["uniforms"];
  className?: string;
  style?: CSSProperties;
  /** Rendered when WebGPU is unavailable or initialization fails. */
  fallback?: VueNode;
  /** Vue default slot rendered as foreground content over the canvas. */
  children?: VueNode;
  /** Called once the renderer is live (browser only). */
  onReady?: (renderer: CanvasRenderer) => void;
}

/**
 * Shared canvas host for every vfx-ui-vue component. Owns the renderer
 * lifecycle: client-only init, reduced-motion handling, uniform
 * updates, and dispose. Server rendering yields a plain canvas element.
 */
export function VfxCanvas({
  shader,
  uniforms,
  animate,
  dpr,
  fps,
  label,
  className,
  style,
  fallback,
  onReady,
  children,
}: VfxCanvasProps) {
  const content = childrenFromSlots(children);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rendererRef = useRef<CanvasRenderer | null>(null);
  const [failed, setFailed] = useState(false);
  const uniformsKey = JSON.stringify(uniforms ?? {});
  const latestRef = useRef({ uniforms, animate, onReady });
  latestRef.current = { uniforms, animate, onReady };
  const mayAnimate = () => latestRef.current.animate !== false
    && !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;


  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let disposed = false;
    let renderer: CanvasRenderer | null = null;
    const abort = new AbortController();
    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    createVfxRenderer(canvas, {
      shader,
      uniforms,
      animate: animate !== false && !reduced,
      dpr,
      fps,
      label,
      signal: abort.signal,
    })
      .then((r) => {
        if (disposed) {
          r.dispose();
          return;
        }
        renderer = r;
        rendererRef.current = r;
        r.setUniforms(latestRef.current.uniforms ?? {});
        r.setAnimate(mayAnimate());
        latestRef.current.onReady?.(r);
      })
      .catch((err: unknown) => {
        // A stale mount can reject with
        // VGPU-SURFACE-DUPLICATE once the live mount owns the canvas — that is
        // the guard working, not a failure, so only the live mount reports.
        if (disposed) return;
        // Swallowed errors make "WebGPU unavailable" indistinguishable from a
        // shader bug — log loudly and expose the message for host diagnostics.
        console.error(`[vfx-ui-vue] renderer init failed (${label ?? "vfx"}):`, err);
        try {
          window.localStorage.setItem(
            "vfx-ui-vue:last-init-error",
            `${label ?? "vfx"}: ${err instanceof Error ? (err.stack ?? err.message) : String(err)}`,
          );
        } catch {
          /* storage unavailable — the console line above is the record */
        }
        setFailed(true);
      });

    return () => {
      disposed = true;
      abort.abort();
      renderer?.dispose();
      rendererRef.current = null;
    };
    // Init runs once per mount; shader/label identity is stable per component type.
  }, [shader, label]);

  useEffect(() => {
    rendererRef.current?.setUniforms(JSON.parse(uniformsKey) as Record<string, number>);
  }, [uniformsKey]);

  useEffect(() => {
    const media = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const sync = () => rendererRef.current?.setAnimate(mayAnimate());
    sync();
    media?.addEventListener?.("change", sync);
    return () => media?.removeEventListener?.("change", sync);
  }, [animate]);

  if (failed) {
    return <>{fallback ?? null}{content}</>;
  }

  const canvas = (
    <canvas
      ref={canvasRef}
      class={className}
      style={{ display: "block", width: "100%", height: "100%", ...style }}
    />
  );
  if (content == null) return canvas;
  return (
    <div
      class={className}
      style={{ position: "relative", width: "100%", height: "100%", ...style }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: "block", position: "absolute", inset: 0, width: "100%", height: "100%" }}
      />
      {content}
    </div>
  );
}
