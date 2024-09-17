import type { Components, JSX } from "../types/components";

interface RefineSelection extends Components.RefineSelection, HTMLElement {}
export const RefineSelection: {
    prototype: RefineSelection;
    new (): RefineSelection;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
