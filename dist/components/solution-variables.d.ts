import type { Components, JSX } from "../types/components";

interface SolutionVariables extends Components.SolutionVariables, HTMLElement {}
export const SolutionVariables: {
    prototype: SolutionVariables;
    new (): SolutionVariables;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
