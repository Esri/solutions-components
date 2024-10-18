/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { A as nodeListToArray } from './dom.js';
import { g as guid } from './guid.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const CSS = {
    container: "container",
    content: "content",
};

const tabCss = ":host([selected]) section,:host([selected]) .container{display:block}:host{display:none;block-size:100%;inline-size:100%}:host([selected]){display:block;block-size:100%;inline-size:100%;overflow:auto}.content{box-sizing:border-box;padding-block:var(--calcite-internal-tab-content-block-padding)}.scale-s{--calcite-internal-tab-content-block-padding:var(--calcite-tab-content-block-padding, 0.25rem);font-size:var(--calcite-font-size--2);line-height:1rem}.scale-m{--calcite-internal-tab-content-block-padding:var(--calcite-tab-content-block-padding, 0.5rem);font-size:var(--calcite-font-size--1);line-height:1rem}.scale-l{--calcite-internal-tab-content-block-padding:var(--calcite-tab-content-block-padding, 0.625rem);font-size:var(--calcite-font-size-0);line-height:1.25rem}section,.container{display:none;block-size:100%;inline-size:100%}.container{outline-color:transparent}.container:focus{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteTabStyle0 = tabCss;

const Tab = /*@__PURE__*/ proxyCustomElement(class Tab extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
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
        return (h(Host, { key: '5b445405fc60d4af5d48e2b4b42880a47a85a1ed', "aria-labelledby": this.labeledBy, id: id }, h("div", { key: '724b67e8c277d00f6408aa55f781ad8e91a34a5e', class: { [CSS.container]: true, [`scale-${this.scale}`]: true }, role: "tabpanel", tabIndex: this.selected ? 0 : -1 }, h("section", { key: '9a395308243994365184c0f91d8a16de357c9146', class: CSS.content }, h("slot", { key: '0cddbc27b9d793c83fa580b9aa9c9f915675ec72' })))));
    }
    connectedCallback() {
        this.parentTabsEl = this.el.closest("calcite-tabs");
    }
    disconnectedCallback() {
        // Dispatching to body in order to be listened by other elements that are still connected to the DOM.
        document.body?.dispatchEvent(new CustomEvent("calciteTabUnregister", {
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
    static get style() { return CalciteTabStyle0; }
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
