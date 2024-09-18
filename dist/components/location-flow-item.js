/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const locationFlowItemCss = ":host{display:block}";
const LocationFlowItemStyle0 = locationFlowItemCss;

const LocationFlowItem$1 = /*@__PURE__*/ proxyCustomElement(class LocationFlowItem extends HTMLElement {
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
        return (h(Host, { key: '44f15dad4893959dd570a66bdaa6e2e60d9e785b' }, h("slot", { key: '7ed13d492b7e7f2890e1c1347a6d804acd4ecdd2' })));
    }
    static get style() { return LocationFlowItemStyle0; }
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
