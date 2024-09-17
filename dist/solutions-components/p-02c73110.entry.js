/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, g as getElement, F as Fragment } from './p-6eb37ed2.js';
import { a as Color, q as isLonghandHex, r as isShorthandHex, s as isValidHex, u as rgbToHex, n as normalizeHex, o as opacityToAlpha, h as hexify, v as hexChar, O as OPACITY_LIMITS, c as alphaToOpacity } from './p-bc1d8894.js';
import { e as focusElement, x as getModeName } from './p-68ec5c15.js';
import { s as setUpLoadableComponent, a as setComponentLoaded, c as componentFocusable } from './p-18f18ab3.js';
import './p-ff8343ec.js';
import './p-b39c5275.js';
import './p-acaae81d.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const CSS$1 = {
    container: "container",
    hexInput: "hex-input",
    opacityInput: "opacity-input",
};

const colorPickerHexInputCss = ":host{display:block}.container{display:flex;inline-size:100%;flex-wrap:nowrap;align-items:center}.hex-input{flex-grow:1;text-transform:uppercase}.opacity-input{inline-size:68px;margin-inline-start:-1px}:host([scale=s]) .container{flex-wrap:wrap;row-gap:0.125rem}:host([scale=s]) .opacity-input{inline-size:unset;margin-inline-start:unset}:host([scale=l]) .opacity-input{inline-size:88px}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteColorPickerHexInputStyle0 = colorPickerHexInputCss;

const DEFAULT_COLOR = Color();
const ColorPickerHexInput = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.calciteColorPickerHexInputChange = createEvent(this, "calciteColorPickerHexInputChange", 6);
        this.onHexInputBlur = () => {
            const node = this.hexInputNode;
            const inputValue = node.value;
            const hex = `#${inputValue}`;
            const { allowEmpty, internalColor } = this;
            const willClearValue = allowEmpty && !inputValue;
            const isLonghand = isLonghandHex(hex);
            if (isShorthandHex(hex, this.alphaChannel)) {
                // ensure modified pasted hex values are committed since we prevent default to remove the # char.
                this.onHexInputChange();
            }
            if (willClearValue || (isValidHex(hex) && isLonghand)) {
                return;
            }
            // manipulating DOM directly since rerender doesn't update input value
            node.value =
                allowEmpty && !internalColor
                    ? ""
                    : this.formatHexForInternalInput(rgbToHex(
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
                const normalized = normalizeHex(value, false);
                const preserveExistingAlpha = isValidHex(normalized) && this.alphaChannel;
                if (preserveExistingAlpha && this.internalColor) {
                    const alphaHex = normalizeHex(this.internalColor.hexa(), true).slice(-2);
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
                const alpha = opacityToAlpha(Number(node.value));
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
            if (isValidHex(hexInputValue, this.alphaChannel) &&
                isLonghandHex(hexInputValue, this.alphaChannel)) {
                this.internalSetValue(hexInputValue, oldValue);
            }
        };
        this.onInputKeyDown = (event) => {
            const { altKey, ctrlKey, metaKey, shiftKey } = event;
            const { alphaChannel, hexInputNode, internalColor, value } = this;
            const { key } = event;
            const composedPath = event.composedPath();
            if ((key === "Tab" && isShorthandHex(value, this.alphaChannel)) || key === "Enter") {
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
                this.internalSetValue(hexify(this.nudgeRGBChannels(internalColor, bump * direction, composedPath.includes(hexInputNode) ? "rgb" : "a"), alphaChannel), oldValue);
                event.preventDefault();
                return;
            }
            const withModifiers = altKey || ctrlKey || metaKey;
            const singleChar = key.length === 1;
            const validHexChar = hexChar.test(key);
            if (singleChar && !withModifiers && !validHexChar) {
                event.preventDefault();
            }
        };
        this.onHexInputPaste = (event) => {
            const hex = event.clipboardData.getData("text");
            if (isValidHex(hex, this.alphaChannel) && isLonghandHex(hex, this.alphaChannel)) {
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
        this.value = normalizeHex(hexify(DEFAULT_COLOR, this.alphaChannel), this.alphaChannel, true);
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
            const normalized = normalizeHex(value, alphaChannel);
            if (isValidHex(normalized, alphaChannel)) {
                this.internalSetValue(normalized, normalized, false);
            }
            return;
        }
        if (allowEmpty) {
            this.internalSetValue(null, null, false);
        }
    }
    componentWillLoad() {
        setUpLoadableComponent(this);
    }
    componentDidLoad() {
        setComponentLoaded(this);
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
        return (h("div", { key: '7f3098ef31cae459bb4816fbea34cc74c174ec87', class: CSS$1.container }, h("calcite-input-text", { key: '66b3c778e3340ac4f9b91c4198b964c26c6a7347', class: CSS$1.hexInput, label: messages?.hex || hexLabel, maxLength: this.alphaChannel ? 8 : 6, onCalciteInputTextChange: this.onHexInputChange, onCalciteInputTextInput: this.onHexInputInput, onCalciteInternalInputTextBlur: this.onHexInputBlur, onCalciteInternalInputTextFocus: this.onInputFocus, onKeyDown: this.onInputKeyDown, onPaste: this.onHexInputPaste, prefixText: "#", ref: this.storeHexInputRef, scale: inputScale, value: hexInputValue }), alphaChannel ? (h("calcite-input-number", { class: CSS$1.opacityInput, key: "opacity-input", label: messages?.opacity, max: OPACITY_LIMITS.max, maxLength: 3, min: OPACITY_LIMITS.min, numberButtonType: "none", numberingSystem: this.numberingSystem, onCalciteInputNumberInput: this.onOpacityInputInput, onCalciteInternalInputNumberBlur: this.onOpacityInputBlur, onCalciteInternalInputNumberFocus: this.onInputFocus, onKeyDown: this.onInputKeyDown, ref: this.storeOpacityInputRef, scale: inputScale, suffixText: "%", value: opacityInputValue })) : null));
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /** Sets focus on the component. */
    async setFocus() {
        await componentFocusable(this);
        return focusElement(this.hexInputNode);
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    internalSetValue(value, oldValue, emit = true) {
        if (value) {
            const { alphaChannel } = this;
            const normalized = normalizeHex(value, alphaChannel, alphaChannel);
            if (isValidHex(normalized, alphaChannel)) {
                const { internalColor: currentColor } = this;
                const nextColor = Color(normalized);
                const normalizedLonghand = normalizeHex(hexify(nextColor, alphaChannel), alphaChannel);
                const changed = !currentColor ||
                    normalizedLonghand !== normalizeHex(hexify(currentColor, alphaChannel), alphaChannel);
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
        return color ? `${alphaToOpacity(color.alpha())}` : "";
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
            const nudgedAlpha = opacityToAlpha(alphaToOpacity(color.alpha()) + amount);
            nudgedChannels = [...rgbChannels, nudgedAlpha];
        }
        return Color(nudgedChannels);
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "value": ["handleValueChange"]
    }; }
};
ColorPickerHexInput.style = CalciteColorPickerHexInputStyle0;

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
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
        registerInstance(this, hostRef);
        this.active = false;
        this.color = undefined;
        this.scale = "m";
    }
    handleColorChange(color) {
        this.internalColor = color ? Color(color) : null;
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
        return (h("svg", { key: 'b29377be8ce0518f7b0f3691dcb1dda08890dd94', class: classes, xmlns: "http://www.w3.org/2000/svg" }, this.renderSwatch()));
    }
    renderSwatch() {
        const { active, el, internalColor } = this;
        const borderRadius = active ? "100%" : "0";
        const theme = getModeName(el);
        const borderColor = theme === "light" ? COLORS.borderLight : COLORS.borderDark;
        const commonSwatchProps = {
            height: "100%",
            rx: borderRadius,
            stroke: borderColor,
            // stroke-width and clip-path are needed to hide overflowing portion of stroke
            // see https://stackoverflow.com/a/7273346/194216
            // using attribute to work around Stencil using the prop name vs the attribute when rendering
            ["stroke-width"]: "2",
            width: "100%",
        };
        const isEmpty = !internalColor;
        if (isEmpty) {
            return (h(Fragment, null, h("clipPath", { id: "shape" }, h("rect", { height: "100%", rx: borderRadius, width: "100%" })), h("rect", { "clip-path": `inset(0 round ${borderRadius})`, rx: borderRadius, ...commonSwatchProps }), h("line", { "clip-path": "url(#shape)", "stroke-width": "3", x1: "100%", x2: "0", y1: "0", y2: "100%" })));
        }
        const alpha = internalColor.alpha();
        const hex = hexify(internalColor);
        const hexa = hexify(internalColor, alpha < 1);
        return (h(Fragment, null, h("title", null, hexa), h("defs", null, h("pattern", { height: CHECKER_DIMENSIONS.size, id: "checker", patternUnits: "userSpaceOnUse", width: CHECKER_DIMENSIONS.size, x: "0", y: "0" }, h("rect", { class: CSS.checker, height: CHECKER_DIMENSIONS.squareSize, width: CHECKER_DIMENSIONS.squareSize, x: "0", y: "0" }), h("rect", { class: CSS.checker, height: CHECKER_DIMENSIONS.squareSize, width: CHECKER_DIMENSIONS.squareSize, x: CHECKER_DIMENSIONS.squareSize, y: CHECKER_DIMENSIONS.squareSize }))), h("rect", { fill: "url(#checker)", height: "100%", rx: borderRadius, width: "100%" }), h("rect", { fill: hex, style: {
                "clip-path": alpha < 1 ? "polygon(100% 0, 0 0, 0 100%)" : `inset(0 round ${borderRadius})`,
            }, ...commonSwatchProps }), alpha < 1 ? (h("rect", { fill: hexa, key: "opacity-fill", style: { "clip-path": "polygon(100% 0, 100% 100%, 0 100%)" }, ...commonSwatchProps })) : null));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "color": ["handleColorChange"]
    }; }
};
ColorPickerSwatch.style = CalciteColorPickerSwatchStyle0;

export { ColorPickerHexInput as calcite_color_picker_hex_input, ColorPickerSwatch as calcite_color_picker_swatch };
