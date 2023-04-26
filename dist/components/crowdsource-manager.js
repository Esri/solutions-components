/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { g as getLocaleComponentStrings } from './locale.js';
import { E as ELayoutMode } from './interfaces.js';
import { d as defineCustomElement$y } from './action.js';
import { d as defineCustomElement$x } from './action-bar.js';
import { d as defineCustomElement$w } from './action-group.js';
import { d as defineCustomElement$v } from './action-menu.js';
import { d as defineCustomElement$u } from './block.js';
import { d as defineCustomElement$t } from './button.js';
import { d as defineCustomElement$s } from './chip.js';
import { d as defineCustomElement$r } from './combobox.js';
import { d as defineCustomElement$q } from './combobox-item.js';
import { d as defineCustomElement$p } from './dropdown.js';
import { d as defineCustomElement$o } from './dropdown-group.js';
import { d as defineCustomElement$n } from './dropdown-item.js';
import { d as defineCustomElement$m } from './handle.js';
import { d as defineCustomElement$l } from './icon.js';
import { d as defineCustomElement$k } from './input.js';
import { d as defineCustomElement$j } from './label.js';
import { d as defineCustomElement$i } from './loader.js';
import { d as defineCustomElement$h } from './modal.js';
import { d as defineCustomElement$g } from './option.js';
import { d as defineCustomElement$f } from './panel.js';
import { d as defineCustomElement$e } from './pick-list.js';
import { d as defineCustomElement$d } from './pick-list-item.js';
import { d as defineCustomElement$c } from './popover.js';
import { d as defineCustomElement$b } from './progress.js';
import { d as defineCustomElement$a } from './scrim.js';
import { d as defineCustomElement$9 } from './select.js';
import { d as defineCustomElement$8 } from './shell.js';
import { d as defineCustomElement$7 } from './split-button.js';
import { d as defineCustomElement$6 } from './tooltip.js';
import { d as defineCustomElement$5 } from './edit-record-modal2.js';
import { d as defineCustomElement$4 } from './layer-table2.js';
import { d as defineCustomElement$3 } from './map-card2.js';
import { d as defineCustomElement$2 } from './map-layer-picker2.js';

const crowdsourceManagerCss = ":host{display:block;--calcite-label-margin-bottom:0px}.pad-top-51{padding-top:51px}.header-title{display:flex;float:left}.header-controls-label{display:flex;float:right}.header-controls{height:50px}.img-background{background-repeat:no-repeat;background-size:100% 100%;width:38px;height:26px}.grid-background{background-image:url('../../assets/data/images/grid.png')}.vertical-background{background-image:url('../../assets/data/images/horizontal.png')}.horizontal-background{background-image:url('../../assets/data/images/vertical.png')}.action-center{-webkit-box-align:center;-webkit-align-items:center;-ms-grid-row-align:center;align-items:center;align-content:center;justify-content:center}.background-transparent{background-color:transparent}.display-flex{display:flex}.header-text{font-size:var(--calcite-font-size-0);font-weight:var(--calcite-font-weight-medium);padding-inline:0.75rem;padding-block:0.875rem;line-height:1.25rem}.width-full{width:100%}.width-1-2{position:relative;width:50%}.width-1-3{position:relative;width:33.33%}.width-2-3{position:relative;width:66.66%}.width-0{width:0}.height-full{height:100%}.height-1-2{position:relative;height:50%}.height-0{height:0}.toggle-node{width:48px;height:48px}.overflow-hidden{overflow:hidden}.flex-column{flex-direction:column}.border{border-width:1px;border-style:solid;border-color:var(--calcite-ui-border-3)}.position-relative{position:relative}";

const CrowdsourceManager$1 = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.mapInfos = [];
    this._translations = undefined;
    this._layoutMode = ELayoutMode.GRID;
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
    return (h(Host, null, h("calcite-panel", { class: "width-full height-full", heading: this._translations.header }, h("div", { class: "display-flex", slot: "header-actions-end" }, h("div", { class: "header-text" }, "Layout"), this._getAction("grid-background", ELayoutMode.GRID, this._translations.grid), this._getAction("horizontal-background", ELayoutMode.VERTICAL, this._translations.horizontal), this._getAction("vertical-background", ELayoutMode.HORIZONTAL, this._translations.vertical)), this._getBody(this._layoutMode, this._panelOpen))));
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------
  _getAction(imgClass, layoutMode, tip) {
    return (h("div", null, h("calcite-action", { alignment: "center", appearance: "transparent", compact: false, id: imgClass, indicator: layoutMode === this._layoutMode, onClick: () => { this._setLayoutMode(layoutMode); }, text: "" }, h("div", { class: imgClass + " img-background" })), h("calcite-tooltip", { label: "", placement: "bottom", "reference-element": imgClass }, h("span", null, tip))));
  }
  _getDividerIcon(layoutMode, panelOpen) {
    let icon = "";
    switch (layoutMode) {
      case ELayoutMode.HORIZONTAL:
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
      case ELayoutMode.HORIZONTAL:
        sizeClass = `${panelOpen ? "height-1-2" : "height-0"} width-full position-relative`;
        break;
      case ELayoutMode.GRID:
        sizeClass = `height-full position-relative ${panelOpen ? "width-1-3" : "width-0"}`;
        break;
      case ELayoutMode.VERTICAL:
        sizeClass = `height-full position-relative ${panelOpen ? "width-1-2" : "width-0"}`;
        break;
    }
    return sizeClass;
  }
  _getTableSizeClass(layoutMode, panelOpen) {
    let sizeClass = "";
    switch (layoutMode) {
      case ELayoutMode.HORIZONTAL:
        sizeClass = `${panelOpen ? "height-1-2" : "height-full"} width-full display-flex flex-column`;
        break;
      case ELayoutMode.GRID:
        sizeClass = `${panelOpen ? "width-2-3" : "width-full"} height-full display-flex`;
        break;
      case ELayoutMode.VERTICAL:
        sizeClass = `${panelOpen ? "width-1-2" : "width-full"} height-full display-flex`;
        break;
    }
    return sizeClass;
  }
  _getBody(layoutMode, panelOpen) {
    const displayFlex = layoutMode === ELayoutMode.HORIZONTAL ? "" : "display-flex";
    return (h("calcite-shell", { class: "width-full height-full pad-top-51" }, h("div", { class: `width-full height-full ${displayFlex}` }, this._getMap(layoutMode, panelOpen), this._getTable(layoutMode, panelOpen))));
  }
  _getMap(layoutMode, panelOpen) {
    const mapSizeClass = this._getMapSizeClass(layoutMode, panelOpen);
    return (h("div", { class: `${mapSizeClass} overflow-hidden` }, h("div", { style: { "overflow": "hidden" } }, h("map-card", { mapInfos: this.mapInfos }))));
  }
  _getTable(layoutMode, panelOpen) {
    const tableSizeClass = this._getTableSizeClass(layoutMode, panelOpen);
    const icon = this._getDividerIcon(layoutMode, panelOpen);
    const tooltip = panelOpen ? this._translations.close : this._translations.open;
    const id = "toggle-layout";
    const toggleSizeClass = layoutMode === ELayoutMode.HORIZONTAL ? "divider-h" : "divider-w";
    return (h("div", { class: tableSizeClass }, h("div", { class: `border ${toggleSizeClass}` }, h("div", { class: "toggle-node" }, h("calcite-action", { class: "toggle-node", icon: icon, id: id, onClick: () => this._toggleLayout(), text: "" }), h("calcite-tooltip", { label: tooltip, placement: "bottom", "reference-element": id }, h("span", null, tooltip)))), h("div", { class: "width-full height-full" }, h("layer-table", { mapView: this === null || this === void 0 ? void 0 : this._mapView }))));
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
    const messages = await getLocaleComponentStrings(this.el);
    this._translations = messages[0];
  }
  get el() { return this; }
  static get style() { return crowdsourceManagerCss; }
}, [0, "crowdsource-manager", {
    "mapInfos": [16],
    "_translations": [32],
    "_layoutMode": [32],
    "_mapView": [32],
    "_panelOpen": [32]
  }, [[8, "mapChanged", "mapChanged"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["crowdsource-manager", "calcite-action", "calcite-action-bar", "calcite-action-group", "calcite-action-menu", "calcite-block", "calcite-button", "calcite-chip", "calcite-combobox", "calcite-combobox-item", "calcite-dropdown", "calcite-dropdown-group", "calcite-dropdown-item", "calcite-handle", "calcite-icon", "calcite-input", "calcite-label", "calcite-loader", "calcite-modal", "calcite-option", "calcite-panel", "calcite-pick-list", "calcite-pick-list-item", "calcite-popover", "calcite-progress", "calcite-scrim", "calcite-select", "calcite-shell", "calcite-split-button", "calcite-tooltip", "edit-record-modal", "layer-table", "map-card", "map-layer-picker"];
  components.forEach(tagName => { switch (tagName) {
    case "crowdsource-manager":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, CrowdsourceManager$1);
      }
      break;
    case "calcite-action":
      if (!customElements.get(tagName)) {
        defineCustomElement$y();
      }
      break;
    case "calcite-action-bar":
      if (!customElements.get(tagName)) {
        defineCustomElement$x();
      }
      break;
    case "calcite-action-group":
      if (!customElements.get(tagName)) {
        defineCustomElement$w();
      }
      break;
    case "calcite-action-menu":
      if (!customElements.get(tagName)) {
        defineCustomElement$v();
      }
      break;
    case "calcite-block":
      if (!customElements.get(tagName)) {
        defineCustomElement$u();
      }
      break;
    case "calcite-button":
      if (!customElements.get(tagName)) {
        defineCustomElement$t();
      }
      break;
    case "calcite-chip":
      if (!customElements.get(tagName)) {
        defineCustomElement$s();
      }
      break;
    case "calcite-combobox":
      if (!customElements.get(tagName)) {
        defineCustomElement$r();
      }
      break;
    case "calcite-combobox-item":
      if (!customElements.get(tagName)) {
        defineCustomElement$q();
      }
      break;
    case "calcite-dropdown":
      if (!customElements.get(tagName)) {
        defineCustomElement$p();
      }
      break;
    case "calcite-dropdown-group":
      if (!customElements.get(tagName)) {
        defineCustomElement$o();
      }
      break;
    case "calcite-dropdown-item":
      if (!customElements.get(tagName)) {
        defineCustomElement$n();
      }
      break;
    case "calcite-handle":
      if (!customElements.get(tagName)) {
        defineCustomElement$m();
      }
      break;
    case "calcite-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$l();
      }
      break;
    case "calcite-input":
      if (!customElements.get(tagName)) {
        defineCustomElement$k();
      }
      break;
    case "calcite-label":
      if (!customElements.get(tagName)) {
        defineCustomElement$j();
      }
      break;
    case "calcite-loader":
      if (!customElements.get(tagName)) {
        defineCustomElement$i();
      }
      break;
    case "calcite-modal":
      if (!customElements.get(tagName)) {
        defineCustomElement$h();
      }
      break;
    case "calcite-option":
      if (!customElements.get(tagName)) {
        defineCustomElement$g();
      }
      break;
    case "calcite-panel":
      if (!customElements.get(tagName)) {
        defineCustomElement$f();
      }
      break;
    case "calcite-pick-list":
      if (!customElements.get(tagName)) {
        defineCustomElement$e();
      }
      break;
    case "calcite-pick-list-item":
      if (!customElements.get(tagName)) {
        defineCustomElement$d();
      }
      break;
    case "calcite-popover":
      if (!customElements.get(tagName)) {
        defineCustomElement$c();
      }
      break;
    case "calcite-progress":
      if (!customElements.get(tagName)) {
        defineCustomElement$b();
      }
      break;
    case "calcite-scrim":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "calcite-select":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "calcite-shell":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "calcite-split-button":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "calcite-tooltip":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "edit-record-modal":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "layer-table":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "map-card":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "map-layer-picker":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}
defineCustomElement$1();

const CrowdsourceManager = CrowdsourceManager$1;
const defineCustomElement = defineCustomElement$1;

export { CrowdsourceManager, defineCustomElement };
