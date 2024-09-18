/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5a0af791.js');
const locale = require('./locale-a09603ee.js');
const interfaces = require('./interfaces-09c4c40e.js');
const mapViewUtils = require('./mapViewUtils-8d4da732.js');
require('./esri-loader-08dc41bd.js');
require('./_commonjsHelpers-baf43783.js');

const crowdsourceManagerCss = ":host{display:block;--calcite-label-margin-bottom:0px;--solutions-theme-foreground-color:var(--calcite-color-foreground-1)}.padding-1-2{padding:0.5rem}.display-flex{display:flex}.width-full{width:100%}.width-1-2{position:relative;width:50%}.width-1-3{position:relative;width:33.33%}.width-2-3{position:relative;width:66.66%}.width-0{width:0}.height-full{height:100%}.height-1-2{position:relative;height:50%}.height-0{height:0}.toggle-node{width:51px;height:51px}.overflow-hidden{overflow:hidden}.flex-column{flex-direction:column}.border{border:1px solid var(--calcite-color-border-3)}.border-bottom{border-bottom:1px solid var(--calcite-color-border-3)}.border-sides{border-left:1px solid var(--calcite-color-border-3);border-right:1px solid var(--calcite-color-border-3)}.position-relative{position:relative}.height-50{height:50%}.adjusted-height-50{height:calc(50% - 25px)}.adjusted-height-100{height:calc(100% - 50px)}.adjusted-height-100-50{height:calc(100% - 50px)}.display-none{display:none}.height-53{height:53px}.position-absolute-53{position:absolute;top:53px}.display-grid{display:grid}.height-50-px{height:50px}.padding-inline-start-75{padding-inline-start:0.75rem}.align-items-center{align-items:center}.esri-floor-filter__close-levels-button{width:40px !important;height:40px !important}.esri-floor-filter__level-button{width:40px !important;height:40px !important}.esri-floor-filter__browse-button{width:40px !important;height:40px !important}.position-absolute-50{position:absolute;top:50px;bottom:0px;left:0px;right:0px}.position-absolute-0{position:absolute;top:0px;bottom:0px;left:0px;right:0px}.visibility-hidden{visibility:hidden;height:0px}.position-fixed{position:fixed}.border-width-0{border-width:0px}.border-bottom-width-0{border-bottom-width:0px}.floating-container{position:fixed;width:100px;height:10px;bottom:0;right:0;margin:100px 0px}.floating-container .floating-button{box-shadow:0 10px 25px rgb(92 93 94 / 60%);transform:translatey(5px);transition:all 0.3s}";
const CrowdsourceManagerStyle0 = crowdsourceManagerCss;

const CrowdsourceManager = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.showIntroductionWindow = index.createEvent(this, "showIntroductionWindow", 7);
        this.showCoverPage = index.createEvent(this, "showCoverPage", 7);
        this.appLayout = undefined;
        this.appProxies = undefined;
        this.basemapConfig = undefined;
        this.coverPageEnabled = undefined;
        this.customInfoText = undefined;
        this.defaultCenter = "";
        this.defaultGlobalId = "";
        this.defaultLayer = "";
        this.defaultLevel = "";
        this.defaultOid = "";
        this.defaultWebmap = "";
        this.introductionWindowEnabled = false;
        this.enableAutoRefresh = false;
        this.enableBasemap = true;
        this.enableColumnReorder = true;
        this.enableCSV = true;
        this.enableFloorFilter = true;
        this.enableFullscreen = true;
        this.enableHome = true;
        this.enableLegend = true;
        this.enableSearch = true;
        this.enableShare = false;
        this.enableZoom = true;
        this.hideMapOnLoad = false;
        this.mapInfos = [];
        this.onlyShowUpdatableLayers = true;
        this.popupHeaderColor = undefined;
        this.popupHeaderHoverColor = undefined;
        this.popupHeaderHoverTextColor = undefined;
        this.popupHeaderTextColor = undefined;
        this.searchConfiguration = undefined;
        this.shareIncludeEmbed = undefined;
        this.shareIncludeSocial = undefined;
        this.showNewestFirst = true;
        this.theme = "light";
        this.zoomAndScrollToSelected = false;
        this.zoomToScale = undefined;
        this._enableCreateFeatures = true;
        this._hideFooter = false;
        this._hideTable = false;
        this._isMobile = false;
        this._translations = undefined;
        this._layer = undefined;
        this._layoutMode = interfaces.ELayoutMode.GRID;
        this._mapInfo = undefined;
        this._mapView = undefined;
        this._panelOpen = true;
        this._numSelected = 0;
        this._filterOpen = false;
    }
    get el() { return index.getElement(this); }
    //--------------------------------------------------------------------------
    //
    //  Properties (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * boolean: When true the map view will be set after render due to popup obstructing the view
     * MapView.when is not fired when mapView is not currently visible
     */
    _defaultCenterHonored = false;
    /**
     * boolean: When true the map view will be set after render due to popup obstructing the view
     * MapView.when is not fired when mapView is not currently visible
     */
    _defaultLevelHonored = false;
    /**
     * boolean: When true hideMapOnLoad was honored for the current map
     */
    _hideMapOnLoadHonored = false;
    /**
     * HTMLLayerTableElement: The layer table element
     */
    _layerTable;
    /**
     * IMapChange: The current map change details
     */
    _mapChange;
    /**
     * ResizeObserver: The observer that watches for screen size changes
     */
    _resizeObserver;
    /**
     * boolean: When true the map view will be set after render due to popup obstructing the view
     * MapView.when is not fired when mapView is not currently visible
     */
    _shouldSetMapView = false;
    /**
     * LayerExpression[]: All layer expressions from the current filter config for the currently selected layer
     */
    _layerExpressions;
    /**
     * HTMLInstantAppsFilterListElement: Component from Instant Apps that supports interacting with the current filter config
     */
    _filterList;
    /**
     * boolean: True when app is directly rendered to map view layout
     */
    _isMapViewOnLoad = false;
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    /**
     * When true the map zoom tools will be available
     */
    enableZoomWatchHandler() {
        this._initMapZoom();
    }
    /**
     * When true the map will be hidden on load
     */
    hideMapOnLoadWatchHandler() {
        this.showHideMapPopupAndTable(this.hideMapOnLoad && !this._isMobile);
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
     * Emitted on demand when a info button is clicked
     */
    showIntroductionWindow;
    /**
     * Emitted on demand when a cover page button is clicked
     */
    showCoverPage;
    /**
     * Listen for changes in feature selection and show or hide the map, popup, and table
     */
    async featureSelectionChange(evt) {
        this._numSelected = evt.detail?.length;
    }
    /**
     * Listen for when the popup is closed in mobile mode and hide the appropriate UI elements
     */
    async popupClosed() {
        if (this._isMobile) {
            this.showHideMapPopupAndTable(false);
        }
    }
    /**
     * Listen for layoutChanged event to be fired so we can adjust the layout
     */
    async layoutChanged(evt) {
        this._layoutMode = evt.detail;
    }
    /**
     * Listen for mapChanged event to be fired then store the new mapView so components will be updated
     */
    async mapChanged(evt) {
        this._mapChange = evt.detail;
        await this._mapChange.mapView.when(async () => {
            await this._setMapView();
        });
    }
    /**
     * Get the layer for the provided layer id
     */
    async layerSelectionChange(evt) {
        const id = evt.detail[0];
        const layer = await mapViewUtils.getLayerOrTable(this._mapView, id);
        await layer.when(() => {
            this._layer = layer;
            this._initLayerExpressions();
        });
    }
    /**
     * Update the state expandPopup when mapInfoChange event occurs
     */
    async mapInfoChange() {
        this._hideMapOnLoadHonored = false;
    }
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
        this._resizeObserver = new ResizeObserver(() => this._onResize());
    }
    /**
     * Renders the component.
     */
    render() {
        // only avoid border when we have a header color that is not white
        const borderClass = this.popupHeaderColor && this.popupHeaderColor !== "#FFFFFF" ? "border-width-0" : "";
        return (index.h(index.Host, { key: '2d340c7f7ed907d3ff3cb33b90c86db4b077f242' }, index.h("calcite-shell", { key: '055ab55766cd9b1649a051a3b18fdfd5ad2f62ac', class: "position-relative" }, index.h("calcite-panel", { key: '5400d40b43288946f08bc3846b4d60cff6e4a03d', class: `width-full height-full ${borderClass}` }, this._getBody(this._layoutMode, this._panelOpen, this._hideTable)), this._getFooter()), this._filterModal()));
    }
    /**
     * Called after each render
     * Used to delay the setting of the mapView when the popup is expaneded and obstructs the view
     */
    async componentDidRender() {
        if (this._shouldSetMapView) {
            this._shouldSetMapView = false;
            if (this._mapChange) {
                await this._setMapView();
            }
        }
    }
    /**
     * Called once after the component is loaded
     */
    async componentDidLoad() {
        this._resizeObserver.observe(this.el);
        // for backward compatibility if hidemaponload is true then render table layout as default
        if (this.hideMapOnLoad && !this.appLayout) {
            this.appLayout = 'tableView';
        }
        else if (!this.appLayout) {
            this.appLayout = 'splitView';
        }
        this._isMapViewOnLoad = this.appLayout === 'mapView';
        this._setActiveLayout(this.appLayout);
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * Show View and Delete buttons in the footer when in isMobile is true
     *
     * @returns the footer node
     * @protected
     */
    _getFooter() {
        const hasSelectedFeatures = this._numSelected > 0;
        const deleteEnabled = this._layer?.editingEnabled && this._layer?.capabilities?.operations?.supportsDelete;
        return this._isMobile && hasSelectedFeatures && !this._hideFooter ? (index.h("div", { class: `width-100`, slot: "footer" }, index.h("div", { class: "display-flex padding-1-2" }, index.h("calcite-button", { appearance: "solid", id: "solutions-show", onClick: () => this.showHideMapPopupAndTable(true), width: "full" }, this._translations.view.replace("{{n}}", this._numSelected.toString())), deleteEnabled ? (index.h("delete-button", { class: "padding-inline-start-1 width-full", id: "solutions-delete", ids: this._layerTable.selectedIds, layer: this._layer })) : undefined))) : undefined;
    }
    /**
     * sets the active layout to render
     * @param appLayout new app layout
     *
     * @protected
     */
    _setActiveLayout(appLayout) {
        //When going to splitView layout the panel should be open
        if (appLayout === 'splitView' && !this._panelOpen) {
            this._toggleLayout();
        }
        //Move the map node based on the selected layout
        //for mapView layout show map in full view and or all other layout show in the card view
        //for tableView the map will be hidden using css
        if (appLayout === 'mapView') {
            this._showMapInFullView();
        }
        else {
            this._showMapInCardView();
        }
    }
    /**
     * Get the icon name to use for the divider icon based on the current layout
     *
     * @param layoutMode ELayoutMode the current layout mode
     * @param panelOpen boolean indicates if all panels are open
     *
     * @returns the icon name
     * @protected
     */
    _getDividerIcon(layoutMode, panelOpen) {
        let icon = "";
        switch (layoutMode) {
            case interfaces.ELayoutMode.HORIZONTAL:
                icon = (panelOpen ? "chevrons-up" : "chevrons-down");
                break;
            case interfaces.ELayoutMode.VERTICAL:
                icon = (panelOpen ? "chevrons-left" : "chevrons-right");
                break;
            case interfaces.ELayoutMode.GRID:
                icon = (panelOpen ? "chevrons-left" : "chevrons-right");
                break;
        }
        return icon;
    }
    /**
     * Get the css selector names to use for the map based on the current layout
     *
     * @param layoutMode ELayoutMode the current layout mode
     * @param panelOpen boolean indicates if all panels are open
     * @param hideTable boolean when true the layer table is hidden
     *
     * @returns the css selectors
     * @protected
     */
    _getMapSizeClass(layoutMode, panelOpen, hideTable) {
        let sizeClass = "";
        switch (layoutMode) {
            case interfaces.ELayoutMode.HORIZONTAL:
                sizeClass = `${panelOpen && !hideTable ? "height-1-2 display-grid" : panelOpen && hideTable ? "height-full" : "height-0"} width-full position-relative`;
                break;
            case interfaces.ELayoutMode.GRID:
                sizeClass = `height-full position-relative ${panelOpen ? "width-1-3" : "width-0"}`;
                break;
            case interfaces.ELayoutMode.VERTICAL:
                sizeClass = `height-full position-relative ${panelOpen ? "width-1-2" : "width-0"}`;
                break;
        }
        return sizeClass;
    }
    /**
     * Get the css selector names to use for the table based on the current layout
     *
     * @param layoutMode ELayoutMode the current layout mode
     * @param panelOpen boolean indicates if all panels are open
     *
     * @returns the css selectors
     * @protected
     */
    _getTableSizeClass(layoutMode, panelOpen) {
        let sizeClass = "";
        switch (layoutMode) {
            case interfaces.ELayoutMode.HORIZONTAL:
                sizeClass = `${panelOpen ? "height-1-2" : "height-full"} width-full display-flex flex-column`;
                break;
            case interfaces.ELayoutMode.GRID:
                sizeClass = `${panelOpen ? "width-2-3" : "width-full"} height-full display-flex`;
                break;
            case interfaces.ELayoutMode.VERTICAL:
                sizeClass = `${panelOpen ? "width-1-2" : "width-full"} height-full display-flex`;
                break;
        }
        return sizeClass;
    }
    /**
     * Get the table and map nodes based for the current layout
     *
     * @param layoutMode ELayoutMode the current layout mode
     * @param panelOpen boolean indicates if all panels are open
     *
     * @returns the parent node that contains the table and map
     * @protected
     */
    _getBody(layoutMode, panelOpen, hideTable) {
        const contentClass = layoutMode === interfaces.ELayoutMode.HORIZONTAL ? "" : "display-flex";
        const themeClass = this.theme === "dark" ? "calcite-mode-dark" : "calcite-mode-light";
        return (index.h("calcite-panel", { class: "width-full height-full" }, index.h("div", { class: `width-full height-full overflow-hidden ${contentClass}` }, this._getMapAndCard(layoutMode, panelOpen, hideTable), this._getTable(layoutMode, panelOpen, hideTable)), this.coverPageEnabled &&
            index.h("div", { class: "floating-container", onClick: this.coverPageButtonClick.bind(this) }, index.h("calcite-button", { appearance: "solid", class: `floating-button ${themeClass}`, "icon-start": "content-minimal", kind: "neutral", label: "", round: true, scale: "l", "split-child": "primary", width: "auto" })), this.introductionWindowEnabled &&
            index.h("div", { class: "floating-container", onClick: this.infoButtonClick.bind(this) }, index.h("calcite-button", { appearance: "solid", class: `floating-button ${themeClass}`, "icon-start": "information-letter", kind: "neutral", label: "", round: true, scale: "l", "split-child": "primary", width: "auto" }))));
    }
    /**
     * Emit the event when info button clicked
     */
    infoButtonClick() {
        this.showIntroductionWindow.emit();
    }
    /**
   * Emit the event when cover page button clicked
   */
    coverPageButtonClick() {
        this.showCoverPage.emit();
    }
    /**
     * Get the map and card nodes based for the current layout options
     *
     * @param layoutMode ELayoutMode the current layout mode
     * @param panelOpen boolean indicates if all panels are open
     * @param hideTable boolean when true the layer table is hidden
     *
     * @returns the map node
     * @protected
     */
    _getMapAndCard(layoutMode, panelOpen, hideTable) {
        const mapSizeClass = this._getMapSizeClass(layoutMode, panelOpen, hideTable);
        return (index.h("div", { class: `${mapSizeClass} overflow-hidden` }, this._getMapNode(panelOpen), this._getPopupExpandNode()));
    }
    /**
     * Get the map node based for the current layout options
     *
     * @param layoutMode ELayoutMode the current layout mode
     * @param panelOpen boolean indicates if all panels are open
     *
     * @returns the map node
     * @protected
     */
    _getMapNode(panelOpen) {
        const isMapLayout = this.appLayout === 'mapView';
        const isTableLayout = this.appLayout === 'tableView';
        const mapContainerClass = (isMapLayout || isTableLayout) ? "position-absolute-0" : this._layoutMode === interfaces.ELayoutMode.HORIZONTAL && (!this._isMobile || panelOpen) ? "" : "adjusted-height-50";
        const hasMapAndLayer = this.defaultWebmap && this.defaultLayer;
        return (index.h("div", { class: `${mapContainerClass} overflow-hidden`, id: "card-mapView" }, index.h("map-card", { appProxies: this.appProxies, basemapConfig: this.basemapConfig, class: "width-full", defaultLayerId: hasMapAndLayer ? this.defaultLayer : "", defaultWebmapId: this.defaultWebmap, enableBasemap: this.enableBasemap, enableFloorFilter: this.enableFloorFilter, enableFullscreen: this.enableFullscreen, enableHome: this.enableHome, enableLegend: this.enableLegend, enableSearch: this.enableSearch, enableSingleExpand: true, hidden: !this._isMobile && isTableLayout, homeZoomIndex: 3, homeZoomPosition: "top-left", homeZoomToolsSize: "s", isMapLayout: isMapLayout, isMobile: this._isMobile, mapInfo: this._mapInfo, mapInfos: this.mapInfos?.filter(mapInfo => mapInfo.visible !== false), mapWidgetsIndex: 0, mapWidgetsPosition: "top-right", mapWidgetsSize: "m", onToggleFilter: this._toggleFilter.bind(this), onlyShowUpdatableLayers: this.onlyShowUpdatableLayers, selectedFeaturesIds: this._layerTable?.selectedIds, selectedLayer: this._layer, stackTools: true, theme: this.theme, toolOrder: ["legend", "search", "fullscreen", "basemap", "floorfilter"], zoomToScale: this.zoomToScale })));
    }
    /**
     * Get the expand node for the popup information
     *
     * @returns the expand node
     * @protected
     */
    _getPopupExpandNode() {
        const popupNodeClass = "height-full";
        const headerClass = this._isMobile ? "display-none height-0" : "";
        const headerTheme = this.popupHeaderColor ? "" : !this._isMobile ? "calcite-mode-dark" : "calcite-mode-light";
        const containerClass = this._isMobile && this._hideTable ? "position-absolute-0 width-full height-full" : this._isMobile ? "display-none height-0" : "";
        return (index.h("div", { class: `${headerTheme} ${popupNodeClass} ${containerClass}`, style: {
                '--calcite-color-foreground-1': this.popupHeaderColor, /* background color that will be displayed on the popup header */
                '--calcite-color-foreground-2': this.popupHeaderHoverColor, /* background color that will be displayed on button when hovered */
                '--calcite-color-text-3': this.popupHeaderTextColor, /* font color that will be displayed on button */
                '--calcite-color-text-2': this.popupHeaderTextColor, /* font color that will be displayed on popup header text*/
            } }, index.h("calcite-panel", null, !this._isMobile ? (index.h("div", { class: `display-flex align-items-center ${headerClass}`, slot: "header-content" }, index.h("calcite-icon", { icon: "information", scale: "s" }), index.h("div", { class: "padding-inline-start-75" }, this._translations.information))) : undefined, this._getCardNode())));
    }
    /**
     * Get the card node
     *
     * @returns the card node
     * @protected
     */
    _getCardNode() {
        const isMapLayout = this.appLayout === 'mapView';
        const isTableLayout = this.appLayout === 'tableView';
        const cardManagerHeight = (isMapLayout || isTableLayout) ? "height-full" : !this._isMobile ? "height-50" : "height-full";
        const themeClass = this.theme === "dark" ? "calcite-mode-dark" : "calcite-mode-light";
        return (index.h("div", { class: `width-50 height-full ${themeClass}` }, index.h("card-manager", { class: `${cardManagerHeight} width-full`, customInfoText: this.customInfoText, enableEditGeometry: this?._mapInfo?.enableEditGeometry, isMobile: this._isMobile, layer: this._layer, mapView: this?._mapView, selectedFeaturesIds: this._layerTable?.selectedIds, zoomAndScrollToSelected: this.zoomAndScrollToSelected })));
    }
    /**
     * Get the table node based for the current layout
     *
     * @param layoutMode ELayoutMode the current layout mode
     * @param panelOpen boolean indicates if all panels are open
     *
     * @returns the table node
     * @protected
     */
    _getTable(layoutMode, panelOpen, hideTable) {
        const isMapLayout = this.appLayout === 'mapView';
        const isTableLayout = this.appLayout === 'tableView';
        const tableClass = hideTable && this._isMobile ? "visibility-hidden" : isMapLayout ? "display-none" : "";
        const mapClass = isMapLayout ? "height-full width-full" : "display-none";
        const tableSizeClass = this._getTableSizeClass(layoutMode, panelOpen);
        const toggleLayout = layoutMode === interfaces.ELayoutMode.HORIZONTAL ? "horizontal" : "vertical";
        const toggleSlot = layoutMode === interfaces.ELayoutMode.HORIZONTAL ? "header" : "panel-start";
        const hasMapAndLayer = this.defaultWebmap && this.defaultLayer;
        const globalId = !this.defaultGlobalId ? undefined :
            this.defaultGlobalId?.indexOf(",") > -1 ? this.defaultGlobalId.split(",") : [this.defaultGlobalId];
        const defaultOid = !this.defaultOid ? undefined :
            this.defaultOid?.indexOf(",") > -1 ? this.defaultOid.split(",").map(o => parseInt(o, 10)) : [parseInt(this.defaultOid, 10)];
        return (index.h("calcite-shell", { class: `${tableSizeClass} border-bottom` }, !this._isMobile ? (index.h("calcite-action-bar", { class: "border-sides", expandDisabled: true, layout: toggleLayout, slot: toggleSlot }, this.getActions(layoutMode, panelOpen))) : undefined, index.h("div", { class: `width-full height-full position-relative ${tableClass}` }, index.h("layer-table", { createFilterModal: false, defaultGlobalId: hasMapAndLayer ? globalId : undefined, defaultLayerId: hasMapAndLayer ? this.defaultLayer : "", defaultOid: hasMapAndLayer && !globalId ? defaultOid : undefined, enableAutoRefresh: this.enableAutoRefresh, enableCSV: this.enableCSV, enableColumnReorder: this.enableColumnReorder, enableInlineEdit: this?._mapInfo?.enableInlineEdit, enableShare: this.enableShare, isMobile: this._isMobile, mapHidden: isTableLayout, mapInfo: this._mapInfo, mapView: this?._mapView, onToggleFilter: this._toggleFilter.bind(this), onlyShowUpdatableLayers: this.onlyShowUpdatableLayers, ref: (el) => this._layerTable = el, shareIncludeEmbed: this.shareIncludeEmbed, shareIncludeSocial: this.shareIncludeSocial, showNewestFirst: this.showNewestFirst, zoomAndScrollToSelected: this.zoomAndScrollToSelected, zoomToScale: this.zoomToScale })), index.h("div", { class: mapClass, id: "full-map-view" })));
    }
    /**
     * Returns the Actions for table's node
     *
     * @returns Node
     * @protected
     */
    getActions(layoutMode, panelOpen) {
        const icon = this._getDividerIcon(layoutMode, panelOpen);
        const tooltip = panelOpen ? this._translations.close : this._translations.open;
        const id = "toggle-layout";
        return (index.h(index.Fragment, null, index.h("calcite-action", { active: this.appLayout === 'splitView', class: "toggle-node", icon: "browser", id: "browser-action", onClick: () => { this._changeLayout('splitView'); }, text: "" }), index.h("calcite-tooltip", { placement: "right", "reference-element": "browser-action" }, index.h("span", null, this._translations.splitView)), index.h("calcite-action", { active: this.appLayout === 'tableView', class: "toggle-node", icon: "dock-left", id: "dock-left-action", onClick: () => { this._changeLayout('tableView'); }, text: "" }), index.h("calcite-tooltip", { placement: "right", "reference-element": "dock-left-action" }, index.h("span", null, this._translations.tableView)), index.h("calcite-action", { active: this.appLayout === 'mapView', class: "toggle-node", icon: "browser-map", id: "browser-map-action", onClick: () => { this._changeLayout('mapView'); }, text: "" }), index.h("calcite-tooltip", { placement: "right", "reference-element": "browser-map-action" }, index.h("span", null, this._translations.mapView)), index.h("calcite-action", { class: "toggle-node", icon: icon, id: id, onClick: () => this._toggleLayout(), slot: "actions-end", text: "" }), index.h("calcite-tooltip", { placement: "bottom", "reference-element": id }, index.h("span", null, tooltip))));
    }
    /**
     * Show filter component in modal
     *
     * @returns node to interact with any configured filters for the current layer
     * @protected
     */
    _filterModal() {
        return (index.h("calcite-modal", { "aria-labelledby": "modal-title", class: "modal", kind: "brand", onCalciteModalClose: () => void this._closeFilter(), open: this._filterOpen, widthScale: "s" }, index.h("div", { class: "display-flex align-center", id: "modal-title", slot: "header" }, this._translations?.filter?.replace("{{title}}", this._layer?.title)), index.h("div", { slot: "content" }, index.h("instant-apps-filter-list", { autoUpdateUrl: false, closeBtn: true, closeBtnOnClick: async () => this._closeFilter(), comboboxOverlayPositioning: "fixed", layerExpressions: this._layerExpressions, onFilterListReset: () => this._handleFilterListReset(), onFilterUpdate: () => void this._layerTable?.filterUpdate(), ref: (el) => this._filterList = el, view: this._mapView, zoomBtn: false }))));
    }
    /**
     * Store any filters for the current layer.
     * Should only occur on layer change
     *
     * @protected
     */
    _initLayerExpressions() {
        const layerExpressions = this._mapInfo?.filterConfig?.layerExpressions;
        this._layerExpressions = layerExpressions ? layerExpressions.filter((exp) => exp.id === this._layer?.id) : [];
        this._filterList.layerExpressions = this._layerExpressions;
        this._layerExpressions.filter(lyrExp => {
            return lyrExp.expressions.filter(exp => exp.active).length > 0;
        }).length > 0;
    }
    /**
     * Toggle the filter modal
     *
     * @protected
     */
    _toggleFilter() {
        this._filterOpen = !this._filterOpen;
    }
    /**
     * Reset the filter active prop
     *
     * @protected
     */
    _handleFilterListReset() {
        void this._layerTable.filterReset();
    }
    /**
     * Close the filter modal
     *
     * @protected
     */
    async _closeFilter() {
        if (this._filterOpen) {
            this._filterOpen = false;
            void this._layerTable.closeFilter();
        }
    }
    /**
     * Update the component layout when its size changes
     *
     * @protected
     */
    _onResize() {
        const isMobile = this.el.offsetWidth < 1024;
        const forceOpen = !this._isMobile && isMobile;
        this._isMobile = isMobile;
        this._layoutMode = this._isMobile ? interfaces.ELayoutMode.HORIZONTAL : interfaces.ELayoutMode.GRID;
        if (forceOpen) {
            this._panelOpen = true;
        }
        if ((this.hideMapOnLoad && !this._hideMapOnLoadHonored) || this._isMobile) {
            this.hideMapOnLoadWatchHandler();
        }
    }
    /**
     * Open/Close the appropriate panel.
     * The panel that is toggled is dependent upon the layout mode and if using classic grid or not
     *
     * @protected
     */
    _toggleLayout() {
        this._panelOpen = !this._panelOpen;
    }
    /**
     * Changes the layout mode
     * @param appLayout selected active app layout
     *
     * @protected
     */
    _changeLayout(appLayout) {
        if (this.appLayout !== appLayout) {
            this._setActiveLayout(appLayout);
            this.appLayout = appLayout;
            if (this._isMapViewOnLoad) {
                void this._layerTable.refresh();
                this._isMapViewOnLoad = false;
            }
        }
    }
    /**
      * shows the map in card view
      *
      * @protected
      */
    _showMapInCardView() {
        if (this.appLayout === 'mapView') {
            const fullMapView = document.getElementById('full-map-view').childNodes[0];
            const splitMapClass = document.getElementById('card-mapView');
            if (fullMapView) {
                splitMapClass.appendChild(fullMapView);
            }
        }
    }
    /**
     * Shows the map in full view
     *
     * @protected
     */
    _showMapInFullView() {
        const splitMap = document.getElementById('card-mapView').childNodes[0];
        const fullMapViewClass = document.getElementById('full-map-view');
        if (splitMap) {
            fullMapViewClass.appendChild(splitMap);
        }
    }
    /**
     * Show/Hide the map, popup, and table
     *
     * @param show when true the map, popup, and table will be displayed
     * @protected
     */
    showHideMapPopupAndTable(show) {
        this._hideTable = show;
        this._hideFooter = show;
    }
    /**
     * Get the current map info (configuration details) when maps change
     * @param id map changed id
     *
     * @returns IMapInfo for the provided id
     * @protected
     */
    _getMapInfo(id) {
        let mapInfo;
        this.mapInfos.some(mi => {
            if (mi.id === id) {
                mapInfo = mi;
                return true;
            }
        });
        return { ...mapInfo };
    }
    /**
     * Set the current map info when maps change
     *
     * @protected
     */
    async _setMapView() {
        this._mapInfo = this._getMapInfo(this._mapChange.id);
        this._enableCreateFeatures = this._mapInfo.enableCreateFeatures;
        this._mapView = this._mapChange.mapView;
        this._initMapZoom();
        this._mapView.popupEnabled = false;
        const center = !this.defaultCenter || this._defaultCenterHonored ?
            undefined : this.defaultCenter?.split(";").map(v => parseFloat(v));
        const zoom = !this.defaultLevel || this._defaultLevelHonored ?
            undefined : parseInt(this.defaultLevel, 10);
        if (center && zoom) {
            await this._mapView.goTo({
                center,
                zoom
            });
            this._defaultCenterHonored = true;
            this._defaultLevelHonored = true;
        }
    }
    /**
     * Add/remove zoom tools based on enableZoom prop
     *
     * @protected
     */
    _initMapZoom() {
        if (!this.enableZoom) {
            this._mapView.ui.remove("zoom");
        }
        else if (this.enableZoom) {
            this._mapView.ui.add({
                component: "zoom",
                position: "top-left",
                index: 0
            });
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
    static get watchers() { return {
        "enableZoom": ["enableZoomWatchHandler"],
        "hideMapOnLoad": ["hideMapOnLoadWatchHandler"]
    }; }
};
CrowdsourceManager.style = CrowdsourceManagerStyle0;

exports.crowdsource_manager = CrowdsourceManager;
