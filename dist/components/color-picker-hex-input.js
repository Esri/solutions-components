/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { c as Color, s as isLonghandHex, u as isShorthandHex, i as isValidHex, v as rgbToHex, n as normalizeHex, o as opacityToAlpha, a as hexify, w as hexChar, O as OPACITY_LIMITS, e as alphaToOpacity } from './utils.js';
import { f as focusElement } from './dom.js';
import { s as setUpLoadableComponent, a as setComponentLoaded, c as componentFocusable } from './loadable.js';
import { d as defineCustomElement$4 } from './icon.js';
import { d as defineCustomElement$3 } from './input-number.js';
import { d as defineCustomElement$2 } from './input-text.js';
import { d as defineCustomElement$1 } from './progress.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const CSS = {
    container: "container",
    hexInput: "hex-input",
    opacityInput: "opacity-input",
};

const colorPickerHexInputCss = ":host{display:block}.container{display:flex;inline-size:100%;flex-wrap:nowrap;align-items:center}.hex-input{flex-grow:1;text-transform:uppercase}.opacity-input{inline-size:68px;margin-inline-start:-1px}:host([scale=s]) .container{flex-wrap:wrap;row-gap:0.125rem}:host([scale=s]) .opacity-input{inline-size:unset;margin-inline-start:unset}:host([scale=l]) .opacity-input{inline-size:88px}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteColorPickerHexInputStyle0 = colorPickerHexInputCss;

const DEFAULT_COLOR = Color();
const ColorPickerHexInput = /*@__PURE__*/ proxyCustomElement(class ColorPickerHexInput extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
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
        return (h("div", { key: '70f804fdbc3c29fdf49616f56c39593fdc3717da', class: CSS.container }, h("calcite-input-text", { key: '777d1f8ffa673a0d74f049d4a6bdacbf3510006a', class: CSS.hexInput, label: messages?.hex || hexLabel, maxLength: this.alphaChannel ? 8 : 6, onCalciteInputTextChange: this.onHexInputChange, onCalciteInputTextInput: this.onHexInputInput, onCalciteInternalInputTextBlur: this.onHexInputBlur, onCalciteInternalInputTextFocus: this.onInputFocus, onKeyDown: this.onInputKeyDown, onPaste: this.onHexInputPaste, prefixText: "#", ref: this.storeHexInputRef, scale: inputScale, value: hexInputValue }), alphaChannel ? (h("calcite-input-number", { class: CSS.opacityInput, key: "opacity-input", label: messages?.opacity, max: OPACITY_LIMITS.max, maxLength: 3, min: OPACITY_LIMITS.min, numberButtonType: "none", numberingSystem: this.numberingSystem, onCalciteInputNumberInput: this.onOpacityInputInput, onCalciteInternalInputNumberBlur: this.onOpacityInputBlur, onCalciteInternalInputNumberFocus: this.onInputFocus, onKeyDown: this.onInputKeyDown, ref: this.storeOpacityInputRef, scale: inputScale, suffixText: "%", value: opacityInputValue })) : null));
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
    get el() { return this; }
    static get watchers() { return {
        "value": ["handleValueChange"]
    }; }
    static get style() { return CalciteColorPickerHexInputStyle0; }
}, [1, "calcite-color-picker-hex-input", {
        "allowEmpty": [4, "allow-empty"],
        "alphaChannel": [4, "alpha-channel"],
        "hexLabel": [1, "hex-label"],
        "messages": [16],
        "numberingSystem": [1, "numbering-system"],
        "scale": [513],
        "value": [1537],
        "internalColor": [32],
        "setFocus": [64]
    }, undefined, {
        "value": ["handleValueChange"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-color-picker-hex-input", "calcite-icon", "calcite-input-number", "calcite-input-text", "calcite-progress"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-color-picker-hex-input":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, ColorPickerHexInput);
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "calcite-input-number":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "calcite-input-text":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "calcite-progress":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { ColorPickerHexInput as C, defineCustomElement as d };
