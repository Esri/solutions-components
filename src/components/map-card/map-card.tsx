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

import { Component, Element, Event, EventEmitter, Host, h, Listen, Prop, State, Watch } from "@stencil/core";
import { loadModules } from "../../utils/loadModules";
import { IBasemapConfig, IMapChange, IMapInfo, ISearchConfiguration, theme } from "../../utils/interfaces";

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
   * string: Item ID of the web map that should be selected by default when the app loads
   */
  @Prop() defaultWebmapId = "";

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
   * boolean: when true map tools will be displayed within a expand/collapse widget
   */
  @Prop() enableMapToolsExpand = true;

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
  @Prop() homeZoomPoisition: __esri.UIPosition = "top-left";

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

  //--------------------------------------------------------------------------
  //
  //  State (internal)
  //
  //--------------------------------------------------------------------------

  /**
   * ISearchConfiguration: Configuration details for the Search widget
   */
  @State() _searchConfiguration: ISearchConfiguration;

  /**
   * IMapInfo: id and name of the map to display
   */
  @State() _webMapInfo: IMapInfo;

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

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
   * Emitted when a new map is loaded
   */
  @Event() mapChanged: EventEmitter<IMapChange>;

  /**
   * Emitted before a new map is loaded
   */
  @Event() beforeMapChanged: EventEmitter<void>;

  /**
   * Listen for changes to map info and load the appropriate map
   */
  @Listen("mapInfoChange", { target: "window" })
  async mapInfoChange(
    evt: CustomEvent
  ): Promise<void> {
    await this._loadMap(evt.detail);
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
    await this._initModules();
  }

  /**
   * Renders the component.
   */
  render() {
    const mapClass = this.hidden ? "visibility-hidden" : "";
    const themeClass = this.theme === "dark" ? "calcite-mode-dark" : "calcite-mode-light";
    const mapPickerClass = this.mapInfos?.length > 1 ? "" : "display-none";
    const mapHeightClass = this.mapInfos?.length > 1 ? "map-height" : "height-full";
    return (
      <Host>
        <map-picker class={mapPickerClass} mapInfos={this.mapInfos} ref={(el) => this._mapPicker = el}/>
        <div class={`${mapHeightClass} ${mapClass}`} ref={(el) => (this._mapDiv = el)}/>
        <map-tools
          basemapConfig={this.basemapConfig}
          class={`box-shadow ${themeClass}`}
          enableBasemap={this.enableBasemap}
          enableFloorFilter={this.enableFloorFilter}
          enableFullscreen={this.enableFullscreen}
          enableLegend={this.enableLegend}
          enableMapToolsExpand={this.enableMapToolsExpand}
          enableSearch={this.enableSearch}
          homeZoomToolsSize={this.homeZoomToolsSize}
          mapView={this.mapView}
          mapWidgetsSize={this.mapWidgetsSize}
          ref={(el) => this._mapTools = el}
          searchConfiguration={this._searchConfiguration}
          stackTools={this.stackTools}
          toolOrder={this.toolOrder}
        />
      </Host>
    );
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
    const [WebMap, MapView, Home] = await loadModules([
      "esri/WebMap",
      "esri/views/MapView",
      "esri/widgets/Home"
    ]);
    this.WebMap = WebMap;
    this.MapView = MapView;
    this.Home = Home;
  }

  /**
   * Load the webmap for the provided webMapInfo
   *
   * @param webMapInfo the webmap id and name to load
   *
   * @returns void
   *
   * @protected
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
        this.mapView.ui.add(this._mapTools, { position: this.mapWidgetsPosition, index: this.mapWidgetsIndex});
        this._defaultWebmapHonored = isDefaultMap ? true : this._defaultWebmapHonored;
        this.mapChanged.emit({
          id: id,
          mapView: this.mapView
        });
      });
    } else if (loadDefaultMap) {
      this._defaultWebmapHonored = true;
      this._mapPicker.setMapByID(id);
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
      this.mapView.ui.add(this._homeWidget, { position: this.homeZoomPoisition, index: this.homeZoomIndex });
      const size = this.homeZoomToolsSize === "s" ? "32px" : this.homeZoomToolsSize === "m" ? "40px" : "48px";
      (this._homeWidget as any).domNode.style.height = size;
      (this._homeWidget as any).domNode.style.width = size;
    } else if (this._homeWidget){
      this.mapView.ui.remove(this._homeWidget);
    }
  }

}
