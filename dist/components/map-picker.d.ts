import type { Components, JSX } from "../types/components";

interface MapPicker extends Components.MapPicker, HTMLElement {}
export const MapPicker: {
    prototype: MapPicker;
    new (): MapPicker;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
