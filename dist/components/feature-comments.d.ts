import type { Components, JSX } from "../types/components";

interface FeatureComments extends Components.FeatureComments, HTMLElement {}
export const FeatureComments: {
    prototype: FeatureComments;
    new (): FeatureComments;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
