/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { g as getLocaleComponentStrings } from './locale.js';
import { d as defineCustomElement$b } from './action.js';
import { d as defineCustomElement$a } from './action-bar.js';
import { d as defineCustomElement$9 } from './action-group.js';
import { d as defineCustomElement$8 } from './action-menu.js';
import { d as defineCustomElement$7 } from './icon.js';
import { d as defineCustomElement$6 } from './label.js';
import { d as defineCustomElement$5 } from './loader.js';
import { d as defineCustomElement$4 } from './popover.js';
import { d as defineCustomElement$3 } from './shell.js';
import { d as defineCustomElement$2 } from './tooltip.js';

const crowdsourceManagerCss = ":host{display:block;--calcite-label-margin-bottom:0px}.header{width:100%;height:50px;background-color:var(--calcite-ui-foreground-2)}.header-title{display:flex;float:left}.header-controls-label{display:flex;float:right}.header-controls{height:50px}.img-background{background-repeat:no-repeat;background-size:100% 100%;width:38px;height:26px}.grid-background{background-image:url('../../assets/data/images/grid.png')}.horizontal-background{background-image:url('../../assets/data/images/horizontal.png')}.vertical-background{background-image:url('../../assets/data/images/vertical.png')}.action-center{-webkit-box-align:center;-webkit-align-items:center;-ms-grid-row-align:center;align-items:center;align-content:center;justify-content:center}.background-transparent{background-color:transparent}";

const CrowdsourceManager$1 = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this._translations = undefined;
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
  //--------------------------------------------------------------------------
  //
  //  Functions (lifecycle)
  //
  //--------------------------------------------------------------------------
  async componentWillLoad() {
    await this._getTranslations();
  }
  render() {
    return (h(Host, null, h("div", null, h("calcite-shell", null, h("div", { class: "header", slot: 'header' }, h("calcite-label", { class: "header-title" }, this._translations.header), h("calcite-label", { class: "header-controls-label", layout: "inline" }, this._translations.layout, h("calcite-action-bar", { class: "header-controls", "expand-disabled": true, layout: "horizontal" }, this._getActionGroup("grid-background"), this._getActionGroup("horizontal-background"), this._getActionGroup("vertical-background"))))))));
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------
  _getActionGroup(imgClass) {
    return (h("div", { class: "action-center background-transparent" }, h("calcite-action", { alignment: "center", appearance: "transparent", compact: false, onClick: () => { this._updateLayout(); }, text: "" }, h("div", { class: imgClass + " img-background" })), h("calcite-tooltip", { label: "", placement: "bottom" }, h("span", null, "tip"))));
  }
  _updateLayout() {
    console.log("A");
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
}, [1, "crowdsource-manager", {
    "_translations": [32]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["crowdsource-manager", "calcite-action", "calcite-action-bar", "calcite-action-group", "calcite-action-menu", "calcite-icon", "calcite-label", "calcite-loader", "calcite-popover", "calcite-shell", "calcite-tooltip"];
  components.forEach(tagName => { switch (tagName) {
    case "crowdsource-manager":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, CrowdsourceManager$1);
      }
      break;
    case "calcite-action":
      if (!customElements.get(tagName)) {
        defineCustomElement$b();
      }
      break;
    case "calcite-action-bar":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "calcite-action-group":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "calcite-action-menu":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "calcite-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "calcite-label":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "calcite-loader":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "calcite-popover":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "calcite-shell":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "calcite-tooltip":
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
