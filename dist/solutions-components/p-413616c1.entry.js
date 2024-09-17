/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, g as getElement, h, H as Host } from './p-6eb37ed2.js';
import { a as getComponentClosestLanguage, l as loadModules, g as getLocaleComponentStrings } from './p-2058b5d9.js';
import { e as goToSelection, h as highlightFeatures, k as queryObjectIds, l as getQueryGeoms, c as getFeatureLayerView, m as queryFeaturesByGeometry, n as getIdSets, o as highlightAllFeatures } from './p-eb483242.js';
import { a as EWorkflowType, e as ESelectionMode, f as EDrawMode } from './p-80cb7c73.js';
import { s as state } from './p-5dcec135.js';
import { d as downloadCSV, a as downloadPDF } from './p-022c49af.js';
import './p-0a24ad5f.js';
import './p-d4056c1c.js';
import './p-720a12c0.js';
import './p-659678f1.js';
import './p-7c583516.js';

const mapSelectToolsCss = ":host{display:block}.div-visible{display:inherit}.div-visible-search{display:flex;height:44px;align-items:center;padding-bottom:0}.div-not-visible{display:none}.padding-bottom-1{padding-bottom:1rem}.padding-top-1{padding-top:1rem}.search-widget{width:100% !important;border:1px solid var(--calcite-color-border-input)}.w-100{width:100%}.w-50{width:50%}.search-distance-container{padding-top:\"1rem\" !important}.end-border{border-inline-end:1px solid var(--calcite-color-border-2)}.search-distance{display:flex;padding-top:1rem}.font-bold{font:bold}.border-bottom{border-bottom:1px solid var(--calcite-color-border-2)}.tooltip-container{display:flex}.padding-start-1-2{padding-inline-start:0.5rem}.icon{--calcite-color-icon-color:var(--calcite-color-brand)}.tooltip-message{padding:5px 8px;font-weight:var(--calcite-font-weight-normal);color:var(--calcite-color-text-2)}";
const MapSelectToolsStyle0 = mapSelectToolsCss;

const MapSelectTools = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.selectionSetChange = createEvent(this, "selectionSetChange", 7);
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
    get el() { return getElement(this); }
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
        return (h(Host, { key: '2643969b71b41cad30ade0900eb391abe054a2ff' }, this._getMapLayerPicker(), h("div", { key: 'ed4f34f2f6e1b99c5b133ec6097becd13539ebe6', class: "border-bottom" }), h("div", { key: '5aca91cf4f34d343716d68c4f68f88ce98ba0e07', class: "padding-top-sides-1" }, h("div", { key: '999f1090ea43e2c71ef8f957ed3dab9c11e9233a', class: "search-widget", ref: (el) => { this._searchElement = el; } }), h("div", { key: 'e92f91fdaba7ec3975fd099c835d013a61af240c', class: mapToolsContainerClass }, h("map-draw-tools", { key: 'a330983f29bb8c866af82ea50970b779a0a04519', active: true, class: mapToolsClass, editGraphicsEnabled: !this._useLayerFeaturesEnabled, graphics: this._graphics, mapView: this.mapView, onSketchGraphicsChange: (evt) => void this._sketchGraphicsChanged(evt), pointSymbol: this.sketchPointSymbol, polygonSymbol: this.sketchPolygonSymbol, polylineSymbol: this.sketchLineSymbol, ref: (el) => { this._drawTools = el; } })), this.enableSearchDistance ? this._getBufferOptions() : undefined, this.enableLayerFeatures ? this._getUseLayerFeaturesOptions() : undefined, this._getNumSelected()), h("div", { key: '022214b69e6c57324c1bc8ffa528adf618f8fe60', class: "border-bottom" }), this._getNameInput()));
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
    static get watchers() { return {
        "geometries": ["watchGeometriesHandler"],
        "mapView": ["mapViewWatchHandler"],
        "searchConfiguration": ["watchSearchConfigurationHandler"]
    }; }
};
MapSelectTools.style = MapSelectToolsStyle0;

const labelFormats = [
	{
		descriptionPDF: {
			labelWidthDisplay: "2-5/8",
			labelHeightDisplay: "1",
			labelsPerPageDisplay: "30",
			averyPartNumber: "*60"
		},
		labelSpec: {
			type: "AVERY",
			pageProperties: {
				pageType: "ANSI A",
				leftMargin: 0.1875,
				rightMargin: 0.1875,
				topMargin: 0.5,
				bottomMargin: 0.5
			},
			numLabelsAcross: 3,
			numLabelsDown: 10,
			labelWidth: 2.625,
			labelHeight: 1,
			horizGapIn: 0.125,
			vertGapIn: 0,
			labelPadding: 0.1,
			fontSizePx: 11,
			maxNumLabelLines: 4
		}
	},
	{
		descriptionPDF: {
			labelWidthDisplay: "4",
			labelHeightDisplay: "1",
			labelsPerPageDisplay: "20",
			averyPartNumber: "*61"
		},
		labelSpec: {
			type: "AVERY",
			pageProperties: {
				pageType: "ANSI A",
				leftMargin: 0.15625,
				rightMargin: 0.15625,
				topMargin: 0.47637821,
				bottomMargin: 0.5
			},
			numLabelsAcross: 2,
			numLabelsDown: 10,
			labelWidth: 4,
			labelHeight: 1.0025,
			horizGapIn: 0.1875,
			vertGapIn: 0,
			labelPadding: 0.1,
			fontSizePx: 11,
			maxNumLabelLines: 4
		}
	},
	{
		descriptionPDF: {
			labelWidthDisplay: "4",
			labelHeightDisplay: "1-1/3",
			labelsPerPageDisplay: "14",
			averyPartNumber: "*62"
		},
		labelSpec: {
			type: "AVERY",
			pageProperties: {
				pageType: "ANSI A",
				leftMargin: 0.15625,
				rightMargin: 0.15625,
				topMargin: 0.81889808,
				bottomMargin: 0.83464612
			},
			numLabelsAcross: 2,
			numLabelsDown: 7,
			labelWidth: 4,
			labelHeight: 1.3352,
			horizGapIn: 0.1875,
			vertGapIn: 0,
			labelPadding: 0.1,
			fontSizePx: 11,
			maxNumLabelLines: 6
		}
	},
	{
		descriptionPDF: {
			labelWidthDisplay: "4",
			labelHeightDisplay: "2",
			labelsPerPageDisplay: "10",
			averyPartNumber: "*63"
		},
		labelSpec: {
			type: "AVERY",
			pageProperties: {
				pageType: "ANSI A",
				leftMargin: 0.15625,
				rightMargin: 0.15625,
				topMargin: 0.5,
				bottomMargin: 0.5
			},
			numLabelsAcross: 2,
			numLabelsDown: 5,
			labelWidth: 4,
			labelHeight: 2,
			horizGapIn: 0.1875,
			vertGapIn: 0,
			labelPadding: 0.1,
			fontSizePx: 12,
			maxNumLabelLines: 10
		}
	},
	{
		descriptionPDF: {
			labelWidthDisplay: "4",
			labelHeightDisplay: "3-1/3",
			labelsPerPageDisplay: "6",
			averyPartNumber: "*64"
		},
		labelSpec: {
			type: "AVERY",
			pageProperties: {
				pageType: "ANSI A",
				leftMargin: 0.15625,
				rightMargin: 0.15625,
				topMargin: 0.4724412,
				bottomMargin: 0.50000027
			},
			numLabelsAcross: 2,
			numLabelsDown: 3,
			labelWidth: 4,
			labelHeight: 3.342,
			horizGapIn: 0.1875,
			vertGapIn: 0,
			labelPadding: 0.1,
			fontSizePx: 14,
			maxNumLabelLines: 12
		}
	},
	{
		descriptionPDF: {
			labelWidthDisplay: "1-3/4",
			labelHeightDisplay: "1/2",
			labelsPerPageDisplay: "80",
			averyPartNumber: "*67"
		},
		labelSpec: {
			type: "AVERY",
			pageProperties: {
				pageType: "ANSI A",
				leftMargin: 0.307086375,
				rightMargin: 0.307086375,
				topMargin: 0.4724412,
				bottomMargin: 0.49606326
			},
			numLabelsAcross: 4,
			numLabelsDown: 20,
			labelWidth: 1.75,
			labelHeight: 0.50155,
			horizGapIn: 0.29527575,
			vertGapIn: 0,
			labelPadding: 0.1,
			fontSizePx: 8,
			maxNumLabelLines: 3
		}
	},
	{
		descriptionPDF: {
			labelWidthDisplay: "1-3/4",
			labelHeightDisplay: "2/3",
			labelsPerPageDisplay: "60",
			averyPartNumber: "*95"
		},
		labelSpec: {
			type: "AVERY",
			pageProperties: {
				pageType: "ANSI A",
				leftMargin: 0.28936983,
				rightMargin: 0.28936983,
				topMargin: 0.53937037,
				bottomMargin: 0.5511814
			},
			numLabelsAcross: 4,
			numLabelsDown: 15,
			labelWidth: 1.75,
			labelHeight: 0.6605,
			horizGapIn: 0.30708678,
			vertGapIn: 0,
			labelPadding: 0.1,
			fontSizePx: 8,
			maxNumLabelLines: 4
		}
	}
];

const pdfLabelFormats = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': labelFormats
});

const pdfDownloadCss = ":host{display:block}";
const PdfDownloadStyle0 = pdfDownloadCss;

const PdfDownload = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.defaultNumLabelsPerPage = undefined;
        this.disabled = false;
        this._translations = undefined;
    }
    get el() { return getElement(this); }
    //--------------------------------------------------------------------------
    //
    //  Properties (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * HTMLCalciteSelectElement: The html element for selecting buffer unit
     */
    _labelInfoElement;
    /**
     * intl: https://developers.arcgis.com/javascript/latest/api-reference/esri-intl.html
     */
    _intl;
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
    /**
     * Downloads csv of mailing labels for the provided list of ids
     *
     * @param webmap Webmap containing layer
     * @param exportInfos Information about items to be exported
     * @param removeDuplicates When true a single label is generated when multiple featues have a shared address value
     * @param addColumnTitle Indicates if column headings should be included in output
     * @returns Promise resolving when function is done
     */
    async downloadCSV(webmap, exportInfos, removeDuplicates, addColumnTitle = true) {
        return downloadCSV(webmap, exportInfos, true, // formatUsingLayerPopup
        removeDuplicates, addColumnTitle);
    }
    /**
     * Downloads pdf of mailing labels for the provided list of ids
     *
     * @param webmap Webmap containing layer
     * @param exportInfos Information about items to be exported
     * @param removeDuplicates When true a single label is generated when multiple featues have a shared address value
     * @param title Title for each page
     * @param initialImageDataUrl Data URL of image for first page
     * @returns Promise resolving when function is done
     */
    async downloadPDF(webmap, exportInfos, removeDuplicates = false, title = "", initialImageDataUrl = "") {
        return downloadPDF(webmap, exportInfos, this._labelInfoElement.selectedOption?.value, removeDuplicates, title, initialImageDataUrl);
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
     */
    async componentWillLoad() {
        await this._getTranslations();
        await this._initModules();
    }
    /**
     * Renders the component.
     */
    render() {
        return (h(Host, { key: 'a2a528f3bb24b8ea11bac5e4e7bfcc87ba81a794' }, h("calcite-select", { key: '65188bbe9f8c18e5fde98a2f2dd96961a2354d61', disabled: this.disabled, label: "", ref: (el) => { this._labelInfoElement = el; } })));
    }
    componentDidLoad() {
        // Render the options outside of Stencil's rendering so that it doesn't mangle RTL text with embedded LTR
        this._renderOptions();
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
        const [intl] = await loadModules([
            "esri/intl"
        ]);
        this._intl = intl;
    }
    /**
     * Gets the formatted pdf export size text
     *
     * @param labelInfo current user selected label info
     *
     * @returns the pdf label as a string
     * @protected
     */
    _getLabelSizeText(labelInfo) {
        const lNum = labelInfo.descriptionPDF.labelsPerPageDisplay;
        const lSize = "&lrm;" + labelInfo.descriptionPDF.labelWidthDisplay + " x " +
            labelInfo.descriptionPDF.labelHeightDisplay + "&rlm;";
        return this._translations.pdfLabel.replace("{{n}}", lNum).replace("{{labelSize}}", lSize);
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
    /**
     * Renders the pdf export size options and adds them to the `select` component
     *
     * @protected
     */
    _renderOptions() {
        const s = pdfLabelFormats;
        const sortedPdfIndo = (s.default || s).sort((a, b) => {
            const _a = parseInt(a.descriptionPDF.labelsPerPageDisplay, 10);
            const _b = parseInt(b.descriptionPDF.labelsPerPageDisplay, 10);
            return _a < _b ? -1 : _a > _b ? 1 : 0;
        });
        sortedPdfIndo.forEach((l, i) => {
            const option = document.createElement("calcite-option");
            option.value = l;
            option.innerHTML = this._getLabelSizeText(l);
            this._labelInfoElement.appendChild(option);
            if (this.defaultNumLabelsPerPage ? parseInt(l.descriptionPDF.labelsPerPageDisplay, 10) === this.defaultNumLabelsPerPage : i === 0) {
                // Setting selected wasn't enough to trigger it being the 'selectedOption'
                option.selected = true;
                this._labelInfoElement.selectedOption = option;
            }
        });
    }
};
PdfDownload.style = PdfDownloadStyle0;

const refineSelectionCss = ":host{display:block}.div-visible{display:inherit}.div-not-visible{display:none !important}.padding-top-1-2{padding-top:.5rem}.main-label{display:flex;float:left}html[dir=\"rtl\"] .main-label{display:flex;float:right}.border{outline:1px solid var(--calcite-color-border-input)}.margin-top-1{margin-top:1rem}.esri-sketch{display:flex;flex-flow:column wrap}.esri-widget{box-sizing:border-box;color:#323232;font-size:14px;font-family:\"Avenir Next\",\"Helvetica Neue\",Helvetica,Arial,sans-serif;line-height:1.3em;background-color:var(--calcite-color-foreground-1)}.esri-sketch__panel{align-items:center;display:flex;flex-flow:row nowrap;padding:0}*/ .esri-sketch__tool-section{border-right:1px solid rgba(110,110,110,.3)}.esri-sketch__section{align-items:center;display:flex;flex-flow:row nowrap;padding:0 7px;margin:6px 0;border-right:1px solid rgba(110,110,110,.3)}.display-flex{display:flex}.font-bold{font-weight:bold}.width-full{width:100%}.label-margin-0{--calcite-label-margin-bottom:0}.padding-start-1-2{padding-inline-start:0.5rem}.font-weight-500{font-weight:500}.word-wrap-anywhere{word-wrap:anywhere}";
const RefineSelectionStyle0 = refineSelectionCss;

const RefineSelection = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.selectionLoadingChange = createEvent(this, "selectionLoadingChange", 7);
        this.selectionSetsChanged = createEvent(this, "selectionSetsChanged", 7);
        this.addresseeLayer = undefined;
        this.enabledLayerIds = [];
        this.locale = undefined;
        this.mapView = undefined;
        this.selectionSets = [];
        this.sketchLineSymbol = undefined;
        this.sketchPointSymbol = undefined;
        this.sketchPolygonSymbol = undefined;
        this._translations = undefined;
        this._selectionMode = ESelectionMode.ADD;
        this._refineLayer = undefined;
    }
    get el() { return getElement(this); }
    //--------------------------------------------------------------------------
    //
    //  Properties (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * boolean: Indicates if any new graphics should be added or removed
     */
    _addEnabled = true;
    /**
     * HTMLMapDrawToolsElement: The tools used to create graphics
     */
    _drawTools;
    /**
     * ISelectionSet[]: The current list of selection sets
     */
    _refineSets = [];
    /**
     * string[]: The list of all layers that have current selections
     */
    _enabledLayerIds = [];
    /**
     * HTMLMapLayerPickerElement: The layer picker used to define what layer you are refining
     */
    _layerPicker;
    /**
     * {<layer id>: Graphic[]}: Collection of graphics returned from queries to the layer
     */
    _featuresCollection = {};
    /**
     * ISelectionSet: The current selection set to refine
     */
    _refineSelectionSet;
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
    /**
     * Emitted on demand when selection starts or ends.
     */
    selectionLoadingChange;
    /**
     * Emitted on demand when selection sets change.
     *
     */
    selectionSetsChanged;
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
        this._enabledLayerIds = this._getEnabledLayerIds();
        await this._setRefineSet(this._enabledLayerIds[0]);
    }
    /**
     * Renders the component.
     */
    render() {
        const layerPickerClass = this._enabledLayerIds.length > 1 ? "display-block" : "display-none";
        return (h(Host, { key: '6ca10ddfe06214aa74a308661290a08147587e5b' }, h("div", { key: 'ecad97854aadc69766dd182c385ba2f5a7447121', class: layerPickerClass + " padding-top-sides-1" }, h("div", { key: 'b68331dcf8ae4a36fbd57494e2b9f8daf92906ed', class: "display-flex" }, h("calcite-label", { key: '31c0fea32fd5fb0c380ab1e561a7f4d9057e06f6', class: "font-bold width-full label-margin-0" }, h("div", { key: 'f3e92e9d216e5ff4c14490e2b0278b88807b9762', class: "display-flex" }, this._translations.inputLayer, h("calcite-icon", { key: 'b1a75c06d01eeb7840be6eeb303f403ebd924454', class: "padding-start-1-2 icon", flipRtl: !(this.locale?.toLowerCase() === "he"), icon: "question", id: "refine-input-layer", scale: "s" })), h("map-layer-picker", { key: '27f7e489caf763d87cf4ccf6200f471cb3ae8363', enabledLayerIds: this._enabledLayerIds, mapView: this.mapView, onLayerSelectionChange: (evt) => { void this._layerSelectionChange(evt); }, ref: (el) => { this._layerPicker = el; }, selectedIds: [this._refineLayer.layer.id], showTables: false })), h("calcite-popover", { key: 'c469bcb0fbbfbc08797541043b0c9130e453737f', closable: true, label: "", referenceElement: "refine-input-layer" }, h("span", { key: '2b3ea14d98fd5f699581fc2d3b1bad6b7c114f0e', class: "tooltip-message" }, this._translations.inputLayerTip)))), h("div", { key: '3a73cbd44600beca829f63939777be13ccd22fb3', class: "padding-1" }, h("div", { key: '6be9c1a327b1d8ca01f44884faf4ae6f509387da', class: "padding-bottom-1" }, h("calcite-segmented-control", { key: 'e2115941df58eac148aaf0f21022844ee1ec92a1', class: "w-100", width: "full" }, h("calcite-segmented-control-item", { key: 'f554b5def04c12fd529eadcdf34df2e702b72f14', checked: this._addEnabled, class: "w-50 word-wrap-anywhere", onClick: () => this._setSelectionMode(ESelectionMode.ADD), value: ESelectionMode.ADD }, h("span", { key: '4436d09c76c7e1baba359ebb04def82ea873b541', class: "font-weight-500" }, this._translations.add)), h("calcite-segmented-control-item", { key: '62e865762305dae22aa39fa9811e40649c4f6538', checked: !this._addEnabled, class: "w-50 word-wrap-anywhere", onClick: () => this._setSelectionMode(ESelectionMode.REMOVE), value: ESelectionMode.REMOVE }, h("span", { key: '7dc24184ac22a73d96f9894941dc1ef2628903f3', class: "font-weight-500" }, this._translations.remove)))), h("div", { key: 'd0830d20118aa73b3ddee7f92365fa8fb13c238f' }, h("map-draw-tools", { key: 'e956f1711607967919c3ede794f0e51e8e3f69d0', active: true, drawMode: EDrawMode.REFINE, mapView: this.mapView, onDrawRedo: () => this._redo(), onDrawUndo: () => this._undo(), onSketchGraphicsChange: (evt) => this._sketchGraphicsChanged(evt), pointSymbol: this.sketchPointSymbol, polygonSymbol: this.sketchPolygonSymbol, polylineSymbol: this.sketchLineSymbol, redoEnabled: this._refineSelectionSet?.redoStack.length > 0, ref: (el) => { this._drawTools = el; }, undoEnabled: this._refineSelectionSet?.undoStack.length > 0 })), h("br", { key: '6290a4690597648838ca68d347a827b42c6b75ff' }), (h("calcite-list", { key: '90a1b32598473fe55861bbce63d77f5481b88194', class: "list-border" }, this._getRefineSelectionSetList())))));
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * Set the user selected layer as the current refine layer
     *
     * @param evt contains the selected layer id
     *
     * @protected
     */
    _layerSelectionChange(evt) {
        const id = evt.detail[0];
        void this._setRefineSet(id);
    }
    /**
     * Store the current selection mode
     *
     * @param selectionMode the current selection mode ADD || REMOVE
     *
     * @protected
     */
    _setSelectionMode(selectionMode) {
        this._selectionMode = selectionMode;
    }
    /**
     * Select features based on the user drawn geometry
     *
     * @param evt ISketchGraphicsChange stores the new graphics and a boolean useOIDs
     * useOIDs is leveraged in some situations to use the feature OIDs rather than the graphic geometry
     *
     * @protected
     */
    _sketchGraphicsChanged(evt) {
        const geom = evt.detail?.graphics[0].geometry;
        void this._selectFeatures(geom);
    }
    /**
     * Get the layer ids for all layers in the selection sets
     *
     * @protected
     */
    _getEnabledLayerIds() {
        return this.selectionSets.reduce((prev, cur) => {
            const id = cur?.layerView?.layer.id;
            if (id && prev.indexOf(id) < 0) {
                prev.push(id);
            }
            else if (cur.workflowType === EWorkflowType.REFINE) {
                Object.keys(cur.refineInfos).forEach(k => {
                    if (prev.indexOf(k) < 0) {
                        prev.push(k);
                    }
                });
            }
            return prev;
        }, []);
    }
    /**
     * Set the refine layer...any adds or removes will be done against this layer
     *
     * @param id the id of the layer that should be used as the current refine layer
     *
     * @protected
     */
    async _setRefineSet(id) {
        if (!this.selectionSets.some((ss) => {
            if (ss.workflowType === EWorkflowType.REFINE) {
                this._refineSelectionSet = ss;
                return Object.keys(ss.refineInfos).indexOf(id) > -1;
            }
        })) {
            await this._initRefineSet(id, this._refineSelectionSet);
        }
        this._refineLayer = this._refineSelectionSet.refineInfos[id].layerView;
    }
    /**
     * Initialize the refine selection set
     *
     * @param id the layer id to use for the refine selection set
     * @param selectionSet the current refine selection set
     *
     * @protected
     */
    async _initRefineSet(id, selectionSet) {
        const refineInfo = {};
        refineInfo[id] = {
            addIds: [],
            removeIds: [],
            layerView: await getFeatureLayerView(this.mapView, id)
        };
        if (selectionSet) {
            selectionSet.refineInfos = { ...selectionSet.refineInfos, ...refineInfo };
        }
        else {
            this._refineSelectionSet = {
                id: Date.now(),
                searchResult: undefined,
                buffer: undefined,
                distance: 0,
                download: true,
                unit: "feet",
                label: "Refine",
                selectedIds: [],
                layerView: undefined,
                geometries: [],
                graphics: [],
                selectLayers: [],
                workflowType: EWorkflowType.REFINE,
                searchDistanceEnabled: false,
                useLayerFeaturesEnabled: false,
                refineInfos: refineInfo,
                redoStack: [],
                undoStack: [],
                sketchGraphic: undefined
            };
            this.selectionSets.push(this._refineSelectionSet);
        }
    }
    /**
     * Undo the most current ADD or REMOVE operation
     *
     * @returns Promise resolving when function is done
     *
     * @protected
     */
    _undo() {
        const undoOp = this._refineSelectionSet.undoStack.pop();
        void this._updateIds(undoOp.ids, undoOp.mode === ESelectionMode.ADD ? ESelectionMode.REMOVE : ESelectionMode.ADD, this._refineSelectionSet.redoStack, undoOp.layerView);
    }
    /**
     * Redo the most current ADD or REMOVE operation
     *
     * @returns Promise resolving when function is done
     *
     * @protected
     */
    _redo() {
        const redoOp = this._refineSelectionSet.redoStack.pop();
        void this._updateIds(redoOp.ids, redoOp.mode === ESelectionMode.ADD ? ESelectionMode.REMOVE : ESelectionMode.ADD, this._refineSelectionSet.undoStack, redoOp.layerView);
    }
    /**
     * Create a list to show the number added/removed/total unique selected
     *
     * @returns the list node
     * @protected
     */
    _getRefineSelectionSetList() {
        const total = this._getTotal(this.selectionSets);
        let refineSet;
        this.selectionSets.some(ss => {
            if (ss.workflowType === EWorkflowType.REFINE) {
                refineSet = ss;
                return true;
            }
        });
        let numAdded = 0;
        let numRemoved = 0;
        Object.keys(refineSet.refineInfos).forEach(k => {
            numAdded += refineSet.refineInfos[k].addIds.length;
            numRemoved += refineSet.refineInfos[k].removeIds.length;
        });
        return [(h("calcite-list-item", { label: this._translations.featuresAdded.replace("{{n}}", numAdded.toString()), "non-interactive": true })), (h("calcite-list-item", { label: this._translations.featuresRemoved.replace("{{n}}", numRemoved.toString()), "non-interactive": true })), (h("calcite-list-item", { label: this._translations.totalSelected.replace("{{n}}", total.toString()), "non-interactive": true }))];
    }
    /**
     * Get the total number od ids across all selection sets
     *
     * @returns the total number of ids
     * @protected
     */
    _getTotal(selectionSets) {
        const idSets = getIdSets(selectionSets);
        return Object.keys(idSets).reduce((prev, cur) => {
            const idSet = idSets[cur];
            prev += idSet.ids.length;
            return prev;
        }, 0);
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
    /**
     * Select features based on the input geometry
     *
     * @param geom the geometry used for selection
     *
     * @returns Promise resolving when function is done
     *
     * @protected
     */
    async _selectFeatures(geom) {
        this.selectionLoadingChange.emit(true);
        this._featuresCollection[this._refineLayer?.layer.id] = [];
        const response = await queryFeaturesByGeometry(0, this._refineLayer?.layer, geom, this._featuresCollection);
        this.selectionLoadingChange.emit(false);
        let graphics = [];
        Object.keys(response).forEach(k => {
            if (k === this._refineLayer?.layer.id) {
                graphics = graphics.concat(response[k]);
            }
        });
        const oids = Array.isArray(graphics) ? graphics.map(g => g.attributes[g?.layer?.objectIdField]) : [];
        await this._updateIds(oids, this._selectionMode, this._refineSelectionSet.undoStack, this._refineLayer);
        void this._drawTools.clear();
    }
    /**
     * Highlight any selected features in the map
     *
     * @returns Promise resolving when function is done
     * @protected
     */
    async _highlightFeatures() {
        this._clearHighlight();
        state.highlightHandles = await highlightAllFeatures(this.selectionSets);
    }
    /**
     * Clear any highlighted features in the map
     *
     * @protected
     */
    _clearHighlight() {
        state.removeHandles();
    }
    /**
     * Update the ids for any ADD or REMOVE operation and highlight the features.
     *
     * @param oids the ids to add or remove
     * @param mode ADD or REMOVE this will control if the ids are added or removed
     * @param operationStack the undo or redo stack to push the operation to
     * @param operationMode ADD or REMOVE the mode of the individual refine operation
     *
     * @returns Promise resolving when function is done
     *
     * @protected
     */
    async _updateIds(ids, mode, operationStack, layerView) {
        let selectionSetsChanged = false;
        const refineInfos = this._refineSelectionSet.refineInfos;
        const layerId = layerView.layer.id;
        const newRefineInfo = {};
        newRefineInfo[layerId] = {
            addIds: [],
            removeIds: [],
            layerView
        };
        const idUpdates = Object.keys(refineInfos).indexOf(layerId) > -1 ?
            refineInfos[layerId] : newRefineInfo[layerId];
        if (mode === ESelectionMode.ADD) {
            idUpdates.addIds = [...new Set([...ids, ...idUpdates.addIds])];
            if (idUpdates.addIds.length > 0) {
                operationStack.push({
                    ids,
                    mode,
                    layerView
                });
            }
            if (idUpdates.removeIds.length > 0) {
                idUpdates.removeIds = idUpdates.removeIds.filter(id => ids.indexOf(id) < 0);
            }
        }
        else {
            // ids are a result of the drawn geom...so it's possible they could contain ids that do
            // not exist in other selection sets
            const validIds = this.selectionSets.reduce((prev, cur) => {
                ids.forEach(id => {
                    if (cur.workflowType !== EWorkflowType.REFINE) {
                        if (cur.selectedIds.indexOf(id) > -1) {
                            prev.push(id);
                        }
                    }
                    else {
                        Object.keys(cur.refineInfos).some(k => {
                            const refineInfo = cur.refineInfos[k];
                            if (refineInfo.layerView.layer.id === layerView.layer.id && refineInfo.addIds.indexOf(id) > -1) {
                                prev.push(id);
                                return true;
                            }
                        });
                    }
                });
                return prev;
            }, []);
            idUpdates.removeIds = [...new Set([...validIds, ...idUpdates.removeIds])];
            idUpdates.addIds = idUpdates.addIds.filter(id => validIds.indexOf(id) < 0);
            if (idUpdates.removeIds.length > 0) {
                operationStack.push({
                    ids: validIds,
                    mode,
                    layerView
                });
            }
            this.selectionSets = this.selectionSets.reduce((prev, cur) => {
                if (cur.workflowType !== EWorkflowType.REFINE &&
                    cur.layerView.layer.id === layerView.layer.id) {
                    cur.selectedIds = cur.selectedIds.filter(id => idUpdates.removeIds.indexOf(id) < 0);
                    if (cur.selectedIds.length > 0) {
                        prev.push(cur);
                    }
                    else {
                        selectionSetsChanged = true;
                    }
                }
                else {
                    prev.push(cur);
                }
                return prev;
            }, []);
        }
        this._refineSelectionSet.refineInfos[layerId] = idUpdates;
        this.selectionSets = [...this.selectionSets];
        if (selectionSetsChanged) {
            this.selectionSetsChanged.emit(this.selectionSets);
        }
        await this._highlightFeatures();
    }
};
RefineSelection.style = RefineSelectionStyle0;

export { MapSelectTools as map_select_tools, PdfDownload as pdf_download, RefineSelection as refine_selection };
