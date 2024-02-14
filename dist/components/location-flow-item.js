/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const locationFlowItemCss = ":host{display:block}";

const LocationFlowItem$1 = /*@__PURE__*/ proxyCustomElement(class LocationFlowItem extends HTMLElement {
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
    static get style() { return locationFlowItemCss; }
}, [1, "location-flow-item"]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["location-flow-item"];
    components.forEach(tagName => { switch (tagName) {
        case "location-flow-item":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, LocationFlowItem$1);
            }
            break;
    } });
}
defineCustomElement$1();

const LocationFlowItem = LocationFlowItem$1;
const defineCustomElement = defineCustomElement$1;

export { LocationFlowItem, defineCustomElement };
