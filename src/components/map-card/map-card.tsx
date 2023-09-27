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

import { Component, Element, Event, EventEmitter, Host, h, Listen, Prop, State } from "@stencil/core";
import { loadModules } from "../../utils/loadModules";
import { IBasemapConfig, IMapChange, IMapInfo, ISearchConfiguration } from "../../utils/interfaces";

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
   * IMapInfo[]: array of map infos (name and id)
   */
  @Prop() mapInfos: IMapInfo[] = [];

  /**
   * esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  @Prop() mapView: __esri.MapView;

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
   * string: the id of map currently displayed
   */
  protected _loadedId = "";

  /**
   * HTMLDivElement: the container div for the map
   */
  protected _mapDiv: HTMLDivElement;

  /**
   * HTMLMapToolsElement: the container div for the map tools
   */
  protected _mapTools: HTMLMapToolsElement;

  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------

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
    return (
      <Host>
        <map-picker mapInfos={this.mapInfos}/>
        <div class="map-height" ref={(el) => (this._mapDiv = el)}/>
        <map-tools
          basemapConfig={this.basemapConfig}
          class={"box-shadow"}
          enableBasemap={this.enableBasemap}
          enableFloorFilter={this.enableFloorFilter}
          enableFullscreen={this.enableFullscreen}
          enableLegend={this.enableLegend}
          enableSearch={this.enableSearch}
          mapView={this.mapView}
          ref={(el) => this._mapTools = el}
          searchConfiguration={this._searchConfiguration}
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
    let id = webMapInfo?.id;
    // on the first render use the first child of the provided mapInfos
    this._webMapInfo = (id === "" || !id) && this.mapInfos.length > 0 ?
      this.mapInfos[0] : webMapInfo;

    id = this._webMapInfo.id;

    if (this._loadedId !== id) {
      const webMap = new this.WebMap({
        portalItem: { id }
      });

      this.mapView = new this.MapView({
        container: this._mapDiv,
        map: webMap,
        resizeAlign: "top-left"
      });

      this._loadedId = id;
      this._searchConfiguration = this._webMapInfo.searchConfiguration;

      this.beforeMapChanged.emit();

      await this.mapView.when(() => {
        const home = new this.Home({
          view: this.mapView
        });
        this.mapView.ui.add(home, { position: "top-left", index: 3});
        this.mapView.ui.add(this._mapTools, { position: "top-right", index: 0});

        this.mapChanged.emit({
          id: id,
          mapView: this.mapView
        });
      });
    }
  }

}
