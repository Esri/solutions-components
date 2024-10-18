/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, getAssetPath, h, Host } from '@stencil/core/internal/client';
import { c as EExportType, d as EPageType, E as EWorkflowType } from './interfaces.js';
import { l as loadModules } from './loadModules.js';
import { b as goToSelection, h as highlightFeatures } from './mapViewUtils.js';
import { s as state } from './publicNotificationStore.js';
import { g as getLocaleComponentStrings } from './locale.js';
import { c as consolidateLabels, r as removeDuplicateLabels } from './downloadUtils.js';
import { d as defineCustomElement$I } from './buffer-tools2.js';
import { d as defineCustomElement$H } from './action.js';
import { d as defineCustomElement$G } from './action-bar.js';
import { d as defineCustomElement$F } from './action-group.js';
import { d as defineCustomElement$E } from './action-menu.js';
import { d as defineCustomElement$D } from './button.js';
import { d as defineCustomElement$C } from './checkbox.js';
import { d as defineCustomElement$B } from './chip.js';
import { d as defineCustomElement$A } from './combobox.js';
import { d as defineCustomElement$z } from './combobox-item.js';
import { d as defineCustomElement$y } from './dropdown.js';
import { d as defineCustomElement$x } from './dropdown-group.js';
import { d as defineCustomElement$w } from './dropdown-item.js';
import { d as defineCustomElement$v } from './filter2.js';
import { d as defineCustomElement$u } from './graph.js';
import { d as defineCustomElement$t } from './handle.js';
import { d as defineCustomElement$s } from './icon.js';
import { d as defineCustomElement$r } from './input.js';
import { d as defineCustomElement$q } from './input-message.js';
import { d as defineCustomElement$p } from './input-text.js';
import { d as defineCustomElement$o } from './label2.js';
import { d as defineCustomElement$n } from './list.js';
import { d as defineCustomElement$m } from './list-item.js';
import { d as defineCustomElement$l } from './loader.js';
import { d as defineCustomElement$k } from './notice.js';
import { d as defineCustomElement$j } from './option.js';
import { d as defineCustomElement$i } from './panel.js';
import { d as defineCustomElement$h } from './popover.js';
import { d as defineCustomElement$g } from './progress.js';
import { d as defineCustomElement$f } from './scrim.js';
import { d as defineCustomElement$e } from './segmented-control.js';
import { d as defineCustomElement$d } from './segmented-control-item.js';
import { d as defineCustomElement$c } from './select.js';
import { d as defineCustomElement$b } from './shell.js';
import { d as defineCustomElement$a } from './slider.js';
import { d as defineCustomElement$9 } from './stack.js';
import { d as defineCustomElement$8 } from './switch.js';
import { d as defineCustomElement$7 } from './tooltip.js';
import { d as defineCustomElement$6 } from './map-draw-tools2.js';
import { d as defineCustomElement$5 } from './map-layer-picker2.js';
import { d as defineCustomElement$4 } from './map-select-tools2.js';
import { d as defineCustomElement$3 } from './pdf-download2.js';
import { d as defineCustomElement$2 } from './refine-selection2.js';

const publicNotificationCss = ":host{display:block;--calcite-input-message-spacing-value:0}.align-center{align-items:center}.border-bottom-1{border-width:0px;border-bottom-width:1px;border-style:solid;border-color:var(--calcite-color-border-3)}.action-bar-size{height:3.5rem;width:100%}.w-1-2{width:50%}.w-1-3{width:33.33%}.width-full{width:100%}.height-full{height:100%}.padding-1{padding:1rem}.padding-top-sides-1{padding-block-start:1rem;padding-inline-start:1rem;padding-inline-end:1rem}.padding-sides-1{padding-inline-start:1rem;padding-inline-end:1rem}.padding-end-1-2{padding-inline-end:.5rem}.padding-top-1-2{padding-block-start:.5rem}.padding-top-1{padding-top:1rem}.padding-bottom-1{padding-bottom:1rem}.padding-bottom-1-2{padding-bottom:.5rem}.info-blue{color:#00A0FF}.info-message{justify-content:center;display:grid}.font-bold{font-weight:bold}.display-flex{display:flex}.display-block{display:block}.display-none{display:none}.border-bottom{border-bottom:1px solid var(--calcite-color-border-2)}.padding-start-1-2{padding-inline-start:0.5rem}.list-border{border:1px solid var(--calcite-color-border-2)}.margin-sides-1{margin-inline-start:1rem;margin-inline-end:1rem}.margin-start-1-2{margin-inline-start:0.5rem}.float-right{float:right}.float-right[dir=\"rtl\"]{float:left}.float-left{float:left}.float-left[dir=\"rtl\"]{float:right}.margin-top-0{margin-block-start:0 !important}.height-1-1-2{height:1.5rem}.main-background{background-color:var(--calcite-color-foreground-2)}.position-right{position:absolute;right:1rem}.position-right[dir=\"rtl\"]{position:absolute;left:1rem}.label-margin-0{--calcite-label-margin-bottom:0}.list-label{color:var(--calcite-color-text-1)}.list-label,.list-description{font-family:var(--calcite-sans-family);font-size:var(--calcite-font-size--2);font-weight:var(--calcite-font-weight-normal);overflow-wrap:break-word;word-break:break-word}.list-description{margin-block-start:0.125rem;color:var(--calcite-color-text-3)}.img-container{width:100%;height:100%}.font-weight-500{font-weight:500}.background-override{height:100%;width:100%;--calcite-color-foreground-3:var(--calcite-color-brand);--calcite-color-foreground-2:var(--calcite-color-brand-hover);--calcite-color-text-1:var(--calcite-color-text-inverse)}.word-wrap-anywhere{word-wrap:anywhere}";
const PublicNotificationStyle0 = publicNotificationCss;

const PublicNotification$1 = /*@__PURE__*/ proxyCustomElement(class PublicNotification extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.searchConfigurationChange = createEvent(this, "searchConfigurationChange", 7);
        this.addresseeLayerIds = [];
        this.bufferColor = [227, 139, 79, 0.8];
        this.bufferOutlineColor = [255, 255, 255];
        this.customLabelEnabled = undefined;
        this.defaultBufferDistance = undefined;
        this.defaultBufferUnit = undefined;
        this.defaultExportTitle = "";
        this.defaultNumLabelsPerPage = 6;
        this.enableLayerFeatures = true;
        this.enableLayerFeaturesOnLoad = false;
        this.enableSearchDistance = true;
        this.enableSearchDistanceOnLoad = false;
        this.enableSketchTools = true;
        this.featureEffect = undefined;
        this.featureHighlightEnabled = undefined;
        this.locale = undefined;
        this.mapView = undefined;
        this.noResultText = undefined;
        this.searchConfiguration = undefined;
        this.selectionLayerIds = [];
        this.showRefineSelection = false;
        this.showSearchSettings = true;
        this.sketchLineSymbol = undefined;
        this.sketchPointSymbol = undefined;
        this.sketchPolygonSymbol = undefined;
        this._exportGraphics = false;
        this._addMap = false;
        this._addResults = true;
        this._addTitle = false;
        this._downloadActive = true;
        this._exportType = EExportType.PDF;
        this._fetchingData = false;
        this._isMobile = undefined;
        this._numDuplicates = 0;
        this._pageType = EPageType.LIST;
        this._saveEnabled = false;
        this._selectionSets = [];
        this._translations = undefined;
    }
    get el() { return this; }
    //--------------------------------------------------------------------------
    //
    //  Properties (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * ISelectionSet: The current active selection set
     */
    _activeSelection;
    /**
     * HTMLPdfDownloadElement: The pdf tools element
     */
    _downloadTools;
    /**
     * esri/geometry/geometryEngine: https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-geometryEngine.html
     */
    _geometryEngine;
    /**
     * esri/Graphic: https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html
     */
    Graphic;
    /**
     * esri/symbols/support/jsonUtils: https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-support-jsonUtils.html
     */
    _jsonUtils;
    /**
     * string: The url to the onboarding image
     */
    _onboardingImageUrl = "";
    /**
     * HTMLCalciteCheckboxElement: When enabled popups will be shown on map click
     */
    _popupsEnabled;
    /**
     * HTMLCalciteCheckboxElement: The remove duplicates checkbox element for PDF downloads
     */
    _removeDuplicates;
    /**
     * ISearchConfiguration: Configuration details for the Search widget
     */
    _searchConfiguration;
    /**
     * HTMLMapSelectToolsElement: The select tools element
     */
    _selectTools;
    /**
     * MediaQueryList: Information about the media query to know when we have went into mobile mode
     */
    _mediaQuery;
    /**
     * Component that contains the text to be used as the title for PDF pages
     */
    _titleElement;
    /**
     * Text to be used as title on PDF pages
     */
    _titleValue = undefined;
    /**
     * number: The number of selected features
     */
    _numSelected = 0;
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    /**
     * Called each time the mapView prop is changed.
     */
    async mapViewWatchHandler(v) {
        if (v?.popup) {
            this._popupsEnabled = v?.popup.autoOpenEnabled;
        }
        this._initSearchConfiguration(this.searchConfiguration);
    }
    /**
     * Called each time the searchConfiguration prop is changed.
     *
     * @returns Promise when complete
     */
    async watchSearchConfigurationHandler(newValue, oldValue) {
        const s_newValue = JSON.stringify(newValue);
        if (this.mapView && (s_newValue !== JSON.stringify(oldValue) || (s_newValue && !this._searchConfiguration))) {
            this._searchConfiguration = JSON.parse(s_newValue);
            this.searchConfigurationChange.emit(this._searchConfiguration);
            // force back to list page before we create Search
            // https://devtopia.esri.com/WebGIS/arcgis-template-configuration/issues/3402
            void this._home();
        }
    }
    /**
     * Called each time the sketchLineSymbol prop is changed.
     */
    async sketchLineSymbolWatchHandler(
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    v, oldV) {
        if (v && JSON.stringify(v) !== JSON.stringify(oldV)) {
            this._setLineSymbol(v);
        }
    }
    /**
     * Called each time the sketchPointSymbol prop is changed.
     */
    async sketchPointSymbolWatchHandler(
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    v, oldV) {
        if (v && JSON.stringify(v) !== JSON.stringify(oldV)) {
            this._setPointSymbol(v);
        }
    }
    /**
     * Called each time the sketchPolygonSymbol prop is changed.
     */
    async sketchPolygonSymbolWatchHandler(
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    v, oldV) {
        if (v && JSON.stringify(v) !== JSON.stringify(oldV)) {
            this._setPolygonSymbol(v);
        }
    }
    /**
     * Called each time the pageType prop is changed.
     */
    async pageTypeWatchHandler(pageType, oldPageType) {
        this._checkPopups();
        if (this.mapView?.popup) {
            this.mapView.popupEnabled = pageType !== EPageType.LIST ? false : this._popupsEnabled;
        }
        if (pageType === EPageType.EXPORT) {
            this._fetchingData = true;
            this._numDuplicates = await this._getNumDuplicates();
            this._updateExportGraphics();
            this._fetchingData = false;
        }
        this._clearHighlight();
        if (oldPageType === EPageType.SELECT || oldPageType === EPageType.REFINE) {
            // clear any draw shapes or buffers
            await this._clearSelection();
        }
        if (oldPageType === EPageType.EXPORT) {
            this._removeExportGraphics();
        }
        if (pageType !== EPageType.SELECT) {
            return this._highlightFeatures();
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
     * Emitted on demand when searchConfiguration gets a new value
     */
    searchConfigurationChange;
    /**
     * Handle changes to the selection sets
     */
    selectionSetsChanged(event) {
        this._selectionSets = [...event.detail];
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (lifecycle)
    //
    //--------------------------------------------------------------------------
    /**
     * StencilJS: Called every time the component is connected to the DOM
     */
    connectedCallback() {
        this._mediaQuery = window.matchMedia("(max-width: 600px)");
        this._mediaQuery.addEventListener("change", (evt) => this._setIsMobile(evt));
    }
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     */
    async componentWillLoad() {
        await this._getTranslations();
        await this._initModules();
        this._initSymbols();
        this._onboardingImageUrl = getAssetPath(`assets/data/images/onboarding.png`);
    }
    /**
     * Renders the component.
     */
    render() {
        const headerSlot = this._isMobile ? "footer" : "header";
        return (h(Host, { key: '8b22f6b45144705e9ff5b230ca8075f68985165b' }, h("calcite-shell", { key: '774731e643edb5b52bf565349fdfe58dae1e845e' }, h("calcite-action-bar", { key: '5e3bcc6ba2f53d25ee2bd972ce67108c0ab808f4', class: "border-bottom-1 action-bar-size", "expand-disabled": true, layout: "horizontal", slot: headerSlot }, this._getActionGroup("list-check", EPageType.LIST, this._translations.myLists), this.showRefineSelection ? this._getActionGroup("test-data", EPageType.REFINE, this._translations.refineSelection) : null, this._getActionGroup("export", EPageType.EXPORT, this._translations.export)), this._getPage(this._pageType))));
    }
    /**
     * StencilJS: Called once just after the component is first loaded.
     */
    async componentDidLoad() {
        this._initSearchConfiguration(this.searchConfiguration);
    }
    /**
     * StencilJS: Called every time the component is disconnected from the DOM
     */
    disconnectedCallback() {
        this._mediaQuery.removeEventListener("change", (evt) => this._setIsMobile(evt));
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
        const [geometryEngine, jsonUtils, graphic] = await loadModules([
            "esri/geometry/geometryEngine",
            "esri/symbols/support/jsonUtils",
            "esri/Graphic"
        ]);
        this._geometryEngine = geometryEngine;
        this._jsonUtils = jsonUtils;
        this.Graphic = graphic;
    }
    /**
     * Load the search configuration
     *
     * @returns Promise resolving when function is done
     *
     * @protected
     */
    _initSearchConfiguration(v) {
        if (this.searchConfiguration && !this._searchConfiguration && this.mapView) {
            this._searchConfiguration = v;
            this.searchConfigurationChange.emit(this._searchConfiguration);
            // force back to list page before we create Search
            // https://devtopia.esri.com/WebGIS/arcgis-template-configuration/issues/3402
            void this._home();
        }
    }
    /**
     * Initialize the default symbols that will be used when creating new graphics
     *
     * @protected
     */
    _initSymbols() {
        this._setLineSymbol(this.sketchLineSymbol);
        this._setPointSymbol(this.sketchPointSymbol);
        this._setPolygonSymbol(this.sketchPolygonSymbol);
    }
    /**
     * Convert a JSON representation of a line symbol and/or set the line symbol
     *
     * @param v SimpleLineSymbol or a JSON representation of a line symbol
     *
     * @protected
     */
    _setLineSymbol(
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    v) {
        const isSymbol = v?.type === 'simple-line';
        this.sketchLineSymbol = isSymbol ? v : this._jsonUtils.fromJSON(v ? v : {
            "type": "esriSLS",
            "color": [130, 130, 130, 255],
            "width": 2,
            "style": "esriSLSSolid"
        });
    }
    /**
     * Convert a JSON representation of a point symbol and/or set the point symbol
     *
     * @param v SimpleMarkerSymbol or a JSON representation of a point symbol
     *
     * @protected
     */
    _setPointSymbol(
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    v) {
        const isSymbol = v?.type === 'simple-marker';
        this.sketchPointSymbol = isSymbol ? v : this._jsonUtils.fromJSON(v ? v : {
            "type": "esriSMS",
            "color": [255, 255, 255, 255],
            "angle": 0,
            "xoffset": 0,
            "yoffset": 0,
            "size": 6,
            "style": "esriSMSCircle",
            "outline": {
                "type": "esriSLS",
                "color": [50, 50, 50, 255],
                "width": 1,
                "style": "esriSLSSolid"
            }
        });
    }
    /**
     * Convert a JSON representation of a polygon symbol and/or set the polygon symbol
     *
     * @param v SimpleFillSymbol or a JSON representation of a polygon symbol
     *
     * @protected
     */
    _setPolygonSymbol(
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    v) {
        const isSymbol = v?.type === 'simple-fill';
        this.sketchPolygonSymbol = isSymbol ? v : this._jsonUtils.fromJSON(v ? v : {
            "type": "esriSFS",
            "color": [150, 150, 150, 51],
            "outline": {
                "type": "esriSLS",
                "color": [50, 50, 50, 255],
                "width": 2,
                "style": "esriSLSSolid"
            },
            "style": "esriSFSSolid"
        });
    }
    /**
     * Set _isMobile to true when the view is 600px or less
     *
     * @param evt event from media query
     *
     * @protected
     */
    _setIsMobile(evt) {
        this._isMobile = evt.matches;
    }
    /**
     * Get a calcite action group for the current action
     *
     * @param icon the icon to display for the current action
     * @param disabled should the action be disabled
     * @param pageType what page type will the action navigate to
     * @param tip information tip to display helpful details to end user
     *
     * @protected
     */
    _getActionGroup(icon, pageType, tip) {
        const sizeClass = this.showRefineSelection ? "w-1-3" : "w-1-2";
        return (h("calcite-action-group", { class: sizeClass, layout: "horizontal" }, h("div", { class: "background-override" }, h("calcite-action", { active: this._pageType === pageType, alignment: "center", class: "width-full height-full", compact: false, icon: icon, id: icon, onClick: () => { this._setPageType(pageType); }, text: "" })), h("calcite-tooltip", { label: "", placement: "bottom", "reference-element": icon }, h("span", null, tip))));
    }
    /**
     * Navigate to the defined page type
     *
     * @param pageType what page type will the action navigate to
     *
     * @protected
     */
    _setPageType(pageType) {
        this._pageType = pageType;
    }
    /**
     * Navigate to the defined page type
     *
     * @param pageType what page type will the action navigate to
     *
     * @returns the page node
     * @protected
     */
    _getPage(pageType) {
        let page;
        switch (pageType) {
            case EPageType.LIST:
                page = this._getListPage();
                break;
            case EPageType.SELECT:
                page = this._getSelectPage();
                break;
            case EPageType.EXPORT:
                page = this._getExportPage();
                break;
            case EPageType.REFINE:
                page = this._getRefinePage();
                break;
        }
        return page;
    }
    /**
     * Create the List page that shows as the initial home screen
     * This page is also used to show and selection sets that have been created
     *
     * @returns the page node
     * @protected
     */
    _getListPage() {
        const hasSets = this._hasSelections();
        return (h("calcite-panel", null, this._getLabel(this._translations.myLists), this._getNotice(hasSets ? this._translations.listHasSetsTip : this._translations.selectLayerAndAdd, "padding-sides-1 padding-bottom-1", "word-wrap-anywhere"), hasSets ? this._getSelectionSetList() : (this._getOnboardingImage()), h("div", { class: "display-flex padding-1" }, h("calcite-button", { onClick: () => { this._setPageType(EPageType.SELECT); }, width: "full" }, h("span", { class: "font-weight-500" }, this._translations.add)))));
    }
    /**
     * Display an image to help illustrate the basic workflow of the widget
     *
     * @returns the image node to display
     * @protected
     */
    _getOnboardingImage() {
        return (h("div", { class: "display-flex padding-sides-1" }, h("img", { class: "img-container", role: "presentation", src: this._onboardingImageUrl })));
    }
    /**
     * Create the selection sets list node for the List page
     *
     * @returns selection sets list node
     * @protected
     */
    _getSelectionSetList() {
        return (h("div", { class: "padding-top-1-2 padding-bottom-1-2" }, h("calcite-list", { class: "list-border margin-sides-1" }, this._selectionSets.reduce((prev, cur, i) => {
            const ids = this._getSelectionSetIds(cur);
            let validSet = true;
            if (cur.workflowType === EWorkflowType.REFINE) {
                const numIds = Object.keys(cur.refineInfos).reduce((_prev, _cur) => {
                    const refineInfo = cur.refineInfos[_cur];
                    _prev += refineInfo.addIds.length + refineInfo.removeIds.length;
                    return _prev;
                }, 0);
                validSet = numIds > 0;
            }
            if (validSet) {
                prev.push((h("calcite-list-item", { label: cur.label, onClick: () => this._gotoSelection(cur, this.mapView) }, h("div", { slot: "content" }, h("div", { class: "list-label" }, cur.label), h("div", { class: "list-description" }, cur?.layerView?.layer.title), h("div", { class: "list-description" }, this._translations.selectedFeatures.replace("{{n}}", ids.length.toString()))), this._getAction(true, "pencil", "", (evt) => this._openSelection(cur, evt), false, "actions-end"), this._getAction(true, "x", "", (evt) => this._deleteSelection(i, evt), false, "actions-end"))));
            }
            return prev;
        }, []))));
    }
    /**
     * Get the ids for a given selection set
     * For most sets this will be selectedIds
     * For the Refine set we are only concerned with IDs from ADD operations on any of the layers
     *
     * @returns an array of the IDs
     *
     * @protected
     */
    _getSelectionSetIds(selectionSet) {
        return selectionSet.workflowType !== EWorkflowType.REFINE ? selectionSet.selectedIds :
            Object.keys(selectionSet.refineInfos).reduce((p, c) => [...p, ...selectionSet.refineInfos[c].addIds], []);
    }
    /**
     * Check if any valid selection sets exist.
     *
     * @returns true if valid selection sets exist
     *
     * @protected
     */
    _hasSelections(validateRefineSet = false) {
        let ids = [];
        const hasRefineSet = this._selectionSets.some(ss => {
            if (ss.workflowType === EWorkflowType.REFINE) {
                ids = this._getSelectionSetIds(ss);
                return true;
            }
        });
        return validateRefineSet && hasRefineSet ? ids.length > 0 || this._selectionSets.length > 1 : this._selectionSets.length > 0;
    }
    /**
     * Check if any duplicate labels exist
     *
     * @returns true if duplicates are found
     *
     * @protected
     */
    async _getNumDuplicates() {
        const exportInfos = this._getExportInfos();
        const labels = await consolidateLabels(this.mapView.map, exportInfos);
        const duplicatesRemoved = removeDuplicateLabels(labels);
        return labels.length - duplicatesRemoved.length;
    }
    /**
     * Get key details about what to export
     *
     * @returns IExportInfos that contain ids and layer
     *
     * @protected
     */
    _getExportInfos() {
        return this._selectionSets.reduce((prev, cur) => {
            if (cur.download) {
                if (cur.workflowType !== EWorkflowType.REFINE) {
                    const id = cur.layerView.layer.id;
                    this._updateIds(id, cur.layerView, cur.selectedIds, prev);
                }
                else {
                    // REFINE stores ids differently as it can contain ids from multiple layers
                    // REFINE will only ever be 1 ISelectionSet
                    Object.keys(cur.refineInfos).forEach(k => {
                        const refineIds = cur.refineInfos[k];
                        if (refineIds.addIds.length > 0) {
                            this._updateIds(k, refineIds.layerView, refineIds.addIds, prev);
                        }
                    });
                }
            }
            return prev;
        }, {});
    }
    /**
     * Consolidate ids for each layer
     *
     * @param id the layer id from the selectionSet
     * @param layerView the layerView from the selectionSet
     * @param ids the selectedIds from the selectionSet
     * @param obj the object that will store the consolidated ids and layer info
     *
     * @returns IExportInfo key details that will be used for export
     *
     * @protected
     */
    _updateIds(id, layerView, ids, obj) {
        if (obj[id]) {
            obj[id].ids = obj[id].ids.concat(ids);
        }
        else {
            obj[id] = {
                layerView,
                ids
            };
        }
        return obj;
    }
    /**
     * Create the Select page that shows the selection workflows
     *
     * @returns the page node
     * @protected
     */
    _getSelectPage() {
        const noticeText = this._translations.selectSearchTip;
        return (h("calcite-panel", null, this._getLabel(this._translations.stepTwoFull, true), this._getNotice(noticeText, "padding-1", "word-wrap-anywhere"), h("div", null, h("map-select-tools", { bufferColor: this.bufferColor, bufferOutlineColor: this.bufferOutlineColor, class: "font-bold", customLabelEnabled: this.customLabelEnabled, defaultBufferDistance: this.defaultBufferDistance, defaultBufferUnit: this.defaultBufferUnit, enableLayerFeatures: this.enableLayerFeatures, enableLayerFeaturesOnLoad: this.enableLayerFeaturesOnLoad, enableSearchDistance: this.enableSearchDistance, enableSearchDistanceOnLoad: this.enableSearchDistanceOnLoad, enableSketchTools: this.enableSketchTools, enabledLayerIds: this.addresseeLayerIds, isUpdate: !!this._activeSelection, locale: this.locale, mapView: this.mapView, noResultText: this.noResultText, onSelectionSetChange: (evt) => this._updateForSelection(evt), ref: (el) => { this._selectTools = el; }, searchConfiguration: this._searchConfiguration, selectionLayerIds: this.selectionLayerIds, selectionSet: this._activeSelection, sketchLineSymbol: this.sketchLineSymbol, sketchPointSymbol: this.sketchPointSymbol, sketchPolygonSymbol: this.sketchPolygonSymbol })), this._getPageNavButtons(this._translations.done, this._numSelected === 0, () => { void this._saveSelection(); }, this._translations.cancel, false, () => { void this._home(); })));
    }
    /**
     * Create the main download page that has the shared aspects of both PDF and CSV
     * But only show the current PDF or CSV page content
     *
     * @returns the page node
     * @protected
     */
    _getExportPage() {
        const hasSelections = this._hasSelections(this.showRefineSelection);
        const displayDuplicatesClass = this._numDuplicates > 0 ? "display-block" : "display-none";
        return (h("calcite-panel", null, h("div", null, this._getLabel(this._translations.export, false), hasSelections ? (h("div", null, this._getNotice(this._translations.exportTip, "padding-sides-1"), this._getLabel(this._translations.exportListsLabel), this._getExportSelectionLists(), h("div", { class: "padding-sides-1 " + displayDuplicatesClass }, h("div", { class: "display-flex" }, h("calcite-label", { layout: "inline" }, h("calcite-checkbox", { ref: (el) => { this._removeDuplicates = el; } }), h("div", { class: "display-flex" }, this._translations.removeDuplicate, h("div", { class: "info-message padding-start-1-2" }, h("calcite-input-message", { class: "info-blue margin-top-0", scale: "m" }, ` ${this._translations.numDuplicates.replace("{{n}}", this._numDuplicates.toString())}`)))), h("calcite-icon", { class: "padding-start-1-2 icon", flipRtl: !(this.locale?.toLowerCase() === "he"), icon: "question", id: "remove-duplicates-icon", scale: "s" })), h("calcite-popover", { closable: true, label: "", referenceElement: "remove-duplicates-icon" }, h("span", { class: "tooltip-message" }, this._translations.duplicatesTip))), h("div", { class: "border-bottom" }), h("div", { class: "padding-top-sides-1" }, h("calcite-segmented-control", { class: "w-100", onCalciteSegmentedControlChange: (evt) => this._exportTypeChange(evt), width: "full" }, h("calcite-segmented-control-item", { checked: this._exportType === EExportType.PDF, class: "w-50 end-border", value: EExportType.PDF }, h("span", { class: "font-weight-500" }, this._translations.pdf)), h("calcite-segmented-control-item", { checked: this._exportType === EExportType.CSV, class: "w-50", value: EExportType.CSV }, h("span", { class: "font-weight-500" }, this._translations.csv)))), h("div", { class: "padding-bottom-1" }, this._getExportOptions()), h("div", { class: "padding-1 display-flex" }, h("calcite-button", { disabled: (!this._downloadActive || this._fetchingData) || (!this._addMap && !this._addResults), loading: this._fetchingData, onClick: () => void this._export(), width: "full" }, h("span", { class: "font-weight-500" }, this._translations.export))))) : (this._getNotice(this._translations.downloadNoLists, "padding-sides-1 padding-bottom-1")))));
    }
    /**
     * Store the user selected export type CSV || PDF
     *
     * @protected
     */
    _exportTypeChange(evt) {
        this._exportType = evt.target.value;
    }
    /**
     * Render the export options to the user
     *
     * @protected
     */
    _getExportOptions() {
        const displayClass = this._exportType === EExportType.PDF ? "display-block" : "display-none";
        const titleOptionsClass = this._addTitle ? "display-block" : "display-none";
        const graphicsOptionsClass = this._addMap ? "display-flex" : "display-none";
        const title = this._titleValue ? this._titleValue : this.defaultExportTitle ? this.defaultExportTitle : "";
        const formatOptionsClass = this._addResults ? "" : "display-none";
        return (h("div", { class: displayClass }, this._getLabel(this._translations.pdfOptions, true), h("div", { class: "padding-top-sides-1" }, h("calcite-label", { class: "label-margin-0", layout: "inline" }, h("calcite-checkbox", { checked: this._addResults, onCalciteCheckboxChange: () => this._addResults = !this._addResults }), this._translations.addResults)), h("div", { class: `padding-top-sides-1 ${formatOptionsClass}` }, h("calcite-label", { class: "label-margin-0" }, this._translations.selectPDFLabelOption)), h("div", { class: `padding-sides-1 ${formatOptionsClass}` }, h("pdf-download", { defaultNumLabelsPerPage: parseInt(this.defaultNumLabelsPerPage.toString(), 10), disabled: !this._downloadActive, ref: (el) => { this._downloadTools = el; } })), h("div", { class: "padding-top-sides-1" }, h("calcite-label", { class: "label-margin-0", layout: "inline" }, h("calcite-checkbox", { checked: this._addTitle, onCalciteCheckboxChange: () => this._addTitle = !this._addTitle }), this._translations.title)), h("div", { class: titleOptionsClass }, this._getLabel(this._translations.title, true, ""), h("calcite-input-text", { class: "padding-sides-1", onCalciteInputTextInput: () => this._changeTitle(), placeholder: this._translations.titlePlaceholder, ref: (el) => { this._titleElement = el; }, value: title })), h("div", { class: "padding-top-sides-1" }, h("calcite-label", { class: "label-margin-0", layout: "inline" }, h("calcite-checkbox", { checked: this._addMap, onCalciteCheckboxChange: () => this._handleAddMapChange() }), this._translations.includeMap)), h("div", { class: `padding-top-sides-1 ${graphicsOptionsClass}` }, h("calcite-label", { class: "label-margin-0", layout: "inline" }, h("calcite-checkbox", { checked: this._exportGraphics, onCalciteCheckboxChange: () => this._handleExportGraphicsChange() }), this._translations.listGraphics), h("calcite-icon", { class: "padding-start-1-2 icon", flipRtl: !(this.locale?.toLowerCase() === "he"), icon: "question", id: "list-graphics-icon", scale: "s" }), h("calcite-popover", { closable: true, label: "", referenceElement: "list-graphics-icon" }, h("span", { class: "tooltip-message" }, this._translations.listGraphicsTip)))));
    }
    /**
     * Toggle the _addMap state variable and update the graphics on the map
     *
     * @protected
     */
    _handleAddMapChange() {
        this._addMap = !this._addMap;
        this._updateExportGraphics();
    }
    /**
     * Toggle the _exportGraphics state variable and update the graphics on the map
     *
     * @protected
     */
    _handleExportGraphicsChange() {
        this._exportGraphics = !this._exportGraphics;
        this._updateExportGraphics();
    }
    /**
     * Get the "sketch" or "buffer" graphics layer
     *
     * @param type The type of managed layer to fetch "sketch" | "buffer"
     *
     * @protected
     */
    _getManagedLayer(type) {
        let layer;
        Object.keys(state.managedLayers).some((k) => {
            const i = this.mapView.map.layers.findIndex((l) => l.title === k);
            if (state.managedLayers[k] === type) {
                layer = this.mapView.map.layers.getItemAt(i);
                return true;
            }
        });
        return layer;
    }
    /**
     * Update the export graphics by adding or removeing them
     *
     * @param clear When true the graphics layers will be cleared prior to adding any new graphics, defaults to false
     *
     * @protected
     */
    _updateExportGraphics(clear = false) {
        if (clear || !this._exportGraphics || !this._addMap) {
            this._removeExportGraphics();
        }
        if (this._exportGraphics && this._addMap) {
            this._addExportGraphics();
        }
    }
    /**
     * Remove all buffer and sketch graphics
     *
     * @protected
     */
    _removeExportGraphics() {
        const sketchLayer = this._getManagedLayer("sketch");
        const bufferLayer = this._getManagedLayer("buffer");
        if (sketchLayer) {
            sketchLayer.graphics.removeAll();
        }
        if (bufferLayer) {
            bufferLayer.graphics.removeAll();
        }
    }
    /**
     * Add all buffer and sketch graphics that are flagged for download
     *
     * @protected
     */
    _addExportGraphics() {
        const sketchLayer = this._getManagedLayer("sketch");
        const bufferLayer = this._getManagedLayer("buffer");
        this._selectionSets.forEach(ss => {
            if (ss.download) {
                if (sketchLayer) {
                    sketchLayer.graphics.add(ss.sketchGraphic);
                }
                if (bufferLayer) {
                    const symbol = {
                        type: "simple-fill",
                        color: this.bufferColor,
                        outline: {
                            color: this.bufferOutlineColor,
                            width: 1
                        }
                    };
                    const bufferGraphic = new this.Graphic({
                        geometry: ss.buffer,
                        symbol
                    });
                    bufferLayer.graphics.add(bufferGraphic);
                }
            }
        });
    }
    /**
     * Render the refine page
     *
     * @protected
     */
    _getRefinePage() {
        const hasSelections = this._hasSelections();
        return (h("calcite-panel", null, this._getLabel(this._translations.refineSelection), hasSelections ? (h("div", null, this._getNotice(this._translations.refineTip, "padding-sides-1"), h("refine-selection", { enabledLayerIds: this.selectionLayerIds, locale: this.locale, mapView: this.mapView, selectionSets: this._selectionSets, sketchLineSymbol: this.sketchLineSymbol, sketchPointSymbol: this.sketchPointSymbol, sketchPolygonSymbol: this.sketchPolygonSymbol }))) :
            this._getNotice(this._translations.refineTipNoSelections, "padding-sides-1")));
    }
    /**
     * Create the stacked navigation buttons for a page
     *
     * @param topLabel the label to use for the button on top
     * @param topDisabled should the button be disabled
     * @param topFunc the fucntion to execute when the button is clicked
     * @param bottomLabel the label to use for the button on bottom
     * @param bottomDisabled should the button be disabled
     * @param bottomFunc the fucntion to execute when the button is clicked
     *
     * @returns the page node
     * @protected
     */
    _getPageNavButtons(topLabel, topDisabled, topFunc, bottomLabel, bottomDisabled, bottomFunc) {
        return (h("div", { class: "padding-bottom-1" }, h("div", { class: "display-flex padding-top-sides-1" }, h("calcite-button", { disabled: topDisabled, onClick: topFunc, width: "full" }, h("span", { class: "font-weight-500" }, topLabel))), h("div", { class: "display-flex padding-top-1-2 padding-sides-1" }, h("calcite-button", { appearance: "outline", disabled: bottomDisabled, onClick: bottomFunc, width: "full" }, h("span", { class: "font-weight-500" }, bottomLabel)))));
    }
    /**
     * Store the user defined title value
     */
    _changeTitle() {
        this._titleValue = this._titleElement.value;
    }
    /**
     * Create an informational notice
     *
     * @param message the message to display in the notice
     * @param noticeClass any custom css for the notice (default is "padding-1")
     *
     * @returns the notice node
     * @protected
     */
    _getNotice(message, noticeClass = "padding-1", messageClass = "") {
        return (h("calcite-notice", { class: noticeClass, icon: "lightbulb", kind: "success", open: true }, h("div", { class: messageClass, slot: "message" }, message)));
    }
    /**
     * Create a calcite label
     *
     * @param label value to display in the label
     * @param disableSpacing should extra calcite defined spacing be applied
     * @param labelClass by default label will be bold unless overridden here
     *
     * @returns the label node
     * @protected
     */
    _getLabel(label, disableSpacing = false, labelClass = "font-bold") {
        labelClass += disableSpacing ? " label-margin-0" : "";
        return (h("div", { class: "padding-top-sides-1" }, h("calcite-label", { class: labelClass }, label)));
    }
    /**
     * Get selection set list node with checkbox for Download pages
     *
     * @returns the list node
     * @protectedlabel
     */
    _getExportSelectionLists() {
        return this._selectionSets.reduce((prev, cur) => {
            const ids = this._getSelectionSetIds(cur);
            const validSet = cur.workflowType !== EWorkflowType.REFINE || ids.length > 0;
            if (!this._downloadActive && cur.download && validSet) {
                this._downloadActive = true;
            }
            if (validSet) {
                prev.push((h("div", { class: "display-flex padding-sides-1 padding-bottom-1" }, h("calcite-checkbox", { checked: cur.download, class: "align-center", onClick: () => { void this._toggleDownload(cur.id); } }), h("calcite-list", { class: "list-border margin-start-1-2 width-full", id: "download-list" }, h("calcite-list-item", { disabled: !cur.download, label: cur.label, onClick: () => { void this._toggleDownload(cur.id); } }, h("div", { slot: "content" }, h("div", { class: "list-label" }, cur.label), h("div", { class: "list-description" }, cur?.layerView?.layer.title), h("div", { class: "list-description" }, this._translations.selectedFeatures.replace("{{n}}", ids.length.toString()))))))));
            }
            return prev;
        }, []) || (h("div", null));
    }
    /**
     * Toggle the disabled state for the download options based on user selection
     *
     * @param id the selection set id to toggle
     *
     * @protected
     */
    async _toggleDownload(id) {
        let isActive = false;
        this._selectionSets = this._selectionSets.map(ss => {
            ss.download = ss.id === id ? !ss.download : ss.download;
            isActive = ss.download ? true : isActive;
            return ss;
        });
        this._updateExportGraphics(true);
        this._downloadActive = isActive;
        this._fetchingData = true;
        this._numDuplicates = await this._getNumDuplicates();
        this._fetchingData = false;
        await this._highlightFeatures();
    }
    /**
     * Download all selection sets as PDF or CSV or alert the user that they need to choose at least 1 export format
     *
     * @protected
     */
    async _export() {
        const exportInfos = this._addResults ?
            this._getSelectionIdsAndViews(this._selectionSets, true) : {};
        if (this._exportType === EExportType.PDF) {
            // Generate a map screenshot
            let initialImageDataUrl = "";
            if (this._addMap && this.mapView) {
                const screenshot = await this.mapView.takeScreenshot({ width: 1500, height: 2000 });
                initialImageDataUrl = screenshot?.dataUrl;
            }
            this._fetchingData = true;
            // Create the labels for each selection set
            await this._downloadTools.downloadPDF(this.mapView.map, exportInfos, this._removeDuplicates.checked, this._addTitle ? this._titleElement.value : "", initialImageDataUrl);
            this._fetchingData = false;
        }
        if (this._exportType === EExportType.CSV) {
            this._fetchingData = true;
            await this._downloadTools.downloadCSV(this.mapView.map, exportInfos, this._removeDuplicates.checked);
            this._fetchingData = false;
        }
    }
    /**
    * Sort selection sets by layer and retain key export details
    *
    * @param selectionSets selection sets to evaluate
    *
    * @returns key export details from the selection sets
    * @protected
    */
    _getSelectionIdsAndViews(selectionSets, downloadSetsOnly = false) {
        const exportSelectionSets = downloadSetsOnly ?
            selectionSets.filter(ss => ss.download) : selectionSets;
        return exportSelectionSets.reduce((prev, cur) => {
            if (cur.workflowType === EWorkflowType.REFINE) {
                Object.keys(cur.refineInfos).forEach(k => {
                    const refineInfo = cur.refineInfos[k];
                    if (refineInfo.addIds) {
                        const _id = refineInfo.layerView.layer.id;
                        prev = this._updateExportInfos(prev, _id, cur.label, refineInfo.addIds, refineInfo.layerView);
                    }
                });
            }
            else {
                const id = cur?.layerView?.layer.id;
                prev = this._updateExportInfos(prev, id, cur.label, cur.selectedIds, cur.layerView);
            }
            return prev;
        }, {});
    }
    /**
     * Store the ids and selection set names for export
     *
     * @param exportInfos the current export infos object to update
     * @param id the layer id for the selection set
     * @param label the selection sets label
     * @param newIds the current ids
     * @param layerView the layer associated with the selection set
     *
     * @returns key export details from the selection sets
     * @protected
     */
    _updateExportInfos(exportInfos, id, label, newIds, layerView) {
        if (id && Object.keys(exportInfos).indexOf(id) > -1) {
            exportInfos[id].ids = [...new Set([
                    ...exportInfos[id].ids,
                    ...newIds
                ])];
            exportInfos[id].selectionSetNames.push(label);
        }
        else if (id) {
            exportInfos[id] = {
                ids: newIds,
                layerView: layerView,
                selectionSetNames: [label]
            };
        }
        return exportInfos;
    }
    /**
     * Create a calcite action
     *
     * @param enabled controls the enabled state of the control
     * @param icon the image to display in the action
     * @param text and supporting text for the action
     * @param onClick the fucntion the actio will execute
     * @param indicator boolean to control if an indicator should be shown (default is false)
     * @param slot the supporting slot to use
     *
     * @returns the calcite action node
     * @protected
     */
    _getAction(enabled, icon, text, onClick, indicator = false, slot = "") {
        return (h("calcite-action", { disabled: !enabled, icon: icon, iconFlipRtl: true, indicator: indicator, onClick: onClick, slot: slot, text: text }));
    }
    /**
     * Store the number of selected features and if it's more than one enable save
     *
     * @returns the page node
     * @protected
     */
    _updateForSelection(evt) {
        this._numSelected = evt.detail;
        this._saveEnabled = this._numSelected > 0;
    }
    /**
     * Clear the selection and navigate to the home page
     *
     * @returns Promise when the function has completed
     * @protected
     */
    async _home() {
        await this._clearSelection();
        this._setPageType(EPageType.LIST);
    }
    /**
     * Update the selection sets with any new selections from the select tools
     *
     * @returns Promise when the function has completed
     * @protected
     */
    async _saveSelection() {
        const results = await this._selectTools?.getSelection();
        const isUpdate = this._selectTools?.isUpdate;
        this._selectionSets = isUpdate ? this._selectionSets.map(ss => {
            return ss.id === results.id ? results : ss;
        }) : [
            ...this._selectionSets,
            results
        ];
        return this._home();
    }
    /**
     * Clear any selections
     *
     * @returns Promise when the function has completed
     * @protected
     */
    async _clearSelection() {
        await this._selectTools?.clearSelection();
        this._numSelected = 0;
        this._activeSelection = undefined;
    }
    /**
     * Delete the selection at the defined index
     *
     * @param index number that defines what selection set to delete
     *
     * @protected
     */
    _deleteSelection(index, evt) {
        evt.stopPropagation();
        this._selectionSets = this._selectionSets.filter((ss, i) => {
            if (i !== index) {
                return ss;
            }
        });
        return this._highlightFeatures();
    }
    /**
     * Pan to the current selection
     *
     * @param selSet ISelectionSet to pan to
     * @param mapView Current MapView to pan within
     *
     * @protected
     */
    _gotoSelection(selSet, mapView) {
        void goToSelection(selSet.selectedIds, selSet.layerView, mapView, this.featureHighlightEnabled, this.featureEffect);
    }
    /**
     * Open the selection set for further adjustment
     *
     * @protected
     */
    _openSelection(selectionSet, evt) {
        evt.stopPropagation();
        this._activeSelection = selectionSet;
        this._pageType = selectionSet.workflowType === EWorkflowType.REFINE ?
            EPageType.REFINE : EPageType.SELECT;
    }
    /**
     * Highlight any selected features in the map
     *
     * @protected
     */
    async _highlightFeatures() {
        this._clearHighlight();
        const idSets = this._getSelectionIdsAndViews(this._selectionSets, this._pageType === EPageType.EXPORT);
        const idKeys = Object.keys(idSets);
        if (idKeys.length > 0) {
            for (let i = 0; i < idKeys.length; i++) {
                const idSet = idSets[idKeys[i]];
                state.highlightHandles.push(await highlightFeatures(idSet.ids, idSet.layerView, this.mapView));
            }
        }
    }
    /**
     * Clear any highlighted features in the map
     *
     * @protected
     */
    _checkPopups() {
        if (typeof this._popupsEnabled !== 'boolean') {
            this._popupsEnabled = this.mapView?.popupEnabled;
        }
    }
    /**
     * Clear any highlighted features in the map
     *
     * @protected
     */
    _clearHighlight() {
        if (state && state.highlightHandles) {
            state.removeHandles();
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
    static get watchers() { return {
        "mapView": ["mapViewWatchHandler"],
        "searchConfiguration": ["watchSearchConfigurationHandler"],
        "sketchLineSymbol": ["sketchLineSymbolWatchHandler"],
        "sketchPointSymbol": ["sketchPointSymbolWatchHandler"],
        "sketchPolygonSymbol": ["sketchPolygonSymbolWatchHandler"],
        "_pageType": ["pageTypeWatchHandler"]
    }; }
    static get style() { return PublicNotificationStyle0; }
}, [0, "public-notification", {
        "addresseeLayerIds": [16],
        "bufferColor": [8, "buffer-color"],
        "bufferOutlineColor": [8, "buffer-outline-color"],
        "customLabelEnabled": [4, "custom-label-enabled"],
        "defaultBufferDistance": [2, "default-buffer-distance"],
        "defaultBufferUnit": [1, "default-buffer-unit"],
        "defaultExportTitle": [1, "default-export-title"],
        "defaultNumLabelsPerPage": [2, "default-num-labels-per-page"],
        "enableLayerFeatures": [4, "enable-layer-features"],
        "enableLayerFeaturesOnLoad": [4, "enable-layer-features-on-load"],
        "enableSearchDistance": [4, "enable-search-distance"],
        "enableSearchDistanceOnLoad": [4, "enable-search-distance-on-load"],
        "enableSketchTools": [4, "enable-sketch-tools"],
        "featureEffect": [16],
        "featureHighlightEnabled": [4, "feature-highlight-enabled"],
        "locale": [1],
        "mapView": [16],
        "noResultText": [1, "no-result-text"],
        "searchConfiguration": [1040],
        "selectionLayerIds": [16],
        "showRefineSelection": [4, "show-refine-selection"],
        "showSearchSettings": [4, "show-search-settings"],
        "sketchLineSymbol": [8, "sketch-line-symbol"],
        "sketchPointSymbol": [8, "sketch-point-symbol"],
        "sketchPolygonSymbol": [8, "sketch-polygon-symbol"],
        "_exportGraphics": [32],
        "_addMap": [32],
        "_addResults": [32],
        "_addTitle": [32],
        "_downloadActive": [32],
        "_exportType": [32],
        "_fetchingData": [32],
        "_isMobile": [32],
        "_numDuplicates": [32],
        "_pageType": [32],
        "_saveEnabled": [32],
        "_selectionSets": [32],
        "_translations": [32]
    }, [[8, "selectionSetsChanged", "selectionSetsChanged"]], {
        "mapView": ["mapViewWatchHandler"],
        "searchConfiguration": ["watchSearchConfigurationHandler"],
        "sketchLineSymbol": ["sketchLineSymbolWatchHandler"],
        "sketchPointSymbol": ["sketchPointSymbolWatchHandler"],
        "sketchPolygonSymbol": ["sketchPolygonSymbolWatchHandler"],
        "_pageType": ["pageTypeWatchHandler"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["public-notification", "buffer-tools", "calcite-action", "calcite-action-bar", "calcite-action-group", "calcite-action-menu", "calcite-button", "calcite-checkbox", "calcite-chip", "calcite-combobox", "calcite-combobox-item", "calcite-dropdown", "calcite-dropdown-group", "calcite-dropdown-item", "calcite-filter", "calcite-graph", "calcite-handle", "calcite-icon", "calcite-input", "calcite-input-message", "calcite-input-text", "calcite-label", "calcite-list", "calcite-list-item", "calcite-loader", "calcite-notice", "calcite-option", "calcite-panel", "calcite-popover", "calcite-progress", "calcite-scrim", "calcite-segmented-control", "calcite-segmented-control-item", "calcite-select", "calcite-shell", "calcite-slider", "calcite-stack", "calcite-switch", "calcite-tooltip", "map-draw-tools", "map-layer-picker", "map-select-tools", "pdf-download", "refine-selection"];
    components.forEach(tagName => { switch (tagName) {
        case "public-notification":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, PublicNotification$1);
            }
            break;
        case "buffer-tools":
            if (!customElements.get(tagName)) {
                defineCustomElement$I();
            }
            break;
        case "calcite-action":
            if (!customElements.get(tagName)) {
                defineCustomElement$H();
            }
            break;
        case "calcite-action-bar":
            if (!customElements.get(tagName)) {
                defineCustomElement$G();
            }
            break;
        case "calcite-action-group":
            if (!customElements.get(tagName)) {
                defineCustomElement$F();
            }
            break;
        case "calcite-action-menu":
            if (!customElements.get(tagName)) {
                defineCustomElement$E();
            }
            break;
        case "calcite-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$D();
            }
            break;
        case "calcite-checkbox":
            if (!customElements.get(tagName)) {
                defineCustomElement$C();
            }
            break;
        case "calcite-chip":
            if (!customElements.get(tagName)) {
                defineCustomElement$B();
            }
            break;
        case "calcite-combobox":
            if (!customElements.get(tagName)) {
                defineCustomElement$A();
            }
            break;
        case "calcite-combobox-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$z();
            }
            break;
        case "calcite-dropdown":
            if (!customElements.get(tagName)) {
                defineCustomElement$y();
            }
            break;
        case "calcite-dropdown-group":
            if (!customElements.get(tagName)) {
                defineCustomElement$x();
            }
            break;
        case "calcite-dropdown-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$w();
            }
            break;
        case "calcite-filter":
            if (!customElements.get(tagName)) {
                defineCustomElement$v();
            }
            break;
        case "calcite-graph":
            if (!customElements.get(tagName)) {
                defineCustomElement$u();
            }
            break;
        case "calcite-handle":
            if (!customElements.get(tagName)) {
                defineCustomElement$t();
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$s();
            }
            break;
        case "calcite-input":
            if (!customElements.get(tagName)) {
                defineCustomElement$r();
            }
            break;
        case "calcite-input-message":
            if (!customElements.get(tagName)) {
                defineCustomElement$q();
            }
            break;
        case "calcite-input-text":
            if (!customElements.get(tagName)) {
                defineCustomElement$p();
            }
            break;
        case "calcite-label":
            if (!customElements.get(tagName)) {
                defineCustomElement$o();
            }
            break;
        case "calcite-list":
            if (!customElements.get(tagName)) {
                defineCustomElement$n();
            }
            break;
        case "calcite-list-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$m();
            }
            break;
        case "calcite-loader":
            if (!customElements.get(tagName)) {
                defineCustomElement$l();
            }
            break;
        case "calcite-notice":
            if (!customElements.get(tagName)) {
                defineCustomElement$k();
            }
            break;
        case "calcite-option":
            if (!customElements.get(tagName)) {
                defineCustomElement$j();
            }
            break;
        case "calcite-panel":
            if (!customElements.get(tagName)) {
                defineCustomElement$i();
            }
            break;
        case "calcite-popover":
            if (!customElements.get(tagName)) {
                defineCustomElement$h();
            }
            break;
        case "calcite-progress":
            if (!customElements.get(tagName)) {
                defineCustomElement$g();
            }
            break;
        case "calcite-scrim":
            if (!customElements.get(tagName)) {
                defineCustomElement$f();
            }
            break;
        case "calcite-segmented-control":
            if (!customElements.get(tagName)) {
                defineCustomElement$e();
            }
            break;
        case "calcite-segmented-control-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$d();
            }
            break;
        case "calcite-select":
            if (!customElements.get(tagName)) {
                defineCustomElement$c();
            }
            break;
        case "calcite-shell":
            if (!customElements.get(tagName)) {
                defineCustomElement$b();
            }
            break;
        case "calcite-slider":
            if (!customElements.get(tagName)) {
                defineCustomElement$a();
            }
            break;
        case "calcite-stack":
            if (!customElements.get(tagName)) {
                defineCustomElement$9();
            }
            break;
        case "calcite-switch":
            if (!customElements.get(tagName)) {
                defineCustomElement$8();
            }
            break;
        case "calcite-tooltip":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "map-draw-tools":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "map-layer-picker":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "map-select-tools":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "pdf-download":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "refine-selection":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}
defineCustomElement$1();

const PublicNotification = PublicNotification$1;
const defineCustomElement = defineCustomElement$1;

export { PublicNotification, defineCustomElement };
