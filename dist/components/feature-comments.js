/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const featureCommentsCss = ":host{display:block}";
const FeatureCommentsStyle0 = featureCommentsCss;

const FeatureComments$1 = /*@__PURE__*/ proxyCustomElement(class FeatureComments extends HTMLElement {
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
        return (h(Host, { key: 'b58aca4fb9f05091f7b4c9a622755afed968a539' }, h("slot", { key: '806ab314b95a05252b5d558722b3dcb68e9b5b44' })));
    }
    static get style() { return FeatureCommentsStyle0; }
}, [1, "feature-comments"]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["feature-comments"];
    components.forEach(tagName => { switch (tagName) {
        case "feature-comments":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, FeatureComments$1);
            }
            break;
    } });
}
defineCustomElement$1();

const FeatureComments = FeatureComments$1;
const defineCustomElement = defineCustomElement$1;

export { FeatureComments, defineCustomElement };
