/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-105cf2b9.js');
const locale = require('./locale-3d0a4bc2.js');
const interfaces = require('./interfaces-7cd0a48a.js');
const mapViewUtils = require('./mapViewUtils-3e0fa457.js');
require('./esri-loader-ce6c3d3d.js');
require('./_commonjsHelpers-480c2e77.js');

const crowdsourceManagerCss = ":host{display:block;--calcite-label-margin-bottom:0px;--solutions-theme-foreground-color:var(--calcite-color-foreground-1)}.padding-1-2{padding:0.5rem}.display-flex{display:flex}.width-full{width:100%}.width-1-2{position:relative;width:50%}.width-1-3{position:relative;width:33.33%}.width-2-3{position:relative;width:66.66%}.width-0{width:0}.height-full{height:100%}.height-1-2{position:relative;height:50%}.height-0{height:0}.toggle-node{width:51px;height:51px}.overflow-hidden{overflow:hidden}.flex-column{flex-direction:column}.border{border:1px solid var(--calcite-color-border-3)}.border-bottom{border-bottom:1px solid var(--calcite-color-border-3)}.border-sides{border-left:1px solid var(--calcite-color-border-3);border-right:1px solid var(--calcite-color-border-3)}.position-relative{position:relative}.height-50{height:50%}.adjusted-height-50{height:calc(50% - 25px)}.adjusted-height-100{height:calc(100% - 50px)}.adjusted-height-100-50{height:calc(100% - 50px)}.display-none{display:none}.height-53{height:53px}.position-absolute-53{position:absolute;top:53px}.display-grid{display:grid}.height-50-px{height:50px}.padding-inline-start-75{padding-inline-start:0.75rem}.align-items-center{align-items:center}.esri-floor-filter__close-levels-button{width:40px !important;height:40px !important}.esri-floor-filter__level-button{width:40px !important;height:40px !important}.esri-floor-filter__browse-button{width:40px !important;height:40px !important}.position-absolute-50{position:absolute;top:50px;bottom:0px;left:0px;right:0px}.position-absolute-0{position:absolute;top:0px;bottom:0px;left:0px;right:0px}.visibility-hidden{visibility:hidden;height:0px}.position-fixed{position:fixed}.border-width-0{border-width:0px}.border-bottom-width-0{border-bottom-width:0px}";

const CrowdsourceManager = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        //--------------------------------------------------------------------------
        //
        //  Properties (protected)
        //
        //--------------------------------------------------------------------------
        /**
         * boolean: When true the map view will be set after render due to popup obstructing the view
         * MapView.when is not fired when mapView is not currently visible
         */
        this._defaultCenterHonored = false;
        /**
         * boolean: When true the map view will be set after render due to popup obstructing the view
         * MapView.when is not fired when mapView is not currently visible
         */
        this._defaultLevelHonored = false;
        /**
         * boolean: When true the map view will be set after render due to popup obstructing the view
         * MapView.when is not fired when mapView is not currently visible
         */
        this._shouldSetMapView = false;
        this.defaultCenter = "";
        this.defaultGlobalId = "";
        this.defaultLayer = "";
        this.defaultLevel = "";
        this.defaultOid = "";
        this.defaultWebmap = "";
        this.enableAutoRefresh = false;
        this.enableColumnReorder = true;
        this.enableCSV = true;
        this.enableFloorFilter = true;
        this.enableFullscreen = true;
        this.enableInlineEdit = false;
        this.enableLegend = true;
        this.enableSearch = true;
        this.enableShare = false;
        this.enableHome = true;
        this.enableZoom = true;
        this.enableBasemap = true;
        this.basemapConfig = undefined;
        this.showNewestFirst = true;
        this.mapInfos = [];
        this.onlyShowUpdatableLayers = true;
        this.searchConfiguration = undefined;
        this.shareIncludeEmbed = undefined;
        this.shareIncludeSocial = undefined;
        this.theme = "light";
        this.zoomAndScrollToSelected = false;
        this._expandPopup = false;
        this._hideFooter = false;
        this._hideTable = false;
        this._isMobile = undefined;
        this._translations = undefined;
        this._layer = undefined;
        this._layoutMode = interfaces.ELayoutMode.GRID;
        this._mapInfo = undefined;
        this._mapView = undefined;
        this._panelOpen = true;
        this._numSelected = 0;
        this._tableOnly = false;
    }
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
     * Listen for changes in feature selection and show or hide the map, popup, and table
     */
    async featureSelectionChange(evt) {
        var _a;
        this._numSelected = (_a = evt.detail) === null || _a === void 0 ? void 0 : _a.length;
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
     * Listen for idsFound event to be fired so we can know that all layer ids have been fetched
     */
    async idsFound(evt) {
        const ids = evt.detail;
        this._tableOnly = ids.tableIds.length > 0 && ids.layerIds.length === 0;
        if (this._tableOnly) {
            this._expandPopup = true;
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
     * Listen for beforeMapChanged and minimize the popup if it's expanded
     */
    async beforeMapChanged() {
        if (this._expandPopup) {
            this._shouldSetMapView = true;
            this._expandPopup = false;
        }
    }
    /**
     * Get the layer for the provided layer id
     */
    async layerSelectionChange(evt) {
        const id = evt.detail[0];
        const layer = await mapViewUtils.getLayerOrTable(this._mapView, id);
        await layer.when(() => {
            this._layer = layer;
        });
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
        const borderClass = this._isMobile && this._hideTable ? "border-width-0" :
            this._isMobile ? "border-bottom-width-0" : "";
        return (index.h(index.Host, null, index.h("calcite-shell", { class: "position-relative" }, index.h("calcite-panel", { class: `width-full height-full ${borderClass}` }, this._getBody(this._layoutMode, this._panelOpen, this._hideTable)), this._getFooter())));
    }
    /**
     * Called after each render
     * Used to delay the setting of the mapView when the popup is expaneded and obstructs the view
     */
    async componentDidRender() {
        if (this._shouldSetMapView) {
            this._shouldSetMapView = false;
            await this._setMapView();
        }
    }
    /**
     * Called once after the component is loaded
     */
    async componentDidLoad() {
        this._resizeObserver.observe(this.el);
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
        var _a, _b, _c, _d;
        const hasSelectedFeatures = this._numSelected > 0;
        const deleteEnabled = ((_a = this._layer) === null || _a === void 0 ? void 0 : _a.editingEnabled) && ((_d = (_c = (_b = this._layer) === null || _b === void 0 ? void 0 : _b.capabilities) === null || _c === void 0 ? void 0 : _c.operations) === null || _d === void 0 ? void 0 : _d.supportsDelete);
        return this._isMobile && hasSelectedFeatures && !this._hideFooter ? (index.h("div", { class: `width-100`, slot: "footer" }, index.h("div", { class: "display-flex padding-1-2" }, index.h("calcite-button", { appearance: "solid", id: "solutions-show", onClick: () => this.showHideMapPopupAndTable(true), width: "full" }, this._translations.view.replace("{{n}}", this._numSelected.toString())), deleteEnabled ? (index.h("delete-button", { class: "padding-inline-start-1 width-full", id: "solutions-delete", ids: this._layerTable.selectedIds, layer: this._layer })) : undefined))) : undefined;
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
        return (index.h("calcite-panel", { class: "width-full height-full" }, index.h("div", { class: `width-full height-full overflow-hidden ${contentClass}` }, this._getMapAndCard(layoutMode, panelOpen, hideTable), this._getTable(layoutMode, panelOpen, hideTable))));
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
        var _a;
        const mapContainerClass = this._layoutMode === interfaces.ELayoutMode.HORIZONTAL && (!this._isMobile || panelOpen) ? "" : "adjusted-height-50";
        return (index.h("div", { class: `${mapContainerClass} overflow-hidden` }, index.h("map-card", { basemapConfig: this.basemapConfig, class: "width-full", defaultWebmapId: this.defaultWebmap, enableBasemap: this.enableBasemap, enableFloorFilter: this.enableFloorFilter, enableFullscreen: this.enableFullscreen, enableHome: this.enableHome, enableLegend: this.enableLegend, enableSearch: this.enableSearch, enableSingleExpand: true, hidden: this._expandPopup && !this._isMobile, homeZoomIndex: 3, homeZoomPosition: "top-left", homeZoomToolsSize: "s", mapInfos: (_a = this.mapInfos) === null || _a === void 0 ? void 0 : _a.filter(mapInfo => mapInfo.visible !== false), mapWidgetsIndex: 0, mapWidgetsPosition: "top-right", mapWidgetsSize: "m", stackTools: true, theme: this.theme, toolOrder: ["legend", "search", "fullscreen", "basemap", "floorfilter"] })));
    }
    /**
     * Get the expand node for the popup information
     *
     * @returns the expand node
     * @protected
     */
    _getPopupExpandNode() {
        var _a;
        const icon = this._expandPopup ? "chevrons-down" : "chevrons-up";
        const id = "expand-popup";
        const tooltip = this._expandPopup ? this._translations.collapsePopup : this._translations.expandPopup;
        const themeClass = this.theme === "dark" ? "calcite-mode-dark" : "calcite-mode-light";
        const popupNodeClass = !this._expandPopup ? "height-full" : ((_a = this.mapInfos) === null || _a === void 0 ? void 0 : _a.length) === 1 || this._isMobile ? "position-absolute-0" : "position-absolute-50";
        const headerClass = this._isMobile ? "display-none height-0" : "";
        const headerTheme = !this._isMobile ? "calcite-mode-dark" : "calcite-mode-light";
        const containerClass = this._isMobile && this._hideTable ? "position-absolute-0 width-full height-full" : this._isMobile ? "display-none height-0" : "";
        return (index.h("div", { class: `${headerTheme} ${popupNodeClass} ${containerClass}` }, index.h("calcite-panel", null, !this._isMobile ? (index.h("div", { class: `display-flex align-items-center ${headerClass}`, slot: "header-content" }, index.h("calcite-icon", { icon: "information", scale: "s" }), index.h("div", { class: "padding-inline-start-75" }, this._translations.information))) : undefined, index.h("calcite-action", { class: headerClass, disabled: this._tableOnly, icon: icon, id: id, onClick: () => this._togglePopup(), slot: "header-actions-end", text: "" }), !this._tableOnly ? index.h("calcite-tooltip", { class: themeClass, label: "", placement: "bottom", "reference-element": id }, index.h("span", null, tooltip)) : undefined, this._getCardNode())));
    }
    /**
     * Toggle the popup information
     *
     * @protected
     */
    _togglePopup() {
        this._expandPopup = !this._expandPopup;
    }
    /**
     * Get the card node
     *
     * @returns the card node
     * @protected
     */
    _getCardNode() {
        const cardManagerHeight = !this._expandPopup && !this._isMobile ? "height-50" : "height-full";
        const themeClass = this.theme === "dark" ? "calcite-mode-dark" : "calcite-mode-light";
        return (index.h("div", { class: `width-50 height-full ${themeClass}` }, index.h("card-manager", { class: `${cardManagerHeight} width-full`, isMobile: this._isMobile, mapView: this === null || this === void 0 ? void 0 : this._mapView, zoomAndScrollToSelected: this.zoomAndScrollToSelected })));
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
        var _a, _b;
        const tableClass = hideTable && this._isMobile ? "visibility-hidden" : "";
        const tableSizeClass = this._getTableSizeClass(layoutMode, panelOpen);
        const icon = this._getDividerIcon(layoutMode, panelOpen);
        const tooltip = panelOpen ? this._translations.close : this._translations.open;
        const id = "toggle-layout";
        const toggleLayout = layoutMode === interfaces.ELayoutMode.HORIZONTAL ? "horizontal" : "vertical";
        const toggleSlot = layoutMode === interfaces.ELayoutMode.HORIZONTAL ? "header" : "panel-start";
        const hasMapAndLayer = this.defaultWebmap && this.defaultLayer;
        const globalId = !this.defaultGlobalId ? undefined :
            ((_a = this.defaultGlobalId) === null || _a === void 0 ? void 0 : _a.indexOf(",")) > -1 ? this.defaultGlobalId.split(",") : [this.defaultGlobalId];
        const defaultOid = !this.defaultOid ? undefined :
            ((_b = this.defaultOid) === null || _b === void 0 ? void 0 : _b.indexOf(",")) > -1 ? this.defaultOid.split(",").map(o => parseInt(o, 10)) : [parseInt(this.defaultOid, 10)];
        return (index.h("calcite-shell", { class: `${tableSizeClass} ${tableClass} border-bottom` }, !this._isMobile ? (index.h("calcite-action-bar", { class: "border-sides", expandDisabled: true, layout: toggleLayout, slot: toggleSlot }, index.h("calcite-action", { class: "toggle-node", icon: icon, id: id, onClick: () => this._toggleLayout(), text: "" }), index.h("calcite-tooltip", { label: tooltip, placement: "bottom", "reference-element": id }, index.h("span", null, tooltip)))) : undefined, index.h("div", { class: `width-full height-full position-relative` }, index.h("layer-table", { defaultGlobalId: hasMapAndLayer ? globalId : undefined, defaultLayerId: hasMapAndLayer ? this.defaultLayer : "", defaultOid: hasMapAndLayer && !globalId ? defaultOid : undefined, enableAutoRefresh: this.enableAutoRefresh, enableCSV: this.enableCSV, enableColumnReorder: this.enableColumnReorder, enableInlineEdit: this.enableInlineEdit, enableShare: this.enableShare, isMobile: this._isMobile, mapInfo: this._mapInfo, mapView: this === null || this === void 0 ? void 0 : this._mapView, onlyShowUpdatableLayers: this.onlyShowUpdatableLayers, ref: (el) => this._layerTable = el, shareIncludeEmbed: this.shareIncludeEmbed, shareIncludeSocial: this.shareIncludeSocial, showNewestFirst: this.showNewestFirst, zoomAndScrollToSelected: this.zoomAndScrollToSelected }))));
    }
    /**
     * Update the component layout when its size changes
     */
    _onResize() {
        const isMobile = this.el.offsetWidth < 1024;
        const forceOpen = !this._isMobile && isMobile;
        this._isMobile = isMobile;
        this._layoutMode = this._isMobile ? interfaces.ELayoutMode.HORIZONTAL : interfaces.ELayoutMode.GRID;
        if (forceOpen) {
            this._panelOpen = true;
        }
    }
    /**
     * Open/Close the appropriate panel.
     * The panel that is toggled is dependent upon the layout mode and if using classic grid or not
     */
    _toggleLayout() {
        this._panelOpen = !this._panelOpen;
    }
    /**
     * Show/Hide the map, popup, and table
     *
     * @param show when true the map, popup, and table will be displayed
     */
    showHideMapPopupAndTable(show) {
        this._expandPopup = false;
        this._hideTable = show;
        this._hideFooter = show;
    }
    /**
     * Get the current map info (configuration details) when maps change
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
        return Object.assign({}, mapInfo);
    }
    /**
     * Set the current map info when maps change
     *
     * @protected
     */
    async _setMapView() {
        var _a;
        this._mapInfo = this._getMapInfo(this._mapChange.id);
        this._mapView = this._mapChange.mapView;
        this._initMapZoom();
        this._mapView.popupEnabled = false;
        const center = !this.defaultCenter || this._defaultCenterHonored ?
            undefined : (_a = this.defaultCenter) === null || _a === void 0 ? void 0 : _a.split(";").map(v => parseFloat(v));
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
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "enableZoom": ["enableZoomWatchHandler"]
    }; }
};
CrowdsourceManager.style = crowdsourceManagerCss;

exports.crowdsource_manager = CrowdsourceManager;
