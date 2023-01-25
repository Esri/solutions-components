import type { Components, JSX } from "../types/components";

interface ConfigBufferTools extends Components.ConfigBufferTools, HTMLElement {}
export const ConfigBufferTools: {
  prototype: ConfigBufferTools;
  new (): ConfigBufferTools;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
