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

import { Component, Element, Event, EventEmitter, Host, h, Method, Prop, State, VNode } from "@stencil/core";
import { ISearchResult } from "../../utils/interfaces";
import MapSearch_T9n from "../../assets/t9n/map-search/resources.json";
import { getLocaleComponentStrings } from "../../utils/locale";
import Search from "@arcgis/core/widgets/Search";

@Component({
  tag: "map-search",
  styleUrl: "map-search.css",
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
  //  State (internal)
  //
  //--------------------------------------------------------------------------

  /**
   * string: Text entered by the end user.
   * Used to search against the locator.
   */
  @State() _searchTerm: string;

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() protected _translations: typeof MapSearch_T9n;

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

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

  /**
   * Clears the state of the search widget
   *
   * @returns Promise that resolves when the operation is complete
   */
  @Method()
  async clear(): Promise<void> {
    this._searchWidget.clear();
  }

  //--------------------------------------------------------------------------
  //
  //  Events (public)
  //
  //--------------------------------------------------------------------------

  /**
   * Emitted on demand when the status of the search widget changes
   *
   */
  @Event() searchChange: EventEmitter<ISearchResult>;

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
  }

  /**
   * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
   */
  componentDidLoad(): void {
    this._init();
  }

  /**
   * Renders the component.
   */
  render(): VNode {
    return (
      <Host>
        <div class="search-widget" ref={(el) => { this._searchElement = el }} />
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * Initialize the search widget
   *
   * @returns Promise resolving when function is done
   */
  protected _init(): void {
    this._initSearchWidget();
  }

  /**
   * Initialize the search widget and listen to key events
   *
   * @protected
   */
  protected _initSearchWidget(): void {
    if (this.mapView && this._searchElement) {
      const searchOptions: __esri.widgetsSearchProperties = {
        view: this.mapView,
        container: this._searchElement,
        searchTerm: this._searchTerm
      };

      this._searchWidget = new Search(searchOptions);

      this._searchWidget.on("search-clear", () => {
        this._searchResult = undefined;
        this.searchChange.emit(this._searchResult);
      });

      this._searchWidget.on("select-result", (searchResults) => {
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

  /**
   * Fetches the component's translations
   *
   * @protected
   */
  protected async _getTranslations(): Promise<void> {
    const translations = await getLocaleComponentStrings(this.el);
    this._translations = translations[0] as typeof MapSearch_T9n;
  }
}
