import type { Components, JSX } from "../types/components";

interface CheckList extends Components.CheckList, HTMLElement {}
export const CheckList: {
  prototype: CheckList;
  new (): CheckList;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
