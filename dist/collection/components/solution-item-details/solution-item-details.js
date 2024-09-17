/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
/** @license
 * Copyright 2022 Esri
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { h, Host } from "@stencil/core";
import "@esri/calcite-components";
import state from "../../utils/solution-store";
import { getLocaleComponentStrings } from "../../utils/locale";
export class SolutionItemDetails {
    constructor() {
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
    //  Host element access
    //
    //--------------------------------------------------------------------------
    el;
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
        return (h(Host, { key: '61d6e5f9703edfb6a936a8a467fc545878c5406f' }, h("div", { key: '377c29de7e5b8e4c06197aad502b167e44579b87', class: "parent-container" }, h("div", { key: '2d97166d07a7f41a8dc250bd749690aae4d94699', class: "inputBottomSeparation" }, h("calcite-input", { key: '144e82dd68c146d06d4c644c0f1476c58cb244fe', id: "item-title", value: this.itemDetails.title })), h("div", { key: 'ea25afac1fcc4428b39719df81e665b18e95a4fc', class: "inputBottomSeparation" }, h("input", { key: 'ab31fedf335a157f8c97eea5adb0eec09486bfb8', accept: ".jpg,.gif,.png,image/jpg,image/gif,image/png", class: "display-none", onChange: (event) => (this._updateThumbnail(event)), ref: (el) => (this.browseForThumbnail = el), type: "file" }), h("button", { key: '9e0365412096cdf99707d9d4c23855572912a1e6', class: "font-size--3 btn-link inline-block trailer-quarter", onClick: () => this._getThumbnail() }, h("svg", { key: '0f36a04f8b3202022b7898e9bb1c04e164832b18', class: "icon-inline icon-inline--on-left", height: "16", viewBox: "0 0 16 16", width: "16" }, h("path", { key: '59a63dc2a5c2062ae1e1d0e95a0aff3413bc2bf5', d: "M14.792 2.666l-1.414-1.413a.965.965 0 0 0-1.385-.03l-1.444 1.444-8.763 8.72L.03 15.481a.371.371 0 0 0 .488.488l4.096-1.756 8.763-8.72-.001-.001.002.002 1.443-1.444a.965.965 0 0 0-.03-1.385zM1.569 14.431l.554-1.293.74.739zm2.338-.924l-1.414-1.414 7.963-7.92 1.414 1.415zm8.67-8.626l-1.413-1.414 1.29-1.29a.306.306 0 0 1 .433 0l.981.98a.306.306 0 0 1 0 .433z" })), this._translations.editThumbnail), h("div", { key: 'c259fca582d40cfdaafbd09728037148af9210c9', class: "flex" }, h("div", { key: '6dea250611cca99f6b894540b8f67e6a7435c71d', class: "img-container", ref: (el) => (this.thumbnailContainer = el) }, h("img", { key: '026a0bb189eae1c835ad422168164e1675984c18', class: "scale-down", height: "133", id: "item-thumbnail", ref: (el) => (this.thumbnail = el), width: "200" })), h("div", { key: 'b228b6c0bba23ce7dd158e09314fb33b24c08c34', class: "snippet-count-container" }, h("calcite-input", { key: '77423fd69cb2dd13f935309b59e17b7a310ba202', id: "item-snippet", maxLength: 250, type: "textarea", value: this.itemDetails.snippet }), h("label", { key: '8d267b7f229c9e3810e593cd45410572e0a33b67', class: "font-size--3", id: "item-snippet-count", ref: (el) => (this.itemSnippetCount = el) })))), h("calcite-label", { key: '7762a94cc3594e528ede4e87f8c447fd01eeba1c' }, this._translations.description, h("label", { key: '6f0441fd754851951a85298bb693bd278996900b', id: "item-description-label" }, h("calcite-input", { key: '4211d2472265a2b3056329ee47b217dbceaaa93e', id: "item-description", type: "textarea", value: this.itemDetails.description }))), h("calcite-label", { key: '8e3e4b730a63b2d13ea038d8536a066dafc64898' }, this._translations.tags, h("label", { key: '3c5df3b00ce7f82cc123e0675ceca84287061cd4', id: "item-tags-label" }, h("calcite-input", { key: '0f5b324fecf86953c6e72abdf1d3330b654ae170', id: "item-tags", value: (this.itemDetails.tags && Array.isArray(this.itemDetails.tags) ? this.itemDetails.tags : [this.itemDetails.tags]).join(",") }))), this.itemType !== "Group" ? h("calcite-label", null, this._translations.credits, h("label", { id: "item-credits-label" }, h("calcite-input", { id: "item-credits", value: this.itemDetails.accessInformation }))) : null, this.itemType !== "Group" ? h("calcite-label", null, h("label", { id: "item-terms-label" }, this._translations.termsOfUse, h("calcite-input", { id: "item-terms", type: "textarea", value: this.itemDetails.licenseInfo }))) : null)));
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
    static get is() { return "solution-item-details"; }
    static get originalStyleUrls() {
        return {
            "$": ["solution-item-details.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["solution-item-details.css"]
        };
    }
    static get properties() {
        return {
            "itemId": {
                "type": "string",
                "mutable": true,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "A template's itemId."
                },
                "attribute": "item-id",
                "reflect": true,
                "defaultValue": "\"\""
            }
        };
    }
    static get states() {
        return {
            "itemDetails": {},
            "itemEdit": {},
            "_translations": {},
            "thumbnail": {},
            "thumbnailContainer": {}
        };
    }
    static get elementRef() { return "el"; }
    static get listeners() {
        return [{
                "name": "calciteInputInput",
                "method": "inputReceivedHandler",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
