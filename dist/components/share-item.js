/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const shareItemCss = ":host{display:block}";
const ShareItemStyle0 = shareItemCss;

const ShareItem$1 = /*@__PURE__*/ proxyCustomElement(class ShareItem extends HTMLElement {
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
        return (h(Host, { key: '17019e6a85cc0c41c221808b0d5a694215493f98' }, h("slot", { key: 'bd4613b9fe970e8e6d1b67a707f31525d6dfde19' })));
    }
    static get style() { return ShareItemStyle0; }
}, [1, "share-item"]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["share-item"];
    components.forEach(tagName => { switch (tagName) {
        case "share-item":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, ShareItem$1);
            }
            break;
    } });
}
defineCustomElement$1();

const ShareItem = ShareItem$1;
const defineCustomElement = defineCustomElement$1;

export { ShareItem, defineCustomElement };
