/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { u as updateHostInteraction } from './interactive.js';
import { s as setUpLoadableComponent, a as setComponentLoaded, c as componentFocusable } from './loadable.js';
import { c as createObserver } from './observers.js';
import { l as logger } from './logger.js';
import { t as toAriaBoolean } from './dom.js';
import { I as ICON_TYPES } from './resources5.js';
import { m as mutationObserverCallback, d as deselectRemovedItems, a as deselectSiblingItems, s as selectSiblings, h as handleFilter, b as handleFilterEvent, g as getItemData, k as keyDownHandler, i as initialize, c as initializeObserver, e as cleanUpObserver, f as handleInitialFilter, r as removeItem, j as calciteListItemChangeHandler, l as calciteInternalListItemValueChangeHandler, n as calciteListFocusOutHandler, o as setUpItems, p as setFocus, L as List } from './shared-list-render.js';

const pickListCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;box-sizing:border-box;display:flex;flex-shrink:0;flex-grow:1;flex-direction:column;align-items:stretch;background-color:transparent;font-size:var(--calcite-font-size--1);line-height:1rem;color:var(--calcite-color-text-2)}:host *{box-sizing:border-box}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([filter-enabled]) header{margin-block-end:0.25rem;display:flex;align-items:stretch;justify-content:flex-end;background-color:var(--calcite-color-foreground-1);--tw-shadow:0 1px 0 var(--calcite-color-border-3);--tw-shadow-colored:0 1px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}:host([filter-enabled]) header.sticky-pos{position:sticky;inset-block-start:0px;z-index:var(--calcite-z-index)}calcite-filter{margin-block-end:0px}:host([loading][disabled]){min-block-size:2rem}:host([hidden]){display:none}[hidden]{display:none}";
const CalcitePickListStyle0 = pickListCss;

logger.deprecated("component", {
    name: "pick-list",
    removalVersion: 3,
    suggested: "list",
});
const PickList = /*@__PURE__*/ proxyCustomElement(class PickList extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.calciteListChange = createEvent(this, "calciteListChange", 6);
        this.calciteListFilter = createEvent(this, "calciteListFilter", 6);
        this.lastSelectedItem = null;
        this.mutationObserver = createObserver("mutation", mutationObserverCallback.bind(this));
        this.setFilterEl = (el) => {
            this.filterEl = el;
        };
        this.setFilteredItems = (filteredItems) => {
            this.filteredItems = filteredItems;
        };
        this.deselectRemovedItems = deselectRemovedItems.bind(this);
        this.deselectSiblingItems = deselectSiblingItems.bind(this);
        this.selectSiblings = selectSiblings.bind(this);
        this.handleFilter = handleFilter.bind(this);
        this.handleFilterEvent = handleFilterEvent.bind(this);
        this.getItemData = getItemData.bind(this);
        this.keyDownHandler = keyDownHandler.bind(this);
        this.disabled = false;
        this.filteredItems = [];
        this.filteredData = [];
        this.filterEnabled = false;
        this.filterPlaceholder = undefined;
        this.filterText = undefined;
        this.headingLevel = undefined;
        this.loading = false;
        this.multiple = false;
        this.selectionFollowsFocus = false;
        this.selectedValues = new Map();
        this.dataForFilter = [];
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    connectedCallback() {
        initialize.call(this);
        initializeObserver.call(this);
    }
    disconnectedCallback() {
        cleanUpObserver.call(this);
    }
    componentWillLoad() {
        setUpLoadableComponent(this);
    }
    componentDidLoad() {
        setComponentLoaded(this);
        handleInitialFilter.call(this);
    }
    componentDidRender() {
        updateHostInteraction(this);
    }
    calciteListItemRemoveHandler(event) {
        removeItem.call(this, event);
    }
    calciteListItemChangeHandler(event) {
        calciteListItemChangeHandler.call(this, event);
    }
    calciteInternalListItemPropsChangeHandler(event) {
        event.stopPropagation();
        this.setUpFilter();
    }
    calciteInternalListItemValueChangeHandler(event) {
        calciteInternalListItemValueChangeHandler.call(this, event);
        event.stopPropagation();
    }
    calciteListFocusOutHandler(event) {
        calciteListFocusOutHandler.call(this, event);
    }
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    setUpItems() {
        setUpItems.call(this, "calcite-pick-list-item");
    }
    setUpFilter() {
        if (this.filterEnabled) {
            this.dataForFilter = this.getItemData();
        }
    }
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    /** Returns the component's selected `calcite-pick-list-item`s. */
    async getSelectedItems() {
        return this.selectedValues;
    }
    /**
     * Sets focus on the component's first focusable element.
     *
     * @param focusId
     */
    async setFocus(focusId) {
        await componentFocusable(this);
        return setFocus.call(this, focusId);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    getIconType() {
        return this.multiple ? ICON_TYPES.square : ICON_TYPES.circle;
    }
    render() {
        return (h(Host, { key: '3ee6797e112491804c876fcd4a4604a1251a5340', "aria-busy": toAriaBoolean(this.loading), onKeyDown: this.keyDownHandler, role: "menu" }, h(List, { key: '7051d4428ef065516d29ac2e84f7736216af45a5', props: this })));
    }
    get el() { return this; }
    static get style() { return CalcitePickListStyle0; }
}, [1, "calcite-pick-list", {
        "disabled": [516],
        "filteredItems": [1040],
        "filteredData": [1040],
        "filterEnabled": [516, "filter-enabled"],
        "filterPlaceholder": [513, "filter-placeholder"],
        "filterText": [1537, "filter-text"],
        "headingLevel": [514, "heading-level"],
        "loading": [516],
        "multiple": [516],
        "selectionFollowsFocus": [516, "selection-follows-focus"],
        "selectedValues": [32],
        "dataForFilter": [32],
        "getSelectedItems": [64],
        "setFocus": [64]
    }, [[0, "calciteListItemRemove", "calciteListItemRemoveHandler"], [0, "calciteListItemChange", "calciteListItemChangeHandler"], [0, "calciteInternalListItemPropsChange", "calciteInternalListItemPropsChangeHandler"], [0, "calciteInternalListItemValueChange", "calciteInternalListItemValueChangeHandler"], [0, "focusout", "calciteListFocusOutHandler"]]]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-pick-list"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-pick-list":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, PickList);
            }
            break;
    } });
}
defineCustomElement$1();

const CalcitePickList = PickList;
const defineCustomElement = defineCustomElement$1;

export { CalcitePickList, defineCustomElement };
