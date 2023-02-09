import type { Components, JSX } from "../types/components";

interface InfoCard extends Components.InfoCard, HTMLElement {}
export const InfoCard: {
  prototype: InfoCard;
  new (): InfoCard;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
