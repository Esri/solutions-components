/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, g as getElement, H as Host } from './index-164d485a.js';
import { f as filter } from './filter-ce763acf.js';
import { c as connectInteractive, u as updateHostInteraction, d as disconnectInteractive, I as InteractiveContainer } from './interactive-39bf5602.js';
import { s as setUpLoadableComponent, a as setComponentLoaded, c as componentFocusable } from './loadable-37e7fbd6.js';
import { c as connectLocalized, d as disconnectLocalized, n as numberStringFormatter } from './locale-904407bf.js';
import { u as updateMessages, s as setUpMessages, c as connectMessages, d as disconnectMessages } from './t9n-436fb2b1.js';
import { d as debounce } from './debounce-229b1a22.js';
import { t as toAriaBoolean, u as slotChangeHasAssignedElement, B as getFirstTabbable, a as getElementDir } from './dom-38c6f027.js';
import { c as createObserver } from './observers-d04d1da9.js';
import { u as updateListItemChildren, a as getListItemChildren, M as MAX_COLUMNS, b as activeCellTestAttribute, g as getDepth, I as ICONS$2, C as CSS$4, S as SLOTS$2, c as getListItemChildLists } from './utils-d2b2562a.js';
import { d as dragActive, a as disconnectSortableComponent, c as connectSortableComponent } from './sortableComponent-d7cd11a3.js';
import './browser-d60104bd.js';
import './key-c83d835f.js';
import './guid-b75a5f7b.js';
import './resources-8834f920.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
const CSS$3 = {
    container: "container",
    searchIcon: "search-icon",
};
const ICONS$1 = {
    search: "search",
    close: "x",
};
const DEBOUNCE_TIMEOUT = 250;

const filterCss = ":host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex;inline-size:100%}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.container{display:flex;inline-size:100%;padding:0.5rem}label{position:relative;margin-inline:0.25rem;margin-block:0px;display:flex;inline-size:100%;align-items:center;overflow:hidden}input[type=text]{margin-block-end:0.25rem;inline-size:100%;border-style:none;background-color:transparent;padding-block:0.25rem;font-family:inherit;font-size:var(--calcite-font-size--2);line-height:1rem;color:var(--calcite-color-text-1);padding-inline-end:0.25rem;padding-inline-start:1.5rem;transition:padding var(--calcite-animation-timing), box-shadow var(--calcite-animation-timing)}input[type=text]::-ms-clear{display:none}calcite-input{inline-size:100%}.search-icon{position:absolute;display:flex;color:var(--calcite-color-text-2);inset-inline-start:0;transition:inset-inline-start var(--calcite-animation-timing), inset-inline-end var(--calcite-animation-timing), opacity var(--calcite-animation-timing)}input[type=text]:focus{border-color:var(--calcite-color-brand);outline:2px solid transparent;outline-offset:2px;padding-inline:0.25rem}input[type=text]:focus~.search-icon{inset-inline-start:calc(1rem * -1);opacity:0}.clear-button{display:flex;cursor:pointer;align-items:center;border-width:0px;background-color:transparent;color:var(--calcite-color-text-2)}.clear-button:hover,.clear-button:focus{color:var(--calcite-color-text-1)}:host([hidden]){display:none}[hidden]{display:none}";

const Filter = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.calciteFilterChange = createEvent(this, "calciteFilterChange", 6);
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.filterDebounced = debounce((value, emit = false, onFilter) => this.items.length && this.updateFiltered(filter(this.items, value), emit, onFilter), DEBOUNCE_TIMEOUT);
        this.inputHandler = (event) => {
            const target = event.target;
            this.value = target.value;
            this.filterDebounced(target.value, true);
        };
        this.keyDownHandler = (event) => {
            if (event.key === "Escape") {
                this.clear();
                event.preventDefault();
            }
            if (event.key === "Enter") {
                event.preventDefault();
            }
        };
        this.clear = () => {
            this.value = "";
            this.filterDebounced("", true);
            this.setFocus();
        };
        this.items = [];
        this.disabled = false;
        this.filteredItems = [];
        this.placeholder = undefined;
        this.scale = "m";
        this.value = "";
        this.messages = undefined;
        this.messageOverrides = undefined;
        this.effectiveLocale = undefined;
        this.defaultMessages = undefined;
    }
    watchItemsHandler() {
        this.filterDebounced(this.value);
    }
    onMessagesChange() {
        /* wired up by t9n util */
    }
    valueHandler(value) {
        this.filterDebounced(value);
    }
    effectiveLocaleChange() {
        updateMessages(this, this.effectiveLocale);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    async componentWillLoad() {
        setUpLoadableComponent(this);
        if (this.items.length) {
            this.updateFiltered(filter(this.items, this.value));
        }
        await setUpMessages(this);
    }
    connectedCallback() {
        connectInteractive(this);
        connectLocalized(this);
        connectMessages(this);
    }
    componentDidRender() {
        updateHostInteraction(this);
    }
    disconnectedCallback() {
        disconnectInteractive(this);
        disconnectLocalized(this);
        disconnectMessages(this);
        this.filterDebounced.cancel();
    }
    componentDidLoad() {
        setComponentLoaded(this);
    }
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    /**
     * Performs a filter on the component.
     *
     * This method can be useful because filtering is delayed and asynchronous.
     *
     * @param {string} value - The filter text value.
     * @returns {Promise<void>}
     */
    async filter(value = this.value) {
        return new Promise((resolve) => {
            this.value = value;
            this.filterDebounced(value, false, resolve);
        });
    }
    /** Sets focus on the component. */
    async setFocus() {
        var _a;
        await componentFocusable(this);
        (_a = this.el) === null || _a === void 0 ? void 0 : _a.focus();
    }
    updateFiltered(filtered, emit = false, callback) {
        this.filteredItems = filtered;
        if (emit) {
            this.calciteFilterChange.emit();
        }
        callback === null || callback === void 0 ? void 0 : callback();
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        const { disabled, scale } = this;
        return (h(InteractiveContainer, { disabled: disabled }, h("div", { class: CSS$3.container }, h("label", null, h("calcite-input", { clearable: true, disabled: disabled, icon: ICONS$1.search, label: this.messages.label, messageOverrides: { clear: this.messages.clear }, onCalciteInputInput: this.inputHandler, onKeyDown: this.keyDownHandler, placeholder: this.placeholder, scale: scale, type: "text", value: this.value,
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: (el) => {
                this.textInput = el;
            } })))));
    }
    static get delegatesFocus() { return true; }
    static get assetsDirs() { return ["assets"]; }
    get el() { return getElement(this); }
    static get watchers() { return {
        "items": ["watchItemsHandler"],
        "messageOverrides": ["onMessagesChange"],
        "value": ["valueHandler"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
};
Filter.style = filterCss;

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
const CSS$2 = {
    handle: "handle",
    handleSelected: "handle--selected",
};
const ICONS = {
    drag: "drag",
};
const SUBSTITUTIONS = {
    itemLabel: "{itemLabel}",
    position: "{position}",
    total: "{total}",
};

const handleCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex}.handle{display:flex;align-items:center;justify-content:center;align-self:stretch;border-style:none;background-color:transparent;outline-color:transparent;color:var(--calcite-color-border-input);padding-block:0.75rem;padding-inline:0.25rem;line-height:0}.handle calcite-icon{color:inherit}:host(:not([disabled])) .handle{cursor:move}:host(:not([disabled])) .handle:hover{background-color:var(--calcite-color-foreground-2);color:var(--calcite-color-text-1)}:host(:not([disabled])) .handle:focus{color:var(--calcite-color-text-1);outline:2px solid var(--calcite-color-brand);outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}:host(:not([disabled])) .handle--selected{background-color:var(--calcite-color-foreground-3);color:var(--calcite-color-text-1)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}";

const Handle = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.calciteHandleChange = createEvent(this, "calciteHandleChange", 6);
        this.calciteHandleNudge = createEvent(this, "calciteHandleNudge", 6);
        this.calciteInternalAssistiveTextChange = createEvent(this, "calciteInternalAssistiveTextChange", 6);
        this.handleKeyDown = (event) => {
            if (this.disabled) {
                return;
            }
            switch (event.key) {
                case " ":
                    this.selected = !this.selected;
                    this.calciteHandleChange.emit();
                    event.preventDefault();
                    break;
                case "ArrowUp":
                    if (!this.selected) {
                        return;
                    }
                    event.preventDefault();
                    this.calciteHandleNudge.emit({ direction: "up" });
                    break;
                case "ArrowDown":
                    if (!this.selected) {
                        return;
                    }
                    event.preventDefault();
                    this.calciteHandleNudge.emit({ direction: "down" });
                    break;
            }
        };
        this.handleBlur = () => {
            if (this.blurUnselectDisabled || this.disabled) {
                return;
            }
            if (this.selected) {
                this.selected = false;
                this.calciteHandleChange.emit();
            }
        };
        this.selected = false;
        this.disabled = false;
        this.dragHandle = undefined;
        this.messages = undefined;
        this.setPosition = undefined;
        this.setSize = undefined;
        this.label = undefined;
        this.blurUnselectDisabled = false;
        this.messageOverrides = undefined;
        this.effectiveLocale = undefined;
        this.defaultMessages = undefined;
    }
    handleAriaTextChange() {
        const message = this.getAriaText("live");
        if (message) {
            this.calciteInternalAssistiveTextChange.emit({
                message,
            });
        }
    }
    onMessagesChange() {
        /* wired up by t9n util */
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        connectInteractive(this);
        connectMessages(this);
        connectLocalized(this);
    }
    async componentWillLoad() {
        setUpLoadableComponent(this);
        await setUpMessages(this);
    }
    componentDidLoad() {
        setComponentLoaded(this);
    }
    componentDidRender() {
        updateHostInteraction(this);
    }
    disconnectedCallback() {
        disconnectInteractive(this);
        disconnectMessages(this);
        disconnectLocalized(this);
    }
    effectiveLocaleChange() {
        updateMessages(this, this.effectiveLocale);
    }
    // --------------------------------------------------------------------------
    //
    //  Methods
    //
    // --------------------------------------------------------------------------
    /** Sets focus on the component. */
    async setFocus() {
        var _a;
        await componentFocusable(this);
        (_a = this.handleButton) === null || _a === void 0 ? void 0 : _a.focus();
    }
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    getTooltip() {
        const { label, messages } = this;
        if (!messages) {
            return "";
        }
        if (!label) {
            return messages.dragHandleUntitled;
        }
        return messages.dragHandle.replace(SUBSTITUTIONS.itemLabel, label);
    }
    getAriaText(type) {
        const { setPosition, setSize, label, messages, selected } = this;
        if (!messages || !label || typeof setSize !== "number" || typeof setPosition !== "number") {
            return null;
        }
        const text = type === "label"
            ? selected
                ? messages.dragHandleChange
                : messages.dragHandleIdle
            : selected
                ? messages.dragHandleActive
                : messages.dragHandleCommit;
        const replacePosition = text.replace(SUBSTITUTIONS.position, setPosition.toString());
        const replaceLabel = replacePosition.replace(SUBSTITUTIONS.itemLabel, label);
        return replaceLabel.replace(SUBSTITUTIONS.total, setSize.toString());
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        return (
        // Needs to be a span because of https://github.com/SortableJS/Sortable/issues/1486
        h("span", { "aria-disabled": this.disabled ? toAriaBoolean(this.disabled) : null, "aria-label": this.disabled ? null : this.getAriaText("label"), "aria-pressed": this.disabled ? null : toAriaBoolean(this.selected), class: { [CSS$2.handle]: true, [CSS$2.handleSelected]: !this.disabled && this.selected }, onBlur: this.handleBlur, onKeyDown: this.handleKeyDown, role: "button", tabIndex: this.disabled ? null : 0, title: this.getTooltip(),
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: (el) => {
                this.handleButton = el;
            } }, h("calcite-icon", { icon: ICONS.drag, scale: "s" })));
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return getElement(this); }
    static get watchers() { return {
        "messages": ["handleAriaTextChange"],
        "label": ["handleAriaTextChange"],
        "selected": ["handleAriaTextChange"],
        "setPosition": ["handleAriaTextChange"],
        "setSize": ["handleAriaTextChange"],
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
};
Handle.style = handleCss;

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
const CSS$1 = {
    container: "container",
    table: "table",
    scrim: "scrim",
    stack: "stack",
    tableContainer: "table-container",
    sticky: "sticky-pos",
    assistiveText: "assistive-text",
};
const debounceTimeout = 0;
const SLOTS$1 = {
    filterNoResults: "filter-no-results",
    filterActionsStart: "filter-actions-start",
    filterActionsEnd: "filter-actions-end",
};

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
const CSS = {
    container: "container",
    actionsStart: "actions-start",
    contentStart: "content-start",
    content: "content",
    contentEnd: "content-end",
    actionsEnd: "actions-end",
};
const SLOTS = {
    actionsStart: "actions-start",
    contentStart: "content-start",
    contentEnd: "content-end",
    actionsEnd: "actions-end",
};

const listCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.container{position:relative}.table-container{box-sizing:border-box;display:flex;inline-size:100%;flex-direction:column;background-color:transparent}.table-container *{box-sizing:border-box}.table{inline-size:100%;border-collapse:collapse}.stack{--calcite-stack-padding-inline:0;--calcite-stack-padding-block:0}::slotted(calcite-list-item){--tw-shadow:0 -1px 0 var(--calcite-color-border-3);--tw-shadow-colored:0 -1px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);margin-block-start:1px}::slotted(calcite-list-item:first-of-type){--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}::slotted(calcite-list-item[data-filter]){--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);margin-block-start:0px}.sticky-pos{position:sticky;inset-block-start:0px;z-index:var(--calcite-z-index-sticky);background-color:var(--calcite-color-foreground-1)}.sticky-pos th{padding:0px}.assistive-text{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0}:host([hidden]){display:none}[hidden]{display:none}";

const listItemSelector = "calcite-list-item";
const listItemSelectorDirect = `:scope > calcite-list-item`;
const parentSelector = "calcite-list-item-group, calcite-list-item";
const List = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        return (h(InteractiveContainer, { disabled: this.disabled }, h("div", { class: CSS$1.container }, this.dragEnabled ? (h("span", { "aria-live": "assertive", class: CSS$1.assistiveText }, this.assistiveText)) : null, this.renderItemAriaLive(), loading ? h("calcite-scrim", { class: CSS$1.scrim, loading: loading }) : null, h("table", { "aria-busy": toAriaBoolean(loading), "aria-label": label || "", class: CSS$1.table, onKeyDown: this.handleListKeydown, role: "treegrid" }, filterEnabled || hasFilterActionsStart || hasFilterActionsEnd ? (h("thead", null, h("tr", { class: { [CSS$1.sticky]: true } }, h("th", { colSpan: MAX_COLUMNS }, h("calcite-stack", { class: CSS$1.stack }, h("slot", { name: SLOTS$1.filterActionsStart, onSlotchange: this.handleFilterActionsStartSlotChange, slot: SLOTS.actionsStart }), h("calcite-filter", { "aria-label": filterPlaceholder, disabled: disabled, items: dataForFilter, onCalciteFilterChange: this.handleFilterChange, placeholder: filterPlaceholder, value: filterText,
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: this.setFilterEl }), h("slot", { name: SLOTS$1.filterActionsEnd, onSlotchange: this.handleFilterActionsEndSlotChange, slot: SLOTS.actionsEnd })))))) : null, h("tbody", { class: CSS$1.tableContainer }, h("slot", { onSlotchange: this.handleDefaultSlotChange }))), h("div", { "aria-live": "polite", "data-test-id": "no-results-container", hidden: !(hasFilterNoResults && filterEnabled && filterText && !filteredItems.length) }, h("slot", { name: SLOTS$1.filterNoResults, onSlotchange: this.handleFilterNoResultsSlotChange })))));
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
        return !parentListEl ? (h("div", { "aria-live": "polite", class: CSS$1.assistiveText }, filterEnabled && filterText && (filteredData === null || filteredData === void 0 ? void 0 : filteredData.length) ? (h("div", { key: "aria-filter-enabled" }, messages.filterEnabled)) : null, h("div", { key: "aria-item-count" }, messages.total.replace("{count}", numberStringFormatter.localize(filteredItems.length.toString()))), filteredItems.length ? (h("ol", { key: "aria-item-list" }, filteredItems.map((item) => (h("li", null, item.label))))) : null)) : null;
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
    get el() { return getElement(this); }
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
};
List.style = listCss;

const listItemCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex;flex-direction:column;--calcite-list-item-icon-color:var(--calcite-color-brand);--calcite-list-item-spacing-indent:1rem}:host([filter-hidden]){display:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.container{box-sizing:border-box;display:flex;flex:1 1 0%;background-color:var(--calcite-color-foreground-1);font-family:var(--calcite-sans-family);padding-inline-start:calc(var(--calcite-list-item-spacing-indent) * var(--calcite-list-item-spacing-indent-multiplier))}.container *{box-sizing:border-box}.container--hover:hover{cursor:pointer;background-color:var(--calcite-color-foreground-2)}.container:active{background-color:var(--calcite-color-foreground-1)}.container--border{border-inline-start-width:4px;border-inline-start-style:solid}.container--border-selected{border-inline-start-color:var(--calcite-color-brand)}.container--border-unselected{border-inline-start-color:transparent}.container:hover.container--border-unselected{border-color:var(--calcite-color-border-1)}.nested-container{display:flex;flex-direction:column;background-color:var(--calcite-color-foreground-1)}.nested-container--hidden{display:none}.content-container{display:flex;flex:1 1 auto;-webkit-user-select:none;-moz-user-select:none;user-select:none;align-items:stretch;padding:0px;font-family:var(--calcite-sans-family);font-weight:var(--calcite-font-weight-normal);color:var(--calcite-color-text-2)}tr,td{outline-color:transparent}tr:focus,td:focus{outline:2px solid var(--calcite-color-brand);outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.content,.custom-content{display:flex;flex:1 1 auto;flex-direction:column;justify-content:center;padding-inline:0.75rem;padding-block:0.5rem;font-size:var(--calcite-font-size--2);line-height:1.375}.label,.description,.content-bottom{font-family:var(--calcite-sans-family);font-size:var(--calcite-font-size--2);font-weight:var(--calcite-font-weight-normal);word-wrap:break-word;word-break:break-word}.label:only-child,.description:only-child,.content-bottom:only-child{margin:0px;padding-block:0.25rem}.label{color:var(--calcite-color-text-1)}:host([selected]) .label{font-weight:var(--calcite-font-weight-medium)}.description{margin-block-start:0.125rem;color:var(--calcite-color-text-3)}:host([selected]) .description{color:var(--calcite-color-text-2)}.content-start{justify-content:flex-start}.content-end{justify-content:flex-end}.content-start,.content-end{flex:1 1 auto}.content-bottom{display:flex;flex-direction:column;background-color:var(--calcite-color-foreground-1);padding-inline-start:calc(var(--calcite-list-item-spacing-indent) * var(--calcite-list-item-spacing-indent-multiplier))}.content-container--has-center-content .content-start,.content-container--has-center-content .content-end{flex:0 1 auto}.selection-container{display:flex;padding-inline:0.75rem;color:var(--calcite-color-border-input)}.selection-container--single{color:transparent}:host(:not([disabled]):not([selected])) .container:hover .selection-container--single{color:var(--calcite-color-border-1)}:host([selected]:hover) .selection-container,:host([selected]:hover) .selection-container--single,:host([selected]) .selection-container{color:var(--calcite-list-item-icon-color)}.open-container{color:var(--calcite-color-text-3)}:host(:not([disabled])) .container:hover .open-container{color:var(--calcite-color-text-1)}.actions-start,.actions-end,.content-start,.content-end,.selection-container,.drag-container,.open-container{display:flex;align-items:center}.open-container,.selection-container{cursor:pointer}.content-start ::slotted(calcite-icon),.content-end ::slotted(calcite-icon){margin-inline:0.75rem;align-self:center}.actions-start ::slotted(calcite-action),.actions-start ::slotted(calcite-action-menu),.actions-start ::slotted(calcite-handle),.actions-start ::slotted(calcite-dropdown),.actions-end ::slotted(calcite-action),.actions-end ::slotted(calcite-action-menu),.actions-end ::slotted(calcite-handle),.actions-end ::slotted(calcite-dropdown){align-self:stretch;color:inherit}::slotted(calcite-list-item){border-width:0px;border-block-start-width:1px;border-style:solid;border-color:var(--calcite-color-border-3)}::slotted(calcite-list:empty){padding-block:0.75rem}:host([hidden]){display:none}[hidden]{display:none}";

const focusMap = new Map();
const listSelector = "calcite-list";
const ListItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.calciteListItemSelect = createEvent(this, "calciteListItemSelect", 6);
        this.calciteListItemClose = createEvent(this, "calciteListItemClose", 6);
        this.calciteListItemDragHandleChange = createEvent(this, "calciteListItemDragHandleChange", 6);
        this.calciteListItemToggle = createEvent(this, "calciteListItemToggle", 6);
        this.calciteInternalListItemSelect = createEvent(this, "calciteInternalListItemSelect", 6);
        this.calciteInternalListItemSelectMultiple = createEvent(this, "calciteInternalListItemSelectMultiple", 6);
        this.calciteInternalListItemActive = createEvent(this, "calciteInternalListItemActive", 6);
        this.calciteInternalFocusPreviousItem = createEvent(this, "calciteInternalFocusPreviousItem", 6);
        this.calciteInternalListItemChange = createEvent(this, "calciteInternalListItemChange", 6);
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.dragHandleSelectedChangeHandler = (event) => {
            this.dragSelected = event.target.selected;
            this.calciteListItemDragHandleChange.emit();
            event.stopPropagation();
        };
        this.emitInternalListItemActive = () => {
            this.calciteInternalListItemActive.emit();
        };
        this.focusCellHandle = () => {
            this.handleCellFocusIn(this.handleGridEl);
        };
        this.focusCellActionsStart = () => {
            this.handleCellFocusIn(this.actionsStartEl);
        };
        this.focusCellContent = () => {
            this.handleCellFocusIn(this.contentEl);
        };
        this.focusCellActionsEnd = () => {
            this.handleCellFocusIn(this.actionsEndEl);
        };
        this.handleCloseClick = () => {
            this.closed = true;
            this.calciteListItemClose.emit();
        };
        this.handleContentSlotChange = (event) => {
            this.hasCustomContent = slotChangeHasAssignedElement(event);
        };
        this.handleActionsStartSlotChange = (event) => {
            this.hasActionsStart = slotChangeHasAssignedElement(event);
        };
        this.handleActionsEndSlotChange = (event) => {
            this.hasActionsEnd = slotChangeHasAssignedElement(event);
        };
        this.handleContentStartSlotChange = (event) => {
            this.hasContentStart = slotChangeHasAssignedElement(event);
        };
        this.handleContentEndSlotChange = (event) => {
            this.hasContentEnd = slotChangeHasAssignedElement(event);
        };
        this.handleContentBottomSlotChange = (event) => {
            this.hasContentBottom = slotChangeHasAssignedElement(event);
        };
        this.handleDefaultSlotChange = (event) => {
            this.handleOpenableChange(event.target);
        };
        this.handleToggleClick = () => {
            this.toggle();
        };
        this.toggle = (value = !this.open) => {
            this.open = value;
            this.calciteListItemToggle.emit();
        };
        this.handleItemClick = (event) => {
            if (event.defaultPrevented) {
                return;
            }
            this.toggleSelected(event.shiftKey);
        };
        this.toggleSelected = (shiftKey) => {
            const { selectionMode, selected } = this;
            if (this.disabled) {
                return;
            }
            if (selectionMode === "multiple" || selectionMode === "single") {
                this.selected = !selected;
            }
            else if (selectionMode === "single-persist") {
                this.selected = true;
            }
            this.calciteInternalListItemSelectMultiple.emit({
                selectMultiple: shiftKey && selectionMode === "multiple",
            });
            this.calciteListItemSelect.emit();
        };
        this.handleItemKeyDown = (event) => {
            if (event.defaultPrevented) {
                return;
            }
            const { key } = event;
            const composedPath = event.composedPath();
            const { containerEl, actionsStartEl, actionsEndEl, open, openable } = this;
            const cells = this.getGridCells();
            const currentIndex = cells.findIndex((cell) => composedPath.includes(cell));
            if (key === "Enter" &&
                !composedPath.includes(actionsStartEl) &&
                !composedPath.includes(actionsEndEl)) {
                event.preventDefault();
                this.toggleSelected(event.shiftKey);
            }
            else if (key === "ArrowRight") {
                event.preventDefault();
                const nextIndex = currentIndex + 1;
                if (currentIndex === -1) {
                    if (!open && openable) {
                        this.toggle(true);
                        this.focusCell(null);
                    }
                    else if (cells[0]) {
                        this.focusCell(cells[0]);
                    }
                }
                else if (cells[currentIndex] && cells[nextIndex]) {
                    this.focusCell(cells[nextIndex]);
                }
            }
            else if (key === "ArrowLeft") {
                event.preventDefault();
                const prevIndex = currentIndex - 1;
                if (currentIndex === -1) {
                    this.focusCell(null);
                    if (open && openable) {
                        this.toggle(false);
                    }
                    else {
                        this.calciteInternalFocusPreviousItem.emit();
                    }
                }
                else if (currentIndex === 0) {
                    this.focusCell(null);
                    containerEl.focus();
                }
                else if (cells[currentIndex] && cells[prevIndex]) {
                    this.focusCell(cells[prevIndex]);
                }
            }
        };
        this.focusCellNull = () => {
            this.focusCell(null);
        };
        this.handleCellFocusIn = (focusEl) => {
            this.setFocusCell(focusEl, getFirstTabbable(focusEl), true);
        };
        // Only one cell within a list-item should be focusable at a time. Ensures the active cell is focusable.
        this.setFocusCell = (focusEl, focusedEl, saveFocusIndex) => {
            const { parentListEl } = this;
            if (saveFocusIndex) {
                focusMap.set(parentListEl, null);
            }
            const gridCells = this.getGridCells();
            gridCells.forEach((tableCell) => {
                tableCell.tabIndex = -1;
                tableCell.removeAttribute(activeCellTestAttribute);
            });
            if (!focusEl) {
                return;
            }
            focusEl.tabIndex = focusEl === focusedEl ? 0 : -1;
            focusEl.setAttribute(activeCellTestAttribute, "");
            if (saveFocusIndex) {
                focusMap.set(parentListEl, gridCells.indexOf(focusEl));
            }
        };
        this.focusCell = (focusEl, saveFocusIndex = true) => {
            const focusedEl = getFirstTabbable(focusEl);
            this.setFocusCell(focusEl, focusedEl, saveFocusIndex);
            focusedEl === null || focusedEl === void 0 ? void 0 : focusedEl.focus();
        };
        this.active = false;
        this.closable = false;
        this.closed = false;
        this.description = undefined;
        this.disabled = false;
        this.dragDisabled = false;
        this.dragHandle = false;
        this.dragSelected = false;
        this.filterHidden = false;
        this.label = undefined;
        this.metadata = undefined;
        this.open = false;
        this.setSize = null;
        this.setPosition = null;
        this.selected = false;
        this.value = undefined;
        this.selectionMode = null;
        this.selectionAppearance = null;
        this.messageOverrides = undefined;
        this.messages = undefined;
        this.effectiveLocale = "";
        this.defaultMessages = undefined;
        this.level = null;
        this.visualLevel = null;
        this.parentListEl = undefined;
        this.openable = false;
        this.hasActionsStart = false;
        this.hasActionsEnd = false;
        this.hasCustomContent = false;
        this.hasContentStart = false;
        this.hasContentEnd = false;
        this.hasContentBottom = false;
    }
    activeHandler(active) {
        if (!active) {
            this.focusCell(null, false);
        }
    }
    handleClosedChange() {
        this.emitCalciteInternalListItemChange();
    }
    handleDisabledChange() {
        this.emitCalciteInternalListItemChange();
    }
    handleSelectedChange() {
        this.calciteInternalListItemSelect.emit();
    }
    onMessagesChange() {
        /* wired up by t9n util */
    }
    handleCalciteInternalListDefaultSlotChanges(event) {
        event.stopPropagation();
        this.handleOpenableChange(this.defaultSlotEl);
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
        connectInteractive(this);
        connectLocalized(this);
        connectMessages(this);
        const { el } = this;
        this.parentListEl = el.closest(listSelector);
        this.level = getDepth(el) + 1;
        this.visualLevel = getDepth(el, true);
        this.setSelectionDefaults();
    }
    async componentWillLoad() {
        setUpLoadableComponent(this);
        await setUpMessages(this);
    }
    componentDidLoad() {
        setComponentLoaded(this);
    }
    componentDidRender() {
        updateHostInteraction(this);
    }
    disconnectedCallback() {
        disconnectInteractive(this);
        disconnectLocalized(this);
        disconnectMessages(this);
    }
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    /** Sets focus on the component. */
    async setFocus() {
        await componentFocusable(this);
        const { containerEl, parentListEl } = this;
        const focusIndex = focusMap.get(parentListEl);
        if (typeof focusIndex === "number") {
            const cells = this.getGridCells();
            if (cells[focusIndex]) {
                this.focusCell(cells[focusIndex]);
            }
            else {
                containerEl === null || containerEl === void 0 ? void 0 : containerEl.focus();
            }
            return;
        }
        containerEl === null || containerEl === void 0 ? void 0 : containerEl.focus();
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderSelected() {
        const { selected, selectionMode, selectionAppearance } = this;
        if (selectionMode === "none" || selectionAppearance === "border") {
            return null;
        }
        return (h("td", { class: {
                [CSS$4.selectionContainer]: true,
                [CSS$4.selectionContainerSingle]: selectionMode === "single" || selectionMode === "single-persist",
            }, key: "selection-container", onClick: this.handleItemClick }, h("calcite-icon", { icon: selected
                ? selectionMode === "multiple"
                    ? ICONS$2.selectedMultiple
                    : ICONS$2.selectedSingle
                : selectionMode === "multiple"
                    ? ICONS$2.unselectedMultiple
                    : ICONS$2.unselectedSingle, scale: "s" })));
    }
    renderDragHandle() {
        const { label, dragHandle, dragSelected, dragDisabled, setPosition, setSize } = this;
        return dragHandle ? (h("td", { "aria-label": label, class: CSS$4.dragContainer, key: "drag-handle-container", onFocusin: this.focusCellHandle, role: "gridcell",
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: (el) => (this.handleGridEl = el) }, h("calcite-handle", { disabled: dragDisabled, label: label, onCalciteHandleChange: this.dragHandleSelectedChangeHandler, selected: dragSelected, setPosition: setPosition, setSize: setSize }))) : null;
    }
    renderOpen() {
        const { el, open, openable, messages } = this;
        const dir = getElementDir(el);
        const icon = open ? ICONS$2.open : dir === "rtl" ? ICONS$2.closedRTL : ICONS$2.closedLTR;
        const tooltip = open ? messages.collapse : messages.expand;
        return openable ? (h("td", { class: CSS$4.openContainer, key: "open-container", onClick: this.handleToggleClick, title: tooltip }, h("calcite-icon", { icon: icon, key: icon, scale: "s" }))) : null;
    }
    renderActionsStart() {
        const { label, hasActionsStart } = this;
        return (h("td", { "aria-label": label, class: CSS$4.actionsStart, hidden: !hasActionsStart, key: "actions-start-container", onFocusin: this.focusCellActionsStart, role: "gridcell",
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: (el) => (this.actionsStartEl = el) }, h("slot", { name: SLOTS$2.actionsStart, onSlotchange: this.handleActionsStartSlotChange })));
    }
    renderActionsEnd() {
        const { label, hasActionsEnd, closable, messages } = this;
        return (h("td", { "aria-label": label, class: CSS$4.actionsEnd, hidden: !(hasActionsEnd || closable), key: "actions-end-container", onFocusin: this.focusCellActionsEnd, role: "gridcell",
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: (el) => (this.actionsEndEl = el) }, h("slot", { name: SLOTS$2.actionsEnd, onSlotchange: this.handleActionsEndSlotChange }), closable ? (h("calcite-action", { appearance: "transparent", icon: ICONS$2.close, key: "close-action", label: messages.close, onClick: this.handleCloseClick, text: messages.close })) : null));
    }
    renderContentStart() {
        const { hasContentStart } = this;
        return (h("div", { class: CSS$4.contentStart, hidden: !hasContentStart }, h("slot", { name: SLOTS$2.contentStart, onSlotchange: this.handleContentStartSlotChange })));
    }
    renderCustomContent() {
        const { hasCustomContent } = this;
        return (h("div", { class: CSS$4.customContent, hidden: !hasCustomContent }, h("slot", { name: SLOTS$2.content, onSlotchange: this.handleContentSlotChange })));
    }
    renderContentEnd() {
        const { hasContentEnd } = this;
        return (h("div", { class: CSS$4.contentEnd, hidden: !hasContentEnd }, h("slot", { name: SLOTS$2.contentEnd, onSlotchange: this.handleContentEndSlotChange })));
    }
    renderContentBottom() {
        const { hasContentBottom, visualLevel } = this;
        return (h("div", { class: CSS$4.contentBottom, hidden: !hasContentBottom, style: { "--calcite-list-item-spacing-indent-multiplier": `${visualLevel}` } }, h("slot", { name: SLOTS$2.contentBottom, onSlotchange: this.handleContentBottomSlotChange })));
    }
    renderDefaultContainer() {
        return (h("div", { class: {
                [CSS$4.nestedContainer]: true,
                [CSS$4.nestedContainerHidden]: this.openable && !this.open,
            } }, h("slot", { onSlotchange: this.handleDefaultSlotChange, ref: (el) => (this.defaultSlotEl = el) })));
    }
    renderContentProperties() {
        const { label, description, hasCustomContent } = this;
        return !hasCustomContent && (!!label || !!description) ? (h("div", { class: CSS$4.content, key: "content" }, label ? (h("div", { class: CSS$4.label, key: "label" }, label)) : null, description ? (h("div", { class: CSS$4.description, key: "description" }, description)) : null)) : null;
    }
    renderContentContainer() {
        const { description, label, selectionMode, hasCustomContent } = this;
        const hasCenterContent = hasCustomContent || !!label || !!description;
        const content = [
            this.renderContentStart(),
            this.renderCustomContent(),
            this.renderContentProperties(),
            this.renderContentEnd(),
        ];
        return (h("td", { "aria-label": label, class: {
                [CSS$4.contentContainer]: true,
                [CSS$4.contentContainerSelectable]: selectionMode !== "none",
                [CSS$4.contentContainerHasCenterContent]: hasCenterContent,
            }, key: "content-container", onClick: this.handleItemClick, onFocusin: this.focusCellContent, role: "gridcell",
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: (el) => (this.contentEl = el) }, content));
    }
    render() {
        const { openable, open, level, setPosition, setSize, active, label, selected, selectionAppearance, selectionMode, closed, visualLevel, } = this;
        const showBorder = selectionMode !== "none" && selectionAppearance === "border";
        const borderSelected = showBorder && selected;
        const borderUnselected = showBorder && !selected;
        return (h(Host, null, h(InteractiveContainer, { disabled: this.disabled }, h("tr", { "aria-expanded": openable ? toAriaBoolean(open) : null, "aria-label": label, "aria-level": level, "aria-posinset": setPosition, "aria-selected": toAriaBoolean(selected), "aria-setsize": setSize, class: {
                [CSS$4.container]: true,
                [CSS$4.containerHover]: true,
                [CSS$4.containerBorder]: showBorder,
                [CSS$4.containerBorderSelected]: borderSelected,
                [CSS$4.containerBorderUnselected]: borderUnselected,
            }, hidden: closed, onFocus: this.focusCellNull, onFocusin: this.emitInternalListItemActive, onKeyDown: this.handleItemKeyDown, role: "row", style: { "--calcite-list-item-spacing-indent-multiplier": `${visualLevel}` }, tabIndex: active ? 0 : -1,
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: (el) => (this.containerEl = el) }, this.renderDragHandle(), this.renderSelected(), this.renderOpen(), this.renderActionsStart(), this.renderContentContainer(), this.renderActionsEnd()), this.renderContentBottom(), this.renderDefaultContainer())));
    }
    emitCalciteInternalListItemChange() {
        this.calciteInternalListItemChange.emit();
    }
    setSelectionDefaults() {
        const { parentListEl, selectionMode, selectionAppearance } = this;
        if (!parentListEl) {
            return;
        }
        if (!selectionMode) {
            this.selectionMode = parentListEl.selectionMode;
        }
        if (!selectionAppearance) {
            this.selectionAppearance = parentListEl.selectionAppearance;
        }
    }
    handleOpenableChange(slotEl) {
        if (!slotEl) {
            return;
        }
        const listItemChildren = getListItemChildren(slotEl);
        const listItemChildLists = getListItemChildLists(slotEl);
        updateListItemChildren(listItemChildren);
        this.openable = !!listItemChildren.length || !!listItemChildLists.length;
    }
    getGridCells() {
        return [this.handleGridEl, this.actionsStartEl, this.contentEl, this.actionsEndEl].filter((el) => el && !el.hidden);
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return getElement(this); }
    static get watchers() { return {
        "active": ["activeHandler"],
        "closed": ["handleClosedChange"],
        "disabled": ["handleDisabledChange"],
        "selected": ["handleSelectedChange"],
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
};
ListItem.style = listItemCss;

const stackCss = ":host([disabled]) .content{cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) .content *,:host([disabled]) .content ::slotted(*){pointer-events:none}:host{display:flex;flex:1 1 0%;flex-direction:column}.container{display:flex;flex:1 1 auto;align-items:stretch;font-family:var(--calcite-sans-family);font-weight:var(--calcite-font-weight-normal);color:var(--calcite-color-text-2)}.content{display:flex;flex:1 1 auto;flex-direction:column;justify-content:center;font-size:var(--calcite-font-size--2);line-height:1.375;padding-inline:var(--calcite-stack-padding-inline, 0.75rem);padding-block:var(--calcite-stack-padding-block, 0.5rem)}.content-start{justify-content:flex-start}.content-end{justify-content:flex-end}.content-start,.content-end{flex:0 1 auto}.actions-start,.actions-end,.content-start,.content-end{display:flex;align-items:center}.content-start ::slotted(calcite-icon),.content-end ::slotted(calcite-icon){margin-inline:0.75rem;align-self:center}.actions-start ::slotted(calcite-action),.actions-start ::slotted(calcite-action-menu),.actions-start ::slotted(calcite-handle),.actions-start ::slotted(calcite-dropdown),.actions-end ::slotted(calcite-action),.actions-end ::slotted(calcite-action-menu),.actions-end ::slotted(calcite-handle),.actions-end ::slotted(calcite-dropdown){align-self:stretch;color:inherit}:host([hidden]){display:none}[hidden]{display:none}";

const Stack = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.handleActionsStartSlotChange = (event) => {
            this.hasActionsStart = slotChangeHasAssignedElement(event);
        };
        this.handleActionsEndSlotChange = (event) => {
            this.hasActionsEnd = slotChangeHasAssignedElement(event);
        };
        this.handleContentStartSlotChange = (event) => {
            this.hasContentStart = slotChangeHasAssignedElement(event);
        };
        this.handleContentEndSlotChange = (event) => {
            this.hasContentEnd = slotChangeHasAssignedElement(event);
        };
        this.disabled = false;
        this.hasActionsStart = false;
        this.hasActionsEnd = false;
        this.hasContentStart = false;
        this.hasContentEnd = false;
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderActionsStart() {
        const { hasActionsStart } = this;
        return (h("div", { class: CSS.actionsStart, hidden: !hasActionsStart, key: "actions-start-container" }, h("slot", { name: SLOTS.actionsStart, onSlotchange: this.handleActionsStartSlotChange })));
    }
    renderActionsEnd() {
        const { hasActionsEnd } = this;
        return (h("div", { class: CSS.actionsEnd, hidden: !hasActionsEnd, key: "actions-end-container" }, h("slot", { name: SLOTS.actionsEnd, onSlotchange: this.handleActionsEndSlotChange })));
    }
    renderContentStart() {
        const { hasContentStart } = this;
        return (h("div", { class: CSS.contentStart, hidden: !hasContentStart }, h("slot", { name: SLOTS.contentStart, onSlotchange: this.handleContentStartSlotChange })));
    }
    renderDefaultContent() {
        return (h("div", { class: CSS.content }, h("slot", null)));
    }
    renderContentEnd() {
        const { hasContentEnd } = this;
        return (h("div", { class: CSS.contentEnd, hidden: !hasContentEnd }, h("slot", { name: SLOTS.contentEnd, onSlotchange: this.handleContentEndSlotChange })));
    }
    render() {
        return (h(Host, null, h("div", { class: CSS.container }, this.renderActionsStart(), this.renderContentStart(), this.renderDefaultContent(), this.renderContentEnd(), this.renderActionsEnd())));
    }
};
Stack.style = stackCss;

export { Filter as calcite_filter, Handle as calcite_handle, List as calcite_list, ListItem as calcite_list_item, Stack as calcite_stack };
