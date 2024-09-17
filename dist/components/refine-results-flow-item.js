/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const refineResultsFlowItemCss = ":host{display:block}";
const RefineResultsFlowItemStyle0 = refineResultsFlowItemCss;

const RefineResultsFlowItem$1 = /*@__PURE__*/ proxyCustomElement(class RefineResultsFlowItem extends HTMLElement {
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
        return (h(Host, { key: '80b7f73a51e599fecc98483da51aa24ebbd0efed' }, h("slot", { key: '0824e1e1a33659e6161aab76449a6df39538398a' })));
    }
    static get style() { return RefineResultsFlowItemStyle0; }
}, [1, "refine-results-flow-item"]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["refine-results-flow-item"];
    components.forEach(tagName => { switch (tagName) {
        case "refine-results-flow-item":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RefineResultsFlowItem$1);
            }
            break;
    } });
}
defineCustomElement$1();

const RefineResultsFlowItem = RefineResultsFlowItem$1;
const defineCustomElement = defineCustomElement$1;

export { RefineResultsFlowItem, defineCustomElement };
