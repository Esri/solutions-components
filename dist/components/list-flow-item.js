/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const listFlowItemCss = ":host{display:block}";
const ListFlowItemStyle0 = listFlowItemCss;

const ListFlowItem$1 = /*@__PURE__*/ proxyCustomElement(class ListFlowItem extends HTMLElement {
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
        return (h(Host, { key: 'de2fbee0068872b2eed39cb528169156a4f69615' }, h("slot", { key: '2fe9659669fe24fd4921c64548dcca0ed57111b9' })));
    }
    static get style() { return ListFlowItemStyle0; }
}, [1, "list-flow-item"]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["list-flow-item"];
    components.forEach(tagName => { switch (tagName) {
        case "list-flow-item":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, ListFlowItem$1);
            }
            break;
    } });
}
defineCustomElement$1();

const ListFlowItem = ListFlowItem$1;
const defineCustomElement = defineCustomElement$1;

export { ListFlowItem, defineCustomElement };
