/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5a0af791.js');
const locale = require('./locale-a09603ee.js');
require('./esri-loader-08dc41bd.js');
require('./_commonjsHelpers-baf43783.js');

const basemapGalleryCss = ":host{display:block}";
const BasemapGalleryStyle0 = basemapGalleryCss;

const BasemapGallery = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.mapView = undefined;
        this.basemapConfig = undefined;
        this.basemapWidget = undefined;
    }
    get el() { return index.getElement(this); }
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
    /**
     * esri/widgets/BasemapGallery: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-BasemapGallery.html
     *
     * BasemapGallery constructor
     */
    BasemapGallery;
    /**
     * esri/widgets/BasemapGallery/support/PortalBasemapsSource: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-BasemapGallery-support-PortalBasemapsSource.html
     *
     * PortalBasemapsSource constructor
     */
    PortalBasemapsSource;
    /**
     * HTMLElement: The container div for the basemap gallery widget
     */
    _basemapElement;
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    async mapViewWatchHandler() {
        await this.mapView.when(() => {
            void this._initBaseMapGallery(this.mapView);
        });
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
     */
    async componentWillLoad() {
        return this._initModules();
    }
    /**
     * StencilJS: Renders the component.
     */
    render() {
        return (index.h(index.Host, { key: '7fe5ef48d77de087f17498e2e1f3370a069e8629' }, index.h("div", { key: 'aca555c687352046a138343cab6f656234069644', ref: (el) => { this._basemapElement = el; } })));
    }
    /**
     * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
     */
    async componentDidLoad() {
        if (this.mapView) {
            await this.mapViewWatchHandler();
        }
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
        const [BasemapGallery, PortalBasemapsSource] = await locale.loadModules([
            "esri/widgets/BasemapGallery",
            "esri/widgets/BasemapGallery/support/PortalBasemapsSource"
        ]);
        this.BasemapGallery = BasemapGallery;
        this.PortalBasemapsSource = PortalBasemapsSource;
    }
    /**
     * Initialize the basemap gallery or reset the current view if it already exists
     *
     * @protected
     */
    async _initBaseMapGallery(view) {
        if (this.BasemapGallery) {
            if (this.basemapWidget) {
                this.basemapWidget.destroy();
            }
            const source = new this.PortalBasemapsSource({
                query: this.basemapConfig?.basemapGroupId ? `id:${this.basemapConfig.basemapGroupId}` : null,
                filterFunction: this.basemapConfig ? (basemap) => {
                    return !this.basemapConfig.basemapIdsToFilter.includes(basemap.portalItem.id);
                } : () => true
            });
            await source.refresh();
            this.basemapWidget = new this.BasemapGallery({
                container: this._basemapElement,
                view,
                source
            });
        }
    }
    static get watchers() { return {
        "mapView": ["mapViewWatchHandler"]
    }; }
};
BasemapGallery.style = BasemapGalleryStyle0;

const floorFilterCss = ":host{display:block}";
const FloorFilterStyle0 = floorFilterCss;

const FloorFilter = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.facilityChanged = index.createEvent(this, "facilityChanged", 7);
        this.levelChanged = index.createEvent(this, "levelChanged", 7);
        this.siteChanged = index.createEvent(this, "siteChanged", 7);
        this.enabled = undefined;
        this.floorFilterWidget = undefined;
        this.mapView = undefined;
    }
    get el() { return index.getElement(this); }
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
    /**
     * esri/widgets/FloorFilter: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-FloorFilter.html
     *
     * FloorFilter constructor
     */
    FloorFilter;
    /**
     * HTMLElement: The container div for the floor filter widget
     */
    _floorFilterElement;
    /**
     * esri/core/reactiveUtils: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-reactiveUtils.html
     */
    reactiveUtils;
    /**
     * esri/core/Accessor: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Accessor.html#WatchHandle
     */
    _facilityHandle;
    /**
     * esri/core/Accessor: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Accessor.html#WatchHandle
     */
    _levelHandle;
    /**
     * esri/core/Accessor: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Accessor.html#WatchHandle
     */
    _siteHandle;
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    /**
     * Watch for changes to the mapView and re-init the floor filter
     */
    async mapViewWatchHandler() {
        await this._initFloorFilter(this.mapView);
    }
    /**
     * Watch for changes to the enabled property and re-init or destroy the floor filter
     */
    async enabledWatchHandler() {
        if (this.enabled) {
            await this._initFloorFilter(this.mapView);
        }
        else if (!this.enabled) {
            this._destroyWidget();
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
    /**
     * Emitted on demand when the Facility is changed
     */
    facilityChanged;
    /**
     * Emitted on demand when the Level is changed
     */
    levelChanged;
    /**
     * Emitted on demand when the Site is changed
     */
    siteChanged;
    //--------------------------------------------------------------------------
    //
    //  Functions (lifecycle)
    //
    //--------------------------------------------------------------------------
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     */
    async componentWillLoad() {
        return this._initModules();
    }
    /**
     * Renders the component.
     */
    render() {
        return (index.h(index.Host, { key: '8c59ed98841f476670392c6ebd9dc764d72f4733' }, index.h("div", { key: 'b2400febc768a595dbcc6933af1565da173d97f5', ref: (el) => { this._floorFilterElement = el; } })));
    }
    /**
     * StencilJS: Called once just after the component is first loaded.
     */
    async componentDidLoad() {
        if (this.mapView && !this.floorFilterWidget) {
            await this._initFloorFilter(this.mapView);
        }
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
        const [FloorFilter, reactiveUtils] = await locale.loadModules([
            "esri/widgets/FloorFilter",
            "esri/core/reactiveUtils"
        ]);
        this.FloorFilter = FloorFilter;
        this.reactiveUtils = reactiveUtils;
    }
    /**
     * Destroy the widget and remove the containing element if it exists
     *
     * @protected
     */
    _destroyWidget() {
        if (this.floorFilterWidget) {
            this.floorFilterWidget.destroy();
            this.floorFilterWidget = undefined;
        }
        if (this._floorFilterElement) {
            this._floorFilterElement.remove();
        }
    }
    /**
     * Destroy the widget and remove the containing element then re-create the container element
     *
     * @protected
     */
    _initContainer() {
        this._destroyWidget();
        this._floorFilterElement = document.createElement("div");
    }
    /**
     * Initialize the floor filter or reset the current view if it already exists
     */
    async _initFloorFilter(view) {
        const webMap = view?.map;
        await webMap.when(() => {
            if (view && this.enabled && this.FloorFilter && webMap?.floorInfo) {
                this._initContainer();
                this.floorFilterWidget = new this.FloorFilter({
                    container: this._floorFilterElement,
                    view
                });
                this._facilityHandle?.remove();
                this._facilityHandle = this.reactiveUtils.watch(() => this.floorFilterWidget.facility, (facility) => {
                    this.facilityChanged.emit(facility);
                });
                this._levelHandle?.remove();
                this._levelHandle = this.reactiveUtils.watch(() => this.floorFilterWidget.level, (level) => {
                    this.levelChanged.emit(level);
                });
                this._siteHandle?.remove();
                this._siteHandle = this.reactiveUtils.watch(() => this.floorFilterWidget.site, (site) => {
                    this.siteChanged.emit(site);
                });
            }
        });
    }
    static get watchers() { return {
        "mapView": ["mapViewWatchHandler"],
        "enabled": ["enabledWatchHandler"]
    }; }
};
FloorFilter.style = FloorFilterStyle0;

const mapFullscreenCss = ":host{display:block}";
const MapFullscreenStyle0 = mapFullscreenCss;

const MapFullscreen = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.fullscreenStateChange = index.createEvent(this, "fullscreenStateChange", 7);
        this.mapView = undefined;
        this.fullscreenWidget = undefined;
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
    /**
     * esri/widgets/Fullscreen: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Fullscreen.html
     */
    Fullscreen;
    /**
     * HTMLElement: The container div for the Fullscreen widget
     */
    _fullscreenElement;
    /**
     * esri/core/Accessor: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Accessor.html#WatchHandle
     */
    _fullscreenStateChangeHandle;
    /**
     * esri/core/reactiveUtils: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-reactiveUtils.html
     */
    reactiveUtils;
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    /**
     * Called each time the mapView prop is changed.
     *
     * @returns Promise when complete
     */
    async mapViewWatchHandler() {
        await this.mapView.when(async () => {
            await this._initFullscreenWidget();
        });
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
    /**
     * Emitted on demand when the fullscreen widget state has changed
     */
    fullscreenStateChange;
    //--------------------------------------------------------------------------
    //
    //  Functions (lifecycle)
    //
    //--------------------------------------------------------------------------
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     */
    async componentWillLoad() {
        await this._initModules();
    }
    /**
     * Renders the component.
     */
    render() {
        return (index.h(index.Host, { key: '57cf43d121435c4db3c4847bb909ee77986d2f39' }, index.h("div", { key: 'e748dbb1924d588d3aa3cef1cfc7d9524a08ff1e', class: "fullscreen-widget", ref: (el) => { this._fullscreenElement = el; } })));
    }
    /**
     * StencilJS: Called just after the component updates.
     * It's never called during the first render().
     */
    async componentDidUpdate() {
        await this._initFullscreenWidget();
    }
    /**
     * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
     */
    async componentDidLoad() {
        await this._initFullscreenWidget();
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
        const [Fullscreen, reactiveUtils] = await locale.loadModules([
            "esri/widgets/Fullscreen",
            "esri/core/reactiveUtils"
        ]);
        this.Fullscreen = Fullscreen;
        this.reactiveUtils = reactiveUtils;
    }
    /**
     * Initialize the search widget
     *
     * @protected
     */
    async _initFullscreenWidget() {
        if (this.mapView && this._fullscreenElement && !this.fullscreenWidget) {
            this.fullscreenWidget = new this.Fullscreen({
                view: this.mapView
            });
            await this.fullscreenWidget.when(() => {
                if (this._fullscreenStateChangeHandle) {
                    this._fullscreenStateChangeHandle.remove();
                }
                this._fullscreenStateChangeHandle = this.reactiveUtils.watch(() => this.fullscreenWidget.viewModel.state, (state) => this.fullscreenStateChange.emit(state));
            });
        }
        else if (this.fullscreenWidget) {
            this.fullscreenWidget.view = this.mapView;
        }
    }
    static get watchers() { return {
        "mapView": ["mapViewWatchHandler"]
    }; }
};
MapFullscreen.style = MapFullscreenStyle0;

const mapLegendCss = ":host{display:block}";
const MapLegendStyle0 = mapLegendCss;

const MapLegend = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.mapView = undefined;
        this.legendWidget = undefined;
    }
    get el() { return index.getElement(this); }
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
    /**
     * esri/widgets/Legend: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Legend.html
     *
     * Legend constructor
     */
    Legend;
    /**
     * HTMLElement: The container div for the basemap gallery widget
     */
    _legendElement;
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    async mapViewWatchHandler() {
        await this.mapView.when(() => {
            this._initLegend(this.mapView);
        });
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
     */
    async componentWillLoad() {
        return this._initModules();
    }
    /**
     * StencilJS: Renders the component.
     */
    render() {
        return (index.h(index.Host, { key: '32e729a3a7b4989ced535b78b5ca4aa38b9dcc71' }, index.h("div", { key: '87a583eaad85b2b163a6f7349e65f00d5a29d0b7', ref: (el) => { this._legendElement = el; } })));
    }
    /**
     * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
     */
    async componentDidLoad() {
        if (this.mapView) {
            await this.mapViewWatchHandler();
        }
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
        const [Legend] = await locale.loadModules([
            "esri/widgets/Legend"
        ]);
        this.Legend = Legend;
    }
    /**
     * Initialize the basemap gallery or reset the current view if it already exists
     */
    _initLegend(view) {
        if (view && this.Legend) {
            if (!this.legendWidget) {
                this.legendWidget = new this.Legend({
                    container: this._legendElement,
                    view
                });
            }
            else {
                this.legendWidget.view = view;
            }
        }
    }
    static get watchers() { return {
        "mapView": ["mapViewWatchHandler"]
    }; }
};
MapLegend.style = MapLegendStyle0;

const mapPickerCss = ":host{display:block;--solutions-theme-foreground-color:var(--calcite-color-foreground-1)}.width-full{width:100%}.width-25{width:25% !important}.height-full{height:100%}.display-flex{display:flex}.border-bottom-1{border-width:0px;border-bottom-width:1px;border-style:solid;border-color:var(--calcite-color-border-3)}.border-right{border-right:1px solid var(--calcite-color-border-3)}.action-bar-size{height:51px;width:100%}.map-list{position:absolute;display:flex;flex-direction:column;overflow:hidden;animation:calcite-scrim-fade-in var(--calcite-internal-animation-timing-medium) ease-in-out;background-color:var(--calcite-color-background);z-index:1000;width:100%;height:-moz-fit-content;height:fit-content}.display-none{display:none}.align-center{align-items:center}";
const MapPickerStyle0 = mapPickerCss;

const MapPicker = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.mapInfoChange = index.createEvent(this, "mapInfoChange", 7);
        this.mapInfos = [];
        this.isMapLayout = undefined;
        this._mapListExpanded = false;
        this._translations = undefined;
        this._webMapInfo = undefined;
    }
    get el() { return index.getElement(this); }
    //--------------------------------------------------------------------------
    //
    //  Properties (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * HTMLCalciteListElement: this list of map names
     */
    _list;
    /**
     * string: the id of map currently displayed
     */
    _loadedId = "";
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    /**
     * Called each time the _webMapInfo prop is changed.
     */
    _webMapInfoWatchHandler(v, oldV) {
        if (v && JSON.stringify(v) !== JSON.stringify(oldV)) {
            this._loadedId = v?.id;
            this.mapInfoChange.emit(v);
        }
    }
    /**
     * Called each time the mapInfos prop is changed.
     */
    async mapInfosWatchHandler(v, oldV) {
        if (v && JSON.stringify(v) !== JSON.stringify(oldV)) {
            this._webMapSelected(v[0]);
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Methods (public)
    //
    //--------------------------------------------------------------------------
    async setMapByID(id) {
        const mapInfos = this.mapInfos?.filter(i => i.id === id);
        if (id && mapInfos?.length > 0) {
            this._webMapSelected(mapInfos[0]);
        }
    }
    /**
     * Closes the list
     */
    async close() {
        if (this._mapListExpanded) {
            this._mapListExpanded = false;
        }
    }
    /**
     * Expands the list
     */
    async toggle(mapListExpanded) {
        this._mapListExpanded = mapListExpanded;
    }
    //--------------------------------------------------------------------------
    //
    //  Events (public)
    //
    //--------------------------------------------------------------------------
    /**
     * Emitted when a new map is loaded
     */
    mapInfoChange;
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
     * Renders the component.
     */
    render() {
        return (index.h(index.Host, { key: 'd9ee2182be2b3fbec5235e814d4929fa4d23a234' }, this._getToolbar(), this._getMapNameList(this._mapListExpanded)));
    }
    /**
     * Called once after the component has loaded
     */
    async componentDidLoad() {
        const webMapInfo = this.mapInfos && this.mapInfos.length > 0 ? this.mapInfos[0] : undefined;
        if (webMapInfo) {
            this._webMapSelected(webMapInfo);
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * Get a calcite action group for the map list
     * Actions do not support multiple icons so this uses a block
     *
     * @returns the dom node for the action group
     *
     * @protected
     */
    _getMapPicker() {
        const id = "map-picker-expand-toggle";
        const mapListIcon = this._mapListExpanded ? "chevron-up" : "chevron-down";
        return (index.h("div", { class: "width-full" }, index.h("calcite-button", { alignment: "icon-end-space-between", appearance: "transparent", class: "width-full height-full", iconEnd: mapListIcon, id: id, kind: "neutral", onClick: () => this._chooseMap(), width: "full" }, this._webMapInfo?.name), index.h("calcite-tooltip", { label: "", placement: "bottom", "reference-element": id }, index.h("span", null, this._translations.switchMap))));
    }
    /**
     * Create the toolbar (controls used for map and app interactions)
     *
     * @returns The dom node with the toolbar
     *
     * @protected
     */
    _getToolbar() {
        return (index.h("div", { class: "display-flex border-right" }, index.h("calcite-action-bar", { class: "border-bottom-1 action-bar-size", "expand-disabled": true, layout: "horizontal", slot: "header" }, this._getMapPicker())));
    }
    /**
     * Get a pick list for all maps in mapInfos
     *
     * @param show boolean to indicate if the list should be shown or hidden
     *
     * @returns the dom node for the list of maps
     *
     * @protected
     */
    _getMapNameList(show) {
        const width = this.isMapLayout ? "width-25" : "width-full";
        const listClass = show ? `map-list border-bottom-1 ${width}` : "display-none";
        return (index.h("div", { class: listClass }, index.h("calcite-list", { id: "mapList", ref: (el) => this._list = el, selectionAppearance: "border", selectionMode: "single" }, this.mapInfos.map(mapInfo => {
            return (index.h("calcite-list-item", { label: mapInfo.name, onClick: () => this._webMapSelected(mapInfo), selected: mapInfo.id === this._loadedId, value: mapInfo.id }));
        }))));
    }
    /**
     * Fired when the user clicks on the map list
     *
     * @param webMapInfo the web map id and name selected from the list
     */
    _webMapSelected(webMapInfo) {
        this._mapListExpanded = false;
        this._webMapInfo = webMapInfo;
    }
    /**
     * Toggles the open/close state of the map list
     *
     * @returns the dom node for the action group
     *
     * @protected
     */
    _chooseMap() {
        this._mapListExpanded = !this._mapListExpanded;
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
    static get watchers() { return {
        "_webMapInfo": ["_webMapInfoWatchHandler"],
        "mapInfos": ["mapInfosWatchHandler"]
    }; }
};
MapPicker.style = MapPickerStyle0;

const mapSearchCss = ":host{display:block}.search-widget{width:100% !important;border:1px solid var(--calcite-color-border-input)}";
const MapSearchStyle0 = mapSearchCss;

const MapSearch = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.mapView = undefined;
        this.popupEnabled = false;
        this.resultGraphicEnabled = false;
        this.searchConfiguration = undefined;
        this.searchTerm = undefined;
        this.searchWidget = undefined;
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
    /**
     * esri/layers/FeatureLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html
     */
    FeatureLayer;
    /**
     * esri/widgets/Search: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html
     */
    Search;
    /**
     * HTMLElement: The container div for the search widget
     */
    _searchElement;
    /**
     * An array of objects representing the results of search
     */
    _searchResult;
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    /**
     * Called each time the searchConfiguration prop is changed.
     *
     * @returns Promise when complete
     */
    async watchSearchConfigurationHandler() {
        this._initSearchWidget();
    }
    /**
     * Called each time the mapView prop is changed.
     *
     * @returns Promise when complete
     */
    async mapViewWatchHandler() {
        await this.mapView.when(() => {
            this._initSearchWidget();
        });
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
     */
    async componentWillLoad() {
        await this._initModules();
    }
    /**
     * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
     */
    async componentDidLoad() {
        return this._initSearchWidget();
    }
    /**
     * Renders the component.
     */
    render() {
        return (index.h(index.Host, { key: '0c34af04212bf27998363a55afbfe76f57124a93' }, index.h("div", { key: '2bec13054279a3ca132056269a71356c542354ef', class: "search-widget", ref: (el) => { this._searchElement = el; } })));
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
        const [Search, FeatureLayer] = await locale.loadModules([
            "esri/widgets/Search",
            "esri/layers/FeatureLayer"
        ]);
        this.Search = Search;
        this.FeatureLayer = FeatureLayer;
    }
    /**
     * Initialize the search widget
     *
     * @protected
     */
    _initSearchWidget() {
        if (this.mapView && this._searchElement && !this.searchWidget) {
            let searchOptions = {
                view: this.mapView,
                container: this._searchElement,
                searchTerm: this.searchTerm
            };
            if (this.searchConfiguration) {
                const searchConfiguration = this._getSearchConfig(this.searchConfiguration, this.mapView);
                searchOptions = {
                    ...searchConfiguration
                };
            }
            this.searchWidget = new this.Search(searchOptions);
            this.searchWidget.popupEnabled = this.popupEnabled;
            this.searchWidget.resultGraphicEnabled = this.resultGraphicEnabled;
        }
        else {
            if (this.searchWidget) {
                this.searchWidget.view = this.mapView;
            }
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
        const sources = searchConfiguration.sources;
        if (sources?.length > 0) {
            searchConfiguration[INCLUDE_DEFAULT_SOURCES] = false;
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
    static get watchers() { return {
        "searchConfiguration": ["watchSearchConfigurationHandler"],
        "mapView": ["mapViewWatchHandler"]
    }; }
};
MapSearch.style = MapSearchStyle0;

const mapToolsCss = ":host{display:block}.display-none{display:none}.margin-top-1-2{margin-top:0.5rem}.square-32{width:32px;height:32px}.square-40{width:40px;height:40px}.square-48{width:48px;height:48px}.width-40{width:40px}.square-40-41{width:40px;height:41px}.border-bottom{border-bottom:1px solid var(--calcite-color-border-3)}.box-shadow{box-shadow:0 1px 2px rgba(0, 0, 0, 0.3)}.margin-bottom-1-2{margin-bottom:0.5rem}";
const MapToolsStyle0 = mapToolsCss;

const MapTools = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.basemapConfig = undefined;
        this.enableLegend = undefined;
        this.enableFloorFilter = undefined;
        this.enableFullscreen = undefined;
        this.enableSearch = undefined;
        this.enableBasemap = undefined;
        this.enableHome = undefined;
        this.enableSingleExpand = undefined;
        this.homeZoomToolsSize = "m";
        this.layout = "vertical";
        this.mapView = undefined;
        this.mapWidgetsSize = "m";
        this.position = "top-right";
        this.searchConfiguration = undefined;
        this.stackTools = true;
        this.toolOrder = undefined;
        this._hasFloorInfo = false;
        this._translations = undefined;
        this._showTools = true;
        this._showBasemapWidget = false;
        this._showFloorFilter = false;
        this._showFullscreen = false;
        this._showLegendWidget = false;
        this._showSearchWidget = false;
    }
    get el() { return index.getElement(this); }
    //--------------------------------------------------------------------------
    //
    //  Properties (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * esri/widgets/Expand: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Expand.html
     */
    Expand;
    /**
     * HTMLMapSearchElement: The search element node
     */
    _basemapElement;
    /**
     * HTMLFloorFilterElement: The floor filter element node
     */
    _floorFilterElement;
    /**
     * HTMLMapFullscreenElement: The fullscreen element node
     */
    _fullscreenElement;
    /**
     * HTMLLegendElement: The legend element node
     */
    _legendElement;
    /**
     * HTMLMapSearchElement: The search element node
     */
    _searchElement;
    /**
     * string[]: List of widget names that have been added to the UI
     * This prop is only used when enableSingleExpand is false
     */
    _widgets = [];
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    /**
     * When the mapView loads check if it supports floor awareness
     */
    async mapViewWatchHandler() {
        await this.mapView.when(() => {
            this._hasFloorInfo = this.mapView?.map?.floorInfo;
        });
    }
    /**
     * When the _showBasemapWidget property is true display the basemap gallery
     */
    async _showBasemapWidgetWatchHandler(v) {
        if (v) {
            this.mapView.ui.add(this._basemapElement.basemapWidget, {
                position: this.position,
                index: 1
            });
        }
        else {
            this.mapView.ui.remove(this._basemapElement.basemapWidget);
        }
    }
    /**
     * When the _showBasemapWidget property is true display the basemap gallery
     */
    async _showFloorFilterWatchHandler(v) {
        const widget = this._floorFilterElement.floorFilterWidget;
        if (v) {
            this.mapView.ui.add(widget, {
                position: this.position,
                index: 1
            });
        }
        else {
            this.mapView.ui.remove(widget);
        }
    }
    /**
     * When the _showFullscreen property is true the app will consume the full screen
     */
    async _showFullscreenWatchHandler(v) {
        const fs = this._fullscreenElement.fullscreenWidget;
        if (v) {
            if (fs.viewModel.state === "ready") {
                fs.viewModel.enter();
            }
        }
        else {
            if (fs.viewModel.state === "active") {
                fs.viewModel.exit();
            }
        }
    }
    /**
     * When the _showLegendWidget property is true display the search widget
     */
    async _showLegendWidgetWatchHandler(v) {
        if (v) {
            this.mapView.ui.add(this._legendElement.legendWidget, {
                position: this.position,
                index: 1
            });
        }
        else {
            this.mapView.ui.remove(this._legendElement.legendWidget);
        }
    }
    /**
     * When the _showSearchWidget property is true display the search widget
     */
    async _showSearchWidgetWatchHandler(v) {
        if (v) {
            this.mapView.ui.add(this._searchElement.searchWidget, {
                position: this.position,
                index: 1
            });
        }
        else {
            this.mapView.ui.remove(this._searchElement.searchWidget);
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
     */
    async componentWillLoad() {
        await this._getTranslations();
        await this._initModules();
    }
    /**
     * StencilJS: Renders the component.
     */
    render() {
        this._setZoomToolsSize();
        const toggleIcon = this._showTools ? "chevrons-up" : "chevrons-down";
        const toolsClass = this._showTools ? "" : "display-none";
        const searchClass = this._showSearchWidget ? "" : "display-none";
        const basemapClass = this._showBasemapWidget ? "" : "display-none";
        const legendClass = this._showLegendWidget ? "" : "display-none";
        const floorFilterClass = this._showFloorFilter ? "" : "display-none";
        const fullscreenClass = this._showFullscreen ? "" : "display-none";
        const expandTip = this._showTools ? this._translations.collapse : this._translations.expand;
        const containerClass = !this.enableBasemap && !this.enableFullscreen && !this.enableLegend && !this.enableSearch ? "display-none" : "";
        const toolMarginClass = this.enableSingleExpand ? "margin-top-1-2" : "";
        const toolOrder = this.toolOrder ? this.toolOrder : ["legend", "search", "fullscreen", "floorfilter"];
        const shadowClass = this.stackTools ? "box-shadow" : "";
        return (index.h(index.Host, { key: 'd4774c7ae6c327804d092b4b81f7e3523820726d' }, index.h("div", { key: '35363080c21040b94276b4362632dc2d46c8eb58', class: containerClass }, this.enableSingleExpand ? (index.h("div", { class: "box-shadow" }, this._getActionGroup(toggleIcon, false, expandTip, () => this._toggleTools()))) : undefined, index.h("div", { key: 'd7e547203dfd373e031f424499af9b15193ee76c', class: `${toolMarginClass} ${shadowClass} ${toolsClass}` }, this._getMapWidgets(toolOrder))), index.h("basemap-gallery", { key: '7518c0e1378bf2343f681677d849535a2ae363ab', basemapConfig: this.basemapConfig, class: basemapClass, mapView: this.mapView, ref: (el) => { this._basemapElement = el; } }), index.h("map-search", { key: '0c0d5497546a8ab8afd4169134c7689f964bcf65', class: searchClass, mapView: this.mapView, ref: (el) => { this._searchElement = el; }, resultGraphicEnabled: true, searchConfiguration: this.searchConfiguration }), index.h("map-legend", { key: 'cf29e237446037731a2b4214634cb7aa3102f6d1', class: legendClass, mapView: this.mapView, ref: (el) => { this._legendElement = el; } }), index.h("map-fullscreen", { key: '3dbc331ed548e13e86cfbc916439b7cf09bb5f10', class: fullscreenClass, mapView: this.mapView, onFullscreenStateChange: (evt) => this._fullscreenStateChange(evt.detail), ref: (el) => { this._fullscreenElement = el; } }), index.h("floor-filter", { key: '2738d4f1dda01ffb4f71708fdac76be82f36e037', class: floorFilterClass, enabled: this.enableFloorFilter, mapView: this.mapView, ref: (el) => { this._floorFilterElement = el; } })));
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
        const [Expand] = await locale.loadModules([
            "esri/widgets/Expand"
        ]);
        this.Expand = Expand;
    }
    /**
     * Set the size of the zoom tools based on the user defined homeZoomToolsSize variable.
     *
     * @protected
     */
    _setZoomToolsSize() {
        const zoomIn = document.getElementsByClassName("esri-zoom")[0]?.children[0];
        const zoomOut = document.getElementsByClassName("esri-zoom")[0]?.children[1];
        if (zoomIn && zoomOut) {
            const size = this.homeZoomToolsSize === "s" ? "32px" : this.homeZoomToolsSize === "m" ? "40px" : "48px";
            zoomIn.style.width = size;
            zoomIn.style.height = size;
            zoomOut.style.width = size;
            zoomOut.style.height = size;
        }
    }
    /**
     * Get the map widgets considering the user defined enabled values and tool order
     *
     * @protected
     */
    _getMapWidgets(toolOrder) {
        const fullscreenIcon = this._showFullscreen ? "full-screen-exit" : "full-screen";
        const fullscreenTip = this._showFullscreen ? this._translations.exitFullscreen : this._translations.enterFullscreen;
        return toolOrder.map(t => {
            switch (t) {
                case "legend":
                    return this.enableLegend && this.enableSingleExpand ?
                        this._getActionGroup("legend", false, this._translations.legend, () => this._showLegend()) :
                        this.enableLegend ? this._getWidget(t, this._legendElement?.legendWidget, true) : undefined;
                case "search":
                    return this.enableSearch && this.enableSingleExpand ?
                        this._getActionGroup("magnifying-glass", false, this._translations.search, () => this._search()) :
                        this.enableSearch ? this._getWidget(t, this._searchElement?.searchWidget, true) : undefined;
                case "fullscreen":
                    return this.enableFullscreen && this.enableSingleExpand ?
                        this._getActionGroup(fullscreenIcon, false, fullscreenTip, () => this._expand()) :
                        this.enableFullscreen ? this._getWidget(t, this._fullscreenElement?.fullscreenWidget, false) : undefined;
                case "basemap":
                    return this.enableBasemap && this.enableSingleExpand ?
                        this._getActionGroup("basemap", false, this._translations.basemap, () => this._toggleBasemapPicker()) :
                        this.enableBasemap ? this._getWidget(t, this._basemapElement?.basemapWidget, true) : undefined;
                case "floorfilter":
                    return this.enableFloorFilter && this._hasFloorInfo && this.enableSingleExpand ?
                        this._getActionGroup("urban-model", false, this._translations.floorFilter, () => this._toggleFloorFilter()) :
                        this.enableFloorFilter && this._hasFloorInfo ? this._getWidget(t, this._floorFilterElement?.floorFilterWidget, true) : undefined;
            }
        });
    }
    /**
     * Respond to fullscreen state change and ensure our state var is in sync
     *
     * @param state The fullscreen view model's state.
     *
     * @protected
     */
    _fullscreenStateChange(state) {
        if (state === "ready" && this._showFullscreen) {
            this._showFullscreen = false;
        }
        else if (state === "active" && !this._showFullscreen) {
            this._showFullscreen = true;
        }
    }
    /**
     * Get a calcite action group for the current action
     *
     * @param icon the icon to display for the current action
     * @param disabled should the action be disabled
     * @param tip information tip to display helpful details to end user
     * @param func the associated onClick function to execute
     *
     * @returns the dom node for the action group
     *
     * @protected
     */
    _getActionGroup(icon, disabled, tip, func) {
        const sizeClass = this.mapWidgetsSize === "s" ? "square-32" : this.mapWidgetsSize === "m" ? "square-40" : "square-48";
        const stackClass = this.stackTools ? "" : "margin-bottom-1-2";
        const shadowClass = this.stackTools ? "" : "box-shadow";
        return (index.h("div", null, index.h("calcite-action", { alignment: "center", class: `${sizeClass} ${stackClass} border-bottom ${shadowClass}`, compact: false, disabled: disabled, icon: icon, id: icon, onClick: func, scale: "s", text: "" }, index.h("calcite-icon", { icon: "cheveron-up", scale: "s", slot: "icon" })), index.h("calcite-tooltip", { label: "", placement: "trailing", "reference-element": icon }, index.h("span", null, tip))));
    }
    /**
     * Add the widget to the UI and optionally to an Expand widget
     *
     * @param name the icon to display for the current action
     * @param content the widget to display
     * @param internalExpand when true the widget will be added to an Expand widget
     *
     * @protected
     */
    _getWidget(name, content, internalExpand) {
        if (this._widgets.indexOf(name) < 0 && this.mapView && content) {
            const i = this.toolOrder.indexOf(name);
            const exp = new this.Expand({
                view: this.mapView,
                content
            });
            const v = this.enableHome ? 2 : 1;
            this.mapView.ui.add(internalExpand ? exp : content, {
                position: this.position,
                index: i > -1 ? i + v : 1
            });
            this._widgets.push(name);
        }
    }
    /**
     * Show/Hide the legend widget
     */
    _showLegend() {
        this._showLegendWidget = !this._showLegendWidget;
        this._showTools = false;
    }
    /**
     * Show/Hide the search widget
     */
    _search() {
        this._showSearchWidget = !this._showSearchWidget;
        this._showTools = false;
    }
    /**
     * Show/Hide the basemap picker
     */
    _toggleBasemapPicker() {
        this._showBasemapWidget = !this._showBasemapWidget;
        this._showTools = false;
    }
    /**
     * Show/Hide the floor filter
     */
    _toggleFloorFilter() {
        this._showFloorFilter = !this._showFloorFilter;
        this._showTools = false;
    }
    /**
     * Enter/Exit fullscreen mode
     */
    _expand() {
        this._showFullscreen = !this._showFullscreen;
    }
    /**
     * Show/Hide the map tools
     */
    _toggleTools() {
        if (!this._showTools) {
            this._showBasemapWidget = false;
            this._showSearchWidget = false;
            this._showLegendWidget = false;
            this._showFloorFilter = false;
        }
        this._showTools = !this._showTools;
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
    static get watchers() { return {
        "mapView": ["mapViewWatchHandler"],
        "_showBasemapWidget": ["_showBasemapWidgetWatchHandler"],
        "_showFloorFilter": ["_showFloorFilterWatchHandler"],
        "_showFullscreen": ["_showFullscreenWatchHandler"],
        "_showLegendWidget": ["_showLegendWidgetWatchHandler"],
        "_showSearchWidget": ["_showSearchWidgetWatchHandler"]
    }; }
};
MapTools.style = MapToolsStyle0;

exports.basemap_gallery = BasemapGallery;
exports.floor_filter = FloorFilter;
exports.map_fullscreen = MapFullscreen;
exports.map_legend = MapLegend;
exports.map_picker = MapPicker;
exports.map_search = MapSearch;
exports.map_tools = MapTools;
