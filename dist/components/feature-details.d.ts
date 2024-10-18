import type { Components, JSX } from "../types/components";

interface FeatureDetails extends Components.FeatureDetails, HTMLElement {}
export const FeatureDetails: {
    prototype: FeatureDetails;
    new (): FeatureDetails;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
