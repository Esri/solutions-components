import type { Components, JSX } from "../types/components";

interface JsonEditor extends Components.JsonEditor, HTMLElement {}
export const JsonEditor: {
  prototype: JsonEditor;
  new (): JsonEditor;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
