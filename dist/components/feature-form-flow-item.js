/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const featureFormFlowItemCss = ":host{display:block}";
const FeatureFormFlowItemStyle0 = featureFormFlowItemCss;

const FeatureFormFlowItem$1 = /*@__PURE__*/ proxyCustomElement(class FeatureFormFlowItem extends HTMLElement {
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
        return (h(Host, { key: '9745847efb7d9c8401c46e9fb39bbc3e504d4226' }, h("slot", { key: '4dd37d4b0152928c5557c5a69e04f95782f310b3' })));
    }
    static get style() { return FeatureFormFlowItemStyle0; }
}, [1, "feature-form-flow-item"]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["feature-form-flow-item"];
    components.forEach(tagName => { switch (tagName) {
        case "feature-form-flow-item":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, FeatureFormFlowItem$1);
            }
            break;
    } });
}
defineCustomElement$1();

const FeatureFormFlowItem = FeatureFormFlowItem$1;
const defineCustomElement = defineCustomElement$1;

export { FeatureFormFlowItem, defineCustomElement };
