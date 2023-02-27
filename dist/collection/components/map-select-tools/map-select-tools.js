/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
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
import { Host, h } from "@stencil/core";
import { loadModules } from "../../utils/loadModules";
import { highlightFeatures, goToSelection } from "../../utils/mapViewUtils";
import { getQueryGeoms, queryObjectIds } from "../../utils/queryUtils";
import { EWorkflowType, ESelectionMode, ERefineMode, ESketchType } from "../../utils/interfaces";
import state from "../../utils/publicNotificationStore";
import { getLocaleComponentStrings } from "../../utils/locale";
export class MapSelectTools {
  constructor() {
    /**
     * number[]: the oids of the selected features
     */
    this._selectedIds = [];
    /**
     * string: A label to help uniquely identify the selection set
     */
    this._selectionLabel = "";
    this.bufferColor = [227, 139, 79, 0.8];
    this.bufferOutlineColor = [255, 255, 255];
    this.enabledLayerIds = [];
    this.defaultBufferDistance = undefined;
    this.defaultBufferUnit = undefined;
    this.geometries = [];
    this.isUpdate = false;
    this.mapView = undefined;
    this.searchConfiguration = undefined;
    this.selectionSet = undefined;
    this.selectLayerView = undefined;
    this.showBufferTools = true;
    this._layerSelectChecked = undefined;
    this._searchTerm = undefined;
    this._translations = undefined;
    this._workflowType = undefined;
  }
  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------
  /**
   * Called each time the geometries prop is changed.
   *
   * @returns Promise when complete
   */
  async watchGeometriesHandler(newValue, oldValue) {
    if (newValue !== oldValue) {
      const isEmpty = newValue.length === 0;
      await this._clearResults(isEmpty, isEmpty);
      if (newValue.length > 0) {
        return this._highlightWithOIDsOrGeoms();
      }
    }
  }
  /**
   * Called each time the searchConfiguration prop is changed.
   *
   * @returns Promise when complete
   */
  async watchSearchConfigurationHandler(newValue, oldValue) {
    if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
      this._initSearchWidget();
    }
  }
  /**
   * Called each time the workflowType prop is changed and emits the workflowTypeChange event.
   *
   * @returns Promise when complete
   */
  async workflowTypeHandler(newValue, oldValue) {
    if (newValue !== oldValue) {
      this.mapView.popup.autoOpenEnabled = ["SELECT", "SKETCH", "REFINE", "SEARCH"].indexOf(newValue) < 0;
      this.workflowTypeChange.emit(newValue);
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Methods (public)
  //
  //--------------------------------------------------------------------------
  /**
   * Clear any selection results
   *
   * @returns Promise when the results have been cleared
   */
  async clearSelection() {
    return this._clearResults();
  }
  /**
   * Get the new selection set
   *
   * @returns Promise with the new selection set
   */
  async getSelection() {
    // Allow any non whitespace
    if (!/\S+/gm.test(this._selectionLabel)) {
      this._selectionLabel = this._getSelectionBaseLabel();
    }
    const isBaseLabel = this._selectionLabel === this._getSelectionBaseLabel();
    return {
      id: this.isUpdate ? this.selectionSet.id : Date.now(),
      workflowType: this._workflowType,
      searchResult: this._searchResult,
      buffer: this._bufferGeometry,
      distance: this._bufferTools.distance,
      download: true,
      unit: this._bufferTools.unit,
      label: (this._selectionLabel && !isBaseLabel) ?
        this._selectionLabel : `${this._selectionLabel} ${this._bufferTools.distance} ${this._bufferTools.unit}`,
      selectedIds: this._selectedIds,
      layerView: this.selectLayerView,
      geometries: this.geometries,
      refineSelectLayers: this._refineTools.layerViews,
      skipGeomOIDs: this._skipGeomOIDs
    };
  }
  /**
   * Handle changes to the selection sets
   */
  labelChange(event) {
    this._selectionLabel = event.detail;
  }
  /**
   * Handle changes to the search configuration
   */
  searchConfigurationChangeChanged(event) {
    this.searchConfiguration = event.detail;
  }
  /**
   * Listen to changes in the sketch graphics
   *
   */
  sketchGraphicsChange(event) {
    console.log("sketchGraphicsChange was fired");
    this._updateSelection(EWorkflowType.SKETCH, event.detail, this._selectionLabel || this._translations.sketch, false);
  }
  /**
   * Listen to changes in the refine graphics
   *
   */
  refineSelectionGraphicsChange(event) {
    const graphics = event.detail.graphics;
    const oids = Array.isArray(graphics) ? graphics.map(g => g.attributes[g.layer.objectIdField]) : [];
    this._updateSelection(EWorkflowType.SELECT, graphics, this._selectionLabel || this._translations.select, event.detail.useOIDs, oids);
    return this._highlightFeatures(oids);
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
    await this._getTranslations();
    await this._initModules();
  }
  /**
   * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
   */
  async componentDidLoad() {
    return this._init();
  }
  /**
   * Renders the component.
   */
  render() {
    var _a, _b;
    const searchEnabled = this._workflowType === EWorkflowType.SEARCH;
    const showSearchClass = searchEnabled ? " div-visible-search" : " div-not-visible";
    const drawEnabled = this._workflowType === EWorkflowType.SKETCH || this._workflowType === EWorkflowType.SELECT;
    const showBufferToolsClass = this.showBufferTools ? "search-distance" : "div-not-visible";
    const useSelectClass = this._layerSelectChecked && !searchEnabled ? " div-visible" : " div-not-visible";
    const useDrawClass = !this._layerSelectChecked && !searchEnabled ? " div-visible" : " div-not-visible";
    const showLayerChoiceClass = searchEnabled ? "div-not-visible" : "div-visible";
    const bufferDistance = typeof ((_a = this.selectionSet) === null || _a === void 0 ? void 0 : _a.distance) === "number" ? this.selectionSet.distance : this.defaultBufferDistance;
    return (h(Host, null, h("div", { class: "padding-bottom-1" }, h("calcite-radio-group", { class: "w-100", onCalciteRadioGroupChange: (evt) => this._workflowChange(evt) }, h("calcite-radio-group-item", { checked: searchEnabled, class: "w-50 end-border", value: EWorkflowType.SEARCH }, this._translations.search), h("calcite-radio-group-item", { checked: drawEnabled, class: "w-50", value: EWorkflowType.SKETCH }, this._translations.sketch))), h("div", { class: showSearchClass }, h("div", { class: "search-widget", ref: (el) => { this._searchElement = el; } })), h("div", { class: showLayerChoiceClass }, h("calcite-label", { layout: "inline" }, h("calcite-checkbox", { checked: this._layerSelectChecked, onCalciteCheckboxChange: () => this._layerSelectChanged(), ref: (el) => this._selectFromLayerElement = el }), "Use layer features")), h("div", { class: useDrawClass }, h("map-draw-tools", { active: true, border: true, mapView: this.mapView, ref: (el) => { this._drawTools = el; } })), h("div", { class: useSelectClass }, h("refine-selection-tools", { active: true, border: true, enabledLayerIds: this.enabledLayerIds, layerView: this.selectLayerView, layerViews: this._refineSelectLayers, mapView: this.mapView, mode: ESelectionMode.ADD, ref: (el) => { this._refineTools = el; }, refineMode: ERefineMode.SUBSET })), h("calcite-label", { class: showBufferToolsClass }, this._translations.searchDistance, h("buffer-tools", { distance: bufferDistance, geometries: this.geometries, onBufferComplete: (evt) => this._bufferComplete(evt), ref: (el) => this._bufferTools = el, unit: ((_b = this.selectionSet) === null || _b === void 0 ? void 0 : _b.unit) || this.defaultBufferUnit })), h("slot", null)));
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------
  /**
   * Load esri javascript api modules
   *
   * @returns Promise resolving when function is done
   *
   * @protected
   */
  async _initModules() {
    const [GraphicsLayer, Graphic, Search, geometryEngine, FeatureLayer] = await loadModules([
      "esri/layers/GraphicsLayer",
      "esri/Graphic",
      "esri/widgets/Search",
      "esri/geometry/geometryEngine",
      "esri/layers/FeatureLayer"
    ]);
    this.GraphicsLayer = GraphicsLayer;
    this.Graphic = Graphic;
    this.Search = Search;
    this._geometryEngine = geometryEngine;
    this.FeatureLayer = FeatureLayer;
  }
  /**
   * Initialize the graphics layer, selection set, and search widget
   *
   * @returns Promise when the operation has completed
   */
  async _init() {
    this._initGraphicsLayer();
    await this._initSelectionSet();
    this._initSearchWidget();
  }
  /**
   * Initialize the state of the component with any stored values in a selection set
   *
   * @protected
   */
  async _initSelectionSet() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    if (this.selectionSet) {
      this._searchTerm = (_b = (_a = this.selectionSet) === null || _a === void 0 ? void 0 : _a.searchResult) === null || _b === void 0 ? void 0 : _b.name;
      this._workflowType = (_c = this.selectionSet) === null || _c === void 0 ? void 0 : _c.workflowType;
      this._searchResult = (_d = this.selectionSet) === null || _d === void 0 ? void 0 : _d.searchResult;
      this._refineSelectLayers = (_e = this.selectionSet) === null || _e === void 0 ? void 0 : _e.refineSelectLayers;
      this._selectedIds = (_f = this.selectionSet) === null || _f === void 0 ? void 0 : _f.selectedIds;
      this._skipGeomOIDs = (_g = this.selectionSet) === null || _g === void 0 ? void 0 : _g.skipGeomOIDs;
      this._layerSelectChecked = ((_h = this.selectionSet) === null || _h === void 0 ? void 0 : _h.workflowType) === EWorkflowType.SELECT;
      this.geometries = [
        ...((_j = this.selectionSet) === null || _j === void 0 ? void 0 : _j.geometries) || []
      ];
      // reset selection label base
      this._selectionLabel = ((_k = this.selectionSet) === null || _k === void 0 ? void 0 : _k.label) || this._getSelectionBaseLabel();
      await goToSelection(this.selectionSet.selectedIds, this.selectionSet.layerView, this.mapView, false);
    }
    else {
      this._workflowType = EWorkflowType.SEARCH;
      this.mapView.popup.autoOpenEnabled = false;
    }
  }
  /**
   * Get the default label base when the user has not provided a value
   *
   * @protected
   */
  _getSelectionBaseLabel() {
    var _a, _b;
    return this._workflowType === EWorkflowType.SKETCH ?
      this._translations.sketch : this._workflowType === EWorkflowType.SELECT ?
      this._translations.select : this._workflowType === EWorkflowType.SEARCH && this._searchResult ?
      (_a = this._searchResult) === null || _a === void 0 ? void 0 : _a.name : (_b = this.selectionSet) === null || _b === void 0 ? void 0 : _b.label;
  }
  /**
   * Initialize the search widget
   *
   * @protected
   */
  _initSearchWidget() {
    if (this.mapView && this._searchElement) {
      const searchConfiguration = this._getSearchConfig(this.searchConfiguration, this.mapView);
      const searchOptions = Object.assign({ view: this.mapView, container: this._searchElement, searchTerm: this._searchTerm }, searchConfiguration);
      this._searchWidget = new this.Search(searchOptions);
      this._searchWidget.popupEnabled = false;
      this._searchWidget.on("search-clear", () => {
        void this._clearResults(false);
      });
      this._searchWidget.on("select-result", (searchResults) => {
        var _a, _b, _c;
        if (searchResults.result) {
          this._searchResult = searchResults.result;
          const useOIDs = ((_b = (_a = searchResults.source) === null || _a === void 0 ? void 0 : _a.layer) === null || _b === void 0 ? void 0 : _b.id) && searchResults.source.layer.id === this.selectLayerView.layer.id;
          const oids = useOIDs ? [searchResults.result.feature.getObjectId()] : undefined;
          this._updateSelection(EWorkflowType.SEARCH, [searchResults.result.feature], (_c = searchResults === null || searchResults === void 0 ? void 0 : searchResults.result) === null || _c === void 0 ? void 0 : _c.name, useOIDs, oids);
        }
        else {
          void this._clearResults(false);
        }
      });
    }
  }
  /**
   * Initialize the search widget based on user defined configuration
   *
   * @param searchConfiguration search configuration defined by the user
   * @param view the current map view
   *
   * @protected
   */
  _getSearchConfig(searchConfiguration, view) {
    const INCLUDE_DEFAULT_SOURCES = "includeDefaultSources";
    const sources = searchConfiguration === null || searchConfiguration === void 0 ? void 0 : searchConfiguration.sources;
    if ((sources === null || sources === void 0 ? void 0 : sources.length) > 0) {
      searchConfiguration[INCLUDE_DEFAULT_SOURCES] = false;
      sources.forEach((source) => {
        var _a, _b;
        const isLayerSource = source.hasOwnProperty("layer");
        if (isLayerSource) {
          const layerSource = source;
          const layerId = (_a = layerSource.layer) === null || _a === void 0 ? void 0 : _a.id;
          const layerFromMap = layerId ? view.map.findLayerById(layerId) : null;
          const layerUrl = (_b = layerSource === null || layerSource === void 0 ? void 0 : layerSource.layer) === null || _b === void 0 ? void 0 : _b.url;
          if (layerFromMap) {
            layerSource.layer = layerFromMap;
          }
          else if (layerUrl) {
            layerSource.layer = new this.FeatureLayer(layerUrl);
          }
        }
      });
      sources === null || sources === void 0 ? void 0 : sources.forEach((source) => {
        const isLocatorSource = source.hasOwnProperty("locator");
        if (isLocatorSource) {
          const locatorSource = source;
          if ((locatorSource === null || locatorSource === void 0 ? void 0 : locatorSource.name) === "ArcGIS World Geocoding Service") {
            const outFields = locatorSource.outFields || ["Addr_type", "Match_addr", "StAddr", "City"];
            locatorSource.outFields = outFields;
            locatorSource.singleLineFieldName = "SingleLine";
          }
          locatorSource.url = locatorSource.url;
          delete locatorSource.url;
        }
      });
    }
    else {
      searchConfiguration = Object.assign(Object.assign({}, searchConfiguration), { includeDefaultSources: true });
    }
    return searchConfiguration;
  }
  /**
   * Initialize the graphics layer used to store any buffer grapghics
   *
   * @protected
   */
  _initGraphicsLayer() {
    console.log("-----------------------------_initGraphicsLayer BUFFER-----------------------------");
    const title = this._translations.bufferLayer;
    const bufferIndex = this.mapView.map.layers.findIndex((l) => l.title === title);
    if (bufferIndex > -1) {
      this._bufferGraphicsLayer = this.mapView.map.layers.getItemAt(bufferIndex);
    }
    else {
      this._bufferGraphicsLayer = new this.GraphicsLayer({ title });
      state.managedLayers.push(title);
      const sketchIndex = this.mapView.map.layers.findIndex((l) => l.title === this._translations.sketchLayer);
      if (sketchIndex > -1) {
        this.mapView.map.layers.add(this._bufferGraphicsLayer, sketchIndex);
      }
      else {
        this.mapView.map.layers.add(this._bufferGraphicsLayer);
      }
    }
  }
  /**
   * Store the layer select checked change
   *
   * @protected
   */
  _layerSelectChanged() {
    this._layerSelectChecked = this._selectFromLayerElement.checked;
    this.sketchTypeChange.emit(this._layerSelectChecked ? ESketchType.LAYER : ESketchType.INTERACTIVE);
  }
  /**
   * Store workflow type change
   *
   * @protected
   */
  _workflowChange(evt) {
    this._workflowType = evt.detail;
  }
  /**
   * Highlight the features in the map based on OIDs when skipOIDs have been defined
   *
   * @protected
   */
  async _highlightWithOIDsOrGeoms() {
    var _a;
    if (((_a = this._skipGeomOIDs) === null || _a === void 0 ? void 0 : _a.length) > 0) {
      this._selectedIds = this._skipGeomOIDs;
      return this._highlightFeatures(this._selectedIds);
    }
    else {
      return this._geomQuery(this.geometries);
    }
  }
  /**
   * Highlight the features in the map
   *
   * @protected
   */
  async _highlightFeatures(ids) {
    var _a;
    (_a = state.highlightHandle) === null || _a === void 0 ? void 0 : _a.remove();
    if (ids.length > 0) {
      state.highlightHandle = await highlightFeatures(ids, this.selectLayerView, this.mapView);
    }
    this.selectionSetChange.emit(ids.length);
  }
  /**
   * Query the selectLayerView based on any user drawn geometries or buffers
   *
   * @param geometries Array of geometries used for the selection of ids from the select layer view
   *
   * @returns Promise when the selection is complete and the graphics have been highlighted
   */
  async _selectFeatures(geometries) {
    this.selectionLoadingChange.emit(true);
    this._selectedIds = await queryObjectIds(geometries, this.selectLayerView.layer);
    this.selectionLoadingChange.emit(false);
    // Add geometries used for selecting features as graphics
    this._drawTools.graphics = this.geometries.map(geom => {
      var _a, _b, _c;
      const props = {
        "geometry": geom,
        "symbol": geom.type === "point" ?
          (_a = this._drawTools) === null || _a === void 0 ? void 0 : _a.pointSymbol : geom.type === "polyline" ?
          (_b = this._drawTools) === null || _b === void 0 ? void 0 : _b.polylineSymbol : geom.type === "polygon" ?
          (_c = this._drawTools) === null || _c === void 0 ? void 0 : _c.polygonSymbol : undefined
      };
      console.log("props");
      console.log(props);
      return new this.Graphic(props);
    });
    await this._highlightFeatures(this._selectedIds);
  }
  /**
   * Query the selectLayerView based on any user drawn geometries or buffers
   *
   * @param evt CustomEvent that contains the result of the buffer
   *
   * @protected
   */
  async _bufferComplete(evt) {
    this._bufferGeometry = Array.isArray(evt.detail) ?
      evt.detail[0] : evt.detail;
    if (this._bufferGeometry) {
      // Create a symbol for rendering the graphic
      const symbol = {
        type: "simple-fill",
        color: this.bufferColor,
        outline: {
          color: this.bufferOutlineColor,
          width: 1
        }
      };
      // Add the geometry and symbol to a new graphic
      const polygonGraphic = new this.Graphic({
        geometry: this._bufferGeometry,
        symbol
      });
      this._bufferGraphicsLayer.removeAll();
      this._bufferGraphicsLayer.add(polygonGraphic);
      await this._selectFeatures([this._bufferGeometry]);
      await this.mapView.goTo(polygonGraphic.geometry.extent);
    }
    else {
      if (this._bufferGraphicsLayer) {
        this._bufferGraphicsLayer.removeAll();
      }
      return this._highlightWithOIDsOrGeoms();
    }
  }
  /**
   * Fetch a single geometry for each potential geometry type
   *
   * @param geometries All current selection geometries
   *
   * @protected
   */
  _geomQuery(geometries) {
    const queryGeoms = getQueryGeoms(geometries, this._geometryEngine);
    return this._selectFeatures(queryGeoms);
  }
  /**
   * Clear all stored values and general state for the component
   *
   * @param clearSearchWidget Optional boolean for clearing the search widget (default is true)
   * @param clearLabel Optional boolean for clearing the search label (default is true)
   *
   * @protected
   */
  async _clearResults(clearSearchWidget = true, clearLabel = true) {
    var _a, _b;
    this._selectedIds = [];
    if (clearLabel) {
      this._selectionLabel = "";
    }
    if (this._bufferGraphicsLayer) {
      this._bufferGraphicsLayer.removeAll();
    }
    if (clearSearchWidget && this._searchWidget) {
      this._searchWidget.clear();
    }
    (_a = state.highlightHandle) === null || _a === void 0 ? void 0 : _a.remove();
    // for sketch
    // checking for clear as it would throw off tests
    if ((_b = this._drawTools) === null || _b === void 0 ? void 0 : _b.clear) {
      await this._drawTools.clear();
    }
    this.selectionSetChange.emit(this._selectedIds.length);
  }
  /**
   * Fetch a single geometry for the current geometry type
   *
   * @param type worflow type
   * @param graphics graphics to be used for selection
   * @param label selection label
   * @param useOIDs indicates if the OIDs should override the geometry for selection
   * @param oids list of IDs to select when useOIDs is true
   *
   * @protected
   */
  _updateSelection(type, graphics, label, useOIDs, oids) {
    this._selectedIds = useOIDs && oids ? oids : this._selectedIds;
    // see https://github.com/Esri/solutions-components/issues/148
    this._skipGeomOIDs = useOIDs ? oids : undefined;
    this.geometries = Array.isArray(graphics) ? graphics.map(g => g.geometry) : this.geometries;
    this._workflowType = type;
    this._selectionLabel = label;
  }
  /**
   * Fetches the component's translations
   *
   * @protected
   */
  async _getTranslations() {
    const translations = await getLocaleComponentStrings(this.el);
    this._translations = translations[0];
  }
  static get is() { return "map-select-tools"; }
  static get originalStyleUrls() {
    return {
      "$": ["map-select-tools.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["map-select-tools.css"]
    };
  }
  static get properties() {
    return {
      "bufferColor": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "string | number[] |  object with r, g, b, a: https://developers.arcgis.com/javascript/latest/api-reference/esri-Color.html"
        },
        "attribute": "buffer-color",
        "reflect": false,
        "defaultValue": "[227, 139, 79, 0.8]"
      },
      "bufferOutlineColor": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "string | number[] | object with r, g, b, a: https://developers.arcgis.com/javascript/latest/api-reference/esri-Color.html"
        },
        "attribute": "buffer-outline-color",
        "reflect": false,
        "defaultValue": "[255, 255, 255]"
      },
      "enabledLayerIds": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "string[]",
          "resolved": "string[]",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "string[]: Optional list of enabled layer ids\r\n If empty all layers will be available"
        },
        "defaultValue": "[]"
      },
      "defaultBufferDistance": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "number: The default value to show for the buffer distance"
        },
        "attribute": "default-buffer-distance",
        "reflect": false
      },
      "defaultBufferUnit": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "DistanceUnit",
          "resolved": "\"feet\" | \"kilometers\" | \"meters\" | \"miles\"",
          "references": {
            "DistanceUnit": {
              "location": "import",
              "path": "../../utils/interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "number: The default value to show for the buffer unit"
        },
        "attribute": "default-buffer-unit",
        "reflect": false
      },
      "geometries": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "__esri.Geometry[]",
          "resolved": "Geometry[]",
          "references": {
            "___esri": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "esri/geometry: https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry.html"
        },
        "defaultValue": "[]"
      },
      "isUpdate": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "boolean: When true a new label is not generated for the stored selection set"
        },
        "attribute": "is-update",
        "reflect": false,
        "defaultValue": "false"
      },
      "mapView": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "__esri.MapView",
          "resolved": "MapView",
          "references": {
            "___esri": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html"
        }
      },
      "searchConfiguration": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "ISearchConfiguration",
          "resolved": "ISearchConfiguration",
          "references": {
            "ISearchConfiguration": {
              "location": "import",
              "path": "../../utils/interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "ISearchConfiguration: Configuration details for the Search widget"
        }
      },
      "selectionSet": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ISelectionSet",
          "resolved": "ISelectionSet",
          "references": {
            "ISelectionSet": {
              "location": "import",
              "path": "../../utils/interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "utils/interfaces/ISelectionSet: Used to store key details about any selections that have been made."
        }
      },
      "selectLayerView": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "__esri.FeatureLayerView",
          "resolved": "FeatureLayerView",
          "references": {
            "___esri": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "esri/views/layers/FeatureLayerView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html"
        }
      },
      "showBufferTools": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "boolean: When true the buffer tools will be available for use"
        },
        "attribute": "show-buffer-tools",
        "reflect": false,
        "defaultValue": "true"
      }
    };
  }
  static get states() {
    return {
      "_layerSelectChecked": {},
      "_searchTerm": {},
      "_translations": {},
      "_workflowType": {}
    };
  }
  static get events() {
    return [{
        "method": "selectionLoadingChange",
        "name": "selectionLoadingChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted on demand when selection starts or ends."
        },
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        }
      }, {
        "method": "selectionSetChange",
        "name": "selectionSetChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted on demand when the selection set changes."
        },
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        }
      }, {
        "method": "sketchTypeChange",
        "name": "sketchTypeChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted on demand when the sketch type changes."
        },
        "complexType": {
          "original": "ESketchType",
          "resolved": "ESketchType.INTERACTIVE | ESketchType.LAYER",
          "references": {
            "ESketchType": {
              "location": "import",
              "path": "../../utils/interfaces"
            }
          }
        }
      }, {
        "method": "workflowTypeChange",
        "name": "workflowTypeChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted on demand when the workflow type changes."
        },
        "complexType": {
          "original": "EWorkflowType",
          "resolved": "EWorkflowType.REFINE | EWorkflowType.SEARCH | EWorkflowType.SELECT | EWorkflowType.SKETCH",
          "references": {
            "EWorkflowType": {
              "location": "import",
              "path": "../../utils/interfaces"
            }
          }
        }
      }];
  }
  static get methods() {
    return {
      "clearSelection": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Clear any selection results",
          "tags": [{
              "name": "returns",
              "text": "Promise when the results have been cleared"
            }]
        }
      },
      "getSelection": {
        "complexType": {
          "signature": "() => Promise<ISelectionSet>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            },
            "ISelectionSet": {
              "location": "import",
              "path": "../../utils/interfaces"
            }
          },
          "return": "Promise<ISelectionSet>"
        },
        "docs": {
          "text": "Get the new selection set",
          "tags": [{
              "name": "returns",
              "text": "Promise with the new selection set"
            }]
        }
      }
    };
  }
  static get elementRef() { return "el"; }
  static get watchers() {
    return [{
        "propName": "geometries",
        "methodName": "watchGeometriesHandler"
      }, {
        "propName": "searchConfiguration",
        "methodName": "watchSearchConfigurationHandler"
      }, {
        "propName": "_workflowType",
        "methodName": "workflowTypeHandler"
      }];
  }
  static get listeners() {
    return [{
        "name": "labelChange",
        "method": "labelChange",
        "target": "window",
        "capture": false,
        "passive": false
      }, {
        "name": "searchConfigurationChange",
        "method": "searchConfigurationChangeChanged",
        "target": "window",
        "capture": false,
        "passive": false
      }, {
        "name": "sketchGraphicsChange",
        "method": "sketchGraphicsChange",
        "target": "window",
        "capture": false,
        "passive": false
      }, {
        "name": "refineSelectionGraphicsChange",
        "method": "refineSelectionGraphicsChange",
        "target": "window",
        "capture": false,
        "passive": false
      }];
  }
}
