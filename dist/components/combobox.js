/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { h, proxyCustomElement, HTMLElement, createEvent, Host } from '@stencil/core/internal/client';
import { d as calciteSize48 } from './core.js';
import { f as filter, e as escapeRegExp } from './filter.js';
import { D as getElementWidth, E as getTextWidth, t as toAriaBoolean } from './dom.js';
import { e as defaultMenuPlacement, f as filterValidFlipPlacements, c as connectFloatingUI, r as reposition, a as disconnectFloatingUI, F as FloatingCSS } from './floating-ui.js';
import { s as submitForm, c as connectForm, a as afterConnectDefaultValueSet, d as disconnectForm, H as HiddenFormInputSlot } from './form.js';
import { g as guid } from './guid.js';
import { u as updateHostInteraction, I as InteractiveContainer } from './interactive.js';
import { c as connectLabel, d as disconnectLabel, g as getLabelText } from './label.js';
import { b as componentLoaded, c as componentFocusable, s as setUpLoadableComponent, a as setComponentLoaded } from './loadable.js';
import { c as connectLocalized, d as disconnectLocalized } from './locale2.js';
import { c as createObserver } from './observers.js';
import { o as onToggleOpenCloseComponent } from './openCloseComponent.js';
import { D as DEBOUNCE } from './resources.js';
import { c as connectMessages, s as setUpMessages, d as disconnectMessages, u as updateMessages } from './t9n.js';
import { g as getIconScale, c as componentOnReady } from './component.js';
import { V as Validation } from './Validation.js';
import { i as isSingleLike, h as hasActiveChildren, C as CSS$1, a as ComboboxChildSelector, g as getLabel, b as getItemAncestors, c as getItemChildren, d as ComboboxItem, e as ComboboxItemGroup, I as IDS } from './utils2.js';
import { d as defineCustomElement$3 } from './chip.js';
import { d as defineCustomElement$2 } from './combobox-item.js';
import { d as defineCustomElement$1 } from './icon.js';
import { d as debounce } from './debounce.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const CSS = {
    button: "x-button",
};
const XButton = ({ disabled, key, label, scale, }) => (h("button", { "aria-label": label, class: CSS.button, disabled: disabled, key: key, tabIndex: -1, type: "button" }, h("calcite-icon", { icon: "x", scale: getIconScale(scale) })));

const comboboxCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;display:block}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([scale=s]) .x-button{inline-size:1rem;block-size:1rem}:host([scale=m]) .x-button{inline-size:1.5rem;block-size:1.5rem}:host([scale=l]) .x-button{inline-size:2rem;block-size:2rem}.x-button{margin:0px;display:flex;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;align-content:center;align-items:center;justify-content:center;align-self:center;border-width:2px;background-color:transparent;color:var(--calcite-color-text-3);outline-color:transparent;transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;border-radius:50%;border-color:transparent;background-color:var(--calcite-color-foreground-2)}.x-button:active,.x-button:hover{color:var(--calcite-color-text-1);background-color:var(--calcite-color-foreground-3)}.x-button:active{border-style:solid;border-color:var(--calcite-color-brand)}.x-button calcite-icon{color:inherit}:host([scale=s]){font-size:var(--calcite-font-size--2);--calcite-combobox-item-spacing-unit-l:0.5rem;--calcite-combobox-item-spacing-unit-s:0.25rem;--calcite-combobox-input-height:1rem;--calcite-internal-combobox-input-margin-block:calc(0.25rem - 1px)}:host([scale=s]) .x-button{margin-inline:0.5rem}:host([scale=m]){font-size:var(--calcite-font-size--1);--calcite-combobox-item-spacing-unit-l:0.75rem;--calcite-combobox-item-spacing-unit-s:0.5rem;--calcite-combobox-input-height:1rem;--calcite-internal-combobox-input-margin-block:calc(0.5rem - 1px)}:host([scale=m]) .x-button{margin-inline-end:0.75rem}:host([scale=l]){font-size:var(--calcite-font-size-0);--calcite-combobox-item-spacing-unit-l:1rem;--calcite-combobox-item-spacing-unit-s:0.75rem;--calcite-combobox-input-height:1.5rem;--calcite-internal-combobox-input-margin-block:calc(0.625rem - 1px)}:host([scale=l]) .x-button{margin-inline-end:1rem}.wrapper{display:flex;border-width:1px;border-style:solid;border-color:var(--calcite-color-border-input);background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-1);outline-color:transparent;padding-block:calc(var(--calcite-combobox-item-spacing-unit-s) / 4);padding-inline:var(--calcite-combobox-item-spacing-unit-l)}.wrapper:hover .icon{color:var(--calcite-color-text-1)}:host(:focus-within) .wrapper,.wrapper--active{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}:host([read-only]) .wrapper{background-color:var(--calcite-color-background)}:host([read-only]) .label{font-weight:var(--calcite-font-weight-medium)}:host([status=invalid]) .wrapper{border-color:var(--calcite-color-status-danger)}:host([status=invalid]:focus-within) .wrapper{outline:2px solid var(--calcite-color-status-danger);outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.wrapper--single{padding-block:0;padding-inline:var(--calcite-combobox-item-spacing-unit-l);cursor:pointer;flex-wrap:nowrap}.grid-input{position:relative;display:flex;flex-grow:1;flex-wrap:wrap;align-items:center;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:0px;gap:var(--calcite-combobox-item-spacing-unit-s);margin-inline-end:var(--calcite-combobox-item-spacing-unit-s)}.grid-input.selection-display-fit,.grid-input.selection-display-single{flex-wrap:nowrap;overflow:hidden}.input{flex-grow:1;-webkit-appearance:none;-moz-appearance:none;appearance:none;overflow:hidden;text-overflow:ellipsis;border-style:none;background-color:transparent;padding:0px;font-family:inherit;color:var(--calcite-color-text-1);font-size:inherit;block-size:var(--calcite-combobox-input-height);line-height:var(--calcite-combobox-input-height);inline-size:100%;margin-block-end:var(--calcite-combobox-item-spacing-unit-s);min-inline-size:4.8125rem}.input:focus{outline:2px solid transparent;outline-offset:2px}.input:-moz-placeholder-shown{text-overflow:ellipsis}.input:placeholder-shown{text-overflow:ellipsis}.input--single{padding:0px;margin-block:var(--calcite-internal-combobox-input-margin-block)}.wrapper--active .input-single{cursor:text}.input--hidden{pointer-events:none;inline-size:0px;min-inline-size:0px;opacity:0}.input--icon{padding-block:0;padding-inline:var(--calcite-combobox-item-spacing-unit-l)}.placeholder-icon{color:var(--calcite-color-text-3)}.input-wrap{display:flex;flex-grow:1;align-items:center}.input-wrap--single{flex:1 1 0%;overflow:hidden}.label{pointer-events:none;max-inline-size:100%;flex:1 1 auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:0px;font-weight:var(--calcite-font-weight-normal);block-size:var(--calcite-combobox-input-height);line-height:var(--calcite-combobox-input-height)}.label--icon{padding-inline:var(--calcite-combobox-item-spacing-unit-l)}.icon-end,.icon-start{display:flex;cursor:pointer;align-items:center}.icon-end{flex:none}.icon-end .icon{color:var(--calcite-color-text-3)}.floating-ui-container{--calcite-floating-ui-z-index:var(--calcite-z-index-dropdown);display:block;position:absolute;z-index:var(--calcite-floating-ui-z-index);visibility:hidden}.floating-ui-container .calcite-floating-ui-anim{position:relative;transition:var(--calcite-floating-ui-transition);transition-property:inset, left, opacity;opacity:0;box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);z-index:var(--calcite-z-index);border-radius:0.25rem}.floating-ui-container[data-placement^=bottom] .calcite-floating-ui-anim{inset-block-start:-5px}.floating-ui-container[data-placement^=top] .calcite-floating-ui-anim{inset-block-start:5px}.floating-ui-container[data-placement^=left] .calcite-floating-ui-anim{left:5px}.floating-ui-container[data-placement^=right] .calcite-floating-ui-anim{left:-5px}.floating-ui-container[data-placement] .calcite-floating-ui-anim--active{opacity:1;inset-block:0;left:0}.floating-ui-container--active{visibility:visible}@media (forced-colors: active){.wrapper,.floating-ui-container--active{border:1px solid canvasText}}.screen-readers-only{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0}.list-container{max-block-size:45vh;overflow-y:auto;background-color:var(--calcite-color-foreground-1);inline-size:var(--calcite-dropdown-width, 100%)}.list{margin:0px;display:block;padding:0px}.list--hide{block-size:0px;overflow:hidden}calcite-chip{--calcite-animation-timing:0}.chip{margin-block:calc(var(--calcite-combobox-item-spacing-unit-s) / 4);max-inline-size:100%}.chip--active{background-color:var(--calcite-color-foreground-3)}.chip--invisible{visibility:hidden;position:absolute}.item{display:block}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:0.5rem}:host([scale=s]) .validation-container{padding-block-start:0.25rem}::slotted(input[slot=hidden-form-input]){margin:0 !important;opacity:0 !important;outline:none !important;padding:0 !important;position:absolute !important;inset:0 !important;transform:none !important;-webkit-appearance:none !important;z-index:-1 !important}:host([hidden]){display:none}[hidden]{display:none}::slotted(calcite-combobox-item-group:not(:first-child)){padding-block-start:var(--calcite-combobox-item-spacing-unit-l)}";
const CalciteComboboxStyle0 = comboboxCss;

const isGroup = (el) => el.tagName === ComboboxItemGroup;
const itemUidPrefix = "combobox-item-";
const chipUidPrefix = "combobox-chip-";
const labelUidPrefix = "combobox-label-";
const listboxUidPrefix = "combobox-listbox-";
const inputUidPrefix = "combobox-input-";
const Combobox = /*@__PURE__*/ proxyCustomElement(class Combobox extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.calciteComboboxChange = createEvent(this, "calciteComboboxChange", 6);
        this.calciteComboboxFilterChange = createEvent(this, "calciteComboboxFilterChange", 6);
        this.calciteComboboxChipClose = createEvent(this, "calciteComboboxChipClose", 6);
        this.calciteComboboxBeforeClose = createEvent(this, "calciteComboboxBeforeClose", 6);
        this.calciteComboboxClose = createEvent(this, "calciteComboboxClose", 6);
        this.calciteComboboxBeforeOpen = createEvent(this, "calciteComboboxBeforeOpen", 6);
        this.calciteComboboxOpen = createEvent(this, "calciteComboboxOpen", 6);
        this.placement = defaultMenuPlacement;
        this.internalValueChangeFlag = false;
        this.textInput = null;
        this.mutationObserver = createObserver("mutation", () => this.updateItems());
        this.resizeObserver = createObserver("resize", () => {
            this.setMaxScrollerHeight();
            this.refreshSelectionDisplay();
        });
        this.guid = guid();
        this.inputHeight = 0;
        this.ignoreSelectedEventsFlag = false;
        this.openTransitionProp = "opacity";
        this.setFilteredPlacements = () => {
            const { el, flipPlacements } = this;
            this.filteredFlipPlacements = flipPlacements
                ? filterValidFlipPlacements(flipPlacements, el)
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
                        const item = this.filteredItems[this.activeItemIndex];
                        this.toggleSelection(item, !item.selected);
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
                        if (submitForm(this)) {
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
            await componentLoaded(this);
            if (isSingleLike(this.selectionMode)) {
                return;
            }
            if (!this.textInput) {
                return;
            }
            const { allSelectedIndicatorChipEl, chipContainerEl, selectionDisplay, placeholder, selectedIndicatorChipEl, textInput, } = this;
            const chipContainerElGap = parseInt(getComputedStyle(chipContainerEl).gap.replace("px", ""));
            const chipContainerElWidth = getElementWidth(chipContainerEl);
            const { fontSize, fontFamily } = getComputedStyle(textInput);
            const inputTextWidth = getTextWidth(placeholder, `${fontSize} ${fontFamily}`);
            const inputWidth = (inputTextWidth || parseInt(calciteSize48)) + chipContainerElGap;
            const allSelectedIndicatorChipElWidth = getElementWidth(allSelectedIndicatorChipEl);
            const selectedIndicatorChipElWidth = getElementWidth(selectedIndicatorChipEl);
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
            connectFloatingUI(this, this.referenceEl, this.floatingEl);
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
            connectFloatingUI(this, this.referenceEl, this.floatingEl);
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
            return debounce((text, setOpenToEmptyState = false, emit = true) => {
                const filteredData = filter(this.data, text);
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
                    this.filterText && new RegExp(`(${escapeRegExp(this.filterText)})`, "i");
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
            }, DEBOUNCE.filter);
        })();
        this.internalComboboxChangeEvent = () => {
            this.calciteComboboxChange.emit();
        };
        this.emitComboboxChange = debounce(this.internalComboboxChangeEvent, 0);
        this.getSelectedItems = () => {
            if (!this.isMulti()) {
                const match = this.items.find(({ selected }) => selected);
                return match ? [match] : [];
            }
            return (this.items
                .filter((item) => item.selected && (this.selectionMode !== "ancestors" || !hasActiveChildren(item)))
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
        onToggleOpenCloseComponent(this);
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
        await componentOnReady(this.el);
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
        return reposition(this, {
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
        await componentFocusable(this);
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
        connectLocalized(this);
        connectMessages(this);
        connectLabel(this);
        connectForm(this);
        this.internalValueChangeFlag = true;
        this.value = this.getValue();
        this.internalValueChangeFlag = false;
        this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
        this.updateItems();
        this.setFilteredPlacements();
        if (this.open) {
            this.openHandler();
            onToggleOpenCloseComponent(this);
        }
        connectFloatingUI(this, this.referenceEl, this.floatingEl);
    }
    async componentWillLoad() {
        setUpLoadableComponent(this);
        this.updateItems();
        await setUpMessages(this);
        this.filterItems(this.filterText, false, false);
    }
    componentDidLoad() {
        afterConnectDefaultValueSet(this, this.getValue());
        connectFloatingUI(this, this.referenceEl, this.floatingEl);
        setComponentLoaded(this);
    }
    componentDidRender() {
        if (this.el.offsetHeight !== this.inputHeight) {
            this.reposition(true);
            this.inputHeight = this.el.offsetHeight;
        }
        updateHostInteraction(this);
    }
    componentDidUpdate() {
        this.refreshSelectionDisplay();
    }
    disconnectedCallback() {
        this.mutationObserver?.disconnect();
        this.resizeObserver?.disconnect();
        disconnectLabel(this);
        disconnectForm(this);
        disconnectFloatingUI(this, this.referenceEl, this.floatingEl);
        disconnectLocalized(this);
        disconnectMessages(this);
    }
    effectiveLocaleChange() {
        updateMessages(this, this.effectiveLocale);
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
        chipEl.classList.add(CSS$1.chipInvisible);
    }
    showChip(chipEl) {
        chipEl.classList.remove(CSS$1.chipInvisible);
    }
    refreshChipDisplay({ chipEls, availableHorizontalChipElSpace, chipContainerElGap, }) {
        chipEls.forEach((chipEl) => {
            if (!chipEl.selected) {
                this.hideChip(chipEl);
            }
            else {
                const chipElWidth = getElementWidth(chipEl);
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
            if (chipEl.selected && !chipEl.classList.contains(CSS$1.chipInvisible)) {
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
        const childrenTotalHeight = Array.from(item.querySelectorAll(ComboboxChildSelector)).reduce((total, child) => total + child.getBoundingClientRect().height, 0);
        return parentHeight - childrenTotalHeight;
    }
    getItemsAndGroups() {
        return [...this.groupItems, ...this.items];
    }
    toggleSelection(item, value) {
        if (!item ||
            (this.selectionMode === "single-persist" &&
                item.selected &&
                item.value === this.value &&
                !value)) {
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
                this.textInput.value = getLabel(item);
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
        const ancestors = getItemAncestors(item);
        const children = getItemChildren(item);
        if (item.selected) {
            ancestors.forEach((el) => {
                el.selected = true;
            });
        }
        else {
            children.forEach((el) => (el.selected = false));
            [...ancestors].forEach((el) => {
                if (!hasActiveChildren(el)) {
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
        return isSingleLike(this.selectionMode) && this.items.some((item) => item.icon);
    }
    resetText() {
        if (this.textInput) {
            this.textInput.value = "";
        }
        this.filterText = "";
    }
    getItems() {
        const items = Array.from(this.el.querySelectorAll(ComboboxItem));
        return items.filter((item) => !item.disabled);
    }
    getGroupItems() {
        return Array.from(this.el.querySelectorAll(ComboboxItemGroup));
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
        return !isSingleLike(this.selectionMode);
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
            const ancestors = [...getItemAncestors(item)].reverse();
            const itemLabel = getLabel(item);
            const pathLabel = [...ancestors, item].map((el) => getLabel(el));
            const label = selectionMode !== "ancestors" ? itemLabel : pathLabel.join(" / ");
            return (h("calcite-chip", { appearance: readOnly ? "outline" : "solid", class: chipClasses, closable: !readOnly, "data-test-id": `chip-${i}`, icon: item.icon, iconFlipRtl: item.iconFlipRtl, id: item.guid ? `${chipUidPrefix}${item.guid}` : null, key: itemLabel, messageOverrides: { dismissLabel: messages.removeTag }, onCalciteChipClose: () => this.calciteChipCloseHandler(item), onFocusin: () => (this.activeChipIndex = i), scale: scale, selected: item.selected, tabindex: activeChipIndex === i ? 0 : -1, title: label, value: item.value }, label));
        });
    }
    renderAllSelectedIndicatorChip() {
        const { compactSelectionDisplay, scale, selectedVisibleChipsCount, setAllSelectedIndicatorChipEl, } = this;
        const label = this.messages.allSelected;
        return (h("calcite-chip", { class: {
                chip: true,
                [CSS$1.chipInvisible]: !(this.isAllSelected() &&
                    !selectedVisibleChipsCount &&
                    !compactSelectionDisplay),
            }, ref: setAllSelectedIndicatorChipEl, scale: scale, title: label, value: "" }, label));
    }
    renderAllSelectedIndicatorChipCompact() {
        const { compactSelectionDisplay, scale, selectedVisibleChipsCount } = this;
        const label = this.messages.all || "All";
        return (h("calcite-chip", { class: {
                chip: true,
                [CSS$1.chipInvisible]: !(this.isAllSelected() &&
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
        return (h("calcite-chip", { class: {
                chip: true,
                [CSS$1.chipInvisible]: chipInvisible,
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
        return (h("calcite-chip", { class: {
                chip: true,
                [CSS$1.chipInvisible]: chipInvisible,
            }, scale: scale, title: label, value: "" }, label));
    }
    get showingInlineIcon() {
        const { placeholderIcon, selectionMode, selectedItems, open } = this;
        const selectedItem = selectedItems[0];
        const selectedIcon = selectedItem?.icon;
        const singleSelectionMode = isSingleLike(selectionMode);
        return !open && selectedItem
            ? !!selectedIcon && singleSelectionMode
            : !!placeholderIcon && (!selectedItem || singleSelectionMode);
    }
    renderInput() {
        const { guid, disabled, placeholder, selectionMode, selectedItems, open } = this;
        const single = isSingleLike(selectionMode);
        const selectedItem = selectedItems[0];
        const showLabel = !open && single && !!selectedItem;
        return (h("span", { class: {
                "input-wrap": true,
                "input-wrap--single": single,
            } }, showLabel && (h("span", { class: {
                label: true,
                "label--icon": !!selectedItem?.icon,
            }, key: "label" }, getLabel(selectedItem))), h("input", { "aria-activedescendant": this.activeDescendant, "aria-autocomplete": "list", "aria-controls": `${listboxUidPrefix}${guid}`, "aria-errormessage": IDS.validationMessage, "aria-expanded": toAriaBoolean(open), "aria-haspopup": "listbox", "aria-invalid": toAriaBoolean(this.status === "invalid"), "aria-label": getLabelText(this), "aria-owns": `${listboxUidPrefix}${guid}`, class: {
                [CSS$1.input]: true,
                "input--single": true,
                "input--hidden": showLabel,
                "input--icon": this.showingInlineIcon && !!this.placeholderIcon,
            }, "data-test-id": "input", disabled: disabled, id: `${inputUidPrefix}${guid}`, key: "input", onFocus: this.comboboxFocusHandler, onInput: this.inputHandler, placeholder: placeholder, readOnly: this.readOnly, ref: (el) => (this.textInput = el), role: "combobox", tabindex: this.activeChipIndex === -1 ? 0 : -1, type: "text", value: this.filterText })));
    }
    renderListBoxOptions() {
        return this.filteredItems.map((item) => (h("li", { "aria-selected": toAriaBoolean(item.selected), id: item.guid ? `${itemUidPrefix}${item.guid}` : null, role: "option", tabindex: "-1" }, item.textLabel)));
    }
    renderFloatingUIContainer() {
        const { setFloatingEl, setContainerEl, open } = this;
        const classes = {
            [CSS$1.listContainer]: true,
            [FloatingCSS.animation]: true,
            [FloatingCSS.animationActive]: open,
        };
        return (h("div", { "aria-hidden": "true", class: {
                "floating-ui-container": true,
                "floating-ui-container--active": open,
            }, ref: setFloatingEl }, h("div", { class: classes, ref: setContainerEl }, h("ul", { class: { list: true, "list--hide": !open } }, h("slot", null)))));
    }
    renderSelectedOrPlaceholderIcon() {
        const { open, placeholderIcon, placeholderIconFlipRtl, selectedItems } = this;
        const selectedItem = selectedItems[0];
        const selectedIcon = selectedItem?.icon;
        const showPlaceholder = placeholderIcon && (open || !selectedItem);
        return (this.showingInlineIcon && (h("span", { class: "icon-start", key: "selected-placeholder-icon" }, h("calcite-icon", { class: {
                [CSS$1.selectedIcon]: !showPlaceholder,
                [CSS$1.placeholderIcon]: showPlaceholder,
            }, flipRtl: showPlaceholder ? placeholderIconFlipRtl : selectedItem.iconFlipRtl, icon: showPlaceholder ? placeholderIcon : selectedIcon, scale: getIconScale(this.scale) }))));
    }
    renderChevronIcon() {
        const { open } = this;
        return (h("span", { class: "icon-end", key: "chevron" }, h("calcite-icon", { class: CSS$1.icon, icon: open ? "chevron-up" : "chevron-down", scale: getIconScale(this.scale) })));
    }
    render() {
        const { selectionDisplay, guid, label, open, readOnly } = this;
        const singleSelectionMode = isSingleLike(this.selectionMode);
        const allSelectionDisplay = selectionDisplay === "all";
        const singleSelectionDisplay = selectionDisplay === "single";
        const fitSelectionDisplay = !singleSelectionMode && selectionDisplay === "fit";
        const isClearable = !this.clearDisabled && this.value?.length > 0;
        return (h(Host, { key: '7ff11391145f9d35bb29b79668ba4c71383399cb', onClick: this.comboboxFocusHandler }, h(InteractiveContainer, { key: '0f933e31620dcb729c99290edfa9c0d48ed8f3d0', disabled: this.disabled }, h("div", { key: '8b50c921f9f45393064744fa38874de7de82a228', "aria-live": "polite", class: {
                wrapper: true,
                "wrapper--single": singleSelectionMode || !this.selectedItems.length,
                "wrapper--active": open,
            }, onClick: this.clickHandler, onKeyDown: this.keyDownHandler, ref: this.setReferenceEl }, this.renderSelectedOrPlaceholderIcon(), h("div", { class: {
                "grid-input": true,
                [CSS$1.selectionDisplayFit]: fitSelectionDisplay,
                [CSS$1.selectionDisplaySingle]: singleSelectionDisplay,
            }, key: "grid", ref: this.setChipContainerEl }, !singleSelectionMode && !singleSelectionDisplay && this.renderChips(), !singleSelectionMode &&
            !allSelectionDisplay && [
            this.renderSelectedIndicatorChip(),
            this.renderSelectedIndicatorChipCompact(),
            this.renderAllSelectedIndicatorChip(),
            this.renderAllSelectedIndicatorChipCompact(),
        ], h("label", { key: '07bc9e86da71217b892740f0748117f5bf1eacb3', class: "screen-readers-only", htmlFor: `${inputUidPrefix}${guid}`, id: `${labelUidPrefix}${guid}` }, label), this.renderInput()), !readOnly && isClearable ? (h(XButton, { disabled: this.disabled, key: "close-button", label: this.messages.clear, scale: this.scale })) : null, !readOnly && this.renderChevronIcon()), h("ul", { key: '5f367649d90d63c5cf88d097786c849430dc1e49', "aria-labelledby": `${labelUidPrefix}${guid}`, "aria-multiselectable": "true", class: "screen-readers-only", id: `${listboxUidPrefix}${guid}`, role: "listbox", tabIndex: -1 }, this.renderListBoxOptions()), this.renderFloatingUIContainer(), h(HiddenFormInputSlot, { key: '97f799527df82ab6def23e012663050e0156626a', component: this }), this.validationMessage && this.status === "invalid" ? (h(Validation, { icon: this.validationIcon, id: IDS.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status })) : null)));
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return this; }
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
    static get style() { return CalciteComboboxStyle0; }
}, [1, "calcite-combobox", {
        "clearDisabled": [516, "clear-disabled"],
        "filterText": [1537, "filter-text"],
        "selectionDisplay": [513, "selection-display"],
        "open": [1540],
        "disabled": [516],
        "form": [513],
        "label": [1],
        "placeholder": [1],
        "placeholderIcon": [513, "placeholder-icon"],
        "placeholderIconFlipRtl": [516, "placeholder-icon-flip-rtl"],
        "maxItems": [514, "max-items"],
        "validationMessage": [1, "validation-message"],
        "validationIcon": [520, "validation-icon"],
        "validity": [1040],
        "name": [513],
        "allowCustomValues": [516, "allow-custom-values"],
        "overlayPositioning": [513, "overlay-positioning"],
        "required": [516],
        "selectionMode": [513, "selection-mode"],
        "scale": [513],
        "status": [513],
        "value": [1025],
        "flipPlacements": [16],
        "messages": [1040],
        "messageOverrides": [1040],
        "selectedItems": [1040],
        "filteredItems": [1040],
        "readOnly": [516, "read-only"],
        "items": [32],
        "groupItems": [32],
        "needsIcon": [32],
        "activeItemIndex": [32],
        "activeChipIndex": [32],
        "activeDescendant": [32],
        "compactSelectionDisplay": [32],
        "selectedHiddenChipsCount": [32],
        "selectedVisibleChipsCount": [32],
        "effectiveLocale": [32],
        "defaultMessages": [32],
        "reposition": [64],
        "setFocus": [64]
    }, [[4, "click", "documentClickHandler"], [0, "calciteComboboxItemChange", "calciteComboboxItemChangeHandler"], [0, "calciteInternalComboboxItemChange", "calciteInternalComboboxItemChangeHandler"]], {
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
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-combobox", "calcite-chip", "calcite-combobox-item", "calcite-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-combobox":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, Combobox);
            }
            break;
        case "calcite-chip":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "calcite-combobox-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { Combobox as C, defineCustomElement as d };
