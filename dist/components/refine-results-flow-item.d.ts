import type { Components, JSX } from "../types/components";

interface RefineResultsFlowItem extends Components.RefineResultsFlowItem, HTMLElement {}
export const RefineResultsFlowItem: {
    prototype: RefineResultsFlowItem;
    new (): RefineResultsFlowItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
