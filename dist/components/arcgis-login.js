/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const arcgisLoginCss = ":host{display:block}";

const ArcgisLogin$1 = /*@__PURE__*/ proxyCustomElement(class ArcgisLogin extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
    }
    //--------------------------------------------------------------------------
    //
    //  Properties (public)
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  State (internal)
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Properties (protected)
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Methods (public)
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Events (public)
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Functions (lifecycle)
    //
    //--------------------------------------------------------------------------
    render() {
        return (h(Host, null, h("slot", null)));
    }
    get el() { return this; }
    static get style() { return arcgisLoginCss; }
}, [1, "arcgis-login"]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["arcgis-login"];
    components.forEach(tagName => { switch (tagName) {
        case "arcgis-login":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, ArcgisLogin$1);
            }
            break;
    } });
}
defineCustomElement$1();

const ArcgisLogin = ArcgisLogin$1;
const defineCustomElement = defineCustomElement$1;

export { ArcgisLogin, defineCustomElement };
