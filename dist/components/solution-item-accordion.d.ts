import type { Components, JSX } from "../types/components";

interface SolutionItemAccordion extends Components.SolutionItemAccordion, HTMLElement {}
export const SolutionItemAccordion: {
    prototype: SolutionItemAccordion;
    new (): SolutionItemAccordion;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
