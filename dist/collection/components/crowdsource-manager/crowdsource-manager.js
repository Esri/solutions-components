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
import { getLocaleComponentStrings } from "../../utils/locale";
import { ELayoutMode } from "../../utils/interfaces";
import { getLayerOrTable } from "../../utils/mapViewUtils";
export class CrowdsourceManager {
    constructor() {
        /**
         * boolean: When true the map view will be set after render due to popup obstructing the view
         * MapView.when is not fired when mapView is not currently visible
         */
        this._shouldSetMapView = false;
        this.defaultCenter = "";
        this.defaultFilter = "";
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
        this._layoutMode = ELayoutMode.GRID;
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
     * Watch for center url param to be set
     */
    defaultCenterWatchHandler() {
        this._defaultCenter = !this.defaultCenter ? undefined :
            this.defaultCenter.split(";").map(v => parseFloat(v));
    }
    /**
     * Watch for filter url param to be set
     */
    defaultFilterWatchHandler() {
        this._defaultFilter = JSON.parse(this.defaultFilter);
    }
    /**
     * Watch for globalid url param to be set
     */
    defaultGlobalIdWatchHandler() {
        this._defaultGlobalId = !this.defaultGlobalId ? undefined :
            this.defaultGlobalId.indexOf(",") > -1 ? this.defaultGlobalId.split(",") : [this.defaultGlobalId];
    }
    /**
     * Watch for oid url param to be set
     */
    defaultOidWatchHandler() {
        this._defaultOid = !this.defaultOid ? undefined :
            this.defaultOid.indexOf(",") > -1 ? this.defaultOid.split(",").map(o => parseInt(o, 10)) : [parseInt(this.defaultOid, 10)];
    }
    /**
     * Watch for zoom level param to be set
     */
    defaultLevelWatchHandler() {
        this._defaultLevel = !this.defaultLevel ? undefined : parseInt(this.defaultLevel, 10);
    }
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
        const layer = await getLayerOrTable(this._mapView, id);
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
        return (h(Host, null, h("calcite-shell", { class: "position-relative" }, h("calcite-panel", { class: `width-full height-full ${borderClass}` }, this._getBody(this._layoutMode, this._panelOpen, this._hideTable)), this._getFooter())));
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
        return this._isMobile && hasSelectedFeatures && !this._hideFooter ? (h("div", { class: `width-100`, slot: "footer" }, h("div", { class: "display-flex padding-1-2" }, h("calcite-button", { appearance: "solid", id: "solutions-show", onClick: () => this.showHideMapPopupAndTable(true), width: "full" }, this._translations.view.replace("{{n}}", this._numSelected.toString())), deleteEnabled ? (h("delete-button", { class: "padding-inline-start-1 width-full", id: "solutions-delete", ids: this._layerTable.selectedIds, layer: this._layer })) : undefined))) : undefined;
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
        return (h("calcite-panel", { class: "width-full height-full" }, h("div", { class: `width-full height-full overflow-hidden ${contentClass}` }, this._getMapAndCard(layoutMode, panelOpen, hideTable), this._getTable(layoutMode, panelOpen, hideTable))));
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
        return (h("div", { class: `${mapSizeClass} overflow-hidden` }, this._getMapNode(panelOpen), this._getPopupExpandNode()));
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
        const mapContainerClass = this._layoutMode === ELayoutMode.HORIZONTAL && (!this._isMobile || panelOpen) ? "" : "adjusted-height-50";
        return (h("div", { class: `${mapContainerClass} overflow-hidden` }, h("map-card", { basemapConfig: this.basemapConfig, class: "width-full", defaultWebmapId: this.defaultWebmap, enableBasemap: this.enableBasemap, enableFloorFilter: this.enableFloorFilter, enableFullscreen: this.enableFullscreen, enableHome: this.enableHome, enableLegend: this.enableLegend, enableSearch: this.enableSearch, enableSingleExpand: true, hidden: this._expandPopup && !this._isMobile, homeZoomIndex: 3, homeZoomPosition: "top-left", homeZoomToolsSize: "s", mapInfos: (_a = this.mapInfos) === null || _a === void 0 ? void 0 : _a.filter(mapInfo => mapInfo.visible !== false), mapWidgetsIndex: 0, mapWidgetsPosition: "top-right", mapWidgetsSize: "m", stackTools: true, theme: this.theme, toolOrder: ["legend", "search", "fullscreen", "basemap", "floorfilter"] })));
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
        return (h("div", { class: `${headerTheme} ${popupNodeClass} ${containerClass}` }, h("calcite-panel", null, !this._isMobile ? (h("div", { class: `display-flex align-items-center ${headerClass}`, slot: "header-content" }, h("calcite-icon", { icon: "information", scale: "s" }), h("div", { class: "padding-inline-start-75" }, this._translations.information))) : undefined, h("calcite-action", { class: headerClass, disabled: this._tableOnly, icon: icon, id: id, onClick: () => this._togglePopup(), slot: "header-actions-end", text: "" }), !this._tableOnly ? h("calcite-tooltip", { class: themeClass, label: "", placement: "bottom", "reference-element": id }, h("span", null, tooltip)) : undefined, this._getCardNode())));
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
        return (h("div", { class: `width-50 height-full ${themeClass}` }, h("card-manager", { class: `${cardManagerHeight} width-full`, isMobile: this._isMobile, mapView: this === null || this === void 0 ? void 0 : this._mapView, zoomAndScrollToSelected: this.zoomAndScrollToSelected })));
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
        const tableClass = hideTable && this._isMobile ? "visibility-hidden" : "";
        const tableSizeClass = this._getTableSizeClass(layoutMode, panelOpen);
        const icon = this._getDividerIcon(layoutMode, panelOpen);
        const tooltip = panelOpen ? this._translations.close : this._translations.open;
        const id = "toggle-layout";
        const toggleLayout = layoutMode === ELayoutMode.HORIZONTAL ? "horizontal" : "vertical";
        const toggleSlot = layoutMode === ELayoutMode.HORIZONTAL ? "header" : "panel-start";
        const hasMapAndLayer = this.defaultWebmap && this.defaultLayer;
        return (h("calcite-shell", { class: `${tableSizeClass} ${tableClass} border-bottom` }, !this._isMobile ? (h("calcite-action-bar", { class: "border-sides", expandDisabled: true, layout: toggleLayout, slot: toggleSlot }, h("calcite-action", { class: "toggle-node", icon: icon, id: id, onClick: () => this._toggleLayout(), text: "" }), h("calcite-tooltip", { label: tooltip, placement: "bottom", "reference-element": id }, h("span", null, tooltip)))) : undefined, h("div", { class: `width-full height-full position-relative` }, h("layer-table", { defaultFilter: hasMapAndLayer ? this._defaultFilter : undefined, defaultGlobalId: hasMapAndLayer ? this._defaultGlobalId : undefined, defaultLayerId: hasMapAndLayer ? this.defaultLayer : "", defaultOid: hasMapAndLayer && !this.defaultGlobalId ? this._defaultOid : undefined, enableAutoRefresh: this.enableAutoRefresh, enableCSV: this.enableCSV, enableColumnReorder: this.enableColumnReorder, enableInlineEdit: this.enableInlineEdit, enableShare: this.enableShare, isMobile: this._isMobile, mapInfo: this._mapInfo, mapView: this === null || this === void 0 ? void 0 : this._mapView, onlyShowUpdatableLayers: this.onlyShowUpdatableLayers, ref: (el) => this._layerTable = el, shareIncludeEmbed: this.shareIncludeEmbed, shareIncludeSocial: this.shareIncludeSocial, showNewestFirst: this.showNewestFirst, zoomAndScrollToSelected: this.zoomAndScrollToSelected }))));
    }
    /**
     * Update the component layout when its size changes
     */
    _onResize() {
        const isMobile = this.el.offsetWidth < 1024;
        const forceOpen = !this._isMobile && isMobile;
        this._isMobile = isMobile;
        this._layoutMode = this._isMobile ? ELayoutMode.HORIZONTAL : ELayoutMode.GRID;
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
        this._mapInfo = this._getMapInfo(this._mapChange.id);
        this._mapView = this._mapChange.mapView;
        this._initMapZoom();
        this._mapView.popupEnabled = false;
        if (this._defaultCenter && this._defaultLevel) {
            await this._mapView.goTo({
                center: this._defaultCenter,
                zoom: this._defaultLevel
            });
            this._defaultCenter = undefined;
            this._defaultLevel = undefined;
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
    static get is() { return "crowdsource-manager"; }
    static get originalStyleUrls() {
        return {
            "$": ["crowdsource-manager.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["crowdsource-manager.css"]
        };
    }
    static get properties() {
        return {
            "defaultCenter": {
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
                    "text": "string: default center point values for the map\r\n; delimited x;y pair"
                },
                "attribute": "default-center",
                "reflect": false,
                "defaultValue": "\"\""
            },
            "defaultFilter": {
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
                    "text": "string: default layer expression to apply to the current layer"
                },
                "attribute": "default-filter",
                "reflect": false,
                "defaultValue": "\"\""
            },
            "defaultGlobalId": {
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
                    "text": "string: Global ID of the feature to select"
                },
                "attribute": "default-global-id",
                "reflect": false,
                "defaultValue": "\"\""
            },
            "defaultLayer": {
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
                    "text": "string: when provided this layer ID will be used when the app loads"
                },
                "attribute": "default-layer",
                "reflect": false,
                "defaultValue": "\"\""
            },
            "defaultLevel": {
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
                    "text": "string: default zoom level"
                },
                "attribute": "default-level",
                "reflect": false,
                "defaultValue": "\"\""
            },
            "defaultOid": {
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
                    "text": "string: Object ID of feature to select"
                },
                "attribute": "default-oid",
                "reflect": false,
                "defaultValue": "\"\""
            },
            "defaultWebmap": {
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
                    "text": "string: Item ID of the web map that should be selected by default"
                },
                "attribute": "default-webmap",
                "reflect": false,
                "defaultValue": "\"\""
            },
            "enableAutoRefresh": {
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
                    "text": "boolean: when true the layer table will auto refresh the data"
                },
                "attribute": "enable-auto-refresh",
                "reflect": false,
                "defaultValue": "false"
            },
            "enableColumnReorder": {
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
                    "text": "boolean: when true the layer table will support drag/drop of columns to adjust order"
                },
                "attribute": "enable-column-reorder",
                "reflect": false,
                "defaultValue": "true"
            },
            "enableCSV": {
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
                    "text": "boolean: when true the export to csv button will be available"
                },
                "attribute": "enable-c-s-v",
                "reflect": false,
                "defaultValue": "true"
            },
            "enableFloorFilter": {
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
                    "text": "boolean: when true the fullscreen widget will be available"
                },
                "attribute": "enable-floor-filter",
                "reflect": false,
                "defaultValue": "true"
            },
            "enableFullscreen": {
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
                    "text": "boolean: when true the fullscreen widget will be available"
                },
                "attribute": "enable-fullscreen",
                "reflect": false,
                "defaultValue": "true"
            },
            "enableInlineEdit": {
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
                    "text": "boolean: when true edits can be applied directly within the table"
                },
                "attribute": "enable-inline-edit",
                "reflect": false,
                "defaultValue": "false"
            },
            "enableLegend": {
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
                    "text": "boolean: when true the legend widget will be available"
                },
                "attribute": "enable-legend",
                "reflect": false,
                "defaultValue": "true"
            },
            "enableSearch": {
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
                    "text": "boolean: when true the search widget will be available"
                },
                "attribute": "enable-search",
                "reflect": false,
                "defaultValue": "true"
            },
            "enableShare": {
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
                    "text": "boolean: when true the share widget will be available"
                },
                "attribute": "enable-share",
                "reflect": false,
                "defaultValue": "false"
            },
            "enableHome": {
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
                    "text": "boolean: when true the home widget will be available"
                },
                "attribute": "enable-home",
                "reflect": false,
                "defaultValue": "true"
            },
            "enableZoom": {
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
                    "text": "boolean: when true the zoom widget will be available"
                },
                "attribute": "enable-zoom",
                "reflect": false,
                "defaultValue": "true"
            },
            "enableBasemap": {
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
                    "text": "boolean: when true the basemap widget will be available"
                },
                "attribute": "enable-basemap",
                "reflect": false,
                "defaultValue": "true"
            },
            "basemapConfig": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "IBasemapConfig",
                    "resolved": "IBasemapConfig",
                    "references": {
                        "IBasemapConfig": {
                            "location": "import",
                            "path": "../../utils/interfaces",
                            "id": "src/utils/interfaces.ts::IBasemapConfig"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "IBasemapConfig: List of any basemaps to filter out from the basemap widget"
                }
            },
            "showNewestFirst": {
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
                    "text": "boolean: when true the table will be sorted by objectid in descending order by default"
                },
                "attribute": "show-newest-first",
                "reflect": false,
                "defaultValue": "true"
            },
            "mapInfos": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "IMapInfo[]",
                    "resolved": "IMapInfo[]",
                    "references": {
                        "IMapInfo": {
                            "location": "import",
                            "path": "../../utils/interfaces",
                            "id": "src/utils/interfaces.ts::IMapInfo"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "IMapInfo[]: array of map infos (name and id)"
                },
                "defaultValue": "[]"
            },
            "onlyShowUpdatableLayers": {
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
                    "text": "boolean: When true only editable layers that support the update capability will be available"
                },
                "attribute": "only-show-updatable-layers",
                "reflect": false,
                "defaultValue": "true"
            },
            "searchConfiguration": {
                "type": "unknown",
                "mutable": false,
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
            "shareIncludeEmbed": {
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
                    "text": "boolean: When true the share options will include embed option"
                },
                "attribute": "share-include-embed",
                "reflect": false
            },
            "shareIncludeSocial": {
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
                    "text": "boolean: When true the share options will include social media sharing"
                },
                "attribute": "share-include-social",
                "reflect": false
            },
            "theme": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "theme",
                    "resolved": "\"dark\" | \"light\"",
                    "references": {
                        "theme": {
                            "location": "import",
                            "path": "../../utils/interfaces",
                            "id": "src/utils/interfaces.ts::theme"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "theme: \"light\" | \"dark\" theme to be used"
                },
                "attribute": "theme",
                "reflect": false,
                "defaultValue": "\"light\""
            },
            "zoomAndScrollToSelected": {
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
                    "text": "boolean: When true the selected feature will zoomed to in the map and the row will be scrolled to within the table"
                },
                "attribute": "zoom-and-scroll-to-selected",
                "reflect": false,
                "defaultValue": "false"
            }
        };
    }
    static get states() {
        return {
            "_expandPopup": {},
            "_hideFooter": {},
            "_hideTable": {},
            "_isMobile": {},
            "_translations": {},
            "_layer": {},
            "_layoutMode": {},
            "_mapInfo": {},
            "_mapView": {},
            "_panelOpen": {},
            "_numSelected": {},
            "_tableOnly": {}
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "defaultCenter",
                "methodName": "defaultCenterWatchHandler"
            }, {
                "propName": "defaultFilter",
                "methodName": "defaultFilterWatchHandler"
            }, {
                "propName": "defaultGlobalId",
                "methodName": "defaultGlobalIdWatchHandler"
            }, {
                "propName": "defaultOid",
                "methodName": "defaultOidWatchHandler"
            }, {
                "propName": "defaultLevel",
                "methodName": "defaultLevelWatchHandler"
            }, {
                "propName": "enableZoom",
                "methodName": "enableZoomWatchHandler"
            }];
    }
    static get listeners() {
        return [{
                "name": "featureSelectionChange",
                "method": "featureSelectionChange",
                "target": "window",
                "capture": false,
                "passive": false
            }, {
                "name": "popupClosed",
                "method": "popupClosed",
                "target": "window",
                "capture": false,
                "passive": false
            }, {
                "name": "idsFound",
                "method": "idsFound",
                "target": "window",
                "capture": false,
                "passive": false
            }, {
                "name": "layoutChanged",
                "method": "layoutChanged",
                "target": "window",
                "capture": false,
                "passive": false
            }, {
                "name": "mapChanged",
                "method": "mapChanged",
                "target": "window",
                "capture": false,
                "passive": false
            }, {
                "name": "beforeMapChanged",
                "method": "beforeMapChanged",
                "target": "window",
                "capture": false,
                "passive": false
            }, {
                "name": "layerSelectionChange",
                "method": "layerSelectionChange",
                "target": "window",
                "capture": false,
                "passive": false
            }];
    }
}
