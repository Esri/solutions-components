/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-4b68e4b4.js');
const dom = require('./dom-795d4a33.js');
const interactive = require('./interactive-a128ac30.js');
const label = require('./label-726fc287.js');
const loadable = require('./loadable-1c888c87.js');
const locale = require('./locale-da840314.js');
const observers = require('./observers-18d87cb5.js');
const t9n = require('./t9n-ed5c03a7.js');
require('./guid-e84a8375.js');
require('./resources-18f799c7.js');
require('./component-5d190962.js');
require('./browser-333a21c5.js');
require('./key-47c9469a.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
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
        label.disconnectLabel(this);
        locale.disconnectLocalized(this);
        t9n.disconnectMessages(this);
        this.mutationObserver?.disconnect();
    }
    componentDidRender() {
        interactive.updateHostInteraction(this);
    }
    render() {
        return (index.h(interactive.InteractiveContainer, { key: '2b20c0c889e02709ab25fed13afe8cc03a0ad5a5', disabled: this.disabled }, index.h("div", { key: '31a6ae689e94a21c34718d848e43e7e848c82c33', class: CSS.wrapper, onClick: this.enableEditingHandler, onKeyDown: this.escapeKeyHandler }, index.h("div", { key: '21d48b4543d362c8253987aa04aa88b91dcbebd2', class: CSS.inputWrapper }, index.h("slot", { key: '1b0e62cefa8959014d776a55e882d89c1038d72e' })), index.h("div", { key: 'c10288b692a896c7d4a924fb3a99d5d1a0b8b655', class: CSS.controlsWrapper }, index.h("calcite-button", { key: '7b8312b37c3e1aa9e07b6cbad9f116c0e3b63438', appearance: "transparent", class: CSS.enableEditingButton, disabled: this.disabled, iconStart: "pencil", kind: "neutral", label: this.messages.enableEditing, onClick: this.enableEditingHandler, ref: (el) => (this.enableEditingButton = el), scale: this.scale, style: {
                opacity: this.editingEnabled ? "0" : "1",
                width: this.editingEnabled ? "0" : "inherit",
            }, type: "button" }), this.shouldShowControls && [
            index.h("div", { key: '96dc366959dff0b01f2b6720d04137d978b480ba', class: CSS.cancelEditingButtonWrapper }, index.h("calcite-button", { key: '74263d601b8f410497061c2a61ad9a7cc0950651', appearance: "transparent", class: CSS.cancelEditingButton, disabled: this.disabled, iconStart: "x", kind: "neutral", label: this.messages.cancelEditing, onClick: this.cancelEditingHandler, ref: (el) => (this.cancelEditingButton = el), scale: this.scale, type: "button" })),
            index.h("calcite-button", { key: 'b6b0853810cb99eb88c908487078cc74e05f48bc', appearance: "solid", class: CSS.confirmChangesButton, disabled: this.disabled, iconStart: "check", kind: "brand", label: this.messages.confirmChanges, loading: this.loading, onClick: this.confirmChangesHandler, ref: (el) => (this.confirmEditingButton = el), scale: this.scale, type: "button" }),
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
