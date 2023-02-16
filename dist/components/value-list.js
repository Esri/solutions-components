/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { S as Sortable } from './sortable.esm.js';
import { o as getItemIndex, m as mutationObserverCallback, d as deselectRemovedItems, a as deselectSiblingItems, s as selectSiblings, h as handleFilter, g as getItemData, k as keyDownHandler, p as moveItemIndex, i as initialize, b as initializeObserver, c as cleanUpObserver, j as calciteListFocusOutHandler, r as removeItem, e as calciteListItemChangeHandler, f as calciteInternalListItemValueChangeHandler, l as setUpItems, n as setFocus, L as List } from './shared-list-render.js';
import { c as createObserver } from './observers.js';
import { u as updateHostInteraction } from './interactive.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */
const CSS = {
  container: "container",
  handle: "handle"
};
var ICON_TYPES;
(function (ICON_TYPES) {
  ICON_TYPES["grip"] = "grip";
})(ICON_TYPES || (ICON_TYPES = {}));

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */
function getScreenReaderText(item, status, valueList) {
  const { items, intlDragHandleIdle, intlDragHandleActive, intlDragHandleChange, intlDragHandleCommit } = valueList;
  const total = items.length;
  const position = getItemIndex(valueList, item) + 1;
  if (status === "idle") {
    const idleText = intlDragHandleIdle
      ? replacePlaceholders(intlDragHandleIdle, item.label, position, total)
      : `${item.label}, press space and use arrow keys to reorder content. Current position ${position} of ${total}.`;
    return idleText;
  }
  else if (status === "active") {
    const activeText = intlDragHandleActive
      ? replacePlaceholders(intlDragHandleActive, item.label, position, total)
      : `Reordering ${item.label}, current position ${position} of ${total}.`;
    return activeText;
  }
  else if (status === "change") {
    const changeText = intlDragHandleChange
      ? replacePlaceholders(intlDragHandleChange, item.label, position, total)
      : `${item.label}, new position ${position} of ${total}. Press space to confirm.`;
    return changeText;
  }
  else {
    const commitText = intlDragHandleCommit
      ? replacePlaceholders(intlDragHandleCommit, item.label, position, total)
      : `${item.label}, current position ${position} of ${total}.`;
    return commitText;
  }
}
function getHandleAndItemElement(event) {
  const handle = event
    .composedPath()
    .find((item) => { var _a; return ((_a = item.dataset) === null || _a === void 0 ? void 0 : _a.jsHandle) !== undefined; });
  const item = event
    .composedPath()
    .find((item) => { var _a; return ((_a = item.tagName) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === "calcite-value-list-item"; });
  return { handle, item };
}
function replacePlaceholders(text, label, position, total) {
  const replacePosition = text.replace("${position}", position.toString());
  const replaceLabel = replacePosition.replace("${item.label}", label);
  return replaceLabel.replace("${total}", total.toString());
}

const valueListCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host([disabled]){pointer-events:none;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}:host{position:relative;box-sizing:border-box;display:flex;flex-shrink:0;flex-grow:0;flex-direction:column;align-items:stretch;background-color:transparent;font-size:var(--calcite-font-size--1);color:var(--calcite-ui-text-2)}:host *{box-sizing:border-box}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}calcite-value-list-item:last-of-type{--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}:host([filter-enabled]) header{-webkit-margin-after:0.25rem;margin-block-end:0.25rem;display:flex;align-items:center;justify-content:flex-end;background-color:var(--calcite-ui-foreground-1);--tw-shadow:0 1px 0 var(--calcite-ui-border-3);--tw-shadow-colored:0 1px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}:host([filter-enabled]) header.sticky-pos{position:sticky;inset-block-start:0px;z-index:300}calcite-filter{-webkit-margin-after:1px;margin-block-end:1px}";

const ValueList = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.calciteListChange = createEvent(this, "calciteListChange", 6);
    this.calciteListOrderChange = createEvent(this, "calciteListOrderChange", 6);
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /**
     * When `true`, interaction is prevented and the component is displayed with lower opacity.
     */
    this.disabled = false;
    /**
     * When `true`, `calcite-value-list-item`s are sortable via a draggable button.
     */
    this.dragEnabled = false;
    /**
     * When `true`, an input appears at the top of the component that can be used by end users to filter list items.
     */
    this.filterEnabled = false;
    /**
     * When `true`, a busy indicator is displayed.
     */
    this.loading = false;
    /**
     * Similar to standard radio buttons and checkboxes.
     * When `true`, a user can select multiple `calcite-value-list-item`s at a time.
     * When `false`, only a single `calcite-value-list-item` can be selected at a time,
     * and a new selection will deselect previous selections.
     */
    this.multiple = false;
    /**
     * When `true` and single-selection is enabled, the selection changes when navigating `calcite-value-list-item`s via keyboard.
     */
    this.selectionFollowsFocus = false;
    // --------------------------------------------------------------------------
    //
    //  Private Properties
    //
    // --------------------------------------------------------------------------
    this.selectedValues = new Map();
    this.dataForFilter = [];
    this.lastSelectedItem = null;
    this.mutationObserver = createObserver("mutation", mutationObserverCallback.bind(this));
    this.setFilterEl = (el) => {
      this.filterEl = el;
    };
    this.deselectRemovedItems = deselectRemovedItems.bind(this);
    this.deselectSiblingItems = deselectSiblingItems.bind(this);
    this.selectSiblings = selectSiblings.bind(this);
    this.handleFilter = handleFilter.bind(this);
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
      const { items } = this;
      if (event.key === " ") {
        this.updateScreenReaderText(getScreenReaderText(item, "active", this));
      }
      if ((event.key !== "ArrowUp" && event.key !== "ArrowDown") || items.length <= 1) {
        return;
      }
      event.preventDefault();
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
      requestAnimationFrame(() => handle === null || handle === void 0 ? void 0 : handle.focus());
      item.handleActivated = true;
      this.updateHandleAriaLabel(handle, getScreenReaderText(item, "change", this));
    };
    this.storeAssistiveEl = (el) => {
      this.assistiveTextEl = el;
    };
    this.handleFocusIn = (event) => {
      const { handle, item } = getHandleAndItemElement(event);
      if (!(item === null || item === void 0 ? void 0 : item.handleActivated) && item && handle) {
        this.updateHandleAriaLabel(handle, getScreenReaderText(item, "idle", this));
      }
    };
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  connectedCallback() {
    initialize.call(this);
    initializeObserver.call(this);
  }
  componentDidLoad() {
    this.setUpDragAndDrop();
  }
  componentDidRender() {
    updateHostInteraction(this);
  }
  disconnectedCallback() {
    cleanUpObserver.call(this);
    this.cleanUpDragAndDrop();
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
  getItems() {
    return Array.from(this.el.querySelectorAll("calcite-value-list-item"));
  }
  setUpItems() {
    setUpItems.call(this, "calcite-value-list-item");
  }
  setUpFilter() {
    if (this.filterEnabled) {
      this.dataForFilter = this.getItemData();
    }
  }
  setUpDragAndDrop() {
    this.cleanUpDragAndDrop();
    if (!this.dragEnabled) {
      return;
    }
    this.sortable = Sortable.create(this.el, {
      dataIdAttr: "id",
      handle: `.${CSS.handle}`,
      draggable: "calcite-value-list-item",
      group: this.group,
      onSort: () => {
        this.items = Array.from(this.el.querySelectorAll("calcite-value-list-item"));
        const values = this.items.map((item) => item.value);
        this.calciteListOrderChange.emit(values);
      }
    });
  }
  cleanUpDragAndDrop() {
    var _a;
    (_a = this.sortable) === null || _a === void 0 ? void 0 : _a.destroy();
    this.sortable = null;
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
  /** Returns the currently selected items */
  async getSelectedItems() {
    return this.selectedValues;
  }
  /**
   * Sets focus on the component.
   *
   * @param focusId
   */
  async setFocus(focusId) {
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
  render() {
    return (h(List, { onBlur: this.handleBlur, onFocusin: this.handleFocusIn, onKeyDown: this.keyDownHandler, props: this }));
  }
  get el() { return this; }
  static get style() { return valueListCss; }
}, [1, "calcite-value-list", {
    "disabled": [516],
    "dragEnabled": [516, "drag-enabled"],
    "filterEnabled": [516, "filter-enabled"],
    "filterPlaceholder": [513, "filter-placeholder"],
    "group": [513],
    "loading": [516],
    "multiple": [516],
    "selectionFollowsFocus": [516, "selection-follows-focus"],
    "intlDragHandleIdle": [1, "intl-drag-handle-idle"],
    "intlDragHandleActive": [1, "intl-drag-handle-active"],
    "intlDragHandleChange": [1, "intl-drag-handle-change"],
    "intlDragHandleCommit": [1, "intl-drag-handle-commit"],
    "selectedValues": [32],
    "dataForFilter": [32],
    "getSelectedItems": [64],
    "setFocus": [64]
  }, [[0, "focusout", "calciteListFocusOutHandler"], [0, "calciteListItemRemove", "calciteListItemRemoveHandler"], [0, "calciteListItemChange", "calciteListItemChangeHandler"], [0, "calciteInternalListItemPropsChange", "calciteInternalListItemPropsChangeHandler"], [0, "calciteInternalListItemValueChange", "calciteInternalListItemValueChangeHandler"]]]);
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
