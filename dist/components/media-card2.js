/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { g as getLocaleComponentStrings } from './locale.js';
import { d as defineCustomElement$4 } from './button.js';
import { d as defineCustomElement$3 } from './icon.js';
import { d as defineCustomElement$2 } from './label.js';
import { d as defineCustomElement$1 } from './loader.js';

const mediaCardCss = ":host{display:block;--calcite-label-margin-bottom:0}.padding-bottom-1{padding-bottom:1rem}.padding-start-1{-webkit-padding-start:1rem;padding-inline-start:1rem}.display-flex{display:flex}.font-italic{font-style:italic}.button-width{min-width:120px}.button-container{display:flex;justify-content:space-between}.count-container{display:flex;align-items:center}.img-container{-o-object-fit:scale-down;object-fit:scale-down;width:100%;height:100%}";

const MediaCard = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.values = [];
    this._index = -1;
    this._translations = undefined;
  }
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
  /**
   * Called each time the values prop is changed.
   * Reset the _index value accordingly.
   */
  geometriesWatchHandler(values, oldValues) {
    if (values && JSON.stringify(values) !== JSON.stringify(oldValues || [])) {
      if ((values === null || values === void 0 ? void 0 : values.length) > 0) {
        this._initIndex();
      }
      else {
        this._index = -1;
      }
    }
  }
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
   * StencilJS: Called once just after the component is first connected to the DOM.
   *
   * @returns Promise when complete
   */
  async componentWillLoad() {
    await this._getTranslations();
  }
  /**
   * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
   * Using this as the Watch on values does not fire on initial load.
   *
   * @returns Promise when complete
   */
  async componentDidLoad() {
    var _a;
    if (this._index === -1 && ((_a = this.values) === null || _a === void 0 ? void 0 : _a.length) > 0) {
      this._initIndex();
    }
  }
  /**
   * Renders the component.
   */
  render() {
    var _a;
    const v = ((_a = this.values) === null || _a === void 0 ? void 0 : _a.length) > 0 ? this.values[this._index] : undefined;
    const total = (this.values || []).length;
    const imgNum = this._index + 1;
    return (h(Host, null, h("div", null, h("div", { class: "display-flex" }, h("img", { class: "img-container", src: v === null || v === void 0 ? void 0 : v.url })), h("calcite-label", { scale: 's' }, h("span", { class: "font-italic padding-bottom-1" }, v === null || v === void 0 ? void 0 : v.name)), h("calcite-label", null, h("span", { class: "padding-bottom-1" }, v === null || v === void 0 ? void 0 : v.description))), h("div", { class: "button-container" }, h("div", { class: "count-container" }, h("calcite-label", null, h("span", null, `${imgNum} of ${total}`))), h("div", { class: "display-flex" }, h("calcite-button", { appearance: "outline", class: "padding-start-1 button-width", color: "neutral", disabled: imgNum === 1 || (this.values || []).length === 0, onClick: () => this._decrementIndex() }, this._translations.previous), h("calcite-button", { class: "padding-start-1 button-width", disabled: (this.values || []).length === imgNum, onClick: () => this._incrementIndex() }, this._translations.next)))));
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------
  /**
   * Resets the index to 0
   *
   * @protected
   */
  _initIndex() {
    this._index = 0;
  }
  /**
   * Adds 1 to the current index
   *
   * @protected
   */
  _incrementIndex() {
    this._index += 1;
  }
  /**
   * Subtracts 1 from the current index
   *
   * @protected
   */
  _decrementIndex() {
    this._index -= 1;
  }
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
  static get watchers() { return {
    "values": ["geometriesWatchHandler"]
  }; }
  static get style() { return mediaCardCss; }
}, [1, "media-card", {
    "values": [16],
    "_index": [32],
    "_translations": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["media-card", "calcite-button", "calcite-icon", "calcite-label", "calcite-loader"];
  components.forEach(tagName => { switch (tagName) {
    case "media-card":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, MediaCard);
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
    case "calcite-label":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "calcite-loader":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}
defineCustomElement();

export { MediaCard as M, defineCustomElement as d };
