/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { g as getLocaleComponentStrings } from './locale.js';
import { g as getMapLayerNames } from './mapViewUtils.js';
import { d as defineCustomElement$6 } from './chip.js';
import { d as defineCustomElement$5 } from './combobox.js';
import { d as defineCustomElement$4 } from './combobox-item.js';
import { d as defineCustomElement$3 } from './icon.js';
import { d as defineCustomElement$2 } from './label.js';

const configLayerPickerCss = ":host{display:block}.label-spacing{--calcite-label-margin-bottom:0}.padding-block-end-1{-webkit-padding-after:1rem;padding-block-end:1rem}.padding-inline-start-1{-webkit-padding-start:1rem;padding-inline-start:1rem}";

const ConfigLayerPicker$1 = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.defaultChecked = true;
    this.instruction = "";
    this.mapView = undefined;
    this._layerNames = [];
    this._translations = undefined;
  }
  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------
  /**
   * Called each time the mapView prop is changed.
   *
   */
  async watchStateHandler() {
    await this._setLayers();
  }
  //--------------------------------------------------------------------------
  //
  //  Methods (public)
  //
  //--------------------------------------------------------------------------
  /**
   * Returns a list of layers that have been selected
   *
   * @returns Promise with a list of layer names to use
   */
  async getConfigInfo() {
    return typeof this._checkList.value === "string" ?
      [this._checkList.value] : this._checkList.value;
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
    await this._setLayers();
    await this._getTranslations();
  }
  /**
   * Renders the component.
   */
  render() {
    return (h(Host, null, h("div", null, h("div", { class: "padding-block-end-1" }, h("calcite-label", { class: "label-spacing" }, this.instruction || this._translations.chooseLayer)), h("div", { class: "padding-inline-start-1" }, h("calcite-combobox", { label: '', overlayPositioning: "fixed", ref: (el) => { this._checkList = el; }, selectionMode: "multiple" }, this._getComboboxItems())))));
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------
  _getComboboxItems() {
    return this._layerNames ? this._layerNames.map(name => (h("calcite-combobox-item", { textLabel: name, value: name }))) : [];
  }
  /**
   * Fetch the names of the layers from the map
   *
   * @returns Promise when the operation has completed
   */
  async _setLayers() {
    if (this.mapView) {
      this._layerNames = await getMapLayerNames(this.mapView);
    }
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
    "mapView": ["watchStateHandler"]
  }; }
  static get style() { return configLayerPickerCss; }
}, [1, "config-layer-picker", {
    "defaultChecked": [516, "default-checked"],
    "instruction": [1],
    "mapView": [16],
    "_layerNames": [32],
    "_translations": [32],
    "getConfigInfo": [64]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["config-layer-picker", "calcite-chip", "calcite-combobox", "calcite-combobox-item", "calcite-icon", "calcite-label"];
  components.forEach(tagName => { switch (tagName) {
    case "config-layer-picker":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, ConfigLayerPicker$1);
      }
      break;
    case "calcite-chip":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "calcite-combobox":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "calcite-combobox-item":
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
  } });
}
defineCustomElement$1();

const ConfigLayerPicker = ConfigLayerPicker$1;
const defineCustomElement = defineCustomElement$1;

export { ConfigLayerPicker, defineCustomElement };
