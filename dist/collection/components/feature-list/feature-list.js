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
import { loadModules } from "../../utils/loadModules";
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
        this.highlightOnHover = false;
        this.sortingInfo = undefined;
        this.whereClause = undefined;
        this.textSize = "large";
        this.showInitialLoading = true;
        this.showErrorWhenNoFeatures = true;
        this.showUserImageInList = false;
        this.showFeatureSymbol = false;
        this.applyLayerViewFilter = false;
        this.reportingOptions = undefined;
        this._featureItems = [];
        this._featuresCount = 0;
        this._isLoading = false;
        this._translations = undefined;
    }
    //--------------------------------------------------------------------------
    //
    //  Host element access
    //
    //--------------------------------------------------------------------------
    el;
    //--------------------------------------------------------------------------
    //
    //  Properties (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * "esri/Color": https://developers.arcgis.com/javascript/latest/api-reference/esri-Color.html
     * The Color instance
     */
    Color;
    /**
     * "esri/config": https://developers.arcgis.com/javascript/latest/api-reference/esri-config.html
     * Esri config
     */
    esriConfig;
    /**
     * "esri/symbols/support/symbolUtils": https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-support-symbolUtils.html
     * Symbol utils
     */
    symbolUtils;
    /**
     * IPopupUtils: To fetch the list label using popup titles
     */
    _popupUtils;
    /**
     * __esri.FeatureLayer: Selected feature layer from the layer list
     */
    _selectedLayer;
    /**
     * __esri.Handle: Highlight handle of the selections
     */
    _highlightHandle;
    /**
     * HTMLCalcitePaginationElement: Calcite pagination element instance
     */
    _pagination;
    /**
     * string[]: Valid field types for like
     */
    _validFieldTypes = ["small-integer", "integer", "big-integer", "single", "long"];
    /**
     * string: Abbrivated like count of the feature
     */
    _abbreviatedLikeCount;
    /**
     * boolean: When true configured like field is available in selected layer
     */
    _likeFieldAvailable = false;
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
    /**
     * Watch for sorting field or order change and update the features list
     */
    async sortingInfoWatchHandler() {
        await this.initializeFeatureItems();
    }
    /**
     * Watch for whereclause change and update the features list
     */
    async whereClauseHandler() {
        await this.initializeFeatureItems();
    }
    //--------------------------------------------------------------------------
    //
    //  Methods (public)
    /**
     * Refresh the feature list which will fetch the latest features and update the features list
     * @returns Promise that resolves when the operation is complete
     */
    async refresh() {
        await this.initializeFeatureItems();
    }
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Events (public)
    //
    //--------------------------------------------------------------------------
    /**
     * Emitted on demand when feature is selected using the list
     */
    featureSelect;
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
        await this.initModules();
        await this._getTranslations();
        this._isLoading = this.showInitialLoading;
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
        return (h("calcite-panel", { key: '329d59b69be6a1243896da76e36823217c6695df', "full-height": true, "full-width": true }, this._isLoading && h("calcite-loader", { key: 'd48e3175c57e63268b8bd308ef366d3da23223b0', label: "", scale: "m" }), this.showErrorWhenNoFeatures && this._featureItems.length === 0 && !this._isLoading &&
            h("calcite-notice", { key: '9a6653c303a36e6eaad9fb2ca01ff26e7f528dcd', class: "error-msg", icon: "feature-details", kind: "info", open: true }, h("div", { key: '976363961af574a843f8bcd59dfc7268e3ea4a03', slot: "message" }, this.noFeaturesFoundMsg ? this.noFeaturesFoundMsg : this._translations.featureErrorMsg)), h("calcite-list", { key: '8c2e4ccedfe750098c075d19a087257063bfd5b2', "selection-appearance": "border", "selection-mode": "none" }, !this._isLoading && this._featureItems.length > 0 && this._featureItems), this._featuresCount > this.pageSize &&
            h("div", { key: 'be4bb3f6f842c4acf505f3e6bf126b0eba3c1d18', class: "width-full", slot: "footer" }, h("calcite-pagination", { key: '1647025abde4a57abd0e40779d7de40a92219189', class: "pagination", "full-width": true, onCalcitePaginationChange: this.pageChanged.bind(this), "page-size": this.pageSize, ref: el => this._pagination = el, "start-item": "1", "total-items": this._featuresCount }))));
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * Load esri javascript api modules
     * @returns Promise resolving when function is done
     * @protected
     */
    async initModules() {
        const [Color, esriConfig, symbolUtils] = await loadModules([
            "esri/Color",
            "esri/config",
            "esri/symbols/support/symbolUtils"
        ]);
        this.Color = Color;
        this.esriConfig = esriConfig;
        this.symbolUtils = symbolUtils;
    }
    /**
     * Return the where condition string considering the defined where clause and layer's definition expression
     * @protected
     */
    async getWhereCondition() {
        //By Default load all the features
        let whereClause = '1=1';
        //if where clause is defined use it
        if (this.whereClause) {
            whereClause = this.whereClause;
        }
        //if layer has definitionExpression append it to the where clause
        if (this._selectedLayer?.definitionExpression) {
            whereClause = whereClause + ' AND ' + this._selectedLayer.definitionExpression;
        }
        // if layerview has any applied filter, use it
        if (this.applyLayerViewFilter) {
            const selectedLayerView = await getFeatureLayerView(this.mapView, this.selectedLayerId);
            if (selectedLayerView?.filter?.where) {
                whereClause = whereClause + ' AND ' + selectedLayerView.filter.where;
            }
        }
        return whereClause;
    }
    /**
     * Initialize the features list using the selected layer
     * @protected
     */
    async initializeFeatureItems() {
        if (this._selectedLayer) {
            void this._pagination?.goTo("start");
            this._isLoading = this.showInitialLoading;
            this._featureItems = await this.queryPage(0);
            const whereCondition = await this.getWhereCondition();
            const query = {
                where: whereCondition
            };
            this._featuresCount = await this._selectedLayer.queryFeatureCount(query);
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
        this.clearHighlights();
        //highlight on map only if it is selected item
        if (this.highlightOnMap) {
            const selectedFeatureObjectId = Number(event.target.value);
            const selectedLayerView = await getFeatureLayerView(this.mapView, this.selectedLayerId);
            this._highlightHandle = await highlightFeatures([selectedFeatureObjectId], selectedLayerView, this.mapView, true);
        }
        await this.emitSelectedFeature(selectedFeature);
    }
    /**
     * Emit selected feature with its complete graphics and attributes
     * @param graphic selected feature graphic
     * @protected
     */
    async emitSelectedFeature(graphic) {
        const layer = graphic.layer;
        const query = layer.createQuery();
        query.returnGeometry = true;
        query.objectIds = [graphic.getObjectId()];
        const completeGraphic = await layer.queryFeatures(query);
        this.featureSelect.emit(completeGraphic.features[0]);
    }
    /**
     * On feature hover in feature list highlight the feature on the map
     * @param selectedFeature mouse hovered feature graphic
     * @protected
     */
    async onFeatureHover(selectedFeature) {
        //clear previous highlight and remove the highlightHandle
        this.clearHighlights();
        if (this.highlightOnHover) {
            const oId = selectedFeature.getObjectId();
            const selectedLayerView = await getFeatureLayerView(this.mapView, this.selectedLayerId);
            selectedLayerView.highlightOptions = { color: new this.Color("#FFFF00") };
            this._highlightHandle = selectedLayerView.highlight([oId]);
        }
    }
    /**
     * Clears the highlight
     * @protected
     */
    clearHighlights() {
        //if a feature is already highlighted, then remove the highlight
        if (this._highlightHandle) {
            this._highlightHandle.remove();
        }
    }
    /**
     * Query the selected feature layer, in descending order of object id's
     * @param page 0th page number in the pagination item
     * @returns List of features items to be rendered
     * @protected
     */
    async queryPage(page) {
        const featureLayer = this._selectedLayer;
        const sortField = this.sortingInfo?.field ? this.sortingInfo.field : featureLayer.objectIdField;
        const sortOrder = this.sortingInfo?.order ? this.sortingInfo.order : 'desc';
        const whereCondition = await this.getWhereCondition();
        const query = {
            start: page,
            num: this.pageSize,
            outFields: ["*"],
            returnGeometry: true,
            where: whereCondition,
            outSpatialReference: this.mapView.spatialReference.toJSON()
        };
        //sort only when sort field and order is valid
        if (sortField && sortOrder) {
            query.orderByFields = [sortField.toString() + " " + sortOrder];
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
        const currentFeatures = featureSet?.features;
        const showLikeCount = this.reportingOptions && this.reportingOptions[this.selectedLayerId].like;
        const items = currentFeatures.map(async (feature) => {
            const popupTitle = await this._popupUtils.getPopupTitle(feature, this.mapView.map);
            //fetch the feature creator user info to show the creator user image
            let userInfo;
            let featureSymbol;
            if (this.showUserImageInList) {
                const creatorField = this._selectedLayer.editFieldsInfo?.creatorField.toLowerCase();
                // if feature's creator field is present then only we can fetch the information of user
                if (creatorField) {
                    userInfo = await this.getUserInformation(feature, creatorField);
                }
            }
            if (this.showFeatureSymbol) {
                featureSymbol = await this.getFeatureSymbol(feature);
            }
            if (showLikeCount) {
                void this.getAbbreviatedLikeCount(feature);
            }
            return this.getFeatureItem(feature, popupTitle, featureSymbol, userInfo);
        });
        return Promise.all(items);
    }
    /**
     * Displays the abbrivated like count on the feature list
     * @param feature feature of the layer
     * @protected
     */
    getAbbreviatedLikeCount(feature) {
        const selectedLayer = this._selectedLayer;
        const likeField = this.reportingOptions[selectedLayer.id].likeField;
        selectedLayer.fields.forEach((eachField) => {
            if (this._validFieldTypes.indexOf(eachField.type) > -1) {
                if (eachField.name === likeField && this.reportingOptions[selectedLayer.id].like) {
                    this._likeFieldAvailable = true;
                    let likes = feature.attributes[likeField] || 0;
                    if (likes > 999) {
                        likes = likes > 999999 ? this._translations.millionsAbbreviation.replace("{{abbreviated_value}}", Math.floor(likes / 1000000).toString()) : this._translations.thousandsAbbreviation.replace("{{abbreviated_value}}", Math.floor(likes / 1000).toString());
                    }
                    this._abbreviatedLikeCount = likes;
                }
            }
        });
    }
    /**
     * Get each feature item
     * @param selectedFeature Each individual feature instance to be listed
     * @param popupTitle feature popup title
     * @returns individual feature item to be rendered
     * @protected
     */
    getFeatureItem(selectedFeature, popupTitle, featureSymbol, userInfo) {
        //get the object id value of the feature
        const oId = selectedFeature.attributes[this._selectedLayer.objectIdField].toString();
        //use object id if popupTitle is null or undefined
        popupTitle = popupTitle ?? oId;
        // get the formatted like count
        const formattedLikeCount = Number(selectedFeature.attributes[this.reportingOptions?.[this._selectedLayer.id].likeField]).toLocaleString();
        const popupTitleClass = this.textSize === 'small' ? 'feature-list-popup-title-small' : 'feature-list-popup-title';
        const popupTitlePaddingClass = this.showUserImageInList || this.showFeatureSymbol ? 'feature-list-popup-title-padding-reduced' : 'feature-list-popup-title-padding';
        return (h("calcite-list-item", { onCalciteListItemSelect: (e) => { void this.featureClicked(e, selectedFeature); }, onMouseLeave: () => { void this.clearHighlights(); }, onMouseOver: () => { void this.onFeatureHover(selectedFeature); }, value: oId }, this.showUserImageInList &&
            h("calcite-avatar", { class: 'profile-img', "full-name": userInfo?.fullName, id: userInfo?.id, scale: "m", slot: "content-start", thumbnail: userInfo?.userProfileUrl, username: userInfo?.username }), this.showFeatureSymbol &&
            h("div", { class: 'feature-symbol', ref: (el) => el && el.appendChild(featureSymbol), slot: "content-start" }), h("div", { class: `${popupTitleClass} ${popupTitlePaddingClass}`, slot: "content-start" }, popupTitle), this._likeFieldAvailable &&
            h("div", { class: "like-container", id: oId.concat("like"), slot: "content-end" }, h("span", null, this._abbreviatedLikeCount), h("calcite-icon", { icon: "thumbs-up", scale: 's' }), h("calcite-tooltip", { "reference-element": oId.concat("like") }, formattedLikeCount)), h("calcite-icon", { flipRtl: true, icon: "chevron-right", scale: "s", slot: "content-end" })));
    }
    /**
     *
     * @param feature Each individual feature instance to be listed
     * @param creatorField Feature's creator field from the layer
     * @returns user information
     * @protected
     */
    async getUserInformation(feature, creatorField) {
        const userToken = this.mapView.map.portalItem.portal?.credential?.token;
        //get the user information
        let url = `${this.esriConfig.portalUrl}/sharing/rest/community/users/${feature.attributes[creatorField]}?f=json&returnUserLicensedItems=true`;
        if (userToken) {
            url += `&token=${userToken}`;
        }
        const data = await fetch(url);
        const userInfo = await data.json();
        //construct the url to get the user profile image
        const userName = userInfo?.username ?? feature.attributes[creatorField];
        let userProfileUrl = `${this.esriConfig.portalUrl}/sharing/rest/community/users/${userName}/info/blob.png`;
        if (userInfo?.access && userToken) {
            userProfileUrl += `?token=${userToken}`;
        }
        userInfo.userProfileUrl = userProfileUrl;
        return userInfo;
    }
    /**
     * Creates a feature symbology
     * @param feature Each individual feature
     * @returns Feature symbology
     * @protected
     */
    async getFeatureSymbol(feature) {
        const nodeHtml = document.createElement('div');
        await this.symbolUtils.getDisplayedSymbol(feature).then(async (symbol) => {
            symbol && await this.symbolUtils?.renderPreviewHTML(symbol, {
                node: nodeHtml
            });
            if (nodeHtml.children?.length) {
                const imgOrSvgElm = nodeHtml.children[0];
                if (imgOrSvgElm) {
                    const height = Number(imgOrSvgElm.getAttribute('height'));
                    const width = Number(imgOrSvgElm.getAttribute('width'));
                    if (width > 30) {
                        imgOrSvgElm.setAttribute('width', '30');
                    }
                    else if (width < 19) {
                        imgOrSvgElm.setAttribute('width', '20');
                    }
                    imgOrSvgElm.setAttribute('viewBox', `0 0 ${width} ${height}`);
                }
            }
        });
        return nodeHtml;
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
            },
            "highlightOnHover": {
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
                    "text": "boolean: Highlight feature on map optional (default false) boolean to indicate if we should highlight when hover on Feature in list"
                },
                "attribute": "highlight-on-hover",
                "reflect": false,
                "defaultValue": "false"
            },
            "sortingInfo": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "ISortingInfo",
                    "resolved": "ISortingInfo",
                    "references": {
                        "ISortingInfo": {
                            "location": "import",
                            "path": "../../utils/interfaces",
                            "id": "src/utils/interfaces.ts::ISortingInfo"
                        }
                    }
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "ISortingInfo: Sorting field and order using which features list will be sorted"
                }
            },
            "whereClause": {
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
                    "text": "string: where clause to filter the features list"
                },
                "attribute": "where-clause",
                "reflect": false
            },
            "textSize": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "\"small\" | \"large\"",
                    "resolved": "\"large\" | \"small\"",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "string(small/large): Controls the font size of the title"
                },
                "attribute": "text-size",
                "reflect": false,
                "defaultValue": "\"large\""
            },
            "showInitialLoading": {
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
                    "text": "boolean: Show initial loading indicator when creating list"
                },
                "attribute": "show-initial-loading",
                "reflect": false,
                "defaultValue": "true"
            },
            "showErrorWhenNoFeatures": {
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
                    "text": "boolean: If true will show error msg when features are not present"
                },
                "attribute": "show-error-when-no-features",
                "reflect": false,
                "defaultValue": "true"
            },
            "showUserImageInList": {
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
                    "text": "boolean: If true display's profile img on each feature item"
                },
                "attribute": "show-user-image-in-list",
                "reflect": false,
                "defaultValue": "false"
            },
            "showFeatureSymbol": {
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
                    "text": "boolean: If true display's feature symbol on each feature item"
                },
                "attribute": "show-feature-symbol",
                "reflect": false,
                "defaultValue": "false"
            },
            "applyLayerViewFilter": {
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
                    "text": "boolean: If true will consider the FeatureFilter applied on the layerview"
                },
                "attribute": "apply-layer-view-filter",
                "reflect": false,
                "defaultValue": "false"
            },
            "reportingOptions": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "IReportingOptions",
                    "resolved": "IReportingOptions",
                    "references": {
                        "IReportingOptions": {
                            "location": "import",
                            "path": "../../utils/interfaces",
                            "id": "src/utils/interfaces.ts::IReportingOptions"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "IReportingOptions: Key options for reporting"
                }
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
    static get methods() {
        return {
            "refresh": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Refresh the feature list which will fetch the latest features and update the features list",
                    "tags": [{
                            "name": "returns",
                            "text": "Promise that resolves when the operation is complete"
                        }]
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "selectedLayerId",
                "methodName": "selectedLayerWatchHandler"
            }, {
                "propName": "sortingInfo",
                "methodName": "sortingInfoWatchHandler"
            }, {
                "propName": "whereClause",
                "methodName": "whereClauseHandler"
            }];
    }
}
