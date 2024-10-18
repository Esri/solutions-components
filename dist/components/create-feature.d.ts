import type { Components, JSX } from "../types/components";

interface CreateFeature extends Components.CreateFeature, HTMLElement {}
export const CreateFeature: {
    prototype: CreateFeature;
    new (): CreateFeature;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
