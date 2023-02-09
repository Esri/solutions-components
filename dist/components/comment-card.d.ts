import type { Components, JSX } from "../types/components";

interface CommentCard extends Components.CommentCard, HTMLElement {}
export const CommentCard: {
  prototype: CommentCard;
  new (): CommentCard;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
