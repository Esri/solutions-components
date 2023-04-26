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
import { getLocaleComponentStrings } from "../../utils/locale";
import { ELayoutMode } from '../../utils/interfaces';
export class CrowdsourceManager {
  constructor() {
    this.mapInfos = [];
    this._translations = undefined;
    this._layoutMode = ELayoutMode.GRID;
    this._mapView = undefined;
    this._panelOpen = true;
  }
  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------
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
  //--------------------------------------------------------------------------
  //
  //  Events (public)
  //
  //--------------------------------------------------------------------------
  /**
   * Handle changes to the buffer distance value
   */
  mapChanged(event) {
    this._mapView = event.detail;
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (lifecycle)
  //
  //--------------------------------------------------------------------------
  async componentWillLoad() {
    await this._getTranslations();
  }
  render() {
    return (h(Host, null, h("calcite-panel", { class: "width-full height-full", heading: this._translations.header }, h("div", { class: "display-flex", slot: "header-actions-end" }, h("div", { class: "header-text" }, "Layout"), this._getAction("grid-background", ELayoutMode.GRID, this._translations.grid), this._getAction("horizontal-background", ELayoutMode.VERTICAL, this._translations.horizontal), this._getAction("vertical-background", ELayoutMode.HORIZONTAL, this._translations.vertical)), this._getBody(this._layoutMode, this._panelOpen))));
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------
  _getAction(imgClass, layoutMode, tip) {
    return (h("div", null, h("calcite-action", { alignment: "center", appearance: "transparent", compact: false, id: imgClass, indicator: layoutMode === this._layoutMode, onClick: () => { this._setLayoutMode(layoutMode); }, text: "" }, h("div", { class: imgClass + " img-background" })), h("calcite-tooltip", { label: "", placement: "bottom", "reference-element": imgClass }, h("span", null, tip))));
  }
  _getDividerIcon(layoutMode, panelOpen) {
    let icon = "";
    switch (layoutMode) {
      case ELayoutMode.HORIZONTAL:
        icon = panelOpen ? "chevrons-up" : "chevrons-down";
        break;
      default:
        icon = panelOpen ? "chevrons-left" : "chevrons-right";
        break;
    }
    return icon;
  }
  _getMapSizeClass(layoutMode, panelOpen) {
    let sizeClass = "";
    switch (layoutMode) {
      case ELayoutMode.HORIZONTAL:
        sizeClass = `${panelOpen ? "height-1-2" : "height-0"} width-full position-relative`;
        break;
      case ELayoutMode.GRID:
        sizeClass = `height-full position-relative ${panelOpen ? "width-1-3" : "width-0"}`;
        break;
      case ELayoutMode.VERTICAL:
        sizeClass = `height-full position-relative ${panelOpen ? "width-1-2" : "width-0"}`;
        break;
    }
    return sizeClass;
  }
  _getTableSizeClass(layoutMode, panelOpen) {
    let sizeClass = "";
    switch (layoutMode) {
      case ELayoutMode.HORIZONTAL:
        sizeClass = `${panelOpen ? "height-1-2" : "height-full"} width-full display-flex flex-column`;
        break;
      case ELayoutMode.GRID:
        sizeClass = `${panelOpen ? "width-2-3" : "width-full"} height-full display-flex`;
        break;
      case ELayoutMode.VERTICAL:
        sizeClass = `${panelOpen ? "width-1-2" : "width-full"} height-full display-flex`;
        break;
    }
    return sizeClass;
  }
  _getBody(layoutMode, panelOpen) {
    const displayFlex = layoutMode === ELayoutMode.HORIZONTAL ? "" : "display-flex";
    return (h("calcite-shell", { class: "width-full height-full pad-top-51" }, h("div", { class: `width-full height-full ${displayFlex}` }, this._getMap(layoutMode, panelOpen), this._getTable(layoutMode, panelOpen))));
  }
  _getMap(layoutMode, panelOpen) {
    const mapSizeClass = this._getMapSizeClass(layoutMode, panelOpen);
    return (h("div", { class: `${mapSizeClass} overflow-hidden` }, h("div", { style: { "overflow": "hidden" } }, h("map-card", { mapInfos: this.mapInfos }))));
  }
  _getTable(layoutMode, panelOpen) {
    const tableSizeClass = this._getTableSizeClass(layoutMode, panelOpen);
    const icon = this._getDividerIcon(layoutMode, panelOpen);
    const tooltip = panelOpen ? this._translations.close : this._translations.open;
    const id = "toggle-layout";
    const toggleSizeClass = layoutMode === ELayoutMode.HORIZONTAL ? "divider-h" : "divider-w";
    return (h("div", { class: tableSizeClass }, h("div", { class: `border ${toggleSizeClass}` }, h("div", { class: "toggle-node" }, h("calcite-action", { class: "toggle-node", icon: icon, id: id, onClick: () => this._toggleLayout(), text: "" }), h("calcite-tooltip", { label: tooltip, placement: "bottom", "reference-element": id }, h("span", null, tooltip)))), h("div", { class: "width-full height-full" }, h("layer-table", { mapView: this === null || this === void 0 ? void 0 : this._mapView }))));
  }
  _setLayoutMode(layoutMode) {
    this._layoutMode = layoutMode;
  }
  _toggleLayout() {
    this._panelOpen = !this._panelOpen;
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
  static get is() { return "crowdsource-manager"; }
  static get originalStyleUrls() {
    return {
      "$": ["crowdsource-manager.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["crowdsource-manager.css"]
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
      "_translations": {},
      "_layoutMode": {},
      "_mapView": {},
      "_panelOpen": {}
    };
  }
  static get elementRef() { return "el"; }
  static get listeners() {
    return [{
        "name": "mapChanged",
        "method": "mapChanged",
        "target": "window",
        "capture": false,
        "passive": false
      }];
  }
}
