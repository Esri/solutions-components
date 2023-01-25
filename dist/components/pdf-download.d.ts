import type { Components, JSX } from "../types/components";

interface PdfDownload extends Components.PdfDownload, HTMLElement {}
export const PdfDownload: {
  prototype: PdfDownload;
  new (): PdfDownload;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
