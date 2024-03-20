import type { Components, JSX } from "../types/components";

interface MapDrawTools extends Components.MapDrawTools, HTMLElement {}
export const MapDrawTools: {
    prototype: MapDrawTools;
    new (): MapDrawTools;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
