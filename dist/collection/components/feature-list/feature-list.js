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
import { h } from "@stencil/core";
import { PopupUtils } from "../../utils/popupUtils";
import { getFeatureLayerView, getLayerOrTable, highlightFeatures } from "../../utils/mapViewUtils";
import { getLocaleComponentStrings } from "../../utils/locale";
export class FeatureList {
    constructor() {
        this.selectedLayerId = undefined;
        this.mapView = undefined;
        this.noFeaturesFoundMsg = undefined;
        this.pageSize = 100;
        this.highlightOnMap = false;
        this._featureItems = [];
        this._featuresCount = 0;
        this._isLoading = false;
        this._translations = undefined;
    }
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    /**
     * Watch for selectedLayerId change and update layer instance and features list for new layerId
     */
    async selectedLayerWatchHandler() {
        this._selectedLayer = await getLayerOrTable(this.mapView, this.selectedLayerId);
        await this.initializeFeatureItems();
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (lifecycle)
    //
    //--------------------------------------------------------------------------
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     * @returns Promise when complete
     */
    async componentWillLoad() {
        await this._getTranslations();
        this._isLoading = true;
        this._popupUtils = new PopupUtils();
        if (this.mapView && this.selectedLayerId) {
            this._selectedLayer = await getLayerOrTable(this.mapView, this.selectedLayerId);
        }
    }
    /**
     * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
     */
    async componentDidLoad() {
        await this.initializeFeatureItems();
    }
    /**
     * Renders the component.
     */
    render() {
        return (h("calcite-panel", { "full-height": true, "full-width": true }, this._isLoading && h("calcite-loader", { label: "", scale: "m" }), this._featureItems.length === 0 && !this._isLoading &&
            h("calcite-notice", { class: "error-msg", icon: "feature-details", kind: "info", open: true }, h("div", { slot: "message" }, this.noFeaturesFoundMsg ? this.noFeaturesFoundMsg : this._translations.featureErrorMsg)), h("calcite-list", { "selection-appearance": "border", "selection-mode": "none" }, !this._isLoading && this._featureItems.length > 0 && this._featureItems), this._featuresCount > this.pageSize &&
            h("div", { class: "width-full", slot: "footer" }, h("calcite-pagination", { class: "pagination", "full-width": true, onCalcitePaginationChange: this.pageChanged.bind(this), "page-size": this.pageSize, "start-item": "1", "total-items": this._featuresCount }))));
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * Initialize the features list using the selected layer
     * @protected
     */
    async initializeFeatureItems() {
        if (this._selectedLayer) {
            this._isLoading = true;
            this._featureItems = await this.queryPage(0);
            this._featuresCount = await this._selectedLayer.queryFeatureCount();
            this._isLoading = false;
        }
    }
    /**
     * On page change get the next updated feature list
     * @param event page change event
     * @protected
     */
    async pageChanged(event) {
        this._isLoading = true;
        if (this._highlightHandle) {
            this._highlightHandle.remove();
            this._highlightHandle = null;
        }
        const page = event.target.startItem - 1;
        this._featureItems = await this.queryPage(page);
        this._isLoading = false;
    }
    /**
     * On feature click in feature list highlight the feature on the map
     * @param event feature clicked event
     * @param selectedFeature selected feature graphic
     * @protected
     */
    async featureClicked(event, selectedFeature) {
        //clear previous highlight and remove the highlightHandle
        if (this.highlightOnMap && this._highlightHandle) {
            this._highlightHandle.remove();
            this._highlightHandle = null;
        }
        //highlight on map only if it is selected item
        if (this.highlightOnMap) {
            const selectedFeatureObjectId = Number(event.target.value);
            const selectedLayerView = await getFeatureLayerView(this.mapView, this.selectedLayerId);
            this._highlightHandle = await highlightFeatures([selectedFeatureObjectId], selectedLayerView, this.mapView, true);
        }
        this.featureSelect.emit(selectedFeature);
    }
    /**
     * Query the selected feature layer, in descending order of object id's
     * @param page 0th page number in the pagination item
     * @returns List of features items to be rendered
     * @protected
     */
    async queryPage(page) {
        const featureLayer = this._selectedLayer;
        const objectIdField = featureLayer.objectIdField;
        const query = {
            start: page,
            num: this.pageSize,
            outFields: ["*"],
            returnGeometry: true,
            where: featureLayer.definitionExpression,
            outSpatialReference: this.mapView.spatialReference.toJSON()
        };
        //sort only when objectId field is found
        if (objectIdField) {
            query.orderByFields = [objectIdField.toString() + " DESC"];
        }
        const featureSet = await featureLayer.queryFeatures(query);
        return await this.createFeatureItem(featureSet);
    }
    /**
     * Creates list of items using the popup titles
     * @param featureSet Queried FeatureSet
     * @returns List of features items to be rendered
     * @protected
     */
    async createFeatureItem(featureSet) {
        const currentFeatures = featureSet === null || featureSet === void 0 ? void 0 : featureSet.features;
        const items = currentFeatures.map(async (feature) => {
            const popupTitle = await this._popupUtils.getPopupTitle(feature, this.mapView.map);
            return this.getFeatureItem(feature, popupTitle);
        });
        return Promise.all(items);
    }
    /**
     * Get each feature item
     * @param selectedFeature Each individual feature instance to be listed
     * @param popupTitle feature popup title
     * @returns individual feature item to be rendered
     * @protected
     */
    getFeatureItem(selectedFeature, popupTitle) {
        //get the object id value of the feature
        const oId = selectedFeature.attributes[this._selectedLayer.objectIdField].toString();
        //use object id if popupTitle is null or undefined
        popupTitle = popupTitle !== null && popupTitle !== void 0 ? popupTitle : oId;
        return (h("calcite-list-item", { onCalciteListItemSelect: (e) => { void this.featureClicked(e, selectedFeature); }, value: oId }, h("div", { class: "popup-title", slot: "content-start" }, popupTitle), h("calcite-icon", { icon: "chevron-right", scale: "s", slot: "content-end" })));
    }
    /**
     * Fetches the component's translations
     * @returns Promise when complete
     * @protected
     */
    async _getTranslations() {
        const messages = await getLocaleComponentStrings(this.el);
        this._translations = messages[0];
    }
    static get is() { return "feature-list"; }
    static get originalStyleUrls() {
        return {
            "$": ["feature-list.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["feature-list.css"]
        };
    }
    static get properties() {
        return {
            "selectedLayerId": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "string: Layer id of the feature layer to show the list"
                },
                "attribute": "selected-layer-id",
                "reflect": false
            },
            "mapView": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "__esri.MapView",
                    "resolved": "MapView",
                    "references": {
                        "___esri": {
                            "location": "global",
                            "id": "global::___esri"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html"
                }
            },
            "noFeaturesFoundMsg": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "string: Message to be displayed when features are not found"
                },
                "attribute": "no-features-found-msg",
                "reflect": false
            },
            "pageSize": {
                "type": "number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "number: Number features to be fetched per page, by default 100 features will be fetched"
                },
                "attribute": "page-size",
                "reflect": false,
                "defaultValue": "100"
            },
            "highlightOnMap": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "boolean: Highlight feature on map optional (default false) boolean to indicate if we should highlight and zoom to the extent of the feature geometry"
                },
                "attribute": "highlight-on-map",
                "reflect": false,
                "defaultValue": "false"
            }
        };
    }
    static get states() {
        return {
            "_featureItems": {},
            "_featuresCount": {},
            "_isLoading": {},
            "_translations": {}
        };
    }
    static get events() {
        return [{
                "method": "featureSelect",
                "name": "featureSelect",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted on demand when feature is selected using the list"
                },
                "complexType": {
                    "original": "__esri.Graphic",
                    "resolved": "Graphic",
                    "references": {
                        "___esri": {
                            "location": "global",
                            "id": "global::___esri"
                        }
                    }
                }
            }];
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "selectedLayerId",
                "methodName": "selectedLayerWatchHandler"
            }];
    }
}
