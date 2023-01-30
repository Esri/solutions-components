import type { Components, JSX } from "../types/components";

interface BufferTools extends Components.BufferTools, HTMLElement {}
export const BufferTools: {
  prototype: BufferTools;
  new (): BufferTools;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
