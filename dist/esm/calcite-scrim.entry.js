/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, h, g as getElement } from './index-164d485a.js';
import { c as connectLocalized, d as disconnectLocalized } from './locale-904407bf.js';
import { u as updateMessages, c as connectMessages, s as setUpMessages, d as disconnectMessages } from './t9n-436fb2b1.js';
import { c as createObserver } from './observers-d04d1da9.js';
import { D as slotChangeHasContent } from './dom-38c6f027.js';
import './key-c83d835f.js';
import './guid-b75a5f7b.js';
import './resources-8834f920.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
const CSS = {
    scrim: "scrim",
    content: "content",
};
const BREAKPOINTS = {
    s: 72,
    // medium is assumed default.
    l: 480, // Greater than or equal to 480px.
};

const scrimCss = ":host{--calcite-scrim-background:var(--calcite-color-transparent-scrim);position:absolute;inset:0px;z-index:var(--calcite-z-index-overlay);display:flex;block-size:100%;inline-size:100%;flex-direction:column;align-items:stretch}@keyframes calcite-scrim-fade-in{0%{--tw-bg-opacity:0}100%{--tw-text-opacity:1}}.scrim{position:absolute;inset:0px;display:flex;flex-direction:column;align-content:center;align-items:center;justify-content:center;overflow:hidden;animation:calcite-scrim-fade-in var(--calcite-internal-animation-timing-medium) ease-in-out;background-color:var(--calcite-scrim-background, var(--calcite-color-transparent-scrim))}.content{padding:1rem}:host([hidden]){display:none}[hidden]{display:none}";

const Scrim = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        var _a;
        connectLocalized(this);
        connectMessages(this);
        (_a = this.resizeObserver) === null || _a === void 0 ? void 0 : _a.observe(this.el);
    }
    async componentWillLoad() {
        await setUpMessages(this);
    }
    disconnectedCallback() {
        var _a;
        disconnectLocalized(this);
        disconnectMessages(this);
        (_a = this.resizeObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
    }
    // --------------------------------------------------------------------------
    //
    //  Render Method
    //
    // --------------------------------------------------------------------------
    render() {
        const { hasContent, loading, messages } = this;
        return (h("div", { class: CSS.scrim }, loading ? (h("calcite-loader", { label: messages.loading, scale: this.loaderScale,
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: this.storeLoaderEl })) : null, h("div", { class: CSS.content, hidden: !hasContent }, h("slot", { onSlotchange: this.handleDefaultSlotChange }))));
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
        var _a;
        const { loaderEl, el } = this;
        if (!loaderEl) {
            return;
        }
        this.loaderScale = this.getScale((_a = Math.min(el.clientHeight, el.clientWidth)) !== null && _a !== void 0 ? _a : 0);
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return getElement(this); }
    static get watchers() { return {
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
};
Scrim.style = scrimCss;

export { Scrim as calcite_scrim };
