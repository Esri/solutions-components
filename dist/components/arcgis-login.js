/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const arcgisLoginCss = ":host{display:block}";
const ArcgisLoginStyle0 = arcgisLoginCss;

const ArcgisLogin$1 = /*@__PURE__*/ proxyCustomElement(class ArcgisLogin extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
    }
    get el() { return this; }
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
        return (h(Host, { key: 'b71ecf635ef91c3604665890c3eec5c5bc51651c' }, h("slot", { key: '77c4af2284404bc351b1eb93a81b2151f8e8cce1' })));
    }
    static get style() { return ArcgisLoginStyle0; }
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
