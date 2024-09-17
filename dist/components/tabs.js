/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Fragment } from '@stencil/core/internal/client';
import { h as slotChangeGetAssignedElements, C as getSlotAssignedElements } from './dom.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const SLOTS = {
    titleGroup: "title-group",
};

const tabsCss = ":host{display:flex;flex-direction:column}:host([bordered]){box-shadow:inset 0 1px 0 var(--calcite-color-border-1);background-color:var(--calcite-color-foreground-1)}:host([bordered]) section{border-width:1px;border-style:solid;border-color:var(--calcite-color-border-1)}:host([bordered][position=bottom]){box-shadow:inset 0 1px 0 var(--calcite-color-border-1), inset 0 -1px 0 var(--calcite-color-border-1)}:host([bordered]:not([position=bottom])) ::slotted(calcite-tab-nav){margin-block-end:-1px}:host([bordered][scale=s]) section{padding:0.75rem}:host([bordered][scale=m]) section{padding:0.5rem}:host([bordered][scale=l]) section{padding:1rem}:host([position=bottom]){flex-direction:column-reverse}section{display:flex;flex-grow:1;overflow:hidden;border-block-start-width:1px;border-block-start-color:var(--calcite-color-border-1);border-block-start-style:solid}:host([position=bottom]) section{flex-direction:column-reverse;border-block-start-width:0px;border-block-end-width:1px;border-block-end-color:var(--calcite-color-border-1)}:host([position=bottom]:not([bordered])) section{border-block-end-style:solid}@media (forced-colors: active){:host([bordered]) section{border-block-start-width:0px;border-block-end-width:1px}:host([position=bottom][bordered]) section{border-block-start-width:1px;border-block-end-width:0px}}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteTabsStyle0 = tabsCss;

const Tabs = /*@__PURE__*/ proxyCustomElement(class Tabs extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.defaultSlotChangeHandler = (event) => {
            this.tabs = slotChangeGetAssignedElements(event, "calcite-tab");
        };
        this.setDefaultSlotRef = (el) => (this.slotEl = el);
        this.layout = "inline";
        this.position = "top";
        this.scale = "m";
        this.bordered = false;
        this.titles = [];
        this.tabs = [];
    }
    handleInheritableProps() {
        this.updateItems();
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    calciteInternalTabNavSlotChangeHandler(event) {
        event.stopPropagation();
        if (event.detail.length !== this.titles.length) {
            this.titles = event.detail;
        }
    }
    titlesWatcher() {
        this.updateAriaSettings();
        this.updateItems();
    }
    tabsWatcher() {
        this.updateAriaSettings();
        this.updateItems();
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    /**
     *
     * Matches up elements from the internal `tabs` and `titles` to automatically
     * update the ARIA attributes and link `<calcite-tab>` and
     * `<calcite-tab-title>` components.
     */
    async updateAriaSettings() {
        let tabIds;
        let titleIds;
        const tabs = getSlotAssignedElements(this.slotEl, "calcite-tab");
        // determine if we are using `tab` based or `index` based tab identifiers.
        if (tabs.some((el) => el.tab) || this.titles.some((el) => el.tab)) {
            // if we are using `tab` based identifiers sort by `tab` to account for
            // possible out of order tabs and get the id of each tab
            tabIds = tabs.sort((a, b) => a.tab.localeCompare(b.tab)).map((el) => el.id);
            titleIds = this.titles.sort((a, b) => a.tab.localeCompare(b.tab)).map((el) => el.id);
        }
        else {
            // if we are using index based tabs then the `<calcite-tab>` and
            // `<calcite-tab-title>` might have been rendered out of order so the
            // order of `this.tabs` and `this.titles` might not reflect the DOM state,
            // and might not match each other so we need to get the index of all the
            // tabs and titles in the DOM order to match them up as a source of truth
            const tabDomIndexes = await Promise.all(tabs.map((el) => el.getTabIndex()));
            const titleDomIndexes = await Promise.all(this.titles.map((el) => el.getTabIndex()));
            // once we have the DOM order as a source of truth we can build the
            // matching tabIds and titleIds arrays
            tabIds = tabDomIndexes.reduce((ids, indexInDOM, registryIndex) => {
                ids[indexInDOM] = tabs[registryIndex].id;
                return ids;
            }, []);
            titleIds = titleDomIndexes.reduce((ids, indexInDOM, registryIndex) => {
                ids[indexInDOM] = this.titles[registryIndex].id;
                return ids;
            }, []);
        }
        // pass all our new aria information to each `<calcite-tab>` and
        // `<calcite-tab-title>` which will check if they can update their internal
        // `controlled` or `labeledBy` states and re-render if necessary
        tabs.forEach((el) => el.updateAriaInfo(tabIds, titleIds));
        this.titles.forEach((el) => el.updateAriaInfo(tabIds, titleIds));
    }
    updateItems() {
        const { position, scale } = this;
        const nav = this.el.querySelector("calcite-tab-nav");
        if (nav) {
            nav.position = position;
            nav.scale = scale;
        }
        Array.from(this.el.querySelectorAll("calcite-tab")).forEach((tab) => {
            if (tab.parentElement === this.el) {
                tab.scale = scale;
            }
        });
        Array.from(this.el.querySelectorAll("calcite-tab-nav > calcite-tab-title")).forEach((title) => {
            title.position = position;
            title.scale = scale;
        });
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        this.updateItems();
    }
    async componentWillLoad() {
        this.updateItems();
    }
    disconnectedCallback() { }
    render() {
        return (h(Fragment, { key: '300872682f4f969586b06b6bbfa5cccb5a005e03' }, h("slot", { key: '9b8c09c2f93725349a98d13fb0167c88b82ef413', name: SLOTS.titleGroup }), h("section", { key: 'bf1b19251ca8ab3ba4c3c3fa15995889d71d9355' }, h("slot", { key: 'e1008e065225b4f0cb1b4fbe2ec91ab761db1144', onSlotchange: this.defaultSlotChangeHandler, ref: this.setDefaultSlotRef }))));
    }
    get el() { return this; }
    static get watchers() { return {
        "position": ["handleInheritableProps"],
        "scale": ["handleInheritableProps"],
        "titles": ["titlesWatcher"],
        "tabs": ["tabsWatcher"]
    }; }
    static get style() { return CalciteTabsStyle0; }
}, [1, "calcite-tabs", {
        "layout": [513],
        "position": [513],
        "scale": [513],
        "bordered": [4],
        "titles": [32],
        "tabs": [32]
    }, [[0, "calciteInternalTabNavSlotChange", "calciteInternalTabNavSlotChangeHandler"]], {
        "position": ["handleInheritableProps"],
        "scale": ["handleInheritableProps"],
        "titles": ["titlesWatcher"],
        "tabs": ["tabsWatcher"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-tabs"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-tabs":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, Tabs);
            }
            break;
    } });
}
defineCustomElement();

export { Tabs as T, defineCustomElement as d };
