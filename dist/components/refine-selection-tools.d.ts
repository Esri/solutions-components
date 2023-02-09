import type { Components, JSX } from "../types/components";

interface RefineSelectionTools extends Components.RefineSelectionTools, HTMLElement {}
export const RefineSelectionTools: {
  prototype: RefineSelectionTools;
  new (): RefineSelectionTools;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
