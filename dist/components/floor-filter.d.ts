import type { Components, JSX } from "../types/components";

interface FloorFilter extends Components.FloorFilter, HTMLElement {}
export const FloorFilter: {
    prototype: FloorFilter;
    new (): FloorFilter;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
