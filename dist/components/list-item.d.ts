import type { Components, JSX } from "../types/components";

interface ListItem extends Components.ListItem, HTMLElement {}
export const ListItem: {
  prototype: ListItem;
  new (): ListItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
