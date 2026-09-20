import {
  Fragment,
  Teleport,
  cloneVNode,
  defineAsyncComponent,
  defineComponent,
  getCurrentInstance,
  h,
  inject,
  isVNode,
  onUnmounted,
  provide,
  queuePostFlushCb,
  shallowRef,
  ssrContextKey,
  type Component,
  type CSSProperties as VueCSSProperties,
  type DefineComponent,
  type Ref,
  type SVGAttributes,
  type VNodeChild,
} from "vue";

/**
 * Small hook-shaped adapter used while keeping the public components as TSX.
 * The renderer, lifecycle, reactivity and VNodes are all Vue 3; this module
 * only lets the original component algorithms stay readable during the
 * framework migration.
 */
export type CSSProperties = VueCSSProperties;
export type VueNode = VNodeChild;
export type ComponentType<P = Record<string, unknown>> = Component<P>;
export type SetStateAction<T> = T | ((previous: T) => T);
export type Dispatch<T> = (value: T) => void;
// Vue's JSX DOM listener types use PointerEvent for click handlers. Keep the
// generic parameter for source compatibility without narrowing currentTarget
// (which would make a valid Vue listener contravariantly incompatible).
export type MouseEvent<_T = Element> = globalThis.PointerEvent;
export type MouseEventHandler<T = Element> = (event: MouseEvent<T>) => void;
export type SVGProps<T = SVGSVGElement> = SVGAttributes & { ref?: Ref<T | null> };

/** Vue ref accepted by JSX, with a convenient `.current` compatibility view. */
export type RefObject<T> = Ref<T | null> & { current: T | null };
export type MutableRefObject<T> = Ref<T> & { current: T };

type EffectCleanup = void | (() => void);
type HookSlot =
  | { kind: "state"; state: Ref<unknown>; set: Dispatch<unknown> }
  | { kind: "ref"; value: MutableRefObject<unknown> }
  | { kind: "memo"; value: unknown; deps?: readonly unknown[] }
  | {
      kind: "effect";
      callback: () => EffectCleanup;
      deps?: readonly unknown[];
      previousDeps?: readonly unknown[];
      cleanup?: () => void;
      pending: boolean;
    }
  | { kind: "id"; value: string };

interface HookState {
  cursor: number;
  renderOpen: boolean;
  slots: HookSlot[];
  disposed: boolean;
  server: boolean;
}

const hookStates = new WeakMap<object, HookState>();
const pendingEffects = new Set<HookState>();
let idCounter = 0;

function equalDeps(a?: readonly unknown[], b?: readonly unknown[]) {
  return Boolean(a && b && a.length === b.length && a.every((value, index) => Object.is(value, b[index])));
}

function flushStateEffects(state: HookState) {
  pendingEffects.delete(state);
  if (state.disposed) return;
  for (const slot of state.slots) {
    if (slot.kind !== "effect" || !slot.pending) continue;
    slot.pending = false;
    if (slot.deps && equalDeps(slot.deps, slot.previousDeps)) continue;
    slot.cleanup?.();
    const cleanup = slot.callback();
    slot.cleanup = typeof cleanup === "function" ? cleanup : undefined;
    slot.previousDeps = slot.deps ? [...slot.deps] : undefined;
  }
}

/** Primarily useful to make lifecycle tests deterministic. */
export function flushCompatEffects() {
  const states = [...pendingEffects];
  pendingEffects.clear();
  for (const state of states) flushStateEffects(state);
}

function hookSlotIndex() {
  const instance = getCurrentInstance();
  if (!instance) throw new Error("Vue composables must run while a component is rendering.");

  let state = hookStates.get(instance);
  if (!state) {
    state = {
      cursor: 0,
      renderOpen: false,
      slots: [],
      disposed: false,
      server: Boolean(instance.appContext.provides[ssrContextKey]),
    };
    hookStates.set(instance, state);
    const cleanup = () => {
      state!.disposed = true;
      pendingEffects.delete(state!);
      for (const slot of state!.slots) {
        if (slot.kind === "effect") slot.cleanup?.();
      }
    };
    onUnmounted(cleanup, instance);
  }

  if (!state.renderOpen) {
    state.cursor = 0;
    state.renderOpen = true;
    queuePostFlushCb(() => {
      state!.renderOpen = false;
      // Functional components execute during the render phase, too late to
      // register a normal onMounted hook. Vue's post-flush queue runs after the
      // component (including async Suspense branches) has committed DOM refs,
      // so canvas/GPU effects always see a connected, layout-backed element.
      if (!state!.server) flushStateEffects(state!);
    });
  }

  return { instance, state, index: state.cursor++ };
}

export function useState<T>(initial: T | (() => T)): [T, Dispatch<SetStateAction<T>>] {
  const { state, index } = hookSlotIndex();
  let slot = state.slots[index];
  if (!slot) {
    // State is an opaque value just like it is in hook-based component APIs.
    // Deep-proxying component definitions, GPU handles or class instances is
    // both surprising and something Vue explicitly warns against.
    const stateRef = shallowRef(
      typeof initial === "function" ? (initial as () => T)() : initial,
    ) as Ref<T>;
    const set = (next: SetStateAction<T>) => {
      stateRef.value = typeof next === "function"
        ? (next as (previous: T) => T)(stateRef.value)
        : next;
    };
    slot = { kind: "state", state: stateRef as Ref<unknown>, set: set as Dispatch<unknown> };
    state.slots[index] = slot;
  }
  if (slot.kind !== "state") throw new Error("Vue hook order changed between renders.");
  return [slot.state.value as T, slot.set as Dispatch<SetStateAction<T>>];
}

export function useRef<T>(initial: T): MutableRefObject<T>;
export function useRef<T>(initial: T | null): RefObject<T>;
export function useRef<T>(initial: T | null): MutableRefObject<T | null> {
  const { state, index } = hookSlotIndex();
  let slot = state.slots[index];
  if (!slot) {
    // This is deliberately a non-reactive ref. Vue only needs `__v_isRef` and
    // `.value` to install DOM refs; imperative refs must not schedule a render
    // when components update `.current` during rendering.
    let current = initial;
    const value = {
      __v_isRef: true as const,
      get current() {
        return current;
      },
      set current(next: T | null) {
        current = next;
      },
      get value() {
        return current;
      },
      set value(next: T | null) {
        current = next;
      },
    } as unknown as MutableRefObject<T | null>;
    slot = { kind: "ref", value: value as MutableRefObject<unknown> };
    state.slots[index] = slot;
  }
  if (slot.kind !== "ref") throw new Error("Vue hook order changed between renders.");
  return slot.value as MutableRefObject<T | null>;
}

export function useEffect(callback: () => EffectCleanup, deps?: readonly unknown[]) {
  const { state, index } = hookSlotIndex();
  let slot = state.slots[index];
  if (!slot) {
    slot = { kind: "effect", callback, deps, pending: !state.server };
    state.slots[index] = slot;
  } else {
    if (slot.kind !== "effect") throw new Error("Vue hook order changed between renders.");
    slot.callback = callback;
    slot.deps = deps;
    slot.pending = !state.server && (!deps || !equalDeps(deps, slot.previousDeps));
  }
  if (slot.pending) pendingEffects.add(state);
}

export function useMemo<T>(factory: () => T, deps: readonly unknown[]): T {
  const { state, index } = hookSlotIndex();
  let slot = state.slots[index];
  if (!slot || slot.kind !== "memo" || !equalDeps(deps, slot.deps)) {
    slot = { kind: "memo", value: factory(), deps: [...deps] };
    state.slots[index] = slot;
  }
  return slot.value as T;
}

export function useCallback<T extends (...args: never[]) => unknown>(callback: T, deps: readonly unknown[]): T {
  return useMemo(() => callback, deps);
}

export function useId() {
  const { state, index } = hookSlotIndex();
  let slot = state.slots[index];
  if (!slot) {
    slot = { kind: "id", value: `vfx-${++idCounter}` };
    state.slots[index] = slot;
  }
  if (slot.kind !== "id") throw new Error("Vue hook order changed between renders.");
  return slot.value;
}

export interface VueContext<T> {
  key: symbol;
  defaultValue: T;
  Provider: DefineComponent<{ value: T }>;
}

export function createContext<T>(defaultValue: T): VueContext<T> {
  const key = Symbol("vfx-context");
  const Provider = defineComponent({
    name: "VfxContextProvider",
    inheritAttrs: false,
    props: ["value"],
    setup(props, { attrs, slots }) {
      provide(key, props.value as T);
      return () => {
        const content = slots.default?.() ?? [];
        // Functional components without runtime prop declarations pass class,
        // style and listeners through their root. Apply those fallthrough attrs
        // to the provider's single slot root instead of warning on a Fragment.
        return content.length === 1 && isVNode(content[0])
          ? cloneVNode(content[0], attrs)
          : content;
      };
    },
  });
  return { key, defaultValue, Provider: Provider as unknown as DefineComponent<{ value: T }> };
}

export function useContext<T>(context: VueContext<T>): T {
  return inject(context.key, context.defaultValue);
}

export function lazy<T extends Component>(loader: () => Promise<{ default: T }>) {
  return defineAsyncComponent(() => loader().then((module) => module.default));
}

export function createElement(component: Component | string, props?: Record<string, unknown> | null, ...children: VNodeChild[]) {
  return h(component as never, props, children);
}

export function createPortal(children: VNodeChild, target: Element | string) {
  return h(Teleport, { to: target }, { default: () => children });
}

/** Resolve the compatibility `children` prop or Vue's idiomatic default slot. */
export function childrenFromSlots(children?: VueNode): VueNode {
  return children ?? getCurrentInstance()?.slots.default?.();
}

export { Fragment as StrictMode };
export { Suspense, isRef } from "vue";
