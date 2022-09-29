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

import { Component, Element, Event, EventEmitter, Host, h, Prop, State } from '@stencil/core';
import { loadModules } from "../../utils/loadModules";
import { ISearchResult } from '../../utils/interfaces';
//import state from "../../utils/publicNotificationStore";
import MapSearch_T9n from '../../assets/t9n/map-search/resources.json';
import { getLocaleComponentStrings } from '../../utils/locale';
import { Method } from '@esri/calcite-components/dist/types/stencil-public-runtime';

@Component({
  tag: 'map-search',
  styleUrl: 'map-search.css',
  shadow: false,
})
export class MapSearch {
  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
   @Prop() mapView: __esri.MapView;

  //--------------------------------------------------------------------------
  //
  //  Properties (private)
  //
  //--------------------------------------------------------------------------

  /**
   * string: Text entered by the end user.
   * Used to search against the locator.
   */
   @State() searchTerm: string;

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
   @State() translations: typeof MapSearch_T9n;

  /**
   * esri/widgets/Search: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html
   */
   protected Search: typeof __esri.widgetsSearch

  /**
   * HTMLElement: The container div for the search widget
   */
   protected _searchDiv: HTMLElement;

   /**
    * esri/widgets/Search: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html
    */
   protected _searchWidget: __esri.widgetsSearch;

  /**
   * An array of objects representing the results of search
   */
   protected _searchResult: any;


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

  @Method()
  async clear() {
    this._searchWidget.clear();
  }

  //--------------------------------------------------------------------------
  //
  //  Events (public)
  //
  //--------------------------------------------------------------------------

  @Event() searchChange: EventEmitter<ISearchResult>;

  //--------------------------------------------------------------------------
  //
  //  Functions (lifecycle)
  //
  //--------------------------------------------------------------------------

  async componentWillLoad() {
    await this._getTranslations();
    await this._initModules();
  }

  async componentDidLoad() {
    this._init();
  }

  render() {
    return (
      <Host>
        <div class="search-widget" ref={(el) => { this._searchDiv = el }} />
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Functions (private)
  //
  //--------------------------------------------------------------------------

  async _initModules(): Promise<void> {
    const [Search]: [
      __esri.widgetsSearchConstructor
    ] = await loadModules([
      "esri/widgets/Search"
    ]);
    this.Search = Search;
  }

  async _init() {
    this._initSearchWidget();
  }

  _initSearchWidget(): void {
    if (this.mapView && this._searchDiv) {
      const searchOptions: __esri.widgetsSearchProperties = {
        view: this.mapView,
        container: this._searchDiv,
        searchTerm: this.searchTerm
      };

      this._searchWidget = new this.Search(searchOptions);

      this._searchWidget.on('search-clear', () => {
        this._searchResult = undefined;
        this.searchChange.emit(this._searchResult);
      });

      this._searchWidget.on('select-result', (searchResults) => {
        this._searchResult = undefined;
        if (searchResults.result) {
          this._searchResult = searchResults.result;
          this.searchChange.emit({
            graphics: [searchResults.result.feature],
            name: searchResults.result.name || ""
          });
        }
      });
    }
  }

  async _getTranslations() {
    const translations = await getLocaleComponentStrings(this.el);
    this.translations = translations[0] as typeof MapSearch_T9n;
  }
}
