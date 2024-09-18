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
import { d as defineCustomElement$2 } from './label2.js';
import { d as defineCustomElement$1 } from './progress.js';

const solutionItemDetailsCss = ".inputBottomSeparation{margin-left:0px;margin-right:0px;margin-top:0px;margin-bottom:1.5rem}.icon-inline--on-left,.icon-inline--on-right{display:inline;vertical-align:middle;margin-inline-end:0.375rem;fill:#0079c1}.scale-down{-o-object-fit:scale-down;object-fit:scale-down}.img-container{display:inline;margin-inline-end:1rem;max-width:363px}.summary-count-container{display:inline;flex-grow:1;margin-inline-start:0.75rem}.snippet-count-container{width:calc(100vw - 363px)}.parent-container{max-width:100%;padding:1rem}label{position:relative;margin-left:0px;margin-right:0px;margin-top:0px;margin-bottom:1.5rem;display:block;min-width:-moz-min-content;min-width:min-content}";
const SolutionItemDetailsStyle0 = solutionItemDetailsCss;

const SolutionItemDetails = /*@__PURE__*/ proxyCustomElement(class SolutionItemDetails extends HTMLElement {
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
    get el() { return this; }
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
        return (h(Host, { key: '8bbaae72e79226d287c33a6cc0945344707e0987' }, h("div", { key: '6836de1161eb31305af007f96265ef7501ff541c', class: "parent-container" }, h("div", { key: '355100a14f3ad3428c152eda17b9ecaf246d379f', class: "inputBottomSeparation" }, h("calcite-input", { key: 'b482414e952890e50191f4480a078a24db30b623', id: "item-title", value: this.itemDetails.title })), h("div", { key: '8fcd980eeab23e6d78a33bbb6750f5d70b2c1a13', class: "inputBottomSeparation" }, h("input", { key: '1702f46cf552f3f37f668382ad706748b1d8f7ad', accept: ".jpg,.gif,.png,image/jpg,image/gif,image/png", class: "display-none", onChange: (event) => (this._updateThumbnail(event)), ref: (el) => (this.browseForThumbnail = el), type: "file" }), h("button", { key: '6df15b3290788c84f58edda6d01ec22eb9e36a9a', class: "font-size--3 btn-link inline-block trailer-quarter", onClick: () => this._getThumbnail() }, h("svg", { key: '8169d5c98f632be94f7069eb204cc4b2c5159221', class: "icon-inline icon-inline--on-left", height: "16", viewBox: "0 0 16 16", width: "16" }, h("path", { key: '578094ee1e523cfaacecdab56793a219b260d1a7', d: "M14.792 2.666l-1.414-1.413a.965.965 0 0 0-1.385-.03l-1.444 1.444-8.763 8.72L.03 15.481a.371.371 0 0 0 .488.488l4.096-1.756 8.763-8.72-.001-.001.002.002 1.443-1.444a.965.965 0 0 0-.03-1.385zM1.569 14.431l.554-1.293.74.739zm2.338-.924l-1.414-1.414 7.963-7.92 1.414 1.415zm8.67-8.626l-1.413-1.414 1.29-1.29a.306.306 0 0 1 .433 0l.981.98a.306.306 0 0 1 0 .433z" })), this._translations.editThumbnail), h("div", { key: '8c4faf6d86712104387259c726c3fac6e6d6b10d', class: "flex" }, h("div", { key: '93d0f7b46c78ec30d46f7bc33b615836969d3f46', class: "img-container", ref: (el) => (this.thumbnailContainer = el) }, h("img", { key: 'd69a1331009d7d93acd3879ef80f5095ed6cdd0c', class: "scale-down", height: "133", id: "item-thumbnail", ref: (el) => (this.thumbnail = el), width: "200" })), h("div", { key: 'd191b1d72c04c81b8169253864af9b8ebb1c9602', class: "snippet-count-container" }, h("calcite-input", { key: 'f5515ddad63ea215d50f960277362c85836f7b8a', id: "item-snippet", maxLength: 250, type: "textarea", value: this.itemDetails.snippet }), h("label", { key: 'e02b85f8f62e7bd07d0648618887ca6e092446f2', class: "font-size--3", id: "item-snippet-count", ref: (el) => (this.itemSnippetCount = el) })))), h("calcite-label", { key: '04b42de584350140b65442cecd45930436bdef41' }, this._translations.description, h("label", { key: '2e46c44aaeb2480d72d38ee84316c3c2943fb366', id: "item-description-label" }, h("calcite-input", { key: 'b59b9c07bdd8712821cf552df4b2ffaeba24f749', id: "item-description", type: "textarea", value: this.itemDetails.description }))), h("calcite-label", { key: '24c52f549286a48bd156bcecafb4518fe09b33c0' }, this._translations.tags, h("label", { key: 'ed635dc95fb4d607a0d41debf5959debfbaa3139', id: "item-tags-label" }, h("calcite-input", { key: '6986aad2783942210f759f3573c52450c2d63c7c', id: "item-tags", value: (this.itemDetails.tags && Array.isArray(this.itemDetails.tags) ? this.itemDetails.tags : [this.itemDetails.tags]).join(",") }))), this.itemType !== "Group" ? h("calcite-label", null, this._translations.credits, h("label", { id: "item-credits-label" }, h("calcite-input", { id: "item-credits", value: this.itemDetails.accessInformation }))) : null, this.itemType !== "Group" ? h("calcite-label", null, h("label", { id: "item-terms-label" }, this._translations.termsOfUse, h("calcite-input", { id: "item-terms", type: "textarea", value: this.itemDetails.licenseInfo }))) : null)));
    }
    componentDidRender() {
        this._loadThumb();
    }
    //--------------------------------------------------------------------------
    //
    //  Properties (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * Handle to the element for browsing for a file.
     */
    browseForThumbnail;
    itemType;
    /**
     * Handle to the snippet character-count feedback.
     */
    itemSnippetCount;
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
        if (this.thumbnail && this.itemEdit?.thumbnail) {
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
    static get style() { return SolutionItemDetailsStyle0; }
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
