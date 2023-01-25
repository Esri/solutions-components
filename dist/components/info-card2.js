/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { d as defineCustomElement$1 } from './label.js';

const infoCardCss = ":host{display:block;--calcite-label-margin-bottom:0}table{border-collapse:collapse;width:100%}th,td{text-align:left;padding:8px}tr:nth-child(odd){background:var(--calcite-ui-foreground-2)}.bottom-border{padding-bottom:0.5rem;border-bottom:1px solid var(--calcite-ui-border-1)}.padding-top-1-2{padding-top:0.5rem}.font-color-3{color:var(--calcite-ui-text-3)}";

const InfoCard = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.cardTitle = "";
    this.values = {};
  }
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
   * Renders the component.
   */
  render() {
    return (h(Host, null, h("div", null, h("div", { class: "bottom-border" }, h("calcite-label", null, this.cardTitle)), h("div", { class: "padding-top-1-2" }, h("table", null, h("tbody", null, this._getRows()))))));
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------
  /**
   * Render the user defined values as table rows
   *
   * @returns array of row nodes
   * @protected
   */
  _getRows() {
    return Object.keys(this.values).map(k => {
      return (h("tr", null, h("td", null, h("calcite-label", null, h("span", { class: "font-color-3" }, k))), h("td", null, h("calcite-label", null, h("span", null, this.values[k])))));
    });
  }
  get el() { return this; }
  static get style() { return infoCardCss; }
}, [1, "info-card", {
    "cardTitle": [1, "card-title"],
    "values": [16]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["info-card", "calcite-label"];
  components.forEach(tagName => { switch (tagName) {
    case "info-card":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, InfoCard);
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

export { InfoCard as I, defineCustomElement as d };
