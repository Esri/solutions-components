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
import { Host, h } from "@stencil/core";
import { EUpdateType } from "../../utils/interfaces";
import { EFileType } from "@esri/solution-common";
import state from "../../utils/solution-store";
import { getLocaleComponentStrings } from "../../utils/locale";
export class SolutionResourceItem {
    constructor() {
        this.authentication = undefined;
        this.itemId = "";
        this.resourceFilePaths = [];
        this.resources = [];
        this._translations = undefined;
    }
    //--------------------------------------------------------------------------
    //
    //  Host element access
    //
    //--------------------------------------------------------------------------
    el;
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
        return (h(Host, { key: '31f5090ac98fc122b9ff55433fbfdf6cf9cf4021' }, h("div", { key: 'db3e91e5bf116cc61a2a1a48b2fa75301879cc6b', class: "resource-item" }, h("div", { key: '67e394b7011d37970932ca8660e2c85e0ef80a51', class: "margin-bottom-1" }, h("calcite-button", { key: '36ea4dc882a41043dbb3ebeb51be65cbb85d4cdd', appearance: "solid", class: "resource-button", color: "blue", onClick: () => this._addNewResource() }, this._translations.addResource), h("calcite-button", { key: '50b428bb2a75199bcfcb9d698c71faefabc3cbcc', appearance: "solid", color: "blue", disabled: !hasValidResources, onClick: () => this._downloadAll() }, this._translations.downloadAll)), h("div", { key: 'd12a8adbd0f9555536bca1e5c94585c3adf9279d', class: "resources-container", style: { display: hasValidResources ? "inherit" : "none" } }, this._renderResourceList()))));
    }
    _removedResources = {};
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
    static get is() { return "solution-resource-item"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["solution-resource-item.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["solution-resource-item.css"]
        };
    }
    static get properties() {
        return {
            "authentication": {
                "type": "unknown",
                "mutable": true,
                "complexType": {
                    "original": "UserSession",
                    "resolved": "UserSession",
                    "references": {
                        "UserSession": {
                            "location": "import",
                            "path": "@esri/solution-common",
                            "id": "node_modules::UserSession"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Credentials for requests"
                }
            },
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
                    "text": "A template's itemId.\r\nThis is used to get the correct model from a store in the json-editor"
                },
                "attribute": "item-id",
                "reflect": true,
                "defaultValue": "\"\""
            }
        };
    }
    static get states() {
        return {
            "resourceFilePaths": {},
            "resources": {},
            "_translations": {}
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "itemId",
                "methodName": "itemIdWatchHandler"
            }];
    }
}
