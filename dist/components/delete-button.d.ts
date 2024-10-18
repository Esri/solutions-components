import type { Components, JSX } from "../types/components";

interface DeleteButton extends Components.DeleteButton, HTMLElement {}
export const DeleteButton: {
    prototype: DeleteButton;
    new (): DeleteButton;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
