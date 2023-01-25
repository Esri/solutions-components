import type { Components, JSX } from "../types/components";

interface ConfigDrawTools extends Components.ConfigDrawTools, HTMLElement {}
export const ConfigDrawTools: {
  prototype: ConfigDrawTools;
  new (): ConfigDrawTools;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
