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
export class BufferTools {
  constructor() {
    this.appearance = "text";
    this.distance = 0;
    this.geometries = [];
    this.sliderMax = 100;
    this.sliderMin = 0;
    this.sliderTicks = 10;
    this.unionResults = true;
    this.unit = "meters";
    this._translations = undefined;
  }
  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------
  /**
   * Called each time the geometries prop is changed.
   * Buffer each of the geometries.
   *
   */
  geometriesWatchHandler(v, oldV) {
    if (v && JSON.stringify(v) !== JSON.stringify(oldV)) {
      this._buffer();
    }
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
   * Renders the component.
   */
  render() {
    return (h(Host, null, this.appearance === "text" ? this._getTextBoxDisplay() : this._getSliderDisplay()));
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
    const [geometryEngine] = await loadModules([
      "esri/geometry/geometryEngine"
    ]);
    this._geometryEngine = geometryEngine;
  }
  /**
   * Gets the nodes for each of the possible distance units
   *
   * @returns An array of option nodes
   *
   * @protected
   */
  _getUnits() {
    const units = {
      "feet": this._translations.feet,
      "meters": this._translations.meters,
      "miles": this._translations.miles,
      "kilometers": this._translations.kilometers
    };
    return Object.keys(units).map(u => {
      return (h("calcite-option", { label: units[u], selected: this.unit === u, value: u }));
    });
  }
  /**
   * Store the user defined distance value and create a buffer
   *
   * @param event the event from the calcite input control
   *
   * @protected
   */
  _setDistance(event) {
    this.distance = event.detail.value;
    if (this.distance > 0) {
      this._buffer();
    }
    else {
      this.bufferComplete.emit(undefined);
    }
  }
  /**
   * Store the user defined unit value and create a buffer
   *
   * @protected
   */
  _setUnit(unit) {
    this.unit = unit;
    this._buffer();
  }
  /**
   * Create buffer geometry based on the user defined unit and distance
   *
   * @protected
   */
  _buffer() {
    if (this._bufferTimeout) {
      clearTimeout(this._bufferTimeout);
    }
    this._bufferTimeout = setTimeout(() => {
      var _a;
      // needs to be wgs 84 or Web Mercator
      if (((_a = this.geometries) === null || _a === void 0 ? void 0 : _a.length) > 0 && this.unit && this.distance > 0) {
        const buffer = this._geometryEngine.geodesicBuffer(this.geometries, this.distance, this.unit, this.unionResults);
        this.bufferComplete.emit(buffer);
      }
    }, 400);
  }
  /**
   * Render distance and unit as calcite input and select controls
   * This option will be used when the "appearance" prop is set to "text"
   *
   * @returns a node with the supporting controls
   *
   * @protected
   */
  _getTextBoxDisplay() {
    return (h("div", { class: "c-container" }, h("calcite-input", { class: "padding-end-1", "number-button-type": "vertical", onCalciteInputInput: (evt) => this._setDistance(evt), placeholder: "0", type: "number", value: this.distance ? this.distance.toString() : undefined }), h("calcite-select", { class: "flex-1", label: "label", onCalciteSelectChange: () => this._setUnit(this._unitElement.value), ref: (el) => { this._unitElement = el; } }, this._getUnits())));
  }
  /**
   * Render distance control as a slider
   * This option will be used when the "appearance" prop is set to "slider"
   *
   * @returns a node with the supporting control
   *
   * @protected
   */
  _getSliderDisplay() {
    return (h("div", null, h("calcite-slider", { labelHandles: true, max: this.sliderMax, min: this.sliderMin, ticks: this.sliderTicks })));
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
  /** Provides access to protected methods for unit testing.
  *
  *  @param methodName Name of protected method to run
  *  @param arg1 First argument to forward to method, e.g., for "_setDistance", `CustomEvent`
  *  @returns
  */
  _testAccess(methodName, arg1) {
    switch (methodName) {
      case "_setUnit":
        return this._setUnit(arg1);
      case "_setDistance":
        return this._setDistance(arg1);
    }
    return null;
  }
  static get is() { return "buffer-tools"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["buffer-tools.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["buffer-tools.css"]
    };
  }
  static get properties() {
    return {
      "appearance": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "\"slider\" | \"text\"",
          "resolved": "\"slider\" | \"text\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "string: The appearance of display. Can be a \"slider\" or \"text\" inputs for distance/value"
        },
        "attribute": "appearance",
        "reflect": false,
        "defaultValue": "\"text\""
      },
      "distance": {
        "type": "number",
        "mutable": true,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "number: The distance used for buffer"
        },
        "attribute": "distance",
        "reflect": false,
        "defaultValue": "0"
      },
      "geometries": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "__esri.Geometry[]",
          "resolved": "Geometry[]",
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
          "text": "esri/geometry/Geometry: https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-Geometry.html"
        },
        "defaultValue": "[]"
      },
      "sliderMax": {
        "type": "number",
        "mutable": true,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "number: The component's maximum selectable value."
        },
        "attribute": "slider-max",
        "reflect": false,
        "defaultValue": "100"
      },
      "sliderMin": {
        "type": "number",
        "mutable": true,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "number: The component's minimum selectable value."
        },
        "attribute": "slider-min",
        "reflect": false,
        "defaultValue": "0"
      },
      "sliderTicks": {
        "type": "number",
        "mutable": true,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "number: Displays tick marks on the number line at a specified interval."
        },
        "attribute": "slider-ticks",
        "reflect": false,
        "defaultValue": "10"
      },
      "unionResults": {
        "type": "boolean",
        "mutable": true,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "boolean: option to control if buffer results should be unioned"
        },
        "attribute": "union-results",
        "reflect": false,
        "defaultValue": "true"
      },
      "unit": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "DistanceUnit",
          "resolved": "\"feet\" | \"kilometers\" | \"meters\" | \"miles\"",
          "references": {
            "DistanceUnit": {
              "location": "import",
              "path": "../../utils/interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "DistanceUnit: \"feet\"|\"meters\"|\"miles\"|\"kilometers\""
        },
        "attribute": "unit",
        "reflect": false,
        "defaultValue": "\"meters\""
      }
    };
  }
  static get states() {
    return {
      "_translations": {}
    };
  }
  static get events() {
    return [{
        "method": "bufferComplete",
        "name": "bufferComplete",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted on demand when a buffer is generated."
        },
        "complexType": {
          "original": "__esri.Polygon | __esri.Polygon[]",
          "resolved": "Polygon | Polygon[]",
          "references": {
            "___esri": {
              "location": "global"
            }
          }
        }
      }];
  }
  static get elementRef() { return "el"; }
  static get watchers() {
    return [{
        "propName": "geometries",
        "methodName": "geometriesWatchHandler"
      }];
  }
}
//# sourceMappingURL=buffer-tools.js.map
