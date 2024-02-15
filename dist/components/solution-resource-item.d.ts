import type { Components, JSX } from "../types/components";

interface SolutionResourceItem extends Components.SolutionResourceItem, HTMLElement {}
export const SolutionResourceItem: {
    prototype: SolutionResourceItem;
    new (): SolutionResourceItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
