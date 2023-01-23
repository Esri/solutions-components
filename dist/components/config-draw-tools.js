/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { g as getLocaleComponentStrings } from './locale.js';
import { d as defineCustomElement$4 } from './checkbox.js';
import { d as defineCustomElement$3 } from './label.js';
import { d as defineCustomElement$2 } from './check-list2.js';

const configDrawToolsCss = ":host{display:block}.label-spacing{--calcite-label-margin-bottom:0}.padding-block-end-1{-webkit-padding-after:1rem;padding-block-end:1rem}.padding-inline-start-1{-webkit-padding-start:1rem;padding-inline-start:1rem}";

const ConfigDrawTools$1 = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.defaultChecked = true;
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
   * Returns a key/value pair that represents the checkbox value and checked state
   *
   * @returns Promise with the state of the checkboxes
   */
  async getConfigInfo() {
    return this._checkList.getConfigInfo();
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
   *
   * @returns Promise when complete
   */
  async componentWillLoad() {
    await this._getTranslations();
  }
  /**
   * Renders the component.
   */
  render() {
    const nlsTypes = this._translations.types || {};
    const types = Object.keys(nlsTypes).map(k => nlsTypes[k]);
    return (h(Host, null, h("div", null, h("div", { class: "padding-block-end-1" }, h("calcite-label", { class: "label-spacing" }, this._translations.drawTools)), h("div", { class: "padding-inline-start-1" }, h("check-list", { defaultChecked: this.defaultChecked, ref: (el) => { this._checkList = el; }, values: types })))));
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------
  /**
   * Fetches the component's translations
   *
   * @returns Promise when complete
   * @protected
   */
  async _getTranslations() {
    const messages = await getLocaleComponentStrings(this.el);
    this._translations = messages[0];
  }
  get el() { return this; }
  static get style() { return configDrawToolsCss; }
}, [1, "config-draw-tools", {
    "defaultChecked": [516, "default-checked"],
    "_translations": [32],
    "getConfigInfo": [64]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["config-draw-tools", "calcite-checkbox", "calcite-label", "check-list"];
  components.forEach(tagName => { switch (tagName) {
    case "config-draw-tools":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, ConfigDrawTools$1);
      }
      break;
    case "calcite-checkbox":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "calcite-label":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "check-list":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}
defineCustomElement$1();

const ConfigDrawTools = ConfigDrawTools$1;
const defineCustomElement = defineCustomElement$1;

export { ConfigDrawTools, defineCustomElement };
