import type { Components, JSX } from "../types/components";

interface MediaCard extends Components.MediaCard, HTMLElement {}
export const MediaCard: {
  prototype: MediaCard;
  new (): MediaCard;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
