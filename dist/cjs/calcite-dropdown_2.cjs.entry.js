/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5a0af791.js');
const dom = require('./dom-6a9b6275.js');
const floatingUi = require('./floating-ui-b20fd1f7.js');
const guid = require('./guid-02e5380f.js');
const interactive = require('./interactive-89f913ba.js');
const key = require('./key-d6da79d8.js');
const loadable = require('./loadable-2e2626dc.js');
const observers = require('./observers-8fed90f3.js');
const openCloseComponent = require('./openCloseComponent-14628d11.js');
const component = require('./component-a4c6a35d.js');
const resources = require('./resources-151788f3.js');
require('./resources-dfe71ff2.js');
require('./browser-69696af0.js');
require('./debounce-7f1e04d6.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const SLOTS = {
    dropdownTrigger: "trigger",
};

const dropdownCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:inline-block}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host .calcite-dropdown-wrapper{--calcite-floating-ui-z-index:var(--calcite-z-index-dropdown);display:block;position:absolute;z-index:var(--calcite-floating-ui-z-index);visibility:hidden}.calcite-dropdown-wrapper .calcite-floating-ui-anim{position:relative;transition:var(--calcite-floating-ui-transition);transition-property:inset, left, opacity;opacity:0;box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);z-index:var(--calcite-z-index);border-radius:0.25rem}.calcite-dropdown-wrapper[data-placement^=bottom] .calcite-floating-ui-anim{inset-block-start:-5px}.calcite-dropdown-wrapper[data-placement^=top] .calcite-floating-ui-anim{inset-block-start:5px}.calcite-dropdown-wrapper[data-placement^=left] .calcite-floating-ui-anim{left:5px}.calcite-dropdown-wrapper[data-placement^=right] .calcite-floating-ui-anim{left:-5px}.calcite-dropdown-wrapper[data-placement] .calcite-floating-ui-anim--active{opacity:1;inset-block:0;left:0}:host([open]) .calcite-dropdown-wrapper{visibility:visible}:host .calcite-dropdown-content{max-block-size:45vh;inline-size:auto;overflow-y:auto;overflow-x:hidden;background-color:var(--calcite-color-foreground-1);inline-size:var(--calcite-dropdown-width)}.calcite-trigger-container{position:relative;display:flex;block-size:100%;flex:1 1 auto;word-wrap:break-word;word-break:break-word}@media (forced-colors: active){:host([open]) .calcite-dropdown-wrapper{border:1px solid canvasText}}:host([width-scale=s]){--calcite-dropdown-width:12rem}:host([width-scale=m]){--calcite-dropdown-width:14rem}:host([width-scale=l]){--calcite-dropdown-width:16rem}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteDropdownStyle0 = dropdownCss;

const Dropdown = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteDropdownSelect = index.createEvent(this, "calciteDropdownSelect", 6);
        this.calciteDropdownBeforeClose = index.createEvent(this, "calciteDropdownBeforeClose", 6);
        this.calciteDropdownClose = index.createEvent(this, "calciteDropdownClose", 6);
        this.calciteDropdownBeforeOpen = index.createEvent(this, "calciteDropdownBeforeOpen", 6);
        this.calciteDropdownOpen = index.createEvent(this, "calciteDropdownOpen", 6);
        this.items = [];
        this.groups = [];
        this.mutationObserver = observers.createObserver("mutation", () => this.updateItems());
        this.resizeObserver = observers.createObserver("resize", (entries) => this.resizeObserverCallback(entries));
        this.openTransitionProp = "opacity";
        this.guid = `calcite-dropdown-${guid.guid()}`;
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        this.setFilteredPlacements = () => {
            const { el, flipPlacements } = this;
            this.filteredFlipPlacements = flipPlacements
                ? floatingUi.filterValidFlipPlacements(flipPlacements, el)
                : null;
        };
        this.updateTriggers = (event) => {
            this.triggers = event.target.assignedElements({
                flatten: true,
            });
            this.reposition(true);
        };
        this.updateItems = () => {
            this.items = this.groups
                .map((group) => Array.from(group?.querySelectorAll("calcite-dropdown-item")))
                .reduce((previousValue, currentValue) => [...previousValue, ...currentValue], []);
            this.updateSelectedItems();
            this.reposition(true);
            this.items.forEach((item) => (item.scale = this.scale));
        };
        this.updateGroups = (event) => {
            const groups = event.target
                .assignedElements({ flatten: true })
                .filter((el) => el?.matches("calcite-dropdown-group"));
            this.groups = groups;
            this.updateItems();
            this.updateGroupScale();
        };
        this.resizeObserverCallback = (entries) => {
            entries.forEach((entry) => {
                const { target } = entry;
                if (target === this.referenceEl) {
                    this.setDropdownWidth();
                }
                else if (target === this.scrollerEl) {
                    this.setMaxScrollerHeight();
                }
            });
        };
        this.setDropdownWidth = () => {
            const { referenceEl, scrollerEl } = this;
            const referenceElWidth = referenceEl?.clientWidth;
            if (!referenceElWidth || !scrollerEl) {
                return;
            }
            scrollerEl.style.minWidth = `${referenceElWidth}px`;
        };
        this.setMaxScrollerHeight = () => {
            const { scrollerEl } = this;
            if (!scrollerEl) {
                return;
            }
            this.reposition(true);
            const maxScrollerHeight = this.getMaxScrollerHeight();
            scrollerEl.style.maxHeight = maxScrollerHeight > 0 ? `${maxScrollerHeight}px` : "";
            this.reposition(true);
        };
        this.setScrollerAndTransitionEl = (el) => {
            this.resizeObserver.observe(el);
            this.scrollerEl = el;
            this.transitionEl = el;
        };
        this.setReferenceEl = (el) => {
            this.referenceEl = el;
            floatingUi.connectFloatingUI(this, this.referenceEl, this.floatingEl);
            this.resizeObserver.observe(el);
        };
        this.setFloatingEl = (el) => {
            this.floatingEl = el;
            floatingUi.connectFloatingUI(this, this.referenceEl, this.floatingEl);
        };
        this.keyDownHandler = (event) => {
            if (!event.composedPath().includes(this.referenceEl)) {
                return;
            }
            const { defaultPrevented, key: key$1 } = event;
            if (defaultPrevented) {
                return;
            }
            if (this.open) {
                if (key$1 === "Escape") {
                    this.closeCalciteDropdown();
                    event.preventDefault();
                    return;
                }
                else if (event.shiftKey && key$1 === "Tab") {
                    this.closeCalciteDropdown();
                    event.preventDefault();
                    return;
                }
            }
            if (key.isActivationKey(key$1)) {
                this.openCalciteDropdown();
                event.preventDefault();
            }
            else if (key$1 === "Escape") {
                this.closeCalciteDropdown();
                event.preventDefault();
            }
        };
        this.focusOnFirstActiveOrFirstItem = () => {
            this.getFocusableElement(this.getTraversableItems().find((item) => item.selected) || this.items[0]);
        };
        this.toggleOpenEnd = () => {
            this.focusOnFirstActiveOrFirstItem();
            this.el.removeEventListener("calciteDropdownOpen", this.toggleOpenEnd);
        };
        this.openCalciteDropdown = () => {
            this.open = !this.open;
            if (this.open) {
                this.el.addEventListener("calciteDropdownOpen", this.toggleOpenEnd);
            }
        };
        this.open = false;
        this.closeOnSelectDisabled = false;
        this.disabled = false;
        this.flipPlacements = undefined;
        this.maxItems = 0;
        this.overlayPositioning = "absolute";
        this.placement = floatingUi.defaultMenuPlacement;
        this.selectedItems = [];
        this.type = "click";
        this.widthScale = undefined;
        this.scale = "m";
    }
    openHandler() {
        openCloseComponent.onToggleOpenCloseComponent(this);
        if (this.disabled) {
            this.open = false;
            return;
        }
        this.reposition(true);
    }
    handleDisabledChange(value) {
        if (!value) {
            this.open = false;
        }
    }
    flipPlacementsHandler() {
        this.setFilteredPlacements();
        this.reposition(true);
    }
    maxItemsHandler() {
        this.setMaxScrollerHeight();
    }
    overlayPositioningHandler() {
        this.reposition(true);
    }
    placementHandler() {
        this.reposition(true);
    }
    handlePropsChange() {
        this.updateItems();
        this.updateGroupScale();
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /** Sets focus on the component's first focusable element. */
    async setFocus() {
        await loadable.componentFocusable(this);
        dom.focusFirstTabbable(this.referenceEl);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
        this.setFilteredPlacements();
        if (this.open) {
            this.openHandler();
            openCloseComponent.onToggleOpenCloseComponent(this);
        }
        interactive.connectInteractive(this);
        this.updateItems();
        floatingUi.connectFloatingUI(this, this.referenceEl, this.floatingEl);
    }
    componentWillLoad() {
        loadable.setUpLoadableComponent(this);
    }
    componentDidLoad() {
        loadable.setComponentLoaded(this);
        floatingUi.connectFloatingUI(this, this.referenceEl, this.floatingEl);
    }
    componentDidRender() {
        interactive.updateHostInteraction(this);
    }
    disconnectedCallback() {
        this.mutationObserver?.disconnect();
        this.resizeObserver?.disconnect();
        interactive.disconnectInteractive(this);
        floatingUi.disconnectFloatingUI(this, this.referenceEl, this.floatingEl);
    }
    render() {
        const { open, guid } = this;
        return (index.h(index.Host, { key: '4b3349c1645b7d39263a20b688f7645d92148f23' }, index.h(interactive.InteractiveContainer, { key: 'db1d56073b9f9db2fbf6eaef824e3f12411dd174', disabled: this.disabled }, index.h("div", { key: '05de1bb5f3641147441f18eaeae104acb06e47c6', class: "calcite-trigger-container", id: `${guid}-menubutton`, onClick: this.openCalciteDropdown, onKeyDown: this.keyDownHandler, ref: this.setReferenceEl }, index.h("slot", { key: '39b976c808c4f44983f2d6a056bb128537cf1aae', "aria-controls": `${guid}-menu`, "aria-expanded": dom.toAriaBoolean(open), "aria-haspopup": "menu", name: SLOTS.dropdownTrigger, onSlotchange: this.updateTriggers })), index.h("div", { key: '57ba0f8d3632febcab69b706a73a910f54f09b62', "aria-hidden": dom.toAriaBoolean(!open), class: "calcite-dropdown-wrapper", ref: this.setFloatingEl }, index.h("div", { key: 'ae7505fa472d323ad6aed6ea0dd2ab7fdf8e7e59', "aria-labelledby": `${guid}-menubutton`, class: {
                ["calcite-dropdown-content"]: true,
                [floatingUi.FloatingCSS.animation]: true,
                [floatingUi.FloatingCSS.animationActive]: open,
            }, id: `${guid}-menu`, ref: this.setScrollerAndTransitionEl, role: "menu" }, index.h("slot", { key: 'ae94137311b106fbed88dfde346002d87e4efcbb', onSlotchange: this.updateGroups }))))));
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /**
     * Updates the position of the component.
     *
     * @param delayed
     */
    async reposition(delayed = false) {
        const { floatingEl, referenceEl, placement, overlayPositioning, filteredFlipPlacements } = this;
        return floatingUi.reposition(this, {
            floatingEl,
            referenceEl,
            overlayPositioning,
            placement,
            flipPlacements: filteredFlipPlacements,
            type: "menu",
        }, delayed);
    }
    closeCalciteDropdownOnClick(event) {
        if (this.disabled || !this.open || event.composedPath().includes(this.el)) {
            return;
        }
        this.closeCalciteDropdown(false);
    }
    closeCalciteDropdownOnEvent(event) {
        this.closeCalciteDropdown();
        event.stopPropagation();
    }
    closeCalciteDropdownOnOpenEvent(event) {
        if (event.composedPath().includes(this.el)) {
            return;
        }
        this.open = false;
    }
    pointerEnterHandler() {
        if (this.disabled || this.type !== "hover") {
            return;
        }
        this.openCalciteDropdown();
    }
    pointerLeaveHandler() {
        if (this.disabled || this.type !== "hover") {
            return;
        }
        this.closeCalciteDropdown();
    }
    getTraversableItems() {
        return this.items.filter((item) => !item.disabled && !item.hidden);
    }
    calciteInternalDropdownItemKeyEvent(event) {
        const { keyboardEvent } = event.detail;
        const target = keyboardEvent.target;
        const traversableItems = this.getTraversableItems();
        switch (keyboardEvent.key) {
            case "Tab":
                this.open = false;
                this.updateTabIndexOfItems(target);
                break;
            case "ArrowDown":
                dom.focusElementInGroup(traversableItems, target, "next");
                break;
            case "ArrowUp":
                dom.focusElementInGroup(traversableItems, target, "previous");
                break;
            case "Home":
                dom.focusElementInGroup(traversableItems, target, "first");
                break;
            case "End":
                dom.focusElementInGroup(traversableItems, target, "last");
                break;
        }
        event.stopPropagation();
    }
    handleItemSelect(event) {
        this.updateSelectedItems();
        event.stopPropagation();
        this.calciteDropdownSelect.emit();
        if (!this.closeOnSelectDisabled ||
            event.detail.requestedDropdownGroup.selectionMode === "none") {
            this.closeCalciteDropdown();
        }
        event.stopPropagation();
    }
    updateGroupScale() {
        this.groups?.forEach((group) => (group.scale = this.scale));
    }
    onBeforeOpen() {
        this.calciteDropdownBeforeOpen.emit();
    }
    onOpen() {
        this.calciteDropdownOpen.emit();
    }
    onBeforeClose() {
        this.calciteDropdownBeforeClose.emit();
    }
    onClose() {
        this.calciteDropdownClose.emit();
    }
    updateSelectedItems() {
        this.selectedItems = this.items.filter((item) => item.selected);
    }
    getMaxScrollerHeight() {
        const { maxItems, items } = this;
        let itemsToProcess = 0;
        let maxScrollerHeight = 0;
        let groupHeaderHeight;
        this.groups.forEach((group) => {
            if (maxItems > 0 && itemsToProcess < maxItems) {
                Array.from(group.children).forEach((item, index) => {
                    if (index === 0) {
                        if (isNaN(groupHeaderHeight)) {
                            groupHeaderHeight = item.offsetTop;
                        }
                        maxScrollerHeight += groupHeaderHeight;
                    }
                    if (itemsToProcess < maxItems) {
                        maxScrollerHeight += item.offsetHeight;
                        itemsToProcess += 1;
                    }
                });
            }
        });
        return items.length > maxItems ? maxScrollerHeight : 0;
    }
    closeCalciteDropdown(focusTrigger = true) {
        this.open = false;
        if (focusTrigger) {
            dom.focusElement(this.triggers[0]);
        }
    }
    getFocusableElement(item) {
        if (!item) {
            return;
        }
        dom.focusElement(item);
    }
    updateTabIndexOfItems(target) {
        this.items.forEach((item) => {
            item.tabIndex = target !== item ? -1 : 0;
        });
    }
    static get delegatesFocus() { return true; }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "open": ["openHandler"],
        "disabled": ["handleDisabledChange"],
        "flipPlacements": ["flipPlacementsHandler"],
        "maxItems": ["maxItemsHandler"],
        "overlayPositioning": ["overlayPositioningHandler"],
        "placement": ["placementHandler"],
        "scale": ["handlePropsChange"]
    }; }
};
Dropdown.style = CalciteDropdownStyle0;

const dropdownItemCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;display:flex;flex-grow:1;align-items:center;outline-color:transparent}.container{position:relative;display:flex;flex-grow:1;cursor:pointer;align-items:center;color:var(--calcite-color-text-3);text-decoration-line:none;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);text-align:start}.container a{position:relative;display:flex;flex-grow:1;cursor:pointer;align-items:center;color:var(--calcite-color-text-3);text-decoration-line:none;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);outline-color:transparent}.dropdown-item-content{flex:1 1 auto;padding-block:0.125rem}.dropdown-item-icon{position:relative;opacity:0;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:scale(0.9)}:host([scale=s]) .container{padding-block:0.25rem;padding-inline:0.5rem;font-size:var(--calcite-font-size--2);line-height:1rem}:host([scale=s]) .dropdown-item-icon,:host([scale=s]) .dropdown-item-icon--start{padding-inline-end:var(--calcite-spacing-sm)}:host([scale=s]) .dropdown-item-icon--end{padding-inline-start:var(--calcite-spacing-sm)}:host([scale=m]) .container{padding-block:0.5rem;padding-inline:0.75rem;font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=m]) .dropdown-item-icon,:host([scale=m]) .dropdown-item-icon--start{padding-inline-end:var(--calcite-spacing-md)}:host([scale=m]) .dropdown-item-icon--end{padding-inline-start:var(--calcite-spacing-md)}:host([scale=l]) .container{padding-block:0.625rem;padding-inline:1rem;font-size:var(--calcite-font-size-0);line-height:1.25rem}:host([scale=l]) .dropdown-item-icon,:host([scale=l]) .dropdown-item-icon--start{padding-inline-end:var(--calcite-spacing-xl)}:host([scale=l]) .dropdown-item-icon--end{padding-inline-start:var(--calcite-spacing-xl)}:host(:focus){outline:2px solid transparent;outline-offset:2px;outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}:host(:focus) .container{color:var(--calcite-color-text-1);text-decoration-line:none}:host(:hover:not([disabled])) .container,:host(:active:not([disabled])) .container{background-color:var(--calcite-color-foreground-2);color:var(--calcite-color-text-1);text-decoration-line:none}:host(:hover:not([disabled])) .dropdown-link,:host(:active:not([disabled])) .dropdown-link{color:var(--calcite-color-text-1)}:host(:active:not([disabled])) .container{background-color:var(--calcite-color-foreground-3)}:host([selected]) .container:not(.container--none-selection),:host([selected]) .dropdown-link{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1)}:host([selected]) .container:not(.container--none-selection) calcite-icon,:host([selected]) .dropdown-link calcite-icon{color:var(--calcite-color-brand)}:host(:hover:not([disabled])) .dropdown-item-icon{color:var(--calcite-color-border-1);opacity:1}:host([selected]) .dropdown-item-icon{color:var(--calcite-color-brand);opacity:1}:host([hidden]){display:none}[hidden]{display:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}";
const CalciteDropdownItemStyle0 = dropdownItemCss;

const DropdownItem = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteDropdownItemSelect = index.createEvent(this, "calciteDropdownItemSelect", 6);
        this.calciteInternalDropdownItemSelect = index.createEvent(this, "calciteInternalDropdownItemSelect", 6);
        this.calciteInternalDropdownItemKeyEvent = index.createEvent(this, "calciteInternalDropdownItemKeyEvent", 6);
        this.calciteInternalDropdownCloseRequest = index.createEvent(this, "calciteInternalDropdownCloseRequest", 6);
        this.disabled = false;
        this.href = undefined;
        this.iconFlipRtl = undefined;
        this.iconStart = undefined;
        this.iconEnd = undefined;
        this.label = undefined;
        this.rel = undefined;
        this.selected = false;
        this.target = undefined;
        this.selectionMode = "single";
        this.scale = "m";
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /** Sets focus on the component. */
    async setFocus() {
        await loadable.componentFocusable(this);
        this.el?.focus();
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentWillLoad() {
        loadable.setUpLoadableComponent(this);
        this.initialize();
    }
    componentDidLoad() {
        loadable.setComponentLoaded(this);
    }
    connectedCallback() {
        this.initialize();
    }
    componentDidRender() {
        interactive.updateHostInteraction(this);
    }
    render() {
        const { href, selectionMode, label, iconFlipRtl } = this;
        const iconStartEl = (index.h("calcite-icon", { key: '46fd6784a80e78a149e6796018f495f33c9fe172', class: resources.CSS.iconStart, flipRtl: iconFlipRtl === "start" || iconFlipRtl === "both", icon: this.iconStart, scale: component.getIconScale(this.scale) }));
        const contentNode = (index.h("span", { key: 'feee494a9e26fad963b71e5aacf3abf9084ec463', class: resources.CSS.itemContent }, index.h("slot", { key: '33e49b095819a250f469d457279f6a340ff31fd4' })));
        const iconEndEl = (index.h("calcite-icon", { key: 'ea58bc58292cf76bcda6826e3c402079b0d3ad69', class: resources.CSS.iconEnd, flipRtl: iconFlipRtl === "end" || iconFlipRtl === "both", icon: this.iconEnd, scale: component.getIconScale(this.scale) }));
        const slottedContent = this.iconStart && this.iconEnd
            ? [iconStartEl, contentNode, iconEndEl]
            : this.iconStart
                ? [iconStartEl, contentNode]
                : this.iconEnd
                    ? [contentNode, iconEndEl]
                    : contentNode;
        const contentEl = !href ? (slottedContent) : (index.h("a", { "aria-label": label, class: resources.CSS.link, href: href, ref: (el) => (this.childLink = el), rel: this.rel, tabIndex: -1, target: this.target }, slottedContent));
        const itemRole = href
            ? null
            : selectionMode === "single"
                ? "menuitemradio"
                : selectionMode === "multiple"
                    ? "menuitemcheckbox"
                    : "menuitem";
        const itemAria = selectionMode !== "none" ? dom.toAriaBoolean(this.selected) : null;
        const { disabled } = this;
        return (index.h(index.Host, { key: '269693a7a036a7e39f4f8d529695df44f34df22a', "aria-checked": itemAria, "aria-label": !href ? label : "", role: itemRole, tabIndex: disabled ? -1 : 0 }, index.h(interactive.InteractiveContainer, { key: '0c644e048c9e30b8062cd60f7574c3e8fb631b4c', disabled: disabled }, index.h("div", { key: 'd5c9098d6c3007d5f05b28770074f6833a43d53f', class: {
                [resources.CSS.container]: true,
                [resources.CSS.containerNone]: selectionMode === "none",
            } }, selectionMode !== "none" ? (index.h("calcite-icon", { class: resources.CSS.icon, icon: selectionMode === "multiple" ? "check" : "bullet-point", scale: component.getIconScale(this.scale) })) : null, contentEl))));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    onClick() {
        this.emitRequestedItem();
    }
    keyDownHandler(event) {
        switch (event.key) {
            case " ":
            case "Enter":
                this.emitRequestedItem();
                if (this.href) {
                    this.childLink.click();
                }
                event.preventDefault();
                break;
            case "Escape":
                this.calciteInternalDropdownCloseRequest.emit();
                event.preventDefault();
                break;
            case "Tab":
                this.calciteInternalDropdownItemKeyEvent.emit({ keyboardEvent: event });
                break;
            case "ArrowUp":
            case "ArrowDown":
            case "Home":
            case "End":
                event.preventDefault();
                this.calciteInternalDropdownItemKeyEvent.emit({ keyboardEvent: event });
                break;
        }
    }
    updateActiveItemOnChange(event) {
        const parentEmittedChange = event.composedPath().includes(this.parentDropdownGroupEl);
        if (parentEmittedChange) {
            this.requestedDropdownGroup = event.detail.requestedDropdownGroup;
            this.requestedDropdownItem = event.detail.requestedDropdownItem;
            this.determineActiveItem();
        }
        event.stopPropagation();
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    initialize() {
        this.parentDropdownGroupEl = this.el.closest("calcite-dropdown-group");
        if (this.selectionMode === "none") {
            this.selected = false;
        }
    }
    determineActiveItem() {
        switch (this.selectionMode) {
            case "multiple":
                if (this.el === this.requestedDropdownItem) {
                    this.selected = !this.selected;
                }
                break;
            case "single":
                if (this.el === this.requestedDropdownItem) {
                    this.selected = true;
                }
                else if (this.requestedDropdownGroup === this.parentDropdownGroupEl) {
                    this.selected = false;
                }
                break;
            case "none":
                this.selected = false;
                break;
        }
    }
    emitRequestedItem() {
        this.calciteDropdownItemSelect.emit();
        this.calciteInternalDropdownItemSelect.emit({
            requestedDropdownItem: this.el,
            requestedDropdownGroup: this.parentDropdownGroupEl,
        });
    }
    get el() { return index.getElement(this); }
};
DropdownItem.style = CalciteDropdownItemStyle0;

exports.calcite_dropdown = Dropdown;
exports.calcite_dropdown_item = DropdownItem;
