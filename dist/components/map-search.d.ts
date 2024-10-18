import type { Components, JSX } from "../types/components";

interface MapSearch extends Components.MapSearch, HTMLElement {}
export const MapSearch: {
    prototype: MapSearch;
    new (): MapSearch;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
