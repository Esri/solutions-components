/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5a0af791.js');
const form = require('./form-5229f1c8.js');
const label = require('./label-26ee0ddb.js');
const dom = require('./dom-6a9b6275.js');
const locale = require('./locale-42c21404.js');
const observers = require('./observers-8fed90f3.js');
const loadable = require('./loadable-2e2626dc.js');
const t9n = require('./t9n-42ba6ea3.js');
const interactive = require('./interactive-89f913ba.js');
const guid = require('./guid-02e5380f.js');
const Validation = require('./Validation-aa47298a.js');
const input = require('./input-33270a99.js');
const throttle = require('./throttle-fe6b54a3.js');
require('./component-a4c6a35d.js');
require('./resources-dfe71ff2.js');
require('./key-d6da79d8.js');
require('./browser-69696af0.js');
require('./debounce-7f1e04d6.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
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
    borderColor: "border--color",
    hide: "hide",
    blockSizeFull: "block-size--full",
    footerEndSlotOnly: "footer--end-only",
};
const IDS = {
    validationMessage: "textAreaValidationMessage",
};
const SLOTS = {
    footerStart: "footer-start",
    footerEnd: "footer-end",
};
const RESIZE_TIMEOUT = 100;

const textAreaCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;display:inline-block;block-size:100%;inline-size:100%}textarea{position:relative;margin:0px;box-sizing:border-box;display:block;inline-size:100%;border-width:1px;border-color:var(--calcite-color-border-input);background-color:var(--calcite-color-foreground-1);font-family:var(--calcite-font-family);color:var(--calcite-color-text-1);min-inline-size:12rem;border-block-end:1px solid var(--calcite-color-border-3)}@media screen and (max-width: 480px){textarea{resize:none}}textarea:focus{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}textarea.text-area--invalid{border-width:1px;border-block-end-width:1px;border-style:solid;border-color:var(--calcite-color-status-danger)}textarea.text-area--invalid:focus{outline:2px solid var(--calcite-color-status-danger);outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}textarea.footer--slotted{min-inline-size:18rem}.footer{box-sizing:border-box;display:flex;align-items:center;border-width:1px;border-block-start-width:0px;border-style:solid;border-color:var(--calcite-color-border-input);background-color:var(--calcite-color-foreground-1)}.character-limit{display:flex;align-items:center;justify-content:flex-end;white-space:nowrap;font-weight:var(--calcite-font-weight-normal);color:var(--calcite-color-text-2)}.character--over-limit{font-weight:var(--calcite-font-weight-bold);color:var(--calcite-color-status-danger)}:host([resize=none]) textarea{resize:none}:host([resize=horizontal]) textarea{resize:horizontal}:host([resize=vertical]) textarea{resize:vertical}:host([scale=s]){font-size:var(--calcite-font-size--2)}:host([scale=s]) .footer{padding-block:0.25rem;padding-inline:0.5rem;min-block-size:1.75rem}:host([scale=s]) textarea{padding-block:0.25rem;padding-inline:0.5rem}:host([scale=s]) textarea,:host([scale=s]) .footer,:host([scale=s]) .character-limit{padding-inline-start:0.5rem;font-size:var(--calcite-font-size--2)}:host([scale=m]) textarea{padding-block:0.5rem;padding-inline:0.75rem}:host([scale=m]) .footer{padding-block:0.5rem;padding-inline:0.75rem;min-block-size:2.25rem}:host([scale=m]) textarea,:host([scale=m]) .footer,:host([scale=m]) .character-limit{padding-inline-start:0.75rem;font-size:var(--calcite-font-size--1)}:host([scale=l]){font-size:var(--calcite-font-size-0)}:host([scale=l]) textarea{padding-block:0.75rem;padding-inline:1rem}:host([scale=l]) .footer{padding-block:0.75rem;padding-inline:1rem;min-block-size:2.75rem}:host([scale=l]) textarea,:host([scale=l]) .footer,:host([scale=l]) .character-limit{padding-inline-start:1rem;font-size:var(--calcite-font-size-0)}:host([status=invalid]) textarea{border-color:var(--calcite-color-status-danger)}:host([status=invalid]) textarea:focus{outline:2px solid var(--calcite-color-status-danger);outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.readonly{background-color:var(--calcite-color-background);font-weight:var(--calcite-font-weight-medium)}.border--color{border-block-end-width:1px;border-color:var(--calcite-color-border-input)}.border--color:focus{border-block-end-width:2px}textarea.block-size--full{block-size:100%}.content,.hide{display:none}.container{display:flex;inline-size:100%;justify-content:space-between}.footer--end-only{justify-content:flex-end}.assistive-text{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:0.5rem}:host([scale=s]) .validation-container{padding-block-start:0.25rem}::slotted(input[slot=hidden-form-input]){margin:0 !important;opacity:0 !important;outline:none !important;padding:0 !important;position:absolute !important;inset:0 !important;transform:none !important;-webkit-appearance:none !important;z-index:-1 !important}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteTextAreaStyle0 = textAreaCss;

const TextArea = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteTextAreaInput = index.createEvent(this, "calciteTextAreaInput", 7);
        this.calciteTextAreaChange = index.createEvent(this, "calciteTextAreaChange", 7);
        this.guid = guid.guid();
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
                return (index.h("span", { class: CSS.characterLimit }, index.h("span", { class: { [CSS.characterOverLimit]: this.isCharacterLimitExceeded() } }, this.localizedCharacterLengthObj.currentLength), "/", this.localizedCharacterLengthObj.maxLength));
            }
            return null;
        };
        this.resizeObserver = observers.createObserver("resize", async () => {
            await loadable.componentLoaded(this);
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
        this.setHeightAndWidthToAuto = throttle.throttle(() => {
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
        index.forceUpdate(this);
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
        interactive.connectInteractive(this);
        label.connectLabel(this);
        form.connectForm(this);
        locale.connectLocalized(this);
        t9n.connectMessages(this);
    }
    async componentWillLoad() {
        loadable.setUpLoadableComponent(this);
        await t9n.setUpMessages(this);
    }
    componentDidLoad() {
        loadable.setComponentLoaded(this);
    }
    componentDidRender() {
        interactive.updateHostInteraction(this);
        this.setTextAreaHeight();
    }
    disconnectedCallback() {
        interactive.disconnectInteractive(this);
        label.disconnectLabel(this);
        form.disconnectForm(this);
        locale.disconnectLocalized(this);
        t9n.disconnectMessages(this);
        this.resizeObserver?.disconnect();
    }
    render() {
        const hasFooter = this.startSlotHasElements || this.endSlotHasElements || !!this.maxLength;
        return (index.h(index.Host, { key: '4bcfac668585f0f53f839dd7040c10c86466f7ea' }, index.h(interactive.InteractiveContainer, { key: '2731deb4f42e1ef61d5d53fbbba5fd267ba6ecc0', disabled: this.disabled }, index.h("textarea", { key: '8746db6bd65da8641c449e1a3ab90371dd6a3aab', "aria-describedby": this.guid, "aria-errormessage": IDS.validationMessage, "aria-invalid": dom.toAriaBoolean(this.status === "invalid" || this.isCharacterLimitExceeded()), "aria-label": label.getLabelText(this), autofocus: this.el.autofocus, class: {
                [CSS.readOnly]: this.readOnly,
                [CSS.textAreaInvalid]: this.isCharacterLimitExceeded(),
                [CSS.footerSlotted]: this.endSlotHasElements && this.startSlotHasElements,
                [CSS.blockSizeFull]: !hasFooter,
                [CSS.borderColor]: !hasFooter,
            }, cols: this.columns, disabled: this.disabled, name: this.name, onChange: this.handleChange, onInput: this.handleInput, placeholder: this.placeholder, readOnly: this.readOnly, ref: this.setTextAreaEl, required: this.required, rows: this.rows, value: this.value, wrap: this.wrap }), index.h("span", { key: '18f5b2cc042e0072bf14585f097c59e033e90565', class: { [CSS.content]: true } }, index.h("slot", { key: '5ad6ecb6e80821617067f206a2a96d1921ccd5f1', onSlotchange: this.contentSlotChangeHandler })), index.h("footer", { key: 'bf75a8624f1d73bebfaf5a4dc9d49c4ffb9bdca0', class: {
                [CSS.footer]: true,
                [CSS.readOnly]: this.readOnly,
                [CSS.hide]: !hasFooter,
            }, ref: (el) => (this.footerEl = el) }, index.h("div", { key: 'd16b1caa152ce0aeada636c9758b0424461c9123', class: {
                [CSS.container]: true,
                [CSS.footerEndSlotOnly]: !this.startSlotHasElements && this.endSlotHasElements,
            } }, index.h("slot", { key: 'c488efe95fe4c0e7e83bb74644729f5ca864312b', name: SLOTS.footerStart, onSlotchange: (event) => (this.startSlotHasElements = dom.slotChangeHasAssignedElement(event)) }), index.h("slot", { key: 'c0228767e3af06d68a9a887b9d26e08c95fa8d05', name: SLOTS.footerEnd, onSlotchange: (event) => (this.endSlotHasElements = dom.slotChangeHasAssignedElement(event)) })), this.renderCharacterLimit()), index.h(form.HiddenFormInputSlot, { key: '4d1b9b4a7c7fb7f0ac12045d85798340a9e127ce', component: this }), this.isCharacterLimitExceeded() && (index.h("span", { key: 'a89f7f1c087d7c6f6ae4e3a4f33869d169323d1b', "aria-hidden": true, "aria-live": "polite", class: CSS.assistiveText, id: this.guid }, this.replacePlaceHoldersInMessages())), this.validationMessage && this.status === "invalid" ? (index.h(Validation.Validation, { icon: this.validationIcon, id: IDS.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status })) : null)));
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /** Sets focus on the component. */
    async setFocus() {
        await loadable.componentFocusable(this);
        this.textAreaEl.focus();
    }
    /** Selects the text of the component's `value`. */
    async selectText() {
        await loadable.componentLoaded(this);
        this.textAreaEl.select();
    }
    effectiveLocaleChange() {
        t9n.updateMessages(this, this.effectiveLocale);
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
        locale.numberStringFormatter.numberFormatOptions = {
            locale: this.effectiveLocale,
            numberingSystem: this.numberingSystem,
            signDisplay: "never",
            useGrouping: this.groupSeparator,
        };
        return {
            currentLength: locale.numberStringFormatter.localize(currentLength),
            maxLength: locale.numberStringFormatter.localize(maxLength),
        };
    }
    syncHiddenFormInput(input$1) {
        input$1.setCustomValidity("");
        if (this.isCharacterLimitExceeded()) {
            input$1.setCustomValidity(this.replacePlaceHoldersInMessages());
        }
        input.syncHiddenFormInput("textarea", this, input$1);
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
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "autofocus": ["handleGlobalAttributesChanged"],
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
};
TextArea.style = CalciteTextAreaStyle0;

exports.calcite_text_area = TextArea;
