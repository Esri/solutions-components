/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { s as state } from './solution-store.js';
import { g as getLocaleComponentStrings } from './locale.js';
import { d as defineCustomElement$3 } from './label.js';
import { d as defineCustomElement$2 } from './switch.js';
import { d as defineCustomElement$1 } from './solution-item-icon2.js';

const solutionItemSharingCss = ":host{display:block;box-sizing:border-box;margin-left:0.75rem;margin-right:0.75rem;min-width:0;flex-grow:0;flex-shrink:1}:host-group-1-up>.block{flex-basis:calc(100% - 1.5rem);width:calc(100% - 1.5rem)}:host-group-2-up>.block{flex-basis:calc(50% - 1.5rem);width:calc(50% - 1.5rem)}:host-group-3-up>.block{flex-basis:calc(33.33333% - 1.5rem);width:calc(33.33333% - 1.5rem)}:host-group-4-up>.block{flex-basis:calc(25% - 1.5rem);width:calc(25% - 1.5rem)}:host-group-5-up>.block{flex-basis:calc(20% - 1.5rem);width:calc(20% - 1.5rem)}:host-group-6-up>.block{flex-basis:calc(16.66666% - 1.5rem);width:calc(16.66666% - 1.5rem)}:host-group-7-up>.block{flex-basis:calc(14.2857% - 1.5rem);width:calc(14.2857% - 1.5rem)}:host-group-8-up>.block{flex-basis:calc(12.5% - 1.5rem);width:calc(12.5% - 1.5rem)}.tablet-block-group-1-up>:host{flex-basis:calc(100% - 1.5rem);width:calc(100% - 1.5rem)}.tablet-block-group-2-up>:host{flex-basis:calc(50% - 1.5rem);width:calc(50% - 1.5rem)}.tablet-block-group-3-up>:host{flex-basis:calc(33.33333% - 1.5rem);width:calc(33.33333% - 1.5rem)}.tablet-block-group-4-up>:host{flex-basis:calc(25% - 1.5rem);width:calc(25% - 1.5rem)}.tablet-block-group-5-up>:host{flex-basis:calc(20% - 1.5rem);width:calc(20% - 1.5rem)}.tablet-block-group-6-up>:host{flex-basis:calc(16.66666% - 1.5rem);width:calc(16.66666% - 1.5rem)}.tablet-block-group-7-up>:host{flex-basis:calc(14.2857% - 1.5rem);width:calc(14.2857% - 1.5rem)}.tablet-block-group-8-up>:host{flex-basis:calc(12.5% - 1.5rem);width:calc(12.5% - 1.5rem)}.phone-block-group-1-up>:host{flex-basis:calc(100% - 1.5rem);width:calc(100% - 1.5rem)}.phone-block-group-2-up>:host{flex-basis:calc(50% - 1.5rem);width:calc(50% - 1.5rem)}.phone-block-group-3-up>:host{flex-basis:calc(33.33333% - 1.5rem);width:calc(33.33333% - 1.5rem)}.phone-block-group-4-up>:host{flex-basis:calc(25% - 1.5rem);width:calc(25% - 1.5rem)}.phone-block-group-5-up>:host{flex-basis:calc(20% - 1.5rem);width:calc(20% - 1.5rem)}.phone-block-group-6-up>:host{flex-basis:calc(16.66666% - 1.5rem);width:calc(16.66666% - 1.5rem)}.phone-block-group-7-up>:host{flex-basis:calc(14.2857% - 1.5rem);width:calc(14.2857% - 1.5rem)}.phone-block-group-8-up>:host{flex-basis:calc(12.5% - 1.5rem);width:calc(12.5% - 1.5rem)}.code-face :host{letter-spacing:0em;font-family:\"Consolas\", \"Andale Mono\", \"Lucida Console\", \"Monaco\", monospace;font-weight:400;font-style:normal}.code-face :host b,.code-face :host strong{font-weight:400}.code-italic :host{letter-spacing:0em;font-family:\"Consolas\", \"Andale Mono\", \"Lucida Console\", \"Monaco\", monospace;font-weight:400;font-style:italic}.code-italic :host b,.code-italic :host strong{font-weight:400}.container-border{padding:1rem}.icon-text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}";

const SolutionItemSharing = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.groupId = "";
    this._translations = undefined;
    this.sharing = [];
  }
  itemIdWatchHandler() {
    const itemEdit = state.getItemInfo(this.groupId);
    this.sharing = itemEdit.groupDetails;
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   */
  async componentWillLoad() {
    return this._getTranslations();
  }
  /**
   * Renders the component.
   */
  render() {
    return (h(Host, null, h("div", { class: "container-border" }, h("calcite-label", null, this._translations.groupInfo), this._renderItems(this.sharing))));
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  //
  //  Public Methods (async)
  //
  //--------------------------------------------------------------------------
  async getShareInfo() {
    return this.sharing;
  }
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  /**
   * Render share options based on the list of share details
   *
   * @param objs list of IItemShare objects that are used to expose and store share info for the solutions items
   */
  _renderItems(objs) {
    return objs && objs.length > 0
      ? objs.map(item => {
        return (h("calcite-label", { layout: "inline" }, h("calcite-switch", { checked: item.shareItem, id: item.id, name: "setting", onCalciteSwitchChange: (event) => this._updateItem(event), scale: "m", value: "enabled" }), h("solution-item-icon", { type: item.type, typeKeywords: item.typeKeywords }), h("span", { class: "icon-text", title: item.title }, item.title)));
      })
      : null;
  }
  /**
   * Update the items share prop based on the switch state
   *
   * @param event onCalciteSwitchChange event
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  _updateItem(event) {
    const id = event.target.id;
    this.sharing = this.sharing.map((itemShare) => {
      if (itemShare.id === id) {
        // update the item
        itemShare.shareItem = event.detail.switched;
        // update the item in the store
        const itemEdit = state.getItemInfo(id);
        if (itemShare.shareItem) {
          // Add the group to the item if it's not already there
          if (!itemEdit.groups) {
            itemEdit.groups = [this.groupId];
          }
          else if (itemEdit.groups.indexOf(this.groupId) < 0) {
            itemEdit.groups.push(this.groupId);
          }
        }
        else {
          // Remove the group from the item if it's there
          if (itemEdit.groups) {
            const i = itemEdit.groups.indexOf(this.groupId);
            if (i > -1) {
              itemEdit.groups.splice(i, 1);
            }
          }
        }
        state.setItemInfo(itemEdit);
      }
      return itemShare;
    });
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
    "groupId": ["itemIdWatchHandler"]
  }; }
  static get style() { return solutionItemSharingCss; }
}, [1, "solution-item-sharing", {
    "groupId": [1537, "group-id"],
    "_translations": [32],
    "sharing": [32],
    "getShareInfo": [64]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["solution-item-sharing", "calcite-label", "calcite-switch", "solution-item-icon"];
  components.forEach(tagName => { switch (tagName) {
    case "solution-item-sharing":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, SolutionItemSharing);
      }
      break;
    case "calcite-label":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "calcite-switch":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "solution-item-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}
defineCustomElement();

export { SolutionItemSharing as S, defineCustomElement as d };
