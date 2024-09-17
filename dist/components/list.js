/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { j as slotChangeHasAssignedElement, t as toAriaBoolean } from './dom.js';
import { c as connectInteractive, u as updateHostInteraction, d as disconnectInteractive, I as InteractiveContainer } from './interactive.js';
import { c as createObserver } from './observers.js';
import { M as MAX_COLUMNS } from './resources4.js';
import { u as updateListItemChildren, g as getListItemChildren } from './utils3.js';
import { d as disconnectSortableComponent, c as connectSortableComponent } from './sortableComponent.js';
import { d as defineCustomElement$1, S as SLOTS$1 } from './stack.js';
import { s as setUpLoadableComponent, a as setComponentLoaded, c as componentFocusable } from './loadable.js';
import { c as connectMessages, s as setUpMessages, d as disconnectMessages, u as updateMessages } from './t9n.js';
import { c as connectLocalized, d as disconnectLocalized, n as numberStringFormatter } from './locale2.js';
import { d as defineCustomElement$7 } from './filter2.js';
import { d as defineCustomElement$6 } from './icon.js';
import { d as defineCustomElement$5 } from './input.js';
import { d as defineCustomElement$4 } from './loader.js';
import { d as defineCustomElement$3 } from './progress.js';
import { d as defineCustomElement$2 } from './scrim.js';
import { d as debounce } from './debounce.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const CSS = {
    container: "container",
    table: "table",
    scrim: "scrim",
    stack: "stack",
    tableContainer: "table-container",
    sticky: "sticky-pos",
    assistiveText: "assistive-text",
};
const debounceTimeout = 0;
const SLOTS = {
    filterNoResults: "filter-no-results",
    filterActionsStart: "filter-actions-start",
    filterActionsEnd: "filter-actions-end",
};

const listCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.container{position:relative}.table-container{box-sizing:border-box;display:flex;inline-size:100%;flex-direction:column;background-color:transparent}.table-container *{box-sizing:border-box}.table{inline-size:100%;border-collapse:collapse}.stack{--calcite-stack-padding-inline:0;--calcite-stack-padding-block:0}.sticky-pos{position:sticky;inset-block-start:0px;z-index:var(--calcite-z-index-sticky);background-color:var(--calcite-color-foreground-1)}.sticky-pos th{padding:0px}.assistive-text{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteListStyle0 = listCss;

const listItemSelector = "calcite-list-item";
const parentSelector = "calcite-list-item-group, calcite-list-item";
const List = /*@__PURE__*/ proxyCustomElement(class List extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.calciteListChange = createEvent(this, "calciteListChange", 6);
        this.calciteListDragEnd = createEvent(this, "calciteListDragEnd", 6);
        this.calciteListDragStart = createEvent(this, "calciteListDragStart", 6);
        this.calciteListFilter = createEvent(this, "calciteListFilter", 6);
        this.calciteListOrderChange = createEvent(this, "calciteListOrderChange", 6);
        this.calciteInternalListDefaultSlotChange = createEvent(this, "calciteInternalListDefaultSlotChange", 6);
        this.dragSelector = listItemSelector;
        this.focusableItems = [];
        this.handleSelector = "calcite-handle";
        this.listItems = [];
        this.mutationObserver = createObserver("mutation", () => this.updateListItems());
        this.visibleItems = [];
        this.handleDefaultSlotChange = (event) => {
            updateListItemChildren(getListItemChildren(event.target));
            if (this.parentListEl) {
                this.calciteInternalListDefaultSlotChange.emit();
            }
        };
        this.handleFilterActionsStartSlotChange = (event) => {
            this.hasFilterActionsStart = slotChangeHasAssignedElement(event);
        };
        this.handleFilterActionsEndSlotChange = (event) => {
            this.hasFilterActionsEnd = slotChangeHasAssignedElement(event);
        };
        this.handleFilterNoResultsSlotChange = (event) => {
            this.hasFilterNoResults = slotChangeHasAssignedElement(event);
        };
        this.setActiveListItem = () => {
            const { focusableItems } = this;
            if (!focusableItems.some((item) => item.active)) {
                if (focusableItems[0]) {
                    focusableItems[0].active = true;
                }
            }
        };
        this.updateSelectedItems = (emit = false) => {
            this.selectedItems = this.visibleItems.filter((item) => item.selected);
            if (emit) {
                this.calciteListChange.emit();
            }
        };
        this.borderItems = () => {
            const visibleItems = this.visibleItems.filter((item) => !item.filterHidden && this.allParentListItemsOpen(item));
            visibleItems.forEach((item) => (item.bordered = item !== visibleItems[visibleItems.length - 1]));
        };
        this.updateFilteredItems = (emit = false) => {
            const { visibleItems, filteredData, filterText } = this;
            const values = filteredData.map((item) => item.value);
            const lastDescendantItems = visibleItems?.filter((listItem) => visibleItems.every((li) => li === listItem || !listItem.contains(li)));
            const filteredItems = visibleItems.filter((item) => !filterText || values.includes(item.value)) || [];
            const visibleParents = new WeakSet();
            lastDescendantItems.forEach((listItem) => this.filterElements({ el: listItem, filteredItems, visibleParents }));
            this.filteredItems = filteredItems;
            if (emit) {
                this.calciteListFilter.emit();
            }
        };
        this.setFilterEl = (el) => {
            this.filterEl = el;
            this.performFilter();
        };
        this.handleFilterChange = (event) => {
            event.stopPropagation();
            const { value } = event.currentTarget;
            this.filterText = value;
            this.updateFilteredData(true);
        };
        this.getItemData = () => {
            return this.listItems.map((item) => ({
                label: item.label,
                description: item.description,
                metadata: item.metadata,
                value: item.value,
            }));
        };
        this.updateListItems = debounce((emit = false) => {
            const { selectionAppearance, selectionMode, dragEnabled, el } = this;
            const items = Array.from(this.el.querySelectorAll(listItemSelector));
            items.forEach((item) => {
                item.selectionAppearance = selectionAppearance;
                item.selectionMode = selectionMode;
                if (item.closest("calcite-list") === el) {
                    item.dragHandle = dragEnabled;
                }
            });
            if (this.parentListEl) {
                this.setUpSorting();
                return;
            }
            this.listItems = items;
            if (this.filterEnabled) {
                this.dataForFilter = this.getItemData();
                if (this.filterEl) {
                    this.filterEl.items = this.dataForFilter;
                }
            }
            this.visibleItems = this.listItems.filter((item) => !item.closed && !item.hidden);
            this.updateFilteredItems(emit);
            this.borderItems();
            this.focusableItems = this.filteredItems.filter((item) => !item.disabled);
            this.setActiveListItem();
            this.updateSelectedItems(emit);
            this.setUpSorting();
        }, debounceTimeout);
        this.focusRow = (focusEl) => {
            const { focusableItems } = this;
            if (!focusEl) {
                return;
            }
            focusableItems.forEach((listItem) => (listItem.active = listItem === focusEl));
            focusEl.setFocus();
        };
        this.isNavigable = (listItem) => {
            const parentListItemEl = listItem.parentElement?.closest(listItemSelector);
            if (!parentListItemEl) {
                return true;
            }
            return parentListItemEl.open && this.isNavigable(parentListItemEl);
        };
        this.handleListKeydown = (event) => {
            if (event.defaultPrevented || !!this.parentListEl) {
                return;
            }
            const { key } = event;
            const navigableItems = this.focusableItems.filter((listItem) => this.isNavigable(listItem));
            const currentIndex = navigableItems.findIndex((listItem) => listItem.active);
            if (key === "ArrowDown") {
                event.preventDefault();
                const nextIndex = event.target === this.filterEl ? 0 : currentIndex + 1;
                if (navigableItems[nextIndex]) {
                    this.focusRow(navigableItems[nextIndex]);
                }
            }
            else if (key === "ArrowUp") {
                event.preventDefault();
                if (currentIndex === 0 && this.filterEnabled) {
                    this.filterEl?.setFocus();
                    return;
                }
                const prevIndex = currentIndex - 1;
                if (navigableItems[prevIndex]) {
                    this.focusRow(navigableItems[prevIndex]);
                }
            }
            else if (key === "Home") {
                event.preventDefault();
                const homeItem = navigableItems[0];
                if (homeItem) {
                    this.focusRow(homeItem);
                }
            }
            else if (key === "End") {
                event.preventDefault();
                const endItem = navigableItems[navigableItems.length - 1];
                if (endItem) {
                    this.focusRow(endItem);
                }
            }
        };
        this.disabled = false;
        this.canPull = undefined;
        this.canPut = undefined;
        this.dragEnabled = false;
        this.group = undefined;
        this.filterEnabled = false;
        this.filteredItems = [];
        this.filteredData = [];
        this.filterPlaceholder = undefined;
        this.filterText = undefined;
        this.label = undefined;
        this.loading = false;
        this.filterProps = undefined;
        this.messageOverrides = undefined;
        this.messages = undefined;
        this.numberingSystem = undefined;
        this.openable = false;
        this.selectedItems = [];
        this.selectionMode = "none";
        this.selectionAppearance = "icon";
        this.effectiveLocale = "";
        this.defaultMessages = undefined;
        this.assistiveText = undefined;
        this.dataForFilter = [];
        this.hasFilterActionsEnd = false;
        this.hasFilterActionsStart = false;
        this.hasFilterNoResults = false;
    }
    async handleFilterTextChange() {
        this.performFilter();
    }
    async handlefilterPropsChange() {
        this.performFilter();
    }
    onMessagesChange() {
        /* wired up by t9n util */
    }
    handleListItemChange() {
        this.updateListItems();
    }
    handleCalciteListItemToggle(event) {
        if (this.parentListEl) {
            return;
        }
        event.stopPropagation();
        this.borderItems();
    }
    handleCalciteInternalFocusPreviousItem(event) {
        if (this.parentListEl) {
            return;
        }
        event.stopPropagation();
        const { focusableItems } = this;
        const currentIndex = focusableItems.findIndex((listItem) => listItem.active);
        const prevIndex = currentIndex - 1;
        if (focusableItems[prevIndex]) {
            this.focusRow(focusableItems[prevIndex]);
        }
    }
    handleCalciteInternalListItemActive(event) {
        if (this.parentListEl) {
            return;
        }
        event.stopPropagation();
        const target = event.target;
        const { listItems } = this;
        listItems.forEach((listItem) => {
            listItem.active = listItem === target;
        });
    }
    handleCalciteListItemSelect() {
        if (this.parentListEl) {
            return;
        }
        this.updateSelectedItems(true);
    }
    handleCalciteInternalAssistiveTextChange(event) {
        this.assistiveText = event.detail.message;
        event.stopPropagation();
    }
    handleCalciteHandleNudge(event) {
        if (this.parentListEl) {
            return;
        }
        this.handleNudgeEvent(event);
    }
    handleCalciteInternalListItemSelect(event) {
        if (this.parentListEl) {
            return;
        }
        event.stopPropagation();
        const target = event.target;
        const { listItems, selectionMode } = this;
        if (target.selected && (selectionMode === "single" || selectionMode === "single-persist")) {
            listItems.forEach((listItem) => (listItem.selected = listItem === target));
        }
        this.updateSelectedItems();
    }
    handleCalciteInternalListItemSelectMultiple(event) {
        if (this.parentListEl) {
            return;
        }
        event.stopPropagation();
        const { target, detail } = event;
        const { focusableItems, lastSelectedInfo } = this;
        const selectedItem = target;
        if (detail.selectMultiple && !!lastSelectedInfo) {
            const currentIndex = focusableItems.indexOf(selectedItem);
            const lastSelectedIndex = focusableItems.indexOf(lastSelectedInfo.selectedItem);
            const startIndex = Math.min(lastSelectedIndex, currentIndex);
            const endIndex = Math.max(lastSelectedIndex, currentIndex);
            focusableItems
                .slice(startIndex, endIndex + 1)
                .forEach((item) => (item.selected = lastSelectedInfo.selected));
        }
        else {
            this.lastSelectedInfo = { selectedItem, selected: selectedItem.selected };
        }
    }
    handleCalciteInternalListItemChange(event) {
        if (this.parentListEl) {
            return;
        }
        event.stopPropagation();
        this.updateListItems();
    }
    handleCalciteInternalListItemGroupDefaultSlotChange(event) {
        event.stopPropagation();
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        connectLocalized(this);
        connectMessages(this);
        this.connectObserver();
        this.updateListItems();
        this.setUpSorting();
        connectInteractive(this);
        this.setParentList();
    }
    async componentWillLoad() {
        setUpLoadableComponent(this);
        await setUpMessages(this);
    }
    componentDidRender() {
        updateHostInteraction(this);
    }
    componentDidLoad() {
        setComponentLoaded(this);
    }
    disconnectedCallback() {
        this.disconnectObserver();
        disconnectSortableComponent(this);
        disconnectInteractive(this);
        disconnectLocalized(this);
        disconnectMessages(this);
    }
    effectiveLocaleChange() {
        updateMessages(this, this.effectiveLocale);
    }
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    /**
     * Sets focus on the component's first focusable element.
     *
     * @returns {Promise<void>}
     */
    async setFocus() {
        await componentFocusable(this);
        if (this.filterEnabled) {
            return this.filterEl?.setFocus();
        }
        return this.focusableItems.find((listItem) => listItem.active)?.setFocus();
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        const { loading, label, disabled, dataForFilter, filterEnabled, filterPlaceholder, filterText, filteredItems, hasFilterActionsStart, hasFilterActionsEnd, hasFilterNoResults, filterProps, } = this;
        return (h(InteractiveContainer, { key: '84991009060a8b97b9901ca97f32b32fa6e830fa', disabled: this.disabled }, h("div", { key: '27f5a904be599be5768bb1a7693111573e745e0f', class: CSS.container }, this.dragEnabled ? (h("span", { "aria-live": "assertive", class: CSS.assistiveText }, this.assistiveText)) : null, this.renderItemAriaLive(), loading ? h("calcite-scrim", { class: CSS.scrim, loading: loading }) : null, h("table", { key: 'dd343a43f26edcb50f87a064a41471756a94afeb', "aria-busy": toAriaBoolean(loading), "aria-label": label || "", class: CSS.table, onKeyDown: this.handleListKeydown, role: "treegrid" }, filterEnabled || hasFilterActionsStart || hasFilterActionsEnd ? (h("thead", { class: CSS.sticky }, h("tr", null, h("th", { colSpan: MAX_COLUMNS }, h("calcite-stack", { class: CSS.stack }, h("slot", { name: SLOTS.filterActionsStart, onSlotchange: this.handleFilterActionsStartSlotChange, slot: SLOTS$1.actionsStart }), h("calcite-filter", { "aria-label": filterPlaceholder, disabled: disabled, filterProps: filterProps, items: dataForFilter, onCalciteFilterChange: this.handleFilterChange, placeholder: filterPlaceholder, ref: this.setFilterEl, value: filterText }), h("slot", { name: SLOTS.filterActionsEnd, onSlotchange: this.handleFilterActionsEndSlotChange, slot: SLOTS$1.actionsEnd })))))) : null, h("tbody", { key: '90a288eea3e02d5261e369e14b687852c1ff876b', class: CSS.tableContainer }, h("slot", { key: '08992c3c5ad4d5afe86e7e1cd38327c5f4281bd1', onSlotchange: this.handleDefaultSlotChange }))), h("div", { key: '689185b56a2990e00a409ddbc4e4c135115791d3', "aria-live": "polite", "data-test-id": "no-results-container", hidden: !(hasFilterNoResults && filterEnabled && filterText && !filteredItems.length) }, h("slot", { key: '929ef7f843f5c8e7290a3cbcebea8c5c4cf38707', name: SLOTS.filterNoResults, onSlotchange: this.handleFilterNoResultsSlotChange })))));
    }
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    renderItemAriaLive() {
        const { messages, filteredItems, parentListEl, effectiveLocale, numberingSystem, filterEnabled, filterText, filteredData, } = this;
        numberStringFormatter.numberFormatOptions = {
            locale: effectiveLocale,
            numberingSystem,
        };
        return !parentListEl ? (h("div", { "aria-live": "polite", class: CSS.assistiveText }, filterEnabled && filterText && filteredData?.length ? (h("div", { key: "aria-filter-enabled" }, messages.filterEnabled)) : null, h("div", { key: "aria-item-count" }, messages.total.replace("{count}", numberStringFormatter.localize(filteredItems.length.toString()))), filteredItems.length ? (h("ol", { key: "aria-item-list" }, filteredItems.map((item) => (h("li", null, item.label))))) : null)) : null;
    }
    connectObserver() {
        this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
    }
    disconnectObserver() {
        this.mutationObserver?.disconnect();
    }
    setUpSorting() {
        const { dragEnabled } = this;
        if (!dragEnabled) {
            return;
        }
        connectSortableComponent(this);
    }
    onGlobalDragStart() {
        this.disconnectObserver();
    }
    onGlobalDragEnd() {
        this.connectObserver();
    }
    onDragEnd(detail) {
        this.calciteListDragEnd.emit(detail);
    }
    onDragStart(detail) {
        this.calciteListDragStart.emit(detail);
    }
    onDragSort(detail) {
        this.setParentList();
        this.updateListItems();
        this.calciteListOrderChange.emit(detail);
    }
    setParentList() {
        this.parentListEl = this.el.parentElement?.closest("calcite-list");
    }
    filterElements({ el, filteredItems, visibleParents, }) {
        const filterHidden = !visibleParents.has(el) && !filteredItems.includes(el);
        el.filterHidden = filterHidden;
        const closestParent = el.parentElement.closest(parentSelector);
        if (!closestParent) {
            return;
        }
        if (!filterHidden) {
            visibleParents.add(closestParent);
        }
        this.filterElements({
            el: closestParent,
            filteredItems,
            visibleParents,
        });
    }
    allParentListItemsOpen(item) {
        const parentItem = item.parentElement?.closest(listItemSelector);
        if (!parentItem) {
            return true;
        }
        else if (!parentItem.open) {
            return false;
        }
        return this.allParentListItemsOpen(parentItem);
    }
    updateFilteredData(emit = false) {
        const { filterEl } = this;
        if (!filterEl) {
            return;
        }
        if (filterEl.filteredItems) {
            this.filteredData = filterEl.filteredItems;
        }
        this.updateListItems(emit);
    }
    async performFilter() {
        const { filterEl, filterText, filterProps } = this;
        if (!filterEl) {
            return;
        }
        filterEl.value = filterText;
        filterEl.filterProps = filterProps;
        await filterEl.filter(filterText);
        this.updateFilteredData();
    }
    handleNudgeEvent(event) {
        const { handleSelector, dragSelector } = this;
        const { direction } = event.detail;
        const composedPath = event.composedPath();
        const handle = composedPath.find((el) => el?.tagName && el.matches(handleSelector));
        const dragEl = composedPath.find((el) => el?.tagName && el.matches(dragSelector));
        const parentEl = dragEl?.parentElement;
        if (!parentEl) {
            return;
        }
        const { filteredItems } = this;
        const sameParentItems = filteredItems.filter((item) => item.parentElement === parentEl);
        const lastIndex = sameParentItems.length - 1;
        const oldIndex = sameParentItems.indexOf(dragEl);
        let newIndex;
        if (direction === "up") {
            newIndex = oldIndex === 0 ? lastIndex : oldIndex - 1;
        }
        else {
            newIndex = oldIndex === lastIndex ? 0 : oldIndex + 1;
        }
        this.disconnectObserver();
        handle.blurUnselectDisabled = true;
        const referenceEl = (direction === "up" && newIndex !== lastIndex) || (direction === "down" && newIndex === 0)
            ? sameParentItems[newIndex]
            : sameParentItems[newIndex].nextSibling;
        parentEl.insertBefore(dragEl, referenceEl);
        this.updateListItems();
        this.connectObserver();
        this.calciteListOrderChange.emit({
            dragEl,
            fromEl: parentEl,
            toEl: parentEl,
            newIndex,
            oldIndex,
        });
        handle.setFocus().then(() => (handle.blurUnselectDisabled = false));
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return this; }
    static get watchers() { return {
        "filterText": ["handleFilterTextChange"],
        "filterProps": ["handlefilterPropsChange"],
        "messageOverrides": ["onMessagesChange"],
        "filterEnabled": ["handleListItemChange"],
        "group": ["handleListItemChange"],
        "dragEnabled": ["handleListItemChange"],
        "selectionMode": ["handleListItemChange"],
        "selectionAppearance": ["handleListItemChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
    static get style() { return CalciteListStyle0; }
}, [1, "calcite-list", {
        "disabled": [516],
        "canPull": [16],
        "canPut": [16],
        "dragEnabled": [516, "drag-enabled"],
        "group": [513],
        "filterEnabled": [516, "filter-enabled"],
        "filteredItems": [1040],
        "filteredData": [1040],
        "filterPlaceholder": [513, "filter-placeholder"],
        "filterText": [1537, "filter-text"],
        "label": [1],
        "loading": [516],
        "filterProps": [16],
        "messageOverrides": [1040],
        "messages": [1040],
        "numberingSystem": [1, "numbering-system"],
        "openable": [4],
        "selectedItems": [1040],
        "selectionMode": [513, "selection-mode"],
        "selectionAppearance": [513, "selection-appearance"],
        "effectiveLocale": [32],
        "defaultMessages": [32],
        "assistiveText": [32],
        "dataForFilter": [32],
        "hasFilterActionsEnd": [32],
        "hasFilterActionsStart": [32],
        "hasFilterNoResults": [32],
        "setFocus": [64]
    }, [[0, "calciteInternalListItemToggle", "handleCalciteListItemToggle"], [0, "calciteInternalFocusPreviousItem", "handleCalciteInternalFocusPreviousItem"], [0, "calciteInternalListItemActive", "handleCalciteInternalListItemActive"], [0, "calciteListItemSelect", "handleCalciteListItemSelect"], [0, "calciteInternalAssistiveTextChange", "handleCalciteInternalAssistiveTextChange"], [0, "calciteHandleNudge", "handleCalciteHandleNudge"], [0, "calciteInternalListItemSelect", "handleCalciteInternalListItemSelect"], [0, "calciteInternalListItemSelectMultiple", "handleCalciteInternalListItemSelectMultiple"], [0, "calciteInternalListItemChange", "handleCalciteInternalListItemChange"], [0, "calciteInternalListItemGroupDefaultSlotChange", "handleCalciteInternalListItemGroupDefaultSlotChange"]], {
        "filterText": ["handleFilterTextChange"],
        "filterProps": ["handlefilterPropsChange"],
        "messageOverrides": ["onMessagesChange"],
        "filterEnabled": ["handleListItemChange"],
        "group": ["handleListItemChange"],
        "dragEnabled": ["handleListItemChange"],
        "selectionMode": ["handleListItemChange"],
        "selectionAppearance": ["handleListItemChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-list", "calcite-filter", "calcite-icon", "calcite-input", "calcite-loader", "calcite-progress", "calcite-scrim", "calcite-stack"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-list":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, List);
            }
            break;
        case "calcite-filter":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "calcite-input":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "calcite-loader":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "calcite-progress":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "calcite-scrim":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "calcite-stack":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { List as L, defineCustomElement as d };
