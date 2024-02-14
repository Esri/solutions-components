/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const featureFormFlowItemCss = ":host{display:block}";

const FeatureFormFlowItem$1 = /*@__PURE__*/ proxyCustomElement(class FeatureFormFlowItem extends HTMLElement {
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
    static get style() { return featureFormFlowItemCss; }
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
