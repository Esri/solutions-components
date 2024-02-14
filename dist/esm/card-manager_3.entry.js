/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, h, H as Host, g as getElement, c as createEvent } from './index-164d485a.js';
import { g as getLocaleComponentStrings, l as loadModules } from './locale-25a5ae3e.js';
import { q as queryFeaturesByID, g as getLayerOrTable, c as goToSelection, e as queryAllIds, f as queryFeatureIds, i as queryFeaturesByGlobalID } from './mapViewUtils-257bc9b3.js';
import { d as downloadCSV } from './downloadUtils-985dcd1c.js';
import './esri-loader-eda07632.js';
import './_commonjsHelpers-d5f9d613.js';
import './interfaces-586e863c.js';
import './solution-resource-7b8d302d.js';
import './index-a1e91462.js';
import './restHelpersGet-af032ab2.js';

const cardManagerCss = ":host{display:block !important}.display-flex{display:flex}.display-none{display:none}.w-100{width:100%}.padding-bottom-1{padding-bottom:1rem}.padding-1{padding:1rem}.position-relative{position:relative}.focus-margin{margin:1px 1px 0px 1px}.overflow-auto{overflow:auto}.height-full{height:100%}card-manager{display:block}";

const CardManager = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.isMobile = undefined;
        this.layer = undefined;
        this.mapView = undefined;
        this.zoomAndScrollToSelected = undefined;
        this._cardLoading = false;
        this._graphics = undefined;
        this._translations = undefined;
    }
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
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
     * Query the layer for the provided ids and store the result graphics
     */
    async featureSelectionChange(evt) {
        const ids = evt.detail;
        this._cardLoading = true;
        // only query if we have some ids...query with no ids will result in all features being returned
        const featureSet = ids.length > 0 ? await queryFeaturesByID(ids, this.layer, [], false, this.mapView.spatialReference) : [];
        // https://github.com/Esri/solutions-components/issues/365
        this._graphics = featureSet.sort((a, b) => ids.indexOf(a.getObjectId()) - ids.indexOf(b.getObjectId()));
        this._cardLoading = false;
    }
    /**
     * Get the layer view for the provided layer id
     */
    async layerSelectionChange(evt) {
        const id = evt.detail[0];
        this.layer = await getLayerOrTable(this.mapView, id);
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (lifecycle)
    //
    //--------------------------------------------------------------------------
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     *
     * @returns Promise when complete
     */
    async componentWillLoad() {
        await this._getTranslations();
    }
    /**
     * Renders the component.
     */
    render() {
        var _a, _b;
        const featuresClass = ((_a = this._graphics) === null || _a === void 0 ? void 0 : _a.length) > 0 ? "" : "display-none";
        const messageClass = ((_b = this._graphics) === null || _b === void 0 ? void 0 : _b.length) > 0 ? "display-none" : "";
        return (h(Host, null, h("div", { class: "overflow-auto height-full" }, h("calcite-shell", { class: "position-relative " + featuresClass }, h("div", null, h("info-card", { graphics: this._graphics, isLoading: this._cardLoading, isMobile: this.isMobile, mapView: this.mapView, zoomAndScrollToSelected: this.zoomAndScrollToSelected }))), h("calcite-shell", { class: "position-relative " + messageClass }, h("div", { class: "padding-1" }, h("calcite-notice", { icon: "table", open: true }, h("div", { slot: "message" }, this._translations.selectFeaturesToStart)))))));
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * Fetches the component's translations
     *
     * @returns Promise when complete
     * @protected
     */
    async _getTranslations() {
        const messages = await getLocaleComponentStrings(this.el);
        this._translations = messages[0];
    }
    get el() { return getElement(this); }
};
CardManager.style = cardManagerCss;

const layerTableCss = ":host{display:block}.height-full{height:100%}.height-full-adjusted{height:calc(100% - 20px)}.width-full{width:100%}.display-flex{display:flex}.table-border{border:1px solid var(--calcite-color-border-2)}.border-end{border-inline-end:1px solid var(--calcite-color-border-2)}.border-bottom{border-bottom:1px solid var(--calcite-color-border-2)}.padding-5{padding:5px}.padding-end-1{padding-inline-end:1rem}.height-51{height:51px}.height-50-px{height:50px}.bottom-left{position:absolute;left:0;bottom:0;padding-left:5px}html[dir=\"rtl\"] .bottom-left{position:absolute;right:0;bottom:0;padding-right:5px}.height-19{height:19px}.background{background-color:var(--calcite-color-background)}.text-color{color:var(--calcite-color-text-1)}.align-center{align-items:center}.danger-color{color:var(--calcite-color-status-danger)}.esri-feature-table vaadin-grid{border:none !important}vaadin-grid-cell-content{font-size:14px !important;color:var(--calcite-color-text-3) !important}.share-action{position:absolute;right:0}html[dir=\"rtl\"] .share-action{left:0}.disabled{cursor:default !important;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled);pointer-events:none}.instant-app-share{height:50px !important;display:inline-flex}.border-top{border-top:1px solid var(--calcite-color-border-2)}.modal{--calcite-modal-content-padding:0}";

const LayerTable = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.featureSelectionChange = createEvent(this, "featureSelectionChange", 7);
        /**
         * number[]: A list of all IDs for the current layer
         */
        this._allIds = [];
        /**
         * boolean: When true the ctrl key is currently pressed
         */
        this._ctrlIsPressed = false;
        /**
         * boolean: When true the default filter provided via url param has been honored and should now be ignored
         */
        this._defaultFilterHonored = false;
        /**
         * boolean: When true the default global id provided via url param has been honored and should now be ignored
         */
        this._defaultGlobalIdHonored = false;
        /**
         * boolean: When true the default OID provided via url param has been honored and should now be ignored
         */
        this._defaultOidHonored = false;
        /**
         * boolean: When true the observer has been set and we don't need to set it again
         */
        this._observerSet = false;
        /**
         * boolean: When true the shift key is currently pressed
         */
        this._shiftIsPressed = false;
        /**
         * boolean: When true any onChange handeling will be skipped
         */
        this._skipOnChange = false;
        /**
         * bool: When true the table is being sorted
         */
        this._tableSorting = false;
        /**
         * Store a reference to the table node after it's first created
         * and initializes the FeatureTable
         *
         * @param node HTMLDivElement The node representing the DOM element that will contain the widget.
         */
        this.onTableNodeCreate = (node) => {
            this._tableNode = node;
        };
        this.defaultFilter = undefined;
        this.defaultGlobalId = undefined;
        this.defaultLayerId = undefined;
        this.defaultOid = undefined;
        this.enableAutoRefresh = undefined;
        this.enableColumnReorder = true;
        this.enableCSV = undefined;
        this.enableInlineEdit = undefined;
        this.enableShare = undefined;
        this.isMobile = undefined;
        this.mapInfo = undefined;
        this.mapView = undefined;
        this.onlyShowUpdatableLayers = undefined;
        this.selectedIds = [];
        this.shareIncludeEmbed = undefined;
        this.shareIncludeSocial = undefined;
        this.showNewestFirst = undefined;
        this.zoomAndScrollToSelected = undefined;
        this._controlsThatFit = undefined;
        this._fetchingData = false;
        this._filterActive = false;
        this._filterOpen = false;
        this._layer = undefined;
        this._selectAllActive = false;
        this._showHideOpen = false;
        this._showOnlySelected = false;
        this._sortActive = false;
        this._translations = undefined;
    }
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    /**
     * Reset the toolInfos when export csv is enabled/disabled
     */
    enableCSVWatchHandler() {
        var _a;
        if (((_a = this._toolInfos) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            this._initToolInfos();
        }
    }
    /**
     * Update the table when enableInlineEdit is enabled/disabled
     */
    enableInlineEditWatchHandler() {
        if (this._table) {
            this._table.editingEnabled = this._editEnabled && this.enableInlineEdit;
        }
    }
    /**
     * watch for changes to the list of controls that will currently fit in the display
     */
    _controlsThatFitWatchHandler() {
        var _a;
        const ids = this._controlsThatFit ? this._controlsThatFit.reduce((prev, cur) => {
            prev.push(cur.id);
            return prev;
        }, []) : [];
        this._toolInfos = (_a = this._toolInfos) === null || _a === void 0 ? void 0 : _a.map(ti => {
            if (ti && this._controlsThatFit) {
                const id = this._getId(ti.icon);
                ti.isOverflow = ids.indexOf(id) < 0;
                return ti;
            }
        });
    }
    /**
     * When isMobile is false we need to init the tool infos for the dynamic toolbar
     */
    isMobileWatchHandler() {
        if (!this._toolInfos && !this.isMobile) {
            this._initToolInfos();
        }
    }
    /**
     * watch for changes in map info and recheck the tool infos
     */
    async mapInfoWatchHandler() {
        var _a;
        if (((_a = this._toolInfos) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            this._initToolInfos();
        }
        this._initLayerExpressions();
        this._resetColumnTemplates();
    }
    /**
     * watch for changes in map view and get the first layer
     */
    async mapViewWatchHandler() {
        if (this._mapClickHandle) {
            this._mapClickHandle.remove();
        }
        if (this.mapView) {
            this._updateShareUrl();
            this._mapClickHandle = this.reactiveUtils.on(() => this.mapView, "click", (event) => {
                void this._mapClicked(event);
            });
        }
    }
    /**
     * watch for changes in layer view and verify if it has editing enabled
     */
    async _layerWatchHandler() {
        var _a, _b, _c;
        this._fetchingData = true;
        this._definitionExpression = (_a = this._layer) === null || _a === void 0 ? void 0 : _a.definitionExpression;
        this._floorField = (_c = (_b = this._layer) === null || _b === void 0 ? void 0 : _b.floorInfo) === null || _c === void 0 ? void 0 : _c.floorField;
        this._updateFloorDefinitionExpression();
        await this._resetTable();
        this._updateShareUrl();
        this._initLayerExpressions();
        this._fetchingData = false;
    }
    /**
     * watch for selection changes
     */
    async selectedIdsWatchHandler() {
        this._updateShareUrl();
        this._validateEnabledActions();
        if (this._selectAllActive && this.selectedIds.length !== this._allIds.length) {
            this._selectAllActive = false;
        }
    }
    /**
     * When sortActive is false the user has not defined a sort and we should use the default sort
     */
    async _sortActiveWatchHandler() {
        if (!this._sortActive) {
            await this._sortTable();
        }
    }
    /**
     * Scroll and zoom to the selected feature from the Features widget.
     *
     * @param evt CustomEvent the graphic for the current selection
     */
    async selectionChanged(evt) {
        const g = evt.detail[0];
        const oid = g.getObjectId();
        if (this.zoomAndScrollToSelected) {
            const i = this._table.viewModel.getObjectIdIndex(oid);
            this._table.scrollToIndex(i);
            const layer = g.layer;
            const layerViews = this.mapView.allLayerViews.toArray();
            let layerView;
            layerViews.some(lv => {
                if (lv.layer.title === layer.title && lv.layer.type === 'feature') {
                    layerView = lv;
                    return true;
                }
            });
            if (layerView) {
                await goToSelection([oid], layerView, this.mapView, true);
            }
        }
    }
    /**
     * Refresh the table when edits are completed
     */
    async editsComplete(evt) {
        const editType = evt.detail;
        if (editType === "delete" || editType === "add") {
            this._allIds = await queryAllIds(this._layer);
        }
        await this._refresh();
    }
    /**
     * Refresh the table when floor filter level is changed
     */
    async levelChanged(evt) {
        this._floorLevel = evt.detail;
        this._updateFloorDefinitionExpression();
    }
    /**
     * Refresh the table when
     */
    noLayersFound() {
        this._layer = undefined;
        this._allIds = [];
        this._clearSelection();
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (lifecycle)
    //
    //--------------------------------------------------------------------------
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     *
     * @returns Promise when complete
     */
    async componentWillLoad() {
        await this._getTranslations();
        await this._initModules();
        this._initToolInfos();
        if (!this._resizeObserver) {
            this._resizeObserver = new ResizeObserver(() => this._onResize());
        }
    }
    /**
     * Renders the component.
     */
    render() {
        const tableNodeClass = this._fetchingData ? "display-none" : "";
        const loadingClass = this._fetchingData ? "" : "display-none";
        const total = this._allIds.length.toString();
        const selected = this.selectedIds.length.toString();
        const tableHeightClass = this.isMobile ? "height-full" : "height-full-adjusted";
        this._validateActiveActions();
        return (h(Host, null, h("calcite-shell", null, this._getTableControlRow("header"), h("div", { class: `width-full ${tableHeightClass}` }, h("calcite-panel", { class: "height-full width-full" }, h("calcite-loader", { class: loadingClass, label: this._translations.fetchingData, scale: "l" }), h("div", { class: tableNodeClass, ref: this.onTableNodeCreate })), !this.isMobile ? (h("div", { class: "bottom-left text-color height-19" }, this._translations.recordsSelected
            .replace("{{total}}", total)
            .replace("{{selected}}", selected))) : undefined)), this._filterModal()));
    }
    /**
     * Called once after the component is loaded
     */
    async componentDidLoad() {
        if (!this.isMobile && !this._observerSet) {
            this._resizeObserver.observe(this._toolbar);
            this._observerSet = true;
        }
        document.onclick = (e) => this._handleDocumentClick(e);
        document.onkeydown = (e) => this._handleKeyDown(e);
        document.onkeyup = (e) => this._handleKeyUp(e);
    }
    /**
     * Called after the component is rendered
     */
    componentDidRender() {
        this._updateToolbar();
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
        const [FeatureTable, reactiveUtils, TableTemplate] = await loadModules([
            "esri/widgets/FeatureTable",
            "esri/core/reactiveUtils",
            "esri/widgets/FeatureTable/support/TableTemplate"
        ]);
        this.FeatureTable = FeatureTable;
        this.reactiveUtils = reactiveUtils;
        this.TableTemplate = TableTemplate;
    }
    /**
     * Update the toolbar when its size changes
     */
    _onResize() {
        this._updateToolbar();
    }
    /**
     * Gets a row of controls that can be used for various interactions with the table
     *
     * @param slot string optional slot to display the control within
     *
     * @returns The dom node that contains the controls
     */
    _getTableControlRow(slot) {
        const id = "more-table-options";
        return (h("div", { class: "display-flex border-bottom height-51", ref: (el) => this._toolbar = el, slot: slot }, this._getActionBar(), !this.isMobile ? this._getDropdown(id) : undefined, this.enableShare && !this.isMobile ? this._getShare("share") : undefined));
    }
    /**
     * Gets a row of controls that can be used for various interactions with the table
     *
     * @param slot string optional slot to display the control within
     *
     * @returns The dom node that contains the controls
     */
    _getActionBar() {
        const containerClass = this.isMobile ? "width-full" : "";
        const mobileClass = this.isMobile ? "border-top" : "";
        return (h("calcite-action-bar", { class: containerClass, expandDisabled: true, expanded: true, id: this._getId("bar"), layout: "horizontal" }, h("div", { class: `border-end ${containerClass} ${mobileClass}`, id: "solutions-map-layer-picker-container" }, h("map-layer-picker", { appearance: "transparent", defaultLayerId: this.defaultLayerId, display: "inline-flex", height: 50, isMobile: this.isMobile, mapView: this.mapView, onLayerSelectionChange: (evt) => this._layerSelectionChanged(evt), onlyShowUpdatableLayers: this.onlyShowUpdatableLayers, placeholderIcon: "layers", scale: "l", showSingleLayerAsLabel: true, showTables: true, type: "dropdown" })), !this.isMobile ? this._getActions() : undefined));
    }
    /**
     * Get the actions that are used for various interactions with the table
     *
     * @returns VNode[] the action nodes
     */
    _getActions() {
        const actions = this._getActionItems();
        return actions.reduce((prev, cur) => {
            if (cur && !cur.isOverflow) {
                prev.push(cur.isDanger ?
                    this._getDangerAction(cur.icon, cur.label, cur.func, cur.disabled) :
                    cur.isSublist ? (h("calcite-dropdown", { closeOnSelectDisabled: true, id: this._getId(cur.icon), onCalciteDropdownBeforeClose: () => this._forceShowHide(), ref: (el) => this._showHideDropdown = el }, this._getAction(cur.active, this._showHideOpen ? "chevron-down" : cur.icon, cur.indicator, cur.label, cur.func, cur.disabled, "trigger"), this._showHideOpen ? this._getFieldlist() : undefined)) :
                        this._getAction(cur.active, cur.icon, cur.indicator, cur.label, cur.func, cur.disabled));
            }
            return prev;
        }, []);
    }
    /**
     * Get the list of fields as dropdown items and store the current selected state so
     * we can show/hide the appropriate fields
     *
     * @returns Node with the fields as dropdown items
     */
    _getFieldlist() {
        return this._columnsInfo ? (h("calcite-dropdown-group", { "selection-mode": "multiple" }, Object.keys(this._columnsInfo).map(k => {
            const selected = this._columnsInfo[k];
            return (h("calcite-dropdown-item", { id: k, onClick: (e) => {
                    const target = e.target;
                    this._columnsInfo[target.id] = target.selected;
                    if (!target.selected) {
                        this._table.hideColumn(target.id);
                    }
                    else {
                        this._table.showColumn(target.id);
                    }
                }, selected: selected }, k));
        }))) : undefined;
    }
    /**
     * Update actions enabled prop based on number of selected indexes
     */
    _validateEnabledActions() {
        var _a;
        const featuresSelected = this._featuresSelected();
        const selectionDependant = [
            "zoom-to-object",
            "trash",
            "erase",
            "selected-items-filter"
        ];
        (_a = this._toolInfos) === null || _a === void 0 ? void 0 : _a.forEach(ti => {
            if (ti && selectionDependant.indexOf(ti.icon) > -1) {
                ti.disabled = !featuresSelected;
            }
        });
    }
    /**
     * Update actions active prop based on a stored value
     */
    _validateActiveActions() {
        var _a;
        const activeDependant = [
            "filter",
            "list-check-all",
            "selected-items-filter"
        ];
        (_a = this._toolInfos) === null || _a === void 0 ? void 0 : _a.forEach(ti => {
            if (ti && activeDependant.indexOf(ti.icon) > -1) {
                if (ti.icon === "filter") {
                    ti.indicator = this._filterActive;
                }
                if (ti.icon === "list-check-all") {
                    ti.active = this._selectAllActive;
                }
                if (ti.icon === "selected-items-filter") {
                    ti.active = this._showOnlySelected;
                }
            }
        });
    }
    /**
     * Get the full list of toolInfos.
     * Order is important. They should be listed in the order they should display in the UI from
     * Left to Right for the action bar and Top to Bottom for the dropdown.
     */
    _initToolInfos() {
        const featuresSelected = this._featuresSelected();
        const featuresEmpty = this._featuresEmpty();
        const hasFilterExpressions = this._hasFilterExpressions();
        if (this._translations) {
            this._toolInfos = [{
                    active: false,
                    icon: "zoom-to-object",
                    indicator: false,
                    label: this._translations.zoom,
                    func: () => this._zoom(),
                    disabled: !featuresSelected,
                    isOverflow: false
                },
                hasFilterExpressions ? {
                    active: false,
                    icon: "filter",
                    indicator: false,
                    label: this._translations.filters,
                    func: () => this._toggleFilter(),
                    disabled: false,
                    isOverflow: false
                } : undefined,
                this._deleteEnabled ? {
                    active: undefined,
                    icon: "trash",
                    indicator: undefined,
                    label: undefined,
                    func: undefined,
                    disabled: !featuresSelected,
                    isDanger: true,
                    isOverflow: false
                } : undefined, {
                    active: false,
                    icon: "erase",
                    indicator: false,
                    label: this._translations.clearSelection,
                    func: () => this._clearSelection(),
                    disabled: !featuresSelected,
                    isOverflow: false
                }, {
                    active: false,
                    icon: "selected-items-filter",
                    indicator: false,
                    label: this._showOnlySelected ? this._translations.showAll : this._translations.showSelected,
                    func: () => this._toggleShowSelected(),
                    disabled: !featuresSelected,
                    isOverflow: false
                }, {
                    active: false,
                    icon: "list-check-all",
                    indicator: false,
                    func: () => this._selectAll(),
                    label: this._translations.selectAll,
                    disabled: featuresEmpty,
                    isOverflow: false
                }, {
                    active: false,
                    icon: "compare",
                    indicator: false,
                    func: () => this._switchSelected(),
                    label: this._translations.switchSelected,
                    disabled: featuresEmpty,
                    isOverflow: false
                }, {
                    active: false,
                    icon: "refresh",
                    indicator: false,
                    func: () => this._refresh(),
                    label: this._translations.refresh,
                    disabled: false,
                    isOverflow: false
                },
                this.enableCSV ? {
                    active: false,
                    icon: "export",
                    indicator: false,
                    func: () => void this._exportToCSV(),
                    label: this._translations.exportCSV,
                    disabled: featuresEmpty,
                    isOverflow: false
                } : undefined, {
                    active: false,
                    icon: this._showHideOpen ? "chevron-down" : "chevron-right",
                    indicator: false,
                    func: () => this._toggleShowHide(),
                    label: this._translations.showHideColumns,
                    disabled: false,
                    isOverflow: false,
                    isSublist: true
                }];
            this._defaultVisibleToolSizeInfos = undefined;
        }
    }
    /**
     * Applies a definition expression when floor field and level are available
     *
     * @returns boolean
     */
    _updateFloorDefinitionExpression() {
        if (this._floorField && this._floorLevel) {
            this._layer.definitionExpression = `${this._floorField} = '${this._floorLevel}'`;
        }
    }
    /**
     * Returns true when one ore more features are selected
     *
     * @returns boolean
     */
    _featuresSelected() {
        return this.selectedIds.length > 0;
    }
    /**
     * Return true when we have no features
     *
     * @returns boolean
     */
    _featuresEmpty() {
        return this._allIds.length === 0;
    }
    /**
     * Return true when we have at least 1 layer expression for the current layer
     *
     * @returns boolean
     */
    _hasFilterExpressions() {
        var _a, _b, _c;
        let layerExpressions;
        if (((_b = (_a = this.mapInfo) === null || _a === void 0 ? void 0 : _a.filterConfig) === null || _b === void 0 ? void 0 : _b.layerExpressions) && ((_c = this._layer) === null || _c === void 0 ? void 0 : _c.id)) {
            layerExpressions = this.mapInfo.filterConfig.layerExpressions.filter((exp) => exp.id === this._layer.id);
        }
        return (layerExpressions === null || layerExpressions === void 0 ? void 0 : layerExpressions.length) > 0;
    }
    /**
     * Add/Remove tools from the action bar and dropdown based on available size
     */
    _updateToolbar() {
        if (this._timeout) {
            clearTimeout(this._timeout);
        }
        if (!this.isMobile) {
            this._timeout = setTimeout(() => {
                clearTimeout(this._timeout);
                this._setToolbarSizeInfos();
                const toolbarWidth = this._toolbar.offsetWidth;
                let controlsWidth = this._toolbarSizeInfos.reduce((prev, cur) => {
                    prev += cur.width;
                    return prev;
                }, 0);
                const skipControls = ["solutions-more", "solutions-map-layer-picker-container", "solutions-action-share"];
                if (controlsWidth > toolbarWidth) {
                    if (this._toolbarSizeInfos.length > 0) {
                        const controlsThatFit = [...this._toolbarSizeInfos].reverse().reduce((prev, cur) => {
                            if (skipControls.indexOf(cur.id) < 0) {
                                if (controlsWidth > toolbarWidth) {
                                    controlsWidth -= cur.width;
                                }
                                else {
                                    prev.push(cur);
                                }
                            }
                            return prev;
                        }, []).reverse();
                        this._setControlsThatFit(controlsThatFit, skipControls);
                    }
                }
                else {
                    if (this._defaultVisibleToolSizeInfos) {
                        const currentTools = this._toolbarSizeInfos.reduce((prev, cur) => {
                            prev.push(cur.id);
                            return prev;
                        }, []);
                        let forceFinish = false;
                        const controlsThatFit = [...this._defaultVisibleToolSizeInfos].reduce((prev, cur) => {
                            if (!forceFinish && skipControls.indexOf(cur.id) < 0 &&
                                (currentTools.indexOf(cur.id) > -1 || (controlsWidth + cur.width) <= toolbarWidth)) {
                                if (currentTools.indexOf(cur.id) < 0) {
                                    controlsWidth += cur.width;
                                }
                                prev.push(cur);
                            }
                            else if (skipControls.indexOf(cur.id) < 0 && (controlsWidth + cur.width) > toolbarWidth) {
                                // exit the first time we evalute this as true...otherwise it will add the next control that will fit
                                // and not preserve the overall order of controls
                                forceFinish = true;
                            }
                            return prev;
                        }, []);
                        this._setControlsThatFit(controlsThatFit, skipControls);
                    }
                }
            }, 5);
        }
    }
    /**
     * Validate if controls that fit the current display has changed or
     * is different from what is currently displayed
     */
    _setControlsThatFit(controlsThatFit, skipControls) {
        let update = JSON.stringify(controlsThatFit) !== JSON.stringify(this._controlsThatFit);
        const actionbar = document.getElementById("solutions-action-bar");
        actionbar.childNodes.forEach((n) => {
            if (skipControls.indexOf(n.id) < 0 && !update) {
                update = this._controlsThatFit.map(c => c.id).indexOf(n.id) < 0;
            }
        });
        if (update) {
            this._controlsThatFit = [...controlsThatFit];
        }
    }
    /**
     * Get the id and size for the toolbars current items
     */
    _setToolbarSizeInfos() {
        let hasWidth = false;
        this._toolbarSizeInfos = [];
        this._toolbar.childNodes.forEach((c, i) => {
            // handle the action bar
            if (i === 0) {
                c.childNodes.forEach((actionbarChild) => {
                    this._toolbarSizeInfos.push({
                        id: actionbarChild.id,
                        width: actionbarChild.offsetWidth
                    });
                    if (!hasWidth) {
                        hasWidth = actionbarChild.offsetWidth > 0;
                    }
                });
            }
            else if (!c.referenceElement) {
                // skip tooltips
                this._toolbarSizeInfos.push({
                    id: c.id,
                    width: c.offsetWidth
                });
                if (!hasWidth) {
                    hasWidth = c.offsetWidth > 0;
                }
            }
        });
        if (hasWidth && !this._defaultVisibleToolSizeInfos) {
            this._defaultVisibleToolSizeInfos = [...this._toolbarSizeInfos];
        }
    }
    /**
     * Get a list of toolInfos that should display outside of the dropdown
     *
     * @returns IToolInfo[] the list of toolInfos that should not display in the overflow dropdown
     */
    _getActionItems() {
        var _a;
        return (_a = this._toolInfos) === null || _a === void 0 ? void 0 : _a.filter(toolInfo => toolInfo && !toolInfo.isOverflow);
    }
    /**
     * Get a list of toolInfos that should display in the dropdown
     *
     * @param id string the id for the dropdown and its tooltip
     *
     * @returns VNode the dropdown node
     */
    _getDropdown(id) {
        const dropdownItems = this._getDropdownItems();
        return dropdownItems.length > 0 ? (h("calcite-dropdown", { closeOnSelectDisabled: true, disabled: this._layer === undefined, id: "solutions-more", onCalciteDropdownBeforeClose: () => this._forceShowHide(), ref: (el) => this._moreDropdown = el }, h("calcite-action", { appearance: "solid", id: id, label: "", onClick: () => this._closeShowHide(), slot: "trigger", text: "" }, h("calcite-button", { appearance: "transparent", iconEnd: "chevron-down", kind: "neutral" }, this._translations.more)), h("calcite-dropdown-group", { "selection-mode": "none" }, dropdownItems.map(item => {
            return (h("calcite-dropdown-group", { class: item.disabled ? "disabled" : "", selectionMode: item.disabled ? "none" : "single" }, h("calcite-dropdown-item", { iconStart: item.isSublist && this._showHideOpen ? "chevron-down" : item.icon, id: "solutions-subset-list", onClick: item.func }, item.label)));
        })), this._showHideOpen ? this._getFieldlist() : undefined)) : undefined;
    }
    /**
     * Get a list of toolInfos that should display in the dropdown
     *
     * @returns IToolInfo[] the list of toolInfos that should display in the dropdown
     */
    _getDropdownItems() {
        var _a;
        return (_a = this._toolInfos) === null || _a === void 0 ? void 0 : _a.filter(toolInfo => toolInfo && toolInfo.isOverflow);
    }
    /**
     * Get an action and tooltip
     *
     * @param icon string the name of the icon to display, will also be used as the id
     * @param label string the text to display and label the action
     * @param func any the function to execute
     * @param disabled boolean when true the user will not be able to interact with the action
     *
     * @returns VNode The node representing the DOM element that will contain the action
     */
    _getAction(active, icon, indicator, label, func, disabled, slot) {
        const _disabled = this._layer === undefined ? true : disabled;
        return (h("div", { class: "display-flex", id: this._getId(icon), slot: slot }, h("calcite-action", { active: active, appearance: "solid", disabled: _disabled, icon: icon, id: icon, indicator: indicator, label: label, onClick: func, text: label, textEnabled: true }), this._getToolTip("bottom", icon, label)));
    }
    /**
     * Get an action and tooltip for share
     *
     * @param icon string the name of the icon to display, will also be used in its id
     *
     * @returns VNode The node representing the DOM element that will contain the action
     */
    _getShare(icon) {
        return (h("div", { class: "share-action", id: this._getId(icon) }, h("instant-apps-social-share", { autoUpdateShareUrl: false, class: "instant-app-share", embed: this.shareIncludeEmbed, popoverButtonIconScale: "s", ref: el => this._shareNode = el, scale: "m", shareButtonColor: "neutral", shareButtonType: "action", socialMedia: this.shareIncludeSocial, view: this.mapView }), this._getToolTip("bottom", icon, this._translations.share)));
    }
    /**
     * Called each time the values that are used for custom url params change
     */
    _updateShareUrl() {
        var _a, _b, _c, _d;
        const url = (_a = this._shareNode) === null || _a === void 0 ? void 0 : _a.shareUrl;
        if (!url) {
            return;
        }
        const urlObj = new URL(url);
        //set the additional search params
        if ((_b = this.mapInfo) === null || _b === void 0 ? void 0 : _b.id) {
            urlObj.searchParams.set("webmap", this.mapInfo.id);
        }
        else {
            urlObj.searchParams.delete("webmap");
        }
        if ((_c = this._layer) === null || _c === void 0 ? void 0 : _c.id) {
            urlObj.searchParams.set("layer", this._layer.id);
        }
        else {
            urlObj.searchParams.delete("layer");
        }
        if (((_d = this.selectedIds) === null || _d === void 0 ? void 0 : _d.length) > 0) {
            urlObj.searchParams.set("oid", this.selectedIds.join(","));
        }
        else {
            urlObj.searchParams.delete("oid");
        }
        if (this._filterActive) {
            const filter = JSON.parse(this._filterList.urlParams.get("filter"));
            const layerExpressions = this._filterList.layerExpressions.map(layerExp => {
                layerExp.expressions = layerExp.expressions.map(exp => {
                    if (exp.id.toString() === filter.expressionId.toString()) {
                        exp.active = true;
                    }
                    return exp;
                });
                return layerExp;
            });
            urlObj.searchParams.set("filter", JSON.stringify(layerExpressions));
        }
        else {
            urlObj.searchParams.delete("filter");
        }
        this._shareNode.shareUrl = urlObj.href;
    }
    /**
     * Get a tooltip
     *
     * @param label string accessible name for the component
     * @param placement string where the tooltip should display
     * @param referenceElement string the element the tooltip will be associated with
     * @param text string the text to display in the tooltip
     *
     * @returns VNode The tooltip node
     */
    _getToolTip(placement, referenceElement, text) {
        return (h("calcite-tooltip", { placement: placement, "reference-element": referenceElement }, h("span", null, text)));
    }
    /**
     * Get an id with a prefix to the user supplied value
     *
     * @param id the unique value for the id
     *
     * @returns the new id with the prefix value
     */
    _getId(id) {
        return `solutions-action-${id}`;
    }
    /**
     * Get an action with danger color icon and text
     *
     * @param icon string the name of the icon to display, will also be used as the id
     * @param label string the text to display and label the action
     * @param func any the function to execute
     * @param disabled boolean when true the user will not be able to interact with the action
     *
     * @returns VNode The node representing the DOM element that will contain the action
     */
    _getDangerAction(icon, label, func, disabled) {
        const _disabled = this._layer === undefined ? true : disabled;
        return (h("div", { class: "display-flex", id: this._getId(icon) }, icon === "trash" ? (h("delete-button", { buttonType: "action", class: "display-flex", disabled: _disabled, icon: icon, ids: this._getIds(), layer: this._layer })) : (h("calcite-action", { appearance: "solid", disabled: _disabled, id: icon, onClick: func, text: "" }, h("calcite-button", { appearance: "transparent", iconStart: icon, kind: "danger" }, label))), this._getToolTip("bottom", icon, label)));
    }
    /**
     * Return all currently selected IDs from the table
     *
     * @param number[] the selected ids
     */
    _getIds() {
        return this._table.highlightIds.toArray();
    }
    /**
     * Initialize the FeatureTable
     *
     * @param node HTMLDivElement The node representing the DOM element that will contain the widget.
     */
    async _getTable(node, columnTemplates) {
        if (this._layer) {
            await this._layer.when(() => {
                this._table = new this.FeatureTable({
                    autoRefreshEnabled: this.enableAutoRefresh,
                    layer: this._layer,
                    view: this.mapView,
                    columnReorderingEnabled: this.enableColumnReorder,
                    editingEnabled: this._editEnabled && this.enableInlineEdit,
                    highlightEnabled: true,
                    multiSortEnabled: false,
                    visibleElements: {
                        header: false,
                        menu: false
                    },
                    tableTemplate: {
                        columnTemplates
                    },
                    container: node
                });
            });
            this._initColumnsInfo();
            this._checkEditEnabled();
            await this._table.when(() => {
                this._table.highlightIds.on("change", (evt) => {
                    void this._handleOnChange(evt);
                });
                this.reactiveUtils.watch(() => this._table.activeSortOrders, (sortOrders) => {
                    var _a, _b, _c, _d;
                    this._sortActive = this._layer ? (sortOrders.length > 0 && ((_a = sortOrders[0]) === null || _a === void 0 ? void 0 : _a.direction) === "asc" || ((_b = sortOrders[0]) === null || _b === void 0 ? void 0 : _b.direction) === "desc") ||
                        ((_c = sortOrders[0]) === null || _c === void 0 ? void 0 : _c.direction) === null && ((_d = sortOrders[0]) === null || _d === void 0 ? void 0 : _d.fieldName) === this._layer.objectIdField : false;
                });
            });
        }
    }
    async _handleOnChange(evt) {
        const ids = [...this._table.highlightIds.toArray()];
        if (!this._skipOnChange) {
            if (!this._ctrlIsPressed && !this._shiftIsPressed) {
                if (this.selectedIds.length > 0) {
                    this._skipOnChange = true;
                    // only readd in specific case where we have multiple selected and then click one of the currently selected
                    const reAdd = this.selectedIds.length > 1 && evt.removed.length === 1;
                    const newIds = reAdd ? evt.removed : ids.filter(id => this.selectedIds.indexOf(id) < 0);
                    this._clearSelection();
                    this.selectedIds = [...newIds];
                    if (newIds.length > 0) {
                        this._table.highlightIds.add(newIds[0]);
                    }
                    else {
                        this._skipOnChange = false;
                    }
                }
                else {
                    // https://github.com/Esri/solutions-components/issues/365
                    this.selectedIds = ids.reverse();
                }
            }
            else if (this._ctrlIsPressed) {
                this.selectedIds = ids.reverse();
            }
            else if (this._shiftIsPressed) {
                this._skipOnChange = true;
                this._previousCurrentId = this._currentId;
                this._currentId = [...this._table.highlightIds.toArray()].reverse()[0];
                if (this._previousCurrentId !== this._currentId) {
                    // query the layer based on current sort and filters then grab between the current id and previous id
                    const orderBy = this._table.activeSortOrders.reduce((prev, cur) => {
                        prev.push(`${cur.fieldName} ${cur.direction}`);
                        return prev;
                    }, []);
                    const oids = await queryFeatureIds(this._layer, this._layer.definitionExpression, orderBy);
                    let isBetween = false;
                    const _start = this._table.viewModel.getObjectIdIndex(this._previousCurrentId);
                    const _end = this._table.viewModel.getObjectIdIndex(this._currentId);
                    const startIndex = _start < _end ? _start : _end;
                    const endIndex = _end > _start ? _end : _start;
                    this._skipOnChange = startIndex + 1 !== endIndex;
                    const selectedIds = oids.reduce((prev, cur) => {
                        const id = cur;
                        const index = this._table.viewModel.getObjectIdIndex(id);
                        if ((id === this._currentId || id === this._previousCurrentId)) {
                            isBetween = !isBetween;
                            if (prev.indexOf(id) < 0) {
                                prev.push(id);
                            }
                        }
                        // The oids are sorted so after we have reached the start or end oid add all ids even if the index is -1.
                        // Index of -1 will occur for features between the start and and oid if
                        // you select a row then scroll faster than the FeatureTable loads the data to select the next id
                        if (isBetween && prev.indexOf(id) < 0) {
                            prev.push(id);
                        }
                        // Also add index based check.
                        // In some cases the FeatureTable and Layer query will have differences in how null/undefined field values are sorted
                        if ((this.selectedIds.indexOf(id) > -1 || (index >= startIndex && index <= endIndex)) && prev.indexOf(id) < 0 && index > -1) {
                            prev.push(id);
                        }
                        return prev;
                    }, []);
                    this.selectedIds = _start < _end ? selectedIds.reverse() : selectedIds;
                    this._table.highlightIds.addMany(this.selectedIds.filter(i => ids.indexOf(i) < 0));
                }
            }
            this._finishOnChange();
        }
        else {
            this._skipOnChange = false;
        }
        this._currentId = [...this._table.highlightIds.toArray()].reverse()[0];
    }
    /**
     * Handle any updates after a selection change has occured and emit the results
     */
    _finishOnChange() {
        if (this._showOnlySelected) {
            if (this._featuresSelected()) {
                this._table.filterBySelection();
            }
            else {
                this._toggleShowSelected();
            }
        }
        this.featureSelectionChange.emit(this.selectedIds);
    }
    /**
     * Reset the tables column templates when we get new column config
     */
    _resetColumnTemplates() {
        var _a, _b;
        const columnTemplates = this._getColumnTemplates((_a = this._layer) === null || _a === void 0 ? void 0 : _a.id, (_b = this._layer) === null || _b === void 0 ? void 0 : _b.fields);
        if (this._table && columnTemplates) {
            this._table.tableTemplate = new this.TableTemplate({
                columnTemplates
            });
            const fieldNames = columnTemplates.map(f => f.fieldName);
            this._initColumnsInfo(fieldNames);
        }
    }
    /**
     * Reset basic table props
     */
    async _resetTable() {
        var _a;
        this._clearSelection();
        this._allIds = [];
        this.featureSelectionChange.emit(this.selectedIds);
        const columnTemplates = this._getColumnTemplates(this._layer.id, (_a = this._layer) === null || _a === void 0 ? void 0 : _a.fields);
        this._allIds = await queryAllIds(this._layer);
        if (!this._table) {
            await this._getTable(this._tableNode, columnTemplates);
        }
        else if (columnTemplates) {
            this._table.tableTemplate.columnTemplates = columnTemplates;
        }
        this._table.layer = this._layer;
        this._table.view = this.mapView;
        this._checkEditEnabled();
        this._table.editingEnabled = this._editEnabled && this.enableInlineEdit;
        this._initToolInfos();
        await this._table.when(async () => {
            var _a, _b;
            this._table.highlightIds.removeAll();
            this._table.clearSelectionFilter();
            this._initColumnsInfo();
            if (!this._defaultOidHonored && ((_a = this.defaultOid) === null || _a === void 0 ? void 0 : _a.length) > 0 && this.defaultOid[0] > -1) {
                this._selectDefaultFeature(this.defaultOid);
                this._defaultOidHonored = true;
            }
            if (!this._defaultGlobalIdHonored && ((_b = this.defaultGlobalId) === null || _b === void 0 ? void 0 : _b.length) > 0) {
                const features = await queryFeaturesByGlobalID(this.defaultGlobalId, this._layer);
                const oids = (features === null || features === void 0 ? void 0 : features.length) > 0 ? features.map(f => f.getObjectId()) : undefined;
                if (oids) {
                    this._selectDefaultFeature(oids);
                }
                this._defaultGlobalIdHonored = true;
            }
            if (!this._defaultFilterHonored && this.defaultFilter && this._filterList) {
                this._layerExpressions = this.defaultFilter;
                this._filterActive = true;
                this._defaultFilterHonored = true;
            }
        });
        this._showOnlySelected = false;
        this._sortActive = false;
        await this._sortTable();
    }
    /**
     * Store the column names and current hidden status to support show/hide of columns
     * @param fieldNames optional list of names from new config options
     */
    _initColumnsInfo(fieldNames) {
        var _a, _b;
        // this._table.columns is not reflecting correct list when new
        // tableTemplate.columnTemplates have been defined on an existing FeatureTable
        // TODO review for better solution post 2024 R01 release
        const columnsInfo = (_a = this._table) === null || _a === void 0 ? void 0 : _a.columns.reduce((prev, cur) => {
            if (!fieldNames || ((fieldNames === null || fieldNames === void 0 ? void 0 : fieldNames.indexOf(cur.name)) > -1)) {
                prev[cur.name] = !cur.hidden;
            }
            return prev;
        }, {});
        const oldColumnNames = (_b = this._table) === null || _b === void 0 ? void 0 : _b.columns.map((c) => c.name);
        const newColumnNames = fieldNames ? fieldNames.filter(n => oldColumnNames.indexOf(n) < 0) : [];
        newColumnNames.forEach(c => {
            columnsInfo[c] = true;
        });
        this._columnsInfo = fieldNames ? fieldNames.reduce((prev, cur) => {
            prev[cur] = columnsInfo[cur];
            return prev;
        }, {}) : columnsInfo;
    }
    /**
     * Select the feature that was specified via url params
     */
    _selectDefaultFeature(oids) {
        if (oids.length > 0) {
            this._table.highlightIds.addMany(oids);
            void this._table.when(() => {
                const i = this._table.viewModel.getObjectIdIndex(oids[0]);
                this._table.viewModel.scrollToIndex(i);
            });
        }
    }
    /**
     * Verify edit capabilities of the layer
     */
    _checkEditEnabled() {
        this._editEnabled = this._layer.editingEnabled && this._layer.capabilities.operations.supportsUpdate;
        this._deleteEnabled = this._layer.editingEnabled && this._layer.capabilities.operations.supportsDelete;
    }
    /**
     * Sort the objectid field in descending order
     */
    async _sortTable() {
        if (this._table && this._layer && !this._sortActive) {
            if (!this._tableSorting && this.showNewestFirst) {
                this._tableSorting = true;
                await this._table.when();
                await this._layer.when(() => {
                    this._table.sortColumn(this._layer.objectIdField, "desc");
                    this._tableSorting = false;
                });
            }
        }
    }
    /**
     * Open show/hide dropdown
     */
    _forceShowHide() {
        if (this._showHideDropdown) {
            this._showHideDropdown.open = this._showHideOpen;
        }
        if (this._moreDropdown) {
            this._moreDropdown.open = this._showHideOpen;
        }
    }
    /**
     * Toggle show/hide dropdown
     */
    _toggleShowHide() {
        this._showHideOpen = !this._showHideOpen;
    }
    /**
     * Open show/hide dropdown
     */
    _closeShowHide() {
        this._showHideOpen = false;
    }
    /**
     * Close show/hide dropdown when the user clicks outside of it
     */
    _handleDocumentClick(e) {
        var _a;
        const id = (_a = e.target) === null || _a === void 0 ? void 0 : _a.id;
        if (this._showHideOpen && Object.keys(this._columnsInfo).indexOf(id) < 0 && id !== "solutions-subset-list" && id !== "chevron-right") {
            this._closeShowHide();
            if (this._moreDropdown) {
                this._moreDropdown.open = false;
            }
            if (this._showHideDropdown) {
                this._showHideDropdown.open = false;
            }
        }
    }
    /**
     * Keep track of key down for ctrl and shift
     */
    _handleKeyDown(e) {
        this._ctrlIsPressed = e.ctrlKey;
        this._shiftIsPressed = e.shiftKey;
    }
    /**
     * Keep track of key up for ctrl and shift
     */
    _handleKeyUp(e) {
        this._ctrlIsPressed = e.ctrlKey;
        this._shiftIsPressed = e.shiftKey;
    }
    /**
     * Show filter component in modal
     *
     * @returns node to interact with any configured filters for the current layer
     */
    _filterModal() {
        var _a, _b, _c;
        return (h("calcite-modal", { "aria-labelledby": "modal-title", class: "modal", kind: "brand", onCalciteModalClose: () => void this._closeFilter(), open: this._filterOpen, widthScale: "s" }, h("div", { class: "display-flex align-center", id: "modal-title", slot: "header" }, (_b = (_a = this._translations) === null || _a === void 0 ? void 0 : _a.filter) === null || _b === void 0 ? void 0 : _b.replace("{{title}}", (_c = this._layer) === null || _c === void 0 ? void 0 : _c.title)), h("div", { slot: "content" }, h("instant-apps-filter-list", { autoUpdateUrl: false, closeBtn: true, closeBtnOnClick: async () => this._closeFilter(), layerExpressions: this._layerExpressions, onFilterListReset: () => this._handleFilterListReset(), onFilterUpdate: () => this._handleFilterUpdate(), ref: (el) => this._filterList = el, view: this.mapView, zoomBtn: false }))));
    }
    /**
     * Reset the filter active prop
     */
    _handleFilterListReset() {
        this._filterActive = false;
        this._updateShareUrl();
    }
    /**
     * Check if the layers definitionExpression has been modified
     */
    _handleFilterUpdate() {
        this._filterActive = this._definitionExpression !== this._layer.definitionExpression;
        this._updateShareUrl();
    }
    /**
     * Close the filter modal
     */
    async _closeFilter() {
        if (this._filterOpen) {
            // reset allIds
            this._allIds = await queryAllIds(this._layer);
            this._filterOpen = false;
        }
    }
    /**
     * Handle map click events to keep table and map click selection in sync
     *
     * @param evt IMapClick map click event details
     */
    async _mapClicked(evt) {
        const opts = {
            include: this._layer
        };
        const hitTestResult = await this.mapView.hitTest(evt.screenPoint, opts);
        if (hitTestResult.results.length > 0) {
            hitTestResult.results.forEach((result) => {
                this._clearSelection();
                const id = result.graphic.getObjectId();
                const index = this._table.highlightIds.indexOf(id);
                if (index > -1) {
                    this._table.highlightIds.removeAt(index);
                }
                else {
                    this._table.highlightIds.add(id);
                }
            });
            if (this._showOnlySelected) {
                this._table.filterBySelection();
            }
        }
    }
    /**
     * Select or deselect all rows
     */
    _selectAll() {
        const ids = this._allIds;
        this._table.highlightIds.removeAll();
        this._skipOnChange = true;
        this._table.highlightIds.addMany(ids);
        this.selectedIds = ids;
        this._finishOnChange();
        this._selectAllActive = true;
    }
    /**
     * Toggle the show only selected flag
     *  When showOnly is true only the selected features will be shown in the table
     */
    _toggleShowSelected() {
        this._showOnlySelected = !this._showOnlySelected;
        if (this._showOnlySelected) {
            this._table.filterBySelection();
        }
        else {
            this._table.clearSelectionFilter();
        }
    }
    /**
     * Clears the selected indexes
     */
    _clearSelection() {
        var _a;
        this.selectedIds = [];
        (_a = this._table) === null || _a === void 0 ? void 0 : _a.highlightIds.removeAll();
        this._finishOnChange();
    }
    /**
     * When true the filter modal will be displayed
     */
    _toggleFilter() {
        this._filterOpen = !this._filterOpen;
    }
    /**
     * Store any filters for the current layer.
     * Should only occur on layer change
     */
    _initLayerExpressions() {
        var _a, _b;
        const layerExpressions = (_b = (_a = this.mapInfo) === null || _a === void 0 ? void 0 : _a.filterConfig) === null || _b === void 0 ? void 0 : _b.layerExpressions;
        this._layerExpressions = layerExpressions ? layerExpressions.filter((exp) => { var _a; return exp.id === ((_a = this._layer) === null || _a === void 0 ? void 0 : _a.id); }) : [];
        this._filterList.layerExpressions = this._layerExpressions;
        this._filterActive = false;
    }
    /**
     * Select all rows that are not currently selectd
     */
    _switchSelected() {
        const currentIndexes = [...this.selectedIds];
        this._table.highlightIds.removeAll();
        const ids = this._allIds.reduce((prev, _cur) => {
            if (currentIndexes.indexOf(_cur) < 0) {
                prev.push(_cur);
            }
            return prev;
        }, []).sort((a, b) => a - b);
        this._skipOnChange = true;
        this._table.highlightIds.addMany(ids);
        this.selectedIds = ids;
        this._finishOnChange();
    }
    /**
     * Export all selected rows as CSV
     *
     * @returns a promise that will resolve when the operation is complete
     */
    async _exportToCSV() {
        const exportInfos = {};
        const ids = this._table.highlightIds.toArray();
        exportInfos[this._layer.id] = {
            selectionSetNames: [this._layer.title],
            ids,
            layer: this._layer
        };
        const fields = this._table.columns.toArray().reduce((prev, cur) => {
            if (!cur.hidden) {
                prev.push(cur.name.toLocaleLowerCase());
            }
            return prev;
        }, []);
        void downloadCSV(null, //???
        exportInfos, false, // formatUsingLayerPopup
        false, // removeDuplicates
        true, // addColumnTitle
        fields, true);
    }
    /**
     * Refreshes the table and maintains the curent scroll position
     */
    async _refresh() {
        await this._table.refresh();
        this.featureSelectionChange.emit(this.selectedIds);
    }
    /**
     * Zoom to all selected features
     *
     * @returns a promise that will resolve when the operation is complete
     */
    _zoom() {
        this._table.zoomToSelection();
    }
    /**
     * Handles layer selection change to show new table
     *
     * @param evt CustomEvent the id for the current layer
     *
     * @returns a promise that will resolve when the operation is complete
     */
    async _layerSelectionChanged(evt) {
        var _a;
        const id = evt.detail[0];
        if (id !== ((_a = this._layer) === null || _a === void 0 ? void 0 : _a.id) || this._featuresEmpty()) {
            this._fetchingData = true;
            const layer = await getLayerOrTable(this.mapView, id);
            await layer.when(() => {
                this._layer = layer;
            });
        }
        this._fetchingData = false;
    }
    /**
     * Get any columnt templates for the current map
     *
     * @param id item ID of the current map
     *
     * @returns a list of column templates if they exist
     */
    _getColumnTemplates(id, fieldInfos) {
        var _a, _b;
        let layerOption;
        (_b = (_a = this.mapInfo) === null || _a === void 0 ? void 0 : _a.layerOptions) === null || _b === void 0 ? void 0 : _b.layers.some(l => {
            if (l.id === id) {
                layerOption = l;
                return true;
            }
        });
        const fieldOrder = (layerOption === null || layerOption === void 0 ? void 0 : layerOption.fields) && (layerOption === null || layerOption === void 0 ? void 0 : layerOption.fieldOrder) ?
            layerOption.fieldOrder.filter(f => layerOption.fields.indexOf(f) > -1) :
            undefined;
        let columnTemplates;
        if (fieldInfos) {
            columnTemplates = layerOption && (layerOption === null || layerOption === void 0 ? void 0 : layerOption.fields)
                ? fieldInfos.reduce((prev, cur) => {
                    if (layerOption.fields.indexOf(cur.name) > -1) {
                        const template = {
                            type: "field",
                            fieldName: cur.name,
                            label: cur.alias,
                            menuConfig: this._getMenuConfig(cur.name)
                        };
                        prev.push(template);
                    }
                    return prev;
                }, []).sort(this._sortFields.bind(this, layerOption === null || layerOption === void 0 ? void 0 : layerOption.fieldOrder))
                : fieldInfos.map(fieldInfo => {
                    return {
                        type: "field",
                        fieldName: fieldInfo.name,
                        label: fieldInfo.alias,
                        menuConfig: this._getMenuConfig(fieldInfo.name)
                    };
                });
        }
        return fieldOrder ?
            columnTemplates === null || columnTemplates === void 0 ? void 0 : columnTemplates.sort(this._sortFields.bind(this, fieldOrder)) :
            columnTemplates;
    }
    _sortFields(sorter, a, b) {
        return (sorter === null || sorter === void 0 ? void 0 : sorter.indexOf(a.fieldName)) - sorter.indexOf(b.fieldName);
    }
    /**
     * Get the menu config that adds the ability to hide the current column
     */
    _getMenuConfig(name) {
        return {
            items: [
                {
                    label: this._translations.hideField,
                    iconClass: "esri-icon-non-visible",
                    autoCloseMenu: true,
                    clickFunction: () => {
                        this._handleHideClick(name);
                    }
                }
            ]
        };
    }
    /**
     * Hide the table column for the provided name
     */
    _handleHideClick(name) {
        this._columnsInfo[name] = false;
        this._table.hideColumn(name);
        this._table.tableTemplate.columnTemplates.forEach((columnTemplate) => {
            if (columnTemplate.fieldName === name) {
                columnTemplate.visible = false;
            }
        });
    }
    /**
     * Fetches the component's translations
     *
     * @returns Promise when complete
     * @protected
     */
    async _getTranslations() {
        const messages = await getLocaleComponentStrings(this.el);
        this._translations = messages[0];
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "enableCSV": ["enableCSVWatchHandler"],
        "enableInlineEdit": ["enableInlineEditWatchHandler"],
        "_controlsThatFit": ["_controlsThatFitWatchHandler"],
        "isMobile": ["isMobileWatchHandler"],
        "mapInfo": ["mapInfoWatchHandler"],
        "mapView": ["mapViewWatchHandler"],
        "_layer": ["_layerWatchHandler"],
        "selectedIds": ["selectedIdsWatchHandler"],
        "_sortActive": ["_sortActiveWatchHandler"]
    }; }
};
LayerTable.style = layerTableCss;

const mapCardCss = ":host{display:block;--calcite-label-margin-bottom:0;--calcite-block-padding:0}.map-height{height:calc(100% - 51px)}.height-full{height:100%}.box-shadow{box-shadow:none !important}.visibility-hidden-1{visibility:hidden;height:1px;}.display-none{display:none}";

const MapCard = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.mapChanged = createEvent(this, "mapChanged", 7);
        this.beforeMapChanged = createEvent(this, "beforeMapChanged", 7);
        /**
         * boolean: When true the default map provided via url params has been loaded and should no longer override other maps
         */
        this._defaultWebmapHonored = false;
        /**
         * string: the id of map currently displayed
         */
        this._loadedId = "";
        this.defaultWebmapId = "";
        this.enableHome = undefined;
        this.enableLegend = undefined;
        this.enableFloorFilter = undefined;
        this.enableFullscreen = undefined;
        this.enableSingleExpand = true;
        this.enableSearch = undefined;
        this.enableBasemap = undefined;
        this.basemapConfig = undefined;
        this.hidden = undefined;
        this.homeZoomIndex = 3;
        this.homeZoomPosition = "top-left";
        this.homeZoomToolsSize = "m";
        this.mapInfos = [];
        this.mapWidgetsIndex = 0;
        this.mapWidgetsPosition = "top-right";
        this.mapWidgetsSize = "m";
        this.mapView = undefined;
        this.stackTools = true;
        this.theme = undefined;
        this.toolOrder = undefined;
        this._searchConfiguration = undefined;
        this._webMapInfo = undefined;
    }
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    /**
     * Add/remove home widget
     */
    enableHomeWatchHandler() {
        this._initHome();
    }
    /**
     * Listen for changes to map info and load the appropriate map
     */
    async mapInfoChange(evt) {
        await this._loadMap(evt.detail);
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (lifecycle)
    //
    //--------------------------------------------------------------------------
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     */
    async componentWillLoad() {
        await this._initModules();
    }
    /**
     * Renders the component.
     */
    render() {
        var _a, _b;
        const mapClass = this.hidden ? "visibility-hidden-1" : "";
        const themeClass = this.theme === "dark" ? "calcite-mode-dark" : "calcite-mode-light";
        const mapPickerClass = ((_a = this.mapInfos) === null || _a === void 0 ? void 0 : _a.length) > 1 ? "" : "display-none";
        const mapHeightClass = ((_b = this.mapInfos) === null || _b === void 0 ? void 0 : _b.length) > 1 ? "map-height" : "height-full";
        return (h(Host, null, h("map-picker", { class: mapPickerClass, mapInfos: this.mapInfos, ref: (el) => this._mapPicker = el }), h("div", { class: `${mapHeightClass} ${mapClass}`, ref: (el) => (this._mapDiv = el) }), h("map-tools", { basemapConfig: this.basemapConfig, class: `box-shadow ${themeClass}`, enableBasemap: this.enableBasemap, enableFloorFilter: this.enableFloorFilter, enableFullscreen: this.enableFullscreen, enableHome: this.enableHome, enableLegend: this.enableLegend, enableSearch: this.enableSearch, enableSingleExpand: this.enableSingleExpand, homeZoomToolsSize: this.homeZoomToolsSize, mapView: this.mapView, mapWidgetsSize: this.mapWidgetsSize, position: this.mapWidgetsPosition, ref: (el) => this._mapTools = el, searchConfiguration: this._searchConfiguration, stackTools: this.stackTools, toolOrder: this.toolOrder })));
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
        const [WebMap, MapView, Home] = await loadModules([
            "esri/WebMap",
            "esri/views/MapView",
            "esri/widgets/Home"
        ]);
        this.WebMap = WebMap;
        this.MapView = MapView;
        this.Home = Home;
    }
    /**
     * Load the webmap for the provided webMapInfo
     *
     * @param webMapInfo the webmap id and name to load
     */
    async _loadMap(webMapInfo) {
        var _a;
        // on the first render use the default webmap id if provided otherwise use the first child of the provided mapInfos
        const loadDefaultMap = !this._defaultWebmapHonored && this.defaultWebmapId;
        const defaultMap = (_a = this.mapInfos) === null || _a === void 0 ? void 0 : _a.filter(i => i.id === this.defaultWebmapId);
        const mapConfigChanged = JSON.stringify(webMapInfo) !== JSON.stringify(this._webMapInfo);
        this._webMapInfo = loadDefaultMap && defaultMap ? defaultMap[0] :
            !(webMapInfo === null || webMapInfo === void 0 ? void 0 : webMapInfo.id) && this.mapInfos.length > 0 ? this.mapInfos[0] : webMapInfo;
        const id = this._webMapInfo.id;
        const isDefaultMap = loadDefaultMap && (webMapInfo === null || webMapInfo === void 0 ? void 0 : webMapInfo.id) === this.defaultWebmapId;
        if ((this._loadedId !== id && !loadDefaultMap) || isDefaultMap) {
            const webMap = new this.WebMap({
                portalItem: { id }
            });
            this.mapView = new this.MapView({
                container: this._mapDiv,
                map: webMap,
                resizeAlign: "center"
            });
            this._loadedId = id;
            this._searchConfiguration = this._webMapInfo.searchConfiguration;
            this.beforeMapChanged.emit();
            await this.mapView.when(() => {
                this._initHome();
                this.mapView.ui.add(this._mapTools, { position: this.mapWidgetsPosition, index: this.mapWidgetsIndex });
                this._defaultWebmapHonored = isDefaultMap ? true : this._defaultWebmapHonored;
                this.mapChanged.emit({
                    id: id,
                    mapView: this.mapView
                });
            });
        }
        else if (loadDefaultMap) {
            this._defaultWebmapHonored = true;
            this._mapPicker.setMapByID(id);
        }
        else if (mapConfigChanged) {
            // Map is the same so no need to reload but we need to update for any changes from the config
            this._searchConfiguration = this._webMapInfo.searchConfiguration;
            this.beforeMapChanged.emit();
            this.mapChanged.emit({
                id: id,
                mapView: this.mapView
            });
        }
    }
    /**
     * Add/remove the home widget base on enableHome prop
     *
     * @protected
     */
    _initHome() {
        if (this.enableHome) {
            this._homeWidget = new this.Home({
                view: this.mapView
            });
            this.mapView.ui.add(this._homeWidget, { position: this.homeZoomPosition, index: this.homeZoomIndex });
            const size = this.homeZoomToolsSize === "s" ? "32px" : this.homeZoomToolsSize === "m" ? "40px" : "48px";
            this._homeWidget.domNode.style.height = size;
            this._homeWidget.domNode.style.width = size;
        }
        else if (this._homeWidget) {
            this.mapView.ui.remove(this._homeWidget);
        }
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "enableHome": ["enableHomeWatchHandler"]
    }; }
};
MapCard.style = mapCardCss;

export { CardManager as card_manager, LayerTable as layer_table, MapCard as map_card };
