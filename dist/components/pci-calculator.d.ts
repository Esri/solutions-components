import type { Components, JSX } from "../types/components";

interface PciCalculator extends Components.PciCalculator, HTMLElement {}
export const PciCalculator: {
  prototype: PciCalculator;
  new (): PciCalculator;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
