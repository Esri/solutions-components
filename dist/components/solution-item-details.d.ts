import type { Components, JSX } from "../types/components";

interface SolutionItemDetails extends Components.SolutionItemDetails, HTMLElement {}
export const SolutionItemDetails: {
    prototype: SolutionItemDetails;
    new (): SolutionItemDetails;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
