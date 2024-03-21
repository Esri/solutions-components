/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-105cf2b9.js');
const filter = require('./filter-b524f88d.js');
const dom = require('./dom-c9c2c835.js');
const floatingUi = require('./floating-ui-984cc970.js');
const form = require('./form-fed676d6.js');
const guid = require('./guid-ae73cd27.js');
const interactive = require('./interactive-3ab7044d.js');
const label = require('./label-32573e1d.js');
const loadable = require('./loadable-5a794992.js');
const locale = require('./locale-d237c9d5.js');
const observers = require('./observers-db4527e4.js');
const openCloseComponent = require('./openCloseComponent-19a769d0.js');
const t9n = require('./t9n-993a84de.js');
const utils = require('./utils-65d812ea.js');
const component = require('./component-ac7c3bd8.js');
const Validation = require('./Validation-b02c6710.js');
const debounce = require('./debounce-30afab47.js');
const key = require('./key-c5504030.js');
const locale$1 = require('./locale-3d0a4bc2.js');
const mapViewUtils = require('./mapViewUtils-3e0fa457.js');
const publicNotificationStore = require('./publicNotificationStore-ef379d11.js');
require('./resources-9447c777.js');
require('./browser-d08a5f99.js');
require('./esri-loader-ce6c3d3d.js');
require('./_commonjsHelpers-480c2e77.js');
require('./interfaces-7cd0a48a.js');
require('./index-ae65e42f.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
const CSS$1 = {
    button: "x-button",
};
function XButton({ disabled, key, label, onClick, ref, scale, }) {
    return (index.h("button", { "aria-label": label, class: CSS$1.button, disabled: disabled, key: key, onClick: onClick, tabIndex: -1, type: "button",
        // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
        ref: ref }, index.h("calcite-icon", { icon: "x", scale: component.getIconScale(scale) })));
}

/**
 * Do not edit directly
 * Generated on Wed, 17 Jan 2024 17:52:08 GMT
 */
const calciteSize48 = "48px";

const comboboxCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;display:block}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([scale=s]) .x-button{inline-size:1rem;block-size:1rem}:host([scale=m]) .x-button{inline-size:1.5rem;block-size:1.5rem}:host([scale=l]) .x-button{inline-size:2rem;block-size:2rem}.x-button{margin:0px;display:flex;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;align-content:center;align-items:center;justify-content:center;align-self:center;border-width:2px;background-color:transparent;color:var(--calcite-color-text-3);outline-color:transparent;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;border-radius:50%;border-color:transparent;background-color:var(--calcite-color-foreground-2)}.x-button:active,.x-button:hover{color:var(--calcite-color-text-1);background-color:var(--calcite-color-foreground-3)}.x-button:active{border-style:solid;border-color:var(--calcite-color-brand)}.x-button calcite-icon{color:inherit}:host([scale=s]){font-size:var(--calcite-font-size--2);--calcite-combobox-item-spacing-unit-l:0.5rem;--calcite-combobox-item-spacing-unit-s:0.25rem;--calcite-combobox-input-height:1rem;--calcite-internal-combobox-input-margin-block:calc(0.25rem - 1px)}:host([scale=s]) .x-button{margin-inline:0.5rem}:host([scale=m]){font-size:var(--calcite-font-size--1);--calcite-combobox-item-spacing-unit-l:0.75rem;--calcite-combobox-item-spacing-unit-s:0.5rem;--calcite-combobox-input-height:1rem;--calcite-internal-combobox-input-margin-block:calc(0.5rem - 1px)}:host([scale=m]) .x-button{margin-inline-end:0.75rem}:host([scale=l]){font-size:var(--calcite-font-size-0);--calcite-combobox-item-spacing-unit-l:1rem;--calcite-combobox-item-spacing-unit-s:0.75rem;--calcite-combobox-input-height:1.5rem;--calcite-internal-combobox-input-margin-block:calc(0.625rem - 1px)}:host([scale=l]) .x-button{margin-inline-end:1rem}.wrapper{display:flex;border-width:1px;border-style:solid;border-color:var(--calcite-color-border-input);background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-1);outline-color:transparent;padding-block:calc(var(--calcite-combobox-item-spacing-unit-s) / 4);padding-inline:var(--calcite-combobox-item-spacing-unit-l)}:host(:focus-within) .wrapper,.wrapper--active{outline:2px solid var(--calcite-color-brand);outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}:host([status=invalid]) .wrapper{border-color:var(--calcite-color-status-danger)}:host([status=invalid]:focus-within) .wrapper{outline:2px solid var(--calcite-color-status-danger);outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.wrapper--single{padding-block:0;padding-inline:var(--calcite-combobox-item-spacing-unit-l);cursor:pointer;flex-wrap:nowrap}.grid-input{position:relative;display:flex;flex-grow:1;flex-wrap:wrap;align-items:center;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:0px;gap:var(--calcite-combobox-item-spacing-unit-s)}.grid-input.selection-display-fit,.grid-input.selection-display-single{flex-wrap:nowrap;overflow:hidden}.input{flex-grow:1;-webkit-appearance:none;-moz-appearance:none;appearance:none;text-overflow:ellipsis;border-style:none;background-color:transparent;padding:0px;font-family:inherit;color:var(--calcite-color-text-1);font-size:inherit;block-size:var(--calcite-combobox-input-height);line-height:var(--calcite-combobox-input-height);inline-size:100%;margin-block-end:var(--calcite-combobox-item-spacing-unit-s);min-inline-size:4.8125rem}.input:focus{outline:2px solid transparent;outline-offset:2px}.input:-moz-placeholder-shown{text-overflow:ellipsis}.input:placeholder-shown{text-overflow:ellipsis}.input--transparent{opacity:0}.input--single{padding:0px;margin-block:var(--calcite-internal-combobox-input-margin-block)}.wrapper--active .input-single{cursor:text}.input--hidden{pointer-events:none;inline-size:0px;min-inline-size:0px;opacity:0}.input--icon{padding-block:0;padding-inline:var(--calcite-combobox-item-spacing-unit-s)}:host([scale=m]) .input--icon,:host([scale=l]) .input--icon{padding-inline:0.25rem}.input-wrap{display:flex;flex-grow:1;align-items:center}.input-wrap--single{flex:1 1 0%;overflow:hidden}.label{pointer-events:none;display:flex;max-inline-size:100%;flex:1 1 auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:0px;font-weight:var(--calcite-font-weight-normal);block-size:var(--calcite-combobox-input-height);line-height:var(--calcite-combobox-input-height)}.label--icon{padding-inline:var(--calcite-combobox-item-spacing-unit-l)}.icon-end,.icon-start{display:flex;cursor:pointer;align-items:center}.icon-end{flex:none}.floating-ui-container{--calcite-floating-ui-z-index:var(--calcite-z-index-dropdown);display:block;position:absolute;z-index:var(--calcite-floating-ui-z-index);visibility:hidden}.floating-ui-container .calcite-floating-ui-anim{position:relative;transition:var(--calcite-floating-ui-transition);transition-property:transform, visibility, opacity;opacity:0;box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);z-index:var(--calcite-z-index);border-radius:0.25rem}.floating-ui-container[data-placement^=bottom] .calcite-floating-ui-anim{transform:translateY(-5px)}.floating-ui-container[data-placement^=top] .calcite-floating-ui-anim{transform:translateY(5px)}.floating-ui-container[data-placement^=left] .calcite-floating-ui-anim{transform:translateX(5px)}.floating-ui-container[data-placement^=right] .calcite-floating-ui-anim{transform:translateX(-5px)}.floating-ui-container[data-placement] .calcite-floating-ui-anim--active{opacity:1;transform:translate(0)}.floating-ui-container--active{visibility:visible}@media (forced-colors: active){.wrapper,.floating-ui-container--active{border:1px solid canvasText}}.screen-readers-only{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0}.list-container{max-block-size:45vh;overflow-y:auto;background-color:var(--calcite-color-foreground-1);inline-size:var(--calcite-dropdown-width)}.list{margin:0px;display:block;padding:0px}.list--hide{block-size:0px;overflow:hidden}calcite-chip{--calcite-animation-timing:0}.chip{margin-block:calc(var(--calcite-combobox-item-spacing-unit-s) / 4);max-inline-size:100%}.chip--active{background-color:var(--calcite-color-foreground-3)}.chip--invisible{visibility:hidden;position:absolute}.item{display:block}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:0.5rem}:host([scale=s]) .validation-container{padding-block-start:0.25rem}::slotted(input[slot=hidden-form-input]){margin:0 !important;opacity:0 !important;outline:none !important;padding:0 !important;position:absolute !important;inset:0 !important;transform:none !important;-webkit-appearance:none !important;z-index:-1 !important}:host([hidden]){display:none}[hidden]{display:none}::slotted(calcite-combobox-item-group:not(:first-child)){padding-block-start:var(--calcite-combobox-item-spacing-unit-l)}";

const isGroup = (el) => el.tagName === utils.ComboboxItemGroup;
const itemUidPrefix = "combobox-item-";
const chipUidPrefix = "combobox-chip-";
const labelUidPrefix = "combobox-label-";
const listboxUidPrefix = "combobox-listbox-";
const inputUidPrefix = "combobox-input-";
const Combobox = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteComboboxChange = index.createEvent(this, "calciteComboboxChange", 6);
        this.calciteComboboxFilterChange = index.createEvent(this, "calciteComboboxFilterChange", 6);
        this.calciteComboboxChipClose = index.createEvent(this, "calciteComboboxChipClose", 6);
        this.calciteComboboxBeforeClose = index.createEvent(this, "calciteComboboxBeforeClose", 6);
        this.calciteComboboxClose = index.createEvent(this, "calciteComboboxClose", 6);
        this.calciteComboboxBeforeOpen = index.createEvent(this, "calciteComboboxBeforeOpen", 6);
        this.calciteComboboxOpen = index.createEvent(this, "calciteComboboxOpen", 6);
        this.placement = floatingUi.defaultMenuPlacement;
        this.internalValueChangeFlag = false;
        this.textInput = null;
        this.mutationObserver = observers.createObserver("mutation", () => this.updateItems());
        this.resizeObserver = observers.createObserver("resize", () => {
            this.setMaxScrollerHeight();
            this.refreshSelectionDisplay();
        });
        this.guid = guid.guid();
        this.inputHeight = 0;
        this.ignoreSelectedEventsFlag = false;
        this.openTransitionProp = "opacity";
        this.setFilteredPlacements = () => {
            const { el, flipPlacements } = this;
            this.filteredFlipPlacements = flipPlacements
                ? floatingUi.filterComputedPlacements(flipPlacements, el)
                : null;
        };
        this.getValue = () => {
            const items = this.selectedItems.map((item) => { var _a; return (_a = item === null || item === void 0 ? void 0 : item.value) === null || _a === void 0 ? void 0 : _a.toString(); });
            return (items === null || items === void 0 ? void 0 : items.length) ? (items.length > 1 ? items : items[0]) : "";
        };
        this.onLabelClick = () => {
            this.setFocus();
        };
        this.keyDownHandler = (event) => {
            const { key } = event;
            switch (key) {
                case "Tab":
                    this.activeChipIndex = -1;
                    this.activeItemIndex = -1;
                    if (this.allowCustomValues && this.text) {
                        this.addCustomChip(this.text, true);
                        event.preventDefault();
                    }
                    else if (this.open) {
                        this.open = false;
                        event.preventDefault();
                    }
                    else if (!this.allowCustomValues && this.text) {
                        this.clearInputValue();
                        this.filterItems("");
                        this.updateActiveItemIndex(-1);
                    }
                    break;
                case "ArrowLeft":
                    this.previousChip();
                    event.preventDefault();
                    break;
                case "ArrowRight":
                    this.nextChip();
                    event.preventDefault();
                    break;
                case "ArrowUp":
                    event.preventDefault();
                    if (this.open) {
                        this.shiftActiveItemIndex(-1);
                    }
                    if (!this.comboboxInViewport()) {
                        this.el.scrollIntoView();
                    }
                    break;
                case "ArrowDown":
                    event.preventDefault();
                    if (this.open) {
                        this.shiftActiveItemIndex(1);
                    }
                    else {
                        this.open = true;
                        this.ensureRecentSelectedItemIsActive();
                    }
                    if (!this.comboboxInViewport()) {
                        this.el.scrollIntoView();
                    }
                    break;
                case " ":
                    if (!this.textInput.value) {
                        if (!this.open) {
                            this.open = true;
                            this.shiftActiveItemIndex(1);
                        }
                        event.preventDefault();
                    }
                    break;
                case "Home":
                    if (!this.open) {
                        return;
                    }
                    event.preventDefault();
                    this.updateActiveItemIndex(0);
                    this.scrollToActiveItem();
                    if (!this.comboboxInViewport()) {
                        this.el.scrollIntoView();
                    }
                    break;
                case "End":
                    if (!this.open) {
                        return;
                    }
                    event.preventDefault();
                    this.updateActiveItemIndex(this.filteredItems.length - 1);
                    this.scrollToActiveItem();
                    if (!this.comboboxInViewport()) {
                        this.el.scrollIntoView();
                    }
                    break;
                case "Escape":
                    if (!this.clearDisabled && !this.open) {
                        this.clearValue();
                    }
                    this.open = false;
                    event.preventDefault();
                    break;
                case "Enter":
                    if (this.activeItemIndex > -1) {
                        this.toggleSelection(this.filteredItems[this.activeItemIndex]);
                        event.preventDefault();
                    }
                    else if (this.activeChipIndex > -1) {
                        this.removeActiveChip();
                        event.preventDefault();
                    }
                    else if (this.allowCustomValues && this.text) {
                        this.addCustomChip(this.text, true);
                        event.preventDefault();
                    }
                    else if (!event.defaultPrevented) {
                        if (form.submitForm(this)) {
                            event.preventDefault();
                        }
                    }
                    break;
                case "Delete":
                case "Backspace":
                    const notDeletable = this.selectionDisplay === "single" ||
                        (this.selectionDisplay === "fit" && this.selectedHiddenChipsCount > 0);
                    if (notDeletable) {
                        return;
                    }
                    if (this.activeChipIndex > -1) {
                        event.preventDefault();
                        this.removeActiveChip();
                    }
                    else if (!this.text && this.isMulti()) {
                        event.preventDefault();
                        this.removeLastChip();
                    }
                    break;
            }
        };
        this.toggleCloseEnd = () => {
            this.open = false;
            this.el.removeEventListener("calciteComboboxClose", this.toggleCloseEnd);
        };
        this.toggleOpenEnd = () => {
            this.open = false;
            this.el.removeEventListener("calciteComboboxOpen", this.toggleOpenEnd);
        };
        this.setMaxScrollerHeight = async () => {
            const { listContainerEl, open, referenceEl } = this;
            if (!listContainerEl || !open) {
                return;
            }
            await this.reposition(true);
            const maxScrollerHeight = this.getMaxScrollerHeight();
            listContainerEl.style.maxHeight = maxScrollerHeight > 0 ? `${maxScrollerHeight}px` : "";
            listContainerEl.style.minWidth = `${referenceEl.clientWidth}px`;
            await this.reposition(true);
        };
        this.calciteChipCloseHandler = (comboboxItem) => {
            this.open = false;
            const selection = this.items.find((item) => item === comboboxItem);
            if (selection) {
                this.toggleSelection(selection, false);
            }
            this.calciteComboboxChipClose.emit();
        };
        this.clickHandler = (event) => {
            const composedPath = event.composedPath();
            if (composedPath.some((node) => node.tagName === "CALCITE-CHIP")) {
                this.open = false;
                event.preventDefault();
                return;
            }
            if (composedPath.some((node) => { var _a; return (_a = node.classList) === null || _a === void 0 ? void 0 : _a.contains(CSS$1.button); })) {
                this.clearValue();
                event.preventDefault();
                return;
            }
            this.open = !this.open;
            this.ensureRecentSelectedItemIsActive();
        };
        this.refreshSelectionDisplay = async () => {
            await loadable.componentLoaded(this);
            if (utils.isSingleLike(this.selectionMode)) {
                return;
            }
            if (!this.textInput) {
                return;
            }
            const { allSelectedIndicatorChipEl, chipContainerEl, selectionDisplay, placeholder, selectedIndicatorChipEl, textInput, } = this;
            const chipContainerElGap = parseInt(getComputedStyle(chipContainerEl).gap.replace("px", ""));
            const chipContainerElWidth = dom.getElementWidth(chipContainerEl);
            const { fontSize, fontFamily } = getComputedStyle(textInput);
            const inputTextWidth = dom.getTextWidth(placeholder, `${fontSize} ${fontFamily}`);
            const inputWidth = (inputTextWidth || parseInt(calciteSize48)) + chipContainerElGap;
            const allSelectedIndicatorChipElWidth = dom.getElementWidth(allSelectedIndicatorChipEl);
            const selectedIndicatorChipElWidth = dom.getElementWidth(selectedIndicatorChipEl);
            const largestSelectedIndicatorChipWidth = Math.max(allSelectedIndicatorChipElWidth, selectedIndicatorChipElWidth);
            this.setCompactSelectionDisplay({
                chipContainerElGap,
                chipContainerElWidth,
                inputWidth,
                largestSelectedIndicatorChipWidth,
            });
            if (selectionDisplay === "fit") {
                const chipEls = Array.from(this.el.shadowRoot.querySelectorAll("calcite-chip")).filter((chipEl) => chipEl.closable);
                const availableHorizontalChipElSpace = Math.round(chipContainerElWidth -
                    ((this.selectedHiddenChipsCount > 0 ? selectedIndicatorChipElWidth : 0) +
                        chipContainerElGap +
                        inputWidth +
                        chipContainerElGap));
                this.refreshChipDisplay({ availableHorizontalChipElSpace, chipContainerElGap, chipEls });
                this.setVisibleAndHiddenChips(chipEls);
            }
        };
        this.setFloatingEl = (el) => {
            this.floatingEl = el;
            floatingUi.connectFloatingUI(this, this.referenceEl, this.floatingEl);
        };
        this.setContainerEl = (el) => {
            this.resizeObserver.observe(el);
            this.listContainerEl = el;
            this.transitionEl = el;
        };
        this.setChipContainerEl = (el) => {
            this.resizeObserver.observe(el);
            this.chipContainerEl = el;
        };
        this.setReferenceEl = (el) => {
            this.referenceEl = el;
            floatingUi.connectFloatingUI(this, this.referenceEl, this.floatingEl);
        };
        this.setAllSelectedIndicatorChipEl = (el) => {
            this.allSelectedIndicatorChipEl = el;
        };
        this.setSelectedIndicatorChipEl = (el) => {
            this.selectedIndicatorChipEl = el;
        };
        this.inputHandler = (event) => {
            const value = event.target.value;
            this.text = value;
            this.filterItems(value);
            if (value) {
                this.activeChipIndex = -1;
            }
        };
        this.filterItems = (() => {
            const find = (item, filteredData) => item &&
                filteredData.some(({ label, value }) => isGroup(item) ? label === item.label : value === item.value && label === item.textLabel);
            return debounce.debounce((text) => {
                const filteredData = filter.filter(this.data, text);
                const itemsAndGroups = this.getItemsAndGroups();
                itemsAndGroups.forEach((item) => {
                    const hidden = !find(item, filteredData);
                    item.hidden = hidden;
                    const [parent, grandparent] = item.ancestors;
                    if (find(parent, filteredData) || find(grandparent, filteredData)) {
                        item.hidden = false;
                    }
                    if (!hidden) {
                        item.ancestors.forEach((ancestor) => (ancestor.hidden = false));
                    }
                });
                this.filteredItems = this.getFilteredItems();
                this.calciteComboboxFilterChange.emit();
            }, 100);
        })();
        this.internalComboboxChangeEvent = () => {
            this.calciteComboboxChange.emit();
        };
        this.emitComboboxChange = debounce.debounce(this.internalComboboxChangeEvent, 0);
        this.getSelectedItems = () => {
            if (!this.isMulti()) {
                const match = this.items.find(({ selected }) => selected);
                return match ? [match] : [];
            }
            return (this.items
                .filter((item) => item.selected && (this.selectionMode !== "ancestors" || !utils.hasActiveChildren(item)))
                /** Preserve order of entered tags */
                .sort((a, b) => {
                const aIdx = this.selectedItems.indexOf(a);
                const bIdx = this.selectedItems.indexOf(b);
                if (aIdx > -1 && bIdx > -1) {
                    return aIdx - bIdx;
                }
                return bIdx - aIdx;
            }));
        };
        this.updateItems = () => {
            this.items = this.getItems();
            this.groupItems = this.getGroupItems();
            this.data = this.getData();
            this.selectedItems = this.getSelectedItems();
            this.filteredItems = this.getFilteredItems();
            this.needsIcon = this.getNeedsIcon();
            this.items.forEach((item) => {
                item.selectionMode = this.selectionMode;
                item.scale = this.scale;
            });
            if (!this.allowCustomValues) {
                this.setMaxScrollerHeight();
            }
            this.groupItems.forEach((groupItem, index, items) => {
                if (index === 0) {
                    groupItem.afterEmptyGroup = false;
                }
                const nextGroupItem = items[index + 1];
                if (nextGroupItem) {
                    nextGroupItem.afterEmptyGroup = groupItem.children.length === 0;
                }
            });
        };
        this.scrollToActiveItem = () => {
            const activeItem = this.filteredItems[this.activeItemIndex];
            if (!activeItem) {
                return;
            }
            const height = this.calculateSingleItemHeight(activeItem);
            const { offsetHeight, scrollTop } = this.listContainerEl;
            if (offsetHeight + scrollTop < activeItem.offsetTop + height) {
                this.listContainerEl.scrollTop = activeItem.offsetTop - offsetHeight + height;
            }
            else if (activeItem.offsetTop < scrollTop) {
                this.listContainerEl.scrollTop = activeItem.offsetTop;
            }
        };
        this.comboboxFocusHandler = () => {
            var _a;
            if (this.disabled) {
                return;
            }
            (_a = this.textInput) === null || _a === void 0 ? void 0 : _a.focus();
        };
        this.clearDisabled = false;
        this.selectionDisplay = "all";
        this.open = false;
        this.disabled = false;
        this.form = undefined;
        this.label = undefined;
        this.placeholder = undefined;
        this.placeholderIcon = undefined;
        this.placeholderIconFlipRtl = false;
        this.maxItems = 0;
        this.validationMessage = undefined;
        this.validationIcon = undefined;
        this.name = undefined;
        this.allowCustomValues = undefined;
        this.overlayPositioning = "absolute";
        this.required = false;
        this.selectionMode = "multiple";
        this.scale = "m";
        this.status = "idle";
        this.value = null;
        this.flipPlacements = undefined;
        this.messages = undefined;
        this.messageOverrides = undefined;
        this.selectedItems = [];
        this.filteredItems = [];
        this.items = [];
        this.groupItems = [];
        this.needsIcon = undefined;
        this.activeItemIndex = -1;
        this.activeChipIndex = -1;
        this.activeDescendant = "";
        this.compactSelectionDisplay = false;
        this.selectedHiddenChipsCount = 0;
        this.selectedVisibleChipsCount = 0;
        this.text = "";
        this.effectiveLocale = undefined;
        this.defaultMessages = undefined;
    }
    openHandler() {
        openCloseComponent.onToggleOpenCloseComponent(this);
        if (this.disabled) {
            this.open = false;
            return;
        }
        this.setMaxScrollerHeight();
    }
    handleDisabledChange(value) {
        if (!value) {
            this.open = false;
        }
    }
    maxItemsHandler() {
        this.setMaxScrollerHeight();
    }
    overlayPositioningHandler() {
        this.reposition(true);
    }
    handlePropsChange() {
        this.updateItems();
    }
    valueHandler(value) {
        if (!this.internalValueChangeFlag) {
            const items = this.getItems();
            if (Array.isArray(value)) {
                items.forEach((item) => (item.selected = value.includes(item.value)));
            }
            else if (value) {
                items.forEach((item) => (item.selected = value === item.value));
            }
            else {
                items.forEach((item) => (item.selected = false));
            }
            this.updateItems();
        }
    }
    onMessagesChange() {
        /*  wired up by t9n util */
    }
    flipPlacementsHandler() {
        this.setFilteredPlacements();
        this.reposition(true);
    }
    selectedItemsHandler() {
        this.internalValueChangeFlag = true;
        this.value = this.getValue();
        this.internalValueChangeFlag = false;
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    documentClickHandler(event) {
        if (this.disabled || !dom.isPrimaryPointerButton(event)) {
            return;
        }
        const composedPath = event.composedPath();
        if (composedPath.includes(this.el) || composedPath.includes(this.referenceEl)) {
            return;
        }
        if (!this.allowCustomValues && this.textInput.value) {
            this.clearInputValue();
            this.filterItems("");
            this.updateActiveItemIndex(-1);
        }
        if (this.allowCustomValues && this.text.trim().length) {
            this.addCustomChip(this.text);
        }
        this.open = false;
    }
    calciteComboboxItemChangeHandler(event) {
        if (this.ignoreSelectedEventsFlag) {
            return;
        }
        const target = event.target;
        const newIndex = this.filteredItems.indexOf(target);
        this.updateActiveItemIndex(newIndex);
        this.toggleSelection(target, target.selected);
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /**
     * Updates the position of the component.
     *
     * @param delayed Reposition the component after a delay
     * @returns Promise
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
    /** Sets focus on the component. */
    async setFocus() {
        var _a;
        await loadable.componentFocusable(this);
        (_a = this.textInput) === null || _a === void 0 ? void 0 : _a.focus();
        this.activeChipIndex = -1;
        this.activeItemIndex = -1;
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    connectedCallback() {
        var _a;
        interactive.connectInteractive(this);
        locale.connectLocalized(this);
        t9n.connectMessages(this);
        label.connectLabel(this);
        form.connectForm(this);
        this.internalValueChangeFlag = true;
        this.value = this.getValue();
        this.internalValueChangeFlag = false;
        (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.observe(this.el, { childList: true, subtree: true });
        this.updateItems();
        this.setFilteredPlacements();
        this.reposition(true);
        if (this.open) {
            this.openHandler();
            openCloseComponent.onToggleOpenCloseComponent(this);
        }
        floatingUi.connectFloatingUI(this, this.referenceEl, this.floatingEl);
    }
    async componentWillLoad() {
        loadable.setUpLoadableComponent(this);
        this.updateItems();
        await t9n.setUpMessages(this);
    }
    componentDidLoad() {
        form.afterConnectDefaultValueSet(this, this.getValue());
        this.reposition(true);
        loadable.setComponentLoaded(this);
    }
    componentDidRender() {
        if (this.el.offsetHeight !== this.inputHeight) {
            this.reposition(true);
            this.inputHeight = this.el.offsetHeight;
        }
        interactive.updateHostInteraction(this);
    }
    componentDidUpdate() {
        this.refreshSelectionDisplay();
    }
    disconnectedCallback() {
        var _a, _b;
        (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
        (_b = this.resizeObserver) === null || _b === void 0 ? void 0 : _b.disconnect();
        interactive.disconnectInteractive(this);
        label.disconnectLabel(this);
        form.disconnectForm(this);
        floatingUi.disconnectFloatingUI(this, this.referenceEl, this.floatingEl);
        locale.disconnectLocalized(this);
        t9n.disconnectMessages(this);
    }
    /** when search text is cleared, reset active to  */
    textHandler() {
        this.updateActiveItemIndex(-1);
    }
    effectiveLocaleChange() {
        t9n.updateMessages(this, this.effectiveLocale);
    }
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    clearValue() {
        this.ignoreSelectedEventsFlag = true;
        this.items.forEach((el) => (el.selected = false));
        this.ignoreSelectedEventsFlag = false;
        this.selectedItems = [];
        this.emitComboboxChange();
        this.open = false;
        this.updateActiveItemIndex(-1);
        this.resetText();
        this.filterItems("");
        this.setFocus();
    }
    clearInputValue() {
        this.textInput.value = "";
        this.text = "";
    }
    comboboxInViewport() {
        const bounding = this.el.getBoundingClientRect();
        return (bounding.top >= 0 &&
            bounding.left >= 0 &&
            bounding.right <= (window.innerWidth || document.documentElement.clientWidth) &&
            bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight));
    }
    onBeforeOpen() {
        this.scrollToActiveItem();
        this.calciteComboboxBeforeOpen.emit();
    }
    onOpen() {
        this.calciteComboboxOpen.emit();
    }
    onBeforeClose() {
        this.calciteComboboxBeforeClose.emit();
    }
    onClose() {
        this.calciteComboboxClose.emit();
    }
    ensureRecentSelectedItemIsActive() {
        const { selectedItems } = this;
        const targetIndex = selectedItems.length === 0 ? 0 : this.items.indexOf(selectedItems[selectedItems.length - 1]);
        this.updateActiveItemIndex(targetIndex);
    }
    hideChip(chipEl) {
        chipEl.classList.add(utils.CSS.chipInvisible);
    }
    showChip(chipEl) {
        chipEl.classList.remove(utils.CSS.chipInvisible);
    }
    refreshChipDisplay({ chipEls, availableHorizontalChipElSpace, chipContainerElGap, }) {
        chipEls.forEach((chipEl) => {
            if (!chipEl.selected) {
                this.hideChip(chipEl);
            }
            else {
                const chipElWidth = dom.getElementWidth(chipEl);
                if (chipElWidth && chipElWidth < availableHorizontalChipElSpace) {
                    availableHorizontalChipElSpace -= chipElWidth + chipContainerElGap;
                    this.showChip(chipEl);
                    return;
                }
            }
            this.hideChip(chipEl);
        });
    }
    setCompactSelectionDisplay({ chipContainerElGap, chipContainerElWidth, inputWidth, largestSelectedIndicatorChipWidth, }) {
        const newCompactBreakpoint = Math.round(largestSelectedIndicatorChipWidth + chipContainerElGap + inputWidth);
        if (!this.maxCompactBreakpoint || this.maxCompactBreakpoint < newCompactBreakpoint) {
            this.maxCompactBreakpoint = newCompactBreakpoint;
        }
        this.compactSelectionDisplay = chipContainerElWidth < this.maxCompactBreakpoint;
    }
    setVisibleAndHiddenChips(chipEls) {
        let newSelectedVisibleChipsCount = 0;
        chipEls.forEach((chipEl) => {
            if (chipEl.selected && !chipEl.classList.contains(utils.CSS.chipInvisible)) {
                newSelectedVisibleChipsCount++;
            }
        });
        if (newSelectedVisibleChipsCount !== this.selectedVisibleChipsCount) {
            this.selectedVisibleChipsCount = newSelectedVisibleChipsCount;
        }
        const newSelectedHiddenChipsCount = this.getSelectedItems().length - newSelectedVisibleChipsCount;
        if (newSelectedHiddenChipsCount !== this.selectedHiddenChipsCount) {
            this.selectedHiddenChipsCount = newSelectedHiddenChipsCount;
        }
    }
    getMaxScrollerHeight() {
        const items = this.getItemsAndGroups().filter((item) => !item.hidden);
        const { maxItems } = this;
        let itemsToProcess = 0;
        let maxScrollerHeight = 0;
        if (items.length > maxItems) {
            items.forEach((item) => {
                if (itemsToProcess < maxItems && maxItems > 0) {
                    const height = this.calculateSingleItemHeight(item);
                    if (height > 0) {
                        maxScrollerHeight += height;
                        itemsToProcess++;
                    }
                }
            });
        }
        return maxScrollerHeight;
    }
    calculateSingleItemHeight(item) {
        if (!item) {
            return;
        }
        let height = item.offsetHeight;
        // if item has children items, don't count their height twice
        const children = Array.from(item.querySelectorAll(utils.ComboboxChildSelector));
        children
            .map((child) => child === null || child === void 0 ? void 0 : child.offsetHeight)
            .forEach((offsetHeight) => {
            height -= offsetHeight;
        });
        return height;
    }
    getItemsAndGroups() {
        return [...this.groupItems, ...this.items];
    }
    toggleSelection(item, value = !item.selected) {
        if (!item ||
            (this.selectionMode === "single-persist" && item.selected && item.value === this.value)) {
            return;
        }
        if (this.isMulti()) {
            item.selected = value;
            this.updateAncestors(item);
            this.selectedItems = this.getSelectedItems();
            this.emitComboboxChange();
            this.resetText();
            this.filterItems("");
        }
        else {
            this.ignoreSelectedEventsFlag = true;
            this.items.forEach((el) => (el.selected = el === item ? value : false));
            this.ignoreSelectedEventsFlag = false;
            this.selectedItems = this.getSelectedItems();
            this.emitComboboxChange();
            if (this.textInput) {
                this.textInput.value = item.textLabel;
            }
            this.open = false;
            this.updateActiveItemIndex(-1);
            this.resetText();
            this.filterItems("");
        }
    }
    updateAncestors(item) {
        if (this.selectionMode !== "ancestors") {
            return;
        }
        const ancestors = utils.getItemAncestors(item);
        const children = utils.getItemChildren(item);
        if (item.selected) {
            ancestors.forEach((el) => {
                el.selected = true;
            });
        }
        else {
            children.forEach((el) => (el.selected = false));
            [...ancestors].forEach((el) => {
                if (!utils.hasActiveChildren(el)) {
                    el.selected = false;
                }
            });
        }
    }
    getFilteredItems() {
        return this.items.filter((item) => !item.hidden);
    }
    getData() {
        return this.items.map((item) => ({
            filterDisabled: item.filterDisabled,
            value: item.value,
            label: item.textLabel,
        }));
    }
    getNeedsIcon() {
        return utils.isSingleLike(this.selectionMode) && this.items.some((item) => item.icon);
    }
    resetText() {
        if (this.textInput) {
            this.textInput.value = "";
        }
        this.text = "";
    }
    getItems() {
        const items = Array.from(this.el.querySelectorAll(utils.ComboboxItem));
        return items.filter((item) => !item.disabled);
    }
    getGroupItems() {
        return Array.from(this.el.querySelectorAll(utils.ComboboxItemGroup));
    }
    addCustomChip(value, focus) {
        const existingItem = this.items.find((el) => el.textLabel === value);
        if (existingItem) {
            this.toggleSelection(existingItem, true);
        }
        else {
            if (!this.isMulti()) {
                this.toggleSelection(this.selectedItems[this.selectedItems.length - 1], false);
            }
            const item = document.createElement("calcite-combobox-item");
            item.value = value;
            item.textLabel = value;
            item.selected = true;
            this.el.appendChild(item);
            this.resetText();
            if (focus) {
                this.setFocus();
            }
            this.updateItems();
            this.filterItems("");
            this.emitComboboxChange();
        }
    }
    removeActiveChip() {
        this.toggleSelection(this.selectedItems[this.activeChipIndex], false);
        this.setFocus();
    }
    removeLastChip() {
        this.toggleSelection(this.selectedItems[this.selectedItems.length - 1], false);
        this.setFocus();
    }
    previousChip() {
        if (this.text) {
            return;
        }
        const length = this.selectedItems.length - 1;
        const active = this.activeChipIndex;
        this.activeChipIndex = active === -1 ? length : Math.max(active - 1, 0);
        this.updateActiveItemIndex(-1);
        this.focusChip();
    }
    nextChip() {
        if (this.text || this.activeChipIndex === -1) {
            return;
        }
        const last = this.selectedItems.length - 1;
        const newIndex = this.activeChipIndex + 1;
        if (newIndex > last) {
            this.activeChipIndex = -1;
            this.setFocus();
        }
        else {
            this.activeChipIndex = newIndex;
            this.focusChip();
        }
        this.updateActiveItemIndex(-1);
    }
    focusChip() {
        var _a;
        const guid = (_a = this.selectedItems[this.activeChipIndex]) === null || _a === void 0 ? void 0 : _a.guid;
        const chip = guid
            ? this.referenceEl.querySelector(`#${chipUidPrefix}${guid}`)
            : null;
        chip === null || chip === void 0 ? void 0 : chip.setFocus();
    }
    shiftActiveItemIndex(delta) {
        const { length } = this.filteredItems;
        const newIndex = (this.activeItemIndex + length + delta) % length;
        this.updateActiveItemIndex(newIndex);
        this.scrollToActiveItem();
    }
    updateActiveItemIndex(index) {
        this.activeItemIndex = index;
        let activeDescendant = null;
        this.filteredItems.forEach((el, i) => {
            if (i === index) {
                el.active = true;
                activeDescendant = `${itemUidPrefix}${el.guid}`;
            }
            else {
                el.active = false;
            }
        });
        this.activeDescendant = activeDescendant;
        if (this.activeItemIndex > -1) {
            this.activeChipIndex = -1;
        }
    }
    isAllSelected() {
        return this.getItems().length === this.getSelectedItems().length;
    }
    isMulti() {
        return !utils.isSingleLike(this.selectionMode);
    }
    //--------------------------------------------------------------------------
    //
    //  Render Methods
    //
    //--------------------------------------------------------------------------
    renderChips() {
        const { activeChipIndex, scale, selectionMode, messages } = this;
        return this.selectedItems.map((item, i) => {
            const chipClasses = {
                chip: true,
                "chip--active": activeChipIndex === i,
            };
            const ancestors = [...utils.getItemAncestors(item)].reverse();
            const pathLabel = [...ancestors, item].map((el) => el.textLabel);
            const label = selectionMode !== "ancestors" ? item.textLabel : pathLabel.join(" / ");
            return (index.h("calcite-chip", { class: chipClasses, closable: true, icon: item.icon, iconFlipRtl: item.iconFlipRtl, id: item.guid ? `${chipUidPrefix}${item.guid}` : null, key: item.textLabel, messageOverrides: { dismissLabel: messages.removeTag }, onCalciteChipClose: () => this.calciteChipCloseHandler(item), scale: scale, selected: item.selected, title: label, value: item.value }, label));
        });
    }
    renderAllSelectedIndicatorChip() {
        const { compactSelectionDisplay, scale, selectedVisibleChipsCount, setAllSelectedIndicatorChipEl, } = this;
        const label = this.messages.allSelected;
        return (index.h("calcite-chip", { class: {
                chip: true,
                [utils.CSS.chipInvisible]: !(this.isAllSelected() &&
                    !selectedVisibleChipsCount &&
                    !compactSelectionDisplay),
            }, scale: scale, title: label, value: "",
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: setAllSelectedIndicatorChipEl }, label));
    }
    renderAllSelectedIndicatorChipCompact() {
        const { compactSelectionDisplay, scale, selectedVisibleChipsCount } = this;
        const label = this.messages.all || "All";
        return (index.h("calcite-chip", { class: {
                chip: true,
                [utils.CSS.chipInvisible]: !(this.isAllSelected() &&
                    !selectedVisibleChipsCount &&
                    compactSelectionDisplay),
            }, scale: scale, title: label, value: "" }, label));
    }
    renderSelectedIndicatorChip() {
        const { compactSelectionDisplay, selectionDisplay, getSelectedItems, scale, selectedHiddenChipsCount, selectedVisibleChipsCount, setSelectedIndicatorChipEl, } = this;
        let chipInvisible;
        let label;
        if (compactSelectionDisplay) {
            chipInvisible = true;
        }
        else {
            if (selectionDisplay === "single") {
                const selectedItemsCount = getSelectedItems().length;
                if (this.isAllSelected()) {
                    chipInvisible = true;
                }
                else if (selectedItemsCount > 0) {
                    chipInvisible = false;
                }
                else {
                    chipInvisible = true;
                }
                label = `${selectedItemsCount} ${this.messages.selected}`;
            }
            else if (selectionDisplay === "fit") {
                chipInvisible = !!((this.isAllSelected() && selectedVisibleChipsCount === 0) ||
                    selectedHiddenChipsCount === 0);
                label =
                    selectedVisibleChipsCount > 0
                        ? `+${selectedHiddenChipsCount}`
                        : `${selectedHiddenChipsCount} ${this.messages.selected}`;
            }
        }
        return (index.h("calcite-chip", { class: {
                chip: true,
                [utils.CSS.chipInvisible]: chipInvisible,
            }, scale: scale, title: label, value: "",
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: setSelectedIndicatorChipEl }, label));
    }
    renderSelectedIndicatorChipCompact() {
        const { compactSelectionDisplay, selectionDisplay, getSelectedItems, scale, selectedHiddenChipsCount, } = this;
        let chipInvisible;
        let label;
        if (compactSelectionDisplay) {
            const selectedItemsCount = getSelectedItems().length;
            if (this.isAllSelected()) {
                chipInvisible = true;
            }
            else if (selectionDisplay === "fit") {
                chipInvisible = !(selectedHiddenChipsCount > 0);
                label = `${selectedHiddenChipsCount || 0}`;
            }
            else if (selectionDisplay === "single") {
                chipInvisible = !(selectedItemsCount > 0);
                label = `${selectedItemsCount}`;
            }
        }
        else {
            chipInvisible = true;
        }
        return (index.h("calcite-chip", { class: {
                chip: true,
                [utils.CSS.chipInvisible]: chipInvisible,
            }, scale: scale, title: label, value: "" }, label));
    }
    renderInput() {
        const { guid, disabled, placeholder, selectionMode, selectedItems, open } = this;
        const single = utils.isSingleLike(selectionMode);
        const selectedItem = selectedItems[0];
        const showLabel = !open && single && !!selectedItem;
        return (index.h("span", { class: {
                "input-wrap": true,
                "input-wrap--single": single,
            } }, showLabel && (index.h("span", { class: {
                label: true,
                "label--icon": !!(selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.icon),
            }, key: "label" }, selectedItem.textLabel)), index.h("input", { "aria-activedescendant": this.activeDescendant, "aria-autocomplete": "list", "aria-controls": `${listboxUidPrefix}${guid}`, "aria-label": label.getLabelText(this), class: {
                input: true,
                "input--single": true,
                "input--transparent": this.activeChipIndex > -1,
                "input--hidden": showLabel,
                "input--icon": !!this.placeholderIcon,
            }, disabled: disabled, id: `${inputUidPrefix}${guid}`, key: "input", onFocus: this.comboboxFocusHandler, onInput: this.inputHandler, placeholder: placeholder, type: "text",
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: (el) => (this.textInput = el) })));
    }
    renderListBoxOptions() {
        return this.filteredItems.map((item) => (index.h("li", { "aria-selected": dom.toAriaBoolean(item.selected), id: item.guid ? `${itemUidPrefix}${item.guid}` : null, role: "option", tabindex: "-1" }, item.textLabel)));
    }
    renderFloatingUIContainer() {
        const { setFloatingEl, setContainerEl, open } = this;
        const classes = {
            [utils.CSS.listContainer]: true,
            [floatingUi.FloatingCSS.animation]: true,
            [floatingUi.FloatingCSS.animationActive]: open,
        };
        return (index.h("div", { "aria-hidden": "true", class: {
                "floating-ui-container": true,
                "floating-ui-container--active": open,
            },
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: setFloatingEl }, index.h("div", { class: classes,
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: setContainerEl }, index.h("ul", { class: { list: true, "list--hide": !open } }, index.h("slot", null)))));
    }
    renderIconStart() {
        const { selectedItems, placeholderIcon, selectionMode, placeholderIconFlipRtl } = this;
        const selectedItem = selectedItems[0];
        const selectedIcon = selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.icon;
        const singleSelectionMode = utils.isSingleLike(selectionMode);
        const iconAtStart = !this.open && selectedItem
            ? !!selectedIcon && singleSelectionMode
            : !!this.placeholderIcon && (!selectedItem || singleSelectionMode);
        return (iconAtStart && (index.h("span", { class: "icon-start" }, index.h("calcite-icon", { class: "selected-icon", flipRtl: this.open && selectedItem ? selectedItem.iconFlipRtl : placeholderIconFlipRtl, icon: !this.open && selectedItem ? selectedIcon : placeholderIcon, scale: component.getIconScale(this.scale) }))));
    }
    renderIconEnd() {
        const { open } = this;
        return (index.h("span", { class: "icon-end" }, index.h("calcite-icon", { icon: open ? "chevron-up" : "chevron-down", scale: component.getIconScale(this.scale) })));
    }
    render() {
        var _a;
        const { selectionDisplay, guid, label: label$1, open } = this;
        const singleSelectionMode = utils.isSingleLike(this.selectionMode);
        const allSelectionDisplay = selectionDisplay === "all";
        const singleSelectionDisplay = selectionDisplay === "single";
        const fitSelectionDisplay = !singleSelectionMode && selectionDisplay === "fit";
        const isClearable = !this.clearDisabled && ((_a = this.value) === null || _a === void 0 ? void 0 : _a.length) > 0;
        return (index.h(index.Host, { onClick: this.comboboxFocusHandler }, index.h(interactive.InteractiveContainer, { disabled: this.disabled }, index.h("div", { "aria-autocomplete": "list", "aria-controls": `${listboxUidPrefix}${guid}`, "aria-expanded": dom.toAriaBoolean(open), "aria-haspopup": "listbox", "aria-label": label.getLabelText(this), "aria-live": "polite", "aria-owns": `${listboxUidPrefix}${guid}`, class: {
                wrapper: true,
                "wrapper--single": singleSelectionMode || !this.selectedItems.length,
                "wrapper--active": open,
            }, onClick: this.clickHandler, onKeyDown: this.keyDownHandler, role: "combobox",
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: this.setReferenceEl }, index.h("div", { class: {
                "grid-input": true,
                [utils.CSS.selectionDisplayFit]: fitSelectionDisplay,
                [utils.CSS.selectionDisplaySingle]: singleSelectionDisplay,
            }, ref: this.setChipContainerEl }, this.renderIconStart(), !singleSelectionMode && !singleSelectionDisplay && this.renderChips(), !singleSelectionMode &&
            !allSelectionDisplay && [
            this.renderSelectedIndicatorChip(),
            this.renderSelectedIndicatorChipCompact(),
            this.renderAllSelectedIndicatorChip(),
            this.renderAllSelectedIndicatorChipCompact(),
        ], index.h("label", { class: "screen-readers-only", htmlFor: `${inputUidPrefix}${guid}`, id: `${labelUidPrefix}${guid}` }, label$1), this.renderInput()), isClearable ? (index.h(XButton, { disabled: this.disabled, key: "close-button", label: this.messages.clear, scale: this.scale })) : null, this.renderIconEnd()), index.h("ul", { "aria-labelledby": `${labelUidPrefix}${guid}`, "aria-multiselectable": "true", class: "screen-readers-only", id: `${listboxUidPrefix}${guid}`, role: "listbox", tabIndex: -1 }, this.renderListBoxOptions()), this.renderFloatingUIContainer(), index.h(form.HiddenFormInputSlot, { component: this }), this.validationMessage ? (index.h(Validation.Validation, { icon: this.validationIcon, message: this.validationMessage, scale: this.scale, status: this.status })) : null)));
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "open": ["openHandler"],
        "disabled": ["handleDisabledChange"],
        "maxItems": ["maxItemsHandler"],
        "overlayPositioning": ["overlayPositioningHandler"],
        "selectionMode": ["handlePropsChange"],
        "scale": ["handlePropsChange"],
        "value": ["valueHandler"],
        "messageOverrides": ["onMessagesChange"],
        "flipPlacements": ["flipPlacementsHandler"],
        "selectedItems": ["selectedItemsHandler"],
        "text": ["textHandler"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
};
Combobox.style = comboboxCss;

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
const SLOTS = {
    dropdownTrigger: "trigger",
};

const dropdownCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:inline-block}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host .calcite-dropdown-wrapper{--calcite-floating-ui-z-index:var(--calcite-z-index-dropdown);display:block;position:absolute;z-index:var(--calcite-floating-ui-z-index);visibility:hidden}.calcite-dropdown-wrapper .calcite-floating-ui-anim{position:relative;transition:var(--calcite-floating-ui-transition);transition-property:transform, visibility, opacity;opacity:0;box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);z-index:var(--calcite-z-index);border-radius:0.25rem}.calcite-dropdown-wrapper[data-placement^=bottom] .calcite-floating-ui-anim{transform:translateY(-5px)}.calcite-dropdown-wrapper[data-placement^=top] .calcite-floating-ui-anim{transform:translateY(5px)}.calcite-dropdown-wrapper[data-placement^=left] .calcite-floating-ui-anim{transform:translateX(5px)}.calcite-dropdown-wrapper[data-placement^=right] .calcite-floating-ui-anim{transform:translateX(-5px)}.calcite-dropdown-wrapper[data-placement] .calcite-floating-ui-anim--active{opacity:1;transform:translate(0)}:host([open]) .calcite-dropdown-wrapper{visibility:visible}:host .calcite-dropdown-content{max-block-size:45vh;inline-size:auto;overflow-y:auto;overflow-x:hidden;background-color:var(--calcite-color-foreground-1);inline-size:var(--calcite-dropdown-width)}.calcite-trigger-container{position:relative;display:flex;block-size:100%;flex:1 1 auto;word-wrap:break-word;word-break:break-word}@media (forced-colors: active){:host([open]) .calcite-dropdown-wrapper{border:1px solid canvasText}}:host([width-scale=s]){--calcite-dropdown-width:12rem}:host([width-scale=m]){--calcite-dropdown-width:14rem}:host([width-scale=l]){--calcite-dropdown-width:16rem}:host([hidden]){display:none}[hidden]{display:none}";

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
        this.defaultAssignedElements = [];
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        this.slotChangeHandler = (event) => {
            this.defaultAssignedElements = event.target.assignedElements({
                flatten: true,
            });
            this.updateItems();
        };
        this.setFilteredPlacements = () => {
            const { el, flipPlacements } = this;
            this.filteredFlipPlacements = flipPlacements
                ? floatingUi.filterComputedPlacements(flipPlacements, el)
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
                .map((group) => Array.from(group === null || group === void 0 ? void 0 : group.querySelectorAll("calcite-dropdown-item")))
                .reduce((previousValue, currentValue) => [...previousValue, ...currentValue], []);
            this.updateSelectedItems();
            this.reposition(true);
            this.items.forEach((item) => (item.scale = this.scale));
        };
        this.updateGroups = (event) => {
            const groups = event.target
                .assignedElements({ flatten: true })
                .filter((el) => el === null || el === void 0 ? void 0 : el.matches("calcite-dropdown-group"));
            this.groups = groups;
            this.updateItems();
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
            const referenceElWidth = referenceEl === null || referenceEl === void 0 ? void 0 : referenceEl.clientWidth;
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
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /** Sets focus on the component's first focusable element. */
    async setFocus() {
        await loadable.componentFocusable(this);
        this.el.focus();
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        var _a;
        (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.observe(this.el, { childList: true, subtree: true });
        this.setFilteredPlacements();
        this.reposition(true);
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
        this.reposition(true);
    }
    componentDidRender() {
        interactive.updateHostInteraction(this);
    }
    disconnectedCallback() {
        var _a, _b;
        (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
        (_b = this.resizeObserver) === null || _b === void 0 ? void 0 : _b.disconnect();
        interactive.disconnectInteractive(this);
        floatingUi.disconnectFloatingUI(this, this.referenceEl, this.floatingEl);
    }
    render() {
        const { open, guid } = this;
        return (index.h(index.Host, null, index.h(interactive.InteractiveContainer, { disabled: this.disabled }, index.h("div", { class: "calcite-trigger-container", id: `${guid}-menubutton`, onClick: this.openCalciteDropdown, onKeyDown: this.keyDownHandler,
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: this.setReferenceEl }, index.h("slot", { "aria-controls": `${guid}-menu`, "aria-expanded": dom.toAriaBoolean(open), "aria-haspopup": "menu", name: SLOTS.dropdownTrigger, onSlotchange: this.updateTriggers })), index.h("div", { "aria-hidden": dom.toAriaBoolean(!open), class: "calcite-dropdown-wrapper",
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: this.setFloatingEl }, index.h("div", { "aria-labelledby": `${guid}-menubutton`, class: {
                ["calcite-dropdown-content"]: true,
                [floatingUi.FloatingCSS.animation]: true,
                [floatingUi.FloatingCSS.animationActive]: open,
            }, id: `${guid}-menu`, role: "menu",
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: this.setScrollerAndTransitionEl }, index.h("slot", { onSlotchange: this.updateGroups }))))));
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
        if (this.disabled ||
            !dom.isPrimaryPointerButton(event) ||
            !this.open ||
            event.composedPath().includes(this.el)) {
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
Dropdown.style = dropdownCss;

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
const CSS = {
    container: "container",
    containerLink: "container--link",
    containerMulti: "container--multi-selection",
    containerSingle: "container--single-selection",
    containerNone: "container--none-selection",
    icon: "dropdown-item-icon",
    iconEnd: "dropdown-item-icon-end",
    iconStart: "dropdown-item-icon-start",
    itemContent: "dropdown-item-content",
    link: "dropdown-link",
};

const dropdownGroupCss = ":host{position:relative;display:block}.container{text-align:start}.container--s{font-size:var(--calcite-font-size--2);line-height:1rem}.container--s .dropdown-title{padding:0.5rem}.container--m{font-size:var(--calcite-font-size--1);line-height:1rem}.container--m .dropdown-title{padding:0.75rem}.container--l{font-size:var(--calcite-font-size-0);line-height:1.25rem}.container--l .dropdown-title{padding:1rem}.dropdown-title{margin-block-end:-1px;display:block;cursor:default;overflow-wrap:break-word;border-width:0px;border-block-end-width:1px;border-style:solid;border-color:var(--calcite-color-border-3);font-weight:var(--calcite-font-weight-bold);color:var(--calcite-color-text-2)}.dropdown-separator{display:block;block-size:1px;background-color:var(--calcite-color-border-3)}:host([hidden]){display:none}[hidden]{display:none}";

const DropdownGroup = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteInternalDropdownItemChange = index.createEvent(this, "calciteInternalDropdownItemChange", 6);
        this.updateItems = () => {
            Array.from(this.el.querySelectorAll("calcite-dropdown-item")).forEach((item) => (item.selectionMode = this.selectionMode));
        };
        this.mutationObserver = observers.createObserver("mutation", () => this.updateItems());
        this.groupTitle = undefined;
        this.scale = "m";
        this.selectionMode = "single";
    }
    handlePropsChange() {
        this.updateItems();
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        var _a;
        this.updateItems();
        (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.observe(this.el, { childList: true });
    }
    componentWillLoad() {
        this.groupPosition = this.getGroupPosition();
    }
    disconnectedCallback() {
        var _a;
        (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
    }
    render() {
        const groupTitle = this.groupTitle ? (index.h("span", { "aria-hidden": "true", class: "dropdown-title" }, this.groupTitle)) : null;
        const dropdownSeparator = this.groupPosition > 0 ? index.h("div", { class: "dropdown-separator", role: "separator" }) : null;
        return (index.h(index.Host, { "aria-label": this.groupTitle, role: "group" }, index.h("div", { class: {
                [CSS.container]: true,
                [`${CSS.container}--${this.scale}`]: true,
            } }, dropdownSeparator, groupTitle, index.h("slot", null))));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    updateActiveItemOnChange(event) {
        this.requestedDropdownGroup = event.detail.requestedDropdownGroup;
        this.requestedDropdownItem = event.detail.requestedDropdownItem;
        this.calciteInternalDropdownItemChange.emit({
            requestedDropdownGroup: this.requestedDropdownGroup,
            requestedDropdownItem: this.requestedDropdownItem,
        });
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    getGroupPosition() {
        return Array.prototype.indexOf.call(this.el.parentElement.querySelectorAll("calcite-dropdown-group"), this.el);
    }
    static get delegatesFocus() { return true; }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "selectionMode": ["handlePropsChange"]
    }; }
};
DropdownGroup.style = dropdownGroupCss;

const dropdownItemCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}.container--s{padding-block:0.25rem;font-size:var(--calcite-font-size--2);line-height:1rem;padding-inline-end:0.5rem;padding-inline-start:1.5rem}.container--m{padding-block:0.5rem;font-size:var(--calcite-font-size--1);line-height:1rem;padding-inline-end:0.75rem;padding-inline-start:2rem}.container--l{padding-block:0.625rem;font-size:var(--calcite-font-size-0);line-height:1.25rem;padding-inline-end:1rem;padding-inline-start:2.5rem}.container--s.container--none-selection{padding-inline-start:0.25rem}.container--s.container--none-selection .dropdown-link{padding-inline-start:0px}.container--m.container--none-selection{padding-inline-start:0.5rem}.container--m.container--none-selection .dropdown-link{padding-inline-start:0px}.container--l.container--none-selection{padding-inline-start:0.75rem}.container--l.container--none-selection .dropdown-link{padding-inline-start:0px}:host{position:relative;display:flex;flex-grow:1;align-items:center}.container{position:relative;display:flex;flex-grow:1;cursor:pointer;align-items:center;color:var(--calcite-color-text-3);-webkit-text-decoration-line:none;text-decoration-line:none;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);text-align:start}.dropdown-item-content{flex:1 1 auto;padding-block:0.125rem;padding-inline-end:auto;padding-inline-start:0.25rem}:host,.container--link a{outline-color:transparent}:host(:focus){outline:2px solid transparent;outline-offset:2px;outline:2px solid var(--calcite-color-brand);outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.container--link{padding:0px}.container--link a{position:relative;display:flex;flex-grow:1;cursor:pointer;align-items:center;color:var(--calcite-color-text-3);-webkit-text-decoration-line:none;text-decoration-line:none;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}.container--s .dropdown-link{padding-block:0.25rem;font-size:var(--calcite-font-size--2);line-height:1rem;padding-inline-end:0.5rem;padding-inline-start:1.5rem}.container--m .dropdown-link{padding-block:0.5rem;font-size:var(--calcite-font-size--1);line-height:1rem;padding-inline-end:0.75rem;padding-inline-start:2rem}.container--l .dropdown-link{padding-block:0.75rem;font-size:var(--calcite-font-size-0);line-height:1.25rem;padding-inline-end:1rem;padding-inline-start:2.5rem}:host(:hover:not([disabled])) .container,:host(:active:not([disabled])) .container{background-color:var(--calcite-color-foreground-2);color:var(--calcite-color-text-1);-webkit-text-decoration-line:none;text-decoration-line:none}:host(:hover:not([disabled])) .container--link .dropdown-link,:host(:active:not([disabled])) .container--link .dropdown-link{color:var(--calcite-color-text-1)}:host(:active:not([disabled])) .container{background-color:var(--calcite-color-foreground-3)}:host(:focus) .container{color:var(--calcite-color-text-1);-webkit-text-decoration-line:none;text-decoration-line:none}:host([selected]) .container:not(.container--none-selection),:host([selected]) .container--link .dropdown-link{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1)}:host([selected]) .container:not(.container--none-selection) calcite-icon,:host([selected]) .container--link .dropdown-link calcite-icon{color:var(--calcite-color-brand)}.dropdown-item-icon{position:absolute;opacity:0;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:scale(0.9)}.container--s .dropdown-item-icon{inset-inline-start:0.25rem}.container--m .dropdown-item-icon{inset-inline-start:0.5rem}.container--l .dropdown-item-icon{inset-inline-start:0.75rem}:host(:hover:not([disabled])) .dropdown-item-icon{color:var(--calcite-color-border-1);opacity:1}:host([selected]) .dropdown-item-icon{color:var(--calcite-color-brand);opacity:1}.container--s .dropdown-item-icon-start{margin-inline-end:0.5rem;margin-inline-start:0.25rem}.container--s .dropdown-item-icon-end{margin-inline-start:0.5rem}.container--m .dropdown-item-icon-start{margin-inline-end:0.75rem;margin-inline-start:0.25rem}.container--m .dropdown-item-icon-end{margin-inline-start:0.75rem}.container--l .dropdown-item-icon-start{margin-inline-end:1rem;margin-inline-start:0.25rem}.container--l .dropdown-item-icon-end{margin-inline-start:1rem}:host([hidden]){display:none}[hidden]{display:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}";

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
        var _a;
        await loadable.componentFocusable(this);
        (_a = this.el) === null || _a === void 0 ? void 0 : _a.focus();
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
        const { href, selectionMode, label, iconFlipRtl, scale } = this;
        const iconStartEl = (index.h("calcite-icon", { class: CSS.iconStart, flipRtl: iconFlipRtl === "start" || iconFlipRtl === "both", icon: this.iconStart, scale: component.getIconScale(this.scale) }));
        const contentNode = (index.h("span", { class: CSS.itemContent }, index.h("slot", null)));
        const iconEndEl = (index.h("calcite-icon", { class: CSS.iconEnd, flipRtl: iconFlipRtl === "end" || iconFlipRtl === "both", icon: this.iconEnd, scale: component.getIconScale(this.scale) }));
        const slottedContent = this.iconStart && this.iconEnd
            ? [iconStartEl, contentNode, iconEndEl]
            : this.iconStart
                ? [iconStartEl, contentNode]
                : this.iconEnd
                    ? [contentNode, iconEndEl]
                    : contentNode;
        const contentEl = !href ? (slottedContent) : (index.h("a", { "aria-label": label, class: CSS.link, href: href, rel: this.rel, tabIndex: -1, target: this.target,
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: (el) => (this.childLink = el) }, slottedContent));
        const itemRole = href
            ? null
            : selectionMode === "single"
                ? "menuitemradio"
                : selectionMode === "multiple"
                    ? "menuitemcheckbox"
                    : "menuitem";
        const itemAria = selectionMode !== "none" ? dom.toAriaBoolean(this.selected) : null;
        const { disabled } = this;
        return (index.h(index.Host, { "aria-checked": itemAria, "aria-label": !href ? label : "", role: itemRole, tabIndex: disabled ? -1 : 0 }, index.h(interactive.InteractiveContainer, { disabled: disabled }, index.h("div", { class: {
                [CSS.container]: true,
                [CSS.containerLink]: !!href,
                [`${CSS.container}--${scale}`]: true,
                [CSS.containerMulti]: selectionMode === "multiple",
                [CSS.containerSingle]: selectionMode === "single",
                [CSS.containerNone]: selectionMode === "none",
            } }, selectionMode !== "none" ? (index.h("calcite-icon", { class: CSS.icon, icon: selectionMode === "multiple" ? "check" : "bullet-point", scale: component.getIconScale(this.scale) })) : null, contentEl))));
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
DropdownItem.style = dropdownItemCss;

const mapLayerPickerCss = ":host{display:block}.map-layer-picker-container{width:100%;align-items:center}.map-layer-picker{position:relative;width:100%;display:inline-block}.padding-bottom-1{padding-bottom:1rem}.layer-picker-dropdown{height:100%;width:100%}.max-width-350{max-width:350px}.height-100{height:100%}.disabled{cursor:default !important;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled);pointer-events:none}.no-bottom-margin{--calcite-label-margin-bottom:0px}.layer-picker-label-container{align-items:center;display:inline-flex;height:100%;padding-inline-start:1rem;padding-inline-end:1rem}.padding-start-1{padding-inline-start:1rem}.cursor-default{cursor:default}";

const MapLayerPicker = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.idsFound = index.createEvent(this, "idsFound", 7);
        this.noLayersFound = index.createEvent(this, "noLayersFound", 7);
        this.layerSelectionChange = index.createEvent(this, "layerSelectionChange", 7);
        //--------------------------------------------------------------------------
        //
        //  Properties (protected)
        //
        //--------------------------------------------------------------------------
        /**
         * boolean: When true the default layer has been loaded once and should no longer be used
         */
        this.defaultLayerHonored = false;
        this.appearance = "transparent";
        this.defaultLayerId = "";
        this.display = "inline-block";
        this.enabledLayerIds = [];
        this.enabledTableIds = [];
        this.height = undefined;
        this.isMobile = undefined;
        this.mapView = undefined;
        this.onlyShowUpdatableLayers = undefined;
        this.placeholderIcon = "";
        this.selectedIds = [];
        this.scale = "m";
        this.showTables = undefined;
        this.showSingleLayerAsLabel = false;
        this.type = "select";
        this._hasMultipleLayers = true;
        this._hasValidLayers = true;
        this._isDropdownOpen = undefined;
        this.ids = [];
        this.selectedName = "";
        this._translations = undefined;
    }
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    /**
     * Called each time the mapView prop is changed.
     */
    async mapViewWatchHandler() {
        await this._setLayers();
        if (this.ids.length > 0) {
            this._hasValidLayers = true;
            this._hasMultipleLayers = this.ids.length > 1;
            this._setSelectedLayer(this.ids[0]);
        }
        else {
            this._hasValidLayers = false;
            this.noLayersFound.emit();
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (lifecycle)
    //
    //--------------------------------------------------------------------------
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     */
    async componentWillLoad() {
        await this._getTranslations();
        await this._setLayers();
        if (this.ids.length > 0 || this.selectedIds.length === 1) {
            this.layerSelectionChange.emit(this.selectedIds.length === 1 ? [this.selectedIds[0]] : [this.ids[0]]);
        }
    }
    /**
     * Renders the component.
     */
    render() {
        const id = "map-layer-picker";
        let style = this.height > 0 ? { "height": `${this.height.toString()}px` } : {};
        style = Object.assign(Object.assign({}, style), { "display": this.display });
        return (index.h(index.Host, null, index.h("div", { class: "map-layer-picker-container", style: style }, index.h("div", { class: "map-layer-picker", style: style }, !this._hasValidLayers ? this._getInvalidPlaceholder() :
            !this._hasMultipleLayers && this.showSingleLayerAsLabel ? this._getSingleLayerPlaceholder() :
                this.type === "combobox" ? this._getCombobox(id) :
                    this.type === "select" ? this._getSelect(id) : this._getDropdown(id)))));
    }
    /**
     * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
     */
    async componentDidLoad() {
        if (this.ids.length > 0 || this.selectedIds.length === 1) {
            const id = this.selectedIds.length === 1 ? this.selectedIds[0] : this.ids[0];
            if (this.type === "select") {
                this._layerElement.value = id;
            }
            else if (this.type === "dropdown") {
                this.selectedName = Object.keys(this._layerNameHash).indexOf(id) > -1 ?
                    this._layerNameHash[id].name : Object.keys(this._tableNameHash).indexOf(id) > -1 ?
                    this._tableNameHash[id].name : "";
            }
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * Create a notice to inform the user that no layers were found
     *
     * @returns Calcite Notice component with the message
     */
    _getInvalidPlaceholder() {
        return (index.h("div", null, index.h("calcite-notice", { class: "height-100", icon: "exclamation-mark-triangle", id: "no-valid-layers", kind: "danger", open: true }, index.h("div", { slot: "message" }, this._translations.noLayersFound)), index.h("calcite-tooltip", { label: this._translations.enableEditUpdate, placement: "bottom", "reference-element": "no-valid-layers" }, index.h("span", null, this._translations.enableEditUpdate))));
    }
    /**
     * Show layer name as a label with icon
     *
     * @returns Calcite label with the layer name and icon
     */
    _getSingleLayerPlaceholder() {
        return (index.h("div", { class: "layer-picker-label-container cursor-default" }, index.h("calcite-icon", { icon: "layers", scale: "s" }), index.h("calcite-label", { class: "no-bottom-margin padding-start-1" }, this.selectedName)));
    }
    /**
     * Create a list of layers from the map
     * Used for selecting a single layer.
     *
     * @param id the id for the select component used to support the tooltip
     *
     * @returns Calcite Select component with the ids of the layers from the map
     */
    _getSelect(id) {
        return (index.h("calcite-select", { id: id, label: "", onCalciteSelectChange: () => this._layerSelectionChange(), ref: (el) => { this._layerElement = el; }, scale: this.scale }, this._getMapLayerOptions()));
    }
    /**
     * Create a list of layer ids from the map
     * Used for selecting multiple layers
     *
     * @param id the id for the combobox component used to support the tooltip
     *
     * @returns Calcite ComboBox component with the ids of the layers from the map
     */
    _getCombobox(id) {
        return (index.h("calcite-combobox", { clearDisabled: true, id: id, label: "", onCalciteComboboxChange: () => this._layerSelectionChange(), "placeholder-icon": this.placeholderIcon, ref: (el) => { this._layerElement = el; }, scale: this.scale, "selection-mode": "single" }, this._getMapLayerOptions()));
    }
    /**
     * Hydrate a dropdown component with items to display the layer names
     *
     * @param id the id for the dropdown component used to support the tooltip
     *
     * @returns Array of Dropdown items with layer names
     */
    _getDropdown(id) {
        return (index.h("calcite-dropdown", { class: "layer-picker-dropdown", onCalciteDropdownBeforeClose: () => this._isDropdownOpen = false, onCalciteDropdownBeforeOpen: () => this._isDropdownOpen = true }, this.isMobile ? this._getDropdownButton() : this._getActionDropdownButton(id), index.h("calcite-dropdown-group", { "selection-mode": "single" }, this._getMapLayerOptions())));
    }
    /**
     * Get the button that will open the dropdown list wrapped in an action
     *
     * @returns the node for the action and button
     */
    _getActionDropdownButton(id) {
        return (index.h("calcite-action", { id: id, slot: "trigger", text: "" }, this._getDropdownButton()));
    }
    /**
     * Get the button that will open the dropdown list
     *
     * @returns the node for the button
     */
    _getDropdownButton() {
        const buttonClass = this.isMobile ? "" : "max-width-350";
        const buttonSlot = this.isMobile ? "trigger" : "";
        const buttonIcon = this._isDropdownOpen ? "chevron-up" : "chevron-down";
        return (index.h("calcite-button", { alignment: "icon-end-space-between", appearance: this.appearance, class: buttonClass, iconEnd: buttonIcon, iconStart: "layers", kind: "neutral", slot: buttonSlot, width: "full" }, index.h("div", null, this.selectedName)));
    }
    /**
     * Get the appropriate type of dom nodes for each valid layer or table
     *
     * @returns Array of dom nodes with the names of the layers and optionally of the tables
     */
    _getMapLayerOptions() {
        return this.ids.reduce((prev, cur) => {
            if (this._validLayer(cur)) {
                prev.push(this._getItem(cur, "layer"));
            }
            else if (this._validTable(cur)) {
                prev.push(this._getItem(cur, "table"));
            }
            return prev;
        }, []);
    }
    /**
     * Get the appropriate type of dom node for the current layer or table id
     *
     * @returns A dom node with the name of the layer or table
     */
    _getItem(id, itemType) {
        const item = itemType === "layer" ? this._layerNameHash[id] : this._tableNameHash[id];
        const disabled = this.onlyShowUpdatableLayers ? !item.supportsUpdate : false;
        const name = item.name;
        const selected = this.selectedIds.indexOf(id) > -1;
        return this.type === "combobox" ? (index.h("calcite-combobox-item", { disabled: disabled, selected: selected, textLabel: name, value: id })) :
            this.type === "select" ? (index.h("calcite-option", { disabled: disabled, label: name, selected: selected, value: id })) : (index.h("calcite-dropdown-group", { class: disabled ? "disabled" : "", selectionMode: disabled ? "none" : "single" }, index.h("calcite-dropdown-item", { onClick: disabled ? undefined : () => void this._setSelectedLayer(id), selected: selected }, name)));
    }
    /**
     * Store the layer name based on the user selection
     */
    _setSelectedLayer(id) {
        let item;
        const hasDefaultLayer = this.defaultLayerId && !this.defaultLayerHonored;
        if (hasDefaultLayer) {
            item = this._getLayerFromHash(this.defaultLayerId);
            this.defaultLayerHonored = item !== undefined;
            id = this.defaultLayerHonored ? this.defaultLayerId : id;
        }
        item = item ? item : this._getLayerFromHash(id);
        this.selectedName = item === null || item === void 0 ? void 0 : item.name;
        this.selectedIds = [id];
        this.layerSelectionChange.emit(this.selectedIds);
    }
    /**
     * Fetch layer hash info for the given id
     *
     * @returns ILayerHashInfo for the id
     */
    _getLayerFromHash(id) {
        return Object.keys(this._layerNameHash).indexOf(id) > -1 ?
            this._layerNameHash[id] : Object.keys(this._tableNameHash).indexOf(id) > -1 ?
            this._tableNameHash[id] : undefined;
    }
    /**
     * Fetch the ids of the layers from the map
     *
     * @returns Promise when the operation has completed
     */
    async _setLayers() {
        if (this.mapView) {
            await this._initLayerTableHash();
            const layerIds = this.onlyShowUpdatableLayers ?
                this._getEditableIds(this._layerNameHash) : Object.keys(this._layerNameHash);
            const tableIds = this.showTables ? this.onlyShowUpdatableLayers ?
                this._getEditableIds(this._tableNameHash) : Object.keys(this._tableNameHash) : [];
            this.ids = [
                ...layerIds.reverse().filter(n => { var _a; return ((_a = this.enabledLayerIds) === null || _a === void 0 ? void 0 : _a.length) > 0 ? this.enabledLayerIds.reverse().indexOf(n) > -1 : true; }),
                ...tableIds.reverse().filter(n => { var _a; return ((_a = this.enabledTableIds) === null || _a === void 0 ? void 0 : _a.length) > 0 ? this.enabledTableIds.reverse().indexOf(n) > -1 : true; }),
            ];
            this.idsFound.emit({
                layerIds,
                tableIds
            });
        }
    }
    /**
     * Fetch the ids of all layers that support edits with the update capability
     *
     * @returns array of layer ids
     */
    _getEditableIds(hash) {
        return Object.keys(hash).reduce((prev, cur) => {
            if (hash[cur].supportsUpdate) {
                prev.push(cur);
            }
            return prev;
        }, []);
    }
    /**
     * Create a layer id:title hash for layer name display
     *
     * @returns Promise when the operation has completed
     */
    async _initLayerTableHash() {
        this._layerNameHash = await mapViewUtils.getMapLayerHash(this.mapView, this.onlyShowUpdatableLayers);
        this._tableNameHash = this.showTables ? await mapViewUtils.getMapTableHash(this.mapView, this.onlyShowUpdatableLayers) : {};
    }
    /**
     * Evaluate if the id exists in the current hash and verify if it should be excluded
     *
     * @returns boolean when true the layer will be used in the current layer picker type
     */
    _validLayer(id) {
        var _a;
        const name = (_a = this._layerNameHash[id]) === null || _a === void 0 ? void 0 : _a.name;
        return name && publicNotificationStore.state.managedLayers.indexOf(name) < 0 && (this.enabledLayerIds.length > 0 ?
            this.enabledLayerIds.indexOf(id) > -1 : true);
    }
    /**
     * Evaluate if the id exists in the current hash and verify if it should be excluded
     *
     * @returns boolean when true the table will be used in the current layer picker type
     */
    _validTable(id) {
        var _a;
        const name = (_a = this._tableNameHash[id]) === null || _a === void 0 ? void 0 : _a.name;
        const validName = name && this.showTables;
        return validName ? publicNotificationStore.state.managedTables.indexOf(name) < 0 &&
            (this.enabledTableIds.length > 0 ? this.enabledTableIds.indexOf(id) > -1 : true) : validName;
    }
    /**
     * Fetch the ids of the layers from the map
     *
     * @returns Promise when the operation has completed
     */
    _layerSelectionChange() {
        const ids = Array.isArray(this._layerElement.value) ? this._layerElement.value : [this._layerElement.value];
        if (JSON.stringify(ids) !== JSON.stringify([""])) {
            this.selectedIds = ids;
            this.layerSelectionChange.emit(this.selectedIds);
        }
    }
    /**
     * Fetches the component's translations
     *
     * @returns Promise when complete
     * @protected
     */
    async _getTranslations() {
        const messages = await locale$1.getLocaleComponentStrings(this.el);
        this._translations = messages[0];
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "mapView": ["mapViewWatchHandler"]
    }; }
};
MapLayerPicker.style = mapLayerPickerCss;

exports.calcite_combobox = Combobox;
exports.calcite_dropdown = Dropdown;
exports.calcite_dropdown_group = DropdownGroup;
exports.calcite_dropdown_item = DropdownItem;
exports.map_layer_picker = MapLayerPicker;
