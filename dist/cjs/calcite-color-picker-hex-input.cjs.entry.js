/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index$1 = require('./index-c6979cbb.js');
const utils = require('./utils-120bbbeb.js');
const index = require('./index-7af21b6f.js');
const dom = require('./dom-4a580af6.js');
const resources = require('./resources-aa19bf8c.js');
require('./_commonjsHelpers-6aafa5de.js');
require('./resources-b56bce71.js');
require('./guid-84ac4d91.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */
const CSS = {
  container: "container",
  preview: "preview",
  input: "input"
};

const colorPickerHexInputCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host{display:block}.container{display:inline-grid;inline-size:100%;align-items:center;grid-template-columns:1fr auto}.preview{grid-column:2/3;pointer-events:none;margin-block:0px;margin-inline:0.25rem;display:flex;align-items:center}.preview,.input{grid-row:1}.input{grid-column:1/3;inline-size:100%;text-transform:uppercase}";

const DEFAULT_COLOR = index.color();
const ColorPickerHexInput = class {
  constructor(hostRef) {
    index$1.registerInstance(this, hostRef);
    this.calciteColorPickerHexInputChange = index$1.createEvent(this, "calciteColorPickerHexInputChange", 6);
    //--------------------------------------------------------------------------
    //
    //  Public Properties
    //
    //--------------------------------------------------------------------------
    /**
     * When `false`, an empty color (`null`) will be allowed as a `value`. Otherwise, a color value is enforced on the component.
     *
     * When `true`, a color value is enforced, and clearing the input or blurring will restore the last valid `value`. When `false`, an empty color (`null`) will be allowed as a `value`.
     */
    this.allowEmpty = false;
    /**
     * Accessible name for the Hex input.
     *
     * @default "Hex"
     */
    this.intlHex = resources.TEXT.hex;
    /**
     * Accessible name for the Hex input when there is no color selected.
     *
     * @default "No color"
     */
    this.intlNoColor = resources.TEXT.noColor;
    /** Specifies the size of the component. */
    this.scale = "m";
    /**
     * The Hex value.
     */
    this.value = utils.normalizeHex(DEFAULT_COLOR.hex());
    this.onCalciteInternalInputBlur = () => {
      const node = this.inputNode;
      const inputValue = node.value;
      const hex = `#${inputValue}`;
      const willClearValue = this.allowEmpty && !inputValue;
      if (willClearValue || (utils.isValidHex(hex) && utils.isLonghandHex(hex))) {
        return;
      }
      // manipulating DOM directly since rerender doesn't update input value
      node.value =
        this.allowEmpty && !this.internalColor
          ? ""
          : this.formatForInternalInput(utils.rgbToHex(this.internalColor.object()));
    };
    this.onInputChange = () => {
      this.internalSetValue(this.inputNode.value, this.value);
    };
    /**
     * The last valid/selected color. Used as a fallback if an invalid hex code is entered.
     */
    this.internalColor = DEFAULT_COLOR;
    this.previousNonNullValue = this.value;
    this.storeInputRef = (node) => {
      this.inputNode = node;
    };
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    const { allowEmpty, value } = this;
    if (value) {
      const normalized = utils.normalizeHex(value);
      if (utils.isValidHex(normalized)) {
        this.internalSetValue(normalized, normalized, false);
      }
      return;
    }
    if (allowEmpty) {
      this.internalSetValue(null, null, false);
    }
  }
  handleValueChange(value, oldValue) {
    this.internalSetValue(value, oldValue, false);
  }
  // using @Listen as a workaround for VDOM listener not firing
  onInputKeyDown(event) {
    const { altKey, ctrlKey, metaKey, shiftKey } = event;
    const { internalColor, value } = this;
    const { key } = event;
    if (key === "Tab" || key === "Enter") {
      this.onInputChange();
      return;
    }
    const isNudgeKey = key === "ArrowDown" || key === "ArrowUp";
    const oldValue = this.value;
    if (isNudgeKey) {
      if (!value) {
        this.internalSetValue(this.previousNonNullValue, oldValue);
        event.preventDefault();
        return;
      }
      const direction = key === "ArrowUp" ? 1 : -1;
      const bump = shiftKey ? 10 : 1;
      this.internalSetValue(utils.normalizeHex(this.nudgeRGBChannels(internalColor, bump * direction).hex()), oldValue);
      event.preventDefault();
      return;
    }
    const withModifiers = altKey || ctrlKey || metaKey;
    const singleChar = key.length === 1;
    const validHexChar = utils.hexChar.test(key);
    if (singleChar && !withModifiers && !validHexChar) {
      event.preventDefault();
    }
  }
  onPaste(event) {
    const hex = event.clipboardData.getData("text");
    if (utils.isValidHex(hex)) {
      event.preventDefault();
      this.inputNode.value = hex.slice(1);
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  render() {
    const { intlHex, value } = this;
    const hexInputValue = this.formatForInternalInput(value);
    return (index$1.h("div", { class: CSS.container }, index$1.h("calcite-input", { class: CSS.input, label: intlHex, maxLength: 6, numberingSystem: this.numberingSystem, onCalciteInputChange: this.onInputChange, onCalciteInternalInputBlur: this.onCalciteInternalInputBlur, onKeyDown: this.handleKeyDown, onPaste: this.onPaste, prefixText: "#", ref: this.storeInputRef, scale: this.scale, value: hexInputValue }), hexInputValue ? (index$1.h("calcite-color-picker-swatch", { active: true, class: CSS.preview, color: `#${hexInputValue}`, scale: this.scale })) : null));
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  /** Sets focus on the component. */
  async setFocus() {
    dom.focusElement(this.inputNode);
  }
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  internalSetValue(value, oldValue, emit = true) {
    if (value) {
      const normalized = utils.normalizeHex(value);
      if (utils.isValidHex(normalized)) {
        const { internalColor } = this;
        const changed = !internalColor || normalized !== utils.normalizeHex(internalColor.hex());
        this.internalColor = index.color(normalized);
        this.previousNonNullValue = normalized;
        this.value = normalized;
        if (changed && emit) {
          this.calciteColorPickerHexInputChange.emit();
        }
        return;
      }
    }
    else if (this.allowEmpty) {
      this.internalColor = null;
      this.value = null;
      if (emit) {
        this.calciteColorPickerHexInputChange.emit();
      }
      return;
    }
    this.value = oldValue;
  }
  formatForInternalInput(hex) {
    return hex ? hex.replace("#", "") : "";
  }
  nudgeRGBChannels(color, amount) {
    return index.color.rgb(color.array().map((channel) => channel + amount));
  }
  handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  }
  get el() { return index$1.getElement(this); }
  static get watchers() { return {
    "value": ["handleValueChange"]
  }; }
};
ColorPickerHexInput.style = colorPickerHexInputCss;

exports.calcite_color_picker_hex_input = ColorPickerHexInput;
