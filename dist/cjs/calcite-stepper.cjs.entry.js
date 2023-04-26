/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-6654298b.js');
const dom = require('./dom-24094fab.js');
require('./guid-c58d5ead.js');
require('./resources-1f836572.js');

const stepperCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing);--calcite-floating-ui-z-index:600}:host([hidden]){display:none}:host{position:relative;display:flex;inline-size:100%;min-inline-size:-moz-fit-content;min-inline-size:fit-content;flex-direction:row;flex-wrap:wrap;align-items:stretch;justify-content:space-between}:host([layout=vertical]){flex:1 1 auto;flex-direction:column}:host([layout=horizontal]){display:grid;grid-template-areas:\"items\" \"content\"}";

const Stepper = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.calciteStepperItemChange = index.createEvent(this, "calciteStepperItemChange", 6);
    this.calciteInternalStepperItemChange = index.createEvent(this, "calciteInternalStepperItemChange", 6);
    //--------------------------------------------------------------------------
    //
    //  Private State/Props
    //
    //--------------------------------------------------------------------------
    this.itemMap = new Map();
    /** list of sorted Stepper items */
    this.items = [];
    /** list of enabled Stepper items */
    this.enabledItems = [];
    this.icon = false;
    this.layout = "horizontal";
    this.numbered = false;
    this.numberingSystem = undefined;
    this.selectedItem = null;
    this.scale = "m";
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  componentDidLoad() {
    // if no stepper items are set as active, default to the first one
    if (typeof this.currentPosition !== "number") {
      this.calciteInternalStepperItemChange.emit({
        position: 0
      });
    }
  }
  render() {
    return (index.h("slot", { onSlotchange: (event) => {
        const items = event.currentTarget
          .assignedElements()
          .filter((el) => (el === null || el === void 0 ? void 0 : el.tagName) === "CALCITE-STEPPER-ITEM");
        const spacing = Array(items.length).fill("1fr").join(" ");
        this.el.style.gridTemplateAreas = spacing;
        this.el.style.gridTemplateColumns = spacing;
      } }));
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  calciteInternalStepperItemKeyEvent(event) {
    const item = event.detail.item;
    const itemToFocus = event.target;
    switch (item.key) {
      case "ArrowDown":
      case "ArrowRight":
        dom.focusElementInGroup(this.enabledItems, itemToFocus, "next");
        break;
      case "ArrowUp":
      case "ArrowLeft":
        dom.focusElementInGroup(this.enabledItems, itemToFocus, "previous");
        break;
      case "Home":
        dom.focusElementInGroup(this.enabledItems, itemToFocus, "first");
        break;
      case "End":
        dom.focusElementInGroup(this.enabledItems, itemToFocus, "last");
        break;
    }
    event.stopPropagation();
  }
  registerItem(event) {
    const item = event.target;
    const { content, position } = event.detail;
    this.itemMap.set(item, { position, content });
    this.items = this.sortItems();
    this.enabledItems = this.filterItems();
    event.stopPropagation();
  }
  updateItem(event) {
    const { position } = event.detail;
    if (typeof position === "number") {
      this.currentPosition = position;
      this.selectedItem = event.target;
    }
    this.calciteInternalStepperItemChange.emit({
      position
    });
  }
  handleUserRequestedStepperItemSelect() {
    this.calciteStepperItemChange.emit();
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  /** Set the next `calcite-stepper-item` as active. */
  async nextStep() {
    const enabledStepIndex = this.getEnabledStepIndex(this.currentPosition + 1, "next");
    if (typeof enabledStepIndex !== "number") {
      return;
    }
    this.updateStep(enabledStepIndex);
  }
  /** Set the previous `calcite-stepper-item` as active. */
  async prevStep() {
    const enabledStepIndex = this.getEnabledStepIndex(this.currentPosition - 1, "previous");
    if (typeof enabledStepIndex !== "number") {
      return;
    }
    this.updateStep(enabledStepIndex);
  }
  /**
   * Set a specified `calcite-stepper-item` as active.
   *
   * @param step
   */
  async goToStep(step) {
    const position = step - 1;
    if (this.currentPosition !== position) {
      this.updateStep(position);
    }
  }
  /** Set the first `calcite-stepper-item` as active. */
  async startStep() {
    const enabledStepIndex = this.getEnabledStepIndex(0, "next");
    if (typeof enabledStepIndex !== "number") {
      return;
    }
    this.updateStep(enabledStepIndex);
  }
  /** Set the last `calcite-stepper-item` as active. */
  async endStep() {
    const enabledStepIndex = this.getEnabledStepIndex(this.items.length - 1, "previous");
    if (typeof enabledStepIndex !== "number") {
      return;
    }
    this.updateStep(enabledStepIndex);
  }
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  getEnabledStepIndex(startIndex, direction = "next") {
    var _a;
    const { items, currentPosition } = this;
    let newIndex = startIndex;
    while ((_a = items[newIndex]) === null || _a === void 0 ? void 0 : _a.disabled) {
      newIndex = newIndex + (direction === "previous" ? -1 : 1);
    }
    return newIndex !== currentPosition && newIndex < items.length && newIndex >= 0
      ? newIndex
      : null;
  }
  updateStep(position) {
    this.currentPosition = position;
    this.calciteInternalStepperItemChange.emit({
      position
    });
  }
  sortItems() {
    const { itemMap } = this;
    return Array.from(itemMap.keys()).sort((a, b) => itemMap.get(a).position - itemMap.get(b).position);
  }
  filterItems() {
    return this.items.filter((item) => !item.disabled);
  }
  get el() { return index.getElement(this); }
};
Stepper.style = stepperCss;

exports.calcite_stepper = Stepper;
