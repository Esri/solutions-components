/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-c6979cbb.js');
const dom = require('./dom-4a580af6.js');
const label = require('./label-24fcd8a5.js');
const observers = require('./observers-5311faf8.js');
const interactive = require('./interactive-0a68ab99.js');
require('./resources-b56bce71.js');
require('./guid-84ac4d91.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */
const CSS = {
  wrapper: "wrapper",
  confirmChangesButton: "confirm-changes-button",
  cancelEditingButton: "cancel-editing-button",
  inputWrapper: "input-wrapper",
  cancelEditingButtonWrapper: "cancel-editing-button-wrapper",
  enableEditingButton: "enable-editing-button",
  controlsWrapper: "controls-wrapper"
};
const TEXT = {
  intlEnablingEditing: "Click to edit",
  intlCancelEditing: "Cancel",
  intlConfirmChanges: "Save"
};

const inlineEditableCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host([disabled]){pointer-events:none;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}:host{display:block}:host([scale=s]) .controls-wrapper{block-size:1.5rem}:host([scale=m]) .controls-wrapper{block-size:2rem}:host([scale=l]) .controls-wrapper{block-size:2.75rem}:host(:not([editing-enabled]):not([disabled])) .wrapper:hover{background-color:var(--calcite-ui-foreground-2)}.wrapper{box-sizing:border-box;display:flex;justify-content:space-between;background-color:var(--calcite-ui-foreground-1);transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s}.wrapper .input-wrapper{flex:1 1 0%}.controls-wrapper{display:flex}:host([disabled]) .cancel-editing-button-wrapper{border-color:var(--calcite-ui-border-2)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}";

const InlineEditable = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.calciteInlineEditableEditCancel = index.createEvent(this, "calciteInlineEditableEditCancel", 6);
    this.calciteInlineEditableEditConfirm = index.createEvent(this, "calciteInlineEditableEditConfirm", 6);
    this.calciteInternalInlineEditableEnableEditingChange = index.createEvent(this, "calciteInternalInlineEditableEnableEditingChange", 6);
    //--------------------------------------------------------------------------
    //
    //  Props
    //
    //--------------------------------------------------------------------------
    /** specify whether editing can be enabled */
    this.disabled = false;
    /** specify whether the wrapped input element is editable, defaults to false */
    this.editingEnabled = false;
    /** specify whether the confirm button should display a loading state, defaults to false */
    this.loading = false;
    /** specify whether save/cancel controls should be displayed when editingEnabled is true, defaults to false */
    this.controls = false;
    /**
     * specify text to be user for the enable editing button's aria-label, defaults to `Click to edit`
     *
     * @default "Click to edit"
     */
    this.intlEnableEditing = TEXT.intlEnablingEditing;
    /**
     * specify text to be user for the cancel editing button's aria-label, defaults to `Cancel`
     *
     * @default "Cancel"
     */
    this.intlCancelEditing = TEXT.intlCancelEditing;
    /**
     * specify text to be user for the confirm changes button's aria-label, defaults to `Save`
     *
     * @default "Save"
     */
    this.intlConfirmChanges = TEXT.intlConfirmChanges;
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
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    var _a;
    label.connectLabel(this);
    (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.observe(this.el, { childList: true });
    this.mutationObserverCallback();
  }
  disconnectedCallback() {
    var _a;
    label.disconnectLabel(this);
    (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
  }
  componentDidRender() {
    interactive.updateHostInteraction(this);
  }
  render() {
    return (index.h("div", { class: CSS.wrapper, onClick: this.enableEditingHandler, onKeyDown: this.escapeKeyHandler }, index.h("div", { class: CSS.inputWrapper }, index.h("slot", null)), index.h("div", { class: CSS.controlsWrapper }, index.h("calcite-button", { appearance: "transparent", class: CSS.enableEditingButton, color: "neutral", disabled: this.disabled, iconStart: "pencil", label: this.intlEnableEditing, onClick: this.enableEditingHandler, ref: (el) => (this.enableEditingButton = el), scale: this.scale, style: {
        opacity: this.editingEnabled ? "0" : "1",
        width: this.editingEnabled ? "0" : "inherit"
      }, type: "button" }), this.shouldShowControls && [
      index.h("div", { class: CSS.cancelEditingButtonWrapper }, index.h("calcite-button", { appearance: "transparent", class: CSS.cancelEditingButton, color: "neutral", disabled: this.disabled, iconStart: "x", label: this.intlCancelEditing, onClick: this.cancelEditingHandler, ref: (el) => (this.cancelEditingButton = el), scale: this.scale, type: "button" })),
      index.h("calcite-button", { appearance: "solid", class: CSS.confirmChangesButton, color: "blue", disabled: this.disabled, iconStart: "check", label: this.intlConfirmChanges, loading: this.loading, onClick: this.confirmChangesHandler, ref: (el) => (this.confirmEditingButton = el), scale: this.scale, type: "button" })
    ])));
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
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  async setFocus() {
    var _a, _b;
    if (this.editingEnabled) {
      (_a = this.inputElement) === null || _a === void 0 ? void 0 : _a.setFocus();
    }
    else {
      (_b = this.enableEditingButton) === null || _b === void 0 ? void 0 : _b.setFocus();
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  mutationObserverCallback() {
    var _a;
    this.updateSlottedInput();
    this.scale =
      this.scale || ((_a = this.inputElement) === null || _a === void 0 ? void 0 : _a.scale) || dom.getElementProp(this.el, "scale", undefined);
  }
  onLabelClick() {
    this.setFocus();
  }
  updateSlottedInput() {
    const inputElement = dom.getSlotted(this.el, {
      matches: "calcite-input"
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
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "disabled": ["disabledWatcher"],
    "editingEnabled": ["editingEnabledWatcher"]
  }; }
};
InlineEditable.style = inlineEditableCss;

exports.calcite_inline_editable = InlineEditable;
