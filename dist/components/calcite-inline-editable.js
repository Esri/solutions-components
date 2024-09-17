/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { a as getSlotted } from './dom.js';
import { c as connectInteractive, d as disconnectInteractive, u as updateHostInteraction, I as InteractiveContainer } from './interactive.js';
import { c as connectLabel, d as disconnectLabel, g as getLabelText } from './label.js';
import { s as setUpLoadableComponent, a as setComponentLoaded, c as componentFocusable } from './loadable.js';
import { c as connectLocalized, d as disconnectLocalized } from './locale2.js';
import { c as createObserver } from './observers.js';
import { c as connectMessages, s as setUpMessages, d as disconnectMessages, u as updateMessages } from './t9n.js';
import { d as defineCustomElement$4 } from './button.js';
import { d as defineCustomElement$3 } from './icon.js';
import { d as defineCustomElement$2 } from './loader.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const CSS = {
    wrapper: "wrapper",
    confirmChangesButton: "confirm-changes-button",
    cancelEditingButton: "cancel-editing-button",
    inputWrapper: "input-wrapper",
    cancelEditingButtonWrapper: "cancel-editing-button-wrapper",
    enableEditingButton: "enable-editing-button",
    controlsWrapper: "controls-wrapper",
};

const inlineEditableCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block}:host([scale=s]) .controls-wrapper{block-size:1.5rem}:host([scale=m]) .controls-wrapper{block-size:2rem}:host([scale=l]) .controls-wrapper{block-size:2.75rem}:host(:not([editing-enabled]):not([disabled])) .wrapper:hover{background-color:var(--calcite-color-foreground-2)}.wrapper{box-sizing:border-box;display:flex;justify-content:space-between;background-color:var(--calcite-color-foreground-1);transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s}.wrapper .input-wrapper{flex:1 1 0%}.controls-wrapper{display:flex}:host([disabled]) .cancel-editing-button-wrapper{border-color:var(--calcite-color-border-2)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteInlineEditableStyle0 = inlineEditableCss;

const InlineEditable = /*@__PURE__*/ proxyCustomElement(class InlineEditable extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.calciteInlineEditableEditCancel = createEvent(this, "calciteInlineEditableEditCancel", 6);
        this.calciteInlineEditableEditConfirm = createEvent(this, "calciteInlineEditableEditConfirm", 6);
        this.calciteInternalInlineEditableEnableEditingChange = createEvent(this, "calciteInternalInlineEditableEnableEditingChange", 6);
        this.mutationObserver = createObserver("mutation", () => this.mutationObserverCallback());
        this.enableEditing = () => {
            this.valuePriorToEditing = this.inputElement?.value;
            this.editingEnabled = true;
            this.inputElement?.setFocus();
            this.calciteInternalInlineEditableEnableEditingChange.emit();
        };
        this.disableEditing = () => {
            this.editingEnabled = false;
        };
        this.cancelEditing = () => {
            if (this.inputElement) {
                this.inputElement.value = this.valuePriorToEditing;
            }
            this.disableEditing();
            this.enableEditingButton.setFocus();
            if (!this.editingEnabled && !!this.shouldEmitCancel) {
                this.calciteInlineEditableEditCancel.emit();
            }
        };
        this.escapeKeyHandler = async (event) => {
            if (event.defaultPrevented) {
                return;
            }
            if (event.key === "Escape") {
                event.preventDefault();
                this.cancelEditing();
            }
            if (event.key === "Tab" && this.shouldShowControls) {
                if (!event.shiftKey && event.target === this.inputElement) {
                    event.preventDefault();
                    this.cancelEditingButton.setFocus();
                }
                if (!!event.shiftKey && event.target === this.cancelEditingButton) {
                    event.preventDefault();
                    this.inputElement?.setFocus();
                }
            }
        };
        this.cancelEditingHandler = async (event) => {
            event.preventDefault();
            this.cancelEditing();
        };
        this.enableEditingHandler = async (event) => {
            if (this.disabled ||
                event.target === this.cancelEditingButton ||
                event.target === this.confirmEditingButton) {
                return;
            }
            event.preventDefault();
            if (!this.editingEnabled) {
                this.enableEditing();
            }
        };
        this.confirmChangesHandler = async (event) => {
            event.preventDefault();
            this.calciteInlineEditableEditConfirm.emit();
            try {
                if (this.afterConfirm) {
                    this.loading = true;
                    await this.afterConfirm();
                    this.disableEditing();
                    this.enableEditingButton.setFocus();
                }
            }
            catch (error) {
                // we handle error in finally block
            }
            finally {
                this.loading = false;
            }
        };
        this.disabled = false;
        this.editingEnabled = false;
        this.loading = false;
        this.controls = false;
        this.scale = undefined;
        this.afterConfirm = undefined;
        this.messages = undefined;
        this.messageOverrides = undefined;
        this.defaultMessages = undefined;
        this.effectiveLocale = undefined;
    }
    disabledWatcher(disabled) {
        if (this.inputElement) {
            this.inputElement.disabled = disabled;
        }
    }
    editingEnabledWatcher(newValue, oldValue) {
        if (this.inputElement) {
            this.inputElement.editingEnabled = newValue;
        }
        if (!newValue && !!oldValue) {
            this.shouldEmitCancel = true;
        }
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
        connectInteractive(this);
        connectLabel(this);
        connectLocalized(this);
        connectMessages(this);
        this.mutationObserver?.observe(this.el, { childList: true });
        this.mutationObserverCallback();
    }
    async componentWillLoad() {
        setUpLoadableComponent(this);
        await setUpMessages(this);
    }
    componentDidLoad() {
        setComponentLoaded(this);
    }
    disconnectedCallback() {
        disconnectInteractive(this);
        disconnectLabel(this);
        disconnectLocalized(this);
        disconnectMessages(this);
        this.mutationObserver?.disconnect();
    }
    componentDidRender() {
        updateHostInteraction(this);
    }
    render() {
        return (h(InteractiveContainer, { key: '679bc60f370860de292d87bc9557f451f3674a4a', disabled: this.disabled }, h("div", { key: 'fa5d6c787837eeb8174dc45d7bcdc61b7e1c1851', class: CSS.wrapper, onClick: this.enableEditingHandler, onKeyDown: this.escapeKeyHandler }, h("div", { key: '2a432c9940c1652490168333d15c19396d149a10', class: CSS.inputWrapper }, h("slot", { key: '80a11e4a0c3ace9a4ef5578f797e4a6b4b3f72e9' })), h("div", { key: '540e6cf43d413ebe15345a37902b110094010d57', class: CSS.controlsWrapper }, h("calcite-button", { key: '1ee7fa765b9bd7745424bb8f8f524c0a9ba6c44e', appearance: "transparent", class: CSS.enableEditingButton, disabled: this.disabled, iconStart: "pencil", kind: "neutral", label: this.messages.enableEditing, onClick: this.enableEditingHandler, ref: (el) => (this.enableEditingButton = el), scale: this.scale, style: {
                opacity: this.editingEnabled ? "0" : "1",
                width: this.editingEnabled ? "0" : "inherit",
            }, type: "button" }), this.shouldShowControls && [
            h("div", { key: 'd9eb2bfc9affd4c7fb6510448476c5b83399a2ca', class: CSS.cancelEditingButtonWrapper }, h("calcite-button", { key: '03243abe113f8e441e05f87feef164215082feda', appearance: "transparent", class: CSS.cancelEditingButton, disabled: this.disabled, iconStart: "x", kind: "neutral", label: this.messages.cancelEditing, onClick: this.cancelEditingHandler, ref: (el) => (this.cancelEditingButton = el), scale: this.scale, type: "button" })),
            h("calcite-button", { key: '92bdc973c915fbf4980a1fb01ffd4cf9a9f41557', appearance: "solid", class: CSS.confirmChangesButton, disabled: this.disabled, iconStart: "check", kind: "brand", label: this.messages.confirmChanges, loading: this.loading, onClick: this.confirmChangesHandler, ref: (el) => (this.confirmEditingButton = el), scale: this.scale, type: "button" }),
        ]))));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    blurHandler() {
        if (!this.controls) {
            this.disableEditing();
        }
    }
    effectiveLocaleChange() {
        updateMessages(this, this.effectiveLocale);
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /** Sets focus on the component. */
    async setFocus() {
        await componentFocusable(this);
        this.el?.focus();
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    mutationObserverCallback() {
        this.updateSlottedInput();
        this.scale = this.scale || this.inputElement?.scale;
    }
    onLabelClick() {
        this.setFocus();
    }
    updateSlottedInput() {
        const inputElement = getSlotted(this.el, {
            matches: "calcite-input",
        });
        this.inputElement = inputElement;
        if (!inputElement) {
            return;
        }
        this.inputElement.disabled = this.disabled;
        this.inputElement.label = this.inputElement.label || getLabelText(this);
    }
    get shouldShowControls() {
        return this.editingEnabled && this.controls;
    }
    static get delegatesFocus() { return true; }
    static get assetsDirs() { return ["assets"]; }
    get el() { return this; }
    static get watchers() { return {
        "disabled": ["disabledWatcher"],
        "editingEnabled": ["editingEnabledWatcher"],
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
    static get style() { return CalciteInlineEditableStyle0; }
}, [17, "calcite-inline-editable", {
        "disabled": [516],
        "editingEnabled": [1540, "editing-enabled"],
        "loading": [1540],
        "controls": [516],
        "scale": [1537],
        "afterConfirm": [16],
        "messages": [1040],
        "messageOverrides": [1040],
        "defaultMessages": [32],
        "effectiveLocale": [32],
        "setFocus": [64]
    }, [[0, "calciteInternalInputBlur", "blurHandler"]], {
        "disabled": ["disabledWatcher"],
        "editingEnabled": ["editingEnabledWatcher"],
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-inline-editable", "calcite-button", "calcite-icon", "calcite-loader"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-inline-editable":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, InlineEditable);
            }
            break;
        case "calcite-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "calcite-loader":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}
defineCustomElement$1();

const CalciteInlineEditable = InlineEditable;
const defineCustomElement = defineCustomElement$1;

export { CalciteInlineEditable, defineCustomElement };
