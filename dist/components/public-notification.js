/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { a as EExportType, b as EPageType } from './interfaces.js';
import { l as loadModules } from './loadModules.js';
import { g as goToSelection, h as highlightFeatures, d as defineCustomElement$4 } from './map-layer-picker2.js';
import { s as state } from './publicNotificationStore.js';
import { g as getLocaleComponentStrings } from './locale.js';
import { d as defineCustomElement$C } from './buffer-tools2.js';
import { d as defineCustomElement$B } from './action.js';
import { d as defineCustomElement$A } from './action-bar.js';
import { d as defineCustomElement$z } from './action-group.js';
import { d as defineCustomElement$y } from './action-menu.js';
import { d as defineCustomElement$x } from './button.js';
import { d as defineCustomElement$w } from './checkbox.js';
import { d as defineCustomElement$v } from './chip.js';
import { d as defineCustomElement$u } from './combobox.js';
import { d as defineCustomElement$t } from './combobox-item.js';
import { d as defineCustomElement$s } from './filter.js';
import { d as defineCustomElement$r } from './graph.js';
import { d as defineCustomElement$q } from './icon.js';
import { d as defineCustomElement$p } from './input.js';
import { d as defineCustomElement$o } from './input-message.js';
import { d as defineCustomElement$n } from './input-text.js';
import { d as defineCustomElement$m } from './label.js';
import { d as defineCustomElement$l } from './list.js';
import { d as defineCustomElement$k } from './list-item2.js';
import { d as defineCustomElement$j } from './loader.js';
import { d as defineCustomElement$i } from './notice.js';
import { d as defineCustomElement$h } from './option.js';
import { d as defineCustomElement$g } from './panel.js';
import { d as defineCustomElement$f } from './popover.js';
import { d as defineCustomElement$e } from './progress.js';
import { d as defineCustomElement$d } from './scrim.js';
import { d as defineCustomElement$c } from './segmented-control.js';
import { d as defineCustomElement$b } from './segmented-control-item.js';
import { d as defineCustomElement$a } from './select.js';
import { d as defineCustomElement$9 } from './shell.js';
import { d as defineCustomElement$8 } from './slider.js';
import { d as defineCustomElement$7 } from './switch.js';
import { d as defineCustomElement$6 } from './tooltip.js';
import { d as defineCustomElement$5 } from './map-draw-tools2.js';
import { d as defineCustomElement$3 } from './map-select-tools2.js';
import { d as defineCustomElement$2 } from './pdf-download2.js';

const publicNotificationCss = ":host{display:block;--calcite-input-message-spacing-value:0}.align-center{align-items:center}.border-bottom-1{border-width:0px;border-bottom-width:1px;border-style:solid;border-color:var(--calcite-ui-border-3)}.action-bar-size{height:3.5rem;width:100%}.w-1-2{width:50%}.action-center{-webkit-box-align:center;-webkit-align-items:center;-ms-grid-row-align:center;align-items:center;align-content:center;justify-content:center}.width-full{width:100%}.height-full{height:100%}.padding-1{padding:1rem}.padding-top-sides-1{-webkit-padding-before:1rem;padding-block-start:1rem;-webkit-padding-start:1rem;padding-inline-start:1rem;-webkit-padding-end:1rem;padding-inline-end:1rem}.padding-sides-1{-webkit-padding-start:1rem;padding-inline-start:1rem;-webkit-padding-end:1rem;padding-inline-end:1rem}.padding-end-1-2{-webkit-padding-end:.5rem;padding-inline-end:.5rem}.padding-top-1-2{-webkit-padding-before:.5rem;padding-block-start:.5rem}.padding-top-1{padding-top:1rem}.padding-bottom-1{padding-bottom:1rem}.padding-bottom-1-2{padding-bottom:.5rem}.info-blue{color:#00A0FF}.info-message{justify-content:center;display:grid}.font-bold{font-weight:bold}.display-flex{display:flex}.display-block{display:block}.display-none{display:none}.border-bottom{border-bottom:1px solid var(--calcite-ui-border-2)}.padding-start-1-2{-webkit-padding-start:0.5rem;padding-inline-start:0.5rem}.list-border{border:1px solid var(--calcite-ui-border-2)}.margin-sides-1{-webkit-margin-start:1rem;margin-inline-start:1rem;-webkit-margin-end:1rem;margin-inline-end:1rem}.margin-start-1-2{-webkit-margin-start:0.5rem;margin-inline-start:0.5rem}.float-right{float:right}.float-right[dir=\"rtl\"]{float:left}.float-left{float:left}.float-left[dir=\"rtl\"]{float:right}.margin-top-0{-webkit-margin-before:0 !important;margin-block-start:0 !important}.height-1-1-2{height:1.5rem}.main-background{background-color:var(--calcite-ui-foreground-2)}.position-right{position:absolute;right:1rem}.position-right[dir=\"rtl\"]{position:absolute;left:1rem}.label-margin-0{--calcite-label-margin-bottom:0}";

const PublicNotification$1 = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.searchConfigurationChange = createEvent(this, "searchConfigurationChange", 7);
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
    this._exportType = EExportType.PDF;
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
    return (h("calcite-panel", null, h("div", null, this._getLabel(this._translations.export, true), hasSelections ? (h("div", null, this._getNotice(this._translations.exportTip, "padding-top-sides-1"), this._getLabel(this._translations.myLists), this._getSelectionLists(), h("div", { class: "padding-sides-1" }, h("calcite-label", { layout: "inline" }, h("calcite-checkbox", { ref: (el) => { this._removeDuplicates = el; } }), h("div", { class: "display-flex" }, this._translations.removeDuplicate, h("div", { class: "info-message padding-start-1-2" }, h("calcite-input-message", { class: "info-blue margin-top-0", scale: "m" }, ` ${this._translations.numDuplicates.replace("{{n}}", numDuplicates.toString())}`))))), h("div", { class: "border-bottom" }), h("div", { class: "padding-top-sides-1" }, h("calcite-segmented-control", { class: "w-100", onCalciteSegmentedControlChange: (evt) => this._exportTypeChange(evt) }, h("calcite-segmented-control-item", { checked: this._exportType === EExportType.PDF, class: "w-50 end-border", value: EExportType.PDF }, this._translations.pdf), h("calcite-segmented-control-item", { checked: this._exportType === EExportType.CSV, class: "w-50", value: EExportType.CSV }, this._translations.csv))), h("div", { class: "padding-bottom-1" }, this._getExportOptions()), h("div", { class: "padding-1 display-flex" }, h("calcite-button", { disabled: !this._downloadActive, onClick: () => void this._export(), width: "full" }, this._translations.export)))) : (this._getNotice(this._translations.downloadNoLists, "padding-sides-1 padding-bottom-1")))));
  }
  _exportTypeChange(evt) {
    this._exportType = evt.target.value;
  }
  _getExportOptions() {
    const displayClass = this._exportType === EExportType.PDF ? "display-block" : "display-none";
    const titleOptionsClass = this._addTitle ? "display-block" : "display-none";
    const mapOptionsClass = this._addMap ? "display-block" : "display-none";
    return (h("div", { class: displayClass }, this._getLabel(this._translations.pdfOptions, true), h("div", { class: "padding-top-sides-1" }, h("calcite-label", { class: "label-margin-0" }, this._translations.selectPDFLabelOption)), h("div", { class: "padding-sides-1" }, h("pdf-download", { disabled: !this._downloadActive, ref: (el) => { this._downloadTools = el; } })), h("div", { class: "padding-top-sides-1" }, h("calcite-label", { class: "label-margin-0", layout: "inline" }, h("calcite-checkbox", { checked: this._addMap, onCalciteCheckboxChange: () => this._addMap = !this._addMap }), this._translations.includeMap)), h("div", { class: mapOptionsClass }, h("div", { class: "padding-top-sides-1" }, h("calcite-label", { class: "label-margin-0", layout: "inline" }, h("calcite-checkbox", { checked: this._addTitle, onCalciteCheckboxChange: () => this._addTitle = !this._addTitle }), this._translations.addTitle)), h("div", { class: titleOptionsClass }, this._getLabel(this._translations.title, true, ""), h("calcite-input-text", { class: "padding-sides-1", placeholder: this._translations.titlePlaceholder, ref: (el) => { this._title = el; } })))));
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
  async _export() {
    const exportInfos = this._getSelectionIdsAndViews(this._selectionSets, true);
    if (this._exportType === EExportType.PDF) {
      // Generate a map screenshot
      let initialImageDataUrl = "";
      if (this._addMap && this.mapView) {
        const screenshot = await this.mapView.takeScreenshot({ width: 1500, height: 2000 });
        initialImageDataUrl = screenshot === null || screenshot === void 0 ? void 0 : screenshot.dataUrl;
      }
      // Create the labels for each selection set
      void this._downloadTools.downloadPDF(exportInfos, this._removeDuplicates.checked, this._addTitle ? this._title.value : "", initialImageDataUrl);
    }
    if (this._exportType === EExportType.CSV) {
      void this._downloadTools.downloadCSV(exportInfos, this._removeDuplicates.checked);
    }
  }
  /**
  * Sort selection sets by layer and retain key export details
  *
  * @param selectionSets selection sets to evaluate
  *
  * @returns key export details from the selection sets
  * @protected
  */
  _getSelectionIdsAndViews(selectionSets, downloadSetsOnly = false) {
    const exportSelectionSets = downloadSetsOnly ?
      selectionSets.filter(ss => ss.download) : selectionSets;
    return exportSelectionSets.reduce((prev, cur) => {
      if (Object.keys(prev).indexOf(cur.layerView.layer.id) > -1) {
        prev[cur.layerView.layer.id].ids = [
          ...prev[cur.layerView.layer.id].ids,
          ...cur.selectedIds
        ];
        prev[cur.layerView.layer.id].selectionSetNames.push(cur.label);
      }
      else {
        prev[cur.layerView.layer.id] = {
          ids: cur.selectedIds,
          layerView: cur.layerView,
          selectionSetNames: [cur.label]
        };
      }
      return prev;
    }, {});
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
    const idSets = this._getSelectionIdsAndViews(this._selectionSets);
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
  get el() { return this; }
  static get watchers() { return {
    "mapView": ["mapViewWatchHandler"],
    "searchConfiguration": ["watchSearchConfigurationHandler"],
    "sketchLineSymbol": ["sketchLineSymbolWatchHandler"],
    "sketchPointSymbol": ["sketchPointSymbolWatchHandler"],
    "sketchPolygonSymbol": ["sketchPolygonSymbolWatchHandler"],
    "_pageType": ["pageTypeWatchHandler"]
  }; }
  static get style() { return publicNotificationCss; }
}, [0, "public-notification", {
    "addresseeLayerIds": [16],
    "bufferColor": [8, "buffer-color"],
    "bufferOutlineColor": [8, "buffer-outline-color"],
    "customLabelEnabled": [4, "custom-label-enabled"],
    "defaultBufferDistance": [2, "default-buffer-distance"],
    "defaultBufferUnit": [1, "default-buffer-unit"],
    "featureEffect": [16],
    "featureHighlightEnabled": [4, "feature-highlight-enabled"],
    "mapView": [16],
    "noResultText": [1, "no-result-text"],
    "searchConfiguration": [1040],
    "selectionLayerIds": [16],
    "showSearchSettings": [4, "show-search-settings"],
    "sketchLineSymbol": [8, "sketch-line-symbol"],
    "sketchPointSymbol": [8, "sketch-point-symbol"],
    "sketchPolygonSymbol": [8, "sketch-polygon-symbol"],
    "_addMap": [32],
    "_addTitle": [32],
    "_downloadActive": [32],
    "_exportType": [32],
    "_pageType": [32],
    "_saveEnabled": [32],
    "_selectionSets": [32],
    "_translations": [32]
  }, [[8, "selectionSetsChanged", "selectionSetsChanged"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["public-notification", "buffer-tools", "calcite-action", "calcite-action-bar", "calcite-action-group", "calcite-action-menu", "calcite-button", "calcite-checkbox", "calcite-chip", "calcite-combobox", "calcite-combobox-item", "calcite-filter", "calcite-graph", "calcite-icon", "calcite-input", "calcite-input-message", "calcite-input-text", "calcite-label", "calcite-list", "calcite-list-item", "calcite-loader", "calcite-notice", "calcite-option", "calcite-panel", "calcite-popover", "calcite-progress", "calcite-scrim", "calcite-segmented-control", "calcite-segmented-control-item", "calcite-select", "calcite-shell", "calcite-slider", "calcite-switch", "calcite-tooltip", "map-draw-tools", "map-layer-picker", "map-select-tools", "pdf-download"];
  components.forEach(tagName => { switch (tagName) {
    case "public-notification":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, PublicNotification$1);
      }
      break;
    case "buffer-tools":
      if (!customElements.get(tagName)) {
        defineCustomElement$C();
      }
      break;
    case "calcite-action":
      if (!customElements.get(tagName)) {
        defineCustomElement$B();
      }
      break;
    case "calcite-action-bar":
      if (!customElements.get(tagName)) {
        defineCustomElement$A();
      }
      break;
    case "calcite-action-group":
      if (!customElements.get(tagName)) {
        defineCustomElement$z();
      }
      break;
    case "calcite-action-menu":
      if (!customElements.get(tagName)) {
        defineCustomElement$y();
      }
      break;
    case "calcite-button":
      if (!customElements.get(tagName)) {
        defineCustomElement$x();
      }
      break;
    case "calcite-checkbox":
      if (!customElements.get(tagName)) {
        defineCustomElement$w();
      }
      break;
    case "calcite-chip":
      if (!customElements.get(tagName)) {
        defineCustomElement$v();
      }
      break;
    case "calcite-combobox":
      if (!customElements.get(tagName)) {
        defineCustomElement$u();
      }
      break;
    case "calcite-combobox-item":
      if (!customElements.get(tagName)) {
        defineCustomElement$t();
      }
      break;
    case "calcite-filter":
      if (!customElements.get(tagName)) {
        defineCustomElement$s();
      }
      break;
    case "calcite-graph":
      if (!customElements.get(tagName)) {
        defineCustomElement$r();
      }
      break;
    case "calcite-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$q();
      }
      break;
    case "calcite-input":
      if (!customElements.get(tagName)) {
        defineCustomElement$p();
      }
      break;
    case "calcite-input-message":
      if (!customElements.get(tagName)) {
        defineCustomElement$o();
      }
      break;
    case "calcite-input-text":
      if (!customElements.get(tagName)) {
        defineCustomElement$n();
      }
      break;
    case "calcite-label":
      if (!customElements.get(tagName)) {
        defineCustomElement$m();
      }
      break;
    case "calcite-list":
      if (!customElements.get(tagName)) {
        defineCustomElement$l();
      }
      break;
    case "calcite-list-item":
      if (!customElements.get(tagName)) {
        defineCustomElement$k();
      }
      break;
    case "calcite-loader":
      if (!customElements.get(tagName)) {
        defineCustomElement$j();
      }
      break;
    case "calcite-notice":
      if (!customElements.get(tagName)) {
        defineCustomElement$i();
      }
      break;
    case "calcite-option":
      if (!customElements.get(tagName)) {
        defineCustomElement$h();
      }
      break;
    case "calcite-panel":
      if (!customElements.get(tagName)) {
        defineCustomElement$g();
      }
      break;
    case "calcite-popover":
      if (!customElements.get(tagName)) {
        defineCustomElement$f();
      }
      break;
    case "calcite-progress":
      if (!customElements.get(tagName)) {
        defineCustomElement$e();
      }
      break;
    case "calcite-scrim":
      if (!customElements.get(tagName)) {
        defineCustomElement$d();
      }
      break;
    case "calcite-segmented-control":
      if (!customElements.get(tagName)) {
        defineCustomElement$c();
      }
      break;
    case "calcite-segmented-control-item":
      if (!customElements.get(tagName)) {
        defineCustomElement$b();
      }
      break;
    case "calcite-select":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "calcite-shell":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "calcite-slider":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "calcite-switch":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "calcite-tooltip":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "map-draw-tools":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "map-layer-picker":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "map-select-tools":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "pdf-download":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}
defineCustomElement$1();

const PublicNotification = PublicNotification$1;
const defineCustomElement = defineCustomElement$1;

export { PublicNotification, defineCustomElement };
