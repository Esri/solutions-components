/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ee607805.js');
const dom = require('./dom-4a580af6.js');
const interactive = require('./interactive-0a68ab99.js');
require('./resources-b56bce71.js');
require('./guid-84ac4d91.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */
const CSS = {
  button: "button"
};
const ICONS = {
  plus: "plus"
};

const fabCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host([disabled]){pointer-events:none;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}:host{display:flex;background-color:transparent}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}calcite-button{--tw-shadow:0 6px 20px -4px rgba(0, 0, 0, 0.1), 0 4px 12px -2px rgba(0, 0, 0, 0.08);--tw-shadow-colored:0 6px 20px -4px var(--tw-shadow-color), 0 4px 12px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}calcite-button:hover{--tw-shadow:0 12px 32px -2px rgba(0, 0, 0, 0.1), 0 4px 20px 0 rgba(0, 0, 0, 0.08);--tw-shadow-colored:0 12px 32px -2px var(--tw-shadow-color), 0 4px 20px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}calcite-button:active{--tw-shadow:0 2px 12px -4px rgba(0, 0, 0, 0.2), 0 2px 4px -2px rgba(0, 0, 0, 0.16);--tw-shadow-colored:0 2px 12px -4px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}";

const Fab = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /**
     * Used to set the button's appearance. Default is outline.
     */
    this.appearance = "outline";
    /**
     * Used to set the button's color. Default is light.
     */
    this.color = "neutral";
    /**
     * When true, disabled prevents interaction. This state shows items with lower opacity/grayed.
     */
    this.disabled = false;
    /**
     * Specifies an icon to display.
     *
     * @default "plus"
     */
    this.icon = ICONS.plus;
    /**
     * When true, content is waiting to be loaded. This state shows a busy indicator.
     */
    this.loading = false;
    /**
     * Specifies the size of the fab.
     */
    this.scale = "m";
    /**
     * Indicates whether the text is displayed.
     */
    this.textEnabled = false;
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  componentDidRender() {
    interactive.updateHostInteraction(this);
  }
  // --------------------------------------------------------------------------
  //
  //  Methods
  //
  // --------------------------------------------------------------------------
  /** Sets focus on the component. */
  async setFocus() {
    dom.focusElement(this.buttonEl);
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    const { appearance, color, disabled, loading, scale, textEnabled, icon, label, text } = this;
    const title = !textEnabled ? label || text || null : null;
    return (index.h("calcite-button", { appearance: appearance === "solid" ? "solid" : "outline", class: CSS.button, color: color, disabled: disabled, iconStart: icon, label: label, loading: loading, ref: (buttonEl) => {
        this.buttonEl = buttonEl;
      }, round: true, scale: scale, title: title, type: "button", width: "auto" }, this.textEnabled ? this.text : null));
  }
  get el() { return index.getElement(this); }
};
Fab.style = fabCss;

exports.calcite_fab = Fab;

//# sourceMappingURL=calcite-fab.cjs.entry.js.map