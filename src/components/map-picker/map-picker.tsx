/** @license
 * Copyright 2023 Esri
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
import MapPicker_T9n from "../../assets/t9n/map-picker/resources.json";
import { loadModules } from "../../utils/loadModules";
import { getLocaleComponentStrings } from "../../utils/locale";
import { IMapInfo } from "../../utils/interfaces";

@Component({
  tag: 'map-picker',
  styleUrl: 'map-picker.css',
  shadow: true,
})
export class MapPicker {
  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLMapPickerElement;

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
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() _translations: typeof MapPicker_T9n;

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
   * esri/WebMap: https://developers.arcgis.com/javascript/latest/api-reference/esri-WebMap.html
   */
  protected WebMap: typeof import("esri/WebMap");

  /**
   * HTMLCalciteListElement: this list of map names
   */
  protected _list: HTMLCalciteListElement;

  /**
   * string: the id of map currently displayed
   */
  protected _loadedId = "";

  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------

  /**
   * Called each time the _webMapInfo prop is changed.
   */
  @Watch("_webMapInfo")
  _webMapInfoWatchHandler(v: IMapInfo, oldV: IMapInfo): void {
    if (v && JSON.stringify(v) !== JSON.stringify(oldV)) {
      this._loadedId = v?.id;
      this.mapInfoChange.emit(v);
    }
  }

  /**
   * Called each time the mapInfos prop is changed.
   */
  @Watch("mapInfos")
  async mapInfosWatchHandler(v: IMapInfo[], oldV: IMapInfo[]): Promise<void> {
    if (v && JSON.stringify(v) !== JSON.stringify(oldV)) {
      await this._validateMaps(v);
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
   * Emitted when a new map is loaded
   */
  @Event() mapInfoChange: EventEmitter<IMapInfo>;

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
    return (
      <Host>
        {this._getToolbar()}
        {this._getMapNameList(this._mapListExpanded)}
      </Host>
    );
  }

  /**
   * Called after each render
   */
  async componentDidRender() {
    if (this._mapListExpanded) {
      await this._list.setFocus();
    }
  }

  /**
   * Called once after the component has loaded
   */
  async componentDidLoad() {
    const webMapInfo = this.mapInfos && this.mapInfos.length > 0 ? this.mapInfos[0] : undefined;
    if (webMapInfo) {
      await this._validateMaps(this.mapInfos);
      this._webMapSelected(webMapInfo);
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
    const [WebMap] = await loadModules([
      "esri/WebMap"
    ]);
    this.WebMap = WebMap;
  }

  /**
   * Validate that each map has at least one layer that has editing enabled and supports the Update edit actions
   *
   * @param mapInfos IMapInfo[] the current list of maps info
   *
   * @returns Promise resolving when function is done
   *
   * @protected
   */
  protected async _validateMaps(
    mapInfos: IMapInfo[]
  ): Promise<void> {
    let mapInfoEmitted = false;
    for (let i = 0; i < mapInfos.length; i++) {
      const mapInfo = mapInfos[i];
      const webmap = new this.WebMap({
        portalItem: {
          id: mapInfo.id
        }
      });
      await webmap.load();

      let layerEditable = false;
      await webmap.when();
      const layers = webmap.layers.toArray();
      for (let ii = 0; ii < layers.length; ii++) {
        const layer: any = layers[ii];
        await layer.load();
        await layer.when();
        layerEditable = layerEditable || layer?.editingEnabled && layer?.capabilities?.operations?.supportsUpdate;
        if (layerEditable) {
          if (!mapInfoEmitted) {
            // Emit the first mapInfo that is found that has at least one editable layer
            // this allows the rest of the UI to load while the other maps are checked
            this._webMapSelected(mapInfo);
            mapInfoEmitted = true;
          }
          break;
        }
      }
      mapInfo._hasValidLayers = layerEditable;
    }
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
      <calcite-button
        alignment="icon-end-space-between"
        appearance="transparent"
        class="width-full height-full"
        iconEnd={mapListIcon}
        kind="neutral"
        onClick={() => this._chooseMap()}
        width="full"
      >
        {this._webMapInfo?.name}
      </calcite-button>
    );
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
        <calcite-action-bar class="action-bar-color border-bottom-1 action-bar-size" expand-disabled layout="horizontal" slot="header">
          {this._getMapPicker()}
        </calcite-action-bar>
      </div>
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
    const loading = this.mapInfos[this.mapInfos.length -1]._hasValidLayers === undefined;
    return (
      <div class={listClass}>
        <calcite-list
          id="mapList"
          loading={loading}
          ref={(el) => this._list = el}
          selectionAppearance="border"
        >
          {this.mapInfos.map(mapInfo => {
            return mapInfo._hasValidLayers ? (
              <calcite-list-item
                label={mapInfo.name}
                onClick={() => this._webMapSelected(mapInfo)}
                selected={mapInfo.id === this._loadedId}
                value={mapInfo.id}
              />
            ) : (
                <div>
                  <calcite-list-item
                    class="border-bottom-1"
                    disabled={true}
                    id={mapInfo.id}
                    label={mapInfo.name}
                    onClick={() => this._webMapSelected(mapInfo)}
                    selected={mapInfo.id === this._loadedId}
                    value={mapInfo.id}
                  >
                    <calcite-icon icon="exclamation-mark-triangle" scale="s" slot="content-start" />
                  </calcite-list-item>
                  <calcite-tooltip
                    label={this._translations.enableEditUpdate}
                    placement="bottom"
                    reference-element={mapInfo.id}
                  >
                    <span>{this._translations.enableEditUpdate}</span>
                  </calcite-tooltip>
                </div>
            )
          })}
        </calcite-list>
      </div>
    );
  }

  /**
   * Fired when the user clicks on the map list
   *
   * @param webMapInfo the web map id and name selected from the list
   *
   * @returns void
   *
   * @protected
   */
  protected _webMapSelected(
    webMapInfo: IMapInfo
  ): void {
    this._mapListExpanded = false;
    this._webMapInfo = webMapInfo;
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
  }

  /**
   * Fetches the component's translations
   *
   * @returns Promise when complete
   * @protected
   */
  protected async _getTranslations(): Promise<void> {
    const messages = await getLocaleComponentStrings(this.el);
    this._translations = messages[0] as typeof MapPicker_T9n;
  }

}
