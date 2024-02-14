import type { Components, JSX } from "../types/components";

interface LayerTable extends Components.LayerTable, HTMLElement {}
export const LayerTable: {
    prototype: LayerTable;
    new (): LayerTable;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
