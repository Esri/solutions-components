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
import { getMapLayerNames } from "../../utils/mapViewUtils";
export class ConfigLayerPicker {
  constructor() {
    this.defaultChecked = true;
    this.instruction = "";
    this.mapView = undefined;
    this._layerNames = [];
    this._translations = undefined;
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
  async watchStateHandler() {
    await this._setLayers();
  }
  //--------------------------------------------------------------------------
  //
  //  Methods (public)
  //
  //--------------------------------------------------------------------------
  /**
   * Returns a list of layers that have been selected
   *
   * @returns Promise with a list of layer names to use
   */
  async getConfigInfo() {
    return typeof this._checkList.value === "string" ?
      [this._checkList.value] : this._checkList.value;
  }
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
    await this._setLayers();
    await this._getTranslations();
  }
  /**
   * Renders the component.
   */
  render() {
    return (h(Host, null, h("div", null, h("div", { class: "padding-block-end-1" }, h("calcite-label", { class: "label-spacing" }, this.instruction || this._translations.chooseLayer)), h("div", { class: "padding-inline-start-1" }, h("calcite-combobox", { label: '', overlayPositioning: "fixed", ref: (el) => { this._checkList = el; }, selectionMode: "multiple" }, this._getComboboxItems())))));
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------
  _getComboboxItems() {
    return this._layerNames ? this._layerNames.map(name => (h("calcite-combobox-item", { textLabel: name, value: name }))) : [];
  }
  /**
   * Fetch the names of the layers from the map
   *
   * @returns Promise when the operation has completed
   */
  async _setLayers() {
    if (this.mapView) {
      this._layerNames = await getMapLayerNames(this.mapView);
    }
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
  static get is() { return "config-layer-picker"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["config-layer-picker.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["config-layer-picker.css"]
    };
  }
  static get properties() {
    return {
      "defaultChecked": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "boolean: All checkboxes checked state will be set with this value on first render.\r\nDefault is true"
        },
        "attribute": "default-checked",
        "reflect": true,
        "defaultValue": "true"
      },
      "instruction": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "string: Value to be shown above the check list\r\nAllows this to support multiple sets of layers."
        },
        "attribute": "instruction",
        "reflect": false,
        "defaultValue": "\"\""
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
      }
    };
  }
  static get states() {
    return {
      "_layerNames": {},
      "_translations": {}
    };
  }
  static get methods() {
    return {
      "getConfigInfo": {
        "complexType": {
          "signature": "() => Promise<string[]>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<string[]>"
        },
        "docs": {
          "text": "Returns a list of layers that have been selected",
          "tags": [{
              "name": "returns",
              "text": "Promise with a list of layer names to use"
            }]
        }
      }
    };
  }
  static get elementRef() { return "el"; }
  static get watchers() {
    return [{
        "propName": "mapView",
        "methodName": "watchStateHandler"
      }];
  }
}
//# sourceMappingURL=config-layer-picker.js.map
