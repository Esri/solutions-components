/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host, Fragment } from '@stencil/core/internal/client';
import { g as getLocaleComponentStrings } from './locale.js';
import { a as ELayoutMode } from './interfaces.js';
import { g as getLayerOrTable } from './mapViewUtils.js';
import { d as defineCustomElement$Z } from './basemap-gallery2.js';
import { d as defineCustomElement$Y } from './action.js';
import { d as defineCustomElement$X } from './action-bar.js';
import { d as defineCustomElement$W } from './action-group.js';
import { d as defineCustomElement$V } from './action-menu.js';
import { d as defineCustomElement$U } from './alert.js';
import { d as defineCustomElement$T } from './block.js';
import { d as defineCustomElement$S } from './button.js';
import { d as defineCustomElement$R } from './checkbox.js';
import { d as defineCustomElement$Q } from './chip.js';
import { d as defineCustomElement$P } from './combobox.js';
import { d as defineCustomElement$O } from './combobox-item.js';
import { d as defineCustomElement$N } from './date-picker.js';
import { d as defineCustomElement$M } from './date-picker-day.js';
import { d as defineCustomElement$L } from './date-picker-month.js';
import { d as defineCustomElement$K } from './date-picker-month-header.js';
import { d as defineCustomElement$J } from './dropdown.js';
import { d as defineCustomElement$I } from './dropdown-group.js';
import { d as defineCustomElement$H } from './dropdown-item.js';
import { d as defineCustomElement$G } from './filter2.js';
import { d as defineCustomElement$F } from './flow-item.js';
import { d as defineCustomElement$E } from './graph.js';
import { d as defineCustomElement$D } from './handle.js';
import { d as defineCustomElement$C } from './icon.js';
import { d as defineCustomElement$B } from './input.js';
import { d as defineCustomElement$A } from './input-date-picker.js';
import { d as defineCustomElement$z } from './input-text.js';
import { d as defineCustomElement$y } from './label2.js';
import { d as defineCustomElement$x } from './list.js';
import { d as defineCustomElement$w } from './list-item.js';
import { d as defineCustomElement$v } from './loader.js';
import { d as defineCustomElement$u } from './modal.js';
import { d as defineCustomElement$t } from './notice.js';
import { d as defineCustomElement$s } from './option.js';
import { d as defineCustomElement$r } from './panel.js';
import { d as defineCustomElement$q } from './popover.js';
import { d as defineCustomElement$p } from './progress.js';
import { d as defineCustomElement$o } from './scrim.js';
import { d as defineCustomElement$n } from './select.js';
import { d as defineCustomElement$m } from './shell.js';
import { d as defineCustomElement$l } from './slider.js';
import { d as defineCustomElement$k } from './stack.js';
import { d as defineCustomElement$j } from './tooltip.js';
import { d as defineCustomElement$i } from './card-manager2.js';
import { d as defineCustomElement$h } from './create-feature2.js';
import { d as defineCustomElement$g } from './delete-button2.js';
import { d as defineCustomElement$f } from './delete-dialog2.js';
import { d as defineCustomElement$e } from './edit-card2.js';
import { d as defineCustomElement$d } from './floor-filter2.js';
import { d as defineCustomElement$c } from './info-card2.js';
import { d as defineCustomElement$b } from './instant-apps-filter-list2.js';
import { d as defineCustomElement$a } from './instant-apps-social-share2.js';
import { d as defineCustomElement$9 } from './layer-table2.js';
import { d as defineCustomElement$8 } from './map-card2.js';
import { d as defineCustomElement$7 } from './map-fullscreen2.js';
import { d as defineCustomElement$6 } from './map-layer-picker2.js';
import { d as defineCustomElement$5 } from './map-legend2.js';
import { d as defineCustomElement$4 } from './map-picker2.js';
import { d as defineCustomElement$3 } from './map-search2.js';
import { d as defineCustomElement$2 } from './map-tools2.js';

const crowdsourceManagerCss = ":host{display:block;--calcite-label-margin-bottom:0px;--solutions-theme-foreground-color:var(--calcite-color-foreground-1)}.padding-1-2{padding:0.5rem}.display-flex{display:flex}.width-full{width:100%}.width-1-2{position:relative;width:50%}.width-1-3{position:relative;width:33.33%}.width-2-3{position:relative;width:66.66%}.width-0{width:0}.height-full{height:100%}.height-1-2{position:relative;height:50%}.height-0{height:0}.toggle-node{width:51px;height:51px}.overflow-hidden{overflow:hidden}.flex-column{flex-direction:column}.border{border:1px solid var(--calcite-color-border-3)}.border-bottom{border-bottom:1px solid var(--calcite-color-border-3)}.border-right{border-right:2px solid var(--calcite-color-border-3)}.border-sides{border-left:1px solid var(--calcite-color-border-3);border-right:1px solid var(--calcite-color-border-3)}.position-relative{position:relative}.position-absolute{position:absolute}.position-sticky{position:sticky}.height-50{height:50%}.top-51{top:51px}.adjusted-height-50{height:calc(50% - 25px)}.adjusted-height-100{height:calc(100% - 50px)}.adjusted-height-100-51{height:calc(100% - 51px)}.display-none{display:none !important}.adjusted-height-50_25{height:calc(50% + 25px)}.position-absolute-53{position:absolute;top:53px}.display-grid{display:grid}.height-50-px{height:50px}.padding-inline-start-75{padding-inline-start:0.75rem}.align-items-center{align-items:center}.esri-floor-filter__close-levels-button{width:40px !important;height:40px !important}.esri-floor-filter__level-button{width:40px !important;height:40px !important}.esri-floor-filter__browse-button{width:40px !important;height:40px !important}.position-absolute-50{position:absolute;top:50px;bottom:0px;left:0px;right:0px}.position-absolute-0{position:absolute;top:0px;bottom:0px;left:0px;right:0px}.visibility-hidden{visibility:hidden;height:0px}.position-fixed{position:fixed}.border-width-0{border-width:0px}.border-bottom-width-0{border-bottom-width:0px}.floating-container{position:fixed;width:100px;height:10px;bottom:0;right:0;margin:100px 0px}.floating-container .floating-button{box-shadow:0 10px 25px rgb(92 93 94 / 60%);transform:translatey(5px);transition:all 0.3s}.z-index-0{z-index:0 !important}";
const CrowdsourceManagerStyle0 = crowdsourceManagerCss;

const CrowdsourceManager$1 = /*@__PURE__*/ proxyCustomElement(class CrowdsourceManager extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.showIntroductionWindow = createEvent(this, "showIntroductionWindow", 7);
        this.showCoverPage = createEvent(this, "showCoverPage", 7);
        this.appLayout = undefined;
        this.appProxies = undefined;
        this.basemapConfig = undefined;
        this.coverPageEnabled = undefined;
        this.customInfoText = undefined;
        this.defaultAppLayout = undefined;
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
        this._isPortraitMobile = false;
        this._translations = undefined;
        this._layer = undefined;
        this._layoutMode = ELayoutMode.GRID;
        this._mapInfo = undefined;
        this._mapView = undefined;
        this._panelOpen = true;
        this._numSelected = 0;
        this._filterOpen = false;
        this._showInformationHeader = true;
        this._layerIds = undefined;
        this._isLoading = true;
    }
    get el() { return this; }
    //--------------------------------------------------------------------------
    //
    //  Properties (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * boolean: When true the default appLayout has been applied and should no longer override
     */
    _defaultAppLayoutHonored = false;
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
     * HTMLMapCardElement: Map card refrence element
     */
    _mapCard;
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
     * Adjust layout based on current appLayout value
     */
    appLayoutWatchHandler(newAppLayout, oldAppLayout) {
        if (newAppLayout !== oldAppLayout) {
            this._setActiveLayout(newAppLayout);
            // update the layer if table selected while switching to map view
            if (this.appLayout === "mapView" && this._layer.isTable) {
                void this._mapCard.updateLayer();
            }
            if (this._isMapViewOnLoad) {
                void this._layerTable.refresh();
                this._isMapViewOnLoad = false;
            }
        }
    }
    /**
     * When true the map zoom tools will be available
     */
    enableZoomWatchHandler() {
        this._initMapZoom();
    }
    /**
     * When true and no appLayout is defined the map will be hidden on load
     */
    hideMapOnLoadWatchHandler() {
        console.warn("hideMapOnLoad will be removed. Please use appLayout to control layout options.");
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
        if (this._isPortraitMobile) {
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
        const layer = await getLayerOrTable(this._mapView, id);
        layer && await layer.when(() => {
            // on render if no layer is present and only one table is present in map and app is in map view layer then change it to split layout
            if (this._layerIds.length === 0 && this.appLayout === 'mapView' && layer.isTable) {
                this.appLayout = "splitView";
            }
            this._layer = layer;
            this._initLayerExpressions();
            this._isLoading = false;
        });
    }
    /**
     * Get the layer ids from the map
     */
    async idsFound(evt) {
        this._layerIds = evt.detail.layerIds;
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
        return (h(Host, { key: 'ace73bfa1aa7d460f1cba60d13e94c4f47f77bd0' }, h("calcite-shell", { key: 'f14e70be762bf236be566111b45e40a42f0997f7', class: "position-relative" }, h("calcite-panel", { key: '0dde9426295a780b6a12cd98513f655914c0dab5', class: `width-full height-full ${borderClass}`, loading: this._isLoading }, this._getBody(this._layoutMode, this._panelOpen, this._hideTable)), this._getFooter()), this._filterModal()));
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
        if (!this._defaultAppLayoutHonored && this.defaultAppLayout) {
            this._defaultAppLayoutHonored = true;
            this.appLayout = this.defaultAppLayout;
        }
        else if (this.hideMapOnLoad && !this.appLayout) {
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
        return this._isPortraitMobile && hasSelectedFeatures && !this._hideFooter ? (h("div", { class: `width-100`, slot: "footer" }, h("div", { class: "display-flex padding-1-2" }, h("calcite-button", { appearance: "solid", id: "solutions-show", onClick: () => this.showHideMapPopupAndTable(true), width: "full" }, this._translations.view.replace("{{n}}", this._numSelected.toString())), deleteEnabled ? (h("delete-button", { class: "padding-inline-start-1 width-full", id: "solutions-delete", ids: this._layerTable.selectedIds, layer: this._layer })) : undefined))) : undefined;
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
            case ELayoutMode.HORIZONTAL:
                icon = (panelOpen ? "chevrons-up" : "chevrons-down");
                break;
            case ELayoutMode.VERTICAL:
                icon = (panelOpen ? "chevrons-left" : "chevrons-right");
                break;
            case ELayoutMode.GRID:
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
            case ELayoutMode.HORIZONTAL:
                sizeClass = `${panelOpen && !hideTable ? "height-1-2 display-grid" : panelOpen && hideTable ? "height-full" : "height-0"} width-full position-relative`;
                break;
            case ELayoutMode.GRID:
                sizeClass = `height-full position-relative ${panelOpen ? "width-1-3" : "width-0"}`;
                break;
            case ELayoutMode.VERTICAL:
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
            case ELayoutMode.HORIZONTAL:
                sizeClass = `${panelOpen ? "height-1-2" : "height-full"} width-full display-flex flex-column`;
                break;
            case ELayoutMode.GRID:
                sizeClass = `${panelOpen ? "width-2-3" : "width-full"} height-full display-flex`;
                break;
            case ELayoutMode.VERTICAL:
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
        const contentClass = layoutMode === ELayoutMode.HORIZONTAL ? "" : "display-flex";
        const themeClass = this.theme === "dark" ? "calcite-mode-dark" : "calcite-mode-light";
        return (h("calcite-panel", { class: "width-full height-full position-absolute" }, h("div", { class: `width-full height-full overflow-hidden ${contentClass}` }, this._getMapAndCard(layoutMode, panelOpen, hideTable), this._getTable(layoutMode, panelOpen, hideTable)), this.coverPageEnabled &&
            h("div", { class: "floating-container", onClick: this.coverPageButtonClick.bind(this) }, h("calcite-button", { appearance: "solid", class: `floating-button ${themeClass}`, "icon-start": "content-minimal", kind: "neutral", label: "", round: true, scale: "l", "split-child": "primary", width: "auto" })), this.introductionWindowEnabled &&
            h("div", { class: "floating-container", onClick: this.infoButtonClick.bind(this) }, h("calcite-button", { appearance: "solid", class: `floating-button ${themeClass}`, "icon-start": "information-letter", kind: "neutral", label: "", round: true, scale: "l", "split-child": "primary", width: "auto" }))));
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
        const borderRight = !this._isPortraitMobile && this._isMobile ? "border-right" : "";
        return (h("div", { class: `${mapSizeClass} overflow-hidden ${borderRight}` }, this._getMapNode(panelOpen), this._getPopupExpandNode()));
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
        const mapContainerClass = (isMapLayout || isTableLayout) ? "position-absolute-0" : this._layoutMode === ELayoutMode.HORIZONTAL && (!this._isPortraitMobile || panelOpen) ? "" : "adjusted-height-50";
        const hasMapAndLayer = this.defaultWebmap && this.defaultLayer;
        return (h("div", { class: `${mapContainerClass} overflow-hidden`, id: "card-mapView" }, h("map-card", { appLayout: this.appLayout, appProxies: this.appProxies, basemapConfig: this.basemapConfig, class: "width-full", defaultLayerId: hasMapAndLayer ? this.defaultLayer : "", defaultWebmapId: this.defaultWebmap, enableBasemap: this.enableBasemap, enableFloorFilter: this.enableFloorFilter, enableFullscreen: this.enableFullscreen, enableHome: this.enableHome, enableLegend: this.enableLegend, enableSearch: this.enableSearch, enableShare: this.enableShare, enableSingleExpand: true, hidden: !this._isPortraitMobile && isTableLayout, homeZoomIndex: 3, homeZoomPosition: "top-left", homeZoomToolsSize: "s", isMapLayout: isMapLayout, isMobile: this._isMobile, mapInfo: this._mapInfo, mapInfos: this.mapInfos?.filter(mapInfo => mapInfo.visible !== false), mapWidgetsIndex: 0, mapWidgetsPosition: "top-right", mapWidgetsSize: "m", onToggleFilter: this._toggleFilter.bind(this), onlyShowUpdatableLayers: this.onlyShowUpdatableLayers, ref: (el) => this._mapCard = el, selectedFeaturesIds: this._layerTable?.selectedIds, selectedLayer: this._layer, shareIncludeEmbed: this.shareIncludeEmbed, shareIncludeSocial: this.shareIncludeSocial, stackTools: true, theme: this.theme, toolOrder: ["legend", "search", "fullscreen", "basemap", "floorfilter"], zoomToScale: this.zoomToScale })));
    }
    /**
     * Get the expand node for the popup information
     *
     * @returns the expand node
     * @protected
     */
    _getPopupExpandNode() {
        const popupNodeClass = this._isMobile ? "height-full" : "height-full position-relative z-index-0";
        const headerClass = this._isPortraitMobile && this._showInformationHeader ? "display-none height-0" : "";
        const headerTheme = this.popupHeaderColor ? "" : !this._isPortraitMobile ? "calcite-mode-dark" : "calcite-mode-light";
        const containerClass = this._isPortraitMobile && this._hideTable ? "position-absolute-0 width-full height-full" : this._isPortraitMobile ? "display-none height-0" : "";
        const tableViewClass = this.mapInfos?.length > 1 && this.appLayout === "tableView" ? "position-relative top-51" : "";
        // position-sticky added to avoid an issue where this dialog would overlap the delete message modal in some small screens
        return (h("div", { class: `${headerTheme} ${popupNodeClass} ${containerClass} ${tableViewClass} position-sticky`, style: {
                '--calcite-color-foreground-1': this.popupHeaderColor, /* background color that will be displayed on the popup header */
                '--calcite-color-foreground-2': this.popupHeaderHoverColor, /* background color that will be displayed on button when hovered */
                '--calcite-color-text-3': this.popupHeaderTextColor, /* font color that will be displayed on button */
                '--calcite-color-text-2': this.popupHeaderTextColor, /* font color that will be displayed on popup header text*/
            } }, h("calcite-panel", null, (!this._isPortraitMobile && this._showInformationHeader) || (this._numSelected > 0 && !this._isPortraitMobile) ? (h("div", { class: `display-flex align-items-center ${headerClass}`, slot: "header-content" }, h("calcite-icon", { icon: "information", scale: "s" }), h("div", { class: "padding-inline-start-75" }, this._translations.information))) : h("div", null), this._getCardNode())));
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
        const cardManagerHeight = isTableLayout && this.mapInfos?.length > 1 ? "adjusted-height-100-51" : isMapLayout || isTableLayout ? "height-full" : (this._numSelected > 0 && !this._isMobile) ? "height-50" : !this._showInformationHeader ? "adjusted-height-50_25" : !this._isPortraitMobile ? "height-50" : "height-full";
        const themeClass = this.theme === "dark" ? "calcite-mode-dark" : "calcite-mode-light";
        return (h("div", { class: `width-50 height-full ${themeClass}` }, h("card-manager", { class: `${cardManagerHeight} width-full`, customInfoText: this.customInfoText, enableCreateFeatures: this._enableCreateFeatures && !this._isMobile, enableEditGeometry: this?._mapInfo?.enableEditGeometry, isMobile: this._isPortraitMobile, layer: this._layer, mapView: this?._mapView, onBackFromCreateWorkFlow: () => {
                this._showInformationHeader = true;
            }, onCreateWorkFlowStarted: () => {
                this.appLayout = this._layer.isTable ? "tableView" : "mapView";
                this._showInformationHeader = false;
            }, onFeatureOrRecordSubmitted: () => void this._layerTable.refresh(), selectedFeaturesIds: this._layerTable?.selectedIds, selectingFeatureFromMap: this.appLayout === "mapView", zoomAndScrollToSelected: this.zoomAndScrollToSelected })));
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
        const tableClass = hideTable && this._isPortraitMobile ? "visibility-hidden" : isMapLayout ? "display-none" : "";
        const mapClass = isMapLayout ? "height-full width-full z-index-0" : "display-none";
        const tableSizeClass = this._getTableSizeClass(layoutMode, panelOpen);
        const toggleLayout = layoutMode === ELayoutMode.HORIZONTAL ? "horizontal" : "vertical";
        const toggleSlot = layoutMode === ELayoutMode.HORIZONTAL ? "header" : "panel-start";
        const hasMapAndLayer = this.defaultWebmap && this.defaultLayer;
        const globalId = !this.defaultGlobalId ? undefined :
            this.defaultGlobalId?.indexOf(",") > -1 ? this.defaultGlobalId.split(",") : [this.defaultGlobalId];
        const defaultOid = !this.defaultOid ? undefined :
            this.defaultOid?.indexOf(",") > -1 ? this.defaultOid.split(",").map(o => parseInt(o, 10)) : [parseInt(this.defaultOid, 10)];
        return (h("calcite-shell", { class: `${tableSizeClass} border-bottom` }, !this._isMobile ? (h("calcite-action-bar", { class: "border-sides", expandDisabled: true, layout: toggleLayout, slot: toggleSlot }, this.getActions(layoutMode, panelOpen))) : undefined, h("div", { class: `width-full height-full position-relative z-index-0 ${tableClass}` }, h("layer-table", { appLayout: this.appLayout, createFilterModal: false, defaultGlobalId: hasMapAndLayer ? globalId : undefined, defaultLayerId: hasMapAndLayer ? this.defaultLayer : "", defaultOid: hasMapAndLayer && !globalId ? defaultOid : undefined, enableAutoRefresh: this.enableAutoRefresh, enableCSV: this.enableCSV, enableColumnReorder: this.enableColumnReorder, enableInlineEdit: this?._mapInfo?.enableInlineEdit, enableShare: this.enableShare, isMobile: this._isPortraitMobile, mapHidden: isTableLayout, mapInfo: this._mapInfo, mapView: this?._mapView, onToggleFilter: this._toggleFilter.bind(this), onlyShowUpdatableLayers: this.onlyShowUpdatableLayers, ref: (el) => this._layerTable = el, shareIncludeEmbed: this.shareIncludeEmbed, shareIncludeSocial: this.shareIncludeSocial, showNewestFirst: this.showNewestFirst, zoomAndScrollToSelected: this.zoomAndScrollToSelected, zoomToScale: this.zoomToScale })), h("div", { class: mapClass, id: "full-map-view" })));
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
        return (h(Fragment, null, h("calcite-action", { active: this.appLayout === 'splitView', class: "toggle-node", icon: "browser", id: "browser-action", onClick: () => { this.appLayout = "splitView"; }, text: "" }), h("calcite-tooltip", { placement: "right", "reference-element": "browser-action" }, h("span", null, this._translations.splitView)), h("calcite-action", { active: this.appLayout === 'tableView', class: "toggle-node", icon: "dock-left", id: "dock-left-action", onClick: () => { this.appLayout = "tableView"; }, text: "" }), h("calcite-tooltip", { placement: "right", "reference-element": "dock-left-action" }, h("span", null, this._translations.tableView)), h("calcite-action", { active: this.appLayout === 'mapView', class: "toggle-node", disabled: this._layerIds?.length === 0, icon: "browser-map", id: "browser-map-action", onClick: () => { this.appLayout = "mapView"; }, text: "" }), h("calcite-tooltip", { placement: "right", "reference-element": "browser-map-action" }, h("span", null, this._translations.mapView)), h("calcite-action", { class: "toggle-node", icon: icon, id: id, onClick: () => this._toggleLayout(), slot: "actions-end", text: "" }), h("calcite-tooltip", { placement: "bottom", "reference-element": id }, h("span", null, tooltip))));
    }
    /**
     * Show filter component in modal
     *
     * @returns node to interact with any configured filters for the current layer
     * @protected
     */
    _filterModal() {
        return (h("calcite-modal", { "aria-labelledby": "modal-title", class: "modal", kind: "brand", onCalciteModalClose: () => void this._closeFilter(), open: this._filterOpen, widthScale: "s" }, h("div", { class: "display-flex align-center", id: "modal-title", slot: "header" }, this._translations?.filter?.replace("{{title}}", this._layer?.title)), h("div", { slot: "content" }, h("instant-apps-filter-list", { autoUpdateUrl: false, closeBtn: true, closeBtnOnClick: async () => this._closeFilter(), comboboxOverlayPositioning: "fixed", layerExpressions: this._layerExpressions, onFilterListReset: () => {
                this._handleFilterListReset();
                void this._mapCard.resetFilter();
            }, onFilterUpdate: () => {
                void this._layerTable?.filterUpdate();
                void this._mapCard.updateFilterState();
            }, ref: (el) => this._filterList = el, view: this._mapView, zoomBtn: false }))));
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
        if (forceOpen) {
            this._panelOpen = true;
        }
        if (this._isMobile) {
            this.showHideMapPopupAndTable(!this._isMobile);
            this._isPortraitMobile = !!window.matchMedia("(orientation: portrait)").matches;
            this.appLayout = "splitView";
        }
        else {
            this._isPortraitMobile = false;
        }
        this._layoutMode = this._isPortraitMobile ? ELayoutMode.HORIZONTAL : ELayoutMode.GRID;
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
      * shows the map in card view
      *
      * @protected
      */
    _showMapInCardView() {
        if (this.appLayout !== "mapView") {
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
        const messages = await getLocaleComponentStrings(this.el);
        this._translations = messages[0];
    }
    static get watchers() { return {
        "appLayout": ["appLayoutWatchHandler"],
        "enableZoom": ["enableZoomWatchHandler"],
        "hideMapOnLoad": ["hideMapOnLoadWatchHandler"]
    }; }
    static get style() { return CrowdsourceManagerStyle0; }
}, [0, "crowdsource-manager", {
        "appLayout": [1025, "app-layout"],
        "appProxies": [8, "app-proxies"],
        "basemapConfig": [16],
        "coverPageEnabled": [4, "cover-page-enabled"],
        "customInfoText": [1, "custom-info-text"],
        "defaultAppLayout": [1, "default-app-layout"],
        "defaultCenter": [1, "default-center"],
        "defaultGlobalId": [1, "default-global-id"],
        "defaultLayer": [1, "default-layer"],
        "defaultLevel": [1, "default-level"],
        "defaultOid": [1, "default-oid"],
        "defaultWebmap": [1, "default-webmap"],
        "introductionWindowEnabled": [4, "introduction-window-enabled"],
        "enableAutoRefresh": [4, "enable-auto-refresh"],
        "enableBasemap": [4, "enable-basemap"],
        "enableColumnReorder": [4, "enable-column-reorder"],
        "enableCSV": [4, "enable-c-s-v"],
        "enableFloorFilter": [4, "enable-floor-filter"],
        "enableFullscreen": [4, "enable-fullscreen"],
        "enableHome": [4, "enable-home"],
        "enableLegend": [4, "enable-legend"],
        "enableSearch": [4, "enable-search"],
        "enableShare": [4, "enable-share"],
        "enableZoom": [4, "enable-zoom"],
        "hideMapOnLoad": [4, "hide-map-on-load"],
        "mapInfos": [16],
        "onlyShowUpdatableLayers": [4, "only-show-updatable-layers"],
        "popupHeaderColor": [1, "popup-header-color"],
        "popupHeaderHoverColor": [1, "popup-header-hover-color"],
        "popupHeaderHoverTextColor": [1, "popup-header-hover-text-color"],
        "popupHeaderTextColor": [1, "popup-header-text-color"],
        "searchConfiguration": [16],
        "shareIncludeEmbed": [4, "share-include-embed"],
        "shareIncludeSocial": [4, "share-include-social"],
        "showNewestFirst": [4, "show-newest-first"],
        "theme": [1],
        "zoomAndScrollToSelected": [4, "zoom-and-scroll-to-selected"],
        "zoomToScale": [2, "zoom-to-scale"],
        "_enableCreateFeatures": [32],
        "_hideFooter": [32],
        "_hideTable": [32],
        "_isMobile": [32],
        "_isPortraitMobile": [32],
        "_translations": [32],
        "_layer": [32],
        "_layoutMode": [32],
        "_mapInfo": [32],
        "_mapView": [32],
        "_panelOpen": [32],
        "_numSelected": [32],
        "_filterOpen": [32],
        "_showInformationHeader": [32],
        "_layerIds": [32],
        "_isLoading": [32]
    }, [[8, "featureSelectionChange", "featureSelectionChange"], [8, "popupClosed", "popupClosed"], [8, "layoutChanged", "layoutChanged"], [8, "mapChanged", "mapChanged"], [8, "layerSelectionChange", "layerSelectionChange"], [8, "idsFound", "idsFound"]], {
        "appLayout": ["appLayoutWatchHandler"],
        "enableZoom": ["enableZoomWatchHandler"],
        "hideMapOnLoad": ["hideMapOnLoadWatchHandler"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["crowdsource-manager", "basemap-gallery", "calcite-action", "calcite-action-bar", "calcite-action-group", "calcite-action-menu", "calcite-alert", "calcite-block", "calcite-button", "calcite-checkbox", "calcite-chip", "calcite-combobox", "calcite-combobox-item", "calcite-date-picker", "calcite-date-picker-day", "calcite-date-picker-month", "calcite-date-picker-month-header", "calcite-dropdown", "calcite-dropdown-group", "calcite-dropdown-item", "calcite-filter", "calcite-flow-item", "calcite-graph", "calcite-handle", "calcite-icon", "calcite-input", "calcite-input-date-picker", "calcite-input-text", "calcite-label", "calcite-list", "calcite-list-item", "calcite-loader", "calcite-modal", "calcite-notice", "calcite-option", "calcite-panel", "calcite-popover", "calcite-progress", "calcite-scrim", "calcite-select", "calcite-shell", "calcite-slider", "calcite-stack", "calcite-tooltip", "card-manager", "create-feature", "delete-button", "delete-dialog", "edit-card", "floor-filter", "info-card", "instant-apps-filter-list", "instant-apps-social-share", "layer-table", "map-card", "map-fullscreen", "map-layer-picker", "map-legend", "map-picker", "map-search", "map-tools"];
    components.forEach(tagName => { switch (tagName) {
        case "crowdsource-manager":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, CrowdsourceManager$1);
            }
            break;
        case "basemap-gallery":
            if (!customElements.get(tagName)) {
                defineCustomElement$Z();
            }
            break;
        case "calcite-action":
            if (!customElements.get(tagName)) {
                defineCustomElement$Y();
            }
            break;
        case "calcite-action-bar":
            if (!customElements.get(tagName)) {
                defineCustomElement$X();
            }
            break;
        case "calcite-action-group":
            if (!customElements.get(tagName)) {
                defineCustomElement$W();
            }
            break;
        case "calcite-action-menu":
            if (!customElements.get(tagName)) {
                defineCustomElement$V();
            }
            break;
        case "calcite-alert":
            if (!customElements.get(tagName)) {
                defineCustomElement$U();
            }
            break;
        case "calcite-block":
            if (!customElements.get(tagName)) {
                defineCustomElement$T();
            }
            break;
        case "calcite-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$S();
            }
            break;
        case "calcite-checkbox":
            if (!customElements.get(tagName)) {
                defineCustomElement$R();
            }
            break;
        case "calcite-chip":
            if (!customElements.get(tagName)) {
                defineCustomElement$Q();
            }
            break;
        case "calcite-combobox":
            if (!customElements.get(tagName)) {
                defineCustomElement$P();
            }
            break;
        case "calcite-combobox-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$O();
            }
            break;
        case "calcite-date-picker":
            if (!customElements.get(tagName)) {
                defineCustomElement$N();
            }
            break;
        case "calcite-date-picker-day":
            if (!customElements.get(tagName)) {
                defineCustomElement$M();
            }
            break;
        case "calcite-date-picker-month":
            if (!customElements.get(tagName)) {
                defineCustomElement$L();
            }
            break;
        case "calcite-date-picker-month-header":
            if (!customElements.get(tagName)) {
                defineCustomElement$K();
            }
            break;
        case "calcite-dropdown":
            if (!customElements.get(tagName)) {
                defineCustomElement$J();
            }
            break;
        case "calcite-dropdown-group":
            if (!customElements.get(tagName)) {
                defineCustomElement$I();
            }
            break;
        case "calcite-dropdown-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$H();
            }
            break;
        case "calcite-filter":
            if (!customElements.get(tagName)) {
                defineCustomElement$G();
            }
            break;
        case "calcite-flow-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$F();
            }
            break;
        case "calcite-graph":
            if (!customElements.get(tagName)) {
                defineCustomElement$E();
            }
            break;
        case "calcite-handle":
            if (!customElements.get(tagName)) {
                defineCustomElement$D();
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$C();
            }
            break;
        case "calcite-input":
            if (!customElements.get(tagName)) {
                defineCustomElement$B();
            }
            break;
        case "calcite-input-date-picker":
            if (!customElements.get(tagName)) {
                defineCustomElement$A();
            }
            break;
        case "calcite-input-text":
            if (!customElements.get(tagName)) {
                defineCustomElement$z();
            }
            break;
        case "calcite-label":
            if (!customElements.get(tagName)) {
                defineCustomElement$y();
            }
            break;
        case "calcite-list":
            if (!customElements.get(tagName)) {
                defineCustomElement$x();
            }
            break;
        case "calcite-list-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$w();
            }
            break;
        case "calcite-loader":
            if (!customElements.get(tagName)) {
                defineCustomElement$v();
            }
            break;
        case "calcite-modal":
            if (!customElements.get(tagName)) {
                defineCustomElement$u();
            }
            break;
        case "calcite-notice":
            if (!customElements.get(tagName)) {
                defineCustomElement$t();
            }
            break;
        case "calcite-option":
            if (!customElements.get(tagName)) {
                defineCustomElement$s();
            }
            break;
        case "calcite-panel":
            if (!customElements.get(tagName)) {
                defineCustomElement$r();
            }
            break;
        case "calcite-popover":
            if (!customElements.get(tagName)) {
                defineCustomElement$q();
            }
            break;
        case "calcite-progress":
            if (!customElements.get(tagName)) {
                defineCustomElement$p();
            }
            break;
        case "calcite-scrim":
            if (!customElements.get(tagName)) {
                defineCustomElement$o();
            }
            break;
        case "calcite-select":
            if (!customElements.get(tagName)) {
                defineCustomElement$n();
            }
            break;
        case "calcite-shell":
            if (!customElements.get(tagName)) {
                defineCustomElement$m();
            }
            break;
        case "calcite-slider":
            if (!customElements.get(tagName)) {
                defineCustomElement$l();
            }
            break;
        case "calcite-stack":
            if (!customElements.get(tagName)) {
                defineCustomElement$k();
            }
            break;
        case "calcite-tooltip":
            if (!customElements.get(tagName)) {
                defineCustomElement$j();
            }
            break;
        case "card-manager":
            if (!customElements.get(tagName)) {
                defineCustomElement$i();
            }
            break;
        case "create-feature":
            if (!customElements.get(tagName)) {
                defineCustomElement$h();
            }
            break;
        case "delete-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$g();
            }
            break;
        case "delete-dialog":
            if (!customElements.get(tagName)) {
                defineCustomElement$f();
            }
            break;
        case "edit-card":
            if (!customElements.get(tagName)) {
                defineCustomElement$e();
            }
            break;
        case "floor-filter":
            if (!customElements.get(tagName)) {
                defineCustomElement$d();
            }
            break;
        case "info-card":
            if (!customElements.get(tagName)) {
                defineCustomElement$c();
            }
            break;
        case "instant-apps-filter-list":
            if (!customElements.get(tagName)) {
                defineCustomElement$b();
            }
            break;
        case "instant-apps-social-share":
            if (!customElements.get(tagName)) {
                defineCustomElement$a();
            }
            break;
        case "layer-table":
            if (!customElements.get(tagName)) {
                defineCustomElement$9();
            }
            break;
        case "map-card":
            if (!customElements.get(tagName)) {
                defineCustomElement$8();
            }
            break;
        case "map-fullscreen":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "map-layer-picker":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "map-legend":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "map-picker":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "map-search":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "map-tools":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}
defineCustomElement$1();

const CrowdsourceManager = CrowdsourceManager$1;
const defineCustomElement = defineCustomElement$1;

export { CrowdsourceManager, defineCustomElement };
