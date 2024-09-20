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

import { Component, Element, Event, EventEmitter, Host, h, Listen, Prop, State, Watch, Fragment, Method } from "@stencil/core";
import MapCard_T9n from "../../assets/t9n/map-card/resources.json"
import { loadModules } from "../../utils/loadModules";
import { IBasemapConfig, IMapChange, IMapInfo, ISearchConfiguration, theme } from "../../utils/interfaces";
import { joinAppProxies } from "templates-common-library-esm/functionality/proxy";
import { getLocaleComponentStrings } from "../../utils/locale";
import { getFeatureLayerView, goToSelection } from "../../utils/mapViewUtils";

// TODO navigation and accessability isn't right for the map list
//   tab does not go into the list when it's open
//   focus is not set when it opens
// TODO clarify what the List button is supposed to do
// TODO map list button tooltip does not work
// TODO map list should close if the user clicks something else...hope this will be easy when I figure out how to set focus when it opens

@Component({
  tag: "map-card",
  styleUrl: "map-card.css",
  shadow: false,
})
export class MapCard {
  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLMapCardElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * Array of objects containing proxy information for premium platform services.
   */
  @Prop() appProxies: any;

  /**
   * string: Item ID of the web map that should be selected by default when the app loads
   */
  @Prop() defaultWebmapId = "";

  /**
   * string: when provided this layer ID will be used when the app loads
   */
  @Prop() defaultLayerId: string;

  /**
   * boolean: when true the home widget will be available
   */
  @Prop() enableHome: boolean;

  /**
   * boolean: when true the legend widget will be available
   */
  @Prop() enableLegend: boolean;

  /**
   * boolean: when true the floor filter widget will be available
   */
  @Prop() enableFloorFilter: boolean;

  /**
   * boolean: when true the fullscreen widget will be available
   */
  @Prop() enableFullscreen: boolean;

  /**
   * boolean: when true map tools will be displayed within a single expand/collapse widget
   * when false widgets will be loaded individually into expand widgets
   */
  @Prop() enableSingleExpand = true;

  /**
   * boolean: when true the search widget will be available
   */
  @Prop() enableSearch: boolean;

  /**
   * boolean: when true the basemap widget will be available
   */
  @Prop() enableBasemap: boolean;

  /**
   * IBasemapConfig: List of any basemaps to filter out from the basemap widget
   */
  @Prop() basemapConfig: IBasemapConfig;

  /**
   * boolean: When true the map display will be hidden
   */
  @Prop() hidden: boolean;

  /**
   * number: The placement index of the home and zoom components. This index shows where to place the component relative to other components.
   * For example a value of 0 would place it topmost when position is top-*, leftmost for bottom-left and right most for bottom-right.
   */
  @Prop() homeZoomIndex = 3;

  /**
   * __esri.UIPosition: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-ui-UI.html#UIPosition
   * The position details for the Home and Zoom tools
   */
  @Prop() homeZoomPosition: __esri.UIPosition = "top-left";

  /**
   * "s" | "m" | "l": Used for Zoom and Home tools
   */
  @Prop() homeZoomToolsSize: "s" | "m" | "l" = "m";

  /**
   * IMapInfo[]: array of map infos (name and id)
   */
  @Prop() mapInfos: IMapInfo[] = [];

  /**
   * number: The placement index of the map widgets (legend, basemap, fullscreen etc). This index shows where to place the component relative to other components.
   * For example a value of 0 would place it topmost when position is top-*, leftmost for bottom-left and right most for bottom-right.
   */
  @Prop() mapWidgetsIndex = 0;

  /**
   * __esri.UIPosition: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-ui-UI.html#UIPosition
   * The position details for the Home and Zoom tools
   */
  @Prop() mapWidgetsPosition: __esri.UIPosition = "top-right";

  /**
   * "s" | "m" | "l": Used for optional map tool widget
   */
  @Prop() mapWidgetsSize: "s" | "m" | "l" = "m";

  /**
   * esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  @Prop() mapView: __esri.MapView;

  /**
   * boolean: When true the map widget tools will have no margin between them.
   * When false the map widget tools will have a margin between them.
   */
  @Prop() stackTools = true;

  /**
   * theme: "light" | "dark" theme to be used
   */
  @Prop() theme: theme;

  /**
   *
   * Valid tools: "legend", "search", "fullscreen", "basemap", "floorfilter"
   */
  @Prop() toolOrder: string[];

  /**
   * boolean: When true map will shown is full screen
   */
  @Prop() isMapLayout: boolean

  /**
   * number[]: A list of ids that are currently selected
   */
  @Prop() selectedFeaturesIds: number[];

  /**
   * __esri.FeatureLayer: Selected layer
   */
  @Prop() selectedLayer: __esri.FeatureLayer;

  /**
   * number: default scale to zoom to when zooming to a single point feature
   */
  @Prop() zoomToScale: number;

  /**
   * boolean: When true only editable layers that support the update capability will be available
   */
  @Prop() onlyShowUpdatableLayers: boolean;

  /**
   * When true the component will render an optimized view for mobile devices
   */
  @Prop() isMobile: boolean;

  /**
   * IMapInfo: key configuration details about the current map
   */
  @Prop() mapInfo: IMapInfo;

  //--------------------------------------------------------------------------
  //
  //  State (internal)
  //
  //--------------------------------------------------------------------------

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() _translations: typeof MapCard_T9n;

  /**
   * ISearchConfiguration: Configuration details for the Search widget
   */
  @State() _searchConfiguration: ISearchConfiguration;

  /**
   * IMapInfo: id and name of the map to display
   */
  @State() _webMapInfo: IMapInfo;

  /**
   * boolean: When true the show/hide fields list is forced open
   */
  @State() _showHideOpen = false;

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * esri/config: https://developers.arcgis.com/javascript/latest/api-reference/esri-config.html
   */
  protected esriConfig: typeof import("esri/config");

  /**
   * esri/widgets/Home: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Home.html
   */
  protected Home: typeof import("esri/widgets/Home");

  /**
   * esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  protected MapView: typeof import("esri/views/MapView");

  /**
   * esri/WebMap: https://developers.arcgis.com/javascript/latest/api-reference/esri-WebMap.html
   */
  protected WebMap: typeof import("esri/WebMap");

  /**
   * boolean: When true the default map provided via url params has been loaded and should no longer override other maps
   */
  protected _defaultWebmapHonored = false;

  /**
   * esri/widgets/Home: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Home.html
   */
  protected _homeWidget: __esri.Home;

  /**
   * string: the id of map currently displayed
   */
  protected _loadedId = "";

  /**
   * HTMLDivElement: the container div for the map
   */
  protected _mapDiv: HTMLDivElement;

  /**
   * HTMLMapPickerElement: map layer picker element
   */
  protected _mapPicker: HTMLMapPickerElement;

  /**
   * HTMLMapToolsElement: the container div for the map tools
   */
  protected _mapTools: HTMLMapToolsElement;

  /**
   * HTMLCalciteDropdownElement: Dropdown the will support overflow tools that won't fit in the current display
   */
  protected _moreDropdown: HTMLCalciteDropdownElement;

  /**
   * boolean: When true the show/hide fields list is forced open
   */
  protected _mapListExpanded = false;

  /**
   * boolean: When true an indicator will be shown on the action
   */
  protected _filterActive = false;

  /**
   * string: The current layers definition expression
   */
  protected _definitionExpression: string;

  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------

  /**
   * Add/remove home widget
   */
  @Watch("enableHome")
  enableHomeWatchHandler(): void {
    this._initHome();
  }

  /**
   * watch for changes in layer view and verify if it has editing enabled
   */
  @Watch("selectedLayer")
  async selectedLayerWatchHandler(): Promise<void> {
    await this.selectedLayer?.when(async () => {
      this._definitionExpression = this.selectedLayer.definitionExpression;
    })
  }

  //--------------------------------------------------------------------------
  //
  //  Methods (public)
  //
  //--------------------------------------------------------------------------

  /**
   * Reset the filter
   */
  @Method()
  async filterReset(): Promise<void> {
    this._filterActive = false;
  }

  /**
   * updates the filter
   */
  @Method()
  async updateFilter(): Promise<void> {
    this._filterActive = this._definitionExpression !== this.selectedLayer.definitionExpression;
  }

  //--------------------------------------------------------------------------
  //
  //  Events (public)
  //
  //--------------------------------------------------------------------------

  /**
   * Emitted when a new map is loaded
   */
  @Event() mapChanged: EventEmitter<IMapChange>;

  /**
   * Emitted before a new map is loaded
   */
  @Event() beforeMapChanged: EventEmitter<void>;

  /**
   * Emitted on demand when filter action is clicked
   */
  @Event() toggleFilter: EventEmitter<void>;

  /**
   * Listen for changes to map info and load the appropriate map
   */
  @Listen("mapInfoChange", { target: "window" })
  async mapInfoChange(
    evt: CustomEvent
  ): Promise<void> {
    await this._loadMap(evt.detail);
  }

  /**
   * Listen for change when mapview doesn't contain any layer
   */
  @Listen("noLayersFound", { target: "window" })
  noLayersFound(): void {
    this.selectedLayer = undefined;
    this.selectedFeaturesIds = [];
  }

  //--------------------------------------------------------------------------
  //
  //  Functions (lifecycle)
  //
  //--------------------------------------------------------------------------

  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   */
  async componentWillLoad(): Promise<void> {
    await this._getTranslations();
    await this._initModules();
  }

  /**
   * Renders the component.
   */
  render() {
    const mapContainerClass = this.isMapLayout ? "display-flex height-50-px" : "";
    const mapClass = this.hidden ? "visibility-hidden-1" : "";
    const themeClass = this.theme === "dark" ? "calcite-mode-dark" : "calcite-mode-light";
    const mapPickerClass = this.mapInfos?.length > 1 ? "" : "display-none";
    const mapHeightClass = this.mapInfos?.length > 1 ? "map-height" : "height-full";
    const containerClass = this.isMobile ? "width-full" : "";
    const mobileClass = this.isMobile ? "border-top" : "";
    const headerElements = this.isMapLayout ? "" : "display-none";
    return (
      <Host>
        <div class={`${mapContainerClass}`}>
          <map-picker
            class={mapPickerClass}
            isMapLayout={this.isMapLayout}
            mapInfos={this.mapInfos}
            ref={(el) => this._mapPicker = el} />

          <div class={`mapView-header display-flex ${headerElements}`}>

            <div class={`border-end ${containerClass} ${mobileClass}`} id="solutions-map-layer-picker-container">
              {this.mapView && <map-layer-picker
                appearance="transparent"
                defaultLayerId={this.defaultLayerId}
                display="inline-flex"
                height={50}
                isMobile={this.isMobile}
                mapView={this.mapView}
                onlyShowUpdatableLayers={this.onlyShowUpdatableLayers}
                placeholderIcon="layers"
                scale="l"
                selectedIds={this.selectedLayer ? [this.selectedLayer.id] : []}
                showSingleLayerAsLabel={true}
                showTables={true}
                type="dropdown"
              />}
            </div>
            {this._getDropDownItem()}
          </div>
        </div>
        <div class={`${mapHeightClass} ${mapClass}`} ref={(el) => (this._mapDiv = el)} />
        <map-tools
          basemapConfig={this.basemapConfig}
          class={`box-shadow ${themeClass}`}
          enableBasemap={this.enableBasemap}
          enableFloorFilter={this.enableFloorFilter}
          enableFullscreen={this.enableFullscreen}
          enableHome={this.enableHome}
          enableLegend={this.enableLegend}
          enableSearch={this.enableSearch}
          enableSingleExpand={this.enableSingleExpand}
          homeZoomToolsSize={this.homeZoomToolsSize}
          mapView={this.mapView}
          mapWidgetsSize={this.mapWidgetsSize}
          position={this.mapWidgetsPosition}
          ref={(el) => this._mapTools = el}
          searchConfiguration={this._searchConfiguration}
          stackTools={this.stackTools}
          toolOrder={this.toolOrder}
        />
      </Host>
    );
  }

  /**
   * Called each time after the component is loaded
   */
  async componentDidRender(): Promise<void> {
    document.onclick = (e) => this._handleDocumentClick(e);
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
  protected async _initModules(): Promise<void> {
    const [WebMap, MapView, Home, esriConfig] = await loadModules([
      "esri/WebMap",
      "esri/views/MapView",
      "esri/widgets/Home",
      "esri/config"
    ]);
    this.WebMap = WebMap;
    this.MapView = MapView;
    this.Home = Home;
    this.esriConfig = esriConfig;
  }

  /**
   * Load the webmap for the provided webMapInfo
   *
   * @param webMapInfo the webmap id and name to load
   */
  protected async _loadMap(
    webMapInfo: IMapInfo
  ): Promise<void> {
    // on the first render use the default webmap id if provided otherwise use the first child of the provided mapInfos
    const loadDefaultMap = !this._defaultWebmapHonored && this.defaultWebmapId;
    const defaultMap = this.mapInfos?.filter(i => i.id === this.defaultWebmapId);

    const mapConfigChanged = JSON.stringify(webMapInfo) !== JSON.stringify(this._webMapInfo);

    this._webMapInfo = loadDefaultMap && defaultMap ? defaultMap[0] :
      !webMapInfo?.id && this.mapInfos.length > 0 ? this.mapInfos[0] : webMapInfo;

    const id = this._webMapInfo.id;
    const isDefaultMap = loadDefaultMap && webMapInfo?.id === this.defaultWebmapId;

    if ((this._loadedId !== id && !loadDefaultMap) || isDefaultMap) {
      const webMap = new this.WebMap({
        portalItem: { id }
      });

      if (this.appProxies) {
        await webMap.load();
        await joinAppProxies(webMap, this.esriConfig, this.appProxies);
      }

      this.mapView = new this.MapView({
        container: this._mapDiv,
        map: webMap,
        resizeAlign: "center"
      });

      this._loadedId = id;
      this._searchConfiguration = this._webMapInfo.searchConfiguration;

      this.beforeMapChanged.emit();

      await this.mapView.when(() => {
        this._initHome();
        this.mapView.ui.add(this._mapTools, { position: this.mapWidgetsPosition, index: this.mapWidgetsIndex });
        this._defaultWebmapHonored = isDefaultMap ? true : this._defaultWebmapHonored;
        this.mapChanged.emit({
          id: id,
          mapView: this.mapView
        });
      });
    } else if (loadDefaultMap) {
      this._defaultWebmapHonored = true;
      void this._mapPicker.setMapByID(id);
    } else if (mapConfigChanged) {
      // Map is the same so no need to reload but we need to update for any changes from the config
      this._searchConfiguration = this._webMapInfo.searchConfiguration;
      this.beforeMapChanged.emit();
      this.mapChanged.emit({
        id: id,
        mapView: this.mapView
      });
    }
  }

  /**
   * Add/remove the home widget base on enableHome prop
   *
   * @protected
   */
  protected _initHome(): void {
    if (this.enableHome) {
      this._homeWidget = new this.Home({
        view: this.mapView
      });
      this.mapView.ui.add(this._homeWidget, { position: this.homeZoomPosition, index: this.homeZoomIndex });
      const size = this.homeZoomToolsSize === "s" ? "32px" : this.homeZoomToolsSize === "m" ? "40px" : "48px";
      (this._homeWidget as any).domNode.style.height = size;
      (this._homeWidget as any).domNode.style.width = size;
    } else if (this._homeWidget) {
      this.mapView.ui.remove(this._homeWidget);
    }
  }

  /**
   * Toggle show/hide dropdown
   */
  protected _toggleShowHide(): void {
    this._showHideOpen = !this._showHideOpen;
  }

  /**
   * Open show/hide dropdown
   */
  protected _forceShowHide(): void {
    if (this._moreDropdown) {
      this._moreDropdown.open = this._showHideOpen;
    }
  }

  /**
   * Close show/hide dropdown when the user clicks outside of it
   */
  protected _handleDocumentClick(
    e: MouseEvent
  ): void {
    const id = (e.target as any)?.id;
    if (this._showHideOpen && id !== "solutions-subset-list" && id !== "solutions-more" && id !== "chevron-down") {
      if (this._moreDropdown) {
        this._showHideOpen = false;
        this._moreDropdown.open = false;
      }
    }
    // if clicked on map picker then toggle the dropdown
    if ((e.target as any).tagName === 'MAP-PICKER') {
      this._mapListExpanded = !this._mapListExpanded
      void this._mapPicker.toggle(this._mapListExpanded);
    }
    // if clicked on other place then just close the dropdown
    if ((e.target as any).tagName !== 'MAP-PICKER') {
      this._mapListExpanded = false;
      void this._mapPicker.close();
    }
  }

  /**
 * Zoom to all selected features
 *
 * @returns a promise that will resolve when the operation is complete
 */
  protected async _zoom(): Promise<void> {
    if (this.selectedLayer) {
      const selectedLayerView = await getFeatureLayerView(this.mapView, this.selectedLayer.id);
      await goToSelection(this.selectedFeaturesIds, selectedLayerView, this.mapView, true, undefined, this.zoomToScale);
    }
  }

  protected async _toggleFilter(): Promise<void> {
    this.toggleFilter.emit();
  }

  /**
   * Return true when we have at least 1 layer expression for the current layer
   *
   * @returns boolean
   */
  protected _hasFilterExpressions(): boolean {
    let layerExpressions;
    if (this.mapInfo?.filterConfig?.layerExpressions && this.selectedLayer?.id) {
      layerExpressions = this.mapInfo.filterConfig.layerExpressions.filter(
        (exp) => exp.id === this.selectedLayer.id);
    }
    return layerExpressions?.length > 0;
  }

  /**
   * Get Dropdown action item
   * @returns Dropdown item
   */
  protected _getDropDownItem(): Node {
    return (
      <calcite-dropdown
        closeOnSelectDisabled={true}
        disabled={this.selectedLayer === undefined}
        id="solutions-more"
        onCalciteDropdownBeforeClose={() => this._forceShowHide()}
        ref={(el) => this._moreDropdown = el}
        widthScale="l"
      >
        <calcite-action
          appearance="solid"
          id={'solutions-more'}
          label=""
          onClick={() => this._toggleShowHide()}
          slot="trigger"
          text=""
        >
          <calcite-button
            appearance="transparent"
            iconEnd={this._showHideOpen ? "chevron-up" : "chevron-down"}
            kind="neutral"
          >
            {this._translations.more}
          </calcite-button>
        </calcite-action>
        <calcite-dropdown-group
          selectionMode="none"
        >
          {this._getDropDownItems()}
        </calcite-dropdown-group>
      </calcite-dropdown>
    )
  }

  /**
   * Gets the dropdown items
   * @returns dropdown items
   */
  protected _getDropDownItems(): Node {
    const featureSelected = this.selectedFeaturesIds?.length > 0;
    const showMultipleEdits = this.selectedFeaturesIds?.length > 1;
    const hasFilterExpressions = this._hasFilterExpressions()
    return (
      <Fragment>
        <calcite-dropdown-group
          selectionMode={"none"}>
          <calcite-dropdown-item
            disabled={!showMultipleEdits}
            iconStart={"pencil"}
            id="solutions-subset-list"
            onClick={() => alert(this._translations.editMultiple)}>
            {this._translations.editMultiple}
          </calcite-dropdown-item>
        </calcite-dropdown-group>

        <calcite-dropdown-group
          selectionMode={"none"}>
          <calcite-dropdown-item
            iconStart={"refresh"}
            id="solutions-subset-list"
            onClick={() => { this.selectedLayer.refresh() }}>
            {this._translations.refresh}
          </calcite-dropdown-item>
        </calcite-dropdown-group>

        <calcite-dropdown-group
          selectionMode={"none"}>
          <calcite-dropdown-item
            disabled={!featureSelected}
            iconStart={"zoom-to-object"}
            id="solutions-subset-list"
            onClick={this._zoom.bind(this)}>
            {this._translations.zoom}
          </calcite-dropdown-item>
        </calcite-dropdown-group>

        {hasFilterExpressions &&
          <calcite-dropdown-group>
            <calcite-dropdown-item
              disabled={false}
              iconStart={"filter"}
              id="solutions-subset-list"
              onClick={this._toggleFilter.bind(this)}
              selected={this._filterActive}>
              {this._translations.filters}
            </calcite-dropdown-item>
          </calcite-dropdown-group>}

      </Fragment>
    )
  }

  /**
 * Fetches the component's translations
 *
 * @returns Promise when complete
 * @protected
 */
  protected async _getTranslations(): Promise<void> {
    const messages = await getLocaleComponentStrings(this.el);
    this._translations = messages[0] as typeof MapCard_T9n;
  }

}
