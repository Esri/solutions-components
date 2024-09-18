/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { l as loadModules } from './loadModules.js';
import { P as PopupUtils } from './popupUtils.js';
import { g as getLayerOrTable, c as getFeatureLayerView, h as highlightFeatures } from './mapViewUtils.js';
import { g as getLocaleComponentStrings } from './locale.js';
import { d as defineCustomElement$i } from './action.js';
import { d as defineCustomElement$h } from './action-menu.js';
import { d as defineCustomElement$g } from './avatar.js';
import { d as defineCustomElement$f } from './filter2.js';
import { d as defineCustomElement$e } from './handle.js';
import { d as defineCustomElement$d } from './icon.js';
import { d as defineCustomElement$c } from './input.js';
import { d as defineCustomElement$b } from './list.js';
import { d as defineCustomElement$a } from './list-item.js';
import { d as defineCustomElement$9 } from './loader.js';
import { d as defineCustomElement$8 } from './notice.js';
import { d as defineCustomElement$7 } from './pagination.js';
import { d as defineCustomElement$6 } from './panel.js';
import { d as defineCustomElement$5 } from './popover.js';
import { d as defineCustomElement$4 } from './progress.js';
import { d as defineCustomElement$3 } from './scrim.js';
import { d as defineCustomElement$2 } from './stack.js';
import { d as defineCustomElement$1 } from './tooltip.js';

const featureListCss = ":host{display:block}.width-full{width:100%}.pagination{display:flex;justify-content:center}.error-msg{padding:10px;width:calc(100% - 20px)}.feature-list-popup-title{font-weight:500;white-space:pre-line}.feature-list-popup-title-small{font-size:small;white-space:pre-line}.feature-list-popup-title-padding{padding:10px 12px}.feature-list-popup-title-padding-reduced{padding:10px 0}.profile-img{margin:0 0.75rem;min-width:32px}.like-container{display:flex;align-items:center;gap:5px;color:gray !important;font-style:italic}.feature-symbol{padding:3px 10px;min-width:30px;display:flex;justify-content:center}";
const FeatureListStyle0 = featureListCss;

const FeatureList = /*@__PURE__*/ proxyCustomElement(class FeatureList extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.featureSelect = createEvent(this, "featureSelect", 7);
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
    get el() { return this; }
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
    static get watchers() { return {
        "selectedLayerId": ["selectedLayerWatchHandler"],
        "sortingInfo": ["sortingInfoWatchHandler"],
        "whereClause": ["whereClauseHandler"]
    }; }
    static get style() { return FeatureListStyle0; }
}, [0, "feature-list", {
        "selectedLayerId": [1, "selected-layer-id"],
        "mapView": [16],
        "noFeaturesFoundMsg": [1, "no-features-found-msg"],
        "pageSize": [2, "page-size"],
        "highlightOnMap": [4, "highlight-on-map"],
        "highlightOnHover": [4, "highlight-on-hover"],
        "sortingInfo": [16],
        "whereClause": [1, "where-clause"],
        "textSize": [1, "text-size"],
        "showInitialLoading": [4, "show-initial-loading"],
        "showErrorWhenNoFeatures": [4, "show-error-when-no-features"],
        "showUserImageInList": [4, "show-user-image-in-list"],
        "showFeatureSymbol": [4, "show-feature-symbol"],
        "applyLayerViewFilter": [4, "apply-layer-view-filter"],
        "reportingOptions": [16],
        "_featureItems": [32],
        "_featuresCount": [32],
        "_isLoading": [32],
        "_translations": [32],
        "refresh": [64]
    }, undefined, {
        "selectedLayerId": ["selectedLayerWatchHandler"],
        "sortingInfo": ["sortingInfoWatchHandler"],
        "whereClause": ["whereClauseHandler"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["feature-list", "calcite-action", "calcite-action-menu", "calcite-avatar", "calcite-filter", "calcite-handle", "calcite-icon", "calcite-input", "calcite-list", "calcite-list-item", "calcite-loader", "calcite-notice", "calcite-pagination", "calcite-panel", "calcite-popover", "calcite-progress", "calcite-scrim", "calcite-stack", "calcite-tooltip"];
    components.forEach(tagName => { switch (tagName) {
        case "feature-list":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, FeatureList);
            }
            break;
        case "calcite-action":
            if (!customElements.get(tagName)) {
                defineCustomElement$i();
            }
            break;
        case "calcite-action-menu":
            if (!customElements.get(tagName)) {
                defineCustomElement$h();
            }
            break;
        case "calcite-avatar":
            if (!customElements.get(tagName)) {
                defineCustomElement$g();
            }
            break;
        case "calcite-filter":
            if (!customElements.get(tagName)) {
                defineCustomElement$f();
            }
            break;
        case "calcite-handle":
            if (!customElements.get(tagName)) {
                defineCustomElement$e();
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$d();
            }
            break;
        case "calcite-input":
            if (!customElements.get(tagName)) {
                defineCustomElement$c();
            }
            break;
        case "calcite-list":
            if (!customElements.get(tagName)) {
                defineCustomElement$b();
            }
            break;
        case "calcite-list-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$a();
            }
            break;
        case "calcite-loader":
            if (!customElements.get(tagName)) {
                defineCustomElement$9();
            }
            break;
        case "calcite-notice":
            if (!customElements.get(tagName)) {
                defineCustomElement$8();
            }
            break;
        case "calcite-pagination":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "calcite-panel":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "calcite-popover":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "calcite-progress":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "calcite-scrim":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "calcite-stack":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "calcite-tooltip":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { FeatureList as F, defineCustomElement as d };
