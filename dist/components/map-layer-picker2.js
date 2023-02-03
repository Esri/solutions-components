/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { b as queryExtent } from './queryUtils.js';
import { s as state } from './publicNotificationStore.js';
import { d as defineCustomElement$6 } from './chip.js';
import { d as defineCustomElement$5 } from './combobox.js';
import { d as defineCustomElement$4 } from './combobox-item.js';
import { d as defineCustomElement$3 } from './icon.js';
import { d as defineCustomElement$2 } from './option.js';
import { d as defineCustomElement$1 } from './select.js';

/** @license
 * Copyright 2022 Esri
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Gets the layer names from the current map
 *
 * @param mapView the map view to fetch the layer names from
 *
 * @returns Promise resolving with an array of layer names
 *
 */
async function getMapLayerHash(mapView) {
  let layerHash = {};
  await mapView.when(() => {
    layerHash = mapView.map.layers.toArray().reduce((prev, cur) => {
      prev[cur.id] = cur.title;
      return prev;
    }, {});
  });
  return layerHash;
}
/**
 * Gets the layer names from the current map
 *
 * @param mapView the map view to fetch the layer names from
 *
 * @returns Promise resolving with an array of layer names
 *
 */
async function getMapLayerIds(mapView) {
  let layerIds = [];
  await mapView.when(() => {
    layerIds = mapView.map.layers.toArray().map((l) => {
      return l.id;
    });
  });
  return layerIds;
}
/**
 * Get a layer view by id
 *
 * @param mapView the map view to fetch the layer from
 * @param id the id if the layer to fetch
 *
 * @returns Promise resolving with the fetched layer view
 *
 */
async function getMapLayerView(mapView, id) {
  const layer = await getMapLayer(mapView, id);
  return layer ? await mapView.whenLayerView(layer) : undefined;
}
/**
 * Get a layer by id
 *
 * @param mapView the map view to fetch the layer from
 * @param id the id if the layer to fetch
 *
 * @returns Promise resolving with the fetched layer
 *
 */
async function getMapLayer(mapView, id) {
  let layers = [];
  await mapView.when(() => {
    layers = mapView.map.layers.toArray().filter((l) => {
      return l.id === id;
    });
  });
  return layers.length > 0 ? layers[0] : undefined;
}
/**
 * Highlight features by OID
 *
 * @param ids the OIDs from the layer to highlight
 * @param layerView the layer view to highlight
 * @param mapView the map view used if updateExtent is true
 * @param updateExtent optional (default false) boolean to indicate if we should zoom to the extent
 *
 * @returns Promise resolving with the highlight handle
 *
 */
async function highlightFeatures(ids, layerView, mapView, updateExtent = false) {
  if (updateExtent) {
    await goToSelection(ids, layerView, mapView, false);
  }
  return layerView.highlight(ids);
}
/**
 * Flash features by OID
 *
 * @param ids the OIDs from the layer to highlight
 * @param layerView the layer view to highlight
 *
 * @returns Promise resolving when the operation is complete
 *
 */
async function flashSelection(ids, layerView, featureEffect) {
  const filter = {
    objectIds: ids
  };
  layerView.featureEffect = Object.assign(Object.assign({}, featureEffect), { filter });
  setTimeout(() => {
    layerView.featureEffect = undefined;
  }, 1300);
}
/**
 * Zoom to features based on OID
 *
 * @param ids the OIDs from the layer to go to
 * @param layerView the layer view that contains the OIDs
 * @param mapView the map view to show the extent change
 * @param flashFeatures optional (default true) boolean to indicate if we should flash the features
 *
 * @returns Promise resolving when the operation is complete
 *
 */
async function goToSelection(ids, layerView, mapView, flashFeatures = true, featureEffect = undefined) {
  const result = await queryExtent(ids, layerView.layer);
  await mapView.goTo(result.extent);
  if (flashFeatures) {
    await flashSelection(ids, layerView, featureEffect);
  }
}

const mapLayerPickerCss = ":host{display:block}.map-layer-picker-container{width:100%}.map-layer-picker{position:relative;width:100%;display:inline-block}.padding-bottom-1{padding-bottom:1rem}";

const MapLayerPicker = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.layerSelectionChange = createEvent(this, "layerSelectionChange", 7);
    this.enabledLayerIds = [];
    this.mapView = undefined;
    this.selectedLayerIds = [];
    this.selectionMode = "single";
    this.layerIds = [];
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
        this.layerSelectionChange.emit([this.layerIds[0]]);
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
    if (this.selectionMode === "single" && (this.layerIds.length > 0 || this.selectedLayerIds.length === 1)) {
      this.layerSelectionChange.emit(this.selectedLayerIds.length === 1 ? [this.selectedLayerIds[0]] : [this.layerIds[0]]);
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
   * @returns Calcite Select component with the ids of the layers from the map
   */
  _getSelect() {
    return (h("calcite-select", { label: "", onCalciteSelectChange: (evt) => this._layerSelectionChange(evt), ref: (el) => { this._layerElement = el; } }, this._addMapLayersOptions()));
  }
  /**
   * Create a list of layer ids from the map
   *
   * Used for selecting multiple layers
   *
   * @returns Calcite ComboBox component with the ids of the layers from the map
   */
  _getCombobox() {
    return (h("calcite-combobox", { label: "", onCalciteComboboxChange: (evt) => this._layerSelectionChange(evt), "selection-mode": this.selectionMode }, this._addMapLayersOptions()));
  }
  /**
   * Hydrate a select or combobox component with the ids of the layers in the map
   *
   * @returns Array of ComboBox items or Select options for the ids of the layers
   */
  _addMapLayersOptions() {
    return this.layerIds.reduce((prev, cur) => {
      if (state.managedLayers.indexOf(state.layerNameHash[cur]) < 0 && (this.enabledLayerIds.length > 0 ? this.enabledLayerIds.indexOf(cur) > -1 : true)) {
        prev.push(this.selectionMode === "multi" && this.selectedLayerIds.indexOf(cur) > -1 ?
          (h("calcite-combobox-item", { selected: true, textLabel: state.layerNameHash[cur], value: cur })) :
          this.selectionMode === "multi" ?
            (h("calcite-combobox-item", { textLabel: state.layerNameHash[cur], value: cur })) :
            this.selectedLayerIds.indexOf(cur) > -1 ?
              (h("calcite-option", { label: state.layerNameHash[cur], selected: true, value: cur })) :
              (h("calcite-option", { label: state.layerNameHash[cur], value: cur })));
      }
      return prev;
    }, []);
  }
  /**
   * Fetch the ids of the layers from the map
   *
   * @returns Promise when the operation has completed
   */
  async _setLayers() {
    if (this.mapView) {
      const mapLayerIds = await getMapLayerIds(this.mapView);
      this.layerIds = mapLayerIds.filter(n => { var _a; return ((_a = this.enabledLayerIds) === null || _a === void 0 ? void 0 : _a.length) > 0 ? this.enabledLayerIds.indexOf(n) > -1 : true; });
      await this._initLayerHashState();
    }
  }
  /**
   * Create a layer id:title hash for layer name display
   *
   * @returns Promise when the operation has completed
   */
  async _initLayerHashState() {
    if (this.mapView) {
      state.layerNameHash = await getMapLayerHash(this.mapView);
    }
  }
  /**
   * Fetch the ids of the layers from the map
   *
   * @returns Promise when the operation has completed
   */
  _layerSelectionChange(evt) {
    var _a;
    this.selectedLayerIds = this.selectionMode === "single" ?
      [this._layerElement.value] : ((_a = evt.detail) === null || _a === void 0 ? void 0 : _a.selectedItems.map((item) => {
      return item.value;
    })) || [];
    this.layerSelectionChange.emit(this.selectedLayerIds);
  }
  get el() { return this; }
  static get watchers() { return {
    "mapView": ["watchStateHandler"]
  }; }
  static get style() { return mapLayerPickerCss; }
}, [0, "map-layer-picker", {
    "enabledLayerIds": [16],
    "mapView": [16],
    "selectedLayerIds": [1040],
    "selectionMode": [1537, "selection-mode"],
    "layerIds": [32]
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

export { MapLayerPicker as M, getMapLayerView as a, defineCustomElement as d, goToSelection as g, highlightFeatures as h };
