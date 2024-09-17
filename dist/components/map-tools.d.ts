import type { Components, JSX } from "../types/components";

interface MapTools extends Components.MapTools, HTMLElement {}
export const MapTools: {
    prototype: MapTools;
    new (): MapTools;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
