/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { j as slotChangeHasAssignedElement, t as toAriaBoolean } from './dom.js';
import { c as connectInteractive, u as updateHostInteraction, d as disconnectInteractive, I as InteractiveContainer } from './interactive.js';
import { c as createObserver } from './observers.js';
import { u as updateListItemChildren, g as getListItemChildren, M as MAX_COLUMNS } from './utils3.js';
import { d as dragActive, a as disconnectSortableComponent, c as connectSortableComponent } from './sortableComponent.js';
import { S as SLOTS$1, d as defineCustomElement$1 } from './stack.js';
import { s as setUpLoadableComponent, a as setComponentLoaded, c as componentFocusable } from './loadable.js';
import { c as connectMessages, s as setUpMessages, d as disconnectMessages, u as updateMessages } from './t9n.js';
import { n as numberStringFormatter } from './locale2.js';
import { d as defineCustomElement$7 } from './filter2.js';
import { d as defineCustomElement$6 } from './icon.js';
import { d as defineCustomElement$5 } from './input.js';
import { d as defineCustomElement$4 } from './loader.js';
import { d as defineCustomElement$3 } from './progress.js';
import { d as defineCustomElement$2 } from './scrim.js';
import { d as debounce } from './debounce.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
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

const listCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.container{position:relative}.table-container{box-sizing:border-box;display:flex;inline-size:100%;flex-direction:column;background-color:transparent}.table-container *{box-sizing:border-box}.table{inline-size:100%;border-collapse:collapse}.stack{--calcite-stack-padding-inline:0;--calcite-stack-padding-block:0}::slotted(calcite-list-item){--tw-shadow:0 -1px 0 var(--calcite-color-border-3);--tw-shadow-colored:0 -1px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);margin-block-start:1px}::slotted(calcite-list-item:first-of-type){--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}::slotted(calcite-list-item[data-filter]){--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);margin-block-start:0px}.sticky-pos{position:sticky;inset-block-start:0px;z-index:var(--calcite-z-index-sticky);background-color:var(--calcite-color-foreground-1)}.sticky-pos th{padding:0px}.assistive-text{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0}:host([hidden]){display:none}[hidden]{display:none}";

const listItemSelector = "calcite-list-item";
const listItemSelectorDirect = `:scope > calcite-list-item`;
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
        this.updateFilteredItems = (emit = false) => {
            const { visibleItems, filteredData, filterText } = this;
            const values = filteredData.map((item) => item.value);
            const lastDescendantItems = visibleItems === null || visibleItems === void 0 ? void 0 : visibleItems.filter((listItem) => visibleItems.every((li) => li === listItem || !listItem.contains(li)));
            const filteredItems = visibleItems.filter((item) => !filterText || values.includes(item.value)) || [];
            const visibleParents = new WeakSet();
            lastDescendantItems.forEach((listItem) => this.filterElements({ el: listItem, filteredItems, visibleParents }));
            if (filteredItems.length > 0) {
                this.findAncestorOfFirstFilteredItem(filteredItems);
            }
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
            const { selectionAppearance, selectionMode, dragEnabled } = this;
            if (!!this.parentListEl) {
                const items = this.queryListItems(true);
                items.forEach((item) => {
                    item.dragHandle = dragEnabled;
                });
                this.setUpSorting();
                return;
            }
            const items = this.queryListItems();
            items.forEach((item) => {
                item.selectionAppearance = selectionAppearance;
                item.selectionMode = selectionMode;
            });
            const dragItems = this.queryListItems(true);
            dragItems.forEach((item) => {
                item.dragHandle = dragEnabled;
            });
            this.listItems = items;
            if (this.filterEnabled) {
                this.dataForFilter = this.getItemData();
                if (this.filterEl) {
                    this.filterEl.items = this.dataForFilter;
                }
            }
            this.visibleItems = this.listItems.filter((item) => !item.closed && !item.hidden);
            this.updateFilteredItems(emit);
            this.focusableItems = this.filteredItems.filter((item) => !item.disabled);
            this.setActiveListItem();
            this.updateSelectedItems(emit);
            this.setUpSorting();
        }, debounceTimeout);
        this.queryListItems = (direct = false) => {
            return Array.from(this.el.querySelectorAll(direct ? listItemSelectorDirect : listItemSelector));
        };
        this.focusRow = (focusEl) => {
            const { focusableItems } = this;
            if (!focusEl) {
                return;
            }
            focusableItems.forEach((listItem) => (listItem.active = listItem === focusEl));
            focusEl.setFocus();
        };
        this.isNavigable = (listItem) => {
            var _a;
            const parentListItemEl = (_a = listItem.parentElement) === null || _a === void 0 ? void 0 : _a.closest(listItemSelector);
            if (!parentListItemEl) {
                return true;
            }
            return parentListItemEl.open && this.isNavigable(parentListItemEl);
        };
        this.handleListKeydown = (event) => {
            var _a;
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
                    (_a = this.filterEl) === null || _a === void 0 ? void 0 : _a.setFocus();
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
        this.findAncestorOfFirstFilteredItem = (filteredItems) => {
            var _a, _b;
            (_a = this.ancestorOfFirstFilteredItem) === null || _a === void 0 ? void 0 : _a.removeAttribute("data-filter");
            filteredItems.forEach((item) => {
                item.removeAttribute("data-filter");
            });
            this.ancestorOfFirstFilteredItem = this.getTopLevelAncestorItemElement(filteredItems[0]);
            filteredItems[0].setAttribute("data-filter", "0");
            (_b = this.ancestorOfFirstFilteredItem) === null || _b === void 0 ? void 0 : _b.setAttribute("data-filter", "0");
        };
        this.getTopLevelAncestorItemElement = (el) => {
            let closestParent = el.parentElement.closest(listItemSelector);
            while (closestParent) {
                const closestListItemAncestor = closestParent.parentElement.closest(listItemSelector);
                if (closestListItemAncestor) {
                    closestParent = closestListItemAncestor;
                }
                else {
                    return closestParent;
                }
            }
            return null;
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
    onMessagesChange() {
        /* wired up by t9n util */
    }
    handleListItemChange() {
        this.updateListItems();
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
        if (!!this.parentListEl) {
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
        if (!!this.parentListEl) {
            return;
        }
        this.updateSelectedItems(true);
    }
    handleCalciteInternalAssistiveTextChange(event) {
        this.assistiveText = event.detail.message;
        event.stopPropagation();
    }
    handleCalciteHandleNudge(event) {
        if (!!this.parentListEl) {
            return;
        }
        this.handleNudgeEvent(event);
    }
    handleCalciteInternalListItemSelect(event) {
        if (!!this.parentListEl) {
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
        if (!!this.parentListEl) {
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
        if (!!this.parentListEl) {
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
        if (dragActive(this)) {
            return;
        }
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
        if (dragActive(this)) {
            return;
        }
        this.disconnectObserver();
        disconnectSortableComponent(this);
        disconnectInteractive(this);
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
        var _a, _b;
        await componentFocusable(this);
        if (this.filterEnabled) {
            return (_a = this.filterEl) === null || _a === void 0 ? void 0 : _a.setFocus();
        }
        return (_b = this.focusableItems.find((listItem) => listItem.active)) === null || _b === void 0 ? void 0 : _b.setFocus();
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        const { loading, label, disabled, dataForFilter, filterEnabled, filterPlaceholder, filterText, filteredItems, hasFilterActionsStart, hasFilterActionsEnd, hasFilterNoResults, } = this;
        return (h(InteractiveContainer, { disabled: this.disabled }, h("div", { class: CSS.container }, this.dragEnabled ? (h("span", { "aria-live": "assertive", class: CSS.assistiveText }, this.assistiveText)) : null, this.renderItemAriaLive(), loading ? h("calcite-scrim", { class: CSS.scrim, loading: loading }) : null, h("table", { "aria-busy": toAriaBoolean(loading), "aria-label": label || "", class: CSS.table, onKeyDown: this.handleListKeydown, role: "treegrid" }, filterEnabled || hasFilterActionsStart || hasFilterActionsEnd ? (h("thead", null, h("tr", { class: { [CSS.sticky]: true } }, h("th", { colSpan: MAX_COLUMNS }, h("calcite-stack", { class: CSS.stack }, h("slot", { name: SLOTS.filterActionsStart, onSlotchange: this.handleFilterActionsStartSlotChange, slot: SLOTS$1.actionsStart }), h("calcite-filter", { "aria-label": filterPlaceholder, disabled: disabled, items: dataForFilter, onCalciteFilterChange: this.handleFilterChange, placeholder: filterPlaceholder, value: filterText,
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: this.setFilterEl }), h("slot", { name: SLOTS.filterActionsEnd, onSlotchange: this.handleFilterActionsEndSlotChange, slot: SLOTS$1.actionsEnd })))))) : null, h("tbody", { class: CSS.tableContainer }, h("slot", { onSlotchange: this.handleDefaultSlotChange }))), h("div", { "aria-live": "polite", "data-test-id": "no-results-container", hidden: !(hasFilterNoResults && filterEnabled && filterText && !filteredItems.length) }, h("slot", { name: SLOTS.filterNoResults, onSlotchange: this.handleFilterNoResultsSlotChange })))));
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
        return !parentListEl ? (h("div", { "aria-live": "polite", class: CSS.assistiveText }, filterEnabled && filterText && (filteredData === null || filteredData === void 0 ? void 0 : filteredData.length) ? (h("div", { key: "aria-filter-enabled" }, messages.filterEnabled)) : null, h("div", { key: "aria-item-count" }, messages.total.replace("{count}", numberStringFormatter.localize(filteredItems.length.toString()))), filteredItems.length ? (h("ol", { key: "aria-item-list" }, filteredItems.map((item) => (h("li", null, item.label))))) : null)) : null;
    }
    connectObserver() {
        var _a;
        (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.observe(this.el, { childList: true, subtree: true });
    }
    disconnectObserver() {
        var _a;
        (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
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
        var _a;
        this.parentListEl = (_a = this.el.parentElement) === null || _a === void 0 ? void 0 : _a.closest("calcite-list");
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
        const { filterEl, filterText } = this;
        if (!filterEl) {
            return;
        }
        filterEl.value = filterText;
        await filterEl.filter(filterText);
        this.updateFilteredData();
    }
    handleNudgeEvent(event) {
        const { handleSelector, dragSelector } = this;
        const { direction } = event.detail;
        const composedPath = event.composedPath();
        const handle = composedPath.find((el) => (el === null || el === void 0 ? void 0 : el.tagName) && el.matches(handleSelector));
        const dragEl = composedPath.find((el) => (el === null || el === void 0 ? void 0 : el.tagName) && el.matches(dragSelector));
        const parentEl = dragEl === null || dragEl === void 0 ? void 0 : dragEl.parentElement;
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
        "messageOverrides": ["onMessagesChange"],
        "filterEnabled": ["handleListItemChange"],
        "group": ["handleListItemChange"],
        "dragEnabled": ["handleListItemChange"],
        "selectionMode": ["handleListItemChange"],
        "selectionAppearance": ["handleListItemChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
    static get style() { return listCss; }
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
    }, [[0, "calciteInternalFocusPreviousItem", "handleCalciteInternalFocusPreviousItem"], [0, "calciteInternalListItemActive", "handleCalciteInternalListItemActive"], [0, "calciteListItemSelect", "handleCalciteListItemSelect"], [0, "calciteInternalAssistiveTextChange", "handleCalciteInternalAssistiveTextChange"], [0, "calciteHandleNudge", "handleCalciteHandleNudge"], [0, "calciteInternalListItemSelect", "handleCalciteInternalListItemSelect"], [0, "calciteInternalListItemSelectMultiple", "handleCalciteInternalListItemSelectMultiple"], [0, "calciteInternalListItemChange", "handleCalciteInternalListItemChange"], [0, "calciteInternalListItemGroupDefaultSlotChange", "handleCalciteInternalListItemGroupDefaultSlotChange"]], {
        "filterText": ["handleFilterTextChange"],
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
