/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-6654298b.js');
const locale = require('./locale-b113c6b2.js');
const interfaces = require('./interfaces-2b40fc8e.js');
require('./_commonjsHelpers-384729db.js');

const crowdsourceManagerCss = ":host{display:block;--calcite-label-margin-bottom:0px}.pad-top-51{padding-top:51px}.header-title{display:flex;float:left}.header-controls-label{display:flex;float:right}.header-controls{height:50px}.img-background{background-repeat:no-repeat;background-size:100% 100%;width:38px;height:26px}.grid-background{background-image:url('../../assets/data/images/grid.png')}.vertical-background{background-image:url('../../assets/data/images/horizontal.png')}.horizontal-background{background-image:url('../../assets/data/images/vertical.png')}.action-center{-webkit-box-align:center;-webkit-align-items:center;-ms-grid-row-align:center;align-items:center;align-content:center;justify-content:center}.background-transparent{background-color:transparent}.display-flex{display:flex}.header-text{font-size:var(--calcite-font-size-0);font-weight:var(--calcite-font-weight-medium);padding-inline:0.75rem;padding-block:0.875rem;line-height:1.25rem}.width-full{width:100%}.width-1-2{position:relative;width:50%}.width-1-3{position:relative;width:33.33%}.width-2-3{position:relative;width:66.66%}.width-0{width:0}.height-full{height:100%}.height-1-2{position:relative;height:50%}.height-0{height:0}.toggle-node{width:48px;height:48px}.overflow-hidden{overflow:hidden}.flex-column{flex-direction:column}.border{border-width:1px;border-style:solid;border-color:var(--calcite-ui-border-3)}.position-relative{position:relative}";

const CrowdsourceManager = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.mapInfos = [];
    this._translations = undefined;
    this._layoutMode = interfaces.ELayoutMode.GRID;
    this._mapView = undefined;
    this._panelOpen = true;
  }
  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------
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
  //--------------------------------------------------------------------------
  //
  //  Events (public)
  //
  //--------------------------------------------------------------------------
  /**
   * Handle changes to the buffer distance value
   */
  mapChanged(event) {
    this._mapView = event.detail;
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (lifecycle)
  //
  //--------------------------------------------------------------------------
  async componentWillLoad() {
    await this._getTranslations();
  }
  render() {
    return (index.h(index.Host, null, index.h("calcite-panel", { class: "width-full height-full", heading: this._translations.header }, index.h("div", { class: "display-flex", slot: "header-actions-end" }, index.h("div", { class: "header-text" }, "Layout"), this._getAction("grid-background", interfaces.ELayoutMode.GRID, this._translations.grid), this._getAction("horizontal-background", interfaces.ELayoutMode.VERTICAL, this._translations.horizontal), this._getAction("vertical-background", interfaces.ELayoutMode.HORIZONTAL, this._translations.vertical)), this._getBody(this._layoutMode, this._panelOpen))));
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------
  _getAction(imgClass, layoutMode, tip) {
    return (index.h("div", null, index.h("calcite-action", { alignment: "center", appearance: "transparent", compact: false, id: imgClass, indicator: layoutMode === this._layoutMode, onClick: () => { this._setLayoutMode(layoutMode); }, text: "" }, index.h("div", { class: imgClass + " img-background" })), index.h("calcite-tooltip", { label: "", placement: "bottom", "reference-element": imgClass }, index.h("span", null, tip))));
  }
  _getDividerIcon(layoutMode, panelOpen) {
    let icon = "";
    switch (layoutMode) {
      case interfaces.ELayoutMode.HORIZONTAL:
        icon = panelOpen ? "chevrons-up" : "chevrons-down";
        break;
      default:
        icon = panelOpen ? "chevrons-left" : "chevrons-right";
        break;
    }
    return icon;
  }
  _getMapSizeClass(layoutMode, panelOpen) {
    let sizeClass = "";
    switch (layoutMode) {
      case interfaces.ELayoutMode.HORIZONTAL:
        sizeClass = `${panelOpen ? "height-1-2" : "height-0"} width-full position-relative`;
        break;
      case interfaces.ELayoutMode.GRID:
        sizeClass = `height-full position-relative ${panelOpen ? "width-1-3" : "width-0"}`;
        break;
      case interfaces.ELayoutMode.VERTICAL:
        sizeClass = `height-full position-relative ${panelOpen ? "width-1-2" : "width-0"}`;
        break;
    }
    return sizeClass;
  }
  _getTableSizeClass(layoutMode, panelOpen) {
    let sizeClass = "";
    switch (layoutMode) {
      case interfaces.ELayoutMode.HORIZONTAL:
        sizeClass = `${panelOpen ? "height-1-2" : "height-full"} width-full display-flex flex-column`;
        break;
      case interfaces.ELayoutMode.GRID:
        sizeClass = `${panelOpen ? "width-2-3" : "width-full"} height-full display-flex`;
        break;
      case interfaces.ELayoutMode.VERTICAL:
        sizeClass = `${panelOpen ? "width-1-2" : "width-full"} height-full display-flex`;
        break;
    }
    return sizeClass;
  }
  _getBody(layoutMode, panelOpen) {
    const displayFlex = layoutMode === interfaces.ELayoutMode.HORIZONTAL ? "" : "display-flex";
    return (index.h("calcite-shell", { class: "width-full height-full pad-top-51" }, index.h("div", { class: `width-full height-full ${displayFlex}` }, this._getMap(layoutMode, panelOpen), this._getTable(layoutMode, panelOpen))));
  }
  _getMap(layoutMode, panelOpen) {
    const mapSizeClass = this._getMapSizeClass(layoutMode, panelOpen);
    return (index.h("div", { class: `${mapSizeClass} overflow-hidden` }, index.h("div", { style: { "overflow": "hidden" } }, index.h("map-card", { mapInfos: this.mapInfos }))));
  }
  _getTable(layoutMode, panelOpen) {
    const tableSizeClass = this._getTableSizeClass(layoutMode, panelOpen);
    const icon = this._getDividerIcon(layoutMode, panelOpen);
    const tooltip = panelOpen ? this._translations.close : this._translations.open;
    const id = "toggle-layout";
    const toggleSizeClass = layoutMode === interfaces.ELayoutMode.HORIZONTAL ? "divider-h" : "divider-w";
    return (index.h("div", { class: tableSizeClass }, index.h("div", { class: `border ${toggleSizeClass}` }, index.h("div", { class: "toggle-node" }, index.h("calcite-action", { class: "toggle-node", icon: icon, id: id, onClick: () => this._toggleLayout(), text: "" }), index.h("calcite-tooltip", { label: tooltip, placement: "bottom", "reference-element": id }, index.h("span", null, tooltip)))), index.h("div", { class: "width-full height-full" }, index.h("layer-table", { mapView: this === null || this === void 0 ? void 0 : this._mapView }))));
  }
  _setLayoutMode(layoutMode) {
    this._layoutMode = layoutMode;
  }
  _toggleLayout() {
    this._panelOpen = !this._panelOpen;
  }
  /**
   * Fetches the component's translations
   *
   * @returns Promise when complete
   * @protected
   */
  async _getTranslations() {
    const messages = await locale.getLocaleComponentStrings(this.el);
    this._translations = messages[0];
  }
  get el() { return index.getElement(this); }
};
CrowdsourceManager.style = crowdsourceManagerCss;

exports.crowdsource_manager = CrowdsourceManager;
