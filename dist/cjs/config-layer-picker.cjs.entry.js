/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ee607805.js');
const locale = require('./locale-d15229c4.js');
const mapViewUtils = require('./mapViewUtils-8ea9adc5.js');
require('./_commonjsHelpers-6aafa5de.js');
require('./interfaces-772edf61.js');

const configLayerPickerCss = ":host{display:block}.label-spacing{--calcite-label-margin-bottom:0}.padding-block-end-1{-webkit-padding-after:1rem;padding-block-end:1rem}.padding-inline-start-1{-webkit-padding-start:1rem;padding-inline-start:1rem}";

const ConfigLayerPicker = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
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
    return (index.h(index.Host, null, index.h("div", null, index.h("div", { class: "padding-block-end-1" }, index.h("calcite-label", { class: "label-spacing" }, this.instruction || this._translations.chooseLayer)), index.h("div", { class: "padding-inline-start-1" }, index.h("calcite-combobox", { label: '', overlayPositioning: "fixed", ref: (el) => { this._checkList = el; }, selectionMode: "multiple" }, this._getComboboxItems())))));
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------
  _getComboboxItems() {
    return this._layerNames ? this._layerNames.map(name => (index.h("calcite-combobox-item", { textLabel: name, value: name }))) : [];
  }
  /**
   * Fetch the names of the layers from the map
   *
   * @returns Promise when the operation has completed
   */
  async _setLayers() {
    if (this.mapView) {
      this._layerNames = await mapViewUtils.getMapLayerNames(this.mapView);
    }
  }
  /**
   * Fetches the component's translations
   *
   * @returns Promise when complete
   * @protected
   */
  async _getTranslations() {
    const messages = await locale.getLocaleComponentStrings(this.el);
    this._translations = messages[0];
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "mapView": ["watchStateHandler"]
  }; }
};
ConfigLayerPicker.style = configLayerPickerCss;

exports.config_layer_picker = ConfigLayerPicker;
