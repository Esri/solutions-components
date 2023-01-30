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
export class ConfigBufferTools {
  constructor() {
    this.distance = 100;
    this.unit = "Meters";
    this._showBufferChecked = true;
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
   * Returns a key/value pair that represents the checkbox value and checked state
   *
   * @returns Promise with the state of the checkboxes
   */
  async getConfigInfo() {
    return {
      "distance": this.distance,
      "unit": this.unit
    };
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
    await this._getTranslations();
  }
  /**
   * Renders the component.
   */
  render() {
    return (h(Host, null, h("div", null, h("calcite-label", { layout: "inline" }, h("calcite-checkbox", { checked: this._showBufferChecked, onCalciteCheckboxChange: () => this._setShowBufferChecked(), ref: (el) => { this._showBufferElement = el; } }), this._translations.showSearchDistance)), h("div", { class: "padding-inline-start-1" }, h("div", { class: "padding-block-end-1 width-full" }, h("calcite-label", { class: "label-spacing" }, this._translations.defaultBufferDistance, h("calcite-input", { disabled: !this._showBufferChecked, min: 0, "number-button-type": "vertical", onCalciteInputInput: (evt) => { this._distanceChanged(evt); }, type: "number", value: this.distance.toString() }))), h("div", { class: "width-full" }, h("calcite-label", { class: "label-spacing" }, this._translations.defaultUnit, h("calcite-select", { disabled: !this._showBufferChecked, label: this._translations.defaultUnit, onCalciteSelectChange: (evt) => { this._unitSelectionChange(evt); } }, this._renderUnitOptions()))))));
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------
  /**
   * Store the user defined distance
   *
   * @protected
   */
  _distanceChanged(evt) {
    this.distance = evt.detail.value;
  }
  /**
   * Store the user defined unit
   *
   * @protected
   */
  _unitSelectionChange(evt) {
    this.unit = evt.target.value;
  }
  /**
   * Render the various unit options
   *
   * @returns Promise when complete
   * @protected
   */
  _renderUnitOptions() {
    const nlsUnits = this._translations.units || {};
    const units = Object.keys(nlsUnits).map(k => nlsUnits[k]);
    return units.map(unit => {
      return (h("calcite-option", { label: unit, selected: unit === this.unit, value: unit }));
    });
  }
  /**
   * When not checked the buffer options will be disabled in the config and not visible in the UI at runtime
   *
   * @protected
   */
  _setShowBufferChecked() {
    this._showBufferChecked = this._showBufferElement.checked;
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
  static get is() { return "config-buffer-tools"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["config-buffer-tools.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["config-buffer-tools.css"]
    };
  }
  static get properties() {
    return {
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
          "text": "number: Default distance value."
        },
        "attribute": "distance",
        "reflect": true,
        "defaultValue": "100"
      },
      "unit": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "string: Default unit value.\r\nShould be a unit listed in assets/t9n/config-buffer-tools/resources"
        },
        "attribute": "unit",
        "reflect": true,
        "defaultValue": "\"Meters\""
      }
    };
  }
  static get states() {
    return {
      "_showBufferChecked": {},
      "_translations": {}
    };
  }
  static get methods() {
    return {
      "getConfigInfo": {
        "complexType": {
          "signature": "() => Promise<{ [key: string]: string | number; }>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<{ [key: string]: string | number; }>"
        },
        "docs": {
          "text": "Returns a key/value pair that represents the checkbox value and checked state",
          "tags": [{
              "name": "returns",
              "text": "Promise with the state of the checkboxes"
            }]
        }
      }
    };
  }
  static get elementRef() { return "el"; }
}
//# sourceMappingURL=config-buffer-tools.js.map
