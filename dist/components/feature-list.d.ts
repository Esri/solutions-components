import type { Components, JSX } from "../types/components";

interface FeatureList extends Components.FeatureList, HTMLElement {}
export const FeatureList: {
    prototype: FeatureList;
    new (): FeatureList;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
