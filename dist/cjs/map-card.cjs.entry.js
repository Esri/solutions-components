/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-c6979cbb.js');
const loadModules = require('./loadModules-12ad203f.js');
const locale = require('./locale-de75eb2b.js');
const interfaces = require('./interfaces-772edf61.js');
require('./_commonjsHelpers-6aafa5de.js');

const mapCardCss = ":host{display:block;--calcite-label-margin-bottom:0;--calcite-block-padding:0}.action-bar-size{height:3.5rem;width:100%}.action-center{-webkit-box-align:center;-webkit-align-items:center;-ms-grid-row-align:center;align-items:center;align-content:center;justify-content:center}.border-bottom-1{border-width:0px;border-bottom-width:1px;border-style:solid;border-color:var(--calcite-ui-border-3)}.width-1-7{width:14.28%}.width-1-6{width:16.66%}.width-full{width:100%}.height-full{height:100%}.display-flex{display:flex}.block-button{border-bottom:0}.block-button:hover{background-color:var(--calcite-ui-foreground-2)}.block-button:active{background-color:var(--calcite-ui-foreground-3)}.map-view{padding:0;margin:0;height:100%;width:100%}.map-list{position:absolute;inset:3.5rem 0 0 0;display:flex;flex-direction:column;overflow:hidden;animation:calcite-scrim-fade-in var(--calcite-internal-animation-timing-medium) ease-in-out;background-color:var(--calcite-scrim-background);z-index:1;width:100%;height:-moz-fit-content;height:fit-content}.map-height{height:calc(100% - 58px)}.display-none{display:none}.esri-zoom{display:none !important}";

const MapCard = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.expandMap = index.createEvent(this, "expandMap", 7);
    /**
     * string: the id of map currently displayed
     */
    this._loadedId = "";
    /**
     * string: the id of the container div for the map
     */
    this._mapDivId = "map-div";
    this.mapInfos = [];
    this._mapListExpanded = false;
    this._mapView = undefined;
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
    return (index.h(index.Host, null, this._getToolbar(), this._getMapNameList(this._mapListExpanded), index.h("div", { class: "map-height", id: this._mapDivId })));
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
    const [WebMap, MapView] = await loadModules.loadModules([
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
    return (index.h("div", { class: "display-flex" }, index.h("calcite-action-bar", { class: "border-bottom-1 action-bar-size", "expand-disabled": true, layout: "horizontal", slot: "header" }, this._getMapPicker(), this._getActionGroup("home", false, this._translations.home, () => this._goHome()), this._getActionGroup("list", false, this._translations.list, () => this._showList()), this._getActionGroup("magnifying-glass-plus", false, this._translations.search, () => this._search()), this._getActionGroup("plus", false, this._translations.zoomIn, () => this._zoomIn()), this._getActionGroup("minus", false, this._translations.zoomOut, () => this._zoomOut()), this._getActionGroup("expand", false, this._translations.expand, () => this._expand()))));
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
  _getActionGroup(icon, disabled, tip, func) {
    return (index.h("calcite-action-group", { class: "action-center width-1-6", layout: "horizontal" }, index.h("calcite-action", { alignment: "center", class: "width-full height-full", compact: false, disabled: disabled, icon: icon, id: icon, onClick: func, text: "" }, index.h("calcite-icon", { icon: "cheveron-up", scale: "s", slot: "icon" })), index.h("calcite-tooltip", { label: "", placement: "bottom", "reference-element": icon }, index.h("span", null, tip))));
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
    return (index.h("calcite-action-group", { class: "action-center width-1-6", layout: "horizontal" }, index.h("calcite-block", { class: "action-center block-button width-full height-full", heading: '', onClick: () => this._chooseMap() }, index.h("calcite-icon", { icon: "map", scale: "s", slot: "icon" }), index.h("calcite-icon", { icon: mapListIcon, scale: "s", slot: "icon" }), index.h("calcite-tooltip", { label: "", placement: "bottom" }, index.h("span", null, this._translations.mapName)))));
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
    return (index.h("div", { class: listClass }, index.h("calcite-pick-list", { id: "mapList" }, this.mapInfos.map(mapInfo => {
      return (index.h("calcite-pick-list-item", { label: mapInfo.name, onClick: () => this._webMapSelected(mapInfo.id), selected: mapInfo.id === this._loadedId, value: mapInfo.id }));
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
    this.expandMap.emit(interfaces.EExpandType.EXPAND);
  }
  /**
   * Fetches the component's translations
   *
   * @returns Promise when complete
   * @protected
   */
  async _getTranslations() {
    const messages = await locale.getLocaleComponentStrings(this.el);
    this._translations = messages[0];
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "_webMapId": ["_webMapIdWatchHandler"],
    "mapInfos": ["mapInfosWatchHandler"]
  }; }
};
MapCard.style = mapCardCss;

exports.map_card = MapCard;
