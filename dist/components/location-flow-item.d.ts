import type { Components, JSX } from "../types/components";

interface LocationFlowItem extends Components.LocationFlowItem, HTMLElement {}
export const LocationFlowItem: {
    prototype: LocationFlowItem;
    new (): LocationFlowItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
