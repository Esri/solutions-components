/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-c6979cbb.js');
const index$1 = require('./index-7af21b6f.js');
const resources = require('./resources-aa19bf8c.js');
const dom = require('./dom-4a580af6.js');
const utils = require('./utils-120bbbeb.js');
const math = require('./math-460fffaf.js');
const interactive = require('./interactive-0a68ab99.js');
const key = require('./key-55aca5c0.js');
const debounce = require('./debounce-69c3bada.js');
require('./_commonjsHelpers-6aafa5de.js');
require('./resources-b56bce71.js');
require('./guid-84ac4d91.js');

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (debounce.isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce.debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

const colorPickerCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host([disabled]){pointer-events:none;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}:host{display:inline-block;font-size:var(--calcite-font-size--2);line-height:1rem;font-weight:var(--calcite-font-weight-normal)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}:host([scale=s]) .container{inline-size:160px}:host([scale=s]) .saved-colors{grid-template-columns:repeat(auto-fill, minmax(20px, 1fr))}:host([scale=s]) .channels{flex-direction:column}:host([scale=s]) .channel{inline-size:100%;-webkit-margin-after:4px;margin-block-end:4px}:host([scale=s]) .channel:last-child{-webkit-margin-after:0;margin-block-end:0}:host([scale=m]) .container{inline-size:272px}:host([scale=l]) .header{-webkit-padding-after:0px;padding-block-end:0px}:host([scale=l]){font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=l]) .container{inline-size:464px}:host([scale=l]) .color-field-and-slider{-webkit-margin-after:-20px;margin-block-end:-20px}:host([scale=l]) .section{padding-block:0 16px;padding-inline:16px}:host([scale=l]) .section:first-of-type{-webkit-padding-before:16px;padding-block-start:16px}:host([scale=l]) .saved-colors{grid-template-columns:repeat(auto-fill, minmax(28px, 1fr));grid-gap:12px;-webkit-padding-before:16px;padding-block-start:16px}:host([scale=l]) .control-section{flex-wrap:nowrap;align-items:baseline}:host([scale=l]) .control-section>:nth-child(2){-webkit-margin-start:12px;margin-inline-start:12px}:host([scale=l]) .color-hex-options{display:flex;flex-shrink:1;flex-direction:column;justify-content:space-around;min-block-size:98px;inline-size:160px}:host([scale=l]) .color-mode-container{flex-shrink:3}:host([appearance=minimal]) .container{border:none}.container{background-color:var(--calcite-ui-foreground-1);display:inline-block;border:1px solid var(--calcite-ui-border-1)}.color-field-and-slider-wrap{position:relative}.scope{pointer-events:none;position:absolute;font-size:var(--calcite-font-size--1);outline-color:transparent;outline-offset:14px}.scope:focus{outline:2px solid var(--calcite-ui-brand);outline-offset:16px}.color-field-and-slider{-webkit-margin-after:-16px;margin-block-end:-16px;touch-action:none}.color-field-and-slider--interactive{cursor:pointer}.control-section{display:flex;flex-direction:row;flex-wrap:wrap}.section{padding-block:0 12px;padding-inline:12px}.section:first-of-type{-webkit-padding-before:12px;padding-block-start:12px}.color-hex-options,.section--split{flex-grow:1}.header{display:flex;align-items:center;justify-content:space-between;-webkit-padding-after:0.25rem;padding-block-end:0.25rem;color:var(--calcite-ui-text-1)}.header--hex,.color-mode-container{-webkit-padding-before:12px;padding-block-start:12px}.channels{display:flex;justify-content:space-between}.channel{inline-size:31%}.saved-colors{-webkit-padding-before:12px;padding-block-start:12px;display:grid;grid-template-columns:repeat(auto-fill, minmax(24px, 1fr));grid-gap:8px;inline-size:100%}.saved-colors-buttons{display:flex}.saved-color{outline-offset:0;outline-color:transparent;cursor:pointer}.saved-color:focus{outline:2px solid var(--calcite-ui-brand);outline-offset:2px}.saved-color:hover{transition:outline-color var(--calcite-internal-animation-timing-fast) ease-in-out;outline:2px solid var(--calcite-ui-border-2);outline-offset:2px}";

const throttleFor60FpsInMs = 16;
const defaultValue = utils.normalizeHex(resources.DEFAULT_COLOR.hex());
const defaultFormat = "auto";
const ColorPicker = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.calciteColorPickerChange = index.createEvent(this, "calciteColorPickerChange", 6);
    this.calciteColorPickerInput = index.createEvent(this, "calciteColorPickerInput", 6);
    //--------------------------------------------------------------------------
    //
    //  Public properties
    //
    //--------------------------------------------------------------------------
    /**
     * When `false`, an empty color (`null`) will be allowed as a `value`. Otherwise, a color value is enforced on the component.
     *
     * When `true`, a color value is enforced, and clearing the input or blurring will restore the last valid `value`. When `false`, an empty color (`null`) will be allowed as a `value`.
     */
    this.allowEmpty = false;
    /**
     * Specifies the appearance style of the component -
     *
     * `"solid"` (containing border) or `"minimal"` (no containing border).
     */
    this.appearance = "solid";
    /**
     * Internal prop for advanced use-cases.
     *
     * @internal
     */
    this.color = resources.DEFAULT_COLOR;
    /**
     * When `true`, interaction is prevented and the component is displayed with lower opacity.
     */
    this.disabled = false;
    /**
     * The format of `value`.
     *
     * When `"auto"`, the format will be inferred from `value` when set.
     *
     * @default "auto"
     */
    this.format = defaultFormat;
    /** When `true`, hides the Hex input. */
    this.hideHex = false;
    /** When `true`, hides the RGB/HSV channel inputs. */
    this.hideChannels = false;
    /** When `true`, hides the saved colors section. */
    this.hideSaved = false;
    /**
     * Accessible name for the RGB section's blue channel.
     *
     * @default "B"
     */
    this.intlB = resources.TEXT.b;
    /**
     * Accessible name for the RGB section's blue channel description.
     *
     * @default "Blue"
     */
    this.intlBlue = resources.TEXT.blue;
    /**
     * Accessible name for the delete color button.
     *
     * @default "Delete color"
     */
    this.intlDeleteColor = resources.TEXT.deleteColor;
    /**
     * Accessible name for the RGB section's green channel.
     *
     * @default "G"
     */
    this.intlG = resources.TEXT.g;
    /**
     * Accessible name for the RGB section's green channel description.
     *
     * @default "Green"
     */
    this.intlGreen = resources.TEXT.green;
    /**
     * Accessible name for the HSV section's hue channel.
     *
     * @default "H"
     */
    this.intlH = resources.TEXT.h;
    /**
     * Accessible name for the HSV mode.
     *
     * @default "HSV"
     */
    this.intlHsv = resources.TEXT.hsv;
    /**
     * Accessible name for the Hex input.
     *
     * @default "Hex"
     */
    this.intlHex = resources.TEXT.hex;
    /**
     * Accessible name for the HSV section's hue channel description.
     *
     * @default "Hue"
     */
    this.intlHue = resources.TEXT.hue;
    /**
     * Accessible name for the Hex input when there is no color selected.
     *
     * @default "No color"
     */
    this.intlNoColor = resources.TEXT.noColor;
    /**
     * Accessible name for the RGB section's red channel.
     *
     * @default "R"
     */
    this.intlR = resources.TEXT.r;
    /**
     * Accessible name for the RGB section's red channel description.
     *
     * @default "Red"
     */
    this.intlRed = resources.TEXT.red;
    /**
     * Accessible name for the RGB mode.
     *
     * @default "RGB"
     */
    this.intlRgb = resources.TEXT.rgb;
    /**
     * Accessible name for the HSV section's saturation channel.
     *
     * @default "S"
     */
    this.intlS = resources.TEXT.s;
    /**
     * Accessible name for the HSV section's saturation channel description.
     *
     * @default "Saturation"
     */
    this.intlSaturation = resources.TEXT.saturation;
    /**
     * Accessible name for the save color button.
     *
     * @default "Save color"
     */
    this.intlSaveColor = resources.TEXT.saveColor;
    /**
     * Accessible name for the saved colors section.
     *
     * @default "Saved"
     */
    this.intlSaved = resources.TEXT.saved;
    /**
     * Accessible name for the HSV section's value channel.
     *
     * @default "V"
     */
    this.intlV = resources.TEXT.v;
    /**
     * Accessible name for the HSV section's value channel description.
     *
     * @default "Value"
     */
    this.intlValue = resources.TEXT.value;
    /** Specifies the size of the component. */
    this.scale = "m";
    /**
     * The component's value, where the value can be a CSS color string, or a RGB, HSL or HSV object.
     *
     * The type will be preserved as the color is updated.
     *
     * @default "#007ac2"
     * @see [CSS Color](https://developer.mozilla.org/en-US/docs/Web/CSS/color)
     * @see [ColorValue](https://github.com/Esri/calcite-components/blob/master/src/components/color-picker/interfaces.ts#L10)
     */
    this.value = defaultValue;
    this.colorFieldAndSliderHovered = false;
    this.hueThumbState = "idle";
    this.internalColorUpdateContext = null;
    this.mode = utils.CSSColorMode.HEX;
    this.shiftKeyChannelAdjustment = 0;
    this.sliderThumbState = "idle";
    this.colorFieldAndSliderInteractive = false;
    this.channelMode = "rgb";
    this.channels = this.toChannels(resources.DEFAULT_COLOR);
    this.dimensions = resources.DIMENSIONS.m;
    this.savedColors = [];
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
      const { allowEmpty, color } = this;
      const input = event.target;
      const hex = input.value;
      if (allowEmpty && !hex) {
        this.internalColorSet(null);
        return;
      }
      const normalizedHex = color && utils.normalizeHex(color.hex());
      if (hex !== normalizedHex) {
        this.internalColorSet(index$1.color(hex));
      }
    };
    this.handleSavedColorSelect = (event) => {
      const swatch = event.currentTarget;
      this.internalColorSet(index$1.color(swatch.color));
    };
    this.handleChannelInput = (event) => {
      const input = event.currentTarget;
      const internalInput = event.detail.nativeEvent.target;
      const channelIndex = Number(input.getAttribute("data-channel-index"));
      const limit = this.channelMode === "rgb"
        ? resources.RGB_LIMITS[Object.keys(resources.RGB_LIMITS)[channelIndex]]
        : resources.HSV_LIMITS[Object.keys(resources.HSV_LIMITS)[channelIndex]];
      let inputValue;
      if (this.allowEmpty && !input.value) {
        inputValue = "";
      }
      else {
        const value = Number(input.value) + this.shiftKeyChannelAdjustment;
        const clamped = math.clamp(value, 0, limit);
        inputValue = clamped.toString();
      }
      input.value = inputValue;
      internalInput.value = inputValue;
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
      if (key.isActivationKey(event.key)) {
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
      if (!dom.isPrimaryPointerButton(event)) {
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
      if (!dom.isPrimaryPointerButton(event)) {
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
        const centerX = Math.round(color.saturationv() / (resources.HSV_LIMITS.s / colorField.width));
        const centerY = Math.round(colorField.height - color.value() / (resources.HSV_LIMITS.v / colorField.height));
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
      const { channelMode: activeChannelMode, intlRgb, intlHsv } = this;
      const active = channelMode === activeChannelMode;
      const label = channelMode === "rgb" ? intlRgb : intlHsv;
      return (index.h("calcite-tab-title", { active: active, class: resources.CSS.colorMode, "data-color-mode": channelMode, key: channelMode, onCalciteTabsActivate: this.handleTabActivate }, label));
    };
    this.renderChannelsTab = (channelMode) => {
      const { channelMode: activeChannelMode, channels, intlB, intlBlue, intlG, intlGreen, intlH, intlHue, intlR, intlRed, intlS, intlSaturation, intlV, intlValue } = this;
      const active = channelMode === activeChannelMode;
      const isRgb = channelMode === "rgb";
      const channelLabels = isRgb ? [intlR, intlG, intlB] : [intlH, intlS, intlV];
      const channelAriaLabels = isRgb
        ? [intlRed, intlGreen, intlBlue]
        : [intlHue, intlSaturation, intlValue];
      const direction = dom.getElementDir(this.el);
      return (index.h("calcite-tab", { active: active, class: resources.CSS.control, key: channelMode }, index.h("div", { class: resources.CSS.channels, dir: "ltr" }, channels.map((channel, index) => 
      /* the channel container is ltr, so we apply the host's direction */
      this.renderChannel(channel, index, channelLabels[index], channelAriaLabels[index], direction)))));
    };
    this.renderChannel = (value, index$1, label, ariaLabel, direction) => (index.h("calcite-input", { class: resources.CSS.channel, "data-channel-index": index$1, dir: direction, label: ariaLabel, numberButtonType: "none", numberingSystem: this.numberingSystem, onCalciteInputChange: this.handleChannelChange, onCalciteInputInput: this.handleChannelInput, onKeyDown: this.handleKeyDown, prefixText: label, scale: this.scale === "l" ? "m" : "s", type: "number", value: value === null || value === void 0 ? void 0 : value.toString() }));
    this.deleteColor = () => {
      const colorToDelete = this.color.hex();
      const inStorage = this.savedColors.indexOf(colorToDelete) > -1;
      if (!inStorage) {
        return;
      }
      const savedColors = this.savedColors.filter((color) => color !== colorToDelete);
      this.savedColors = savedColors;
      const storageKey = `${resources.DEFAULT_STORAGE_KEY_PREFIX}${this.storageId}`;
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
      const storageKey = `${resources.DEFAULT_STORAGE_KEY_PREFIX}${this.storageId}`;
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
      const saturation = Math.round((resources.HSV_LIMITS.s / width) * x);
      const value = Math.round((resources.HSV_LIMITS.v / height) * (height - y));
      this.internalColorSet(this.baseColorFieldColor.hsv().saturationv(saturation).value(value), skipEqual);
    };
    this.initColorFieldAndSlider = (canvas) => {
      this.fieldAndSliderRenderingContext = canvas.getContext("2d");
      this.updateCanvasSize(canvas);
    };
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
  handleValueChange(value, oldValue) {
    const { allowEmpty, format } = this;
    const checkMode = !allowEmpty || value;
    let modeChanged = false;
    if (checkMode) {
      const nextMode = utils.parseMode(value);
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
    const color = allowEmpty && !value ? null : index$1.color(value);
    const colorChanged = !utils.colorEqual(color, this.color);
    if (modeChanged || colorChanged) {
      this.internalColorSet(color, true, "internal");
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Internal State/Props
  //
  //--------------------------------------------------------------------------
  get baseColorFieldColor() {
    return this.color || this.previousColor || resources.DEFAULT_COLOR;
  }
  // using @Listen as a workaround for VDOM listener not firing
  handleChannelKeyUpOrDown(event) {
    this.shiftKeyChannelAdjustment = 0;
    const { key } = event;
    if ((key !== "ArrowUp" && key !== "ArrowDown") ||
      !event.composedPath().some((node) => { var _a; return (_a = node.classList) === null || _a === void 0 ? void 0 : _a.contains(resources.CSS.channel); })) {
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
  /** Sets focus on the component. */
  async setFocus() {
    return dom.focusElement(this.colorFieldScopeNode);
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  componentWillLoad() {
    const { allowEmpty, color, format, value } = this;
    const willSetNoColor = allowEmpty && !value;
    const parsedMode = utils.parseMode(value);
    const valueIsCompatible = willSetNoColor || (format === "auto" && parsedMode) || format === parsedMode;
    const initialColor = willSetNoColor ? null : valueIsCompatible ? index$1.color(value) : color;
    if (!valueIsCompatible) {
      this.showIncompatibleColorWarning(value, format);
    }
    this.setMode(format);
    this.internalColorSet(initialColor, false, "initial");
    this.updateDimensions(this.scale);
    const storageKey = `${resources.DEFAULT_STORAGE_KEY_PREFIX}${this.storageId}`;
    if (this.storageId && localStorage.getItem(storageKey)) {
      this.savedColors = JSON.parse(localStorage.getItem(storageKey));
    }
  }
  disconnectedCallback() {
    document.removeEventListener("pointermove", this.globalPointerMoveHandler);
    document.removeEventListener("pointerup", this.globalPointerUpHandler);
  }
  componentDidRender() {
    interactive.updateHostInteraction(this);
  }
  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------
  render() {
    const { allowEmpty, color, intlDeleteColor, hideHex, hideChannels, hideSaved, intlHex, intlSaved, intlSaveColor, savedColors, scale } = this;
    const selectedColorInHex = color ? color.hex() : null;
    const hexInputScale = scale === "l" ? "m" : "s";
    const { colorFieldAndSliderInteractive, colorFieldScopeTop, colorFieldScopeLeft, hueScopeLeft, hueScopeTop, scopeOrientation, dimensions: { colorField: { height: colorFieldHeight, width: colorFieldWidth }, slider: { height: sliderHeight } } } = this;
    const hueTop = hueScopeTop !== null && hueScopeTop !== void 0 ? hueScopeTop : sliderHeight / 2 + colorFieldHeight;
    const hueLeft = hueScopeLeft !== null && hueScopeLeft !== void 0 ? hueScopeLeft : (colorFieldWidth * resources.DEFAULT_COLOR.hue()) / resources.HSV_LIMITS.h;
    const noColor = color === null;
    const vertical = scopeOrientation === "vertical";
    return (index.h("div", { class: resources.CSS.container }, index.h("div", { class: resources.CSS.colorFieldAndSliderWrap }, index.h("canvas", { class: {
        [resources.CSS.colorFieldAndSlider]: true,
        [resources.CSS.colorFieldAndSliderInteractive]: colorFieldAndSliderInteractive
      }, onPointerDown: this.handleColorFieldAndSliderPointerDown, onPointerEnter: this.handleColorFieldAndSliderPointerEnterOrMove, onPointerLeave: this.handleColorFieldAndSliderPointerLeave, onPointerMove: this.handleColorFieldAndSliderPointerEnterOrMove, ref: this.initColorFieldAndSlider }), index.h("div", { "aria-label": vertical ? this.intlValue : this.intlSaturation, "aria-valuemax": vertical ? resources.HSV_LIMITS.v : resources.HSV_LIMITS.s, "aria-valuemin": "0", "aria-valuenow": (vertical ? color === null || color === void 0 ? void 0 : color.saturationv() : color === null || color === void 0 ? void 0 : color.value()) || "0", class: { [resources.CSS.scope]: true, [resources.CSS.colorFieldScope]: true }, onKeyDown: this.handleColorFieldScopeKeyDown, ref: this.storeColorFieldScope, role: "slider", style: { top: `${colorFieldScopeTop || 0}px`, left: `${colorFieldScopeLeft || 0}px` }, tabindex: "0" }), index.h("div", { "aria-label": this.intlHue, "aria-valuemax": resources.HSV_LIMITS.h, "aria-valuemin": "0", "aria-valuenow": (color === null || color === void 0 ? void 0 : color.round().hue()) || resources.DEFAULT_COLOR.round().hue(), class: { [resources.CSS.scope]: true, [resources.CSS.hueScope]: true }, onKeyDown: this.handleHueScopeKeyDown, ref: this.storeHueScope, role: "slider", style: { top: `${hueTop}px`, left: `${hueLeft}px` }, tabindex: "0" })), hideHex && hideChannels ? null : (index.h("div", { class: {
        [resources.CSS.controlSection]: true,
        [resources.CSS.section]: true
      } }, hideHex ? null : (index.h("div", { class: resources.CSS.hexOptions }, index.h("span", { class: {
        [resources.CSS.header]: true,
        [resources.CSS.headerHex]: true
      } }, intlHex), index.h("calcite-color-picker-hex-input", { allowEmpty: allowEmpty, class: resources.CSS.control, numberingSystem: this.numberingSystem, onCalciteColorPickerHexInputChange: this.handleHexInputChange, scale: hexInputScale, value: selectedColorInHex }))), hideChannels ? null : (index.h("calcite-tabs", { class: {
        [resources.CSS.colorModeContainer]: true,
        [resources.CSS.splitSection]: true
      }, scale: hexInputScale }, index.h("calcite-tab-nav", { slot: "tab-nav" }, this.renderChannelsTabTitle("rgb"), this.renderChannelsTabTitle("hsv")), this.renderChannelsTab("rgb"), this.renderChannelsTab("hsv"))))), hideSaved ? null : (index.h("div", { class: { [resources.CSS.savedColorsSection]: true, [resources.CSS.section]: true } }, index.h("div", { class: resources.CSS.header }, index.h("label", null, intlSaved), index.h("div", { class: resources.CSS.savedColorsButtons }, index.h("calcite-button", { appearance: "transparent", class: resources.CSS.deleteColor, color: "neutral", disabled: noColor, iconStart: "minus", label: intlDeleteColor, onClick: this.deleteColor, scale: hexInputScale, type: "button" }), index.h("calcite-button", { appearance: "transparent", class: resources.CSS.saveColor, color: "neutral", disabled: noColor, iconStart: "plus", label: intlSaveColor, onClick: this.saveColor, scale: hexInputScale, type: "button" }))), savedColors.length > 0 ? (index.h("div", { class: resources.CSS.savedColors }, [
      ...savedColors.map((color) => (index.h("calcite-color-picker-swatch", { active: selectedColorInHex === color, class: resources.CSS.savedColor, color: color, key: color, onClick: this.handleSavedColorSelect, onKeyDown: this.handleSavedColorKeyDown, scale: scale, tabIndex: 0 })))
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
    if (skipEqual && utils.colorEqual(color, this.color)) {
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
      return utils.normalizeHex(color.round()[hexMode]());
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
    this.dimensions = resources.DIMENSIONS[scale];
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
    const x = hsvColor.saturationv() / (resources.HSV_LIMITS.s / width);
    const y = height - hsvColor.value() / (resources.HSV_LIMITS.v / height);
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
      gradient.addColorStop(currentOffset, index$1.color(keyword).string());
      currentOffset += offset;
    });
    context.fillStyle = gradient;
    context.clearRect(0, colorFieldHeight, width, height + this.getSliderCapSpacing() * 2);
    context.fillRect(0, colorFieldHeight, width, height);
    this.drawActiveHueSliderColor();
  }
  updateColorFromChannels(channels) {
    this.internalColorSet(index$1.color(channels, this.channelMode));
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
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "color": ["handleColorChange"],
    "format": ["handleFormatChange"],
    "scale": ["handleScaleChange"],
    "value": ["handleValueChange"]
  }; }
};
ColorPicker.style = colorPickerCss;

exports.calcite_color_picker = ColorPicker;
