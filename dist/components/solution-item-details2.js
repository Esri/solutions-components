/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { s as state } from './solution-store.js';
import { g as getLocaleComponentStrings } from './locale.js';
import { d as defineCustomElement$4 } from './icon.js';
import { d as defineCustomElement$3 } from './input.js';
import { d as defineCustomElement$2 } from './label.js';
import { d as defineCustomElement$1 } from './progress.js';

const solutionItemDetailsCss = ".inputBottomSeparation{margin-left:0px;margin-right:0px;margin-top:0px;margin-bottom:1.5rem}.icon-inline--on-left,.icon-inline--on-right{display:inline;vertical-align:middle;-webkit-margin-end:0.375rem;margin-inline-end:0.375rem;fill:#0079c1}.scale-down{-o-object-fit:scale-down;object-fit:scale-down}.img-container{display:inline;-webkit-margin-end:1rem;margin-inline-end:1rem;max-width:363px}.summary-count-container{display:inline;flex-grow:1;-webkit-margin-start:0.75rem;margin-inline-start:0.75rem}.snippet-count-container{width:calc(100vw - 363px)}.parent-container{max-width:100%;padding:1rem}label{position:relative;margin-left:0px;margin-right:0px;margin-top:0px;margin-bottom:1.5rem;display:block;min-width:-moz-min-content;min-width:min-content;box-sizing:border-box;margin-left:0.75rem;margin-right:0.75rem;min-width:0;flex-grow:0;flex-shrink:1}label-group-1-up>.block{flex-basis:calc(100% - 1.5rem);width:calc(100% - 1.5rem)}label-group-2-up>.block{flex-basis:calc(50% - 1.5rem);width:calc(50% - 1.5rem)}label-group-3-up>.block{flex-basis:calc(33.33333% - 1.5rem);width:calc(33.33333% - 1.5rem)}label-group-4-up>.block{flex-basis:calc(25% - 1.5rem);width:calc(25% - 1.5rem)}label-group-5-up>.block{flex-basis:calc(20% - 1.5rem);width:calc(20% - 1.5rem)}label-group-6-up>.block{flex-basis:calc(16.66666% - 1.5rem);width:calc(16.66666% - 1.5rem)}label-group-7-up>.block{flex-basis:calc(14.2857% - 1.5rem);width:calc(14.2857% - 1.5rem)}label-group-8-up>.block{flex-basis:calc(12.5% - 1.5rem);width:calc(12.5% - 1.5rem)}.tablet-block-group-1-up>label{flex-basis:calc(100% - 1.5rem);width:calc(100% - 1.5rem)}.tablet-block-group-2-up>label{flex-basis:calc(50% - 1.5rem);width:calc(50% - 1.5rem)}.tablet-block-group-3-up>label{flex-basis:calc(33.33333% - 1.5rem);width:calc(33.33333% - 1.5rem)}.tablet-block-group-4-up>label{flex-basis:calc(25% - 1.5rem);width:calc(25% - 1.5rem)}.tablet-block-group-5-up>label{flex-basis:calc(20% - 1.5rem);width:calc(20% - 1.5rem)}.tablet-block-group-6-up>label{flex-basis:calc(16.66666% - 1.5rem);width:calc(16.66666% - 1.5rem)}.tablet-block-group-7-up>label{flex-basis:calc(14.2857% - 1.5rem);width:calc(14.2857% - 1.5rem)}.tablet-block-group-8-up>label{flex-basis:calc(12.5% - 1.5rem);width:calc(12.5% - 1.5rem)}.phone-block-group-1-up>label{flex-basis:calc(100% - 1.5rem);width:calc(100% - 1.5rem)}.phone-block-group-2-up>label{flex-basis:calc(50% - 1.5rem);width:calc(50% - 1.5rem)}.phone-block-group-3-up>label{flex-basis:calc(33.33333% - 1.5rem);width:calc(33.33333% - 1.5rem)}.phone-block-group-4-up>label{flex-basis:calc(25% - 1.5rem);width:calc(25% - 1.5rem)}.phone-block-group-5-up>label{flex-basis:calc(20% - 1.5rem);width:calc(20% - 1.5rem)}.phone-block-group-6-up>label{flex-basis:calc(16.66666% - 1.5rem);width:calc(16.66666% - 1.5rem)}.phone-block-group-7-up>label{flex-basis:calc(14.2857% - 1.5rem);width:calc(14.2857% - 1.5rem)}.phone-block-group-8-up>label{flex-basis:calc(12.5% - 1.5rem);width:calc(12.5% - 1.5rem)}.code-face label{letter-spacing:0em;font-family:\"Consolas\", \"Andale Mono\", \"Lucida Console\", \"Monaco\", monospace;font-weight:400;font-style:normal}.code-face label b,.code-face label strong{font-weight:400}.code-italic label{letter-spacing:0em;font-family:\"Consolas\", \"Andale Mono\", \"Lucida Console\", \"Monaco\", monospace;font-weight:400;font-style:italic}.code-italic label b,.code-italic label strong{font-weight:400}";

const SolutionItemDetails = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.itemId = "";
    this.itemDetails = {
      accessInformation: "",
      description: "",
      licenseInfo: "",
      snippet: "",
      tags: [],
      title: ""
    };
    this.itemEdit = undefined;
    this._translations = undefined;
    this.thumbnail = undefined;
    this.thumbnailContainer = undefined;
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
  async componentWillRender() {
    this.itemEdit = state.getItemInfo(this.itemId);
    if (this.itemEdit) {
      this.itemDetails = this.itemEdit.item;
      this.itemType = this.itemDetails.type;
    }
    return Promise.resolve();
  }
  /**
   * Renders the component.
   */
  render() {
    return (h(Host, null, h("div", { class: "parent-container" }, h("div", { class: "inputBottomSeparation" }, h("calcite-input", { id: "item-title", value: this.itemDetails.title })), h("div", { class: "inputBottomSeparation" }, h("input", { accept: ".jpg,.gif,.png,image/jpg,image/gif,image/png", class: "display-none", onChange: (event) => (this._updateThumbnail(event)), ref: (el) => (this.browseForThumbnail = el), type: "file" }), h("button", { class: "font-size--3 btn-link inline-block trailer-quarter", onClick: () => this._getThumbnail() }, h("svg", { class: "icon-inline icon-inline--on-left", height: "16", viewBox: "0 0 16 16", width: "16" }, h("path", { d: "M14.792 2.666l-1.414-1.413a.965.965 0 0 0-1.385-.03l-1.444 1.444-8.763 8.72L.03 15.481a.371.371 0 0 0 .488.488l4.096-1.756 8.763-8.72-.001-.001.002.002 1.443-1.444a.965.965 0 0 0-.03-1.385zM1.569 14.431l.554-1.293.74.739zm2.338-.924l-1.414-1.414 7.963-7.92 1.414 1.415zm8.67-8.626l-1.413-1.414 1.29-1.29a.306.306 0 0 1 .433 0l.981.98a.306.306 0 0 1 0 .433z" })), this._translations.editThumbnail), h("div", { class: "flex" }, h("div", { class: "img-container", ref: (el) => (this.thumbnailContainer = el) }, h("img", { class: "scale-down", height: "133", id: "item-thumbnail", ref: (el) => (this.thumbnail = el), width: "200" })), h("div", { class: "snippet-count-container" }, h("calcite-input", { id: "item-snippet", maxLength: 250, type: "textarea", value: this.itemDetails.snippet }), h("label", { class: "font-size--3", id: "item-snippet-count", ref: (el) => (this.itemSnippetCount = el) })))), h("calcite-label", null, this._translations.description, h("label", { id: "item-description-label" }, h("calcite-input", { id: "item-description", type: "textarea", value: this.itemDetails.description }))), h("calcite-label", null, this._translations.tags, h("label", { id: "item-tags-label" }, h("calcite-input", { id: "item-tags", value: (this.itemDetails.tags && Array.isArray(this.itemDetails.tags) ? this.itemDetails.tags : [this.itemDetails.tags]).join(",") }))), this.itemType !== "Group" ? h("calcite-label", null, this._translations.credits, h("label", { id: "item-credits-label" }, h("calcite-input", { id: "item-credits", value: this.itemDetails.accessInformation }))) : null, this.itemType !== "Group" ? h("calcite-label", null, h("label", { id: "item-terms-label" }, this._translations.termsOfUse, h("calcite-input", { id: "item-terms", type: "textarea", value: this.itemDetails.licenseInfo }))) : null)));
  }
  componentDidRender() {
    this._loadThumb();
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  /**
   * Updates the component's value with changes to the input fields.
   */
  inputReceivedHandler(event) {
    switch (event.target.id) {
      case "item-title":
        this.itemDetails.title = event.target.value;
        this._updateStore();
        break;
      case "item-snippet":
        if (event.target.value.length > 250) {
          event.target.value = event.target.value.substring(0, 250);
        }
        this.itemDetails.snippet = event.target.value;
        this._updateLengthLabel(this.itemDetails.snippet);
        this._updateStore();
        break;
      case "item-description":
        this.itemDetails.description = event.target.value;
        this._updateStore();
        break;
      case "item-tags":
        this.itemDetails.tags = event.target.value;
        this._updateStore();
        break;
      case "item-credits":
        this.itemDetails.accessInformation = event.target.value;
        this._updateStore();
        break;
      case "item-terms":
        this.itemDetails.licenseInfo = event.target.value;
        this._updateStore();
        break;
    }
  }
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
   * Opens image file browse dialog.
   *
   */
  _getThumbnail() {
    this.browseForThumbnail.click();
  }
  /**
   * Load the templates thumbnail
   *
   */
  _loadThumb() {
    var _a;
    if (this.thumbnail && ((_a = this.itemEdit) === null || _a === void 0 ? void 0 : _a.thumbnail)) {
      // Show the thumbnail
      this.thumbnail.src = URL.createObjectURL(this.itemEdit.thumbnail);
      this.thumbnailContainer.classList.remove("empty-box");
      this.thumbnail.classList.remove("display-none");
    }
    else {
      // Replace the thumbnail with an empty box
      this.thumbnailContainer.classList.add("empty-box");
      this.thumbnail.classList.add("display-none");
    }
  }
  /**
   * Updates the length label to reflect the current number of characters
   * relative to the max number of characters supported.
   *
   * @param phrase the current phrase from the control
   */
  _updateLengthLabel(phrase) {
    this.itemSnippetCount.innerText =
      this._translations.snippetCountPattern.replace("{{n}}", phrase.length.toString());
  }
  /**
   * Add or remove the value from the store
   */
  _updateStore() {
    this.itemEdit = state.getItemInfo(this.itemId);
    this.itemEdit.item = this.itemDetails;
    state.setItemInfo(this.itemEdit);
  }
  /**
   * Gets and displays image result from browse and updates the item in the store.
   *
   * @param event The input controls event that contains the new file
   * @param updateStore boolean that controls if the new value is written to the store
   *  should be false on the initial load but true the rest of the time
   */
  _updateThumbnail(event) {
    const files = event.target.files;
    if (files && files[0]) {
      if (this.thumbnail) {
        // Update UI
        this.thumbnail.src = URL.createObjectURL(files[0]);
        // Update info in store
        this.itemEdit = state.getItemInfo(this.itemId);
        this.itemEdit.thumbnail = files[0];
        state.replaceItemThumbnail(this.itemEdit);
      }
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
  static get style() { return solutionItemDetailsCss; }
}, [0, "solution-item-details", {
    "itemId": [1537, "item-id"],
    "itemDetails": [32],
    "itemEdit": [32],
    "_translations": [32],
    "thumbnail": [32],
    "thumbnailContainer": [32]
  }, [[0, "calciteInputInput", "inputReceivedHandler"]]]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["solution-item-details", "calcite-icon", "calcite-input", "calcite-label", "calcite-progress"];
  components.forEach(tagName => { switch (tagName) {
    case "solution-item-details":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, SolutionItemDetails);
      }
      break;
    case "calcite-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "calcite-input":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "calcite-label":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "calcite-progress":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}
defineCustomElement();

export { SolutionItemDetails as S, defineCustomElement as d };
