import type { Components, JSX } from "../types/components";

interface SolutionTemplateData extends Components.SolutionTemplateData, HTMLElement {}
export const SolutionTemplateData: {
    prototype: SolutionTemplateData;
    new (): SolutionTemplateData;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
