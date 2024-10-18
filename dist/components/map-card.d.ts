import type { Components, JSX } from "../types/components";

interface MapCard extends Components.MapCard, HTMLElement {}
export const MapCard: {
    prototype: MapCard;
    new (): MapCard;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
