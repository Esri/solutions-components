/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './p-c2f00d41.js';
import { f as focusElement, t as toAriaBoolean } from './p-83166522.js';
import { c as connectLabel, d as disconnectLabel, g as getLabelText } from './p-bd67334c.js';
import { c as connectForm, d as disconnectForm, H as HiddenFormInputSlot } from './p-a33d73bb.js';
import { u as updateHostInteraction } from './p-7daea1df.js';
import { i as isActivationKey } from './p-73e23995.js';
import './p-729708a3.js';
import './p-a80b3880.js';

const switchCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host([disabled]){pointer-events:none;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}:host([scale=s]) .container{block-size:0.75rem}:host([scale=s]) .track{block-size:0.75rem;inline-size:1.5rem}:host([scale=s]) .handle{block-size:0.5rem;inline-size:0.5rem}:host([scale=m]) .container{block-size:1rem}:host([scale=m]) .track{block-size:1rem;inline-size:2rem}:host([scale=m]) .handle{block-size:0.75rem;inline-size:0.75rem}:host([scale=l]) .container{block-size:1.5rem}:host([scale=l]) .track{block-size:1.5rem;inline-size:3rem}:host([scale=l]) .handle{block-size:1.25rem;inline-size:1.25rem}:host{position:relative;display:inline-block;inline-size:auto;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;user-select:none;vertical-align:middle;tap-highlight-color:transparent}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}:host{inline-size:auto;outline-color:transparent}.track{pointer-events:none;position:relative;box-sizing:border-box;display:inline-block;border-radius:9999px;border-width:1px;border-style:solid;border-color:var(--calcite-ui-border-2);background-color:var(--calcite-ui-foreground-2);vertical-align:top;transition-property:all;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}.handle{pointer-events:none;position:absolute;display:block;border-radius:9999px;border-width:2px;border-style:solid;border-color:var(--calcite-ui-border-input);background-color:var(--calcite-ui-foreground-1);transition-property:all;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);inset-block-start:-1px;inset-inline:-1px auto}:host(:hover) .handle,:host(:focus) .handle{border-color:var(--calcite-ui-brand);box-shadow:inset 0 0 0 1px var(--calcite-ui-brand)}:host([checked]) .track{border-color:var(--calcite-ui-brand-hover);background-color:var(--calcite-ui-brand)}:host([checked]) .handle{border-color:var(--calcite-ui-brand);inset-inline:auto -1px}:host([checked]:hover) .track{border-color:var(--calcite-ui-brand-hover);background-color:var(--calcite-ui-brand)}:host([checked]:hover) .handle{border-color:var(--calcite-ui-brand-hover);box-shadow:inset 0 0 0 1px var(--calcite-ui-brand-hover)}@media (forced-colors: active){:host([checked]) .track{background-color:canvasText}}.container:focus{outline:2px solid var(--calcite-ui-brand);outline-offset:2px}::slotted(input[slot=hidden-form-input]){margin:0 !important;opacity:0 !important;outline:none !important;padding:0 !important;position:absolute !important;inset:0 !important;transform:none !important;-webkit-appearance:none !important;z-index:-1 !important}";

const Switch = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteSwitchChange = createEvent(this, "calciteSwitchChange", 6);
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
    this.disabled = false;
    /** Specifies the size of the component. */
    this.scale = "m";
    /**
     * When `true`, the component is checked.
     *
     * @deprecated use `checked` instead.
     */
    this.switched = false;
    /** When `true`, the component is checked. */
    this.checked = false;
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    this.keyDownHandler = (event) => {
      if (!this.disabled && isActivationKey(event.key)) {
        this.toggle();
        event.preventDefault();
      }
    };
    this.clickHandler = () => {
      this.toggle();
    };
    this.setSwitchEl = (el) => {
      this.switchEl = el;
    };
  }
  switchedWatcher(switched) {
    this.checked = switched;
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  /** Sets focus on the component. */
  async setFocus() {
    focusElement(this.switchEl);
  }
  onLabelClick() {
    if (!this.disabled) {
      this.toggle();
      this.setFocus();
    }
  }
  toggle() {
    this.checked = !this.checked;
    this.calciteSwitchChange.emit({
      switched: this.checked
    });
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    const initiallyChecked = this.checked || this.switched;
    if (initiallyChecked) {
      // if either prop is set, we ensure both are synced initially
      this.switched = this.checked = initiallyChecked;
    }
    connectLabel(this);
    connectForm(this);
  }
  disconnectedCallback() {
    disconnectLabel(this);
    disconnectForm(this);
  }
  componentDidRender() {
    updateHostInteraction(this);
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    return (h(Host, { onClick: this.clickHandler, onKeyDown: this.keyDownHandler }, h("div", { "aria-checked": toAriaBoolean(this.checked), "aria-label": getLabelText(this), class: "container", ref: this.setSwitchEl, role: "switch", tabIndex: 0 }, h("div", { class: "track" }, h("div", { class: "handle" })), h(HiddenFormInputSlot, { component: this }))));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "switched": ["switchedWatcher"]
  }; }
};
Switch.style = switchCss;

export { Switch as calcite_switch };
