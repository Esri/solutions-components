/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { g as getElementProp, b as getSlotted } from './dom.js';
import { c as connectLabel, d as disconnectLabel, g as getLabelText } from './label2.js';
import { c as createObserver } from './observers.js';
import { u as updateHostInteraction } from './interactive.js';
import { d as defineCustomElement$4 } from './button.js';
import { d as defineCustomElement$3 } from './icon.js';
import { d as defineCustomElement$2 } from './loader.js';

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

const InlineEditable = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.calciteInlineEditableEditCancel = createEvent(this, "calciteInlineEditableEditCancel", 6);
    this.calciteInlineEditableEditConfirm = createEvent(this, "calciteInlineEditableEditConfirm", 6);
    this.calciteInternalInlineEditableEnableEditingChange = createEvent(this, "calciteInternalInlineEditableEnableEditingChange", 6);
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
    this.mutationObserver = createObserver("mutation", () => this.mutationObserverCallback());
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
    connectLabel(this);
    (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.observe(this.el, { childList: true });
    this.mutationObserverCallback();
  }
  disconnectedCallback() {
    var _a;
    disconnectLabel(this);
    (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
  }
  componentDidRender() {
    updateHostInteraction(this);
  }
  render() {
    return (h("div", { class: CSS.wrapper, onClick: this.enableEditingHandler, onKeyDown: this.escapeKeyHandler }, h("div", { class: CSS.inputWrapper }, h("slot", null)), h("div", { class: CSS.controlsWrapper }, h("calcite-button", { appearance: "transparent", class: CSS.enableEditingButton, color: "neutral", disabled: this.disabled, iconStart: "pencil", label: this.intlEnableEditing, onClick: this.enableEditingHandler, ref: (el) => (this.enableEditingButton = el), scale: this.scale, style: {
        opacity: this.editingEnabled ? "0" : "1",
        width: this.editingEnabled ? "0" : "inherit"
      }, type: "button" }), this.shouldShowControls && [
      h("div", { class: CSS.cancelEditingButtonWrapper }, h("calcite-button", { appearance: "transparent", class: CSS.cancelEditingButton, color: "neutral", disabled: this.disabled, iconStart: "x", label: this.intlCancelEditing, onClick: this.cancelEditingHandler, ref: (el) => (this.cancelEditingButton = el), scale: this.scale, type: "button" })),
      h("calcite-button", { appearance: "solid", class: CSS.confirmChangesButton, color: "blue", disabled: this.disabled, iconStart: "check", label: this.intlConfirmChanges, loading: this.loading, onClick: this.confirmChangesHandler, ref: (el) => (this.confirmEditingButton = el), scale: this.scale, type: "button" })
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
      this.scale || ((_a = this.inputElement) === null || _a === void 0 ? void 0 : _a.scale) || getElementProp(this.el, "scale", undefined);
  }
  onLabelClick() {
    this.setFocus();
  }
  updateSlottedInput() {
    const inputElement = getSlotted(this.el, {
      matches: "calcite-input"
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
  get el() { return this; }
  static get watchers() { return {
    "disabled": ["disabledWatcher"],
    "editingEnabled": ["editingEnabledWatcher"]
  }; }
  static get style() { return inlineEditableCss; }
}, [1, "calcite-inline-editable", {
    "disabled": [516],
    "editingEnabled": [1540, "editing-enabled"],
    "loading": [1540],
    "controls": [516],
    "intlEnableEditing": [513, "intl-enable-editing"],
    "intlCancelEditing": [513, "intl-cancel-editing"],
    "intlConfirmChanges": [513, "intl-confirm-changes"],
    "scale": [1537],
    "afterConfirm": [16],
    "setFocus": [64]
  }, [[0, "calciteInternalInputBlur", "blurHandler"]]]);
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
