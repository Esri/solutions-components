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

import { Component, Element, Host, h, Listen, Prop, State, VNode, Watch, Event, EventEmitter, Fragment } from "@stencil/core";
import CrowdsourceManager_T9n from "../../assets/t9n/crowdsource-manager/resources.json";
import { getLocaleComponentStrings } from "../../utils/locale";
import { AppLayout, ELayoutMode, IBasemapConfig, IMapChange, IMapInfo, ISearchConfiguration, theme } from "../../utils/interfaces";
import { getLayerOrTable } from "../../utils/mapViewUtils";
import { LayerExpression } from "@esri/instant-apps-components";

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
   * AppLayout: The type of layout the application should use.
   * Valid values: "mapView" or "tableView" or "splitView"
   */
  @Prop({ mutable: true }) appLayout: AppLayout;

  /**
   * Array of objects containing proxy information for premium platform services.
   */
  @Prop() appProxies: any;

  /**
   * IBasemapConfig: List of any basemaps to filter out from the basemap widget
   */
  @Prop() basemapConfig: IBasemapConfig;

  /**
   * boolean: When true a cover page has been enabled in the consuming application.
   * Also when true a floating button will be shown in the lower right of the window that
   * will emit an event when clicked that the consuming application can respond to that will open the cover page.
   */
  @Prop() coverPageEnabled: boolean;

  /**
   * string: custom notification text to display in the card manager
   */
  @Prop() customInfoText: string;

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
   * boolean: When true a introduction window has been enabled in the consuming application.
   * Also when true a floating button will be shown in the lower right of the window that
   * will emit an event when clicked that the consuming application can respond to that will open the introduction window.
   */
  @Prop() introductionWindowEnabled = false;

  /**
   * boolean: when true the layer table will auto refresh the data
   */
  @Prop() enableAutoRefresh = false;

  /**
   * boolean: when true the basemap widget will be available
   */
  @Prop() enableBasemap = true;

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
   * boolean: when true the home widget will be available
   */
  @Prop() enableHome = true;

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
   * boolean: when true the zoom widget will be available
   */
  @Prop() enableZoom = true;

  /**
   * boolean: when true the map will be hidden on load
   */
  @Prop() hideMapOnLoad = false;

  /**
   * IMapInfo[]: array of map infos (name and id)
   */
  @Prop() mapInfos: IMapInfo[] = [];

  /**
   * boolean: When true only editable layers that support the update capability will be available
   */
  @Prop() onlyShowUpdatableLayers = true;

  /**
   * string: The background color to apply to the popup header
   */
  @Prop() popupHeaderColor: string;

  /**
   * string: The color that will be displayed on hover when expanding the popup header
   */
  @Prop() popupHeaderHoverColor: string;

  /**
   * string: The font color that will be displayed on hover when expanding the popup header
   */
  @Prop() popupHeaderHoverTextColor: string;

  /**
   * string: The font color to apply to the popup header
   */
  @Prop() popupHeaderTextColor: string;

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
   * boolean: when true the table will be sorted by objectid in descending order by default
   */
  @Prop() showNewestFirst = true;

  /**
   * theme: "light" | "dark" theme to be used
   */
  @Prop() theme: theme = "light";

  /**
   * boolean: When true the selected feature will zoomed to in the map and the row will be scrolled to within the table
   */
  @Prop() zoomAndScrollToSelected = false;

  /**
   * number: default scale to zoom to when zooming to a single point feature
   */
  @Prop() zoomToScale: number;

  //--------------------------------------------------------------------------
  //
  //  State (internal)
  //
  //--------------------------------------------------------------------------

  /**
   * boolean: when true the users can have the option to create features
   */
  @State() _enableCreateFeatures = true;

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
  @State() _isMobile = false;

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() _translations: typeof CrowdsourceManager_T9n;

  /**
   * esri/views/layers/FeatureLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html
   */
  @State() _layer: __esri.FeatureLayer;

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
   * boolean: When true the filter component will be displayed
   */
  @State() _filterOpen = false;

  /**
   * boolean: When true information header will be displayed
   */
  @State() _showInformationHeader = true;

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * boolean: When true the map view will be set after render due to popup obstructing the view
   * MapView.when is not fired when mapView is not currently visible
   */
  protected _defaultCenterHonored = false;

  /**
   * boolean: When true the map view will be set after render due to popup obstructing the view
   * MapView.when is not fired when mapView is not currently visible
   */
  protected _defaultLevelHonored = false;

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

  /**
   * LayerExpression[]: All layer expressions from the current filter config for the currently selected layer
   */
  protected _layerExpressions: LayerExpression[];

  /**
   * HTMLInstantAppsFilterListElement: Component from Instant Apps that supports interacting with the current filter config
   */
  protected _filterList: HTMLInstantAppsFilterListElement;

  /**
   * boolean: True when app is directly rendered to map view layout
   */
  protected _isMapViewOnLoad = false;

  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------

  /**
   * When true the map zoom tools will be available
   */
  @Watch("enableZoom")
  enableZoomWatchHandler(): void {
    this._initMapZoom();
  }

  /**
   * When true and no appLayout is defined the map will be hidden on load
   */
  @Watch("hideMapOnLoad")
  hideMapOnLoadWatchHandler(): void {
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
  @Event() showIntroductionWindow: EventEmitter<void>;

  /**
   * Emitted on demand when a cover page button is clicked
   */
  @Event() showCoverPage: EventEmitter<void>;

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
   * Get the layer for the provided layer id
   */
  @Listen("layerSelectionChange", { target: "window" })
  async layerSelectionChange(
    evt: CustomEvent
  ): Promise<void> {
    const id: string = evt.detail[0];
    const layer = await getLayerOrTable(this._mapView, id);
    layer && await layer.when(() => {
      this._layer = layer;
      this._initLayerExpressions();
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
  async componentWillLoad(): Promise<void> {
    await this._getTranslations();
    this._resizeObserver = new ResizeObserver(() => this._onResize());
  }

  /**
   * Renders the component.
   */
  render() {
    // only avoid border when we have a header color that is not white
    const borderClass = this.popupHeaderColor && this.popupHeaderColor !== "#FFFFFF" ? "border-width-0" : "";
    return (
      <Host>
        <calcite-shell class="position-relative">
          <calcite-panel
            class={`width-full height-full ${borderClass}`}
          >
            {this._getBody(this._layoutMode, this._panelOpen, this._hideTable)}
          </calcite-panel>
          {this._getFooter()}
        </calcite-shell>
        {/* create a filter modal from manager to keep a comman modal for both layer-table and map-card and maintain state while switchig from one component to other*/}
        {this._filterModal()}
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
      if (this._mapChange) {
        await this._setMapView();
      }
    }
  }

  /**
   * Called once after the component is loaded
   */
  async componentDidLoad(): Promise<void> {
    this._resizeObserver.observe(this.el);
    if (this.hideMapOnLoad && !this.appLayout) {
      this.appLayout = 'tableView';
    } else if (!this.appLayout) {
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
  protected _getFooter(): VNode {
    const hasSelectedFeatures = this._numSelected > 0;
    const deleteEnabled = this._layer?.editingEnabled && this._layer?.capabilities?.operations?.supportsDelete;
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
          {deleteEnabled ? (
            <delete-button
              class="padding-inline-start-1 width-full"
              id="solutions-delete"
              ids={this._layerTable.selectedIds}
              layer={this._layer}
            />
          ) : undefined}
        </div>
      </div>
    ) : undefined;
  }

  /**
   * sets the active layout to render
   * @param appLayout new app layout
   *
   * @protected
   */
  protected _setActiveLayout(appLayout: AppLayout): void {
    //When going to splitView layout the panel should be open
    if (appLayout === 'splitView' && !this._panelOpen) {
      this._toggleLayout();
    }
    //Move the map node based on the selected layout
    //for mapView layout show map in full view and or all other layout show in the card view
    //for tableView the map will be hidden using css
    if (appLayout === 'mapView') {
      this._showMapInFullView();
    } else {
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
   * @param hideTable boolean when true the layer table is hidden
   *
   * @returns the css selectors
   * @protected
   */
  protected _getMapSizeClass(
    layoutMode: ELayoutMode,
    panelOpen: boolean,
    hideTable: boolean
  ): string {
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
    const themeClass = this.theme === "dark" ? "calcite-mode-dark" : "calcite-mode-light";
    return (
      <calcite-panel class={"width-full height-full position-absolute"}>
        <div class={`width-full height-full overflow-hidden ${contentClass}`}>
          {this._getMapAndCard(layoutMode, panelOpen, hideTable)}
          {this._getTable(layoutMode, panelOpen, hideTable)}
        </div>
        {this.coverPageEnabled &&
          <div class="floating-container" onClick={this.coverPageButtonClick.bind(this)}>
            <calcite-button
              appearance="solid"
              class={`floating-button ${themeClass}`}
              icon-start="content-minimal"
              kind="neutral"
              label=""
              round
              scale="l"
              split-child="primary"
              width="auto" />
          </div>
        }
        {this.introductionWindowEnabled &&
          <div class="floating-container" onClick={this.infoButtonClick.bind(this)}>
            <calcite-button
              appearance="solid"
              class={`floating-button ${themeClass}`}
              icon-start="information-letter"
              kind="neutral"
              label=""
              round
              scale="l"
              split-child="primary"
              width="auto" />
          </div>
        }
      </calcite-panel>
    );
  }

  /**
   * Emit the event when info button clicked
   */
  protected infoButtonClick(): void {
    this.showIntroductionWindow.emit();
  }

  /**
 * Emit the event when cover page button clicked
 */
  protected coverPageButtonClick(): void {
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
  protected _getMapAndCard(
    layoutMode: ELayoutMode,
    panelOpen: boolean,
    hideTable: boolean
  ): VNode {
    const mapSizeClass = this._getMapSizeClass(layoutMode, panelOpen, hideTable);
    return (
      <div class={`${mapSizeClass} overflow-hidden`}>
        {this._getMapNode(panelOpen)}
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
    panelOpen: boolean
  ): VNode {
    const isMapLayout = this.appLayout === 'mapView';
    const isTableLayout = this.appLayout === 'tableView';
    const mapContainerClass = (isMapLayout || isTableLayout) ? "position-absolute-0" : this._layoutMode === ELayoutMode.HORIZONTAL && (!this._isMobile || panelOpen) ? "" : "adjusted-height-50";
    const hasMapAndLayer = this.defaultWebmap && this.defaultLayer;
    return (
      <div class={`${mapContainerClass} overflow-hidden`} id="card-mapView">
        <map-card
          appProxies={this.appProxies}
          basemapConfig={this.basemapConfig}
          class="width-full"
          defaultLayerId={hasMapAndLayer ? this.defaultLayer : ""}
          defaultWebmapId={this.defaultWebmap}
          enableBasemap={this.enableBasemap}
          enableFloorFilter={this.enableFloorFilter}
          enableFullscreen={this.enableFullscreen}
          enableHome={this.enableHome}
          enableLegend={this.enableLegend}
          enableSearch={this.enableSearch}
          enableSingleExpand={true}
          hidden={!this._isMobile && isTableLayout}
          homeZoomIndex={3}
          homeZoomPosition={"top-left"}
          homeZoomToolsSize={"s"}
          isMapLayout={isMapLayout}
          isMobile={this._isMobile}
          mapInfo={this._mapInfo}
          mapInfos={this.mapInfos?.filter(mapInfo => mapInfo.visible !== false)}
          mapWidgetsIndex={0}
          mapWidgetsPosition={"top-right"}
          mapWidgetsSize={"m"}
          onToggleFilter={this._toggleFilter.bind(this)}
          onlyShowUpdatableLayers={this.onlyShowUpdatableLayers}
          selectedFeaturesIds={this._layerTable?.selectedIds}
          selectedLayer={this._layer}
          stackTools={true}
          theme={this.theme}
          toolOrder={["legend", "search", "fullscreen", "basemap", "floorfilter"]}
          zoomToScale={this.zoomToScale}
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
    const popupNodeClass = "height-full"
    const headerClass = this._isMobile && this._showInformationHeader ? "display-none height-0" : "";
    const headerTheme = this.popupHeaderColor ? "" : !this._isMobile ? "calcite-mode-dark" : "calcite-mode-light";
    const containerClass = this._isMobile && this._hideTable ? "position-absolute-0 width-full height-full" : this._isMobile ? "display-none height-0" : "";
    const tableViewClass = this.appLayout === "tableView" ? "position-relative top-51" : "";
    return (
      <div class={`${headerTheme} ${popupNodeClass} ${containerClass} ${tableViewClass}`}
        style={{
          '--calcite-color-foreground-1': this.popupHeaderColor, /* background color that will be displayed on the popup header */
          '--calcite-color-foreground-2': this.popupHeaderHoverColor, /* background color that will be displayed on button when hovered */
          '--calcite-color-text-3': this.popupHeaderTextColor, /* font color that will be displayed on button */
          '--calcite-color-text-2': this.popupHeaderTextColor, /* font color that will be displayed on popup header text*/
        }}>
        <calcite-panel>
          {
            !this._isMobile && this._showInformationHeader || this._numSelected > 0 ? (
              <div
                class={`display-flex align-items-center ${headerClass}`}
                slot="header-content"
              >
                <calcite-icon icon="information" scale="s" />
                <div class="padding-inline-start-75">
                  {this._translations.information}
                </div>
              </div>
            ) : <div />
          }
          {this._getCardNode()}
        </calcite-panel>
      </div>
    );
  }

  /**
   * Get the card node
   *
   * @returns the card node
   * @protected
   */
  protected _getCardNode(): VNode {
    const isMapLayout = this.appLayout === 'mapView';
    const isTableLayout = this.appLayout === 'tableView';
    const cardManagerHeight = (isMapLayout || isTableLayout) ? "height-full" : this._numSelected > 0 ? "height-51" : !this._showInformationHeader ? "adjusted-height-50_25" : !this._isMobile ? "height-51" : "height-full";
    const themeClass = this.theme === "dark" ? "calcite-mode-dark" : "calcite-mode-light";
    return (
      <div class={`width-50 height-full ${themeClass}`}>
        <card-manager
          class={`${cardManagerHeight} width-full`}
          customInfoText={this.customInfoText}
          enableCreateFeatures={this._enableCreateFeatures}
          enableEditGeometry={this?._mapInfo?.enableEditGeometry}
          isMobile={this._isMobile}
          layer={this._layer}
          mapView={this?._mapView}
          onBackFromCreateWorkFlow={() => {
            this._changeLayout(this.appLayout);
            this._showInformationHeader = true;
          }}
          onCreateWorkFlowStarted={() => {
            this._changeLayout(this._layer.isTable ? "tableView" : "mapView");
            this._showInformationHeader = false;
          }}
          onFeatureOrRecordSubmitted={() => void this._layerTable.refresh()}
          selectedFeaturesIds={this._layerTable?.selectedIds}
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
    const isMapLayout = this.appLayout === 'mapView';
    const isTableLayout = this.appLayout === 'tableView';
    const tableClass = hideTable && this._isMobile ? "visibility-hidden" : isMapLayout ? "display-none" : "";
    const mapClass = isMapLayout ? "height-full width-full z-index-0" : "display-none";
    const tableSizeClass = this._getTableSizeClass(layoutMode, panelOpen)
    const toggleLayout = layoutMode === ELayoutMode.HORIZONTAL ? "horizontal" : "vertical";
    const toggleSlot = layoutMode === ELayoutMode.HORIZONTAL ? "header" : "panel-start";
    const hasMapAndLayer = this.defaultWebmap && this.defaultLayer;
    const globalId = !this.defaultGlobalId ? undefined :
      this.defaultGlobalId?.indexOf(",") > -1 ? this.defaultGlobalId.split(",") : [this.defaultGlobalId];
    const defaultOid = !this.defaultOid ? undefined :
      this.defaultOid?.indexOf(",") > -1 ? this.defaultOid.split(",").map(o => parseInt(o, 10)) : [parseInt(this.defaultOid, 10)];
    return (
      <calcite-shell class={`${tableSizeClass} border-bottom`}>
        {
          !this._isMobile ? (
            <calcite-action-bar
              class="border-sides"
              expandDisabled={true}
              layout={toggleLayout}
              slot={toggleSlot}
            >
              {this.getActions(layoutMode, panelOpen)}
            </calcite-action-bar>
          ) : undefined
        }
        <div class={`width-full height-full position-relative z-index-0 ${tableClass}`}>
          <layer-table
            createFilterModal={false}
            defaultGlobalId={hasMapAndLayer ? globalId : undefined}
            defaultLayerId={hasMapAndLayer ? this.defaultLayer : ""}
            defaultOid={hasMapAndLayer && !globalId ? defaultOid : undefined}
            enableAutoRefresh={this.enableAutoRefresh}
            enableCSV={this.enableCSV}
            enableColumnReorder={this.enableColumnReorder}
            enableInlineEdit={this?._mapInfo?.enableInlineEdit}
            enableShare={this.enableShare}
            isMobile={this._isMobile}
            mapHidden={isTableLayout}
            mapInfo={this._mapInfo}
            mapView={this?._mapView}
            onToggleFilter={this._toggleFilter.bind(this)}
            onlyShowUpdatableLayers={this.onlyShowUpdatableLayers}
            ref={(el) => this._layerTable = el}
            shareIncludeEmbed={this.shareIncludeEmbed}
            shareIncludeSocial={this.shareIncludeSocial}
            showNewestFirst={this.showNewestFirst}
            zoomAndScrollToSelected={this.zoomAndScrollToSelected}
            zoomToScale={this.zoomToScale}
          />
        </div>
        <div class={mapClass} id="full-map-view" />
      </calcite-shell>
    );
  }

  /**
   * Returns the Actions for table's node
   *
   * @returns Node
   * @protected
   */
  protected getActions(
    layoutMode: ELayoutMode,
    panelOpen: boolean,
  ): Node {
    const icon = this._getDividerIcon(layoutMode, panelOpen);
    const tooltip = panelOpen ? this._translations.close : this._translations.open;
    const id = "toggle-layout";
    return (
      <Fragment>
        <calcite-action
          active={this.appLayout === 'splitView'}
          class="toggle-node"
          icon={"browser"}
          id={"browser-action"}
          onClick={() => { this._changeLayout('splitView') }}
          text=""
        />
        <calcite-tooltip
          placement="right"
          reference-element={"browser-action"}
        >
          <span>{this._translations.splitView}</span>
        </calcite-tooltip>

        <calcite-action
          active={this.appLayout === 'tableView'}
          class="toggle-node"
          icon={"dock-left"}
          id={"dock-left-action"}
          onClick={() => { this._changeLayout('tableView') }}
          text=""
        />
        <calcite-tooltip
          placement="right"
          reference-element={"dock-left-action"}
        >
          <span>{this._translations.tableView}</span>
        </calcite-tooltip>

        <calcite-action
          active={this.appLayout === 'mapView'}
          class="toggle-node"
          icon={"browser-map"}
          id={"browser-map-action"}
          onClick={() => { this._changeLayout('mapView') }}
          text=""
        />
        <calcite-tooltip
          placement="right"
          reference-element={"browser-map-action"}
        >
          <span>{this._translations.mapView}</span>
        </calcite-tooltip>

        <calcite-action
          class="toggle-node"
          icon={icon}
          id={id}
          onClick={() => this._toggleLayout()}
          slot="actions-end"
          text=""
        />
        <calcite-tooltip
          placement="bottom"
          reference-element={id}
        >
          <span>{tooltip}</span>
        </calcite-tooltip>

      </Fragment>
    )
  }

  /**
   * Show filter component in modal
   *
   * @returns node to interact with any configured filters for the current layer
   * @protected
   */
  protected _filterModal(): VNode {
    return (
      <calcite-modal
        aria-labelledby="modal-title"
        class="modal"
        kind="brand"
        onCalciteModalClose={() => void this._closeFilter()}
        open={this._filterOpen}
        widthScale="s"
      >
        <div
          class="display-flex align-center"
          id="modal-title"
          slot="header"
        >
          {this._translations?.filter?.replace("{{title}}", this._layer?.title)}
        </div>
        <div slot="content">
          <instant-apps-filter-list
            autoUpdateUrl={false}
            closeBtn={true}
            closeBtnOnClick={async () => this._closeFilter()}
            comboboxOverlayPositioning="fixed"
            layerExpressions={this._layerExpressions}
            onFilterListReset={() => this._handleFilterListReset()}
            onFilterUpdate={() => void this._layerTable?.filterUpdate()}
            ref={(el) => this._filterList = el}
            view={this._mapView}
            zoomBtn={false}
          />
        </div>
      </calcite-modal>
    );
  }

  /**
   * Store any filters for the current layer.
   * Should only occur on layer change
   *
   * @protected
   */
  protected _initLayerExpressions(): void {
    const layerExpressions = this._mapInfo?.filterConfig?.layerExpressions;
    this._layerExpressions = layerExpressions ? layerExpressions.filter(
      (exp) => exp.id === this._layer?.id) : [];
    this._filterList.layerExpressions = this._layerExpressions;
    this._layerExpressions.filter(lyrExp => {
      return lyrExp.expressions.filter(exp => exp.active).length > 0
    }).length > 0;
  }

  /**
   * Toggle the filter modal
   *
   * @protected
   */
  protected _toggleFilter(): void {
    this._filterOpen = !this._filterOpen
  }

  /**
   * Reset the filter active prop
   *
   * @protected
   */
  protected _handleFilterListReset(): void {
    void this._layerTable.filterReset();
  }

  /**
   * Close the filter modal
   *
   * @protected
   */
  protected async _closeFilter(): Promise<void> {
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
  protected _onResize(): void {
    const isMobile = this.el.offsetWidth < 1024;
    const forceOpen = !this._isMobile && isMobile;
    this._isMobile = isMobile;
    this._layoutMode = this._isMobile ? ELayoutMode.HORIZONTAL : ELayoutMode.GRID;
    if (forceOpen) {
      this._panelOpen = true;
    }
    if (this._isMobile) {
      this.showHideMapPopupAndTable(!this._isMobile);
    }
  }

  /**
   * Open/Close the appropriate panel.
   * The panel that is toggled is dependent upon the layout mode and if using classic grid or not
   *
   * @protected
   */
  protected _toggleLayout(): void {
    this._panelOpen = !this._panelOpen;
  }

  /**
   * Changes the layout mode
   * @param appLayout selected active app layout
   *
   * @protected
   */
  protected _changeLayout(appLayout: AppLayout): void {
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
  protected _showMapInCardView(): void {
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
  protected _showMapInFullView(): void {
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
  protected showHideMapPopupAndTable(
    show: boolean
  ): void {
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
    return { ...mapInfo };
  }

  /**
   * Set the current map info when maps change
   *
   * @protected
   */
  protected async _setMapView(): Promise<void> {
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
