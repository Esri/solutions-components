import type { Components, JSX } from "../types/components";

interface LayerList extends Components.LayerList, HTMLElement {}
export const LayerList: {
    prototype: LayerList;
    new (): LayerList;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
