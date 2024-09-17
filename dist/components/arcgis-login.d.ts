import type { Components, JSX } from "../types/components";

interface ArcgisLogin extends Components.ArcgisLogin, HTMLElement {}
export const ArcgisLogin: {
    prototype: ArcgisLogin;
    new (): ArcgisLogin;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
