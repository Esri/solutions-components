/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { l as loadModules } from './loadModules.js';
import { b as goToSelection, h as highlightFeatures, e as getFeatureLayerView } from './mapViewUtils.js';
import { e as queryObjectIds, g as getQueryGeoms, f as queryFeaturesByGeometry } from './queryUtils.js';
import { E as EWorkflowType } from './interfaces.js';
import { s as state } from './publicNotificationStore.js';
import { a as getComponentClosestLanguage, g as getLocaleComponentStrings } from './locale.js';
import { d as defineCustomElement$p } from './buffer-tools2.js';
import { d as defineCustomElement$o } from './action.js';
import { d as defineCustomElement$n } from './button.js';
import { d as defineCustomElement$m } from './chip.js';
import { d as defineCustomElement$l } from './combobox.js';
import { d as defineCustomElement$k } from './combobox-item.js';
import { d as defineCustomElement$j } from './dropdown.js';
import { d as defineCustomElement$i } from './dropdown-group.js';
import { d as defineCustomElement$h } from './dropdown-item.js';
import { d as defineCustomElement$g } from './graph.js';
import { d as defineCustomElement$f } from './icon.js';
import { d as defineCustomElement$e } from './input.js';
import { d as defineCustomElement$d } from './input-message.js';
import { d as defineCustomElement$c } from './label2.js';
import { d as defineCustomElement$b } from './loader.js';
import { d as defineCustomElement$a } from './notice.js';
import { d as defineCustomElement$9 } from './option.js';
import { d as defineCustomElement$8 } from './popover.js';
import { d as defineCustomElement$7 } from './progress.js';
import { d as defineCustomElement$6 } from './select.js';
import { d as defineCustomElement$5 } from './slider.js';
import { d as defineCustomElement$4 } from './switch.js';
import { d as defineCustomElement$3 } from './tooltip.js';
import { d as defineCustomElement$2 } from './map-draw-tools2.js';
import { d as defineCustomElement$1 } from './map-layer-picker2.js';

const mapSelectToolsCss = ":host{display:block}.div-visible{display:inherit}.div-visible-search{display:flex;height:44px;align-items:center;padding-bottom:0}.div-not-visible{display:none}.padding-bottom-1{padding-bottom:1rem}.padding-top-1{padding-top:1rem}.search-widget{width:100% !important;border:1px solid var(--calcite-color-border-input)}.w-100{width:100%}.w-50{width:50%}.search-distance-container{padding-top:\"1rem\" !important}.end-border{border-inline-end:1px solid var(--calcite-color-border-2)}.search-distance{display:flex;padding-top:1rem}.font-bold{font:bold}.border-bottom{border-bottom:1px solid var(--calcite-color-border-2)}.tooltip-container{display:flex}.padding-start-1-2{padding-inline-start:0.5rem}.icon{--calcite-color-icon-color:var(--calcite-color-brand)}.tooltip-message{padding:5px 8px;font-weight:var(--calcite-font-weight-normal);color:var(--calcite-color-text-2)}";

const MapSelectTools = /*@__PURE__*/ proxyCustomElement(class MapSelectTools extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.selectionSetChange = createEvent(this, "selectionSetChange", 7);
        /**
         * number[]: the oids of the selected features
         */
        this._selectedIds = [];
        /**
         * string: A label to help uniquely identify the selection set
         */
        this._selectionLabel = "";
        /**
         * esri/Graphic[]: https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html
         */
        this._graphics = [];
        /**
         * {<layer id>: Graphic[]}: Collection of graphics returned from queries to the layer
         */
        this._featuresCollection = {};
        this.bufferColor = [227, 139, 79, 0.8];
        this.bufferOutlineColor = [255, 255, 255];
        this.customLabelEnabled = undefined;
        this.enabledLayerIds = [];
        this.defaultBufferDistance = undefined;
        this.defaultBufferUnit = undefined;
        this.geometries = [];
        this.isUpdate = false;
        this.layerViews = [];
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
            distance: this._bufferTools.distance,
            download: true,
            unit: this._bufferTools.unit,
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
        await this._searchWidget.when(() => {
            var _a;
            this._searchWidget.allPlaceholder = ((_a = this.searchConfiguration) === null || _a === void 0 ? void 0 : _a.allPlaceholder) &&
                this.searchConfiguration.allPlaceholder.toLowerCase() !== "find address or place" ?
                this.searchConfiguration.allPlaceholder : this._translations.placeholder;
        });
    }
    /**
     * Renders the component.
     */
    render() {
        return (h(Host, null, this._getMapLayerPicker(), h("div", { class: "border-bottom" }), h("div", { class: "padding-top-sides-1" }, h("div", { class: "search-widget", ref: (el) => { this._searchElement = el; } }), h("div", { class: "padding-top-1" }, h("map-draw-tools", { active: true, editGraphicsEnabled: !this._useLayerFeaturesEnabled, graphics: this._graphics, mapView: this.mapView, onSketchGraphicsChange: (evt) => this._sketchGraphicsChanged(evt), pointSymbol: this.sketchPointSymbol, polygonSymbol: this.sketchPolygonSymbol, polylineSymbol: this.sketchLineSymbol, ref: (el) => { this._drawTools = el; } })), this._getBufferOptions(), this._getUseLayerFeaturesOptions(), this._getNumSelected()), h("div", { class: "border-bottom" }), this._getNameInput()));
    }
    /**
     * Renders the buffer tools component.
     */
    _getBufferOptions() {
        var _a, _b;
        const showBufferToolsClass = this._searchDistanceEnabled ? "search-distance" : "div-not-visible";
        const bufferDistance = typeof ((_a = this.selectionSet) === null || _a === void 0 ? void 0 : _a.distance) === "number" ? this.selectionSet.distance : this.defaultBufferDistance;
        return (h("div", null, h("div", { class: "padding-top-1 display-flex" }, h("calcite-label", { class: "label-margin-0 w-100", layout: "inline-space-between" }, h("div", { class: "tooltip-container" }, this._translations.searchDistance, h("calcite-icon", { class: "padding-start-1-2 icon", icon: "question", id: "search-distance-icon", scale: "s" }))), h("calcite-popover", { closable: true, label: "", referenceElement: "search-distance-icon" }, h("span", { class: "tooltip-message" }, this._translations.useSearchDistanceTootip)), h("calcite-switch", { checked: this._searchDistanceEnabled, onCalciteSwitchChange: () => this._searchDistanceEnabled = !this._searchDistanceEnabled })), h("div", { class: showBufferToolsClass }, h("buffer-tools", { disabled: !this._searchDistanceEnabled, distance: bufferDistance, geometries: this.geometries, onBufferComplete: (evt) => this._bufferComplete(evt), ref: (el) => this._bufferTools = el, unit: ((_b = this.selectionSet) === null || _b === void 0 ? void 0 : _b.unit) || this.defaultBufferUnit }))));
    }
    /**
     * Renders the map layer picker component.
     */
    _getUseLayerFeaturesOptions() {
        const useLayerFeaturesClass = this._useLayerFeaturesEnabled ? "div-visible" : "div-not-visible";
        return (h("div", null, h("div", { class: "padding-top-1 display-flex" }, h("calcite-label", { class: "label-margin-0 w-100", layout: "inline-space-between" }, h("div", { class: "tooltip-container" }, this._translations.useLayerFeatures, h("calcite-icon", { class: "padding-start-1-2 icon", icon: "question", id: "use-layer-features-icon", scale: "s" }))), h("calcite-popover", { closable: true, label: "", referenceElement: "use-layer-features-icon" }, h("span", { class: "tooltip-message" }, this._translations.useLayerFeaturesTooltip)), h("calcite-switch", { checked: this._useLayerFeaturesEnabled, onCalciteSwitchChange: () => { this._useLayerFeaturesEnabledChanged(); } })), h("div", { class: useLayerFeaturesClass + " padding-top-1" }, h("map-layer-picker", { enabledLayerIds: this.selectionLayerIds, mapView: this.mapView, onLayerSelectionChange: (evt) => { void this._layerSelectionChange(evt); }, selectedIds: this.layerViews.map(l => l.layer.id), showTables: false }))));
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
        return (h("div", { class: "display-flex padding-sides-1 padding-bottom-1" }, h("calcite-label", { class: "font-bold width-full label-margin-0" }, this._translations.inputLayer, h("map-layer-picker", { enabledLayerIds: this.enabledLayerIds, mapView: this.mapView, onLayerSelectionChange: (evt) => this._inputLayerSelectionChange(evt), selectedIds: this.selectLayerView ? [this.selectLayerView.layer.id] : this.selectionSet ? [this.selectionSet.layerView.layer.id] : [], showTables: false }))));
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
        var _a, _b, _c, _d;
        if (this.selectionSet) {
            this._searchTerm = (_a = this.selectionSet.searchResult) === null || _a === void 0 ? void 0 : _a.name;
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
                ...((_b = this.selectionSet) === null || _b === void 0 ? void 0 : _b.geometries) || []
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
            this._selectionLabel = (_c = this.selectionSet) === null || _c === void 0 ? void 0 : _c.label;
            if (!this._useLayerFeaturesEnabled) {
                (_d = this._drawTools) === null || _d === void 0 ? void 0 : _d.updateGraphics();
            }
            await goToSelection(this.selectionSet.selectedIds, this.selectionSet.layerView, this.mapView, false);
        }
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
            this._searchWidget.resultGraphicEnabled = false;
            this._searchWidget.on("search-clear", () => {
                const clearLabel = this._searchClearLabel();
                void this._clearResults(false, clearLabel);
            });
            this._searchWidget.on("select-result", (searchResults) => {
                var _a, _b;
                if (searchResults.result) {
                    this._searchResult = searchResults.result;
                    const useOIDs = ((_b = (_a = searchResults.source) === null || _a === void 0 ? void 0 : _a.layer) === null || _b === void 0 ? void 0 : _b.id) && searchResults.source.layer.id === this.selectLayerView.layer.id;
                    const oids = useOIDs ? [searchResults.result.feature.getObjectId()] : undefined;
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
        }
    }
    /**
     * Check if the current label should be cleared
     *
     * @returns true when the current label is based on search result
     * @protected
     */
    _searchClearLabel() {
        var _a;
        return ((_a = this._searchResult) === null || _a === void 0 ? void 0 : _a.name) && this._labelName.value.indexOf(this._searchResult.name) > -1;
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
        const title = this._translations.bufferLayer;
        const bufferIndex = this.mapView.map.layers.findIndex((l) => l.title === title);
        if (bufferIndex > -1) {
            this._bufferGraphicsLayer = this.mapView.map.layers.getItemAt(bufferIndex);
        }
        else {
            this._bufferGraphicsLayer = new this.GraphicsLayer({ title, listMode: "hide" });
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
                this._drawTools.updateGraphics();
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
                    var _a;
                    if ((_a = cur === null || cur === void 0 ? void 0 : cur.layer) === null || _a === void 0 ? void 0 : _a.objectIdField) {
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
        var _a;
        this._selectedIds = [];
        this._distance = undefined;
        this._unit = undefined;
        if (clearLabel) {
            this._selectionLabel = "";
            this._labelName.value = "";
        }
        if (this._bufferGraphicsLayer) {
            this._bufferGraphicsLayer.removeAll();
        }
        if (clearSearchWidget && this._searchWidget) {
            this._clearSearchWidget();
        }
        state.removeHandles();
        // checking for clear as it would throw off tests
        if ((_a = this._drawTools) === null || _a === void 0 ? void 0 : _a.clear) {
            this._graphics = [];
            await this._drawTools.clear();
        }
        this.selectionSetChange.emit(this._selectedIds.length);
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
        var _a, _b;
        const hasSketch = this._selectionLabel.indexOf(this._translations.sketch) > -1;
        const hasSelect = this._selectionLabel.indexOf(this._translations.select) > -1;
        const hasSearch = this._selectionLabel.indexOf((_a = this._searchResult) === null || _a === void 0 ? void 0 : _a.name) > -1;
        const label = this._workflowType === EWorkflowType.SEARCH ? (_b = this._searchResult) === null || _b === void 0 ? void 0 : _b.name :
            this._workflowType === EWorkflowType.SELECT ?
                this._translations.select : this._translations.sketch;
        const _unit = !this._unit ? this._bufferTools.unit : this._unit;
        const unit = await this._bufferTools.getTranslatedUnit(_unit);
        const distance = isNaN(this._distance) ? this._bufferTools.distance : this._distance;
        this._selectionLabel = hasSketch || hasSelect || hasSearch || !this._selectionLabel ?
            `${label} ${distance} ${unit}` : this._selectionLabel;
        this._labelName.value = this._selectionLabel;
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
        var _a;
        const id = ((_a = evt === null || evt === void 0 ? void 0 : evt.detail) === null || _a === void 0 ? void 0 : _a.length) > 0 ? evt.detail[0] : "";
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
                var _a;
                const geom = g.geometry;
                g.symbol = geom.type === "point" ?
                    this.sketchPointSymbol : geom.type === "polyline" ?
                    this.sketchLineSymbol : geom.type === "polygon" ?
                    this.sketchPolygonSymbol : undefined;
                hasOID = ((_a = g === null || g === void 0 ? void 0 : g.layer) === null || _a === void 0 ? void 0 : _a.hasOwnProperty("objectIdField")) || g.hasOwnProperty("getObjectId");
            });
            // OIDs are used when the addressee layer and the current "use layer features" layer are the same
            const useOIDs = (this.layerViews[0].layer.title === this.selectLayerView.layer.title) && hasOID;
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
    get el() { return this; }
    static get watchers() { return {
        "geometries": ["watchGeometriesHandler"],
        "searchConfiguration": ["watchSearchConfigurationHandler"]
    }; }
    static get style() { return mapSelectToolsCss; }
}, [0, "map-select-tools", {
        "bufferColor": [8, "buffer-color"],
        "bufferOutlineColor": [8, "buffer-outline-color"],
        "customLabelEnabled": [4, "custom-label-enabled"],
        "enabledLayerIds": [16],
        "defaultBufferDistance": [2, "default-buffer-distance"],
        "defaultBufferUnit": [1, "default-buffer-unit"],
        "geometries": [16],
        "isUpdate": [4, "is-update"],
        "layerViews": [16],
        "mapView": [16],
        "noResultText": [1, "no-result-text"],
        "searchConfiguration": [1040],
        "selectionSet": [16],
        "selectionLayerIds": [16],
        "selectLayerView": [16],
        "sketchLineSymbol": [16],
        "sketchPointSymbol": [16],
        "sketchPolygonSymbol": [16],
        "_numSelected": [32],
        "_searchDistanceEnabled": [32],
        "_searchTerm": [32],
        "_selectionLoading": [32],
        "_translations": [32],
        "_useLayerFeaturesEnabled": [32],
        "clearSelection": [64],
        "getSelection": [64]
    }, [[8, "searchConfigurationChange", "searchConfigurationChangeChanged"], [8, "distanceChanged", "distanceChanged"], [8, "unitChanged", "unitChanged"]], {
        "geometries": ["watchGeometriesHandler"],
        "searchConfiguration": ["watchSearchConfigurationHandler"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["map-select-tools", "buffer-tools", "calcite-action", "calcite-button", "calcite-chip", "calcite-combobox", "calcite-combobox-item", "calcite-dropdown", "calcite-dropdown-group", "calcite-dropdown-item", "calcite-graph", "calcite-icon", "calcite-input", "calcite-input-message", "calcite-label", "calcite-loader", "calcite-notice", "calcite-option", "calcite-popover", "calcite-progress", "calcite-select", "calcite-slider", "calcite-switch", "calcite-tooltip", "map-draw-tools", "map-layer-picker"];
    components.forEach(tagName => { switch (tagName) {
        case "map-select-tools":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, MapSelectTools);
            }
            break;
        case "buffer-tools":
            if (!customElements.get(tagName)) {
                defineCustomElement$p();
            }
            break;
        case "calcite-action":
            if (!customElements.get(tagName)) {
                defineCustomElement$o();
            }
            break;
        case "calcite-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$n();
            }
            break;
        case "calcite-chip":
            if (!customElements.get(tagName)) {
                defineCustomElement$m();
            }
            break;
        case "calcite-combobox":
            if (!customElements.get(tagName)) {
                defineCustomElement$l();
            }
            break;
        case "calcite-combobox-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$k();
            }
            break;
        case "calcite-dropdown":
            if (!customElements.get(tagName)) {
                defineCustomElement$j();
            }
            break;
        case "calcite-dropdown-group":
            if (!customElements.get(tagName)) {
                defineCustomElement$i();
            }
            break;
        case "calcite-dropdown-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$h();
            }
            break;
        case "calcite-graph":
            if (!customElements.get(tagName)) {
                defineCustomElement$g();
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$f();
            }
            break;
        case "calcite-input":
            if (!customElements.get(tagName)) {
                defineCustomElement$e();
            }
            break;
        case "calcite-input-message":
            if (!customElements.get(tagName)) {
                defineCustomElement$d();
            }
            break;
        case "calcite-label":
            if (!customElements.get(tagName)) {
                defineCustomElement$c();
            }
            break;
        case "calcite-loader":
            if (!customElements.get(tagName)) {
                defineCustomElement$b();
            }
            break;
        case "calcite-notice":
            if (!customElements.get(tagName)) {
                defineCustomElement$a();
            }
            break;
        case "calcite-option":
            if (!customElements.get(tagName)) {
                defineCustomElement$9();
            }
            break;
        case "calcite-popover":
            if (!customElements.get(tagName)) {
                defineCustomElement$8();
            }
            break;
        case "calcite-progress":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "calcite-select":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "calcite-slider":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "calcite-switch":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "calcite-tooltip":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "map-draw-tools":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "map-layer-picker":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { MapSelectTools as M, defineCustomElement as d };
