import type { Components, JSX } from "../types/components";

interface SolutionItemIcon extends Components.SolutionItemIcon, HTMLElement {}
export const SolutionItemIcon: {
    prototype: SolutionItemIcon;
    new (): SolutionItemIcon;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
