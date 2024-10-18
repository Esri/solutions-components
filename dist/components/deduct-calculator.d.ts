import type { Components, JSX } from "../types/components";

interface DeductCalculator extends Components.DeductCalculator, HTMLElement {}
export const DeductCalculator: {
    prototype: DeductCalculator;
    new (): DeductCalculator;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
