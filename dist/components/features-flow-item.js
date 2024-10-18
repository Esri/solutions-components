/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const featuresFlowItemCss = ":host{display:block}";
const FeaturesFlowItemStyle0 = featuresFlowItemCss;

const FeaturesFlowItem$1 = /*@__PURE__*/ proxyCustomElement(class FeaturesFlowItem extends HTMLElement {
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
        return (h(Host, { key: 'b775a26ab493f17e0e93ba5713b407566d37683d' }, h("slot", { key: '05f063062f8cced80ae18d36e7ef08abe6b15839' })));
    }
    static get style() { return FeaturesFlowItemStyle0; }
}, [1, "features-flow-item"]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["features-flow-item"];
    components.forEach(tagName => { switch (tagName) {
        case "features-flow-item":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, FeaturesFlowItem$1);
            }
            break;
    } });
}
defineCustomElement$1();

const FeaturesFlowItem = FeaturesFlowItem$1;
const defineCustomElement = defineCustomElement$1;

export { FeaturesFlowItem, defineCustomElement };
