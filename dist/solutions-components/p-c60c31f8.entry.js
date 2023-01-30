/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './p-c023e6a1.js';
import { l as loadModules } from './p-1c567f3a.js';
import { g as getLocaleComponentStrings } from './p-44da2507.js';
import './p-3b010ce1.js';

const mapSearchCss = ":host{display:block}.search-widget{width:100% !important;border:1px solid var(--calcite-ui-border-input)}";

const MapSearch = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.searchChange = createEvent(this, "searchChange", 7);
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
  get el() { return getElement(this); }
};
MapSearch.style = mapSearchCss;

export { MapSearch as map_search };

//# sourceMappingURL=p-c60c31f8.entry.js.map