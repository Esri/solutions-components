/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { g as getLocaleComponentStrings } from './locale.js';
import { l as loadModules } from './loadModules.js';
import { a as getAllLayers, e as getFeatureLayerView, h as highlightFeatures, g as getLayerOrTable } from './mapViewUtils.js';
import { q as queryFeaturesByID } from './queryUtils.js';
import { d as defineCustomElement$w } from './action.js';
import { d as defineCustomElement$v } from './action-menu.js';
import { d as defineCustomElement$u } from './alert.js';
import { d as defineCustomElement$t } from './button.js';
import { d as defineCustomElement$s } from './chip.js';
import { d as defineCustomElement$r } from './filter2.js';
import { d as defineCustomElement$q } from './flow.js';
import { d as defineCustomElement$p } from './flow-item.js';
import { d as defineCustomElement$o } from './handle.js';
import { d as defineCustomElement$n } from './icon.js';
import { d as defineCustomElement$m } from './input.js';
import { d as defineCustomElement$l } from './list.js';
import { d as defineCustomElement$k } from './list-item.js';
import { d as defineCustomElement$j } from './loader.js';
import { d as defineCustomElement$i } from './modal.js';
import { d as defineCustomElement$h } from './notice.js';
import { d as defineCustomElement$g } from './pagination.js';
import { d as defineCustomElement$f } from './panel.js';
import { d as defineCustomElement$e } from './popover.js';
import { d as defineCustomElement$d } from './progress.js';
import { d as defineCustomElement$c } from './scrim.js';
import { d as defineCustomElement$b } from './shell.js';
import { d as defineCustomElement$a } from './stack.js';
import { d as defineCustomElement$9 } from './tooltip.js';
import { d as defineCustomElement$8 } from './create-feature2.js';
import { d as defineCustomElement$7 } from './delete-button2.js';
import { d as defineCustomElement$6 } from './edit-card2.js';
import { d as defineCustomElement$5 } from './feature-list2.js';
import { d as defineCustomElement$4 } from './info-card2.js';
import { d as defineCustomElement$3 } from './instant-apps-social-share2.js';
import { d as defineCustomElement$2 } from './layer-list2.js';

const crowdsourceReporterCss = ":host{display:block;--calcite-label-margin-bottom:0px;--solutions-theme-foreground-color:var(--calcite-color-foreground-1)}.width-full{width:100% !important}.width-0{width:0}.height-full{height:100% !important}.height-0{height:0}.overflow-hidden{overflow:hidden}.border{border:1px solid var(--calcite-color-border-3)}.notice-msg{padding:10px;width:calc(100% - 20px)}.footer-top-button{padding-bottom:7px}.footer-button{height:35px}";

const CrowdsourceReporter$1 = /*@__PURE__*/ proxyCustomElement(class CrowdsourceReporter extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.togglePanel = createEvent(this, "togglePanel", 7);
        this.description = undefined;
        this.isMobile = undefined;
        this.enableAnonymousAccess = undefined;
        this.enableAnonymousComments = undefined;
        this.enableComments = undefined;
        this.enableLogin = undefined;
        this.enableNewReports = undefined;
        this.layers = undefined;
        this.loginTitle = undefined;
        this.mapView = undefined;
        this.layerId = undefined;
        this.objectId = undefined;
        this.reportButtonText = undefined;
        this.reportsHeader = undefined;
        this.reportSubmittedMessage = undefined;
        this.searchConfiguration = undefined;
        this.showComments = undefined;
        this.defaultWebmap = "";
        this.enableSearch = true;
        this.enableHome = true;
        this.mapInfos = [];
        this.theme = "light";
        this.enableZoom = true;
        this._mapInfo = undefined;
        this._flowItems = ["layer-list"];
        this._sidePanelCollapsed = false;
        this._translations = undefined;
        this._hasValidLayers = false;
        this._selectedLayerName = undefined;
        this._reportSubmitted = false;
        this._showSubmitCancelButton = false;
        this._featureCreationFailedErrorMsg = undefined;
    }
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    /**
     * Called each time the mapView prop is changed.
     */
    async isMobileWatchHandler() {
        this._sidePanelCollapsed = false;
    }
    /**
     * Called each time the mapView prop is changed.
     */
    async mapViewWatchHandler() {
        await this.mapView.when(async () => {
            await this.setMapView();
        });
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (lifecycle)
    //
    //--------------------------------------------------------------------------
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     * Create component translations and monitor the mediaQuery change to detect mobile/desktop mode
     * @returns Promise when complete
     */
    async componentWillLoad() {
        this._urlParamsLoaded = false;
        await this._initModules();
        await this._getTranslations();
    }
    /**
     * Renders the component.
     */
    render() {
        console.log("==============================Reporter render===================================");
        console.log("this.layerId");
        console.log(this.layerId);
        console.log("this.objectId");
        console.log(this.objectId);
        const themeClass = this.theme === "dark" ? "calcite-mode-dark" : "calcite-mode-light";
        return (h(Host, null, this._reportSubmitted && h("calcite-alert", { "auto-close": true, class: themeClass, icon: "check-circle", kind: "success", label: "", onCalciteAlertClose: () => { this._reportSubmitted = false; }, open: true, placement: "top" }, h("div", { slot: "title" }, this._translations.reportSubmit), h("div", { slot: "message" }, this.reportSubmittedMessage ? this.reportSubmittedMessage : this._translations.submitMsg)), this._featureCreationFailedErrorMsg && h("calcite-alert", { "auto-close": true, class: themeClass, icon: "x-octagon", kind: "danger", label: "", onCalciteAlertClose: () => { this._featureCreationFailedErrorMsg = ""; }, open: true, placement: "top" }, h("div", { slot: "title" }, this._translations.error), h("div", { slot: "message" }, this._featureCreationFailedErrorMsg)), h("div", null, h("calcite-shell", { "content-behind": true }, this._getReporter()))));
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * Load esri javascript api modules
     *
     * @returns Promise resolving when function is done
     *
     * @protected
     */
    async _initModules() {
        const [reactiveUtils] = await loadModules([
            "esri/core/reactiveUtils"
        ]);
        this.reactiveUtils = reactiveUtils;
    }
    /**
     * Set the selected layer id and layer name
     * @param layerId string layerId of the selected layer
     * @param layerName string layerName of the selected layer
     */
    setSelectedLayer(layerId, layerName) {
        this._selectedLayerId = layerId;
        this._selectedLayerName = layerName;
        //show only current layer on map and hide other valid editable layers
        //if layerId is empty then show all the layers on map
        this._validLayers.forEach(layer => {
            layer.set('visible', !layerId || (layer.id === layerId));
        });
    }
    /**
     * Get the reporter app functionality
     * @protected
     */
    _getReporter() {
        const renderLists = [];
        this._flowItems.forEach((item) => {
            switch (item) {
                case "layer-list":
                    renderLists.push(this.getLayerListFlowItem());
                    break;
                case "feature-list":
                    renderLists.push(this.getFeatureListFlowItem(this._selectedLayerId, this._selectedLayerName));
                    break;
                case "feature-details":
                    renderLists.push(this.getFeatureDetailsFlowItem());
                    break;
                case "reporting-layer-list":
                    renderLists.push(this.getChooseCategoryFlowItem());
                    break;
                case "feature-create":
                    renderLists.push(this.getFeatureCreateFlowItem());
                    break;
            }
        });
        const themeClass = this.theme === "dark" ? "calcite-mode-dark" : "calcite-mode-light";
        return (h("calcite-panel", { class: "width-full " + themeClass }, this.mapView
            ? h("calcite-flow", null, (renderLists === null || renderLists === void 0 ? void 0 : renderLists.length) > 0 && renderLists)
            : h("calcite-loader", { label: "", scale: "m" })));
    }
    /**
     * Get the feature layer list
     * @returns the layer list items
     * @protected
     */
    getLayerListFlowItem() {
        return (h("calcite-flow-item", { collapsed: this.isMobile && this._sidePanelCollapsed, heading: this.reportsHeader }, this.isMobile && this.getActionToExpandCollapsePanel(), this._hasValidLayers && this.enableNewReports &&
            h("calcite-button", { appearance: "solid", onClick: this.navigateToChooseCategory.bind(this), slot: "footer", width: "full" }, this.reportButtonText), h("calcite-panel", { "full-height": true, "full-width": true }, h("layer-list", { class: "height-full", layers: this.layers, mapView: this.mapView, noLayerErrorMsg: this._translations.noLayerToDisplayErrorMsg, onLayerSelect: this.displayFeaturesList.bind(this), onLayersListLoaded: this.layerListLoaded.bind(this), ref: el => this._layerList = el, showFeatureCount: true, showNextIcon: true }))));
    }
    /**
     * Get the layer list for creating a report
     * @returns Choose category flow item
     * @protected
     */
    getChooseCategoryFlowItem() {
        return (h("calcite-flow-item", { collapsed: this.isMobile && this._sidePanelCollapsed, heading: this._translations.createReportHeader, onCalciteFlowItemBack: this.backFromSelectedPanel.bind(this) }, this.isMobile && this.getActionToExpandCollapsePanel(), h("div", { class: "width-full", slot: "footer" }, h("calcite-button", { appearance: "solid", class: "footer-top-button footer-button", disabled: !this._selectedLayerId, onClick: this.navigateToCreateFeature.bind(this), width: "full" }, this._translations.next), h("calcite-button", { appearance: "outline", class: "footer-button", onClick: this.backFromSelectedPanel.bind(this), width: "full" }, this._translations.cancel)), h("calcite-panel", { "full-height": true, "full-width": true }, h("calcite-notice", { class: "notice-msg", icon: "lightbulb", kind: "success", open: true }, h("div", { slot: "message" }, this._translations.chooseCategoryMsg)), h("layer-list", { class: "height-full", layers: this.layers, mapView: this.mapView, noLayerErrorMsg: this._translations.noLayerToDisplayErrorMsg, onLayerSelect: this.highlightSelectedLayer.bind(this), showFeatureCount: false, showNextIcon: false }))));
    }
    /**
     * Get Feature create form of the selected feature layer
     * @returns feature create form
     * @protected
     */
    getFeatureCreateFlowItem() {
        return (h("calcite-flow-item", { collapsed: this.isMobile && this._sidePanelCollapsed, heading: this._selectedLayerName, onCalciteFlowItemBack: this.backFromCreateFeaturePanel.bind(this) }, this.isMobile && this.getActionToExpandCollapsePanel(), this._showSubmitCancelButton && h("div", { class: "width-full", slot: "footer" }, h("calcite-button", { appearance: "solid", class: "footer-top-button footer-button", onClick: this.onSubmitButtonClick.bind(this), width: "full" }, this._translations.submit), h("calcite-button", { appearance: "outline", class: "footer-button", onClick: this.backFromCreateFeaturePanel.bind(this), width: "full" }, this._translations.cancel)), h("calcite-panel", { "full-height": true, "full-width": true }, h("calcite-notice", { class: "notice-msg", icon: "lightbulb", kind: "success", open: true }, h("div", { slot: "message" }, this._translations.featureEditFormInfoMsg)), h("create-feature", { customizeSubmit: true, mapView: this.mapView, onDrawComplete: this.onDrawComplete.bind(this), onEditingAttachment: this.showSubmitCancelButton.bind(this), onFail: this.createFeatureFailed.bind(this), onSuccess: this.onReportSubmitted.bind(this), ref: el => this._createFeature = el, selectedLayerId: this._selectedLayerId }))));
    }
    /**
     * When drawing of incident location completed on map show the submit and cancel button
     * @protected
     */
    onDrawComplete() {
        this._showSubmitCancelButton = true;
    }
    /**
     * When Add attachment panel is enabled hide the submit and cancel button
     * @protected
     */
    showSubmitCancelButton(evt) {
        this._showSubmitCancelButton = !evt.detail;
    }
    /**
     * On back from create feature, call submit editor to destroy the Editor widget instance
     * @protected
     */
    onSubmitButtonClick() {
        if (this._createFeature) {
            this._createFeature.submit();
        }
    }
    /**
     * On back from create feature, call close editor to destroy the Editor widget instance
     * @protected
     */
    backFromCreateFeaturePanel() {
        if (this._createFeature) {
            this._createFeature.close();
        }
        this.backFromSelectedPanel();
    }
    /**
     * On creating the feature is failed, show the error message
     * @param evt Event which has feature failed message
     * @protected
     */
    createFeatureFailed(evt) {
        console.error(evt.detail);
        this._featureCreationFailedErrorMsg = evt.detail.message;
    }
    /**
     * On submit report navigate to the layer list home page and refresh the layer list
     * @protected
     */
    onReportSubmitted() {
        this._reportSubmitted = true;
        this.navigateToHomePage();
    }
    /**
     * Navigates to layer-list
     * @protected
     */
    navigateToHomePage() {
        if (this._createFeature) {
            this._createFeature.close();
        }
        if (this._layerList) {
            this._layerList.refresh();
        }
        this.setSelectedFeatures([]);
        this._flowItems = ["layer-list"];
    }
    /**
     * Update the selected layer id and name
     * @param evt Event which has details of selected layerId and layerName
     * @protected
     */
    highlightSelectedLayer(evt) {
        this.setSelectedLayer(evt.detail.layerId, evt.detail.layerName);
    }
    /**
     * On next button click open the feature create flow item
     * @protected
     */
    async navigateToCreateFeature() {
        this._showSubmitCancelButton = false;
        this._flowItems = [...this._flowItems, "feature-create"];
    }
    /**
     * On report an incident button click open the create a report panel with the layer list
     * @protected
     */
    navigateToChooseCategory() {
        this._flowItems = [...this._flowItems, "reporting-layer-list"];
    }
    /**
     * When layer list is loaded, we will receive the list of layers, if its  means we don't have any valid layer to be listed
     * @param evt Event which has list of layers
     * @protected
     */
    async layerListLoaded(evt) {
        const layersListed = evt.detail;
        //consider only the layers listed in the layer-list component
        const allMapLayers = await getAllLayers(this.mapView);
        this._validLayers = [];
        allMapLayers.forEach((eachLayer) => {
            if (layersListed.includes(eachLayer.id)) {
                this._validLayers.push(eachLayer);
            }
        });
        //handleMap click on layer list loaded
        this.handleMapClick();
        //update the has valid layer state
        this._hasValidLayers = layersListed.length > 0;
        //navigate to the feature details if URL params found
        if (!this._urlParamsLoaded) {
            this._urlParamsLoaded = true;
            await this.loadFeatureFromURLParams();
        }
    }
    /**On click of layer list item show feature list
     * @param evt Event which has details of selected layerId and layerName
     * @protected
     */
    displayFeaturesList(evt) {
        this.setSelectedLayer(evt.detail.layerId, evt.detail.layerName);
        this._flowItems = [...this._flowItems, "feature-list"];
    }
    /**
     * On back from selected panel navigate to the previous panel
     * @protected
     */
    backFromSelectedPanel() {
        const updatedFlowItems = [...this._flowItems];
        updatedFlowItems.pop();
        this.clearHighlights();
        //Back to layer list, and return as the flowItems will be reset in navigateToHomePage
        if (updatedFlowItems.length === 1) {
            this.navigateToHomePage();
            return;
        }
        this._flowItems = [...updatedFlowItems];
    }
    /**
     * Toggle side panel in case of mobile mode
     * @protected
     */
    toggleSidePanel() {
        this._sidePanelCollapsed = !this._sidePanelCollapsed;
        this.togglePanel.emit(this._sidePanelCollapsed);
    }
    /**
     * When feature is selected from list store that and show feature details
     * @param evt Event which has details of selected feature
     */
    async onFeatureSelectFromList(evt) {
        this.setSelectedFeatures([evt.detail]);
        this._flowItems = [...this._flowItems, "feature-details"];
    }
    /**
     * Get feature list of the selected feature layer
     * @param layerId Layer id
     * @param layerName Layer name
     * @returns feature list node
     * @protected
     */
    getFeatureListFlowItem(layerId, layerName) {
        return (h("calcite-flow-item", { collapsed: this.isMobile && this._sidePanelCollapsed, heading: layerName, onCalciteFlowItemBack: this.backFromSelectedPanel.bind(this) }, this.isMobile && this.getActionToExpandCollapsePanel(), this.enableNewReports &&
            h("calcite-button", { appearance: "solid", onClick: this.navigateToCreateFeature.bind(this), slot: "footer", width: "full" }, this.reportButtonText), h("calcite-panel", { "full-height": true }, h("feature-list", { class: "height-full", mapView: this.mapView, noFeaturesFoundMsg: this._translations.featureErrorMsg, onFeatureSelect: this.onFeatureSelectFromList.bind(this), pageSize: 30, selectedLayerId: layerId }))));
    }
    /**
     * Returns the calcite-flow item for feature details
     * @returns Node
     */
    getFeatureDetailsFlowItem() {
        return (h("calcite-flow-item", { collapsed: this.isMobile && this._sidePanelCollapsed, heading: this._selectedLayerName, onCalciteFlowItemBack: this.backFromSelectedPanel.bind(this) }, this.isMobile && this.getActionToExpandCollapsePanel(), h("instant-apps-social-share", { autoUpdateShareUrl: false, embed: false, popoverButtonIconScale: "s", ref: el => this._shareNode = el, scale: "m", shareButtonColor: "neutral", shareButtonType: "action", slot: "header-actions-end", socialMedia: true, view: this.mapView }), h("calcite-panel", { "full-height": true }, h("info-card", { allowEditing: false, graphics: this._selectedFeature, highlightEnabled: false, isLoading: false, isMobile: false, mapView: this.mapView, onSelectionChanged: this.featureDetailsChanged.bind(this), zoomAndScrollToSelected: true }))));
    }
    /**
     * Sets the selected features and updates the first feature as the current selected feature
     * @param features Graphics array of the features selected
     */
    setSelectedFeatures(features) {
        this._selectedFeature = features;
        this.setCurrentFeature(this._selectedFeature.length ? this._selectedFeature[0] : null);
    }
    /**
     * Set the object id of the current selected feature, and also updates the current selected layer details
     * @param selectedFeature Graphic currently shown in feature details
     */
    setCurrentFeature(selectedFeature) {
        if (selectedFeature && selectedFeature.layer) {
            const layer = selectedFeature.layer;
            this.setSelectedLayer(layer.id, layer.title);
            this._currentFeatureId = selectedFeature.attributes[layer.objectIdField];
        }
        else {
            this.setSelectedLayer('', '');
            this._currentFeatureId = '';
        }
        this._updateShareURL();
    }
    /**
     * On Feature details change update the Layer title and the current selected layer id
     * @param evt Event hold the details of current feature graphic in the info-card
     */
    featureDetailsChanged(evt) {
        this.setCurrentFeature(evt.detail[0]);
        void this.highlightOnMap(evt.detail[0]);
    }
    /**
     * Highlights the feature on map
     * @param selectedFeature Graphic currently shown in feature details
     */
    async highlightOnMap(selectedFeature) {
        // if a feature is already highlighted, remove the previous highlight
        this.clearHighlights();
        // highlight the newly selected feature only when it has valid geometry
        if (selectedFeature && selectedFeature.geometry && selectedFeature.layer) {
            const selectedLayerView = await getFeatureLayerView(this.mapView, selectedFeature.layer.id);
            this._highlightHandle = await highlightFeatures([selectedFeature.getObjectId()], selectedLayerView, this.mapView, true);
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
     * Returns the action button to Expand/Collapse side panel in mobile mode
     * @protected
     */
    getActionToExpandCollapsePanel() {
        return (h("calcite-action", { icon: this._sidePanelCollapsed ? "chevrons-up" : "chevrons-down", onClick: this.toggleSidePanel.bind(this), slot: "header-actions-end", text: this._sidePanelCollapsed ? this._translations.expand : this._translations.collapse }));
    }
    /**
     * Set the current map info when maps change
     * @protected
     */
    async setMapView() {
        this.mapView.popupEnabled = false;
        if (this._defaultCenter && this._defaultLevel) {
            await this.mapView.goTo({
                center: this._defaultCenter,
                zoom: this._defaultLevel
            });
            this._defaultCenter = undefined;
            this._defaultLevel = undefined;
        }
    }
    /**
     * Handle map click event
     * @param layers Array of layerIds
     *
     * @protected
     */
    handleMapClick() {
        if (this._mapClickHandle) {
            this._mapClickHandle.remove();
        }
        this._mapClickHandle = this.reactiveUtils.on(() => this.mapView, "click", this.onMapClick.bind(this));
    }
    /**
     * On map click do hitTest and get the clicked graphics of valid layers and show feature details
     * @param event IMapClick map click event details
     *
     * @protected
     */
    async onMapClick(event) {
        //disable map popup
        this.mapView.popupEnabled = false;
        // only include graphics from valid layers listed in the layer list widget
        const opts = {
            include: this._validLayers
        };
        // Perform a hitTest on the View
        const hitTest = await this.mapView.hitTest(event, opts);
        if (hitTest.results.length > 0) {
            const clickedGraphics = [];
            hitTest.results.forEach(function (result) {
                // check if the result type is graphic
                if (result.type === 'graphic') {
                    clickedGraphics.push(result.graphic);
                }
            });
            //update the selectedFeature
            this.setSelectedFeatures(clickedGraphics);
            //if featureDetails not open then add it to the list else just reInit flowItems which will update details with newly selected features
            // eslint-disable-next-line unicorn/prefer-ternary
            if (this._flowItems.length && this._flowItems[this._flowItems.length - 1] !== "feature-details") {
                this._flowItems = [...this._flowItems, "feature-details"];
            }
            else {
                this._flowItems = [...this._flowItems];
                void this.highlightOnMap(clickedGraphics[0]);
            }
        }
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
    /**
     * Updates the share url for current selected feature
     * @protected
    */
    _updateShareURL() {
        var _a, _b;
        console.log("update share url");
        const url = (_a = this._shareNode) === null || _a === void 0 ? void 0 : _a.shareUrl;
        if (!url) {
            return;
        }
        const urlObj = new URL(url);
        //set the selected layers id
        if (this._selectedLayerId) {
            urlObj.searchParams.set("layerid", this._selectedLayerId);
        }
        else {
            urlObj.searchParams.delete("layerid");
        }
        //Set the selected features objectid
        if ((_b = this._selectedFeature) === null || _b === void 0 ? void 0 : _b.length) {
            urlObj.searchParams.set("oid", this._currentFeatureId);
        }
        else {
            urlObj.searchParams.delete("oid");
        }
        //update the url in share component
        this._shareNode.shareUrl = urlObj.href;
        console.log("this._shareNode.shareUrl");
        console.log(this._shareNode.shareUrl);
    }
    /**
     * Navigates to selected features detail based on the URL params
     * @protected
     */
    async loadFeatureFromURLParams() {
        console.log("loadFeatureFromURLParams");
        if (this.layerId && this.objectId) {
            const layer = await getLayerOrTable(this.mapView, this.layerId);
            if (layer) {
                // only query if we have some ids...query with no ids will result in all features being returned
                const featureSet = await queryFeaturesByID([Number(this.objectId)], layer, [], false, this.mapView.spatialReference);
                if (featureSet.length) {
                    //update the selectedFeature
                    this._selectedFeature = featureSet;
                    //if featureDetails not open then add it to the list else just reInit flowItems which will update details with newly selected features
                    // eslint-disable-next-line unicorn/prefer-ternary
                    if (this._flowItems.length && this._flowItems[this._flowItems.length - 1] !== "feature-details") {
                        this._flowItems = [...this._flowItems, "feature-details"];
                    }
                    else {
                        this._flowItems = [...this._flowItems];
                    }
                }
            }
        }
    }
    get el() { return this; }
    static get watchers() { return {
        "isMobile": ["isMobileWatchHandler"],
        "mapView": ["mapViewWatchHandler"]
    }; }
    static get style() { return crowdsourceReporterCss; }
}, [0, "crowdsource-reporter", {
        "description": [1],
        "isMobile": [4, "is-mobile"],
        "enableAnonymousAccess": [4, "enable-anonymous-access"],
        "enableAnonymousComments": [4, "enable-anonymous-comments"],
        "enableComments": [4, "enable-comments"],
        "enableLogin": [4, "enable-login"],
        "enableNewReports": [4, "enable-new-reports"],
        "layers": [16],
        "loginTitle": [1, "login-title"],
        "mapView": [16],
        "layerId": [1, "layer-id"],
        "objectId": [1, "object-id"],
        "reportButtonText": [1, "report-button-text"],
        "reportsHeader": [1, "reports-header"],
        "reportSubmittedMessage": [1, "report-submitted-message"],
        "searchConfiguration": [16],
        "showComments": [4, "show-comments"],
        "defaultWebmap": [1, "default-webmap"],
        "enableSearch": [4, "enable-search"],
        "enableHome": [4, "enable-home"],
        "mapInfos": [16],
        "theme": [1],
        "enableZoom": [4, "enable-zoom"],
        "_mapInfo": [32],
        "_flowItems": [32],
        "_sidePanelCollapsed": [32],
        "_translations": [32],
        "_hasValidLayers": [32],
        "_selectedLayerName": [32],
        "_reportSubmitted": [32],
        "_showSubmitCancelButton": [32],
        "_featureCreationFailedErrorMsg": [32]
    }, undefined, {
        "isMobile": ["isMobileWatchHandler"],
        "mapView": ["mapViewWatchHandler"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["crowdsource-reporter", "calcite-action", "calcite-action-menu", "calcite-alert", "calcite-button", "calcite-chip", "calcite-filter", "calcite-flow", "calcite-flow-item", "calcite-handle", "calcite-icon", "calcite-input", "calcite-list", "calcite-list-item", "calcite-loader", "calcite-modal", "calcite-notice", "calcite-pagination", "calcite-panel", "calcite-popover", "calcite-progress", "calcite-scrim", "calcite-shell", "calcite-stack", "calcite-tooltip", "create-feature", "delete-button", "edit-card", "feature-list", "info-card", "instant-apps-social-share", "layer-list"];
    components.forEach(tagName => { switch (tagName) {
        case "crowdsource-reporter":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, CrowdsourceReporter$1);
            }
            break;
        case "calcite-action":
            if (!customElements.get(tagName)) {
                defineCustomElement$w();
            }
            break;
        case "calcite-action-menu":
            if (!customElements.get(tagName)) {
                defineCustomElement$v();
            }
            break;
        case "calcite-alert":
            if (!customElements.get(tagName)) {
                defineCustomElement$u();
            }
            break;
        case "calcite-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$t();
            }
            break;
        case "calcite-chip":
            if (!customElements.get(tagName)) {
                defineCustomElement$s();
            }
            break;
        case "calcite-filter":
            if (!customElements.get(tagName)) {
                defineCustomElement$r();
            }
            break;
        case "calcite-flow":
            if (!customElements.get(tagName)) {
                defineCustomElement$q();
            }
            break;
        case "calcite-flow-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$p();
            }
            break;
        case "calcite-handle":
            if (!customElements.get(tagName)) {
                defineCustomElement$o();
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$n();
            }
            break;
        case "calcite-input":
            if (!customElements.get(tagName)) {
                defineCustomElement$m();
            }
            break;
        case "calcite-list":
            if (!customElements.get(tagName)) {
                defineCustomElement$l();
            }
            break;
        case "calcite-list-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$k();
            }
            break;
        case "calcite-loader":
            if (!customElements.get(tagName)) {
                defineCustomElement$j();
            }
            break;
        case "calcite-modal":
            if (!customElements.get(tagName)) {
                defineCustomElement$i();
            }
            break;
        case "calcite-notice":
            if (!customElements.get(tagName)) {
                defineCustomElement$h();
            }
            break;
        case "calcite-pagination":
            if (!customElements.get(tagName)) {
                defineCustomElement$g();
            }
            break;
        case "calcite-panel":
            if (!customElements.get(tagName)) {
                defineCustomElement$f();
            }
            break;
        case "calcite-popover":
            if (!customElements.get(tagName)) {
                defineCustomElement$e();
            }
            break;
        case "calcite-progress":
            if (!customElements.get(tagName)) {
                defineCustomElement$d();
            }
            break;
        case "calcite-scrim":
            if (!customElements.get(tagName)) {
                defineCustomElement$c();
            }
            break;
        case "calcite-shell":
            if (!customElements.get(tagName)) {
                defineCustomElement$b();
            }
            break;
        case "calcite-stack":
            if (!customElements.get(tagName)) {
                defineCustomElement$a();
            }
            break;
        case "calcite-tooltip":
            if (!customElements.get(tagName)) {
                defineCustomElement$9();
            }
            break;
        case "create-feature":
            if (!customElements.get(tagName)) {
                defineCustomElement$8();
            }
            break;
        case "delete-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "edit-card":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "feature-list":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "info-card":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "instant-apps-social-share":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "layer-list":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}
defineCustomElement$1();

const CrowdsourceReporter = CrowdsourceReporter$1;
const defineCustomElement = defineCustomElement$1;

export { CrowdsourceReporter, defineCustomElement };
