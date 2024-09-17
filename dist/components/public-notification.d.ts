import type { Components, JSX } from "../types/components";

interface PublicNotification extends Components.PublicNotification, HTMLElement {}
export const PublicNotification: {
    prototype: PublicNotification;
    new (): PublicNotification;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
