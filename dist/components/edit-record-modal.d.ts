import type { Components, JSX } from "../types/components";

interface EditRecordModal extends Components.EditRecordModal, HTMLElement {}
export const EditRecordModal: {
  prototype: EditRecordModal;
  new (): EditRecordModal;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
