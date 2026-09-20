import type { CSSProperties } from "vfx-ui-vue/compat";

type CheckpointOption = {
  value: string;
  label: string;
};

type CheckpointSliderControlProps = {
  id: string;
  label: string;
  options: readonly CheckpointOption[];
  value: string;
  onChange: (value: string) => void;
};

export function CheckpointSliderControl({
  id,
  label,
  options,
  value,
  onChange,
}: CheckpointSliderControlProps) {
  const optionIndex = options.findIndex((option) => option.value === value);
  const selectedIndex = optionIndex >= 0 ? optionIndex : 0;
  const selectedOption = options[selectedIndex];
  const max = Math.max(0, options.length - 1);
  const progress = max === 0 ? 0 : selectedIndex / max;
  const sliderStyle = { "--slider-progress": progress } as CSSProperties;
  const setFromPointer = (clientX: number, element: HTMLDivElement) => {
    if (max === 0) return;
    const bounds = element.getBoundingClientRect();
    const trackWidth = Math.max(1, bounds.width - 12);
    const nextProgress = Math.min(1, Math.max(0, (clientX - bounds.left - 6) / trackWidth));
    const nextOption = options[Math.round(nextProgress * max)];
    if (nextOption && nextOption.value !== selectedOption?.value) onChange(nextOption.value);
  };

  return (
    <div
      class="control slider-control checkpoint-control inset-shadow"
      style={sliderStyle}
      onPointerdown={(event) => {
        const target = event.currentTarget as HTMLDivElement;
        target.setPointerCapture(event.pointerId);
        setFromPointer(event.clientX, target);
      }}
      onPointermove={(event) => {
        const target = event.currentTarget as HTMLDivElement;
        if (target.hasPointerCapture(event.pointerId)) {
          setFromPointer(event.clientX, target);
        }
      }}
      onPointerup={(event) => {
        const target = event.currentTarget as HTMLDivElement;
        if (target.hasPointerCapture(event.pointerId)) {
          target.releasePointerCapture(event.pointerId);
        }
      }}
    >
      <span class="slider-fill card" aria-hidden="true"><span class="slider-knob" /></span>
      <label for={id}>{label}</label>
      <output class="slider-value" for={id} aria-live="polite">{selectedOption?.label ?? ""}</output>
      <input
        id={id}
        type="range"
        min={0}
        max={max}
        step={1}
        value={selectedIndex}
        aria-valuetext={selectedOption?.label ?? ""}
        onKeydown={(event) => {
          const direction = event.key === "ArrowRight" || event.key === "ArrowUp"
            ? 1
            : event.key === "ArrowLeft" || event.key === "ArrowDown" ? -1 : 0;
          const nextIndex = event.key === "Home"
            ? 0
            : event.key === "End" ? max : Math.min(max, Math.max(0, selectedIndex + direction));
          if (direction !== 0 || event.key === "Home" || event.key === "End") {
            event.preventDefault();
            const nextOption = options[nextIndex];
            if (nextOption) onChange(nextOption.value);
          }
        }}
        onInput={(event) => {
          const nextOption = options[Number((event.currentTarget as HTMLInputElement).value)];
          if (nextOption) onChange(nextOption.value);
        }}
      />
    </div>
  );
}
