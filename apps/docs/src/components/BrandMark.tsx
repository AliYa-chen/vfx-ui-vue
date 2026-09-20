const TRIWAVE_TOP = "M36 178C112 252 184 264 260 196C336 128 404 114 482 180";
const TRIWAVE_BOTTOM = "M36 292C112 366 184 378 260 310C336 242 404 228 482 294";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  const maskId = compact ? "vfx-ui-vue-mark-compact" : "vfx-ui-vue-mark";

  return (
    <span class={compact ? "topbar-brand" : "logo"}>
      <span class="brand-symbol">
        <svg class="brand-mark" viewBox="0 0 512 512" aria-hidden="true">
          <defs>
            <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="512" height="512">
              <rect width="512" height="512" fill="#000" />
              <circle cx="256" cy="256" r="208" fill="#fff" />
              <g fill="none" stroke="#000" stroke-linecap="round" stroke-width="28">
                <path d={TRIWAVE_TOP} />
                <path d={TRIWAVE_BOTTOM} />
              </g>
            </mask>
          </defs>
          <rect width="512" height="512" fill="currentColor" mask={`url(#${maskId})`} />
        </svg>
      </span>
      <svg class="brand-wordmark" viewBox="0 0 4400 1032" aria-hidden="true">
        <text
          x="0"
          y="1000"
          fill="currentColor"
          font-size="1000"
          font-weight="700"
          letter-spacing="20"
          text-length="4400"
          length-adjust="spacingAndGlyphs"
        >
          VFX UI
        </text>
      </svg>
    </span>
  );
}
