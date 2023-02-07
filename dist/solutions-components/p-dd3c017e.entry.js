/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './p-c2f00d41.js';
import { g as getElementProp, t as toAriaBoolean } from './p-83166522.js';
import { u as updateHostInteraction } from './p-7daea1df.js';
import { n as numberStringFormatter, c as connectLocalized, d as disconnectLocalized } from './p-9eba5c66.js';
import './p-729708a3.js';
import './p-a80b3880.js';
import './p-73e23995.js';
import './p-9a9955db.js';

const stepperItemCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host([layout=horizontal][disabled]) .stepper-item-header,:host([disabled]){pointer-events:none;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}:host([scale=s]){--calcite-stepper-item-spacing-unit-s:0.25rem;--calcite-stepper-item-spacing-unit-m:0.75rem;--calcite-stepper-item-spacing-unit-l:1rem;font-size:var(--calcite-font-size--1);line-height:1rem;-webkit-margin-end:0.25rem;margin-inline-end:0.25rem}:host([scale=s]) .stepper-item-description{font-size:var(--calcite-font-size--2);line-height:1rem}:host([scale=m]){--calcite-stepper-item-spacing-unit-s:0.5rem;--calcite-stepper-item-spacing-unit-m:1rem;--calcite-stepper-item-spacing-unit-l:1.25rem;font-size:var(--calcite-font-size-0);line-height:1.25rem;-webkit-margin-end:0.5rem;margin-inline-end:0.5rem}:host([scale=m]) .stepper-item-description{font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=l]){--calcite-stepper-item-spacing-unit-s:0.75rem;--calcite-stepper-item-spacing-unit-m:1.25rem;--calcite-stepper-item-spacing-unit-l:1.5rem;font-size:var(--calcite-font-size-1);line-height:1.5rem;-webkit-margin-end:0.75rem;margin-inline-end:0.75rem}:host([scale=l]) .stepper-item-description{font-size:var(--calcite-font-size-0);line-height:1.25rem}:host{position:relative;display:flex;flex-grow:1;flex-direction:column;align-self:flex-start;-webkit-margin-after:var(--calcite-stepper-item-spacing-unit-s);margin-block-end:var(--calcite-stepper-item-spacing-unit-s)}:host .container{position:relative;display:flex;flex-grow:1;cursor:pointer;flex-direction:column;border-width:0px;border-block-start-width:2px;border-style:solid;border-color:var(--calcite-ui-border-3);color:var(--calcite-ui-text-3);-webkit-text-decoration-line:none;text-decoration-line:none;outline:2px solid transparent;outline-offset:2px;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}:host{outline-color:transparent}:host(:focus){outline:2px solid var(--calcite-ui-brand);outline-offset:2px}:host .stepper-item-header{display:flex;cursor:pointer;align-items:flex-start}:host .stepper-item-content,:host .stepper-item-header{transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);padding-block:var(--calcite-stepper-item-spacing-unit-l);-webkit-padding-end:var(--calcite-stepper-item-spacing-unit-m);padding-inline-end:var(--calcite-stepper-item-spacing-unit-m);text-align:start}:host .stepper-item-header *{display:inline-flex;align-items:center;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}:host .stepper-item-content{display:none;inline-size:100%;flex-direction:column;font-size:var(--calcite-font-size--2);line-height:1.375}:host .stepper-item-icon{-webkit-margin-end:var(--calcite-stepper-item-spacing-unit-m);margin-inline-end:var(--calcite-stepper-item-spacing-unit-m);-webkit-margin-before:1px;margin-block-start:1px;display:inline-flex;block-size:0.75rem;flex-shrink:0;align-self:flex-start;color:var(--calcite-ui-text-3);opacity:var(--calcite-ui-opacity-disabled);transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}:host .stepper-item-header-text{flex-direction:column;text-align:initial;-webkit-margin-end:auto;margin-inline-end:auto}:host .stepper-item-heading,:host .stepper-item-description{display:flex;inline-size:100%}:host .stepper-item-heading{-webkit-margin-after:0.25rem;margin-block-end:0.25rem;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-ui-text-2)}:host .stepper-item-description{color:var(--calcite-ui-text-3)}:host .stepper-item-number{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-ui-text-3);transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);-webkit-margin-end:var(--calcite-stepper-item-spacing-unit-m);margin-inline-end:var(--calcite-stepper-item-spacing-unit-m)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}:host([complete]) .container{border-color:rgba(0, 122, 194, 0.5)}:host([complete]) .container .stepper-item-icon{color:var(--calcite-ui-brand)}:host([error]) .container{border-block-start-color:var(--calcite-ui-danger)}:host([error]) .container .stepper-item-number{color:var(--calcite-ui-danger)}:host([error]) .container .stepper-item-icon{opacity:1;color:var(--calcite-ui-danger)}:host(:hover:not([disabled]):not([selected])) .container,:host(:focus:not([disabled]):not([selected])) .container{border-block-start-color:var(--calcite-ui-brand)}:host(:hover:not([disabled]):not([selected])) .container .stepper-item-heading,:host(:focus:not([disabled]):not([selected])) .container .stepper-item-heading{color:var(--calcite-ui-text-1)}:host(:hover:not([disabled]):not([selected])) .container .stepper-item-description,:host(:focus:not([disabled]):not([selected])) .container .stepper-item-description{color:var(--calcite-ui-text-2)}:host([error]:hover:not([disabled]):not([selected])) .container,:host([error]:focus:not([disabled]):not([selected])) .container{border-block-start-color:var(--calcite-ui-danger-hover)}:host([selected]) .container{border-block-start-color:var(--calcite-ui-brand)}:host([selected]) .container .stepper-item-heading{color:var(--calcite-ui-text-1)}:host([selected]) .container .stepper-item-description{color:var(--calcite-ui-text-2)}:host([selected]) .container .stepper-item-number{color:var(--calcite-ui-brand)}:host([selected]) .container .stepper-item-icon{color:var(--calcite-ui-brand);opacity:1}:host([selected]) .container .stepper-item-content{display:flex}:host([layout=vertical]) .container{margin-inline:0px;-webkit-margin-before:0px;margin-block-start:0px;flex:1 1 auto;border-block-start-width:0px;border-style:solid;border-color:var(--calcite-ui-border-3);padding-block:0px;border-inline-start-width:2px;-webkit-padding-start:var(--calcite-stepper-item-spacing-unit-l);padding-inline-start:var(--calcite-stepper-item-spacing-unit-l)}:host([layout=vertical]) .container .stepper-item-icon{order:3;margin-block:1px 0px;-webkit-padding-start:var(--calcite-stepper-item-spacing-unit-s);padding-inline-start:var(--calcite-stepper-item-spacing-unit-s);-webkit-margin-start:auto;margin-inline-start:auto}:host([layout=vertical]) .container .stepper-item-header{-webkit-padding-end:0px;padding-inline-end:0px}:host([layout=vertical]) .container .stepper-item-content{padding:0px}:host([layout=vertical][complete]) .container{border-color:rgba(0, 122, 194, 0.5)}:host([layout=vertical][complete]:hover:not([disabled]):not([selected])) .container,:host([layout=vertical][complete]:focus:not([disabled]):not([selected])) .container{border-color:var(--calcite-ui-brand)}:host([layout=vertical][error]) .container{border-color:var(--calcite-ui-danger)}:host([layout=vertical][selected]) .container{border-color:var(--calcite-ui-brand)}:host([layout=vertical][selected]) .container .stepper-item-content ::slotted(:last-child){-webkit-margin-after:var(--calcite-stepper-item-spacing-unit-l);margin-block-end:var(--calcite-stepper-item-spacing-unit-l)}:host([layout=vertical]:hover:not([disabled]):not([selected])) .container,:host([layout=vertical]:focus:not([disabled]):not([selected])) .container{border-color:rgba(0, 122, 194, 0.5)}:host([layout=vertical][error]:hover:not([disabled]):not([selected])) .container,:host([layout=vertical][error]:focus:not([disabled]):not([selected])) .container{border-color:var(--calcite-ui-danger-hover)}:host([layout=horizontal]){display:contents}:host([layout=horizontal]) .container{display:contents}:host([layout=horizontal]) .stepper-item-header{border-width:0px;border-block-start-width:2px;border-style:solid;border-color:var(--calcite-ui-border-3);outline-color:transparent;grid-row:items;-webkit-margin-end:0.5rem;margin-inline-end:0.5rem;-webkit-margin-after:var(--calcite-stepper-item-spacing-unit-s);margin-block-end:var(--calcite-stepper-item-spacing-unit-s)}:host([layout=horizontal]) .stepper-item-header:focus{outline:2px solid var(--calcite-ui-brand);outline-offset:2px}:host([layout=horizontal]) .stepper-item-content{cursor:auto;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);padding-block:0;-webkit-padding-end:var(--calcite-stepper-item-spacing-unit-m);padding-inline-end:var(--calcite-stepper-item-spacing-unit-m);text-align:start}:host([layout=horizontal][selected]) .stepper-item-content{grid-area:2/1/2/-1}:host([layout=horizontal][scale=s]) .stepper-item-header{-webkit-margin-end:0.25rem;margin-inline-end:0.25rem;-webkit-margin-after:var(--calcite-stepper-item-spacing-unit-s);margin-block-end:var(--calcite-stepper-item-spacing-unit-s)}:host([layout=horizontal][scale=l]) .stepper-item-header{-webkit-margin-end:0.75rem;margin-inline-end:0.75rem;-webkit-margin-after:var(--calcite-stepper-item-spacing-unit-s);margin-block-end:var(--calcite-stepper-item-spacing-unit-s)}:host([layout=horizontal][complete]) .stepper-item-header{border-color:rgba(0, 122, 194, 0.5)}:host([layout=horizontal][complete]:hover:not([disabled]):not([selected])) .stepper-item-header,:host([layout=horizontal][complete]:focus:not([disabled]):not([selected])) .stepper-item-header{border-color:var(--calcite-ui-brand)}:host([layout=horizontal][error]) .stepper-item-header{border-color:var(--calcite-ui-danger)}:host([layout=horizontal][selected]) .stepper-item-header{border-color:var(--calcite-ui-brand)}:host([layout=horizontal]:hover:not([disabled]):not([selected])) .stepper-item-header,:host([layout=horizontal]:focus:not([disabled]):not([selected])) .stepper-item-header{border-color:rgba(0, 122, 194, 0.5)}:host([layout=horizontal][error]:hover:not([disabled]):not([selected])) .stepper-item-header,:host([layout=horizontal][error]:focus:not([disabled]):not([selected])) .stepper-item-header{border-color:var(--calcite-ui-danger-hover)}@media (forced-colors: active){:host .container{outline-width:0;outline-offset:0}:host(:focus),:host(:focus-visible){outline-color:canvasText}:host([selected]) .container{border-block-start-color:highlight}:host([selected]) .container .stepper-item-number{color:highlight}:host([selected]) .container .stepper-item-icon{color:highlight}:host([layout=vertical][selected]) .container{border-color:highlight}}";

const StepperItem = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteInternalStepperItemKeyEvent = createEvent(this, "calciteInternalStepperItemKeyEvent", 6);
    this.calciteInternalStepperItemSelect = createEvent(this, "calciteInternalStepperItemSelect", 6);
    this.calciteInternalUserRequestedStepperItemSelect = createEvent(this, "calciteInternalUserRequestedStepperItemSelect", 6);
    this.calciteInternalStepperItemRegister = createEvent(this, "calciteInternalStepperItemRegister", 6);
    //--------------------------------------------------------------------------
    //
    //  Public Properties
    //
    //--------------------------------------------------------------------------
    /**
     *  When `true`, the component is selected.
     *
     * @deprecated Use `selected` instead.
     */
    this.active = false;
    /**
     * When `true`, the component is selected.
     */
    this.selected = false;
    /** When `true`, the step has been completed. */
    this.complete = false;
    /** When `true`, the component contains an error that requires resolution from the user. */
    this.error = false;
    /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
    this.disabled = false;
    // internal props inherited from wrapping calcite-stepper
    /** Defines the layout of the component. */
    /** @internal */
    this.layout = "horizontal";
    /** When `true`, displays a status icon in the component's heading. */
    /** @internal */
    this.icon = false;
    /** When `true`, displays the step number in the component's heading. */
    /** @internal */
    this.numbered = false;
    /** Specifies the size of the component. */
    /** @internal */
    this.scale = "m";
    //--------------------------------------------------------------------------
    //
    //  Internal State/Props
    //
    //--------------------------------------------------------------------------
    this.effectiveLocale = "";
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    this.keyDownHandler = (event) => {
      if (!this.disabled && event.target === this.el) {
        switch (event.key) {
          case " ":
          case "Enter":
            this.emitUserRequestedItem();
            event.preventDefault();
            break;
          case "ArrowUp":
          case "ArrowDown":
          case "ArrowLeft":
          case "ArrowRight":
          case "Home":
          case "End":
            this.calciteInternalStepperItemKeyEvent.emit({ item: event });
            event.preventDefault();
            break;
        }
      }
    };
    this.handleItemClick = (event) => {
      if (this.layout === "horizontal" &&
        event
          .composedPath()
          .some((el) => { var _a; return (_a = el.classList) === null || _a === void 0 ? void 0 : _a.contains("stepper-item-content"); })) {
        return;
      }
      this.emitUserRequestedItem();
    };
    this.emitUserRequestedItem = () => {
      this.emitRequestedItem();
      if (!this.disabled) {
        const position = this.itemPosition;
        this.calciteInternalUserRequestedStepperItemSelect.emit({
          position
        });
      }
    };
    this.emitRequestedItem = () => {
      if (!this.disabled) {
        const position = this.itemPosition;
        this.calciteInternalStepperItemSelect.emit({
          position
        });
      }
    };
  }
  activeHandler(value) {
    this.selected = value;
  }
  selectedHandler(value) {
    this.active = value;
    if (this.selected) {
      this.emitRequestedItem();
    }
  }
  // watch for removal of disabled to register step
  disabledWatcher() {
    this.registerStepperItem();
  }
  effectiveLocaleWatcher(locale) {
    var _a;
    numberStringFormatter.numberFormatOptions = {
      locale,
      numberingSystem: (_a = this.parentStepperEl) === null || _a === void 0 ? void 0 : _a.numberingSystem,
      useGrouping: false
    };
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    connectLocalized(this);
    const { selected, active } = this;
    if (selected) {
      this.active = selected;
    }
    else if (active) {
      this.selected = active;
    }
  }
  componentWillLoad() {
    var _a;
    this.icon = getElementProp(this.el, "icon", false);
    this.numbered = getElementProp(this.el, "numbered", false);
    this.layout = getElementProp(this.el, "layout", false);
    this.scale = getElementProp(this.el, "scale", "m");
    this.parentStepperEl = this.el.parentElement;
    this.itemPosition = this.getItemPosition();
    this.registerStepperItem();
    if (this.selected) {
      this.emitRequestedItem();
    }
    numberStringFormatter.numberFormatOptions = {
      locale: this.effectiveLocale,
      numberingSystem: (_a = this.parentStepperEl) === null || _a === void 0 ? void 0 : _a.numberingSystem,
      useGrouping: false
    };
  }
  componentDidRender() {
    updateHostInteraction(this, true);
  }
  disconnectedCallback() {
    disconnectLocalized(this);
  }
  render() {
    return (h(Host, { "aria-expanded": toAriaBoolean(this.active), onClick: this.handleItemClick, onKeyDown: this.keyDownHandler }, h("div", { class: "container" }, h("div", { class: "stepper-item-header", ref: (el) => (this.headerEl = el), tabIndex: 
      /* additional tab index logic needed because of display: contents */
      this.layout === "horizontal" && !this.disabled ? 0 : null }, this.icon ? this.renderIcon() : null, this.numbered ? (h("div", { class: "stepper-item-number" }, numberStringFormatter.numberFormatter.format(this.itemPosition + 1), ".")) : null, h("div", { class: "stepper-item-header-text" }, h("span", { class: "stepper-item-heading" }, this.heading || this.itemTitle), h("span", { class: "stepper-item-description" }, this.description || this.itemSubtitle))), h("div", { class: "stepper-item-content" }, h("slot", null)))));
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  updateActiveItemOnChange(event) {
    if (event.target === this.parentStepperEl ||
      event.composedPath().includes(this.parentStepperEl)) {
      this.selectedPosition = event.detail.position;
      this.determineSelectedItem();
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  async setFocus() {
    var _a;
    (_a = (this.layout === "vertical" ? this.el : this.headerEl)) === null || _a === void 0 ? void 0 : _a.focus();
  }
  renderIcon() {
    const path = this.selected
      ? "circleF"
      : this.error
        ? "exclamationMarkCircleF"
        : this.complete
          ? "checkCircleF"
          : "circle";
    return h("calcite-icon", { class: "stepper-item-icon", icon: path, scale: "s" });
  }
  determineSelectedItem() {
    this.selected = !this.disabled && this.itemPosition === this.selectedPosition;
  }
  registerStepperItem() {
    this.calciteInternalStepperItemRegister.emit({
      position: this.itemPosition
    });
  }
  getItemPosition() {
    var _a;
    return Array.from((_a = this.parentStepperEl) === null || _a === void 0 ? void 0 : _a.querySelectorAll("calcite-stepper-item")).indexOf(this.el);
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "active": ["activeHandler"],
    "selected": ["selectedHandler"],
    "disabled": ["disabledWatcher"],
    "effectiveLocale": ["effectiveLocaleWatcher"]
  }; }
};
StepperItem.style = stepperItemCss;

export { StepperItem as calcite_stepper_item };
