import type { Components, JSX } from "../types/components";

interface MapFullscreen extends Components.MapFullscreen, HTMLElement {}
export const MapFullscreen: {
    prototype: MapFullscreen;
    new (): MapFullscreen;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
