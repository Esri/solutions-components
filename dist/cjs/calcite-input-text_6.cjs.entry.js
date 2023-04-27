/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-6654298b.js');
const dom = require('./dom-24094fab.js');
const form = require('./form-102203a5.js');
const interactive = require('./interactive-772d59fe.js');
const label = require('./label-5bd96bc0.js');
const loadable = require('./loadable-c64a459b.js');
const locale = require('./locale-e2cae6e8.js');
const observers = require('./observers-b0934d2a.js');
const resources = require('./resources-1f836572.js');
const t9n = require('./t9n-4664a8db.js');
const utils = require('./utils-c20c0c56.js');
const debounce = require('./debounce-69c3bada.js');
const conditionalSlot = require('./conditionalSlot-892b4bc1.js');
const resources$1 = require('./resources-6c9cce1c.js');
const loadModules = require('./loadModules-ae7715f2.js');
const mapViewUtils = require('./mapViewUtils-7e04e61c.js');
const interfaces = require('./interfaces-043b0758.js');
const publicNotificationStore = require('./publicNotificationStore-cd1a32c3.js');
const locale$1 = require('./locale-b113c6b2.js');
const downloadUtils = require('./downloadUtils-fecaaf49.js');
require('./guid-c58d5ead.js');
require('./key-d55baa11.js');
require('./index-e1b1954f.js');
require('./_commonjsHelpers-384729db.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.2.0
 */
const CSS$2 = {
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
  resizeIconWrapper: "resize-icon-wrapper"
};
const SLOTS$1 = {
  action: "action"
};

const inputTextCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing);--calcite-floating-ui-z-index:600}:host([hidden]){display:none}:host([disabled]){pointer-events:none;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}:host{display:block}:host([scale=s]) input,:host([scale=s]) .prefix,:host([scale=s]) .suffix{block-size:1.5rem;padding-inline:0.5rem;font-size:var(--calcite-font-size--2);line-height:1rem}:host([scale=s]) .action-wrapper calcite-button,:host([scale=s]) .action-wrapper calcite-button button{block-size:1.5rem}:host([scale=s]) .clear-button{min-block-size:1.5rem;min-inline-size:1.5rem}:host([scale=m]) input,:host([scale=m]) .prefix,:host([scale=m]) .suffix{block-size:2rem;padding-inline:0.75rem;font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=m]) .action-wrapper calcite-button,:host([scale=m]) .action-wrapper calcite-button button{block-size:2rem}:host([scale=m]) .clear-button{min-block-size:2rem;min-inline-size:2rem}:host([scale=l]) input,:host([scale=l]) .prefix,:host([scale=l]) .suffix{block-size:2.75rem;padding-inline:1rem;font-size:var(--calcite-font-size-0);line-height:1.25rem}:host([scale=l]) .action-wrapper calcite-button,:host([scale=l]) .action-wrapper calcite-button button{block-size:2.75rem}:host([scale=l]) .clear-button{min-block-size:2.75rem;min-inline-size:2.75rem}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}input{transition:var(--calcite-animation-timing), block-size 0, outline-offset 0s;-webkit-appearance:none;position:relative;margin:0px;box-sizing:border-box;display:flex;max-block-size:100%;inline-size:100%;max-inline-size:100%;flex:1 1 0%;border-radius:0px;background-color:var(--calcite-ui-foreground-1);font-family:inherit;font-weight:var(--calcite-font-weight-normal);color:var(--calcite-ui-text-1)}:host input{border-width:1px;border-style:solid;border-color:var(--calcite-ui-border-input);color:var(--calcite-ui-text-1)}:host input::placeholder,:host input:-ms-input-placeholder,:host input::-ms-input-placeholder{font-weight:var(--calcite-font-weight-normal);color:var(--calcite-ui-text-3)}:host input:focus{border-color:var(--calcite-ui-brand);color:var(--calcite-ui-text-1)}:host input[readonly]{background-color:var(--calcite-ui-background);font-weight:var(--calcite-font-weight-medium)}:host input[readonly]:focus{color:var(--calcite-ui-text-1)}:host calcite-icon{color:var(--calcite-ui-text-3)}input{outline-color:transparent}input:focus{outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}:host([status=invalid]) input{border-color:var(--calcite-ui-danger)}:host([status=invalid]) input:focus{outline:2px solid var(--calcite-ui-danger);outline-offset:-2px}:host([scale=s]) .icon{inset-inline-start:0.5rem}:host([scale=m]) .icon{inset-inline-start:0.75rem}:host([scale=l]) .icon{inset-inline-start:1rem}:host([icon][scale=s]) input{-webkit-padding-start:2rem;padding-inline-start:2rem}:host([icon][scale=m]) input{-webkit-padding-start:2.5rem;padding-inline-start:2.5rem}:host([icon][scale=l]) input{-webkit-padding-start:3.5rem;padding-inline-start:3.5rem}.element-wrapper{position:relative;order:3;display:inline-flex;flex:1 1 0%;align-items:center}.icon{pointer-events:none;position:absolute;z-index:1;display:block;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s}input[type=text]::-ms-clear,input[type=text]::-ms-reveal{display:none;block-size:0px;inline-size:0px}.clear-button{pointer-events:initial;order:4;margin:0px;box-sizing:border-box;display:flex;min-block-size:100%;cursor:pointer;align-items:center;justify-content:center;align-self:stretch;border-width:1px;border-style:solid;border-color:var(--calcite-ui-border-input);background-color:var(--calcite-ui-foreground-1);outline-color:transparent;border-inline-start-width:0px}.clear-button:hover{background-color:var(--calcite-ui-foreground-2);transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s}.clear-button:hover calcite-icon{color:var(--calcite-ui-text-1);transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s}.clear-button:active{background-color:var(--calcite-ui-foreground-3)}.clear-button:active calcite-icon{color:var(--calcite-ui-text-1)}.clear-button:focus{outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}.clear-button:disabled{opacity:var(--calcite-ui-opacity-disabled)}.loader{inset-block-start:1px;inset-inline:1px;pointer-events:none;position:absolute;display:block}.action-wrapper{order:7;display:flex}.prefix,.suffix{box-sizing:border-box;display:flex;block-size:auto;min-block-size:100%;-webkit-user-select:none;-moz-user-select:none;user-select:none;align-content:center;align-items:center;overflow-wrap:break-word;border-width:1px;border-style:solid;border-color:var(--calcite-ui-border-input);background-color:var(--calcite-ui-background);font-weight:var(--calcite-font-weight-medium);line-height:1;color:var(--calcite-ui-text-2)}.prefix{order:2;border-inline-end-width:0px}.suffix{order:5;border-inline-start-width:0px}:host([alignment=start]) input{text-align:start}:host([alignment=end]) input{text-align:end}.wrapper{position:relative;display:flex;flex-direction:row;align-items:center}:host(.no-bottom-border) input{border-block-end-width:0px}:host(.border-top-color-one) input{border-block-start-color:var(--calcite-ui-border-1)}.inline-child{background-color:transparent;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s}.inline-child .editing-enabled{background-color:inherit}.inline-child:not(.editing-enabled){display:flex;cursor:pointer;border-color:transparent;-webkit-padding-start:0;padding-inline-start:0}::slotted(input[slot=hidden-form-input]){margin:0 !important;opacity:0 !important;outline:none !important;padding:0 !important;position:absolute !important;inset:0 !important;transform:none !important;-webkit-appearance:none !important;z-index:-1 !important}";

const InputText = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.calciteInternalInputTextFocus = index.createEvent(this, "calciteInternalInputTextFocus", 7);
    this.calciteInternalInputTextBlur = index.createEvent(this, "calciteInternalInputTextBlur", 7);
    this.calciteInputTextInput = index.createEvent(this, "calciteInputTextInput", 7);
    this.calciteInputTextChange = index.createEvent(this, "calciteInputTextChange", 7);
    this.previousValueOrigin = "initial";
    this.mutationObserver = observers.createObserver("mutation", () => this.setDisabledAction());
    this.userChangedValue = false;
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
        this.clearInputTextValue(event);
        event.preventDefault();
      }
      if (event.key === "Enter" && !event.defaultPrevented) {
        if (form.submitForm(this)) {
          event.preventDefault();
        }
      }
    };
    this.clearInputTextValue = (nativeEvent) => {
      this.setValue({
        committing: true,
        nativeEvent,
        origin: "user",
        value: ""
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
        value: this.value
      });
      this.emitChangeIfUserModified();
    };
    this.clickHandler = (event) => {
      const slottedActionEl = dom.getSlotted(this.el, "action");
      if (event.target !== slottedActionEl) {
        this.setFocus();
      }
    };
    this.inputTextFocusHandler = () => {
      this.calciteInternalInputTextFocus.emit({
        element: this.childEl,
        value: this.value
      });
    };
    this.inputTextInputHandler = (nativeEvent) => {
      if (this.disabled || this.readOnly) {
        return;
      }
      this.setValue({
        nativeEvent,
        origin: "user",
        value: nativeEvent.target.value
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
    this.hiddenInputChangeHandler = (event) => {
      if (event.target.name === this.name) {
        this.setValue({
          value: event.target.value,
          origin: "direct"
        });
      }
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
    this.setValue = ({ committing = false, nativeEvent, origin, previousValue, value }) => {
      this.setPreviousValue(previousValue !== null && previousValue !== void 0 ? previousValue : this.value);
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
    this.autofocus = false;
    this.clearable = false;
    this.disabled = false;
    this.form = undefined;
    this.hidden = false;
    this.icon = undefined;
    this.iconFlipRtl = false;
    this.label = undefined;
    this.loading = false;
    this.maxLength = undefined;
    this.minLength = undefined;
    this.name = undefined;
    this.placeholder = undefined;
    this.prefixText = undefined;
    this.readOnly = false;
    this.required = false;
    this.scale = "m";
    this.status = "idle";
    this.autocomplete = undefined;
    this.inputMode = "text";
    this.enterKeyHint = undefined;
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
        value: !newValue ? "" : newValue
      });
    }
    this.userChangedValue = false;
  }
  updateRequestedIcon() {
    this.requestedIcon = dom.setRequestedIcon({}, this.icon, "text");
  }
  get isClearable() {
    return this.clearable && this.value.length > 0;
  }
  effectiveLocaleChange() {
    t9n.updateMessages(this, this.effectiveLocale);
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    var _a;
    locale.connectLocalized(this);
    t9n.connectMessages(this);
    this.scale = dom.getElementProp(this.el, "scale", this.scale);
    this.inlineEditableEl = this.el.closest("calcite-inline-editable");
    if (this.inlineEditableEl) {
      this.editingEnabled = this.inlineEditableEl.editingEnabled || false;
    }
    this.setPreviousEmittedValue(this.value);
    this.setPreviousValue(this.value);
    label.connectLabel(this);
    form.connectForm(this);
    (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.observe(this.el, { childList: true });
    this.setDisabledAction();
    this.el.addEventListener("calciteInternalHiddenInputChange", this.hiddenInputChangeHandler);
  }
  disconnectedCallback() {
    var _a;
    label.disconnectLabel(this);
    form.disconnectForm(this);
    locale.disconnectLocalized(this);
    t9n.disconnectMessages(this);
    (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
    this.el.removeEventListener("calciteInternalHiddenInputChange", this.hiddenInputChangeHandler);
  }
  async componentWillLoad() {
    loadable.setUpLoadableComponent(this);
    this.requestedIcon = dom.setRequestedIcon({}, this.icon, "text");
    await t9n.setUpMessages(this);
  }
  componentDidLoad() {
    loadable.setComponentLoaded(this);
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
    var _a;
    await loadable.componentLoaded(this);
    (_a = this.childEl) === null || _a === void 0 ? void 0 : _a.focus();
  }
  /** Selects the text of the component's `value`. */
  async selectText() {
    var _a;
    (_a = this.childEl) === null || _a === void 0 ? void 0 : _a.select();
  }
  onLabelClick() {
    this.setFocus();
  }
  onFormReset() {
    this.setValue({
      origin: "reset",
      value: this.defaultValue
    });
  }
  syncHiddenFormInput(input) {
    if (this.minLength != null) {
      input.minLength = this.minLength;
    }
    if (this.maxLength != null) {
      input.maxLength = this.maxLength;
    }
  }
  setDisabledAction() {
    const slottedActionEl = dom.getSlotted(this.el, "action");
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
    const dir = dom.getElementDir(this.el);
    const loader = (index.h("div", { class: CSS$2.loader }, index.h("calcite-progress", { label: this.messages.loading, type: "indeterminate" })));
    const inputClearButton = (index.h("button", { "aria-label": this.messages.clear, class: CSS$2.clearButton, disabled: this.disabled || this.readOnly, onClick: this.clearInputTextValue, tabIndex: -1, type: "button" }, index.h("calcite-icon", { icon: "x", scale: this.scale === "l" ? "m" : "s" })));
    const iconEl = (index.h("calcite-icon", { class: CSS$2.inputIcon, flipRtl: this.iconFlipRtl, icon: this.requestedIcon, scale: this.scale === "l" ? "m" : "s" }));
    const prefixText = index.h("div", { class: CSS$2.prefix }, this.prefixText);
    const suffixText = index.h("div", { class: CSS$2.suffix }, this.suffixText);
    const childEl = (index.h("input", { "aria-label": label.getLabelText(this), autocomplete: this.autocomplete, autofocus: this.autofocus ? true : null, class: {
        [CSS$2.editingEnabled]: this.editingEnabled,
        [CSS$2.inlineChild]: !!this.inlineEditableEl
      }, defaultValue: this.defaultValue, disabled: this.disabled ? true : null, enterKeyHint: this.enterKeyHint, inputMode: this.inputMode, maxLength: this.maxLength, minLength: this.minLength, name: this.name, onBlur: this.inputTextBlurHandler, onFocus: this.inputTextFocusHandler, onInput: this.inputTextInputHandler, onKeyDown: this.inputTextKeyDownHandler, pattern: this.pattern, placeholder: this.placeholder || "", readOnly: this.readOnly, required: this.required ? true : null, tabIndex: this.disabled || (this.inlineEditableEl && !this.editingEnabled) ? -1 : null, type: "text", value: this.value,
      // eslint-disable-next-line react/jsx-sort-props
      ref: this.setChildElRef }));
    return (index.h(index.Host, { onClick: this.clickHandler, onKeyDown: this.keyDownHandler }, index.h("div", { class: { [CSS$2.inputWrapper]: true, [resources.CSS_UTILITY.rtl]: dir === "rtl" } }, this.prefixText ? prefixText : null, index.h("div", { class: CSS$2.wrapper }, childEl, this.isClearable ? inputClearButton : null, this.requestedIcon ? iconEl : null, this.loading ? loader : null), index.h("div", { class: CSS$2.actionWrapper }, index.h("slot", { name: SLOTS$1.action })), this.suffixText ? suffixText : null, index.h(form.HiddenFormInputSlot, { component: this }))));
  }
  static get assetsDirs() { return ["assets"]; }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "disabled": ["disabledWatcher"],
    "messageOverrides": ["onMessagesChange"],
    "value": ["valueWatcher"],
    "icon": ["updateRequestedIcon"],
    "effectiveLocale": ["effectiveLocaleChange"]
  }; }
};
InputText.style = inputTextCss;

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.2.0
 */
const CSS$1 = {
  container: "container",
  table: "table",
  scrim: "scrim",
  tableContainer: "table-container",
  sticky: "sticky-pos"
};
const debounceTimeout = 100;

const listCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing);--calcite-floating-ui-z-index:600}:host([hidden]){display:none}:host([disabled]){pointer-events:none;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}:host{display:block}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.container{position:relative}.table-container{position:relative;z-index:1;box-sizing:border-box;display:flex;inline-size:100%;flex-direction:column;background-color:transparent}.table-container *{box-sizing:border-box}.table{inline-size:100%}::slotted(calcite-list-item){-webkit-margin-after:1px;margin-block-end:1px;--tw-shadow:0 1px 0 var(--calcite-ui-border-3);--tw-shadow-colored:0 1px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}::slotted(calcite-list-item:last-child){--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.sticky-pos{position:sticky;inset-block-start:0px;z-index:300}calcite-filter{-webkit-margin-after:1px;margin-block-end:1px}";

const listItemSelector = "calcite-list-item";
const List = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.calciteListFilter = index.createEvent(this, "calciteListFilter", 6);
    this.listItems = [];
    this.enabledListItems = [];
    this.mutationObserver = observers.createObserver("mutation", () => this.updateListItems());
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.handleDefaultSlotChange = (event) => {
      utils.updateListItemChildren(utils.getListItemChildren(event));
    };
    this.setActiveListItem = () => {
      const { enabledListItems } = this;
      if (!enabledListItems.some((item) => item.active)) {
        if (enabledListItems[0]) {
          enabledListItems[0].active = true;
        }
      }
    };
    this.updateSelectedItems = debounce.debounce(() => {
      this.selectedItems = this.enabledListItems.filter((item) => item.selected);
    }, debounceTimeout);
    this.updateFilteredItems = debounce.debounce(() => {
      const { listItems, filteredData, filterText } = this;
      const values = filteredData.map((item) => item.value);
      const groups = new Set();
      const filteredItems = (listItems === null || listItems === void 0 ? void 0 : listItems.filter((item) => {
        const parent = item.parentElement;
        const grouped = parent.matches("calcite-list-item-group");
        if (grouped) {
          groups.add(parent);
        }
        const matches = filterText ? values.includes(item.value) : true;
        item.hidden = !matches;
        return matches;
      })) || [];
      this.filteredItems = filteredItems;
      groups.forEach((group) => {
        const hasAtLeastOneMatch = filteredItems.some((item) => group.contains(item));
        group.hidden = !hasAtLeastOneMatch;
        if (!hasAtLeastOneMatch) {
          return;
        }
        const parentItem = group.closest("calcite-list-item");
        if (parentItem) {
          parentItem.hidden = false;
          if (filteredItems.includes(parentItem)) {
            Array.from(group.querySelectorAll("calcite-list-item")).forEach((child) => (child.hidden = false));
          }
        }
      });
      groups.clear();
    });
    this.handleFilter = (event) => {
      event.stopPropagation();
      const { filteredItems, value } = event.currentTarget;
      this.filteredData = filteredItems;
      this.filterText = value;
      this.updateFilteredItems();
      this.calciteListFilter.emit();
    };
    this.getItemData = () => {
      return this.listItems.map((item) => ({
        label: item.label,
        description: item.description,
        metadata: item.metadata,
        value: item.value
      }));
    };
    this.queryListItems = () => {
      return Array.from(this.el.querySelectorAll(listItemSelector));
    };
    this.focusRow = (focusEl) => {
      const { enabledListItems } = this;
      if (!focusEl) {
        return;
      }
      enabledListItems.forEach((listItem) => (listItem.active = listItem === focusEl));
      focusEl.setFocus();
    };
    this.isNavigable = (listItem) => {
      var _a;
      const parentListItemEl = (_a = listItem.parentElement) === null || _a === void 0 ? void 0 : _a.closest(listItemSelector);
      if (!parentListItemEl) {
        return true;
      }
      return parentListItemEl.open && this.isNavigable(parentListItemEl);
    };
    this.handleListKeydown = (event) => {
      const { key } = event;
      const filteredItems = this.enabledListItems.filter((listItem) => this.isNavigable(listItem));
      const currentIndex = filteredItems.findIndex((listItem) => listItem.active);
      if (key === "ArrowDown") {
        event.preventDefault();
        const nextIndex = currentIndex + 1;
        if (filteredItems[nextIndex]) {
          this.focusRow(filteredItems[nextIndex]);
        }
      }
      else if (key === "ArrowUp") {
        event.preventDefault();
        const prevIndex = currentIndex - 1;
        if (filteredItems[prevIndex]) {
          this.focusRow(filteredItems[prevIndex]);
        }
      }
      else if (key === "Home") {
        event.preventDefault();
        const homeItem = filteredItems[0];
        if (homeItem) {
          this.focusRow(homeItem);
        }
      }
      else if (key === "End") {
        event.preventDefault();
        const endItem = filteredItems[filteredItems.length - 1];
        if (endItem) {
          this.focusRow(endItem);
        }
      }
    };
    this.disabled = false;
    this.filterEnabled = false;
    this.filteredItems = [];
    this.filteredData = [];
    this.filterPlaceholder = undefined;
    this.filterText = undefined;
    this.label = undefined;
    this.loading = false;
    this.openable = false;
    this.selectedItems = [];
    this.selectionMode = "none";
    this.selectionAppearance = "icon";
    this.dataForFilter = [];
  }
  handleFilterEnabledChange() {
    this.updateListItems();
  }
  handleSelectionAppearanceChange() {
    this.updateListItems();
  }
  handleCalciteInternalFocusPreviousItem(event) {
    event.stopPropagation();
    const { enabledListItems } = this;
    const currentIndex = enabledListItems.findIndex((listItem) => listItem.active);
    const prevIndex = currentIndex - 1;
    if (enabledListItems[prevIndex]) {
      this.focusRow(enabledListItems[prevIndex]);
    }
  }
  handleCalciteListItemActive(event) {
    const target = event.target;
    const { listItems } = this;
    listItems.forEach((listItem) => {
      listItem.active = listItem === target;
    });
  }
  handleCalciteListItemSelect(event) {
    const target = event.target;
    const { listItems, selectionMode } = this;
    listItems.forEach((listItem) => {
      if (selectionMode === "single") {
        listItem.selected = listItem === target;
      }
    });
    this.updateSelectedItems();
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    var _a;
    (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.observe(this.el, { childList: true, subtree: true });
    this.updateListItems();
  }
  disconnectedCallback() {
    var _a;
    (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
  }
  componentWillLoad() {
    loadable.setUpLoadableComponent(this);
  }
  componentDidRender() {
    interactive.updateHostInteraction(this);
  }
  componentDidLoad() {
    loadable.setComponentLoaded(this);
    const { filterEl } = this;
    const filteredItems = filterEl === null || filterEl === void 0 ? void 0 : filterEl.filteredItems;
    if (filteredItems) {
      this.filteredData = filteredItems;
    }
    this.updateFilteredItems();
  }
  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------
  /** Sets focus on the component's first focusable element. */
  async setFocus() {
    var _a;
    await loadable.componentLoaded(this);
    (_a = this.enabledListItems.find((listItem) => listItem.active)) === null || _a === void 0 ? void 0 : _a.setFocus();
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    const { loading, label, disabled, dataForFilter, filterEnabled, filterPlaceholder, filterText } = this;
    return (index.h("div", { class: CSS$1.container }, loading ? index.h("calcite-scrim", { class: CSS$1.scrim, loading: loading }) : null, index.h("table", { "aria-busy": dom.toAriaBoolean(loading), "aria-label": label || "", class: CSS$1.table, onKeyDown: this.handleListKeydown, role: "treegrid" }, filterEnabled ? (index.h("thead", null, index.h("tr", { class: { [CSS$1.sticky]: true } }, index.h("th", { colSpan: utils.MAX_COLUMNS }, index.h("calcite-filter", { "aria-label": filterPlaceholder, disabled: loading || disabled, items: dataForFilter, onCalciteFilterChange: this.handleFilter, placeholder: filterPlaceholder, value: filterText,
      // eslint-disable-next-line react/jsx-sort-props
      ref: (el) => (this.filterEl = el) }))))) : null, index.h("tbody", { class: CSS$1.tableContainer }, index.h("slot", { onSlotchange: this.handleDefaultSlotChange })))));
  }
  updateListItems() {
    const { selectionAppearance, selectionMode } = this;
    const items = this.queryListItems();
    items.forEach((item) => {
      item.selectionAppearance = selectionAppearance;
      item.selectionMode = selectionMode;
    });
    this.listItems = items;
    this.enabledListItems = items.filter((item) => !item.disabled);
    if (this.filterEnabled) {
      this.dataForFilter = this.getItemData();
    }
    this.setActiveListItem();
    this.updateSelectedItems();
    this.updateFilteredItems();
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "filterEnabled": ["handleFilterEnabledChange"],
    "selectionMode": ["handleSelectionAppearanceChange"],
    "selectionAppearance": ["handleSelectionAppearanceChange"]
  }; }
};
List.style = listCss;

const listItemCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing);--calcite-floating-ui-z-index:600}:host([hidden]){display:none}:host([disabled]){pointer-events:none;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}:host{display:flex;flex-direction:column;--calcite-list-item-icon-color:var(--calcite-ui-brand);--calcite-list-item-spacing-indent:1rem}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.container{box-sizing:border-box;display:flex;flex:1 1 0%;background-color:var(--calcite-ui-foreground-1);font-family:var(--calcite-sans-family);-webkit-padding-start:calc(var(--calcite-list-item-spacing-indent) * var(--calcite-list-item-spacing-indent-multiplier));padding-inline-start:calc(var(--calcite-list-item-spacing-indent) * var(--calcite-list-item-spacing-indent-multiplier))}.container *{box-sizing:border-box}.container:hover{cursor:pointer;background-color:var(--calcite-ui-foreground-2)}.container--border-selected{-webkit-border-start:4px solid var(--calcite-ui-brand);border-inline-start:4px solid var(--calcite-ui-brand)}.container--border-unselected{-webkit-border-start:4px solid transparent;border-inline-start:4px solid transparent}.nested-container{display:flex;flex-direction:column;background-color:var(--calcite-ui-foreground-1)}.nested-container--hidden{display:none}.content-container{display:flex;flex:1 1 auto;align-items:stretch;padding:0px;font-family:var(--calcite-sans-family);font-weight:var(--calcite-font-weight-normal);color:var(--calcite-ui-text-2)}tr,td{outline-color:transparent}tr:focus,td:focus{z-index:300;outline:2px solid var(--calcite-ui-brand)}.content,.custom-content{display:flex;flex:1 1 auto;flex-direction:column;justify-content:center;padding-inline:0.75rem;padding-block:0.5rem;font-size:var(--calcite-font-size--2);line-height:1.375}.label,.description{font-family:var(--calcite-sans-family);font-size:var(--calcite-font-size--2);font-weight:var(--calcite-font-weight-normal);word-wrap:break-word;word-break:break-word}.label:only-child,.description:only-child{margin:0px;padding-block:0.25rem}.label{color:var(--calcite-ui-text-1)}.description{-webkit-margin-before:0.125rem;margin-block-start:0.125rem;color:var(--calcite-ui-text-3)}.content-start{justify-content:flex-start}.content-end{justify-content:flex-end}.content-start,.content-end{flex:1 1 auto}.content-container--has-center-content .content-start,.content-container--has-center-content .content-end{flex:0 1 auto}.selection-container{display:flex;padding-inline:0.75rem;color:var(--calcite-list-item-icon-color)}.actions-start,.actions-end,.content-start,.content-end,.selection-container,.open-container{display:flex;align-items:center}.open-container,.selection-container{cursor:pointer}.content-start ::slotted(calcite-icon),.content-end ::slotted(calcite-icon){margin-inline:0.75rem;align-self:center}.actions-start ::slotted(calcite-action),.actions-end ::slotted(calcite-action){align-self:stretch;color:inherit}::slotted(calcite-list-item){border-width:0px;border-block-start-width:1px;border-style:solid;border-color:var(--calcite-ui-border-3)}[hidden]{display:none}";

const focusMap = new Map();
const listSelector = "calcite-list";
const ListItem = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.calciteListItemSelect = index.createEvent(this, "calciteListItemSelect", 6);
    this.calciteInternalListItemSelect = index.createEvent(this, "calciteInternalListItemSelect", 6);
    this.calciteInternalListItemActive = index.createEvent(this, "calciteInternalListItemActive", 6);
    this.calciteInternalFocusPreviousItem = index.createEvent(this, "calciteInternalFocusPreviousItem", 6);
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.handleContentSlotChange = (event) => {
      this.hasCustomContent = dom.slotChangeHasAssignedElement(event);
    };
    this.handleActionsStartSlotChange = (event) => {
      this.hasActionsStart = dom.slotChangeHasAssignedElement(event);
    };
    this.handleActionsEndSlotChange = (event) => {
      this.hasActionsEnd = dom.slotChangeHasAssignedElement(event);
    };
    this.handleContentStartSlotChange = (event) => {
      this.hasContentStart = dom.slotChangeHasAssignedElement(event);
    };
    this.handleContentEndSlotChange = (event) => {
      this.hasContentEnd = dom.slotChangeHasAssignedElement(event);
    };
    this.handleDefaultSlotChange = (event) => {
      const { parentListEl } = this;
      const listItemChildren = utils.getListItemChildren(event);
      utils.updateListItemChildren(listItemChildren);
      const openable = !!listItemChildren.length;
      if (openable && parentListEl && !parentListEl.openable) {
        parentListEl.openable = true;
      }
      this.openable = openable;
      if (!openable) {
        this.open = false;
      }
    };
    this.toggleOpen = () => {
      this.open = !this.open;
    };
    this.itemClicked = () => {
      this.toggleSelected();
      this.calciteInternalListItemActive.emit();
    };
    this.toggleSelected = () => {
      if (this.disabled) {
        return;
      }
      if (this.selectionMode !== "none") {
        this.selected = !this.selected;
      }
      this.calciteListItemSelect.emit();
    };
    this.handleItemKeyDown = (event) => {
      const { key } = event;
      const composedPath = event.composedPath();
      const { containerEl, contentEl, actionsStartEl, actionsEndEl, open, openable } = this;
      const cells = [actionsStartEl, contentEl, actionsEndEl].filter(Boolean);
      const currentIndex = cells.findIndex((cell) => composedPath.includes(cell));
      if (key === " ") {
        event.preventDefault();
        this.toggleSelected();
      }
      else if (key === "ArrowRight") {
        event.preventDefault();
        const nextIndex = currentIndex + 1;
        if (currentIndex === -1) {
          if (!open && openable) {
            this.open = true;
            this.focusCell(null);
          }
          else if (cells[0]) {
            this.focusCell(cells[0]);
          }
        }
        else if (cells[currentIndex] && cells[nextIndex]) {
          this.focusCell(cells[nextIndex]);
        }
      }
      else if (key === "ArrowLeft") {
        event.preventDefault();
        const prevIndex = currentIndex - 1;
        if (currentIndex === -1) {
          this.focusCell(null);
          if (open && openable) {
            this.open = false;
          }
          else {
            this.calciteInternalFocusPreviousItem.emit();
          }
        }
        else if (currentIndex === 0) {
          this.focusCell(null);
          containerEl.focus();
        }
        else if (cells[currentIndex] && cells[prevIndex]) {
          this.focusCell(cells[prevIndex]);
        }
      }
    };
    this.focusCellNull = () => {
      this.focusCell(null);
    };
    this.focusCell = (focusEl, saveFocusIndex = true) => {
      const { contentEl, actionsStartEl, actionsEndEl, parentListEl } = this;
      if (saveFocusIndex) {
        focusMap.set(parentListEl, null);
      }
      [actionsStartEl, contentEl, actionsEndEl].filter(Boolean).forEach((tableCell, cellIndex) => {
        const tabIndexAttr = "tabindex";
        if (tableCell === focusEl) {
          tableCell.setAttribute(tabIndexAttr, "0");
          saveFocusIndex && focusMap.set(parentListEl, cellIndex);
        }
        else {
          tableCell.removeAttribute(tabIndexAttr);
        }
      });
      focusEl === null || focusEl === void 0 ? void 0 : focusEl.focus();
    };
    this.active = false;
    this.description = undefined;
    this.disabled = false;
    this.label = undefined;
    this.metadata = undefined;
    this.open = false;
    this.setSize = null;
    this.setPosition = null;
    this.selected = false;
    this.value = undefined;
    this.selectionMode = null;
    this.selectionAppearance = null;
    this.level = null;
    this.visualLevel = null;
    this.parentListEl = undefined;
    this.openable = false;
    this.hasActionsStart = false;
    this.hasActionsEnd = false;
    this.hasCustomContent = false;
    this.hasContentStart = false;
    this.hasContentEnd = false;
  }
  activeHandler(active) {
    if (!active) {
      this.focusCell(null, false);
    }
  }
  handleSelectedChange(value) {
    if (value) {
      this.calciteInternalListItemSelect.emit();
    }
  }
  connectedCallback() {
    const { el } = this;
    this.parentListEl = el.closest(listSelector);
    this.level = utils.getDepth(el) + 1;
    this.visualLevel = utils.getDepth(el, true);
    this.setSelectionDefaults();
  }
  componentWillLoad() {
    loadable.setUpLoadableComponent(this);
  }
  componentDidLoad() {
    loadable.setComponentLoaded(this);
  }
  componentDidRender() {
    interactive.updateHostInteraction(this, "managed");
  }
  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------
  /** Sets focus on the component. */
  async setFocus() {
    await loadable.componentLoaded(this);
    const { containerEl, contentEl, actionsStartEl, actionsEndEl, parentListEl } = this;
    const focusIndex = focusMap.get(parentListEl);
    if (typeof focusIndex === "number") {
      const cells = [actionsStartEl, contentEl, actionsEndEl].filter(Boolean);
      if (cells[focusIndex]) {
        this.focusCell(cells[focusIndex]);
      }
      else {
        containerEl === null || containerEl === void 0 ? void 0 : containerEl.focus();
      }
      return;
    }
    containerEl === null || containerEl === void 0 ? void 0 : containerEl.focus();
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderSelected() {
    const { selected, selectionMode, selectionAppearance } = this;
    if (selectionMode === "none" || selectionAppearance === "border") {
      return null;
    }
    return (index.h("td", { class: utils.CSS.selectionContainer, key: "selection-container", onClick: this.itemClicked }, index.h("calcite-icon", { icon: selected
        ? selectionMode === "multiple"
          ? utils.ICONS.selectedMultiple
          : utils.ICONS.selectedSingle
        : utils.ICONS.unselected, scale: "s" })));
  }
  renderOpen() {
    const { el, open, openable, parentListEl } = this;
    const dir = dom.getElementDir(el);
    return openable ? (index.h("td", { class: utils.CSS.openContainer, key: "open-container", onClick: this.toggleOpen }, index.h("calcite-icon", { icon: open ? utils.ICONS.open : dir === "rtl" ? utils.ICONS.closedRTL : utils.ICONS.closedLTR, scale: "s" }))) : (parentListEl === null || parentListEl === void 0 ? void 0 : parentListEl.openable) ? (index.h("td", { class: utils.CSS.openContainer, key: "open-container", onClick: this.itemClicked }, index.h("calcite-icon", { icon: utils.ICONS.blank, scale: "s" }))) : null;
  }
  renderActionsStart() {
    const { label, hasActionsStart } = this;
    return (index.h("td", { "aria-label": label, class: utils.CSS.actionsStart, hidden: !hasActionsStart, key: "actions-start-container", role: "gridcell",
      // eslint-disable-next-line react/jsx-sort-props
      ref: (el) => (this.actionsStartEl = el) }, index.h("slot", { name: utils.SLOTS.actionsStart, onSlotchange: this.handleActionsStartSlotChange })));
  }
  renderActionsEnd() {
    const { label, hasActionsEnd } = this;
    return (index.h("td", { "aria-label": label, class: utils.CSS.actionsEnd, hidden: !hasActionsEnd, key: "actions-end-container", role: "gridcell",
      // eslint-disable-next-line react/jsx-sort-props
      ref: (el) => (this.actionsEndEl = el) }, index.h("slot", { name: utils.SLOTS.actionsEnd, onSlotchange: this.handleActionsEndSlotChange })));
  }
  renderContentStart() {
    const { hasContentStart } = this;
    return (index.h("div", { class: utils.CSS.contentStart, hidden: !hasContentStart }, index.h("slot", { name: utils.SLOTS.contentStart, onSlotchange: this.handleContentStartSlotChange })));
  }
  renderCustomContent() {
    const { hasCustomContent } = this;
    return (index.h("div", { class: utils.CSS.customContent, hidden: !hasCustomContent }, index.h("slot", { name: utils.SLOTS.content, onSlotchange: this.handleContentSlotChange })));
  }
  renderContentEnd() {
    const { hasContentEnd } = this;
    return (index.h("div", { class: utils.CSS.contentEnd, hidden: !hasContentEnd }, index.h("slot", { name: utils.SLOTS.contentEnd, onSlotchange: this.handleContentEndSlotChange })));
  }
  renderContentProperties() {
    const { label, description, hasCustomContent } = this;
    return !hasCustomContent && (!!label || !!description) ? (index.h("div", { class: utils.CSS.content, key: "content" }, label ? (index.h("div", { class: utils.CSS.label, key: "label" }, label)) : null, description ? (index.h("div", { class: utils.CSS.description, key: "description" }, description)) : null)) : null;
  }
  renderContentContainer() {
    const { description, label, selectionMode, hasCustomContent } = this;
    const hasCenterContent = hasCustomContent || !!label || !!description;
    const content = [
      this.renderContentStart(),
      this.renderCustomContent(),
      this.renderContentProperties(),
      this.renderContentEnd()
    ];
    return (index.h("td", { "aria-label": label, class: {
        [utils.CSS.contentContainer]: true,
        [utils.CSS.contentContainerSelectable]: selectionMode !== "none",
        [utils.CSS.contentContainerHasCenterContent]: hasCenterContent
      }, key: "content-container", onClick: this.itemClicked, role: "gridcell",
      // eslint-disable-next-line react/jsx-sort-props
      ref: (el) => (this.contentEl = el) }, content));
  }
  render() {
    const { openable, open, level, setPosition, setSize, active, label, selected, selectionAppearance, selectionMode } = this;
    const showBorder = selectionMode !== "none" && selectionAppearance === "border";
    const borderSelected = showBorder && selected;
    const borderUnselected = showBorder && !selected;
    return (index.h(index.Host, null, index.h("tr", { "aria-expanded": openable ? dom.toAriaBoolean(open) : null, "aria-label": label, "aria-level": level, "aria-posinset": setPosition, "aria-selected": dom.toAriaBoolean(selected), "aria-setsize": setSize, class: {
        [utils.CSS.container]: true,
        [utils.CSS.containerBorderSelected]: borderSelected,
        [utils.CSS.containerBorderUnselected]: borderUnselected
      }, onFocus: this.focusCellNull, onKeyDown: this.handleItemKeyDown, role: "row", style: { "--calcite-list-item-spacing-indent-multiplier": `${this.visualLevel}` }, tabIndex: active ? 0 : -1,
      // eslint-disable-next-line react/jsx-sort-props
      ref: (el) => (this.containerEl = el) }, this.renderSelected(), this.renderOpen(), this.renderActionsStart(), this.renderContentContainer(), this.renderActionsEnd()), index.h("div", { class: {
        [utils.CSS.nestedContainer]: true,
        [utils.CSS.nestedContainerHidden]: openable && !open
      } }, index.h("slot", { onSlotchange: this.handleDefaultSlotChange }))));
  }
  setSelectionDefaults() {
    const { parentListEl, selectionMode, selectionAppearance } = this;
    if (!parentListEl) {
      return;
    }
    if (!selectionMode) {
      this.selectionMode = parentListEl.selectionMode;
    }
    if (!selectionAppearance) {
      this.selectionAppearance = parentListEl.selectionAppearance;
    }
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "active": ["activeHandler"],
    "selected": ["handleSelectedChange"]
  }; }
};
ListItem.style = listItemCss;

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.2.0
 */
const SLOTS = {
  title: "title",
  message: "message",
  link: "link",
  actionsEnd: "actions-end"
};
const CSS = {
  actionsEnd: "actions-end",
  close: "notice-close",
  container: "container",
  content: "notice-content",
  icon: "notice-icon"
};

const noticeCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing);--calcite-floating-ui-z-index:600}:host([hidden]){display:none}:host([scale=s]){--calcite-notice-spacing-token-small:0.5rem;--calcite-notice-spacing-token-large:0.75rem}:host([scale=s]) .container slot[name=title]::slotted(*),:host([scale=s]) .container *::slotted([slot=title]){margin-block:0.125rem;font-size:var(--calcite-font-size--1);line-height:1.375}:host([scale=s]) .container slot[name=message]::slotted(*),:host([scale=s]) .container *::slotted([slot=message]){margin-block:0.125rem;font-size:var(--calcite-font-size--2);line-height:1.375}:host([scale=s]) ::slotted(calcite-link){margin-block:0.125rem;font-size:var(--calcite-font-size--2);line-height:1.375}:host([scale=s]) .notice-close{padding:0.5rem}:host([scale=m]){--calcite-notice-spacing-token-small:0.75rem;--calcite-notice-spacing-token-large:1rem}:host([scale=m]) .container slot[name=title]::slotted(*),:host([scale=m]) .container *::slotted([slot=title]){margin-block:0.125rem;font-size:var(--calcite-font-size-0);line-height:1.375}:host([scale=m]) .container slot[name=message]::slotted(*),:host([scale=m]) .container *::slotted([slot=message]){margin-block:0.125rem;font-size:var(--calcite-font-size--1);line-height:1.375}:host([scale=m]) ::slotted(calcite-link){margin-block:0.125rem;font-size:var(--calcite-font-size--1);line-height:1.375}:host([scale=l]){--calcite-notice-spacing-token-small:1rem;--calcite-notice-spacing-token-large:1.25rem}:host([scale=l]) .container slot[name=title]::slotted(*),:host([scale=l]) .container *::slotted([slot=title]){margin-block:0.125rem;font-size:var(--calcite-font-size-1);line-height:1.375}:host([scale=l]) .container slot[name=message]::slotted(*),:host([scale=l]) .container *::slotted([slot=message]){margin-block:0.125rem;font-size:var(--calcite-font-size-0);line-height:1.375}:host([scale=l]) ::slotted(calcite-link){margin-block:0.125rem;font-size:var(--calcite-font-size-0);line-height:1.375}:host([width=auto]){--calcite-notice-width:auto}:host([width=half]){--calcite-notice-width:50%}:host([width=full]){--calcite-notice-width:100%}:host{margin-inline:auto;display:none;max-inline-size:100%;align-items:center;inline-size:var(--calcite-notice-width)}.container{pointer-events:none;margin-block:0px;box-sizing:border-box;display:none;inline-size:100%;background-color:var(--calcite-ui-foreground-1);opacity:0;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;max-block-size:0;text-align:start;-webkit-border-start:0px solid;border-inline-start:0px solid;box-shadow:0 0 0 0 transparent}.notice-close{outline-color:transparent}.notice-close:focus{outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}:host{display:flex}:host([open]) .container{pointer-events:auto;display:flex;max-block-size:100%;align-items:center;border-width:2px;opacity:1;--tw-shadow:0 4px 8px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);--tw-shadow-colored:0 4px 8px -1px var(--tw-shadow-color), 0 2px 4px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.container slot[name=title]::slotted(*),.container *::slotted([slot=title]){margin:0px;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-ui-text-1)}.container slot[name=message]::slotted(*),.container *::slotted([slot=message]){margin:0px;display:inline;font-weight:var(--calcite-font-weight-normal);color:var(--calcite-ui-text-2);-webkit-margin-end:var(--calcite-notice-spacing-token-small);margin-inline-end:var(--calcite-notice-spacing-token-small)}.notice-content{box-sizing:border-box;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;padding-inline:var(--calcite-notice-spacing-token-large);flex:0 0 auto;display:flex;min-inline-size:0px;flex-direction:column;overflow-wrap:break-word;flex:1 1 0;padding-block:var(--calcite-notice-spacing-token-small);padding-inline:0 var(--calcite-notice-spacing-token-small)}.notice-content:first-of-type:not(:only-child){-webkit-padding-start:var(--calcite-notice-spacing-token-large);padding-inline-start:var(--calcite-notice-spacing-token-large)}.notice-content:only-of-type{padding-block:var(--calcite-notice-spacing-token-small);padding-inline:var(--calcite-notice-spacing-token-large)}.notice-icon{display:flex;align-items:center;box-sizing:border-box;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;padding-block:var(--calcite-notice-spacing-token-small);padding-inline:var(--calcite-notice-spacing-token-large);flex:0 0 auto}.notice-close{display:flex;cursor:pointer;align-items:center;align-self:stretch;border-style:none;background-color:transparent;color:var(--calcite-ui-text-3);outline:2px solid transparent;outline-offset:2px;box-sizing:border-box;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;padding-block:var(--calcite-notice-spacing-token-small);padding-inline:var(--calcite-notice-spacing-token-large);flex:0 0 auto;-webkit-appearance:none}.notice-close:hover,.notice-close:focus{background-color:var(--calcite-ui-foreground-2);color:var(--calcite-ui-text-1)}.notice-close:active{background-color:var(--calcite-ui-foreground-3)}.actions-end{display:flex;align-self:stretch}:host([kind=brand]) .container{border-color:var(--calcite-ui-brand)}:host([kind=brand]) .container .notice-icon{color:var(--calcite-ui-brand)}:host([kind=info]) .container{border-color:var(--calcite-ui-info)}:host([kind=info]) .container .notice-icon{color:var(--calcite-ui-info)}:host([kind=danger]) .container{border-color:var(--calcite-ui-danger)}:host([kind=danger]) .container .notice-icon{color:var(--calcite-ui-danger)}:host([kind=success]) .container{border-color:var(--calcite-ui-success)}:host([kind=success]) .container .notice-icon{color:var(--calcite-ui-success)}:host([kind=warning]) .container{border-color:var(--calcite-ui-warning)}:host([kind=warning]) .container .notice-icon{color:var(--calcite-ui-warning)}";

const Notice = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.calciteNoticeClose = index.createEvent(this, "calciteNoticeClose", 6);
    this.calciteNoticeOpen = index.createEvent(this, "calciteNoticeOpen", 6);
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    this.close = () => {
      this.open = false;
      this.calciteNoticeClose.emit();
    };
    this.open = false;
    this.kind = "brand";
    this.closable = false;
    this.icon = undefined;
    this.iconFlipRtl = false;
    this.scale = "m";
    this.width = "auto";
    this.messages = undefined;
    this.messageOverrides = undefined;
    this.effectiveLocale = undefined;
    this.defaultMessages = undefined;
  }
  onMessagesChange() {
    /* wired up by t9n util */
  }
  updateRequestedIcon() {
    this.requestedIcon = dom.setRequestedIcon(resources$1.KindIcons, this.icon, this.kind);
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    conditionalSlot.connectConditionalSlotComponent(this);
    locale.connectLocalized(this);
    t9n.connectMessages(this);
  }
  disconnectedCallback() {
    conditionalSlot.disconnectConditionalSlotComponent(this);
    locale.disconnectLocalized(this);
    t9n.disconnectMessages(this);
  }
  async componentWillLoad() {
    loadable.setUpLoadableComponent(this);
    this.requestedIcon = dom.setRequestedIcon(resources$1.KindIcons, this.icon, this.kind);
    await t9n.setUpMessages(this);
  }
  componentDidLoad() {
    loadable.setComponentLoaded(this);
  }
  render() {
    const { el } = this;
    const closeButton = (index.h("button", { "aria-label": this.messages.close, class: CSS.close, onClick: this.close,
      // eslint-disable-next-line react/jsx-sort-props
      ref: (el) => (this.closeButton = el) }, index.h("calcite-icon", { icon: "x", scale: this.scale === "l" ? "m" : "s" })));
    const hasActionEnd = dom.getSlotted(el, SLOTS.actionsEnd);
    return (index.h("div", { class: CSS.container }, this.requestedIcon ? (index.h("div", { class: CSS.icon }, index.h("calcite-icon", { flipRtl: this.iconFlipRtl, icon: this.requestedIcon, scale: this.scale === "l" ? "m" : "s" }))) : null, index.h("div", { class: CSS.content }, index.h("slot", { name: SLOTS.title }), index.h("slot", { name: SLOTS.message }), index.h("slot", { name: SLOTS.link })), hasActionEnd ? (index.h("div", { class: CSS.actionsEnd }, index.h("slot", { name: SLOTS.actionsEnd }))) : null, this.closable ? closeButton : null));
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  /** Sets focus on the component's first focusable element. */
  async setFocus() {
    await loadable.componentLoaded(this);
    const noticeLinkEl = this.el.querySelector("calcite-link");
    if (!this.closeButton && !noticeLinkEl) {
      return;
    }
    if (noticeLinkEl) {
      noticeLinkEl.setFocus();
    }
    else if (this.closeButton) {
      this.closeButton.focus();
    }
  }
  effectiveLocaleChange() {
    t9n.updateMessages(this, this.effectiveLocale);
  }
  static get assetsDirs() { return ["assets"]; }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "messageOverrides": ["onMessagesChange"],
    "icon": ["updateRequestedIcon"],
    "kind": ["updateRequestedIcon"],
    "effectiveLocale": ["effectiveLocaleChange"]
  }; }
};
Notice.style = noticeCss;

const mapSelectToolsCss = ":host{display:block}.div-visible{display:inherit}.div-visible-search{display:flex;height:44px;align-items:center;padding-bottom:0}.div-not-visible{display:none}.padding-bottom-1{padding-bottom:1rem}.padding-top-1{padding-top:1rem}.search-widget{width:100% !important;border:1px solid var(--calcite-ui-border-input)}.w-100{width:100%}.w-50{width:50%}.search-distance-container{padding-top:\"1rem\" !important}.end-border{-webkit-border-end:1px solid var(--calcite-ui-border-2);border-inline-end:1px solid var(--calcite-ui-border-2)}.search-distance{display:flex;padding-top:1rem}.font-bold{font:bold}.border-bottom{border-bottom:1px solid var(--calcite-ui-border-2)}";

const MapSelectTools = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.selectionSetChange = index.createEvent(this, "selectionSetChange", 7);
    /**
     * number[]: the oids of the selected features
     */
    this._selectedIds = [];
    /**
     * string: A label to help uniquely identify the selection set
     */
    this._selectionLabel = "";
    /**
     * esri/Graphic[]: https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html
     */
    this._graphics = [];
    /**
     * {<layer id>: Graphic[]}: Collection of graphics returned from queries to the layer
     */
    this._featuresCollection = {};
    this.bufferColor = [227, 139, 79, 0.8];
    this.bufferOutlineColor = [255, 255, 255];
    this.customLabelEnabled = undefined;
    this.enabledLayerIds = [];
    this.defaultBufferDistance = undefined;
    this.defaultBufferUnit = undefined;
    this.geometries = [];
    this.isUpdate = false;
    this.layerViews = [];
    this.mapView = undefined;
    this.noResultText = undefined;
    this.searchConfiguration = undefined;
    this.selectionSet = undefined;
    this.selectLayerView = undefined;
    this.sketchLineSymbol = undefined;
    this.sketchPointSymbol = undefined;
    this.sketchPolygonSymbol = undefined;
    this._numSelected = 0;
    this._searchDistanceEnabled = false;
    this._searchTerm = undefined;
    this._selectionLoading = false;
    this._translations = undefined;
    this._useLayerFeaturesEnabled = false;
  }
  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------
  /**
   * Called each time the geometries prop is changed.
   *
   * @returns Promise when complete
   */
  async watchGeometriesHandler(newValue, oldValue) {
    if (newValue !== oldValue) {
      const isEmpty = newValue.length === 0;
      await this._clearResults(isEmpty, isEmpty);
      if (newValue.length > 0) {
        return this._highlightWithOIDsOrGeoms();
      }
    }
  }
  /**
   * Called each time the searchConfiguration prop is changed.
   *
   * @returns Promise when complete
   */
  async watchSearchConfigurationHandler(newValue, oldValue) {
    if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
      this._initSearchWidget();
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Methods (public)
  //
  //--------------------------------------------------------------------------
  /**
   * Clear any selection results
   *
   * @returns Promise when the results have been cleared
   */
  async clearSelection() {
    return this._clearResults(true, true);
  }
  /**
   * Get the new selection set
   *
   * @returns Promise with the new selection set
   */
  async getSelection() {
    // Allow any non whitespace
    if (!/\S+/gm.test(this._selectionLabel)) {
      this._updateLabel();
    }
    return {
      id: this.isUpdate ? this.selectionSet.id : Date.now(),
      searchResult: this._searchResult,
      buffer: this._bufferGeometry,
      distance: this._bufferTools.distance,
      download: true,
      unit: this._bufferTools.unit,
      label: this._selectionLabel,
      selectedIds: this._selectedIds,
      layerView: this.selectLayerView,
      geometries: this.geometries,
      graphics: this._graphics,
      selectLayers: this.layerViews,
      skipGeomOIDs: this._skipGeomOIDs,
      searchDistanceEnabled: this._searchDistanceEnabled,
      workflowType: this._workflowType,
      useLayerFeaturesEnabled: this._useLayerFeaturesEnabled
    };
  }
  /**
   * Handle changes to the search configuration
   */
  searchConfigurationChangeChanged(event) {
    this.searchConfiguration = event.detail;
  }
  /**
   * Handle changes to the buffer distance value
   */
  distanceChanged(event) {
    this._distanceChanged(event.detail);
  }
  /**
   * Handle changes to the buffer unit
   */
  unitChanged(event) {
    this._unit = event.detail.newValue;
    this._updateLabel();
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (lifecycle)
  //
  //--------------------------------------------------------------------------
  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   */
  async componentWillLoad() {
    await this._getTranslations();
    await this._initModules();
  }
  /**
   * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
   */
  async componentDidLoad() {
    return this._init();
  }
  /**
   * Renders the component.
   */
  render() {
    return (index.h(index.Host, null, this._getMapLayerPicker(), index.h("div", { class: "border-bottom" }), index.h("div", { class: "padding-top-sides-1" }, index.h("div", { class: "search-widget", ref: (el) => { this._searchElement = el; } }), index.h("div", { class: "padding-top-1" }, index.h("map-draw-tools", { active: true, graphics: this._graphics, mapView: this.mapView, onSketchGraphicsChange: (evt) => this._sketchGraphicsChanged(evt), pointSymbol: this.sketchPointSymbol, polygonSymbol: this.sketchPolygonSymbol, polylineSymbol: this.sketchLineSymbol, ref: (el) => { this._drawTools = el; } })), this._getBufferOptions(), this._getUseLayerFeaturesOptions(), this._getNumSelected()), index.h("div", { class: "border-bottom" }), this._getNameInput()));
  }
  /**
   * Renders the buffer tools component.
   */
  _getBufferOptions() {
    var _a, _b;
    const showBufferToolsClass = this._searchDistanceEnabled ? "search-distance" : "div-not-visible";
    const bufferDistance = typeof ((_a = this.selectionSet) === null || _a === void 0 ? void 0 : _a.distance) === "number" ? this.selectionSet.distance : this.defaultBufferDistance;
    return (index.h("div", null, index.h("div", { class: "padding-top-1 display-flex" }, index.h("calcite-label", { class: "label-margin-0 " }, this._translations.searchDistance), index.h("calcite-switch", { checked: this._searchDistanceEnabled, class: "position-right", onCalciteSwitchChange: () => this._searchDistanceEnabled = !this._searchDistanceEnabled })), index.h("div", { class: showBufferToolsClass }, index.h("buffer-tools", { disabled: !this._searchDistanceEnabled, distance: bufferDistance, geometries: this.geometries, onBufferComplete: (evt) => this._bufferComplete(evt), ref: (el) => this._bufferTools = el, unit: ((_b = this.selectionSet) === null || _b === void 0 ? void 0 : _b.unit) || this.defaultBufferUnit }))));
  }
  /**
   * Renders the map layer picker component.
   */
  _getUseLayerFeaturesOptions() {
    const useLayerFeaturesClass = this._useLayerFeaturesEnabled ? "div-visible" : "div-not-visible";
    return (index.h("div", null, index.h("div", { class: "padding-top-1 display-flex" }, index.h("calcite-label", { class: "label-margin-0 " }, this._translations.useLayerFeatures), index.h("calcite-switch", { checked: this._useLayerFeaturesEnabled, class: "position-right", onCalciteSwitchChange: () => this._useLayerFeaturesEnabled = !this._useLayerFeaturesEnabled })), index.h("div", { class: useLayerFeaturesClass + " padding-top-1" }, index.h("map-layer-picker", { enabledLayerIds: this.enabledLayerIds, mapView: this.mapView, onLayerSelectionChange: (evt) => { void this._layerSelectionChange(evt); }, selectedLayerIds: this.layerViews.map(l => l.layer.id), selectionMode: "single" }))));
  }
  /**
   * Renders the number of selected features
   */
  _getNumSelected() {
    var _a;
    const locale = locale$1.getComponentClosestLanguage(this.el);
    const selectionLoading = locale && locale === "en" ?
      `${this._translations.selectionLoading}...` : this._translations.selectionLoading;
    return (index.h("div", { class: "padding-top-1 padding-bottom-1", style: { "align-items": "end", "display": "flex" } }, this._selectionLoading ? (index.h("div", null, index.h("calcite-loader", { class: "info-blue", inline: true, label: selectionLoading, scale: "m", type: "indeterminate" }))) : (index.h("calcite-icon", { class: "info-blue padding-end-1-2", icon: "feature-layer", scale: "s" })), index.h("calcite-input-message", { class: "info-blue", scale: "m" }, this._selectionLoading ? selectionLoading :
      this.noResultText && this._numSelected === 0 ? this.noResultText :
        this._translations.selectedAddresses.replace("{{n}}", this._numSelected.toString()).replace("{{layer}}", ((_a = this.selectLayerView) === null || _a === void 0 ? void 0 : _a.layer.title) || ""))));
  }
  /**
   * Renders the custom label input
   */
  _getNameInput() {
    const nameLabelClass = this.customLabelEnabled ? "" : "display-none";
    return (index.h("div", { class: "padding-sides-1 padding-top-1 " + nameLabelClass }, index.h("calcite-label", { class: "font-bold" }, this._translations.listName, index.h("calcite-input", { onInput: () => {
        this._selectionLabel = this._labelName.value;
      }, placeholder: this._translations.listNamePlaceholder, ref: (el) => { this._labelName = el; }, value: this._selectionLabel || "" }))));
  }
  /**
 * Create the UI element that will expose the addressee layers
 *
 * @returns addressee layer list node
 * @protected
 */
  _getMapLayerPicker() {
    return (index.h("div", { class: "display-flex padding-sides-1 padding-bottom-1" }, index.h("calcite-label", { class: "font-bold width-full label-margin-0" }, this._translations.inputLayer, index.h("map-layer-picker", { enabledLayerIds: this.enabledLayerIds, mapView: this.mapView, onLayerSelectionChange: (evt) => this._inputLayerSelectionChange(evt), selectedLayerIds: this.selectionSet ? [this.selectionSet.layerView.layer.id] : [], selectionMode: "single" }))));
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------
  /**
   * Load esri javascript api modules
   *
   * @returns Promise resolving when function is done
   *
   * @protected
   */
  async _initModules() {
    const [GraphicsLayer, Graphic, Search, geometryEngine, FeatureLayer] = await loadModules.loadModules([
      "esri/layers/GraphicsLayer",
      "esri/Graphic",
      "esri/widgets/Search",
      "esri/geometry/geometryEngine",
      "esri/layers/FeatureLayer"
    ]);
    this.GraphicsLayer = GraphicsLayer;
    this.Graphic = Graphic;
    this.Search = Search;
    this._geometryEngine = geometryEngine;
    this.FeatureLayer = FeatureLayer;
  }
  /**
   * Initialize the graphics layer, selection set, and search widget
   *
   * @returns Promise when the operation has completed
   */
  async _init() {
    this._initGraphicsLayer();
    await this._initSelectionSet();
    this._initSearchWidget();
  }
  /**
   * Initialize the state of the component with any stored values in a selection set
   *
   * @protected
   */
  async _initSelectionSet() {
    var _a, _b, _c, _d;
    if (this.selectionSet) {
      this._searchTerm = (_a = this.selectionSet.searchResult) === null || _a === void 0 ? void 0 : _a.name;
      this._searchResult = this.selectionSet.searchResult;
      this._selectLayers = this.selectionSet.selectLayers;
      this._selectedIds = this.selectionSet.selectedIds;
      this._skipGeomOIDs = this.selectionSet.skipGeomOIDs;
      this._searchDistanceEnabled = this.selectionSet.searchDistanceEnabled;
      this._useLayerFeaturesEnabled = this.selectionSet.useLayerFeaturesEnabled;
      this._distance = this.selectionSet.searchDistanceEnabled ? this.selectionSet.distance : 0;
      this._unit = this.selectionSet.unit;
      this._workflowType = this.selectionSet.workflowType;
      this.selectLayerView = this.selectionSet.layerView;
      this.geometries = [
        ...((_b = this.selectionSet) === null || _b === void 0 ? void 0 : _b.geometries) || []
      ];
      this._graphics = [
        ...((_c = this.selectionSet) === null || _c === void 0 ? void 0 : _c.graphics) || []
      ];
      this._selectionLabel = (_d = this.selectionSet) === null || _d === void 0 ? void 0 : _d.label;
      await mapViewUtils.goToSelection(this.selectionSet.selectedIds, this.selectionSet.layerView, this.mapView, false);
    }
    else {
      this.mapView.popup.autoOpenEnabled = false;
    }
  }
  /**
   * Initialize the search widget
   *
   * @protected
   */
  _initSearchWidget() {
    if (this.mapView && this._searchElement) {
      const searchConfiguration = this._getSearchConfig(this.searchConfiguration, this.mapView);
      const searchOptions = Object.assign({ view: this.mapView, container: this._searchElement, searchTerm: this._searchTerm }, searchConfiguration);
      this._searchWidget = new this.Search(searchOptions);
      this._searchWidget.popupEnabled = false;
      this._searchWidget.on("search-clear", () => {
        const clearLabel = this._searchClearLabel();
        void this._clearResults(false, clearLabel);
      });
      this._searchWidget.on("select-result", (searchResults) => {
        var _a, _b;
        if (searchResults.result) {
          this._searchResult = searchResults.result;
          const useOIDs = ((_b = (_a = searchResults.source) === null || _a === void 0 ? void 0 : _a.layer) === null || _b === void 0 ? void 0 : _b.id) && searchResults.source.layer.id === this.selectLayerView.layer.id;
          const oids = useOIDs ? [searchResults.result.feature.getObjectId()] : undefined;
          this._workflowType = interfaces.EWorkflowType.SEARCH;
          this._updateLabel();
          this._updateSelection([searchResults.result.feature], useOIDs, oids);
        }
        else {
          const clearLabel = this._searchClearLabel();
          void this._clearResults(false, clearLabel);
        }
      });
    }
  }
  /**
   * Check if the current label should be cleared
   *
   * @returns true when the current label is based on search result
   * @protected
   */
  _searchClearLabel() {
    var _a;
    return ((_a = this._searchResult) === null || _a === void 0 ? void 0 : _a.name) && this._labelName.value.indexOf(this._searchResult.name) > -1;
  }
  /**
   * Initialize the search widget based on user defined configuration
   *
   * @param searchConfiguration search configuration defined by the user
   * @param view the current map view
   *
   * @protected
   */
  _getSearchConfig(searchConfiguration, view) {
    const INCLUDE_DEFAULT_SOURCES = "includeDefaultSources";
    const sources = searchConfiguration === null || searchConfiguration === void 0 ? void 0 : searchConfiguration.sources;
    if ((sources === null || sources === void 0 ? void 0 : sources.length) > 0) {
      searchConfiguration[INCLUDE_DEFAULT_SOURCES] = false;
      sources.forEach((source) => {
        var _a, _b;
        const isLayerSource = source.hasOwnProperty("layer");
        if (isLayerSource) {
          const layerSource = source;
          const layerId = (_a = layerSource.layer) === null || _a === void 0 ? void 0 : _a.id;
          const layerFromMap = layerId ? view.map.findLayerById(layerId) : null;
          const layerUrl = (_b = layerSource === null || layerSource === void 0 ? void 0 : layerSource.layer) === null || _b === void 0 ? void 0 : _b.url;
          if (layerFromMap) {
            layerSource.layer = layerFromMap;
          }
          else if (layerUrl) {
            layerSource.layer = new this.FeatureLayer(layerUrl);
          }
        }
      });
      sources === null || sources === void 0 ? void 0 : sources.forEach((source) => {
        const isLocatorSource = source.hasOwnProperty("locator");
        if (isLocatorSource) {
          const locatorSource = source;
          if ((locatorSource === null || locatorSource === void 0 ? void 0 : locatorSource.name) === "ArcGIS World Geocoding Service") {
            const outFields = locatorSource.outFields || ["Addr_type", "Match_addr", "StAddr", "City"];
            locatorSource.outFields = outFields;
            locatorSource.singleLineFieldName = "SingleLine";
          }
          locatorSource.url = locatorSource.url;
          delete locatorSource.url;
        }
      });
    }
    else {
      searchConfiguration = Object.assign(Object.assign({}, searchConfiguration), { includeDefaultSources: true });
    }
    return searchConfiguration;
  }
  /**
   * Initialize the graphics layer used to store any buffer grapghics
   *
   * @protected
   */
  _initGraphicsLayer() {
    const title = this._translations.bufferLayer;
    const bufferIndex = this.mapView.map.layers.findIndex((l) => l.title === title);
    if (bufferIndex > -1) {
      this._bufferGraphicsLayer = this.mapView.map.layers.getItemAt(bufferIndex);
    }
    else {
      this._bufferGraphicsLayer = new this.GraphicsLayer({ title, listMode: "hide" });
      publicNotificationStore.state.managedLayers.push(title);
      const sketchIndex = this.mapView.map.layers.findIndex((l) => l.title === this._translations.sketchLayer);
      if (sketchIndex > -1) {
        this.mapView.map.layers.add(this._bufferGraphicsLayer, sketchIndex);
      }
      else {
        this.mapView.map.layers.add(this._bufferGraphicsLayer);
      }
    }
  }
  /**
   * Handle changes in the sketch graphics
   *
   */
  async _sketchGraphicsChanged(event, forceUpdate = false) {
    const graphics = event.detail.graphics;
    this._workflowType = this._useLayerFeaturesEnabled ? interfaces.EWorkflowType.SELECT : interfaces.EWorkflowType.SKETCH;
    this._updateLabel();
    this._clearSearchWidget();
    if (this._useLayerFeaturesEnabled && !forceUpdate) {
      // Will only ever be a single graphic
      const geometries = Array.isArray(graphics) ? graphics.map(g => g.geometry) : this.geometries;
      await this._selectLayerFeatures(geometries[0]);
    }
    else {
      const oids = graphics.reduce((prev, cur) => {
        var _a;
        if ((_a = cur === null || cur === void 0 ? void 0 : cur.layer) === null || _a === void 0 ? void 0 : _a.objectIdField) {
          prev.push(cur.attributes[cur.layer.objectIdField]);
        }
        else if (cur.getObjectId) {
          prev.push(cur.getObjectId());
        }
        return prev;
      }, []);
      const useOIDs = event.detail.useOIDs && oids.length > 0;
      this._updateSelection(graphics, useOIDs, oids);
      if (useOIDs) {
        await this._highlightFeatures(oids);
      }
    }
  }
  /**
   * Highlight the features in the map based on OIDs when skipOIDs have been defined
   *
   * @protected
   */
  async _highlightWithOIDsOrGeoms() {
    var _a;
    if (((_a = this._skipGeomOIDs) === null || _a === void 0 ? void 0 : _a.length) > 0) {
      this._selectedIds = this._skipGeomOIDs;
      return this._highlightFeatures(this._selectedIds);
    }
    else {
      return this._geomQuery(this.geometries);
    }
  }
  /**
   * Highlight the features in the map
   *
   * @protected
   */
  async _highlightFeatures(ids) {
    publicNotificationStore.state.removeHandles();
    if (ids.length > 0) {
      publicNotificationStore.state.highlightHandles.push(await mapViewUtils.highlightFeatures(ids, this.selectLayerView, this.mapView));
    }
    this._numSelected = ids.length;
    this.selectionSetChange.emit(ids.length);
  }
  /**
   * Query the selectLayerView based on any user drawn geometries or buffers
   *
   * @param geometries Array of geometries used for the selection of ids from the select layer view
   *
   * @returns Promise when the selection is complete and the graphics have been highlighted
   */
  async _selectFeatures(geometries) {
    this._selectionLoading = true;
    this._selectedIds = await mapViewUtils.queryObjectIds(geometries, this.selectLayerView.layer);
    this._selectionLoading = false;
    // stored as graphics now in addition to the geoms
    this._drawTools.graphics = this._graphics;
    await this._highlightFeatures(this._selectedIds);
  }
  /**
   * Query the selectLayerView based on any user drawn geometries or buffers
   *
   * @param evt CustomEvent that contains the result of the buffer
   *
   * @protected
   */
  async _bufferComplete(evt) {
    this._bufferGeometry = Array.isArray(evt.detail) ?
      evt.detail[0] : evt.detail;
    let oldValue = this._bufferTools.distance;
    let newValue = 0;
    if (this._bufferGeometry) {
      // Create a symbol for rendering the graphic
      const symbol = {
        type: "simple-fill",
        color: this.bufferColor,
        outline: {
          color: this.bufferOutlineColor,
          width: 1
        }
      };
      // Add the geometry and symbol to a new graphic
      const polygonGraphic = new this.Graphic({
        geometry: this._bufferGeometry,
        symbol
      });
      this._bufferGraphicsLayer.removeAll();
      this._bufferGraphicsLayer.add(polygonGraphic);
      await this._selectFeatures([this._bufferGeometry]);
      await this.mapView.goTo(polygonGraphic.geometry.extent);
      // We need to swap the values again if they were previously
      // set based on disable of buffer tools when the tools have a value
      newValue = oldValue;
      oldValue = 0;
    }
    else {
      if (this._bufferGraphicsLayer) {
        this._bufferGraphicsLayer.removeAll();
      }
      await this._highlightWithOIDsOrGeoms();
    }
    // mock this b/c the tools can store a value that is different than what is shown in the map
    // this occurs when a distance is set but then buffer is disabled
    this._distanceChanged({
      oldValue,
      newValue
    });
  }
  /**
   * Fetch a single geometry for each potential geometry type
   *
   * @param geometries All current selection geometries
   *
   * @protected
   */
  _geomQuery(geometries) {
    const queryGeoms = mapViewUtils.getQueryGeoms(geometries, this._geometryEngine);
    return this._selectFeatures(queryGeoms);
  }
  /**
   * Clear all stored values and general state for the component
   *
   * @param clearSearchWidget Optional boolean for clearing the search widget (default is true)
   * @param clearLabel Optional boolean for clearing the search label (default is true)
   *
   * @protected
   */
  async _clearResults(clearSearchWidget = true, clearLabel = true) {
    var _a;
    this._selectedIds = [];
    this._distance = undefined;
    this._unit = undefined;
    if (clearLabel) {
      this._selectionLabel = "";
      this._labelName.value = "";
    }
    if (this._bufferGraphicsLayer) {
      this._bufferGraphicsLayer.removeAll();
    }
    if (clearSearchWidget && this._searchWidget) {
      this._clearSearchWidget();
    }
    publicNotificationStore.state.removeHandles();
    // checking for clear as it would throw off tests
    if ((_a = this._drawTools) === null || _a === void 0 ? void 0 : _a.clear) {
      this._graphics = [];
      await this._drawTools.clear();
    }
    this.selectionSetChange.emit(this._selectedIds.length);
  }
  /**
   * Clear all the search widget and any stored search result
   *
   * @protected
   */
  _clearSearchWidget() {
    this._searchWidget.clear();
    this._searchResult = undefined;
  }
  /**
   * Fetch a single geometry for the current geometry type
   *
   * @param type worflow type
   * @param graphics graphics to be used for selection
   * @param label selection label
   * @param useOIDs indicates if the OIDs should override the geometry for selection
   * @param oids list of IDs to select when useOIDs is true
   *
   * @protected
   */
  _updateSelection(graphics, useOIDs, oids) {
    this._selectedIds = useOIDs && oids ? oids : this._selectedIds;
    // see https://github.com/Esri/solutions-components/issues/148
    this._skipGeomOIDs = useOIDs ? oids : undefined;
    this.geometries = Array.isArray(graphics) ? graphics.map(g => g.geometry) : this.geometries;
    this._graphics = graphics;
  }
  /**
   * Updates the label for the selection set
   *
   * @protected
   */
  _updateLabel() {
    var _a, _b;
    const hasSketch = this._selectionLabel.indexOf(this._translations.sketch) > -1;
    const hasSelect = this._selectionLabel.indexOf(this._translations.select) > -1;
    const hasSearch = this._selectionLabel.indexOf((_a = this._searchResult) === null || _a === void 0 ? void 0 : _a.name) > -1;
    const label = this._workflowType === interfaces.EWorkflowType.SEARCH ? (_b = this._searchResult) === null || _b === void 0 ? void 0 : _b.name :
      this._workflowType === interfaces.EWorkflowType.SELECT ?
        this._translations.select : this._translations.sketch;
    const unit = !this._unit ? this._bufferTools.unit : this._unit;
    const distance = isNaN(this._distance) ? this._bufferTools.distance : this._distance;
    this._selectionLabel = hasSketch || hasSelect || hasSearch || !this._selectionLabel ?
      `${label} ${distance} ${unit}` : this._selectionLabel;
    this._labelName.value = this._selectionLabel;
  }
  /**
   * Gets the layer views from the map when the layer selection changes
   *
   * @returns Promise resolving when function is done
   *
   * @protected
   */
  async _layerSelectionChange(evt) {
    if (Array.isArray(evt.detail) && evt.detail.length > 0) {
      const layerPromises = evt.detail.map(id => {
        return mapViewUtils.getMapLayerView(this.mapView, id);
      });
      return Promise.all(layerPromises).then((layerViews) => {
        this.layerViews = layerViews;
      });
    }
  }
  /**
   * Fetch the layer from the map
   *
   * @param evt layer selection change event
   *
   * @returns Promise when the function has completed
   * @protected
   */
  async _inputLayerSelectionChange(evt) {
    var _a;
    const id = ((_a = evt === null || evt === void 0 ? void 0 : evt.detail) === null || _a === void 0 ? void 0 : _a.length) > 0 ? evt.detail[0] : "";
    if (!this.selectLayerView || id !== this.selectLayerView.layer.id) {
      this.selectLayerView = await mapViewUtils.getMapLayerView(this.mapView, id);
    }
  }
  /**
   * Handle changes to the buffer distance value
   */
  _distanceChanged(detail) {
    this._distance = detail.newValue;
    this._updateLabel();
  }
  /**
   * Select features based on the input geometry
   *
   * @param geom the geometry used for selection
   *
   * @returns Promise resolving when function is done
   *
   * @protected
   */
  async _selectLayerFeatures(geom) {
    this._selectionLoading = true;
    const queryFeaturePromises = this.layerViews.map(layerView => {
      this._featuresCollection[layerView.layer.id] = [];
      return mapViewUtils.queryFeaturesByGeometry(0, layerView.layer, geom, this._featuresCollection);
    });
    return Promise.all(queryFeaturePromises).then(async (response) => {
      this._selectionLoading = false;
      let graphics = [];
      response.forEach(r => {
        Object.keys(r).forEach(k => {
          graphics = graphics.concat(r[k]);
        });
      });
      let hasOID = false;
      graphics.forEach((g) => {
        var _a;
        const geom = g.geometry;
        g.symbol = geom.type === "point" ?
          this.sketchPointSymbol : geom.type === "polyline" ?
          this.sketchLineSymbol : geom.type === "polygon" ?
          this.sketchPolygonSymbol : undefined;
        hasOID = ((_a = g === null || g === void 0 ? void 0 : g.layer) === null || _a === void 0 ? void 0 : _a.hasOwnProperty("objectIdField")) || g.hasOwnProperty("getObjectId");
      });
      // OIDs are used when the addressee layer and the current "use layer features" layer are the same
      const useOIDs = (this.layerViews[0].layer.title === this.selectLayerView.layer.title) && hasOID;
      await this._sketchGraphicsChanged({
        detail: {
          graphics,
          useOIDs
        }
      }, true);
    });
  }
  /**
   * Fetches the component's translations
   *
   * @protected
   */
  async _getTranslations() {
    const translations = await locale$1.getLocaleComponentStrings(this.el);
    this._translations = translations[0];
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "geometries": ["watchGeometriesHandler"],
    "searchConfiguration": ["watchSearchConfigurationHandler"]
  }; }
};
MapSelectTools.style = mapSelectToolsCss;

const labelFormats = [
	{
		descriptionPDF: {
			labelWidthDisplay: "2-5/8",
			labelHeightDisplay: "1",
			labelsPerPageDisplay: "30",
			averyPartNumber: "*60"
		},
		labelSpec: {
			type: "AVERY",
			pageProperties: {
				pageType: "ANSI A",
				leftMargin: 0.1875,
				rightMargin: 0.1875,
				topMargin: 0.5,
				bottomMargin: 0.5
			},
			numLabelsAcross: 3,
			numLabelsDown: 10,
			labelWidth: 2.625,
			labelHeight: 1,
			horizGapIn: 0.125,
			vertGapIn: 0,
			labelPadding: 0.1,
			fontSizePx: 11,
			maxNumLabelLines: 4
		}
	},
	{
		descriptionPDF: {
			labelWidthDisplay: "4",
			labelHeightDisplay: "1",
			labelsPerPageDisplay: "20",
			averyPartNumber: "*61"
		},
		labelSpec: {
			type: "AVERY",
			pageProperties: {
				pageType: "ANSI A",
				leftMargin: 0.15625,
				rightMargin: 0.15625,
				topMargin: 0.47637821,
				bottomMargin: 0.5
			},
			numLabelsAcross: 2,
			numLabelsDown: 10,
			labelWidth: 4,
			labelHeight: 1.0025,
			horizGapIn: 0.1875,
			vertGapIn: 0,
			labelPadding: 0.1,
			fontSizePx: 11,
			maxNumLabelLines: 4
		}
	},
	{
		descriptionPDF: {
			labelWidthDisplay: "4",
			labelHeightDisplay: "1-1/3",
			labelsPerPageDisplay: "14",
			averyPartNumber: "*62"
		},
		labelSpec: {
			type: "AVERY",
			pageProperties: {
				pageType: "ANSI A",
				leftMargin: 0.15625,
				rightMargin: 0.15625,
				topMargin: 0.81889808,
				bottomMargin: 0.83464612
			},
			numLabelsAcross: 2,
			numLabelsDown: 7,
			labelWidth: 4,
			labelHeight: 1.3352,
			horizGapIn: 0.1875,
			vertGapIn: 0,
			labelPadding: 0.1,
			fontSizePx: 11,
			maxNumLabelLines: 6
		}
	},
	{
		descriptionPDF: {
			labelWidthDisplay: "4",
			labelHeightDisplay: "2",
			labelsPerPageDisplay: "10",
			averyPartNumber: "*63"
		},
		labelSpec: {
			type: "AVERY",
			pageProperties: {
				pageType: "ANSI A",
				leftMargin: 0.15625,
				rightMargin: 0.15625,
				topMargin: 0.5,
				bottomMargin: 0.5
			},
			numLabelsAcross: 2,
			numLabelsDown: 5,
			labelWidth: 4,
			labelHeight: 2,
			horizGapIn: 0.1875,
			vertGapIn: 0,
			labelPadding: 0.1,
			fontSizePx: 12,
			maxNumLabelLines: 10
		}
	},
	{
		descriptionPDF: {
			labelWidthDisplay: "4",
			labelHeightDisplay: "3-1/3",
			labelsPerPageDisplay: "6",
			averyPartNumber: "*64"
		},
		labelSpec: {
			type: "AVERY",
			pageProperties: {
				pageType: "ANSI A",
				leftMargin: 0.15625,
				rightMargin: 0.15625,
				topMargin: 0.4724412,
				bottomMargin: 0.50000027
			},
			numLabelsAcross: 2,
			numLabelsDown: 3,
			labelWidth: 4,
			labelHeight: 3.342,
			horizGapIn: 0.1875,
			vertGapIn: 0,
			labelPadding: 0.1,
			fontSizePx: 14,
			maxNumLabelLines: 12
		}
	},
	{
		descriptionPDF: {
			labelWidthDisplay: "1-3/4",
			labelHeightDisplay: "1/2",
			labelsPerPageDisplay: "80",
			averyPartNumber: "*67"
		},
		labelSpec: {
			type: "AVERY",
			pageProperties: {
				pageType: "ANSI A",
				leftMargin: 0.307086375,
				rightMargin: 0.307086375,
				topMargin: 0.4724412,
				bottomMargin: 0.49606326
			},
			numLabelsAcross: 4,
			numLabelsDown: 20,
			labelWidth: 1.75,
			labelHeight: 0.50155,
			horizGapIn: 0.29527575,
			vertGapIn: 0,
			labelPadding: 0.1,
			fontSizePx: 8,
			maxNumLabelLines: 3
		}
	},
	{
		descriptionPDF: {
			labelWidthDisplay: "1-3/4",
			labelHeightDisplay: "2/3",
			labelsPerPageDisplay: "60",
			averyPartNumber: "*95"
		},
		labelSpec: {
			type: "AVERY",
			pageProperties: {
				pageType: "ANSI A",
				leftMargin: 0.28936983,
				rightMargin: 0.28936983,
				topMargin: 0.53937037,
				bottomMargin: 0.5511814
			},
			numLabelsAcross: 4,
			numLabelsDown: 15,
			labelWidth: 1.75,
			labelHeight: 0.6605,
			horizGapIn: 0.30708678,
			vertGapIn: 0,
			labelPadding: 0.1,
			fontSizePx: 8,
			maxNumLabelLines: 4
		}
	}
];

const pdfLabelFormats = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': labelFormats
});

const pdfDownloadCss = ":host{display:block}";

const PdfDownload = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.disabled = false;
    this._translations = undefined;
  }
  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  //
  //  Methods (public)
  //
  //--------------------------------------------------------------------------
  /**
   * Downloads csv of mailing labels for the provided list of ids.
   *
   * @param selectionSetNames Names of the selection sets used to provide ids
   * @param ids List of ids to download
   * @param removeDuplicates When true a single label is generated when multiple featues have a shared address value
   * @param addColumnTitle Indicates if column headings should be included in output
   * @returns Promise resolving when function is done
   */
  async downloadCSV(layerView, selectionSetNames, ids, removeDuplicates, addColumnTitle = true) {
    return downloadUtils.downloadCSV(selectionSetNames, layerView.layer, ids, true, // formatUsingLayerPopup
    removeDuplicates, addColumnTitle);
  }
  /**
   * Downloads pdf of mailing labels for the provided list of ids.
   *
   * @param selectionSetNames Names of the selection sets used to provide ids
   * @param ids List of ids to download
   * @param removeDuplicates When true a single label is generated when multiple featues have a shared address value
   * @param includeMap When true, the first page of the output is a map showing the selection area
   * @param includeTitle When true, a title is included on every page
   * @param title Title for each page when `includeTitle` is true
   * @returns Promise resolving when function is done
   */
  async downloadPDF(layerView, selectionSetNames, ids, removeDuplicates = false, includeMap = false, includeTitle = false, title = "") {
    return downloadUtils.downloadPDF(selectionSetNames, layerView.layer, ids, this._labelInfoElement.selectedOption.value, removeDuplicates, includeMap, includeTitle, title);
  }
  //--------------------------------------------------------------------------
  //
  //  Events (public)
  //
  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  //
  //  Functions (lifecycle)
  //
  //--------------------------------------------------------------------------
  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   */
  async componentWillLoad() {
    await this._getTranslations();
    await this._initModules();
  }
  /**
   * Renders the component.
   */
  render() {
    return (index.h(index.Host, null, index.h("calcite-select", { disabled: this.disabled, label: "", ref: (el) => { this._labelInfoElement = el; } }, this._renderItems())));
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------
  /**
   * Load esri javascript api modules
   *
   * @returns Promise resolving when function is done
   *
   * @protected
   */
  async _initModules() {
    const [intl] = await loadModules.loadModules([
      "esri/intl"
    ]);
    this._intl = intl;
  }
  /**
   * Gets the formatted pdf export size text
   *
   * @param labelInfo current user selected label info
   *
   * @returns the pdf label as a string
   * @protected
   */
  _getLabelSizeText(labelInfo) {
    const lNum = labelInfo.descriptionPDF.labelsPerPageDisplay;
    const lSize = `${labelInfo.descriptionPDF.labelWidthDisplay} x ${labelInfo.descriptionPDF.labelHeightDisplay}`;
    return this._translations.pdfLabel.replace("{{n}}", lNum).replace("{{labelSize}}", lSize);
  }
  /**
   * Fetches the component's translations
   *
   * @protected
   */
  async _getTranslations() {
    const translations = await locale$1.getLocaleComponentStrings(this.el);
    this._translations = translations[0];
  }
  /**
   * Renders the pdf export size options
   *
   * @returns Node array of size options
   *
   * @protected
   */
  _renderItems() {
    const s = pdfLabelFormats;
    const sortedPdfIndo = (s.default || s).sort((a, b) => {
      const _a = parseInt(a.descriptionPDF.labelsPerPageDisplay, 10);
      const _b = parseInt(b.descriptionPDF.labelsPerPageDisplay, 10);
      return _a < _b ? -1 : _a > _b ? 1 : 0;
    });
    return sortedPdfIndo.map((l) => {
      return (index.h("calcite-option", { value: l }, this._getLabelSizeText(l)));
    });
  }
  get el() { return index.getElement(this); }
};
PdfDownload.style = pdfDownloadCss;

exports.calcite_input_text = InputText;
exports.calcite_list = List;
exports.calcite_list_item = ListItem;
exports.calcite_notice = Notice;
exports.map_select_tools = MapSelectTools;
exports.pdf_download = PdfDownload;
