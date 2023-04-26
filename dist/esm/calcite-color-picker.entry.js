/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, g as getElement } from './index-d298aca9.js';
import { c as color } from './index-9fdcb8d3.js';
import { i as isPrimaryPointerButton, b as getElementDir } from './dom-0fc13266.js';
import { n as normalizeHex, C as CSSColorMode, p as parseMode, c as colorEqual } from './utils-0b3e94fe.js';
import { u as updateHostInteraction } from './interactive-b1987dfd.js';
import { i as isActivationKey } from './key-218d8d4d.js';
import { c as componentLoaded, s as setUpLoadableComponent, a as setComponentLoaded } from './loadable-e6dce690.js';
import { c as connectLocalized, d as disconnectLocalized } from './locale-aabc8f45.js';
import { c as clamp } from './math-37b6afea.js';
import { u as updateMessages, s as setUpMessages, c as connectMessages, d as disconnectMessages } from './t9n-a539118a.js';
import { t as throttle } from './throttle-26fa347b.js';
import './_commonjsHelpers-d5f9d613.js';
import './guid-2069664e.js';
import './resources-e83f65b3.js';
import './observers-81c91acd.js';
import './debounce-4c884e5c.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.2.0
 */
const CSS = {
  container: "container",
  controlSection: "control-section",
  hexOptions: "color-hex-options",
  section: "section",
  header: "header",
  control: "control",
  splitSection: "section--split",
  colorModeContainer: "color-mode-container",
  colorMode: "color-mode",
  channels: "channels",
  channel: "channel",
  savedColors: "saved-colors",
  savedColorsSection: "saved-colors-section",
  saveColor: "save-color",
  deleteColor: "delete-color",
  savedColorsButtons: "saved-colors-buttons",
  headerHex: "header--hex",
  colorFieldAndSlider: "color-field-and-slider",
  colorFieldAndSliderInteractive: "color-field-and-slider--interactive",
  colorFieldAndSliderWrap: "color-field-and-slider-wrap",
  scope: "scope",
  hueScope: "scope--hue",
  colorFieldScope: "scope--color-field",
  savedColor: "saved-color"
};
const DEFAULT_COLOR = color("#007AC2");
const DEFAULT_STORAGE_KEY_PREFIX = "calcite-color-";
const RGB_LIMITS = {
  r: 255,
  g: 255,
  b: 255
};
const HSV_LIMITS = {
  h: 360,
  s: 100,
  v: 100
};
const DIMENSIONS = {
  s: {
    slider: {
      height: 10,
      width: 160
    },
    colorField: {
      height: 80,
      width: 160
    },
    thumb: {
      radius: 8
    }
  },
  m: {
    slider: {
      height: 14,
      width: 272
    },
    colorField: {
      height: 150,
      width: 272
    },
    thumb: {
      radius: 10
    }
  },
  l: {
    slider: {
      height: 16,
      width: 464
    },
    colorField: {
      height: 200,
      width: 464
    },
    thumb: {
      radius: 12
    }
  }
};

const colorPickerCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing);--calcite-floating-ui-z-index:600}:host([hidden]){display:none}:host([disabled]){pointer-events:none;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}:host{display:inline-block;font-size:var(--calcite-font-size--2);line-height:1rem;font-weight:var(--calcite-font-weight-normal)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}:host([scale=s]) .container{inline-size:160px}:host([scale=s]) .saved-colors{grid-template-columns:repeat(auto-fill, minmax(20px, 1fr))}:host([scale=s]) .channels{flex-direction:column}:host([scale=s]) .channel{inline-size:100%;-webkit-margin-after:4px;margin-block-end:4px}:host([scale=s]) .channel:last-child{-webkit-margin-after:0;margin-block-end:0}:host([scale=m]) .container{inline-size:272px}:host([scale=l]) .header{-webkit-padding-after:0px;padding-block-end:0px}:host([scale=l]){font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=l]) .container{inline-size:464px}:host([scale=l]) .color-field-and-slider{-webkit-margin-after:-20px;margin-block-end:-20px}:host([scale=l]) .section{padding-block:0 16px;padding-inline:16px}:host([scale=l]) .section:first-of-type{-webkit-padding-before:16px;padding-block-start:16px}:host([scale=l]) .saved-colors{grid-template-columns:repeat(auto-fill, minmax(28px, 1fr));grid-gap:12px;-webkit-padding-before:16px;padding-block-start:16px}:host([scale=l]) .control-section{flex-wrap:nowrap;align-items:baseline}:host([scale=l]) .control-section>:nth-child(2){-webkit-margin-start:12px;margin-inline-start:12px}:host([scale=l]) .color-hex-options{display:flex;flex-shrink:1;flex-direction:column;justify-content:space-around;min-block-size:98px;inline-size:160px}:host([scale=l]) .color-mode-container{flex-shrink:3}.container{background-color:var(--calcite-ui-foreground-1);display:inline-block;border:1px solid var(--calcite-ui-border-1)}.color-field-and-slider-wrap{position:relative}.scope{pointer-events:none;position:absolute;font-size:var(--calcite-font-size--1);outline-color:transparent;outline-offset:14px}.scope:focus{outline:2px solid var(--calcite-ui-brand);outline-offset:16px}.color-field-and-slider{-webkit-margin-after:-16px;margin-block-end:-16px;touch-action:none}.color-field-and-slider--interactive{cursor:pointer}.control-section{display:flex;flex-direction:row;flex-wrap:wrap}.section{padding-block:0 12px;padding-inline:12px}.section:first-of-type{-webkit-padding-before:12px;padding-block-start:12px}.color-hex-options,.section--split{flex-grow:1}.header{display:flex;align-items:center;justify-content:space-between;-webkit-padding-after:0.25rem;padding-block-end:0.25rem;color:var(--calcite-ui-text-1)}.header--hex,.color-mode-container{-webkit-padding-before:12px;padding-block-start:12px}.channels{display:flex;justify-content:space-between}.channel{inline-size:31%}.saved-colors{-webkit-padding-before:12px;padding-block-start:12px;display:grid;grid-template-columns:repeat(auto-fill, minmax(24px, 1fr));grid-gap:8px;inline-size:100%}.saved-colors-buttons{display:flex}.saved-color{outline-offset:0;outline-color:transparent;cursor:pointer}.saved-color:focus{outline:2px solid var(--calcite-ui-brand);outline-offset:2px}.saved-color:hover{transition:outline-color var(--calcite-internal-animation-timing-fast) ease-in-out;outline:2px solid var(--calcite-ui-border-2);outline-offset:2px}";

const throttleFor60FpsInMs = 16;
const defaultValue = normalizeHex(DEFAULT_COLOR.hex());
const defaultFormat = "auto";
const ColorPicker = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteColorPickerChange = createEvent(this, "calciteColorPickerChange", 6);
    this.calciteColorPickerInput = createEvent(this, "calciteColorPickerInput", 6);
    this.colorFieldAndSliderHovered = false;
    this.hueThumbState = "idle";
    this.internalColorUpdateContext = null;
    this.mode = CSSColorMode.HEX;
    this.shiftKeyChannelAdjustment = 0;
    this.sliderThumbState = "idle";
    this.handleTabActivate = (event) => {
      this.channelMode = event.currentTarget.getAttribute("data-color-mode");
      this.updateChannelsFromColor(this.color);
    };
    this.handleColorFieldScopeKeyDown = (event) => {
      const { key } = event;
      const arrowKeyToXYOffset = {
        ArrowUp: { x: 0, y: -10 },
        ArrowRight: { x: 10, y: 0 },
        ArrowDown: { x: 0, y: 10 },
        ArrowLeft: { x: -10, y: 0 }
      };
      if (arrowKeyToXYOffset[key]) {
        event.preventDefault();
        this.scopeOrientation = key === "ArrowDown" || key === "ArrowUp" ? "vertical" : "horizontal";
        this.captureColorFieldColor(this.colorFieldScopeLeft + arrowKeyToXYOffset[key].x || 0, this.colorFieldScopeTop + arrowKeyToXYOffset[key].y || 0, false);
      }
    };
    this.handleHueScopeKeyDown = (event) => {
      const modifier = event.shiftKey ? 10 : 1;
      const { key } = event;
      const arrowKeyToXOffset = {
        ArrowUp: 1,
        ArrowRight: 1,
        ArrowDown: -1,
        ArrowLeft: -1
      };
      if (arrowKeyToXOffset[key]) {
        event.preventDefault();
        const delta = arrowKeyToXOffset[key] * modifier;
        const hue = this.baseColorFieldColor.hue();
        const color = this.baseColorFieldColor.hue(hue + delta);
        this.internalColorSet(color, false);
      }
    };
    this.handleHexInputChange = (event) => {
      event.stopPropagation();
      const { allowEmpty, color: color$1 } = this;
      const input = event.target;
      const hex = input.value;
      if (allowEmpty && !hex) {
        this.internalColorSet(null);
        return;
      }
      const normalizedHex = color$1 && normalizeHex(color$1.hex());
      if (hex !== normalizedHex) {
        this.internalColorSet(color(hex));
      }
    };
    this.handleSavedColorSelect = (event) => {
      const swatch = event.currentTarget;
      this.internalColorSet(color(swatch.color));
    };
    this.handleChannelInput = (event) => {
      const input = event.currentTarget;
      const channelIndex = Number(input.getAttribute("data-channel-index"));
      const limit = this.channelMode === "rgb"
        ? RGB_LIMITS[Object.keys(RGB_LIMITS)[channelIndex]]
        : HSV_LIMITS[Object.keys(HSV_LIMITS)[channelIndex]];
      let inputValue;
      if (this.allowEmpty && !input.value) {
        inputValue = "";
      }
      else {
        const value = Number(input.value) + this.shiftKeyChannelAdjustment;
        const clamped = clamp(value, 0, limit);
        inputValue = clamped.toString();
      }
      input.value = inputValue;
      // TODO: refactor calcite-input so we don't need to sync the internals
      // https://github.com/Esri/calcite-components/issues/6100
      input.internalSyncChildElValue();
    };
    this.handleChannelChange = (event) => {
      const input = event.currentTarget;
      const channelIndex = Number(input.getAttribute("data-channel-index"));
      const channels = [...this.channels];
      const shouldClearChannels = this.allowEmpty && !input.value;
      if (shouldClearChannels) {
        this.channels = [null, null, null];
        this.internalColorSet(null);
        return;
      }
      channels[channelIndex] = Number(input.value);
      this.updateColorFromChannels(channels);
    };
    this.handleSavedColorKeyDown = (event) => {
      if (isActivationKey(event.key)) {
        event.preventDefault();
        this.handleSavedColorSelect(event);
      }
    };
    this.handleColorFieldAndSliderPointerLeave = () => {
      this.colorFieldAndSliderInteractive = false;
      this.colorFieldAndSliderHovered = false;
      if (this.sliderThumbState !== "drag" && this.hueThumbState !== "drag") {
        this.hueThumbState = "idle";
        this.sliderThumbState = "idle";
        this.drawColorFieldAndSlider();
      }
    };
    this.handleColorFieldAndSliderPointerDown = (event) => {
      var _a, _b;
      if (!isPrimaryPointerButton(event)) {
        return;
      }
      const { offsetX, offsetY } = event;
      const region = this.getCanvasRegion(offsetY);
      if (region === "color-field") {
        this.hueThumbState = "drag";
        this.captureColorFieldColor(offsetX, offsetY);
        (_a = this.colorFieldScopeNode) === null || _a === void 0 ? void 0 : _a.focus();
      }
      else if (region === "slider") {
        this.sliderThumbState = "drag";
        this.captureHueSliderColor(offsetX);
        (_b = this.hueScopeNode) === null || _b === void 0 ? void 0 : _b.focus();
      }
      // prevent text selection outside of color field & slider area
      event.preventDefault();
      document.addEventListener("pointermove", this.globalPointerMoveHandler);
      document.addEventListener("pointerup", this.globalPointerUpHandler, { once: true });
      this.activeColorFieldAndSliderRect =
        this.fieldAndSliderRenderingContext.canvas.getBoundingClientRect();
    };
    this.globalPointerUpHandler = (event) => {
      if (!isPrimaryPointerButton(event)) {
        return;
      }
      const previouslyDragging = this.sliderThumbState === "drag" || this.hueThumbState === "drag";
      this.hueThumbState = "idle";
      this.sliderThumbState = "idle";
      this.activeColorFieldAndSliderRect = null;
      this.drawColorFieldAndSlider();
      if (previouslyDragging) {
        this.calciteColorPickerChange.emit();
      }
    };
    this.globalPointerMoveHandler = (event) => {
      const { el, dimensions } = this;
      const sliderThumbDragging = this.sliderThumbState === "drag";
      const hueThumbDragging = this.hueThumbState === "drag";
      if (!el.isConnected || (!sliderThumbDragging && !hueThumbDragging)) {
        return;
      }
      let samplingX;
      let samplingY;
      const colorFieldAndSliderRect = this.activeColorFieldAndSliderRect;
      const { clientX, clientY } = event;
      if (this.colorFieldAndSliderHovered) {
        samplingX = clientX - colorFieldAndSliderRect.x;
        samplingY = clientY - colorFieldAndSliderRect.y;
      }
      else {
        const colorFieldWidth = dimensions.colorField.width;
        const colorFieldHeight = dimensions.colorField.height;
        const hueSliderHeight = dimensions.slider.height;
        if (clientX < colorFieldAndSliderRect.x + colorFieldWidth &&
          clientX > colorFieldAndSliderRect.x) {
          samplingX = clientX - colorFieldAndSliderRect.x;
        }
        else if (clientX < colorFieldAndSliderRect.x) {
          samplingX = 0;
        }
        else {
          samplingX = colorFieldWidth - 1;
        }
        if (clientY < colorFieldAndSliderRect.y + colorFieldHeight + hueSliderHeight &&
          clientY > colorFieldAndSliderRect.y) {
          samplingY = clientY - colorFieldAndSliderRect.y;
        }
        else if (clientY < colorFieldAndSliderRect.y) {
          samplingY = 0;
        }
        else {
          samplingY = colorFieldHeight + hueSliderHeight;
        }
      }
      if (hueThumbDragging) {
        this.captureColorFieldColor(samplingX, samplingY, false);
      }
      else {
        this.captureHueSliderColor(samplingX);
      }
    };
    this.handleColorFieldAndSliderPointerEnterOrMove = ({ offsetX, offsetY }) => {
      const { dimensions: { colorField, slider, thumb } } = this;
      this.colorFieldAndSliderInteractive = offsetY <= colorField.height + slider.height;
      this.colorFieldAndSliderHovered = true;
      const region = this.getCanvasRegion(offsetY);
      if (region === "color-field") {
        const prevHueThumbState = this.hueThumbState;
        const color = this.baseColorFieldColor.hsv();
        const centerX = Math.round(color.saturationv() / (HSV_LIMITS.s / colorField.width));
        const centerY = Math.round(colorField.height - color.value() / (HSV_LIMITS.v / colorField.height));
        const hoveringThumb = this.containsPoint(offsetX, offsetY, centerX, centerY, thumb.radius);
        let transitionedBetweenHoverAndIdle = false;
        if (prevHueThumbState === "idle" && hoveringThumb) {
          this.hueThumbState = "hover";
          transitionedBetweenHoverAndIdle = true;
        }
        else if (prevHueThumbState === "hover" && !hoveringThumb) {
          this.hueThumbState = "idle";
          transitionedBetweenHoverAndIdle = true;
        }
        if (this.hueThumbState !== "drag") {
          if (transitionedBetweenHoverAndIdle) {
            // refresh since we won't update color and thus no redraw
            this.drawColorFieldAndSlider();
          }
        }
      }
      else if (region === "slider") {
        const sliderThumbColor = this.baseColorFieldColor.hsv().saturationv(100).value(100);
        const prevSliderThumbState = this.sliderThumbState;
        const sliderThumbCenterX = Math.round(sliderThumbColor.hue() / (360 / slider.width));
        const sliderThumbCenterY = Math.round((slider.height + this.getSliderCapSpacing()) / 2) + colorField.height;
        const hoveringSliderThumb = this.containsPoint(offsetX, offsetY, sliderThumbCenterX, sliderThumbCenterY, thumb.radius);
        let sliderThumbTransitionedBetweenHoverAndIdle = false;
        if (prevSliderThumbState === "idle" && hoveringSliderThumb) {
          this.sliderThumbState = "hover";
          sliderThumbTransitionedBetweenHoverAndIdle = true;
        }
        else if (prevSliderThumbState === "hover" && !hoveringSliderThumb) {
          this.sliderThumbState = "idle";
          sliderThumbTransitionedBetweenHoverAndIdle = true;
        }
        if (this.sliderThumbState !== "drag") {
          if (sliderThumbTransitionedBetweenHoverAndIdle) {
            // refresh since we won't update color and thus no redraw
            this.drawColorFieldAndSlider();
          }
        }
      }
    };
    this.storeColorFieldScope = (node) => {
      this.colorFieldScopeNode = node;
    };
    this.storeHueScope = (node) => {
      this.hueScopeNode = node;
    };
    this.renderChannelsTabTitle = (channelMode) => {
      const { channelMode: activeChannelMode, messages } = this;
      const selected = channelMode === activeChannelMode;
      const label = channelMode === "rgb" ? messages.rgb : messages.hsv;
      return (h("calcite-tab-title", { class: CSS.colorMode, "data-color-mode": channelMode, key: channelMode, onCalciteTabsActivate: this.handleTabActivate, selected: selected }, label));
    };
    this.renderChannelsTab = (channelMode) => {
      const { channelMode: activeChannelMode, channels, messages } = this;
      const selected = channelMode === activeChannelMode;
      const isRgb = channelMode === "rgb";
      const channelLabels = isRgb
        ? [messages.r, messages.g, messages.b]
        : [messages.h, messages.s, messages.v];
      const channelAriaLabels = isRgb
        ? [messages.red, messages.green, messages.blue]
        : [messages.hue, messages.saturation, messages.value];
      const direction = getElementDir(this.el);
      return (h("calcite-tab", { class: CSS.control, key: channelMode, selected: selected }, h("div", { class: CSS.channels, dir: "ltr" }, channels.map((channel, index) => 
      /* the channel container is ltr, so we apply the host's direction */
      this.renderChannel(channel, index, channelLabels[index], channelAriaLabels[index], direction)))));
    };
    this.renderChannel = (value, index, label, ariaLabel, direction) => (h("calcite-input", { class: CSS.channel, "data-channel-index": index, dir: direction, label: ariaLabel, lang: this.effectiveLocale, numberButtonType: "none", numberingSystem: this.numberingSystem, onCalciteInputChange: this.handleChannelChange, onCalciteInputInput: this.handleChannelInput, onKeyDown: this.handleKeyDown, prefixText: label, scale: this.scale === "l" ? "m" : "s", type: "number", value: value === null || value === void 0 ? void 0 : value.toString() }));
    this.deleteColor = () => {
      const colorToDelete = this.color.hex();
      const inStorage = this.savedColors.indexOf(colorToDelete) > -1;
      if (!inStorage) {
        return;
      }
      const savedColors = this.savedColors.filter((color) => color !== colorToDelete);
      this.savedColors = savedColors;
      const storageKey = `${DEFAULT_STORAGE_KEY_PREFIX}${this.storageId}`;
      if (this.storageId) {
        localStorage.setItem(storageKey, JSON.stringify(savedColors));
      }
    };
    this.saveColor = () => {
      const colorToSave = this.color.hex();
      const alreadySaved = this.savedColors.indexOf(colorToSave) > -1;
      if (alreadySaved) {
        return;
      }
      const savedColors = [...this.savedColors, colorToSave];
      this.savedColors = savedColors;
      const storageKey = `${DEFAULT_STORAGE_KEY_PREFIX}${this.storageId}`;
      if (this.storageId) {
        localStorage.setItem(storageKey, JSON.stringify(savedColors));
      }
    };
    this.drawColorFieldAndSlider = throttle(() => {
      if (!this.fieldAndSliderRenderingContext) {
        return;
      }
      this.drawColorField();
      this.drawHueSlider();
    }, throttleFor60FpsInMs);
    this.captureColorFieldColor = (x, y, skipEqual = true) => {
      const { dimensions: { colorField: { height, width } } } = this;
      const saturation = Math.round((HSV_LIMITS.s / width) * x);
      const value = Math.round((HSV_LIMITS.v / height) * (height - y));
      this.internalColorSet(this.baseColorFieldColor.hsv().saturationv(saturation).value(value), skipEqual);
    };
    this.initColorFieldAndSlider = (canvas) => {
      this.fieldAndSliderRenderingContext = canvas.getContext("2d");
      this.updateCanvasSize(canvas);
    };
    this.allowEmpty = false;
    this.color = DEFAULT_COLOR;
    this.disabled = false;
    this.format = defaultFormat;
    this.hideHex = false;
    this.hideChannels = false;
    this.hideSaved = false;
    this.scale = "m";
    this.storageId = undefined;
    this.messageOverrides = undefined;
    this.numberingSystem = undefined;
    this.value = defaultValue;
    this.defaultMessages = undefined;
    this.colorFieldAndSliderInteractive = false;
    this.channelMode = "rgb";
    this.channels = this.toChannels(DEFAULT_COLOR);
    this.dimensions = DIMENSIONS.m;
    this.effectiveLocale = "";
    this.messages = undefined;
    this.savedColors = [];
    this.colorFieldScopeTop = undefined;
    this.colorFieldScopeLeft = undefined;
    this.scopeOrientation = undefined;
    this.hueScopeLeft = undefined;
    this.hueScopeTop = undefined;
  }
  handleColorChange(color, oldColor) {
    this.drawColorFieldAndSlider();
    this.updateChannelsFromColor(color);
    this.previousColor = oldColor;
  }
  handleFormatChange(format) {
    this.setMode(format);
    this.internalColorSet(this.color, false, "internal");
  }
  handleScaleChange(scale = "m") {
    var _a;
    this.updateDimensions(scale);
    this.updateCanvasSize((_a = this.fieldAndSliderRenderingContext) === null || _a === void 0 ? void 0 : _a.canvas);
  }
  onMessagesChange() {
    /* wired up by t9n util */
  }
  handleValueChange(value, oldValue) {
    const { allowEmpty, format } = this;
    const checkMode = !allowEmpty || value;
    let modeChanged = false;
    if (checkMode) {
      const nextMode = parseMode(value);
      if (!nextMode || (format !== "auto" && nextMode !== format)) {
        this.showIncompatibleColorWarning(value, format);
        this.value = oldValue;
        return;
      }
      modeChanged = this.mode !== nextMode;
      this.setMode(nextMode);
    }
    const dragging = this.sliderThumbState === "drag" || this.hueThumbState === "drag";
    if (this.internalColorUpdateContext === "initial") {
      return;
    }
    if (this.internalColorUpdateContext === "user-interaction") {
      this.calciteColorPickerInput.emit();
      if (!dragging) {
        this.calciteColorPickerChange.emit();
      }
      return;
    }
    const color$1 = allowEmpty && !value ? null : color(value);
    const colorChanged = !colorEqual(color$1, this.color);
    if (modeChanged || colorChanged) {
      this.internalColorSet(color$1, true, "internal");
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Internal State/Props
  //
  //--------------------------------------------------------------------------
  get baseColorFieldColor() {
    return this.color || this.previousColor || DEFAULT_COLOR;
  }
  effectiveLocaleChange() {
    updateMessages(this, this.effectiveLocale);
  }
  // using @Listen as a workaround for VDOM listener not firing
  handleChannelKeyUpOrDown(event) {
    this.shiftKeyChannelAdjustment = 0;
    const { key } = event;
    if ((key !== "ArrowUp" && key !== "ArrowDown") ||
      !event.composedPath().some((node) => { var _a; return (_a = node.classList) === null || _a === void 0 ? void 0 : _a.contains(CSS.channel); })) {
      return;
    }
    const { shiftKey } = event;
    event.preventDefault();
    if (!this.color) {
      this.internalColorSet(this.previousColor);
      event.stopPropagation();
      return;
    }
    // this gets applied to the input's up/down arrow increment/decrement
    const complementaryBump = 9;
    this.shiftKeyChannelAdjustment =
      key === "ArrowUp" && shiftKey
        ? complementaryBump
        : key === "ArrowDown" && shiftKey
          ? -complementaryBump
          : 0;
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  /** Sets focus on the component's first focusable element. */
  async setFocus() {
    await componentLoaded(this);
    this.el.focus();
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  async componentWillLoad() {
    setUpLoadableComponent(this);
    const { allowEmpty, color: color$1, format, value } = this;
    const willSetNoColor = allowEmpty && !value;
    const parsedMode = parseMode(value);
    const valueIsCompatible = willSetNoColor || (format === "auto" && parsedMode) || format === parsedMode;
    const initialColor = willSetNoColor ? null : valueIsCompatible ? color(value) : color$1;
    if (!valueIsCompatible) {
      this.showIncompatibleColorWarning(value, format);
    }
    this.setMode(format);
    this.internalColorSet(initialColor, false, "initial");
    this.updateDimensions(this.scale);
    const storageKey = `${DEFAULT_STORAGE_KEY_PREFIX}${this.storageId}`;
    if (this.storageId && localStorage.getItem(storageKey)) {
      this.savedColors = JSON.parse(localStorage.getItem(storageKey));
    }
    await setUpMessages(this);
  }
  connectedCallback() {
    connectLocalized(this);
    connectMessages(this);
  }
  componentDidLoad() {
    setComponentLoaded(this);
  }
  disconnectedCallback() {
    document.removeEventListener("pointermove", this.globalPointerMoveHandler);
    document.removeEventListener("pointerup", this.globalPointerUpHandler);
    disconnectLocalized(this);
    disconnectMessages(this);
  }
  componentDidRender() {
    updateHostInteraction(this);
  }
  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------
  render() {
    const { allowEmpty, color, messages, hideHex, hideChannels, hideSaved, savedColors, scale } = this;
    const selectedColorInHex = color ? color.hex() : null;
    const hexInputScale = scale === "l" ? "m" : "s";
    const { colorFieldAndSliderInteractive, colorFieldScopeTop, colorFieldScopeLeft, hueScopeLeft, hueScopeTop, scopeOrientation, dimensions: { colorField: { height: colorFieldHeight, width: colorFieldWidth }, slider: { height: sliderHeight } } } = this;
    const hueTop = hueScopeTop !== null && hueScopeTop !== void 0 ? hueScopeTop : sliderHeight / 2 + colorFieldHeight;
    const hueLeft = hueScopeLeft !== null && hueScopeLeft !== void 0 ? hueScopeLeft : (colorFieldWidth * DEFAULT_COLOR.hue()) / HSV_LIMITS.h;
    const noColor = color === null;
    const vertical = scopeOrientation === "vertical";
    return (h("div", { class: CSS.container }, h("div", { class: CSS.colorFieldAndSliderWrap }, h("canvas", { class: {
        [CSS.colorFieldAndSlider]: true,
        [CSS.colorFieldAndSliderInteractive]: colorFieldAndSliderInteractive
      }, onPointerDown: this.handleColorFieldAndSliderPointerDown, onPointerEnter: this.handleColorFieldAndSliderPointerEnterOrMove, onPointerLeave: this.handleColorFieldAndSliderPointerLeave, onPointerMove: this.handleColorFieldAndSliderPointerEnterOrMove,
      // eslint-disable-next-line react/jsx-sort-props
      ref: this.initColorFieldAndSlider }), h("div", { "aria-label": vertical ? messages.value : messages.saturation, "aria-valuemax": vertical ? HSV_LIMITS.v : HSV_LIMITS.s, "aria-valuemin": "0", "aria-valuenow": (vertical ? color === null || color === void 0 ? void 0 : color.saturationv() : color === null || color === void 0 ? void 0 : color.value()) || "0", class: { [CSS.scope]: true, [CSS.colorFieldScope]: true }, onKeyDown: this.handleColorFieldScopeKeyDown, role: "slider", style: { top: `${colorFieldScopeTop || 0}px`, left: `${colorFieldScopeLeft || 0}px` }, tabindex: "0",
      // eslint-disable-next-line react/jsx-sort-props
      ref: this.storeColorFieldScope }), h("div", { "aria-label": messages.hue, "aria-valuemax": HSV_LIMITS.h, "aria-valuemin": "0", "aria-valuenow": (color === null || color === void 0 ? void 0 : color.round().hue()) || DEFAULT_COLOR.round().hue(), class: { [CSS.scope]: true, [CSS.hueScope]: true }, onKeyDown: this.handleHueScopeKeyDown, role: "slider", style: { top: `${hueTop}px`, left: `${hueLeft}px` }, tabindex: "0",
      // eslint-disable-next-line react/jsx-sort-props
      ref: this.storeHueScope })), hideHex && hideChannels ? null : (h("div", { class: {
        [CSS.controlSection]: true,
        [CSS.section]: true
      } }, hideHex ? null : (h("div", { class: CSS.hexOptions }, h("span", { class: {
        [CSS.header]: true,
        [CSS.headerHex]: true
      } }, messages.hex), h("calcite-color-picker-hex-input", { allowEmpty: allowEmpty, class: CSS.control, hexLabel: messages.hex, numberingSystem: this.numberingSystem, onCalciteColorPickerHexInputChange: this.handleHexInputChange, scale: hexInputScale, value: selectedColorInHex }))), hideChannels ? null : (h("calcite-tabs", { class: {
        [CSS.colorModeContainer]: true,
        [CSS.splitSection]: true
      }, scale: hexInputScale }, h("calcite-tab-nav", { slot: "title-group" }, this.renderChannelsTabTitle("rgb"), this.renderChannelsTabTitle("hsv")), this.renderChannelsTab("rgb"), this.renderChannelsTab("hsv"))))), hideSaved ? null : (h("div", { class: { [CSS.savedColorsSection]: true, [CSS.section]: true } }, h("div", { class: CSS.header }, h("label", null, messages.saved), h("div", { class: CSS.savedColorsButtons }, h("calcite-button", { appearance: "transparent", class: CSS.deleteColor, disabled: noColor, iconStart: "minus", kind: "neutral", label: messages.deleteColor, onClick: this.deleteColor, scale: hexInputScale, type: "button" }), h("calcite-button", { appearance: "transparent", class: CSS.saveColor, disabled: noColor, iconStart: "plus", kind: "neutral", label: messages.saveColor, onClick: this.saveColor, scale: hexInputScale, type: "button" }))), savedColors.length > 0 ? (h("div", { class: CSS.savedColors }, [
      ...savedColors.map((color) => (h("calcite-color-picker-swatch", { active: selectedColorInHex === color, class: CSS.savedColor, color: color, key: color, onClick: this.handleSavedColorSelect, onKeyDown: this.handleSavedColorKeyDown, scale: scale, tabIndex: 0 })))
    ])) : null))));
  }
  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  }
  showIncompatibleColorWarning(value, format) {
    console.warn(`ignoring color value (${value}) as it is not compatible with the current format (${format})`);
  }
  setMode(format) {
    this.mode = format === "auto" ? this.mode : format;
  }
  captureHueSliderColor(x) {
    const { dimensions: { slider: { width } } } = this;
    const hue = (360 / width) * x;
    this.internalColorSet(this.baseColorFieldColor.hue(hue), false);
  }
  getCanvasRegion(y) {
    const { dimensions: { colorField: { height: colorFieldHeight }, slider: { height: sliderHeight } } } = this;
    if (y <= colorFieldHeight) {
      return "color-field";
    }
    if (y <= colorFieldHeight + sliderHeight) {
      return "slider";
    }
    return "none";
  }
  internalColorSet(color, skipEqual = true, context = "user-interaction") {
    if (skipEqual && colorEqual(color, this.color)) {
      return;
    }
    this.internalColorUpdateContext = context;
    this.color = color;
    this.value = this.toValue(color);
    this.internalColorUpdateContext = null;
  }
  toValue(color, format = this.mode) {
    if (!color) {
      return null;
    }
    const hexMode = "hex";
    if (format.includes(hexMode)) {
      return normalizeHex(color.round()[hexMode]());
    }
    if (format.includes("-css")) {
      return color[format.replace("-css", "").replace("a", "")]().round().string();
    }
    const colorObject = color[format]().round().object();
    if (format.endsWith("a")) {
      // normalize alpha prop
      colorObject.a = colorObject.alpha;
      delete colorObject.alpha;
    }
    return colorObject;
  }
  getSliderCapSpacing() {
    const { dimensions: { slider: { height }, thumb: { radius } } } = this;
    return radius * 2 - height;
  }
  updateDimensions(scale = "m") {
    this.dimensions = DIMENSIONS[scale];
  }
  drawColorField() {
    const context = this.fieldAndSliderRenderingContext;
    const { dimensions: { colorField: { height, width } } } = this;
    context.fillStyle = this.baseColorFieldColor.hsv().saturationv(100).value(100).string();
    context.fillRect(0, 0, width, height);
    const whiteGradient = context.createLinearGradient(0, 0, width, 0);
    whiteGradient.addColorStop(0, "rgba(255,255,255,1)");
    whiteGradient.addColorStop(1, "rgba(255,255,255,0)");
    context.fillStyle = whiteGradient;
    context.fillRect(0, 0, width, height);
    const blackGradient = context.createLinearGradient(0, 0, 0, height);
    blackGradient.addColorStop(0, "rgba(0,0,0,0)");
    blackGradient.addColorStop(1, "rgba(0,0,0,1)");
    context.fillStyle = blackGradient;
    context.fillRect(0, 0, width, height);
    this.drawActiveColorFieldColor();
  }
  setCanvasContextSize(canvas, { height, width }) {
    const devicePixelRatio = window.devicePixelRatio || 1;
    canvas.width = width * devicePixelRatio;
    canvas.height = height * devicePixelRatio;
    canvas.style.height = `${height}px`;
    canvas.style.width = `${width}px`;
    const context = canvas.getContext("2d");
    context.scale(devicePixelRatio, devicePixelRatio);
  }
  updateCanvasSize(canvas) {
    if (!canvas) {
      return;
    }
    this.setCanvasContextSize(canvas, {
      width: this.dimensions.colorField.width,
      height: this.dimensions.colorField.height +
        this.dimensions.slider.height +
        this.getSliderCapSpacing() * 2
    });
    this.drawColorFieldAndSlider();
  }
  containsPoint(testPointX, testPointY, boundsX, boundsY, boundsRadius) {
    return (Math.pow(testPointX - boundsX, 2) + Math.pow(testPointY - boundsY, 2) <=
      Math.pow(boundsRadius, 2));
  }
  drawActiveColorFieldColor() {
    const { color } = this;
    if (!color) {
      return;
    }
    const hsvColor = color.hsv();
    const { dimensions: { colorField: { height, width }, thumb: { radius } } } = this;
    const x = hsvColor.saturationv() / (HSV_LIMITS.s / width);
    const y = height - hsvColor.value() / (HSV_LIMITS.v / height);
    requestAnimationFrame(() => {
      this.colorFieldScopeLeft = x;
      this.colorFieldScopeTop = y;
    });
    this.drawThumb(this.fieldAndSliderRenderingContext, radius, x, y, hsvColor, this.hueThumbState);
  }
  drawThumb(context, radius, x, y, color, state) {
    const startAngle = 0;
    const endAngle = 2 * Math.PI;
    context.beginPath();
    context.arc(x, y, radius, startAngle, endAngle);
    context.shadowBlur = state === "hover" ? 32 : 16;
    context.shadowColor = `rgba(0, 0, 0, ${state === "drag" ? 0.32 : 0.16})`;
    context.fillStyle = "#fff";
    context.fill();
    context.beginPath();
    context.arc(x, y, radius - 3, startAngle, endAngle);
    context.shadowBlur = 0;
    context.shadowColor = "transparent";
    context.fillStyle = color.rgb().string();
    context.fill();
  }
  drawActiveHueSliderColor() {
    const { color } = this;
    if (!color) {
      return;
    }
    const hsvColor = color.hsv().saturationv(100).value(100);
    const { dimensions: { colorField: { height: colorFieldHeight }, slider: { height, width }, thumb: { radius } } } = this;
    const x = hsvColor.hue() / (360 / width);
    const y = height / 2 + colorFieldHeight;
    requestAnimationFrame(() => {
      this.hueScopeLeft = x;
      this.hueScopeTop = y;
    });
    this.drawThumb(this.fieldAndSliderRenderingContext, radius, x, y, hsvColor, this.sliderThumbState);
  }
  drawHueSlider() {
    const context = this.fieldAndSliderRenderingContext;
    const { dimensions: { colorField: { height: colorFieldHeight }, slider: { height, width } } } = this;
    const gradient = context.createLinearGradient(0, 0, width, 0);
    const hueSliderColorStopKeywords = ["red", "yellow", "lime", "cyan", "blue", "magenta", "red"];
    const offset = 1 / (hueSliderColorStopKeywords.length - 1);
    let currentOffset = 0;
    hueSliderColorStopKeywords.forEach((keyword) => {
      gradient.addColorStop(currentOffset, color(keyword).string());
      currentOffset += offset;
    });
    context.fillStyle = gradient;
    context.clearRect(0, colorFieldHeight, width, height + this.getSliderCapSpacing() * 2);
    context.fillRect(0, colorFieldHeight, width, height);
    this.drawActiveHueSliderColor();
  }
  updateColorFromChannels(channels) {
    this.internalColorSet(color(channels, this.channelMode));
  }
  updateChannelsFromColor(color) {
    this.channels = color ? this.toChannels(color) : [null, null, null];
  }
  toChannels(color) {
    const { channelMode } = this;
    return color[channelMode]()
      .array()
      .map((value) => Math.floor(value));
  }
  static get delegatesFocus() { return true; }
  static get assetsDirs() { return ["assets"]; }
  get el() { return getElement(this); }
  static get watchers() { return {
    "color": ["handleColorChange"],
    "format": ["handleFormatChange"],
    "scale": ["handleScaleChange"],
    "messageOverrides": ["onMessagesChange"],
    "value": ["handleValueChange"],
    "effectiveLocale": ["effectiveLocaleChange"]
  }; }
};
ColorPicker.style = colorPickerCss;

export { ColorPicker as calcite_color_picker };
