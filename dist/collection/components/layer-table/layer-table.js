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
import { getMapLayerView, goToSelection, getMapLayerIds } from "../../utils/mapViewUtils";
import { queryAllFeatures } from "../../utils/queryUtils";
import * as downloadUtils from "../../utils/downloadUtils";
export class LayerTable {
  constructor() {
    /**
     * string[]: List of field names to display
     */
    this._fieldNames = [];
    /**
     * esri/Graphic[]: https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html
     */
    this._graphics = [];
    /**
     * Store a reference to the table node after it's first created
     * and initializes the FeatureTable
     *
     * @returns void
     */
    this.onTableNodeCreate = (node) => {
      this._tableNode = node;
      this._getTable(node);
    };
    this.mapView = undefined;
    this._layerView = undefined;
    this._selectedIndexes = [];
    this._translations = undefined;
  }
  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------
  async mapViewWatchHandler() {
    const mapLayerIds = await getMapLayerIds(this.mapView);
    this._layerView = await getMapLayerView(this.mapView, mapLayerIds[0]);
  }
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
    if (!this._layerView) {
      return null;
    }
    return (h(Host, null, this._getTableControlRow(), h("div", { class: "table-div width-full" }, h("calcite-panel", { class: "height-full width-full" }, h("div", { ref: this.onTableNodeCreate }))), h("edit-record-modal", { ref: (el) => this._editMultipleMpdal = el })));
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
    const [FeatureTable] = await loadModules([
      "esri/widgets/FeatureTable"
    ]);
    this.FeatureTable = FeatureTable;
  }
  /**
   * Gets a row of controls that can be used for various interactions with the table
   *
   * @returns The dom node that contains the controls
   */
  _getTableControlRow() {
    const featuresSelected = this._selectedIndexes.length > 0;
    const multiFeaturesSelected = this._selectedIndexes.length > 1;
    return (h("div", { class: "display-flex table-border" }, h("map-layer-picker", { mapView: this.mapView, onLayerSelectionChange: (evt) => this._layerSelectionChanged(evt) }), h("div", null, h("calcite-button", { appearance: 'transparent', color: 'neutral', disabled: !featuresSelected, iconStart: 'magnifying-glass', onClick: () => this._zoom() }, this._translations.zoom), h("calcite-button", { appearance: 'transparent', color: 'neutral', disabled: !multiFeaturesSelected, iconStart: 'pencil', onClick: () => this._editMultiple() }, this._translations.editMultiple), h("calcite-button", { appearance: 'transparent', color: 'neutral', disabled: !featuresSelected, iconStart: 'trash', onClick: () => this._delete() }, this._translations.delete), h("calcite-split-button", { appearance: "transparent", color: "neutral", "primary-text": this._translations.more }, h("calcite-dropdown-group", { "selection-mode": "none" }, h("calcite-dropdown-item", { iconStart: 'list-check-all', onClick: () => this._selectAll(true) }, this._translations.selectAll), h("calcite-dropdown-item", { iconStart: 'selected-items-filter', onClick: () => this._showSelected() }, this._translations.showSelected), h("calcite-dropdown-item", { iconStart: 'erase', onClick: () => this._clearSelection() }, this._translations.clearSelection), h("calcite-dropdown-item", { iconStart: 'refresh', onClick: () => this._switchSelected() }, this._translations.switchSelected), h("calcite-dropdown-item", { iconStart: 'export', onClick: () => this._exportToCSV() }, this._translations.exportCSV))))));
  }
  /**
   * Initialize the FeatureTable
   *
   * @returns void
   */
  _getTable(node) {
    var _a;
    if ((_a = this._layerView) === null || _a === void 0 ? void 0 : _a.layer) {
      this._table = new this.FeatureTable({
        layer: this._layerView.layer,
        view: this.mapView,
        editingEnabled: true,
        highlightOnRowSelectEnabled: true,
        multiSortEnabled: false,
        visibleElements: {
          header: false,
          menu: false
        },
        container: node
      });
    }
  }
  /**
   * Select or deselect all rows
   *
   * @param checked When true all rows will be selected
   *
   * @returns void
   */
  _selectAll(checked) {
    this._selectedIndexes = checked ? this._graphics.map((_g, i) => i) : [];
  }
  // need to discuss with team
  _showSelected() {
    console.log("_showSelected");
  }
  /**
   * Clears the selected indexes
   *
   * @returns void
   */
  _clearSelection() {
    this._selectedIndexes = [];
  }
  /**
   * Select all rows that are not currently selectd
   *
   * @returns void
   */
  _switchSelected() {
    const currentIndexes = [...this._selectedIndexes];
    this._selectedIndexes = this._graphics.reduce((prev, _cur, i) => {
      if (currentIndexes.indexOf(i) < 0) {
        prev.push(i);
      }
      return prev;
    }, []);
  }
  /**
   * Export all selected rows as CSV
   *
   * @returns a promise that will resolve when the operation is complete
   */
  _exportToCSV() {
    void downloadUtils.downloadCSV([], this._layerView.layer, this._getSelectedIds(), false, // formatUsingLayerPopup
    false, // removeDuplicates
    true);
  }
  /**
   * Zoom to all selected features
   *
   * @returns a promise that will resolve when the operation is complete
   */
  _zoom() {
    const ids = this._getSelectedIds();
    void goToSelection(ids, this._layerView, this.mapView, true);
  }
  /**
   * Open the edit multiple modal
   *
   * @returns void
   */
  _editMultiple() {
    this._editMultipleMpdal.open = true;
  }
  /**
   * Delete all selected records
   *
   * @returns a promise that will resolve when the operation is complete
   */
  _delete() {
    console.log("delete");
  }
  /**
   * Get the graphics for all selected indexes
   *
   * @param indexes the indexes for the graphics to fetch
   *
   * @returns An array of selected graphics
   */
  _getGraphics(indexes) {
    return this._graphics.filter((_g, i) => indexes.indexOf(i) > -1);
  }
  /**
   * Gets the object ids for all selected rows
   *
   * @returns An array of object ids
   */
  _getSelectedIds() {
    const graphics = this._getGraphics(this._selectedIndexes);
    return graphics.map(g => g.getObjectId());
  }
  /**
   * Update the selected indexes based on the current row
   *
   * @param index the index of the selected row
   *
   * @returns void
   */
  _rowSelected(index) {
    const indexOfSelected = this._selectedIndexes.indexOf(index);
    if (indexOfSelected > -1) {
      this._selectedIndexes.splice(indexOfSelected, 1);
      this._selectedIndexes = [...this._selectedIndexes];
    }
    else {
      this._selectedIndexes = [...this._selectedIndexes, index];
    }
  }
  /**
   * Handles layer selection change to show new table
   *
   * @returns a promise that will resolve when the operation is complete
   */
  async _layerSelectionChanged(evt) {
    const layerName = evt.detail[0];
    this._layerView = await getMapLayerView(this.mapView, layerName);
    // TODO rethink this...when we use later we need to be able to lookup with name
    this._fieldNames = this._layerView.layer.fields.map(f => f.alias || f.name);
    this._graphics = await queryAllFeatures(0, this._layerView.layer, []);
    this._selectedIndexes = [];
    this._table.layer = this._layerView.layer;
    this._table.render();
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
  static get is() { return "layer-table"; }
  static get originalStyleUrls() {
    return {
      "$": ["layer-table.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["layer-table.css"]
    };
  }
  static get properties() {
    return {
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
      "_layerView": {},
      "_selectedIndexes": {},
      "_translations": {}
    };
  }
  static get elementRef() { return "el"; }
  static get watchers() {
    return [{
        "propName": "mapView",
        "methodName": "mapViewWatchHandler"
      }];
  }
}
