/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { c as connectLocalized, d as disconnectLocalized } from './locale2.js';
import { u as updateMessages, c as connectMessages, s as setUpMessages, d as disconnectMessages } from './t9n.js';
import { c as createObserver } from './observers.js';
import { x as slotChangeHasContent } from './dom.js';
import { d as defineCustomElement$1 } from './loader.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const CSS = {
    scrim: "scrim",
    content: "content",
};
const BREAKPOINTS = {
    s: 72, // Less than 72px.
    // medium is assumed default.
    l: 480, // Greater than or equal to 480px.
};

const scrimCss = ":host{--calcite-scrim-background:var(--calcite-color-transparent-scrim);position:absolute;inset:0px;z-index:var(--calcite-z-index-overlay);display:flex;block-size:100%;inline-size:100%;flex-direction:column;align-items:stretch}@keyframes calcite-scrim-fade-in{0%{--tw-bg-opacity:0}100%{--tw-text-opacity:1}}.scrim{position:absolute;inset:0px;display:flex;flex-direction:column;align-content:center;align-items:center;justify-content:center;overflow:hidden;animation:calcite-scrim-fade-in var(--calcite-internal-animation-timing-medium) ease-in-out;background-color:var(--calcite-scrim-background, var(--calcite-color-transparent-scrim))}.content{padding:1rem}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteScrimStyle0 = scrimCss;

const Scrim = /*@__PURE__*/ proxyCustomElement(class Scrim extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.resizeObserver = createObserver("resize", () => this.handleResize());
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.handleDefaultSlotChange = (event) => {
            this.hasContent = slotChangeHasContent(event);
        };
        this.storeLoaderEl = (el) => {
            this.loaderEl = el;
            this.handleResize();
        };
        this.loading = false;
        this.messages = undefined;
        this.messageOverrides = undefined;
        this.loaderScale = undefined;
        this.defaultMessages = undefined;
        this.effectiveLocale = "";
        this.hasContent = false;
    }
    onMessagesChange() {
        /* wired up by t9n util */
    }
    effectiveLocaleChange() {
        updateMessages(this, this.effectiveLocale);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        connectLocalized(this);
        connectMessages(this);
        this.resizeObserver?.observe(this.el);
    }
    async componentWillLoad() {
        await setUpMessages(this);
    }
    disconnectedCallback() {
        disconnectLocalized(this);
        disconnectMessages(this);
        this.resizeObserver?.disconnect();
    }
    // --------------------------------------------------------------------------
    //
    //  Render Method
    //
    // --------------------------------------------------------------------------
    render() {
        const { hasContent, loading, messages } = this;
        return (h("div", { key: 'e31839948c0689b6daeac22f3b2471fb049c834b', class: CSS.scrim }, loading ? (h("calcite-loader", { label: messages.loading, ref: this.storeLoaderEl, scale: this.loaderScale })) : null, h("div", { key: '500b2dcbdcb6c3287ea613fd0f1357de7f3ff347', class: CSS.content, hidden: !hasContent }, h("slot", { key: 'eea29ac4a454cf3cd51933a73911b70114ab6f77', onSlotchange: this.handleDefaultSlotChange }))));
    }
    getScale(size) {
        if (size < BREAKPOINTS.s) {
            return "s";
        }
        else if (size >= BREAKPOINTS.l) {
            return "l";
        }
        else {
            return "m";
        }
    }
    handleResize() {
        const { loaderEl, el } = this;
        if (!loaderEl) {
            return;
        }
        this.loaderScale = this.getScale(Math.min(el.clientHeight, el.clientWidth) ?? 0);
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return this; }
    static get watchers() { return {
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
    static get style() { return CalciteScrimStyle0; }
}, [1, "calcite-scrim", {
        "loading": [516],
        "messages": [1040],
        "messageOverrides": [1040],
        "loaderScale": [32],
        "defaultMessages": [32],
        "effectiveLocale": [32],
        "hasContent": [32]
    }, undefined, {
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-scrim", "calcite-loader"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-scrim":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, Scrim);
            }
            break;
        case "calcite-loader":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { Scrim as S, defineCustomElement as d };
