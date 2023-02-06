/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-c6979cbb.js');
const interfaces = require('./interfaces-772edf61.js');
const loadModules = require('./loadModules-0eda12cd.js');
const mapViewUtils = require('./mapViewUtils-55ac76cb.js');
const publicNotificationStore = require('./publicNotificationStore-20e924f5.js');
const locale = require('./locale-81a5f7d0.js');
const publicNotificationUtils = require('./publicNotificationUtils-9d585d8d.js');
require('./index-763f87ac.js');
require('./_commonjsHelpers-384729db.js');

const publicNotificationCss = ":host{display:block;--calcite-input-message-spacing-value:0}.border-bottom-1{border-width:0px;border-bottom-width:1px;border-style:solid;border-color:var(--calcite-ui-border-3)}.action-bar-size{height:3.5rem;width:100%}.w-1-3{width:33.3%}.w-1-4{width:25%}.action-center{-webkit-box-align:center;-webkit-align-items:center;-ms-grid-row-align:center;align-items:center;align-content:center;justify-content:center}.width-full{width:100%}.height-full{height:100%}.padding-1{padding:1rem}.padding-top-sides-1{-webkit-padding-before:1rem;padding-block-start:1rem;-webkit-padding-start:1rem;padding-inline-start:1rem;-webkit-padding-end:1rem;padding-inline-end:1rem}.padding-sides-1{-webkit-padding-start:1rem;padding-inline-start:1rem;-webkit-padding-end:1rem;padding-inline-end:1rem}.padding-end-1-2{-webkit-padding-end:.5rem;padding-inline-end:.5rem}.padding-top-1-2{-webkit-padding-before:.5rem;padding-block-start:.5rem}.padding-top-1{padding-top:1rem}.padding-bottom-1{padding-bottom:1rem}.info-blue{color:#00A0FF}.info-message{justify-content:center;display:grid}.font-bold{font-weight:bold}.display-flex{display:flex}.display-block{display:block}.display-none{display:none}.main-label{float:left}html[dir=\"rtl\"] .main-label{float:right}.back-label:hover{cursor:pointer;color:var(--calcite-ui-brand-hover)}.border-bottom{border-bottom:1px solid var(--calcite-ui-border-2)}.margin-side-1{-webkit-margin-start:1rem;margin-inline-start:1rem;-webkit-margin-end:1rem;margin-inline-end:1rem}.border-top{border-top:1px solid var(--calcite-ui-border-2)}.w-100{width:100%}.w-50{width:50%}.padding-1-2{padding:0.5rem}.list-border{border:1px solid var(--calcite-ui-border-2)}.margin-sides-1{-webkit-margin-start:1rem;margin-inline-start:1rem;-webkit-margin-end:1rem;margin-inline-end:1rem}.margin-start-1-2{-webkit-margin-start:0.5rem;margin-inline-start:0.5rem}.position-right{position:absolute;right:1rem}.position-right[dir=\"rtl\"]{position:absolute;left:1rem}.position-left{position:absolute;left:1rem}.position-left[dir=\"rtl\"]{position:absolute;right:1rem}.margin-top-0{-webkit-margin-before:0 !important;margin-block-start:0 !important}.height-1-1-2{height:1.5rem}.main-background{background-color:var(--calcite-ui-foreground-2)}.num-selected{align-items:center;display:flex}";

const PublicNotification = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.labelChange = index.createEvent(this, "labelChange", 7);
    this.addresseeLayerIds = [];
    this.customLabelEnabled = undefined;
    this.defaultBufferDistance = undefined;
    this.defaultBufferUnit = undefined;
    this.exportOptions = undefined;
    this.featureEffect = undefined;
    this.featureHighlightEnabled = undefined;
    this.mapView = undefined;
    this.noResultText = undefined;
    this.searchConfiguration = undefined;
    this.selectionLayerIds = [];
    this.showRefineSelection = false;
    this.showSearchSettings = true;
    this.addresseeLayer = undefined;
    this._downloadActive = true;
    this._numSelected = 0;
    this._pageType = interfaces.EPageType.LIST;
    this._saveEnabled = false;
    this._selectionSets = [];
    this._sketchType = interfaces.ESketchType.INTERACTIVE;
    this._selectionWorkflowType = interfaces.EWorkflowType.SEARCH;
    this._showLayerSelectionChangeModal = false;
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
      const nonRefineSets = v.filter(ss => ss.workflowType !== interfaces.EWorkflowType.REFINE);
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
    if (oldPageType === interfaces.EPageType.SELECT || oldPageType === interfaces.EPageType.REFINE) {
      // clear any draw shapes or buffers
      await this._clearSelection();
    }
    if (pageType !== interfaces.EPageType.SELECT) {
      return this._highlightFeatures();
    }
  }
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
    var _a, _b, _c, _d, _e, _f;
    const hasSelections = this._selectionSets.length > 0;
    const csvEnabled = typeof ((_b = (_a = this.exportOptions) === null || _a === void 0 ? void 0 : _a.csvOptions) === null || _b === void 0 ? void 0 : _b.enabled) === "boolean" ?
      (_c = this.exportOptions) === null || _c === void 0 ? void 0 : _c.csvOptions.enabled : true;
    const pdfEnabled = typeof ((_e = (_d = this.exportOptions) === null || _d === void 0 ? void 0 : _d.pdfOptions) === null || _e === void 0 ? void 0 : _e.enabled) === "boolean" ?
      (_f = this.exportOptions) === null || _f === void 0 ? void 0 : _f.pdfOptions.enabled : true;
    return (index.h(index.Host, null, index.h("calcite-shell", null, index.h("calcite-action-bar", { class: "border-bottom-1 action-bar-size", "expand-disabled": true, layout: "horizontal", slot: "header" }, this._getActionGroup("list-check", false, interfaces.EPageType.LIST, this._translations.myLists), this.showRefineSelection ? this._getActionGroup("test-data", !hasSelections, interfaces.EPageType.REFINE, this._translations.refineSelection) : undefined, pdfEnabled ? this._getActionGroup("file-pdf", !hasSelections, interfaces.EPageType.PDF, this._translations.downloadPDF) : undefined, csvEnabled ? this._getActionGroup("file-csv", !hasSelections, interfaces.EPageType.CSV, this._translations.downloadCSV) : undefined), this._getPage(this._pageType))));
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
    const [geometryEngine] = await loadModules.loadModules([
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
    return (index.h("calcite-action-group", { class: groupClass, layout: "horizontal" }, index.h("calcite-action", { active: this._pageType === pageType, alignment: "center", class: "width-full height-full", compact: false, disabled: disabled, icon: icon, id: icon, onClick: () => { this._setPageType(pageType); }, text: "" }), index.h("calcite-tooltip", { label: "", placement: "bottom", "reference-element": icon }, index.h("span", null, tip))));
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
      case interfaces.EPageType.LIST:
        page = this._getListPage();
        break;
      case interfaces.EPageType.SELECT:
        page = this._getSelectPage();
        break;
      case interfaces.EPageType.REFINE:
        page = this._getRefinePage();
        break;
      case interfaces.EPageType.PDF:
        page = this._getPDFPage();
        break;
      case interfaces.EPageType.CSV:
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
    const hasSets = this._selectionSets.filter(ss => ss.workflowType !== interfaces.EWorkflowType.REFINE).length > 0;
    const total = publicNotificationUtils.getTotal(this._selectionSets);
    return hasSets ? (index.h("calcite-panel", null, index.h("div", { class: "padding-top-sides-1" }, index.h("calcite-label", { class: "font-bold" }, this._translations.myLists)), this._getNotice(this._translations.listHasSetsTip, "padding-sides-1 padding-bottom-1"), this._getMapLayerPicker(), index.h("div", { class: "padding-sides-1 height-1-1-2" }, index.h("div", { class: "position-left" }, index.h("calcite-label", { alignment: "start", class: "font-bold" }, this._translations.notifications)), index.h("div", { class: "position-right" }, index.h("calcite-input-message", { active: true, class: "info-blue margin-top-0", scale: "m" }, this._translations.uniqueCout.replace("{{n}}", total.toString())))), hasSets ? this._getSelectionSetList() : (index.h("div", { class: "info-message" }, index.h("calcite-input-message", { active: true, class: "info-blue", scale: "m" }, this._translations.noNotifications))), index.h("div", { class: "display-flex padding-1" }, index.h("calcite-button", { onClick: () => { this._setPageType(interfaces.EPageType.SELECT); }, width: "full" }, this._translations.add)), this._showModal(this._showLayerSelectionChangeModal))) : (index.h("calcite-panel", null, index.h("div", { class: "padding-top-sides-1" }, index.h("calcite-label", { class: "font-bold" }, this._translations.myLists)), index.h("div", { class: "padding-sides-1" }, index.h("calcite-label", null, this._translations.notifications)), index.h("div", { class: "info-message padding-bottom-1" }, index.h("calcite-input-message", { active: true, class: "info-blue", scale: "m" }, this._translations.noNotifications)), this._getNotice(this._translations.selectLayerAndAdd, "padding-sides-1 padding-bottom-1"), this._getMapLayerPicker(), index.h("div", { class: "display-flex padding-1" }, index.h("calcite-button", { onClick: () => { this._setPageType(interfaces.EPageType.SELECT); }, width: "full" }, this._translations.add))));
  }
  /**
   * Create the UI element that will expose the addressee layers
   *
   * @returns addressee layer list node
   * @protected
   */
  _getMapLayerPicker() {
    var _a;
    return (index.h("div", { class: "display-flex padding-sides-1" }, index.h("calcite-label", { class: "font-bold width-full" }, this._translations.addresseeLayer, index.h("map-layer-picker", { enabledLayerIds: this.addresseeLayerIds, mapView: this.mapView, onLayerSelectionChange: (evt) => this._layerSelectionChange(evt), selectedLayerIds: this.addresseeLayer ? [(_a = this.addresseeLayer) === null || _a === void 0 ? void 0 : _a.layer.id] : [], selectionMode: "single" }))));
  }
  /**
   * Create the selection sets list node for the List page
   *
   * @returns selection sets list node
   * @protected
   */
  _getSelectionSetList() {
    return (index.h("calcite-list", { class: "list-border margin-sides-1" }, 
    // REFINE is handled seperately from the core selection sets
    // You can only access after clicking the refine action
    this._selectionSets.reduce((prev, cur, i) => {
      if (cur.workflowType !== interfaces.EWorkflowType.REFINE) {
        prev.push((index.h("calcite-list-item", { description: this._translations.selectedFeatures.replace("{{n}}", cur.selectedIds.length.toString()), label: cur.label, onClick: () => this._gotoSelection(cur, this.mapView) }, this._getAction(true, "pencil", "", (evt) => this._openSelection(cur, evt), false, "actions-end"), this._getAction(true, "x", "", (evt) => this._deleteSelection(i, evt), false, "actions-end"))));
      }
      return prev;
    }, [])));
  }
  /**
   * Alert the user of the potential change to the selection sets and ask if they would like to proceed.
   *
   * @returns the page node
   * @protected
   */
  _showModal(open) {
    return (index.h("calcite-modal", { "aria-labelledby": "modal-title", "background-color": "grey", color: "red", open: open, scale: "s", width: "s" }, index.h("div", { id: "modal-title", slot: "header" }, this._translations.shouldProceed), index.h("div", { slot: "content" }, this._translations.proceedInfo), index.h("calcite-button", { appearance: "outline", onClick: () => this._cancelLayerChange(), slot: "secondary", width: "full" }, this._translations.cancel), index.h("calcite-button", { onClick: () => this._handleLayerChange(), slot: "primary", width: "full" }, this._translations.proceed)));
  }
  /**
   * Prevent the default behavior of layer selection change and close the modal.
   *
   * @returns the page node
   * @protected
   */
  _cancelLayerChange() {
    this._layerSelectionChangeEvt.preventDefault();
    this._layerSelectionChangeEvt.stopPropagation();
    this._layerSelectionChangeEvt = undefined;
    this._showLayerSelectionChangeModal = false;
  }
  /**
   * Allow the default behavior of layer selection change and close the modal.
   *
   * @returns the page node
   * @protected
   */
  async _handleLayerChange() {
    var _a, _b;
    this._showLayerSelectionChangeModal = false;
    const id = ((_b = (_a = this._layerSelectionChangeEvt) === null || _a === void 0 ? void 0 : _a.detail) === null || _b === void 0 ? void 0 : _b.length) > 0 ?
      this._layerSelectionChangeEvt.detail[0] : "";
    await this._updateAddresseeLayer(id);
  }
  /**
   * Create the Select page that shows the selection workflows
   *
   * @returns the page node
   * @protected
   */
  _getSelectPage() {
    var _a, _b, _c;
    // const searchTip = `${this._translations.selectSearchTip} ${this._translations.optionalSearchDistance}`;
    const searchTip = this._translations.selectSearchTip;
    // const selectTip = `${this._translations.selectLayerTip} ${this._translations.optionalSearchDistance}`;
    const selectTip = this._translations.selectLayerTip;
    // const sketchTip = this._sketchType === ESketchType.INTERACTIVE ?
    //   `${this._translations.selectSketchTip} ${this._translations.optionalSearchDistance}` :
    //   `${this._translations.selectLayerTip} ${this._translations.optionalSearchDistance}`;
    const sketchTip = this._sketchType === interfaces.ESketchType.INTERACTIVE ?
      this._translations.selectSketchTip :
      this._translations.selectLayerTip;
    const noticeText = this._selectionWorkflowType === interfaces.EWorkflowType.SELECT ? selectTip :
      this._selectionWorkflowType === interfaces.EWorkflowType.SKETCH ? sketchTip : searchTip;
    return (index.h("calcite-panel", null, this._getLabel(this._translations.stepTwoFull.replace("{{layer}}", (_a = this.addresseeLayer) === null || _a === void 0 ? void 0 : _a.layer.title)), this._getNotice(noticeText), index.h("div", { class: "padding-top-sides-1" }, index.h("map-select-tools", { class: "font-bold", enabledLayerIds: this.selectionLayerIds, isUpdate: !!this._activeSelection, mapView: this.mapView, onSelectionSetChange: (evt) => this._updateForSelection(evt), onWorkflowTypeChange: (evt) => this._updateForWorkflowType(evt), ref: (el) => { this._selectTools = el; }, searchConfiguration: this.searchConfiguration, selectLayerView: this.addresseeLayer, selectionSet: this._activeSelection, showBufferTools: this.showSearchSettings })), index.h("div", { class: "padding-sides-1 padding-bottom-1", style: { "align-items": "end", "display": "flex" } }, index.h("calcite-icon", { class: "info-blue padding-end-1-2", icon: "feature-layer", scale: "s" }), index.h("calcite-input-message", { active: true, class: "info-blue", scale: "m" }, this.noResultText && this._numSelected === 0 ? this.noResultText :
      this._translations.selectedAddresses.replace("{{n}}", this._numSelected.toString()).replace("{{layer}}", ((_b = this.addresseeLayer) === null || _b === void 0 ? void 0 : _b.layer.title) || ""))), index.h("div", { class: "padding-sides-1" }, index.h("calcite-label", { class: "font-bold" }, "Name label", index.h("calcite-input", { onInput: () => {
        this.labelChange.emit(this._labelName.value);
      }, placeholder: "Insert label here...", ref: (el) => { this._labelName = el; }, value: ((_c = this._activeSelection) === null || _c === void 0 ? void 0 : _c.label) || "" }))), this._getPageNavButtons(this._translations.done, this._numSelected === 0, () => { void this._saveSelection(); }, this._translations.cancel, false, () => { void this._home(); })));
  }
  /**
   * Create the Refine page that users can interactively add/remove features from existing selection sets
   *
   * @returns the page node
   * @protected
   */
  _getRefinePage() {
    return (index.h("calcite-panel", null, this._getLabel(this._translations.refineSelection), this._getNotice(this._translations.refineTip, "padding-sides-1"), index.h("refine-selection", { addresseeLayer: this.addresseeLayer, enabledLayerIds: this.selectionLayerIds, mapView: this.mapView, selectionSets: this._selectionSets })));
  }
  /**
   * Create the PDF download page that shows the download options
   *
   * @returns the page node
   * @protected
   */
  _getPDFPage() {
    return this._getDownloadPage(interfaces.EExportType.PDF);
  }
  /**
   * Create the CSV download page that shows the download options
   *
   * @returns the page node
   * @protected
   */
  _getCSVPage() {
    return this._getDownloadPage(interfaces.EExportType.CSV);
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
    var _a, _b;
    const isPdf = type === interfaces.EExportType.PDF;
    const multiPdfOptions = ((_a = this.exportOptions) === null || _a === void 0 ? void 0 : _a.pdfOptions.enabledSizeValues.length) > 1;
    return (index.h("calcite-panel", null, index.h("div", null, index.h("div", { class: "padding-top-sides-1" }, index.h("calcite-label", { class: "font-bold" }, isPdf ? this._translations.pdfDownloads : this._translations.csvDownloads), index.h("calcite-label", null, this._translations.notifications)), this._getSelectionLists(), index.h("div", { class: "margin-side-1 padding-top-1 border-bottom" }), index.h("div", { class: "padding-top-sides-1" }, index.h("calcite-label", { layout: "inline" }, index.h("calcite-checkbox", { disabled: !this._downloadActive, ref: (el) => { this._removeDuplicates = el; } }), this._translations.removeDuplicate)), index.h("div", { class: isPdf && multiPdfOptions ? "" : "display-none" }, this._getLabel(this._translations.selectPDFLabelOption, false), index.h("div", { class: "padding-sides-1" }, index.h("pdf-download", { disabled: !this._downloadActive, enabledSizeValues: (_b = this.exportOptions) === null || _b === void 0 ? void 0 : _b.pdfOptions.enabledSizeValues, layerView: this.addresseeLayer, ref: (el) => { this._downloadTools = el; } }))), index.h("div", { class: "padding-1 display-flex" }, index.h("calcite-button", { disabled: !this._downloadActive, onClick: isPdf ? () => this._downloadPDF() : () => this._downloadCSV(), width: "full" }, isPdf ? this._translations.downloadPDF : this._translations.downloadCSV)))));
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
    return (index.h("div", null, index.h("div", { class: "display-flex padding-top-sides-1" }, index.h("calcite-button", { disabled: topDisabled, onClick: topFunc, width: "full" }, topLabel)), index.h("div", { class: "display-flex padding-top-1-2 padding-sides-1" }, index.h("calcite-button", { appearance: "outline", disabled: bottomDisabled, onClick: bottomFunc, width: "full" }, bottomLabel))));
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
    return (index.h("calcite-notice", { class: noticeClass, color: "green", icon: "lightbulb", open: true }, index.h("div", { slot: "message" }, message)));
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
    return (index.h("div", { class: "padding-top-sides-1" }, index.h("calcite-label", { class: "font-bold", "disable-spacing": disableSpacing }, label)));
  }
  /**
   * Get selection set list node with checkbox for Download pages
   *
   * @returns the list node
   * @protectedlabel
   */
  _getSelectionLists() {
    return this._selectionSets.reduce((prev, cur) => {
      if (cur.workflowType !== interfaces.EWorkflowType.REFINE) {
        if (!this._downloadActive && cur.download) {
          this._downloadActive = true;
        }
        prev.push((index.h("div", { class: "display-flex padding-sides-1 padding-bottom-1" }, index.h("calcite-checkbox", { checked: cur.download, onClick: () => { void this._toggleDownload(cur.id); } }), index.h("calcite-list", { class: "list-border margin-start-1-2 w-100", id: "download-list" }, index.h("calcite-list-item", { description: this._translations.selectedFeatures.replace("{{n}}", cur.selectedIds.length.toString()), disabled: !cur.download, label: cur.label, onClick: () => { void this._toggleDownload(cur.id); } })))));
      }
      return prev;
    }, []) || (index.h("div", null));
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
    const ids = publicNotificationUtils.getSelectionIds(this._getDownloadSelectionSets());
    void this._downloadTools.downloadPDF(ids, this._removeDuplicates.checked);
  }
  /**
   * Download all selection sets as CSV
   *
   * @protected
   */
  _downloadCSV() {
    const ids = publicNotificationUtils.getSelectionIds(this._getDownloadSelectionSets());
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
      return ss.download || ss.workflowType === interfaces.EWorkflowType.REFINE;
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
    return (index.h("calcite-action", { disabled: !enabled, icon: icon, indicator: indicator, onClick: onClick, slot: slot, text: text }));
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
    this._setPageType(interfaces.EPageType.LIST);
  }
  /**
   * Fetch the addressee layer from the map if no selection sets exist.
   * Alert the user of the potential change to the selection sets if they exist.
   *
   * @param evt layer selection change event
   *
   * @returns Promise when the function has completed
   * @protected
   */
  async _layerSelectionChange(evt) {
    var _a, _b, _c;
    const id = ((_a = evt === null || evt === void 0 ? void 0 : evt.detail) === null || _a === void 0 ? void 0 : _a.length) > 0 ? evt.detail[0] : "";
    if (id !== ((_b = this.addresseeLayer) === null || _b === void 0 ? void 0 : _b.layer.id)) {
      this._showLayerSelectionChangeModal = ((_c = this.addresseeLayer) === null || _c === void 0 ? void 0 : _c.layer.id) !== undefined && this._selectionSets.length > 0;
      if (this._showLayerSelectionChangeModal) {
        this._layerSelectionChangeEvt = evt;
      }
      else {
        await this._updateAddresseeLayer(id);
      }
    }
  }
  /**
   * Fetch the new addressee layer and update the selection sets
   *
   * @param id the id of the layer to fetch
   *
   * @returns Promise when the function has completed
   * @protected
   */
  async _updateAddresseeLayer(id) {
    this.addresseeLayer = await mapViewUtils.getMapLayerView(this.mapView, id);
    await this._updateSelectionSets(this.addresseeLayer);
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
    const _selectionSets = this._selectionSets.filter(selectionSet => selectionSet.workflowType !== interfaces.EWorkflowType.REFINE);
    const oidDefs = [];
    _selectionSets.forEach(selectionSet => {
      selectionSet.layerView = layerView;
      selectionSet.selectedIds = [];
      oidDefs.push(mapViewUtils.getSelectionSetQuery(selectionSet, this._geometryEngine));
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
    void mapViewUtils.goToSelection(selSet.selectedIds, selSet.layerView, mapView, this.featureHighlightEnabled, this.featureEffect);
  }
  /**
   * Open the selection set for further adjustment
   *
   * @protected
   */
  _openSelection(selectionSet, evt) {
    evt.stopPropagation();
    this._activeSelection = selectionSet;
    this._pageType = interfaces.EPageType.SELECT;
  }
  /**
   * Highlight any selected features in the map
   *
   * @protected
   */
  async _highlightFeatures() {
    this._clearHighlight();
    const ids = publicNotificationUtils.getSelectionIds(this._selectionSets);
    if (ids.length > 0) {
      publicNotificationStore.state.highlightHandle = await mapViewUtils.highlightFeatures(ids, this.addresseeLayer, this.mapView);
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
    if (publicNotificationStore.state && publicNotificationStore.state.highlightHandle) {
      (_a = publicNotificationStore.state.highlightHandle) === null || _a === void 0 ? void 0 : _a.remove();
    }
  }
  /**
   * Fetches the component's translations
   *
   * @protected
   */
  async _getTranslations() {
    const translations = await locale.getLocaleComponentStrings(this.el);
    this._translations = translations[0];
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "mapView": ["mapViewWatchHandler"],
    "_selectionSets": ["selectionSetsWatchHandler"],
    "_pageType": ["pageTypeWatchHandler"]
  }; }
};
PublicNotification.style = publicNotificationCss;

exports.public_notification = PublicNotification;
