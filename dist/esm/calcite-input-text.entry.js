/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, f as forceUpdate, h, H as Host, g as getElement } from './index-b793d9aa.js';
import { z as setRequestedIcon, g as getSlotted, a as getElementDir, t as toAriaBoolean } from './dom-b5c50286.js';
import { s as submitForm, c as connectForm, i as internalHiddenInputInputEvent, d as disconnectForm, H as HiddenFormInputSlot } from './form-ba965042.js';
import { c as connectInteractive, d as disconnectInteractive, u as updateHostInteraction, I as InteractiveContainer } from './interactive-742ba555.js';
import { c as connectLabel, d as disconnectLabel, g as getLabelText } from './label-0b82858a.js';
import { s as setUpLoadableComponent, a as setComponentLoaded, c as componentFocusable } from './loadable-73f289b6.js';
import { c as connectLocalized, d as disconnectLocalized } from './locale-21e40b0c.js';
import { c as createObserver } from './observers-e2484555.js';
import { C as CSS_UTILITY } from './resources-defbb49f.js';
import { u as updateMessages, c as connectMessages, d as disconnectMessages, s as setUpMessages } from './t9n-2fb3af62.js';
import { g as getIconScale } from './component-c2c32481.js';
import { V as Validation } from './Validation-63949b7d.js';
import { s as syncHiddenFormInput } from './input-d11f5ac8.js';
import './guid-4c746a7f.js';
import './browser-552eb2d0.js';
import './key-58898f0a.js';

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
    wrapper: "element-wrapper",
    inputWrapper: "wrapper",
    actionWrapper: "action-wrapper",
    resizeIconWrapper: "resize-icon-wrapper",
};
const IDS = {
    validationMessage: "inputTextValidationMessage",
};
const SLOTS = {
    action: "action",
};

const inputTextCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block}:host([scale=s]) input{padding-inline-start:0.5rem;padding-inline-end:var(--calcite-internal-input-text-input-padding-inline-end, 0.5rem)}:host([scale=s]) input,:host([scale=s]) .prefix,:host([scale=s]) .suffix{block-size:1.5rem;font-size:var(--calcite-font-size--2);line-height:1rem}:host([scale=s]) .prefix,:host([scale=s]) .suffix{padding-inline:0.5rem}:host([scale=s]) .action-wrapper calcite-button,:host([scale=s]) .action-wrapper calcite-button button{block-size:1.5rem}:host([scale=s]) .clear-button{min-block-size:1.5rem;min-inline-size:1.5rem}:host([scale=m]) input{padding-inline-start:0.75rem;padding-inline-end:var(--calcite-internal-input-text-input-padding-inline-end, 0.75rem)}:host([scale=m]) input,:host([scale=m]) .prefix,:host([scale=m]) .suffix{block-size:2rem;font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=m]) .prefix,:host([scale=m]) .suffix{padding-inline:0.75rem}:host([scale=m]) .action-wrapper calcite-button,:host([scale=m]) .action-wrapper calcite-button button{block-size:2rem}:host([scale=m]) .clear-button{min-block-size:2rem;min-inline-size:2rem}:host([scale=l]) input{padding-inline-start:1rem;padding-inline-end:var(--calcite-internal-input-text-input-padding-inline-end, 1rem)}:host([scale=l]) input,:host([scale=l]) .prefix,:host([scale=l]) .suffix{block-size:2.75rem;font-size:var(--calcite-font-size-0);line-height:1.25rem}:host([scale=l]) .prefix,:host([scale=l]) .suffix{padding-inline:1rem}:host([scale=l]) .action-wrapper calcite-button,:host([scale=l]) .action-wrapper calcite-button button{block-size:2.75rem}:host([scale=l]) .clear-button{min-block-size:2.75rem;min-inline-size:2.75rem}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}input{transition:var(--calcite-animation-timing), block-size 0, outline-offset 0s;-webkit-appearance:none;position:relative;margin:0px;box-sizing:border-box;display:flex;max-block-size:100%;inline-size:100%;max-inline-size:100%;flex:1 1 0%;text-overflow:ellipsis;border-radius:0px;background-color:var(--calcite-color-foreground-1);font-family:inherit;font-weight:var(--calcite-font-weight-normal);color:var(--calcite-color-text-1)}input:-moz-placeholder-shown{text-overflow:ellipsis}input:placeholder-shown{text-overflow:ellipsis}input{border-width:1px;border-style:solid;border-color:var(--calcite-color-border-input);color:var(--calcite-color-text-1)}input::placeholder,input:-ms-input-placeholder,input::-ms-input-placeholder{font-weight:var(--calcite-font-weight-normal);color:var(--calcite-color-text-3)}input:focus{border-color:var(--calcite-color-brand);color:var(--calcite-color-text-1)}input[readonly]{background-color:var(--calcite-color-background);font-weight:var(--calcite-font-weight-medium)}input[readonly]:focus{color:var(--calcite-color-text-1)}calcite-icon{color:var(--calcite-color-text-3)}input{outline-color:transparent}input:focus{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}:host([status=invalid]) input{border-color:var(--calcite-color-status-danger)}:host([status=invalid]) input:focus{outline:2px solid var(--calcite-color-status-danger);outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}:host([scale=s]) .icon{inset-inline-start:0.5rem}:host([scale=m]) .icon{inset-inline-start:0.75rem}:host([scale=l]) .icon{inset-inline-start:1rem}:host([icon][scale=s]) input{padding-inline-start:2rem}:host([icon][scale=m]) input{padding-inline-start:2.5rem}:host([icon][scale=l]) input{padding-inline-start:3.5rem}.element-wrapper{position:relative;order:3;display:inline-flex;flex:1 1 0%;align-items:center}.icon{pointer-events:none;position:absolute;z-index:var(--calcite-z-index);display:block;transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s}input[type=text]::-ms-clear,input[type=text]::-ms-reveal{display:none;block-size:0px;inline-size:0px}.clear-button{pointer-events:initial;order:4;margin:0px;box-sizing:border-box;display:flex;min-block-size:100%;cursor:pointer;align-items:center;justify-content:center;align-self:stretch;border-width:1px;border-style:solid;border-color:var(--calcite-color-border-input);background-color:var(--calcite-color-foreground-1);outline-color:transparent;border-inline-start-width:0px}.clear-button:hover{background-color:var(--calcite-color-foreground-2);transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s}.clear-button:hover calcite-icon{color:var(--calcite-color-text-1);transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s}.clear-button:active{background-color:var(--calcite-color-foreground-3)}.clear-button:active calcite-icon{color:var(--calcite-color-text-1)}.clear-button:focus{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.clear-button:disabled{opacity:var(--calcite-opacity-disabled)}.loader{inset-block-start:1px;inset-inline:1px;pointer-events:none;position:absolute;display:block}.action-wrapper{order:7;display:flex}.prefix,.suffix{box-sizing:border-box;display:flex;block-size:auto;min-block-size:100%;-webkit-user-select:none;-moz-user-select:none;user-select:none;align-content:center;align-items:center;overflow-wrap:break-word;border-width:1px;border-style:solid;border-color:var(--calcite-color-border-input);background-color:var(--calcite-color-background);font-weight:var(--calcite-font-weight-medium);line-height:1;color:var(--calcite-color-text-2)}.prefix{order:2;border-inline-end-width:0px}.suffix{order:5;border-inline-start-width:0px}:host([alignment=start]) input{text-align:start}:host([alignment=end]) input{text-align:end}.wrapper{position:relative;display:flex;flex-direction:row;align-items:center}:host(.no-bottom-border) input{border-block-end-width:0px}:host(.border-top-color-one) input{border-block-start-color:var(--calcite-color-border-1)}input.inline-child{background-color:transparent;transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s}input.inline-child .editing-enabled{background-color:inherit}input.inline-child:not(.editing-enabled){display:flex;cursor:pointer;text-overflow:ellipsis;border-color:transparent;padding-inline-start:0}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:0.5rem}:host([scale=s]) .validation-container{padding-block-start:0.25rem}::slotted(input[slot=hidden-form-input]){margin:0 !important;opacity:0 !important;outline:none !important;padding:0 !important;position:absolute !important;inset:0 !important;transform:none !important;-webkit-appearance:none !important;z-index:-1 !important}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteInputTextStyle0 = inputTextCss;

const InputText = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.calciteInternalInputTextFocus = createEvent(this, "calciteInternalInputTextFocus", 7);
        this.calciteInternalInputTextBlur = createEvent(this, "calciteInternalInputTextBlur", 7);
        this.calciteInputTextInput = createEvent(this, "calciteInputTextInput", 7);
        this.calciteInputTextChange = createEvent(this, "calciteInputTextChange", 7);
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
                this.clearInputTextValue(event);
                event.preventDefault();
            }
            if (event.key === "Enter") {
                if (submitForm(this)) {
                    event.preventDefault();
                }
            }
        };
        this.clearInputTextValue = (nativeEvent) => {
            this.setValue({
                committing: true,
                nativeEvent,
                origin: "user",
                value: "",
            });
        };
        this.emitChangeIfUserModified = () => {
            if (this.previousValueOrigin === "user" && this.value !== this.previousEmittedValue) {
                this.calciteInputTextChange.emit();
                this.setPreviousEmittedValue(this.value);
            }
        };
        this.inputTextBlurHandler = () => {
            this.calciteInternalInputTextBlur.emit({
                element: this.childEl,
                value: this.value,
            });
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
        this.inputTextFocusHandler = () => {
            this.calciteInternalInputTextFocus.emit({
                element: this.childEl,
                value: this.value,
            });
        };
        this.inputTextInputHandler = (nativeEvent) => {
            if (this.disabled || this.readOnly) {
                return;
            }
            this.setValue({
                nativeEvent,
                origin: "user",
                value: nativeEvent.target.value,
            });
        };
        this.inputTextKeyDownHandler = (event) => {
            if (this.disabled || this.readOnly) {
                return;
            }
            if (event.key === "Enter") {
                this.emitChangeIfUserModified();
            }
        };
        this.onHiddenFormInputInput = (event) => {
            if (event.target.name === this.name) {
                this.setValue({
                    value: event.target.value,
                    origin: "direct",
                });
            }
            this.setFocus();
            event.stopPropagation();
        };
        this.setChildElRef = (el) => {
            this.childEl = el;
        };
        this.setInputValue = (newInputValue) => {
            if (!this.childEl) {
                return;
            }
            this.childEl.value = newInputValue;
        };
        this.setPreviousEmittedValue = (value) => {
            this.previousEmittedValue = value;
        };
        this.setPreviousValue = (value) => {
            this.previousValue = value;
        };
        this.setValue = ({ committing = false, nativeEvent, origin, previousValue, value, }) => {
            this.setPreviousValue(previousValue ?? this.value);
            this.previousValueOrigin = origin;
            this.userChangedValue = origin === "user" && value !== this.value;
            this.value = value;
            if (origin === "direct") {
                this.setInputValue(value);
                this.setPreviousEmittedValue(value);
            }
            if (nativeEvent) {
                const calciteInputTextInputEvent = this.calciteInputTextInput.emit();
                if (calciteInputTextInputEvent.defaultPrevented) {
                    this.value = this.previousValue;
                }
                else if (committing) {
                    this.emitChangeIfUserModified();
                }
            }
        };
        this.alignment = "start";
        this.autofocus = undefined;
        this.clearable = false;
        this.disabled = false;
        this.enterKeyHint = undefined;
        this.form = undefined;
        this.icon = undefined;
        this.iconFlipRtl = false;
        this.inputMode = undefined;
        this.label = undefined;
        this.loading = false;
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
        this.placeholder = undefined;
        this.prefixText = undefined;
        this.readOnly = false;
        this.required = false;
        this.scale = "m";
        this.status = "idle";
        this.autocomplete = undefined;
        this.pattern = undefined;
        this.suffixText = undefined;
        this.editingEnabled = false;
        this.value = "";
        this.messages = undefined;
        this.messageOverrides = undefined;
        this.effectiveLocale = undefined;
        this.defaultMessages = undefined;
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
    onMessagesChange() {
        /* wired up by t9n util */
    }
    valueWatcher(newValue, previousValue) {
        if (!this.userChangedValue) {
            this.setValue({
                origin: "direct",
                previousValue,
                value: !newValue ? "" : newValue,
            });
        }
        this.userChangedValue = false;
    }
    updateRequestedIcon() {
        this.requestedIcon = setRequestedIcon({}, this.icon, "text");
    }
    get isClearable() {
        return this.clearable && this.value.length > 0;
    }
    effectiveLocaleChange() {
        updateMessages(this, this.effectiveLocale);
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
        this.requestedIcon = setRequestedIcon({}, this.icon, "text");
        await setUpMessages(this);
        this.setPreviousEmittedValue(this.value);
        this.setPreviousValue(this.value);
    }
    componentDidLoad() {
        setComponentLoaded(this);
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
        this.childEl?.focus();
    }
    /** Selects the text of the component's `value`. */
    async selectText() {
        this.childEl?.select();
    }
    onLabelClick() {
        this.setFocus();
    }
    syncHiddenFormInput(input) {
        syncHiddenFormInput("text", this, input);
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
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        const dir = getElementDir(this.el);
        const loader = (h("div", { key: '75e1d143289073aba71c8412dba86e4513ba438a', class: CSS.loader }, h("calcite-progress", { key: '17c1a8dfb11db87f62dd7664fb3ef152b14c89bc', label: this.messages.loading, type: "indeterminate" })));
        const inputClearButton = (h("button", { key: '8c2fd4a9a50bea3e5c1e3061d275b76f84920e02', "aria-label": this.messages.clear, class: CSS.clearButton, disabled: this.disabled || this.readOnly, onClick: this.clearInputTextValue, tabIndex: -1, type: "button" }, h("calcite-icon", { key: '359da0464e284f76c85d92888789c6c20e6f6195', icon: "x", scale: getIconScale(this.scale) })));
        const iconEl = (h("calcite-icon", { key: '643f3c87fb55ffbab119802fa6409263a003d337', class: CSS.inputIcon, flipRtl: this.iconFlipRtl, icon: this.requestedIcon, scale: getIconScale(this.scale) }));
        const prefixText = h("div", { key: 'd5a48b6b2fef41fef60e6094d25af969fc6b95e3', class: CSS.prefix }, this.prefixText);
        const suffixText = h("div", { key: '5b1e442c895c58386790e0fad7de474be4483a1b', class: CSS.suffix }, this.suffixText);
        const childEl = (h("input", { key: '6ca205247c77545cca539d0e9e15ecc8a3bd7aeb', "aria-errormessage": IDS.validationMessage, "aria-invalid": toAriaBoolean(this.status === "invalid"), "aria-label": getLabelText(this), autocomplete: this.autocomplete, autofocus: this.el.autofocus ? true : null, class: {
                [CSS.editingEnabled]: this.editingEnabled,
                [CSS.inlineChild]: !!this.inlineEditableEl,
            }, defaultValue: this.defaultValue, disabled: this.disabled ? true : null, enterKeyHint: this.el.enterKeyHint || this.el.getAttribute("enterkeyhint"), inputMode: this.el.inputMode || this.el.getAttribute("inputmode"), maxLength: this.maxLength, minLength: this.minLength, name: this.name, onBlur: this.inputTextBlurHandler, onFocus: this.inputTextFocusHandler, onInput: this.inputTextInputHandler, onKeyDown: this.inputTextKeyDownHandler, pattern: this.pattern, placeholder: this.placeholder || "", readOnly: this.readOnly, ref: this.setChildElRef, required: this.required ? true : null, tabIndex: this.disabled || (this.inlineEditableEl && !this.editingEnabled) ? -1 : null, type: "text", value: this.value }));
        return (h(Host, { key: 'ee459d49c166ac8587e9bcff82e469001bfb341d', onClick: this.clickHandler, onKeyDown: this.keyDownHandler }, h(InteractiveContainer, { key: 'b5b5ce9afc9e98b42ad3380057c48d745fe4a69f', disabled: this.disabled }, h("div", { key: '957c3665257e600acc1b0804e00c1d4d1786dd8c', class: { [CSS.inputWrapper]: true, [CSS_UTILITY.rtl]: dir === "rtl" }, ref: (el) => (this.inputWrapperEl = el) }, this.prefixText ? prefixText : null, h("div", { key: '2f572c83b9816be8763d1c995a523f82013b76cd', class: CSS.wrapper }, childEl, this.isClearable ? inputClearButton : null, this.requestedIcon ? iconEl : null, this.loading ? loader : null), h("div", { key: 'e02221edf4528d5663d3e48fcea5d6e5c1fe12c6', class: CSS.actionWrapper, ref: (el) => (this.actionWrapperEl = el) }, h("slot", { key: 'b49d331ad17da7f17bc2f44ee0d61f5b8c45ce93', name: SLOTS.action })), this.suffixText ? suffixText : null, h(HiddenFormInputSlot, { key: 'b93d1dec9fa8f48620f694e90c4e195e0138d1c6', component: this })), this.validationMessage && this.status === "invalid" ? (h(Validation, { icon: this.validationIcon, id: IDS.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status })) : null)));
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return getElement(this); }
    static get watchers() { return {
        "autofocus": ["handleGlobalAttributesChanged"],
        "enterkeyhint": ["handleGlobalAttributesChanged"],
        "inputmode": ["handleGlobalAttributesChanged"],
        "disabled": ["disabledWatcher"],
        "messageOverrides": ["onMessagesChange"],
        "value": ["valueWatcher"],
        "icon": ["updateRequestedIcon"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
};
InputText.style = CalciteInputTextStyle0;

export { InputText as calcite_input_text };
