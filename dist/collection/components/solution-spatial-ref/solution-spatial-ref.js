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
import { h, Host } from '@stencil/core';
import '@esri/calcite-components';
import { wkids } from './spatialreferences';
import state from "../../utils/solution-store";
import { nodeListToArray } from '../../utils/common';
import { getLocaleComponentStrings } from '../../utils/locale';
export class SolutionSpatialRef {
  valueChanged(newValue) {
    this.spatialRef = this._createSpatialRefDisplay(newValue);
    this._updateStore();
    const searchBox = document.getElementById("calcite-sr-search");
    if (searchBox) {
      searchBox.value = this._srSearchText = "";
    }
    this._clearSelection();
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  constructor() {
    this.defaultWkid = 102100;
    this.locked = true;
    this.value = this.defaultWkid.toString();
    this.services = [];
    this.loaded = false;
    this.spatialRef = undefined;
    this._srSearchText = undefined;
    this._translations = undefined;
    this.spatialRef = this._createSpatialRefDisplay(this.value);
    this.locked = typeof this.value === "undefined";
  }
  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   */
  componentWillLoad() {
    return this._getTranslations();
  }
  /**
   * Renders the component.
   */
  render() {
    return (h(Host, null, h("div", { class: "spatial-ref-desc" }, h("calcite-label", null, this._translations.paramDescription)), h("label", { class: "switch-label" }, h("calcite-switch", { checked: !this.locked, class: "spatial-ref-switch", onCalciteSwitchChange: (event) => this._updateLocked(event), scale: "m" }), this._translations.specifyParam), h("div", { class: "spatial-ref-switch-title", id: "spatialRefDefn" }, h("calcite-label", null, this._translations.spatialReferenceInfo, h("label", { class: "spatial-ref-default" }, h("calcite-input", { disabled: this.locked, id: "calcite-sr-search", onCalciteInputInput: (evt) => this._searchSpatialReferences(evt), onKeyDown: (evt) => this._inputKeyDown(evt), placeholder: this._translations.spatialReferencePlaceholder }))), h("div", { class: this.locked ? 'disabled-div' : '' }, h("calcite-tree", { id: "calcite-sr-tree", slot: "children" }, this._getTreeContent())), this._getFeatureServices(this.services))));
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods (async)
  //
  //--------------------------------------------------------------------------
  /**
   * Returns the spatial reference description of the supplied value.
   * (Exposes protected method `_createSpatialRefDisplay` for testing.)
   *
   * @param value WKID or WKT or null for default
   * @returns If component is using a WKID, description using WKID; otherwise, the WKT; defaults to 102100
   */
  async createSpatialRefDisplay(value) {
    return this._createSpatialRefDisplay(value);
  }
  /**
   * Returns the current spatial reference description.
   * (Exposes protected variable `spatialRef` for testing.)
   */
  async getSpatialRef() {
    return this.spatialRef;
  }
  /**
   * Converts a WKID into a spatial reference description.
   * (Exposes protected method `_wkidToDisplay` for testing.)
   *
   * @param wkid WKID to look up
   * @returns Description, or "WKID &lt;wkid&gt;" if a description doesn't exist for the WKID
   */
  async wkidToDisplay(wkid) {
    return this._wkidToDisplay(wkid);
  }
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  /**
   * Returns the spatial reference description of the supplied value.
   *
   * @param value WKID or WKT or null for default
   * @returns If component is using a WKID, description using WKID; otherwise, the WKT; defaults to 102100
   */
  _createSpatialRefDisplay(value) {
    let spatialRef;
    if (!value) {
      spatialRef = {
        display: this._wkidToDisplay(this.defaultWkid),
        usingWkid: true,
        wkid: this.defaultWkid,
        wkt: ""
      };
    }
    else {
      const wkid = Number.parseInt(value);
      spatialRef = isNaN(wkid) ? {
        display: value,
        usingWkid: false,
        wkid: 0,
        wkt: value
      } : {
        display: this._wkidToDisplay(wkid),
        usingWkid: true,
        wkid: wkid,
        wkt: ""
      };
    }
    return spatialRef;
  }
  /**
   * Toggles the ability to set the default spatial reference.
   */
  _updateLocked(event) {
    this.locked = !event.detail.switched;
    this._updateStore();
    if (!this.loaded) {
      // when this is switched on when loading we have reloaded a solution that
      // has a custom wkid param and we should honor the settings they already have in the templates
      if (event.detail.switched) {
        // By default enable all Feature Services on first load
        this._setFeatureServiceDefaults(this.services);
      }
      this.loaded = true;
    }
  }
  ;
  /**
   * Enable spatial reference variable for all feature services.
   *
   * @param services list of service names
   */
  _setFeatureServiceDefaults(services) {
    // switch all spatial-ref-item-switch
    const fsNodes = nodeListToArray(this.el.getElementsByClassName("spatial-ref-item-switch"));
    fsNodes.forEach((node) => node.checked = true);
    services.forEach(name => this._updateEnabledServices({ detail: { switched: true } }, name));
  }
  /**
   * Stores the wkid as the components value.
   */
  _setSpatialRef(wkid) {
    if (this.value !== wkid) {
      this.value = wkid;
    }
  }
  /**
   * Converts a WKID into a spatial reference description.
   *
   * @param wkid WKID to look up
   * @returns Description, or "WKID &lt;wkid&gt;" if a description doesn't exist for the WKID
   */
  _wkidToDisplay(wkid) {
    const description = wkids[wkid];
    return description ? description.label + " (" + wkid.toString() + ")" : "WKID " + wkid.toString();
  }
  /**
   * Create a switch control for each of the services
   *
   * @param services List of feature services
   * @returns a node to control each feature service
   */
  _getFeatureServices(services) {
    // verify they are in state
    const spatialReferenceInfo = state.getStoreInfo("spatialReferenceInfo");
    const _services = services.filter(s => {
      return Object.keys(spatialReferenceInfo.services).some(stateService => stateService === s);
    });
    return _services && _services.length > 0 ? (h("div", null, h("label", { class: "spatial-ref-item-title" }, this._translations.featureServicesHeading), _services.map(name => (h("label", { class: "switch-label" }, h("calcite-switch", { checked: spatialReferenceInfo.services[name], class: "spatial-ref-item-switch", disabled: this.locked, onCalciteSwitchChange: (event) => this._updateEnabledServices(event, name), scale: "m" }), name))))) : (null);
  }
  /**
   * Updates the enabled and spatialReference prop in spatialReferenceInfo.
   */
  _updateStore() {
    const spatialReferenceInfo = state.getStoreInfo("spatialReferenceInfo");
    spatialReferenceInfo.enabled = !this.locked;
    spatialReferenceInfo.spatialReference = this.spatialRef.wkid;
    state.setStoreInfo("spatialReferenceInfo", spatialReferenceInfo);
  }
  /**
   * Updates the enabled/disabled state of the service in spatialReferenceInfo.
   */
  _updateEnabledServices(event, name) {
    const spatialReferenceInfo = state.getStoreInfo("spatialReferenceInfo");
    spatialReferenceInfo.services[name] = event.detail.switched;
    state.setStoreInfo("spatialReferenceInfo", spatialReferenceInfo);
    this.featureServiceSpatialReferenceChange.emit({
      name,
      enabled: event.detail.switched
    });
  }
  /**
   * Select the first child on Enter key click
   * OR
   * Clear any selection while user is entering values and use the default wkid
   *
   * @param event The keyboard event
   */
  _inputKeyDown(event) {
    var _a;
    if (event.key === "Enter") {
      this._selectFirstChild(true);
    }
    else {
      if (((_a = this._srSearchText) === null || _a === void 0 ? void 0 : _a.length) > 1) {
        this._clearSelection();
        this._setSpatialRef(this.defaultWkid.toString());
      }
    }
  }
  /**
   * Clear any selected items in the elements tree.
   *
   */
  _clearSelection() {
    const selectedItems = nodeListToArray(this.el.querySelectorAll("calcite-tree-item[selected]"));
    selectedItems.forEach((treeItem) => {
      treeItem.selected = false;
    });
  }
  /**
   * Select the first child from the tree.
   *
   * @param autoFocus Boolean to indicate if focus should also be shifted to the first child.
   *
   */
  _selectFirstChild(autoFocus) {
    const wkidContainer = document.getElementById("solution-wkid-container");
    if (wkidContainer && wkidContainer.firstChild) {
      const firstChild = wkidContainer.firstChild;
      firstChild.selected = true;
      this._setSpatialRef(firstChild.id);
      if (autoFocus) {
        firstChild.focus();
      }
    }
  }
  /**
   * Set the search text State and cause render.
   *
   * @param event the event to get the value from
   *
   */
  _searchSpatialReferences(event) {
    this._srSearchText = event.detail.value;
  }
  /**
   * Get the tree items for the current spatial reference search
   *
   */
  _getTreeContent() {
    const id = "solution-wkid-container";
    const containerClass = "spatial-ref-container";
    if (this._srSearchText && this._srSearchText !== "" && this._srSearchText.length > 1) {
      const regEx = new RegExp(`${this._srSearchText}`, 'gi');
      const matches = Object.keys(wkids).filter(wkid => {
        return regEx.test(wkid.toString()) || regEx.test(wkids[wkid].label);
      });
      return matches.length > 0 ? (h("div", { class: containerClass, id: id }, matches.map((wkid) => this._getTreeItem(wkid, false)))) : (null);
    }
    else {
      return (h("div", { class: containerClass, id: id }, this._getTreeItem(this.value.toString(), true)));
    }
  }
  /**
   * Get the individual spatial reference tree item
   *
   * @param wkid The wkid for the spatial reference that will be displayed.
   * @param selected Should the item be selected by default.
   *
   */
  _getTreeItem(wkid, selected) {
    return (h("calcite-tree-item", { "aria-selected": selected, id: wkid, onClick: () => this._setSpatialRef(wkid), selected: selected }, h("div", null, `${wkids[wkid].label} (${wkid})`)));
  }
  /**
   * Fetches the component's translations
   *
   * @protected
   */
  async _getTranslations() {
    const translations = await getLocaleComponentStrings(this.el);
    this._translations = translations[0];
  }
  static get is() { return "solution-spatial-ref"; }
  static get originalStyleUrls() {
    return {
      "$": ["solution-spatial-ref.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["solution-spatial-ref.css"]
    };
  }
  static get properties() {
    return {
      "defaultWkid": {
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
          "text": "The wkid that will be used as the default when no user selection has been made."
        },
        "attribute": "default-wkid",
        "reflect": true,
        "defaultValue": "102100"
      },
      "locked": {
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
          "text": "When true, all but the main switch are disabled to prevent interaction."
        },
        "attribute": "locked",
        "reflect": true,
        "defaultValue": "true"
      },
      "value": {
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
          "text": "Contains the public value for this component, which is a wkid or a wkt."
        },
        "attribute": "value",
        "reflect": true,
        "defaultValue": "this.defaultWkid.toString()"
      },
      "services": {
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
          "text": "List of service names the spatial reference should apply to"
        },
        "defaultValue": "[]"
      }
    };
  }
  static get states() {
    return {
      "loaded": {},
      "spatialRef": {},
      "_srSearchText": {},
      "_translations": {}
    };
  }
  static get events() {
    return [{
        "method": "featureServiceSpatialReferenceChange",
        "name": "featureServiceSpatialReferenceChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "{ name: string, enabled: boolean }",
          "resolved": "{ name: string; enabled: boolean; }",
          "references": {}
        }
      }];
  }
  static get methods() {
    return {
      "createSpatialRefDisplay": {
        "complexType": {
          "signature": "(value: string) => Promise<ISpatialRefRepresentation>",
          "parameters": [{
              "tags": [{
                  "name": "param",
                  "text": "value WKID or WKT or null for default"
                }],
              "text": "WKID or WKT or null for default"
            }],
          "references": {
            "Promise": {
              "location": "global"
            },
            "ISpatialRefRepresentation": {
              "location": "import",
              "path": "../../utils/interfaces"
            }
          },
          "return": "Promise<ISpatialRefRepresentation>"
        },
        "docs": {
          "text": "Returns the spatial reference description of the supplied value.\r\n(Exposes protected method `_createSpatialRefDisplay` for testing.)",
          "tags": [{
              "name": "param",
              "text": "value WKID or WKT or null for default"
            }, {
              "name": "returns",
              "text": "If component is using a WKID, description using WKID; otherwise, the WKT; defaults to 102100"
            }]
        }
      },
      "getSpatialRef": {
        "complexType": {
          "signature": "() => Promise<ISpatialRefRepresentation>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            },
            "ISpatialRefRepresentation": {
              "location": "import",
              "path": "../../utils/interfaces"
            }
          },
          "return": "Promise<ISpatialRefRepresentation>"
        },
        "docs": {
          "text": "Returns the current spatial reference description.\r\n(Exposes protected variable `spatialRef` for testing.)",
          "tags": []
        }
      },
      "wkidToDisplay": {
        "complexType": {
          "signature": "(wkid: number) => Promise<string>",
          "parameters": [{
              "tags": [{
                  "name": "param",
                  "text": "wkid WKID to look up"
                }],
              "text": "WKID to look up"
            }],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<string>"
        },
        "docs": {
          "text": "Converts a WKID into a spatial reference description.\r\n(Exposes protected method `_wkidToDisplay` for testing.)",
          "tags": [{
              "name": "param",
              "text": "wkid WKID to look up"
            }, {
              "name": "returns",
              "text": "Description, or \"WKID &lt;wkid&gt;\" if a description doesn't exist for the WKID"
            }]
        }
      }
    };
  }
  static get elementRef() { return "el"; }
  static get watchers() {
    return [{
        "propName": "value",
        "methodName": "valueChanged"
      }];
  }
}
