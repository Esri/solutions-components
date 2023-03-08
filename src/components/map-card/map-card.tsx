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

import { Component, Element, Event, EventEmitter, Host, h, Prop, State, VNode, Watch } from '@stencil/core';
import MapCard_T9n from "../../assets/t9n/map-card/resources.json";
import { loadModules } from "../../utils/loadModules";
import { getLocaleComponentStrings } from "../../utils/locale";
import { EExpandType, IMapInfo } from "../../utils/interfaces";

// TODO navigation and accessability isn't right for the map list
//   tab does not go into the list when it's open
//   focus is not set when it opens
// TODO clarify what the Home and List buttons are supposed to do
// TODO handle zoom in/out
// TODO map list button tooltip does not work
// TODO map list should close if the user clicks something else...hope this will be easy when I figure out how to set focus when it opens

@Component({
  tag: 'map-card',
  styleUrl: 'map-card.css',
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
   * IMapInfo[]: array of map infos (name and id)
   */
  @Prop() mapInfos: IMapInfo[] = [];

  //--------------------------------------------------------------------------
  //
  //  State (internal)
  //
  //--------------------------------------------------------------------------

  /**
   * boolean: controls the state of the map list
   */
  @State() _mapListExpanded = false;

  /**
   * esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  @State() _mapView: __esri.MapView;

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() _translations: typeof MapCard_T9n;

  /**
   * string: id of the map to display
   */
  @State() _webMapId = "";

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

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
   * string: the id of the container div for the map
   */
  protected _mapDivId = "map-div";

  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------

  /**
   * Called each time the _webMapId prop is changed.
   */
  @Watch("_webMapId")
  _webMapIdWatchHandler(v: any, oldV: any): void {
    if (v && JSON.stringify(v) !== JSON.stringify(oldV)) {
      this._loadMap(v);
    }
  }

  /**
   * Called each time the mapInfos prop is changed.
   */
  @Watch("mapInfos")
  mapInfosWatchHandler(v: any, oldV: any): void {
    if (v && JSON.stringify(v) !== JSON.stringify(oldV)) {
      this._loadMap(v[0].id);
    }
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
   * Emitted when the expand button is clicked
   */
  @Event() expandMap: EventEmitter<EExpandType>;

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
   * StencilJS: Called after every render.
   */
  componentDidRender() {
    // the container node for the map view needs to exist before the view is created
    this._loadMap(this._webMapId);
  }

  /**
   * Renders the component.
   */
  render() {
    return (
      <Host>
        {this._getToolbar()}
        {this._getMapNameList(this._mapListExpanded)}
        <div class="map-height" id={this._mapDivId} />
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
    const [WebMap, MapView] = await loadModules([
      "esri/WebMap",
      "esri/views/MapView"
    ]);
    this.WebMap = WebMap;
    this.MapView = MapView;
  }

  /**
   * Create the toolbar (controls used for map and app interactions)
   *
   * @returns The dom node with the toolbar
   *
   * @protected
   */
  protected _getToolbar(): VNode {
    return (
      <div class="display-flex">
        <calcite-action-bar class="border-bottom-1 action-bar-size" expand-disabled layout="horizontal" slot="header">
          {this._getMapPicker()}
          {this._getActionGroup("home", false, this._translations.home, () => this._goHome())}
          {this._getActionGroup("list", false, this._translations.list, () => this._showList())}
          {this._getActionGroup("magnifying-glass-plus", false, this._translations.search, () => this._search())}
          {this._getActionGroup("plus", false, this._translations.zoomIn, () => this._zoomIn())}
          {this._getActionGroup("minus", false, this._translations.zoomOut, () => this._zoomOut())}
          {this._getActionGroup("expand", false, this._translations.expand, () => this._expand())}
        </calcite-action-bar>
      </div>
    );
  }

  /**
   * Load the webmap for the provided id
   *
   * @param id the webmap id to load
   *
   * @returns void
   *
   * @protected
   */
  protected _loadMap(
    id: string
  ): void {
    // on the first render use the first child of the provided mapInfos
    if (id === "" && this.mapInfos.length > 0) {
      id = this.mapInfos[0].id;
    }
    if (this._loadedId !== id) {
      const webMap = new this.WebMap({
        portalItem: { id }
      });

      this._mapView = new this.MapView({
        container: this._mapDivId,
        map: webMap,
        // TODO consider this more...seems to cause less overflow issues when the component is resized
        resizeAlign: "top-left"
      });

      this._loadedId = id;
    }
  }

  /**
   * Get a calcite action group for the current action
   *
   * @param icon the icon to display for the current action
   * @param disabled should the action be disabled
   * @param tip information tip to display helpful details to end user
   * @param func the associated onClick function to execute
   *
   * @returns the dom node for the action group
   *
   * @protected
   */
  protected _getActionGroup(
    icon: string,
    disabled: boolean,
    tip: string,
    func: any
  ): VNode {
    return (
      <calcite-action-group class="action-center width-1-6" layout="horizontal">
        <calcite-action
          alignment="center"
          class="width-full height-full"
          compact={false}
          disabled={disabled}
          icon={icon}
          id={icon}
          onClick={func}
          text=""
        >
          <calcite-icon icon={"cheveron-up"} scale="s" slot="icon" />
        </calcite-action>
        <calcite-tooltip label="" placement="bottom" reference-element={icon}>
          <span>{tip}</span>
        </calcite-tooltip>
      </calcite-action-group>
    );
  }

  /**
   * Get a calcite action group for the map list
   * Actions do not support multiple icons so this uses a block
   *
   * @returns the dom node for the action group
   *
   * @protected
   */
  protected _getMapPicker(): VNode {
    const mapListIcon = this._mapListExpanded ? "chevron-up" : "chevron-down";
    return (
      <calcite-action-group class="action-center width-1-6" layout="horizontal">
        <calcite-block
          class="action-center block-button width-full height-full"
          heading=''
          onClick={() => this._chooseMap()}
        >
          <calcite-icon icon="map" scale="s" slot="icon" />
          <calcite-icon icon={mapListIcon} scale="s" slot="icon" />
          <calcite-tooltip label="" placement="bottom">
            <span>{this._translations.mapName}</span>
          </calcite-tooltip>
        </calcite-block>
      </calcite-action-group>
    );
  }

  /**
   * Get a pick list for all maps in mapInfos
   *
   * @param show boolean to indicate if the list should be shown or hidden
   *
   * @returns the dom node for the list of maps
   *
   * @protected
   */
  protected _getMapNameList(
    show: boolean
  ): VNode {
    const listClass = show ? "map-list" : "display-none";
    return (
      <div class={listClass}>
        <calcite-pick-list id="mapList">
          {this.mapInfos.map(mapInfo => {
            return (
              <calcite-pick-list-item
                label={mapInfo.name}
                onClick={() => this._webMapSelected(mapInfo.id)}
                selected={mapInfo.id === this._loadedId}
                value={mapInfo.id}
              />
            )
          })}
        </calcite-pick-list>
      </div>
    );
  }

  /**
   * Fired when the user clicks on the map list
   *
   * @param id the web map id selected from the list
   *
   * @returns void
   *
   * @protected
   */
  protected _webMapSelected(
    id: string
  ): void {
    this._mapListExpanded = false;
    this._webMapId = id;
  }

  /**
   * Toggles the open/close state of the map list
   *
   * @returns the dom node for the action group
   *
   * @protected
   */
  protected _chooseMap(): void {
    this._mapListExpanded = !this._mapListExpanded;
    if (this._mapListExpanded) {
      //const mapList = document.getElementById("mapList");
      // TODO figure out why this doesn't work
      //await (mapList.children[0] as HTMLCalcitePickListItemElement).setFocus();
    }
  }

  // Need to discuss this with the team
  protected _goHome(): void {
    alert("go home")
  }

  // need to discuss this with the team
  protected _showList(): void {
    alert("show list")
  }

  // Need to discuss this with the team
  protected _search(): void {
    alert("search")
  }

  // Need to explore map fixed zoom in considerations
  protected _zoomIn(): void {
    alert("zoom in")
  }

  // Need to explore map fixed zoom out considerations
  protected _zoomOut(): void {
    alert("zoom out")
  }

  /**
   * Emit the expand map event
   *
   * @returns void
   *
   * @protected
   */
  protected _expand(): void {
    this.expandMap.emit(EExpandType.EXPAND);
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
