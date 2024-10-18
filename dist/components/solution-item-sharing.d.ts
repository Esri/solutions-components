import type { Components, JSX } from "../types/components";

interface SolutionItemSharing extends Components.SolutionItemSharing, HTMLElement {}
export const SolutionItemSharing: {
    prototype: SolutionItemSharing;
    new (): SolutionItemSharing;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
