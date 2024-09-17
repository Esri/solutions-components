import type { Components, JSX } from "../types/components";

interface EditCard extends Components.EditCard, HTMLElement {}
export const EditCard: {
    prototype: EditCard;
    new (): EditCard;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
