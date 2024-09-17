/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, g as getElement } from './index-b793d9aa.js';
import { C as CSSColorMode, n as normalizeHex, h as hexify, a as Color, o as opacityToAlpha, b as CSS, c as alphaToOpacity, D as DEFAULT_COLOR, d as DIMENSIONS, e as alphaCompatible, g as getSliderWidth, p as parseMode, f as normalizeColor, i as colorEqual, R as RGB_LIMITS, H as HSV_LIMITS, O as OPACITY_LIMITS, t as toNonAlphaMode, j as normalizeAlpha, k as HUE_LIMIT_CONSTRAINED, S as SCOPE_SIZE, l as DEFAULT_STORAGE_KEY_PREFIX, m as toAlphaMode } from './utils-1f0d1828.js';
import { i as isPrimaryPointerButton, a as getElementDir, f as focusFirstTabbable } from './dom-b5c50286.js';
import { c as connectInteractive, d as disconnectInteractive, u as updateHostInteraction, I as InteractiveContainer } from './interactive-742ba555.js';
import { i as isActivationKey } from './key-58898f0a.js';
import { c as componentFocusable, s as setUpLoadableComponent, a as setComponentLoaded } from './loadable-73f289b6.js';
import { c as connectLocalized, d as disconnectLocalized } from './locale-21e40b0c.js';
import { r as remap, c as clamp, a as closeToRangeEdge } from './math-8c04292e.js';
import { u as updateMessages, s as setUpMessages, c as connectMessages, d as disconnectMessages } from './t9n-2fb3af62.js';
import { t as throttle } from './throttle-aed86bf3.js';
import './guid-4c746a7f.js';
import './resources-defbb49f.js';
import './browser-552eb2d0.js';
import './observers-e2484555.js';
import './debounce-6e9ade8c.js';

const colorPickerCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:inline-block;font-size:var(--calcite-font-size--2);line-height:1rem;font-weight:var(--calcite-font-weight-normal)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([scale=s]){--calcite-color-picker-spacing:8px}:host([scale=s]) .container{inline-size:160px}:host([scale=s]) .saved-colors{gap:0.25rem;grid-template-columns:repeat(auto-fill, 20px)}:host([scale=m]){--calcite-color-picker-spacing:12px}:host([scale=m]) .container{inline-size:272px}:host([scale=l]){--calcite-color-picker-spacing:16px;font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=l]) .container{inline-size:464px}:host([scale=l]) .section:first-of-type{padding-block-start:var(--calcite-color-picker-spacing)}:host([scale=l]) .saved-colors{grid-template-columns:repeat(auto-fill, 32px)}:host([scale=l]) .control-section{flex-wrap:nowrap;align-items:baseline;flex-wrap:wrap}:host([scale=l]) .color-hex-options{display:flex;flex-shrink:1;flex-direction:column;justify-content:space-around}:host([scale=l]) .color-mode-container{flex-shrink:3}.container{background-color:var(--calcite-color-foreground-1);display:inline-block;border:1px solid var(--calcite-color-border-1)}.control-and-scope{position:relative;display:flex;cursor:pointer;touch-action:none}.color-field,.control-and-scope{-webkit-user-select:none;-moz-user-select:none;user-select:none}.scope{pointer-events:none;position:absolute;z-index:var(--calcite-z-index);block-size:1px;inline-size:1px;border-radius:9999px;background-color:transparent;font-size:var(--calcite-font-size--1);outline-color:transparent}.scope:focus{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          );outline-offset:6px}.hex-and-channels-group{inline-size:100%}.hex-and-channels-group,.control-section{display:flex;flex-direction:row;flex-wrap:wrap}.section{padding-block:0 var(--calcite-color-picker-spacing);padding-inline:var(--calcite-color-picker-spacing)}.section:first-of-type{padding-block-start:var(--calcite-color-picker-spacing)}.sliders{display:flex;flex-direction:column;justify-content:space-between;margin-inline-start:var(--calcite-color-picker-spacing);gap:var(--calcite-spacing-xxs)}.preview-and-sliders{display:flex;align-items:center;padding:var(--calcite-color-picker-spacing)}.color-hex-options,.section--split{flex-grow:1}.header{display:flex;align-items:center;justify-content:space-between;color:var(--calcite-color-text-1)}.color-mode-container{padding-block-start:var(--calcite-color-picker-spacing)}.channels{display:flex;row-gap:0.125rem}.channel[data-channel-index=\"3\"]{inline-size:159px}:host([scale=s]) .channels{flex-wrap:wrap}:host([scale=s]) .channel{flex-basis:30%;flex-grow:1}:host([scale=s]) .channel[data-channel-index=\"3\"]{inline-size:unset;margin-inline-start:unset}:host([scale=l]) .channel[data-channel-index=\"3\"]{inline-size:131px}.saved-colors{display:grid;gap:0.5rem;padding-block-start:var(--calcite-color-picker-spacing);grid-template-columns:repeat(auto-fill, 24px)}.saved-colors-buttons{display:flex}.saved-color{outline-offset:0;outline-color:transparent;cursor:pointer}.saved-color:focus{outline:2px solid var(--calcite-color-brand);outline-offset:2px}.saved-color:hover{transition:outline-color var(--calcite-internal-animation-timing-fast) ease-in-out;outline:2px solid var(--calcite-color-border-2);outline-offset:2px}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteColorPickerStyle0 = colorPickerCss;

const throttleFor60FpsInMs = 16;
const ColorPicker = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.calciteColorPickerChange = createEvent(this, "calciteColorPickerChange", 6);
        this.calciteColorPickerInput = createEvent(this, "calciteColorPickerInput", 6);
        this.internalColorUpdateContext = null;
        this.isActiveChannelInputEmpty = false;
        this.mode = CSSColorMode.HEX;
        this.shiftKeyChannelAdjustment = 0;
        this.upOrDownArrowKeyTracker = null;
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
                ArrowLeft: { x: -10, y: 0 },
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
                ArrowLeft: -1,
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
            const { isClearable, color } = this;
            const input = event.target;
            const hex = input.value;
            if (isClearable && !hex) {
                this.internalColorSet(null);
                return;
            }
            const normalizedHex = color && normalizeHex(hexify(color, alphaCompatible(this.mode)));
            if (hex !== normalizedHex) {
                this.internalColorSet(Color(hex));
            }
        };
        this.handleSavedColorSelect = (event) => {
            const swatch = event.currentTarget;
            this.internalColorSet(Color(swatch.color));
        };
        this.handleChannelInput = (event) => {
            const input = event.currentTarget;
            const channelIndex = Number(input.getAttribute("data-channel-index"));
            const isAlphaChannel = channelIndex === 3;
            const limit = isAlphaChannel
                ? OPACITY_LIMITS.max
                : this.channelMode === "rgb"
                    ? RGB_LIMITS[Object.keys(RGB_LIMITS)[channelIndex]]
                    : HSV_LIMITS[Object.keys(HSV_LIMITS)[channelIndex]];
            let inputValue;
            if (!input.value) {
                inputValue = "";
                this.isActiveChannelInputEmpty = true;
                // reset this to allow typing in new value, when channel input is cleared after ArrowUp or ArrowDown have been pressed
                this.upOrDownArrowKeyTracker = null;
            }
            else {
                const value = Number(input.value);
                const adjustedValue = value + this.shiftKeyChannelAdjustment;
                const clamped = clamp(adjustedValue, 0, limit);
                inputValue = clamped.toString();
            }
            input.value = inputValue;
            if (inputValue !== "" && this.shiftKeyChannelAdjustment !== 0) {
                // we treat nudging as a change event since the input won't emit when modifying the value directly
                this.handleChannelChange(event);
            }
            else if (inputValue !== "") {
                this.handleChannelChange(event);
            }
        };
        this.handleChannelBlur = (event) => {
            const input = event.currentTarget;
            const channelIndex = Number(input.getAttribute("data-channel-index"));
            const channels = [...this.channels];
            const restoreValueDueToEmptyInput = !input.value && !this.isClearable;
            if (restoreValueDueToEmptyInput) {
                input.value = channels[channelIndex]?.toString();
            }
        };
        this.handleChannelFocus = (event) => {
            const input = event.currentTarget;
            input.selectText();
        };
        this.handleChannelChange = (event) => {
            const input = event.currentTarget;
            const channelIndex = Number(input.getAttribute("data-channel-index"));
            const channels = [...this.channels];
            const shouldClearChannels = this.isClearable && !input.value;
            if (shouldClearChannels) {
                this.channels = [null, null, null, null];
                this.internalColorSet(null);
                return;
            }
            const isAlphaChannel = channelIndex === 3;
            if (this.isActiveChannelInputEmpty && this.upOrDownArrowKeyTracker) {
                input.value =
                    this.upOrDownArrowKeyTracker === "up"
                        ? (channels[channelIndex] + 1 <= this.getChannelInputLimit(channelIndex)
                            ? channels[channelIndex] + 1
                            : this.getChannelInputLimit(channelIndex)).toString()
                        : (channels[channelIndex] - 1 >= 0 ? channels[channelIndex] - 1 : 0).toString();
                this.isActiveChannelInputEmpty = false;
                this.upOrDownArrowKeyTracker = null;
            }
            const value = input.value ? Number(input.value) : channels[channelIndex];
            channels[channelIndex] = isAlphaChannel ? opacityToAlpha(value) : value;
            this.updateColorFromChannels(channels);
        };
        this.handleSavedColorKeyDown = (event) => {
            if (isActivationKey(event.key)) {
                event.preventDefault();
                this.handleSavedColorSelect(event);
            }
        };
        this.handleColorFieldPointerDown = (event) => {
            this.handleCanvasControlPointerDown(event, this.colorFieldRenderingContext, this.captureColorFieldColor, this.colorFieldScopeNode);
        };
        this.handleHueSliderPointerDown = (event) => {
            this.handleCanvasControlPointerDown(event, this.hueSliderRenderingContext, this.captureHueSliderColor, this.hueScopeNode);
        };
        this.handleOpacitySliderPointerDown = (event) => {
            this.handleCanvasControlPointerDown(event, this.opacitySliderRenderingContext, this.captureOpacitySliderValue, this.opacityScopeNode);
        };
        this.globalPointerUpHandler = (event) => {
            if (!isPrimaryPointerButton(event)) {
                return;
            }
            const previouslyDragging = this.activeCanvasInfo;
            this.activeCanvasInfo = null;
            this.drawColorControls();
            if (previouslyDragging) {
                this.calciteColorPickerChange.emit();
            }
        };
        this.globalPointerMoveHandler = (event) => {
            const { activeCanvasInfo, el } = this;
            if (!el.isConnected || !activeCanvasInfo) {
                return;
            }
            const { context, bounds } = activeCanvasInfo;
            let samplingX;
            let samplingY;
            const { clientX, clientY } = event;
            if (context.canvas.matches(":hover")) {
                samplingX = clientX - bounds.x;
                samplingY = clientY - bounds.y;
            }
            else {
                // snap x and y to the closest edge
                if (clientX < bounds.x + bounds.width && clientX > bounds.x) {
                    samplingX = clientX - bounds.x;
                }
                else if (clientX < bounds.x) {
                    samplingX = 0;
                }
                else {
                    samplingX = bounds.width;
                }
                if (clientY < bounds.y + bounds.height && clientY > bounds.y) {
                    samplingY = clientY - bounds.y;
                }
                else if (clientY < bounds.y) {
                    samplingY = 0;
                }
                else {
                    samplingY = bounds.height;
                }
            }
            if (context === this.colorFieldRenderingContext) {
                this.captureColorFieldColor(samplingX, samplingY, false);
            }
            else if (context === this.hueSliderRenderingContext) {
                this.captureHueSliderColor(samplingX);
            }
            else if (context === this.opacitySliderRenderingContext) {
                this.captureOpacitySliderValue(samplingX);
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
            const { isClearable, channelMode: activeChannelMode, channels, messages, alphaChannel } = this;
            const selected = channelMode === activeChannelMode;
            const isRgb = channelMode === "rgb";
            const channelAriaLabels = isRgb
                ? [messages.red, messages.green, messages.blue]
                : [messages.hue, messages.saturation, messages.value];
            const direction = getElementDir(this.el);
            const channelsToRender = alphaChannel ? channels : channels.slice(0, 3);
            return (h("calcite-tab", { class: CSS.control, key: channelMode, selected: selected }, h("div", { class: CSS.channels, dir: "ltr" }, channelsToRender.map((channelValue, index) => {
                const isAlphaChannel = index === 3;
                if (isAlphaChannel) {
                    channelValue =
                        isClearable && !channelValue ? channelValue : alphaToOpacity(channelValue);
                }
                /* the channel container is ltr, so we apply the host's direction */
                return this.renderChannel(channelValue, index, channelAriaLabels[index], direction, isAlphaChannel ? "%" : "");
            }))));
        };
        this.renderChannel = (value, index, ariaLabel, direction, suffix) => {
            return (h("calcite-input-number", { class: CSS.channel, "data-channel-index": index, dir: direction, key: index, label: ariaLabel, lang: this.effectiveLocale, numberButtonType: "none", numberingSystem: this.numberingSystem, onCalciteInputNumberChange: this.handleChannelChange, onCalciteInputNumberInput: this.handleChannelInput, onCalciteInternalInputNumberBlur: this.handleChannelBlur, onCalciteInternalInputNumberFocus: this.handleChannelFocus, onKeyDown: this.handleKeyDown, scale: this.scale === "l" ? "m" : "s",
                // workaround to ensure input borders overlap as desired
                // this is because the build transforms margin-left to its
                // logical-prop, which is undesired as channels are always ltr
                style: {
                    marginLeft: index > 0 && !(this.scale === "s" && this.alphaChannel && index === 3) ? "-1px" : "",
                }, suffixText: suffix, value: value?.toString() }));
        };
        this.deleteColor = () => {
            const colorToDelete = hexify(this.color, this.alphaChannel);
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
            const colorToSave = hexify(this.color, this.alphaChannel);
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
        this.drawColorControls = throttle((type = "all") => {
            if ((type === "all" || type === "color-field") && this.colorFieldRenderingContext) {
                this.drawColorField();
            }
            if ((type === "all" || type === "hue-slider") && this.hueSliderRenderingContext) {
                this.drawHueSlider();
            }
            if (this.alphaChannel &&
                (type === "all" || type === "opacity-slider") &&
                this.opacitySliderRenderingContext) {
                this.drawOpacitySlider();
            }
        }, throttleFor60FpsInMs);
        this.captureColorFieldColor = (x, y, skipEqual = true) => {
            const { dimensions: { colorField: { height, width }, }, } = this;
            const saturation = Math.round((HSV_LIMITS.s / width) * x);
            const value = Math.round((HSV_LIMITS.v / height) * (height - y));
            this.internalColorSet(this.baseColorFieldColor.hsv().saturationv(saturation).value(value), skipEqual);
        };
        this.initColorField = (canvas) => {
            this.colorFieldRenderingContext = canvas.getContext("2d");
            this.updateCanvasSize("color-field");
            this.drawColorControls();
        };
        this.initHueSlider = (canvas) => {
            this.hueSliderRenderingContext = canvas.getContext("2d");
            this.updateCanvasSize("hue-slider");
            this.drawHueSlider();
        };
        this.initOpacitySlider = (canvas) => {
            if (!canvas) {
                return;
            }
            this.opacitySliderRenderingContext = canvas.getContext("2d");
            this.updateCanvasSize("opacity-slider");
            this.drawOpacitySlider();
        };
        this.storeOpacityScope = (node) => {
            this.opacityScopeNode = node;
        };
        this.handleOpacityScopeKeyDown = (event) => {
            const modifier = event.shiftKey ? 10 : 1;
            const { key } = event;
            const arrowKeyToXOffset = {
                ArrowUp: 0.01,
                ArrowRight: 0.01,
                ArrowDown: -0.01,
                ArrowLeft: -0.01,
            };
            if (arrowKeyToXOffset[key]) {
                event.preventDefault();
                const delta = arrowKeyToXOffset[key] * modifier;
                const alpha = this.baseColorFieldColor.alpha();
                const color = this.baseColorFieldColor.alpha(alpha + delta);
                this.internalColorSet(color, false);
            }
        };
        this.allowEmpty = false;
        this.alphaChannel = false;
        this.channelsDisabled = false;
        this.clearable = false;
        this.color = DEFAULT_COLOR;
        this.disabled = false;
        this.format = "auto";
        this.hideChannels = false;
        this.hexDisabled = false;
        this.hideHex = false;
        this.hideSaved = false;
        this.savedDisabled = false;
        this.scale = "m";
        this.storageId = undefined;
        this.messageOverrides = undefined;
        this.numberingSystem = undefined;
        this.value = normalizeHex(hexify(DEFAULT_COLOR, this.alphaChannel));
        this.channelMode = "rgb";
        this.channels = this.toChannels(DEFAULT_COLOR);
        this.defaultMessages = undefined;
        this.dimensions = DIMENSIONS.m;
        this.effectiveLocale = "";
        this.messages = undefined;
        this.savedColors = [];
        this.colorFieldScopeTop = undefined;
        this.colorFieldScopeLeft = undefined;
        this.hueScopeLeft = undefined;
        this.opacityScopeLeft = undefined;
        this.scopeOrientation = undefined;
    }
    handleAllowEmptyOrClearableChange() {
        this.isClearable = this.clearable || this.allowEmpty;
    }
    handleAlphaChannelChange(alphaChannel) {
        const { format } = this;
        if (alphaChannel && format !== "auto" && !alphaCompatible(format)) {
            console.warn(`ignoring alphaChannel as the current format (${format}) does not support alpha`);
            this.alphaChannel = false;
        }
    }
    handleAlphaChannelDimensionsChange() {
        this.effectiveSliderWidth = getSliderWidth(this.dimensions, this.alphaChannel);
        this.drawColorControls();
    }
    handleColorChange(color, oldColor) {
        this.drawColorControls();
        this.updateChannelsFromColor(color);
        this.previousColor = oldColor;
    }
    handleFormatOrAlphaChannelChange() {
        this.setMode(this.format);
        this.internalColorSet(this.color, false, "internal");
    }
    handleScaleChange(scale = "m") {
        this.updateDimensions(scale);
        this.updateCanvasSize("all");
        this.drawColorControls();
    }
    onMessagesChange() {
        /* wired up by t9n util */
    }
    handleValueChange(value, oldValue) {
        const { isClearable, format } = this;
        const checkMode = !isClearable || value;
        let modeChanged = false;
        if (checkMode) {
            const nextMode = parseMode(value);
            if (!nextMode || (format !== "auto" && nextMode !== format)) {
                this.showIncompatibleColorWarning(value, format);
                this.value = oldValue;
                return;
            }
            modeChanged = this.mode !== nextMode;
            this.setMode(nextMode, this.internalColorUpdateContext === null);
        }
        const dragging = this.activeCanvasInfo;
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
        const color = isClearable && !value
            ? null
            : Color(value != null && typeof value === "object" && alphaCompatible(this.mode)
                ? normalizeColor(value)
                : value);
        const colorChanged = !colorEqual(color, this.color);
        if (modeChanged || colorChanged) {
            this.internalColorSet(color, this.alphaChannel && !(this.mode.endsWith("a") || this.mode.endsWith("a-css")), "internal");
        }
    }
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
            !event.composedPath().some((node) => node.classList?.contains(CSS.channel))) {
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
        if (key === "ArrowUp") {
            this.upOrDownArrowKeyTracker = "up";
        }
        if (key === "ArrowDown") {
            this.upOrDownArrowKeyTracker = "down";
        }
    }
    getChannelInputLimit(channelIndex) {
        return this.channelMode === "rgb"
            ? RGB_LIMITS[Object.keys(RGB_LIMITS)[channelIndex]]
            : HSV_LIMITS[Object.keys(HSV_LIMITS)[channelIndex]];
    }
    focusScope(focusEl) {
        requestAnimationFrame(() => {
            focusEl.focus();
        });
    }
    handleCanvasControlPointerDown(event, renderingContext, captureValue, scopeNode) {
        if (!isPrimaryPointerButton(event)) {
            return;
        }
        window.addEventListener("pointermove", this.globalPointerMoveHandler);
        window.addEventListener("pointerup", this.globalPointerUpHandler, { once: true });
        this.activeCanvasInfo = {
            context: renderingContext,
            bounds: renderingContext.canvas.getBoundingClientRect(),
        };
        captureValue.call(this, event.offsetX, event.offsetY);
        this.focusScope(scopeNode);
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /** Sets focus on the component's first focusable element. */
    async setFocus() {
        await componentFocusable(this);
        focusFirstTabbable(this.el);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    async componentWillLoad() {
        setUpLoadableComponent(this);
        this.handleAllowEmptyOrClearableChange();
        this.handleAlphaChannelDimensionsChange();
        const { isClearable, color, format, value } = this;
        const willSetNoColor = isClearable && !value;
        const parsedMode = parseMode(value);
        const valueIsCompatible = willSetNoColor || (format === "auto" && parsedMode) || format === parsedMode;
        const initialColor = willSetNoColor ? null : valueIsCompatible ? Color(value) : color;
        if (!valueIsCompatible) {
            this.showIncompatibleColorWarning(value, format);
        }
        this.setMode(format, false);
        this.internalColorSet(initialColor, false, "initial");
        this.updateDimensions(this.scale);
        const storageKey = `${DEFAULT_STORAGE_KEY_PREFIX}${this.storageId}`;
        if (this.storageId && localStorage.getItem(storageKey)) {
            this.savedColors = JSON.parse(localStorage.getItem(storageKey));
        }
        await setUpMessages(this);
    }
    connectedCallback() {
        connectInteractive(this);
        connectLocalized(this);
        connectMessages(this);
    }
    componentDidLoad() {
        setComponentLoaded(this);
    }
    disconnectedCallback() {
        window.removeEventListener("pointermove", this.globalPointerMoveHandler);
        window.removeEventListener("pointerup", this.globalPointerUpHandler);
        disconnectInteractive(this);
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
        const { channelsDisabled, color, colorFieldScopeLeft, colorFieldScopeTop, dimensions: { thumb: { radius: thumbRadius }, }, hexDisabled, hideChannels, hideHex, hideSaved, hueScopeLeft, messages, alphaChannel, opacityScopeLeft, savedColors, savedDisabled, scale, scopeOrientation, } = this;
        const sliderWidth = this.effectiveSliderWidth;
        const selectedColorInHex = color ? hexify(color, alphaChannel) : null;
        const hueTop = thumbRadius;
        const hueLeft = hueScopeLeft ?? (sliderWidth * DEFAULT_COLOR.hue()) / HSV_LIMITS.h;
        const opacityTop = thumbRadius;
        const opacityLeft = opacityScopeLeft ??
            (sliderWidth * alphaToOpacity(DEFAULT_COLOR.alpha())) / OPACITY_LIMITS.max;
        const noColor = color === null;
        const vertical = scopeOrientation === "vertical";
        const noHex = hexDisabled || hideHex;
        const noChannels = channelsDisabled || hideChannels;
        const noSaved = savedDisabled || hideSaved;
        const [adjustedColorFieldScopeLeft, adjustedColorFieldScopeTop] = this.getAdjustedScopePosition(colorFieldScopeLeft, colorFieldScopeTop);
        const [adjustedHueScopeLeft, adjustedHueScopeTop] = this.getAdjustedScopePosition(hueLeft, hueTop);
        const [adjustedOpacityScopeLeft, adjustedOpacityScopeTop] = this.getAdjustedScopePosition(opacityLeft, opacityTop);
        return (h(InteractiveContainer, { key: 'cd7c2469429382b1adee89c87c4774160795203c', disabled: this.disabled }, h("div", { key: 'dd6809c82d3ffe64b8eaebd0669e7f61c0ea87d1', class: CSS.container }, h("div", { key: '888c08c46fec112861b076c3cf24b9be7b4a66cd', class: CSS.controlAndScope }, h("canvas", { key: '23631c824c61abb2a3ca74e35bffc8be0364a052', class: CSS.colorField, onPointerDown: this.handleColorFieldPointerDown, ref: this.initColorField }), h("div", { key: 'a5271bbe3c4f45e3cf7736dd8f4201f54420bfb7', "aria-label": vertical ? messages.value : messages.saturation, "aria-valuemax": vertical ? HSV_LIMITS.v : HSV_LIMITS.s, "aria-valuemin": "0", "aria-valuenow": (vertical ? color?.saturationv() : color?.value()) || "0", class: { [CSS.scope]: true, [CSS.colorFieldScope]: true }, onKeyDown: this.handleColorFieldScopeKeyDown, ref: this.storeColorFieldScope, role: "slider", style: {
                top: `${adjustedColorFieldScopeTop || 0}px`,
                left: `${adjustedColorFieldScopeLeft || 0}px`,
            }, tabindex: "0" })), h("div", { key: 'eee6c10107513fd46316d2ba7510977b72771cd2', class: CSS.previewAndSliders }, h("calcite-color-picker-swatch", { key: '964481e1c6c6c050df076e8cdc9d7e5b2cbeec79', class: CSS.preview, color: selectedColorInHex, scale: this.alphaChannel ? "l" : this.scale }), h("div", { key: 'f915032fe532e140005b0ff1253b0a971a17b079', class: CSS.sliders }, h("div", { key: '2bcb609ce36df2d0f75abb767ee6dc88c0c9ea3b', class: CSS.controlAndScope }, h("canvas", { key: '99e268a194b785a8ec97fed67a523c602def2a94', class: { [CSS.slider]: true, [CSS.hueSlider]: true }, onPointerDown: this.handleHueSliderPointerDown, ref: this.initHueSlider }), h("div", { key: '4cdc0f98048a48e070430bf4f1f817571534f31b', "aria-label": messages.hue, "aria-valuemax": HSV_LIMITS.h, "aria-valuemin": "0", "aria-valuenow": color?.round().hue() || DEFAULT_COLOR.round().hue(), class: { [CSS.scope]: true, [CSS.hueScope]: true }, onKeyDown: this.handleHueScopeKeyDown, ref: this.storeHueScope, role: "slider", style: {
                top: `${adjustedHueScopeTop}px`,
                left: `${adjustedHueScopeLeft}px`,
            }, tabindex: "0" })), alphaChannel ? (h("div", { class: CSS.controlAndScope }, h("canvas", { class: { [CSS.slider]: true, [CSS.opacitySlider]: true }, onPointerDown: this.handleOpacitySliderPointerDown, ref: this.initOpacitySlider }), h("div", { "aria-label": messages.opacity, "aria-valuemax": OPACITY_LIMITS.max, "aria-valuemin": OPACITY_LIMITS.min, "aria-valuenow": (color || DEFAULT_COLOR).round().alpha(), class: { [CSS.scope]: true, [CSS.opacityScope]: true }, onKeyDown: this.handleOpacityScopeKeyDown, ref: this.storeOpacityScope, role: "slider", style: {
                top: `${adjustedOpacityScopeTop}px`,
                left: `${adjustedOpacityScopeLeft}px`,
            }, tabindex: "0" }))) : null)), noHex && noChannels ? null : (h("div", { class: {
                [CSS.controlSection]: true,
                [CSS.section]: true,
            } }, h("div", { class: CSS.hexAndChannelsGroup }, noHex ? null : (h("div", { class: CSS.hexOptions }, h("calcite-color-picker-hex-input", { allowEmpty: this.isClearable, alphaChannel: alphaChannel, class: CSS.control, messages: messages, numberingSystem: this.numberingSystem, onCalciteColorPickerHexInputChange: this.handleHexInputChange, scale: scale, value: selectedColorInHex }))), noChannels ? null : (h("calcite-tabs", { class: {
                [CSS.colorModeContainer]: true,
                [CSS.splitSection]: true,
            }, scale: scale === "l" ? "m" : "s" }, h("calcite-tab-nav", { slot: "title-group" }, this.renderChannelsTabTitle("rgb"), this.renderChannelsTabTitle("hsv")), this.renderChannelsTab("rgb"), this.renderChannelsTab("hsv")))))), noSaved ? null : (h("div", { class: { [CSS.savedColorsSection]: true, [CSS.section]: true } }, h("div", { class: CSS.header }, h("label", null, messages.saved), h("div", { class: CSS.savedColorsButtons }, h("calcite-button", { appearance: "transparent", class: CSS.deleteColor, disabled: noColor, iconStart: "minus", kind: "neutral", label: messages.deleteColor, onClick: this.deleteColor, scale: scale, type: "button" }), h("calcite-button", { appearance: "transparent", class: CSS.saveColor, disabled: noColor, iconStart: "plus", kind: "neutral", label: messages.saveColor, onClick: this.saveColor, scale: scale, type: "button" }))), savedColors.length > 0 ? (h("div", { class: CSS.savedColors }, [
            ...savedColors.map((color) => (h("calcite-color-picker-swatch", { class: CSS.savedColor, color: color, key: color, onClick: this.handleSavedColorSelect, onKeyDown: this.handleSavedColorKeyDown, scale: scale, tabIndex: 0 }))),
        ])) : null)))));
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
    setMode(format, warn = true) {
        const mode = format === "auto" ? this.mode : format;
        this.mode = this.ensureCompatibleMode(mode, warn);
    }
    ensureCompatibleMode(mode, warn) {
        const { alphaChannel } = this;
        const isAlphaCompatible = alphaCompatible(mode);
        if (alphaChannel && !isAlphaCompatible) {
            const alphaMode = toAlphaMode(mode);
            if (warn) {
                console.warn(`setting format to (${alphaMode}) as the provided one (${mode}) does not support alpha`);
            }
            return alphaMode;
        }
        if (!alphaChannel && isAlphaCompatible) {
            const nonAlphaMode = toNonAlphaMode(mode);
            if (warn) {
                console.warn(`setting format to (${nonAlphaMode}) as the provided one (${mode}) does not support alpha`);
            }
            return nonAlphaMode;
        }
        return mode;
    }
    captureHueSliderColor(x) {
        const hue = (HUE_LIMIT_CONSTRAINED / this.effectiveSliderWidth) * x;
        this.internalColorSet(this.baseColorFieldColor.hue(hue), false);
    }
    captureOpacitySliderValue(x) {
        const alpha = opacityToAlpha((OPACITY_LIMITS.max / this.effectiveSliderWidth) * x);
        this.internalColorSet(this.baseColorFieldColor.alpha(alpha), false);
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
            const hasAlpha = format === CSSColorMode.HEXA;
            return normalizeHex(hexify(color.round(), hasAlpha), hasAlpha);
        }
        if (format.includes("-css")) {
            const value = color[format.replace("-css", "").replace("a", "")]().round().string();
            // Color omits alpha values when alpha is 1
            const needToInjectAlpha = (format.endsWith("a") || format.endsWith("a-css")) && color.alpha() === 1;
            if (needToInjectAlpha) {
                const model = value.slice(0, 3);
                const values = value.slice(4, -1);
                return `${model}a(${values}, ${color.alpha()})`;
            }
            return value;
        }
        const colorObject = 
        /* Color() does not support hsva, hsla nor rgba, so we use the non-alpha mode */
        color[toNonAlphaMode(format)]().round().object();
        if (format.endsWith("a")) {
            return normalizeAlpha(colorObject);
        }
        return colorObject;
    }
    getSliderCapSpacing() {
        const { dimensions: { slider: { height }, thumb: { radius }, }, } = this;
        return radius * 2 - height;
    }
    updateDimensions(scale = "m") {
        this.dimensions = DIMENSIONS[scale];
    }
    drawColorField() {
        const context = this.colorFieldRenderingContext;
        const { dimensions: { colorField: { height, width }, }, } = this;
        context.fillStyle = this.baseColorFieldColor
            .hsv()
            .saturationv(100)
            .value(100)
            .alpha(1)
            .string();
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
        if (!canvas) {
            return;
        }
        const devicePixelRatio = window.devicePixelRatio || 1;
        canvas.width = width * devicePixelRatio;
        canvas.height = height * devicePixelRatio;
        canvas.style.height = `${height}px`;
        canvas.style.width = `${width}px`;
        const context = canvas.getContext("2d");
        context.scale(devicePixelRatio, devicePixelRatio);
    }
    updateCanvasSize(context = "all") {
        const { dimensions } = this;
        if (context === "all" || context === "color-field") {
            this.setCanvasContextSize(this.colorFieldRenderingContext?.canvas, dimensions.colorField);
        }
        const adjustedSliderDimensions = {
            width: this.effectiveSliderWidth,
            height: dimensions.slider.height + (dimensions.thumb.radius - dimensions.slider.height / 2) * 2,
        };
        if (context === "all" || context === "hue-slider") {
            this.setCanvasContextSize(this.hueSliderRenderingContext?.canvas, adjustedSliderDimensions);
        }
        if (context === "all" || context === "opacity-slider") {
            this.setCanvasContextSize(this.opacitySliderRenderingContext?.canvas, adjustedSliderDimensions);
        }
    }
    drawActiveColorFieldColor() {
        const { color } = this;
        if (!color) {
            return;
        }
        const hsvColor = color.hsv();
        const { dimensions: { colorField: { height, width }, thumb: { radius }, }, } = this;
        const x = hsvColor.saturationv() / (HSV_LIMITS.s / width);
        const y = height - hsvColor.value() / (HSV_LIMITS.v / height);
        requestAnimationFrame(() => {
            this.colorFieldScopeLeft = x;
            this.colorFieldScopeTop = y;
        });
        this.drawThumb(this.colorFieldRenderingContext, radius, x, y, hsvColor, false);
    }
    drawThumb(context, radius, x, y, color, applyAlpha) {
        const startAngle = 0;
        const endAngle = 2 * Math.PI;
        const outlineWidth = 1;
        context.beginPath();
        context.arc(x, y, radius, startAngle, endAngle);
        context.fillStyle = "#fff";
        context.fill();
        context.strokeStyle = "rgba(0,0,0,0.3)";
        context.lineWidth = outlineWidth;
        context.stroke();
        if (applyAlpha && color.alpha() < 1) {
            const pattern = context.createPattern(this.getCheckeredBackgroundPattern(), "repeat");
            context.beginPath();
            context.arc(x, y, radius - 3, startAngle, endAngle);
            context.fillStyle = pattern;
            context.fill();
        }
        context.globalCompositeOperation = "source-atop";
        context.beginPath();
        context.arc(x, y, radius - 3, startAngle, endAngle);
        const alpha = applyAlpha ? color.alpha() : 1;
        context.fillStyle = color.rgb().alpha(alpha).string();
        context.fill();
        context.globalCompositeOperation = "source-over";
    }
    drawActiveHueSliderColor() {
        const { color } = this;
        if (!color) {
            return;
        }
        const hsvColor = color.hsv().saturationv(100).value(100);
        const { dimensions: { thumb: { radius }, }, } = this;
        const width = this.effectiveSliderWidth;
        const x = hsvColor.hue() / (HUE_LIMIT_CONSTRAINED / width);
        const y = radius;
        const sliderBoundX = this.getSliderBoundX(x, width, radius);
        requestAnimationFrame(() => {
            this.hueScopeLeft = sliderBoundX;
        });
        this.drawThumb(this.hueSliderRenderingContext, radius, sliderBoundX, y, hsvColor, false);
    }
    drawHueSlider() {
        const context = this.hueSliderRenderingContext;
        const { dimensions: { slider: { height }, thumb: { radius: thumbRadius }, }, } = this;
        const x = 0;
        const y = thumbRadius - height / 2;
        const width = this.effectiveSliderWidth;
        const gradient = context.createLinearGradient(0, 0, width, 0);
        const hueSliderColorStopKeywords = [
            "red",
            "yellow",
            "lime",
            "cyan",
            "blue",
            "magenta",
            "#ff0004" /* 1 unit less than #ff0 to avoid duplicate values within range */,
        ];
        const offset = 1 / (hueSliderColorStopKeywords.length - 1);
        let currentOffset = 0;
        hueSliderColorStopKeywords.forEach((keyword) => {
            gradient.addColorStop(currentOffset, Color(keyword).string());
            currentOffset += offset;
        });
        context.clearRect(0, 0, width, height + this.getSliderCapSpacing() * 2);
        this.drawSliderPath(context, height, width, x, y);
        context.fillStyle = gradient;
        context.fill();
        context.strokeStyle = "rgba(0,0,0,0.3)";
        context.lineWidth = 1;
        context.stroke();
        this.drawActiveHueSliderColor();
    }
    drawOpacitySlider() {
        const context = this.opacitySliderRenderingContext;
        const { baseColorFieldColor: previousColor, dimensions: { slider: { height }, thumb: { radius: thumbRadius }, }, } = this;
        const x = 0;
        const y = thumbRadius - height / 2;
        const width = this.effectiveSliderWidth;
        context.clearRect(0, 0, width, height + this.getSliderCapSpacing() * 2);
        const gradient = context.createLinearGradient(0, y, width, 0);
        const startColor = previousColor.rgb().alpha(0);
        const midColor = previousColor.rgb().alpha(0.5);
        const endColor = previousColor.rgb().alpha(1);
        gradient.addColorStop(0, startColor.string());
        gradient.addColorStop(0.5, midColor.string());
        gradient.addColorStop(1, endColor.string());
        this.drawSliderPath(context, height, width, x, y);
        const pattern = context.createPattern(this.getCheckeredBackgroundPattern(), "repeat");
        context.fillStyle = pattern;
        context.fill();
        context.fillStyle = gradient;
        context.fill();
        context.strokeStyle = "rgba(0,0,0,0.3)";
        context.lineWidth = 1;
        context.stroke();
        this.drawActiveOpacitySliderColor();
    }
    drawSliderPath(context, height, width, x, y) {
        const radius = height / 2 + 1;
        context.beginPath();
        context.moveTo(x + radius, y);
        context.lineTo(x + width - radius, y);
        context.quadraticCurveTo(x + width, y, x + width, y + radius);
        context.lineTo(x + width, y + height - radius);
        context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        context.lineTo(x + radius, y + height);
        context.quadraticCurveTo(x, y + height, x, y + height - radius);
        context.lineTo(x, y + radius);
        context.quadraticCurveTo(x, y, x + radius, y);
        context.closePath();
    }
    getCheckeredBackgroundPattern() {
        if (this.checkerPattern) {
            return this.checkerPattern;
        }
        const pattern = document.createElement("canvas");
        pattern.width = 10;
        pattern.height = 10;
        const patternContext = pattern.getContext("2d");
        patternContext.fillStyle = "#ccc";
        patternContext.fillRect(0, 0, 10, 10);
        patternContext.fillStyle = "#fff";
        patternContext.fillRect(0, 0, 5, 5);
        patternContext.fillRect(5, 5, 5, 5);
        this.checkerPattern = pattern;
        return pattern;
    }
    drawActiveOpacitySliderColor() {
        const { color } = this;
        if (!color) {
            return;
        }
        const hsvColor = color;
        const { dimensions: { thumb: { radius }, }, } = this;
        const width = this.effectiveSliderWidth;
        const x = alphaToOpacity(hsvColor.alpha()) / (OPACITY_LIMITS.max / width);
        const y = radius;
        const sliderBoundX = this.getSliderBoundX(x, width, radius);
        requestAnimationFrame(() => {
            this.opacityScopeLeft = sliderBoundX;
        });
        this.drawThumb(this.opacitySliderRenderingContext, radius, sliderBoundX, y, hsvColor, true);
    }
    getSliderBoundX(x, width, radius) {
        const closeToEdge = closeToRangeEdge(x, width, radius);
        return closeToEdge === 0
            ? x
            : closeToEdge === -1
                ? remap(x, 0, width, radius, radius * 2)
                : remap(x, 0, width, width - radius * 2, width - radius);
    }
    updateColorFromChannels(channels) {
        this.internalColorSet(Color(channels, this.channelMode));
    }
    updateChannelsFromColor(color) {
        this.channels = color ? this.toChannels(color) : [null, null, null, null];
    }
    toChannels(color) {
        const { channelMode } = this;
        const channels = color[channelMode]()
            .array()
            .map((value, index) => {
            const isAlpha = index === 3;
            return isAlpha ? value : Math.floor(value);
        });
        if (channels.length === 3) {
            channels.push(1); // Color omits alpha when 1
        }
        return channels;
    }
    getAdjustedScopePosition(left, top) {
        return [left - SCOPE_SIZE / 2, top - SCOPE_SIZE / 2];
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return getElement(this); }
    static get watchers() { return {
        "allowEmpty": ["handleAllowEmptyOrClearableChange"],
        "clearable": ["handleAllowEmptyOrClearableChange"],
        "alphaChannel": ["handleAlphaChannelChange", "handleAlphaChannelDimensionsChange", "handleFormatOrAlphaChannelChange"],
        "dimensions": ["handleAlphaChannelDimensionsChange"],
        "color": ["handleColorChange"],
        "format": ["handleFormatOrAlphaChannelChange"],
        "scale": ["handleScaleChange"],
        "messageOverrides": ["onMessagesChange"],
        "value": ["handleValueChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
};
ColorPicker.style = CalciteColorPickerStyle0;

export { ColorPicker as calcite_color_picker };
