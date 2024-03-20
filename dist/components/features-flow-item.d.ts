import type { Components, JSX } from "../types/components";

interface FeaturesFlowItem extends Components.FeaturesFlowItem, HTMLElement {}
export const FeaturesFlowItem: {
    prototype: FeaturesFlowItem;
    new (): FeaturesFlowItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
