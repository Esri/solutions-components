import type { Components, JSX } from "../types/components";

interface LayoutManager extends Components.LayoutManager, HTMLElement {}
export const LayoutManager: {
    prototype: LayoutManager;
    new (): LayoutManager;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
