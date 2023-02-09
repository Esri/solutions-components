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
import { Host, h } from '@stencil/core';
import { loadModules } from "../../utils/loadModules";
import { getLocaleComponentStrings } from "../../utils/locale";
import { EExpandType } from "../../utils/interfaces";
// TODO navigation and accessability isn't right for the map list
//   tab does not go into the list when it's open
//   focus is not set when it opens
// TODO clarify what the Home and List buttons are supposed to do
// TODO handle zoom in/out
// TODO map list button tooltip does not work
// TODO map list should close if the user clicks something else...hope this will be easy when I figure out how to set focus when it opens
export class MapCard {
  constructor() {
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
    return (h(Host, null, this._getToolbar(), this._getMapNameList(this._mapListExpanded), h("div", { class: "map-height", id: this._mapDivId })));
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
    return (h("calcite-action-group", { class: "action-center width-1-6", layout: "horizontal" }, h("calcite-block", { class: "action-center block-button width-full height-full", heading: '', onClick: () => this._chooseMap() }, h("calcite-icon", { icon: "map", scale: "s", slot: "icon" }), h("calcite-icon", { icon: mapListIcon, scale: "s", slot: "icon" }), h("calcite-tooltip", { label: "", placement: "bottom" }, h("span", null, this._translations.mapName)))));
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
    if (this._mapListExpanded) {
      //const mapList = document.getElementById("mapList");
      // TODO figure out why this doesn't work
      //await (mapList.children[0] as HTMLCalcitePickListItemElement).setFocus();
    }
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
  static get is() { return "map-card"; }
  static get originalStyleUrls() {
    return {
      "$": ["map-card.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["map-card.css"]
    };
  }
  static get properties() {
    return {
      "mapInfos": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IMapInfo[]",
          "resolved": "IMapInfo[]",
          "references": {
            "IMapInfo": {
              "location": "import",
              "path": "../../utils/interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "IMapInfo[]: array of map infos (name and id)"
        },
        "defaultValue": "[]"
      }
    };
  }
  static get states() {
    return {
      "_mapListExpanded": {},
      "_mapView": {},
      "_translations": {},
      "_webMapId": {}
    };
  }
  static get events() {
    return [{
        "method": "expandMap",
        "name": "expandMap",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the expand button is clicked"
        },
        "complexType": {
          "original": "EExpandType",
          "resolved": "EExpandType.COLLAPSE | EExpandType.EXPAND",
          "references": {
            "EExpandType": {
              "location": "import",
              "path": "../../utils/interfaces"
            }
          }
        }
      }];
  }
  static get elementRef() { return "el"; }
  static get watchers() {
    return [{
        "propName": "_webMapId",
        "methodName": "_webMapIdWatchHandler"
      }, {
        "propName": "mapInfos",
        "methodName": "mapInfosWatchHandler"
      }];
  }
}
