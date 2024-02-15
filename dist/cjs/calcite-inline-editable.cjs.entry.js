/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-105cf2b9.js');
const dom = require('./dom-c9c2c835.js');
const interactive = require('./interactive-3ab7044d.js');
const label = require('./label-32573e1d.js');
const loadable = require('./loadable-5a794992.js');
const locale = require('./locale-d237c9d5.js');
const observers = require('./observers-db4527e4.js');
const t9n = require('./t9n-993a84de.js');
require('./guid-ae73cd27.js');
require('./resources-9447c777.js');
require('./browser-d08a5f99.js');
require('./component-ac7c3bd8.js');
require('./key-c5504030.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
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

const inlineEditableCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block}:host([scale=s]) .controls-wrapper{block-size:1.5rem}:host([scale=m]) .controls-wrapper{block-size:2rem}:host([scale=l]) .controls-wrapper{block-size:2.75rem}:host(:not([editing-enabled]):not([disabled])) .wrapper:hover{background-color:var(--calcite-color-foreground-2)}.wrapper{box-sizing:border-box;display:flex;justify-content:space-between;background-color:var(--calcite-color-foreground-1);transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s}.wrapper .input-wrapper{flex:1 1 0%}.controls-wrapper{display:flex}:host([disabled]) .cancel-editing-button-wrapper{border-color:var(--calcite-color-border-2)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}";

const InlineEditable = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteInlineEditableEditCancel = index.createEvent(this, "calciteInlineEditableEditCancel", 6);
        this.calciteInlineEditableEditConfirm = index.createEvent(this, "calciteInlineEditableEditConfirm", 6);
        this.calciteInternalInlineEditableEnableEditingChange = index.createEvent(this, "calciteInternalInlineEditableEnableEditingChange", 6);
        this.mutationObserver = observers.createObserver("mutation", () => this.mutationObserverCallback());
        this.enableEditing = () => {
            var _a, _b;
            this.valuePriorToEditing = (_a = this.inputElement) === null || _a === void 0 ? void 0 : _a.value;
            this.editingEnabled = true;
            (_b = this.inputElement) === null || _b === void 0 ? void 0 : _b.setFocus();
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
            var _a;
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
                    (_a = this.inputElement) === null || _a === void 0 ? void 0 : _a.setFocus();
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
        var _a;
        interactive.connectInteractive(this);
        label.connectLabel(this);
        locale.connectLocalized(this);
        t9n.connectMessages(this);
        (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.observe(this.el, { childList: true });
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
        var _a;
        interactive.disconnectInteractive(this);
        label.disconnectLabel(this);
        locale.disconnectLocalized(this);
        t9n.disconnectMessages(this);
        (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
    }
    componentDidRender() {
        interactive.updateHostInteraction(this);
    }
    render() {
        return (index.h(interactive.InteractiveContainer, { disabled: this.disabled }, index.h("div", { class: CSS.wrapper, onClick: this.enableEditingHandler, onKeyDown: this.escapeKeyHandler }, index.h("div", { class: CSS.inputWrapper }, index.h("slot", null)), index.h("div", { class: CSS.controlsWrapper }, index.h("calcite-button", { appearance: "transparent", class: CSS.enableEditingButton, disabled: this.disabled, iconStart: "pencil", kind: "neutral", label: this.messages.enableEditing, onClick: this.enableEditingHandler, scale: this.scale, style: {
                opacity: this.editingEnabled ? "0" : "1",
                width: this.editingEnabled ? "0" : "inherit",
            }, type: "button",
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: (el) => (this.enableEditingButton = el) }), this.shouldShowControls && [
            index.h("div", { class: CSS.cancelEditingButtonWrapper }, index.h("calcite-button", { appearance: "transparent", class: CSS.cancelEditingButton, disabled: this.disabled, iconStart: "x", kind: "neutral", label: this.messages.cancelEditing, onClick: this.cancelEditingHandler, scale: this.scale, type: "button",
                // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
                ref: (el) => (this.cancelEditingButton = el) })),
            index.h("calcite-button", { appearance: "solid", class: CSS.confirmChangesButton, disabled: this.disabled, iconStart: "check", kind: "brand", label: this.messages.confirmChanges, loading: this.loading, onClick: this.confirmChangesHandler, scale: this.scale, type: "button",
                // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
                ref: (el) => (this.confirmEditingButton = el) }),
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
        var _a;
        await loadable.componentFocusable(this);
        (_a = this.el) === null || _a === void 0 ? void 0 : _a.focus();
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    mutationObserverCallback() {
        var _a;
        this.updateSlottedInput();
        this.scale = this.scale || ((_a = this.inputElement) === null || _a === void 0 ? void 0 : _a.scale);
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
InlineEditable.style = inlineEditableCss;

exports.calcite_inline_editable = InlineEditable;
