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

import { Component, Element, Host, h, Listen, Prop, State, VNode, Watch } from "@stencil/core";
import CrowdsourceManager_T9n from "../../assets/t9n/crowdsource-manager/resources.json";
import { getLocaleComponentStrings } from "../../utils/locale";
import { ELayoutMode, IBasemapConfig, ILayerAndTableIds, IMapChange, IMapInfo, ISearchConfiguration, theme } from "../../utils/interfaces";

@Component({
  tag: "crowdsource-manager",
  styleUrl: "crowdsource-manager.css",
  shadow: false,
})
export class CrowdsourceManager {
  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLCrowdsourceManagerElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * string: default center point values for the map
   * ; delimited x;y pair
   */
  @Prop() defaultCenter = "";

  /**
   * string: Global ID of the feature to select
   */
  @Prop() defaultGlobalId = "";

  /**
   * string: when provided this layer ID will be used when the app loads
   */
  @Prop() defaultLayer = "";

  /**
   * string: default zoom level
   */
  @Prop() defaultLevel = "";

  /**
   * string: Object ID of feature to select
   */
  @Prop() defaultOid = "";

  /**
   * string: Item ID of the web map that should be selected by default
   */
  @Prop() defaultWebmap = "";

  /**
   * boolean: when true the layer table will auto refresh the data
   */
  @Prop() enableAutoRefresh = false;

  /**
   * boolean: when true the layer table will support drag/drop of columns to adjust order
   */
  @Prop() enableColumnReorder = true;

  /**
   * boolean: when true the export to csv button will be available
   */
  @Prop() enableCSV = true;

  /**
   * boolean: when true the fullscreen widget will be available
   */
  @Prop() enableFloorFilter = true;

  /**
   * boolean: when true the fullscreen widget will be available
   */
  @Prop() enableFullscreen = true;

  /**
   * boolean: when true edits can be applied directly within the table
   */
  @Prop() enableInlineEdit = false;

  /**
   * boolean: when true the legend widget will be available
   */
  @Prop() enableLegend = true;

  /**
   * boolean: when true the search widget will be available
   */
  @Prop() enableSearch = true;

  /**
   * boolean: when true the share widget will be available
   */
  @Prop() enableShare = false;

  /**
   * boolean: when true the home widget will be available
   */
  @Prop() enableHome = true;

  /**
   * boolean: when true the zoom widget will be available
   */
  @Prop() enableZoom = true;

  /**
   * boolean: when true the basemap widget will be available
   */
  @Prop() enableBasemap = true;

  /**
   * IBasemapConfig: List of any basemaps to filter out from the basemap widget
   */
  @Prop() basemapConfig: IBasemapConfig;

  /**
   * boolean: when true the table will be sorted by objectid in descending order by default
   */
  @Prop() showNewestFirst = true;

  /**
   * IMapInfo[]: array of map infos (name and id)
   */
  @Prop() mapInfos: IMapInfo[] = [];

  /**
   * boolean: When true only editable layers that support the update capability will be available
   */
  @Prop() onlyShowUpdatableLayers = true;

  /**
   * ISearchConfiguration: Configuration details for the Search widget
   */
  @Prop() searchConfiguration: ISearchConfiguration;

  /**
   * boolean: When true the share options will include embed option
   */
  @Prop() shareIncludeEmbed: boolean;

  /**
   * boolean: When true the share options will include social media sharing
   */
  @Prop() shareIncludeSocial: boolean;

  /**
   * theme: "light" | "dark" theme to be used
   */
  @Prop() theme: theme = "light";

  /**
   * boolean: When true the selected feature will zoomed to in the map and the row will be scrolled to within the table
   */
  @Prop() zoomAndScrollToSelected = false;

  //--------------------------------------------------------------------------
  //
  //  State (internal)
  //
  //--------------------------------------------------------------------------

  /**
   * When true the info panel with the popup details will take the full height and prevent the map from displaying
   */
  @State() _expandPopup = false;

  /**
   * When true the mobile footer will be hidden
   */
  @State() _hideFooter = false;

  /**
   * When true the table will be hidden
   */
  @State() _hideTable = false;

  /**
   * When true the component will render an optimized view for mobile devices
   */
  @State() _isMobile: boolean;

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() _translations: typeof CrowdsourceManager_T9n;

  /**
   * Controls the layout of the application
   */
  @State() _layoutMode: ELayoutMode = ELayoutMode.GRID;

  /**
   * IMapInfo: The current map info stores configuration details
   */
  @State() _mapInfo: IMapInfo;

  /**
   * Stores the current map view
   */
  @State() _mapView: __esri.MapView;

  /**
   * Controls the layout of the application
   */
  @State() _panelOpen = true;

  /**
   * Number of selected features in the table
   */
  @State() _numSelected = 0;

  /**
   * When true only editable tables have been found and the map will be hidden
   */
  @State() _tableOnly = false;

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * number[]: X,Y pair used to center the map
   */
  protected _defaultCenter: number[];

  /**
   * string[]: List of global ids that should be selected by default
   */
  protected _defaultGlobalId: string[];

  /**
   * number: zoom level the map should go to
   */
  protected _defaultLevel: number;

  /**
   * number[]: List of ids that should be selected by default
   */
  protected _defaultOid: number[];

  /**
   * HTMLLayerTableElement: The layer table element
   */
  protected _layerTable: HTMLLayerTableElement;

  /**
   * IMapChange: The current map change details
   */
  protected _mapChange: IMapChange;

  /**
   * ResizeObserver: The observer that watches for screen size changes
   */
  protected _resizeObserver: ResizeObserver;

  /**
   * boolean: When true the map view will be set after render due to popup obstructing the view
   * MapView.when is not fired when mapView is not currently visible
   */
  protected _shouldSetMapView = false;

  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------

  /**
   * Watch for center url param to be set
   */
  @Watch("defaultCenter")
  defaultCenterWatchHandler(): void {
    this._defaultCenter = !this.defaultCenter ? undefined :
      this.defaultCenter.split(";").map(v => parseFloat(v));
  }

  /**
   * Watch for globalid url param to be set
   */
  @Watch("defaultGlobalId")
  defaultGlobalIdWatchHandler(): void {
    this._defaultGlobalId = !this.defaultGlobalId ? undefined :
      this.defaultGlobalId.indexOf(",") > -1 ? this.defaultGlobalId.split(",") : [this.defaultGlobalId];
  }

  /**
   * Watch for oid url param to be set
   */
  @Watch("defaultOid")
  defaultOidWatchHandler(): void {
    this._defaultOid = !this.defaultOid ? undefined :
      this.defaultOid.indexOf(",") > -1 ? this.defaultOid.split(",").map(o => parseInt(o, 10)) : [parseInt(this.defaultOid, 10)];
  }

  /**
   * Watch for zoom level param to be set
   */
  @Watch("defaultLevel")
  defaultLevelWatchHandler(): void {
    this._defaultLevel = !this.defaultLevel ? undefined : parseInt(this.defaultLevel, 10);
  }

  /**
   * When true the map zoom tools will be available
   */
  @Watch("enableZoom")
  enableZoomWatchHandler(): void {
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
  @Listen("featureSelectionChange", { target: "window" })
  async featureSelectionChange(
    evt: CustomEvent
  ): Promise<void> {
    this._numSelected = evt.detail?.length;
  }

  /**
   * Listen for when the popup is closed in mobile mode and hide the appropriate UI elements
   */
  @Listen("popupClosed", { target: "window" })
  async popupClosed(): Promise<void> {
    if (this._isMobile) {
      this.showHideMapPopupAndTable(false);
    }
  }

  /**
   * Listen for idsFound event to be fired so we can know that all layer ids have been fetched
   */
  @Listen("idsFound", { target: "window" })
  async idsFound(
    evt: CustomEvent
  ): Promise<void> {
    const ids: ILayerAndTableIds = evt.detail;
    this._tableOnly = ids.tableIds.length > 0 && ids.layerIds.length === 0;
    if (this._tableOnly) {
      this._expandPopup = true;
    }
  }

  /**
   * Listen for layoutChanged event to be fired so we can adjust the layout
   */
  @Listen("layoutChanged", { target: "window" })
  async layoutChanged(
    evt: CustomEvent
  ): Promise<void> {
    this._layoutMode = evt.detail;
  }

  /**
   * Listen for mapChanged event to be fired then store the new mapView so components will be updated
   */
  @Listen("mapChanged", { target: "window" })
  async mapChanged(
    evt: CustomEvent
  ): Promise<void> {
    this._mapChange = evt.detail;
    await this._mapChange.mapView.when(async () => {
      await this._setMapView();
    });
  }

  /**
   * Listen for beforeMapChanged and minimize the popup if it's expanded
   */
  @Listen("beforeMapChanged", { target: "window" })
  async beforeMapChanged(): Promise<void> {
    if (this._expandPopup) {
      this._shouldSetMapView = true;
      this._expandPopup = false;
    }
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
  async componentWillLoad(): Promise<void> {
    await this._getTranslations();
    this._resizeObserver = new ResizeObserver(() => this._onResize());
  }

  /**
   * Renders the component.
   */
  render() {
    return (
      <Host>
        <calcite-shell class="position-relative">
          <calcite-panel
            class="width-full height-full"
          >
            {this._getBody(this._layoutMode, this._panelOpen, this._hideTable)}
          </calcite-panel>
          {this._getFooter()}
        </calcite-shell>
      </Host>
    );
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
  async componentDidLoad(): Promise<void> {
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
  protected _getFooter(): VNode {
    const hasSelectedFeatures = this._numSelected > 0;
    return this._isMobile && hasSelectedFeatures && !this._hideFooter ? (
      <div class={`width-100`} slot="footer">
        <div class="display-flex padding-1-2">
          <calcite-button
            appearance="solid"
            id="solutions-show"
            onClick={() => this.showHideMapPopupAndTable(true)}
            width="full"
          >
            {this._translations.view.replace("{{n}}", this._numSelected.toString())}
          </calcite-button>
          <calcite-button
            appearance="outline"
            class="padding-inline-start-1"
            id="solutions-delete"
            kind="danger"
            onClick={() => this._layerTable.deleteFeatures()}
            width="full"
          >
            {this._translations.delete.replace("{{n}}", this._numSelected.toString())}
          </calcite-button>
        </div>
      </div>
    ) : undefined;
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
  protected _getDividerIcon(
    layoutMode: ELayoutMode,
    panelOpen: boolean
  ): string {
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
   *
   * @returns the css selectors
   * @protected
   */
  protected _getMapSizeClass(
    layoutMode: ELayoutMode,
    panelOpen: boolean
  ): string {
    let sizeClass = "";
    switch (layoutMode) {
      case ELayoutMode.HORIZONTAL:
        sizeClass = `${panelOpen ? "height-1-2 display-grid" : "height-0"} width-full position-relative`;
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
  protected _getTableSizeClass(
    layoutMode: ELayoutMode,
    panelOpen: boolean
  ): string {
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
  protected _getBody(
    layoutMode: ELayoutMode,
    panelOpen: boolean,
    hideTable: boolean
  ): VNode {
    const contentClass = layoutMode === ELayoutMode.HORIZONTAL ? "" : "display-flex";
    return (
      <calcite-panel class={"width-full height-full"}>
        <div class={`width-full height-full overflow-hidden ${contentClass}`}>
          {this._getMapAndCard(layoutMode, panelOpen)}
          {this._getTable(layoutMode, panelOpen, hideTable)}
        </div>
      </calcite-panel>
    );
  }

  /**
   * Get the map and card nodes based for the current layout options
   *
   * @param layoutMode ELayoutMode the current layout mode
   * @param panelOpen boolean indicates if all panels are open
   *
   * @returns the map node
   * @protected
   */
  protected _getMapAndCard(
    layoutMode: ELayoutMode,
    panelOpen: boolean
  ): VNode {
    const mapSizeClass = this._getMapSizeClass(layoutMode, panelOpen);
    return (
      <div class={`${mapSizeClass} overflow-hidden`}>
        {this._getMapNode(layoutMode, panelOpen)}
        {this._getPopupExpandNode()}
      </div>
    );
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
  protected _getMapNode(
    layoutMode: ELayoutMode,
    panelOpen: boolean
  ): VNode {
    const mapDisplayClass = layoutMode === ELayoutMode.HORIZONTAL ? "" : layoutMode === ELayoutMode.GRID ? "" : "visibility-hidden";
    const mapContainerClass = this._layoutMode === ELayoutMode.HORIZONTAL && (!this._isMobile || panelOpen) ? "" : "adjusted-height-50";
    return (
      <div class={`${mapContainerClass} overflow-hidden ${mapDisplayClass}`} >
        <map-card
          basemapConfig={this.basemapConfig}
          class="width-full"
          defaultWebmapId={this.defaultWebmap}
          enableBasemap={this.enableBasemap}
          enableFloorFilter={this.enableFloorFilter}
          enableFullscreen={this.enableFullscreen}
          enableHome={this.enableHome}
          enableLegend={this.enableLegend}
          enableSearch={this.enableSearch}
          enableSingleExpand={true}
          hidden={this._expandPopup}
          homeZoomIndex={3}
          homeZoomPosition={"top-left"}
          homeZoomToolsSize={"s"}
          mapInfos={this.mapInfos?.filter(mapInfo => mapInfo.visible !== false)}
          mapWidgetsIndex={0}
          mapWidgetsPosition={"top-right"}
          mapWidgetsSize={"m"}
          stackTools={true}
          theme={this.theme}
          toolOrder={["legend", "search", "fullscreen", "basemap", "floorfilter"]}
        />
      </div>
    );
  }

  /**
   * Get the expand node for the popup information
   *
   * @returns the expand node
   * @protected
   */
  protected _getPopupExpandNode(): VNode {
    const icon = this._expandPopup ? "chevrons-down" : "chevrons-up";
    const id = "expand-popup";
    const tooltip = this._expandPopup ? this._translations.collapsePopup : this._translations.expandPopup;
    const themeClass = this.theme === "dark" ? "calcite-mode-dark" : "calcite-mode-light";
    const popupNodeClass = !this._expandPopup ? "height-full" : this.mapInfos?.length === 1 || this._isMobile ? "position-absolute-0" : "position-absolute-50";
    const headerClass = this._isMobile ? "display-none height-0" : "";
    const headerTheme = !this._isMobile ? "calcite-mode-dark" : "calcite-mode-light";
    const containerClass = this._isMobile && this._hideTable ? "position-fixed width-full height-full" : this._isMobile ? "display-none height-0" : "";
    return (
      <div class={`${headerTheme} ${popupNodeClass} ${containerClass}`}>
        <calcite-panel>
          {
            !this._isMobile ? (
              <div
                class={`display-flex align-items-center ${headerClass}`}
                slot="header-content"
              >
                <calcite-icon icon="information" scale="s" />
                <div class="padding-inline-start-75">
                  {this._translations.information}
                </div>
              </div>
            ) : undefined
          }
          <calcite-action
            class={headerClass}
            disabled={this._tableOnly}
            icon={icon}
            id={id}
            onClick={() => this._togglePopup()}
            slot="header-actions-end"
            text=""
          />
          {!this._tableOnly ? <calcite-tooltip
            class={themeClass}
            label=""
            placement="bottom"
            reference-element={id}
          >
            <span>{tooltip}</span>
          </calcite-tooltip> : undefined}
          {this._getCardNode()}
        </calcite-panel>
      </div>
    );
  }

  /**
   * Toggle the popup information
   *
   * @protected
   */
  protected _togglePopup(): void {
    this._expandPopup = !this._expandPopup;
  }

  /**
   * Get the card node
   *
   * @returns the card node
   * @protected
   */
  protected _getCardNode(): VNode {
    const cardManagerHeight = !this._expandPopup && !this._isMobile ? "height-50" : "height-full";
    const themeClass = this.theme === "dark" ? "calcite-mode-dark" : "calcite-mode-light";
    return (
      <div class={`width-50 height-full ${themeClass}`}>
        <card-manager
          class={`${cardManagerHeight} width-full`}
          isMobile={this._isMobile}
          mapView={this?._mapView}
          zoomAndScrollToSelected={this.zoomAndScrollToSelected}
        />
      </div>
    );
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
  protected _getTable(
    layoutMode: ELayoutMode,
    panelOpen: boolean,
    hideTable: boolean
  ): VNode {
    const tableClass = hideTable ? "visibility-hidden" : "";
    const tableSizeClass = this._getTableSizeClass(layoutMode, panelOpen)
    const icon = this._getDividerIcon(layoutMode, panelOpen);
    const tooltip = panelOpen ? this._translations.close : this._translations.open;
    const id = "toggle-layout";
    const toggleLayout = layoutMode === ELayoutMode.HORIZONTAL ? "horizontal" : "vertical";
    const toggleSlot = layoutMode === ELayoutMode.HORIZONTAL  ? "header" : "panel-start";
    const hasMapAndLayer = this.defaultWebmap && this.defaultLayer;
    return (
      <calcite-shell class={`${tableSizeClass} ${tableClass} border-bottom`}>
        {
          !this._isMobile ? (
            <calcite-action-bar
              class="border-sides"
              expandDisabled={true}
              layout={toggleLayout}
              slot={toggleSlot}
            >
              <calcite-action
                class="toggle-node"
                icon={icon}
                id={id}
                onClick={() => this._toggleLayout()}
                text=""
              />
              <calcite-tooltip
                label={tooltip}
                placement="bottom"
                reference-element={id}
              >
                <span>{tooltip}</span>
              </calcite-tooltip>
            </calcite-action-bar>
          ) : undefined
        }
        <div class={`width-full height-full position-relative`}>
          <layer-table
            defaultGlobalId={hasMapAndLayer ? this._defaultGlobalId : undefined}
            defaultLayerId={hasMapAndLayer ? this.defaultLayer : ""}
            defaultOid={hasMapAndLayer && !this.defaultGlobalId ? this._defaultOid : undefined}
            enableAutoRefresh={this.enableAutoRefresh}
            enableCSV={this.enableCSV}
            enableColumnReorder={this.enableColumnReorder}
            enableInlineEdit={this.enableInlineEdit}
            enableShare={this.enableShare}
            isMobile={this._isMobile}
            mapInfo={this._mapInfo}
            mapView={this?._mapView}
            onlyShowUpdatableLayers={this.onlyShowUpdatableLayers}
            ref={(el) => this._layerTable = el}
            shareIncludeEmbed={this.shareIncludeEmbed}
            shareIncludeSocial={this.shareIncludeSocial}
            showNewestFirst={this.showNewestFirst}
            zoomAndScrollToSelected={this.zoomAndScrollToSelected}
          />
        </div>
      </calcite-shell>
    );
  }

  /**
   * Update the component layout when its size changes
   */
  protected _onResize(): void {
    this._isMobile = this.el.offsetWidth < 1024;
    this._layoutMode = this._isMobile ? ELayoutMode.HORIZONTAL : ELayoutMode.GRID;
    this._panelOpen = true;
  }

  /**
   * Open/Close the appropriate panel.
   * The panel that is toggled is dependent upon the layout mode and if using classic grid or not
   */
  protected _toggleLayout(): void {
    this._panelOpen = !this._panelOpen;
  }

  /**
   * Show/Hide the map, popup, and table
   *
   * @param show when true the map, popup, and table will be displayed
   */
  protected showHideMapPopupAndTable(
    show: boolean
  ): void {
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
  protected _getMapInfo(
    id: string
  ): IMapInfo {
    let mapInfo: IMapInfo;
    this.mapInfos.some(mi => {
      if (mi.id === id) {
        mapInfo = mi;
        return true;
      }
    })
    return {...mapInfo};
  }

  /**
   * Set the current map info when maps change
   *
   * @protected
   */
  protected async _setMapView(): Promise<void> {
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
  protected _initMapZoom(): void {
    if (!this.enableZoom) {
      this._mapView.ui.remove("zoom");
    } else if (this.enableZoom) {
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
  protected async _getTranslations(): Promise<void> {
    const messages = await getLocaleComponentStrings(this.el);
    this._translations = messages[0] as typeof CrowdsourceManager_T9n;
  }

}
