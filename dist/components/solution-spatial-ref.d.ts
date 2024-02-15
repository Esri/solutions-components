import type { Components, JSX } from "../types/components";

interface SolutionSpatialRef extends Components.SolutionSpatialRef, HTMLElement {}
export const SolutionSpatialRef: {
    prototype: SolutionSpatialRef;
    new (): SolutionSpatialRef;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
