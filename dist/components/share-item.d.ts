import type { Components, JSX } from "../types/components";

interface ShareItem extends Components.ShareItem, HTMLElement {}
export const ShareItem: {
    prototype: ShareItem;
    new (): ShareItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
