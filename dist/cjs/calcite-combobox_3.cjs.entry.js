/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-6654298b.js');
const filter = require('./filter-203a4cdc.js');
const dom = require('./dom-24094fab.js');
const floatingUi = require('./floating-ui-c1943df4.js');
const form = require('./form-102203a5.js');
const guid = require('./guid-c58d5ead.js');
const interactive = require('./interactive-772d59fe.js');
const label = require('./label-5bd96bc0.js');
const loadable = require('./loadable-c64a459b.js');
const locale = require('./locale-e2cae6e8.js');
const observers = require('./observers-b0934d2a.js');
const openCloseComponent = require('./openCloseComponent-434d14e6.js');
const t9n = require('./t9n-4664a8db.js');
const utils = require('./utils-de3b4f0c.js');
const debounce = require('./debounce-69c3bada.js');
const conditionalSlot = require('./conditionalSlot-892b4bc1.js');
const mapViewUtils = require('./mapViewUtils-7e04e61c.js');
const publicNotificationStore = require('./publicNotificationStore-cd1a32c3.js');
require('./resources-1f836572.js');
require('./key-d55baa11.js');
require('./index-e1b1954f.js');

const comboboxCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing);--calcite-floating-ui-z-index:600}:host([hidden]){display:none}:host([disabled]){pointer-events:none;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}:host{position:relative;display:block}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}:host([scale=s]){font-size:var(--calcite-font-size--2);--calcite-combobox-item-spacing-unit-l:0.5rem;--calcite-combobox-item-spacing-unit-s:0.25rem;--calcite-combobox-input-height:1.5rem}:host([scale=m]){font-size:var(--calcite-font-size--1);--calcite-combobox-item-spacing-unit-l:0.75rem;--calcite-combobox-item-spacing-unit-s:0.5rem;--calcite-combobox-input-height:2rem}:host([scale=l]){font-size:var(--calcite-font-size-0);--calcite-combobox-item-spacing-unit-l:1rem;--calcite-combobox-item-spacing-unit-s:0.75rem;--calcite-combobox-input-height:2.75rem}.wrapper{display:flex;border-width:1px;border-style:solid;border-color:var(--calcite-ui-border-input);background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-1);outline-color:transparent;padding-block:calc(var(--calcite-combobox-item-spacing-unit-s) / 4);padding-inline:var(--calcite-combobox-item-spacing-unit-l)}:host(:focus-within) .wrapper,.wrapper--active{outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}.wrapper--single{padding-block:0;padding-inline:var(--calcite-combobox-item-spacing-unit-l);cursor:pointer;flex-wrap:nowrap}.grid-input{display:flex;flex-grow:1;flex-wrap:wrap;align-items:center;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:0px}.input{flex-grow:1;-webkit-appearance:none;-moz-appearance:none;appearance:none;border-style:none;background-color:transparent;padding:0px;font-family:inherit;color:var(--calcite-ui-text-1);font-size:inherit;block-size:var(--calcite-combobox-input-height);line-height:var(--calcite-combobox-input-height);min-inline-size:120px;-webkit-margin-after:var(--calcite-combobox-item-spacing-unit-s);margin-block-end:var(--calcite-combobox-item-spacing-unit-s)}.input:focus{outline:2px solid transparent;outline-offset:2px}.input--transparent{opacity:0}.input--single{margin-block:0px;padding:0px}.wrapper--active .input-single{cursor:text}.input--hidden{pointer-events:none;inline-size:0px;min-inline-size:0px;opacity:0}.input--icon{padding-block:0;padding-inline:var(--calcite-combobox-item-spacing-unit-l)}.input-wrap{display:flex;flex-grow:1}.input-wrap--single{flex:1 1 0%;overflow:hidden}.label{pointer-events:none;display:flex;max-inline-size:100%;flex:1 1 auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:0px;font-weight:var(--calcite-font-weight-normal);block-size:var(--calcite-combobox-input-height);line-height:var(--calcite-combobox-input-height)}.label--icon{padding-inline:var(--calcite-combobox-item-spacing-unit-l)}.icon-end,.icon-start{display:flex;inline-size:1rem;cursor:pointer;align-items:center}.icon-end{flex:none}.floating-ui-container{--calcite-floating-ui-z-index:600;display:block;position:absolute;z-index:var(--calcite-floating-ui-z-index);visibility:hidden}.floating-ui-container .calcite-floating-ui-anim{position:relative;transition:var(--calcite-floating-ui-transition);transition-property:transform, visibility, opacity;opacity:0;box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);z-index:1;border-radius:0.25rem}.floating-ui-container[data-placement^=bottom] .calcite-floating-ui-anim{transform:translateY(-5px)}.floating-ui-container[data-placement^=top] .calcite-floating-ui-anim{transform:translateY(5px)}.floating-ui-container[data-placement^=left] .calcite-floating-ui-anim{transform:translateX(5px)}.floating-ui-container[data-placement^=right] .calcite-floating-ui-anim{transform:translateX(-5px)}.floating-ui-container[data-placement] .calcite-floating-ui-anim--active{opacity:1;transform:translate(0)}.floating-ui-container--active{visibility:visible}@media (forced-colors: active){.wrapper,.floating-ui-container--active{border:1px solid canvasText}}.screen-readers-only{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0}.list-container{max-block-size:45vh;overflow-y:auto;background-color:var(--calcite-ui-foreground-1);inline-size:var(--calcite-dropdown-width)}.list{margin:0px;display:block;padding:0px}.list--hide{block-size:0px;overflow:hidden}.chip{margin-block:calc(var(--calcite-combobox-item-spacing-unit-s) / 4);margin-inline:0 var(--calcite-combobox-item-spacing-unit-s);max-inline-size:100%}.chip--active{background-color:var(--calcite-ui-foreground-3)}.item{display:block}::slotted(input[slot=hidden-form-input]){margin:0 !important;opacity:0 !important;outline:none !important;padding:0 !important;position:absolute !important;inset:0 !important;transform:none !important;-webkit-appearance:none !important;z-index:-1 !important}";

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
    //--------------------------------------------------------------------------
    //
    //  Private State/Props
    //
    //--------------------------------------------------------------------------
    this.placement = floatingUi.defaultMenuPlacement;
    this.internalValueChangeFlag = false;
    this.textInput = null;
    this.mutationObserver = observers.createObserver("mutation", () => this.updateItems());
    this.resizeObserver = observers.createObserver("resize", () => this.setMaxScrollerHeight());
    this.guid = guid.guid();
    this.inputHeight = 0;
    this.ignoreSelectedEventsFlag = false;
    this.openTransitionProp = "opacity";
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
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
    this.keydownHandler = (event) => {
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
          this.shiftActiveItemIndex(-1);
          if (!this.comboboxInViewport()) {
            this.el.scrollIntoView();
          }
          break;
        case "ArrowDown":
          event.preventDefault();
          if (!this.open) {
            this.open = true;
          }
          this.shiftActiveItemIndex(1);
          if (!this.comboboxInViewport()) {
            this.el.scrollIntoView();
          }
          break;
        case " ":
          if (!this.textInput.value) {
            event.preventDefault();
            this.open = true;
            this.shiftActiveItemIndex(1);
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
      if (event.composedPath().some((node) => node.tagName === "CALCITE-CHIP")) {
        return;
      }
      this.open = !this.open;
      this.updateActiveItemIndex(0);
      this.setFocus();
    };
    this.setInactiveIfNotContained = (event) => {
      const composedPath = event.composedPath();
      if (!this.open || composedPath.includes(this.el) || composedPath.includes(this.referenceEl)) {
        return;
      }
      if (this.allowCustomValues && this.text.trim().length) {
        this.addCustomChip(this.text);
      }
      if (this.selectionMode === "single") {
        if (this.textInput) {
          this.textInput.value = "";
        }
        this.text = "";
        this.filterItems("");
        this.updateActiveItemIndex(-1);
      }
      this.open = false;
    };
    this.setFloatingEl = (el) => {
      this.floatingEl = el;
      floatingUi.connectFloatingUI(this, this.referenceEl, this.floatingEl);
    };
    this.setContainerEl = (el) => {
      this.resizeObserver.observe(el);
      this.listContainerEl = el;
      this.transitionEl = el;
      openCloseComponent.connectOpenCloseComponent(this);
    };
    this.setReferenceEl = (el) => {
      this.referenceEl = el;
      floatingUi.connectFloatingUI(this, this.referenceEl, this.floatingEl);
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
        filteredData.some(({ label, value }) => {
          if (isGroup(item)) {
            return value === item.label;
          }
          return (value === item.textLabel ||
            value === item.value ||
            label === item.textLabel ||
            label === item.value);
        });
      return debounce.debounce((text) => {
        const filteredData = filter.filter(this.data, text);
        const items = this.getCombinedItems();
        items.forEach((item) => {
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
        this.filteredItems = this.getfilteredItems();
        this.calciteComboboxFilterChange.emit();
      }, 100);
    })();
    this.internalComboboxChangeEvent = () => {
      this.calciteComboboxChange.emit();
    };
    this.emitComboboxChange = debounce.debounce(this.internalComboboxChangeEvent, 0);
    this.updateItems = () => {
      this.items = this.getItems();
      this.groupItems = this.getGroupItems();
      this.data = this.getData();
      this.selectedItems = this.getSelectedItems();
      this.filteredItems = this.getfilteredItems();
      this.needsIcon = this.getNeedsIcon();
      if (!this.allowCustomValues) {
        this.setMaxScrollerHeight();
      }
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
      (_a = this.textInput) === null || _a === void 0 ? void 0 : _a.focus();
    };
    this.comboboxBlurHandler = (event) => {
      this.setInactiveIfNotContained(event);
    };
    this.open = false;
    this.disabled = false;
    this.form = undefined;
    this.label = undefined;
    this.placeholder = undefined;
    this.placeholderIcon = undefined;
    this.placeholderIconFlipRtl = false;
    this.maxItems = 0;
    this.name = undefined;
    this.allowCustomValues = undefined;
    this.overlayPositioning = "absolute";
    this.required = false;
    this.selectionMode = "multiple";
    this.scale = "m";
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
    this.text = "";
    this.effectiveLocale = undefined;
    this.defaultMessages = undefined;
  }
  openHandler(value) {
    if (!value) {
      floatingUi.updateAfterClose(this.floatingEl);
    }
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
    if (!dom.isPrimaryPointerButton(event)) {
      return;
    }
    this.setInactiveIfNotContained(event);
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
      type: "menu"
    }, delayed);
  }
  /** Sets focus on the component. */
  async setFocus() {
    var _a;
    await loadable.componentLoaded(this);
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
    locale.connectLocalized(this);
    t9n.connectMessages(this);
    this.internalValueChangeFlag = true;
    this.value = this.getValue();
    this.internalValueChangeFlag = false;
    (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.observe(this.el, { childList: true, subtree: true });
    label.connectLabel(this);
    form.connectForm(this);
    openCloseComponent.connectOpenCloseComponent(this);
    this.setFilteredPlacements();
    this.reposition(true);
    if (this.open) {
      this.openHandler(this.open);
    }
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
  disconnectedCallback() {
    var _a, _b;
    (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
    (_b = this.resizeObserver) === null || _b === void 0 ? void 0 : _b.disconnect();
    label.disconnectLabel(this);
    form.disconnectForm(this);
    floatingUi.disconnectFloatingUI(this, this.referenceEl, this.floatingEl);
    openCloseComponent.disconnectOpenCloseComponent(this);
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
  comboboxInViewport() {
    const bounding = this.el.getBoundingClientRect();
    return (bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.right <= (window.innerWidth || document.documentElement.clientWidth) &&
      bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight));
  }
  onBeforeOpen() {
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
  getMaxScrollerHeight() {
    const items = this.getCombinedItems().filter((item) => !item.hidden);
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
  getCombinedItems() {
    return [...this.groupItems, ...this.items];
  }
  toggleSelection(item, value = !item.selected) {
    if (!item) {
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
  getfilteredItems() {
    return this.items.filter((item) => !item.hidden);
  }
  getSelectedItems() {
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
  }
  getData() {
    return this.items.map((item) => ({
      filterDisabled: item.filterDisabled,
      value: item.value,
      label: item.textLabel
    }));
  }
  getNeedsIcon() {
    return this.selectionMode === "single" && this.items.some((item) => item.icon);
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
      const item = document.createElement(utils.ComboboxItem);
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
  isMulti() {
    return this.selectionMode !== "single";
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
        "chip--active": activeChipIndex === i
      };
      const ancestors = [...utils.getItemAncestors(item)].reverse();
      const pathLabel = [...ancestors, item].map((el) => el.textLabel);
      const label = selectionMode !== "ancestors" ? item.textLabel : pathLabel.join(" / ");
      return (index.h("calcite-chip", { class: chipClasses, closable: true, icon: item.icon, iconFlipRtl: item.iconFlipRtl, id: item.guid ? `${chipUidPrefix}${item.guid}` : null, key: item.textLabel, messageOverrides: { dismissLabel: messages.removeTag }, onCalciteChipClose: () => this.calciteChipCloseHandler(item), scale: scale, title: label, value: item.value }, label));
    });
  }
  renderInput() {
    const { guid, disabled, placeholder, selectionMode, selectedItems, open } = this;
    const single = selectionMode === "single";
    const selectedItem = selectedItems[0];
    const showLabel = !open && single && !!selectedItem;
    return (index.h("span", { class: {
        "input-wrap": true,
        "input-wrap--single": single
      } }, showLabel && (index.h("span", { class: {
        label: true,
        "label--icon": !!(selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.icon)
      }, key: "label" }, selectedItem.textLabel)), index.h("input", { "aria-activedescendant": this.activeDescendant, "aria-autocomplete": "list", "aria-controls": `${listboxUidPrefix}${guid}`, "aria-label": label.getLabelText(this), class: {
        input: true,
        "input--single": true,
        "input--transparent": this.activeChipIndex > -1,
        "input--hidden": showLabel,
        "input--icon": !!this.placeholderIcon
      }, disabled: disabled, id: `${inputUidPrefix}${guid}`, key: "input", onBlur: this.comboboxBlurHandler, onFocus: this.comboboxFocusHandler, onInput: this.inputHandler, placeholder: placeholder, type: "text",
      // eslint-disable-next-line react/jsx-sort-props
      ref: (el) => (this.textInput = el) })));
  }
  renderListBoxOptions() {
    return this.filteredItems.map((item) => (index.h("li", { "aria-selected": dom.toAriaBoolean(item.selected), id: item.guid ? `${itemUidPrefix}${item.guid}` : null, role: "option", tabindex: "-1" }, item.textLabel)));
  }
  renderFloatingUIContainer() {
    const { setFloatingEl, setContainerEl, open } = this;
    const classes = {
      "list-container": true,
      [floatingUi.FloatingCSS.animation]: true,
      [floatingUi.FloatingCSS.animationActive]: open
    };
    return (index.h("div", { "aria-hidden": "true", class: {
        "floating-ui-container": true,
        "floating-ui-container--active": open
      },
      // eslint-disable-next-line react/jsx-sort-props
      ref: setFloatingEl }, index.h("div", { class: classes,
      // eslint-disable-next-line react/jsx-sort-props
      ref: setContainerEl }, index.h("ul", { class: { list: true, "list--hide": !open } }, index.h("slot", null)))));
  }
  renderIconStart() {
    const { selectedItems, placeholderIcon, selectionMode, placeholderIconFlipRtl } = this;
    const selectedItem = selectedItems[0];
    const selectedIcon = selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.icon;
    const singleSelectionMode = selectionMode === "single";
    const iconAtStart = !this.open && selectedItem
      ? !!selectedIcon && singleSelectionMode
      : !!this.placeholderIcon && (!selectedItem || singleSelectionMode);
    return (iconAtStart && (index.h("span", { class: "icon-start" }, index.h("calcite-icon", { class: "selected-icon", flipRtl: this.open && selectedItem ? selectedItem.iconFlipRtl : placeholderIconFlipRtl, icon: !this.open && selectedItem ? selectedIcon : placeholderIcon, scale: "s" }))));
  }
  renderIconEnd() {
    const { open } = this;
    return (index.h("span", { class: "icon-end" }, index.h("calcite-icon", { icon: open ? "chevron-up" : "chevron-down", scale: "s" })));
  }
  render() {
    const { guid, label: label$1, open } = this;
    const single = this.selectionMode === "single";
    return (index.h(index.Host, { onClick: this.comboboxFocusHandler }, index.h("div", { "aria-autocomplete": "list", "aria-controls": `${listboxUidPrefix}${guid}`, "aria-expanded": dom.toAriaBoolean(open), "aria-haspopup": "listbox", "aria-label": label.getLabelText(this), "aria-live": "polite", "aria-owns": `${listboxUidPrefix}${guid}`, class: {
        wrapper: true,
        "wrapper--single": single || !this.selectedItems.length,
        "wrapper--active": open
      }, onClick: this.clickHandler, onKeyDown: this.keydownHandler, role: "combobox",
      // eslint-disable-next-line react/jsx-sort-props
      ref: this.setReferenceEl }, index.h("div", { class: "grid-input" }, this.renderIconStart(), !single && this.renderChips(), index.h("label", { class: "screen-readers-only", htmlFor: `${inputUidPrefix}${guid}`, id: `${labelUidPrefix}${guid}` }, label$1), this.renderInput()), this.renderIconEnd()), index.h("ul", { "aria-labelledby": `${labelUidPrefix}${guid}`, "aria-multiselectable": "true", class: "screen-readers-only", id: `${listboxUidPrefix}${guid}`, role: "listbox", tabIndex: -1 }, this.renderListBoxOptions()), this.renderFloatingUIContainer(), index.h(form.HiddenFormInputSlot, { component: this })));
  }
  static get assetsDirs() { return ["assets"]; }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "open": ["openHandler"],
    "disabled": ["handleDisabledChange"],
    "maxItems": ["maxItemsHandler"],
    "overlayPositioning": ["overlayPositioningHandler"],
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
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.2.0
 */
const CSS = {
  icon: "icon",
  iconActive: "icon--active",
  iconIndent: "icon--indent",
  custom: "icon--custom",
  dot: "icon--dot",
  single: "label--single",
  label: "label",
  active: "label--active",
  selected: "label--selected",
  title: "title",
  textContainer: "text-container"
};

const comboboxItemCss = "@charset \"UTF-8\";@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing);--calcite-floating-ui-z-index:600}:host([hidden]){display:none}:host([disabled]){pointer-events:none;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}.scale--s{font-size:var(--calcite-font-size--2);line-height:1rem;--calcite-combobox-item-spacing-unit-l:0.5rem;--calcite-combobox-item-spacing-unit-s:0.25rem;--calcite-combobox-item-spacing-indent:0.5rem;--calcite-combobox-item-selector-icon-size:1rem}.scale--m{font-size:var(--calcite-font-size--1);line-height:1rem;--calcite-combobox-item-spacing-unit-l:0.75rem;--calcite-combobox-item-spacing-unit-s:0.5rem;--calcite-combobox-item-spacing-indent:0.75rem;--calcite-combobox-item-selector-icon-size:1rem}.scale--l{font-size:var(--calcite-font-size-0);line-height:1.25rem;--calcite-combobox-item-spacing-unit-l:1rem;--calcite-combobox-item-spacing-unit-s:0.625rem;--calcite-combobox-item-spacing-indent:1rem;--calcite-combobox-item-selector-icon-size:1.5rem}.container{--calcite-combobox-item-indent-value:calc(\n    var(--calcite-combobox-item-spacing-indent) * var(--calcite-combobox-item-spacing-indent-multiplier)\n  )}:host(:focus){--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}:host,ul{margin:0px;display:flex;flex-direction:column;padding:0px}:host(:focus),ul:focus{outline:2px solid transparent;outline-offset:2px}.label{position:relative;box-sizing:border-box;display:flex;inline-size:100%;min-inline-size:100%;cursor:pointer;align-items:center;color:var(--calcite-ui-text-3);-webkit-text-decoration-line:none;text-decoration-line:none;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);outline-color:transparent;word-wrap:break-word;word-break:break-word;padding-block:var(--calcite-combobox-item-spacing-unit-s);padding-inline:var(--calcite-combobox-item-spacing-unit-l)}:host([disabled]) .label{cursor:default}.label--selected{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-ui-text-1)}.label--active{outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}.label:hover,.label:active{background-color:var(--calcite-ui-foreground-2);color:var(--calcite-ui-text-1);-webkit-text-decoration-line:none;text-decoration-line:none;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.title{padding-block:0;padding-inline:var(--calcite-combobox-item-spacing-unit-l)}.icon{display:inline-flex;opacity:0;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);color:var(--calcite-ui-border-1)}.icon--indent{-webkit-padding-start:var(--calcite-combobox-item-indent-value);padding-inline-start:var(--calcite-combobox-item-indent-value)}.icon--custom{-webkit-margin-before:-1px;margin-block-start:-1px;-webkit-padding-start:var(--calcite-combobox-item-spacing-unit-l);padding-inline-start:var(--calcite-combobox-item-spacing-unit-l);color:var(--calcite-ui-text-3)}.icon--active{color:var(--calcite-ui-text-1)}.icon--dot{display:flex;justify-content:center;min-inline-size:var(--calcite-combobox-item-selector-icon-size)}.icon--dot:before{text-align:start;content:\"•\"}.label--active .icon{opacity:1}.label--selected .icon{opacity:1;color:var(--calcite-ui-brand)}:host(:hover[disabled]) .icon{opacity:1}";

const ComboboxItem = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.calciteComboboxItemChange = index.createEvent(this, "calciteComboboxItemChange", 6);
    /** Specifies the scale of the combobox-item controlled by parent, defaults to m */
    this.scale = "m";
    this.itemClickHandler = (event) => {
      event.preventDefault();
      this.toggleSelected();
    };
    this.disabled = false;
    this.selected = false;
    this.active = false;
    this.ancestors = undefined;
    this.guid = guid.guid();
    this.icon = undefined;
    this.iconFlipRtl = false;
    this.textLabel = undefined;
    this.value = undefined;
    this.filterDisabled = undefined;
  }
  selectedWatchHandler() {
    this.calciteComboboxItemChange.emit();
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  connectedCallback() {
    this.ancestors = utils.getAncestors(this.el);
    this.scale = dom.getElementProp(this.el, "scale", this.scale);
    conditionalSlot.connectConditionalSlotComponent(this);
  }
  disconnectedCallback() {
    conditionalSlot.disconnectConditionalSlotComponent(this);
  }
  componentDidRender() {
    interactive.updateHostInteraction(this);
  }
  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------
  toggleSelected(coerce) {
    if (this.disabled) {
      return;
    }
    this.selected = typeof coerce === "boolean" ? coerce : !this.selected;
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderIcon(iconPath) {
    return this.icon ? (index.h("calcite-icon", { class: {
        [CSS.custom]: !!this.icon,
        [CSS.iconActive]: this.icon && this.selected,
        [CSS.iconIndent]: true
      }, flipRtl: this.iconFlipRtl, icon: this.icon || iconPath, key: "icon", scale: this.scale === "l" ? "m" : "s" })) : null;
  }
  renderSelectIndicator(showDot, iconPath) {
    return showDot ? (index.h("span", { class: {
        [CSS.icon]: true,
        [CSS.dot]: true,
        [CSS.iconIndent]: true
      } })) : (index.h("calcite-icon", { class: {
        [CSS.icon]: true,
        [CSS.iconActive]: this.selected,
        [CSS.iconIndent]: true
      }, flipRtl: this.iconFlipRtl, icon: iconPath, key: "indicator", scale: this.scale === "l" ? "m" : "s" }));
  }
  renderChildren() {
    if (dom.getSlotted(this.el)) {
      return (index.h("ul", { key: "default-slot-container" }, index.h("slot", null)));
    }
    return null;
  }
  render() {
    const isSingleSelect = dom.getElementProp(this.el, "selection-mode", "multiple") === "single";
    const showDot = isSingleSelect && !this.disabled;
    const defaultIcon = isSingleSelect ? "dot" : "check";
    const iconPath = this.disabled ? "circle-disallowed" : defaultIcon;
    const classes = {
      [CSS.label]: true,
      [CSS.selected]: this.selected,
      [CSS.active]: this.active,
      [CSS.single]: isSingleSelect
    };
    const depth = utils.getDepth(this.el);
    return (index.h(index.Host, { "aria-hidden": "true" }, index.h("div", { class: `container scale--${this.scale}`, style: { "--calcite-combobox-item-spacing-indent-multiplier": `${depth}` } }, index.h("li", { class: classes, id: this.guid, onClick: this.itemClickHandler }, this.renderSelectIndicator(showDot, iconPath), this.renderIcon(iconPath), index.h("span", { class: "title" }, this.textLabel)), this.renderChildren())));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "selected": ["selectedWatchHandler"]
  }; }
};
ComboboxItem.style = comboboxItemCss;

const mapLayerPickerCss = ":host{display:block}.map-layer-picker-container{width:100%}.map-layer-picker{position:relative;width:100%;display:inline-block}.padding-bottom-1{padding-bottom:1rem}";

const MapLayerPicker = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.layerSelectionChange = index.createEvent(this, "layerSelectionChange", 7);
    this.enabledLayerIds = [];
    this.mapView = undefined;
    this.selectedLayerIds = [];
    this.selectionMode = "single";
    this.layerIds = [];
  }
  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------
  /**
   * Called each time the mapView prop is changed.
   *
   */
  async watchStateHandler(newValue, oldValue) {
    if (newValue !== oldValue) {
      await this._setLayers();
      if (this.selectionMode === "single") {
        this.layerSelectionChange.emit([this.layerIds[0]]);
      }
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
    await this._setLayers();
    if (this.selectionMode === "single" && (this.layerIds.length > 0 || this.selectedLayerIds.length === 1)) {
      this.layerSelectionChange.emit(this.selectedLayerIds.length === 1 ? [this.selectedLayerIds[0]] : [this.layerIds[0]]);
    }
  }
  /**
   * Renders the component.
   */
  render() {
    return (index.h(index.Host, null, index.h("div", { class: "map-layer-picker-container" }, index.h("div", { class: "map-layer-picker" }, this.selectionMode === "multi" ? this._getCombobox() : this._getSelect()))));
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------
  /**
   * Create a list of layers from the map
   *
   * Used for selecting a single layer.
   *
   * @returns Calcite Select component with the ids of the layers from the map
   */
  _getSelect() {
    return (index.h("calcite-select", { label: "", onCalciteSelectChange: (evt) => this._layerSelectionChange(evt), ref: (el) => { this._layerElement = el; } }, this._addMapLayersOptions()));
  }
  /**
   * Create a list of layer ids from the map
   *
   * Used for selecting multiple layers
   *
   * @returns Calcite ComboBox component with the ids of the layers from the map
   */
  _getCombobox() {
    return (index.h("calcite-combobox", { label: "", onCalciteComboboxChange: (evt) => this._layerSelectionChange(evt), "selection-mode": this.selectionMode }, this._addMapLayersOptions()));
  }
  /**
   * Hydrate a select or combobox component with the ids of the layers in the map
   *
   * @returns Array of ComboBox items or Select options for the ids of the layers
   */
  _addMapLayersOptions() {
    return this.layerIds.reduce((prev, cur) => {
      if (publicNotificationStore.state.managedLayers.indexOf(publicNotificationStore.state.layerNameHash[cur]) < 0 && (this.enabledLayerIds.length > 0 ? this.enabledLayerIds.indexOf(cur) > -1 : true)) {
        prev.push(this.selectionMode === "multi" && this.selectedLayerIds.indexOf(cur) > -1 ?
          (index.h("calcite-combobox-item", { selected: true, textLabel: publicNotificationStore.state.layerNameHash[cur], value: cur })) :
          this.selectionMode === "multi" ?
            (index.h("calcite-combobox-item", { textLabel: publicNotificationStore.state.layerNameHash[cur], value: cur })) :
            this.selectedLayerIds.indexOf(cur) > -1 ?
              (index.h("calcite-option", { label: publicNotificationStore.state.layerNameHash[cur], selected: true, value: cur })) :
              (index.h("calcite-option", { label: publicNotificationStore.state.layerNameHash[cur], value: cur })));
      }
      return prev;
    }, []);
  }
  /**
   * Fetch the ids of the layers from the map
   *
   * @returns Promise when the operation has completed
   */
  async _setLayers() {
    if (this.mapView) {
      const mapLayerIds = await mapViewUtils.getMapLayerIds(this.mapView);
      this.layerIds = mapLayerIds.filter(n => { var _a; return ((_a = this.enabledLayerIds) === null || _a === void 0 ? void 0 : _a.length) > 0 ? this.enabledLayerIds.indexOf(n) > -1 : true; });
      await this._initLayerHashState();
    }
  }
  /**
   * Create a layer id:title hash for layer name display
   *
   * @returns Promise when the operation has completed
   */
  async _initLayerHashState() {
    if (this.mapView) {
      publicNotificationStore.state.layerNameHash = await mapViewUtils.getMapLayerHash(this.mapView);
    }
  }
  /**
   * Fetch the ids of the layers from the map
   *
   * @returns Promise when the operation has completed
   */
  _layerSelectionChange(evt) {
    var _a;
    this.selectedLayerIds = this.selectionMode === "single" ?
      [this._layerElement.value] : ((_a = evt.detail) === null || _a === void 0 ? void 0 : _a.selectedItems.map((item) => {
      return item.value;
    })) || [];
    this.layerSelectionChange.emit(this.selectedLayerIds);
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "mapView": ["watchStateHandler"]
  }; }
};
MapLayerPicker.style = mapLayerPickerCss;

exports.calcite_combobox = Combobox;
exports.calcite_combobox_item = ComboboxItem;
exports.map_layer_picker = MapLayerPicker;
