import type { Components, JSX } from "../types/components";

interface CardManager extends Components.CardManager, HTMLElement {}
export const CardManager: {
  prototype: CardManager;
  new (): CardManager;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
