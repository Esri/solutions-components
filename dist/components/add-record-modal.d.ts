import type { Components, JSX } from "../types/components";

interface AddRecordModal extends Components.AddRecordModal, HTMLElement {}
export const AddRecordModal: {
  prototype: AddRecordModal;
  new (): AddRecordModal;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
