/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, f as forceUpdate, H as Host, g as getElement } from './index-904bc599.js';
import { c as connectForm, d as disconnectForm, H as HiddenFormInputSlot } from './form-d45062d8.js';
import { c as connectLabel, d as disconnectLabel, g as getLabelText } from './label-272c5973.js';
import { t as toAriaBoolean, s as slotChangeHasAssignedElement } from './dom-75c641a7.js';
import { c as connectLocalized, d as disconnectLocalized, n as numberStringFormatter } from './locale-24516fec.js';
import { c as createObserver } from './observers-c83631e8.js';
import { b as componentLoaded, s as setUpLoadableComponent, a as setComponentLoaded, c as componentFocusable } from './loadable-7cb2fc6f.js';
import { c as connectMessages, s as setUpMessages, d as disconnectMessages, u as updateMessages } from './t9n-9a5d28cf.js';
import { u as updateHostInteraction, I as InteractiveContainer } from './interactive-98ed6b6f.js';
import { g as guid } from './guid-b0fb1de3.js';
import { V as Validation } from './Validation-cf136c56.js';
import { s as syncHiddenFormInput } from './input-e01adc49.js';
import { t as throttle } from './throttle-aed86bf3.js';
import './component-83541c88.js';
import './resources-8e2ed936.js';
import './key-e6b442de.js';
import './browser-b67d8df6.js';
import './debounce-6e9ade8c.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const CSS = {
    assistiveText: "assistive-text",
    characterLimit: "character-limit",
    content: "content",
    container: "container",
    footer: "footer",
    resizeDisabled: "resize--disabled",
    resizeDisabledX: "resize--disabled-x",
    resizeDisabledY: "resize--disabled-y",
    characterOverLimit: "character--over-limit",
    readOnly: "readonly",
    textAreaInvalid: "text-area--invalid",
    footerSlotted: "footer--slotted",
    hide: "hide",
    footerEndSlotOnly: "footer--end-only",
    textArea: "text-area",
    textAreaOnly: "text-area--only",
};
const IDS = {
    validationMessage: "textAreaValidationMessage",
};
const SLOTS = {
    footerStart: "footer-start",
    footerEnd: "footer-end",
};
const RESIZE_TIMEOUT = 100;

const textAreaCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;display:inline-block;block-size:100%;inline-size:100%;--calcite-internal-text-area-border-color:var(--calcite-text-area-border-color, var(--calcite-color-border-input));--calcite-internal-text-area-footer-border-color:var(\n    --calcite-text-area-footer-border-color,\n    var(--calcite-internal-text-area-border-color)\n  )}.text-area,.footer{font-size:var(--calcite-text-area-font-size, var(--calcite-font-size--1));background-color:var(--calcite-text-area-background-color, var(--calcite-color-foreground-1));padding-block:var(--calcite-spacing-sm);padding-inline:var(--calcite-spacing-md)}.text-area{position:relative;margin:0px;box-sizing:border-box;display:block;inline-size:100%;font-family:var(--calcite-font-family);--calcite-internal-text-area-border-block-end-color:var(--calcite-internal-text-area-border-color);border:var(--calcite-border-width-sm) solid var(--calcite-internal-text-area-border-color);border-block-end-color:var(--calcite-internal-text-area-border-block-end-color);color:var(--calcite-text-area-text-color, var(--calcite-color-text-1));font-family:var(--calcite-sans-family);max-block-size:var(--calcite-text-area-max-height);min-block-size:var(--calcite-text-area-min-height);max-inline-size:var(--calcite-text-area-max-width);min-inline-size:var(--calcite-text-area-min-width, 12rem)}.text-area::-moz-placeholder{font-weight:var(--calcite-font-weight-normal)}.text-area::placeholder{font-weight:var(--calcite-font-weight-normal)}@media screen and (max-width: 480px){.text-area{resize:none}}.text-area:focus{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.text-area.text-area--invalid{--calcite-internal-text-area-border-color:var(--calcite-color-status-danger)}.text-area.text-area--invalid:focus{outline:2px solid var(--calcite-color-status-danger);outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.text-area.footer--slotted{min-inline-size:18rem}.text-area:not(.text-area--only,.text-area--invalid){--calcite-internal-text-area-border-block-end-color:var(\n    --calcite-text-area-divider-color,\n    var(--calcite-color-border-3)\n  )}.footer{box-sizing:border-box;display:flex;align-items:center;border:var(--calcite-border-width-sm) solid var(--calcite-internal-text-area-footer-border-color);border-block-start:var(--calcite-border-width-none);min-block-size:2.25rem}.character-limit{display:flex;align-items:center;justify-content:flex-end;white-space:nowrap;font-size:var(--calcite-text-area-font-size, var(--calcite-font-size--1));font-weight:var(--calcite-font-weight-regular);color:var(--calcite-text-area-character-limit-text-color, var(--calcite-color-text-2));padding-inline-start:var(--calcite-spacing-md)}.character--over-limit{font-weight:var(--calcite-font-weight-bold);color:var(--calcite-color-status-danger)}.readonly{background-color:var(--calcite-color-background);font-weight:var(--calcite-font-weight-medium)}.content,.hide{display:none}.container{display:flex;inline-size:100%;justify-content:space-between}.footer--end-only{justify-content:flex-end}.assistive-text{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0}.text-area.text-area--only{block-size:100%}:host([resize=none]) .text-area{resize:none}:host([resize=horizontal]) .text-area{resize:horizontal}:host([resize=vertical]) .text-area{resize:vertical}:host([scale=s]) .text-area,:host([scale=s]) .footer,:host([scale=s]) .character-limit{padding-inline-start:0.5rem;font-size:var(--calcite-text-area-font-size, var(--calcite-font-size--2))}:host([scale=s]) .footer{min-block-size:1.75rem}:host([scale=s]) .text-area{padding-block:0.25rem;padding-inline:0.5rem}:host([scale=m]) .text-area{padding-block:0.5rem;padding-inline:0.75rem}:host([scale=m]) .footer{padding-block:0.5rem;padding-inline:0.75rem;min-block-size:2.25rem}:host([scale=l]) .text-area,:host([scale=l]) .footer{font-size:var(--calcite-text-area-font-size, var(--calcite-font-size-0));padding-block:var(--calcite-spacing-md);padding-inline:var(--calcite-spacing-xl)}:host([scale=l]) .footer{min-block-size:2.75rem}:host([scale=l]) .text-area,:host([scale=l]) .footer,:host([scale=l]) .character-limit{font-size:var(--calcite-text-area-font-size, var(--calcite-font-size-0));padding-inline-start:var(--calcite-spacing-xl)}:host([status=invalid]){--calcite-internal-text-area-border-color:var(--calcite-color-status-danger)}:host([status=invalid]) .text-area:focus{outline:2px solid var(--calcite-color-status-danger);outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}:host([disabled]) .text-area,:host([disabled]) .footer{opacity:var(--calcite-opacity-half)}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:0.5rem}:host([scale=s]) .validation-container{padding-block-start:0.25rem}::slotted(input[slot=hidden-form-input]){margin:0 !important;opacity:0 !important;outline:none !important;padding:0 !important;position:absolute !important;inset:0 !important;transform:none !important;-webkit-appearance:none !important;z-index:-1 !important}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteTextAreaStyle0 = textAreaCss;

const TextArea = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.calciteTextAreaInput = createEvent(this, "calciteTextAreaInput", 7);
        this.calciteTextAreaChange = createEvent(this, "calciteTextAreaChange", 7);
        this.guid = guid();
        this.handleInput = (event) => {
            this.value = event.target["value"];
            this.calciteTextAreaInput.emit();
        };
        this.handleChange = () => {
            this.calciteTextAreaChange.emit();
        };
        this.contentSlotChangeHandler = () => {
            if (!this.value) {
                const nodes = this.el.childNodes;
                nodes.forEach((el) => {
                    if (el.nodeName === "#text") {
                        this.value = el.nodeValue.trim();
                    }
                });
            }
        };
        this.renderCharacterLimit = () => {
            if (this.maxLength) {
                this.localizedCharacterLengthObj = this.getLocalizedCharacterLength();
                return (h("span", { class: CSS.characterLimit }, h("span", { class: { [CSS.characterOverLimit]: this.isCharacterLimitExceeded() } }, this.localizedCharacterLengthObj.currentLength), "/", this.localizedCharacterLengthObj.maxLength));
            }
            return null;
        };
        this.resizeObserver = createObserver("resize", async () => {
            await componentLoaded(this);
            const { textAreaHeight, textAreaWidth, elHeight, elWidth, footerHeight, footerWidth } = this.getHeightAndWidthOfElements();
            if (footerWidth > 0 && footerWidth !== textAreaWidth) {
                this.footerEl.style.width = `${textAreaWidth}px`;
            }
            if (elWidth !== textAreaWidth || elHeight !== textAreaHeight + (footerHeight || 0)) {
                this.setHeightAndWidthToAuto();
            }
        });
        this.setTextAreaEl = (el) => {
            this.textAreaEl = el;
            this.resizeObserver.observe(el);
        };
        // height and width are set to auto here to avoid overlapping on to neighboring elements in the layout when user starts resizing.
        // throttle is used to avoid flashing of textarea when user resizes.
        this.setHeightAndWidthToAuto = throttle(() => {
            if (this.resize === "vertical" || this.resize === "both") {
                this.el.style.height = "auto";
            }
            if (this.resize === "horizontal" || this.resize === "both") {
                this.el.style.width = "auto";
            }
        }, RESIZE_TIMEOUT, { leading: false });
        this.columns = undefined;
        this.disabled = false;
        this.form = undefined;
        this.groupSeparator = false;
        this.label = undefined;
        this.minLength = undefined;
        this.maxLength = undefined;
        this.messages = undefined;
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
        this.numberingSystem = undefined;
        this.placeholder = undefined;
        this.readOnly = false;
        this.required = false;
        this.resize = "both";
        this.rows = undefined;
        this.scale = "m";
        this.status = "idle";
        this.value = "";
        this.wrap = "soft";
        this.messageOverrides = undefined;
        this.defaultMessages = undefined;
        this.endSlotHasElements = undefined;
        this.startSlotHasElements = undefined;
        this.effectiveLocale = "";
    }
    //--------------------------------------------------------------------------
    //
    //  Global attributes
    //
    //--------------------------------------------------------------------------
    handleGlobalAttributesChanged() {
        forceUpdate(this);
    }
    onMessagesChange() {
        /* wired up by t9n util */
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        connectLabel(this);
        connectForm(this);
        connectLocalized(this);
        connectMessages(this);
    }
    async componentWillLoad() {
        setUpLoadableComponent(this);
        await setUpMessages(this);
    }
    componentDidLoad() {
        setComponentLoaded(this);
    }
    componentDidRender() {
        updateHostInteraction(this);
        this.setTextAreaHeight();
    }
    disconnectedCallback() {
        disconnectLabel(this);
        disconnectForm(this);
        disconnectLocalized(this);
        disconnectMessages(this);
        this.resizeObserver?.disconnect();
    }
    render() {
        const hasFooter = this.startSlotHasElements || this.endSlotHasElements || !!this.maxLength;
        return (h(Host, { key: '87f925e13e3a1bef5b85af59a4e61433c3262929' }, h(InteractiveContainer, { key: '3431b47034859c62b0d0116b5ff47189cd46ea0b', disabled: this.disabled }, h("textarea", { key: '78e60318dc05f03f0ec0f0738384b33a7e4ed546', "aria-describedby": this.guid, "aria-errormessage": IDS.validationMessage, "aria-invalid": toAriaBoolean(this.status === "invalid" || this.isCharacterLimitExceeded()), "aria-label": getLabelText(this), autofocus: this.el.autofocus, class: {
                [CSS.textArea]: true,
                [CSS.readOnly]: this.readOnly,
                [CSS.textAreaInvalid]: this.isCharacterLimitExceeded(),
                [CSS.footerSlotted]: this.endSlotHasElements && this.startSlotHasElements,
                [CSS.textAreaOnly]: !hasFooter,
            }, cols: this.columns, disabled: this.disabled, name: this.name, onChange: this.handleChange, onInput: this.handleInput, placeholder: this.placeholder, readOnly: this.readOnly, ref: this.setTextAreaEl, required: this.required, rows: this.rows, value: this.value, wrap: this.wrap }), h("span", { key: '54d603509f65611918b788280124499ecf2161cf', class: { [CSS.content]: true } }, h("slot", { key: 'e1ffe00ed1eeb26899f372ea9d011da20bcddfeb', onSlotchange: this.contentSlotChangeHandler })), h("footer", { key: 'bb52300f3ba3568e0e325c7e620cb6f5c53cba37', class: {
                [CSS.footer]: true,
                [CSS.readOnly]: this.readOnly,
                [CSS.hide]: !hasFooter,
            }, ref: (el) => (this.footerEl = el) }, h("div", { key: 'a5c5c250493dab203789dd27ce187c817006c5be', class: {
                [CSS.container]: true,
                [CSS.footerEndSlotOnly]: !this.startSlotHasElements && this.endSlotHasElements,
            } }, h("slot", { key: 'a54c7b6ca529475fa59cf1849213cd0ec7bf8f9c', name: SLOTS.footerStart, onSlotchange: (event) => (this.startSlotHasElements = slotChangeHasAssignedElement(event)) }), h("slot", { key: 'e14af1362fd85e7461c42dd10dfd188d10f59ab0', name: SLOTS.footerEnd, onSlotchange: (event) => (this.endSlotHasElements = slotChangeHasAssignedElement(event)) })), this.renderCharacterLimit()), h(HiddenFormInputSlot, { key: 'b64b6dc288df7eadcf3eef9e17aa931732f4ad09', component: this }), this.isCharacterLimitExceeded() && (h("span", { key: 'fb2017a6f21f4590934d9a1118e5dc5ee29e1dd5', "aria-live": "polite", class: CSS.assistiveText, id: this.guid }, this.replacePlaceHoldersInMessages())), this.validationMessage && this.status === "invalid" ? (h(Validation, { icon: this.validationIcon, id: IDS.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status })) : null)));
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /** Sets focus on the component. */
    async setFocus() {
        await componentFocusable(this);
        this.textAreaEl.focus();
    }
    /** Selects the text of the component's `value`. */
    async selectText() {
        await componentLoaded(this);
        this.textAreaEl.select();
    }
    effectiveLocaleChange() {
        updateMessages(this, this.effectiveLocale);
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    onLabelClick() {
        this.setFocus();
    }
    getLocalizedCharacterLength() {
        const currentLength = this.value ? this.value.length.toString() : "0";
        const maxLength = this.maxLength.toString();
        if (this.numberingSystem === "latn") {
            return { currentLength, maxLength };
        }
        numberStringFormatter.numberFormatOptions = {
            locale: this.effectiveLocale,
            numberingSystem: this.numberingSystem,
            signDisplay: "never",
            useGrouping: this.groupSeparator,
        };
        return {
            currentLength: numberStringFormatter.localize(currentLength),
            maxLength: numberStringFormatter.localize(maxLength),
        };
    }
    syncHiddenFormInput(input) {
        input.setCustomValidity("");
        if (this.isCharacterLimitExceeded()) {
            input.setCustomValidity(this.replacePlaceHoldersInMessages());
        }
        syncHiddenFormInput("textarea", this, input);
    }
    setTextAreaHeight() {
        const { textAreaHeight, elHeight, footerHeight } = this.getHeightAndWidthOfElements();
        if (footerHeight > 0 && textAreaHeight + footerHeight != elHeight) {
            this.textAreaEl.style.height = `${elHeight - footerHeight}px`;
        }
    }
    getHeightAndWidthOfElements() {
        const { height: textAreaHeight, width: textAreaWidth } = this.textAreaEl.getBoundingClientRect();
        const { height: elHeight, width: elWidth } = this.el.getBoundingClientRect();
        const { height: footerHeight, width: footerWidth } = this.footerEl.getBoundingClientRect();
        return {
            textAreaHeight,
            textAreaWidth,
            elHeight,
            elWidth,
            footerHeight,
            footerWidth,
        };
    }
    replacePlaceHoldersInMessages() {
        return this.messages.tooLong
            .replace("{maxLength}", this.localizedCharacterLengthObj.maxLength)
            .replace("{currentLength}", this.localizedCharacterLengthObj.currentLength);
    }
    isCharacterLimitExceeded() {
        return this.value?.length > this.maxLength;
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return getElement(this); }
    static get watchers() { return {
        "autofocus": ["handleGlobalAttributesChanged"],
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
};
TextArea.style = CalciteTextAreaStyle0;

export { TextArea as calcite_text_area };
