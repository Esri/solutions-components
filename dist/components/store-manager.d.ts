import type { Components, JSX } from "../types/components";

interface StoreManager extends Components.StoreManager, HTMLElement {}
export const StoreManager: {
    prototype: StoreManager;
    new (): StoreManager;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
