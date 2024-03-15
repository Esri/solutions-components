/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const featureCommentsCss = ":host{display:block}";

const FeatureComments$1 = /*@__PURE__*/ proxyCustomElement(class FeatureComments extends HTMLElement {
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
    static get style() { return featureCommentsCss; }
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
