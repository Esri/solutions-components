import type { Components, JSX } from "../types/components";

interface SolutionConfiguration extends Components.SolutionConfiguration, HTMLElement {}
export const SolutionConfiguration: {
    prototype: SolutionConfiguration;
    new (): SolutionConfiguration;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
