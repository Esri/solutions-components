/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { l as loadModules } from './loadModules.js';
import { g as getLocaleComponentStrings } from './locale.js';
import { b as EExpandType } from './interfaces.js';
import { d as defineCustomElement$d } from './action.js';
import { d as defineCustomElement$c } from './action-bar.js';
import { d as defineCustomElement$b } from './action-group.js';
import { d as defineCustomElement$a } from './action-menu.js';
import { d as defineCustomElement$9 } from './block.js';
import { d as defineCustomElement$8 } from './handle.js';
import { d as defineCustomElement$7 } from './icon.js';
import { d as defineCustomElement$6 } from './loader.js';
import { d as defineCustomElement$5 } from './pick-list.js';
import { d as defineCustomElement$4 } from './pick-list-item.js';
import { d as defineCustomElement$3 } from './popover.js';
import { d as defineCustomElement$2 } from './scrim.js';
import { d as defineCustomElement$1 } from './tooltip.js';

const mapCardCss = ":host{display:block;--calcite-label-margin-bottom:0;--calcite-block-padding:0}.action-bar-size{height:3.5rem;width:100%}.action-center{-webkit-box-align:center;-webkit-align-items:center;-ms-grid-row-align:center;align-items:center;align-content:center;justify-content:center}.border-bottom-1{border-width:0px;border-bottom-width:1px;border-style:solid;border-color:var(--calcite-ui-border-3)}.width-1-7{width:14.28%}.width-1-6{width:16.66%}.width-full{width:100%}.height-full{height:100%}.display-flex{display:flex}.display-grid{display:inline-grid}.block-button{border-bottom:0}.block-button:hover{background-color:var(--calcite-ui-foreground-2)}.block-button:active{background-color:var(--calcite-ui-foreground-3)}.map-list{position:absolute;inset:3.5rem 0 0 0;display:flex;flex-direction:column;overflow:hidden;animation:calcite-scrim-fade-in var(--calcite-internal-animation-timing-medium) ease-in-out;background-color:var(--calcite-scrim-background);z-index:1;width:100%;height:-moz-fit-content;height:fit-content}.map-height{height:calc(100% - 58px)}.display-none{display:none}.esri-zoom{display:none !important}";

const MapCard = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
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
  get el() { return this; }
  static get watchers() { return {
    "_webMapId": ["_webMapIdWatchHandler"],
    "mapInfos": ["mapInfosWatchHandler"]
  }; }
  static get style() { return mapCardCss; }
}, [0, "map-card", {
    "mapInfos": [16],
    "mapView": [16],
    "_mapListExpanded": [32],
    "_translations": [32],
    "_webMapId": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["map-card", "calcite-action", "calcite-action-bar", "calcite-action-group", "calcite-action-menu", "calcite-block", "calcite-handle", "calcite-icon", "calcite-loader", "calcite-pick-list", "calcite-pick-list-item", "calcite-popover", "calcite-scrim", "calcite-tooltip"];
  components.forEach(tagName => { switch (tagName) {
    case "map-card":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, MapCard);
      }
      break;
    case "calcite-action":
      if (!customElements.get(tagName)) {
        defineCustomElement$d();
      }
      break;
    case "calcite-action-bar":
      if (!customElements.get(tagName)) {
        defineCustomElement$c();
      }
      break;
    case "calcite-action-group":
      if (!customElements.get(tagName)) {
        defineCustomElement$b();
      }
      break;
    case "calcite-action-menu":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "calcite-block":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "calcite-handle":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "calcite-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "calcite-loader":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "calcite-pick-list":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "calcite-pick-list-item":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "calcite-popover":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "calcite-scrim":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "calcite-tooltip":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}
defineCustomElement();

export { MapCard as M, defineCustomElement as d };
