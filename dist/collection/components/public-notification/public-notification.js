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
import { EPageType } from "../../utils/interfaces";
import { loadModules } from "../../utils/loadModules";
import { goToSelection, highlightFeatures } from "../../utils/mapViewUtils";
import state from "../../utils/publicNotificationStore";
import { getLocaleComponentStrings } from "../../utils/locale";
import * as utils from "../../utils/publicNotificationUtils";
export class PublicNotification {
  constructor() {
    /**
     * number: The number of selected features
     */
    this._numSelected = 0;
    this.addresseeLayerIds = [];
    this.bufferColor = [227, 139, 79, 0.8];
    this.bufferOutlineColor = [255, 255, 255];
    this.customLabelEnabled = undefined;
    this.defaultBufferDistance = undefined;
    this.defaultBufferUnit = undefined;
    this.featureEffect = undefined;
    this.featureHighlightEnabled = undefined;
    this.mapView = undefined;
    this.noResultText = undefined;
    this.searchConfiguration = undefined;
    this.selectionLayerIds = [];
    this.showSearchSettings = true;
    this.sketchLineSymbol = undefined;
    this.sketchPointSymbol = undefined;
    this.sketchPolygonSymbol = undefined;
    this._addMap = false;
    this._addTitle = false;
    this._downloadActive = true;
    this._exportCSV = false;
    this._exportPDF = true;
    this._pageType = EPageType.LIST;
    this._saveEnabled = false;
    this._selectionSets = [];
    this._translations = undefined;
  }
  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------
  /**
   * Called each time the mapView prop is changed.
   */
  async mapViewWatchHandler(v) {
    if (v === null || v === void 0 ? void 0 : v.popup) {
      this._popupsEnabled = v === null || v === void 0 ? void 0 : v.popup.autoOpenEnabled;
    }
  }
  /**
   * Called each time the searchConfiguration prop is changed.
   *
   * @returns Promise when complete
   */
  async watchSearchConfigurationHandler(newValue, oldValue) {
    const s_newValue = JSON.stringify(newValue);
    if (s_newValue !== JSON.stringify(oldValue)) {
      this._searchConfiguration = JSON.parse(s_newValue);
      this.searchConfigurationChange.emit(this._searchConfiguration);
      // force back to list page before we create Search
      // https://devtopia.esri.com/WebGIS/arcgis-template-configuration/issues/3402
      void this._home();
    }
  }
  /**
   * Called each time the sketchLineSymbol prop is changed.
   */
  async sketchLineSymbolWatchHandler(v, oldV) {
    if (v && JSON.stringify(v) !== JSON.stringify(oldV)) {
      this._setLineSymbol(v);
    }
  }
  /**
   * Called each time the sketchPointSymbol prop is changed.
   */
  async sketchPointSymbolWatchHandler(v, oldV) {
    if (v && JSON.stringify(v) !== JSON.stringify(oldV)) {
      this._setPointSymbol(v);
    }
  }
  /**
   * Called each time the sketchPolygonSymbol prop is changed.
   */
  async sketchPolygonSymbolWatchHandler(v, oldV) {
    if (v && JSON.stringify(v) !== JSON.stringify(oldV)) {
      this._setPolygonSymbol(v);
    }
  }
  /**
   * Called each time the pageType prop is changed.
   */
  async pageTypeWatchHandler(pageType, oldPageType) {
    this._checkPopups();
    this._clearHighlight();
    if (oldPageType === EPageType.SELECT) {
      // clear any draw shapes or buffers
      await this._clearSelection();
    }
    if (pageType !== EPageType.SELECT) {
      return this._highlightFeatures();
    }
  }
  /**
   * Handle changes to the selection sets
   */
  selectionSetsChanged(event) {
    this._selectionSets = [...event.detail];
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
    this._initSymbols();
  }
  /**
   * Renders the component.
   */
  render() {
    return (h(Host, null, h("calcite-shell", null, h("calcite-action-bar", { class: "border-bottom-1 action-bar-size", "expand-disabled": true, layout: "horizontal", slot: "header" }, this._getActionGroup("list-check", EPageType.LIST, this._translations.myLists), this._getActionGroup("export", EPageType.EXPORT, this._translations.export)), this._getPage(this._pageType))));
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
    const [geometryEngine, jsonUtils] = await loadModules([
      "esri/geometry/geometryEngine",
      "esri/symbols/support/jsonUtils"
    ]);
    this._geometryEngine = geometryEngine;
    this._jsonUtils = jsonUtils;
  }
  /**
   * Initialize the default symbols that will be used when creating new graphics
   *
   * @protected
   */
  _initSymbols() {
    this._setLineSymbol(this.sketchLineSymbol);
    this._setPointSymbol(this.sketchPointSymbol);
    this._setPolygonSymbol(this.sketchPolygonSymbol);
  }
  /**
   * Convert a JSON representation of a line symbol and/or set the line symbol
   *
   * @param v SimpleLineSymbol or a JSON representation of a line symbol
   *
   * @protected
   */
  _setLineSymbol(v) {
    const isSymbol = (v === null || v === void 0 ? void 0 : v.type) === 'simple-line';
    this.sketchLineSymbol = isSymbol ? v : this._jsonUtils.fromJSON(v ? v : {
      "type": "esriSLS",
      "color": [130, 130, 130, 255],
      "width": 2,
      "style": "esriSLSSolid"
    });
  }
  /**
   * Convert a JSON representation of a point symbol and/or set the point symbol
   *
   * @param v SimpleMarkerSymbol or a JSON representation of a point symbol
   *
   * @protected
   */
  _setPointSymbol(v) {
    const isSymbol = (v === null || v === void 0 ? void 0 : v.type) === 'simple-marker';
    this.sketchPointSymbol = isSymbol ? v : this._jsonUtils.fromJSON(v ? v : {
      "type": "esriSMS",
      "color": [255, 255, 255, 255],
      "angle": 0,
      "xoffset": 0,
      "yoffset": 0,
      "size": 6,
      "style": "esriSMSCircle",
      "outline": {
        "type": "esriSLS",
        "color": [50, 50, 50, 255],
        "width": 1,
        "style": "esriSLSSolid"
      }
    });
  }
  /**
   * Convert a JSON representation of a polygon symbol and/or set the polygon symbol
   *
   * @param v SimpleFillSymbol or a JSON representation of a polygon symbol
   *
   * @protected
   */
  _setPolygonSymbol(v) {
    const isSymbol = (v === null || v === void 0 ? void 0 : v.type) === 'simple-fill';
    this.sketchPolygonSymbol = isSymbol ? v : this._jsonUtils.fromJSON(v ? v : {
      "type": "esriSFS",
      "color": [150, 150, 150, 51],
      "outline": {
        "type": "esriSLS",
        "color": [50, 50, 50, 255],
        "width": 2,
        "style": "esriSLSSolid"
      },
      "style": "esriSFSSolid"
    });
  }
  /**
   * Get a calcite action group for the current action
   *
   * @param icon the icon to display for the current action
   * @param disabled should the action be disabled
   * @param pageType what page type will the action navigate to
   * @param tip information tip to display helpful details to end user
   *
   * @protected
   */
  _getActionGroup(icon, pageType, tip) {
    return (h("calcite-action-group", { class: "action-center w-1-2", layout: "horizontal" }, h("calcite-action", { active: this._pageType === pageType, alignment: "center", class: "width-full height-full", compact: false, icon: icon, id: icon, onClick: () => { this._setPageType(pageType); }, text: "" }), h("calcite-tooltip", { label: "", placement: "bottom", "reference-element": icon }, h("span", null, tip))));
  }
  /**
   * Navigate to the defined page type
   *
   * @param pageType what page type will the action navigate to
   *
   * @protected
   */
  _setPageType(pageType) {
    this._pageType = pageType;
  }
  /**
   * Navigate to the defined page type
   *
   * @param pageType what page type will the action navigate to
   *
   * @returns the page node
   * @protected
   */
  _getPage(pageType) {
    let page;
    switch (pageType) {
      case EPageType.LIST:
        page = this._getListPage();
        break;
      case EPageType.SELECT:
        page = this._getSelectPage();
        break;
      case EPageType.EXPORT:
        page = this._getExportPage();
        break;
    }
    return page;
  }
  /**
   * Create the List page that shows as the initial home screen
   * This page is also used to show and selection sets that have been created
   *
   * @returns the page node
   * @protected
   */
  _getListPage() {
    const hasSets = this._hasSelections();
    return (h("calcite-panel", null, this._getLabel(this._translations.myLists), this._getNotice(hasSets ? this._translations.listHasSetsTip : this._translations.selectLayerAndAdd, "padding-sides-1 padding-bottom-1"), hasSets ? this._getSelectionSetList() : (null), h("div", { class: "display-flex padding-1" }, h("calcite-button", { onClick: () => { this._setPageType(EPageType.SELECT); }, width: "full" }, this._translations.add))));
  }
  /**
   * Create the selection sets list node for the List page
   *
   * @returns selection sets list node
   * @protected
   */
  _getSelectionSetList() {
    return (h("div", { class: "padding-top-1-2 padding-bottom-1-2" }, h("calcite-list", { class: "list-border margin-sides-1" }, this._selectionSets.reduce((prev, cur, i) => {
      prev.push((h("calcite-list-item", { description: this._translations.selectedFeatures.replace("{{n}}", cur.selectedIds.length.toString()), label: cur.label, onClick: () => this._gotoSelection(cur, this.mapView) }, this._getAction(true, "pencil", "", (evt) => this._openSelection(cur, evt), false, "actions-end"), this._getAction(true, "x", "", (evt) => this._deleteSelection(i, evt), false, "actions-end"))));
      return prev;
    }, []))));
  }
  /**
   * Check if any valid selection sets exist.
   *
   * @returns true if valid selection sets exist
   *
   * @protected
   */
  _hasSelections() {
    return this._selectionSets.length > 0;
  }
  /**
   * Check if any duplicates exist
   *
   * @returns true if duplicates are found
   *
   * @protected
   */
  _hasDuplicates() {
    const selectedIds = this._getSelectedIds();
    return this._getNumDuplicates(selectedIds) > 0;
  }
  /**
   * Return the number of duplicates
   *
   * @param ids the list of currently selected ids
   *
   * @returns the number of duplicates
   *
   * @protected
   */
  _getNumDuplicates(ids) {
    return ids.length - new Set(ids).size;
  }
  /**
   * Get the complete list of selected ids
   *
   * @returns all currently selected IDs
   *
   * @protected
   */
  _getSelectedIds() {
    return this._selectionSets.reduce((prev, cur) => {
      return prev.concat(cur.download ? cur.selectedIds : []);
    }, []);
  }
  /**
   * Create the Select page that shows the selection workflows
   *
   * @returns the page node
   * @protected
   */
  _getSelectPage() {
    const noticeText = this._translations.selectSearchTip;
    return (h("calcite-panel", null, this._getLabel(this._translations.stepTwoFull, true), this._getNotice(noticeText), h("div", { class: "padding-top-1" }, h("map-select-tools", { bufferColor: this.bufferColor, bufferOutlineColor: this.bufferOutlineColor, class: "font-bold", customLabelEnabled: this.customLabelEnabled, defaultBufferDistance: this.defaultBufferDistance, defaultBufferUnit: this.defaultBufferUnit, enabledLayerIds: this.selectionLayerIds, isUpdate: !!this._activeSelection, mapView: this.mapView, noResultText: this.noResultText, onSelectionSetChange: (evt) => this._updateForSelection(evt), ref: (el) => { this._selectTools = el; }, searchConfiguration: this._searchConfiguration, selectionSet: this._activeSelection, sketchLineSymbol: this.sketchLineSymbol, sketchPointSymbol: this.sketchPointSymbol, sketchPolygonSymbol: this.sketchPolygonSymbol })), this._getPageNavButtons(this._translations.done, this._numSelected === 0, () => { void this._saveSelection(); }, this._translations.cancel, false, () => { void this._home(); })));
  }
  /**
   * Create the main download page that has the shared aspects of both PDF and CSV
   * But only show the current PDF or CSV page content
   *
   * @returns the page node
   * @protected
   */
  _getExportPage() {
    const hasSelections = this._hasSelections();
    const numDuplicates = this._getNumDuplicates(this._getSelectedIds());
    return (h("calcite-panel", null, h("div", null, this._getLabel(this._translations.export, true), hasSelections ? (h("div", null, this._getNotice(this._translations.exportTip, "padding-top-sides-1"), this._getLabel(this._translations.myLists), this._getSelectionLists(), h("div", { class: "padding-sides-1" }, h("calcite-label", { layout: "inline" }, h("calcite-checkbox", { ref: (el) => { this._removeDuplicates = el; } }), h("div", { class: "display-flex" }, this._translations.removeDuplicate, h("div", { class: "info-message padding-start-1-2" }, h("calcite-input-message", { class: "info-blue margin-top-0", scale: "m" }, ` ${this._translations.numDuplicates.replace("{{n}}", numDuplicates.toString())}`))))), h("div", { class: "border-bottom" }), this._getPDFOptions(), h("div", { class: "border-bottom" }), this._getCSVOptions(), h("div", { class: "padding-1 display-flex" }, h("calcite-button", { disabled: !this._downloadActive, onClick: () => this._export(), width: "full" }, this._translations.export)))) : (this._getNotice(this._translations.downloadNoLists, "padding-sides-1 padding-bottom-1")))));
  }
  /**
   * Return the PDF portion of the export page
   *
   * @returns the node with all PDF export options
   *
   * @protected
   */
  _getPDFOptions() {
    const pdfOptionsClass = this._exportPDF ? "display-block" : "display-none";
    const titleOptionsClass = this._addTitle ? "display-block" : "display-none";
    const mapOptionsClass = this._addMap ? "display-block" : "display-none";
    return (h("div", null, this._getLabel(this._translations.pdf, true), h("div", { class: "padding-1 display-flex" }, h("calcite-label", { class: "label-margin-0 " }, this._translations.exportPDF), h("calcite-switch", { checked: this._exportPDF, class: "position-right", onCalciteSwitchChange: () => this._exportPDF = !this._exportPDF })), h("div", { class: pdfOptionsClass }, h("div", { class: "padding-sides-1" }, h("calcite-label", { class: "label-margin-0" }, this._translations.selectPDFLabelOption)), h("div", { class: "padding-sides-1" }, h("pdf-download", { disabled: !this._downloadActive, ref: (el) => { this._downloadTools = el; } })), h("div", { class: "padding-top-sides-1" }, h("calcite-label", { layout: "inline" }, h("calcite-checkbox", { checked: this._addMap, onCalciteCheckboxChange: () => this._addMap = !this._addMap }), this._translations.includeMap)), h("div", { class: mapOptionsClass + " padding-bottom-1" }, h("div", { class: "padding-top-sides-1" }, h("calcite-label", { class: "label-margin-0", layout: "inline" }, h("calcite-checkbox", { checked: this._addTitle, onCalciteCheckboxChange: () => this._addTitle = !this._addTitle }), this._translations.addTitle)), h("div", { class: titleOptionsClass }, this._getLabel(this._translations.title, true, ""), h("calcite-input-text", { class: "padding-sides-1", placeholder: this._translations.titlePlaceholder, ref: (el) => { this._title = el; } }))))));
  }
  /**
   * Return the CSV portion of the export page
   *
   * @returns the node with all CSV export options
   *
   * @protected
   */
  _getCSVOptions() {
    return (h("div", null, h("div", { class: "padding-top-sides-1" }, h("calcite-label", { class: "font-bold" }, this._translations.csv)), h("div", { class: "padding-sides-1 display-flex" }, h("calcite-label", null, this._translations.exportCSV), h("calcite-switch", { checked: this._exportCSV, class: "position-right", onCalciteSwitchChange: () => this._exportCSV = !this._exportCSV }))));
  }
  /**
   * Create the stacked navigation buttons for a page
   *
   * @param topLabel the label to use for the button on top
   * @param topDisabled should the button be disabled
   * @param topFunc the fucntion to execute when the button is clicked
   * @param bottomLabel the label to use for the button on bottom
   * @param bottomDisabled should the button be disabled
   * @param bottomFunc the fucntion to execute when the button is clicked
   *
   * @returns the page node
   * @protected
   */
  _getPageNavButtons(topLabel, topDisabled, topFunc, bottomLabel, bottomDisabled, bottomFunc) {
    return (h("div", null, h("div", { class: "display-flex padding-top-sides-1" }, h("calcite-button", { disabled: topDisabled, onClick: topFunc, width: "full" }, topLabel)), h("div", { class: "display-flex padding-top-1-2 padding-sides-1" }, h("calcite-button", { appearance: "outline", disabled: bottomDisabled, onClick: bottomFunc, width: "full" }, bottomLabel))));
  }
  /**
   * Create an informational notice
   *
   * @param message the message to display in the notice
   * @param noticeClass any custom css for the notice (default is "padding-1")
   *
   * @returns the notice node
   * @protected
   */
  _getNotice(message, noticeClass = "padding-1") {
    return (h("calcite-notice", { class: noticeClass, icon: "lightbulb", kind: "success", open: true }, h("div", { slot: "message" }, message)));
  }
  /**
   * Create a calcite label
   *
   * @param label value to display in the label
   * @param disableSpacing should extra calcite defined spacing be applied
   * @param labelClass by default label will be bold unless overridden here
   *
   * @returns the label node
   * @protected
   */
  _getLabel(label, disableSpacing = false, labelClass = "font-bold") {
    labelClass += disableSpacing ? " label-margin-0" : "";
    return (h("div", { class: "padding-top-sides-1" }, h("calcite-label", { class: labelClass }, label)));
  }
  /**
   * Get selection set list node with checkbox for Download pages
   *
   * @returns the list node
   * @protectedlabel
   */
  _getSelectionLists() {
    return this._selectionSets.reduce((prev, cur) => {
      if (!this._downloadActive && cur.download) {
        this._downloadActive = true;
      }
      prev.push((h("div", { class: "display-flex padding-sides-1 padding-bottom-1" }, h("calcite-checkbox", { checked: cur.download, class: "align-center", onClick: () => { void this._toggleDownload(cur.id); } }), h("calcite-list", { class: "list-border margin-start-1-2 width-full", id: "download-list" }, h("calcite-list-item", { description: this._translations.selectedFeatures.replace("{{n}}", cur.selectedIds.length.toString()), disabled: !cur.download, label: cur.label, onClick: () => { void this._toggleDownload(cur.id); } })))));
      return prev;
    }, []) || (h("div", null));
  }
  /**
   * Toggle the disabled state for the download options based on user selection
   *
   * @param id the selection set id to toggle
   *
   * @protected
   */
  async _toggleDownload(id) {
    let isActive = false;
    this._selectionSets = this._selectionSets.map(ss => {
      ss.download = ss.id === id ? !ss.download : ss.download;
      isActive = ss.download ? true : isActive;
      return ss;
    });
    this._downloadActive = isActive;
    await this._highlightFeatures();
  }
  /**
   * Download all selection sets as PDF or CSV or alert the user that they need to choose at least 1 export format
   *
   * @protected
   */
  _export() {
    if (this._exportPDF) {
      this._downloadPDF();
    }
    if (this._exportCSV) {
      this._downloadCSV();
    }
    if (!this._exportPDF && !this._exportCSV) {
      // TODO show a message saying they need to enable at least one of the options
    }
  }
  /**
   * Download all selection sets as PDF
   *
   * @protected
   */
  _downloadPDF() {
    const downloadSets = this._getDownloadSelectionSets();
    const idSets = utils.getSelectionIdsAndViews(downloadSets);
    Object.keys(idSets).forEach(k => {
      const idSet = idSets[k];
      void this._downloadTools.downloadPDF(idSet.layerView, idSet.selectionSetNames, idSet.ids, this._removeDuplicates.checked, this._addMap, this._addTitle, this._title.value);
    });
  }
  /**
   * Download all selection sets as CSV
   *
   * @protected
   */
  _downloadCSV() {
    const downloadSets = this._getDownloadSelectionSets();
    const idSets = utils.getSelectionIdsAndViews(downloadSets);
    Object.keys(idSets).forEach(k => {
      const idSet = idSets[k];
      void this._downloadTools.downloadCSV(idSet.layerView, idSet.selectionSetNames, idSet.ids, this._removeDuplicates.checked);
    });
  }
  /**
   * Get all enabled selection sets
   *
   * @returns the selection sets
   * @protected
   */
  _getDownloadSelectionSets() {
    return this._selectionSets.filter(ss => {
      return ss.download;
    });
  }
  /**
   * Create a calcite action
   *
   * @param enabled controls the enabled state of the control
   * @param icon the image to display in the action
   * @param text and supporting text for the action
   * @param onClick the fucntion the actio will execute
   * @param indicator boolean to control if an indicator should be shown (default is false)
   * @param slot the supporting slot to use
   *
   * @returns the calcite action node
   * @protected
   */
  _getAction(enabled, icon, text, onClick, indicator = false, slot = "") {
    return (h("calcite-action", { disabled: !enabled, icon: icon, indicator: indicator, onClick: onClick, slot: slot, text: text }));
  }
  /**
   * Store the number of selected features and if it's more than one enable save
   *
   * @returns the page node
   * @protected
   */
  _updateForSelection(evt) {
    this._numSelected = evt.detail;
    this._saveEnabled = this._numSelected > 0;
  }
  /**
   * Clear the selection and navigate to the home page
   *
   * @returns Promise when the function has completed
   * @protected
   */
  async _home() {
    await this._clearSelection();
    if (typeof this._popupsEnabled === 'boolean' && this.mapView.popup) {
      this.mapView.popup.autoOpenEnabled = this._popupsEnabled;
    }
    this._setPageType(EPageType.LIST);
  }
  /**
   * Update the selection sets with any new selections from the select tools
   *
   * @returns Promise when the function has completed
   * @protected
   */
  async _saveSelection() {
    var _a, _b;
    const results = await ((_a = this._selectTools) === null || _a === void 0 ? void 0 : _a.getSelection());
    const isUpdate = (_b = this._selectTools) === null || _b === void 0 ? void 0 : _b.isUpdate;
    this._selectionSets = isUpdate ? this._selectionSets.map(ss => {
      return ss.id === results.id ? results : ss;
    }) : [
      ...this._selectionSets,
      results
    ];
    return this._home();
  }
  /**
   * Clear any selections
   *
   * @returns Promise when the function has completed
   * @protected
   */
  async _clearSelection() {
    var _a;
    await ((_a = this._selectTools) === null || _a === void 0 ? void 0 : _a.clearSelection());
    this._numSelected = 0;
    this._activeSelection = undefined;
  }
  /**
   * Delete the selection at the defined index
   *
   * @param index number that defines what selection set to delete
   *
   * @protected
   */
  _deleteSelection(index, evt) {
    evt.stopPropagation();
    this._selectionSets = this._selectionSets.filter((ss, i) => {
      if (i !== index) {
        return ss;
      }
    });
    return this._highlightFeatures();
  }
  /**
   * Pan to the current selection
   *
   * @param selSet ISelectionSet to pan to
   * @param mapView Current MapView to pan within
   *
   * @protected
   */
  _gotoSelection(selSet, mapView) {
    void goToSelection(selSet.selectedIds, selSet.layerView, mapView, this.featureHighlightEnabled, this.featureEffect);
  }
  /**
   * Open the selection set for further adjustment
   *
   * @protected
   */
  _openSelection(selectionSet, evt) {
    evt.stopPropagation();
    this._activeSelection = selectionSet;
    this._pageType = EPageType.SELECT;
  }
  /**
   * Highlight any selected features in the map
   *
   * @protected
   */
  async _highlightFeatures() {
    this._clearHighlight();
    const idSets = utils.getSelectionIdsAndViews(this._selectionSets);
    const idKeys = Object.keys(idSets);
    if (idKeys.length > 0) {
      for (let i = 0; i < idKeys.length; i++) {
        const idSet = idSets[idKeys[i]];
        state.highlightHandles.push(await highlightFeatures(idSet.ids, idSet.layerView, this.mapView));
      }
    }
  }
  /**
   * Clear any highlighted features in the map
   *
   * @protected
   */
  _checkPopups() {
    var _a;
    if (typeof this._popupsEnabled !== 'boolean') {
      this._popupsEnabled = (_a = this.mapView) === null || _a === void 0 ? void 0 : _a.popup.autoOpenEnabled;
    }
  }
  /**
   * Clear any highlighted features in the map
   *
   * @protected
   */
  _clearHighlight() {
    if (state && state.highlightHandles) {
      state.removeHandles();
    }
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
  static get is() { return "public-notification"; }
  static get originalStyleUrls() {
    return {
      "$": ["public-notification.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["public-notification.css"]
    };
  }
  static get properties() {
    return {
      "addresseeLayerIds": {
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
          "text": "string[]: List of layer ids that should be shown as potential addressee layers"
        },
        "defaultValue": "[]"
      },
      "bufferColor": {
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
          "text": "string | number[] |  object with r, g, b, a: https://developers.arcgis.com/javascript/latest/api-reference/esri-Color.html"
        },
        "attribute": "buffer-color",
        "reflect": false,
        "defaultValue": "[227, 139, 79, 0.8]"
      },
      "bufferOutlineColor": {
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
          "text": "string | number[] | object with r, g, b, a: https://developers.arcgis.com/javascript/latest/api-reference/esri-Color.html"
        },
        "attribute": "buffer-outline-color",
        "reflect": false,
        "defaultValue": "[255, 255, 255]"
      },
      "customLabelEnabled": {
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
          "text": "boolean: When true the user can define a name for each notification list"
        },
        "attribute": "custom-label-enabled",
        "reflect": false
      },
      "defaultBufferDistance": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "number: The default value to show for the buffer distance"
        },
        "attribute": "default-buffer-distance",
        "reflect": false
      },
      "defaultBufferUnit": {
        "type": "string",
        "mutable": false,
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
          "text": "number: The default value to show for the buffer unit (\"feet\"|\"meters\"|\"miles\"|\"kilometers\")"
        },
        "attribute": "default-buffer-unit",
        "reflect": false
      },
      "featureEffect": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "__esri.FeatureEffect",
          "resolved": "FeatureEffect",
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
          "text": "The effect that will be applied when featureHighlightEnabled is true\r\n\r\nesri/layers/support/FeatureEffect: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-support-FeatureEffect.html"
        }
      },
      "featureHighlightEnabled": {
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
          "text": "boolean: When enabled features will be highlighted when their notification list item is clicked."
        },
        "attribute": "feature-highlight-enabled",
        "reflect": false
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
      "noResultText": {
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
          "text": "string: The value to show for no results\r\nwhen left empty the default text \"0 selected features from {layerTitle}\" will be shown"
        },
        "attribute": "no-result-text",
        "reflect": false
      },
      "searchConfiguration": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "ISearchConfiguration",
          "resolved": "ISearchConfiguration",
          "references": {
            "ISearchConfiguration": {
              "location": "import",
              "path": "../../utils/interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "ISearchConfiguration: Configuration details for the Search widget"
        }
      },
      "selectionLayerIds": {
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
          "text": "string[]: List of layer ids that should be shown as potential selection layers\r\nwhen skectching with \"Use layer features\" option"
        },
        "defaultValue": "[]"
      },
      "showSearchSettings": {
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
          "text": "boolean: When false no buffer distance or unit controls will be exposed"
        },
        "attribute": "show-search-settings",
        "reflect": false,
        "defaultValue": "true"
      },
      "sketchLineSymbol": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "__esri.SimpleLineSymbol | any",
          "resolved": "any",
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
          "text": "esri/symbols/SimpleLineSymbol | JSON representation : https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleLineSymbol.html\r\n\r\nA JSON representation of the instance in the ArcGIS format.\r\nSee the ArcGIS REST API documentation for examples of the structure of various input JSON objects.\r\nhttps://developers.arcgis.com/documentation/common-data-types/symbol-objects.htm"
        },
        "attribute": "sketch-line-symbol",
        "reflect": false
      },
      "sketchPointSymbol": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "__esri.SimpleMarkerSymbol | any",
          "resolved": "any",
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
          "text": "esri/symbols/SimpleMarkerSymbol | JSON representation: https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleMarkerSymbol.html\r\n\r\nA JSON representation of the instance in the ArcGIS format.\r\nSee the ArcGIS REST API documentation for examples of the structure of various input JSON objects.\r\nhttps://developers.arcgis.com/documentation/common-data-types/symbol-objects.htm"
        },
        "attribute": "sketch-point-symbol",
        "reflect": false
      },
      "sketchPolygonSymbol": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "__esri.SimpleFillSymbol | any",
          "resolved": "any",
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
          "text": "esri/symbols/SimpleFillSymbol | JSON representation: https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleFillSymbol.html\r\n\r\nA JSON representation of the instance in the ArcGIS format.\r\nSee the ArcGIS REST API documentation for examples of the structure of various input JSON objects.\r\nhttps://developers.arcgis.com/documentation/common-data-types/symbol-objects.htm"
        },
        "attribute": "sketch-polygon-symbol",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "_addMap": {},
      "_addTitle": {},
      "_downloadActive": {},
      "_exportCSV": {},
      "_exportPDF": {},
      "_pageType": {},
      "_saveEnabled": {},
      "_selectionSets": {},
      "_translations": {}
    };
  }
  static get events() {
    return [{
        "method": "searchConfigurationChange",
        "name": "searchConfigurationChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted on demand when searchConfiguration gets a new value"
        },
        "complexType": {
          "original": "ISearchConfiguration",
          "resolved": "ISearchConfiguration",
          "references": {
            "ISearchConfiguration": {
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
        "propName": "mapView",
        "methodName": "mapViewWatchHandler"
      }, {
        "propName": "searchConfiguration",
        "methodName": "watchSearchConfigurationHandler"
      }, {
        "propName": "sketchLineSymbol",
        "methodName": "sketchLineSymbolWatchHandler"
      }, {
        "propName": "sketchPointSymbol",
        "methodName": "sketchPointSymbolWatchHandler"
      }, {
        "propName": "sketchPolygonSymbol",
        "methodName": "sketchPolygonSymbolWatchHandler"
      }, {
        "propName": "_pageType",
        "methodName": "pageTypeWatchHandler"
      }];
  }
  static get listeners() {
    return [{
        "name": "selectionSetsChanged",
        "method": "selectionSetsChanged",
        "target": "window",
        "capture": false,
        "passive": false
      }];
  }
}
