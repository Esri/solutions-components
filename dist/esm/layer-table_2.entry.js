/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, h, H as Host, g as getElement, c as createEvent } from './index-d298aca9.js';
import { l as loadModules } from './loadModules-cd3569de.js';
import { g as getLocaleComponentStrings } from './locale-54cac39a.js';
import { e as getMapLayerIds, b as getMapLayerView, g as goToSelection, f as queryAllFeatures } from './mapViewUtils-9f405325.js';
import { d as downloadCSV } from './downloadUtils-8f57f590.js';
import { d as EExpandType } from './interfaces-cd9c07ee.js';
import './_commonjsHelpers-d5f9d613.js';

const layerTableCss = ":host{display:block}.table-div{height:calc(100% - 35px)}.display-flex{display:flex}.table-border{border:1px solid var(--calcite-ui-border-2)}";

const LayerTable = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /**
     * string[]: List of field names to display
     */
    this._fieldNames = [];
    /**
     * esri/Graphic[]: https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html
     */
    this._graphics = [];
    /**
     * Store a reference to the table node after it's first created
     * and initializes the FeatureTable
     *
     * @returns void
     */
    this.onTableNodeCreate = (node) => {
      this._tableNode = node;
      this._getTable(node);
    };
    this.mapView = undefined;
    this._layerView = undefined;
    this._selectedIndexes = [];
    this._translations = undefined;
  }
  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------
  async mapViewWatchHandler() {
    const mapLayerIds = await getMapLayerIds(this.mapView);
    this._layerView = await getMapLayerView(this.mapView, mapLayerIds[0]);
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
   * Renders the component.
   */
  render() {
    if (!this._layerView) {
      return null;
    }
    return (h(Host, null, this._getTableControlRow(), h("div", { class: "table-div width-full" }, h("calcite-panel", { class: "height-full width-full" }, h("div", { ref: this.onTableNodeCreate }))), h("edit-record-modal", { ref: (el) => this._editMultipleMpdal = el })));
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
    const [FeatureTable] = await loadModules([
      "esri/widgets/FeatureTable"
    ]);
    this.FeatureTable = FeatureTable;
  }
  /**
   * Gets a row of controls that can be used for various interactions with the table
   *
   * @returns The dom node that contains the controls
   */
  _getTableControlRow() {
    const featuresSelected = this._selectedIndexes.length > 0;
    const multiFeaturesSelected = this._selectedIndexes.length > 1;
    return (h("div", { class: "display-flex table-border" }, h("map-layer-picker", { mapView: this.mapView, onLayerSelectionChange: (evt) => this._layerSelectionChanged(evt) }), h("div", null, h("calcite-button", { appearance: 'transparent', color: 'neutral', disabled: !featuresSelected, iconStart: 'magnifying-glass', onClick: () => this._zoom() }, this._translations.zoom), h("calcite-button", { appearance: 'transparent', color: 'neutral', disabled: !multiFeaturesSelected, iconStart: 'pencil', onClick: () => this._editMultiple() }, this._translations.editMultiple), h("calcite-button", { appearance: 'transparent', color: 'neutral', disabled: !featuresSelected, iconStart: 'trash', onClick: () => this._delete() }, this._translations.delete), h("calcite-split-button", { appearance: "transparent", color: "neutral", "primary-text": this._translations.more }, h("calcite-dropdown-group", { "selection-mode": "none" }, h("calcite-dropdown-item", { iconStart: 'list-check-all', onClick: () => this._selectAll(true) }, this._translations.selectAll), h("calcite-dropdown-item", { iconStart: 'selected-items-filter', onClick: () => this._showSelected() }, this._translations.showSelected), h("calcite-dropdown-item", { iconStart: 'erase', onClick: () => this._clearSelection() }, this._translations.clearSelection), h("calcite-dropdown-item", { iconStart: 'refresh', onClick: () => this._switchSelected() }, this._translations.switchSelected), h("calcite-dropdown-item", { iconStart: 'export', onClick: () => this._exportToCSV() }, this._translations.exportCSV))))));
  }
  /**
   * Initialize the FeatureTable
   *
   * @returns void
   */
  _getTable(node) {
    var _a;
    if ((_a = this._layerView) === null || _a === void 0 ? void 0 : _a.layer) {
      this._table = new this.FeatureTable({
        layer: this._layerView.layer,
        view: this.mapView,
        editingEnabled: true,
        highlightOnRowSelectEnabled: true,
        multiSortEnabled: false,
        visibleElements: {
          header: false,
          menu: false
        },
        container: node
      });
    }
  }
  /**
   * Select or deselect all rows
   *
   * @param checked When true all rows will be selected
   *
   * @returns void
   */
  _selectAll(checked) {
    this._selectedIndexes = checked ? this._graphics.map((_g, i) => i) : [];
  }
  // need to discuss with team
  _showSelected() {
    console.log("_showSelected");
  }
  /**
   * Clears the selected indexes
   *
   * @returns void
   */
  _clearSelection() {
    this._selectedIndexes = [];
  }
  /**
   * Select all rows that are not currently selectd
   *
   * @returns void
   */
  _switchSelected() {
    const currentIndexes = [...this._selectedIndexes];
    this._selectedIndexes = this._graphics.reduce((prev, _cur, i) => {
      if (currentIndexes.indexOf(i) < 0) {
        prev.push(i);
      }
      return prev;
    }, []);
  }
  /**
   * Export all selected rows as CSV
   *
   * @returns a promise that will resolve when the operation is complete
   */
  _exportToCSV() {
    void downloadCSV([], this._layerView.layer, this._getSelectedIds(), false, // formatUsingLayerPopup
    false, // removeDuplicates
    true);
  }
  /**
   * Zoom to all selected features
   *
   * @returns a promise that will resolve when the operation is complete
   */
  _zoom() {
    const ids = this._getSelectedIds();
    void goToSelection(ids, this._layerView, this.mapView, true);
  }
  /**
   * Open the edit multiple modal
   *
   * @returns void
   */
  _editMultiple() {
    this._editMultipleMpdal.open = true;
  }
  /**
   * Delete all selected records
   *
   * @returns a promise that will resolve when the operation is complete
   */
  _delete() {
    console.log("delete");
  }
  /**
   * Get the graphics for all selected indexes
   *
   * @param indexes the indexes for the graphics to fetch
   *
   * @returns An array of selected graphics
   */
  _getGraphics(indexes) {
    return this._graphics.filter((_g, i) => indexes.indexOf(i) > -1);
  }
  /**
   * Gets the object ids for all selected rows
   *
   * @returns An array of object ids
   */
  _getSelectedIds() {
    const graphics = this._getGraphics(this._selectedIndexes);
    return graphics.map(g => g.getObjectId());
  }
  /**
   * Update the selected indexes based on the current row
   *
   * @param index the index of the selected row
   *
   * @returns void
   */
  _rowSelected(index) {
    const indexOfSelected = this._selectedIndexes.indexOf(index);
    if (indexOfSelected > -1) {
      this._selectedIndexes.splice(indexOfSelected, 1);
      this._selectedIndexes = [...this._selectedIndexes];
    }
    else {
      this._selectedIndexes = [...this._selectedIndexes, index];
    }
  }
  /**
   * Handles layer selection change to show new table
   *
   * @returns a promise that will resolve when the operation is complete
   */
  async _layerSelectionChanged(evt) {
    const layerName = evt.detail[0];
    this._layerView = await getMapLayerView(this.mapView, layerName);
    // TODO rethink this...when we use later we need to be able to lookup with name
    this._fieldNames = this._layerView.layer.fields.map(f => f.alias || f.name);
    this._graphics = await queryAllFeatures(0, this._layerView.layer, []);
    this._selectedIndexes = [];
    this._table.layer = this._layerView.layer;
    this._table.render();
  }
  /**
   * Fetches the component's translations
   *
   * @returns Promise when complete
   * @protected
   */
  async _getTranslations() {
    const messages = await getLocaleComponentStrings(this.el);
    this._translations = messages[0];
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "mapView": ["mapViewWatchHandler"]
  }; }
};
LayerTable.style = layerTableCss;

const mapCardCss = ":host{display:block;--calcite-label-margin-bottom:0;--calcite-block-padding:0}.action-bar-size{height:3.5rem;width:100%}.action-center{-webkit-box-align:center;-webkit-align-items:center;-ms-grid-row-align:center;align-items:center;align-content:center;justify-content:center}.border-bottom-1{border-width:0px;border-bottom-width:1px;border-style:solid;border-color:var(--calcite-ui-border-3)}.width-1-7{width:14.28%}.width-1-6{width:16.66%}.width-full{width:100%}.height-full{height:100%}.display-flex{display:flex}.display-grid{display:inline-grid}.block-button{border-bottom:0}.block-button:hover{background-color:var(--calcite-ui-foreground-2)}.block-button:active{background-color:var(--calcite-ui-foreground-3)}.map-list{position:absolute;inset:3.5rem 0 0 0;display:flex;flex-direction:column;overflow:hidden;animation:calcite-scrim-fade-in var(--calcite-internal-animation-timing-medium) ease-in-out;background-color:var(--calcite-scrim-background);z-index:1;width:100%;height:-moz-fit-content;height:fit-content}.map-height{height:calc(100% - 58px)}.display-none{display:none}.esri-zoom{display:none !important}";

const MapCard = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.expandMap = createEvent(this, "expandMap", 7);
    this.mapChanged = createEvent(this, "mapChanged", 7);
    /**
     * string: the id of map currently displayed
     */
    this._loadedId = "";
    this.mapInfos = [];
    this.mapView = undefined;
    this._mapListExpanded = false;
    this._translations = undefined;
    this._webMapId = "";
  }
  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------
  /**
   * Called each time the _webMapId prop is changed.
   */
  _webMapIdWatchHandler(v, oldV) {
    if (v && JSON.stringify(v) !== JSON.stringify(oldV)) {
      this._loadMap(v);
    }
  }
  /**
   * Called each time the mapInfos prop is changed.
   */
  mapInfosWatchHandler(v, oldV) {
    if (v && JSON.stringify(v) !== JSON.stringify(oldV)) {
      this._loadMap(v[0].id);
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (lifecycle)
  //
  //--------------------------------------------------------------------------
  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   */
  async componentWillLoad() {
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
    return (h(Host, null, this._getToolbar(), this._getMapNameList(this._mapListExpanded), h("div", { class: "map-height", ref: (el) => (this._mapDiv = el) })));
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
  _getToolbar() {
    return (h("div", { class: "display-flex" }, h("calcite-action-bar", { class: "border-bottom-1 action-bar-size", "expand-disabled": true, layout: "horizontal", slot: "header" }, this._getMapPicker(), this._getActionGroup("home", false, this._translations.home, () => this._goHome()), this._getActionGroup("list", false, this._translations.list, () => this._showList()), this._getActionGroup("magnifying-glass-plus", false, this._translations.search, () => this._search()), this._getActionGroup("plus", false, this._translations.zoomIn, () => this._zoomIn()), this._getActionGroup("minus", false, this._translations.zoomOut, () => this._zoomOut()), this._getActionGroup("expand", false, this._translations.expand, () => this._expand()))));
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
  _loadMap(id) {
    // on the first render use the first child of the provided mapInfos
    if (id === "" && this.mapInfos.length > 0) {
      id = this.mapInfos[0].id;
    }
    if (this._loadedId !== id) {
      const webMap = new this.WebMap({
        portalItem: { id }
      });
      this.mapView = new this.MapView({
        container: this._mapDiv,
        map: webMap,
        // TODO consider this more...seems to cause less overflow issues when the component is resized
        resizeAlign: "top-left"
      });
      this._loadedId = id;
      this.mapChanged.emit(this.mapView);
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
  _getActionGroup(icon, disabled, tip, func) {
    return (h("calcite-action-group", { class: "action-center width-1-6", layout: "horizontal" }, h("calcite-action", { alignment: "center", class: "width-full height-full", compact: false, disabled: disabled, icon: icon, id: icon, onClick: func, text: "" }, h("calcite-icon", { icon: "cheveron-up", scale: "s", slot: "icon" })), h("calcite-tooltip", { label: "", placement: "bottom", "reference-element": icon }, h("span", null, tip))));
  }
  /**
   * Get a calcite action group for the map list
   * Actions do not support multiple icons so this uses a block
   *
   * @returns the dom node for the action group
   *
   * @protected
   */
  _getMapPicker() {
    const mapListIcon = this._mapListExpanded ? "chevron-up" : "chevron-down";
    return (h("calcite-action-group", { class: "action-center width-1-6", layout: "horizontal" }, h("calcite-block", { class: "action-center block-button width-full height-full display-grid", heading: '', onClick: () => this._chooseMap() }, h("calcite-icon", { icon: "map", scale: "s", slot: "icon" }), h("calcite-icon", { icon: mapListIcon, scale: "s", slot: "icon" }), h("calcite-tooltip", { label: "", placement: "bottom" }, h("span", null, this._translations.mapName)))));
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
  _getMapNameList(show) {
    const listClass = show ? "map-list" : "display-none";
    return (h("div", { class: listClass }, h("calcite-pick-list", { id: "mapList" }, this.mapInfos.map(mapInfo => {
      return (h("calcite-pick-list-item", { label: mapInfo.name, onClick: () => this._webMapSelected(mapInfo.id), selected: mapInfo.id === this._loadedId, value: mapInfo.id }));
    }))));
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
  _webMapSelected(id) {
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
  _chooseMap() {
    this._mapListExpanded = !this._mapListExpanded;
  }
  // Need to discuss this with the team
  _goHome() {
    alert("go home");
  }
  // need to discuss this with the team
  _showList() {
    alert("show list");
  }
  // Need to discuss this with the team
  _search() {
    alert("search");
  }
  // Need to explore map fixed zoom in considerations
  _zoomIn() {
    alert("zoom in");
  }
  // Need to explore map fixed zoom out considerations
  _zoomOut() {
    alert("zoom out");
  }
  /**
   * Emit the expand map event
   *
   * @returns void
   *
   * @protected
   */
  _expand() {
    this.expandMap.emit(EExpandType.EXPAND);
  }
  /**
   * Fetches the component's translations
   *
   * @returns Promise when complete
   * @protected
   */
  async _getTranslations() {
    const messages = await getLocaleComponentStrings(this.el);
    this._translations = messages[0];
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "_webMapId": ["_webMapIdWatchHandler"],
    "mapInfos": ["mapInfosWatchHandler"]
  }; }
};
MapCard.style = mapCardCss;

export { LayerTable as layer_table, MapCard as map_card };
