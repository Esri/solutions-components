import type { Components, JSX } from "../types/components";

interface DeleteDialog extends Components.DeleteDialog, HTMLElement {}
export const DeleteDialog: {
    prototype: DeleteDialog;
    new (): DeleteDialog;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
