import type { Components, JSX } from "../types/components";

interface FeatureFormFlowItem extends Components.FeatureFormFlowItem, HTMLElement {}
export const FeatureFormFlowItem: {
    prototype: FeatureFormFlowItem;
    new (): FeatureFormFlowItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
