/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { h as EUpdateType } from './interfaces3.js';
import { s as state, E as EFileType } from './solution-store.js';
import { g as getLocaleComponentStrings } from './locale.js';
import { d as defineCustomElement$a } from './action.js';
import { d as defineCustomElement$9 } from './action-group.js';
import { d as defineCustomElement$8 } from './action-menu.js';
import { d as defineCustomElement$7 } from './button.js';
import { d as defineCustomElement$6 } from './icon.js';
import { d as defineCustomElement$5 } from './loader.js';
import { d as defineCustomElement$4 } from './pick-list-item.js';
import { d as defineCustomElement$3 } from './popover.js';
import { d as defineCustomElement$2 } from './value-list.js';
import { d as defineCustomElement$1 } from './value-list-item.js';

const solutionResourceItemCss = ":host{display:block;box-sizing:border-box;margin-left:0.75rem;margin-right:0.75rem;min-width:0;flex-grow:0;flex-shrink:1}:host-group-1-up>.block{flex-basis:calc(100% - 1.5rem);width:calc(100% - 1.5rem)}:host-group-2-up>.block{flex-basis:calc(50% - 1.5rem);width:calc(50% - 1.5rem)}:host-group-3-up>.block{flex-basis:calc(33.33333% - 1.5rem);width:calc(33.33333% - 1.5rem)}:host-group-4-up>.block{flex-basis:calc(25% - 1.5rem);width:calc(25% - 1.5rem)}:host-group-5-up>.block{flex-basis:calc(20% - 1.5rem);width:calc(20% - 1.5rem)}:host-group-6-up>.block{flex-basis:calc(16.66666% - 1.5rem);width:calc(16.66666% - 1.5rem)}:host-group-7-up>.block{flex-basis:calc(14.2857% - 1.5rem);width:calc(14.2857% - 1.5rem)}:host-group-8-up>.block{flex-basis:calc(12.5% - 1.5rem);width:calc(12.5% - 1.5rem)}.tablet-block-group-1-up>:host{flex-basis:calc(100% - 1.5rem);width:calc(100% - 1.5rem)}.tablet-block-group-2-up>:host{flex-basis:calc(50% - 1.5rem);width:calc(50% - 1.5rem)}.tablet-block-group-3-up>:host{flex-basis:calc(33.33333% - 1.5rem);width:calc(33.33333% - 1.5rem)}.tablet-block-group-4-up>:host{flex-basis:calc(25% - 1.5rem);width:calc(25% - 1.5rem)}.tablet-block-group-5-up>:host{flex-basis:calc(20% - 1.5rem);width:calc(20% - 1.5rem)}.tablet-block-group-6-up>:host{flex-basis:calc(16.66666% - 1.5rem);width:calc(16.66666% - 1.5rem)}.tablet-block-group-7-up>:host{flex-basis:calc(14.2857% - 1.5rem);width:calc(14.2857% - 1.5rem)}.tablet-block-group-8-up>:host{flex-basis:calc(12.5% - 1.5rem);width:calc(12.5% - 1.5rem)}.phone-block-group-1-up>:host{flex-basis:calc(100% - 1.5rem);width:calc(100% - 1.5rem)}.phone-block-group-2-up>:host{flex-basis:calc(50% - 1.5rem);width:calc(50% - 1.5rem)}.phone-block-group-3-up>:host{flex-basis:calc(33.33333% - 1.5rem);width:calc(33.33333% - 1.5rem)}.phone-block-group-4-up>:host{flex-basis:calc(25% - 1.5rem);width:calc(25% - 1.5rem)}.phone-block-group-5-up>:host{flex-basis:calc(20% - 1.5rem);width:calc(20% - 1.5rem)}.phone-block-group-6-up>:host{flex-basis:calc(16.66666% - 1.5rem);width:calc(16.66666% - 1.5rem)}.phone-block-group-7-up>:host{flex-basis:calc(14.2857% - 1.5rem);width:calc(14.2857% - 1.5rem)}.phone-block-group-8-up>:host{flex-basis:calc(12.5% - 1.5rem);width:calc(12.5% - 1.5rem)}.code-face :host{letter-spacing:0em;font-family:\"Consolas\", \"Andale Mono\", \"Lucida Console\", \"Monaco\", monospace;font-weight:400;font-style:normal}.code-face :host b,.code-face :host strong{font-weight:400}.code-italic :host{letter-spacing:0em;font-family:\"Consolas\", \"Andale Mono\", \"Lucida Console\", \"Monaco\", monospace;font-weight:400;font-style:italic}.code-italic :host b,.code-italic :host strong{font-weight:400}.resource-item{padding:1rem}.resource-button{-webkit-margin-end:1rem;margin-inline-end:1rem}.resource-progress{padding-top:1rem}.resources-container{border:1px #808080 solid}.margin-bottom-1{margin-bottom:1rem}";

const SolutionResourceItem = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this._removedResources = {};
    this.authentication = undefined;
    this.itemId = "";
    this.resourceFilePaths = [];
    this.resources = [];
    this._translations = undefined;
  }
  itemIdWatchHandler() {
    const item = state.getItemInfo(this.itemId);
    this.resourceFilePaths = item.resourceFilePaths;
    this.resources = item.resources.map(
    // False linting error
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    (path) => path.substring(path.lastIndexOf("/") + 1));
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   */
  componentWillLoad() {
    return this._getTranslations();
  }
  /**
   * Renders the component.
   */
  render() {
    const hasValidResources = this._hasValidResources();
    return (h(Host, null, h("div", { class: "resource-item" }, h("div", { class: "margin-bottom-1" }, h("calcite-button", { appearance: "solid", class: "resource-button", color: "blue", onClick: () => this._addNewResource() }, this._translations.addResource), h("calcite-button", { appearance: "solid", color: "blue", disabled: !hasValidResources, onClick: () => this._downloadAll() }, this._translations.downloadAll)), h("div", { class: "resources-container", style: { display: hasValidResources ? "inherit" : "none" } }, this._renderResourceList()))));
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
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  /**
   * Render resources while avoiding thumbnail resoures that are managed by solution-item
   *
   */
  _renderResourceList() {
    return (h("calcite-value-list", { multiple: true }, this.resourceFilePaths.reduce((prev, cur) => {
      if (cur.type !== EFileType.Thumbnail) {
        prev.push(this._renderResource(cur));
      }
      return prev;
    }, [])));
  }
  /**
   * Render the resource and supporting actions for download/update/delete/(reset..if deleted)
   *
   * @param resource the filename and url used to interact with the resource
   */
  _renderResource(resource) {
    const resettable = resource.updateType === EUpdateType.Remove;
    const fullname = resource.folder ? resource.folder + "/" + resource.filename : resource.filename;
    return (h("calcite-value-list-item", { class: resettable ? "disabled" : "", label: fullname, nonInteractive: true, value: resource.url }, h("calcite-action-group", { "expand-disabled": "true", layout: "horizontal", slot: "actions-end" }, h("calcite-action", { disabled: resettable, icon: "download", label: this._translations.download, onClick: () => this._download(resource.url, resource.filename), scale: "m", text: this._translations.download, title: this._translations.download }), h("calcite-action", { disabled: resettable, icon: "upload-to", label: this._translations.update, onClick: () => this._upload(resource), scale: "m", text: this._translations.update, title: this._translations.update }), h("calcite-action", { disabled: resettable, icon: "trash", label: this._translations.delete, onClick: () => this._delete(resource), scale: "m", text: this._translations.delete, title: this._translations.delete }), resettable ? h("calcite-action", { icon: "reset", label: this._translations.reset, onClick: () => this._reset(resource.filename), scale: "m", text: this._translations.reset, title: this._translations.reset }) : h("div", { class: "display-none" }))));
  }
  /**
   * Adds the name to the deleted array so it will be skipped while rendering
   *  but still exist if the user chooses to reset
   *
   * @param resource the resource to be updated
   */
  _delete(resource) {
    resource.updateType = EUpdateType.Remove;
    this.resourceFilePaths = [...this.resourceFilePaths]; // to trigger refresh
    this._updateStore();
  }
  /**
   * Remove the name from the deleted array so it will again be rendered
   *
   * @param name the name to be added to the deleted array
   */
  _reset(name) {
    // need to make sure I know if this reset is from the source or a new one
    // Because the item's `resources` array is not updated until (and if) the solution is saved,
    // we can use it for the reset info
    this.resources.some(resourceName => resourceName === name) ?
      // Undo removing an existing resource
      this.resourceFilePaths = this.resourceFilePaths.map(p => {
        if (p.filename === name) {
          p.updateType = EUpdateType.None;
        }
        return p;
      }) :
      // Undo cancelling the adding of a resource
      this.resourceFilePaths = this.resourceFilePaths.map(p => {
        if (p.filename === name) {
          p.updateType = EUpdateType.Add;
        }
        return p;
      });
    this._updateStore();
  }
  /**
   * Download all of the templates resources
   *
   */
  _downloadAll() {
    this.resourceFilePaths.forEach((resource) => {
      this._download(resource.url, resource.filename);
    });
  }
  /**
   * Download the current resource
   *
   * @param url the resource url
   * @param name the resource name
   */
  _download(url, name) {
    // files that have been added manually do not need to be requested from the item
    if (url.startsWith("blob")) {
      this.downloadFile(url, name);
    }
    else {
      const _url = `${url}?token=${this.authentication.token}`;
      void this.fetchAndDownload(_url, name);
    }
  }
  /**
   * Dynamically creates an anchor and downloads the file
   *
   * @param url the url of the resource
   * @param name the name of the resource
   */
  downloadFile(url, name) {
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    link.target = "_blank";
    link.click();
  }
  /**
   * Check if the template resources have any non-thumbnail resources
   *
   * @returns true if we have data resources and false if only thumbnail
   */
  _hasValidResources() {
    return this.resourceFilePaths.some(r => r.url.indexOf("_info_thumbnail") < 0);
  }
  /**
   * Fetches and downloads the resource from the solution
   *
   * @param url the url of the resource
   * @param name the name of the resource
   */
  async fetchAndDownload(url, name) {
    const image = await fetch(url);
    const b = await image.blob();
    const bURL = URL.createObjectURL(b);
    this.downloadFile(bURL, name);
  }
  /**
   * Create an input element to support the uploading of the resource and upload the resource
   *
   * @param resource the resource to be updated
   */
  _upload(resource) {
    const _input = document.createElement("input");
    _input.classList.add("display-none");
    _input.onchange = this._updateResource.bind(this, resource);
    _input.type = "file";
    _input.click();
  }
  /**
   * Create an input element to support the uploading of a resource and add the new resource
   *
   */
  _addNewResource() {
    const _input = document.createElement("input");
    _input.classList.add("display-none");
    _input.onchange = this._add.bind(this);
    _input.type = "file";
    _input.click();
  }
  /**
   * Replace the resource file path when update action is used
   *
   * @param resourcePath the resource to be updated
   * @param event the input event that contains the file
   */
  _updateResource(resourcePath, event) {
    const files = event.target.files;
    if (files && files[0]) {
      resourcePath.blob = files[0];
      resourcePath.updateType = EUpdateType.Update;
      this._updateStore();
    }
  }
  /**
   * Add the new resource to the resource file paths
   *
   * @param event the inputs event that contains the new file
   */
  _add(event) {
    const files = event.target.files;
    if (files && files[0]) {
      const url = URL.createObjectURL(files[0]);
      const filename = files[0].name;
      // Add the item if it's not already in the resource file paths list
      if (!this.resourceFilePaths.some(r => r.filename === filename && r.url === url)) {
        this.resourceFilePaths = [
          ...this.resourceFilePaths,
          {
            url,
            type: EFileType.Data,
            folder: undefined,
            filename,
            blob: files[0],
            updateType: EUpdateType.Add
          }
        ];
        this._updateStore();
      }
    }
  }
  /**
   * Add or remove the value from the store
   */
  _updateStore() {
    const item = state.getItemInfo(this.itemId);
    item.resourceFilePaths = this.resourceFilePaths;
    state.setItemInfo(item);
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
    "itemId": ["itemIdWatchHandler"]
  }; }
  static get style() { return solutionResourceItemCss; }
}, [1, "solution-resource-item", {
    "authentication": [1040],
    "itemId": [1537, "item-id"],
    "resourceFilePaths": [32],
    "resources": [32],
    "_translations": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["solution-resource-item", "calcite-action", "calcite-action-group", "calcite-action-menu", "calcite-button", "calcite-icon", "calcite-loader", "calcite-pick-list-item", "calcite-popover", "calcite-value-list", "calcite-value-list-item"];
  components.forEach(tagName => { switch (tagName) {
    case "solution-resource-item":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, SolutionResourceItem);
      }
      break;
    case "calcite-action":
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
    case "calcite-button":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "calcite-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "calcite-loader":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "calcite-pick-list-item":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "calcite-popover":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "calcite-value-list":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "calcite-value-list-item":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}
defineCustomElement();

export { SolutionResourceItem as S, defineCustomElement as d };