/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, h, H as Host, g as getElement } from './index-09deaa39.js';
import { g as getLocaleComponentStrings } from './locale-a5a0b545.js';
import { g as getMapLayerNames } from './mapViewUtils-ad2b505b.js';
import './_commonjsHelpers-8fd39c50.js';
import './interfaces-3b23a5f9.js';

const configLayerPickerCss = ":host{display:block}.label-spacing{--calcite-label-margin-bottom:0}.padding-block-end-1{-webkit-padding-after:1rem;padding-block-end:1rem}.padding-inline-start-1{-webkit-padding-start:1rem;padding-inline-start:1rem}";

const ConfigLayerPicker = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
  get el() { return getElement(this); }
  static get watchers() { return {
    "mapView": ["watchStateHandler"]
  }; }
};
ConfigLayerPicker.style = configLayerPickerCss;

export { ConfigLayerPicker as config_layer_picker };
