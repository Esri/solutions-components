/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { a as EPageType, b as ESketchType, c as EWorkflowType, d as EExportType } from './interfaces3.js';
import { l as loadModules } from './loadModules.js';
import { a as getMapLayerView, g as goToSelection, h as highlightFeatures, d as defineCustomElement$6 } from './map-layer-picker2.js';
import { g as getSelectionSetQuery } from './queryUtils.js';
import { s as state } from './publicNotificationStore.js';
import { a as getComponentClosestLanguage, g as getLocaleComponentStrings } from './locale.js';
import { g as getTotal, a as getSelectionIds, d as defineCustomElement$3 } from './refine-selection2.js';
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
import { d as defineCustomElement$s } from './graph.js';
import { d as defineCustomElement$r } from './icon.js';
import { d as defineCustomElement$q } from './input.js';
import { d as defineCustomElement$p } from './input-message.js';
import { d as defineCustomElement$o } from './label.js';
import { d as defineCustomElement$n } from './list.js';
import { d as defineCustomElement$m } from './list-item2.js';
import { d as defineCustomElement$l } from './loader.js';
import { d as defineCustomElement$k } from './modal.js';
import { d as defineCustomElement$j } from './notice.js';
import { d as defineCustomElement$i } from './option.js';
import { d as defineCustomElement$h } from './panel.js';
import { d as defineCustomElement$g } from './popover.js';
import { d as defineCustomElement$f } from './progress.js';
import { d as defineCustomElement$e } from './radio-group.js';
import { d as defineCustomElement$d } from './radio-group-item.js';
import { d as defineCustomElement$c } from './scrim.js';
import { d as defineCustomElement$b } from './select.js';
import { d as defineCustomElement$a } from './shell.js';
import { d as defineCustomElement$9 } from './slider.js';
import { d as defineCustomElement$8 } from './tooltip.js';
import { d as defineCustomElement$7 } from './map-draw-tools2.js';
import { d as defineCustomElement$5 } from './map-select-tools2.js';
import { d as defineCustomElement$4 } from './pdf-download2.js';
import { d as defineCustomElement$2 } from './refine-selection-tools2.js';

const publicNotificationCss = ":host{display:block;--calcite-input-message-spacing-value:0}.align-center{align-items:center}.border-bottom-1{border-width:0px;border-bottom-width:1px;border-style:solid;border-color:var(--calcite-ui-border-3)}.action-bar-size{height:3.5rem;width:100%}.w-1-3{width:33.3%}.w-1-4{width:25%}.action-center{-webkit-box-align:center;-webkit-align-items:center;-ms-grid-row-align:center;align-items:center;align-content:center;justify-content:center}.width-full{width:100%}.height-full{height:100%}.padding-1{padding:1rem}.padding-top-sides-1{-webkit-padding-before:1rem;padding-block-start:1rem;-webkit-padding-start:1rem;padding-inline-start:1rem;-webkit-padding-end:1rem;padding-inline-end:1rem}.padding-sides-1{-webkit-padding-start:1rem;padding-inline-start:1rem;-webkit-padding-end:1rem;padding-inline-end:1rem}.padding-end-1-2{-webkit-padding-end:.5rem;padding-inline-end:.5rem}.padding-top-1-2{-webkit-padding-before:.5rem;padding-block-start:.5rem}.padding-top-1{padding-top:1rem}.padding-bottom-1{padding-bottom:1rem}.info-blue{color:#00A0FF}.info-message{justify-content:center;display:grid}.font-bold{font-weight:bold}.display-flex{display:flex}.display-block{display:block}.display-none{display:none}.main-label{float:left}html[dir=\"rtl\"] .main-label{float:right}.back-label:hover{cursor:pointer;color:var(--calcite-ui-brand-hover)}.border-bottom{border-bottom:1px solid var(--calcite-ui-border-2)}.margin-side-1{-webkit-margin-start:1rem;margin-inline-start:1rem;-webkit-margin-end:1rem;margin-inline-end:1rem}.border-top{border-top:1px solid var(--calcite-ui-border-2)}.w-100{width:100%}.w-50{width:50%}.padding-1-2{padding:0.5rem}.list-border{border:1px solid var(--calcite-ui-border-2)}.margin-sides-1{-webkit-margin-start:1rem;margin-inline-start:1rem;-webkit-margin-end:1rem;margin-inline-end:1rem}.margin-start-1-2{-webkit-margin-start:0.5rem;margin-inline-start:0.5rem}.float-right{float:right}.float-right[dir=\"rtl\"]{float:left}.float-left{float:left}.float-left[dir=\"rtl\"]{float:right}.margin-top-0{-webkit-margin-before:0 !important;margin-block-start:0 !important}.height-1-1-2{height:1.5rem}.main-background{background-color:var(--calcite-ui-foreground-2)}.num-selected{align-items:center;display:flex}";

const PublicNotification$1 = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.labelChange = createEvent(this, "labelChange", 7);
    this.searchConfigurationChange = createEvent(this, "searchConfigurationChange", 7);
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
    this.showRefineSelection = false;
    this.showSearchSettings = true;
    this.addresseeLayer = undefined;
    this._downloadActive = true;
    this._numSelected = 0;
    this._pageType = EPageType.LIST;
    this._saveEnabled = false;
    this._selectionLoading = false;
    this._selectionSets = [];
    this._sketchType = ESketchType.INTERACTIVE;
    this._selectionWorkflowType = EWorkflowType.SEARCH;
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
   * Called each time the searchConfiguration prop is changed.
   *
   * @returns Promise when complete
   */
  async watchSearchConfigurationHandler(newValue, oldValue) {
    const s_newValue = JSON.stringify(newValue);
    if (s_newValue !== JSON.stringify(oldValue)) {
      this._searchConfiguration = JSON.parse(s_newValue);
      this.searchConfigurationChange.emit(this._searchConfiguration);
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
  /**
   * Handle changes to the buffer distance value
   */
  distanceChanged(event) {
    this._updateLabel(event, "distance");
    this._distance = event.detail.newValue;
  }
  /**
   * Handle changes when selection is loading
   */
  selectionLoadingChange(event) {
    this._selectionLoading = event.detail;
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
  /**
   * Handle changes to the buffer unit
   */
  unitChanged(event) {
    this._updateLabel(event, "unit");
    this._unit = event.detail.newValue;
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
    return (h(Host, null, h("calcite-shell", null, h("calcite-action-bar", { class: "border-bottom-1 action-bar-size", "expand-disabled": true, layout: "horizontal", slot: "header" }, this._getActionGroup("list-check", EPageType.LIST, this._translations.myLists), this.showRefineSelection ? this._getActionGroup("test-data", EPageType.REFINE, this._translations.refineSelection) : undefined, this._getActionGroup("file-pdf", EPageType.PDF, this._translations.downloadPDF), this._getActionGroup("file-csv", EPageType.CSV, this._translations.downloadCSV)), this._getPage(this._pageType))));
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
  _getActionGroup(icon, pageType, tip) {
    const groupClass = this.showRefineSelection ? "action-center w-1-4" : "action-center w-1-3";
    return (h("calcite-action-group", { class: groupClass, layout: "horizontal" }, h("calcite-action", { active: this._pageType === pageType, alignment: "center", class: "width-full height-full", compact: false, icon: icon, id: icon, onClick: () => { this._setPageType(pageType); }, text: "" }), h("calcite-tooltip", { label: "", placement: "bottom", "reference-element": icon }, h("span", null, tip))));
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
    const hasSets = this._selectionSets.filter(ss => ss.workflowType !== EWorkflowType.REFINE).length > 0;
    const total = getTotal(this._selectionSets);
    return hasSets ? (h("calcite-panel", null, h("div", { class: "padding-top-sides-1" }, h("calcite-label", { class: "font-bold" }, this._translations.myLists)), this._getNotice(this._translations.listHasSetsTip, "padding-sides-1 padding-bottom-1"), this._getMapLayerPicker(), h("div", { class: "display-block padding-sides-1 height-1-1-2" }, h("div", { class: "display-block float-left" }, h("calcite-label", { alignment: "start", class: "font-bold" }, this._translations.notifications)), h("div", { class: "display-block float-right" }, h("calcite-input-message", { active: true, class: "info-blue margin-top-0", scale: "m" }, this._translations.uniqueCout.replace("{{n}}", total.toString())))), hasSets ? this._getSelectionSetList() : (h("div", { class: "info-message" }, h("calcite-input-message", { active: true, class: "info-blue", scale: "m" }, this._translations.noNotifications))), h("div", { class: "display-flex padding-1" }, h("calcite-button", { onClick: () => { this._setPageType(EPageType.SELECT); }, width: "full" }, this._translations.add)), this._showModal(this._showLayerSelectionChangeModal))) : (h("calcite-panel", null, h("div", { class: "padding-top-sides-1" }, h("calcite-label", { class: "font-bold" }, this._translations.myLists)), h("div", { class: "padding-sides-1" }, h("calcite-label", null, this._translations.notifications)), h("div", { class: "info-message padding-bottom-1" }, h("calcite-input-message", { active: true, class: "info-blue", scale: "m" }, this._translations.noNotifications)), this._getNotice(this._translations.selectLayerAndAdd, "padding-sides-1 padding-bottom-1"), this._getMapLayerPicker(), h("div", { class: "display-flex padding-1" }, h("calcite-button", { onClick: () => { this._setPageType(EPageType.SELECT); }, width: "full" }, this._translations.add))));
  }
  /**
   * Create the UI element that will expose the addressee layers
   *
   * @returns addressee layer list node
   * @protected
   */
  _getMapLayerPicker() {
    var _a;
    return (h("div", { class: "display-flex padding-sides-1" }, h("calcite-label", { class: "font-bold width-full" }, this._translations.addresseeLayer, h("map-layer-picker", { enabledLayerIds: this.addresseeLayerIds, mapView: this.mapView, onLayerSelectionChange: (evt) => this._layerSelectionChange(evt), selectedLayerIds: this.addresseeLayer ? [(_a = this.addresseeLayer) === null || _a === void 0 ? void 0 : _a.layer.id] : [], selectionMode: "single" }))));
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
   * Alert the user of the potential change to the selection sets and ask if they would like to proceed.
   *
   * @returns the page node
   * @protected
   */
  _showModal(open) {
    return (h("calcite-modal", { "aria-labelledby": "modal-title", "background-color": "grey", color: "red", open: open, scale: "s", width: "s" }, h("div", { id: "modal-title", slot: "header" }, this._translations.shouldProceed), h("div", { slot: "content" }, this._translations.proceedInfo), h("calcite-button", { appearance: "outline", onClick: () => this._cancelLayerChange(), slot: "secondary", width: "full" }, this._translations.cancel), h("calcite-button", { onClick: () => this._handleLayerChange(), slot: "primary", width: "full" }, this._translations.proceed)));
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
   * Check if any selection sets exist.
   *
   * @returns true if selection sets exist
   *
   * @protected
   */
  _hasSelections() {
    return this._selectionSets.length > 0;
  }
  /**
   * Create the Select page that shows the selection workflows
   *
   * @returns the page node
   * @protected
   */
  _getSelectPage() {
    var _a, _b;
    const searchTip = this._translations.selectSearchTip;
    const selectTip = this._translations.selectLayerTip;
    const sketchTip = this._sketchType === ESketchType.INTERACTIVE ?
      this._translations.selectSketchTip :
      this._translations.selectLayerTip;
    const noticeText = this._selectionWorkflowType === EWorkflowType.SELECT ? selectTip :
      this._selectionWorkflowType === EWorkflowType.SKETCH ? sketchTip : searchTip;
    const nameLabelClass = this.customLabelEnabled ? "" : "display-none";
    // TODO find out if ... is appropriate for other languages
    const locale = getComponentClosestLanguage(this.el);
    const selectionLoading = locale && locale === "en" ?
      `${this._translations.selectionLoading}...` : this._translations.selectionLoading;
    return (h("calcite-panel", null, this._getLabel(this._translations.stepTwoFull.replace("{{layer}}", (_a = this.addresseeLayer) === null || _a === void 0 ? void 0 : _a.layer.title)), this._getNotice(noticeText), h("div", { class: "padding-top-sides-1" }, h("map-select-tools", { bufferColor: this.bufferColor, bufferOutlineColor: this.bufferOutlineColor, class: "font-bold", defaultBufferDistance: this.defaultBufferDistance, defaultBufferUnit: this.defaultBufferUnit, enabledLayerIds: this.selectionLayerIds, isUpdate: !!this._activeSelection, mapView: this.mapView, onSelectionSetChange: (evt) => this._updateForSelection(evt), onWorkflowTypeChange: (evt) => this._updateForWorkflowType(evt), ref: (el) => { this._selectTools = el; }, searchConfiguration: this._searchConfiguration, selectLayerView: this.addresseeLayer, selectionSet: this._activeSelection, showBufferTools: this.showSearchSettings })), h("div", { class: "padding-sides-1 padding-bottom-1", style: { "align-items": "end", "display": "flex" } }, this._selectionLoading ? (h("div", null, h("calcite-loader", { active: true, class: "info-blue", inline: true, label: selectionLoading, scale: "m", type: "indeterminate" }))) : (h("calcite-icon", { class: "info-blue padding-end-1-2", icon: "feature-layer", scale: "s" })), h("calcite-input-message", { active: true, class: "info-blue", scale: "m" }, this._selectionLoading ? selectionLoading :
      this.noResultText && this._numSelected === 0 ? this.noResultText :
        this._translations.selectedAddresses.replace("{{n}}", this._numSelected.toString()).replace("{{layer}}", ((_b = this.addresseeLayer) === null || _b === void 0 ? void 0 : _b.layer.title) || ""))), h("div", { class: "padding-sides-1 " + nameLabelClass }, h("calcite-label", { class: "font-bold" }, "List name", h("calcite-input", { onInput: () => {
        this.labelChange.emit(this._labelName.value);
      }, placeholder: "Insert label here...", ref: (el) => { this._labelName = el; }, value: this._customLabel || "" }))), this._getPageNavButtons(this._translations.done, this._numSelected === 0, () => { void this._saveSelection(); }, this._translations.cancel, false, () => { void this._home(); })));
  }
  /**
   * Create the Refine page that users can interactively add/remove features from existing selection sets
   *
   * @returns the page node
   * @protected
   */
  _getRefinePage() {
    const hasSelections = this._hasSelections();
    return (h("calcite-panel", null, this._getLabel(this._translations.refineSelection), hasSelections ? (h("div", null, this._getNotice(this._translations.refineTip, "padding-sides-1"), h("refine-selection", { addresseeLayer: this.addresseeLayer, enabledLayerIds: this.selectionLayerIds, mapView: this.mapView, selectionSets: this._selectionSets }))) :
      this._getNotice(this._translations.refineTipNoSelections, "padding-sides-1")));
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
    const hasSelections = this._hasSelections();
    return (h("calcite-panel", null, h("div", null, h("div", { class: "padding-top-sides-1" }, h("calcite-label", { class: "font-bold" }, isPdf ? this._translations.downloadPDF : this._translations.downloadCSV)), hasSelections ? (h("div", null, h("calcite-label", null, this._translations.notifications), this._getSelectionLists(), h("div", { class: "margin-side-1 padding-top-1 border-bottom" }), h("div", { class: "padding-top-sides-1" }, h("calcite-label", { layout: "inline", style: "visibility:" + (isPdf ? "hidden" : "visible") }, h("calcite-checkbox", { disabled: !this._downloadActive, ref: (el) => { this._removeDuplicatesCSV = el; } }), this._translations.removeDuplicate, " CSV"), h("calcite-label", { layout: "inline" }, h("calcite-checkbox", { disabled: !this._downloadActive, ref: (el) => { this._removeDuplicatesPDF = el; } }), this._translations.removeDuplicate, " PDF")), h("div", { class: isPdf ? "" : "display-none" }, this._getLabel(this._translations.selectPDFLabelOption, false), h("div", { class: "padding-sides-1" }, h("pdf-download", { disabled: !this._downloadActive, layerView: this.addresseeLayer, ref: (el) => { this._downloadTools = el; } }))), h("div", { class: "padding-1 display-flex" }, h("calcite-button", { disabled: !this._downloadActive, onClick: isPdf ? () => this._downloadPDF() : () => this._downloadCSV(), width: "full" }, isPdf ? this._translations.downloadPDF : this._translations.downloadCSV)))) : (this._getNotice(this._translations.downloadNoLists, "padding-sides-1 padding-bottom-1")))));
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
   * @protectedlabel
   */
  _getSelectionLists() {
    return this._selectionSets.reduce((prev, cur) => {
      if (cur.workflowType !== EWorkflowType.REFINE) {
        if (!this._downloadActive && cur.download) {
          this._downloadActive = true;
        }
        prev.push((h("div", { class: "display-flex padding-sides-1 padding-bottom-1" }, h("calcite-checkbox", { checked: cur.download, class: "align-center", onClick: () => { void this._toggleDownload(cur.id); } }), h("calcite-list", { class: "list-border margin-start-1-2 w-100", id: "download-list" }, h("calcite-list-item", { description: this._translations.selectedFeatures.replace("{{n}}", cur.selectedIds.length.toString()), disabled: !cur.download, label: cur.label, onClick: () => { void this._toggleDownload(cur.id); } })))));
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
    const ids = getSelectionIds(this._getDownloadSelectionSets());
    const selectionSetNames = this._selectionSets.map(set => set.label);
    void this._downloadTools.downloadPDF(selectionSetNames, ids, this._removeDuplicatesPDF.checked);
  }
  /**
   * Download all selection sets as CSV
   *
   * @protected
   */
  _downloadCSV() {
    const ids = getSelectionIds(this._getDownloadSelectionSets());
    const selectionSetNames = this._selectionSets.map(set => set.label);
    void this._downloadTools.downloadCSV(selectionSetNames, ids, this._removeDuplicatesCSV.checked);
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
   * Update custom label UI with buffer values
   *
   * @protected
   */
  _updateLabel(evt, type) {
    if (this._customLabel) {
      const oldV = type === "unit" ? `${this._distance} ${evt.detail.oldValue}` : `${evt.detail.oldValue} ${this._unit}`;
      const newV = type === "unit" ? `${this._distance} ${evt.detail.newValue}` : `${evt.detail.newValue} ${this._unit}`;
      this._customLabel = this._customLabel.replace(oldV, newV);
      this._labelName.value = this._customLabel;
      this.labelChange.emit(this._labelName.value);
    }
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
    this.addresseeLayer = await getMapLayerView(this.mapView, id);
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
    this._customLabel = undefined;
    this._distance = undefined;
    this._unit = undefined;
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
    this._distance = this._activeSelection.distance;
    this._unit = this._activeSelection.unit;
    this._customLabel = this._activeSelection.label;
    this._pageType = EPageType.SELECT;
  }
  /**
   * Highlight any selected features in the map
   *
   * @protected
   */
  async _highlightFeatures() {
    this._clearHighlight();
    const ids = getSelectionIds(this._selectionSets);
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
  get el() { return this; }
  static get watchers() { return {
    "mapView": ["mapViewWatchHandler"],
    "searchConfiguration": ["watchSearchConfigurationHandler"],
    "_selectionSets": ["selectionSetsWatchHandler"],
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
    "showRefineSelection": [4, "show-refine-selection"],
    "showSearchSettings": [4, "show-search-settings"],
    "addresseeLayer": [32],
    "_downloadActive": [32],
    "_numSelected": [32],
    "_pageType": [32],
    "_saveEnabled": [32],
    "_selectionLoading": [32],
    "_selectionSets": [32],
    "_sketchType": [32],
    "_selectionWorkflowType": [32],
    "_showLayerSelectionChangeModal": [32],
    "_translations": [32]
  }, [[8, "distanceChanged", "distanceChanged"], [8, "selectionLoadingChange", "selectionLoadingChange"], [8, "selectionSetsChanged", "selectionSetsChanged"], [8, "sketchTypeChange", "sketchTypeChange"], [8, "unitChanged", "unitChanged"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["public-notification", "buffer-tools", "calcite-action", "calcite-action-bar", "calcite-action-group", "calcite-action-menu", "calcite-button", "calcite-checkbox", "calcite-chip", "calcite-combobox", "calcite-combobox-item", "calcite-graph", "calcite-icon", "calcite-input", "calcite-input-message", "calcite-label", "calcite-list", "calcite-list-item", "calcite-loader", "calcite-modal", "calcite-notice", "calcite-option", "calcite-panel", "calcite-popover", "calcite-progress", "calcite-radio-group", "calcite-radio-group-item", "calcite-scrim", "calcite-select", "calcite-shell", "calcite-slider", "calcite-tooltip", "map-draw-tools", "map-layer-picker", "map-select-tools", "pdf-download", "refine-selection", "refine-selection-tools"];
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
    case "calcite-graph":
      if (!customElements.get(tagName)) {
        defineCustomElement$s();
      }
      break;
    case "calcite-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$r();
      }
      break;
    case "calcite-input":
      if (!customElements.get(tagName)) {
        defineCustomElement$q();
      }
      break;
    case "calcite-input-message":
      if (!customElements.get(tagName)) {
        defineCustomElement$p();
      }
      break;
    case "calcite-label":
      if (!customElements.get(tagName)) {
        defineCustomElement$o();
      }
      break;
    case "calcite-list":
      if (!customElements.get(tagName)) {
        defineCustomElement$n();
      }
      break;
    case "calcite-list-item":
      if (!customElements.get(tagName)) {
        defineCustomElement$m();
      }
      break;
    case "calcite-loader":
      if (!customElements.get(tagName)) {
        defineCustomElement$l();
      }
      break;
    case "calcite-modal":
      if (!customElements.get(tagName)) {
        defineCustomElement$k();
      }
      break;
    case "calcite-notice":
      if (!customElements.get(tagName)) {
        defineCustomElement$j();
      }
      break;
    case "calcite-option":
      if (!customElements.get(tagName)) {
        defineCustomElement$i();
      }
      break;
    case "calcite-panel":
      if (!customElements.get(tagName)) {
        defineCustomElement$h();
      }
      break;
    case "calcite-popover":
      if (!customElements.get(tagName)) {
        defineCustomElement$g();
      }
      break;
    case "calcite-progress":
      if (!customElements.get(tagName)) {
        defineCustomElement$f();
      }
      break;
    case "calcite-radio-group":
      if (!customElements.get(tagName)) {
        defineCustomElement$e();
      }
      break;
    case "calcite-radio-group-item":
      if (!customElements.get(tagName)) {
        defineCustomElement$d();
      }
      break;
    case "calcite-scrim":
      if (!customElements.get(tagName)) {
        defineCustomElement$c();
      }
      break;
    case "calcite-select":
      if (!customElements.get(tagName)) {
        defineCustomElement$b();
      }
      break;
    case "calcite-shell":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "calcite-slider":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "calcite-tooltip":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "map-draw-tools":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "map-layer-picker":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "map-select-tools":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "pdf-download":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "refine-selection":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "refine-selection-tools":
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
