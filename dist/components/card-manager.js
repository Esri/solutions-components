/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { g as getLocaleComponentStrings } from './locale.js';
import { d as defineCustomElement$7 } from './button.js';
import { d as defineCustomElement$6 } from './icon.js';
import { d as defineCustomElement$5 } from './label.js';
import { d as defineCustomElement$4 } from './loader.js';
import { d as defineCustomElement$3 } from './info-card2.js';
import { d as defineCustomElement$2 } from './media-card2.js';

const cardManagerCss = ":host{display:block}.display-inline-table{display:inline-table}.display-flex{display:flex}.display-none{display:none}.w-100{width:100%}.w-1-2{width:50%}.padding-bottom-1{padding-bottom:1rem}";

const CardManager$1 = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
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
  async componentWillLoad() {
    await this._getTranslations();
    const href = window.location.href;
    const url = href.substring(0, href.lastIndexOf('/'));
    const img = `${url}/data/generic.png`;
    this._fakeValues = [{
        name: "Filename.png",
        description: "This is an example of what a media description looks like.",
        url: img
      }, {
        name: "Filename2.png",
        description: "Another example of what a media description looks like.",
        url: img
      }, {
        name: "Filename3.png",
        description: "And another example of a media description.",
        url: img
      }];
    this._fakeInfos = {
      "Details": "Details info goes here",
      "Name": "Name here",
      "Phone": "(000) 000-0000",
      "Email": "example@gmail.com",
      "Date": "May 11, 2022"
    };
  }
  render() {
    // const mediaCardClass =;
    // const infoCardClass = "";
    return (h(Host, null, h("div", { class: "display-inline-table" }, h("div", { class: "w-100 display-flex padding-bottom-1" }, h("calcite-button", { appearance: 'outline', class: "w-1-2" }, this._translations.information), h("calcite-button", { class: "w-1-2" }, this._translations.media)), h("div", null, h("media-card", { class: "", values: this._fakeValues }), h("info-card", { class: "display-none", values: this._fakeInfos })))));
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
  static get style() { return cardManagerCss; }
}, [1, "card-manager", {
    "_translations": [32]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["card-manager", "calcite-button", "calcite-icon", "calcite-label", "calcite-loader", "info-card", "media-card"];
  components.forEach(tagName => { switch (tagName) {
    case "card-manager":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, CardManager$1);
      }
      break;
    case "calcite-button":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "calcite-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "calcite-label":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "calcite-loader":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "info-card":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "media-card":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}
defineCustomElement$1();

const CardManager = CardManager$1;
const defineCustomElement = defineCustomElement$1;

export { CardManager, defineCustomElement };
