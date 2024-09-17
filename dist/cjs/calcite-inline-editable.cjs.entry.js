/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5a0af791.js');
const dom = require('./dom-6a9b6275.js');
const interactive = require('./interactive-89f913ba.js');
const label = require('./label-26ee0ddb.js');
const loadable = require('./loadable-2e2626dc.js');
const locale = require('./locale-42c21404.js');
const observers = require('./observers-8fed90f3.js');
const t9n = require('./t9n-42ba6ea3.js');
require('./guid-02e5380f.js');
require('./resources-dfe71ff2.js');
require('./browser-69696af0.js');
require('./component-a4c6a35d.js');
require('./key-d6da79d8.js');

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

const InlineEditable = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteInlineEditableEditCancel = index.createEvent(this, "calciteInlineEditableEditCancel", 6);
        this.calciteInlineEditableEditConfirm = index.createEvent(this, "calciteInlineEditableEditConfirm", 6);
        this.calciteInternalInlineEditableEnableEditingChange = index.createEvent(this, "calciteInternalInlineEditableEnableEditingChange", 6);
        this.mutationObserver = observers.createObserver("mutation", () => this.mutationObserverCallback());
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
        interactive.connectInteractive(this);
        label.connectLabel(this);
        locale.connectLocalized(this);
        t9n.connectMessages(this);
        this.mutationObserver?.observe(this.el, { childList: true });
        this.mutationObserverCallback();
    }
    async componentWillLoad() {
        loadable.setUpLoadableComponent(this);
        await t9n.setUpMessages(this);
    }
    componentDidLoad() {
        loadable.setComponentLoaded(this);
    }
    disconnectedCallback() {
        interactive.disconnectInteractive(this);
        label.disconnectLabel(this);
        locale.disconnectLocalized(this);
        t9n.disconnectMessages(this);
        this.mutationObserver?.disconnect();
    }
    componentDidRender() {
        interactive.updateHostInteraction(this);
    }
    render() {
        return (index.h(interactive.InteractiveContainer, { key: '679bc60f370860de292d87bc9557f451f3674a4a', disabled: this.disabled }, index.h("div", { key: 'fa5d6c787837eeb8174dc45d7bcdc61b7e1c1851', class: CSS.wrapper, onClick: this.enableEditingHandler, onKeyDown: this.escapeKeyHandler }, index.h("div", { key: '2a432c9940c1652490168333d15c19396d149a10', class: CSS.inputWrapper }, index.h("slot", { key: '80a11e4a0c3ace9a4ef5578f797e4a6b4b3f72e9' })), index.h("div", { key: '540e6cf43d413ebe15345a37902b110094010d57', class: CSS.controlsWrapper }, index.h("calcite-button", { key: '1ee7fa765b9bd7745424bb8f8f524c0a9ba6c44e', appearance: "transparent", class: CSS.enableEditingButton, disabled: this.disabled, iconStart: "pencil", kind: "neutral", label: this.messages.enableEditing, onClick: this.enableEditingHandler, ref: (el) => (this.enableEditingButton = el), scale: this.scale, style: {
                opacity: this.editingEnabled ? "0" : "1",
                width: this.editingEnabled ? "0" : "inherit",
            }, type: "button" }), this.shouldShowControls && [
            index.h("div", { key: 'd9eb2bfc9affd4c7fb6510448476c5b83399a2ca', class: CSS.cancelEditingButtonWrapper }, index.h("calcite-button", { key: '03243abe113f8e441e05f87feef164215082feda', appearance: "transparent", class: CSS.cancelEditingButton, disabled: this.disabled, iconStart: "x", kind: "neutral", label: this.messages.cancelEditing, onClick: this.cancelEditingHandler, ref: (el) => (this.cancelEditingButton = el), scale: this.scale, type: "button" })),
            index.h("calcite-button", { key: '92bdc973c915fbf4980a1fb01ffd4cf9a9f41557', appearance: "solid", class: CSS.confirmChangesButton, disabled: this.disabled, iconStart: "check", kind: "brand", label: this.messages.confirmChanges, loading: this.loading, onClick: this.confirmChangesHandler, ref: (el) => (this.confirmEditingButton = el), scale: this.scale, type: "button" }),
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
        t9n.updateMessages(this, this.effectiveLocale);
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /** Sets focus on the component. */
    async setFocus() {
        await loadable.componentFocusable(this);
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
        const inputElement = dom.getSlotted(this.el, {
            matches: "calcite-input",
        });
        this.inputElement = inputElement;
        if (!inputElement) {
            return;
        }
        this.inputElement.disabled = this.disabled;
        this.inputElement.label = this.inputElement.label || label.getLabelText(this);
    }
    get shouldShowControls() {
        return this.editingEnabled && this.controls;
    }
    static get delegatesFocus() { return true; }
    static get assetsDirs() { return ["assets"]; }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "disabled": ["disabledWatcher"],
        "editingEnabled": ["editingEnabledWatcher"],
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
};
InlineEditable.style = CalciteInlineEditableStyle0;

exports.calcite_inline_editable = InlineEditable;
