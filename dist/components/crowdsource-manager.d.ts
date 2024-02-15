import type { Components, JSX } from "../types/components";

interface CrowdsourceManager extends Components.CrowdsourceManager, HTMLElement {}
export const CrowdsourceManager: {
    prototype: CrowdsourceManager;
    new (): CrowdsourceManager;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
