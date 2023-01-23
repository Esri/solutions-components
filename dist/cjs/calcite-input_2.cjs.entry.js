/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ee607805.js');
const dom = require('./dom-4a580af6.js');
const label = require('./label-24fcd8a5.js');
const form = require('./form-c94c0c4d.js');
const locale = require('./locale-73cab8e8.js');
const key = require('./key-55aca5c0.js');
const resources = require('./resources-b56bce71.js');
const math = require('./math-460fffaf.js');
const observers = require('./observers-5311faf8.js');
const interactive = require('./interactive-0a68ab99.js');
require('./guid-84ac4d91.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
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
  numberButtonItem: "number-button-item"
};
const INPUT_TYPE_ICONS = {
  tel: "phone",
  password: "lock",
  email: "email-address",
  date: "calendar",
  time: "clock",
  search: "search"
};
const SLOTS = {
  action: "action"
};
const TEXT = {
  clear: "Clear value"
};

const inputCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host([disabled]){pointer-events:none;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}:host{display:block}:host([scale=s]) input,:host([scale=s]) .prefix,:host([scale=s]) .suffix{block-size:1.5rem;padding-inline:0.5rem;font-size:var(--calcite-font-size--2);line-height:1rem}:host([scale=s]) textarea{block-size:1.5rem;min-block-size:1.5rem}:host([scale=s]) .number-button-wrapper,:host([scale=s]) .action-wrapper calcite-button,:host([scale=s]) .action-wrapper calcite-button button{block-size:1.5rem}:host([scale=s]) input[type=file]{block-size:1.5rem}:host([scale=s]) .clear-button{min-block-size:1.5rem;min-inline-size:1.5rem}:host([scale=s]) textarea{block-size:auto;padding-block:0.25rem;padding-inline:0.5rem;font-size:var(--calcite-font-size--2);line-height:1rem}:host([scale=m]) input,:host([scale=m]) .prefix,:host([scale=m]) .suffix{block-size:2rem;padding-inline:0.75rem;font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=m]) textarea{min-block-size:2rem}:host([scale=m]) .number-button-wrapper,:host([scale=m]) .action-wrapper calcite-button,:host([scale=m]) .action-wrapper calcite-button button{block-size:2rem}:host([scale=m]) input[type=file]{block-size:2rem}:host([scale=m]) .clear-button{min-block-size:2rem;min-inline-size:2rem}:host([scale=m]) textarea{block-size:auto;padding-block:0.5rem;padding-inline:0.75rem;font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=l]) input,:host([scale=l]) .prefix,:host([scale=l]) .suffix{block-size:2.75rem;padding-inline:1rem;font-size:var(--calcite-font-size-0);line-height:1.25rem}:host([scale=l]) textarea{min-block-size:2.75rem}:host([scale=l]) .number-button-wrapper,:host([scale=l]) .action-wrapper calcite-button,:host([scale=l]) .action-wrapper calcite-button button{block-size:2.75rem}:host([scale=l]) input[type=file]{block-size:2.75rem}:host([scale=l]) .clear-button{min-block-size:2.75rem;min-inline-size:2.75rem}:host([scale=l]) textarea{block-size:auto;padding-block:0.75rem;padding-inline:1rem;font-size:var(--calcite-font-size-0);line-height:1.25rem}:host([disabled]) textarea{resize:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}:host textarea,:host input{transition:var(--calcite-animation-timing), block-size 0, outline-offset 0s;-webkit-appearance:none;position:relative;margin:0px;box-sizing:border-box;display:flex;max-block-size:100%;inline-size:100%;max-inline-size:100%;flex:1 1 0%;border-radius:0px;background-color:var(--calcite-ui-foreground-1);font-family:inherit;font-weight:var(--calcite-font-weight-normal);color:var(--calcite-ui-text-1)}:host input[type=search]::-webkit-search-decoration{-webkit-appearance:none}:host input,:host textarea{border-width:1px;border-style:solid;border-color:var(--calcite-ui-border-input);color:var(--calcite-ui-text-1)}:host input::placeholder,:host input:-ms-input-placeholder,:host input::-ms-input-placeholder,:host textarea::placeholder,:host textarea:-ms-input-placeholder,:host textarea::-ms-input-placeholder{font-weight:var(--calcite-font-weight-normal);color:var(--calcite-ui-text-3)}:host input:focus,:host textarea:focus{border-color:var(--calcite-ui-brand);color:var(--calcite-ui-text-1)}:host input[readonly],:host textarea[readonly]{background-color:var(--calcite-ui-background);font-weight:var(--calcite-font-weight-medium)}:host input[readonly]:focus,:host textarea[readonly]:focus{color:var(--calcite-ui-text-1)}:host calcite-icon{color:var(--calcite-ui-text-3)}:host textarea,:host input{outline-color:transparent}:host textarea:focus,:host input:focus{outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}:host([status=invalid]) input,:host([status=invalid]) textarea{border-color:var(--calcite-ui-danger)}:host([status=invalid]) input:focus,:host([status=invalid]) textarea:focus{outline:2px solid var(--calcite-ui-danger);outline-offset:-2px}:host([scale=s]) .icon{inset-inline-start:0.5rem}:host([scale=m]) .icon{inset-inline-start:0.75rem}:host([scale=l]) .icon{inset-inline-start:1rem}:host([icon][scale=s]) input{-webkit-padding-start:2rem;padding-inline-start:2rem}:host([icon][scale=m]) input{-webkit-padding-start:2.5rem;padding-inline-start:2.5rem}:host([icon][scale=l]) input{-webkit-padding-start:3rem;padding-inline-start:3rem}.element-wrapper{position:relative;order:3;display:inline-flex;flex:1 1 0%;align-items:center}.icon{pointer-events:none;position:absolute;display:block;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s}.icon,.resize-icon-wrapper{z-index:1}input[type=text]::-ms-clear,input[type=text]::-ms-reveal{display:none;block-size:0px;inline-size:0px}input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration,input[type=date]::-webkit-clear-button,input[type=time]::-webkit-clear-button{display:none}.clear-button{pointer-events:initial;order:4;margin:0px;box-sizing:border-box;display:flex;min-block-size:100%;cursor:pointer;align-items:center;justify-content:center;align-self:stretch;border-width:1px;border-style:solid;border-color:var(--calcite-ui-border-input);background-color:var(--calcite-ui-foreground-1);outline-color:transparent;border-inline-start-width:0px}.clear-button:hover{background-color:var(--calcite-ui-foreground-2);transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s}.clear-button:hover calcite-icon{color:var(--calcite-ui-text-1);transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s}.clear-button:active{background-color:var(--calcite-ui-foreground-3)}.clear-button:active calcite-icon{color:var(--calcite-ui-text-1)}.clear-button:focus{outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}.clear-button:disabled{opacity:var(--calcite-ui-opacity-disabled)}.loader{inset-block-start:1px;inset-inline:1px;pointer-events:none;position:absolute;display:block}.action-wrapper{order:7;display:flex}.prefix,.suffix{box-sizing:border-box;display:flex;block-size:auto;min-block-size:100%;-webkit-user-select:none;-moz-user-select:none;user-select:none;align-content:center;align-items:center;overflow-wrap:break-word;border-width:1px;border-style:solid;border-color:var(--calcite-ui-border-input);background-color:var(--calcite-ui-background);font-weight:var(--calcite-font-weight-medium);line-height:1;color:var(--calcite-ui-text-2)}.prefix{order:2;border-inline-end-width:0px}.suffix{order:5;border-inline-start-width:0px}:host([alignment=start]) textarea,:host([alignment=start]) input{text-align:start}:host([alignment=end]) textarea,:host([alignment=end]) input{text-align:end}:host input[type=number]{-moz-appearance:textfield}:host input[type=number]::-webkit-inner-spin-button,:host input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;-moz-appearance:textfield;margin:0px}.number-button-wrapper{pointer-events:none;order:6;box-sizing:border-box;display:flex;flex-direction:column;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s}:host([number-button-type=vertical]) .wrapper{flex-direction:row;display:flex}:host([number-button-type=vertical]) input,:host([number-button-type=vertical]) textarea{order:2}:host([number-button-type=horizontal]) .calcite--rtl .number-button-item[data-adjustment=down] calcite-icon{transform:rotate(-90deg)}:host([number-button-type=horizontal]) .calcite--rtl .number-button-item[data-adjustment=up] calcite-icon{transform:rotate(-90deg)}.number-button-item.number-button-item--horizontal[data-adjustment=down],.number-button-item.number-button-item--horizontal[data-adjustment=up]{order:1;max-block-size:100%;min-block-size:100%;align-self:stretch}.number-button-item.number-button-item--horizontal[data-adjustment=down] calcite-icon,.number-button-item.number-button-item--horizontal[data-adjustment=up] calcite-icon{transform:rotate(90deg)}.number-button-item.number-button-item--horizontal[data-adjustment=down]{border-width:1px;border-style:solid;border-color:var(--calcite-ui-border-input);border-inline-end-width:0px}.number-button-item.number-button-item--horizontal[data-adjustment=down]:hover{background-color:var(--calcite-ui-foreground-2)}.number-button-item.number-button-item--horizontal[data-adjustment=down]:hover calcite-icon{color:var(--calcite-ui-text-1)}.number-button-item.number-button-item--horizontal[data-adjustment=up]{order:5}.number-button-item.number-button-item--horizontal[data-adjustment=up]:hover{background-color:var(--calcite-ui-foreground-2)}.number-button-item.number-button-item--horizontal[data-adjustment=up]:hover calcite-icon{color:var(--calcite-ui-text-1)}:host([number-button-type=vertical]) .number-button-item[data-adjustment=down]:hover{background-color:var(--calcite-ui-foreground-2)}:host([number-button-type=vertical]) .number-button-item[data-adjustment=down]:hover calcite-icon{color:var(--calcite-ui-text-1)}:host([number-button-type=vertical]) .number-button-item[data-adjustment=up]:hover{background-color:var(--calcite-ui-foreground-2)}:host([number-button-type=vertical]) .number-button-item[data-adjustment=up]:hover calcite-icon{color:var(--calcite-ui-text-1)}:host([number-button-type=vertical]) .number-button-item[data-adjustment=down]{border-block-start-width:0px}.number-button-item{max-block-size:50%;min-block-size:50%;pointer-events:initial;margin:0px;box-sizing:border-box;display:flex;cursor:pointer;align-items:center;align-self:center;border-width:1px;border-style:solid;border-color:var(--calcite-ui-border-input);background-color:var(--calcite-ui-foreground-1);padding-block:0px;padding-inline:0.5rem;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;border-inline-start-width:0px}.number-button-item calcite-icon{pointer-events:none;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s}.number-button-item:focus{background-color:var(--calcite-ui-foreground-2)}.number-button-item:focus calcite-icon{color:var(--calcite-ui-text-1)}.number-button-item:active{background-color:var(--calcite-ui-foreground-3)}.number-button-item:disabled{pointer-events:none}.wrapper{position:relative;display:flex;flex-direction:row;align-items:center}:host input::-webkit-calendar-picker-indicator{display:none}:host input[type=date]::-webkit-input-placeholder{visibility:hidden !important}:host textarea::-webkit-resizer{position:absolute;inset-block-end:0px;box-sizing:border-box;padding-block:0px;padding-inline:0.25rem;inset-inline-end:0}.resize-icon-wrapper{inset-block-end:2px;inset-inline-end:2px;pointer-events:none;position:absolute;block-size:0.75rem;inline-size:0.75rem;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-3)}.resize-icon-wrapper calcite-icon{inset-block-end:0.25rem;inset-inline-end:0.25rem;transform:rotate(-45deg)}.calcite--rtl .resize-icon-wrapper calcite-icon{transform:rotate(45deg)}:host([type=color]) input{padding:0.25rem}:host([type=file]) input{cursor:pointer;border-width:1px;border-style:dashed;border-color:var(--calcite-ui-border-input);background-color:var(--calcite-ui-foreground-1);text-align:center}:host([type=file][scale=s]) input{padding-block:1px;padding-inline:0.5rem}:host([type=file][scale=m]) input{padding-block:0.25rem;padding-inline:0.75rem}:host([type=file][scale=l]) input{padding-block:0.5rem;padding-inline:1rem}:host(.no-bottom-border) input{border-block-end-width:0px}:host(.border-top-color-one) input{border-block-start-color:var(--calcite-ui-border-1)}:host .inline-child{background-color:transparent;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s}:host .inline-child .editing-enabled{background-color:inherit}:host .inline-child:not(.editing-enabled){display:flex;cursor:pointer;border-color:transparent;-webkit-padding-start:0;padding-inline-start:0}::slotted(input[slot=hidden-form-input]){margin:0 !important;opacity:0 !important;outline:none !important;padding:0 !important;position:absolute !important;inset:0 !important;transform:none !important;-webkit-appearance:none !important;z-index:-1 !important}";

const Input = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.calciteInternalInputFocus = index.createEvent(this, "calciteInternalInputFocus", 6);
    this.calciteInternalInputBlur = index.createEvent(this, "calciteInternalInputBlur", 6);
    this.calciteInputInput = index.createEvent(this, "calciteInputInput", 7);
    this.calciteInputChange = index.createEvent(this, "calciteInputChange", 6);
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /** Specifies the text alignment of the component's value. */
    this.alignment = "start";
    /**
     * When `true`, the component is focused on page load.
     *
     * @mdn [autofocus](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autofocus)
     */
    this.autofocus = false;
    /**
     * When `true`, a clear button is displayed when the component has a value. The clear button shows by default for `"search"`, `"time"`, and `"date"` types, and will not display for the `"textarea"` type.
     */
    this.clearable = false;
    /**
     * When `true`, interaction is prevented and the component is displayed with lower opacity.
     *
     * @mdn [disabled](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled)
     */
    this.disabled = false;
    /**
     * When `true`, number values are displayed with a group separator corresponding to the language and country format.
     */
    this.groupSeparator = false;
    /**
     * When `true`, the component will not be visible.
     *
     * @mdn [hidden](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden)
     */
    this.hidden = false;
    /**
     * Accessible name when the component is loading.
     *
     * @default "Loading"
     */
    this.intlLoading = resources.TEXT.loading;
    /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
    this.iconFlipRtl = false;
    /** When `true`, a busy indicator is displayed. */
    this.loading = false;
    /**
     * When `true`, uses locale formatting for numbers.
     *
     * @internal
     */
    this.localeFormat = false;
    /** Specifies the placement of the buttons for `type="number"`. */
    this.numberButtonType = "vertical";
    /**
     * When `true`, the component's value can be read, but cannot be modified.
     *
     * @mdn [readOnly](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly)
     */
    this.readOnly = false;
    /** When `true`, the component must have a value in order for the form to submit. */
    this.required = false;
    /** Specifies the size of the component. */
    this.scale = "m";
    /** Specifies the status of the input field, which determines message and icons. */
    this.status = "idle";
    /**
     * @internal
     */
    this.editingEnabled = false;
    /**
     * Specifies the component type.
     *
     * Note that the following `type`s add type-specific icons by default: `"date"`, `"email"`, `"password"`, `"search"`, `"tel"`, `"time"`.
     */
    this.type = "text";
    /** The component's value. */
    this.value = "";
    /** keep track of the rendered child type */
    this.childElType = "input";
    this.previousValueOrigin = "initial";
    this.mutationObserver = observers.createObserver("mutation", () => this.setDisabledAction());
    this.userChangedValue = false;
    //--------------------------------------------------------------------------
    //
    //  State
    //
    //--------------------------------------------------------------------------
    this.effectiveLocale = "";
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    this.keyDownHandler = (event) => {
      if (this.readOnly || this.disabled) {
        return;
      }
      if (this.isClearable && event.key === "Escape") {
        this.clearInputValue(event);
        event.preventDefault();
      }
      if (event.key === "Enter" && !event.defaultPrevented) {
        if (form.submitForm(this)) {
          event.preventDefault();
        }
      }
    };
    this.clearInputValue = (nativeEvent) => {
      this.setValue({
        committing: true,
        nativeEvent,
        origin: "user",
        value: ""
      });
    };
    this.emitChangeIfUserModified = () => {
      if (this.previousValueOrigin === "user" && this.value !== this.previousEmittedValue) {
        this.calciteInputChange.emit();
      }
      this.previousEmittedValue = this.value;
    };
    this.inputBlurHandler = () => {
      this.calciteInternalInputBlur.emit();
      this.emitChangeIfUserModified();
    };
    this.inputFocusHandler = (event) => {
      const slottedActionEl = dom.getSlotted(this.el, "action");
      if (event.target !== slottedActionEl) {
        this.setFocus();
      }
      this.calciteInternalInputFocus.emit();
    };
    this.inputInputHandler = (nativeEvent) => {
      if (this.disabled || this.readOnly) {
        return;
      }
      this.setValue({
        nativeEvent,
        origin: "user",
        value: nativeEvent.target.value
      });
    };
    this.inputKeyDownHandler = (event) => {
      if (this.disabled || this.readOnly) {
        return;
      }
      if (event.key === "Enter") {
        this.emitChangeIfUserModified();
      }
    };
    this.inputNumberInputHandler = (nativeEvent) => {
      if (this.disabled || this.readOnly) {
        return;
      }
      const value = nativeEvent.target.value;
      locale.numberStringFormatter.numberFormatOptions = {
        locale: this.effectiveLocale,
        numberingSystem: this.numberingSystem,
        useGrouping: this.groupSeparator
      };
      const delocalizedValue = locale.numberStringFormatter.delocalize(value);
      if (nativeEvent.inputType === "insertFromPaste") {
        if (!locale.isValidNumber(delocalizedValue)) {
          nativeEvent.preventDefault();
        }
        this.setValue({
          nativeEvent,
          origin: "user",
          value: locale.parseNumberString(delocalizedValue)
        });
        this.childNumberEl.value = this.localizedValue;
      }
      else {
        this.setValue({
          nativeEvent,
          origin: "user",
          value: delocalizedValue
        });
      }
    };
    this.inputNumberKeyDownHandler = (event) => {
      if (this.type !== "number" || this.disabled || this.readOnly) {
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
        ...key.numberKeys,
        "ArrowLeft",
        "ArrowRight",
        "Backspace",
        "Delete",
        "Enter",
        "Escape",
        "Tab"
      ];
      if (event.altKey || event.ctrlKey || event.metaKey) {
        return;
      }
      const isShiftTabEvent = event.shiftKey && event.key === "Tab";
      if (supportedKeys.includes(event.key) && (!event.shiftKey || isShiftTabEvent)) {
        if (event.key === "Enter") {
          this.emitChangeIfUserModified();
        }
        return;
      }
      locale.numberStringFormatter.numberFormatOptions = {
        locale: this.effectiveLocale,
        numberingSystem: this.numberingSystem,
        useGrouping: this.groupSeparator
      };
      if (event.key === locale.numberStringFormatter.decimal) {
        if (!this.value && !this.childNumberEl.value) {
          return;
        }
        if (this.value && this.childNumberEl.value.indexOf(locale.numberStringFormatter.decimal) === -1) {
          return;
        }
      }
      if (/[eE]/.test(event.key)) {
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
      if ((nativeEvent instanceof KeyboardEvent && nativeEvent.repeat) || this.type !== "number") {
        return;
      }
      const inputMax = this.maxString ? parseFloat(this.maxString) : null;
      const inputMin = this.minString ? parseFloat(this.minString) : null;
      const valueNudgeDelayInMs = 100;
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
    this.numberButtonPointerUpAndOutHandler = () => {
      window.clearInterval(this.nudgeNumberValueIntervalId);
    };
    this.numberButtonPointerDownHandler = (event) => {
      if (!dom.isPrimaryPointerButton(event)) {
        return;
      }
      event.preventDefault();
      const direction = event.target.dataset.adjustment;
      if (!this.disabled) {
        this.nudgeNumberValue(direction, event);
      }
    };
    this.hiddenInputChangeHandler = (event) => {
      if (event.target.name === this.name) {
        const hiddenInputValue = event.target.value;
        const value = this.type === "number"
          ? locale.isValidNumber(hiddenInputValue)
            ? hiddenInputValue
            : ""
          : hiddenInputValue;
        this.setValue({
          value,
          origin: "direct"
        });
      }
      event.stopPropagation();
    };
    this.setChildElRef = (el) => {
      this.childEl = el;
    };
    this.setChildNumberElRef = (el) => {
      this.childNumberEl = el;
    };
    this.setInputValue = (newInputValue) => {
      if (this.type === "text" && !this.childEl) {
        return;
      }
      if (this.type === "number" && !this.childNumberEl) {
        return;
      }
      this[`child${this.type === "number" ? "Number" : ""}El`].value = newInputValue;
    };
    this.setPreviousEmittedValue = (newPreviousEmittedValue) => {
      this.previousEmittedValue =
        this.type === "number"
          ? locale.isValidNumber(newPreviousEmittedValue)
            ? newPreviousEmittedValue
            : ""
          : newPreviousEmittedValue;
    };
    this.setPreviousValue = (newPreviousValue) => {
      this.previousValue =
        this.type === "number"
          ? locale.isValidNumber(newPreviousValue)
            ? newPreviousValue
            : ""
          : newPreviousValue;
    };
    this.setValue = ({ committing = false, nativeEvent, origin, previousValue, value }) => {
      locale.numberStringFormatter.numberFormatOptions = {
        locale: this.effectiveLocale,
        numberingSystem: this.numberingSystem,
        useGrouping: this.groupSeparator
      };
      if (this.type === "number") {
        const delocalizedValue = (this.numberingSystem && this.numberingSystem !== "latn") ||
          locale.defaultNumberingSystem !== "latn"
          ? locale.numberStringFormatter.delocalize(value)
          : value;
        const sanitizedValue = locale.sanitizeNumberString(delocalizedValue);
        const newValue = (value && !sanitizedValue) || [".", "-"].includes(sanitizedValue)
          ? locale.isValidNumber(this.previousValue)
            ? this.previousValue
            : ""
          : sanitizedValue;
        const newLocalizedValue = locale.numberStringFormatter.localize(newValue);
        this.localizedValue = newLocalizedValue;
        this.userChangedValue = origin === "user" && this.value !== newValue;
        this.value = newValue;
        origin === "direct" && this.setInputValue(newLocalizedValue);
      }
      else {
        this.userChangedValue = origin === "user" && this.value !== value;
        this.value = value;
        origin === "direct" && this.setInputValue(value);
      }
      this.setPreviousValue(previousValue || this.value);
      this.previousValueOrigin = origin;
      if (nativeEvent) {
        const calciteInputInputEvent = this.calciteInputInput.emit({
          element: this.childEl,
          nativeEvent,
          value: this.value
        });
        if (calciteInputInputEvent.defaultPrevented) {
          this.value = this.previousValue;
          this.localizedValue =
            this.type === "number"
              ? locale.numberStringFormatter.localize(this.previousValue)
              : this.previousValue;
        }
        else if (committing) {
          this.emitChangeIfUserModified();
        }
      }
    };
    this.inputKeyUpHandler = () => {
      window.clearInterval(this.nudgeNumberValueIntervalId);
    };
  }
  disabledWatcher() {
    this.setDisabledAction();
  }
  localeChanged() {
    locale.updateEffectiveLocale(this);
  }
  /** watcher to update number-to-string for max */
  maxWatcher() {
    var _a;
    this.maxString = ((_a = this.max) === null || _a === void 0 ? void 0 : _a.toString()) || null;
  }
  /** watcher to update number-to-string for min */
  minWatcher() {
    var _a;
    this.minString = ((_a = this.min) === null || _a === void 0 ? void 0 : _a.toString()) || null;
  }
  valueWatcher(newValue, previousValue) {
    if (!this.userChangedValue) {
      this.setValue({
        origin: "direct",
        previousValue,
        value: newValue == null || newValue == ""
          ? ""
          : this.type === "number"
            ? locale.isValidNumber(newValue)
              ? newValue
              : this.previousValue || ""
            : newValue
      });
      this.warnAboutInvalidNumberValue(newValue);
    }
    this.userChangedValue = false;
  }
  updateRequestedIcon() {
    this.requestedIcon = dom.setRequestedIcon(INPUT_TYPE_ICONS, this.icon, this.type);
  }
  get isClearable() {
    return !this.isTextarea && (this.clearable || this.type === "search") && this.value.length > 0;
  }
  get isTextarea() {
    return this.childElType === "textarea";
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    var _a;
    locale.connectLocalized(this);
    this.scale = dom.getElementProp(this.el, "scale", this.scale);
    this.status = dom.getElementProp(this.el, "status", this.status);
    this.inlineEditableEl = this.el.closest("calcite-inline-editable");
    if (this.inlineEditableEl) {
      this.editingEnabled = this.inlineEditableEl.editingEnabled || false;
    }
    label.connectLabel(this);
    form.connectForm(this);
    this.setPreviousEmittedValue(this.value);
    this.setPreviousValue(this.value);
    if (this.type === "number") {
      this.warnAboutInvalidNumberValue(this.value);
      this.setValue({
        origin: "connected",
        value: locale.isValidNumber(this.value) ? this.value : ""
      });
    }
    (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.observe(this.el, { childList: true });
    this.setDisabledAction();
    this.el.addEventListener("calciteInternalHiddenInputChange", this.hiddenInputChangeHandler);
  }
  disconnectedCallback() {
    var _a;
    label.disconnectLabel(this);
    form.disconnectForm(this);
    locale.disconnectLocalized(this);
    (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
    this.el.removeEventListener("calciteInternalHiddenInputChange", this.hiddenInputChangeHandler);
  }
  componentWillLoad() {
    var _a, _b;
    this.childElType = this.type === "textarea" ? "textarea" : "input";
    this.maxString = (_a = this.max) === null || _a === void 0 ? void 0 : _a.toString();
    this.minString = (_b = this.min) === null || _b === void 0 ? void 0 : _b.toString();
    this.requestedIcon = dom.setRequestedIcon(INPUT_TYPE_ICONS, this.icon, this.type);
  }
  componentShouldUpdate(newValue, oldValue, property) {
    if (this.type === "number" && property === "value" && newValue && !locale.isValidNumber(newValue)) {
      this.setValue({
        origin: "reset",
        value: oldValue
      });
      return false;
    }
    return true;
  }
  componentDidRender() {
    interactive.updateHostInteraction(this);
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  /** Sets focus on the component. */
  async setFocus() {
    var _a, _b;
    if (this.type === "number") {
      (_a = this.childNumberEl) === null || _a === void 0 ? void 0 : _a.focus();
    }
    else {
      (_b = this.childEl) === null || _b === void 0 ? void 0 : _b.focus();
    }
  }
  /** Selects all text of the component's `value`. */
  async selectText() {
    var _a, _b;
    if (this.type === "number") {
      (_a = this.childNumberEl) === null || _a === void 0 ? void 0 : _a.select();
    }
    else {
      (_b = this.childEl) === null || _b === void 0 ? void 0 : _b.select();
    }
  }
  onLabelClick() {
    this.setFocus();
  }
  incrementOrDecrementNumberValue(direction, inputMax, inputMin, nativeEvent) {
    const { value } = this;
    const inputStep = this.step === "any" ? 1 : Math.abs(this.step || 1);
    const inputVal = value && value !== "" ? parseFloat(value) : 0;
    const adjustment = direction === "up" ? 1 : -1;
    const nudgedValue = inputVal + inputStep * adjustment;
    const finalValue = (typeof inputMin === "number" && !isNaN(inputMin) && nudgedValue < inputMin) ||
      (typeof inputMax === "number" && !isNaN(inputMax) && nudgedValue > inputMax)
      ? inputVal
      : nudgedValue;
    const inputValPlaces = math.decimalPlaces(inputVal);
    const inputStepPlaces = math.decimalPlaces(inputStep);
    this.setValue({
      committing: true,
      nativeEvent,
      origin: "user",
      value: finalValue.toFixed(Math.max(inputValPlaces, inputStepPlaces))
    });
  }
  onFormReset() {
    this.setValue({
      origin: "reset",
      value: this.defaultValue
    });
  }
  syncHiddenFormInput(input) {
    var _a, _b, _c, _d;
    if (this.type === "number") {
      input.type = "number";
      input.min = (_b = (_a = this.min) === null || _a === void 0 ? void 0 : _a.toString(10)) !== null && _b !== void 0 ? _b : "";
      input.max = (_d = (_c = this.max) === null || _c === void 0 ? void 0 : _c.toString(10)) !== null && _d !== void 0 ? _d : "";
    }
    else if (this.type === "text") {
      input.type = "text";
      if (this.minLength != null) {
        input.minLength = this.minLength;
      }
      if (this.maxLength != null) {
        input.maxLength = this.maxLength;
      }
    }
    else if (this.type === "password") {
      input.type = "password";
    }
  }
  setDisabledAction() {
    const slottedActionEl = dom.getSlotted(this.el, "action");
    if (!slottedActionEl) {
      return;
    }
    this.disabled
      ? slottedActionEl.setAttribute("disabled", "")
      : slottedActionEl.removeAttribute("disabled");
  }
  warnAboutInvalidNumberValue(value) {
    if (this.type === "number" && value && !locale.isValidNumber(value)) {
      console.warn(`The specified value "${value}" cannot be parsed, or is out of range.`);
    }
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    const dir = dom.getElementDir(this.el);
    const loader = (index.h("div", { class: CSS.loader }, index.h("calcite-progress", { label: this.intlLoading, type: "indeterminate" })));
    const inputClearButton = (index.h("button", { "aria-label": this.intlClear || TEXT.clear, class: CSS.clearButton, disabled: this.disabled || this.readOnly, onClick: this.clearInputValue, tabIndex: -1, type: "button" }, index.h("calcite-icon", { icon: "x", scale: "s" })));
    const iconEl = (index.h("calcite-icon", { class: CSS.inputIcon, flipRtl: this.iconFlipRtl, icon: this.requestedIcon, scale: "s" }));
    const isHorizontalNumberButton = this.numberButtonType === "horizontal";
    const numberButtonsHorizontalUp = (index.h("button", { "aria-hidden": "true", class: {
        [CSS.numberButtonItem]: true,
        [CSS.buttonItemHorizontal]: isHorizontalNumberButton
      }, "data-adjustment": "up", disabled: this.disabled || this.readOnly, onPointerDown: this.numberButtonPointerDownHandler, onPointerOut: this.numberButtonPointerUpAndOutHandler, onPointerUp: this.numberButtonPointerUpAndOutHandler, tabIndex: -1, type: "button" }, index.h("calcite-icon", { icon: "chevron-up", scale: "s" })));
    const numberButtonsHorizontalDown = (index.h("button", { "aria-hidden": "true", class: {
        [CSS.numberButtonItem]: true,
        [CSS.buttonItemHorizontal]: isHorizontalNumberButton
      }, "data-adjustment": "down", disabled: this.disabled || this.readOnly, onPointerDown: this.numberButtonPointerDownHandler, onPointerOut: this.numberButtonPointerUpAndOutHandler, onPointerUp: this.numberButtonPointerUpAndOutHandler, tabIndex: -1, type: "button" }, index.h("calcite-icon", { icon: "chevron-down", scale: "s" })));
    const numberButtonsVertical = (index.h("div", { class: CSS.numberButtonWrapper }, numberButtonsHorizontalUp, numberButtonsHorizontalDown));
    const prefixText = index.h("div", { class: CSS.prefix }, this.prefixText);
    const suffixText = index.h("div", { class: CSS.suffix }, this.suffixText);
    const localeNumberInput = this.type === "number" ? (index.h("input", { "aria-label": label.getLabelText(this), autofocus: this.autofocus ? true : null, defaultValue: this.defaultValue, disabled: this.disabled ? true : null, enterKeyHint: this.el.enterKeyHint, inputMode: this.el.inputMode, key: "localized-input", maxLength: this.maxLength, minLength: this.minLength, name: undefined, onBlur: this.inputBlurHandler, onFocus: this.inputFocusHandler, onInput: this.inputNumberInputHandler, onKeyDown: this.inputNumberKeyDownHandler, onKeyUp: this.inputKeyUpHandler, placeholder: this.placeholder || "", readOnly: this.readOnly, ref: this.setChildNumberElRef, type: "text", value: this.localizedValue })) : null;
    const childEl = this.type !== "number"
      ? [
        index.h(this.childElType, { "aria-label": label.getLabelText(this), autofocus: this.autofocus ? true : null, class: {
            [CSS.editingEnabled]: this.editingEnabled,
            [CSS.inlineChild]: !!this.inlineEditableEl
          }, defaultValue: this.defaultValue, disabled: this.disabled ? true : null, enterKeyHint: this.el.enterKeyHint, inputMode: this.el.inputMode, max: this.maxString, maxLength: this.maxLength, min: this.minString, minLength: this.minLength, name: this.name, onBlur: this.inputBlurHandler, onFocus: this.inputFocusHandler, onInput: this.inputInputHandler, onKeyDown: this.inputKeyDownHandler, onKeyUp: this.inputKeyUpHandler, placeholder: this.placeholder || "", readOnly: this.readOnly, ref: this.setChildElRef, required: this.required ? true : null, step: this.step, tabIndex: this.disabled || (this.inlineEditableEl && !this.editingEnabled) ? -1 : null, type: this.type, value: this.value }),
        this.isTextarea ? (index.h("div", { class: CSS.resizeIconWrapper }, index.h("calcite-icon", { icon: "chevron-down", scale: "s" }))) : null
      ]
      : null;
    return (index.h(index.Host, { onClick: this.inputFocusHandler, onKeyDown: this.keyDownHandler }, index.h("div", { class: { [CSS.inputWrapper]: true, [resources.CSS_UTILITY.rtl]: dir === "rtl" } }, this.type === "number" && this.numberButtonType === "horizontal" && !this.readOnly
      ? numberButtonsHorizontalDown
      : null, this.prefixText ? prefixText : null, index.h("div", { class: CSS.wrapper }, localeNumberInput, childEl, this.isClearable ? inputClearButton : null, this.requestedIcon ? iconEl : null, this.loading ? loader : null), index.h("div", { class: CSS.actionWrapper }, index.h("slot", { name: SLOTS.action })), this.type === "number" && this.numberButtonType === "vertical" && !this.readOnly
      ? numberButtonsVertical
      : null, this.suffixText ? suffixText : null, this.type === "number" && this.numberButtonType === "horizontal" && !this.readOnly
      ? numberButtonsHorizontalUp
      : null, index.h(form.HiddenFormInputSlot, { component: this }))));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "disabled": ["disabledWatcher"],
    "locale": ["localeChanged"],
    "max": ["maxWatcher"],
    "min": ["minWatcher"],
    "value": ["valueWatcher"],
    "icon": ["updateRequestedIcon"],
    "type": ["updateRequestedIcon"]
  }; }
};
Input.style = inputCss;

const progressCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host{position:relative;display:block;inline-size:100%}.track,.bar{position:absolute;inset-block-start:0px;block-size:2px}.track{z-index:1;inline-size:100%;overflow:hidden;background:var(--calcite-ui-border-3)}.bar{z-index:1;background-color:var(--calcite-ui-brand)}@media (forced-colors: active){.track{background-color:highlightText}.bar{background-color:linkText}}.indeterminate{inline-size:20%;animation:looping-progress-bar-ani calc(var(--calcite-internal-animation-timing-medium) * 11) linear infinite}.reversed{animation-direction:reverse}.text{padding-inline:0px;padding-block:1rem 0px;text-align:center;font-size:var(--calcite-font-size--2);line-height:1rem;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-ui-text-2)}@keyframes looping-progress-bar-ani{0%{transform:translate3d(-100%, 0, 0)}50%{inline-size:40%}100%{transform:translate3d(600%, 0, 0)}}";

const Progress = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    /**
     * Specifies the component type.
     *
     * Use `"indeterminate"` if finding actual progress value is impossible.
     *
     */
    this.type = "determinate";
    /** The component's progress value, with a range of 0.0 - 1.0. */
    this.value = 0;
    /** When `true` and for `"indeterminate"` progress bars, reverses the animation direction. */
    this.reversed = false;
  }
  render() {
    const isDeterminate = this.type === "determinate";
    const barStyles = isDeterminate ? { width: `${this.value * 100}%` } : {};
    return (index.h("div", { "aria-label": this.label || this.text, "aria-valuemax": 1, "aria-valuemin": 0, "aria-valuenow": this.value, role: "progressbar" }, index.h("div", { class: "track" }, index.h("div", { class: {
        bar: true,
        indeterminate: this.type === "indeterminate",
        reversed: this.reversed
      }, style: barStyles })), this.text ? index.h("div", { class: "text" }, this.text) : null));
  }
  get el() { return index.getElement(this); }
};
Progress.style = progressCss;

exports.calcite_input = Input;
exports.calcite_progress = Progress;
