/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
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
import { Host, h } from "@stencil/core";
import { loadModules } from "../../utils/loadModules";
import { getLocaleComponentStrings } from "../../utils/locale";
export class MapSearch {
  constructor() {
    this.mapView = undefined;
    this._searchTerm = undefined;
    this._translations = undefined;
  }
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
  async clear() {
    this._searchWidget.clear();
  }
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
  async componentWillLoad() {
    await this._getTranslations();
    await this._initModules();
  }
  /**
   * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
   */
  componentDidLoad() {
    this._init();
  }
  /**
   * Renders the component.
   */
  render() {
    return (h(Host, null, h("div", { class: "search-widget", ref: (el) => { this._searchElement = el; } })));
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
  async _initModules() {
    const [Search] = await loadModules([
      "esri/widgets/Search"
    ]);
    this.Search = Search;
  }
  /**
   * Initialize the search widget
   *
   * @returns Promise resolving when function is done
   */
  _init() {
    this._initSearchWidget();
  }
  /**
   * Initialize the search widget and listen to key events
   *
   * @protected
   */
  _initSearchWidget() {
    if (this.mapView && this._searchElement) {
      const searchOptions = {
        view: this.mapView,
        container: this._searchElement,
        searchTerm: this._searchTerm
      };
      this._searchWidget = new this.Search(searchOptions);
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
  async _getTranslations() {
    const translations = await getLocaleComponentStrings(this.el);
    this._translations = translations[0];
  }
  static get is() { return "map-search"; }
  static get originalStyleUrls() {
    return {
      "$": ["map-search.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["map-search.css"]
    };
  }
  static get properties() {
    return {
      "mapView": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "__esri.MapView",
          "resolved": "MapView",
          "references": {
            "___esri": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html"
        }
      }
    };
  }
  static get states() {
    return {
      "_searchTerm": {},
      "_translations": {}
    };
  }
  static get events() {
    return [{
        "method": "searchChange",
        "name": "searchChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted on demand when the status of the search widget changes"
        },
        "complexType": {
          "original": "ISearchResult",
          "resolved": "ISearchResult",
          "references": {
            "ISearchResult": {
              "location": "import",
              "path": "../../utils/interfaces"
            }
          }
        }
      }];
  }
  static get methods() {
    return {
      "clear": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Clears the state of the search widget",
          "tags": [{
              "name": "returns",
              "text": "Promise that resolves when the operation is complete"
            }]
        }
      }
    };
  }
  static get elementRef() { return "el"; }
}
//# sourceMappingURL=map-search.js.map
