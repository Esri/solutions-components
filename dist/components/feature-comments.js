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
        return (h(Host, { key: '780210a9c941efcb5f4e3b787f5c8f755047839c' }, h("slot", { key: '7ddfe4c00b1512c2f66aaf997c54c82e3059d8e5' })));
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
