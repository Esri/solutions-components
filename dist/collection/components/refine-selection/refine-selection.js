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
import { ERefineMode, ESelectionMode, EWorkflowType } from "../../utils/interfaces";
import * as utils from "../../utils/publicNotificationUtils";
import { getLocaleComponentStrings } from "../../utils/locale";
export class RefineSelection {
  constructor() {
    //--------------------------------------------------------------------------
    //
    //  Properties (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * boolean: Indicates if any new graphics should be added or removed
     */
    this._addEnabled = true;
    this.addresseeLayer = undefined;
    this.enabledLayerIds = [];
    this.mapView = undefined;
    this.selectionSets = [];
    this.GraphicsLayer = undefined;
    this.SketchViewModel = undefined;
    this._translations = undefined;
  }
  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------
  /**
   * Called each time the addresseeLayer is changed.
   * Add a new clean refine set for the new addressee layer.
   */
  addresseeLayerWatchHandler() {
    const selectionSets = this.selectionSets.filter(ss => ss.workflowType !== EWorkflowType.REFINE);
    this.selectionSets = this._initRefineSelectionSet(selectionSets);
  }
  /**
   * Handles changes to refine selection ids.
   *
   */
  refineSelectionIdsChange(event) {
    var _a, _b;
    const addIds = ((_a = event.detail) === null || _a === void 0 ? void 0 : _a.addIds) || [];
    const removeIds = ((_b = event.detail) === null || _b === void 0 ? void 0 : _b.removeIds) || [];
    this._updateSelectionSets(removeIds);
    this._updateRefineSelectionSet(addIds, removeIds);
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
    const refineSet = this._getRefineSelectionSet(this.selectionSets);
    if (!refineSet) {
      this.selectionSets = this._initRefineSelectionSet(this.selectionSets);
    }
  }
  /**
   * Renders the component.
   */
  render() {
    return (h(Host, null, h("div", { class: "padding-1" }, h("div", null, h("calcite-radio-group", { class: "w-100", onCalciteRadioGroupChange: (evt) => this._modeChanged(evt) }, h("calcite-radio-group-item", { checked: this._addEnabled, class: "w-50", onClick: () => this._setSelectionMode(ESelectionMode.ADD), value: ESelectionMode.ADD }, this._translations.add), h("calcite-radio-group-item", { checked: !this._addEnabled, class: "w-50", onClick: () => this._setSelectionMode(ESelectionMode.REMOVE), value: ESelectionMode.REMOVE }, this._translations.remove)), h("refine-selection-tools", { border: true, enabledLayerIds: this.enabledLayerIds, ids: utils.getSelectionIds(this.selectionSets), layerViews: [this.addresseeLayer], mapView: this.mapView, mode: this._addEnabled ? ESelectionMode.ADD : ESelectionMode.REMOVE, ref: (el) => { this._refineTools = el; }, refineMode: ERefineMode.ALL, refineSelectionSet: this._getRefineSelectionSet(this.selectionSets), useLayerPicker: false })), h("br", null), (h("calcite-list", { class: "list-border" }, this._getRefineSelectionSetList())))));
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------
  /**
   * Store the Add/Remove mode
   *
   * @protected
   */
  _modeChanged(evt) {
    this._addEnabled = evt.detail === ESelectionMode.ADD;
  }
  /**
   * Set the refine tools selection mode
   *
   * @protected
   */
  _setSelectionMode(mode) {
    this._refineTools.mode = mode;
  }
  /**
   * Create a list to show the number added/removed/total unique selected
   *
   * @returns the list node
   * @protected
   */
  _getRefineSelectionSetList() {
    const total = utils.getTotal(this.selectionSets);
    const refineSet = this._getRefineSelectionSet(this.selectionSets);
    const numAdded = (refineSet === null || refineSet === void 0 ? void 0 : refineSet.refineIds.addIds.length) || 0;
    const numRemoved = (refineSet === null || refineSet === void 0 ? void 0 : refineSet.refineIds.removeIds.length) || 0;
    return [(h("calcite-list-item", { label: this._translations.featuresAdded.replace("{{n}}", numAdded.toString()) })), (h("calcite-list-item", { label: this._translations.featuresRemoved.replace("{{n}}", numRemoved.toString()) })), (h("calcite-list-item", { label: this._translations.totalSelected.replace("{{n}}", total.toString()) }))];
  }
  /**
   * Fetch the refine selection set
   *
   * @returns the refine selection set
   * @protected
   */
  _getRefineSelectionSet(selectionSets) {
    let refineSelectionSet;
    selectionSets.some(ss => {
      if (ss.workflowType === EWorkflowType.REFINE) {
        refineSelectionSet = ss;
        return true;
      }
    });
    return refineSelectionSet;
  }
  /**
   * Remove ids from existing selection sets.
   * Remove any selection sets than have no selected ids
   * This can update any selection set not just the refine set.
   * We do not do something similar for adds as we will only ever add from refine tools to the single REFINE selection set.
   *
   * @param removeIds the ids to remove
   *
   * @protected
   */
  _updateSelectionSets(removeIds) {
    if (removeIds.length > 0) {
      this.selectionSets = this.selectionSets.reduce((prev, cur) => {
        cur.selectedIds = cur.selectedIds.filter(id => removeIds.indexOf(id) < 0);
        if (cur.selectedIds.length > 0 || cur.workflowType === EWorkflowType.REFINE) {
          prev.push(cur);
        }
        return prev;
      }, []);
      this.selectionSetsChanged.emit(this.selectionSets);
    }
  }
  /**
   * Update the refine selection set with any adds or removes
   *
   * @param addIds any ids to add
   * @param removeIds any ids to remove
   *
   * @returns Promise resolving when function is done
   * @protected
   */
  _updateRefineSelectionSet(addIds, removeIds) {
    const selectionSet = this._getRefineSelectionSet(this.selectionSets);
    this._updateRefineIds(selectionSet, addIds, removeIds);
    this.selectionSetsChanged.emit(this.selectionSets);
  }
  /**
   * Update the ids stored for the refine selection set
   *
   * @param selectionSet the refine selection set
   * @param addIds any ids to add
   * @param removeIds any ids to remove
   *
   * @returns updated selection sets
   * @protected
   */
  _updateRefineIds(selectionSet, addIds, removeIds) {
    // remove ids if they exist in the current add or remove list
    selectionSet.refineIds.addIds = selectionSet.refineIds.addIds.filter(id => removeIds.indexOf(id) < 0);
    selectionSet.refineIds.removeIds = selectionSet.refineIds.removeIds.filter(id => addIds.indexOf(id) < 0);
    const _addIds = [...new Set(selectionSet.refineIds.addIds.concat(addIds))];
    const _removeIds = [...new Set(selectionSet.refineIds.removeIds.concat(removeIds))];
    selectionSet.refineIds = {
      addIds: _addIds.filter(id => _removeIds.indexOf(id) < 0),
      removeIds: _removeIds.filter(id => _addIds.indexOf(id) < 0)
    };
    selectionSet.selectedIds = selectionSet.refineIds.addIds.length > 0 ?
      [...new Set(selectionSet.selectedIds.concat(selectionSet.refineIds.addIds))] :
      selectionSet.selectedIds.filter(id => selectionSet.refineIds.removeIds.indexOf(id) < 0);
    return this.selectionSets.map(ss => {
      return ss.workflowType === EWorkflowType.REFINE ? selectionSet : ss;
    });
  }
  /**
   * Add a new refine selection set
   *
   * @returns updated selection sets
   * @protected
   */
  _initRefineSelectionSet(selectionSets) {
    return [
      ...selectionSets,
      ({
        buffer: undefined,
        distance: 0,
        download: true,
        geometries: [],
        id: Date.now(),
        label: "Refine",
        layerView: this.addresseeLayer,
        refineSelectLayers: [],
        searchResult: undefined,
        selectedIds: [],
        unit: "feet",
        workflowType: EWorkflowType.REFINE,
        refineIds: {
          addIds: [],
          removeIds: []
        },
        redoStack: [],
        undoStack: []
      })
    ];
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
  /** Provides access to protected methods for unit testing.
 *
 *  @param methodName Name of protected method to run
 *  @param arg1 First argument to forward to method, e.g., for "_modeChanged", `ESelectionMode`
 *  @returns
 */
  _testAccess(methodName, arg1) {
    switch (methodName) {
      case "_modeChanged":
        return this._modeChanged(arg1);
      case "_setSelectionMode":
        return this._setSelectionMode(arg1);
      // case "_getRefineSelectionSetList":
      //   return this._getRefineSelectionSetList();
      // case "_getRefineSelectionSet":
      //   return this._getRefineSelectionSet(arg1);
      // case "_updateSelectionSets":
      //   return this._updateSelectionSets(arg1);
      // case "_updateRefineSelectionSet":
      //   return this._updateRefineSelectionSet(arg1, arg2);
      // case "_updateRefineIds":
      //   return this._updateRefineIds(arg1, arg2, arg3);
      // case "_addRefineSelectionSet":
      //   return this._addRefineSelectionSet(arg1, arg2);
    }
    return null;
  }
  static get is() { return "refine-selection"; }
  static get originalStyleUrls() {
    return {
      "$": ["refine-selection.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["refine-selection.css"]
    };
  }
  static get properties() {
    return {
      "addresseeLayer": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "__esri.FeatureLayerView",
          "resolved": "FeatureLayerView",
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
          "text": "esri/views/layers/FeatureLayerView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html"
        }
      },
      "enabledLayerIds": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "string[]",
          "resolved": "string[]",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "string[]: Optional list of enabled layer ids\r\n If empty all layers will be available"
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
      "selectionSets": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "ISelectionSet[]",
          "resolved": "ISelectionSet[]",
          "references": {
            "ISelectionSet": {
              "location": "import",
              "path": "../../utils/interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "utils/interfaces/ISelectionSet: An array of user defined selection sets"
        },
        "defaultValue": "[]"
      },
      "GraphicsLayer": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "graphics-layer",
        "reflect": false
      },
      "SketchViewModel": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "sketch-view-model",
        "reflect": false
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
        "method": "selectionSetsChanged",
        "name": "selectionSetsChanged",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted on demand when selection sets change."
        },
        "complexType": {
          "original": "ISelectionSet[]",
          "resolved": "ISelectionSet[]",
          "references": {
            "ISelectionSet": {
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
        "propName": "addresseeLayer",
        "methodName": "addresseeLayerWatchHandler"
      }];
  }
  static get listeners() {
    return [{
        "name": "refineSelectionIdsChange",
        "method": "refineSelectionIdsChange",
        "target": "window",
        "capture": false,
        "passive": false
      }];
  }
}
