/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { d as defineCustomElement$2 } from './checkbox.js';
import { d as defineCustomElement$1 } from './label.js';

const checkListCss = ":host{display:block}";

const CheckList = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    //--------------------------------------------------------------------------
    //
    //  State (internal)
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Properties (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * A list of all checkbox elements for this component
     *
     * @protected
     */
    this._elements = [];
    this.defaultChecked = true;
    this.values = undefined;
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
    return this._elements.reduce((prev, cur) => {
      prev[cur.value] = cur.checked;
      return prev;
    }, {});
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
   * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
   */
  async componentDidLoad() {
    if (this.defaultChecked) {
      this._elements.forEach(el => {
        el.checked = true;
      });
    }
  }
  /**
   * Renders the component.
   */
  render() {
    return (h(Host, null, h("div", null, this._renderCheckboxes(this.values))));
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------
  /**
   * Render a checkbox with a label for each of the types listed in the NLS
   *
   * @returns Array of label/checkbox input nodes
   * @protected
   */
  _renderCheckboxes(values) {
    return values.map(v => {
      return (h("calcite-label", { layout: "inline" }, h("calcite-checkbox", { ref: (el) => this._elements.push(el), value: v }), v));
    });
  }
  get el() { return this; }
  static get style() { return checkListCss; }
}, [1, "check-list", {
    "defaultChecked": [516, "default-checked"],
    "values": [16],
    "getConfigInfo": [64]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["check-list", "calcite-checkbox", "calcite-label"];
  components.forEach(tagName => { switch (tagName) {
    case "check-list":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, CheckList);
      }
      break;
    case "calcite-checkbox":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "calcite-label":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}
defineCustomElement();

export { CheckList as C, defineCustomElement as d };
