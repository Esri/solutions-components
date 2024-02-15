/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-164d485a.js';
import { l as loadModules, g as getLocaleComponentStrings } from './locale-25a5ae3e.js';
import { a as getAllLayers, b as getFeatureLayerView, h as highlightFeatures, g as getLayerOrTable, q as queryFeaturesByID } from './mapViewUtils-257bc9b3.js';
import './esri-loader-eda07632.js';
import './_commonjsHelpers-d5f9d613.js';
import './interfaces-586e863c.js';

const crowdsourceReporterCss = ":host{display:block;--calcite-label-margin-bottom:0px;--solutions-theme-foreground-color:var(--calcite-color-foreground-1)}.width-full{width:100% !important}.width-0{width:0}.height-full{height:100% !important}.height-0{height:0}.overflow-hidden{overflow:hidden}.border{border:1px solid var(--calcite-color-border-3)}.notice-msg{padding:10px;width:calc(100% - 20px)}.footer-top-button{padding-bottom:7px}.footer-button{height:35px}";

const CrowdsourceReporter = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
    }
    /**
     * Navigates to selected features detail based on the URL params
     * @protected
     */
    async loadFeatureFromURLParams() {
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
    get el() { return getElement(this); }
    static get watchers() { return {
        "isMobile": ["isMobileWatchHandler"],
        "mapView": ["mapViewWatchHandler"]
    }; }
};
CrowdsourceReporter.style = crowdsourceReporterCss;

export { CrowdsourceReporter as crowdsource_reporter };
