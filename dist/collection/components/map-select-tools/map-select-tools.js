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
import { highlightFeatures, getFeatureLayerView, goToSelection } from "../../utils/mapViewUtils";
import { getQueryGeoms, queryFeaturesByGeometry, queryObjectIds } from "../../utils/queryUtils";
import { EWorkflowType } from "../../utils/interfaces";
import state from "../../utils/publicNotificationStore";
import { getComponentClosestLanguage, getLocaleComponentStrings } from "../../utils/locale";
export class MapSelectTools {
    constructor() {
        this.bufferColor = [227, 139, 79, 0.8];
        this.bufferOutlineColor = [255, 255, 255];
        this.customLabelEnabled = undefined;
        this.enabledLayerIds = [];
        this.enableLayerFeatures = true;
        this.enableSearchDistance = true;
        this.enableSketchTools = true;
        this.defaultBufferDistance = undefined;
        this.defaultBufferUnit = undefined;
        this.geometries = [];
        this.isUpdate = false;
        this.layerViews = [];
        this.locale = undefined;
        this.mapView = undefined;
        this.noResultText = undefined;
        this.searchConfiguration = undefined;
        this.selectionSet = undefined;
        this.selectionLayerIds = [];
        this.selectLayerView = undefined;
        this.sketchLineSymbol = undefined;
        this.sketchPointSymbol = undefined;
        this.sketchPolygonSymbol = undefined;
        this._numSelected = 0;
        this._searchDistanceEnabled = false;
        this._searchTerm = undefined;
        this._selectionLoading = false;
        this._translations = undefined;
        this._useLayerFeaturesEnabled = false;
    }
    //--------------------------------------------------------------------------
    //
    //  Host element access
    //
    //--------------------------------------------------------------------------
    el;
    //--------------------------------------------------------------------------
    //
    //  Properties (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * esri/layers/FeatureLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html
     */
    FeatureLayer;
    /**
     * esri/Graphic: https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html
     */
    Graphic;
    /**
     * esri/layers/GraphicsLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GraphicsLayer.html
     */
    GraphicsLayer;
    /**
     * esri/widgets/Search: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html
     */
    Search;
    /**
     * esri/geometry/geometryEngine: https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-geometryEngine.html
     */
    _geometryEngine;
    /**
     * esri/geometry: https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry.html
     */
    _bufferGeometry;
    /**
     * esri/layers/GraphicsLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GraphicsLayer.html
     */
    _bufferGraphicsLayer;
    /**
     * HTMLBufferToolsElement: The container div for the buffer tools
     */
    _bufferTools;
    /**
     * number: The current buffer distance
     */
    _distance;
    /**
     * HTMLMapDrawToolsElement: The container div for the sketch widget
     */
    _drawTools;
    /**
     * CustomEvent: Used to prevent default behavior of layer selection change
     */
    _labelName;
    /**
     * esri/views/layers/FeatureLayerView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html
     */
    _selectLayers;
    /**
     * HTMLElement: The container div for the search widget
     */
    _searchElement;
    /**
     * An array of objects representing the results of search
     */
    _searchResult;
    /**
     * esri/widgets/Search: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html
     */
    _searchWidget;
    /**
     * number[]: the oids of the selected features
     */
    _selectedIds = [];
    /**
     * string: A label to help uniquely identify the selection set
     */
    _selectionLabel = "";
    /**
     * number[]: When empty or undefined the geometries will be used for selection
     *          When it has values they will be used directly when no buffer is provided
     *          see https://github.com/Esri/solutions-components/issues/148
     */
    _skipGeomOIDs;
    /**
     * esri/Graphic: https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html
     * Added to support https://github.com/Esri/solutions-components/issues/208
     */
    _sketchGraphic;
    /**
     * esri/Graphic[]: https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html
     */
    _graphics = [];
    /**
     * string: The current buffer unit
     */
    _unit;
    /**
     * EWorkflowType: The current workflow type "SEARCH" | "SELECT" | "SKETCH"
     */
    _workflowType;
    /**
     * {<layer id>: Graphic[]}: Collection of graphics returned from queries to the layer
     */
    _featuresCollection = {};
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
     * Called each time the mapView prop is changed.
     */
    async mapViewWatchHandler(v, oldV) {
        if (v && v !== oldV) {
            await this._init();
        }
    }
    /**
     * Called each time the searchConfiguration prop is changed.
     *
     * @returns Promise when complete
     */
    async watchSearchConfigurationHandler(newValue, oldValue) {
        if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
            await this._initSearchWidget();
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
        return this._clearResults(true, true);
    }
    /**
     * Get the new selection set
     *
     * @returns Promise with the new selection set
     */
    async getSelection() {
        // Allow any non whitespace
        if (!/\S+/gm.test(this._selectionLabel)) {
            await this._updateLabel();
        }
        return {
            id: this.isUpdate ? this.selectionSet.id : Date.now(),
            searchResult: this._searchResult,
            buffer: this._bufferGeometry,
            distance: this._bufferTools?.distance,
            download: true,
            unit: this._bufferTools?.unit,
            label: this._selectionLabel,
            selectedIds: this._selectedIds,
            layerView: this.selectLayerView,
            geometries: this.geometries,
            graphics: this._graphics,
            selectLayers: this.layerViews,
            skipGeomOIDs: this._skipGeomOIDs,
            searchDistanceEnabled: this._searchDistanceEnabled,
            workflowType: this._workflowType,
            useLayerFeaturesEnabled: this._useLayerFeaturesEnabled,
            sketchGraphic: this._sketchGraphic
        };
    }
    //--------------------------------------------------------------------------
    //
    //  Events (public)
    //
    //--------------------------------------------------------------------------
    /**
     * Emitted on demand when the selection set changes.
     */
    selectionSetChange;
    /**
     * Handle changes to the search configuration
     */
    searchConfigurationChangeChanged(event) {
        this.searchConfiguration = event.detail;
    }
    /**
     * Handle changes to the buffer distance value
     */
    async distanceChanged(event) {
        await this._distanceChanged(event.detail);
    }
    /**
     * Handle changes to the buffer unit
     */
    async unitChanged(event) {
        if (event.detail.newValue !== event.detail.oldValue) {
            this._unit = event.detail.newValue;
            await this._updateLabel();
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
        await this._getTranslations();
        await this._initModules();
    }
    /**
     * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
     */
    async componentDidLoad() {
        await this._init();
    }
    /**
     * Renders the component.
     */
    render() {
        const mapToolsClass = this.enableSketchTools ? "" : "display-none";
        const mapToolsContainerClass = this.enableSketchTools ? "padding-top-1" : "";
        return (h(Host, { key: 'c7606df019ee2db799fc4aeaef1c01222db71bac' }, this._getMapLayerPicker(), h("div", { key: 'ceb755c17dc275ee210092ecf314f320f02db15d', class: "border-bottom" }), h("div", { key: '796f8a3ee14624651ce1aa79ba90ec102a0c7665', class: "padding-top-sides-1" }, h("div", { key: '3c1241f2716f1b35f33a48117ea7f048988cdc86', class: "search-widget", ref: (el) => { this._searchElement = el; } }), h("div", { key: '45e381d6047836af0f7b1ee27b2d8aba47d0ae08', class: mapToolsContainerClass }, h("map-draw-tools", { key: '6a0abe2d63967396f1d4d1aabc26707df994fc9a', active: true, class: mapToolsClass, editGraphicsEnabled: !this._useLayerFeaturesEnabled, graphics: this._graphics, mapView: this.mapView, onSketchGraphicsChange: (evt) => void this._sketchGraphicsChanged(evt), pointSymbol: this.sketchPointSymbol, polygonSymbol: this.sketchPolygonSymbol, polylineSymbol: this.sketchLineSymbol, ref: (el) => { this._drawTools = el; } })), this.enableSearchDistance ? this._getBufferOptions() : undefined, this.enableLayerFeatures ? this._getUseLayerFeaturesOptions() : undefined, this._getNumSelected()), h("div", { key: '1570dfce246c2faf09fbe31fb6b55f44eb370d3c', class: "border-bottom" }), this._getNameInput()));
    }
    /**
     * Renders the buffer tools component.
     */
    _getBufferOptions() {
        const showBufferToolsClass = this._searchDistanceEnabled ? "search-distance" : "div-not-visible";
        const bufferDistance = typeof this.selectionSet?.distance === "number" ? this.selectionSet.distance : this.defaultBufferDistance;
        return (h("div", null, h("div", { class: "padding-top-1 display-flex" }, h("calcite-label", { class: "label-margin-0 w-100", layout: "inline-space-between" }, h("div", { class: "tooltip-container" }, this._translations.searchDistance, h("calcite-icon", { class: "padding-start-1-2 icon", flipRtl: !(this.locale?.toLowerCase() === "he"), icon: "question", id: "search-distance-icon", scale: "s" }))), h("calcite-popover", { closable: true, label: "", referenceElement: "search-distance-icon" }, h("span", { class: "tooltip-message" }, this._translations.useSearchDistanceTootip)), h("calcite-switch", { checked: this._searchDistanceEnabled, onCalciteSwitchChange: () => this._searchDistanceEnabled = !this._searchDistanceEnabled })), h("div", { class: showBufferToolsClass }, h("buffer-tools", { disabled: !this._searchDistanceEnabled, distance: bufferDistance, geometries: this.geometries, onBufferComplete: (evt) => void this._bufferComplete(evt), ref: (el) => this._bufferTools = el, unit: this.selectionSet?.unit || this.defaultBufferUnit }))));
    }
    /**
     * Renders the map layer picker component.
     */
    _getUseLayerFeaturesOptions() {
        const useLayerFeaturesClass = this._useLayerFeaturesEnabled ? "div-visible" : "div-not-visible";
        return (h("div", null, h("div", { class: "padding-top-1 display-flex" }, h("calcite-label", { class: "label-margin-0 w-100", layout: "inline-space-between" }, h("div", { class: "tooltip-container" }, this._translations.useLayerFeatures, h("calcite-icon", { class: "padding-start-1-2 icon", flipRtl: !(this.locale?.toLowerCase() === "he"), icon: "question", id: "use-layer-features-icon", scale: "s" }))), h("calcite-popover", { closable: true, label: "", referenceElement: "use-layer-features-icon" }, h("span", { class: "tooltip-message" }, this._translations.useLayerFeaturesTooltip)), h("calcite-switch", { checked: this._useLayerFeaturesEnabled, onCalciteSwitchChange: () => { this._useLayerFeaturesEnabledChanged(); } })), h("div", { class: useLayerFeaturesClass + " padding-top-1" }, h("map-layer-picker", { enabledLayerIds: this.selectionLayerIds, mapView: this.mapView, onLayerSelectionChange: (evt) => { void this._layerSelectionChange(evt); }, selectedIds: this.layerViews.map(l => l.layer.id), showTables: false }))));
    }
    /**
     * Renders the number of selected features
     */
    _getNumSelected() {
        const locale = getComponentClosestLanguage(this.el);
        const selectionLoading = locale && locale === "en" ?
            `${this._translations.selectionLoading}...` : this._translations.selectionLoading;
        return (h("div", { class: "padding-top-1 padding-bottom-1", style: { "align-items": "end", "display": "flex" } }, this._selectionLoading ? (h("div", null, h("calcite-loader", { class: "info-blue", inline: true, label: selectionLoading, scale: "m", type: "indeterminate" }))) : (h("calcite-icon", { class: "info-blue padding-end-1-2", icon: "feature-layer", scale: "s" })), h("calcite-input-message", { class: "info-blue", scale: "m" }, this._selectionLoading ? selectionLoading :
            this.noResultText && this._numSelected === 0 ? this.noResultText :
                this._translations.selectedFeatures.replace("{{n}}", this._numSelected.toString()))));
    }
    /**
     * Renders the custom label input
     */
    _getNameInput() {
        const nameLabelClass = this.customLabelEnabled ? "" : "display-none";
        return (h("div", { class: "padding-sides-1 padding-top-1 " + nameLabelClass }, h("calcite-label", { class: "font-bold" }, this._translations.listName, h("calcite-input", { onInput: () => {
                this._selectionLabel = this._labelName.value;
            }, placeholder: this._translations.listNamePlaceholder, ref: (el) => { this._labelName = el; }, value: this._selectionLabel || "" }))));
    }
    /**
     * Create the UI element that will expose the addressee layers
     *
     * @returns addressee layer list node
     * @protected
     */
    _getMapLayerPicker() {
        return (h("div", { class: "display-flex padding-sides-1 padding-bottom-1" }, h("calcite-label", { class: "font-bold width-full label-margin-0" }, this._translations.inputLayer, h("map-layer-picker", { enabledLayerIds: this.enabledLayerIds, mapView: this.mapView, onLayerSelectionChange: (evt) => void this._inputLayerSelectionChange(evt), selectedIds: this.selectLayerView ? [this.selectLayerView.layer.id] : this.selectionSet ? [this.selectionSet.layerView.layer.id] : [], showTables: false }))));
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
        await this._initSearchWidget();
    }
    /**
     * Initialize the state of the component with any stored values in a selection set
     *
     * @protected
     */
    async _initSelectionSet() {
        if (this.selectionSet) {
            this._searchTerm = this.selectionSet.searchResult?.name;
            this._searchResult = this.selectionSet.searchResult;
            this._selectLayers = this.selectionSet.selectLayers;
            this._selectedIds = this.selectionSet.selectedIds;
            this._skipGeomOIDs = this.selectionSet.skipGeomOIDs;
            this._searchDistanceEnabled = this.selectionSet.searchDistanceEnabled;
            this._useLayerFeaturesEnabled = this.selectionSet.useLayerFeaturesEnabled;
            this._distance = this.selectionSet.searchDistanceEnabled ? this.selectionSet.distance : 0;
            this._unit = this.selectionSet.unit;
            this._workflowType = this.selectionSet.workflowType;
            this.selectLayerView = this.selectionSet.layerView;
            this._sketchGraphic = this.selectionSet.sketchGraphic;
            this.geometries = [
                ...this.selectionSet?.geometries || []
            ];
            // restore graphics from geometries to avoid issues with temp modifications to graphics that were aborted
            this._graphics = this.geometries.map(geometry => {
                const symbol = geometry.type === "point" ? this.sketchPointSymbol :
                    geometry.type === "polyline" ? this.sketchLineSymbol : this.sketchPolygonSymbol;
                return new this.Graphic({
                    geometry,
                    symbol
                });
            });
            this._selectionLabel = this.selectionSet?.label;
            if (!this._useLayerFeaturesEnabled) {
                await this._drawTools?.updateGraphics();
            }
            await goToSelection(this.selectionSet.selectedIds, this.selectionSet.layerView, this.mapView, false);
        }
    }
    /**
     * Initialize the search widget
     *
     * @protected
     */
    async _initSearchWidget() {
        if (this.mapView && this._searchElement) {
            const searchConfiguration = this._getSearchConfig(this.searchConfiguration, this.mapView);
            const searchOptions = {
                view: this.mapView,
                container: this._searchElement,
                searchTerm: this._searchTerm,
                ...searchConfiguration
            };
            this._searchWidget = new this.Search(searchOptions);
            this._searchWidget.popupEnabled = false;
            this._searchWidget.resultGraphicEnabled = false;
            this._searchWidget.on("search-clear", () => {
                const clearLabel = this._searchClearLabel();
                void this._clearResults(false, clearLabel);
            });
            this._searchWidget.on("select-result", (searchResults) => {
                if (searchResults.result) {
                    this._searchResult = searchResults.result;
                    const resultFeature = searchResults.result.feature;
                    const resultLayer = resultFeature?.layer;
                    const selectLayer = this.selectLayerView.layer;
                    const oid = resultFeature?.getObjectId();
                    const useOIDs = resultLayer?.url && selectLayer?.url && resultLayer.url === selectLayer.url && !isNaN(oid);
                    const oids = useOIDs ? [oid] : undefined;
                    this._workflowType = EWorkflowType.SEARCH;
                    void this._updateLabel();
                    const graphics = [searchResults.result.feature];
                    this._updateSelection(graphics, useOIDs, oids);
                    this._drawTools.graphics = graphics;
                    this._searchWidget.resultGraphic.visible = false;
                }
                else {
                    const clearLabel = this._searchClearLabel();
                    void this._clearResults(false, clearLabel);
                }
            });
            await this._searchWidget.when(() => {
                this._searchWidget.allPlaceholder = this.searchConfiguration?.allPlaceholder &&
                    this.searchConfiguration.allPlaceholder.toLowerCase() !== "find address or place" ?
                    this.searchConfiguration.allPlaceholder : this._translations.placeholder;
            });
        }
    }
    /**
     * Check if the current label should be cleared
     *
     * @returns true when the current label is based on search result
     * @protected
     */
    _searchClearLabel() {
        return this._searchResult?.name && this._labelName.value.indexOf(this._searchResult.name) > -1;
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
        const sources = searchConfiguration?.sources;
        if (sources?.length > 0) {
            searchConfiguration = {
                ...searchConfiguration,
                includeDefaultSources: false
            };
            sources.forEach((source) => {
                const isLayerSource = source.hasOwnProperty("layer");
                if (isLayerSource) {
                    const layerSource = source;
                    const layerId = layerSource.layer?.id;
                    const layerFromMap = layerId ? view.map.findLayerById(layerId) : null;
                    const layerUrl = layerSource?.layer?.url;
                    if (layerFromMap) {
                        layerSource.layer = layerFromMap;
                    }
                    else if (layerUrl) {
                        layerSource.layer = new this.FeatureLayer(layerUrl);
                    }
                }
            });
            sources?.forEach((source) => {
                const isLocatorSource = source.hasOwnProperty("locator");
                if (isLocatorSource) {
                    const locatorSource = source;
                    if (locatorSource?.name === "ArcGIS World Geocoding Service") {
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
            searchConfiguration = {
                ...searchConfiguration,
                includeDefaultSources: true
            };
        }
        return searchConfiguration;
    }
    /**
     * Initialize the graphics layer used to store any buffer grapghics
     *
     * @protected
     */
    _initGraphicsLayer() {
        const title = this._translations.bufferLayer;
        if (this.mapView) {
            const bufferIndex = this.mapView.map.layers.findIndex((l) => l.title === title);
            if (bufferIndex > -1) {
                this._bufferGraphicsLayer = this.mapView.map.layers.getItemAt(bufferIndex);
            }
            else {
                this._bufferGraphicsLayer = new this.GraphicsLayer({ title, listMode: "hide" });
                state.managedLayers[title] = "buffer";
                const sketchIndex = this.mapView.map.layers.findIndex((l) => l.title === this._translations.sketchLayer);
                if (sketchIndex > -1) {
                    this.mapView.map.layers.add(this._bufferGraphicsLayer, sketchIndex);
                }
                else {
                    this.mapView.map.layers.add(this._bufferGraphicsLayer);
                }
            }
        }
    }
    /**
     * Handle changes in the sketch graphics
     *
     * @param event stores the graphics that will be used to select features
     * @param forceUpdate when true the drawn graphic will be used to select features from
     * use layer features layer...then the selected layer features will be used to select from the main input layer
     *
     */
    async _sketchGraphicsChanged(event, forceUpdate = false) {
        const graphics = event.detail.graphics;
        if (graphics.length > 0 && graphics[0]) {
            if (!forceUpdate) {
                this._sketchGraphic = graphics[0];
            }
            this._workflowType = this._useLayerFeaturesEnabled ? EWorkflowType.SELECT : EWorkflowType.SKETCH;
            if (this._workflowType === EWorkflowType.SKETCH) {
                await this._drawTools.updateGraphics();
            }
            await this._updateLabel();
            this._clearSearchWidget();
            if (this._useLayerFeaturesEnabled && !forceUpdate) {
                // Will only ever be a single graphic
                const geometries = Array.isArray(graphics) ? graphics.map(g => g.geometry) : this.geometries;
                await this._selectLayerFeatures(geometries[0]);
            }
            else {
                const oids = graphics.reduce((prev, cur) => {
                    if (cur?.layer?.objectIdField) {
                        prev.push(cur.attributes[cur.layer.objectIdField]);
                    }
                    else if (cur.getObjectId) {
                        prev.push(cur.getObjectId());
                    }
                    return prev;
                }, []);
                const useOIDs = event.detail.useOIDs && oids.length > 0;
                this._updateSelection(graphics, useOIDs, oids);
                if (useOIDs) {
                    await this._highlightFeatures(oids);
                }
            }
        }
        else {
            await this._clearResults(true, true);
        }
    }
    /**
     * Highlight the features in the map based on OIDs when skipOIDs have been defined
     *
     * @protected
     */
    async _highlightWithOIDsOrGeoms() {
        if (this._skipGeomOIDs?.length > 0) {
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
     * @param ids the ids that should be highlighted
     *
     * @protected
     */
    async _highlightFeatures(ids) {
        state.removeHandles();
        if (ids.length > 0) {
            state.highlightHandles.push(await highlightFeatures(ids, this.selectLayerView, this.mapView));
        }
        this._numSelected = ids.length;
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
        this._selectionLoading = true;
        this._selectedIds = await queryObjectIds(geometries, this.selectLayerView.layer);
        this._selectionLoading = false;
        // stored as graphics now in addition to the geoms
        this._drawTools.graphics = this._graphics;
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
        let oldValue = this._bufferTools.distance;
        let newValue = 0;
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
            // We need to swap the values again if they were previously
            // set based on disable of buffer tools when the tools have a value
            newValue = oldValue;
            oldValue = 0;
        }
        else {
            if (this._bufferGraphicsLayer) {
                this._bufferGraphicsLayer.removeAll();
            }
            await this._highlightWithOIDsOrGeoms();
        }
        // mock this b/c the tools can store a value that is different than what is shown in the map
        // this occurs when a distance is set but then buffer is disabled
        await this._distanceChanged({
            oldValue,
            newValue
        });
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
    async _clearResults(clearSearchWidget = true, clearLabel = false) {
        this._selectedIds = [];
        this._distance = undefined;
        this._unit = undefined;
        if (clearLabel) {
            this._selectionLabel = "";
            if (this._labelName) {
                this._labelName.value = "";
            }
        }
        if (this._bufferGraphicsLayer) {
            this._bufferGraphicsLayer.removeAll();
        }
        if (clearSearchWidget && this._searchWidget) {
            this._clearSearchWidget();
        }
        state.removeHandles();
        // checking for clear as it would throw off tests
        if (this._drawTools?.clear) {
            this._graphics = [];
            await this._drawTools.clear();
        }
        this._numSelected = this._selectedIds.length;
        this.selectionSetChange.emit(this._numSelected);
    }
    /**
     * Clear all the search widget and any stored search result
     *
     * @protected
     */
    _clearSearchWidget() {
        this._searchWidget.clear();
        this._searchResult = undefined;
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
    _updateSelection(graphics, useOIDs, oids) {
        this._selectedIds = useOIDs && oids ? oids : this._selectedIds;
        // see https://github.com/Esri/solutions-components/issues/148
        this._skipGeomOIDs = useOIDs ? oids : undefined;
        this.geometries = Array.isArray(graphics) ? graphics.map(g => g.geometry) : this.geometries;
        this._graphics = graphics;
    }
    /**
     * Updates the label for the selection set
     *
     * @protected
     */
    async _updateLabel() {
        if (this.enableSearchDistance) {
            const hasSketch = this._selectionLabel.indexOf(this._translations.sketch) > -1;
            const hasSelect = this._selectionLabel.indexOf(this._translations.select) > -1;
            const hasSearch = this._selectionLabel.indexOf(this._searchResult?.name) > -1;
            const label = this._workflowType === EWorkflowType.SEARCH ? this._searchResult?.name :
                this._workflowType === EWorkflowType.SELECT ?
                    this._translations.select : this._translations.sketch;
            const _unit = !this._unit ? this._bufferTools.unit : this._unit;
            const unit = await this._bufferTools.getTranslatedUnit(_unit);
            const distance = isNaN(this._distance) ? this._bufferTools.distance : this._distance;
            this._selectionLabel = hasSketch || hasSelect || hasSearch || !this._selectionLabel ?
                `${label} ${distance} ${unit}` : this._selectionLabel;
            this._labelName.value = this._selectionLabel;
        }
    }
    /**
     * Gets the layer views from the map when the layer selection changes
     *
     * @returns Promise resolving when function is done
     *
     * @protected
     */
    async _layerSelectionChange(evt) {
        if (Array.isArray(evt.detail) && evt.detail.length > 0) {
            const layerPromises = evt.detail.map(id => {
                return getFeatureLayerView(this.mapView, id);
            });
            return Promise.all(layerPromises).then((layerViews) => {
                this.layerViews = layerViews;
                this._featuresCollection = {};
                if (this._sketchGraphic) {
                    void this._sketchGraphicsChanged({
                        detail: {
                            graphics: [this._sketchGraphic],
                            useOIDs: false
                        }
                    });
                }
            });
        }
    }
    /**
     * Fetch the layer from the map
     *
     * @param evt layer selection change event
     *
     * @returns Promise when the function has completed
     * @protected
     */
    async _inputLayerSelectionChange(evt) {
        const id = evt?.detail?.length > 0 ? evt.detail[0] : "";
        if (!this.selectLayerView || id !== this.selectLayerView.layer.id) {
            this.selectLayerView = await getFeatureLayerView(this.mapView, id);
            await this._updateLabel();
            this._bufferGeometry ? await this._selectFeatures([this._bufferGeometry]) :
                await this._highlightWithOIDsOrGeoms();
        }
    }
    /**
     * Handle changes to the buffer distance value
     */
    async _distanceChanged(detail) {
        if (detail.newValue !== detail.oldValue) {
            this._distance = detail.newValue;
            await this._updateLabel();
        }
    }
    /**
     * Select features based on the input geometry
     *
     * @param geom the geometry used for selection
     *
     * @returns Promise resolving when function is done
     *
     * @protected
     */
    async _selectLayerFeatures(geom) {
        this._selectionLoading = true;
        const queryFeaturePromises = this.layerViews.map(layerView => {
            this._featuresCollection[layerView.layer.id] = [];
            return queryFeaturesByGeometry(0, layerView.layer, geom, this._featuresCollection);
        });
        return Promise.all(queryFeaturePromises).then(async (response) => {
            this._selectionLoading = false;
            let graphics = [];
            response.forEach(r => {
                Object.keys(r).forEach(k => {
                    graphics = graphics.concat(r[k]);
                });
            });
            let hasOID = false;
            graphics.forEach((g) => {
                const geom = g.geometry;
                g.symbol = geom.type === "point" ?
                    this.sketchPointSymbol : geom.type === "polyline" ?
                    this.sketchLineSymbol : geom.type === "polygon" ?
                    this.sketchPolygonSymbol : undefined;
                hasOID = g?.layer?.hasOwnProperty("objectIdField") || g.hasOwnProperty("getObjectId");
            });
            // OIDs are used when the addressee layer and the current "use layer features" layer are the same
            const useOIDs = (this.layerViews[0].layer.url === this.selectLayerView.layer.url) && hasOID;
            await this._sketchGraphicsChanged({
                detail: {
                    graphics,
                    useOIDs
                }
            }, true);
        });
    }
    /**
     * Store use layer features value and re-select features based on the original sketch graphic
     *
     * @protected
     */
    _useLayerFeaturesEnabledChanged() {
        this._useLayerFeaturesEnabled = !this._useLayerFeaturesEnabled;
        if (this._sketchGraphic) {
            void this._sketchGraphicsChanged({
                detail: {
                    graphics: [this._sketchGraphic],
                    useOIDs: false
                }
            });
        }
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
            "customLabelEnabled": {
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
                    "text": "boolean: When true the user can define a name for each notification list"
                },
                "attribute": "custom-label-enabled",
                "reflect": false
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
            "enableLayerFeatures": {
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
                    "text": "boolean: When true users will be allowed to optionally use features from a layer as the selection geometry"
                },
                "attribute": "enable-layer-features",
                "reflect": false,
                "defaultValue": "true"
            },
            "enableSearchDistance": {
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
                    "text": "boolean: When true users will be allowed to optionally create a buffer around the selection geometry"
                },
                "attribute": "enable-search-distance",
                "reflect": false,
                "defaultValue": "true"
            },
            "enableSketchTools": {
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
                    "text": "boolean: When true sketch tools will be provided to allow users to draw a selection geometry"
                },
                "attribute": "enable-sketch-tools",
                "reflect": false,
                "defaultValue": "true"
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
                            "path": "../../utils/interfaces",
                            "id": "src/utils/interfaces.ts::DistanceUnit"
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
                            "location": "global",
                            "id": "global::___esri"
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
            "layerViews": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "__esri.FeatureLayerView[]",
                    "resolved": "FeatureLayerView[]",
                    "references": {
                        "___esri": {
                            "location": "global",
                            "id": "global::___esri"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "esri/views/layers/FeatureLayerView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html"
                },
                "defaultValue": "[]"
            },
            "locale": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "string: The current user locale."
                },
                "attribute": "locale",
                "reflect": false
            },
            "mapView": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "__esri.MapView",
                    "resolved": "MapView",
                    "references": {
                        "___esri": {
                            "location": "global",
                            "id": "global::___esri"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html"
                }
            },
            "noResultText": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "string: The value to show for no results\r\nwhen left empty the default text \"0 selected features from {layerTitle}\" will be shown"
                },
                "attribute": "no-result-text",
                "reflect": false
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
                            "path": "../../utils/interfaces",
                            "id": "src/utils/interfaces.ts::ISearchConfiguration"
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
                            "path": "../../utils/interfaces",
                            "id": "src/utils/interfaces.ts::ISelectionSet"
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
            "selectionLayerIds": {
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
                    "text": "string[]: List of layer ids that should be shown as potential selection layers\r\nwhen skectching with \"Use layer features\" option"
                },
                "defaultValue": "[]"
            },
            "selectLayerView": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "__esri.FeatureLayerView",
                    "resolved": "FeatureLayerView",
                    "references": {
                        "___esri": {
                            "location": "global",
                            "id": "global::___esri"
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
            "sketchLineSymbol": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "__esri.SimpleLineSymbol",
                    "resolved": "SimpleLineSymbol",
                    "references": {
                        "___esri": {
                            "location": "global",
                            "id": "global::___esri"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "esri/symbols/SimpleLineSymbol | JSON representation : https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleLineSymbol.html"
                }
            },
            "sketchPointSymbol": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "__esri.SimpleMarkerSymbol",
                    "resolved": "SimpleMarkerSymbol",
                    "references": {
                        "___esri": {
                            "location": "global",
                            "id": "global::___esri"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "esri/symbols/SimpleMarkerSymbol | JSON representation: https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleMarkerSymbol.html"
                }
            },
            "sketchPolygonSymbol": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "__esri.SimpleFillSymbol",
                    "resolved": "SimpleFillSymbol",
                    "references": {
                        "___esri": {
                            "location": "global",
                            "id": "global::___esri"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "esri/symbols/SimpleFillSymbol | JSON representation: https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleFillSymbol.html"
                }
            }
        };
    }
    static get states() {
        return {
            "_numSelected": {},
            "_searchDistanceEnabled": {},
            "_searchTerm": {},
            "_selectionLoading": {},
            "_translations": {},
            "_useLayerFeaturesEnabled": {}
        };
    }
    static get events() {
        return [{
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
                            "location": "global",
                            "id": "global::Promise"
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
                            "location": "global",
                            "id": "global::Promise"
                        },
                        "ISelectionSet": {
                            "location": "import",
                            "path": "../../utils/interfaces",
                            "id": "src/utils/interfaces.ts::ISelectionSet"
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
                "propName": "mapView",
                "methodName": "mapViewWatchHandler"
            }, {
                "propName": "searchConfiguration",
                "methodName": "watchSearchConfigurationHandler"
            }];
    }
    static get listeners() {
        return [{
                "name": "searchConfigurationChange",
                "method": "searchConfigurationChangeChanged",
                "target": "window",
                "capture": false,
                "passive": false
            }, {
                "name": "distanceChanged",
                "method": "distanceChanged",
                "target": "window",
                "capture": false,
                "passive": false
            }, {
                "name": "unitChanged",
                "method": "unitChanged",
                "target": "window",
                "capture": false,
                "passive": false
            }];
    }
}
