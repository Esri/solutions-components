/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-c6979cbb.js');
const loadModules = require('./loadModules-0806a34f.js');
const locale = require('./locale-04da9a8c.js');
const dom = require('./dom-4a580af6.js');
const label = require('./label-24fcd8a5.js');
const form = require('./form-ef410342.js');
const interactive = require('./interactive-0a68ab99.js');
const guid = require('./guid-84ac4d91.js');
const math = require('./math-460fffaf.js');
const key = require('./key-55aca5c0.js');
const locale$1 = require('./locale-73cab8e8.js');
const publicNotificationStore = require('./publicNotificationStore-20e924f5.js');
const interfaces = require('./interfaces-cc7823c8.js');
const mapViewUtils = require('./mapViewUtils-7eaebfd7.js');
require('./_commonjsHelpers-384729db.js');
require('./resources-b56bce71.js');
require('./observers-5311faf8.js');
require('./index-763f87ac.js');

const bufferToolsCss = ":host{display:block}.c-container{display:inline-flex}.flex-1{flex:\"1\"}.padding-end-1{-webkit-padding-end:1rem;padding-inline-end:1rem}";

const BufferTools = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.bufferComplete = index.createEvent(this, "bufferComplete", 7);
    this.distanceChanged = index.createEvent(this, "distanceChanged", 7);
    this.unitChanged = index.createEvent(this, "unitChanged", 7);
    this.appearance = "text";
    this.distance = 0;
    this.geometries = [];
    this.max = undefined;
    this.min = 0;
    this.sliderTicks = 10;
    this.unionResults = true;
    this.unit = "meters";
    this._translations = undefined;
  }
  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------
  /**
   * Called each time the geometries prop is changed.
   * Buffer each of the geometries.
   *
   */
  geometriesWatchHandler() {
    this._buffer();
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (lifecycle)
  //
  //--------------------------------------------------------------------------
  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   *
   * @returns Promise when complete
   */
  async componentWillLoad() {
    await this._getTranslations();
    await this._initModules();
  }
  /**
   * Renders the component.
   */
  render() {
    return (index.h(index.Host, null, this.appearance === "text" ? this._getTextBoxDisplay() : this._getSliderDisplay()));
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------
  /**
   * Load esri javascript api modules
   *
   * @returns Promise resolving when function is done
   *
   * @protected
   */
  async _initModules() {
    const [geometryEngine] = await loadModules.loadModules([
      "esri/geometry/geometryEngine"
    ]);
    this._geometryEngine = geometryEngine;
  }
  /**
   * Gets the nodes for each of the possible distance units
   *
   * @returns An array of option nodes
   *
   * @protected
   */
  _getUnits() {
    const units = {
      "feet": this._translations.feet,
      "meters": this._translations.meters,
      "miles": this._translations.miles,
      "kilometers": this._translations.kilometers
    };
    return Object.keys(units).map(u => {
      return (index.h("calcite-option", { label: units[u], selected: this.unit === u, value: u }));
    });
  }
  /**
   * Store the user defined distance value and create a buffer
   *
   * @param event the event from the calcite input control
   *
   * @protected
   */
  _setDistance(event) {
    const v = parseInt(event.detail.value, 10);
    if (this.distance !== v && v >= this.min) {
      this.distanceChanged.emit({
        oldValue: this.distance,
        newValue: event.detail.value
      });
      this.distance = v;
      if (this.distance > 0) {
        this._buffer();
      }
      else {
        this.bufferComplete.emit(undefined);
      }
    }
  }
  /**
   * Store the user defined unit value and create a buffer
   *
   * @protected
   */
  _setUnit(unit) {
    this.unitChanged.emit({
      oldValue: this.unit,
      newValue: unit
    });
    this.unit = unit;
    this._buffer();
  }
  /**
   * Create buffer geometry based on the user defined unit and distance
   *
   * @protected
   */
  _buffer() {
    if (this._bufferTimeout) {
      clearTimeout(this._bufferTimeout);
    }
    this._bufferTimeout = setTimeout(() => {
      var _a;
      // needs to be wgs 84 or Web Mercator
      if (((_a = this.geometries) === null || _a === void 0 ? void 0 : _a.length) > 0 && this.unit && this.distance > 0) {
        const buffer = this._geometryEngine.geodesicBuffer(this.geometries, this.distance, this.unit, this.unionResults);
        this.bufferComplete.emit(buffer);
      }
    }, 400);
  }
  /**
   * Render distance and unit as calcite input and select controls
   * This option will be used when the "appearance" prop is set to "text"
   *
   * @returns a node with the supporting controls
   *
   * @protected
   */
  _getTextBoxDisplay() {
    return (index.h("div", { class: "c-container" }, index.h("calcite-input", { class: "padding-end-1", max: this.max && this.max > 0 ? this.max : undefined, min: this.min, "number-button-type": "vertical", onCalciteInputInput: (evt) => this._setDistance(evt), placeholder: "0", type: "number", value: this.distance ? this.distance.toString() : undefined }), index.h("calcite-select", { class: "flex-1", label: "label", onCalciteSelectChange: () => this._setUnit(this._unitElement.value), ref: (el) => { this._unitElement = el; } }, this._getUnits())));
  }
  /**
   * Render distance control as a slider
   * This option will be used when the "appearance" prop is set to "slider"
   *
   * @returns a node with the supporting control
   *
   * @protected
   */
  _getSliderDisplay() {
    return (index.h("div", null, index.h("calcite-slider", { labelHandles: true, max: this.max && this.max > 0 ? this.max : undefined, min: this.min, ticks: this.sliderTicks })));
  }
  /**
   * Fetches the component's translations
   *
   * @returns Promise when complete
   * @protected
   */
  async _getTranslations() {
    const messages = await locale.getLocaleComponentStrings(this.el);
    this._translations = messages[0];
  }
  /** Provides access to protected methods for unit testing.
  *
  *  @param methodName Name of protected method to run
  *  @param arg1 First argument to forward to method, e.g., for "_setDistance", `CustomEvent`
  *  @returns
  */
  _testAccess(methodName, arg1) {
    switch (methodName) {
      case "_setUnit":
        return this._setUnit(arg1);
      case "_setDistance":
        return this._setDistance(arg1);
    }
    return null;
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "geometries": ["geometriesWatchHandler"]
  }; }
};
BufferTools.style = bufferToolsCss;

const radioGroupCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host([disabled]){pointer-events:none;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}:host{display:flex;background-color:var(--calcite-ui-foreground-1);inline-size:-moz-fit-content;inline-size:fit-content;outline:1px solid var(--calcite-ui-border-input);outline-offset:-1px}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}:host([layout=vertical]){flex-direction:column;align-items:flex-start;align-self:flex-start}:host([width=full]){inline-size:100%;min-inline-size:-moz-fit-content;min-inline-size:fit-content}:host([width=full]) ::slotted(calcite-radio-group-item){flex:1 1 auto}:host([width=full][layout=vertical]) ::slotted(calcite-radio-group-item){justify-content:flex-start}::slotted(input[slot=hidden-form-input]){margin:0 !important;opacity:0 !important;outline:none !important;padding:0 !important;position:absolute !important;inset:0 !important;transform:none !important;-webkit-appearance:none !important;z-index:-1 !important}";

const RadioGroup = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.calciteRadioGroupChange = index.createEvent(this, "calciteRadioGroupChange", 6);
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /** Specifies the appearance style of the component. */
    this.appearance = "solid";
    /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
    this.disabled = false;
    /**
     * When `true`, the component must have a value in order for the form to submit.
     *
     * @internal
     */
    this.required = false;
    /** Defines the layout of the component. */
    this.layout = "horizontal";
    /** Specifies the size of the component. */
    this.scale = "m";
    /** The component's `selectedItem` value. */
    this.value = null;
    /** Specifies the width of the component. */
    this.width = "auto";
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    this.handleClick = (event) => {
      if (event.target.localName === "calcite-radio-group-item") {
        this.selectItem(event.target, true);
      }
    };
  }
  valueHandler(value) {
    const items = this.getItems();
    items.forEach((item) => (item.checked = item.value === value));
  }
  handleSelectedItemChange(newItem, oldItem) {
    this.value = newItem === null || newItem === void 0 ? void 0 : newItem.value;
    if (newItem === oldItem) {
      return;
    }
    const items = this.getItems();
    const match = Array.from(items)
      .filter((item) => item === newItem)
      .pop();
    if (match) {
      this.selectItem(match);
    }
    else if (items[0]) {
      items[0].tabIndex = 0;
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  componentWillLoad() {
    const items = this.getItems();
    const lastChecked = Array.from(items)
      .filter((item) => item.checked)
      .pop();
    if (lastChecked) {
      this.selectItem(lastChecked);
    }
    else if (items[0]) {
      items[0].tabIndex = 0;
    }
  }
  componentDidLoad() {
    form.afterConnectDefaultValueSet(this, this.value);
  }
  connectedCallback() {
    label.connectLabel(this);
    form.connectForm(this);
  }
  disconnectedCallback() {
    label.disconnectLabel(this);
    form.disconnectForm(this);
  }
  componentDidRender() {
    interactive.updateHostInteraction(this);
  }
  render() {
    return (index.h(index.Host, { onClick: this.handleClick, role: "radiogroup" }, index.h("slot", null), index.h(form.HiddenFormInputSlot, { component: this })));
  }
  handleSelected(event) {
    event.preventDefault();
    this.selectItem(event.target);
    event.stopPropagation();
  }
  handleKeyDown(event) {
    const keys = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown", " "];
    const { key } = event;
    const { el, selectedItem } = this;
    if (keys.indexOf(key) === -1) {
      return;
    }
    let adjustedKey = key;
    if (dom.getElementDir(el) === "rtl") {
      if (key === "ArrowRight") {
        adjustedKey = "ArrowLeft";
      }
      if (key === "ArrowLeft") {
        adjustedKey = "ArrowRight";
      }
    }
    const items = this.getItems();
    let selectedIndex = -1;
    items.forEach((item, index) => {
      if (item === selectedItem) {
        selectedIndex = index;
      }
    });
    switch (adjustedKey) {
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        const previous = selectedIndex < 1 ? items.item(items.length - 1) : items.item(selectedIndex - 1);
        this.selectItem(previous, true);
        return;
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        const next = selectedIndex === -1 ? items.item(1) : items.item(selectedIndex + 1) || items.item(0);
        this.selectItem(next, true);
        return;
      case " ":
        event.preventDefault();
        this.selectItem(event.target, true);
        return;
      default:
        return;
    }
  }
  // --------------------------------------------------------------------------
  //
  //  Methods
  //
  // --------------------------------------------------------------------------
  /** Sets focus on the component. */
  async setFocus() {
    var _a;
    (_a = (this.selectedItem || this.getItems()[0])) === null || _a === void 0 ? void 0 : _a.focus();
  }
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  onLabelClick() {
    this.setFocus();
  }
  getItems() {
    return this.el.querySelectorAll("calcite-radio-group-item");
  }
  selectItem(selected, emit = false) {
    if (selected === this.selectedItem) {
      return;
    }
    const items = this.getItems();
    let match = null;
    items.forEach((item) => {
      const matches = item.value === selected.value;
      if ((matches && !item.checked) || (!matches && item.checked)) {
        item.checked = matches;
      }
      item.tabIndex = matches ? 0 : -1;
      if (matches) {
        match = item;
        if (emit) {
          this.calciteRadioGroupChange.emit(match.value);
        }
      }
    });
    this.selectedItem = match;
    if (match) {
      match.focus();
    }
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "value": ["valueHandler"],
    "selectedItem": ["handleSelectedItemChange"]
  }; }
};
RadioGroup.style = radioGroupCss;

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */
const SLOTS = {
  input: "input"
};
const CSS$1 = {
  radioGroupItemIcon: "radio-group-item-icon"
};

const radioGroupItemCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host{display:flex;cursor:pointer;align-self:stretch;font-weight:var(--calcite-font-weight-normal);transition:background-color var(--calcite-internal-animation-timing-fast) ease-in-out, border-color var(--calcite-animation-timing) ease-in-out}:host label{pointer-events:none;margin:0.125rem;box-sizing:border-box;display:flex;flex:1 1 0%;align-items:center;color:var(--calcite-ui-text-3);transition:background-color var(--calcite-internal-animation-timing-fast) ease-in-out, border-color var(--calcite-internal-animation-timing-fast) ease-in-out, color var(--calcite-internal-animation-timing-fast) ease-in-out}.label--horizontal{justify-content:center}:host{outline-color:transparent}:host(:focus){outline:2px solid var(--calcite-ui-brand);outline-offset:-1px}.label--scale-s{padding-inline:0.5rem;font-size:var(--calcite-font-size--2);line-height:1rem;padding-block:0.125rem}.label--scale-m{padding-inline:0.75rem;font-size:var(--calcite-font-size--1);line-height:1rem;padding-block:0.375rem}.label--scale-l{padding-inline:1rem;padding-block:0.625rem;font-size:var(--calcite-font-size-0);line-height:1.25rem}:host(:hover) label{background-color:var(--calcite-ui-foreground-2);color:var(--calcite-ui-text-1)}:host(:active) label{background-color:var(--calcite-ui-foreground-3)}:host([checked]) label{cursor:default;border-color:var(--calcite-ui-brand);background-color:var(--calcite-ui-brand);color:var(--calcite-ui-background)}:host([checked]) .label--outline{border-color:var(--calcite-ui-brand);background-color:var(--calcite-ui-foreground-1);box-shadow:inset 0 0 0 1px var(--calcite-ui-brand);color:var(--calcite-ui-brand)}::slotted(input){display:none}@media (forced-colors: active){:host([checked]) label{background-color:highlight}:host([checked]) .label--outline{outline:2px solid transparent;outline-offset:2px}:host([checked]) label:not([class~=label--outline]) .radio-group-item-icon{color:highlightText}}.radio-group-item-icon{position:relative;margin:0px;display:inline-flex;line-height:inherit}:host([icon-position=start]) .label--scale-s .radio-group-item-icon{-webkit-margin-end:0.5rem;margin-inline-end:0.5rem}:host([icon-position=end]) .label--scale-s .radio-group-item-icon{-webkit-margin-end:unset;margin-inline-end:unset;-webkit-margin-start:0.5rem;margin-inline-start:0.5rem}:host([icon-position=start]) .label--scale-m .radio-group-item-icon{-webkit-margin-end:0.75rem;margin-inline-end:0.75rem}:host([icon-position=end]) .label--scale-m .radio-group-item-icon{-webkit-margin-end:unset;margin-inline-end:unset;-webkit-margin-start:0.75rem;margin-inline-start:0.75rem}:host([icon-position=start]) .label--scale-l .radio-group-item-icon{-webkit-margin-end:1rem;margin-inline-end:1rem}:host([icon-position=end]) .label--scale-l .radio-group-item-icon{-webkit-margin-end:unset;margin-inline-end:unset;-webkit-margin-start:1rem;margin-inline-start:1rem}:host([icon-start]) .label--scale-s .radio-group-item-icon{-webkit-margin-end:0.5rem;margin-inline-end:0.5rem}:host([icon-end]) .label--scale-s .radio-group-item-icon{-webkit-margin-start:0.5rem;margin-inline-start:0.5rem}:host([icon-start]) .label--scale-m .radio-group-item-icon{-webkit-margin-end:0.75rem;margin-inline-end:0.75rem}:host([icon-end]) .label--scale-m .radio-group-item-icon{-webkit-margin-start:0.75rem;margin-inline-start:0.75rem}:host([icon-start]) .label--scale-l .radio-group-item-icon{-webkit-margin-end:1rem;margin-inline-end:1rem}:host([icon-end]) .label--scale-l .radio-group-item-icon{-webkit-margin-start:1rem;margin-inline-start:1rem}";

const RadioGroupItem = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.calciteInternalRadioGroupItemChange = index.createEvent(this, "calciteInternalRadioGroupItemChange", 6);
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /** When `true`, the component is checked. */
    this.checked = false;
    /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
    this.iconFlipRtl = false;
    /**
     * Specifies the placement of the icon.
     *
     * @deprecated Use either `iconStart` or `iconEnd` but do not combine them with `icon` and `iconPosition`.
     */
    this.iconPosition = "start";
  }
  handleCheckedChange() {
    this.calciteInternalRadioGroupItemChange.emit();
  }
  render() {
    const { checked, value } = this;
    const scale = dom.getElementProp(this.el, "scale", "m");
    const appearance = dom.getElementProp(this.el, "appearance", "solid");
    const layout = dom.getElementProp(this.el, "layout", "horizontal");
    const iconStartEl = this.iconStart ? (index.h("calcite-icon", { class: CSS$1.radioGroupItemIcon, flipRtl: this.iconFlipRtl, icon: this.iconStart, key: "icon-start", scale: "s" })) : null;
    const iconEndEl = this.iconEnd ? (index.h("calcite-icon", { class: CSS$1.radioGroupItemIcon, flipRtl: this.iconFlipRtl, icon: this.iconEnd, key: "icon-end", scale: "s" })) : null;
    const iconEl = (index.h("calcite-icon", { class: CSS$1.radioGroupItemIcon, flipRtl: this.iconFlipRtl, icon: this.icon, key: "icon", scale: "s" }));
    const iconAtStart = this.icon && this.iconPosition === "start" && !this.iconStart ? iconEl : null;
    const iconAtEnd = this.icon && this.iconPosition === "end" && !this.iconEnd ? iconEl : null;
    return (index.h(index.Host, { "aria-checked": dom.toAriaBoolean(checked), "aria-label": value, role: "radio" }, index.h("label", { class: {
        "label--scale-s": scale === "s",
        "label--scale-m": scale === "m",
        "label--scale-l": scale === "l",
        "label--horizontal": layout === "horizontal",
        "label--outline": appearance === "outline"
      } }, iconAtStart, this.iconStart ? iconStartEl : null, index.h("slot", null, value), index.h("slot", { name: SLOTS.input }), iconAtEnd, this.iconEnd ? iconEndEl : null)));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "checked": ["handleCheckedChange"]
  }; }
};
RadioGroupItem.style = radioGroupItemCss;

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */
const CSS = {
  handleLabel: "handle__label",
  handleLabelMinValue: "handle__label--minValue",
  handleLabelValue: "handle__label--value",
  tickMin: "tick__label--min",
  tickMax: "tick__label--max"
};

const sliderCss = "@charset \"UTF-8\";@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host([disabled]){pointer-events:none;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}.scale--s{--calcite-slider-handle-size:10px;--calcite-slider-handle-extension-height:6.5px;--calcite-slider-container-font-size:var(--calcite-font-size--3)}.scale--s .handle__label,.scale--s .tick__label{line-height:.75rem}.scale--m{--calcite-slider-handle-size:14px;--calcite-slider-handle-extension-height:8px;--calcite-slider-container-font-size:var(--calcite-font-size--2)}.scale--m .handle__label,.scale--m .tick__label{line-height:1rem}.scale--l{--calcite-slider-handle-size:16px;--calcite-slider-handle-extension-height:10.5px;--calcite-slider-container-font-size:var(--calcite-font-size--1)}.scale--l .handle__label,.scale--l .tick__label{line-height:1rem}.handle__label,.tick__label{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-ui-text-2);font-size:var(--calcite-slider-container-font-size)}:host{display:block}.container{position:relative;display:block;overflow-wrap:normal;word-break:normal;padding-inline:calc(var(--calcite-slider-handle-size) * 0.5);padding-block:calc(var(--calcite-slider-handle-size) * 0.5);margin-block:calc(var(--calcite-slider-handle-size) * 0.5);margin-inline:0;--calcite-slider-full-handle-height:calc(\n    var(--calcite-slider-handle-size) + var(--calcite-slider-handle-extension-height)\n  )}:host([disabled]) .track__range,:host([disabled]) .tick--active{background-color:var(--calcite-ui-text-3)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.scale--s .thumb:not(.thumb--precise){--calcite-slider-thumb-y-offset:-6px}.scale--m .thumb:not(.thumb--precise){--calcite-slider-thumb-y-offset:-8px}.scale--l .thumb:not(.thumb--precise){--calcite-slider-thumb-y-offset:-9px}:host([precise]:not([has-histogram])) .container .thumb--value{--calcite-slider-thumb-y-offset:calc(var(--calcite-slider-full-handle-height) * -1)}.thumb-container{position:relative;max-inline-size:100%}.thumb{--calcite-slider-thumb-x-offset:calc(var(--calcite-slider-handle-size) * 0.5);position:absolute;margin:0px;display:flex;cursor:pointer;flex-direction:column;align-items:center;border-style:none;background-color:transparent;padding:0px;font-family:inherit;outline:2px solid transparent;outline-offset:2px;transform:translate(var(--calcite-slider-thumb-x-offset), var(--calcite-slider-thumb-y-offset))}.thumb .handle__label.static,.thumb .handle__label.transformed{position:absolute;inset-block:0px;opacity:0}.thumb .handle__label.hyphen::after{content:\"—\";display:inline-block;inline-size:1em}.thumb .handle__label.hyphen--wrap{display:flex}.thumb .handle{box-sizing:border-box;border-radius:9999px;background-color:var(--calcite-ui-foreground-1);outline-color:transparent;block-size:var(--calcite-slider-handle-size);inline-size:var(--calcite-slider-handle-size);box-shadow:0 0 0 2px var(--calcite-ui-text-3) inset;transition:border var(--calcite-internal-animation-timing-medium) ease, background-color var(--calcite-internal-animation-timing-medium) ease, box-shadow var(--calcite-animation-timing) ease}.thumb .handle-extension{inline-size:0.125rem;block-size:var(--calcite-slider-handle-extension-height);background-color:var(--calcite-ui-text-3)}.thumb:hover .handle{box-shadow:0 0 0 3px var(--calcite-ui-brand) inset}.thumb:hover .handle-extension{background-color:var(--calcite-ui-brand)}.thumb:focus .handle{outline:2px solid var(--calcite-ui-brand);outline-offset:2px}.thumb:focus .handle-extension{background-color:var(--calcite-ui-brand)}.thumb.thumb--minValue{transform:translate(calc(var(--calcite-slider-thumb-x-offset) * -1), var(--calcite-slider-thumb-y-offset))}.thumb.thumb--precise{--calcite-slider-thumb-y-offset:-2px}:host([label-handles]) .thumb{--calcite-slider-thumb-x-offset:50%}:host([label-handles]):host(:not([has-histogram])) .scale--s .thumb:not(.thumb--precise){--calcite-slider-thumb-y-offset:-23px}:host([label-handles]):host(:not([has-histogram])) .scale--m .thumb:not(.thumb--precise){--calcite-slider-thumb-y-offset:-30px}:host([label-handles]):host(:not([has-histogram])) .scale--l .thumb:not(.thumb--precise){--calcite-slider-thumb-y-offset:-32px}:host([has-histogram][label-handles]) .handle__label,:host([label-handles]:not([has-histogram])) .thumb--minValue.thumb--precise .handle__label{-webkit-margin-before:0.5em;margin-block-start:0.5em}:host(:not([has-histogram]):not([precise])) .handle__label,:host([label-handles]:not([has-histogram])) .thumb--value .handle__label{-webkit-margin-after:0.5em;margin-block-end:0.5em}:host([label-handles][precise]):host(:not([has-histogram])) .scale--s .thumb--value{--calcite-slider-thumb-y-offset:-33px}:host([label-handles][precise]):host(:not([has-histogram])) .scale--m .thumb--value{--calcite-slider-thumb-y-offset:-44px}:host([label-handles][precise]):host(:not([has-histogram])) .scale--l .thumb--value{--calcite-slider-thumb-y-offset:-49px}.thumb:focus .handle,.thumb--active .handle{background-color:var(--calcite-ui-brand);box-shadow:0 0 8px 0 rgba(0, 0, 0, 0.16)}.thumb:hover.thumb--precise:after,.thumb:focus.thumb--precise:after,.thumb--active.thumb--precise:after{background-color:var(--calcite-ui-brand)}.track{position:relative;block-size:0.125rem;border-radius:0px;background-color:var(--calcite-ui-border-2);transition:all var(--calcite-internal-animation-timing-medium) ease-in}.track__range{position:absolute;inset-block-start:0px;block-size:0.125rem;background-color:var(--calcite-ui-brand)}.container--range .track__range:hover{cursor:ew-resize}.container--range .track__range:after{position:absolute;inline-size:100%;content:\"\";inset-block-start:calc(var(--calcite-slider-full-handle-height) * 0.5 * -1);block-size:calc(var(--calcite-slider-handle-size) + var(--calcite-slider-handle-extension-height))}@media (forced-colors: active){.thumb{outline-width:0;outline-offset:0}.handle{outline:2px solid transparent;outline-offset:2px}.thumb:focus .handle,.thumb .handle-extension,.thumb:hover .handle-extension,.thumb:focus .handle-extension,.thumb:active .handle-extension{background-color:canvasText}.track{background-color:canvasText}.track__range{background-color:highlight}}.tick{position:absolute;block-size:0.25rem;inline-size:0.125rem;border-width:1px;border-style:solid;background-color:var(--calcite-ui-border-input);border-color:var(--calcite-ui-foreground-1);inset-block-start:-2px;pointer-events:none;-webkit-margin-start:calc(-1 * 0.125rem);margin-inline-start:calc(-1 * 0.125rem)}.tick--active{background-color:var(--calcite-ui-brand)}.tick__label{pointer-events:none;-webkit-margin-before:0.875rem;margin-block-start:0.875rem;display:flex;justify-content:center}.tick__label--min{transition:opacity var(--calcite-animation-timing)}.tick__label--max{transition:opacity var(--calcite-internal-animation-timing-fast)}:host([has-histogram][label-handles]) .tick__label--min,:host([has-histogram][label-handles]) .tick__label--max,:host([has-histogram][precise]) .tick__label--min,:host([has-histogram][precise]) .tick__label--max{font-weight:var(--calcite-font-weight-normal);color:var(--calcite-ui-text-3)}.graph{color:var(--calcite-ui-foreground-3);block-size:48px}:host([label-ticks][ticks]) .container{-webkit-padding-after:calc(0.875rem + var(--calcite-slider-container-font-size));padding-block-end:calc(0.875rem + var(--calcite-slider-container-font-size))}:host([has-histogram]):host([precise][label-handles]) .container{-webkit-padding-after:calc(var(--calcite-slider-full-handle-height) + 1em);padding-block-end:calc(var(--calcite-slider-full-handle-height) + 1em)}:host([has-histogram]):host([label-handles]:not([precise])) .container{-webkit-padding-after:calc(var(--calcite-slider-handle-size) * 0.5 + 1em);padding-block-end:calc(var(--calcite-slider-handle-size) * 0.5 + 1em)}:host([has-histogram]):host([precise]:not([label-handles])) .container{-webkit-padding-after:var(--calcite-slider-full-handle-height);padding-block-end:var(--calcite-slider-full-handle-height)}:host(:not([has-histogram])):host([precise]:not([label-handles])) .container{-webkit-padding-before:var(--calcite-slider-full-handle-height);padding-block-start:var(--calcite-slider-full-handle-height)}:host(:not([has-histogram])):host([precise]:not([label-handles])) .container--range{-webkit-padding-after:var(--calcite-slider-full-handle-height);padding-block-end:var(--calcite-slider-full-handle-height)}:host(:not([has-histogram])):host([label-handles]:not([precise])) .container{-webkit-padding-before:calc(var(--calcite-slider-full-handle-height) + 4px);padding-block-start:calc(var(--calcite-slider-full-handle-height) + 4px)}:host(:not([has-histogram])):host([label-handles][precise]) .container{-webkit-padding-before:calc(var(--calcite-slider-full-handle-height) + var(--calcite-slider-container-font-size) + 4px);padding-block-start:calc(var(--calcite-slider-full-handle-height) + var(--calcite-slider-container-font-size) + 4px)}:host(:not([has-histogram])):host([label-handles][precise]) .container--range{-webkit-padding-after:calc(var(--calcite-slider-full-handle-height) + var(--calcite-slider-container-font-size) + 4px);padding-block-end:calc(var(--calcite-slider-full-handle-height) + var(--calcite-slider-container-font-size) + 4px)}::slotted(input[slot=hidden-form-input]){margin:0 !important;opacity:0 !important;outline:none !important;padding:0 !important;position:absolute !important;inset:0 !important;transform:none !important;-webkit-appearance:none !important;z-index:-1 !important}";

function isRange(value) {
  return Array.isArray(value);
}
const Slider = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.calciteSliderInput = index.createEvent(this, "calciteSliderInput", 6);
    this.calciteSliderChange = index.createEvent(this, "calciteSliderChange", 6);
    this.calciteSliderUpdate = index.createEvent(this, "calciteSliderUpdate", 6);
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
    this.disabled = false;
    /**
     * When `true`, number values are displayed with a group separator corresponding to the language and country format.
     */
    this.groupSeparator = false;
    /** When `true`, indicates a histogram is present. */
    this.hasHistogram = false;
    /** When `true`, displays label handles with their numeric value. */
    this.labelHandles = false;
    /** When `true` and `ticks` is specified, displays label tick marks with their numeric value. */
    this.labelTicks = false;
    /** The component's maximum selectable value. */
    this.max = 100;
    /** The component's minimum selectable value. */
    this.min = 0;
    /**
     * When `true`, the slider will display values from high to low.
     *
     * Note that this value will be ignored if the slider has an associated histogram.
     */
    this.mirrored = false;
    /** When `true`, sets a finer point for handles. */
    this.precise = false;
    /**
     * When `true`, the component must have a value in order for the form to submit.
     */
    this.required = false;
    /** When `true`, enables snap selection in coordination with `step` via a mouse. */
    this.snap = false;
    /** Specifies the interval to move with the up, or down keys. */
    this.step = 1;
    /** The component's value. */
    this.value = 0;
    /**
     *  Specifies the size of the component.
     */
    this.scale = "m";
    this.activeProp = "value";
    this.guid = `calcite-slider-${guid.guid()}`;
    this.effectiveLocale = "";
    this.minMaxValueRange = null;
    this.minValueDragRange = null;
    this.maxValueDragRange = null;
    this.tickValues = [];
    this.dragUpdate = (event) => {
      event.preventDefault();
      if (this.dragProp) {
        const value = this.translate(event.clientX || event.pageX);
        if (isRange(this.value) && this.dragProp === "minMaxValue") {
          if (this.minValueDragRange && this.maxValueDragRange && this.minMaxValueRange) {
            const newMinValue = value - this.minValueDragRange;
            const newMaxValue = value + this.maxValueDragRange;
            if (newMaxValue <= this.max &&
              newMinValue >= this.min &&
              newMaxValue - newMinValue === this.minMaxValueRange) {
              this.setValue({
                minValue: this.clamp(newMinValue, "minValue"),
                maxValue: this.clamp(newMaxValue, "maxValue")
              });
            }
          }
          else {
            this.minValueDragRange = value - this.minValue;
            this.maxValueDragRange = this.maxValue - value;
            this.minMaxValueRange = this.maxValue - this.minValue;
          }
        }
        else {
          this.setValue({ [this.dragProp]: this.clamp(value, this.dragProp) });
        }
      }
    };
    this.pointerUpDragEnd = (event) => {
      if (!dom.isPrimaryPointerButton(event)) {
        return;
      }
      this.dragEnd(event);
    };
    this.dragEnd = (event) => {
      this.removeDragListeners();
      this.focusActiveHandle(event.clientX);
      if (this.lastDragPropValue != this[this.dragProp]) {
        this.emitChange();
      }
      this.dragProp = null;
      this.lastDragPropValue = null;
      this.minValueDragRange = null;
      this.maxValueDragRange = null;
      this.minMaxValueRange = null;
    };
    /**
     * Set the reference of the track Element
     *
     * @internal
     * @param node
     */
    this.storeTrackRef = (node) => {
      this.trackEl = node;
    };
    /**
     * Returns a string representing the localized label value based if the groupSeparator prop is parsed.
     *
     * @param value
     */
    this.determineGroupSeparator = (value) => {
      if (typeof value === "number") {
        locale$1.numberStringFormatter.numberFormatOptions = {
          locale: this.effectiveLocale,
          numberingSystem: this.numberingSystem,
          useGrouping: this.groupSeparator
        };
        return locale$1.numberStringFormatter.localize(value.toString());
      }
    };
  }
  histogramWatcher(newHistogram) {
    this.hasHistogram = !!newHistogram;
  }
  valueHandler() {
    this.setMinMaxFromValue();
  }
  minMaxValueHandler() {
    this.setValueFromMinMax();
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    locale$1.connectLocalized(this);
    this.setMinMaxFromValue();
    this.setValueFromMinMax();
    label.connectLabel(this);
    form.connectForm(this);
  }
  disconnectedCallback() {
    label.disconnectLabel(this);
    form.disconnectForm(this);
    locale$1.disconnectLocalized(this);
    this.removeDragListeners();
  }
  componentWillLoad() {
    this.tickValues = this.generateTickValues();
    if (!isRange(this.value)) {
      this.value = this.clamp(this.value);
    }
    form.afterConnectDefaultValueSet(this, this.value);
    if (this.snap && !isRange(this.value)) {
      this.value = this.getClosestStep(this.value);
    }
    if (this.histogram) {
      this.hasHistogram = true;
    }
  }
  componentDidRender() {
    if (this.labelHandles) {
      this.adjustHostObscuredHandleLabel("value");
      if (isRange(this.value)) {
        this.adjustHostObscuredHandleLabel("minValue");
        if (!(this.precise && !this.hasHistogram)) {
          this.hyphenateCollidingRangeHandleLabels();
        }
      }
    }
    this.hideObscuredBoundingTickLabels();
    interactive.updateHostInteraction(this);
  }
  render() {
    const id = this.el.id || this.guid;
    const maxProp = isRange(this.value) ? "maxValue" : "value";
    const value = isRange(this.value) ? this.maxValue : this.value;
    const displayedValue = this.determineGroupSeparator(value);
    const displayedMinValue = this.determineGroupSeparator(this.minValue);
    const min = this.minValue || this.min;
    const useMinValue = this.shouldUseMinValue();
    const minInterval = this.getUnitInterval(useMinValue ? this.minValue : min) * 100;
    const maxInterval = this.getUnitInterval(value) * 100;
    const mirror = this.shouldMirror();
    const leftThumbOffset = `${mirror ? 100 - minInterval : minInterval}%`;
    const rightThumbOffset = `${mirror ? maxInterval : 100 - maxInterval}%`;
    const valueIsRange = isRange(this.value);
    const handleLabelMinValueClasses = `${CSS.handleLabel} ${CSS.handleLabelMinValue}`;
    const handleLabelValueClasses = `${CSS.handleLabel} ${CSS.handleLabelValue}`;
    const handle = (index.h("div", { "aria-disabled": this.disabled, "aria-label": valueIsRange ? this.maxLabel : this.minLabel, "aria-orientation": "horizontal", "aria-valuemax": this.max, "aria-valuemin": this.min, "aria-valuenow": value, class: {
        thumb: true,
        "thumb--value": true,
        "thumb--active": this.lastDragProp !== "minMaxValue" && this.dragProp === maxProp
      }, onBlur: () => (this.activeProp = null), onFocus: () => (this.activeProp = maxProp), onPointerDown: (event) => this.pointerDownDragStart(event, maxProp), ref: (el) => (this.maxHandle = el), role: "slider", style: { right: rightThumbOffset }, tabIndex: 0 }, index.h("div", { class: "handle" })));
    const labeledHandle = (index.h("div", { "aria-disabled": this.disabled, "aria-label": valueIsRange ? this.maxLabel : this.minLabel, "aria-orientation": "horizontal", "aria-valuemax": this.max, "aria-valuemin": this.min, "aria-valuenow": value, class: {
        thumb: true,
        "thumb--value": true,
        "thumb--active": this.lastDragProp !== "minMaxValue" && this.dragProp === maxProp
      }, onBlur: () => (this.activeProp = null), onFocus: () => (this.activeProp = maxProp), onPointerDown: (event) => this.pointerDownDragStart(event, maxProp), ref: (el) => (this.maxHandle = el), role: "slider", style: { right: rightThumbOffset }, tabIndex: 0 }, index.h("span", { "aria-hidden": "true", class: handleLabelValueClasses }, displayedValue), index.h("span", { "aria-hidden": "true", class: `${handleLabelValueClasses} static` }, displayedValue), index.h("span", { "aria-hidden": "true", class: `${handleLabelValueClasses} transformed` }, displayedValue), index.h("div", { class: "handle" })));
    const histogramLabeledHandle = (index.h("div", { "aria-disabled": this.disabled, "aria-label": valueIsRange ? this.maxLabel : this.minLabel, "aria-orientation": "horizontal", "aria-valuemax": this.max, "aria-valuemin": this.min, "aria-valuenow": value, class: {
        thumb: true,
        "thumb--value": true,
        "thumb--active": this.lastDragProp !== "minMaxValue" && this.dragProp === maxProp
      }, onBlur: () => (this.activeProp = null), onFocus: () => (this.activeProp = maxProp), onPointerDown: (event) => this.pointerDownDragStart(event, maxProp), ref: (el) => (this.maxHandle = el), role: "slider", style: { right: rightThumbOffset }, tabIndex: 0 }, index.h("div", { class: "handle" }), index.h("span", { "aria-hidden": "true", class: handleLabelValueClasses }, displayedValue), index.h("span", { "aria-hidden": "true", class: `${handleLabelValueClasses} static` }, displayedValue), index.h("span", { "aria-hidden": "true", class: `${handleLabelValueClasses} transformed` }, displayedValue)));
    const preciseHandle = (index.h("div", { "aria-disabled": this.disabled, "aria-label": valueIsRange ? this.maxLabel : this.minLabel, "aria-orientation": "horizontal", "aria-valuemax": this.max, "aria-valuemin": this.min, "aria-valuenow": value, class: {
        thumb: true,
        "thumb--value": true,
        "thumb--active": this.lastDragProp !== "minMaxValue" && this.dragProp === maxProp,
        "thumb--precise": true
      }, onBlur: () => (this.activeProp = null), onFocus: () => (this.activeProp = maxProp), onPointerDown: (event) => this.pointerDownDragStart(event, maxProp), ref: (el) => (this.maxHandle = el), role: "slider", style: { right: rightThumbOffset }, tabIndex: 0 }, index.h("div", { class: "handle" }), index.h("div", { class: "handle-extension" })));
    const histogramPreciseHandle = (index.h("div", { "aria-disabled": this.disabled, "aria-label": valueIsRange ? this.maxLabel : this.minLabel, "aria-orientation": "horizontal", "aria-valuemax": this.max, "aria-valuemin": this.min, "aria-valuenow": value, class: {
        thumb: true,
        "thumb--value": true,
        "thumb--active": this.lastDragProp !== "minMaxValue" && this.dragProp === maxProp,
        "thumb--precise": true
      }, onBlur: () => (this.activeProp = null), onFocus: () => (this.activeProp = maxProp), onPointerDown: (event) => this.pointerDownDragStart(event, maxProp), ref: (el) => (this.maxHandle = el), role: "slider", style: { right: rightThumbOffset }, tabIndex: 0 }, index.h("div", { class: "handle-extension" }), index.h("div", { class: "handle" })));
    const labeledPreciseHandle = (index.h("div", { "aria-disabled": this.disabled, "aria-label": valueIsRange ? this.maxLabel : this.minLabel, "aria-orientation": "horizontal", "aria-valuemax": this.max, "aria-valuemin": this.min, "aria-valuenow": value, class: {
        thumb: true,
        "thumb--value": true,
        "thumb--active": this.lastDragProp !== "minMaxValue" && this.dragProp === maxProp,
        "thumb--precise": true
      }, onBlur: () => (this.activeProp = null), onFocus: () => (this.activeProp = maxProp), onPointerDown: (event) => this.pointerDownDragStart(event, maxProp), ref: (el) => (this.maxHandle = el), role: "slider", style: { right: rightThumbOffset }, tabIndex: 0 }, index.h("span", { "aria-hidden": "true", class: handleLabelValueClasses }, displayedValue), index.h("span", { "aria-hidden": "true", class: `${handleLabelValueClasses} static` }, displayedValue), index.h("span", { "aria-hidden": "true", class: `${handleLabelValueClasses} transformed` }, displayedValue), index.h("div", { class: "handle" }), index.h("div", { class: "handle-extension" })));
    const histogramLabeledPreciseHandle = (index.h("div", { "aria-disabled": this.disabled, "aria-label": valueIsRange ? this.maxLabel : this.minLabel, "aria-orientation": "horizontal", "aria-valuemax": this.max, "aria-valuemin": this.min, "aria-valuenow": value, class: {
        thumb: true,
        "thumb--value": true,
        "thumb--active": this.lastDragProp !== "minMaxValue" && this.dragProp === maxProp,
        "thumb--precise": true
      }, onBlur: () => (this.activeProp = null), onFocus: () => (this.activeProp = maxProp), onPointerDown: (event) => this.pointerDownDragStart(event, maxProp), ref: (el) => (this.maxHandle = el), role: "slider", style: { right: rightThumbOffset }, tabIndex: 0 }, index.h("div", { class: "handle-extension" }), index.h("div", { class: "handle" }), index.h("span", { "aria-hidden": "true", class: handleLabelValueClasses }, displayedValue), index.h("span", { "aria-hidden": "true", class: `${handleLabelValueClasses} static` }, displayedValue), index.h("span", { "aria-hidden": "true", class: `${handleLabelValueClasses} transformed` }, displayedValue)));
    const minHandle = (index.h("div", { "aria-disabled": this.disabled, "aria-label": this.minLabel, "aria-orientation": "horizontal", "aria-valuemax": this.max, "aria-valuemin": this.min, "aria-valuenow": this.minValue, class: {
        thumb: true,
        "thumb--minValue": true,
        "thumb--active": this.dragProp === "minValue"
      }, onBlur: () => (this.activeProp = null), onFocus: () => (this.activeProp = "minValue"), onPointerDown: (event) => this.pointerDownDragStart(event, "minValue"), ref: (el) => (this.minHandle = el), role: "slider", style: { left: leftThumbOffset }, tabIndex: 0 }, index.h("div", { class: "handle" })));
    const minLabeledHandle = (index.h("div", { "aria-disabled": this.disabled, "aria-label": this.minLabel, "aria-orientation": "horizontal", "aria-valuemax": this.max, "aria-valuemin": this.min, "aria-valuenow": this.minValue, class: {
        thumb: true,
        "thumb--minValue": true,
        "thumb--active": this.dragProp === "minValue"
      }, onBlur: () => (this.activeProp = null), onFocus: () => (this.activeProp = "minValue"), onPointerDown: (event) => this.pointerDownDragStart(event, "minValue"), ref: (el) => (this.minHandle = el), role: "slider", style: { left: leftThumbOffset }, tabIndex: 0 }, index.h("span", { "aria-hidden": "true", class: handleLabelMinValueClasses }, displayedMinValue), index.h("span", { "aria-hidden": "true", class: `${handleLabelMinValueClasses} static` }, displayedMinValue), index.h("span", { "aria-hidden": "true", class: `${handleLabelMinValueClasses} transformed` }, displayedMinValue), index.h("div", { class: "handle" })));
    const minHistogramLabeledHandle = (index.h("div", { "aria-disabled": this.disabled, "aria-label": this.minLabel, "aria-orientation": "horizontal", "aria-valuemax": this.max, "aria-valuemin": this.min, "aria-valuenow": this.minValue, class: {
        thumb: true,
        "thumb--minValue": true,
        "thumb--active": this.dragProp === "minValue"
      }, onBlur: () => (this.activeProp = null), onFocus: () => (this.activeProp = "minValue"), onPointerDown: (event) => this.pointerDownDragStart(event, "minValue"), ref: (el) => (this.minHandle = el), role: "slider", style: { left: leftThumbOffset }, tabIndex: 0 }, index.h("div", { class: "handle" }), index.h("span", { "aria-hidden": "true", class: handleLabelMinValueClasses }, displayedMinValue), index.h("span", { "aria-hidden": "true", class: `${handleLabelMinValueClasses} static` }, displayedMinValue), index.h("span", { "aria-hidden": "true", class: `${handleLabelMinValueClasses} transformed` }, displayedMinValue)));
    const minPreciseHandle = (index.h("div", { "aria-disabled": this.disabled, "aria-label": this.minLabel, "aria-orientation": "horizontal", "aria-valuemax": this.max, "aria-valuemin": this.min, "aria-valuenow": this.minValue, class: {
        thumb: true,
        "thumb--minValue": true,
        "thumb--active": this.dragProp === "minValue",
        "thumb--precise": true
      }, onBlur: () => (this.activeProp = null), onFocus: () => (this.activeProp = "minValue"), onPointerDown: (event) => this.pointerDownDragStart(event, "minValue"), ref: (el) => (this.minHandle = el), role: "slider", style: { left: leftThumbOffset }, tabIndex: 0 }, index.h("div", { class: "handle-extension" }), index.h("div", { class: "handle" })));
    const minLabeledPreciseHandle = (index.h("div", { "aria-disabled": this.disabled, "aria-label": this.minLabel, "aria-orientation": "horizontal", "aria-valuemax": this.max, "aria-valuemin": this.min, "aria-valuenow": this.minValue, class: {
        thumb: true,
        "thumb--minValue": true,
        "thumb--active": this.dragProp === "minValue",
        "thumb--precise": true
      }, onBlur: () => (this.activeProp = null), onFocus: () => (this.activeProp = "minValue"), onPointerDown: (event) => this.pointerDownDragStart(event, "minValue"), ref: (el) => (this.minHandle = el), role: "slider", style: { left: leftThumbOffset }, tabIndex: 0 }, index.h("div", { class: "handle-extension" }), index.h("div", { class: "handle" }), index.h("span", { "aria-hidden": "true", class: handleLabelMinValueClasses }, displayedMinValue), index.h("span", { "aria-hidden": "true", class: `${handleLabelMinValueClasses} static` }, displayedMinValue), index.h("span", { "aria-hidden": "true", class: `${handleLabelMinValueClasses} transformed` }, displayedMinValue)));
    return (index.h(index.Host, { id: id, onTouchStart: this.handleTouchStart }, index.h("div", { class: {
        ["container"]: true,
        ["container--range"]: valueIsRange,
        [`scale--${this.scale}`]: true
      } }, this.renderGraph(), index.h("div", { class: "track", ref: this.storeTrackRef }, index.h("div", { class: "track__range", onPointerDown: (event) => this.pointerDownDragStart(event, "minMaxValue"), style: {
        left: `${mirror ? 100 - maxInterval : minInterval}%`,
        right: `${mirror ? minInterval : 100 - maxInterval}%`
      } }), index.h("div", { class: "ticks" }, this.tickValues.map((tick) => {
      const tickOffset = `${this.getUnitInterval(tick) * 100}%`;
      let activeTicks = tick >= min && tick <= value;
      if (useMinValue) {
        activeTicks = tick >= this.minValue && tick <= this.maxValue;
      }
      return (index.h("span", { class: {
          tick: true,
          "tick--active": activeTicks
        }, style: {
          left: mirror ? "" : tickOffset,
          right: mirror ? tickOffset : ""
        } }, this.renderTickLabel(tick)));
    }))), index.h("div", { class: "thumb-container" }, !this.precise && !this.labelHandles && valueIsRange && minHandle, !this.hasHistogram &&
      !this.precise &&
      this.labelHandles &&
      valueIsRange &&
      minLabeledHandle, this.precise && !this.labelHandles && valueIsRange && minPreciseHandle, this.precise && this.labelHandles && valueIsRange && minLabeledPreciseHandle, this.hasHistogram &&
      !this.precise &&
      this.labelHandles &&
      valueIsRange &&
      minHistogramLabeledHandle, !this.precise && !this.labelHandles && handle, !this.hasHistogram && !this.precise && this.labelHandles && labeledHandle, !this.hasHistogram && this.precise && !this.labelHandles && preciseHandle, this.hasHistogram && this.precise && !this.labelHandles && histogramPreciseHandle, !this.hasHistogram && this.precise && this.labelHandles && labeledPreciseHandle, this.hasHistogram && !this.precise && this.labelHandles && histogramLabeledHandle, this.hasHistogram &&
      this.precise &&
      this.labelHandles &&
      histogramLabeledPreciseHandle, index.h(form.HiddenFormInputSlot, { component: this })))));
  }
  renderGraph() {
    return this.histogram ? (index.h("calcite-graph", { class: "graph", colorStops: this.histogramStops, data: this.histogram, highlightMax: isRange(this.value) ? this.maxValue : this.value, highlightMin: isRange(this.value) ? this.minValue : this.min, max: this.max, min: this.min })) : null;
  }
  renderTickLabel(tick) {
    const valueIsRange = isRange(this.value);
    const isMinTickLabel = tick === this.min;
    const isMaxTickLabel = tick === this.max;
    const displayedTickValue = this.determineGroupSeparator(tick);
    const tickLabel = (index.h("span", { class: {
        tick__label: true,
        [CSS.tickMin]: isMinTickLabel,
        [CSS.tickMax]: isMaxTickLabel
      } }, displayedTickValue));
    if (this.labelTicks && !this.hasHistogram && !valueIsRange) {
      return tickLabel;
    }
    if (this.labelTicks &&
      !this.hasHistogram &&
      valueIsRange &&
      !this.precise &&
      !this.labelHandles) {
      return tickLabel;
    }
    if (this.labelTicks &&
      !this.hasHistogram &&
      valueIsRange &&
      !this.precise &&
      this.labelHandles) {
      return tickLabel;
    }
    if (this.labelTicks &&
      !this.hasHistogram &&
      valueIsRange &&
      this.precise &&
      (isMinTickLabel || isMaxTickLabel)) {
      return tickLabel;
    }
    if (this.labelTicks && this.hasHistogram && !this.precise && !this.labelHandles) {
      return tickLabel;
    }
    if (this.labelTicks &&
      this.hasHistogram &&
      this.precise &&
      !this.labelHandles &&
      (isMinTickLabel || isMaxTickLabel)) {
      return tickLabel;
    }
    if (this.labelTicks &&
      this.hasHistogram &&
      !this.precise &&
      this.labelHandles &&
      (isMinTickLabel || isMaxTickLabel)) {
      return tickLabel;
    }
    if (this.labelTicks &&
      this.hasHistogram &&
      this.precise &&
      this.labelHandles &&
      (isMinTickLabel || isMaxTickLabel)) {
      return tickLabel;
    }
    return null;
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  keyDownHandler(event) {
    const mirror = this.shouldMirror();
    const { activeProp, max, min, pageStep, step } = this;
    const value = this[activeProp];
    const { key: key$1 } = event;
    if (key.isActivationKey(key$1)) {
      event.preventDefault();
      return;
    }
    let adjustment;
    if (key$1 === "ArrowUp" || key$1 === "ArrowRight") {
      const directionFactor = mirror && key$1 === "ArrowRight" ? -1 : 1;
      adjustment = value + step * directionFactor;
    }
    else if (key$1 === "ArrowDown" || key$1 === "ArrowLeft") {
      const directionFactor = mirror && key$1 === "ArrowLeft" ? -1 : 1;
      adjustment = value - step * directionFactor;
    }
    else if (key$1 === "PageUp") {
      if (pageStep) {
        adjustment = value + pageStep;
      }
    }
    else if (key$1 === "PageDown") {
      if (pageStep) {
        adjustment = value - pageStep;
      }
    }
    else if (key$1 === "Home") {
      adjustment = min;
    }
    else if (key$1 === "End") {
      adjustment = max;
    }
    if (isNaN(adjustment)) {
      return;
    }
    event.preventDefault();
    const fixedDecimalAdjustment = Number(adjustment.toFixed(math.decimalPlaces(step)));
    this.setValue({
      [activeProp]: this.clamp(fixedDecimalAdjustment, activeProp)
    });
  }
  pointerDownHandler(event) {
    if (!dom.isPrimaryPointerButton(event)) {
      return;
    }
    const x = event.clientX || event.pageX;
    const position = this.translate(x);
    let prop = "value";
    if (isRange(this.value)) {
      const inRange = position >= this.minValue && position <= this.maxValue;
      if (inRange && this.lastDragProp === "minMaxValue") {
        prop = "minMaxValue";
      }
      else {
        const closerToMax = Math.abs(this.maxValue - position) < Math.abs(this.minValue - position);
        prop = closerToMax || position > this.maxValue ? "maxValue" : "minValue";
      }
    }
    this.lastDragPropValue = this[prop];
    this.dragStart(prop);
    const isThumbActive = this.el.shadowRoot.querySelector(".thumb:active");
    if (!isThumbActive) {
      this.setValue({ [prop]: this.clamp(position, prop) });
    }
    this.focusActiveHandle(x);
  }
  handleTouchStart(event) {
    // needed to prevent extra click at the end of a handle drag
    event.preventDefault();
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  /** Sets focus on the component. */
  async setFocus() {
    const handle = this.minHandle ? this.minHandle : this.maxHandle;
    handle === null || handle === void 0 ? void 0 : handle.focus();
  }
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  setValueFromMinMax() {
    const { minValue, maxValue } = this;
    if (typeof minValue === "number" && typeof maxValue === "number") {
      this.value = [minValue, maxValue];
    }
  }
  setMinMaxFromValue() {
    const { value } = this;
    if (isRange(value)) {
      this.minValue = value[0];
      this.maxValue = value[1];
    }
  }
  onLabelClick() {
    this.setFocus();
  }
  shouldMirror() {
    return this.mirrored && !this.hasHistogram;
  }
  shouldUseMinValue() {
    if (!isRange(this.value)) {
      return false;
    }
    return ((this.hasHistogram && this.maxValue === 0) || (!this.hasHistogram && this.minValue === 0));
  }
  generateTickValues() {
    const ticks = [];
    let current = this.min;
    while (this.ticks && current < this.max + this.ticks) {
      ticks.push(Math.min(current, this.max));
      current = current + this.ticks;
    }
    return ticks;
  }
  pointerDownDragStart(event, prop) {
    if (!dom.isPrimaryPointerButton(event)) {
      return;
    }
    this.dragStart(prop);
  }
  dragStart(prop) {
    this.dragProp = prop;
    this.lastDragProp = this.dragProp;
    this.activeProp = prop;
    document.addEventListener("pointermove", this.dragUpdate);
    document.addEventListener("pointerup", this.pointerUpDragEnd);
    document.addEventListener("pointercancel", this.dragEnd);
  }
  focusActiveHandle(valueX) {
    switch (this.dragProp) {
      case "minValue":
        this.minHandle.focus();
        break;
      case "maxValue":
      case "value":
        this.maxHandle.focus();
        break;
      case "minMaxValue":
        this.getClosestHandle(valueX).focus();
        break;
    }
  }
  emitInput() {
    this.calciteSliderInput.emit();
    this.calciteSliderUpdate.emit();
  }
  emitChange() {
    this.calciteSliderChange.emit();
  }
  removeDragListeners() {
    document.removeEventListener("pointermove", this.dragUpdate);
    document.removeEventListener("pointerup", this.pointerUpDragEnd);
    document.removeEventListener("pointercancel", this.dragEnd);
  }
  /**
   * Set prop value(s) if changed at the component level
   *
   * @param {object} values - a set of key/value pairs delineating what properties in the component to update
   */
  setValue(values) {
    let valueChanged;
    Object.keys(values).forEach((propName) => {
      const newValue = values[propName];
      if (!valueChanged) {
        const oldValue = this[propName];
        valueChanged = oldValue !== newValue;
      }
      this[propName] = newValue;
    });
    if (!valueChanged) {
      return;
    }
    const dragging = this.dragProp;
    if (!dragging) {
      this.emitChange();
    }
    this.emitInput();
  }
  /**
   * If number is outside range, constrain to min or max
   *
   * @param value
   * @param prop
   * @internal
   */
  clamp(value, prop) {
    value = math.clamp(value, this.min, this.max);
    // ensure that maxValue and minValue don't swap positions
    if (prop === "maxValue") {
      value = Math.max(value, this.minValue);
    }
    if (prop === "minValue") {
      value = Math.min(value, this.maxValue);
    }
    return value;
  }
  /**
   * Translate a pixel position to value along the range
   *
   * @param x
   * @internal
   */
  translate(x) {
    const range = this.max - this.min;
    const { left, width } = this.trackEl.getBoundingClientRect();
    const percent = (x - left) / width;
    const mirror = this.shouldMirror();
    const clampedValue = this.clamp(this.min + range * (mirror ? 1 - percent : percent));
    let value = Number(clampedValue.toFixed(math.decimalPlaces(this.step)));
    if (this.snap && this.step) {
      value = this.getClosestStep(value);
    }
    return value;
  }
  /**
   * Get closest allowed value along stepped values
   *
   * @param num
   * @internal
   */
  getClosestStep(num) {
    num = Number(this.clamp(num).toFixed(math.decimalPlaces(this.step)));
    if (this.step) {
      const step = Math.round(num / this.step) * this.step;
      num = Number(this.clamp(step).toFixed(math.decimalPlaces(this.step)));
    }
    return num;
  }
  getClosestHandle(valueX) {
    return this.getDistanceX(this.maxHandle, valueX) > this.getDistanceX(this.minHandle, valueX)
      ? this.minHandle
      : this.maxHandle;
  }
  getDistanceX(el, valueX) {
    return Math.abs(el.getBoundingClientRect().left - valueX);
  }
  getFontSizeForElement(element) {
    return Number(window.getComputedStyle(element).getPropertyValue("font-size").match(/\d+/)[0]);
  }
  /**
   * Get position of value along range as fractional value
   *
   * @param num
   * @return {number} number in the unit interval [0,1]
   * @internal
   */
  getUnitInterval(num) {
    num = this.clamp(num);
    const range = this.max - this.min;
    return (num - this.min) / range;
  }
  adjustHostObscuredHandleLabel(name) {
    const label = this.el.shadowRoot.querySelector(`.handle__label--${name}`);
    const labelStatic = this.el.shadowRoot.querySelector(`.handle__label--${name}.static`);
    const labelTransformed = this.el.shadowRoot.querySelector(`.handle__label--${name}.transformed`);
    const labelStaticBounds = labelStatic.getBoundingClientRect();
    const labelStaticOffset = this.getHostOffset(labelStaticBounds.left, labelStaticBounds.right);
    label.style.transform = `translateX(${labelStaticOffset}px)`;
    labelTransformed.style.transform = `translateX(${labelStaticOffset}px)`;
  }
  hyphenateCollidingRangeHandleLabels() {
    const { shadowRoot } = this.el;
    const mirror = this.shouldMirror();
    const leftModifier = mirror ? "value" : "minValue";
    const rightModifier = mirror ? "minValue" : "value";
    const leftValueLabel = shadowRoot.querySelector(`.handle__label--${leftModifier}`);
    const leftValueLabelStatic = shadowRoot.querySelector(`.handle__label--${leftModifier}.static`);
    const leftValueLabelTransformed = shadowRoot.querySelector(`.handle__label--${leftModifier}.transformed`);
    const leftValueLabelStaticHostOffset = this.getHostOffset(leftValueLabelStatic.getBoundingClientRect().left, leftValueLabelStatic.getBoundingClientRect().right);
    const rightValueLabel = shadowRoot.querySelector(`.handle__label--${rightModifier}`);
    const rightValueLabelStatic = shadowRoot.querySelector(`.handle__label--${rightModifier}.static`);
    const rightValueLabelTransformed = shadowRoot.querySelector(`.handle__label--${rightModifier}.transformed`);
    const rightValueLabelStaticHostOffset = this.getHostOffset(rightValueLabelStatic.getBoundingClientRect().left, rightValueLabelStatic.getBoundingClientRect().right);
    const labelFontSize = this.getFontSizeForElement(leftValueLabel);
    const labelTransformedOverlap = this.getRangeLabelOverlap(leftValueLabelTransformed, rightValueLabelTransformed);
    const hyphenLabel = leftValueLabel;
    const labelOffset = labelFontSize / 2;
    if (labelTransformedOverlap > 0) {
      hyphenLabel.classList.add("hyphen", "hyphen--wrap");
      if (rightValueLabelStaticHostOffset === 0 && leftValueLabelStaticHostOffset === 0) {
        // Neither handle overlaps the host boundary
        let leftValueLabelTranslate = labelTransformedOverlap / 2 - labelOffset;
        leftValueLabelTranslate =
          Math.sign(leftValueLabelTranslate) === -1
            ? Math.abs(leftValueLabelTranslate)
            : -leftValueLabelTranslate;
        const leftValueLabelTransformedHostOffset = this.getHostOffset(leftValueLabelTransformed.getBoundingClientRect().left +
          leftValueLabelTranslate -
          labelOffset, leftValueLabelTransformed.getBoundingClientRect().right +
          leftValueLabelTranslate -
          labelOffset);
        let rightValueLabelTranslate = labelTransformedOverlap / 2;
        const rightValueLabelTransformedHostOffset = this.getHostOffset(rightValueLabelTransformed.getBoundingClientRect().left + rightValueLabelTranslate, rightValueLabelTransformed.getBoundingClientRect().right + rightValueLabelTranslate);
        if (leftValueLabelTransformedHostOffset !== 0) {
          leftValueLabelTranslate += leftValueLabelTransformedHostOffset;
          rightValueLabelTranslate += leftValueLabelTransformedHostOffset;
        }
        if (rightValueLabelTransformedHostOffset !== 0) {
          leftValueLabelTranslate += rightValueLabelTransformedHostOffset;
          rightValueLabelTranslate += rightValueLabelTransformedHostOffset;
        }
        leftValueLabel.style.transform = `translateX(${leftValueLabelTranslate}px)`;
        leftValueLabelTransformed.style.transform = `translateX(${leftValueLabelTranslate - labelOffset}px)`;
        rightValueLabel.style.transform = `translateX(${rightValueLabelTranslate}px)`;
        rightValueLabelTransformed.style.transform = `translateX(${rightValueLabelTranslate}px)`;
      }
      else if (leftValueLabelStaticHostOffset > 0 || rightValueLabelStaticHostOffset > 0) {
        // labels overlap host boundary on the left side
        leftValueLabel.style.transform = `translateX(${leftValueLabelStaticHostOffset + labelOffset}px)`;
        rightValueLabel.style.transform = `translateX(${labelTransformedOverlap + rightValueLabelStaticHostOffset}px)`;
        rightValueLabelTransformed.style.transform = `translateX(${labelTransformedOverlap + rightValueLabelStaticHostOffset}px)`;
      }
      else if (leftValueLabelStaticHostOffset < 0 || rightValueLabelStaticHostOffset < 0) {
        // labels overlap host boundary on the right side
        let leftValueLabelTranslate = Math.abs(leftValueLabelStaticHostOffset) + labelTransformedOverlap - labelOffset;
        leftValueLabelTranslate =
          Math.sign(leftValueLabelTranslate) === -1
            ? Math.abs(leftValueLabelTranslate)
            : -leftValueLabelTranslate;
        leftValueLabel.style.transform = `translateX(${leftValueLabelTranslate}px)`;
        leftValueLabelTransformed.style.transform = `translateX(${leftValueLabelTranslate - labelOffset}px)`;
      }
    }
    else {
      hyphenLabel.classList.remove("hyphen", "hyphen--wrap");
      leftValueLabel.style.transform = `translateX(${leftValueLabelStaticHostOffset}px)`;
      leftValueLabelTransformed.style.transform = `translateX(${leftValueLabelStaticHostOffset}px)`;
      rightValueLabel.style.transform = `translateX(${rightValueLabelStaticHostOffset}px)`;
      rightValueLabelTransformed.style.transform = `translateX(${rightValueLabelStaticHostOffset}px)`;
    }
  }
  /**
   * Hides bounding tick labels that are obscured by either handle.
   */
  hideObscuredBoundingTickLabels() {
    const valueIsRange = isRange(this.value);
    if (!this.hasHistogram && !valueIsRange && !this.labelHandles && !this.precise) {
      return;
    }
    if (!this.hasHistogram && !valueIsRange && this.labelHandles && !this.precise) {
      return;
    }
    if (!this.hasHistogram && !valueIsRange && !this.labelHandles && this.precise) {
      return;
    }
    if (!this.hasHistogram && !valueIsRange && this.labelHandles && this.precise) {
      return;
    }
    if (!this.hasHistogram && valueIsRange && !this.precise) {
      return;
    }
    if (this.hasHistogram && !this.precise && !this.labelHandles) {
      return;
    }
    const minHandle = this.el.shadowRoot.querySelector(".thumb--minValue");
    const maxHandle = this.el.shadowRoot.querySelector(".thumb--value");
    const minTickLabel = this.el.shadowRoot.querySelector(".tick__label--min");
    const maxTickLabel = this.el.shadowRoot.querySelector(".tick__label--max");
    if (!minHandle && maxHandle && minTickLabel && maxTickLabel) {
      minTickLabel.style.opacity = this.isMinTickLabelObscured(minTickLabel, maxHandle) ? "0" : "1";
      maxTickLabel.style.opacity = this.isMaxTickLabelObscured(maxTickLabel, maxHandle) ? "0" : "1";
    }
    if (minHandle && maxHandle && minTickLabel && maxTickLabel) {
      minTickLabel.style.opacity =
        this.isMinTickLabelObscured(minTickLabel, minHandle) ||
          this.isMinTickLabelObscured(minTickLabel, maxHandle)
          ? "0"
          : "1";
      maxTickLabel.style.opacity =
        this.isMaxTickLabelObscured(maxTickLabel, minHandle) ||
          (this.isMaxTickLabelObscured(maxTickLabel, maxHandle) && this.hasHistogram)
          ? "0"
          : "1";
    }
  }
  /**
   * Returns an integer representing the number of pixels to offset on the left or right side based on desired position behavior.
   *
   * @param leftBounds
   * @param rightBounds
   * @internal
   */
  getHostOffset(leftBounds, rightBounds) {
    const hostBounds = this.el.getBoundingClientRect();
    const buffer = 7;
    if (leftBounds + buffer < hostBounds.left) {
      return hostBounds.left - leftBounds - buffer;
    }
    if (rightBounds - buffer > hostBounds.right) {
      return -(rightBounds - hostBounds.right) + buffer;
    }
    return 0;
  }
  /**
   * Returns an integer representing the number of pixels that the two given span elements are overlapping, taking into account
   * a space in between the two spans equal to the font-size set on them to account for the space needed to render a hyphen.
   *
   * @param leftLabel
   * @param rightLabel
   */
  getRangeLabelOverlap(leftLabel, rightLabel) {
    const leftLabelBounds = leftLabel.getBoundingClientRect();
    const rightLabelBounds = rightLabel.getBoundingClientRect();
    const leftLabelFontSize = this.getFontSizeForElement(leftLabel);
    const rangeLabelOverlap = leftLabelBounds.right + leftLabelFontSize - rightLabelBounds.left;
    return Math.max(rangeLabelOverlap, 0);
  }
  /**
   * Returns a boolean value representing if the minLabel span element is obscured (being overlapped) by the given handle div element.
   *
   * @param minLabel
   * @param handle
   */
  isMinTickLabelObscured(minLabel, handle) {
    const minLabelBounds = minLabel.getBoundingClientRect();
    const handleBounds = handle.getBoundingClientRect();
    return dom.intersects(minLabelBounds, handleBounds);
  }
  /**
   * Returns a boolean value representing if the maxLabel span element is obscured (being overlapped) by the given handle div element.
   *
   * @param maxLabel
   * @param handle
   */
  isMaxTickLabelObscured(maxLabel, handle) {
    const maxLabelBounds = maxLabel.getBoundingClientRect();
    const handleBounds = handle.getBoundingClientRect();
    return dom.intersects(maxLabelBounds, handleBounds);
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "histogram": ["histogramWatcher"],
    "value": ["valueHandler"],
    "minValue": ["minMaxValueHandler"],
    "maxValue": ["minMaxValueHandler"]
  }; }
};
Slider.style = sliderCss;

const mapDrawToolsCss = ":host{display:block}.border{outline:1px solid var(--calcite-ui-border-input)}";

const MapDrawTools = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.sketchGraphicsChange = index.createEvent(this, "sketchGraphicsChange", 7);
    this.active = false;
    this.border = false;
    this.mapView = undefined;
    this.pointSymbol = undefined;
    this.polylineSymbol = undefined;
    this.polygonSymbol = undefined;
    this.graphics = [];
    this._translations = undefined;
  }
  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------
  /**
   * Called each time the graphics prop is changed.
   *
   */
  graphicsWatchHandler(v, oldV) {
    if (v && v.length > 0 && JSON.stringify(v) !== JSON.stringify(oldV) && this._sketchGraphicsLayer) {
      this._sketchGraphicsLayer.removeAll();
      this._sketchGraphicsLayer.addMany(v);
    }
  }
  /**
   * Called each time the mapView prop is changed.
   *
   */
  mapViewWatchHandler(v, oldV) {
    if (v && v !== oldV) {
      this._init();
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Methods (public)
  //
  //--------------------------------------------------------------------------
  /**
   * Clears the user drawn graphics
   *
   * @returns Promise that resolves when the operation is complete
   */
  async clear() {
    this._clearSketch();
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (lifecycle)
  //
  //--------------------------------------------------------------------------
  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   *
   * @returns Promise when complete
   */
  async componentWillLoad() {
    await this._getTranslations();
    await this._initModules();
  }
  /**
   * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
   *
   * @returns Promise when complete
   */
  componentDidLoad() {
    this._init();
  }
  /**
   * Renders the component.
   */
  render() {
    const drawClass = this.border ? "border" : "";
    return (index.h(index.Host, null, index.h("div", { class: drawClass }, index.h("div", { ref: (el) => { this._sketchElement = el; } }))));
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------
  /**
   * Load esri javascript api modules
   *
   * @returns Promise resolving when function is done
   *
   * @protected
   */
  async _initModules() {
    const [GraphicsLayer, Sketch] = await loadModules.loadModules([
      "esri/layers/GraphicsLayer",
      "esri/widgets/Sketch"
    ]);
    this.GraphicsLayer = GraphicsLayer;
    this.Sketch = Sketch;
  }
  /**
   * Initialize the graphics layer and the tools that support creating new graphics
   *
   * @protected
   */
  _init() {
    if (this.mapView && this._sketchElement) {
      this._initGraphicsLayer();
      this._initDrawTools();
    }
  }
  /**
   * Create or find the graphics layer and add any existing graphics
   *
   * @protected
   */
  _initGraphicsLayer() {
    const title = this._translations.sketchLayer;
    const sketchIndex = this.mapView.map.layers.findIndex((l) => l.title === title);
    if (sketchIndex > -1) {
      this._sketchGraphicsLayer = this.mapView.map.layers.getItemAt(sketchIndex);
    }
    else {
      this._sketchGraphicsLayer = new this.GraphicsLayer({ title });
      publicNotificationStore.state.managedLayers.push(title);
      this.mapView.map.layers.add(this._sketchGraphicsLayer);
    }
    if (this.graphics && this.graphics.length > 0) {
      this._sketchGraphicsLayer.addMany(this.graphics);
    }
  }
  /**
   * Initialize the skecth widget and store the associated symbols for each geometry type
   *
   * @protected
   */
  _initDrawTools() {
    this._sketchWidget = new this.Sketch({
      layer: this._sketchGraphicsLayer,
      view: this.mapView,
      container: this._sketchElement,
      creationMode: "single",
      defaultCreateOptions: {
        "mode": "hybrid"
      }
    });
    this._sketchWidget.viewModel.polylineSymbol = this.polylineSymbol;
    this._sketchWidget.viewModel.pointSymbol = this.pointSymbol;
    this._sketchWidget.viewModel.polygonSymbol = this.polygonSymbol;
    this._sketchWidget.visibleElements = {
      selectionTools: {
        "lasso-selection": false,
        "rectangle-selection": false
      }, createTools: {
        "circle": false
      },
      undoRedoMenu: false
    };
    this._sketchWidget.on("update", (evt) => {
      if (evt.state === "active") {
        clearTimeout(this._selectionTimer);
        this._selectionTimer = setTimeout(() => {
          this.graphics = evt.graphics;
          this.sketchGraphicsChange.emit(this.graphics);
        }, 500);
      }
    });
    this._sketchWidget.on("delete", () => {
      this.graphics = [];
      this.sketchGraphicsChange.emit(this.graphics);
    });
    this._sketchWidget.on("undo", (evt) => {
      this.graphics = evt.graphics;
      this.sketchGraphicsChange.emit(this.graphics);
    });
    this._sketchWidget.on("redo", (evt) => {
      this.graphics = evt.graphics;
      this.sketchGraphicsChange.emit(this.graphics);
    });
    this._sketchWidget.on("create", (evt) => {
      if (evt.state === "complete") {
        this.graphics = [evt.graphic];
        this.sketchGraphicsChange.emit(this.graphics);
      }
    });
  }
  /**
   * Clear any stored graphics and remove all graphics from the graphics layer
   *
   * @protected
   */
  _clearSketch() {
    var _a;
    this.graphics = [];
    (_a = this._sketchGraphicsLayer) === null || _a === void 0 ? void 0 : _a.removeAll();
  }
  /**
   * Fetches the component's translations
   *
   * @protected
   */
  async _getTranslations() {
    const translations = await locale.getLocaleComponentStrings(this.el);
    this._translations = translations[0];
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "graphics": ["graphicsWatchHandler"],
    "mapView": ["mapViewWatchHandler"]
  }; }
};
MapDrawTools.style = mapDrawToolsCss;

const refineSelectionToolsCss = ":host{display:block}.div-visible{display:inherit}.div-not-visible{display:none !important}.padding-top-1-2{padding-top:.5rem}.main-label{display:flex;float:left}html[dir=\"rtl\"] .main-label{display:flex;float:right}.border{outline:1px solid var(--calcite-ui-border-input)}.margin-top-1{margin-top:1rem}.esri-sketch{display:flex;flex-flow:column wrap}.esri-widget{box-sizing:border-box;color:#323232;font-size:14px;font-family:\"Avenir Next\",\"Helvetica Neue\",Helvetica,Arial,sans-serif;line-height:1.3em;background-color:var(--calcite-ui-foreground-1)}.esri-sketch__panel{align-items:center;display:flex;flex-flow:row nowrap;padding:0}*/ .esri-sketch__tool-section{border-right:1px solid rgba(110,110,110,.3)}.esri-sketch__section{align-items:center;display:flex;flex-flow:row nowrap;padding:0 7px;margin:6px 0;border-right:1px solid rgba(110,110,110,.3)}";

const RefineSelectionTools = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.selectionLoadingChange = index.createEvent(this, "selectionLoadingChange", 7);
    this.refineSelectionGraphicsChange = index.createEvent(this, "refineSelectionGraphicsChange", 7);
    this.refineSelectionIdsChange = index.createEvent(this, "refineSelectionIdsChange", 7);
    /**
     * {<layer id>: Graphic[]}: Collection of graphics returned from queries to the layer
     */
    this._featuresCollection = {};
    this.active = false;
    this.border = false;
    this.enabledLayerIds = [];
    this.graphics = undefined;
    this.ids = [];
    this.layerView = undefined;
    this.layerViews = [];
    this.mapView = undefined;
    this.mode = undefined;
    this.refineMode = undefined;
    this.refineSelectionSet = undefined;
    this.useLayerPicker = true;
    this._selectEnabled = false;
    this._selectionMode = undefined;
    this._translations = undefined;
  }
  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------
  /**
   * Called each time the ids prop is changed.
   * Highlight the features based on the provided ids
   */
  idsWatchHandler(v, oldV) {
    if (v && JSON.stringify(v) !== JSON.stringify(oldV)) {
      void this._highlightFeatures(v);
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Methods (public)
  //
  //--------------------------------------------------------------------------
  /**
   * Reset the ids collection
   *
   * @returns Promise when complete
   */
  async reset() {
    this.ids = [];
  }
  /**
   * Clear current highlight handle
   *
   * @returns Promise when complete
   */
  async clearHighlight() {
    this._clearHighlight();
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
    await this._initModules();
  }
  /**
   * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
   */
  componentDidLoad() {
    this._init();
  }
  /**
   * StencilJS: Called every time the component is disconnected from the DOM, ie,
   * it can be dispatched more than once, DO not confuse with a "onDestroy" kind of event.
   */
  disconnectedCallback() {
    this.active = false;
  }
  /**
   * Called every time the component is connected to the DOM.
   * When the component is first connected, this method is called before componentWillLoad.
   */
  connectedCallback() {
    this.active = true;
    if (this.ids.length > 0) {
      this._selectEnabled = true;
      void this._highlightFeatures(this.ids);
    }
  }
  /**
   * Renders the component.
   */
  render() {
    var _a, _b;
    const showLayerPickerClass = this.useLayerPicker ? "div-visible" : "div-not-visible";
    const drawClass = this.border ? " border" : "";
    const showUndoRedo = this.refineMode === interfaces.ERefineMode.ALL ? "div-visible" : "div-not-visible";
    return (index.h(index.Host, null, index.h("div", null, index.h("map-layer-picker", { class: showLayerPickerClass, enabledLayerIds: this.enabledLayerIds, mapView: this.mapView, onLayerSelectionChange: (evt) => { void this._layerSelectionChange(evt); }, selectedLayerIds: this.layerViews.map(l => l.layer.id), selectionMode: "single" }), index.h("div", { class: "margin-top-1" + drawClass }, index.h("div", { class: "esri-sketch esri-widget" }, index.h("div", { class: "esri-sketch__panel" }, index.h("div", { class: "esri-sketch__tool-section esri-sketch__section" }, index.h("calcite-action", { disabled: !this._selectEnabled, icon: "pin", onClick: () => this._setSelectionMode(interfaces.ESelectionType.POINT), scale: "s", text: this._translations.select }), index.h("calcite-action", { disabled: !this._selectEnabled, icon: "line", onClick: () => this._setSelectionMode(interfaces.ESelectionType.LINE), scale: "s", text: this._translations.selectLine }), index.h("calcite-action", { disabled: !this._selectEnabled, icon: "polygon", onClick: () => this._setSelectionMode(interfaces.ESelectionType.POLY), scale: "s", text: this._translations.selectPolygon }), index.h("calcite-action", { disabled: !this._selectEnabled, icon: "rectangle", onClick: () => this._setSelectionMode(interfaces.ESelectionType.RECT), scale: "s", text: this._translations.selectRectangle })), index.h("div", { class: showUndoRedo + " esri-sketch__tool-section esri-sketch__section" }, index.h("calcite-action", { disabled: ((_a = this.refineSelectionSet) === null || _a === void 0 ? void 0 : _a.undoStack) ? this.refineSelectionSet.undoStack.length === 0 : true, icon: "undo", onClick: () => this._undo(), scale: "s", text: this._translations.undo }), index.h("calcite-action", { disabled: ((_b = this.refineSelectionSet) === null || _b === void 0 ? void 0 : _b.redoStack) ? this.refineSelectionSet.redoStack.length === 0 : true, icon: "redo", onClick: () => this._redo(), scale: "s", text: this._translations.redo }))))))));
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------
  /**
   * Initialize the graphics layer and skecth view model
   *
   * @returns Promise when the operation has completed
   * @protected
   */
  _init() {
    this._initGraphicsLayer();
    this._initSketchViewModel();
  }
  /**
   * Load esri javascript api modules
   *
   * @returns Promise resolving when function is done
   *
   * @protected
   */
  async _initModules() {
    const [GraphicsLayer, SketchViewModel] = await loadModules.loadModules([
      "esri/layers/GraphicsLayer",
      "esri/widgets/Sketch/SketchViewModel"
    ]);
    this.GraphicsLayer = GraphicsLayer;
    this.SketchViewModel = SketchViewModel;
  }
  /**
   * Initialize the skecth view model
   *
   * @returns Promise when the operation has completed
   * @protected
   */
  _initSketchViewModel() {
    this._sketchViewModel = new this.SketchViewModel({
      layer: this._sketchGraphicsLayer,
      defaultUpdateOptions: {
        tool: "reshape",
        toggleToolOnClick: false
      },
      view: this.mapView
    });
    this._sketchViewModel.on("create", (event) => {
      if (event.state === "complete" && this.active) {
        this._featuresCollection = {};
        this._sketchGeometry = event.graphic.geometry;
        void this._selectFeatures(this._sketchGeometry);
      }
    });
  }
  /**
   * Clear any skecth graphics
   *
   * @returns Promise when the operation has completed
   * @protected
   */
  _clear() {
    this._sketchGeometry = null;
    this._sketchViewModel.cancel();
    this._sketchGraphicsLayer.removeAll();
  }
  /**
   * Initialize the graphics layer
   *
   * @returns Promise when the operation has completed
   * @protected
   */
  _initGraphicsLayer() {
    const title = this._translations.sketchLayer;
    const sketchIndex = this.mapView.map.layers.findIndex((l) => l.title === title);
    if (sketchIndex > -1) {
      this._sketchGraphicsLayer = this.mapView.map.layers.getItemAt(sketchIndex);
    }
    else {
      this._sketchGraphicsLayer = new this.GraphicsLayer({ title });
      publicNotificationStore.state.managedLayers.push(title);
      this.mapView.map.layers.add(this._sketchGraphicsLayer);
    }
    if (this.graphics && this.graphics.length > 0) {
      this._sketchGraphicsLayer.addMany(this.graphics);
    }
  }
  /**
   * Clear selection based on map click
   *
   * @protected
   */
  _initHitTest() {
    if (this._hitTestHandle) {
      this._hitTestHandle.remove();
    }
    this._hitTestHandle = this.mapView.on("click", (event) => {
      event.stopPropagation();
      const opts = {
        include: this.layerViews.map(lv => lv.layer)
      };
      void this.mapView.hitTest(event, opts).then((response) => {
        let graphics = [];
        if (response.results.length > 0) {
          graphics = response.results.reduce((prev, cur) => {
            const g = cur === null || cur === void 0 ? void 0 : cur.graphic;
            if (g) {
              prev.push(g);
            }
            return prev;
          }, []);
        }
        this.refineSelectionGraphicsChange.emit({ graphics, useOIDs: false });
        this._clear();
      });
    });
  }
  /**
   * Gets the layer views from the map when the layer selection changes
   *
   * @returns Promise resolving when function is done
   *
   * @protected
   */
  async _layerSelectionChange(evt) {
    if (Array.isArray(evt.detail) && evt.detail.length > 0) {
      this._selectEnabled = true;
      const layerPromises = evt.detail.map(id => {
        return mapViewUtils.getMapLayerView(this.mapView, id);
      });
      return Promise.all(layerPromises).then((layerViews) => {
        this.layerViews = layerViews;
      });
    }
    else {
      this._selectEnabled = false;
    }
  }
  /**
   * Store the current selection mode
   *
   * @protected
   */
  _setSelectionMode(mode) {
    this._selectionMode = mode;
    if (this._hitTestHandle) {
      this._hitTestHandle.remove();
    }
    switch (this._selectionMode) {
      case interfaces.ESelectionType.POINT:
        this._sketchViewModel.create("point");
        //this._initHitTest();
        break;
      case interfaces.ESelectionType.LINE:
        this._sketchViewModel.create("polyline");
        break;
      case interfaces.ESelectionType.POLY:
        this._sketchViewModel.create("polygon");
        break;
      case interfaces.ESelectionType.RECT:
        this._sketchViewModel.create("rectangle");
        break;
    }
  }
  /**
   * Select features based on the input geometry
   *
   * @param geom the geometry used for selection
   *
   * @returns Promise resolving when function is done
   *
   * @protected
   */
  async _selectFeatures(geom) {
    this.selectionLoadingChange.emit(true);
    const queryFeaturePromises = this.layerViews.map(layerView => {
      this._featuresCollection[layerView.layer.id] = [];
      return mapViewUtils.queryFeaturesByGeometry(0, layerView.layer, geom, this._featuresCollection);
    });
    return Promise.all(queryFeaturePromises).then(async (response) => {
      this.selectionLoadingChange.emit(false);
      let graphics = [];
      response.forEach(r => {
        Object.keys(r).forEach(k => {
          graphics = graphics.concat(r[k]);
        });
      });
      if (this.refineMode === interfaces.ERefineMode.SUBSET) {
        this.refineSelectionGraphicsChange.emit({
          graphics,
          useOIDs: this.layerViews[0].layer.title === this.layerView.layer.title
        });
      }
      else {
        const oids = Array.isArray(graphics) ? graphics.map(g => { var _a; return g.attributes[(_a = g === null || g === void 0 ? void 0 : g.layer) === null || _a === void 0 ? void 0 : _a.objectIdField]; }) : [];
        await this._updateIds(oids, this.mode, this.refineSelectionSet.undoStack, this.mode);
      }
      this._clear();
    });
  }
  /**
   * Highlight any selected features in the map
   *
   * @returns Promise resolving when function is done
   * @protected
   */
  async _highlightFeatures(ids, updateExtent = false) {
    this._clearHighlight();
    if (ids.length > 0) {
      publicNotificationStore.state.highlightHandle = await mapViewUtils.highlightFeatures(ids, this.layerViews[0], this.mapView, updateExtent);
    }
  }
  /**
   * Clear any highlighted features in the map
   *
   * @protected
   */
  _clearHighlight() {
    var _a;
    (_a = publicNotificationStore.state.highlightHandle) === null || _a === void 0 ? void 0 : _a.remove();
  }
  /**
   * Update the ids for any ADD or REMOVE operation and highlight the features.
   *
   * @param oids the ids to add or remove
   * @param mode ADD or REMOVE this will control if the ids are added or removed
   * @param operationStack the undo or redo stack to push the operation to
   * @param operationMode ADD or REMOVE the mode of the individual refine operation
   *
   * @returns Promise resolving when function is done
   *
   * @protected
   */
  async _updateIds(oids, mode, operationStack, operationMode) {
    const idUpdates = { addIds: [], removeIds: [] };
    if (mode === interfaces.ESelectionMode.ADD) {
      idUpdates.addIds = oids.filter(id => this.ids.indexOf(id) < 0);
      this.ids = [...this.ids, ...idUpdates.addIds];
      if (idUpdates.addIds.length > 0) {
        operationStack.push({ mode: operationMode, ids: idUpdates.addIds });
      }
    }
    else {
      idUpdates.removeIds = oids.filter(id => this.ids.indexOf(id) > -1);
      this.ids = this.ids.filter(id => idUpdates.removeIds.indexOf(id) < 0);
      if (idUpdates.removeIds.length > 0) {
        operationStack.push({ mode: operationMode, ids: idUpdates.removeIds });
      }
    }
    await this._highlightFeatures(this.ids).then(() => {
      this.refineSelectionIdsChange.emit(idUpdates);
    });
  }
  /**
   * Undo the most current ADD or REMOVE operation
   *
   * @returns Promise resolving when function is done
   *
   * @protected
   */
  _undo() {
    const undoOp = this.refineSelectionSet.undoStack.pop();
    void this._updateIds(undoOp.ids, undoOp.mode === interfaces.ESelectionMode.ADD ? interfaces.ESelectionMode.REMOVE : interfaces.ESelectionMode.ADD, this.refineSelectionSet.redoStack, undoOp.mode);
  }
  /**
   * Redo the most current ADD or REMOVE operation
   *
   * @returns Promise resolving when function is done
   *
   * @protected
   */
  _redo() {
    const redoOp = this.refineSelectionSet.redoStack.pop();
    void this._updateIds(redoOp.ids, redoOp.mode, this.refineSelectionSet.undoStack, redoOp.mode);
  }
  /**
   * Fetches the component's translations
   *
   * @protected
   */
  async _getTranslations() {
    const translations = await locale.getLocaleComponentStrings(this.el);
    this._translations = translations[0];
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "ids": ["idsWatchHandler"]
  }; }
};
RefineSelectionTools.style = refineSelectionToolsCss;

exports.buffer_tools = BufferTools;
exports.calcite_radio_group = RadioGroup;
exports.calcite_radio_group_item = RadioGroupItem;
exports.calcite_slider = Slider;
exports.map_draw_tools = MapDrawTools;
exports.refine_selection_tools = RefineSelectionTools;
