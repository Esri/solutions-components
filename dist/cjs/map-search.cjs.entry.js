/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ee607805.js');
const loadModules = require('./loadModules-e9007588.js');
const locale = require('./locale-d15229c4.js');
require('./_commonjsHelpers-6aafa5de.js');

const mapSearchCss = ":host{display:block}.search-widget{width:100% !important;border:1px solid var(--calcite-ui-border-input)}";

const MapSearch = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.searchChange = index.createEvent(this, "searchChange", 7);
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
    return (index.h(index.Host, null, index.h("div", { class: "search-widget", ref: (el) => { this._searchElement = el; } })));
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
    const [Search] = await loadModules.loadModules([
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
    const translations = await locale.getLocaleComponentStrings(this.el);
    this._translations = translations[0];
  }
  get el() { return index.getElement(this); }
};
MapSearch.style = mapSearchCss;

exports.map_search = MapSearch;

//# sourceMappingURL=map-search.cjs.entry.js.map