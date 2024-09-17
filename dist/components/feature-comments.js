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
        return (h(Host, { key: '0d331b7c201854181dcf80f6192de2c00218b50c' }, h("slot", { key: '4b602b73d1b6d773eb49eace91df6613117e974d' })));
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
