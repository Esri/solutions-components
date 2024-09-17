import type { Components, JSX } from "../types/components";

interface CreateRelatedFeature extends Components.CreateRelatedFeature, HTMLElement {}
export const CreateRelatedFeature: {
    prototype: CreateRelatedFeature;
    new (): CreateRelatedFeature;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
