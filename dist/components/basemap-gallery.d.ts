import type { Components, JSX } from "../types/components";

interface BasemapGallery extends Components.BasemapGallery, HTMLElement {}
export const BasemapGallery: {
    prototype: BasemapGallery;
    new (): BasemapGallery;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
