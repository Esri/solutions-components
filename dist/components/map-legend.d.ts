import type { Components, JSX } from "../types/components";

interface MapLegend extends Components.MapLegend, HTMLElement {}
export const MapLegend: {
    prototype: MapLegend;
    new (): MapLegend;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
