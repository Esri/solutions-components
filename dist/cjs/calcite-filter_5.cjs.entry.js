/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5a0af791.js');
const filter = require('./filter-1f98198b.js');
const interactive = require('./interactive-89f913ba.js');
const loadable = require('./loadable-2e2626dc.js');
const locale = require('./locale-42c21404.js');
const t9n = require('./t9n-42ba6ea3.js');
const resources = require('./resources-dfe71ff2.js');
const debounce = require('./debounce-7f1e04d6.js');
const dom = require('./dom-6a9b6275.js');
const observers = require('./observers-8fed90f3.js');
const resources$1 = require('./resources-e96455bb.js');
const browser = require('./browser-69696af0.js');
const sortableComponent = require('./sortableComponent-9bfb9488.js');
require('./key-d6da79d8.js');
require('./guid-02e5380f.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const CSS$3 = {
    container: "container",
    searchIcon: "search-icon",
};
const ICONS$1 = {
    search: "search",
    close: "x",
};

const filterCss = ":host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex;inline-size:100%}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.container{display:flex;inline-size:100%;padding:0.5rem}label{position:relative;margin-inline:0.25rem;margin-block:0px;display:flex;inline-size:100%;align-items:center;overflow:hidden}input[type=text]{margin-block-end:0.25rem;inline-size:100%;border-style:none;background-color:transparent;padding-block:0.25rem;font-family:inherit;font-size:var(--calcite-font-size--2);line-height:1rem;color:var(--calcite-color-text-1);padding-inline-end:0.25rem;padding-inline-start:1.5rem;transition:padding var(--calcite-animation-timing), box-shadow var(--calcite-animation-timing)}input[type=text]::-ms-clear{display:none}calcite-input{inline-size:100%}.search-icon{position:absolute;display:flex;color:var(--calcite-color-text-2);inset-inline-start:0;transition:inset-inline-start var(--calcite-animation-timing), inset-inline-end var(--calcite-animation-timing), opacity var(--calcite-animation-timing)}input[type=text]:focus{border-color:var(--calcite-color-brand);outline:2px solid transparent;outline-offset:2px;padding-inline:0.25rem}input[type=text]:focus~.search-icon{inset-inline-start:calc(1rem * -1);opacity:0}.clear-button{display:flex;cursor:pointer;align-items:center;border-width:0px;background-color:transparent;color:var(--calcite-color-text-2)}.clear-button:hover,.clear-button:focus{color:var(--calcite-color-text-1)}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteFilterStyle0 = filterCss;

const Filter = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteFilterChange = index.createEvent(this, "calciteFilterChange", 6);
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.filterDebounced = debounce.debounce((value, emit = false, onFilter) => this.items.length &&
            this.updateFiltered(filter.filter(this.items, value, this.filterProps), emit, onFilter), resources.DEBOUNCE.filter);
        this.inputHandler = (event) => {
            const target = event.target;
            this.value = target.value;
            this.filterDebounced(target.value, true);
        };
        this.keyDownHandler = (event) => {
            if (event.defaultPrevented) {
                return;
            }
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
        this.filterProps = undefined;
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
    filterPropsHandler() {
        this.filterDebounced(this.value);
    }
    onMessagesChange() {
        /* wired up by t9n util */
    }
    valueHandler(value) {
        this.filterDebounced(value);
    }
    effectiveLocaleChange() {
        t9n.updateMessages(this, this.effectiveLocale);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    async componentWillLoad() {
        loadable.setUpLoadableComponent(this);
        if (this.items.length) {
            this.updateFiltered(filter.filter(this.items, this.value, this.filterProps));
        }
        await t9n.setUpMessages(this);
    }
    connectedCallback() {
        interactive.connectInteractive(this);
        locale.connectLocalized(this);
        t9n.connectMessages(this);
    }
    componentDidRender() {
        interactive.updateHostInteraction(this);
    }
    disconnectedCallback() {
        interactive.disconnectInteractive(this);
        locale.disconnectLocalized(this);
        t9n.disconnectMessages(this);
        this.filterDebounced.cancel();
    }
    componentDidLoad() {
        loadable.setComponentLoaded(this);
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
        await loadable.componentFocusable(this);
        return this.textInput?.setFocus();
    }
    updateFiltered(filtered, emit = false, callback) {
        this.filteredItems = filtered;
        if (emit) {
            this.calciteFilterChange.emit();
        }
        callback?.();
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        const { disabled, scale } = this;
        return (index.h(interactive.InteractiveContainer, { key: 'da4ff667fdb02ae8b85c56cd717b416f3256145d', disabled: disabled }, index.h("div", { key: 'f4406a403101afa7c97da11f8408fa464aa8a08c', class: CSS$3.container }, index.h("label", { key: 'aace74138ebea71058044e05d4fe44cb7ee6beb2' }, index.h("calcite-input", { key: 'cc7dca3364cc73bf42a78d76155477af98d72552', clearable: true, disabled: disabled, icon: ICONS$1.search, label: this.messages.label, messageOverrides: { clear: this.messages.clear }, onCalciteInputInput: this.inputHandler, onKeyDown: this.keyDownHandler, placeholder: this.placeholder, ref: (el) => {
                this.textInput = el;
            }, scale: scale, type: "text", value: this.value })))));
    }
    static get delegatesFocus() { return true; }
    static get assetsDirs() { return ["assets"]; }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "items": ["watchItemsHandler"],
        "filterProps": ["filterPropsHandler"],
        "messageOverrides": ["onMessagesChange"],
        "value": ["valueHandler"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
};
Filter.style = CalciteFilterStyle0;

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
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

const handleCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex}.handle{display:flex;align-items:center;justify-content:center;align-self:stretch;border-style:none;outline-color:transparent;color:var(--calcite-color-border-input);padding-block:0.75rem;padding-inline:0.25rem;line-height:0}.handle calcite-icon{color:inherit}:host(:not([disabled])) .handle{cursor:move}:host(:not([disabled])) .handle:hover{background-color:var(--calcite-color-foreground-2);color:var(--calcite-color-text-1)}:host(:not([disabled])) .handle:focus{color:var(--calcite-color-text-1);outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}:host(:not([disabled])) .handle--selected{background-color:var(--calcite-color-foreground-3);color:var(--calcite-color-text-1)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteHandleStyle0 = handleCss;

const Handle = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteHandleChange = index.createEvent(this, "calciteHandleChange", 6);
        this.calciteHandleNudge = index.createEvent(this, "calciteHandleNudge", 6);
        this.calciteInternalAssistiveTextChange = index.createEvent(this, "calciteInternalAssistiveTextChange", 6);
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
        interactive.connectInteractive(this);
        t9n.connectMessages(this);
        locale.connectLocalized(this);
    }
    async componentWillLoad() {
        loadable.setUpLoadableComponent(this);
        await t9n.setUpMessages(this);
    }
    componentDidLoad() {
        loadable.setComponentLoaded(this);
    }
    componentDidRender() {
        interactive.updateHostInteraction(this);
    }
    disconnectedCallback() {
        interactive.disconnectInteractive(this);
        t9n.disconnectMessages(this);
        locale.disconnectLocalized(this);
    }
    effectiveLocaleChange() {
        t9n.updateMessages(this, this.effectiveLocale);
    }
    // --------------------------------------------------------------------------
    //
    //  Methods
    //
    // --------------------------------------------------------------------------
    /** Sets focus on the component. */
    async setFocus() {
        await loadable.componentFocusable(this);
        this.handleButton?.focus();
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
        index.h("span", { key: '043550c81bdf21e953f33e7b3ffc04c982ae17e3', "aria-checked": this.disabled ? null : dom.toAriaBoolean(this.selected), "aria-disabled": this.disabled ? dom.toAriaBoolean(this.disabled) : null, "aria-label": this.disabled ? null : this.getAriaText("label"), class: { [CSS$2.handle]: true, [CSS$2.handleSelected]: !this.disabled && this.selected }, onBlur: this.handleBlur, onKeyDown: this.handleKeyDown, ref: (el) => {
                this.handleButton = el;
            },
            // role of radio is being applied to allow space key to select in screen readers
            role: "radio", tabIndex: this.disabled ? null : 0, title: this.getTooltip() }, index.h("calcite-icon", { key: '1d432a3f6e17366782fe92b8347f2f301b181b7b', icon: ICONS.drag, scale: "s" })));
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return index.getElement(this); }
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
Handle.style = CalciteHandleStyle0;

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const listSelector$1 = "calcite-list";
const listItemGroupSelector = "calcite-list-item-group";
const listItemSelector$1 = "calcite-list-item";
function getListItemChildLists(slotEl) {
    return Array.from(slotEl.assignedElements({ flatten: true }).filter((el) => el.matches(listSelector$1)));
}
function getListItemChildren(slotEl) {
    const assignedElements = slotEl.assignedElements({ flatten: true });
    const listItemGroupChildren = assignedElements.filter((el) => el?.matches(listItemGroupSelector))
        .map((group) => Array.from(group.querySelectorAll(listItemSelector$1)))
        .reduce((previousValue, currentValue) => [...previousValue, ...currentValue], []);
    const listItemChildren = assignedElements.filter((el) => el?.matches(listItemSelector$1));
    const listItemListChildren = assignedElements.filter((el) => el?.matches(listSelector$1))
        .map((list) => Array.from(list.querySelectorAll(listItemSelector$1)))
        .reduce((previousValue, currentValue) => [...previousValue, ...currentValue], []);
    return [...listItemListChildren, ...listItemGroupChildren, ...listItemChildren];
}
function updateListItemChildren(listItemChildren) {
    listItemChildren.forEach((listItem) => {
        listItem.setPosition = listItemChildren.indexOf(listItem) + 1;
        listItem.setSize = listItemChildren.length;
    });
}
function getDepth(element, includeGroup = false) {
    if (!browser.isBrowser()) {
        return 0;
    }
    const expression = includeGroup
        ? "ancestor::calcite-list-item | ancestor::calcite-list-item-group"
        : "ancestor::calcite-list-item";
    const result = document.evaluate(expression, element, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    return result.snapshotLength;
}

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const CSS$1 = {
    container: "container",
    actionsStart: "actions-start",
    contentStart: "content-start",
    content: "content",
    contentEnd: "content-end",
    actionsEnd: "actions-end",
};
const SLOTS$1 = {
    actionsStart: "actions-start",
    contentStart: "content-start",
    contentEnd: "content-end",
    actionsEnd: "actions-end",
};

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
const List = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteListChange = index.createEvent(this, "calciteListChange", 6);
        this.calciteListDragEnd = index.createEvent(this, "calciteListDragEnd", 6);
        this.calciteListDragStart = index.createEvent(this, "calciteListDragStart", 6);
        this.calciteListFilter = index.createEvent(this, "calciteListFilter", 6);
        this.calciteListOrderChange = index.createEvent(this, "calciteListOrderChange", 6);
        this.calciteInternalListDefaultSlotChange = index.createEvent(this, "calciteInternalListDefaultSlotChange", 6);
        this.dragSelector = listItemSelector;
        this.focusableItems = [];
        this.handleSelector = "calcite-handle";
        this.listItems = [];
        this.mutationObserver = observers.createObserver("mutation", () => this.updateListItems());
        this.visibleItems = [];
        this.handleDefaultSlotChange = (event) => {
            updateListItemChildren(getListItemChildren(event.target));
            if (this.parentListEl) {
                this.calciteInternalListDefaultSlotChange.emit();
            }
        };
        this.handleFilterActionsStartSlotChange = (event) => {
            this.hasFilterActionsStart = dom.slotChangeHasAssignedElement(event);
        };
        this.handleFilterActionsEndSlotChange = (event) => {
            this.hasFilterActionsEnd = dom.slotChangeHasAssignedElement(event);
        };
        this.handleFilterNoResultsSlotChange = (event) => {
            this.hasFilterNoResults = dom.slotChangeHasAssignedElement(event);
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
        this.updateListItems = debounce.debounce((emit = false) => {
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
        locale.connectLocalized(this);
        t9n.connectMessages(this);
        this.connectObserver();
        this.updateListItems();
        this.setUpSorting();
        interactive.connectInteractive(this);
        this.setParentList();
    }
    async componentWillLoad() {
        loadable.setUpLoadableComponent(this);
        await t9n.setUpMessages(this);
    }
    componentDidRender() {
        interactive.updateHostInteraction(this);
    }
    componentDidLoad() {
        loadable.setComponentLoaded(this);
    }
    disconnectedCallback() {
        this.disconnectObserver();
        sortableComponent.disconnectSortableComponent(this);
        interactive.disconnectInteractive(this);
        locale.disconnectLocalized(this);
        t9n.disconnectMessages(this);
    }
    effectiveLocaleChange() {
        t9n.updateMessages(this, this.effectiveLocale);
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
        await loadable.componentFocusable(this);
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
        return (index.h(interactive.InteractiveContainer, { key: '84991009060a8b97b9901ca97f32b32fa6e830fa', disabled: this.disabled }, index.h("div", { key: '27f5a904be599be5768bb1a7693111573e745e0f', class: CSS.container }, this.dragEnabled ? (index.h("span", { "aria-live": "assertive", class: CSS.assistiveText }, this.assistiveText)) : null, this.renderItemAriaLive(), loading ? index.h("calcite-scrim", { class: CSS.scrim, loading: loading }) : null, index.h("table", { key: 'dd343a43f26edcb50f87a064a41471756a94afeb', "aria-busy": dom.toAriaBoolean(loading), "aria-label": label || "", class: CSS.table, onKeyDown: this.handleListKeydown, role: "treegrid" }, filterEnabled || hasFilterActionsStart || hasFilterActionsEnd ? (index.h("thead", { class: CSS.sticky }, index.h("tr", null, index.h("th", { colSpan: resources$1.MAX_COLUMNS }, index.h("calcite-stack", { class: CSS.stack }, index.h("slot", { name: SLOTS.filterActionsStart, onSlotchange: this.handleFilterActionsStartSlotChange, slot: SLOTS$1.actionsStart }), index.h("calcite-filter", { "aria-label": filterPlaceholder, disabled: disabled, filterProps: filterProps, items: dataForFilter, onCalciteFilterChange: this.handleFilterChange, placeholder: filterPlaceholder, ref: this.setFilterEl, value: filterText }), index.h("slot", { name: SLOTS.filterActionsEnd, onSlotchange: this.handleFilterActionsEndSlotChange, slot: SLOTS$1.actionsEnd })))))) : null, index.h("tbody", { key: '90a288eea3e02d5261e369e14b687852c1ff876b', class: CSS.tableContainer }, index.h("slot", { key: '08992c3c5ad4d5afe86e7e1cd38327c5f4281bd1', onSlotchange: this.handleDefaultSlotChange }))), index.h("div", { key: '689185b56a2990e00a409ddbc4e4c135115791d3', "aria-live": "polite", "data-test-id": "no-results-container", hidden: !(hasFilterNoResults && filterEnabled && filterText && !filteredItems.length) }, index.h("slot", { key: '929ef7f843f5c8e7290a3cbcebea8c5c4cf38707', name: SLOTS.filterNoResults, onSlotchange: this.handleFilterNoResultsSlotChange })))));
    }
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    renderItemAriaLive() {
        const { messages, filteredItems, parentListEl, effectiveLocale, numberingSystem, filterEnabled, filterText, filteredData, } = this;
        locale.numberStringFormatter.numberFormatOptions = {
            locale: effectiveLocale,
            numberingSystem,
        };
        return !parentListEl ? (index.h("div", { "aria-live": "polite", class: CSS.assistiveText }, filterEnabled && filterText && filteredData?.length ? (index.h("div", { key: "aria-filter-enabled" }, messages.filterEnabled)) : null, index.h("div", { key: "aria-item-count" }, messages.total.replace("{count}", locale.numberStringFormatter.localize(filteredItems.length.toString()))), filteredItems.length ? (index.h("ol", { key: "aria-item-list" }, filteredItems.map((item) => (index.h("li", null, item.label))))) : null)) : null;
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
        sortableComponent.connectSortableComponent(this);
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
    get el() { return index.getElement(this); }
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
};
List.style = CalciteListStyle0;

const listItemCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex;flex-direction:column;background-color:var(--calcite-color-foreground-1);--calcite-list-item-icon-color:var(--calcite-color-brand)}:host([filter-hidden]),:host([closed]){display:none}.wrapper--bordered{border-block-end:1px solid var(--calcite-color-border-3)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.container{box-sizing:border-box;display:flex;flex:1 1 0%;overflow:hidden;background-color:var(--calcite-color-foreground-1)}.container *{box-sizing:border-box}.container--hover:hover{cursor:pointer;background-color:var(--calcite-color-foreground-2)}.container:active{background-color:var(--calcite-color-foreground-1)}.container--border{border-inline-start-width:4px;border-inline-start-style:solid}.container--border-selected{border-inline-start-color:var(--calcite-color-brand)}.container--border-unselected{border-inline-start-color:transparent}.container:hover.container--border-unselected{border-color:var(--calcite-color-border-1)}.nested-container{display:none;flex-direction:column;border-width:0px;border-style:solid;border-color:var(--calcite-color-border-3);margin-inline-start:var(--calcite-list-item-spacing-indent, 1.5rem)}.nested-container--open{display:flex}.content-container{display:flex;flex:1 1 auto;-webkit-user-select:none;-moz-user-select:none;user-select:none;align-items:stretch;padding:0px;font-weight:var(--calcite-font-weight-normal);color:var(--calcite-color-text-2)}tr,td{outline-color:transparent}tr{position:relative}tr:focus,td:focus{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.content,.custom-content{display:flex;flex:1 1 auto;flex-direction:column;justify-content:center;padding-inline:0.75rem;padding-block:0.5rem;font-size:var(--calcite-font-size--2);line-height:1.375}.label,.description,.content-bottom{font-family:var(--calcite-font-family);font-size:var(--calcite-font-size--2);font-weight:var(--calcite-font-weight-normal);word-wrap:break-word;word-break:break-word}.label:only-child,.description:only-child,.content-bottom:only-child{margin:0px;padding-block:0.25rem}.label{color:var(--calcite-color-text-1)}:host([selected]) .label{font-weight:var(--calcite-font-weight-medium)}.description{margin-block-start:0.125rem;color:var(--calcite-color-text-3)}:host([selected]) .description{color:var(--calcite-color-text-2)}.content-start{justify-content:flex-start}.content-end{justify-content:flex-end}.content-start,.content-end{flex:1 1 auto}.content-start ::slotted(calcite-icon),.content-end ::slotted(calcite-icon){margin-inline:0.75rem;align-self:center}.content-bottom{display:flex;flex-direction:column}.content-container--has-center-content .content-start,.content-container--has-center-content .content-end{flex:0 1 auto}.selection-container{display:flex;padding-inline:0.75rem;padding-block:0px;color:var(--calcite-color-border-input)}.selection-container--single{color:transparent}:host(:not([disabled]):not([selected])) .container:hover .selection-container--single{color:var(--calcite-color-border-1)}:host([selected]:hover) .selection-container,:host([selected]:hover) .selection-container--single,:host([selected]) .selection-container{color:var(--calcite-list-item-icon-color)}.open-container{color:var(--calcite-color-text-3)}:host(:not([disabled])) .container:hover .open-container{color:var(--calcite-color-text-1)}.actions-start,.actions-end,.content-start,.content-end,.selection-container,.drag-container,.open-container{display:flex;align-items:center}.actions-start calcite-action,.actions-start calcite-handle,.actions-end calcite-action,.actions-end calcite-handle,.content-start calcite-action,.content-start calcite-handle,.content-end calcite-action,.content-end calcite-handle,.selection-container calcite-action,.selection-container calcite-handle,.drag-container calcite-action,.drag-container calcite-handle,.open-container calcite-action,.open-container calcite-handle{align-self:stretch}.open-container,.selection-container{cursor:pointer}.actions-start,.actions-end{position:relative;padding:0px}.actions-start ::slotted(calcite-action),.actions-start ::slotted(calcite-action-menu),.actions-start ::slotted(calcite-handle),.actions-start ::slotted(calcite-dropdown),.actions-end ::slotted(calcite-action),.actions-end ::slotted(calcite-action-menu),.actions-end ::slotted(calcite-handle),.actions-end ::slotted(calcite-dropdown){align-self:stretch;color:inherit}tr:focus .actions-start,tr:focus .actions-end{inset-block:0.125rem}tr:focus .actions-start .close,tr:focus .actions-start ::slotted(calcite-action),tr:focus .actions-start ::slotted(calcite-action-menu),tr:focus .actions-start ::slotted(calcite-handle),tr:focus .actions-start ::slotted(calcite-dropdown),tr:focus .actions-end .close,tr:focus .actions-end ::slotted(calcite-action),tr:focus .actions-end ::slotted(calcite-action-menu),tr:focus .actions-end ::slotted(calcite-handle),tr:focus .actions-end ::slotted(calcite-dropdown){block-size:calc(100% - 0.25rem)}tr:focus::after,tr:focus::before{position:absolute;content:\"\";inline-size:0.125rem;z-index:var(--calcite-z-index-header);background-color:var(--calcite-color-brand);inset-block:0}tr:focus::before{inset-inline-start:0}tr:focus::after{inset-inline-end:0}.container--border:focus::before{display:none}::slotted(calcite-list:empty){border-block-start-width:0px}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteListItemStyle0 = listItemCss;

const focusMap = new Map();
const listSelector = "calcite-list";
const ListItem = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteListItemSelect = index.createEvent(this, "calciteListItemSelect", 6);
        this.calciteListItemClose = index.createEvent(this, "calciteListItemClose", 6);
        this.calciteListItemDragHandleChange = index.createEvent(this, "calciteListItemDragHandleChange", 6);
        this.calciteListItemToggle = index.createEvent(this, "calciteListItemToggle", 6);
        this.calciteInternalListItemSelect = index.createEvent(this, "calciteInternalListItemSelect", 6);
        this.calciteInternalListItemSelectMultiple = index.createEvent(this, "calciteInternalListItemSelectMultiple", 6);
        this.calciteInternalListItemActive = index.createEvent(this, "calciteInternalListItemActive", 6);
        this.calciteInternalFocusPreviousItem = index.createEvent(this, "calciteInternalFocusPreviousItem", 6);
        this.calciteInternalListItemChange = index.createEvent(this, "calciteInternalListItemChange", 6);
        this.calciteInternalListItemToggle = index.createEvent(this, "calciteInternalListItemToggle", 6);
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
            this.hasCustomContent = dom.slotChangeHasAssignedElement(event);
        };
        this.handleActionsStartSlotChange = (event) => {
            this.hasActionsStart = dom.slotChangeHasAssignedElement(event);
        };
        this.handleActionsEndSlotChange = (event) => {
            this.hasActionsEnd = dom.slotChangeHasAssignedElement(event);
        };
        this.handleContentStartSlotChange = (event) => {
            this.hasContentStart = dom.slotChangeHasAssignedElement(event);
        };
        this.handleContentEndSlotChange = (event) => {
            this.hasContentEnd = dom.slotChangeHasAssignedElement(event);
        };
        this.handleContentBottomSlotChange = (event) => {
            this.hasContentBottom = dom.slotChangeHasAssignedElement(event);
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
            this.setFocusCell(focusEl, dom.getFirstTabbable(focusEl), true);
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
                tableCell.removeAttribute(resources$1.activeCellTestAttribute);
            });
            if (!focusEl) {
                return;
            }
            focusEl.tabIndex = focusEl === focusedEl ? 0 : -1;
            focusEl.setAttribute(resources$1.activeCellTestAttribute, "");
            if (saveFocusIndex) {
                focusMap.set(parentListEl, gridCells.indexOf(focusEl));
            }
        };
        this.focusCell = (focusEl, saveFocusIndex = true) => {
            const focusedEl = dom.getFirstTabbable(focusEl);
            this.setFocusCell(focusEl, focusedEl, saveFocusIndex);
            focusedEl?.focus();
        };
        this.active = false;
        this.bordered = false;
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
    handleOpenChange() {
        this.emitCalciteInternalListItemToggle();
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
        t9n.updateMessages(this, this.effectiveLocale);
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    connectedCallback() {
        interactive.connectInteractive(this);
        locale.connectLocalized(this);
        t9n.connectMessages(this);
        const { el } = this;
        this.parentListEl = el.closest(listSelector);
        this.level = getDepth(el) + 1;
        this.setSelectionDefaults();
    }
    async componentWillLoad() {
        loadable.setUpLoadableComponent(this);
        await t9n.setUpMessages(this);
    }
    componentDidLoad() {
        loadable.setComponentLoaded(this);
    }
    componentDidRender() {
        interactive.updateHostInteraction(this);
    }
    disconnectedCallback() {
        interactive.disconnectInteractive(this);
        locale.disconnectLocalized(this);
        t9n.disconnectMessages(this);
    }
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    /** Sets focus on the component. */
    async setFocus() {
        await loadable.componentFocusable(this);
        const { containerEl, parentListEl } = this;
        const focusIndex = focusMap.get(parentListEl);
        if (typeof focusIndex === "number") {
            const cells = this.getGridCells();
            if (cells[focusIndex]) {
                this.focusCell(cells[focusIndex]);
            }
            else {
                containerEl?.focus();
            }
            return;
        }
        containerEl?.focus();
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
        return (index.h("td", { class: {
                [resources$1.CSS.selectionContainer]: true,
                [resources$1.CSS.selectionContainerSingle]: selectionMode === "single" || selectionMode === "single-persist",
            }, key: "selection-container", onClick: this.handleItemClick }, index.h("calcite-icon", { icon: selected
                ? selectionMode === "multiple"
                    ? resources$1.ICONS.selectedMultiple
                    : resources$1.ICONS.selectedSingle
                : selectionMode === "multiple"
                    ? resources$1.ICONS.unselectedMultiple
                    : resources$1.ICONS.unselectedSingle, scale: "s" })));
    }
    renderDragHandle() {
        const { label, dragHandle, dragSelected, dragDisabled, setPosition, setSize } = this;
        return dragHandle ? (index.h("td", { "aria-label": label, class: resources$1.CSS.dragContainer, key: "drag-handle-container", onFocusin: this.focusCellHandle, ref: (el) => (this.handleGridEl = el), role: "gridcell" }, index.h("calcite-handle", { disabled: dragDisabled, label: label, onCalciteHandleChange: this.dragHandleSelectedChangeHandler, selected: dragSelected, setPosition: setPosition, setSize: setSize }))) : null;
    }
    renderOpen() {
        const { el, open, openable, messages } = this;
        const dir = dom.getElementDir(el);
        const icon = open ? resources$1.ICONS.open : dir === "rtl" ? resources$1.ICONS.closedRTL : resources$1.ICONS.closedLTR;
        const tooltip = open ? messages.collapse : messages.expand;
        return openable ? (index.h("td", { class: resources$1.CSS.openContainer, key: "open-container", onClick: this.handleToggleClick, title: tooltip }, index.h("calcite-icon", { icon: icon, key: icon, scale: "s" }))) : null;
    }
    renderActionsStart() {
        const { label, hasActionsStart } = this;
        return (index.h("td", { "aria-label": label, class: resources$1.CSS.actionsStart, hidden: !hasActionsStart, key: "actions-start-container", onFocusin: this.focusCellActionsStart, ref: (el) => (this.actionsStartEl = el), role: "gridcell" }, index.h("slot", { name: resources$1.SLOTS.actionsStart, onSlotchange: this.handleActionsStartSlotChange })));
    }
    renderActionsEnd() {
        const { label, hasActionsEnd, closable, messages } = this;
        return (index.h("td", { "aria-label": label, class: resources$1.CSS.actionsEnd, hidden: !(hasActionsEnd || closable), key: "actions-end-container", onFocusin: this.focusCellActionsEnd, ref: (el) => (this.actionsEndEl = el), role: "gridcell" }, index.h("slot", { name: resources$1.SLOTS.actionsEnd, onSlotchange: this.handleActionsEndSlotChange }), closable ? (index.h("calcite-action", { appearance: "transparent", class: resources$1.CSS.close, icon: resources$1.ICONS.close, key: "close-action", label: messages.close, onClick: this.handleCloseClick, text: messages.close })) : null));
    }
    renderContentStart() {
        const { hasContentStart } = this;
        return (index.h("div", { class: resources$1.CSS.contentStart, hidden: !hasContentStart }, index.h("slot", { name: resources$1.SLOTS.contentStart, onSlotchange: this.handleContentStartSlotChange })));
    }
    renderCustomContent() {
        const { hasCustomContent } = this;
        return (index.h("div", { class: resources$1.CSS.customContent, hidden: !hasCustomContent }, index.h("slot", { name: resources$1.SLOTS.content, onSlotchange: this.handleContentSlotChange })));
    }
    renderContentEnd() {
        const { hasContentEnd } = this;
        return (index.h("div", { class: resources$1.CSS.contentEnd, hidden: !hasContentEnd }, index.h("slot", { name: resources$1.SLOTS.contentEnd, onSlotchange: this.handleContentEndSlotChange })));
    }
    renderContentBottom() {
        const { hasContentBottom } = this;
        return (index.h("div", { class: resources$1.CSS.contentBottom, hidden: !hasContentBottom }, index.h("slot", { name: resources$1.SLOTS.contentBottom, onSlotchange: this.handleContentBottomSlotChange })));
    }
    renderDefaultContainer() {
        return (index.h("div", { class: {
                [resources$1.CSS.nestedContainer]: true,
                [resources$1.CSS.nestedContainerOpen]: this.openable && this.open,
            } }, index.h("slot", { onSlotchange: this.handleDefaultSlotChange, ref: (el) => (this.defaultSlotEl = el) })));
    }
    renderContentProperties() {
        const { label, description, hasCustomContent } = this;
        return !hasCustomContent && (!!label || !!description) ? (index.h("div", { class: resources$1.CSS.content, key: "content" }, label ? (index.h("div", { class: resources$1.CSS.label, key: "label" }, label)) : null, description ? (index.h("div", { class: resources$1.CSS.description, key: "description" }, description)) : null)) : null;
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
        return (index.h("td", { "aria-label": label, class: {
                [resources$1.CSS.contentContainer]: true,
                [resources$1.CSS.contentContainerSelectable]: selectionMode !== "none",
                [resources$1.CSS.contentContainerHasCenterContent]: hasCenterContent,
            }, key: "content-container", onClick: this.handleItemClick, onFocusin: this.focusCellContent, ref: (el) => (this.contentEl = el), role: "gridcell" }, content));
    }
    render() {
        const { openable, open, level, setPosition, setSize, active, label, selected, selectionAppearance, selectionMode, closed, filterHidden, bordered, disabled, } = this;
        const showBorder = selectionMode !== "none" && selectionAppearance === "border";
        const borderSelected = showBorder && selected;
        const borderUnselected = showBorder && !selected;
        return (index.h(index.Host, { key: 'e5c6ac9b3b611040a89e45804935c9c6e0edce2d' }, index.h(interactive.InteractiveContainer, { key: '352c056d23f70ef0c5596e9bc447c57dad7523c9', disabled: disabled }, index.h("div", { key: 'c19950786e18433c5197309442118d72806698a9', class: { [resources$1.CSS.wrapper]: true, [resources$1.CSS.wrapperBordered]: bordered } }, index.h("tr", { key: 'a77a11612d4b15afdfe0146c2808312de96756bc', "aria-expanded": openable ? dom.toAriaBoolean(open) : null, "aria-label": label, "aria-level": level, "aria-posinset": setPosition, "aria-selected": dom.toAriaBoolean(selected), "aria-setsize": setSize, class: {
                [resources$1.CSS.container]: true,
                [resources$1.CSS.containerHover]: true,
                [resources$1.CSS.containerBorder]: showBorder,
                [resources$1.CSS.containerBorderSelected]: borderSelected,
                [resources$1.CSS.containerBorderUnselected]: borderUnselected,
            }, hidden: closed || filterHidden, onFocus: this.focusCellNull, onFocusin: this.emitInternalListItemActive, onKeyDown: this.handleItemKeyDown, ref: (el) => (this.containerEl = el), role: "row", tabIndex: active ? 0 : -1 }, this.renderDragHandle(), this.renderSelected(), this.renderOpen(), this.renderActionsStart(), this.renderContentContainer(), this.renderActionsEnd()), this.renderContentBottom()), this.renderDefaultContainer())));
    }
    emitCalciteInternalListItemToggle() {
        this.calciteInternalListItemToggle.emit();
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
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "active": ["activeHandler"],
        "closed": ["handleClosedChange"],
        "disabled": ["handleDisabledChange"],
        "open": ["handleOpenChange"],
        "selected": ["handleSelectedChange"],
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
};
ListItem.style = CalciteListItemStyle0;

const stackCss = ":host([disabled]) .content{cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) .content *,:host([disabled]) .content ::slotted(*){pointer-events:none}:host{display:flex;flex:1 1 0%;flex-direction:column}.container{display:flex;flex:1 1 auto;align-items:stretch;font-weight:var(--calcite-font-weight-normal);color:var(--calcite-color-text-2)}.content{display:flex;flex:1 1 auto;flex-direction:column;justify-content:center;font-size:var(--calcite-font-size--2);line-height:1.375;padding-inline:var(--calcite-stack-padding-inline, 0.75rem);padding-block:var(--calcite-stack-padding-block, 0.5rem)}.content-start{justify-content:flex-start}.content-end{justify-content:flex-end}.content-start,.content-end{flex:0 1 auto}.content-start ::slotted(calcite-icon),.content-end ::slotted(calcite-icon){margin-inline:0.75rem;align-self:center}.actions-start,.actions-end,.content-start,.content-end{display:flex;align-items:center}.actions-start ::slotted(calcite-action),.actions-start ::slotted(calcite-action-menu),.actions-start ::slotted(calcite-handle),.actions-start ::slotted(calcite-dropdown),.actions-end ::slotted(calcite-action),.actions-end ::slotted(calcite-action-menu),.actions-end ::slotted(calcite-handle),.actions-end ::slotted(calcite-dropdown){align-self:stretch;color:inherit}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteStackStyle0 = stackCss;

const Stack = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.handleActionsStartSlotChange = (event) => {
            this.hasActionsStart = dom.slotChangeHasAssignedElement(event);
        };
        this.handleActionsEndSlotChange = (event) => {
            this.hasActionsEnd = dom.slotChangeHasAssignedElement(event);
        };
        this.handleContentStartSlotChange = (event) => {
            this.hasContentStart = dom.slotChangeHasAssignedElement(event);
        };
        this.handleContentEndSlotChange = (event) => {
            this.hasContentEnd = dom.slotChangeHasAssignedElement(event);
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
        return (index.h("div", { class: CSS$1.actionsStart, hidden: !hasActionsStart, key: "actions-start-container" }, index.h("slot", { name: SLOTS$1.actionsStart, onSlotchange: this.handleActionsStartSlotChange })));
    }
    renderActionsEnd() {
        const { hasActionsEnd } = this;
        return (index.h("div", { class: CSS$1.actionsEnd, hidden: !hasActionsEnd, key: "actions-end-container" }, index.h("slot", { name: SLOTS$1.actionsEnd, onSlotchange: this.handleActionsEndSlotChange })));
    }
    renderContentStart() {
        const { hasContentStart } = this;
        return (index.h("div", { class: CSS$1.contentStart, hidden: !hasContentStart }, index.h("slot", { name: SLOTS$1.contentStart, onSlotchange: this.handleContentStartSlotChange })));
    }
    renderDefaultContent() {
        return (index.h("div", { class: CSS$1.content }, index.h("slot", null)));
    }
    renderContentEnd() {
        const { hasContentEnd } = this;
        return (index.h("div", { class: CSS$1.contentEnd, hidden: !hasContentEnd }, index.h("slot", { name: SLOTS$1.contentEnd, onSlotchange: this.handleContentEndSlotChange })));
    }
    render() {
        return (index.h(index.Host, { key: '6469377ccf7311aefda5e864aac7cb5870b24ded' }, index.h("div", { key: 'd897fc4e108392784147cc0c8ed0a4bf5d347ca1', class: CSS$1.container }, this.renderActionsStart(), this.renderContentStart(), this.renderDefaultContent(), this.renderContentEnd(), this.renderActionsEnd())));
    }
};
Stack.style = CalciteStackStyle0;

exports.calcite_filter = Filter;
exports.calcite_handle = Handle;
exports.calcite_list = List;
exports.calcite_list_item = ListItem;
exports.calcite_stack = Stack;
