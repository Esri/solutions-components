import type { Components, JSX } from "../types/components";

interface SolutionContents extends Components.SolutionContents, HTMLElement {}
export const SolutionContents: {
    prototype: SolutionContents;
    new (): SolutionContents;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
