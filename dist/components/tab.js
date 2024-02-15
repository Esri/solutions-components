/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { x as nodeListToArray } from './dom.js';
import { g as guid } from './guid.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
const CSS = {
    container: "container",
    content: "content",
};

const tabCss = ":host([selected]) section,:host([selected]) .container{display:block}:host{display:none;block-size:100%;inline-size:100%}:host([selected]){display:block;block-size:100%;inline-size:100%;overflow:auto}.content{box-sizing:border-box;padding-block:var(--calcite-internal-tab-content-block-padding)}.scale-s{--calcite-internal-tab-content-block-padding:var(--calcite-tab-content-block-padding, 0.25rem);font-size:var(--calcite-font-size--2);line-height:1rem}.scale-m{--calcite-internal-tab-content-block-padding:var(--calcite-tab-content-block-padding, 0.5rem);font-size:var(--calcite-font-size--1);line-height:1rem}.scale-l{--calcite-internal-tab-content-block-padding:var(--calcite-tab-content-block-padding, 0.625rem);font-size:var(--calcite-font-size-0);line-height:1.25rem}section,.container{display:none;block-size:100%;inline-size:100%}:host([hidden]){display:none}[hidden]{display:none}";

const Tab = /*@__PURE__*/ proxyCustomElement(class Tab extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.calciteInternalTabRegister = createEvent(this, "calciteInternalTabRegister", 6);
        this.guid = `calcite-tab-title-${guid()}`;
        this.tab = undefined;
        this.selected = false;
        this.scale = "m";
        this.labeledBy = undefined;
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    render() {
        const id = this.el.id || this.guid;
        return (h(Host, { "aria-labelledby": this.labeledBy, id: id }, h("div", { class: { [CSS.container]: true, [`scale-${this.scale}`]: true }, role: "tabpanel", tabIndex: this.selected ? 0 : -1 }, h("section", { class: CSS.content }, h("slot", null)))));
    }
    connectedCallback() {
        this.parentTabsEl = this.el.closest("calcite-tabs");
    }
    componentDidLoad() {
        this.calciteInternalTabRegister.emit();
    }
    disconnectedCallback() {
        var _a;
        // Dispatching to body in order to be listened by other elements that are still connected to the DOM.
        (_a = document.body) === null || _a === void 0 ? void 0 : _a.dispatchEvent(new CustomEvent("calciteTabUnregister", {
            detail: this.el,
        }));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    internalTabChangeHandler(event) {
        const targetTabsEl = event
            .composedPath()
            .find((el) => el.tagName === "CALCITE-TABS");
        // to allow `<calcite-tabs>` to be nested we need to make sure this
        // `calciteTabChange` event was actually fired from a within the same
        // `<calcite-tabs>` that is the a parent of this tab.
        if (targetTabsEl !== this.parentTabsEl) {
            return;
        }
        if (this.tab) {
            this.selected = this.tab === event.detail.tab;
        }
        else {
            this.getTabIndex().then((index) => {
                this.selected = index === event.detail.tab;
            });
        }
        event.stopPropagation();
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /**
     * Returns the index of the component item within the tab array.
     */
    async getTabIndex() {
        return Array.prototype.indexOf.call(nodeListToArray(this.el.parentElement.children).filter((el) => el.matches("calcite-tab")), this.el);
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    /**
     * @param tabIds
     * @param titleIds
     * @internal
     */
    async updateAriaInfo(tabIds = [], titleIds = []) {
        this.labeledBy = titleIds[tabIds.indexOf(this.el.id)] || null;
    }
    get el() { return this; }
    static get style() { return tabCss; }
}, [1, "calcite-tab", {
        "tab": [513],
        "selected": [1540],
        "scale": [1],
        "labeledBy": [32],
        "getTabIndex": [64],
        "updateAriaInfo": [64]
    }, [[16, "calciteInternalTabChange", "internalTabChangeHandler"]]]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-tab"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-tab":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, Tab);
            }
            break;
    } });
}
defineCustomElement();

export { Tab as T, defineCustomElement as d };
