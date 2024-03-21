import type { Components, JSX } from "../types/components";

interface ConsentManager extends Components.ConsentManager, HTMLElement {}
export const ConsentManager: {
    prototype: ConsentManager;
    new (): ConsentManager;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
