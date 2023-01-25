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
import { EventEmitter, VNode } from "../../stencil-public-runtime";
import { ISearchResult } from "../../utils/interfaces";
import MapSearch_T9n from "../../assets/t9n/map-search/resources.json";
export declare class MapSearch {
  el: HTMLElement;
  /**
   * esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  mapView: __esri.MapView;
  /**
   * string: Text entered by the end user.
   * Used to search against the locator.
   */
  _searchTerm: string;
  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  protected _translations: typeof MapSearch_T9n;
  /**
   * esri/widgets/Search: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html
   */
  protected Search: typeof import("esri/widgets/Search");
  /**
   * HTMLElement: The container div for the search widget
   */
  protected _searchElement: HTMLElement;
  /**
   * esri/widgets/Search: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html
   */
  protected _searchWidget: __esri.widgetsSearch;
  /**
   * An array of objects representing the results of search
   */
  protected _searchResult: any;
  /**
   * Clears the state of the search widget
   *
   * @returns Promise that resolves when the operation is complete
   */
  clear(): Promise<void>;
  /**
   * Emitted on demand when the status of the search widget changes
   *
   */
  searchChange: EventEmitter<ISearchResult>;
  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   *
   * @returns Promise when complete
   */
  componentWillLoad(): Promise<void>;
  /**
   * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
   */
  componentDidLoad(): void;
  /**
   * Renders the component.
   */
  render(): VNode;
  /**
   * Load esri javascript api modules
   *
   * @returns Promise resolving when function is done
   *
   * @protected
   */
  protected _initModules(): Promise<void>;
  /**
   * Initialize the search widget
   *
   * @returns Promise resolving when function is done
   */
  protected _init(): void;
  /**
   * Initialize the search widget and listen to key events
   *
   * @protected
   */
  protected _initSearchWidget(): void;
  /**
   * Fetches the component's translations
   *
   * @protected
   */
  protected _getTranslations(): Promise<void>;
}
