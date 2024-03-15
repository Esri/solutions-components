import type { Components, JSX } from "../types/components";

interface CookieTest extends Components.CookieTest, HTMLElement {}
export const CookieTest: {
    prototype: CookieTest;
    new (): CookieTest;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
