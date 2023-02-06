/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, h, H as Host, g as getElement } from './index-c246d90e.js';
import { g as getLocaleComponentStrings } from './locale-45b745d6.js';
import './_commonjsHelpers-d5f9d613.js';

const infoCardCss = ":host{display:block;--calcite-label-margin-bottom:0}table{border-collapse:collapse;width:100%}th,td{text-align:left;padding:8px}tr:nth-child(odd){background:var(--calcite-ui-foreground-2)}.bottom-border{padding-bottom:0.5rem;border-bottom:1px solid var(--calcite-ui-border-1)}.padding-top-1-2{padding-top:0.5rem}.font-color-3{color:var(--calcite-ui-text-3)}";

const InfoCard = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
  get el() { return getElement(this); }
};
InfoCard.style = infoCardCss;

const mediaCardCss = ":host{display:block;--calcite-label-margin-bottom:0}.padding-bottom-1{padding-bottom:1rem}.padding-start-1{-webkit-padding-start:1rem;padding-inline-start:1rem}.display-flex{display:flex}.font-italic{font-style:italic}.button-width{min-width:120px}.button-container{display:flex;justify-content:space-between}.count-container{display:flex;align-items:center}.img-container{-o-object-fit:scale-down;object-fit:scale-down;width:100%;height:100%}";

const MediaCard = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
  get el() { return getElement(this); }
  static get watchers() { return {
    "values": ["geometriesWatchHandler"]
  }; }
};
MediaCard.style = mediaCardCss;

export { InfoCard as info_card, MediaCard as media_card };
