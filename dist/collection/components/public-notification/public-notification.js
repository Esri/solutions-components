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
import { EExportType, EPageType, ESketchType, EWorkflowType } from "../../utils/interfaces";
import { loadModules } from "../../utils/loadModules";
import { goToSelection, getMapLayerView, highlightFeatures } from "../../utils/mapViewUtils";
import { getSelectionSetQuery } from "../../utils/queryUtils";
import state from "../../utils/publicNotificationStore";
import { getLocaleComponentStrings } from "../../utils/locale";
import * as utils from "../../utils/publicNotificationUtils";
export class PublicNotification {
  constructor() {
    this.addresseeLayer = undefined;
    this.mapView = undefined;
    this.showRefineSelection = false;
    this._downloadActive = true;
    this._numSelected = 0;
    this._pageType = EPageType.LIST;
    this._saveEnabled = false;
    this._selectionSets = [];
    this._sketchType = ESketchType.INTERACTIVE;
    this._selectionWorkflowType = EWorkflowType.SEARCH;
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
   * Called each time the selectionSets prop is changed.
   */
  async selectionSetsWatchHandler(v, oldV) {
    if (v && v !== oldV && v.length > 0) {
      const nonRefineSets = v.filter(ss => ss.workflowType !== EWorkflowType.REFINE);
      if (nonRefineSets.length === 0) {
        this._selectionSets = [];
      }
    }
  }
  /**
   * Called each time the pageType prop is changed.
   */
  async pageTypeWatchHandler(pageType, oldPageType) {
    this._checkPopups();
    this._clearHighlight();
    if (oldPageType === EPageType.SELECT || oldPageType === EPageType.REFINE) {
      // clear any draw shapes or buffers
      await this._clearSelection();
    }
    if (pageType !== EPageType.SELECT) {
      return this._highlightFeatures();
    }
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
  /**
   * Handle changes to the selection sets
   */
  selectionSetsChanged(event) {
    this._selectionSets = [...event.detail];
  }
  /**
   * Handle changes to the selection sets
   */
  sketchTypeChange(event) {
    this._sketchType = event.detail;
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
   * Renders the component.
   */
  render() {
    const hasSelections = this._selectionSets.length > 0;
    return (h(Host, null, h("calcite-shell", null, h("calcite-action-bar", { class: "border-bottom-1 action-bar-size", "expand-disabled": true, layout: "horizontal", slot: "header" }, this._getActionGroup("list-check", false, EPageType.LIST, this._translations.myLists), this.showRefineSelection ? this._getActionGroup("test-data", !hasSelections, EPageType.REFINE, this._translations.refineSelection) : undefined, this._getActionGroup("file-pdf", !hasSelections, EPageType.PDF, this._translations.downloadPDF), this._getActionGroup("file-csv", !hasSelections, EPageType.CSV, this._translations.downloadCSV)), this._getPage(this._pageType))));
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
   * Get a calcite action group for the current action
   *
   * @param icon the icon to display for the current action
   * @param disabled should the action be disabled
   * @param pageType what page type will the action navigate to
   * @param tip information tip to display helpful details to end user
   *
   * @protected
   */
  _getActionGroup(icon, disabled, pageType, tip) {
    const groupClass = this.showRefineSelection ? "action-center w-1-4" : "action-center w-1-3";
    return (h("calcite-action-group", { class: groupClass, layout: "horizontal" }, h("calcite-action", { active: this._pageType === pageType, alignment: "center", class: "width-full height-full", compact: false, disabled: disabled, icon: icon, id: icon, onClick: () => { this._setPageType(pageType); }, text: "" }), h("calcite-tooltip", { label: "", placement: "bottom", "reference-element": icon }, h("span", null, tip))));
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
      case EPageType.REFINE:
        page = this._getRefinePage();
        break;
      case EPageType.PDF:
        page = this._getPDFPage();
        break;
      case EPageType.CSV:
        page = this._getCSVPage();
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
    var _a, _b;
    const hasSets = this._selectionSets.filter(ss => ss.workflowType !== EWorkflowType.REFINE).length > 0;
    const total = utils.getTotal(this._selectionSets);
    return hasSets ? (h("calcite-panel", null, h("div", { class: "padding-top-sides-1" }, h("calcite-label", { class: "font-bold" }, this._translations.myLists)), this._getNotice(this._translations.listHasSetsTip, "padding-sides-1 padding-bottom-1"), h("div", { class: "display-flex padding-sides-1" }, h("calcite-label", { class: "font-bold width-full" }, this._translations.addresseeLayer, h("map-layer-picker", { mapView: this.mapView, onLayerSelectionChange: (evt) => this._layerSelectionChange(evt), selectedLayers: this.addresseeLayer ? [(_a = this.addresseeLayer) === null || _a === void 0 ? void 0 : _a.layer.title] : [], selectionMode: "single" }))), h("div", { class: "padding-sides-1 height-1-1-2" }, h("div", { class: "position-left" }, h("calcite-label", { alignment: "start", class: "font-bold" }, this._translations.notifications)), h("div", { class: "position-right" }, h("calcite-input-message", { active: true, class: "info-blue margin-top-0", scale: "m" }, this._translations.uniqueCout.replace("{{n}}", total.toString())))), hasSets ? this._getSelectionSetList() : (h("div", { class: "info-message" }, h("calcite-input-message", { active: true, class: "info-blue", scale: "m" }, this._translations.noNotifications))), h("div", { class: "display-flex padding-1" }, h("calcite-button", { onClick: () => { this._setPageType(EPageType.SELECT); }, width: "full" }, this._translations.add)))) : (h("calcite-panel", null, h("div", { class: "padding-top-sides-1" }, h("calcite-label", { class: "font-bold" }, this._translations.myLists)), h("div", { class: "padding-sides-1" }, h("calcite-label", null, this._translations.notifications)), h("div", { class: "info-message padding-bottom-1" }, h("calcite-input-message", { active: true, class: "info-blue", scale: "m" }, this._translations.noNotifications)), this._getNotice(this._translations.selectLayerAndAdd, "padding-sides-1 padding-bottom-1"), h("div", { class: "display-flex padding-sides-1" }, h("calcite-label", { class: "font-bold width-full" }, this._translations.addresseeLayer, h("map-layer-picker", { mapView: this.mapView, onLayerSelectionChange: (evt) => this._layerSelectionChange(evt), selectedLayers: this.addresseeLayer ? [(_b = this.addresseeLayer) === null || _b === void 0 ? void 0 : _b.layer.title] : [], selectionMode: "single" }))), h("div", { class: "display-flex padding-1" }, h("calcite-button", { onClick: () => { this._setPageType(EPageType.SELECT); }, width: "full" }, this._translations.add))));
  }
  /**
   * Create the selection sets list node for the List page
   *
   * @returns selection sets list node
   * @protected
   */
  _getSelectionSetList() {
    return (h("calcite-list", { class: "list-border margin-sides-1" }, 
    // REFINE is handled seperately from the core selection sets
    // You can only access after clicking the refine action
    this._selectionSets.reduce((prev, cur, i) => {
      if (cur.workflowType !== EWorkflowType.REFINE) {
        prev.push((h("calcite-list-item", { description: this._translations.selectedFeatures.replace("{{n}}", cur.selectedIds.length.toString()), label: cur.label, onClick: () => this._gotoSelection(cur, this.mapView) }, this._getAction(true, "pencil", "", (evt) => this._openSelection(cur, evt), false, "actions-end"), this._getAction(true, "x", "", (evt) => this._deleteSelection(i, evt), false, "actions-end"))));
      }
      return prev;
    }, [])));
  }
  /**
   * Create the Select page that shows the selection workflows
   *
   * @returns the page node
   * @protected
   */
  _getSelectPage() {
    var _a, _b;
    // const searchTip = `${this._translations.selectSearchTip} ${this._translations.optionalSearchDistance}`;
    const searchTip = this._translations.selectSearchTip;
    // const selectTip = `${this._translations.selectLayerTip} ${this._translations.optionalSearchDistance}`;
    const selectTip = this._translations.selectLayerTip;
    // const sketchTip = this._sketchType === ESketchType.INTERACTIVE ?
    //   `${this._translations.selectSketchTip} ${this._translations.optionalSearchDistance}` :
    //   `${this._translations.selectLayerTip} ${this._translations.optionalSearchDistance}`;
    const sketchTip = this._sketchType === ESketchType.INTERACTIVE ?
      this._translations.selectSketchTip :
      this._translations.selectLayerTip;
    const noticeText = this._selectionWorkflowType === EWorkflowType.SELECT ? selectTip :
      this._selectionWorkflowType === EWorkflowType.SKETCH ? sketchTip : searchTip;
    return (h("calcite-panel", null, this._getLabel(this._translations.stepTwoFull.replace("{{layer}}", (_a = this.addresseeLayer) === null || _a === void 0 ? void 0 : _a.layer.title)), this._getNotice(noticeText), h("div", { class: "padding-1" }, h("map-select-tools", { class: "font-bold", isUpdate: !!this._activeSelection, mapView: this.mapView, onSelectionSetChange: (evt) => this._updateForSelection(evt), onWorkflowTypeChange: (evt) => this._updateForWorkflowType(evt), ref: (el) => { this._selectTools = el; }, selectLayerView: this.addresseeLayer, selectionSet: this._activeSelection })), h("div", { class: "padding-sides-1 padding-bottom-1", style: { "align-items": "end", "display": "flex" } }, h("calcite-icon", { class: "info-blue padding-end-1-2", icon: "feature-layer", scale: "s" }), h("calcite-input-message", { active: true, class: "info-blue", scale: "m" }, this._translations.selectedAddresses.replace("{{n}}", this._numSelected.toString()).replace("{{layer}}", ((_b = this.addresseeLayer) === null || _b === void 0 ? void 0 : _b.layer.title) || ""))), this._getPageNavButtons(this._translations.done, this._numSelected === 0, () => { void this._saveSelection(); }, this._translations.cancel, false, () => { void this._home(); })));
  }
  /**
   * Create the Refine page that users can interactively add/remove features from existing selection sets
   *
   * @returns the page node
   * @protected
   */
  _getRefinePage() {
    return (h("calcite-panel", null, this._getLabel(this._translations.refineSelection), this._getNotice(this._translations.refineTip, "padding-sides-1"), h("refine-selection", { addresseeLayer: this.addresseeLayer, mapView: this.mapView, selectionSets: this._selectionSets })));
  }
  /**
   * Create the PDF download page that shows the download options
   *
   * @returns the page node
   * @protected
   */
  _getPDFPage() {
    return this._getDownloadPage(EExportType.PDF);
  }
  /**
   * Create the CSV download page that shows the download options
   *
   * @returns the page node
   * @protected
   */
  _getCSVPage() {
    return this._getDownloadPage(EExportType.CSV);
  }
  /**
   * Create the main download page that has the shared aspects of both PDF and CSV
   * But only show the current PDF or CSV page content
   *
   * @param type EExportType of the current type expected
   *
   * @returns the page node
   * @protected
   */
  _getDownloadPage(type) {
    const isPdf = type === EExportType.PDF;
    return (h("calcite-panel", null, h("div", null, h("div", { class: "padding-top-sides-1" }, h("calcite-label", { class: "font-bold" }, isPdf ? this._translations.pdfDownloads : this._translations.csvDownloads), h("calcite-label", null, this._translations.notifications)), this._getSelectionLists(), h("div", { class: "margin-side-1 padding-top-1 border-bottom" }), h("div", { class: "padding-top-sides-1" }, h("calcite-label", { layout: "inline" }, h("calcite-checkbox", { disabled: !this._downloadActive, ref: (el) => { this._removeDuplicates = el; } }), this._translations.removeDuplicate)), h("div", { class: isPdf ? "" : "display-none" }, this._getLabel(this._translations.selectPDFLabelOption, false), h("div", { class: "padding-sides-1" }, h("pdf-download", { disabled: !this._downloadActive, layerView: this.addresseeLayer, ref: (el) => { this._downloadTools = el; } }))), h("div", { class: "padding-1 display-flex" }, h("calcite-button", { disabled: !this._downloadActive, onClick: isPdf ? () => this._downloadPDF() : () => this._downloadCSV(), width: "full" }, isPdf ? this._translations.downloadPDF : this._translations.downloadCSV)))));
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
    return (h("calcite-notice", { class: noticeClass, color: "green", icon: "lightbulb", open: true }, h("div", { slot: "message" }, message)));
  }
  /**
   * Create a calcite label
   *
   * @param label value to display in the label
   * @param disableSpacing should extra calcite defined spacing be applied
   *
   * @returns the label node
   * @protected
   */
  _getLabel(label, disableSpacing = false) {
    return (h("div", { class: "padding-top-sides-1" }, h("calcite-label", { class: "font-bold", "disable-spacing": disableSpacing }, label)));
  }
  /**
   * Get selection set list node with checkbox for Download pages
   *
   * @returns the list node
   * @protected
   */
  _getSelectionLists() {
    return this._selectionSets.reduce((prev, cur) => {
      if (cur.workflowType !== EWorkflowType.REFINE) {
        if (!this._downloadActive && cur.download) {
          this._downloadActive = true;
        }
        prev.push((h("div", { class: "display-flex padding-sides-1 padding-bottom-1" }, h("calcite-checkbox", { checked: cur.download, onClick: () => { void this._toggleDownload(cur.id); } }), h("calcite-list", { class: "list-border margin-start-1-2 w-100", id: "download-list" }, h("calcite-list-item", { description: this._translations.selectedFeatures.replace("{{n}}", cur.selectedIds.length.toString()), disabled: !cur.download, label: cur.label, onClick: () => { void this._toggleDownload(cur.id); } })))));
      }
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
   * Download all selection sets as PDF
   *
   * @protected
   */
  _downloadPDF() {
    const ids = utils.getSelectionIds(this._getDownloadSelectionSets());
    void this._downloadTools.downloadPDF(ids, this._removeDuplicates.checked);
  }
  /**
   * Download all selection sets as CSV
   *
   * @protected
   */
  _downloadCSV() {
    const ids = utils.getSelectionIds(this._getDownloadSelectionSets());
    void this._downloadTools.downloadCSV(ids, this._removeDuplicates.checked);
  }
  /**
   * Get all enabled selection sets
   *
   * @returns the selection sets
   * @protected
   */
  _getDownloadSelectionSets() {
    return this._selectionSets.filter(ss => {
      return ss.download || ss.workflowType === EWorkflowType.REFINE;
    });
  }
  /**
   * Store the current workflow type
   *
   * @protected
   */
  _updateForWorkflowType(evt) {
    this._selectionWorkflowType = evt.detail;
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
   * Fetch the layer defined in the selection change event
   *
   * @returns Promise when the function has completed
   * @protected
   */
  async _layerSelectionChange(evt) {
    var _a, _b;
    const title = ((_a = evt === null || evt === void 0 ? void 0 : evt.detail) === null || _a === void 0 ? void 0 : _a.length) > 0 ? evt.detail[0] : "";
    if (title !== ((_b = this.addresseeLayer) === null || _b === void 0 ? void 0 : _b.layer.title)) {
      this.addresseeLayer = await getMapLayerView(this.mapView, title);
      await this._updateSelectionSets(this.addresseeLayer);
    }
  }
  /**
   * Update selection sets when the addressee layer changes.
   * Will remove any "refine" selection set.
   * Will use stored search, select, and sketch geometries and any buffers to select from the new addressee layer.
   *
   * @param layerView The new addressee layer view to select from
   *
   * @returns Promise when the function has completed
   * @protected
   */
  async _updateSelectionSets(layerView) {
    const _selectionSets = this._selectionSets.filter(selectionSet => selectionSet.workflowType !== EWorkflowType.REFINE);
    const oidDefs = [];
    _selectionSets.forEach(selectionSet => {
      selectionSet.layerView = layerView;
      selectionSet.selectedIds = [];
      oidDefs.push(getSelectionSetQuery(selectionSet, this._geometryEngine));
    });
    return Promise.all(oidDefs).then(async (results) => {
      results.forEach((result, i) => {
        _selectionSets[i].selectedIds = result;
      });
      await this._highlightFeatures();
      this._selectionSets = [
        ..._selectionSets
      ];
    });
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
    void goToSelection(selSet.selectedIds, selSet.layerView, mapView);
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
    const ids = utils.getSelectionIds(this._selectionSets);
    if (ids.length > 0) {
      state.highlightHandle = await highlightFeatures(ids, this.addresseeLayer, this.mapView);
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
    var _a;
    if (state && state.highlightHandle) {
      (_a = state.highlightHandle) === null || _a === void 0 ? void 0 : _a.remove();
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
      "showRefineSelection": {
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
          "text": "boolean: When true the refine selection workflow will be included in the UI"
        },
        "attribute": "show-refine-selection",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "_downloadActive": {},
      "_numSelected": {},
      "_pageType": {},
      "_saveEnabled": {},
      "_selectionSets": {},
      "_sketchType": {},
      "_selectionWorkflowType": {},
      "_translations": {}
    };
  }
  static get elementRef() { return "el"; }
  static get watchers() {
    return [{
        "propName": "mapView",
        "methodName": "mapViewWatchHandler"
      }, {
        "propName": "_selectionSets",
        "methodName": "selectionSetsWatchHandler"
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
      }, {
        "name": "sketchTypeChange",
        "method": "sketchTypeChange",
        "target": "window",
        "capture": false,
        "passive": false
      }];
  }
}
