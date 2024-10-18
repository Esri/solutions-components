/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-4b68e4b4.js');
const locale = require('./locale-339b55f0.js');
const mapViewUtils = require('./mapViewUtils-18c46b84.js');
require('./esri-loader-08dc41bd.js');
require('./_commonjsHelpers-baf43783.js');
require('./interfaces-09c4c40e.js');

const crowdsourceReporterCss = ":host{display:block;--calcite-label-margin-bottom:0px;--solutions-theme-foreground-color:var(--calcite-color-foreground-1)}.width-full{width:100% !important}.width-0{width:0}.height-full{height:100% !important}.height-0{height:0}.overflow-hidden{overflow:hidden}.border{border:1px solid var(--calcite-color-border-3)}.notice-msg{padding:10px;width:calc(100% - 20px)}.progress-bar{padding:12px}.footer-top-button{padding-bottom:7px}.footer-button{height:35px}.feature-pagination{background-color:var(--calcite-color-foreground-1) !important;border-block-end:1px solid var(--calcite-color-border-3);display:flex;justify-content:center;padding:5px 0}.pagination-count{color:var(--calcite-color-brand);border-bottom:1px solid var(--calcite-color-brand);font-weight:bold}.report-submitted-msg{position:absolute;z-index:1000}.share-node{display:flex}";
const CrowdsourceReporterStyle0 = crowdsourceReporterCss;

const CrowdsourceReporter = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.togglePanel = index.createEvent(this, "togglePanel", 7);
        this.center = undefined;
        this.commentButtonText = undefined;
        this.commentSubmittedMessage = undefined;
        this.defaultWebmap = "";
        this.description = undefined;
        this.enableAnonymousAccess = undefined;
        this.enableAnonymousComments = undefined;
        this.enableComments = undefined;
        this.enableHome = true;
        this.enableLogin = undefined;
        this.enableNewReports = undefined;
        this.enableSearch = true;
        this.enableZoom = true;
        this.isMobile = undefined;
        this.layerExpressions = [];
        this.layerId = undefined;
        this.level = undefined;
        this.loginTitle = undefined;
        this.mapInfos = [];
        this.mapView = undefined;
        this.objectId = undefined;
        this.reportButtonText = undefined;
        this.reportingOptions = undefined;
        this.reportsHeader = undefined;
        this.reportSubmittedMessage = undefined;
        this.searchConfiguration = undefined;
        this.showComments = undefined;
        this.showUserImageInCommentsList = false;
        this.showFeatureSymbol = false;
        this.showMyReportsOnly = false;
        this.theme = "light";
        this.zoomToScale = undefined;
        this.floorLevel = undefined;
        this._featureCreationFailedErrorMsg = undefined;
        this._filterActive = false;
        this._flowItems = [];
        this._hasValidLayers = false;
        this._mapInfo = undefined;
        this._reportSubmitted = false;
        this._selectedLayerName = undefined;
        this._showSubmitCancelButton = false;
        this._showLoadingIndicator = false;
        this._sidePanelCollapsed = false;
        this._translations = undefined;
        this._updatedProgressBarStatus = 0.25;
        this._updatedSorting = undefined;
        this._updatedSortOption = "sortNewest";
        this._commentSubmitted = false;
        this._addingCommentFailed = false;
    }
    get el() { return index.getElement(this); }
    //--------------------------------------------------------------------------
    //
    //  Properties (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * HTMLCreateFeatureElement: Create Feature component instance
     */
    _createFeature;
    /**
     * ObjectId of the feature currently shown in the details
     */
    _currentFeatureId;
    /**
     * number[]: X,Y pair used to center the map
     */
    _defaultCenter;
    /**
     * number: zoom level the map should go to
     */
    _defaultLevel;
    /**
     * string[]: Configured/all layers id from current map which can be used for reporting
     */
    _editableLayerIds;
    /**
     * HTMLCreateFeatureElement: features details component instance
     */
    _featureDetails;
    /**
     * HTMLFeatureListElement: Create feature list component instance
     */
    _featureList;
    /**
     * __esri.Graphic: The current selected feature
     */
    _currentFeature;
    /**
     * __esri.Graphic: The selected related feature from layer table
     */
    _selectedRelatedFeature;
    /**
     * __esri.FeatureLayer: The related table from map
     */
    _relatedTable;
    /**
     * HTMLInstantAppsFilterListElement: Component from Instant Apps that supports interacting with the current filter config
     */
    _filterList;
    /**
     * __esri.Handle: Highlight handles of the selections
     */
    _highlightHandle;
    /**
     * HTMLLayerListElement: Create Layer list component instance
     */
    _layerList;
    /**
     * HTMLCreateFeatureElement: Create Feature component instance
     */
    _createRelatedFeature;
    /**
     * string[]: list of configured reporting layer ids
     */
    _layers;
    /**
     * IMapChange: The current map change details
     */
    _mapChange;
    /**
     * IHandle: The map click handle
     */
    _mapClickHandle;
    /**
     * esri/core/reactiveUtils: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-reactiveUtils.html
     */
    reactiveUtils;
    /**
     * "esri/layers/support/FeatureFilter": https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-support-FeatureFilter.html
     * Esri FeatureFilter
     */
    FeatureFilter;
    /**
     * __esri.Graphic: The selected feature
     */
    _selectedFeature;
    /**
     * number: selected feature index
     */
    _selectedFeatureIndex;
    /**
     * string: The selected feature layer's id from the layer's list
     */
    _selectedLayerId;
    /**
     * HTMLInstantAppsSocialShareElement: Share element
     */
    _shareNode;
    /**
     * boolean: Maintains a flag to know if urls params are loaded or not
     */
    _urlParamsLoaded;
    /**
     * __esri.FeatureLayer[]: Valid layers from the current map
     */
    _validLayers;
    /**
     * __esri.FeatureLayer[]: layer from map whom visibility is disabled
     */
    _nonVisibleValidLayers;
    /**
     * __esri.FeatureLayer: Selected feature layer from the layer list
     */
    _selectedLayer;
    /**
     * ILayerItemsHash: LayerDetailsHash for each layer in the map
     */
    _layerItemsHash;
    /**
     * boolean: when true allow panel to show in full height
     */
    _showFullPanel;
    /**
     * string: The current floor expression
     */
    _floorExpression;
    /**
     * _esri.Element: form elements of the selected layer
     */
    _formElements = [];
    /**
     * string[]: URL params set by using filters.
     */
    _filterUrlParams;
    /**
     * FilterInitState: filter's init state
     */
    _filterInitState;
    /**
     * string: Previous selected layer id
     */
    _prevSelectedLayerId;
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    /**
     * Called each time the mapView prop is changed.
     */
    async isMobileWatchHandler() {
        this.updatePanelState(false, this._showFullPanel);
    }
    /**
     * Called each time the mapView prop is changed.
     */
    async mapViewWatchHandler() {
        await this.mapView.when(async () => {
            await this.setMapView();
        });
    }
    /**
     * Called each time the floorLevel prop is changed.
     */
    async floorLevelWatchHandler() {
        if (this._editableLayerIds) {
            // updates all layer's defination expression when floorLevel is changed
            // then refresh the components to update features
            for (const layerId of this._editableLayerIds) {
                const layer = await mapViewUtils.getLayerOrTable(this.mapView, layerId);
                if (layer.floorInfo?.floorField) {
                    this._updateFloorDefinitionExpression(layer);
                }
            }
        }
        // refresh layer list when user is on layer list panel
        if (this._flowItems[this._flowItems.length - 1] === "layer-list" && this._layerList) {
            await this._layerList.refresh();
        }
        if (this._featureList) {
            void this._featureList.refresh();
        }
        if (this._createFeature) {
            void this._createFeature.refresh(this.floorLevel);
        }
    }
    /**
     * Called each time the my reports toggle is changed
     */
    async showMyReportsOnlyWatchHandler() {
        if (this._editableLayerIds) {
            await this._updateFeatures();
            setTimeout(() => {
                // refresh layer list when user is on layer list panel 
                if (this._flowItems[this._flowItems.length - 1] === "layer-list" && this._layerList) {
                    void this._layerList.refresh();
                }
                if (this._featureList) {
                    void this._featureList.refresh();
                }
            }, 50);
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Methods (public)
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Events (public)
    //
    //--------------------------------------------------------------------------
    /**
    * Emitted when toggle panel button is clicked in reporter
    */
    togglePanel;
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
        await this.mapView?.when(async () => {
            //set configured layers array which are enabled for data collection
            this._layers = this.reportingOptions ? Object.keys(this.reportingOptions).filter((layerId) => {
                return this.reportingOptions[layerId].visible;
            }) : [];
            await this.setMapView();
        });
    }
    /**
     * Renders the component.
     */
    render() {
        const themeClass = this.theme === "dark" ? "calcite-mode-dark" : "calcite-mode-light";
        return (index.h(index.Host, { key: 'c8f50d4d6004a875444a863a9e839442708f732b' }, this._reportSubmitted && index.h("calcite-alert", { key: '5f556d67fd9f04c6277b88c0ad0f774ec9216850', "auto-close": true, class: themeClass + " report-submitted-msg", icon: "check-circle", kind: "success", label: "", onCalciteAlertClose: () => { this._reportSubmitted = false; }, open: true, placement: "top" }, index.h("div", { key: '0204b9967307421fdfeafc61eca006db62f99aab', slot: "message" }, this.reportSubmittedMessage ? this.reportSubmittedMessage : this._translations.submitMsg)), this._featureCreationFailedErrorMsg && index.h("calcite-alert", { key: 'fd21dc9f77fddd3b5a1edcef8f4ac0983018fb97', "auto-close": true, class: themeClass, icon: "x-octagon", kind: "danger", label: "", onCalciteAlertClose: () => { this._featureCreationFailedErrorMsg = ""; }, open: true, placement: "top" }, index.h("div", { key: '3a33593f8c3285d38f651316ea2f4acc148606ec', slot: "title" }, this._translations.error), index.h("div", { key: '588890b6760a7657218282ddff9f3db94b9f73f6', slot: "message" }, this._featureCreationFailedErrorMsg)), this._commentSubmitted && index.h("calcite-alert", { key: 'b999711f77b1f5c94a84b4ca5f80d33a4d352ea2', "auto-close": true, class: 'report-submitted ' + themeClass, icon: "check-circle", kind: "success", label: "", onCalciteAlertClose: () => { this._commentSubmitted = false; }, open: true, placement: "top" }, index.h("div", { key: 'ed7f7b1604d5dcdbf146fdbae108081742806587', slot: "message" }, this.commentSubmittedMessage || this._translations.commentSubmittedMsg)), this._addingCommentFailed && index.h("calcite-alert", { key: '4bbcb945e9cc232ba77b327247b37b4ca420a77c', "auto-close": true, class: themeClass, icon: "x-octagon", kind: "danger", label: "", onCalciteAlertClose: () => { this._addingCommentFailed = false; }, open: true, placement: "top" }, index.h("div", { key: 'b75dad85bd1a793232c99b7d870fc9df9ccc0303', slot: "title" }, this._translations.error), index.h("div", { key: 'f161f78d54beba9ecaeccedd69d8e019c88a48e4', slot: "message" }, this._translations.addingCommentFailedMsg)), index.h("div", { key: '43aea9a8138da6645ee420e9e2abe21a3cbe4c91' }, index.h("calcite-shell", { key: '5fd031aba8feed8d54e3118a7a99a5be8254c89f', "content-behind": true }, this._getReporter()))));
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
        const [reactiveUtils, FeatureFilter] = await locale.loadModules([
            "esri/core/reactiveUtils",
            "esri/layers/support/FeatureFilter"
        ]);
        this.reactiveUtils = reactiveUtils;
        this.FeatureFilter = FeatureFilter;
    }
    /**
     * Set the selected layer id and layer name
     * @param layerId string layerId of the selected layer
     * @param layerName string layerName of the selected layer
     */
    async setSelectedLayer(layerId, layerName) {
        this._selectedLayerId = layerId;
        this._selectedLayer = await mapViewUtils.getLayerOrTable(this.mapView, layerId);
        this._selectedLayerName = layerName;
        //show only current layer on map and hide other valid editable layers
        //if layerId is empty then show all the layers on map
        this._validLayers.forEach(layer => {
            const nonVisibileValidLayer = this._nonVisibleValidLayers.find((l) => l.id === layer.id);
            if (!nonVisibileValidLayer) {
                layer.set('visible', !layerId || (layer.id === layerId));
            }
        });
    }
    /**
     * Returns the layers configuration
     * @param layerId string layerId of the selected layer
     * @returns Configuration for the layerId
     */
    _getLayersConfig(layerId) {
        return this.reportingOptions && this.reportingOptions[layerId] ? this.reportingOptions[layerId] : null;
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
                case "filter-panel":
                    renderLists.push(this.getFilterPanel());
                    void this._restoreFilters();
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
                case "comment-details":
                    renderLists.push(this.getCommentDetailsFlowItem());
                    break;
                case "add-comment":
                    renderLists.push(this.getAddCommentFlowItem());
                    break;
            }
        });
        const themeClass = this.theme === "dark" ? "calcite-mode-dark" : "calcite-mode-light";
        return (index.h("calcite-panel", { class: "width-full " + themeClass }, this.mapView
            ? index.h("calcite-flow", null, renderLists?.length > 0 && renderLists)
            : index.h("calcite-loader", { label: "", scale: "m" })));
    }
    /**
     * On sort option click update the sort field and sort order
     * @param sortField sort field
     * @param sortOrder sort order
     * @param sortOption selected sort option (Newest/Oldest/Highest Voted/Lowest Voted)
     */
    async sortOptionClick(sortField, sortOrder, sortOption) {
        this._updatedSorting = {
            field: sortField,
            order: sortOrder
        };
        this._updatedSortOption = sortOption;
    }
    /**
     * On sort button click, display the sorting options
     * @returns Sort options list
     */
    _toggleSort() {
        const canSortByVotes = this.reportingOptions && this.reportingOptions[this._selectedLayerId] &&
            this.reportingOptions[this._selectedLayerId].like && this.reportingOptions[this._selectedLayerId].likeField;
        return (index.h("calcite-popover", { autoClose: true, label: "", offsetDistance: 0, placement: this.isMobile ? "leading-start" : "bottom-start", pointerDisabled: true, referenceElement: "sort-popover" }, index.h("calcite-list", { "selection-mode": "single" }, index.h("calcite-list-item", { label: this._translations.sortNewest, onCalciteListItemSelect: () => { void this.sortOptionClick(this._selectedLayer.objectIdField, "desc", "sortNewest"); }, selected: this._updatedSortOption === "sortNewest", value: "sortNewest" }), index.h("calcite-list-item", { label: this._translations.sortOldest, onCalciteListItemSelect: () => { void this.sortOptionClick(this._selectedLayer.objectIdField, "asc", "sortOldest"); }, selected: this._updatedSortOption === "sortOldest", value: "sortOldest" }), canSortByVotes &&
            index.h(index.Fragment, null, index.h("calcite-list-item", { label: this._translations.sortHighestVoted, onCalciteListItemSelect: () => { void this.sortOptionClick(this.reportingOptions[this._selectedLayerId].likeField, "desc", "sortHighestVoted"); }, selected: this._updatedSortOption === "sortHighestVoted", value: "sortHighestVoted" }), index.h("calcite-list-item", { label: this._translations.sortLowestVoted, onCalciteListItemSelect: () => { void this.sortOptionClick(this.reportingOptions[this._selectedLayerId].likeField, "asc", "sortLowestVoted"); }, selected: this._updatedSortOption === "sortLowestVoted", value: "sortLowestVoted" })))));
    }
    /**
     * Restores the applied filters
     * @protected
     */
    _restoreFilters() {
        // call the restore function when instant-apps-filter-list is ready
        setTimeout(() => {
            const canRestoreFilter = this._filterList && this._filterUrlParams && this._filterInitState;
            if (canRestoreFilter) {
                void this._filterList.restoreFilters(this._filterUrlParams[0], this._filterInitState);
            }
            this._filterInitState = null;
        }, 200);
    }
    /**
     * Reset the filter
     * @protected
     */
    async _handleFilterListReset() {
        //on reset filter list reset the filter states
        this._filterActive = false;
        this._filterUrlParams = null;
        this._filterInitState = null;
    }
    /**
     * Check if the layers definitionExpression has been modified and update the feature list depending on the applied filters
     * @protected
     */
    async _handleFilterUpdate() {
        this._showLoadingIndicator = true;
        //if filter are applied the url params will be generated
        //set the filter active state based on the length of applied filters
        this._filterActive = this._filterList.urlParams.getAll('filter').length > 0;
        this._filterUrlParams = this._filterList.urlParams.getAll('filter');
        await this._featureList.refresh();
        this._showLoadingIndicator = false;
    }
    /**
     * Get the feature layer list
     * @returns the layer list items
     * @protected
     */
    getLayerListFlowItem() {
        return (index.h("calcite-flow-item", { collapsed: this.isMobile && this._sidePanelCollapsed, heading: this.reportsHeader }, this.isMobile && this.getActionToExpandCollapsePanel(), this._hasValidLayers && this.enableNewReports &&
            index.h("calcite-button", { appearance: "solid", onClick: this.navigateToChooseCategory.bind(this), slot: "footer", width: "full" }, this.reportButtonText ? this.reportButtonText : this._translations.createReportButtonText), index.h("calcite-panel", { "full-height": true, "full-width": true }, index.h("layer-list", { applyLayerViewFilter: this.showMyReportsOnly, class: "height-full", layers: this._editableLayerIds?.length > 0 ? this._editableLayerIds : this._layers, mapView: this.mapView, onLayerSelect: this.displayFeaturesList.bind(this), onLayersListLoaded: this.layerListLoaded.bind(this), ref: el => this._layerList = el, showFeatureCount: true, showNextIcon: true }))));
    }
    /**
     * Get the layer list for creating a report
     * @returns Choose category flow item
     * @protected
     */
    getChooseCategoryFlowItem() {
        const onlyReportingLayers = this.reportingOptions ? Object.keys(this.reportingOptions).filter((layerId) => {
            return this.reportingOptions[layerId].visible && this.reportingOptions[layerId].reporting && this._layerItemsHash[layerId] && this._layerItemsHash[layerId].supportsAdd;
        }) : [];
        return (index.h("calcite-flow-item", { collapsed: this.isMobile && this._sidePanelCollapsed, heading: this.reportButtonText ? this.reportButtonText : this._translations.createReportButtonText, onCalciteFlowItemBack: this.backFromSelectedPanel.bind(this) }, index.h("calcite-panel", { "full-height": true, "full-width": true }, index.h("div", { class: "progress-bar" }, index.h("calcite-progress", { type: "determinate", value: this._updatedProgressBarStatus })), index.h("calcite-notice", { class: "notice-msg", icon: "lightbulb", kind: "success", open: true }, index.h("div", { slot: "message" }, this._translations.chooseCategoryMsg)), index.h("layer-list", { class: "height-full", layers: onlyReportingLayers, mapView: this.mapView, onLayerSelect: this.navigateToCreateFeature.bind(this), showFeatureCount: false, showNextIcon: false }))));
    }
    /**
     * Get Feature create form of the selected feature layer
     * @returns feature create form
     * @protected
     */
    getFeatureCreateFlowItem() {
        return (index.h("calcite-flow-item", { collapsed: this.isMobile && this._sidePanelCollapsed, heading: this._selectedLayerName, onCalciteFlowItemBack: this.backFromCreateFeaturePanel.bind(this) }, this._showSubmitCancelButton && index.h("div", { class: "width-full", slot: "footer" }, index.h("calcite-button", { appearance: "solid", class: "footer-top-button footer-button", onClick: this.onCreateFeatureSubmitButtonClick.bind(this), width: "full" }, this._translations.submit), index.h("calcite-button", { appearance: "outline", class: "footer-button", onClick: this.backFromCreateFeaturePanel.bind(this), width: "full" }, this._translations.cancel)), index.h("calcite-panel", { "full-height": true, "full-width": true }, index.h("div", { class: "progress-bar" }, index.h("calcite-progress", { type: "determinate", value: this._updatedProgressBarStatus })), index.h("create-feature", { customizeSubmit: true, enableSearch: true, floorLevel: this.floorLevel, formElements: this._formElements.find(elm => elm.id === this._selectedLayerId), isMobile: this.isMobile, mapView: this.mapView, onDrawComplete: this.onFormReady.bind(this), onEditingAttachment: this.showSubmitCancelButton.bind(this), onFail: this.createFeatureFailed.bind(this), onModeChanged: this.backFromCreateFeaturePanel.bind(this), onProgressStatus: this.updatedProgressStatus.bind(this), onSuccess: this.onReportSubmitted.bind(this), ref: el => this._createFeature = el, searchConfiguration: this.searchConfiguration, selectedLayerId: this._selectedLayerId }))));
    }
    /**
     * Update the progress bar status when editor panel changes
     * @param evt Event which has progress bar status
     * @protected
     */
    updatedProgressStatus(evt) {
        this._updatedProgressBarStatus = evt.detail;
    }
    /**
     * When form is ready then show submit and cancel button
     * @protected
     */
    onFormReady() {
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
    onCreateFeatureSubmitButtonClick() {
        if (this._createFeature) {
            void this._createFeature.submit();
        }
    }
    /**
     * On back from create feature, call close editor to destroy the Editor widget instance
     * @protected
     */
    backFromCreateFeaturePanel() {
        if (this._createFeature) {
            void this.updateNonVisibleLayersOnMap(false);
        }
        //on back form will be closed, so update the form state
        this.backFromSelectedPanel();
    }
    /**
     * On back from create realated feature, call submit editor to destroy the Editor widget instance
     * @protected
     */
    onCreateRelatedFeatureSubmitButtonClick() {
        if (this._createRelatedFeature) {
            void this._createRelatedFeature.submit();
        }
    }
    /**
     * On back from create related feature, call close editor to destroy the Editor widget instance
     * @protected
     */
    backFromCreateRelatedFeaturePanel() {
        if (this._createRelatedFeature) {
            this._showSubmitCancelButton = false;
        }
        //on back form will be closed, so update the form state
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
    async onReportSubmitted() {
        void this.updateNonVisibleLayersOnMap(false);
        await this.navigateToHomePage();
        this._reportSubmitted = true;
        this._updatedProgressBarStatus = 0.25;
        //on report submit form will be closed, so update the form state
        if (this._showFullPanel) {
            this.updatePanelState(this._sidePanelCollapsed, false);
        }
    }
    /**
     * On adding the is failed, show the error message
     * @param evt Event which has comment failed message
     * @protected
     */
    addCommentFailed(evt) {
        console.error(evt.detail);
        this._addingCommentFailed = true;
    }
    /**
     * On submit comment navigate to the feature list and refresh the feature details
     * @protected
     */
    async onCommentSubmitted() {
        this._commentSubmitted = true;
        this.backFromSelectedPanel();
        this._showLoadingIndicator = true;
        //update the feature details to reflect the like, dislike and comment values
        await this._featureDetails.refresh(this._currentFeature);
        setTimeout(() => {
            this._showLoadingIndicator = false;
        }, 300);
    }
    /**
     * Navigates to layer-list
     * @protected
     */
    async navigateToHomePage() {
        // set the selected features and then refresh the layer list to maintain the layer's visibility state
        await this.setSelectedFeatures([]);
        if (this._layerList) {
            await this._layerList.refresh();
        }
        if (this._editableLayerIds.length === 1) {
            await this._featureList.refresh();
            this._flowItems = ["feature-list"];
        }
        else {
            this._flowItems = ["layer-list"];
        }
    }
    /**
     * On layer select open the feature create flow item
     * @param evt Event which has details of selected layerId and layerName
     * @protected
     */
    async navigateToCreateFeature(evt) {
        if (evt.detail.layerId && evt.detail.layerName) {
            await this.setSelectedLayer(evt.detail.layerId, evt.detail.layerName);
        }
        // reset the applied filter when switching to another layer
        if (this._selectedLayerId !== this._prevSelectedLayerId && this._filterActive) {
            await this.resetFilter();
        }
        void this.updateNonVisibleLayersOnMap(true);
        // get the form template elements to pass in create-feature to create a LEVELID field in feature-form
        this._getFormElements();
        this._showSubmitCancelButton = false;
        this.updatePanelState(false, true);
        this._flowItems = [...this._flowItems, "feature-create"];
    }
    /**
     * On report an incident button click open the create a report panel with the layer list
     * @protected
     */
    navigateToChooseCategory() {
        this.updatePanelState(false, true);
        this._flowItems = [...this._flowItems, "reporting-layer-list"];
    }
    /**
     * updates the non visible layer visibility
     * @param visible boolean value to set the layers visibility
     */
    updateNonVisibleLayersOnMap(visible) {
        const isNonVisibleValidLayerSelected = this._nonVisibleValidLayers.find((layer) => layer.id === this._selectedLayerId);
        if (isNonVisibleValidLayerSelected) {
            this._selectedLayer.set('visible', visible);
        }
    }
    /**
     * When layer list is loaded, we will receive the list of layers, if its  means we don't have any valid layer to be listed
     * @param evt Event which has list of layers
     * @protected
     */
    async layerListLoaded(evt) {
        const layersListed = evt.detail;
        //consider only the layers listed in the layer-list component
        const allMapLayers = await mapViewUtils.getAllLayers(this.mapView);
        const reportingEnabledLayerIds = [];
        this._validLayers = [];
        this._nonVisibleValidLayers = [];
        allMapLayers.forEach((eachLayer) => {
            if (layersListed.includes(eachLayer.id)) {
                this._validLayers.push(eachLayer);
                if (!eachLayer.visible) {
                    this._nonVisibleValidLayers.push(eachLayer);
                }
                //create list of reporting enabled layers
                if (this._getLayersConfig(eachLayer.id)?.reporting && this._layerItemsHash[eachLayer.id] && this._layerItemsHash[eachLayer.id].supportsAdd) {
                    reportingEnabledLayerIds.push(eachLayer.id);
                }
            }
        });
        //handleMap click on layer list loaded
        this.handleMapClick();
        //When we have any reporting layer then only show the create report button on layerList
        this._hasValidLayers = reportingEnabledLayerIds.length > 0;
        //navigate to the feature details if URL params found
        if (!this._urlParamsLoaded) {
            this._urlParamsLoaded = true;
            await this.loadFeatureFromURLParams();
        }
    }
    /**
     * On click of layer list item show feature list
     * @param evt Event which has details of selected layerId and layerName
     * @protected
     */
    async displayFeaturesList(evt) {
        this._updatedSorting = {
            field: '',
            order: 'desc'
        };
        this._updatedSortOption = "sortNewest";
        await this.setSelectedLayer(evt.detail.layerId, evt.detail.layerName);
        this._flowItems = [...this._flowItems, "feature-list"];
        // reset the applied filter when switching to another layer
        if (this._selectedLayerId !== this._prevSelectedLayerId && this._filterActive) {
            await this.resetFilter();
        }
        this._prevSelectedLayerId = this._selectedLayerId;
    }
    /**
     * Reset's the applied filter
     * @protected
     */
    async resetFilter() {
        const prevLayer = await mapViewUtils.getLayerOrTable(this.mapView, this._prevSelectedLayerId);
        prevLayer.definitionExpression = this._filterInitState.initDefExpressions[this._prevSelectedLayerId];
        void this._handleFilterListReset();
    }
    /**
     * On back from filter panel get the filter's init state
     * @protected
     */
    async backFromFilterPanel() {
        this._filterInitState = await this._filterList.getFilterInitState();
        await this._featureList.refresh();
        this.backFromSelectedPanel();
    }
    /**
     * On back from selected panel navigate to the previous panel
     * @protected
     */
    backFromSelectedPanel() {
        this._updatedProgressBarStatus = 0.25;
        const updatedFlowItems = [...this._flowItems];
        // when back from comment details or add comment page don't clear the highlighted feature of map
        if (!(updatedFlowItems[updatedFlowItems.length - 1] === 'comment-details' ||
            updatedFlowItems[updatedFlowItems.length - 1] === 'add-comment')) {
            this.clearHighlights();
        }
        // update the panel to the default state while coming back from Reports creation
        if (updatedFlowItems[updatedFlowItems.length - 1] === 'reporting-layer-list' || (updatedFlowItems[updatedFlowItems.length - 1] === 'feature-create' &&
            (updatedFlowItems[0] === 'feature-list' || updatedFlowItems[updatedFlowItems.length - 2] === 'feature-list'))) {
            this.updatePanelState(this._sidePanelCollapsed, false);
        }
        updatedFlowItems.pop();
        //Back to layer list, and return as the flowItems will be reset in navigateToHomePage
        if (updatedFlowItems.length === 1 && updatedFlowItems[0] === 'layer-list') {
            void this.navigateToHomePage();
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
        this.togglePanel.emit({ panelState: this._sidePanelCollapsed, isFormOpen: this._showFullPanel });
    }
    /**
     * Updates the Panel state
     * @param sidePanelCollapsed side panel collapsed state
     * @param showFullPanel updated panel state
     * @protected
     */
    updatePanelState(sidePanelCollapsed, showFullPanel) {
        this._sidePanelCollapsed = sidePanelCollapsed;
        this._showFullPanel = showFullPanel;
        this.togglePanel.emit({ panelState: this._sidePanelCollapsed, isFormOpen: this._showFullPanel });
    }
    /**
     * When feature is selected from list store that and show feature details
     * @param evt Event which has details of selected feature
     */
    async onFeatureSelectFromList(evt) {
        this._showLoadingIndicator = true;
        await this.setSelectedFeatures([evt.detail]);
        this._flowItems = [...this._flowItems, "feature-details"];
    }
    /**
     * Gets related table id of the selected feature's layer
     * @protected
     */
    async getRelatedTable() {
        const selectedLayer = this._currentFeature.layer;
        const allTables = await mapViewUtils.getAllTables(this.mapView);
        selectedLayer.relationships.some((relationship) => {
            const relatedTables = allTables.filter((table) => selectedLayer.url === table.url && table.layerId === relationship.relatedTableId);
            if (relatedTables && relatedTables.length > 0) {
                this._relatedTable = relatedTables[0];
                return true;
            }
        });
    }
    /**
     * Show loading indicator while updating the feature details component
     * @param isLoading is feature detail component loading
     */
    async updatingFeatureDetails(isLoading) {
        this._showLoadingIndicator = isLoading;
    }
    /**
   * On Feature details change update the Layer title and the current selected layer id
   * @param evt Event hold the details of current feature graphic from the feature-details
   * @protected
   */
    async selectionChanged(evt) {
        void this.updatingFeatureDetails(true);
        await this.setCurrentFeature(evt.detail.selectedFeature[0]);
        void this.highlightOnMap(evt.detail.selectedFeature[0]);
        this._selectedFeatureIndex = evt.detail.selectedFeatureIndex;
        //update the feature details to reflect the like, dislike and comment values
        await this._featureDetails.refresh(evt.detail.selectedFeature[0]);
    }
    /**
     * Shows the add comments panel
     */
    showAddCommentsPanel() {
        this._flowItems = [...this._flowItems, "add-comment"];
    }
    /**
     * When comment is selected from list store that and show comment details
     * @param evt Event which has details of selected feature
     * @protected
     */
    async onCommentSelectFromList(evt) {
        this._selectedRelatedFeature = [evt.detail];
        this._flowItems = [...this._flowItems, "comment-details"];
    }
    /**
     * Get feature list of the selected feature layer
     * @param layerId Layer id
     * @param layerName Layer name
     * @returns feature list node
     * @protected
     */
    getFeatureListFlowItem(layerId, layerName) {
        const layerExpressions = this.layerExpressions?.filter((exp) => exp.id === this._selectedLayerId);
        const canCreateReports = this._getLayersConfig(this._selectedLayerId)?.reporting && this._layerItemsHash[this._selectedLayerId].supportsAdd;
        const showFilterIcon = layerExpressions?.length > 0;
        return (index.h("calcite-flow-item", { collapsed: this.isMobile && this._sidePanelCollapsed, heading: layerName, loading: this._showLoadingIndicator, onCalciteFlowItemBack: this.backFromSelectedPanel.bind(this) }, this._toggleSort(), index.h("calcite-action", { icon: "sort-ascending-arrow", id: "sort-popover", slot: "header-actions-end", text: this._translations.sort, title: this._translations.sort }), showFilterIcon && index.h("calcite-action", { icon: "filter", indicator: this._filterActive, onClick: () => { this._flowItems = [...this._flowItems, "filter-panel"]; }, slot: "header-actions-end", text: this._translations.filter, title: this._translations.filter }), this.isMobile && this.getActionToExpandCollapsePanel(), this.enableNewReports && canCreateReports &&
            index.h("calcite-button", { appearance: "solid", onClick: this.navigateToCreateFeature.bind(this), slot: "footer", width: "full" }, this.reportButtonText ? this.reportButtonText : this._translations.createReportButtonText), index.h("calcite-panel", { "full-height": true }, index.h("feature-list", { applyLayerViewFilter: this.showMyReportsOnly, class: "height-full", highlightOnHover: true, mapView: this.mapView, noFeaturesFoundMsg: this._translations.featureErrorMsg, onFeatureSelect: this.onFeatureSelectFromList.bind(this), pageSize: 30, ref: el => this._featureList = el, reportingOptions: this.reportingOptions, selectedLayerId: layerId, showFeatureSymbol: this.showFeatureSymbol, sortingInfo: this._updatedSorting }))));
    }
    /**
     * Returns the calcite-flow item for filter
     * @returns Node
     * @protected
     */
    getFilterPanel() {
        const currentLayersExpressions = this.layerExpressions ? this.layerExpressions.filter((exp) => exp.id === this._selectedLayerId) : [];
        return (index.h("calcite-flow-item", { collapsed: this.isMobile && this._sidePanelCollapsed, heading: this._translations?.filterLayerTitle?.replace("{{title}}", this._selectedLayerName), loading: this._showLoadingIndicator, onCalciteFlowItemBack: this.backFromFilterPanel.bind(this) }, this.isMobile && this.getActionToExpandCollapsePanel(), index.h("div", { class: "width-full", slot: "footer" }, index.h("div", { class: "width-full", slot: "footer" }, index.h("calcite-button", { appearance: "solid", class: "footer-top-button footer-button", disabled: !this._filterActive, onClick: () => { void this._filterList?.forceReset(); }, width: "full" }, this._translations.resetFilter), index.h("calcite-button", { appearance: "outline", class: "footer-button", onClick: this.backFromFilterPanel.bind(this), width: "full" }, this._translations.close))), index.h("calcite-panel", { "full-height": true }, index.h("instant-apps-filter-list", { autoUpdateUrl: false, closeBtnOnClick: () => undefined, comboboxOverlayPositioning: "fixed", layerExpressions: currentLayersExpressions, onFilterListReset: () => this._handleFilterListReset(), onFilterUpdate: () => this._handleFilterUpdate(), ref: (el) => this._filterList = el, resetBtn: false, resetFiltersOnDisconnect: false, view: this.mapView, zoomBtn: false }))));
    }
    /**
     * Returns the calcite-flow item for feature details
     * @returns Node
     */
    getFeatureDetailsFlowItem() {
        const showCommentBtn = this._getLayersConfig(this._selectedLayerId)?.comment && this._selectedLayer.relationships.length > 0 && this._relatedTable;
        return (index.h("calcite-flow-item", { collapsed: this.isMobile && this._sidePanelCollapsed, heading: this._selectedLayerName, loading: this._showLoadingIndicator, onCalciteFlowItemBack: this.backFromSelectedPanel.bind(this) }, this.isMobile && this.getActionToExpandCollapsePanel(), index.h("instant-apps-social-share", { autoUpdateShareUrl: false, class: "share-node", embed: false, popoverButtonIconScale: "s", ref: el => this._shareNode = el, removePopoverOffset: true, scale: "m", shareButtonColor: "neutral", shareButtonType: "action", slot: "header-actions-end", socialMedia: true, view: this.mapView }), this._selectedFeature.length > 1 && this.getFeaturesPagination(), index.h("calcite-panel", null, index.h("feature-details", { class: 'full-height', graphics: this._selectedFeature, layerItemsHash: this._layerItemsHash, mapView: this.mapView, onAddComment: this.showAddCommentsPanel.bind(this), onCommentSelect: this.onCommentSelectFromList.bind(this), onFeatureSelectionChange: this.selectionChanged.bind(this), onLikeOrDislikeClicked: () => { void this._featureList.refresh(true); }, onLoadingStatus: (evt) => void this.updatingFeatureDetails(evt.detail), ref: el => this._featureDetails = el, reportingOptions: this.reportingOptions, showUserImageInCommentsList: this.showUserImageInCommentsList }), showCommentBtn &&
            index.h("calcite-button", { appearance: "solid", onClick: this.showAddCommentsPanel.bind(this), slot: "footer", width: "full" }, this.commentButtonText || this._translations.comment))));
    }
    /**
     * Returns the pagination for the multiple features
     * Create pagination to avoid the overlap of like, dislike and comment section
     * @returns Node
     */
    getFeaturesPagination() {
        return (index.h("div", { class: "feature-pagination" }, index.h("div", null, index.h("calcite-button", { appearance: 'transparent', disabled: false, iconStart: "chevron-left", id: "solutions-back", onClick: () => void this._featureDetails.back(), scale: "s", width: "full" }), index.h("calcite-tooltip", { label: "", placement: "top", "reference-element": "solutions-back" }, index.h("span", null, this._translations.back))), index.h("calcite-button", { appearance: 'transparent', onClick: () => void this._featureDetails.toggleListView(), scale: "s" }, index.h("span", { class: "pagination-count" }, this._getCount())), index.h("div", null, index.h("calcite-button", { appearance: "transparent", disabled: false, iconStart: "chevron-right", id: "solutions-next", onClick: () => void this._featureDetails.next(), scale: "s", width: "full" }), index.h("calcite-tooltip", { placement: "top", "reference-element": "solutions-next" }, index.h("span", null, this._translations.next)))));
    }
    /**
     * Returns the calcite-flow item for comment details
     * @returns Node
     */
    getCommentDetailsFlowItem() {
        return (index.h("calcite-flow-item", { collapsed: this.isMobile && this._sidePanelCollapsed, heading: this._relatedTable.title, onCalciteFlowItemBack: this.backFromSelectedPanel.bind(this) }, this.isMobile && this.getActionToExpandCollapsePanel(), index.h("calcite-panel", { "full-height": true }, index.h("info-card", { allowEditing: false, graphics: this._selectedRelatedFeature, highlightEnabled: false, isLoading: false, isMobile: false, mapView: this.mapView, paginationEnabled: false }))));
    }
    /**
     * Returns the calcite-flow item for add comment
     * @returns Node
     */
    getAddCommentFlowItem() {
        return (index.h("calcite-flow-item", { collapsed: this.isMobile && this._sidePanelCollapsed, heading: this._relatedTable.title, onCalciteFlowItemBack: this.backFromCreateRelatedFeaturePanel.bind(this) }, this.isMobile && this.getActionToExpandCollapsePanel(), index.h("div", { class: "width-full", slot: "footer" }, this._showSubmitCancelButton && index.h("div", { class: "width-full", slot: "footer" }, index.h("calcite-button", { appearance: "solid", class: "footer-top-button footer-button", onClick: this.onCreateRelatedFeatureSubmitButtonClick.bind(this), width: "full" }, this._translations.submit), index.h("calcite-button", { appearance: "outline", class: "footer-button", onClick: this.backFromCreateRelatedFeaturePanel.bind(this), width: "full" }, this._translations.cancel))), index.h("calcite-panel", null, index.h("create-related-feature", { customizeSubmit: true, mapView: this.mapView, onFail: this.addCommentFailed.bind(this), onFormReady: this.onFormReady.bind(this), onIsActionPending: this.showSubmitCancelButton.bind(this), onSuccess: this.onCommentSubmitted.bind(this), ref: el => this._createRelatedFeature = el, selectedFeature: this._currentFeature, table: this._relatedTable }))));
    }
    /**
     * Sets the selected features and updates the first feature as the current selected feature
     * @param features Graphics array of the features selected
     */
    async setSelectedFeatures(features) {
        this._selectedFeature = features;
        await this.setCurrentFeature(this._selectedFeature.length ? this._selectedFeature[0] : null);
    }
    /**
     * Set the object id of the current selected feature, and also updates the current selected layer details
     * @param selectedFeature Graphic currently shown in feature details
     */
    async setCurrentFeature(selectedFeature) {
        this._currentFeature = selectedFeature;
        if (selectedFeature && selectedFeature.layer) {
            const layer = selectedFeature.layer;
            void this.setSelectedLayer(layer.id, layer.title);
            this._currentFeatureId = selectedFeature.attributes[layer.objectIdField];
            // check if comments are configured and relationship is present then only get the related table
            const isCommentTablePresent = this._getLayersConfig(layer.id)?.comment && layer.relationships.length > 0;
            if (isCommentTablePresent) {
                await this.getRelatedTable();
            }
        }
        else {
            if (this._editableLayerIds.length > 1) {
                void this.setSelectedLayer('', '');
            }
            this._currentFeatureId = '';
        }
        this._updateShareURL();
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
            const selectedLayerView = await mapViewUtils.getFeatureLayerView(this.mapView, selectedFeature.layer.id);
            // remove previous highlight options (if any) to highlight the feature by default color
            selectedLayerView.highlightOptions = null;
            this._highlightHandle = await mapViewUtils.highlightFeatures([selectedFeature.getObjectId()], selectedLayerView, this.mapView, true, this.zoomToScale);
        }
        void this.updatingFeatureDetails(false);
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
        return (index.h("calcite-action", { icon: this._sidePanelCollapsed ? "chevrons-up" : "chevrons-down", onClick: this.toggleSidePanel.bind(this), slot: "header-actions-end", text: this._sidePanelCollapsed ? this._translations.expand : this._translations.collapse }));
    }
    /**
     * Set the current map info when maps change
     * @protected
     */
    async setMapView() {
        await this.getLayersToShowInList();
        // filter/update the feature(s) if any filter/condition is already applied
        await this._updateFeatures();
        // if only one valid layer is present then directly render features list
        if (this._editableLayerIds?.length === 1) {
            await this.renderFeaturesList();
        }
        else {
            this._flowItems = ['layer-list'];
        }
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
     * On map click do hitTest and get the clicked graphics from both reporting and non-reporting layers, and show feature details
     * @param event IMapClick map click event details
     *
     * @protected
     */
    async onMapClick(event) {
        //disable map popup
        this.mapView.popupEnabled = false;
        // Perform a hitTest on the View
        const hitTest = await this.mapView.hitTest(event);
        if (hitTest.results.length > 0) {
            const clickedGraphics = [];
            hitTest.results.forEach(function (result) {
                // check if the result type is graphic
                if (result.type === 'graphic') {
                    clickedGraphics.push(result.graphic);
                }
            });
            const reportingLayerGraphics = clickedGraphics.filter((graphic) => {
                return this._validLayers.includes(graphic.layer);
            });
            const nonReportingLayerGraphics = clickedGraphics.filter((graphic) => {
                return !this._validLayers.includes(graphic.layer) && graphic?.layer?.popupEnabled && graphic?.layer?.id;
            });
            // if clicked graphic's layer is one of the reporting layers then show details in layer panel
            if (reportingLayerGraphics.length > 0) {
                //update the selectedFeature
                await this.setSelectedFeatures(reportingLayerGraphics);
                //if featureDetails not open then add it to the list else just reInit flowItems which will update details with newly selected features
                // eslint-disable-next-line unicorn/prefer-ternary
                if (this._flowItems.length && this._flowItems.includes("feature-details")) {
                    this._flowItems = [...this._flowItems.slice(0, this._flowItems.indexOf("feature-details") + 1)];
                    await this.highlightOnMap(clickedGraphics[0]);
                }
                else {
                    this._flowItems = [...this._flowItems, "feature-details"];
                }
            }
            // if clicked graphic's layer is from non reporting layers then show popup on map
            if (nonReportingLayerGraphics.length > 0) {
                this.mapView.popupEnabled = true;
                const options = {
                    features: nonReportingLayerGraphics,
                    updateLocationEnabled: true
                };
                await this.mapView.openPopup(options);
            }
        }
    }
    /**
   * Get the current index of total string
   *
   * @returns the index of total string
   * @protected
   */
    _getCount() {
        const index = (this._selectedFeatureIndex + 1).toString();
        const total = this._selectedFeature.length.toString();
        return this._translations.indexOfTotal
            .replace("{{index}}", index)
            .replace("{{total}}", total);
    }
    /**
     * Fetches the component's translations
     * @returns Promise when complete
     * @protected
     */
    async _getTranslations() {
        const messages = await locale.getLocaleComponentStrings(this.el);
        this._translations = messages[0];
    }
    /**
     * Applies a definition expression when floor field and level are available
     * @param layer FeatureLayer on which the definitionExpression should be updated
     * @protected
     */
    _updateFloorDefinitionExpression(layer) {
        const floorField = layer.floorInfo.floorField;
        // update the layer definition expression
        const floorExp = `${floorField} = '${this.floorLevel}'`;
        const defExp = layer.definitionExpression;
        layer.definitionExpression = defExp?.indexOf(this._floorExpression) > -1 ?
            defExp.replace(this._floorExpression, floorExp) : floorExp;
        this._floorExpression = floorExp;
    }
    /**
     * Gets the form template elements
     * @protected
     */
    _getFormElements() {
        const layer = this._selectedLayer;
        const floorField = layer?.floorInfo?.floorField;
        if (floorField && this.floorLevel && layer?.formTemplate) {
            const formElement = this._formElements.find((elm) => elm.id === layer.id);
            if (this._formElements.length === 0 || !formElement) {
                this._formElements.push({
                    id: layer.id,
                    orgElements: layer.formTemplate.elements,
                    orgExpressionInfos: layer.formTemplate.expressionInfos
                });
            }
        }
    }
    /**
     * Returns the ids of all OR configured layers that support edits with the update capability
     * @param hash each layer item details
     * @param layersEditingDisabled list layer ids for which editing is disabled
     * @returns array of editable layer ids
     */
    reduceToConfiguredLayers(hash, layersEditingDisabled) {
        return Object.keys(hash).reduce((prev, cur) => {
            // check if reporting options exists consider the visible prop if else just check the supports Add
            const showLayer = this.reportingOptions ? this._getLayersConfig(cur)?.visible
                : hash[cur].supportsAdd;
            //show layer only when editing is enabled
            if (!layersEditingDisabled.includes(cur) && showLayer) {
                prev.push(cur);
            }
            return prev;
        }, []);
    }
    /**
     * updates the features for layer/feature list
     * @protected
     */
    async _updateFeatures() {
        for (const eachLayerId of this._editableLayerIds) {
            const featureLayerView = await mapViewUtils.getFeatureLayerView(this.mapView, eachLayerId);
            // In case of show my features add filter for Featurelayerview
            await this._showMyFeaturesOnly(featureLayerView);
            const floorField = featureLayerView.layer?.floorInfo?.floorField;
            if (floorField && this.floorLevel) {
                // Update the layer's definition as per selected floor level from map for all editable layers
                this._updateFloorDefinitionExpression(featureLayerView.layer);
            }
        }
    }
    /**
     * Show only loggedIn user's features
     * @param featureLayerView on which the filter should be applied
     * @protected
     */
    async _showMyFeaturesOnly(featureLayerView) {
        const loggedInUserName = this.mapView.map.portalItem.portal?.credential?.userId;
        if (loggedInUserName) {
            const creatorField = featureLayerView.layer.editFieldsInfo?.creatorField.toLowerCase();
            featureLayerView.filter = this.showMyReportsOnly && creatorField ? new this.FeatureFilter({
                where: creatorField + "='" + loggedInUserName + "'"
            }) : null;
        }
    }
    /**
     * Creates the list of layers to be listed in layer list
     * @protected
     */
    async getLayersToShowInList() {
        const layerItemsHash = await mapViewUtils.getMapLayerHash(this.mapView, true);
        const allMapLayers = await mapViewUtils.getAllLayers(this.mapView);
        const layersEditingDisabled = [];
        allMapLayers.forEach((eachLayer) => {
            if (eachLayer?.type === "feature" && eachLayer?.editingEnabled && eachLayer?.capabilities?.operations?.supportsAdd) {
                layerItemsHash[eachLayer.id].supportsAdd = true;
            }
            if (!eachLayer?.editingEnabled) {
                layersEditingDisabled.push(eachLayer.id);
            }
        });
        this._editableLayerIds = this.reduceToConfiguredLayers(layerItemsHash, layersEditingDisabled);
        this._layerItemsHash = layerItemsHash;
    }
    /**
     * renders feature list
     * @protected
     */
    async renderFeaturesList() {
        this._flowItems = ['feature-list'];
        const evt = {
            detail: this._editableLayerIds
        };
        await this.layerListLoaded(evt);
        void this.setSelectedLayer(this._validLayers[0].id, this._validLayers[0].title);
    }
    /**
     * Updates the share url for current selected feature
     * @protected
     */
    _updateShareURL() {
        const url = this._shareNode?.shareUrl;
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
        if (this._selectedFeature?.length) {
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
        if (this.center && this.level) {
            await this.mapView.goTo({
                center: this.center.split(';').map(Number),
                zoom: this.level
            });
        }
        if (this.layerId && this.objectId) {
            const layer = await mapViewUtils.getLayerOrTable(this.mapView, this.layerId);
            if (layer) {
                // only query if we have some ids...query with no ids will result in all features being returned
                const featureSet = await mapViewUtils.queryFeaturesByID([Number(this.objectId)], layer, [], true, this.mapView.spatialReference);
                if (featureSet.length) {
                    //update the selectedFeature
                    await this.setSelectedFeatures(featureSet);
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
    static get watchers() { return {
        "isMobile": ["isMobileWatchHandler"],
        "mapView": ["mapViewWatchHandler"],
        "floorLevel": ["floorLevelWatchHandler"],
        "showMyReportsOnly": ["showMyReportsOnlyWatchHandler"]
    }; }
};
CrowdsourceReporter.style = CrowdsourceReporterStyle0;

exports.crowdsource_reporter = CrowdsourceReporter;
