/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { u as updateHostInteraction } from './interactive.js';
import { s as setUpLoadableComponent, a as setComponentLoaded, c as componentFocusable } from './loadable.js';
import { c as connectLocalized, d as disconnectLocalized } from './locale2.js';
import { c as createObserver } from './observers.js';
import { u as updateMessages, c as connectMessages, s as setUpMessages, d as disconnectMessages } from './t9n.js';
import { q as getItemIndex, m as mutationObserverCallback, d as deselectRemovedItems, a as deselectSiblingItems, s as selectSiblings, h as handleFilter, b as handleFilterEvent, g as getItemData, k as keyDownHandler, t as moveItemIndex, i as initialize, c as initializeObserver, f as handleInitialFilter, e as cleanUpObserver, n as calciteListFocusOutHandler, r as removeItem, j as calciteListItemChangeHandler, l as calciteInternalListItemValueChangeHandler, o as setUpItems, p as setFocus, L as List } from './shared-list-render.js';
import { d as disconnectSortableComponent, c as connectSortableComponent } from './sortableComponent.js';
import { f as focusElement, t as toAriaBoolean } from './dom.js';
import { l as logger } from './logger.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const CSS = {
    container: "container",
    handle: "handle",
};
const ICON_TYPES = {
    grip: "grip",
};

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
function getScreenReaderText(item, status, valueList) {
    const { items, messages } = valueList;
    const total = items.length;
    const position = getItemIndex(valueList, item) + 1;
    const template = status === "idle"
        ? messages.dragHandleIdle
        : status === "active"
            ? messages.dragHandleActive
            : status === "change"
                ? messages.dragHandleChange
                : messages.dragHandleCommit;
    return replacePlaceholders(template, item.label, position, total);
}
function getHandleAndItemElement(event) {
    const handle = event
        .composedPath()
        .find((item) => item.dataset?.jsHandle !== undefined);
    const item = event
        .composedPath()
        .find((item) => item.tagName?.toLowerCase() === "calcite-value-list-item");
    return { handle, item };
}
function replacePlaceholders(text, label, position, total) {
    const replacePosition = text.replace("{position}", position.toString());
    const replaceLabel = replacePosition.replace("{itemLabel}", label);
    return replaceLabel.replace("{total}", total.toString());
}

const valueListCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;box-sizing:border-box;display:flex;flex-shrink:0;flex-grow:0;flex-direction:column;align-items:stretch;background-color:transparent;font-size:var(--calcite-font-size--1);color:var(--calcite-color-text-2)}:host *{box-sizing:border-box}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}calcite-value-list-item:last-of-type{--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}:host([filter-enabled]) header{margin-block-end:0.25rem;display:flex;align-items:center;justify-content:flex-end;background-color:var(--calcite-color-foreground-1);--tw-shadow:0 1px 0 var(--calcite-color-border-3);--tw-shadow-colored:0 1px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}:host([filter-enabled]) header.sticky-pos{position:sticky;inset-block-start:0px;z-index:var(--calcite-z-index-sticky)}calcite-filter{margin-block-end:1px}.assistive-text{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteValueListStyle0 = valueListCss;

logger.deprecated("component", {
    name: "value-list",
    removalVersion: 3,
    suggested: "list",
});
const ValueList = /*@__PURE__*/ proxyCustomElement(class ValueList extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.calciteListChange = createEvent(this, "calciteListChange", 6);
        this.calciteListOrderChange = createEvent(this, "calciteListOrderChange", 6);
        this.calciteListFilter = createEvent(this, "calciteListFilter", 6);
        this.lastSelectedItem = null;
        this.mutationObserver = createObserver("mutation", mutationObserverCallback.bind(this));
        this.handleSelector = `.${CSS.handle}`;
        this.dragSelector = "calcite-value-list-item";
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
        this.keyDownHandler = (event) => {
            if (event.defaultPrevented) {
                return;
            }
            const { handle, item } = getHandleAndItemElement(event);
            if (handle && !item.handleActivated && event.key === " ") {
                this.updateScreenReaderText(getScreenReaderText(item, "commit", this));
            }
            if (!handle || !item.handleActivated) {
                keyDownHandler.call(this, event);
                return;
            }
            event.preventDefault();
            const { items } = this;
            if (event.key === " ") {
                this.updateScreenReaderText(getScreenReaderText(item, "active", this));
            }
            if ((event.key !== "ArrowUp" && event.key !== "ArrowDown") || items.length <= 1) {
                return;
            }
            const { el } = this;
            const nextIndex = moveItemIndex(this, item, event.key === "ArrowUp" ? "up" : "down");
            if (nextIndex === items.length - 1) {
                el.appendChild(item);
            }
            else {
                const itemAtNextIndex = el.children[nextIndex];
                const insertionReferenceItem = itemAtNextIndex === item.nextElementSibling
                    ? itemAtNextIndex.nextElementSibling
                    : itemAtNextIndex;
                el.insertBefore(item, insertionReferenceItem);
            }
            this.items = this.getItems();
            this.calciteListOrderChange.emit(this.items.map(({ value }) => value));
            requestAnimationFrame(() => focusElement(handle));
            item.handleActivated = true;
            this.updateHandleAriaLabel(handle, getScreenReaderText(item, "change", this));
        };
        this.storeAssistiveEl = (el) => {
            this.assistiveTextEl = el;
        };
        this.handleFocusIn = (event) => {
            const { handle, item } = getHandleAndItemElement(event);
            if (!item?.handleActivated && item && handle) {
                this.updateHandleAriaLabel(handle, getScreenReaderText(item, "idle", this));
            }
        };
        this.disabled = false;
        this.canPull = undefined;
        this.canPut = undefined;
        this.dragEnabled = false;
        this.filteredItems = [];
        this.filteredData = [];
        this.filterEnabled = false;
        this.filterPlaceholder = undefined;
        this.filterText = undefined;
        this.group = undefined;
        this.loading = false;
        this.multiple = false;
        this.selectionFollowsFocus = false;
        this.messageOverrides = undefined;
        this.messages = undefined;
        this.dataForFilter = [];
        this.defaultMessages = undefined;
        this.effectiveLocale = "";
        this.selectedValues = new Map();
    }
    onMessagesChange() {
        /* wired up by t9n util */
    }
    effectiveLocaleChange() {
        updateMessages(this, this.effectiveLocale);
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    connectedCallback() {
        connectLocalized(this);
        connectMessages(this);
        initialize.call(this);
        initializeObserver.call(this);
        this.setUpSorting();
    }
    async componentWillLoad() {
        setUpLoadableComponent(this);
        await setUpMessages(this);
    }
    componentDidLoad() {
        setComponentLoaded(this);
        handleInitialFilter.call(this);
    }
    componentDidRender() {
        updateHostInteraction(this);
    }
    disconnectedCallback() {
        disconnectSortableComponent(this);
        disconnectLocalized(this);
        disconnectMessages(this);
        cleanUpObserver.call(this);
    }
    calciteListFocusOutHandler(event) {
        calciteListFocusOutHandler.call(this, event);
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
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    onGlobalDragStart() {
        cleanUpObserver.call(this);
    }
    onGlobalDragEnd() {
        initializeObserver.call(this);
    }
    onDragEnd() { }
    onDragStart() { }
    onDragSort() {
        this.items = Array.from(this.el.querySelectorAll("calcite-value-list-item"));
        const values = this.items.map((item) => item.value);
        this.calciteListOrderChange.emit(values);
    }
    getItems() {
        return Array.from(this.el.querySelectorAll("calcite-value-list-item"));
    }
    setUpItems() {
        setUpItems.call(this, "calcite-value-list-item");
        this.setUpSorting();
    }
    setUpFilter() {
        if (this.filterEnabled) {
            this.dataForFilter = this.getItemData();
        }
    }
    setUpSorting() {
        const { dragEnabled } = this;
        if (!dragEnabled) {
            return;
        }
        connectSortableComponent(this);
    }
    handleBlur() {
        if (this.dragEnabled) {
            this.updateScreenReaderText("");
        }
    }
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    /** Returns the component's selected items. */
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
        let type = null;
        if (this.dragEnabled) {
            type = ICON_TYPES.grip;
        }
        return type;
    }
    updateScreenReaderText(text) {
        this.assistiveTextEl.textContent = text;
    }
    updateHandleAriaLabel(handleElement, text) {
        handleElement.ariaLabel = text;
    }
    handleValueListItemBlur(event) {
        const { item, handle } = event.detail;
        if (!item?.handleActivated && item) {
            this.updateHandleAriaLabel(handle, getScreenReaderText(item, "idle", this));
        }
        event.stopPropagation();
    }
    render() {
        return (h(Host, { key: 'b9e38d57ffd1d2b686264d87f809e712c33c5cc5', "aria-busy": toAriaBoolean(this.loading), onBlur: this.handleBlur, onFocusin: this.handleFocusIn, onKeyDown: this.keyDownHandler, role: "menu" }, h(List, { key: '18d18babe0959692bebdb17ec427b53fc4697b08', props: this })));
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return this; }
    static get watchers() { return {
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
    static get style() { return CalciteValueListStyle0; }
}, [1, "calcite-value-list", {
        "disabled": [516],
        "canPull": [16],
        "canPut": [16],
        "dragEnabled": [516, "drag-enabled"],
        "filteredItems": [1040],
        "filteredData": [1040],
        "filterEnabled": [516, "filter-enabled"],
        "filterPlaceholder": [513, "filter-placeholder"],
        "filterText": [1537, "filter-text"],
        "group": [513],
        "loading": [516],
        "multiple": [516],
        "selectionFollowsFocus": [516, "selection-follows-focus"],
        "messageOverrides": [1040],
        "messages": [1040],
        "dataForFilter": [32],
        "defaultMessages": [32],
        "effectiveLocale": [32],
        "selectedValues": [32],
        "getSelectedItems": [64],
        "setFocus": [64]
    }, [[0, "focusout", "calciteListFocusOutHandler"], [0, "calciteListItemRemove", "calciteListItemRemoveHandler"], [0, "calciteListItemChange", "calciteListItemChangeHandler"], [0, "calciteInternalListItemPropsChange", "calciteInternalListItemPropsChangeHandler"], [0, "calciteInternalListItemValueChange", "calciteInternalListItemValueChangeHandler"], [0, "calciteValueListItemDragHandleBlur", "handleValueListItemBlur"]], {
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-value-list"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-value-list":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, ValueList);
            }
            break;
    } });
}
defineCustomElement();

export { ValueList as V, defineCustomElement as d };
