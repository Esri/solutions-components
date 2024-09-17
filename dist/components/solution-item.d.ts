import type { Components, JSX } from "../types/components";

interface SolutionItem extends Components.SolutionItem, HTMLElement {}
export const SolutionItem: {
    prototype: SolutionItem;
    new (): SolutionItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
