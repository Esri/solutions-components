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
/// <reference types="arcgis-js-api" />
import { EventEmitter, VNode } from '../../stencil-public-runtime';
import MapCard_T9n from "../../assets/t9n/map-card/resources.json";
import { EExpandType, IMapInfo } from "../../utils/interfaces";
export declare class MapCard {
  el: HTMLMapCardElement;
  /**
   * IMapInfo[]: array of map infos (name and id)
   */
  mapInfos: IMapInfo[];
  /**
   * boolean: controls the state of the map list
   */
  _mapListExpanded: boolean;
  /**
   * esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  _mapView: __esri.MapView;
  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  _translations: typeof MapCard_T9n;
  /**
   * string: id of the map to display
   */
  _webMapId: string;
  /**
   * esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  protected MapView: typeof __esri.MapView;
  /**
   * esri/WebMap: https://developers.arcgis.com/javascript/latest/api-reference/esri-WebMap.html
   */
  protected WebMap: typeof __esri.WebMap;
  /**
   * string: the id of map currently displayed
   */
  protected _loadedId: string;
  /**
   * string: the id of the container div for the map
   */
  protected _mapDivId: string;
  /**
   * Called each time the _webMapId prop is changed.
   */
  _webMapIdWatchHandler(v: any, oldV: any): void;
  /**
   * Called each time the mapInfos prop is changed.
   */
  mapInfosWatchHandler(v: any, oldV: any): void;
  /**
   * Emitted when the expand button is clicked
   */
  expandMap: EventEmitter<EExpandType>;
  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   */
  componentWillLoad(): Promise<void>;
  /**
   * StencilJS: Called after every render.
   */
  componentDidRender(): void;
  /**
   * Renders the component.
   */
  render(): any;
  /**
   * Load esri javascript api modules
   *
   * @returns Promise resolving when function is done
   *
   * @protected
   */
  protected _initModules(): Promise<void>;
  /**
   * Create the toolbar (controls used for map and app interactions)
   *
   * @returns The dom node with the toolbar
   *
   * @protected
   */
  protected _getToolbar(): VNode;
  /**
   * Load the webmap for the provided id
   *
   * @param id the webmap id to load
   *
   * @returns void
   *
   * @protected
   */
  protected _loadMap(id: string): void;
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
  protected _getActionGroup(icon: string, disabled: boolean, tip: string, func: any): VNode;
  /**
   * Get a calcite action group for the map list
   * Actions do not support multiple icons so this uses a block
   *
   * @returns the dom node for the action group
   *
   * @protected
   */
  protected _getMapPicker(): VNode;
  /**
   * Get a pick list for all maps in mapInfos
   *
   * @param show boolean to indicate if the list should be shown or hidden
   *
   * @returns the dom node for the list of maps
   *
   * @protected
   */
  protected _getMapNameList(show: boolean): VNode;
  /**
   * Fired when the user clicks on the map list
   *
   * @param id the web map id selected from the list
   *
   * @returns void
   *
   * @protected
   */
  protected _webMapSelected(id: string): void;
  /**
   * Toggles the open/close state of the map list
   *
   * @returns the dom node for the action group
   *
   * @protected
   */
  protected _chooseMap(): void;
  protected _goHome(): void;
  protected _showList(): void;
  protected _search(): void;
  protected _zoomIn(): void;
  protected _zoomOut(): void;
  /**
   * Emit the expand map event
   *
   * @returns void
   *
   * @protected
   */
  protected _expand(): void;
  /**
   * Fetches the component's translations
   *
   * @returns Promise when complete
   * @protected
   */
  protected _getTranslations(): Promise<void>;
}
