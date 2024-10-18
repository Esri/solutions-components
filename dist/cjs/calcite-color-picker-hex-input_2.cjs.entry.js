/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-4b68e4b4.js');
const utils = require('./utils-51a793a5.js');
const dom = require('./dom-795d4a33.js');
const loadable = require('./loadable-1c888c87.js');
require('./guid-e84a8375.js');
require('./resources-18f799c7.js');
require('./browser-333a21c5.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const CSS$1 = {
    container: "container",
    hexInput: "hex-input",
    opacityInput: "opacity-input",
};

const colorPickerHexInputCss = ":host{display:block}.container{display:flex;inline-size:100%;flex-wrap:nowrap;align-items:center}.hex-input{flex-grow:1;text-transform:uppercase}.opacity-input{inline-size:68px;margin-inline-start:-1px}:host([scale=s]) .container{flex-wrap:wrap;row-gap:0.125rem}:host([scale=s]) .opacity-input{inline-size:unset;margin-inline-start:unset}:host([scale=l]) .opacity-input{inline-size:88px}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteColorPickerHexInputStyle0 = colorPickerHexInputCss;

const DEFAULT_COLOR = utils.Color();
const ColorPickerHexInput = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteColorPickerHexInputChange = index.createEvent(this, "calciteColorPickerHexInputChange", 6);
        this.onHexInputBlur = () => {
            const node = this.hexInputNode;
            const inputValue = node.value;
            const hex = `#${inputValue}`;
            const { allowEmpty, internalColor } = this;
            const willClearValue = allowEmpty && !inputValue;
            const isLonghand = utils.isLonghandHex(hex);
            if (utils.isShorthandHex(hex, this.alphaChannel)) {
                // ensure modified pasted hex values are committed since we prevent default to remove the # char.
                this.onHexInputChange();
            }
            if (willClearValue || (utils.isValidHex(hex) && isLonghand)) {
                return;
            }
            // manipulating DOM directly since rerender doesn't update input value
            node.value =
                allowEmpty && !internalColor
                    ? ""
                    : this.formatHexForInternalInput(utils.rgbToHex(
                    // always display hex input in RRGGBB format
                    internalColor.object()));
        };
        this.onOpacityInputBlur = () => {
            const node = this.opacityInputNode;
            const inputValue = node.value;
            const { allowEmpty, internalColor } = this;
            const willClearValue = allowEmpty && !inputValue;
            if (willClearValue) {
                return;
            }
            // manipulating DOM directly since rerender doesn't update input value
            node.value =
                allowEmpty && !internalColor ? "" : this.formatOpacityForInternalInput(internalColor);
        };
        this.onOpacityInputInput = () => {
            this.onOpacityInputChange();
        };
        this.onHexInputChange = () => {
            const nodeValue = this.hexInputNode.value;
            let value = nodeValue;
            if (value) {
                const normalized = utils.normalizeHex(value, false);
                const preserveExistingAlpha = utils.isValidHex(normalized) && this.alphaChannel;
                if (preserveExistingAlpha && this.internalColor) {
                    const alphaHex = utils.normalizeHex(this.internalColor.hexa(), true).slice(-2);
                    value = `${normalized + alphaHex}`;
                }
            }
            this.internalSetValue(value, this.value);
        };
        this.onOpacityInputChange = () => {
            const node = this.opacityInputNode;
            let value;
            if (!node.value) {
                value = node.value;
            }
            else {
                const alpha = utils.opacityToAlpha(Number(node.value));
                value = this.internalColor?.alpha(alpha).hexa();
            }
            this.internalSetValue(value, this.value);
        };
        this.onInputFocus = (event) => {
            event.type === "calciteInternalInputTextFocus"
                ? this.hexInputNode.selectText()
                : this.opacityInputNode.selectText();
        };
        this.onHexInputInput = () => {
            const hexInputValue = `#${this.hexInputNode.value}`;
            const oldValue = this.value;
            if (utils.isValidHex(hexInputValue, this.alphaChannel) &&
                utils.isLonghandHex(hexInputValue, this.alphaChannel)) {
                this.internalSetValue(hexInputValue, oldValue);
            }
        };
        this.onInputKeyDown = (event) => {
            const { altKey, ctrlKey, metaKey, shiftKey } = event;
            const { alphaChannel, hexInputNode, internalColor, value } = this;
            const { key } = event;
            const composedPath = event.composedPath();
            if ((key === "Tab" && utils.isShorthandHex(value, this.alphaChannel)) || key === "Enter") {
                if (composedPath.includes(hexInputNode)) {
                    this.onHexInputChange();
                }
                else {
                    this.onOpacityInputChange();
                }
                if (key === "Enter") {
                    event.preventDefault();
                }
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
                this.internalSetValue(utils.hexify(this.nudgeRGBChannels(internalColor, bump * direction, composedPath.includes(hexInputNode) ? "rgb" : "a"), alphaChannel), oldValue);
                event.preventDefault();
                return;
            }
            const withModifiers = altKey || ctrlKey || metaKey;
            const singleChar = key.length === 1;
            const validHexChar = utils.hexChar.test(key);
            if (singleChar && !withModifiers && !validHexChar) {
                event.preventDefault();
            }
        };
        this.onHexInputPaste = (event) => {
            const hex = event.clipboardData.getData("text");
            if (utils.isValidHex(hex, this.alphaChannel) && utils.isLonghandHex(hex, this.alphaChannel)) {
                event.preventDefault();
                this.hexInputNode.value = hex.slice(1);
                this.internalSetValue(hex, this.value);
            }
        };
        this.previousNonNullValue = this.value;
        this.storeHexInputRef = (node) => {
            this.hexInputNode = node;
        };
        this.storeOpacityInputRef = (node) => {
            this.opacityInputNode = node;
        };
        this.allowEmpty = false;
        this.alphaChannel = false;
        this.hexLabel = "Hex";
        this.messages = undefined;
        this.numberingSystem = undefined;
        this.scale = "m";
        this.value = utils.normalizeHex(utils.hexify(DEFAULT_COLOR, this.alphaChannel), this.alphaChannel, true);
        this.internalColor = DEFAULT_COLOR;
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        const { allowEmpty, alphaChannel, value } = this;
        if (value) {
            const normalized = utils.normalizeHex(value, alphaChannel);
            if (utils.isValidHex(normalized, alphaChannel)) {
                this.internalSetValue(normalized, normalized, false);
            }
            return;
        }
        if (allowEmpty) {
            this.internalSetValue(null, null, false);
        }
    }
    componentWillLoad() {
        loadable.setUpLoadableComponent(this);
    }
    componentDidLoad() {
        loadable.setComponentLoaded(this);
    }
    handleValueChange(value, oldValue) {
        this.internalSetValue(value, oldValue, false);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    render() {
        const { alphaChannel, hexLabel, internalColor, messages, scale, value } = this;
        const hexInputValue = this.formatHexForInternalInput(value);
        const opacityInputValue = this.formatOpacityForInternalInput(internalColor);
        const inputScale = scale === "l" ? "m" : "s";
        return (index.h("div", { key: '70f804fdbc3c29fdf49616f56c39593fdc3717da', class: CSS$1.container }, index.h("calcite-input-text", { key: '777d1f8ffa673a0d74f049d4a6bdacbf3510006a', class: CSS$1.hexInput, label: messages?.hex || hexLabel, maxLength: this.alphaChannel ? 8 : 6, onCalciteInputTextChange: this.onHexInputChange, onCalciteInputTextInput: this.onHexInputInput, onCalciteInternalInputTextBlur: this.onHexInputBlur, onCalciteInternalInputTextFocus: this.onInputFocus, onKeyDown: this.onInputKeyDown, onPaste: this.onHexInputPaste, prefixText: "#", ref: this.storeHexInputRef, scale: inputScale, value: hexInputValue }), alphaChannel ? (index.h("calcite-input-number", { class: CSS$1.opacityInput, key: "opacity-input", label: messages?.opacity, max: utils.OPACITY_LIMITS.max, maxLength: 3, min: utils.OPACITY_LIMITS.min, numberButtonType: "none", numberingSystem: this.numberingSystem, onCalciteInputNumberInput: this.onOpacityInputInput, onCalciteInternalInputNumberBlur: this.onOpacityInputBlur, onCalciteInternalInputNumberFocus: this.onInputFocus, onKeyDown: this.onInputKeyDown, ref: this.storeOpacityInputRef, scale: inputScale, suffixText: "%", value: opacityInputValue })) : null));
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /** Sets focus on the component. */
    async setFocus() {
        await loadable.componentFocusable(this);
        return dom.focusElement(this.hexInputNode);
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    internalSetValue(value, oldValue, emit = true) {
        if (value) {
            const { alphaChannel } = this;
            const normalized = utils.normalizeHex(value, alphaChannel, alphaChannel);
            if (utils.isValidHex(normalized, alphaChannel)) {
                const { internalColor: currentColor } = this;
                const nextColor = utils.Color(normalized);
                const normalizedLonghand = utils.normalizeHex(utils.hexify(nextColor, alphaChannel), alphaChannel);
                const changed = !currentColor ||
                    normalizedLonghand !== utils.normalizeHex(utils.hexify(currentColor, alphaChannel), alphaChannel);
                this.internalColor = nextColor;
                this.previousNonNullValue = normalizedLonghand;
                this.value = normalizedLonghand;
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
    formatHexForInternalInput(hex) {
        return hex ? hex.replace("#", "").slice(0, 6) : "";
    }
    formatOpacityForInternalInput(color) {
        return color ? `${utils.alphaToOpacity(color.alpha())}` : "";
    }
    nudgeRGBChannels(color, amount, context) {
        let nudgedChannels;
        const channels = color.array();
        const rgbChannels = channels.slice(0, 3);
        if (context === "rgb") {
            const nudgedRGBChannels = rgbChannels.map((channel) => channel + amount);
            nudgedChannels = [
                ...nudgedRGBChannels,
                this.alphaChannel ? channels[3] : undefined,
            ];
        }
        else {
            const nudgedAlpha = utils.opacityToAlpha(utils.alphaToOpacity(color.alpha()) + amount);
            nudgedChannels = [...rgbChannels, nudgedAlpha];
        }
        return utils.Color(nudgedChannels);
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "value": ["handleValueChange"]
    }; }
};
ColorPickerHexInput.style = CalciteColorPickerHexInputStyle0;

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const CSS = {
    swatch: "swatch",
    noColorSwatch: "swatch--no-color",
    checker: "checker",
};
const COLORS = {
    borderLight: "rgba(0, 0, 0, 0.3)",
    borderDark: "rgba(255, 255, 255, 0.15)",
};
const checkerSquareSize = 4;
const CHECKER_DIMENSIONS = {
    squareSize: checkerSquareSize,
    size: checkerSquareSize * 2,
};

const colorPickerSwatchCss = ":host{position:relative;display:inline-flex}:host([scale=s]){block-size:1.25rem;inline-size:1.25rem}:host([scale=m]){block-size:1.5rem;inline-size:1.5rem}:host([scale=l]){block-size:2rem;inline-size:2rem}.swatch{overflow:hidden;block-size:inherit;inline-size:inherit}.swatch rect{transition-property:all;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}.swatch--no-color rect{fill:var(--calcite-color-foreground-1)}.swatch--no-color line{stroke:var(--calcite-color-status-danger)}.checker{fill:#cacaca}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteColorPickerSwatchStyle0 = colorPickerSwatchCss;

const ColorPickerSwatch = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.active = false;
        this.color = undefined;
        this.scale = "m";
    }
    handleColorChange(color) {
        this.internalColor = color ? utils.Color(color) : null;
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentWillLoad() {
        this.handleColorChange(this.color);
    }
    render() {
        const isEmpty = !this.internalColor;
        const classes = {
            [CSS.swatch]: true,
            [CSS.noColorSwatch]: isEmpty,
        };
        return (index.h("svg", { key: 'd808ca40b9f81aad24291cabcfaf95d74d89f7cd', class: classes, xmlns: "http://www.w3.org/2000/svg" }, this.renderSwatch()));
    }
    renderSwatch() {
        const { active, el, internalColor } = this;
        const borderRadius = active ? "100%" : "0";
        const theme = dom.getModeName(el);
        const borderColor = theme === "light" ? COLORS.borderLight : COLORS.borderDark;
        const isEmpty = !internalColor;
        const commonSwatchProps = {
            height: "100%",
            rx: borderRadius,
            stroke: borderColor,
            strokeWidth: "2",
            width: "100%",
        };
        if (isEmpty) {
            return (index.h(index.Fragment, null, index.h("clipPath", { id: "shape" }, index.h("rect", { height: "100%", rx: borderRadius, width: "100%" })), this.renderSwatchRect({
                clipPath: `inset(0 round ${borderRadius})`,
                ...commonSwatchProps,
            }), index.h("line", { "clip-path": "url(#shape)", "stroke-width": "3", x1: "100%", x2: "0", y1: "0", y2: "100%" })));
        }
        const alpha = internalColor.alpha();
        const hex = utils.hexify(internalColor);
        const hexa = utils.hexify(internalColor, alpha < 1);
        return (index.h(index.Fragment, null, index.h("title", null, hexa), index.h("defs", null, index.h("pattern", { height: CHECKER_DIMENSIONS.size, id: "checker", patternUnits: "userSpaceOnUse", width: CHECKER_DIMENSIONS.size, x: "0", y: "0" }, index.h("rect", { class: CSS.checker, height: CHECKER_DIMENSIONS.squareSize, width: CHECKER_DIMENSIONS.squareSize, x: "0", y: "0" }), index.h("rect", { class: CSS.checker, height: CHECKER_DIMENSIONS.squareSize, width: CHECKER_DIMENSIONS.squareSize, x: CHECKER_DIMENSIONS.squareSize, y: CHECKER_DIMENSIONS.squareSize }))), this.renderSwatchRect({
            fill: "url(#checker)",
            rx: commonSwatchProps.rx,
            height: commonSwatchProps.height,
            width: commonSwatchProps.width,
        }), this.renderSwatchRect({
            clipPath: alpha < 1 ? "polygon(100% 0, 0 0, 0 100%)" : `inset(0 round ${borderRadius})`,
            fill: hex,
            ...commonSwatchProps,
        }), alpha < 1
            ? this.renderSwatchRect({
                clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
                fill: hexa,
                key: "opacity-fill",
                ...commonSwatchProps,
            })
            : null));
    }
    renderSwatchRect({ clipPath, fill, height, key, rx, stroke, strokeWidth, width, }) {
        return (index.h("rect", { "clip-path": clipPath, fill: fill, height: height, key: key, rx: rx, stroke: stroke, "stroke-width": strokeWidth, width: width }));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "color": ["handleColorChange"]
    }; }
};
ColorPickerSwatch.style = CalciteColorPickerSwatchStyle0;

exports.calcite_color_picker_hex_input = ColorPickerHexInput;
exports.calcite_color_picker_swatch = ColorPickerSwatch;
