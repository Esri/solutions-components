import type { Components, JSX } from "../types/components";

interface MapSelectTools extends Components.MapSelectTools, HTMLElement {}
export const MapSelectTools: {
  prototype: MapSelectTools;
  new (): MapSelectTools;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
