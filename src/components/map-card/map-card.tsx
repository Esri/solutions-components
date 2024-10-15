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

import { Component, Element, Event, EventEmitter, Host, h, Listen, Prop, State, Watch, Method, VNode } from "@stencil/core";
import MapCard_T9n from "../../assets/t9n/map-card/resources.json"
import { loadModules } from "../../utils/loadModules";
import { IBasemapConfig, IMapChange, IMapInfo, ISearchConfiguration, IToolInfo, IToolSizeInfo, theme, TooltipPlacement } from "../../utils/interfaces";
import { joinAppProxies } from "templates-common-library-esm/functionality/proxy";
import { getLocaleComponentStrings } from "../../utils/locale";
import { getFeatureLayerView, goToSelection } from "../../utils/mapViewUtils";
import "@esri/instant-apps-components/dist/components/instant-apps-social-share";

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
   * boolean: when true the share widget will be available
   */
  @Prop() enableShare = false;

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
  @Prop() isMapLayout: boolean;

  /**
   * boolean: When true the share options will include embed option
   */
  @Prop() shareIncludeEmbed: boolean;

  /**
   * boolean: When true the share options will include social media sharing
   */
  @Prop() shareIncludeSocial: boolean;

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

  /**
   * IToolInfo[]: Key details used for creating the tools
   */
  @State() _toolInfos: IToolInfo[];

  /**
   * IToolSizeInfo[]: The controls that currently fit based on toolbar size
   */
  @State() _controlsThatFit: IToolSizeInfo[];

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

  /**
   * HTMLMapLayerPickerElement: The Map layer picker refrence element
   */
  protected _mapLayerPicker: HTMLMapLayerPickerElement;

  /**
   * ResizeObserver: The observer that watches for toolbar size changes
   */
  protected _resizeObserver: ResizeObserver;

  /**
   * HTMLInstantAppsSocialShareElement: Element to support app sharing to social media
   */
  protected _shareNode: HTMLInstantAppsSocialShareElement;

  /**
   * HTMLCalciteDropdownElement: Dropdown the will support show/hide of table columns
   */
  protected _showHideDropdown: HTMLCalciteDropdownElement;

  /**
   * HTMLDivElement: The toolbars containing node
   */
  protected _toolbar: HTMLDivElement;

  /**
   * any: Timeout used to limit redundancy for toolbar resizing
   */
  protected _timeout: any;

  /**
   * IToolSizeInfo[]: Id and Width for the current tools
   */
  protected _toolbarSizeInfos: IToolSizeInfo[];

  /**
   * IToolSizeInfo[]: The default list of tool size info for tools that should display outside of the dropdown
   */
  protected _defaultVisibleToolSizeInfos: IToolSizeInfo[];

  /**
   * boolean: When true the observer has been set and we don't need to set it again
   */
  protected _observerSet = false;

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
   * Update the toolbar when the share button is enabled/disabled
   */
  @Watch("enableShare")
  enableShareWatchHandler(): void {
    // this should be caught by component did render and is when I test locally
    // however have had reported case where it is not somehow on devext so adding explicit check here
    if (this._toolbar) {
      this._updateToolbar();
    }
  }

  /**
   * watch for changes in map view and get the first layer
   */
  @Watch("mapView")
  async mapViewWatchHandler(): Promise<void> {
    if (this.mapView) {
      this._updateShareUrl();
    }
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

  /**
   * watch for features ids changes
   */
  @Watch("selectedFeaturesIds")
  async selectedFeaturesIdsWatchHandler(): Promise<void> {
    this._updateShareUrl();
    this._validateEnabledActions();
  }

  /**
   * watch for changes to the list of controls that will currently fit in the display
   */
  @Watch("_controlsThatFit")
  _controlsThatFitWatchHandler(): void {
    const ids = this._controlsThatFit ? this._controlsThatFit.reduce((prev, cur) => {
      prev.push(cur.id)
      return prev;
    }, []) : [];
    this._toolInfos = this._toolInfos?.map(ti => {
      if (ti && this._controlsThatFit) {
        const id = this._getId(ti.icon);
        ti.isOverflow = ids.indexOf(id) < 0;
        return ti;
      }
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
  async resetFilter(): Promise<void> {
    this._filterActive = false;
    this._updateShareUrl();
  }

  /**
   * updates the filter
   */
  @Method()
  async updateFilterState(): Promise<void> {
    this._filterActive = this._definitionExpression !== this.selectedLayer.definitionExpression;
    this._updateShareUrl();
  }

  /**
   * updates the layer in map layer picker
   */
  @Method()
  async updateLayer(): Promise<void> {
    void this._mapLayerPicker.updateLayer();
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
   * Emitted on demand when clear selection button is clicked
   */
  @Event() clearSelection: EventEmitter<void>;

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

  /**
   * Handles layer selection change to show new table
   */
  @Listen("layerSelectionChange", { target: "window" })
  layerSelectionChange(): void {
    setTimeout(() => {
      this._initToolInfos();
    }, 50)
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
    this._initToolInfos()
    if (!this._resizeObserver) {
      this._resizeObserver = new ResizeObserver(() => this._updateToolbar());
    }
  }

  /**
   * Renders the component.
   */
  render() {
    const mapContainerClass = this.isMapLayout ? "display-flex height-49-px" : "";
    const mapClass = this.hidden ? "visibility-hidden-1" : "";
    const themeClass = this.theme === "dark" ? "calcite-mode-dark" : "calcite-mode-light";
    const mapHeightClass = this.mapInfos?.length > 1 || this.isMapLayout ? "map-height" : "height-full";
    const progressClass = this.isMapLayout ? "" : "display-none"
    this._validateActiveActions();
    return (
      <Host>
        <div class={`${mapContainerClass} width-full`}
          ref={(el) => this._toolbar = el}>
          {this._getActionBar()}
          {/* dropdown actions */}
          {!this.isMobile && this.isMapLayout && this._getDropdown("more-table-options")}
          {this.enableShare && !this.isMobile ? this._getShare("share") : undefined}
        </div>
        {/* added calcite progress below header actions to match bottom-border with the split/table view */}
        <calcite-progress class={progressClass} value={0} />
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
    if (this.isMapLayout) {
      this._updateToolbar();
    }
    document.onclick = (e) => this._handleDocumentClick(e);
  }

  /**
   * Called once after the component is loaded
   */
  async componentDidLoad(): Promise<void> {
    if (!this.isMobile && !this._observerSet) {
      this._resizeObserver.observe(this._toolbar);
      this._observerSet = true;
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
   * Add/Remove tools from the action bar and dropdown based on available size
   * @protected
   */
  protected _updateToolbar(): void {
    if (this._timeout) {
      clearTimeout(this._timeout)
    }
    if (!this.isMobile && this._toolbar && this._toolInfos) {
      this._timeout = setTimeout(() => {
        clearTimeout(this._timeout)
        this._setToolbarSizeInfos();
        const toolbarWidth = this._toolbar.offsetWidth;
        let controlsWidth = this._toolbarSizeInfos.reduce((prev, cur) => {
          prev += cur.width;
          return prev;
        }, 0);

        const skipControls = ["solutions-more", "solutions-map-layer-picker-container", "map-picker", "solutions-action-share"];
        if (controlsWidth > toolbarWidth) {
          if (this._toolbarSizeInfos.length > 0) {
            const controlsThatFit = [...this._toolbarSizeInfos].reverse().reduce((prev, cur) => {
              if (skipControls.indexOf(cur.id) < 0) {
                if (controlsWidth > toolbarWidth) {
                  controlsWidth -= cur.width;
                } else {
                  prev.push(cur);
                }
              }
              return prev;
            }, []).reverse();

            this._setControlsThatFit(controlsThatFit, skipControls);
          }
        } else {
          if (this._defaultVisibleToolSizeInfos) {
            const currentTools = this._toolbarSizeInfos.reduce((prev, cur) => {
              prev.push(cur.id);
              return prev;
            }, []);

            let forceFinish = false;
            const controlsThatFit = [...this._defaultVisibleToolSizeInfos].reduce((prev, cur) => {
              if (!forceFinish && skipControls.indexOf(cur.id) < 0 &&
                (currentTools.indexOf(cur.id) > -1 || (controlsWidth + cur.width) <= toolbarWidth)
              ) {
                if (currentTools.indexOf(cur.id) < 0) {
                  controlsWidth += cur.width;
                }
                prev.push(cur);
              } else if (skipControls.indexOf(cur.id) < 0 && (controlsWidth + cur.width) > toolbarWidth) {
                // exit the first time we evalute this as true...otherwise it will add the next control that will fit
                // and not preserve the overall order of controls
                forceFinish = true;
              }
              return prev;
            }, []);

            this._setControlsThatFit(controlsThatFit, skipControls);
          }
        }
      }, 250);
    }
  }

  /**
   * Validate if controls that fit the current display has changed or
   * is different from what is currently displayed
   * @param _setControlsThatFit
   * @param skipControls
   * @protected
   */
  protected _setControlsThatFit(
    controlsThatFit: IToolSizeInfo[],
    skipControls: string[]
  ): void {
    let update = JSON.stringify(controlsThatFit) !== JSON.stringify(this._controlsThatFit);
    const actionbar = document.getElementById("solutions-action-bar");
    actionbar?.childNodes?.forEach((n: any) => {
      if (skipControls.indexOf(n.id) < 0 && !update) {
        update = this._controlsThatFit.map(c => c.id).indexOf(n.id) < 0;
      }
    });
    if (update) {
      this._controlsThatFit = [...controlsThatFit];
    }
  }

  /**
   * Get the id and size for the toolbars current items
   * @protected
   */
  protected _setToolbarSizeInfos(): void {
    let hasWidth = false;
    this._toolbarSizeInfos = [];
    this._toolbar.childNodes.forEach((c: any, i) => {
      // handle the action bar
      if (i === 0) {
        c.childNodes.forEach((actionbarChild: any) => {
          this._toolbarSizeInfos.push({
            id: actionbarChild.id,
            width: actionbarChild.offsetWidth
          });
          if (!hasWidth) {
            hasWidth = actionbarChild.offsetWidth > 0;
          }
        });
      } else if (!c.referenceElement) {
        // skip tooltips
        this._toolbarSizeInfos.push({
          id: c.id,
          width: c.offsetWidth
        });
        if (!hasWidth) {
          hasWidth = c.offsetWidth > 0;
        }
      }
    });
    if (hasWidth && !this._defaultVisibleToolSizeInfos) {
      this._defaultVisibleToolSizeInfos = [...this._toolbarSizeInfos];
    }
  }

  /**
   * Gets a row of controls that can be used for various interactions with the table
   *
   * @returns The dom node that contains the controls
   * @protected
   */
  protected _getActionBar(): VNode {
    const mapPickerClass = this.mapInfos?.length > 1 ? "" : "display-none";
    const containerClass = this.isMapLayout ? "display-flex" : "display-block";
    const mobileClass = this.isMobile ? "border-top" : "";
    const headerElements = this.isMapLayout ? "" : "display-none";
    return (
      <calcite-action-bar
        class={containerClass}
        expandDisabled={true}
        expanded={true}
        id={this._getId("bar")}
        layout="horizontal"
      >
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
              ref={(el) => this._mapLayerPicker = el}
              scale="l"
              selectedIds={this.selectedLayer ? [this.selectedLayer.id] : []}
              showSingleLayerAsLabel={true}
              showTables={true}
              showTablesDisabled={true}
              type="dropdown"
            />}
          </div>
        </div>
        {!this.isMobile && this.isMapLayout ? this._getActions() : undefined}
      </calcite-action-bar>
    );
  }

  /**
   * Get a list of toolInfos that should display in the dropdown
   *
   * @param id string the id for the dropdown and its tooltip
   *
   * @returns VNode the dropdown node
   * @protected
   */
  protected _getDropdown(
    id: string
  ): VNode {
    const dropdownItems = this._getDropdownItems();
    return dropdownItems.length > 0 ? (
      <calcite-dropdown
        closeOnSelectDisabled={true}
        disabled={this.selectedLayer === undefined}
        id="solutions-more"
        onCalciteDropdownBeforeClose={() => this._forceShowHide()}
        ref={(el) => this._moreDropdown = el}
      >
        <calcite-action
          appearance="solid"
          id={id}
          label=""
          onClick={() => this._closeShowHide()}
          slot="trigger"
          text=""
        >
          <calcite-button
            appearance="transparent"
            iconEnd="chevron-down"
            kind="neutral"
          >
            {this._translations.more}
          </calcite-button>
        </calcite-action>
        <calcite-dropdown-group selection-mode="none">
          {
            dropdownItems.map(item => {
              return (
                <calcite-dropdown-group
                  class={item.disabled ? "disabled" : ""}
                  selectionMode={"none"}
                >
                  <calcite-dropdown-item
                    disabled={item.loading}
                    iconStart={item.icon}
                    id="solutions-subset-list"
                    onClick={item.func}
                  >
                    {item.loading ? (
                      <div class={"display-flex"}>
                        <calcite-loader
                          inline={true}
                          label={item.label}
                          scale="m"
                        />
                        {item.label}
                      </div>
                    ) : item.label}
                  </calcite-dropdown-item>
                </calcite-dropdown-group>
              )
            })
          }
        </calcite-dropdown-group>
      </calcite-dropdown>
    ) : undefined;
  }

  /**
   * Get an action and tooltip for share
   *
   * @param icon string the name of the icon to display, will also be used in its id
   *
   * @returns VNode The node representing the DOM element that will contain the action
   */
  protected _getShare(
    icon: string
  ): VNode {
    return (
      <div class="share-action" id={this._getId(icon)}>
        <instant-apps-social-share
          autoUpdateShareUrl={false}
          class="instant-app-share"
          embed={this.shareIncludeEmbed}
          popoverButtonIconScale="s"
          ref={el => this._shareNode = el}
          scale="m"
          shareButtonColor="neutral"
          shareButtonType="action"
          socialMedia={this.shareIncludeSocial}
          view={this.mapView}
        />
        {this._getToolTip("bottom", icon, this._translations.share)}
      </div>
    )
  }

  /**
   * Called each time the values that are used for custom url params change
   */
  _updateShareUrl(): void {
    const url = this._shareNode?.shareUrl;
    if (!url) {
      return;
    }
    const urlObj = new URL(url);

    //set the additional search params
    if (this._loadedId) {
      urlObj.searchParams.set("webmap", this._loadedId);
    } else {
      urlObj.searchParams.delete("webmap");
    }

    if (this.selectedLayer?.id) {
      urlObj.searchParams.set("layer", this.selectedLayer.id);
    } else {
      urlObj.searchParams.delete("layer");
    }

    if (this.selectedFeaturesIds?.length > 0) {
      urlObj.searchParams.set("oid", this.selectedFeaturesIds.join(","));
    } else {
      urlObj.searchParams.delete("oid");
    }

    this._shareNode.shareUrl = urlObj.href;
  }

  /**
   * Open show/hide dropdown
   * @protected
   */
  protected _closeShowHide(): void {
    this._showHideOpen = false;
  }

  /**
   * Get a list of toolInfos that should display in the dropdown
   *
   * @returns IToolInfo[] the list of toolInfos that should display in the dropdown
   * @protected
   */
  protected _getDropdownItems(): IToolInfo[] {
    return this._toolInfos?.filter(toolInfo => toolInfo && toolInfo.isOverflow);
  }

  /**
   * Get the full list of toolInfos.
   * Order is important. They should be listed in the order they should display in the UI from
   * Left to Right for the action bar and Top to Bottom for the dropdown.
   * @protected
   */
  protected _initToolInfos(): void {
    const featuresSelected = this.selectedFeaturesIds?.length > 0;
    const hasFilterExpressions = this._hasFilterExpressions();
    // hide multiple edits for R03
    const showMultipleEdits = this.selectedFeaturesIds?.length > 1 && false;
    if (this._translations) {
      this._toolInfos = [
        {
          active: false,
          icon: "zoom-to-object",
          indicator: false,
          label: this._translations.zoom,
          func: () => this._zoom(),
          disabled: !featuresSelected,
          isOverflow: false
        },
        hasFilterExpressions ? {
          active: false,
          icon: "filter",
          indicator: false,
          label: this._translations.filters,
          func: () => this._toggleFilter(),
          disabled: false,
          isOverflow: false
        } : undefined,
        showMultipleEdits ? {
          active: false,
          icon: "pencil",
          indicator: false,
          label: this._translations.editMultiple,
          func: () => alert(this._translations.editMultiple),
          disabled: !showMultipleEdits,
          isOverflow: false,
        } : undefined,
        {
          active: false,
          icon: "refresh",
          indicator: false,
          label: this._translations.refresh,
          func: () => this.selectedLayer.refresh(),
          disabled: false,
          isOverflow: false
        },
        {
          active: false,
          icon: "erase",
          indicator: false,
          label: this._translations.clearSelection,
          func: () => this.clearSelection.emit(),
          disabled: !featuresSelected,
          isOverflow: false
        }
      ];
      this._defaultVisibleToolSizeInfos = undefined;
    }
  }

  /**
   * Update actions active prop based on a stored value
   * @protected
   */
  protected _validateActiveActions(): void {
    const activeDependant = [
      "filter"
    ];
    this._toolInfos?.forEach(ti => {
      if (ti && activeDependant.indexOf(ti.icon) > -1) {
        if (ti.icon === "filter") {
          ti.indicator = this._filterActive;
        }
      }
    });
  }

  /**
   * Update actions enabled prop based on number of selected indexes
   * @protected
   */
  protected _validateEnabledActions(): void {
    const featuresSelected = this.selectedFeaturesIds?.length > 0;
    const showMultipleEdits = this.selectedFeaturesIds?.length > 1 && this.selectedLayer?.capabilities?.operations?.supportsUpdate;
    const selectionDependant = [
      "zoom-to-object",
      "pencil",
      "erase"
    ];
    this._toolInfos?.forEach(ti => {
      if (ti && selectionDependant.indexOf(ti.icon) > -1) {
        // disable the pencil icon if multiple features are not selected
        // For other icons disable them if any feature is not selected
        ti.disabled = ti.icon === "pencil" ? !showMultipleEdits : !featuresSelected;
      }
    });
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
    if (id === "solutions-subset-list") {
      this._moreDropdown.open = true;
    } else if (this._showHideOpen && id !== "solutions-subset-list" && id !== "solutions-more" && id !== "chevron-down") {
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

  /**
   * toggle the filter
   * @protected
   */
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
   * Get the actions that are used for various interactions with the table
   *
   * @returns VNode[] the action nodes
   */
  protected _getActions(): VNode[] {
    const actions = this._getActionItems();
    return actions?.reduce((prev, cur) => {
      if (cur && !cur.isOverflow) {
        prev.push(
          this._getAction(cur.active, cur.icon, cur.indicator, cur.label, cur.func, cur.disabled, cur.loading)
        )
      }
      return prev;
    }, []);
  }

  /**
   * Get a tooltip
   *
   * @param placement string where the tooltip should display
   * @param referenceElement string the element the tooltip will be associated with
   * @param text string the text to display in the tooltip
   *
   * @returns VNode The tooltip node
   */
  protected _getToolTip(
    placement: TooltipPlacement,
    referenceElement: string,
    text: string
  ): VNode {
    return document.getElementById(referenceElement) ? (
      <calcite-tooltip
        placement={placement}
        reference-element={"map-" + referenceElement}
      >
        <span>{text}</span>
      </calcite-tooltip>
    ) : undefined;
  }

  /**
   * Get a list of toolInfos that should display outside of the dropdown
   *
   * @returns IToolInfo[] the list of toolInfos that should not display in the overflow dropdown
   */
  protected _getActionItems(): IToolInfo[] {
    return this._toolInfos?.filter(toolInfo => toolInfo && !toolInfo.isOverflow)
  }

  /**
   * Get an action and tooltip
   *
   * @param active boolean if true the icon is in use
   * @param icon string the name of the icon to display, will also be used as the id
   * @param indicator if true the icon will shown using indicator
   * @param label string the text to display and label the action
   * @param func any the function to execute
   * @param disabled boolean when true the user will not be able to interact with the action
   * @param loading if true loading indicator will shown
   * @param slot slot for the action
   *
   * @returns VNode The node representing the DOM element that will contain the action
   */
  protected _getAction(
    active: boolean,
    icon: string,
    indicator: boolean,
    label: string,
    func: any,
    disabled: boolean,
    loading: boolean,
    slot?: string
  ): VNode {
    const _disabled = this.selectedLayer === undefined ? true : disabled;
    return (
      <div class={"display-flex"} id={this._getId(icon)} slot={slot}>
        <calcite-action
          active={active}
          appearance="solid"
          disabled={_disabled}
          icon={icon}
          id={"map-" + icon}
          indicator={indicator}
          label={label}
          loading={loading}
          onClick={func}
          text={label}
          textEnabled={true}
        />
        {this._getToolTip("bottom", icon, label)}
      </div>
    )
  }

  /**
   * Get an id with a prefix to the user supplied value
   *
   * @param id the unique value for the id
   *
   * @returns the new id with the prefix value
   */
  protected _getId(
    id: string
  ): string {
    return `solutions-action-${id}`;
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
