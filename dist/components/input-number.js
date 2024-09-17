/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, forceUpdate, h, Host } from '@stencil/core/internal/client';
import { i as isPrimaryPointerButton, s as setRequestedIcon, a as getSlotted, g as getElementDir, t as toAriaBoolean } from './dom.js';
import { s as submitForm, c as connectForm, i as internalHiddenInputInputEvent, d as disconnectForm, H as HiddenFormInputSlot } from './form.js';
import { c as connectInteractive, d as disconnectInteractive, u as updateHostInteraction, I as InteractiveContainer } from './interactive.js';
import { n as numberKeys } from './key.js';
import { c as connectLabel, d as disconnectLabel, g as getLabelText } from './label.js';
import { a as setComponentLoaded, s as setUpLoadableComponent, c as componentFocusable } from './loadable.js';
import { n as numberStringFormatter, i as isValidNumber, p as parseNumberString, s as sanitizeNumberString, a as addLocalizedTrailingDecimalZeros, c as connectLocalized, d as disconnectLocalized, B as BigDecimal } from './locale2.js';
import { c as createObserver } from './observers.js';
import { C as CSS_UTILITY } from './resources.js';
import { u as updateMessages, c as connectMessages, d as disconnectMessages, s as setUpMessages } from './t9n.js';
import { g as getIconScale } from './component.js';
import { V as Validation } from './Validation.js';
import { s as syncHiddenFormInput } from './input2.js';
import { d as defineCustomElement$2 } from './icon.js';
import { d as defineCustomElement$1 } from './progress.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const CSS = {
    loader: "loader",
    clearButton: "clear-button",
    editingEnabled: "editing-enabled",
    inlineChild: "inline-child",
    inputIcon: "icon",
    prefix: "prefix",
    suffix: "suffix",
    numberButtonWrapper: "number-button-wrapper",
    buttonItemHorizontal: "number-button-item--horizontal",
    wrapper: "element-wrapper",
    inputWrapper: "wrapper",
    actionWrapper: "action-wrapper",
    resizeIconWrapper: "resize-icon-wrapper",
    numberButtonItem: "number-button-item",
};
const IDS = {
    validationMessage: "inputNumberValidationMessage",
};
const SLOTS = {
    action: "action",
};

const inputNumberCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block}:host([scale=s]) input,:host([scale=s]) .prefix,:host([scale=s]) .suffix{block-size:1.5rem;padding-inline:0.5rem;font-size:var(--calcite-font-size--2);line-height:1rem}:host([scale=s]) .number-button-wrapper,:host([scale=s]) .action-wrapper calcite-button,:host([scale=s]) .action-wrapper calcite-button button{block-size:1.5rem}:host([scale=s]) .clear-button{min-block-size:1.5rem;min-inline-size:1.5rem}:host([scale=m]) input,:host([scale=m]) .prefix,:host([scale=m]) .suffix{block-size:2rem;padding-inline:0.75rem;font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=m]) .number-button-wrapper,:host([scale=m]) .action-wrapper calcite-button,:host([scale=m]) .action-wrapper calcite-button button{block-size:2rem}:host([scale=m]) .clear-button{min-block-size:2rem;min-inline-size:2rem}:host([scale=l]) input,:host([scale=l]) .prefix,:host([scale=l]) .suffix{block-size:2.75rem;padding-inline:1rem;font-size:var(--calcite-font-size-0);line-height:1.25rem}:host([scale=l]) .number-button-wrapper,:host([scale=l]) .action-wrapper calcite-button,:host([scale=l]) .action-wrapper calcite-button button{block-size:2.75rem}:host([scale=l]) .clear-button{min-block-size:2.75rem;min-inline-size:2.75rem}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}input{transition:var(--calcite-animation-timing), block-size 0, outline-offset 0s;-webkit-appearance:none;position:relative;margin:0px;box-sizing:border-box;display:flex;max-block-size:100%;inline-size:100%;max-inline-size:100%;flex:1 1 0%;text-overflow:ellipsis;border-radius:0px;background-color:var(--calcite-color-foreground-1);font-family:inherit;font-weight:var(--calcite-font-weight-normal);color:var(--calcite-color-text-1)}input:-moz-placeholder-shown{text-overflow:ellipsis}input:placeholder-shown{text-overflow:ellipsis}input{border-width:1px;border-style:solid;border-color:var(--calcite-color-border-input);color:var(--calcite-color-text-1)}input::placeholder,input:-ms-input-placeholder,input::-ms-input-placeholder{font-weight:var(--calcite-font-weight-normal);color:var(--calcite-color-text-3)}input:focus{border-color:var(--calcite-color-brand);color:var(--calcite-color-text-1)}input[readonly]{background-color:var(--calcite-color-background);font-weight:var(--calcite-font-weight-medium)}input[readonly]:focus{color:var(--calcite-color-text-1)}calcite-icon{color:var(--calcite-color-text-3)}input{outline-color:transparent}input:focus{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}:host([status=invalid]) input{border-color:var(--calcite-color-status-danger)}:host([status=invalid]) input:focus{outline:2px solid var(--calcite-color-status-danger);outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}:host([scale=s]) .icon{inset-inline-start:0.5rem}:host([scale=m]) .icon{inset-inline-start:0.75rem}:host([scale=l]) .icon{inset-inline-start:1rem}:host([icon][scale=s]) input{padding-inline-start:2rem}:host([icon][scale=m]) input{padding-inline-start:2.5rem}:host([icon][scale=l]) input{padding-inline-start:3.5rem}.element-wrapper{position:relative;order:3;display:inline-flex;flex:1 1 0%;align-items:center}.icon{pointer-events:none;position:absolute;z-index:var(--calcite-z-index);display:block;transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s}.clear-button{pointer-events:initial;order:4;margin:0px;box-sizing:border-box;display:flex;min-block-size:100%;cursor:pointer;align-items:center;justify-content:center;align-self:stretch;border-width:1px;border-style:solid;border-color:var(--calcite-color-border-input);background-color:var(--calcite-color-foreground-1);outline-color:transparent;border-inline-start-width:0px}.clear-button:hover{background-color:var(--calcite-color-foreground-2);transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s}.clear-button:hover calcite-icon{color:var(--calcite-color-text-1);transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s}.clear-button:active{background-color:var(--calcite-color-foreground-3)}.clear-button:active calcite-icon{color:var(--calcite-color-text-1)}.clear-button:focus{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.clear-button:disabled{opacity:var(--calcite-opacity-disabled)}.loader{inset-block-start:1px;inset-inline:1px;pointer-events:none;position:absolute;display:block}.action-wrapper{order:7;display:flex}.prefix,.suffix{box-sizing:border-box;display:flex;block-size:auto;min-block-size:100%;-webkit-user-select:none;-moz-user-select:none;user-select:none;align-content:center;align-items:center;overflow-wrap:break-word;border-width:1px;border-style:solid;border-color:var(--calcite-color-border-input);background-color:var(--calcite-color-background);font-weight:var(--calcite-font-weight-medium);line-height:1;color:var(--calcite-color-text-2)}.prefix{order:2;border-inline-end-width:0px}.suffix{order:5;border-inline-start-width:0px}:host([alignment=start]) input{text-align:start}:host([alignment=end]) input{text-align:end}.number-button-wrapper{pointer-events:none;order:6;box-sizing:border-box;display:flex;flex-direction:column;transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s}:host([number-button-type=vertical]) .wrapper{flex-direction:row;display:flex}:host([number-button-type=vertical]) input{order:2}:host([number-button-type=horizontal]) .calcite--rtl .number-button-item[data-adjustment=down] calcite-icon{transform:rotate(-90deg)}:host([number-button-type=horizontal]) .calcite--rtl .number-button-item[data-adjustment=up] calcite-icon{transform:rotate(-90deg)}.number-button-item.number-button-item--horizontal[data-adjustment=down],.number-button-item.number-button-item--horizontal[data-adjustment=up]{order:1;max-block-size:100%;min-block-size:100%;align-self:stretch}.number-button-item.number-button-item--horizontal[data-adjustment=down] calcite-icon,.number-button-item.number-button-item--horizontal[data-adjustment=up] calcite-icon{transform:rotate(90deg)}.number-button-item.number-button-item--horizontal[data-adjustment=down]{border-width:1px;border-style:solid;border-color:var(--calcite-color-border-input);border-inline-end-width:0px}.number-button-item.number-button-item--horizontal[data-adjustment=down]:hover{background-color:var(--calcite-color-foreground-2)}.number-button-item.number-button-item--horizontal[data-adjustment=down]:hover calcite-icon{color:var(--calcite-color-text-1)}.number-button-item.number-button-item--horizontal[data-adjustment=up]{order:5}.number-button-item.number-button-item--horizontal[data-adjustment=up]:hover{background-color:var(--calcite-color-foreground-2)}.number-button-item.number-button-item--horizontal[data-adjustment=up]:hover calcite-icon{color:var(--calcite-color-text-1)}:host([number-button-type=vertical]) .number-button-item[data-adjustment=down]:hover{background-color:var(--calcite-color-foreground-2)}:host([number-button-type=vertical]) .number-button-item[data-adjustment=down]:hover calcite-icon{color:var(--calcite-color-text-1)}:host([number-button-type=vertical]) .number-button-item[data-adjustment=up]:hover{background-color:var(--calcite-color-foreground-2)}:host([number-button-type=vertical]) .number-button-item[data-adjustment=up]:hover calcite-icon{color:var(--calcite-color-text-1)}:host([number-button-type=vertical]) .number-button-item[data-adjustment=down]{border-block-start-width:0px}.number-button-item{max-block-size:50%;min-block-size:50%;pointer-events:initial;margin:0px;box-sizing:border-box;display:flex;cursor:pointer;align-items:center;align-self:center;border-width:1px;border-style:solid;border-color:var(--calcite-color-border-input);background-color:var(--calcite-color-foreground-1);padding-block:0px;padding-inline:0.5rem;transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;border-inline-start-width:0px}.number-button-item calcite-icon{pointer-events:none;transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s}.number-button-item:focus{background-color:var(--calcite-color-foreground-2)}.number-button-item:focus calcite-icon{color:var(--calcite-color-text-1)}.number-button-item:active{background-color:var(--calcite-color-foreground-3)}.number-button-item:disabled{pointer-events:none}.wrapper{position:relative;display:flex;flex-direction:row;align-items:center}:host(.no-bottom-border) input{border-block-end-width:0px}:host(.border-top-color-one) input{border-block-start-color:var(--calcite-color-border-1)}input.inline-child{background-color:transparent;transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s}input.inline-child .editing-enabled{background-color:inherit}input.inline-child:not(.editing-enabled){display:flex;cursor:pointer;text-overflow:ellipsis;border-color:transparent;padding-inline-start:0}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:0.5rem}:host([scale=s]) .validation-container{padding-block-start:0.25rem}::slotted(input[slot=hidden-form-input]){margin:0 !important;opacity:0 !important;outline:none !important;padding:0 !important;position:absolute !important;inset:0 !important;transform:none !important;-webkit-appearance:none !important;z-index:-1 !important}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteInputNumberStyle0 = inputNumberCss;

const InputNumber = /*@__PURE__*/ proxyCustomElement(class InputNumber extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.calciteInternalInputNumberFocus = createEvent(this, "calciteInternalInputNumberFocus", 6);
        this.calciteInternalInputNumberBlur = createEvent(this, "calciteInternalInputNumberBlur", 6);
        this.calciteInputNumberInput = createEvent(this, "calciteInputNumberInput", 7);
        this.calciteInputNumberChange = createEvent(this, "calciteInputNumberChange", 6);
        this.previousValueOrigin = "initial";
        this.mutationObserver = createObserver("mutation", () => this.setDisabledAction());
        this.userChangedValue = false;
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        this.keyDownHandler = (event) => {
            if (this.readOnly || this.disabled || event.defaultPrevented) {
                return;
            }
            if (this.isClearable && event.key === "Escape") {
                this.clearInputValue(event);
                event.preventDefault();
            }
            if (event.key === "Enter") {
                if (submitForm(this)) {
                    event.preventDefault();
                }
            }
        };
        this.clearInputValue = (nativeEvent) => {
            this.setNumberValue({
                committing: true,
                nativeEvent,
                origin: "user",
                value: "",
            });
        };
        this.emitChangeIfUserModified = () => {
            if (this.previousValueOrigin === "user" && this.value !== this.previousEmittedNumberValue) {
                this.calciteInputNumberChange.emit();
                this.setPreviousEmittedNumberValue(this.value);
            }
        };
        this.inputNumberBlurHandler = () => {
            window.clearInterval(this.nudgeNumberValueIntervalId);
            this.calciteInternalInputNumberBlur.emit();
            this.emitChangeIfUserModified();
        };
        this.clickHandler = (event) => {
            if (this.disabled) {
                return;
            }
            const composedPath = event.composedPath();
            if (!composedPath.includes(this.inputWrapperEl) ||
                composedPath.includes(this.actionWrapperEl)) {
                return;
            }
            this.setFocus();
        };
        this.inputNumberFocusHandler = () => {
            this.calciteInternalInputNumberFocus.emit();
        };
        this.inputNumberInputHandler = (nativeEvent) => {
            if (this.disabled || this.readOnly) {
                return;
            }
            if (this.value === "Infinity" || this.value === "-Infinity") {
                return;
            }
            const value = nativeEvent.target.value;
            numberStringFormatter.numberFormatOptions = {
                locale: this.effectiveLocale,
                numberingSystem: this.numberingSystem,
                useGrouping: this.groupSeparator,
            };
            const delocalizedValue = numberStringFormatter.delocalize(value);
            if (nativeEvent.inputType === "insertFromPaste") {
                if (!isValidNumber(delocalizedValue) ||
                    (this.integer && (delocalizedValue.includes("e") || delocalizedValue.includes(".")))) {
                    nativeEvent.preventDefault();
                }
                this.setNumberValue({
                    nativeEvent,
                    origin: "user",
                    value: parseNumberString(delocalizedValue),
                });
                this.childNumberEl.value = this.displayedValue;
            }
            else {
                this.setNumberValue({
                    nativeEvent,
                    origin: "user",
                    value: delocalizedValue,
                });
            }
        };
        this.inputNumberKeyDownHandler = (event) => {
            if (this.disabled || this.readOnly) {
                return;
            }
            if (this.value === "Infinity" || this.value === "-Infinity") {
                event.preventDefault();
                if (event.key === "Backspace" || event.key === "Delete") {
                    this.clearInputValue(event);
                }
                return;
            }
            if (event.key === "ArrowUp") {
                /* prevent default behavior of moving cursor to the beginning of the input when holding down ArrowUp */
                event.preventDefault();
                this.nudgeNumberValue("up", event);
                return;
            }
            if (event.key === "ArrowDown") {
                this.nudgeNumberValue("down", event);
                return;
            }
            const supportedKeys = [
                ...numberKeys,
                "ArrowLeft",
                "ArrowRight",
                "Backspace",
                "Delete",
                "Enter",
                "Escape",
                "Tab",
            ];
            if (event.altKey || event.ctrlKey || event.metaKey) {
                return;
            }
            const isShiftTabEvent = event.shiftKey && event.key === "Tab";
            if (supportedKeys.includes(event.key) || isShiftTabEvent) {
                if (event.key === "Enter") {
                    this.emitChangeIfUserModified();
                }
                return;
            }
            numberStringFormatter.numberFormatOptions = {
                locale: this.effectiveLocale,
                numberingSystem: this.numberingSystem,
                useGrouping: this.groupSeparator,
            };
            if (event.key === numberStringFormatter.decimal && !this.integer) {
                if (!this.value && !this.childNumberEl.value) {
                    return;
                }
                if (this.value && this.childNumberEl.value.indexOf(numberStringFormatter.decimal) === -1) {
                    return;
                }
            }
            if (/[eE]/.test(event.key) && !this.integer) {
                if (!this.value && !this.childNumberEl.value) {
                    return;
                }
                if (this.value && !/[eE]/.test(this.childNumberEl.value)) {
                    return;
                }
            }
            if (event.key === "-") {
                if (!this.value && !this.childNumberEl.value) {
                    return;
                }
                if (this.value && this.childNumberEl.value.split("-").length <= 2) {
                    return;
                }
            }
            event.preventDefault();
        };
        this.nudgeNumberValue = (direction, nativeEvent) => {
            if (nativeEvent instanceof KeyboardEvent && nativeEvent.repeat) {
                return;
            }
            const inputMax = this.maxString ? parseFloat(this.maxString) : null;
            const inputMin = this.minString ? parseFloat(this.minString) : null;
            const valueNudgeDelayInMs = 150;
            this.incrementOrDecrementNumberValue(direction, inputMax, inputMin, nativeEvent);
            if (this.nudgeNumberValueIntervalId) {
                window.clearInterval(this.nudgeNumberValueIntervalId);
            }
            let firstValueNudge = true;
            this.nudgeNumberValueIntervalId = window.setInterval(() => {
                if (firstValueNudge) {
                    firstValueNudge = false;
                    return;
                }
                this.incrementOrDecrementNumberValue(direction, inputMax, inputMin, nativeEvent);
            }, valueNudgeDelayInMs);
        };
        this.nudgeButtonPointerUpHandler = (event) => {
            if (!isPrimaryPointerButton(event)) {
                return;
            }
            window.clearInterval(this.nudgeNumberValueIntervalId);
        };
        this.nudgeButtonPointerOutHandler = () => {
            window.clearInterval(this.nudgeNumberValueIntervalId);
        };
        this.nudgeButtonPointerDownHandler = (event) => {
            if (!isPrimaryPointerButton(event)) {
                return;
            }
            event.preventDefault();
            const direction = event.target.dataset.adjustment;
            if (!this.disabled) {
                this.nudgeNumberValue(direction, event);
            }
        };
        this.onHiddenFormInputInput = (event) => {
            if (event.target.name === this.name) {
                this.setNumberValue({
                    value: event.target.value,
                    origin: "direct",
                });
            }
            this.setFocus();
            event.stopPropagation();
        };
        this.setChildNumberElRef = (el) => {
            this.childNumberEl = el;
        };
        this.setInputNumberValue = (newInputValue) => {
            if (!this.childNumberEl) {
                return;
            }
            this.childNumberEl.value = newInputValue;
        };
        this.setPreviousEmittedNumberValue = (value) => {
            this.previousEmittedNumberValue = this.normalizeValue(value);
        };
        this.setPreviousNumberValue = (value) => {
            this.previousValue = this.normalizeValue(value);
        };
        this.setNumberValue = ({ committing = false, nativeEvent, origin, previousValue, value, }) => {
            numberStringFormatter.numberFormatOptions = {
                locale: this.effectiveLocale,
                numberingSystem: this.numberingSystem,
                useGrouping: this.groupSeparator,
            };
            const isValueDeleted = this.previousValue?.length > value.length || this.value?.length > value.length;
            const valueHandleInteger = this.integer ? value.replace(/[e.]/g, "") : value;
            const hasTrailingDecimalSeparator = valueHandleInteger.charAt(valueHandleInteger.length - 1) === ".";
            const sanitizedValue = hasTrailingDecimalSeparator && isValueDeleted
                ? valueHandleInteger
                : sanitizeNumberString(valueHandleInteger);
            const newValue = value && !sanitizedValue
                ? isValidNumber(this.previousValue)
                    ? this.previousValue
                    : ""
                : sanitizedValue;
            let newLocalizedValue = numberStringFormatter.localize(newValue);
            if (origin !== "connected" && !hasTrailingDecimalSeparator) {
                newLocalizedValue = addLocalizedTrailingDecimalZeros(newLocalizedValue, newValue, numberStringFormatter);
            }
            // adds localized trailing decimal separator
            this.displayedValue =
                hasTrailingDecimalSeparator && isValueDeleted
                    ? `${newLocalizedValue}${numberStringFormatter.decimal}`
                    : newLocalizedValue;
            this.setPreviousNumberValue(previousValue ?? this.value);
            this.previousValueOrigin = origin;
            this.userChangedValue = origin === "user" && this.value !== newValue;
            // don't sanitize the start of negative/decimal numbers, but
            // don't set value to an invalid number
            this.value = ["-", "."].includes(newValue) ? "" : newValue;
            if (origin === "direct") {
                this.setInputNumberValue(newLocalizedValue);
                this.setPreviousEmittedNumberValue(newLocalizedValue);
            }
            if (nativeEvent) {
                const calciteInputNumberInputEvent = this.calciteInputNumberInput.emit();
                if (calciteInputNumberInputEvent.defaultPrevented) {
                    this.value = this.previousValue;
                    this.displayedValue = numberStringFormatter.localize(this.previousValue);
                }
                else if (committing) {
                    this.emitChangeIfUserModified();
                }
            }
        };
        this.inputNumberKeyUpHandler = () => {
            window.clearInterval(this.nudgeNumberValueIntervalId);
        };
        this.alignment = "start";
        this.autofocus = undefined;
        this.clearable = false;
        this.disabled = false;
        this.enterKeyHint = undefined;
        this.form = undefined;
        this.groupSeparator = false;
        this.icon = undefined;
        this.iconFlipRtl = false;
        this.inputMode = undefined;
        this.integer = false;
        this.label = undefined;
        this.loading = false;
        this.numberingSystem = undefined;
        this.localeFormat = false;
        this.max = undefined;
        this.min = undefined;
        this.maxLength = undefined;
        this.minLength = undefined;
        this.validationMessage = undefined;
        this.validationIcon = undefined;
        this.validity = {
            valid: false,
            badInput: false,
            customError: false,
            patternMismatch: false,
            rangeOverflow: false,
            rangeUnderflow: false,
            stepMismatch: false,
            tooLong: false,
            tooShort: false,
            typeMismatch: false,
            valueMissing: false,
        };
        this.name = undefined;
        this.numberButtonType = "vertical";
        this.placeholder = undefined;
        this.prefixText = undefined;
        this.readOnly = false;
        this.required = false;
        this.scale = "m";
        this.status = "idle";
        this.step = undefined;
        this.autocomplete = undefined;
        this.suffixText = undefined;
        this.editingEnabled = false;
        this.value = "";
        this.messages = undefined;
        this.messageOverrides = undefined;
        this.effectiveLocale = "";
        this.defaultMessages = undefined;
        this.displayedValue = undefined;
        this.slottedActionElDisabledInternally = false;
    }
    //--------------------------------------------------------------------------
    //
    //  Global attributes
    //
    //--------------------------------------------------------------------------
    handleGlobalAttributesChanged() {
        forceUpdate(this);
    }
    disabledWatcher() {
        this.setDisabledAction();
    }
    /** watcher to update number-to-string for max */
    maxWatcher() {
        this.maxString = this.max?.toString() || null;
    }
    /** watcher to update number-to-string for min */
    minWatcher() {
        this.minString = this.min?.toString() || null;
    }
    onMessagesChange() {
        /* wired up by t9n util */
    }
    valueWatcher(newValue, previousValue) {
        if (!this.userChangedValue) {
            if (newValue === "Infinity" || newValue === "-Infinity") {
                this.displayedValue = newValue;
                this.previousEmittedNumberValue = newValue;
                return;
            }
            this.setNumberValue({
                origin: "direct",
                previousValue,
                value: newValue == null || newValue == ""
                    ? ""
                    : isValidNumber(newValue)
                        ? newValue
                        : this.previousValue || "",
            });
            this.warnAboutInvalidNumberValue(newValue);
        }
        this.userChangedValue = false;
    }
    updateRequestedIcon() {
        this.requestedIcon = setRequestedIcon({}, this.icon, "number");
    }
    get isClearable() {
        return this.clearable && this.value.length > 0;
    }
    effectiveLocaleWatcher(locale) {
        updateMessages(this, this.effectiveLocale);
        numberStringFormatter.numberFormatOptions = {
            locale,
            numberingSystem: this.numberingSystem,
            useGrouping: false,
        };
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        connectInteractive(this);
        connectLocalized(this);
        connectMessages(this);
        this.inlineEditableEl = this.el.closest("calcite-inline-editable");
        if (this.inlineEditableEl) {
            this.editingEnabled = this.inlineEditableEl.editingEnabled || false;
        }
        connectLabel(this);
        connectForm(this);
        this.mutationObserver?.observe(this.el, { childList: true });
        this.setDisabledAction();
        this.el.addEventListener(internalHiddenInputInputEvent, this.onHiddenFormInputInput);
    }
    componentDidLoad() {
        setComponentLoaded(this);
    }
    disconnectedCallback() {
        disconnectInteractive(this);
        disconnectLabel(this);
        disconnectForm(this);
        disconnectLocalized(this);
        disconnectMessages(this);
        this.mutationObserver?.disconnect();
        this.el.removeEventListener(internalHiddenInputInputEvent, this.onHiddenFormInputInput);
    }
    async componentWillLoad() {
        setUpLoadableComponent(this);
        this.maxString = this.max?.toString();
        this.minString = this.min?.toString();
        this.requestedIcon = setRequestedIcon({}, this.icon, "number");
        await setUpMessages(this);
        this.setPreviousEmittedNumberValue(this.value);
        this.setPreviousNumberValue(this.value);
        this.warnAboutInvalidNumberValue(this.value);
        if (this.value === "Infinity" || this.value === "-Infinity") {
            this.displayedValue = this.value;
            this.previousEmittedNumberValue = this.value;
        }
        else {
            this.setNumberValue({
                origin: "connected",
                value: isValidNumber(this.value) ? this.value : "",
            });
        }
    }
    componentShouldUpdate(newValue, oldValue, property) {
        if (property === "value" && newValue && !isValidNumber(newValue)) {
            this.setNumberValue({
                origin: "reset",
                value: oldValue,
            });
            return false;
        }
        return true;
    }
    componentDidRender() {
        updateHostInteraction(this);
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /** Sets focus on the component. */
    async setFocus() {
        await componentFocusable(this);
        this.childNumberEl?.focus();
    }
    /** Selects the text of the component's `value`. */
    async selectText() {
        this.childNumberEl?.select();
    }
    onLabelClick() {
        this.setFocus();
    }
    incrementOrDecrementNumberValue(direction, inputMax, inputMin, nativeEvent) {
        const { value } = this;
        if (value === "Infinity" || value === "-Infinity") {
            return;
        }
        const adjustment = direction === "up" ? 1 : -1;
        const stepHandleInteger = this.integer && this.step !== "any" ? Math.round(this.step) : this.step;
        const inputStep = stepHandleInteger === "any" ? 1 : Math.abs(stepHandleInteger || 1);
        const inputVal = new BigDecimal(value !== "" ? value : "0");
        const nudgedValue = inputVal.add(`${inputStep * adjustment}`);
        const nudgedValueBelowInputMin = () => typeof inputMin === "number" &&
            !isNaN(inputMin) &&
            nudgedValue.subtract(`${inputMin}`).isNegative;
        const nudgedValueAboveInputMax = () => typeof inputMax === "number" &&
            !isNaN(inputMax) &&
            !nudgedValue.subtract(`${inputMax}`).isNegative;
        const finalValue = nudgedValueBelowInputMin()
            ? `${inputMin}`
            : nudgedValueAboveInputMax()
                ? `${inputMax}`
                : nudgedValue.toString();
        this.setNumberValue({
            committing: true,
            nativeEvent,
            origin: "user",
            value: finalValue,
        });
    }
    syncHiddenFormInput(input) {
        syncHiddenFormInput("number", this, input);
    }
    setDisabledAction() {
        const slottedActionEl = getSlotted(this.el, "action");
        if (!slottedActionEl) {
            return;
        }
        if (this.disabled) {
            if (slottedActionEl.getAttribute("disabled") == null) {
                this.slottedActionElDisabledInternally = true;
            }
            slottedActionEl.setAttribute("disabled", "");
        }
        else if (this.slottedActionElDisabledInternally) {
            slottedActionEl.removeAttribute("disabled");
            this.slottedActionElDisabledInternally = false;
        }
    }
    normalizeValue(value) {
        return isValidNumber(value) ? value : "";
    }
    warnAboutInvalidNumberValue(value) {
        if (value && !isValidNumber(value)) {
            console.warn(`The specified value "${value}" cannot be parsed, or is out of range.`);
        }
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        const dir = getElementDir(this.el);
        const loader = (h("div", { key: '4afc447c454d130ac4e983faa2a5a4390e500134', class: CSS.loader }, h("calcite-progress", { key: '8f14d3e88b4a3f9d1069b2f10a3b5377353b37cd', label: this.messages.loading, type: "indeterminate" })));
        const inputClearButton = (h("button", { key: '60622dbfee3b9d3b96f779f37590d02863a5b395', "aria-label": this.messages.clear, class: CSS.clearButton, disabled: this.disabled || this.readOnly, onClick: this.clearInputValue, tabIndex: -1, type: "button" }, h("calcite-icon", { key: '98e61619db4e6cd25353bbb4cd3e998b47debdef', icon: "x", scale: getIconScale(this.scale) })));
        const iconEl = (h("calcite-icon", { key: 'bd8c940cd1a47cc4051d9cbb30e19ce32748f82d', class: CSS.inputIcon, flipRtl: this.iconFlipRtl, icon: this.requestedIcon, scale: getIconScale(this.scale) }));
        const isHorizontalNumberButton = this.numberButtonType === "horizontal";
        const numberButtonsHorizontalUp = (h("button", { key: 'a33a45b1576ed55847411d9c0e493a4354188cee', "aria-hidden": "true", class: {
                [CSS.numberButtonItem]: true,
                [CSS.buttonItemHorizontal]: isHorizontalNumberButton,
            }, "data-adjustment": "up", disabled: this.disabled || this.readOnly, onPointerDown: this.nudgeButtonPointerDownHandler, onPointerOut: this.nudgeButtonPointerOutHandler, onPointerUp: this.nudgeButtonPointerUpHandler, tabIndex: -1, type: "button" }, h("calcite-icon", { key: 'b05ed816a0472df584918e6cdbeefca0f4ebccb6', icon: "chevron-up", scale: getIconScale(this.scale) })));
        const numberButtonsHorizontalDown = (h("button", { key: '7e8466f04ec12caccd6703701934c8e6864e2ad1', "aria-hidden": "true", class: {
                [CSS.numberButtonItem]: true,
                [CSS.buttonItemHorizontal]: isHorizontalNumberButton,
            }, "data-adjustment": "down", disabled: this.disabled || this.readOnly, onPointerDown: this.nudgeButtonPointerDownHandler, onPointerOut: this.nudgeButtonPointerOutHandler, onPointerUp: this.nudgeButtonPointerUpHandler, tabIndex: -1, type: "button" }, h("calcite-icon", { key: 'b796613a0510d88c5a9a88e19f204dd1cfa3ae79', icon: "chevron-down", scale: getIconScale(this.scale) })));
        const numberButtonsVertical = (h("div", { key: '7c0d61831b7d00d383b08bc69d130c93e4b41708', class: CSS.numberButtonWrapper }, numberButtonsHorizontalUp, numberButtonsHorizontalDown));
        const prefixText = h("div", { key: 'bde995b58c2be304e0f97751864932f4aba8b560', class: CSS.prefix }, this.prefixText);
        const suffixText = h("div", { key: '09ecebb64862cc87c42f6a07eb43f4f492aafff9', class: CSS.suffix }, this.suffixText);
        const childEl = (h("input", { "aria-errormessage": IDS.validationMessage, "aria-invalid": toAriaBoolean(this.status === "invalid"), "aria-label": getLabelText(this), autocomplete: this.autocomplete, autofocus: this.el.autofocus ? true : null, defaultValue: this.defaultValue, disabled: this.disabled ? true : null, enterKeyHint: this.el.enterKeyHint || this.el.getAttribute("enterkeyhint"), inputMode: this.el.inputMode || this.el.getAttribute("inputmode") || "decimal", key: "localized-input", maxLength: this.maxLength, minLength: this.minLength, name: undefined, onBlur: this.inputNumberBlurHandler, onFocus: this.inputNumberFocusHandler, onInput: this.inputNumberInputHandler, onKeyDown: this.inputNumberKeyDownHandler, onKeyUp: this.inputNumberKeyUpHandler, placeholder: this.placeholder || "", readOnly: this.readOnly, ref: this.setChildNumberElRef, type: "text", value: this.displayedValue }));
        return (h(Host, { key: '8bbe5d61c4d825064c541d69720c3dec29397bb6', onClick: this.clickHandler, onKeyDown: this.keyDownHandler }, h(InteractiveContainer, { key: '88981ec407b3ca3dc30e1f4639cc165f125a2e4f', disabled: this.disabled }, h("div", { key: 'b5147afb965eb8950451efd0188de34a126cb42a', class: { [CSS.inputWrapper]: true, [CSS_UTILITY.rtl]: dir === "rtl" }, ref: (el) => (this.inputWrapperEl = el) }, this.numberButtonType === "horizontal" && !this.readOnly
            ? numberButtonsHorizontalDown
            : null, this.prefixText ? prefixText : null, h("div", { key: 'ae8cfb188f1e67b2b26fd994e075b9d65f193aed', class: CSS.wrapper }, childEl, this.isClearable ? inputClearButton : null, this.requestedIcon ? iconEl : null, this.loading ? loader : null), h("div", { key: '68e1e75159411ccc36981c488411741ba4f4863f', class: CSS.actionWrapper, ref: (el) => (this.actionWrapperEl = el) }, h("slot", { key: '68ffd29dc928221cf0e4f1b1e79fc71dc1cdbfa2', name: SLOTS.action })), this.numberButtonType === "vertical" && !this.readOnly ? numberButtonsVertical : null, this.suffixText ? suffixText : null, this.numberButtonType === "horizontal" && !this.readOnly
            ? numberButtonsHorizontalUp
            : null, h(HiddenFormInputSlot, { key: '5efb494ebcff2e85bd0cb306ca1653dea1a79e36', component: this })), this.validationMessage && this.status === "invalid" ? (h(Validation, { icon: this.validationIcon, id: IDS.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status })) : null)));
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return this; }
    static get watchers() { return {
        "autofocus": ["handleGlobalAttributesChanged"],
        "enterkeyhint": ["handleGlobalAttributesChanged"],
        "inputmode": ["handleGlobalAttributesChanged"],
        "disabled": ["disabledWatcher"],
        "max": ["maxWatcher"],
        "min": ["minWatcher"],
        "messageOverrides": ["onMessagesChange"],
        "value": ["valueWatcher"],
        "icon": ["updateRequestedIcon"],
        "effectiveLocale": ["effectiveLocaleWatcher"]
    }; }
    static get style() { return CalciteInputNumberStyle0; }
}, [1, "calcite-input-number", {
        "alignment": [513],
        "autofocus": [4],
        "clearable": [516],
        "disabled": [516],
        "enterKeyHint": [1, "enter-key-hint"],
        "form": [513],
        "groupSeparator": [516, "group-separator"],
        "icon": [520],
        "iconFlipRtl": [516, "icon-flip-rtl"],
        "inputMode": [1, "input-mode"],
        "integer": [4],
        "label": [1],
        "loading": [516],
        "numberingSystem": [513, "numbering-system"],
        "localeFormat": [4, "locale-format"],
        "max": [514],
        "min": [514],
        "maxLength": [514, "max-length"],
        "minLength": [514, "min-length"],
        "validationMessage": [1, "validation-message"],
        "validationIcon": [520, "validation-icon"],
        "validity": [1040],
        "name": [513],
        "numberButtonType": [513, "number-button-type"],
        "placeholder": [1],
        "prefixText": [1, "prefix-text"],
        "readOnly": [516, "read-only"],
        "required": [516],
        "scale": [513],
        "status": [513],
        "step": [520],
        "autocomplete": [1],
        "suffixText": [1, "suffix-text"],
        "editingEnabled": [1540, "editing-enabled"],
        "value": [1025],
        "messages": [1040],
        "messageOverrides": [1040],
        "effectiveLocale": [32],
        "defaultMessages": [32],
        "displayedValue": [32],
        "slottedActionElDisabledInternally": [32],
        "setFocus": [64],
        "selectText": [64]
    }, undefined, {
        "autofocus": ["handleGlobalAttributesChanged"],
        "enterkeyhint": ["handleGlobalAttributesChanged"],
        "inputmode": ["handleGlobalAttributesChanged"],
        "disabled": ["disabledWatcher"],
        "max": ["maxWatcher"],
        "min": ["minWatcher"],
        "messageOverrides": ["onMessagesChange"],
        "value": ["valueWatcher"],
        "icon": ["updateRequestedIcon"],
        "effectiveLocale": ["effectiveLocaleWatcher"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-input-number", "calcite-icon", "calcite-progress"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-input-number":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, InputNumber);
            }
            break;
        case "calcite-icon":
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

export { InputNumber as I, defineCustomElement as d };
