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
import { getMapLayerNames } from "../../utils/mapViewUtils";
import state from "../../utils/publicNotificationStore";
export class MapLayerPicker {
  constructor() {
    this.layerNames = [];
    this.mapView = undefined;
    this.selectedLayers = [];
    this.selectionMode = "single";
  }
  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------
  /**
   * Called each time the mapView prop is changed.
   *
   */
  async watchStateHandler(newValue, oldValue) {
    if (newValue !== oldValue) {
      await this._setLayers();
      if (this.selectionMode === "single") {
        this.layerSelectionChange.emit([this.layerNames[0]]);
      }
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
    await this._setLayers();
    if (this.selectionMode === "single" && (this.layerNames.length > 0 || this.selectedLayers.length === 1)) {
      this.layerSelectionChange.emit(this.selectedLayers.length === 1 ? [this.selectedLayers[0]] : [this.layerNames[0]]);
    }
  }
  /**
   * Renders the component.
   */
  render() {
    return (h(Host, null, h("div", { class: "map-layer-picker-container" }, h("div", { class: "map-layer-picker" }, this.selectionMode === "multi" ? this._getCombobox() : this._getSelect()))));
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------
  /**
   * Create a list of layers from the map
   *
   * Used for selecting a single layer.
   *
   * @returns Calcite Select component with the names of the layers from the map
   */
  _getSelect() {
    return (h("calcite-select", { label: "", onCalciteSelectChange: (evt) => this._layerSelectionChange(evt), ref: (el) => { this._layerElement = el; } }, this._addMapLayersOptions()));
  }
  /**
   * Create a list of layers from the map
   *
   * Used for selecting multiple layers
   *
   * @returns Calcite ComboBox component with the names of the layers from the map
   */
  _getCombobox() {
    return (h("calcite-combobox", { label: "", onCalciteComboboxChange: (evt) => this._layerSelectionChange(evt), "selection-mode": this.selectionMode }, this._addMapLayersOptions()));
  }
  /**
   * Hydrate a select or combobox component with the names of the layers in the map
   *
   * @returns Array of ComboBox items or Select options for the names of the layers
   */
  _addMapLayersOptions() {
    return this.layerNames.reduce((prev, cur) => {
      if (state.managedLayers.indexOf(cur) < 0) {
        prev.push(this.selectionMode === "multi" && this.selectedLayers.indexOf(cur) > -1 ?
          (h("calcite-combobox-item", { selected: true, textLabel: cur, value: cur })) :
          this.selectionMode === "multi" ?
            (h("calcite-combobox-item", { textLabel: cur, value: cur })) :
            this.selectedLayers.indexOf(cur) > -1 ?
              (h("calcite-option", { label: cur, selected: true, value: cur })) :
              (h("calcite-option", { label: cur, value: cur })));
      }
      return prev;
    }, []);
  }
  /**
   * Fetch the names of the layers from the map
   *
   * @returns Promise when the operation has completed
   */
  async _setLayers() {
    if (this.mapView) {
      this.layerNames = await getMapLayerNames(this.mapView);
    }
  }
  /**
   * Fetch the names of the layers from the map
   *
   * @returns Promise when the operation has completed
   */
  _layerSelectionChange(evt) {
    var _a;
    this.selectedLayers = this.selectionMode === "single" ?
      [this._layerElement.value] : ((_a = evt.detail) === null || _a === void 0 ? void 0 : _a.selectedItems.map((item) => {
      return item.value;
    })) || [];
    this.layerSelectionChange.emit(this.selectedLayers);
  }
  static get is() { return "map-layer-picker"; }
  static get originalStyleUrls() {
    return {
      "$": ["map-layer-picker.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["map-layer-picker.css"]
    };
  }
  static get properties() {
    return {
      "layerNames": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "string[]",
          "resolved": "string[]",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "string[]: list of layer names from the map"
        },
        "defaultValue": "[]"
      },
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
      },
      "selectedLayers": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "string[]",
          "resolved": "string[]",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "string[]: list of layers that have been selected by the end user"
        },
        "defaultValue": "[]"
      },
      "selectionMode": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "SelectionMode",
          "resolved": "\"multi\" | \"single\"",
          "references": {
            "SelectionMode": {
              "location": "import",
              "path": "../../utils/interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "SelectionMode: \"single\" | \"multi\"\r\n\r\nShould the component support selection against a single layer or multiple layers."
        },
        "attribute": "selection-mode",
        "reflect": true,
        "defaultValue": "\"single\""
      }
    };
  }
  static get events() {
    return [{
        "method": "layerSelectionChange",
        "name": "layerSelectionChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted on demand when a layer is selected"
        },
        "complexType": {
          "original": "string[]",
          "resolved": "string[]",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "el"; }
  static get watchers() {
    return [{
        "propName": "mapView",
        "methodName": "watchStateHandler"
      }];
  }
}
//# sourceMappingURL=map-layer-picker.js.map
