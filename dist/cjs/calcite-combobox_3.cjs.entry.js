/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5a0af791.js');
const core = require('./core-7f0bcc12.js');
const filter = require('./filter-1f98198b.js');
const dom = require('./dom-6a9b6275.js');
const floatingUi = require('./floating-ui-b20fd1f7.js');
const form = require('./form-5229f1c8.js');
const guid = require('./guid-02e5380f.js');
const interactive = require('./interactive-89f913ba.js');
const label = require('./label-26ee0ddb.js');
const loadable = require('./loadable-2e2626dc.js');
const locale = require('./locale-42c21404.js');
const observers = require('./observers-8fed90f3.js');
const openCloseComponent = require('./openCloseComponent-14628d11.js');
const resources = require('./resources-dfe71ff2.js');
const t9n = require('./t9n-42ba6ea3.js');
const component = require('./component-a4c6a35d.js');
const Validation = require('./Validation-aa47298a.js');
const utils = require('./utils-051e0119.js');
const debounce = require('./debounce-7f1e04d6.js');
const resources$1 = require('./resources-151788f3.js');
const locale$1 = require('./locale-a09603ee.js');
const mapViewUtils = require('./mapViewUtils-8d4da732.js');
const publicNotificationStore = require('./publicNotificationStore-f229e839.js');
require('./browser-69696af0.js');
require('./key-d6da79d8.js');
require('./esri-loader-08dc41bd.js');
require('./_commonjsHelpers-baf43783.js');
require('./interfaces-09c4c40e.js');
require('./index-da709a10.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const CSS = {
    button: "x-button",
};
const XButton = ({ disabled, key, label, onClick, ref, scale, }) => (index.h("button", { "aria-label": label, class: CSS.button, disabled: disabled, key: key, onClick: onClick, ref: ref, tabIndex: -1, type: "button" }, index.h("calcite-icon", { icon: "x", scale: component.getIconScale(scale) })));

const comboboxCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;display:block}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([scale=s]) .x-button{inline-size:1rem;block-size:1rem}:host([scale=m]) .x-button{inline-size:1.5rem;block-size:1.5rem}:host([scale=l]) .x-button{inline-size:2rem;block-size:2rem}.x-button{margin:0px;display:flex;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;align-content:center;align-items:center;justify-content:center;align-self:center;border-width:2px;background-color:transparent;color:var(--calcite-color-text-3);outline-color:transparent;transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;border-radius:50%;border-color:transparent;background-color:var(--calcite-color-foreground-2)}.x-button:active,.x-button:hover{color:var(--calcite-color-text-1);background-color:var(--calcite-color-foreground-3)}.x-button:active{border-style:solid;border-color:var(--calcite-color-brand)}.x-button calcite-icon{color:inherit}:host([scale=s]){font-size:var(--calcite-font-size--2);--calcite-combobox-item-spacing-unit-l:0.5rem;--calcite-combobox-item-spacing-unit-s:0.25rem;--calcite-combobox-input-height:1rem;--calcite-internal-combobox-input-margin-block:calc(0.25rem - 1px)}:host([scale=s]) .x-button{margin-inline:0.5rem}:host([scale=m]){font-size:var(--calcite-font-size--1);--calcite-combobox-item-spacing-unit-l:0.75rem;--calcite-combobox-item-spacing-unit-s:0.5rem;--calcite-combobox-input-height:1rem;--calcite-internal-combobox-input-margin-block:calc(0.5rem - 1px)}:host([scale=m]) .x-button{margin-inline-end:0.75rem}:host([scale=l]){font-size:var(--calcite-font-size-0);--calcite-combobox-item-spacing-unit-l:1rem;--calcite-combobox-item-spacing-unit-s:0.75rem;--calcite-combobox-input-height:1.5rem;--calcite-internal-combobox-input-margin-block:calc(0.625rem - 1px)}:host([scale=l]) .x-button{margin-inline-end:1rem}.wrapper{display:flex;border-width:1px;border-style:solid;border-color:var(--calcite-color-border-input);background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-1);outline-color:transparent;padding-block:calc(var(--calcite-combobox-item-spacing-unit-s) / 4);padding-inline:var(--calcite-combobox-item-spacing-unit-l)}.wrapper:hover .icon{color:var(--calcite-color-text-1)}:host(:focus-within) .wrapper,.wrapper--active{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}:host([read-only]) .wrapper{background-color:var(--calcite-color-background)}:host([read-only]) .label{font-weight:var(--calcite-font-weight-medium)}:host([status=invalid]) .wrapper{border-color:var(--calcite-color-status-danger)}:host([status=invalid]:focus-within) .wrapper{outline:2px solid var(--calcite-color-status-danger);outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.wrapper--single{padding-block:0;padding-inline:var(--calcite-combobox-item-spacing-unit-l);cursor:pointer;flex-wrap:nowrap}.grid-input{position:relative;display:flex;flex-grow:1;flex-wrap:wrap;align-items:center;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:0px;gap:var(--calcite-combobox-item-spacing-unit-s);margin-inline-end:var(--calcite-combobox-item-spacing-unit-s)}.grid-input.selection-display-fit,.grid-input.selection-display-single{flex-wrap:nowrap;overflow:hidden}.input{flex-grow:1;-webkit-appearance:none;-moz-appearance:none;appearance:none;overflow:hidden;text-overflow:ellipsis;border-style:none;background-color:transparent;padding:0px;font-family:inherit;color:var(--calcite-color-text-1);font-size:inherit;block-size:var(--calcite-combobox-input-height);line-height:var(--calcite-combobox-input-height);inline-size:100%;margin-block-end:var(--calcite-combobox-item-spacing-unit-s);min-inline-size:4.8125rem}.input:focus{outline:2px solid transparent;outline-offset:2px}.input:-moz-placeholder-shown{text-overflow:ellipsis}.input:placeholder-shown{text-overflow:ellipsis}.input--single{padding:0px;margin-block:var(--calcite-internal-combobox-input-margin-block)}.wrapper--active .input-single{cursor:text}.input--hidden{pointer-events:none;inline-size:0px;min-inline-size:0px;opacity:0}.input--icon{padding-block:0;padding-inline:var(--calcite-combobox-item-spacing-unit-l)}.placeholder-icon{color:var(--calcite-color-text-3)}.input-wrap{display:flex;flex-grow:1;align-items:center}.input-wrap--single{flex:1 1 0%;overflow:hidden}.label{pointer-events:none;max-inline-size:100%;flex:1 1 auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:0px;font-weight:var(--calcite-font-weight-normal);block-size:var(--calcite-combobox-input-height);line-height:var(--calcite-combobox-input-height)}.label--icon{padding-inline:var(--calcite-combobox-item-spacing-unit-l)}.icon-end,.icon-start{display:flex;cursor:pointer;align-items:center}.icon-end{flex:none}.icon-end .icon{color:var(--calcite-color-text-3)}.floating-ui-container{--calcite-floating-ui-z-index:var(--calcite-z-index-dropdown);display:block;position:absolute;z-index:var(--calcite-floating-ui-z-index);visibility:hidden}.floating-ui-container .calcite-floating-ui-anim{position:relative;transition:var(--calcite-floating-ui-transition);transition-property:inset, left, opacity;opacity:0;box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);z-index:var(--calcite-z-index);border-radius:0.25rem}.floating-ui-container[data-placement^=bottom] .calcite-floating-ui-anim{inset-block-start:-5px}.floating-ui-container[data-placement^=top] .calcite-floating-ui-anim{inset-block-start:5px}.floating-ui-container[data-placement^=left] .calcite-floating-ui-anim{left:5px}.floating-ui-container[data-placement^=right] .calcite-floating-ui-anim{left:-5px}.floating-ui-container[data-placement] .calcite-floating-ui-anim--active{opacity:1;inset-block:0;left:0}.floating-ui-container--active{visibility:visible}@media (forced-colors: active){.wrapper,.floating-ui-container--active{border:1px solid canvasText}}.screen-readers-only{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0}.list-container{max-block-size:45vh;overflow-y:auto;background-color:var(--calcite-color-foreground-1);inline-size:var(--calcite-dropdown-width, 100%)}.list{margin:0px;display:block;padding:0px}.list--hide{block-size:0px;overflow:hidden}calcite-chip{--calcite-animation-timing:0}.chip{margin-block:calc(var(--calcite-combobox-item-spacing-unit-s) / 4);max-inline-size:100%}.chip--active{background-color:var(--calcite-color-foreground-3)}.chip--invisible{visibility:hidden;position:absolute}.item{display:block}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:0.5rem}:host([scale=s]) .validation-container{padding-block-start:0.25rem}::slotted(input[slot=hidden-form-input]){margin:0 !important;opacity:0 !important;outline:none !important;padding:0 !important;position:absolute !important;inset:0 !important;transform:none !important;-webkit-appearance:none !important;z-index:-1 !important}:host([hidden]){display:none}[hidden]{display:none}::slotted(calcite-combobox-item-group:not(:first-child)){padding-block-start:var(--calcite-combobox-item-spacing-unit-l)}";
const CalciteComboboxStyle0 = comboboxCss;

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
                ? floatingUi.filterValidFlipPlacements(flipPlacements, el)
                : null;
        };
        this.getValue = () => {
            const items = this.selectedItems.map((item) => item?.value?.toString());
            return items?.length ? (items.length > 1 ? items : items[0]) : "";
        };
        this.onLabelClick = () => {
            this.setFocus();
        };
        this.keyDownHandler = (event) => {
            if (this.readOnly) {
                return;
            }
            const { key } = event;
            switch (key) {
                case "Tab":
                    this.activeChipIndex = -1;
                    this.activeItemIndex = -1;
                    if (this.allowCustomValues && this.filterText) {
                        this.addCustomChip(this.filterText, true);
                        event.preventDefault();
                    }
                    else if (this.open) {
                        this.open = false;
                        event.preventDefault();
                    }
                    else if (!this.allowCustomValues && this.filterText) {
                        this.clearInputValue();
                        this.filterItems("");
                        this.updateActiveItemIndex(-1);
                    }
                    break;
                case "ArrowLeft":
                    if (this.activeChipIndex !== -1 || this.textInput.selectionStart === 0) {
                        this.previousChip();
                        event.preventDefault();
                    }
                    break;
                case "ArrowRight":
                    if (this.activeChipIndex !== -1) {
                        this.nextChip();
                        event.preventDefault();
                    }
                    break;
                case "ArrowUp":
                    if (this.filteredItems.length) {
                        event.preventDefault();
                        if (this.open) {
                            this.shiftActiveItemIndex(-1);
                        }
                        if (!this.comboboxInViewport()) {
                            this.el.scrollIntoView();
                        }
                    }
                    break;
                case "ArrowDown":
                    if (this.filteredItems.length) {
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
                    }
                    break;
                case " ":
                    if (!this.textInput.value && !event.defaultPrevented) {
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
                    if (this.open && this.activeItemIndex > -1) {
                        this.toggleSelection(this.filteredItems[this.activeItemIndex]);
                        event.preventDefault();
                    }
                    else if (this.activeChipIndex > -1) {
                        this.removeActiveChip();
                        event.preventDefault();
                    }
                    else if (this.allowCustomValues && this.filterText) {
                        this.addCustomChip(this.filterText, true);
                        event.preventDefault();
                    }
                    else if (!event.defaultPrevented) {
                        if (form.submitForm(this)) {
                            event.preventDefault();
                        }
                    }
                    break;
                case "Delete":
                case "Backspace": {
                    const notDeletable = this.selectionDisplay === "single" ||
                        (this.selectionDisplay === "fit" && this.selectedHiddenChipsCount > 0);
                    if (notDeletable) {
                        return;
                    }
                    if (this.activeChipIndex > -1) {
                        event.preventDefault();
                        this.removeActiveChip();
                    }
                    else if (!this.filterText && this.isMulti()) {
                        event.preventDefault();
                        this.removeLastChip();
                    }
                    break;
                }
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
            if (this.readOnly) {
                return;
            }
            const composedPath = event.composedPath();
            if (composedPath.some((node) => node.tagName === "CALCITE-CHIP")) {
                this.open = false;
                event.preventDefault();
                return;
            }
            if (composedPath.some((node) => node.classList?.contains(CSS.button))) {
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
            const inputWidth = (inputTextWidth || parseInt(core.calciteSize48)) + chipContainerElGap;
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
            this.filterText = value;
        };
        this.filterItems = (() => {
            const find = (item, filteredData) => item &&
                filteredData.some(({ label, value }) => isGroup(item) ? label === item.label : value === item.value && label === item.textLabel);
            return debounce.debounce((text, setOpenToEmptyState = false, emit = true) => {
                const filteredData = filter.filter(this.data, text);
                const itemsAndGroups = this.getItemsAndGroups();
                const matchAll = text === "";
                itemsAndGroups.forEach((item) => {
                    if (matchAll) {
                        item.hidden = false;
                        return;
                    }
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
                this.filterTextMatchPattern =
                    this.filterText && new RegExp(`(${filter.escapeRegExp(this.filterText)})`, "i");
                this.filteredItems = this.getFilteredItems();
                this.filteredItems.forEach((item) => {
                    item.filterTextMatchPattern = this.filterTextMatchPattern;
                });
                if (setOpenToEmptyState) {
                    this.open = this.filterText.trim().length > 0 && this.filteredItems.length > 0;
                }
                if (emit) {
                    this.calciteComboboxFilterChange.emit();
                }
            }, resources.DEBOUNCE.filter);
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
            const height = this.calculateScrollerHeight(activeItem);
            const { offsetHeight, scrollTop } = this.listContainerEl;
            if (offsetHeight + scrollTop < activeItem.offsetTop + height) {
                this.listContainerEl.scrollTop = activeItem.offsetTop - offsetHeight + height;
            }
            else if (activeItem.offsetTop < scrollTop) {
                this.listContainerEl.scrollTop = activeItem.offsetTop;
            }
        };
        this.comboboxFocusHandler = () => {
            if (this.disabled) {
                return;
            }
            this.textInput?.focus();
        };
        this.clearDisabled = false;
        this.filterText = "";
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
        this.validity = {
            valid: false,
            badInput: false,
            customError: false,
            patternMismatch: false,
            rangeOverflow: false,
            rangeUnderflow: false,
            stepMismatch: false,
            tooLong: false,
            tooShort: false,
            typeMismatch: false,
            valueMissing: false,
        };
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
        this.readOnly = false;
        this.items = [];
        this.groupItems = [];
        this.needsIcon = undefined;
        this.activeItemIndex = -1;
        this.activeChipIndex = -1;
        this.activeDescendant = "";
        this.compactSelectionDisplay = false;
        this.selectedHiddenChipsCount = 0;
        this.selectedVisibleChipsCount = 0;
        this.effectiveLocale = undefined;
        this.defaultMessages = undefined;
    }
    filterTextChange(value) {
        this.updateActiveItemIndex(-1);
        this.filterItems(value, true);
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
    async documentClickHandler(event) {
        if (this.disabled || event.composedPath().includes(this.el)) {
            return;
        }
        await component.componentOnReady(this.el);
        if (!this.allowCustomValues && this.filterText) {
            this.clearInputValue();
            this.filterItems("");
            this.updateActiveItemIndex(-1);
        }
        if (this.allowCustomValues && this.filterText.trim().length) {
            this.addCustomChip(this.filterText);
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
    calciteInternalComboboxItemChangeHandler(event) {
        event.stopPropagation();
        this.updateItems();
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
        await loadable.componentFocusable(this);
        this.textInput?.focus();
        this.activeChipIndex = -1;
        this.activeItemIndex = -1;
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
        label.connectLabel(this);
        form.connectForm(this);
        this.internalValueChangeFlag = true;
        this.value = this.getValue();
        this.internalValueChangeFlag = false;
        this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
        this.updateItems();
        this.setFilteredPlacements();
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
        this.filterItems(this.filterText, false, false);
    }
    componentDidLoad() {
        form.afterConnectDefaultValueSet(this, this.getValue());
        floatingUi.connectFloatingUI(this, this.referenceEl, this.floatingEl);
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
        this.mutationObserver?.disconnect();
        this.resizeObserver?.disconnect();
        interactive.disconnectInteractive(this);
        label.disconnectLabel(this);
        form.disconnectForm(this);
        floatingUi.disconnectFloatingUI(this, this.referenceEl, this.floatingEl);
        locale.disconnectLocalized(this);
        t9n.disconnectMessages(this);
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
        this.filterText = "";
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
                if (itemsToProcess < maxItems) {
                    const height = this.calculateScrollerHeight(item);
                    if (height > 0) {
                        maxScrollerHeight += height;
                        itemsToProcess++;
                    }
                }
            });
        }
        return maxScrollerHeight;
    }
    calculateScrollerHeight(item) {
        if (!item) {
            return;
        }
        // if item has children items, don't count their height twice
        const parentHeight = item.getBoundingClientRect().height;
        const childrenTotalHeight = Array.from(item.querySelectorAll(utils.ComboboxChildSelector)).reduce((total, child) => total + child.getBoundingClientRect().height, 0);
        return parentHeight - childrenTotalHeight;
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
                this.textInput.value = utils.getLabel(item);
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
        return this.filterText === "" ? this.items : this.items.filter((item) => !item.hidden);
    }
    getData() {
        return this.items.map((item) => ({
            description: item.description,
            filterDisabled: item.filterDisabled,
            label: item.textLabel,
            metadata: item.metadata,
            shortHeading: item.shortHeading,
            value: item.value,
        }));
    }
    getNeedsIcon() {
        return utils.isSingleLike(this.selectionMode) && this.items.some((item) => item.icon);
    }
    resetText() {
        if (this.textInput) {
            this.textInput.value = "";
        }
        this.filterText = "";
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
            this.el.prepend(item);
            this.resetText();
            if (focus) {
                this.setFocus();
            }
            this.updateItems();
            this.filterItems("");
            this.open = true;
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
        const length = this.selectedItems.length - 1;
        const active = this.activeChipIndex;
        this.activeChipIndex = active === -1 ? length : Math.max(active - 1, 0);
        this.updateActiveItemIndex(-1);
        this.focusChip();
    }
    nextChip() {
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
        const guid = this.selectedItems[this.activeChipIndex]?.guid;
        const chip = guid
            ? this.referenceEl.querySelector(`#${chipUidPrefix}${guid}`)
            : null;
        chip?.setFocus();
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
        const { activeChipIndex, readOnly, scale, selectionMode, messages } = this;
        return this.selectedItems.map((item, i) => {
            const chipClasses = {
                chip: true,
                "chip--active": activeChipIndex === i,
            };
            const ancestors = [...utils.getItemAncestors(item)].reverse();
            const itemLabel = utils.getLabel(item);
            const pathLabel = [...ancestors, item].map((el) => utils.getLabel(el));
            const label = selectionMode !== "ancestors" ? itemLabel : pathLabel.join(" / ");
            return (index.h("calcite-chip", { appearance: readOnly ? "outline" : "solid", class: chipClasses, closable: !readOnly, "data-test-id": `chip-${i}`, icon: item.icon, iconFlipRtl: item.iconFlipRtl, id: item.guid ? `${chipUidPrefix}${item.guid}` : null, key: itemLabel, messageOverrides: { dismissLabel: messages.removeTag }, onCalciteChipClose: () => this.calciteChipCloseHandler(item), onFocusin: () => (this.activeChipIndex = i), scale: scale, selected: item.selected, tabindex: activeChipIndex === i ? 0 : -1, title: label, value: item.value }, label));
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
            }, ref: setAllSelectedIndicatorChipEl, scale: scale, title: label, value: "" }, label));
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
            }, ref: setSelectedIndicatorChipEl, scale: scale, title: label, value: "" }, label));
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
    get showingInlineIcon() {
        const { placeholderIcon, selectionMode, selectedItems, open } = this;
        const selectedItem = selectedItems[0];
        const selectedIcon = selectedItem?.icon;
        const singleSelectionMode = utils.isSingleLike(selectionMode);
        return !open && selectedItem
            ? !!selectedIcon && singleSelectionMode
            : !!placeholderIcon && (!selectedItem || singleSelectionMode);
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
                "label--icon": !!selectedItem?.icon,
            }, key: "label" }, utils.getLabel(selectedItem))), index.h("input", { "aria-activedescendant": this.activeDescendant, "aria-autocomplete": "list", "aria-controls": `${listboxUidPrefix}${guid}`, "aria-errormessage": utils.IDS.validationMessage, "aria-expanded": dom.toAriaBoolean(open), "aria-haspopup": "listbox", "aria-invalid": dom.toAriaBoolean(this.status === "invalid"), "aria-label": label.getLabelText(this), "aria-owns": `${listboxUidPrefix}${guid}`, class: {
                [utils.CSS.input]: true,
                "input--single": true,
                "input--hidden": showLabel,
                "input--icon": this.showingInlineIcon && !!this.placeholderIcon,
            }, "data-test-id": "input", disabled: disabled, id: `${inputUidPrefix}${guid}`, key: "input", onFocus: this.comboboxFocusHandler, onInput: this.inputHandler, placeholder: placeholder, readOnly: this.readOnly, ref: (el) => (this.textInput = el), role: "combobox", tabindex: this.activeChipIndex === -1 ? 0 : -1, type: "text", value: this.filterText })));
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
            }, ref: setFloatingEl }, index.h("div", { class: classes, ref: setContainerEl }, index.h("ul", { class: { list: true, "list--hide": !open } }, index.h("slot", null)))));
    }
    renderSelectedOrPlaceholderIcon() {
        const { open, placeholderIcon, placeholderIconFlipRtl, selectedItems } = this;
        const selectedItem = selectedItems[0];
        const selectedIcon = selectedItem?.icon;
        const showPlaceholder = placeholderIcon && (open || !selectedItem);
        return (this.showingInlineIcon && (index.h("span", { class: "icon-start", key: "selected-placeholder-icon" }, index.h("calcite-icon", { class: {
                [utils.CSS.selectedIcon]: !showPlaceholder,
                [utils.CSS.placeholderIcon]: showPlaceholder,
            }, flipRtl: showPlaceholder ? placeholderIconFlipRtl : selectedItem.iconFlipRtl, icon: showPlaceholder ? placeholderIcon : selectedIcon, scale: component.getIconScale(this.scale) }))));
    }
    renderChevronIcon() {
        const { open } = this;
        return (index.h("span", { class: "icon-end", key: "chevron" }, index.h("calcite-icon", { class: utils.CSS.icon, icon: open ? "chevron-up" : "chevron-down", scale: component.getIconScale(this.scale) })));
    }
    render() {
        const { selectionDisplay, guid, label, open, readOnly } = this;
        const singleSelectionMode = utils.isSingleLike(this.selectionMode);
        const allSelectionDisplay = selectionDisplay === "all";
        const singleSelectionDisplay = selectionDisplay === "single";
        const fitSelectionDisplay = !singleSelectionMode && selectionDisplay === "fit";
        const isClearable = !this.clearDisabled && this.value?.length > 0;
        return (index.h(index.Host, { key: '24749edfdb12a51e6e34c78d3428f83de7ac0457', onClick: this.comboboxFocusHandler }, index.h(interactive.InteractiveContainer, { key: '7300de366d86bcad91501f1124aed5f311820c37', disabled: this.disabled }, index.h("div", { key: 'fc8981935ffdd46fc5386517fce51170d41179a5', "aria-live": "polite", class: {
                wrapper: true,
                "wrapper--single": singleSelectionMode || !this.selectedItems.length,
                "wrapper--active": open,
            }, onClick: this.clickHandler, onKeyDown: this.keyDownHandler, ref: this.setReferenceEl }, this.renderSelectedOrPlaceholderIcon(), index.h("div", { class: {
                "grid-input": true,
                [utils.CSS.selectionDisplayFit]: fitSelectionDisplay,
                [utils.CSS.selectionDisplaySingle]: singleSelectionDisplay,
            }, key: "grid", ref: this.setChipContainerEl }, !singleSelectionMode && !singleSelectionDisplay && this.renderChips(), !singleSelectionMode &&
            !allSelectionDisplay && [
            this.renderSelectedIndicatorChip(),
            this.renderSelectedIndicatorChipCompact(),
            this.renderAllSelectedIndicatorChip(),
            this.renderAllSelectedIndicatorChipCompact(),
        ], index.h("label", { key: '60ca38b6b84d8ccd3e11419ca494c8a3b310e631', class: "screen-readers-only", htmlFor: `${inputUidPrefix}${guid}`, id: `${labelUidPrefix}${guid}` }, label), this.renderInput()), !readOnly && isClearable ? (index.h(XButton, { disabled: this.disabled, key: "close-button", label: this.messages.clear, scale: this.scale })) : null, !readOnly && this.renderChevronIcon()), index.h("ul", { key: 'bb750b55b33af3a317ac7883d4f8ef88a23bf1c6', "aria-labelledby": `${labelUidPrefix}${guid}`, "aria-multiselectable": "true", class: "screen-readers-only", id: `${listboxUidPrefix}${guid}`, role: "listbox", tabIndex: -1 }, this.renderListBoxOptions()), this.renderFloatingUIContainer(), index.h(form.HiddenFormInputSlot, { key: 'bf9a9f0dc62822568377ee1e602e24ca14b9c895', component: this }), this.validationMessage && this.status === "invalid" ? (index.h(Validation.Validation, { icon: this.validationIcon, id: utils.IDS.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status })) : null)));
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "filterText": ["filterTextChange"],
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
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
};
Combobox.style = CalciteComboboxStyle0;

const dropdownGroupCss = ":host{position:relative;display:block}.container{text-align:start}.dropdown-title{margin-block-end:-1px;display:block;cursor:default;overflow-wrap:break-word;border-width:0px;border-block-end-width:1px;border-style:solid;border-color:var(--calcite-color-border-3);font-weight:var(--calcite-font-weight-bold);color:var(--calcite-color-text-2)}.dropdown-separator{display:block;block-size:1px;background-color:var(--calcite-color-border-3)}:host([scale=s]){font-size:var(--calcite-font-size--2);line-height:1rem}:host([scale=s]) .dropdown-title{padding:0.5rem}:host([scale=m]){font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=m]) .dropdown-title{padding:0.75rem}:host([scale=l]){font-size:var(--calcite-font-size-0);line-height:1.25rem}:host([scale=l]) .dropdown-title{padding:1rem}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteDropdownGroupStyle0 = dropdownGroupCss;

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
        this.updateItems();
        this.mutationObserver?.observe(this.el, { childList: true });
    }
    componentWillLoad() {
        this.groupPosition = this.getGroupPosition();
    }
    disconnectedCallback() {
        this.mutationObserver?.disconnect();
    }
    render() {
        const groupTitle = this.groupTitle ? (index.h("span", { "aria-hidden": "true", class: "dropdown-title" }, this.groupTitle)) : null;
        const dropdownSeparator = this.groupPosition > 0 ? index.h("div", { class: "dropdown-separator", role: "separator" }) : null;
        return (index.h(index.Host, { key: '5e46ca1eb8f37e5af6f9ff4f417a9290c84f2f69', "aria-label": this.groupTitle, role: "group" }, index.h("div", { key: 'af52f0ab422c21b0c10620b61fc7b6445d277878', class: {
                [resources$1.CSS.container]: true,
            } }, dropdownSeparator, groupTitle, index.h("slot", { key: 'e320a38a327d6ca9802c9664c93907df2705fbf3' }))));
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
DropdownGroup.style = CalciteDropdownGroupStyle0;

const mapLayerPickerCss = ":host{display:block}.map-layer-picker-container{width:100%;align-items:center}.map-layer-picker{position:relative;width:100%;display:inline-block}.padding-bottom-1{padding-bottom:1rem}.layer-picker-dropdown{height:100%;width:100%}.max-width-350{max-width:350px}.height-100{height:100%}.disabled{cursor:default !important;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled);pointer-events:none}.no-bottom-margin{--calcite-label-margin-bottom:0px}.layer-picker-label-container{align-items:center;display:inline-flex;height:100%;padding-inline-start:1rem;padding-inline-end:1rem}.padding-start-1{padding-inline-start:1rem}.cursor-default{cursor:default}";
const MapLayerPickerStyle0 = mapLayerPickerCss;

const MapLayerPicker = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.idsFound = index.createEvent(this, "idsFound", 7);
        this.noLayersFound = index.createEvent(this, "noLayersFound", 7);
        this.layerSelectionChange = index.createEvent(this, "layerSelectionChange", 7);
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
    get el() { return index.getElement(this); }
    //--------------------------------------------------------------------------
    //
    //  Properties (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * boolean: When true the default layer has been loaded once and should no longer be used
     */
    defaultLayerHonored = false;
    /**
     * HTMLCalciteSelectElement: The html element for selecting layers
     */
    _layerElement;
    /**
     * IMapItemHash: id/name lookup
     */
    _layerNameHash;
    /**
     * IMapItemHash: id/name lookup
     */
    _tableNameHash;
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
    //  Methods (public)
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Events (public)
    //
    //--------------------------------------------------------------------------
    /**
     * Emitted on demand when no valid layers are found
     *
     */
    idsFound;
    /**
     * Emitted on demand when no valid layers are found
     *
     */
    noLayersFound;
    /**
     * Emitted on demand when a layer is selected
     *
     */
    layerSelectionChange;
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
    }
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     */
    async componentWillRender() {
        if (this.ids.length > 0 || this.selectedIds.length === 1) {
            const id = this.selectedIds.length === 1 ? this.selectedIds[0] : this.ids[0];
            if (id !== this.selectedIds[0]) {
                this._setSelectedLayer(id);
            }
        }
    }
    /**
     * Renders the component.
     */
    render() {
        const id = "map-layer-picker";
        let style = this.height > 0 ? { "height": `${this.height.toString()}px` } : {};
        style = { ...style, "display": this.display };
        return (index.h(index.Host, { key: 'd575e7f5ef535d37466d8dc7b0c3d3de35e9b3fd' }, index.h("div", { key: '18010837a120b62adce243097d428ca424180c2c', class: "map-layer-picker-container", style: style }, index.h("div", { key: 'e9b625ab31cd069c2442f24ad81d747902a72ded', class: "map-layer-picker", style: style }, !this._hasValidLayers ? this._getInvalidPlaceholder() :
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
        this.selectedName = item?.name;
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
                ...layerIds.reverse().filter(n => this.enabledLayerIds?.length > 0 ? this.enabledLayerIds.reverse().indexOf(n) > -1 : true),
                ...tableIds.reverse().filter(n => this.enabledTableIds?.length > 0 ? this.enabledTableIds.reverse().indexOf(n) > -1 : true),
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
        const name = this._layerNameHash[id]?.name;
        return name && Object.keys(publicNotificationStore.state.managedLayers).indexOf(name) < 0 && (this.enabledLayerIds.length > 0 ?
            this.enabledLayerIds.indexOf(id) > -1 : true);
    }
    /**
     * Evaluate if the id exists in the current hash and verify if it should be excluded
     *
     * @returns boolean when true the table will be used in the current layer picker type
     */
    _validTable(id) {
        const name = this._tableNameHash[id]?.name;
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
    static get watchers() { return {
        "mapView": ["mapViewWatchHandler"]
    }; }
};
MapLayerPicker.style = MapLayerPickerStyle0;

exports.calcite_combobox = Combobox;
exports.calcite_dropdown_group = DropdownGroup;
exports.map_layer_picker = MapLayerPicker;
