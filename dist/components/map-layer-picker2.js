/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { g as getMapLayerNames } from './mapViewUtils.js';
import { s as state } from './publicNotificationStore.js';
import { d as defineCustomElement$6 } from './chip.js';
import { d as defineCustomElement$5 } from './combobox.js';
import { d as defineCustomElement$4 } from './combobox-item.js';
import { d as defineCustomElement$3 } from './icon.js';
import { d as defineCustomElement$2 } from './option.js';
import { d as defineCustomElement$1 } from './select.js';

const mapLayerPickerCss = ":host{display:block}.map-layer-picker-container{width:100%}.map-layer-picker{position:relative;width:100%;display:inline-block}.padding-bottom-1{padding-bottom:1rem}";

const MapLayerPicker = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.layerSelectionChange = createEvent(this, "layerSelectionChange", 7);
    this.layerNames = [];
    this.mapView = undefined;
    this.selectedLayers = [];
    this.selectionMode = "single";
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
  async watchStateHandler(newValue, oldValue) {
    if (newValue !== oldValue) {
      await this._setLayers();
      if (this.selectionMode === "single") {
        this.layerSelectionChange.emit([this.layerNames[0]]);
      }
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (lifecycle)
  //
  //--------------------------------------------------------------------------
  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   */
  async componentWillLoad() {
    await this._setLayers();
    if (this.selectionMode === "single" && (this.layerNames.length > 0 || this.selectedLayers.length === 1)) {
      this.layerSelectionChange.emit(this.selectedLayers.length === 1 ? [this.selectedLayers[0]] : [this.layerNames[0]]);
    }
  }
  /**
   * Renders the component.
   */
  render() {
    return (h(Host, null, h("div", { class: "map-layer-picker-container" }, h("div", { class: "map-layer-picker" }, this.selectionMode === "multi" ? this._getCombobox() : this._getSelect()))));
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------
  /**
   * Create a list of layers from the map
   *
   * Used for selecting a single layer.
   *
   * @returns Calcite Select component with the names of the layers from the map
   */
  _getSelect() {
    return (h("calcite-select", { label: "", onCalciteSelectChange: (evt) => this._layerSelectionChange(evt), ref: (el) => { this._layerElement = el; } }, this._addMapLayersOptions()));
  }
  /**
   * Create a list of layers from the map
   *
   * Used for selecting multiple layers
   *
   * @returns Calcite ComboBox component with the names of the layers from the map
   */
  _getCombobox() {
    return (h("calcite-combobox", { label: "", onCalciteComboboxChange: (evt) => this._layerSelectionChange(evt), "selection-mode": this.selectionMode }, this._addMapLayersOptions()));
  }
  /**
   * Hydrate a select or combobox component with the names of the layers in the map
   *
   * @returns Array of ComboBox items or Select options for the names of the layers
   */
  _addMapLayersOptions() {
    return this.layerNames.reduce((prev, cur) => {
      if (state.managedLayers.indexOf(cur) < 0) {
        prev.push(this.selectionMode === "multi" && this.selectedLayers.indexOf(cur) > -1 ?
          (h("calcite-combobox-item", { selected: true, textLabel: cur, value: cur })) :
          this.selectionMode === "multi" ?
            (h("calcite-combobox-item", { textLabel: cur, value: cur })) :
            this.selectedLayers.indexOf(cur) > -1 ?
              (h("calcite-option", { label: cur, selected: true, value: cur })) :
              (h("calcite-option", { label: cur, value: cur })));
      }
      return prev;
    }, []);
  }
  /**
   * Fetch the names of the layers from the map
   *
   * @returns Promise when the operation has completed
   */
  async _setLayers() {
    if (this.mapView) {
      this.layerNames = await getMapLayerNames(this.mapView);
    }
  }
  /**
   * Fetch the names of the layers from the map
   *
   * @returns Promise when the operation has completed
   */
  _layerSelectionChange(evt) {
    var _a;
    this.selectedLayers = this.selectionMode === "single" ?
      [this._layerElement.value] : ((_a = evt.detail) === null || _a === void 0 ? void 0 : _a.selectedItems.map((item) => {
      return item.value;
    })) || [];
    this.layerSelectionChange.emit(this.selectedLayers);
  }
  get el() { return this; }
  static get watchers() { return {
    "mapView": ["watchStateHandler"]
  }; }
  static get style() { return mapLayerPickerCss; }
}, [0, "map-layer-picker", {
    "layerNames": [1040],
    "mapView": [16],
    "selectedLayers": [1040],
    "selectionMode": [1537, "selection-mode"]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["map-layer-picker", "calcite-chip", "calcite-combobox", "calcite-combobox-item", "calcite-icon", "calcite-option", "calcite-select"];
  components.forEach(tagName => { switch (tagName) {
    case "map-layer-picker":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, MapLayerPicker);
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
    case "calcite-option":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "calcite-select":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}
defineCustomElement();

export { MapLayerPicker as M, defineCustomElement as d };
