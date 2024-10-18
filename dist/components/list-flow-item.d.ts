import type { Components, JSX } from "../types/components";

interface ListFlowItem extends Components.ListFlowItem, HTMLElement {}
export const ListFlowItem: {
    prototype: ListFlowItem;
    new (): ListFlowItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
