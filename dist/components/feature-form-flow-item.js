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
        return (h(Host, { key: 'e4cd5ed27b476b7f5ed699ed13422b54b84be2e5' }, h("slot", { key: 'b73e8f8b52ac166b0e85f3114ed0fb0d57a7fec9' })));
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
