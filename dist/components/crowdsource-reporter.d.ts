import type { Components, JSX } from "../types/components";

interface CrowdsourceReporter extends Components.CrowdsourceReporter, HTMLElement {}
export const CrowdsourceReporter: {
  prototype: CrowdsourceReporter;
  new (): CrowdsourceReporter;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
