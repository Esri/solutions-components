/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-6654298b.js');
const sortable_esm = require('./sortable.esm-bf47019d.js');
const interactive = require('./interactive-772d59fe.js');
const observers = require('./observers-b0934d2a.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.2.0
 */
const CSS = {
  sortItem: "sort-item",
  container: "container",
  containerHorizontal: "container--horizontal",
  containerVertical: "container--vertical"
};

const sortableListCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing);--calcite-floating-ui-z-index:600}:host([hidden]){display:none}:host([disabled]){pointer-events:none;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}:host{display:flex}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.container{display:flex;flex:1 1 auto}.container--vertical{flex-direction:column}.container--horizontal{flex-direction:row}";

const SortableList = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.calciteListOrderChange = index.createEvent(this, "calciteListOrderChange", 6);
    this.items = [];
    this.mutationObserver = observers.createObserver("mutation", () => {
      this.cleanUpDragAndDrop();
      this.items = Array.from(this.el.children);
      this.setUpDragAndDrop();
    });
    this.dragSelector = undefined;
    this.group = undefined;
    this.handleSelector = "calcite-handle";
    this.layout = "vertical";
    this.disabled = false;
    this.loading = false;
    this.handleActivated = false;
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  connectedCallback() {
    this.items = Array.from(this.el.children);
    this.setUpDragAndDrop();
    this.beginObserving();
  }
  disconnectedCallback() {
    var _a;
    (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
    this.cleanUpDragAndDrop();
  }
  componentDidRender() {
    interactive.updateHostInteraction(this);
  }
  calciteHandleNudgeNextHandler(event) {
    this.handleNudgeEvent(event);
  }
  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------
  handleNudgeEvent(event) {
    var _a;
    const { direction } = event.detail;
    const handle = event.target;
    const sortItem = this.items.find((item) => {
      return item.contains(handle) || event.composedPath().includes(item);
    });
    const lastIndex = this.items.length - 1;
    const startingIndex = this.items.indexOf(sortItem);
    let appendInstead = false;
    let buddyIndex;
    if (direction === "up") {
      if (startingIndex === 0) {
        appendInstead = true;
      }
      else {
        buddyIndex = startingIndex - 1;
      }
    }
    else {
      if (startingIndex === lastIndex) {
        buddyIndex = 0;
      }
      else if (startingIndex === lastIndex - 1) {
        appendInstead = true;
      }
      else {
        buddyIndex = startingIndex + 2;
      }
    }
    (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
    if (appendInstead) {
      sortItem.parentElement.appendChild(sortItem);
    }
    else {
      sortItem.parentElement.insertBefore(sortItem, this.items[buddyIndex]);
    }
    this.items = Array.from(this.el.children);
    handle.activated = true;
    handle.setFocus();
    this.beginObserving();
  }
  setUpDragAndDrop() {
    this.cleanUpDragAndDrop();
    const options = {
      dataIdAttr: "id",
      group: this.group,
      handle: this.handleSelector,
      // Changed sorting within list
      onUpdate: () => {
        this.items = Array.from(this.el.children);
        this.calciteListOrderChange.emit();
      },
      // Element dragging started
      onStart: () => {
        var _a;
        (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
      },
      // Element dragging ended
      onEnd: () => {
        this.beginObserving();
      }
    };
    if (this.dragSelector) {
      options.draggable = this.dragSelector;
    }
    this.sortable = sortable_esm.Sortable.create(this.el, options);
  }
  cleanUpDragAndDrop() {
    var _a;
    (_a = this.sortable) === null || _a === void 0 ? void 0 : _a.destroy();
    this.sortable = null;
  }
  beginObserving() {
    var _a;
    (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.observe(this.el, { childList: true, subtree: true });
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    const { layout } = this;
    const horizontal = layout === "horizontal" || false;
    return (index.h("div", { class: {
        [CSS.container]: true,
        [CSS.containerVertical]: !horizontal,
        [CSS.containerHorizontal]: horizontal
      } }, index.h("slot", null)));
  }
  get el() { return index.getElement(this); }
};
SortableList.style = sortableListCss;

exports.calcite_sortable_list = SortableList;
