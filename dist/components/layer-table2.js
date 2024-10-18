/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { l as loadModules } from './loadModules.js';
import { g as getLocaleComponentStrings } from './locale.js';
import { b as goToSelection, c as getFeatureLayerView, g as getLayerOrTable } from './mapViewUtils.js';
import { b as queryAllIds, c as queryAllOidsWithQueryFeatures, d as queryFeaturesByGlobalID } from './queryUtils.js';
import { d as downloadCSV } from './downloadUtils.js';
import { d as defineCustomElement$F } from './action.js';
import { d as defineCustomElement$E } from './action-bar.js';
import { d as defineCustomElement$D } from './action-group.js';
import { d as defineCustomElement$C } from './action-menu.js';
import { d as defineCustomElement$B } from './block.js';
import { d as defineCustomElement$A } from './button.js';
import { d as defineCustomElement$z } from './checkbox.js';
import { d as defineCustomElement$y } from './chip.js';
import { d as defineCustomElement$x } from './combobox.js';
import { d as defineCustomElement$w } from './combobox-item.js';
import { d as defineCustomElement$v } from './date-picker.js';
import { d as defineCustomElement$u } from './date-picker-day.js';
import { d as defineCustomElement$t } from './date-picker-month.js';
import { d as defineCustomElement$s } from './date-picker-month-header.js';
import { d as defineCustomElement$r } from './dropdown.js';
import { d as defineCustomElement$q } from './dropdown-group.js';
import { d as defineCustomElement$p } from './dropdown-item.js';
import { d as defineCustomElement$o } from './graph.js';
import { d as defineCustomElement$n } from './handle.js';
import { d as defineCustomElement$m } from './icon.js';
import { d as defineCustomElement$l } from './input.js';
import { d as defineCustomElement$k } from './input-date-picker.js';
import { d as defineCustomElement$j } from './input-text.js';
import { d as defineCustomElement$i } from './label2.js';
import { d as defineCustomElement$h } from './loader.js';
import { d as defineCustomElement$g } from './modal.js';
import { d as defineCustomElement$f } from './notice.js';
import { d as defineCustomElement$e } from './option.js';
import { d as defineCustomElement$d } from './panel.js';
import { d as defineCustomElement$c } from './popover.js';
import { d as defineCustomElement$b } from './progress.js';
import { d as defineCustomElement$a } from './scrim.js';
import { d as defineCustomElement$9 } from './select.js';
import { d as defineCustomElement$8 } from './shell.js';
import { d as defineCustomElement$7 } from './slider.js';
import { d as defineCustomElement$6 } from './tooltip.js';
import { d as defineCustomElement$5 } from './delete-button2.js';
import { d as defineCustomElement$4 } from './delete-dialog2.js';
import { d as defineCustomElement$3 } from './instant-apps-filter-list2.js';
import { d as defineCustomElement$2 } from './instant-apps-social-share2.js';
import { d as defineCustomElement$1 } from './map-layer-picker2.js';

const layerTableCss = ":host{display:block}.height-full{height:100%}.height-full-adjusted{height:calc(100% - 20px)}.width-full{width:100%}.display-flex{display:flex}.table-border{border:1px solid var(--calcite-color-border-2)}.border-end{border-inline-end:1px solid var(--calcite-color-border-2)}.border-bottom{border-bottom:1px solid var(--calcite-color-border-2)}.padding-5{padding:5px}.padding-end-1{padding-inline-end:1rem}.height-51-px{height:51px}.height-50-px{height:50px}.bottom-left{position:absolute;left:0;bottom:0;padding-left:5px}html[dir=\"rtl\"] .bottom-left{position:absolute;right:0;bottom:0;padding-right:5px}.height-19{height:19px}.background{background-color:var(--calcite-color-background)}.text-color{color:var(--calcite-color-text-1)}.align-center{align-items:center}.danger-color{color:var(--calcite-color-status-danger)}.esri-feature-table vaadin-grid{border:none !important}vaadin-grid-cell-content{font-size:14px !important;color:var(--calcite-color-text-3) !important}.share-action{position:absolute;right:0}html[dir=\"rtl\"] .share-action{left:0}.disabled{cursor:default !important;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled);pointer-events:none}.instant-app-share{height:50px !important;display:inline-flex}.border-top{border-top:1px solid var(--calcite-color-border-2)}.modal{--calcite-modal-content-padding:0}.esri-feature-table__table-container{height:100%}.search-container{background-color:var(--calcite-color-foreground-1) !important}.search{--calcite-color-border-input:var(--calcite-color-border-3);width:60%;padding:10px}.delete-red{--calcite-icon-color:var(--calcite-color-status-danger);--calcite-color-text-1:var(--calcite-color-status-danger);--calcite-color-text-3:var(--calcite-color-status-danger)}";
const LayerTableStyle0 = layerTableCss;

const LayerTable = /*@__PURE__*/ proxyCustomElement(class LayerTable extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.featureSelectionChange = createEvent(this, "featureSelectionChange", 7);
        this.toggleFilter = createEvent(this, "toggleFilter", 7);
        this.appLayout = undefined;
        this.defaultGlobalId = undefined;
        this.defaultLayerId = undefined;
        this.defaultOid = undefined;
        this.enableAutoRefresh = undefined;
        this.enableColumnReorder = true;
        this.enableCSV = undefined;
        this.enableInlineEdit = undefined;
        this.enableShare = undefined;
        this.isMobile = undefined;
        this.mapHidden = undefined;
        this.mapInfo = undefined;
        this.mapView = undefined;
        this.onlyShowUpdatableLayers = undefined;
        this.selectedIds = [];
        this.shareIncludeEmbed = undefined;
        this.shareIncludeSocial = undefined;
        this.showNewestFirst = undefined;
        this.zoomAndScrollToSelected = undefined;
        this.zoomToScale = undefined;
        this.createFilterModal = true;
        this._allIds = [];
        this._controlsThatFit = undefined;
        this._csvExporting = false;
        this._fetchingData = false;
        this._filterActive = false;
        this._filterOpen = false;
        this._layer = undefined;
        this._selectAllActive = false;
        this._deleteDialogOpen = false;
        this._showHideOpen = false;
        this._showOnlySelected = false;
        this._toolInfos = undefined;
        this._translations = undefined;
        this._fullTextSearchInfo = undefined;
        this._searchPlaceHolder = '';
        this._size = 0;
    }
    get el() { return this; }
    //--------------------------------------------------------------------------
    //
    //  Properties (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * esri/widgets/FeatureTable: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-FeatureTable.html
     */
    FeatureTable;
    /**
     * esri/widgets/FeatureTable/support/TableTemplate: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-FeatureTable-support-TableTemplate.html
     */
    TableTemplate;
    /**
     * IColumnsInfo: Key/value pair with fieldname/(visible in table)
     */
    _columnsInfo;
    /**
     * boolean: When true the ctrl key is currently pressed
     */
    _ctrlIsPressed = false;
    /**
     * number: The id of the most recently selected row from the table
     */
    _currentId;
    /**
     * boolean: When false alerts will be shown to indicate that the layer must have editing enabled for edit actions
     */
    _editEnabled;
    /**
     * boolean: When true the default filter provided via url param has been honored and should now be ignored
     */
    _defaultFilterHonored = false;
    /**
     * boolean: When true the default global id provided via url param has been honored and should now be ignored
     */
    _defaultGlobalIdHonored = false;
    /**
     * boolean: When true the default OID provided via url param has been honored and should now be ignored
     */
    _defaultOidHonored = false;
    /**
     * IToolSizeInfo[]: The default list of tool size info for tools that should display outside of the dropdown
     */
    _defaultVisibleToolSizeInfos;
    /**
     * string: The current layers definition expression
     */
    _definitionExpression;
    /**
     * boolean: When false alerts will be shown to indicate that the layer must have delete and editing enabled
     */
    _deleteEnabled;
    /**
     * HTMLInstantAppsFilterListElement: Component from Instant Apps that supports interacting with the current filter config
     */
    _filterList;
    /**
     * string: The current floor expression
     */
    _floorExpression;
    /**
     * string: The name of the floor field for the current layer
     */
    _floorField;
    /**
     * string: The name of the floor facility
     */
    _floorFacility;
    /**
     * string: The name of the floor level
     */
    _floorLevel;
    /**
     * string: The name of the floor site
     */
    _floorSite;
    /**
     * LayerExpression[]: All layer expressions from the current filter config for the currently selected layer
     */
    _layerExpressions;
    /**
     * boolean: When true the table has been successfully loaded
     */
    _loaded = false;
    /**
     * IHandle: The map click handle
     */
    _mapClickHandle;
    /**
     * boolean: When true the observer has been set and we don't need to set it again
     */
    _observerSet = false;
    /**
     * number: The id of the previous current id and is used for multi select
     */
    _previousCurrentId;
    /**
     * esri/core/reactiveUtils: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-reactiveUtils.html
     */
    reactiveUtils;
    /**
     * IHandle: The layers refresh handle
     */
    _refreshHandle;
    /**
     * ResizeObserver: The observer that watches for toolbar size changes
     */
    _resizeObserver;
    /**
     * HTMLCalciteCheckboxElement: Element to force selection of all records
     */
    _selectAllElement;
    /**
     * boolean: When true the current selection was done via the map and we will ignore shift->Select
     */
    _selectionFromMap = false;
    /**
     * HTMLInstantAppsSocialShareElement: Element to support app sharing to social media
     */
    _shareNode;
    /**
     * boolean: When true the shift key is currently pressed
     */
    _shiftIsPressed = false;
    /**
     * HTMLCalciteDropdownElement: Dropdown the will support show/hide of table columns
     */
    _showHideDropdown;
    /**
     * boolean: When true any onChange handeling will be skipped
     */
    _skipOnChange = false;
    /**
     * HTMLCalciteDropdownElement: Dropdown the will support overflow tools that won't fit in the current display
     */
    _moreDropdown;
    /**
     * esri/widgets/FeatureTable: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-FeatureTable.html
     */
    _table;
    /**
     * HTMLDivElement: Element to hold the FeatureTable
     */
    _tableNode;
    /**
     * any: Timeout used to limit redundancy for toolbar resizing
     */
    _timeout;
    /**
     * HTMLDivElement: The toolbars containing node
     */
    _toolbar;
    /**
     * IToolSizeInfo[]: Id and Width for the current tools
     */
    _toolbarSizeInfos;
    /**
     * string the current search expression
     */
    _searchExpression;
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    /**
     * Update the url params when the appLayout changes
     */
    appLayoutWatchHandler() {
        this._updateShareUrl();
    }
    /**
     * Handle url defaults when defaultOid is set
     */
    async defaultOidWatchHandler() {
        await this._handleDefaults();
    }
    /**
     * Handle url defaults when defaultGlobalId is set
     */
    async defaultGlobalIdWatchHandler() {
        await this._handleDefaults();
    }
    /**
     * Reset the toolInfos when export csv is enabled/disabled
     */
    enableCSVWatchHandler() {
        if (this._toolInfos?.length > 0) {
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
     * Update the toolbar when the share button is enabled/disabled
     */
    enableShareWatchHandler() {
        // this should be caught by component did render and is when I test locally
        // however have had reported case where it is not somehow on devext so adding explicit check here
        if (this._toolbar) {
            this._updateToolbar();
        }
    }
    /**
     * watch for changes to the list of controls that will currently fit in the display
     */
    _controlsThatFitWatchHandler() {
        const ids = this._controlsThatFit ? this._controlsThatFit.reduce((prev, cur) => {
            prev.push(cur.id);
            return prev;
        }, []) : [];
        this._toolInfos = this._toolInfos?.map(ti => {
            if (ti && this._controlsThatFit) {
                const id = this._getId(ti.icon);
                ti.isOverflow = ids.indexOf(id) < 0;
                return ti;
            }
        });
    }
    /**
     * Reset the toolInfos when mapHidden prop changes so we can show/hide any map dependant tool(s)
     */
    mapHiddenWatchHandler() {
        if (this._toolInfos?.length > 0) {
            this._initToolInfos();
        }
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
     * watch for changes in map info and update the toolbar
     */
    async mapInfoWatchHandler() {
        this._resetColumnTemplates();
        if (this.createFilterModal) {
            this._initLayerExpressions();
        }
        this._initToolInfos();
        this._updateToolbar();
        await this._sortTable();
    }
    /**
     * watch for changes in map view and get the first layer
     */
    async mapViewWatchHandler() {
        if (this._mapClickHandle) {
            this._mapClickHandle.remove();
        }
        if (this.mapView) {
            this._floorExpression = undefined;
            this._searchExpression = undefined;
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
        this._fetchingData = true;
        await this._layer?.when(async () => {
            this._definitionExpression = this._layer.definitionExpression;
            this._floorField = this._layer.floorInfo?.floorField;
            this._updateFloorDefinitionExpression();
            await this._resetTable();
            if (this.createFilterModal) {
                this._initLayerExpressions();
            }
            this._updateShareUrl();
            this._fetchingData = false;
        });
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
        if (this.selectedIds.length > 0) {
            this._table.rowHighlightIds.removeAll();
            this._table.rowHighlightIds.add(this.selectedIds[0]);
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Methods (public)
    //
    //--------------------------------------------------------------------------
    /**
     * Reset the filter
     */
    async filterReset() {
        await this._handleFilterListReset();
    }
    /**
     * Updates the filter
     */
    async filterUpdate() {
        await this._handleFilterUpdate();
    }
    /**
     * Closes the filter
     */
    async closeFilter() {
        await this._closeFilter();
    }
    /**
     * refresh the feature table
     */
    async refresh() {
        if (this._table) {
            await this._refresh();
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Events (public)
    //
    //--------------------------------------------------------------------------
    /**
     * Emitted on demand when a layer is selected
     */
    featureSelectionChange;
    /**
     * Emitted on demand when filter action is clicked
     */
    toggleFilter;
    /**
     * Scroll and zoom to the selected feature from the Features widget.
     *
     * @param evt CustomEvent the graphic for the current selection
     */
    async selectionChanged(evt) {
        const g = evt.detail.selectedFeature[0];
        const oid = g.getObjectId();
        //Highlight the current selected feature in the table using rowHighlightIds
        const table = this._table;
        if (table.rowHighlightIds.length) {
            table.rowHighlightIds.removeAll();
        }
        table.rowHighlightIds.add(oid);
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
                await goToSelection([oid], layerView, this.mapView, true, undefined, this.zoomToScale);
            }
        }
    }
    /**
     * Handles layer selection change to show new table
     *
     * @param evt CustomEvent the id for the current layer
     */
    async layerSelectionChange(evt) {
        await this._layerSelectionChanged(evt);
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
     * Refresh the table when floor filter facility is changed
     */
    async facilityChanged(evt) {
        this._floorFacility = evt.detail;
        this._updateFloorDefinitionExpression();
    }
    /**
     * Refresh the table when floor filter level is changed
     */
    async levelChanged(evt) {
        this._floorLevel = evt.detail;
        this._updateFloorDefinitionExpression();
    }
    /**
     * Refresh the table when floor filter site is changed
     */
    async siteChanged(evt) {
        this._floorSite = evt.detail;
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
    /**
     * Clears the selection from table
     */
    clearSelection() {
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
        const total = this._size.toString();
        const selected = this.selectedIds.length.toString();
        const tableHeightClass = this.isMobile ? "height-full" : "height-full-adjusted";
        const showSearch = this._canShowFullTextSearch();
        this._validateActiveActions();
        return (h(Host, { key: '04fccaaa9862ed315d99ad74f7e1135dd5656613' }, h("calcite-shell", { key: 'e332d781be1499857a5e17e37ad2e058bba453b1' }, this._getTableControlRow("header"), h("div", { key: '6337e494f879c250494c5f5859daec627fdd0700', class: `width-full ${tableHeightClass}` }, h("calcite-panel", { key: 'd0d437997906fd15f97765cb89c3917f66b20c37', class: "height-full width-full" }, showSearch &&
            h("div", { key: '596a2d54fd707941d9e2ec167598313d9ee9b295', class: "search-container" }, h("calcite-input", { key: '31cd1ffb09bc2c6c9c1f9daf39f3e9549cbceeb2', class: "search", clearable: true, icon: "search", onCalciteInputChange: (evt) => void this._searchTextChanged(evt), placeholder: this._searchPlaceHolder, title: this._searchPlaceHolder, type: "search" })), h("calcite-loader", { key: 'b4ba3d32fb346134672e08d55428bd38ac43f40d', class: loadingClass, label: this._translations.fetchingData, scale: "l" }), h("div", { key: '4fbac73935be7a1163643543e6d77a200534e5e3', class: tableNodeClass, ref: this.onTableNodeCreate }))), !this.isMobile ? (h("div", { class: "bottom-left text-color height-19" }, this._translations.recordsSelected
            .replace("{{total}}", total)
            .replace("{{selected}}", selected))) : undefined), this.createFilterModal && this._filterModal(), h("delete-dialog", { key: '3b0dba8bc391d777f4687ad6f4e905aeb1eb580b', id: "deleteDialogId", ids: this._getIds(), layer: this._layer, onDeleteDialogClose: () => this._deleteDialogOpen = false, open: this._deleteDialogOpen, ref: (el) => this._deleteDialog = el })));
    }
    _deleteDialog;
    /**
     * Called once after the component is loaded
     */
    async componentDidLoad() {
        if (!this.isMobile && !this._observerSet) {
            this._resizeObserver.observe(this._toolbar);
            this._observerSet = true;
        }
    }
    /**
     * Called after the component is rendered
     */
    componentDidRender() {
        // need to be called after each render to get the clicked mouseEvent
        document.onclick = (e) => this._handleDocumentClick(e);
        document.onkeydown = (e) => this._handleKeyDown(e);
        document.onkeyup = (e) => this._handleKeyUp(e);
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
     * Search using the fullTextSearch on layer and filter the table
     *
     * @param event The input change event
     */
    async _searchTextChanged(event) {
        this._fullTextSearchInfo.forEach(searchInfo => {
            searchInfo.searchTerm = event.target.value;
        });
        void this._searchFullText();
    }
    /**
     * Search using the fullTextSearch on layer and filter the table
     *
     */
    async _searchFullText() {
        //always clear previous search definition
        if (this._searchExpression) {
            this._clearSearchDefinitionExpression();
        }
        if (this._fullTextSearchInfo.length) {
            if (this._fullTextSearchInfo[0].searchTerm) {
                const searchQueryParams = this._layer.createQuery();
                searchQueryParams.fullText = this._fullTextSearchInfo;
                const searchedIds = await this._layer.queryObjectIds(searchQueryParams);
                await this._updateSearchDefinitionExpression(searchedIds?.length ? searchedIds : [-1]);
            }
        }
        //Added timeout and table.refresh() to avoid the issue in which we see empty table records after searching in combination to filter/reset filter
        await new Promise(resolve => setTimeout(resolve, 800));
        await this._updateAllIds();
    }
    /**
     * Clears the applied search expression on the layer
     *
     */
    _clearSearchDefinitionExpression() {
        const defExp = this._layer.definitionExpression;
        //remove previous search expression first
        if (this._searchExpression && defExp?.indexOf(this._searchExpression) > -1) {
            // eslint-disable-next-line unicorn/prefer-ternary
            if (defExp?.indexOf(' AND (' + this._searchExpression) > -1) {
                this._layer.definitionExpression = defExp.replace(` AND (${this._searchExpression})`, '');
            }
            else {
                this._layer.definitionExpression = defExp.replace(this._searchExpression, '');
            }
        }
        this._searchExpression = undefined;
    }
    /**
     * Update the search expression in layer
     * @param searchedIds Array of objectIds satisfying the full search text
     */
    async _updateSearchDefinitionExpression(searchedIds) {
        const defExp = this._layer.definitionExpression;
        if (searchedIds?.length) {
            const searchExp = `objectId in(${searchedIds})`;
            this._layer.definitionExpression = defExp?.indexOf(this._searchExpression) > -1 ?
                defExp.replace(this._searchExpression, searchExp) :
                defExp ? `${defExp} AND (${searchExp})` : searchExp;
            this._searchExpression = searchExp;
        }
        else {
            this._clearSearchDefinitionExpression();
        }
    }
    /**
     * Validates if full text search is enabled and and indexes for fullTextSearch available on the layer
     */
    _canShowFullTextSearch() {
        return ((this._layer?.capabilities)?.query)?.supportsFullTextSearch &&
            this._layer.indexes.items.filter(i => i.indexType == 'FullText').length > 0;
    }
    /**
     * Create list of full text search info
     */
    _getFullTextSearchInfo() {
        this._fullTextSearchInfo = [];
        //combine all the fullText index
        if (((this._layer?.capabilities)?.query)?.supportsFullTextSearch) {
            const fullTextIndexes = this._layer.indexes?.filter(i => i.indexType == 'FullText');
            if (fullTextIndexes?.length) {
                //create the search placeholder text
                const onFields = [];
                fullTextIndexes.forEach((index) => {
                    onFields.push(...index.fields.split(','));
                });
                //get field alias for fields
                const fieldAlias = [];
                onFields.forEach(fieldName => {
                    //We splitting the fields array so we get leading/trailing spaces, hence trim the fieldName
                    const fieldInfo = this._layer.getField(fieldName.trim());
                    fieldAlias.push(fieldInfo.alias);
                });
                this._searchPlaceHolder = this._translations.searchPlaceholder.replace("{{fields}}", fieldAlias.join(', '));
                this._fullTextSearchInfo.push({
                    'onFields': ['*'],
                    'searchTerm': '',
                    'searchType': 'prefix'
                });
            }
        }
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
        const toolbarClass = this._canShowFullTextSearch() ? "border-bottom" : "";
        return (h("div", { class: `display-flex height-51-px ${toolbarClass}`, ref: (el) => this._toolbar = el, slot: slot }, this._getActionBar(), !this.isMobile ? this._getDropdown(id) : undefined, this.enableShare && !this.isMobile ? this._getShare("share") : undefined));
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
        return (h("calcite-action-bar", { class: containerClass, expandDisabled: true, expanded: true, id: this._getId("bar"), layout: "horizontal" }, h("div", { class: `border-end ${containerClass} ${mobileClass}`, id: "solutions-map-layer-picker-container" }, h("map-layer-picker", { appearance: "transparent", defaultLayerId: this.defaultLayerId, display: "inline-flex", height: 50, isMobile: this.isMobile, mapView: this.mapView, onlyShowUpdatableLayers: this.onlyShowUpdatableLayers, placeholderIcon: "layers", scale: "l", selectedIds: this._layer ? [this._layer?.id] : [], showSingleLayerAsLabel: true, showTables: true, type: "dropdown" })), !this.isMobile ? this._getActions() : undefined));
    }
    /**
     * Get the actions that are used for various interactions with the table
     *
     * @returns VNode[] the action nodes
     */
    _getActions() {
        const actions = this._getActionItems();
        return actions?.reduce((prev, cur) => {
            if (cur && !cur.isOverflow) {
                prev.push(cur.isDanger ?
                    this._getDangerAction(cur.icon, cur.label, cur.func, cur.disabled) :
                    cur.isSublist ? (h("calcite-dropdown", { closeOnSelectDisabled: true, id: this._getId(cur.icon), onCalciteDropdownBeforeClose: () => this._forceShowHide(), ref: (el) => this._showHideDropdown = el }, this._getAction(cur.active, this._showHideOpen ? "chevron-down" : cur.icon, cur.indicator, cur.label, cur.func, cur.disabled, cur.loading, "trigger"), this._showHideOpen ? this._getFieldlist() : undefined)) :
                        this._getAction(cur.active, cur.icon, cur.indicator, cur.label, cur.func, cur.disabled, cur.loading));
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
            return (h("calcite-dropdown-item", { id: `layer-table-${k.toLowerCase().replaceAll(" ", "")}`, label: k, onClick: (e) => {
                    const target = e.target;
                    this._columnsInfo[target.label] = target.selected;
                    if (!target.selected) {
                        this._table.hideColumn(target.label);
                    }
                    else {
                        this._table.showColumn(target.label);
                    }
                }, selected: selected }, k));
        }))) : undefined;
    }
    /**
     * Update actions enabled prop based on number of selected indexes
     */
    _validateEnabledActions() {
        const featuresSelected = this._featuresSelected();
        const showMultipleEdits = this.selectedIds.length > 1 && this._layer?.capabilities?.operations?.supportsUpdate;
        const selectionDependant = [
            "zoom-to-object",
            "pencil",
            "trash",
            "erase",
            "selected-items-filter"
        ];
        this._toolInfos?.forEach(ti => {
            if (ti && selectionDependant.indexOf(ti.icon) > -1) {
                // disable the pencil icon if multiple features are not selected
                // For other icons disable them if any feature is not selected
                ti.disabled = ti.icon === "pencil" ? !showMultipleEdits : !featuresSelected;
            }
        });
    }
    /**
     * Update actions active prop based on a stored value
     */
    _validateActiveActions() {
        const activeDependant = [
            "filter",
            "list-check-all",
            "selected-items-filter"
        ];
        this._toolInfos?.forEach(ti => {
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
        // hide multiple edits for R03
        const showMultipleEdits = this.selectedIds.length > 1 && this._layer?.capabilities?.operations?.supportsUpdate && false;
        const featuresEmpty = this._featuresEmpty();
        const hasFilterExpressions = this._hasFilterExpressions();
        if (this._translations) {
            this._toolInfos = [
                !this.mapHidden ? {
                    active: false,
                    icon: "zoom-to-object",
                    indicator: false,
                    label: this._translations.zoom,
                    func: () => this._zoom(),
                    disabled: !featuresSelected,
                    isOverflow: false
                } : undefined,
                hasFilterExpressions ? {
                    active: false,
                    icon: "filter",
                    indicator: false,
                    label: this._translations.filters,
                    func: () => this.createFilterModal ? this._toggleFilter() : this.toggleFilter.emit(),
                    disabled: false,
                    isOverflow: false
                } : undefined,
                showMultipleEdits ? {
                    active: false,
                    icon: "pencil",
                    indicator: false,
                    label: this._translations.editMultiple,
                    func: () => alert(this._translations.editMultiple),
                    disabled: !showMultipleEdits,
                    isOverflow: false,
                } : undefined,
                this._deleteEnabled ? {
                    active: undefined,
                    icon: "trash",
                    indicator: undefined,
                    label: this._translations.delete,
                    func: () => this._showDelete(),
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
                    loading: this._csvExporting,
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
                }
            ];
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
            const floorExp = `${this._floorField} = '${this._floorLevel}'`;
            const defExp = this._layer.definitionExpression;
            this._layer.definitionExpression = defExp?.indexOf(this._floorExpression) > -1 ?
                defExp.replace(this._floorExpression, floorExp) :
                defExp ? `${defExp} AND (${floorExp})` : floorExp;
            this._floorExpression = floorExp;
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
        let layerExpressions;
        if (this.mapInfo?.filterConfig?.layerExpressions && this._layer?.id) {
            layerExpressions = this.mapInfo.filterConfig.layerExpressions.filter((exp) => exp.id === this._layer.id);
        }
        return layerExpressions?.length > 0;
    }
    /**
     * Add/Remove tools from the action bar and dropdown based on available size
     */
    _updateToolbar() {
        if (this._timeout) {
            clearTimeout(this._timeout);
        }
        if (!this.isMobile && this._toolbar && this._toolInfos) {
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
            }, 250);
        }
    }
    /**
     * Validate if controls that fit the current display has changed or
     * is different from what is currently displayed
     */
    _setControlsThatFit(controlsThatFit, skipControls) {
        let update = JSON.stringify(controlsThatFit) !== JSON.stringify(this._controlsThatFit);
        const actionbar = document.getElementById("solutions-action-bar");
        actionbar?.childNodes?.forEach((n) => {
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
        return this._toolInfos?.filter(toolInfo => toolInfo && !toolInfo.isOverflow);
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
            return (h("calcite-dropdown-group", { class: `${item.disabled ? "disabled" : ""} ${item.icon === "trash" ? "delete-red" : ""}`, selectionMode: "none" }, h("calcite-dropdown-item", { disabled: item.loading, iconStart: item.isSublist && this._showHideOpen ? "chevron-down" : item.loading ? "" : item.icon, id: `layer-table-${item.icon}`, onClick: item.func }, item.loading ? (h("div", { class: "display-flex" }, h("calcite-loader", { inline: true, label: item.label, scale: "m" }), item.label)) : item.label)));
        })), this._showHideOpen ? this._getFieldlist() : undefined)) : undefined;
    }
    /**
     * Get a list of toolInfos that should display in the dropdown
     *
     * @returns IToolInfo[] the list of toolInfos that should display in the dropdown
     */
    _getDropdownItems() {
        return this._toolInfos?.filter(toolInfo => toolInfo && toolInfo.isOverflow);
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
    _getAction(active, icon, indicator, label, func, disabled, loading, slot) {
        const _disabled = this._layer === undefined ? true : disabled;
        return (h("div", { class: "display-flex", id: this._getId(icon), slot: slot }, h("calcite-action", { active: active, appearance: "solid", disabled: _disabled, icon: icon, id: `layer-table-${icon}`, indicator: indicator, label: label, loading: loading, onClick: func, text: label, textEnabled: true }), this._getToolTip("bottom", icon, label)));
    }
    /**
     * Show the delete dialog
     *
     * @param
     *
     */
    _showDelete() {
        this._deleteDialogOpen = true;
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
        const url = this._shareNode?.shareUrl;
        if (!url) {
            return;
        }
        const urlObj = new URL(url);
        //set the additional search params
        if (this.mapInfo?.id) {
            urlObj.searchParams.set("webmap", this.mapInfo.id);
        }
        else {
            urlObj.searchParams.delete("webmap");
        }
        if (this._layer?.id) {
            urlObj.searchParams.set("layer", this._layer.id);
        }
        else {
            urlObj.searchParams.delete("layer");
        }
        if (this.selectedIds?.length > 0) {
            urlObj.searchParams.set("oid", this.selectedIds.join(","));
        }
        else {
            urlObj.searchParams.delete("oid");
        }
        urlObj.searchParams.set("applayout", this.appLayout);
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
        return document.getElementById(referenceElement) ? (h("calcite-tooltip", { placement: placement, "reference-element": referenceElement }, h("span", null, text))) : undefined;
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
        return (h("div", { class: "display-flex", id: this._getId(icon) }, icon === "trash" ? (h("delete-button", { buttonType: "action", class: "display-flex", disabled: _disabled, icon: icon, id: "solutions-delete", ids: this._getIds(), layer: this._layer })) : (h("calcite-action", { appearance: "solid", disabled: _disabled, id: icon, onClick: func, text: label }, h("calcite-button", { appearance: "transparent", iconStart: icon, kind: "danger" }, label))), this._getToolTip("bottom", icon, label)));
    }
    /**
     * Return all currently selected IDs from the table
     *
     * @param number[] the selected ids
     */
    _getIds() {
        return this._table?.highlightIds?.toArray();
    }
    /**
     * Store a reference to the table node after it's first created
     * and initializes the FeatureTable
     *
     * @param node HTMLDivElement The node representing the DOM element that will contain the widget.
     */
    onTableNodeCreate = (node) => {
        this._tableNode = node;
    };
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
            await this._table.when(() => {
                this._table.highlightIds.on("change", (evt) => {
                    void this._handleOnChange(evt);
                });
                //Add handle to watch size of the table and update the state to reflect the total count
                const handle = this.reactiveUtils.watch(() => this._table.size, (size) => {
                    this._size = size;
                });
                this._table.viewModel.addHandles(handle);
            });
        }
    }
    async _handleOnChange(evt) {
        const ids = [...this._table.highlightIds.toArray()];
        if (!this._skipOnChange) {
            if ((!this._ctrlIsPressed && !this._shiftIsPressed) || (this._selectionFromMap && this._shiftIsPressed)) {
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
            else if (this._shiftIsPressed && ids?.length > 0) {
                this._skipOnChange = true;
                this._previousCurrentId = this._currentId;
                this._currentId = [...ids].reverse()[0];
                if (ids.length === 1) {
                    this._skipOnChange = false;
                }
                else if (this._previousCurrentId !== this._currentId) {
                    // query the layer based on current sort and filters then grab between the current id and previous id
                    const orderBy = this._table.activeSortOrders.reduce((prev, cur) => {
                        prev.push(`${cur.fieldName} ${cur.direction}`);
                        return prev;
                    }, []);
                    const oids = await queryAllOidsWithQueryFeatures(0, this._layer, [], orderBy);
                    let isBetween = false;
                    const _start = this._table.viewModel.getObjectIdIndex(this._previousCurrentId);
                    const _end = this._table.viewModel.getObjectIdIndex(this._currentId);
                    const startIndex = _start < _end ? _start : _end;
                    const endIndex = _end > _start ? _end : _start;
                    this._skipOnChange = startIndex + 1 !== endIndex;
                    const idsInRange = oids.reduce((prev, cur) => {
                        const id = cur;
                        if ((id === this._currentId || id === this._previousCurrentId)) {
                            isBetween = !isBetween;
                            if (prev.indexOf(id) < 0) {
                                prev.push(id);
                            }
                        }
                        else if (isBetween && prev.indexOf(id) < 0) {
                            prev.push(id);
                        }
                        return prev;
                    }, []);
                    const selectedIds = _start < _end ? idsInRange.reverse() : idsInRange;
                    this.selectedIds = [...new Set([...selectedIds, ...this.selectedIds])];
                    this._table.highlightIds.addMany(this.selectedIds.filter(i => ids.indexOf(i) < 0));
                }
            }
            this._finishOnChange();
        }
        else {
            this._skipOnChange = false;
        }
        this._currentId = [...this._table.highlightIds.toArray()].reverse()[0];
        this._selectionFromMap = false;
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
        const columnTemplates = this._getColumnTemplates(this._layer?.id, this._layer?.fields);
        const hasChange = columnTemplates?.some((ct, i) => {
            return JSON.stringify(this._table?.tableTemplate.columnTemplates[i]) !== JSON.stringify(ct);
        });
        if (this._table && columnTemplates && (hasChange || !this._columnsInfo)) {
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
        this._loaded = false;
        this._clearSelection();
        this._allIds = await queryAllIds(this._layer);
        if (!this._table) {
            const columnTemplates = this._getColumnTemplates(this._layer.id, this._layer?.fields);
            await this._getTable(this._tableNode, columnTemplates);
        }
        else {
            this._table.view = this.mapView;
            this._table.layer = this._layer;
        }
        await this._initLayerRefresh();
        this._checkEditEnabled();
        this._table.editingEnabled = this._editEnabled && this.enableInlineEdit;
        await this._table.when();
        // This is a workaround.
        // In some cases the first time the app is loaded this._table.state === "loaded" is not being hit.
        // When this issue occurs we will wait for 1 second and attempt to finish the loading process
        setTimeout(() => {
            if (!this._loaded) {
                console.log(`table.state: ${this._table.state}`);
                void this.finishLoading();
            }
        }, 1000);
        await this.reactiveUtils.once(() => this._table.state === "loaded")
            .then(async () => {
            await this.finishLoading();
        });
    }
    /**
     * Finish the table loading tasks
     */
    async finishLoading() {
        try {
            this._loaded = true;
            this._table.highlightIds.removeAll();
            this._table.clearSelectionFilter();
            this._resetColumnTemplates();
            this._showOnlySelected = false;
            await this._handleDefaults();
            await this._sortTable();
            this._initToolInfos();
            this._updateToolbar();
        }
        catch (e) {
            console.log(e);
        }
    }
    /**
     * Update the current IDs when that layers data is modified
     */
    async _initLayerRefresh() {
        if (this._refreshHandle) {
            this._refreshHandle.remove();
        }
        this._refreshHandle = this._layer.on("refresh", (evt) => {
            if (evt.dataChanged) {
                this._skipOnChange = true;
                void this._updateAllIds();
            }
        });
    }
    /**
     * Reset _allIds when the layers data has changed and refresh the selection ids and table
     */
    async _updateAllIds() {
        this._allIds = await queryAllIds(this._layer);
        this.selectedIds = this.selectedIds.filter(id => this._allIds.indexOf(id) > -1);
        await this._refresh();
    }
    /**
     * Handle default OID or GlobalID from url parameters
     */
    async _handleDefaults() {
        if (!this._defaultOidHonored && this.defaultOid?.length > 0 && this.defaultOid[0] > -1 && this._table) {
            await this._selectDefaultFeature(this.defaultOid);
            this._defaultOidHonored = true;
            this.defaultOid = undefined;
            this._showOnlySelected = false;
            this._toggleShowSelected();
        }
        if (!this._defaultGlobalIdHonored && this.defaultGlobalId?.length > 0 && this._table) {
            const features = await queryFeaturesByGlobalID(this.defaultGlobalId, this._layer);
            const oids = features?.length > 0 ? features.map(f => f.getObjectId()) : undefined;
            if (oids) {
                await this._selectDefaultFeature(oids);
            }
            this._defaultGlobalIdHonored = true;
            this.defaultGlobalId = undefined;
            this._showOnlySelected = false;
            this._toggleShowSelected();
        }
    }
    /**
     * Store the column names and current hidden status to support show/hide of columns
     * @param fieldNames optional list of names from new config options
     */
    _initColumnsInfo(fieldNames) {
        // this._table.columns is not reflecting correct list when new
        // tableTemplate.columnTemplates have been defined on an existing FeatureTable
        // TODO review for better solution post 2024 R01 release
        const columnsInfo = this._table?.columns.reduce((prev, cur) => {
            if (!fieldNames || (fieldNames?.indexOf(cur.name) > -1)) {
                prev[cur.name] = !cur.hidden;
            }
            return prev;
        }, {});
        const oldColumnNames = this._table?.columns.map((c) => c.name);
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
    async _selectDefaultFeature(oids) {
        if (oids.length > 0) {
            this._table.highlightIds.addMany(oids);
            // This is messed up and only make this worse
            //const i = this._table.viewModel.getObjectIdIndex(oids[0]);
            //this._table.viewModel.scrollToIndex(i);
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
     * Sort the table with the configured field and the sort order
     */
    async _sortTable() {
        //By default sort the table using objectIdField and in descending order
        let sortField = this._layer?.objectIdField;
        let sortOrder = 'desc';
        let configuredLayer;
        //get the sortField and sortOrder from the configuration
        if (this.mapInfo?.layerOptions?.layers?.length > 0 && this._layer?.id) {
            configuredLayer = this.mapInfo.layerOptions.layers.filter((layer) => layer.id === this._layer.id);
            if (configuredLayer && configuredLayer.length > 0) {
                configuredLayer = configuredLayer[0];
                //if sort field is defined and sortField is available in the fields then use it
                if (configuredLayer.sortField && configuredLayer.fields?.includes(configuredLayer.sortField)) {
                    sortField = configuredLayer.sortField;
                }
                //use sort order if configured
                sortOrder = configuredLayer?.sortOrder ? configuredLayer.sortOrder : "desc";
            }
        }
        if (this._table && this._layer) {
            await this._table.when();
            await this._layer.when(() => {
                this._table.sortColumn(sortField, sortOrder);
            });
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
     * @param e clicked event from mouse
     * @protected
     */
    _handleDocumentClick(e) {
        const id = e.target?.id;
        if (id.startsWith('layer-table-')) {
            this._moreDropdown.open = true;
        }
        else if (this._showHideOpen && Object.keys(this._columnsInfo).indexOf(id) < 0 && id !== "chevron-right") {
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
     * @protected
     */
    _filterModal() {
        return (h("calcite-modal", { "aria-labelledby": "modal-title", class: "modal", kind: "brand", onCalciteModalClose: () => void this._closeFilter(), open: this._filterOpen, widthScale: "s" }, h("div", { class: "display-flex align-center", id: "modal-title", slot: "header" }, this._translations?.filter?.replace("{{title}}", this._layer?.title)), h("div", { slot: "content" }, h("instant-apps-filter-list", { autoUpdateUrl: false, closeBtn: true, closeBtnOnClick: async () => this._closeFilter(), comboboxOverlayPositioning: "fixed", layerExpressions: this._layerExpressions, onFilterListReset: () => void this._handleFilterListReset(), onFilterUpdate: () => void this._handleFilterUpdate(), ref: (el) => this._filterList = el, view: this.mapView, zoomBtn: false }))));
    }
    /**
     * Reset the filter active prop
     * @protected
     */
    async _handleFilterListReset() {
        this._filterActive = false;
        this._updateShareUrl();
        await this._searchFullText();
    }
    /**
     * Check if the layers definitionExpression has been modified
     * @protected
     */
    async _handleFilterUpdate() {
        const defExp = this._layer.definitionExpression;
        if (this._floorExpression) {
            const regEx = new RegExp(`${this._floorField} = ['].+[']`, "gm");
            this._layer.definitionExpression = defExp && this._floorField && defExp.indexOf(`${this._floorField} = '`) > -1 ?
                defExp.replace(regEx, this._floorExpression) : defExp ?
                `${defExp} AND (${this._floorExpression})` : this._floorExpression;
        }
        this._filterActive = this._definitionExpression !== this._layer.definitionExpression &&
            (this._floorExpression ? this._layer.definitionExpression !== this._floorExpression : true);
        this._updateShareUrl();
        await this._searchFullText();
    }
    /**
     * Close the filter modal
     * @protected
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
     * @protected
     */
    async _mapClicked(evt) {
        const opts = {
            include: this._layer
        };
        const hitTestResult = await this.mapView.hitTest(evt.screenPoint, opts);
        if (hitTestResult.results.length > 0) {
            hitTestResult.results.forEach((result) => {
                const id = result.graphic.getObjectId();
                const index = this._table.highlightIds.indexOf(id);
                if (index < 0) {
                    this._selectionFromMap = true;
                    this._table.highlightIds.add(id);
                }
            });
            if (this._showOnlySelected) {
                this._table.filterBySelection();
            }
        }
        else {
            this._clearSelection();
        }
    }
    /**
     * Select or deselect all rows
     * @protected
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
     * @protected
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
     * @protected
     */
    _clearSelection() {
        this.selectedIds = [];
        this._table?.highlightIds.removeAll();
        this._table?.rowHighlightIds.removeAll();
        this._finishOnChange();
    }
    /**
     * When true the filter modal will be displayed
     * @protected
     */
    _toggleFilter() {
        this._filterOpen = !this._filterOpen;
    }
    /**
     * Store any filters for the current layer.
     * Should only occur on layer change
     * @protected
     */
    _initLayerExpressions() {
        const layerExpressions = this.mapInfo?.filterConfig?.layerExpressions;
        this._layerExpressions = layerExpressions ? layerExpressions.filter((exp) => exp.id === this._layer?.id) : [];
        this._filterList.layerExpressions = this._layerExpressions;
        this._filterActive = this._layerExpressions.filter(lyrExp => {
            return lyrExp.expressions.filter(exp => exp.active).length > 0;
        }).length > 0;
    }
    /**
     * Select all rows that are not currently selectd
     * @protected
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
     * @protected
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
        this._updateToolInfoLoading("export", true);
        this._csvExporting = true;
        await downloadCSV(null, //???
        exportInfos, false, // formatUsingLayerPopup
        false, // removeDuplicates
        true, // addColumnTitle
        fields, true, true);
        this._updateToolInfoLoading("export", false);
        this._csvExporting = false;
    }
    /**
     * Set the loading prop in the stored toolInfos
     * @protected
     */
    _updateToolInfoLoading(name, isLoading) {
        this._toolInfos.some(tool => {
            if (tool?.icon === name) {
                tool.loading = isLoading;
                return true;
            }
        });
    }
    /**
     * Refreshes the table and maintains the current scroll position
     * @protected
     */
    async _refresh() {
        await this._table.refresh();
        this._allIds = await queryAllIds(this._layer);
        this.featureSelectionChange.emit(this.selectedIds);
    }
    /**
     * Zoom to all selected features
     *
     * @returns a promise that will resolve when the operation is complete
     * @protected
     */
    async _zoom() {
        if (this._layer) {
            const selectedLayerView = await getFeatureLayerView(this.mapView, this._layer.id);
            await goToSelection(this.selectedIds, selectedLayerView, this.mapView, true, undefined, this.zoomToScale);
        }
    }
    /**
     * Handles layer selection change to show new table
     *
     * @param evt CustomEvent the id for the current layer
     *
     * @returns a promise that will resolve when the operation is complete
     * @protected
     */
    async _layerSelectionChanged(evt) {
        const id = evt.detail[0];
        if (id !== this._layer?.id || this._featuresEmpty()) {
            this._fetchingData = true;
            const layer = await getLayerOrTable(this.mapView, id);
            layer && await layer.when(() => {
                this._layer = layer;
                this._getFullTextSearchInfo();
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
     * @protected
     */
    _getColumnTemplates(id, fieldInfos) {
        let layerOption;
        this.mapInfo?.layerOptions?.layers.some(l => {
            if (l.id === id) {
                layerOption = l;
                return true;
            }
        });
        const fieldOrder = layerOption?.fields && layerOption?.fieldOrder ?
            layerOption.fieldOrder.filter(f => layerOption.fields.indexOf(f) > -1) :
            undefined;
        let columnTemplates;
        if (fieldInfos) {
            columnTemplates = layerOption && layerOption?.fields
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
                }, []).sort(this._sortFields.bind(this, layerOption?.fieldOrder))
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
            columnTemplates?.sort(this._sortFields.bind(this, fieldOrder)) :
            columnTemplates;
    }
    _sortFields(sorter, a, b) {
        return sorter?.indexOf(a.fieldName) - sorter.indexOf(b.fieldName);
    }
    /**
     * Get the menu config that adds the ability to hide the current column
     * @protected
     */
    _getMenuConfig(name) {
        return {
            items: [
                {
                    label: this._translations.hideField,
                    icon: "view-hide",
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
     * @protected
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
    static get watchers() { return {
        "appLayout": ["appLayoutWatchHandler"],
        "defaultOid": ["defaultOidWatchHandler"],
        "defaultGlobalId": ["defaultGlobalIdWatchHandler"],
        "enableCSV": ["enableCSVWatchHandler"],
        "enableInlineEdit": ["enableInlineEditWatchHandler"],
        "enableShare": ["enableShareWatchHandler"],
        "_controlsThatFit": ["_controlsThatFitWatchHandler"],
        "mapHidden": ["mapHiddenWatchHandler"],
        "isMobile": ["isMobileWatchHandler"],
        "mapInfo": ["mapInfoWatchHandler"],
        "mapView": ["mapViewWatchHandler"],
        "_layer": ["_layerWatchHandler"],
        "selectedIds": ["selectedIdsWatchHandler"]
    }; }
    static get style() { return LayerTableStyle0; }
}, [0, "layer-table", {
        "appLayout": [1, "app-layout"],
        "defaultGlobalId": [16],
        "defaultLayerId": [1, "default-layer-id"],
        "defaultOid": [16],
        "enableAutoRefresh": [4, "enable-auto-refresh"],
        "enableColumnReorder": [4, "enable-column-reorder"],
        "enableCSV": [4, "enable-c-s-v"],
        "enableInlineEdit": [4, "enable-inline-edit"],
        "enableShare": [4, "enable-share"],
        "isMobile": [4, "is-mobile"],
        "mapHidden": [4, "map-hidden"],
        "mapInfo": [16],
        "mapView": [16],
        "onlyShowUpdatableLayers": [4, "only-show-updatable-layers"],
        "selectedIds": [16],
        "shareIncludeEmbed": [4, "share-include-embed"],
        "shareIncludeSocial": [4, "share-include-social"],
        "showNewestFirst": [4, "show-newest-first"],
        "zoomAndScrollToSelected": [4, "zoom-and-scroll-to-selected"],
        "zoomToScale": [2, "zoom-to-scale"],
        "createFilterModal": [4, "create-filter-modal"],
        "_allIds": [32],
        "_controlsThatFit": [32],
        "_csvExporting": [32],
        "_fetchingData": [32],
        "_filterActive": [32],
        "_filterOpen": [32],
        "_layer": [32],
        "_selectAllActive": [32],
        "_deleteDialogOpen": [32],
        "_showHideOpen": [32],
        "_showOnlySelected": [32],
        "_toolInfos": [32],
        "_translations": [32],
        "_fullTextSearchInfo": [32],
        "_searchPlaceHolder": [32],
        "_size": [32],
        "filterReset": [64],
        "filterUpdate": [64],
        "closeFilter": [64],
        "refresh": [64]
    }, [[8, "selectionChanged", "selectionChanged"], [8, "layerSelectionChange", "layerSelectionChange"], [8, "editsComplete", "editsComplete"], [8, "facilityChanged", "facilityChanged"], [8, "levelChanged", "levelChanged"], [8, "siteChanged", "siteChanged"], [8, "noLayersFound", "noLayersFound"], [8, "clearSelection", "clearSelection"]], {
        "appLayout": ["appLayoutWatchHandler"],
        "defaultOid": ["defaultOidWatchHandler"],
        "defaultGlobalId": ["defaultGlobalIdWatchHandler"],
        "enableCSV": ["enableCSVWatchHandler"],
        "enableInlineEdit": ["enableInlineEditWatchHandler"],
        "enableShare": ["enableShareWatchHandler"],
        "_controlsThatFit": ["_controlsThatFitWatchHandler"],
        "mapHidden": ["mapHiddenWatchHandler"],
        "isMobile": ["isMobileWatchHandler"],
        "mapInfo": ["mapInfoWatchHandler"],
        "mapView": ["mapViewWatchHandler"],
        "_layer": ["_layerWatchHandler"],
        "selectedIds": ["selectedIdsWatchHandler"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["layer-table", "calcite-action", "calcite-action-bar", "calcite-action-group", "calcite-action-menu", "calcite-block", "calcite-button", "calcite-checkbox", "calcite-chip", "calcite-combobox", "calcite-combobox-item", "calcite-date-picker", "calcite-date-picker-day", "calcite-date-picker-month", "calcite-date-picker-month-header", "calcite-dropdown", "calcite-dropdown-group", "calcite-dropdown-item", "calcite-graph", "calcite-handle", "calcite-icon", "calcite-input", "calcite-input-date-picker", "calcite-input-text", "calcite-label", "calcite-loader", "calcite-modal", "calcite-notice", "calcite-option", "calcite-panel", "calcite-popover", "calcite-progress", "calcite-scrim", "calcite-select", "calcite-shell", "calcite-slider", "calcite-tooltip", "delete-button", "delete-dialog", "instant-apps-filter-list", "instant-apps-social-share", "map-layer-picker"];
    components.forEach(tagName => { switch (tagName) {
        case "layer-table":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, LayerTable);
            }
            break;
        case "calcite-action":
            if (!customElements.get(tagName)) {
                defineCustomElement$F();
            }
            break;
        case "calcite-action-bar":
            if (!customElements.get(tagName)) {
                defineCustomElement$E();
            }
            break;
        case "calcite-action-group":
            if (!customElements.get(tagName)) {
                defineCustomElement$D();
            }
            break;
        case "calcite-action-menu":
            if (!customElements.get(tagName)) {
                defineCustomElement$C();
            }
            break;
        case "calcite-block":
            if (!customElements.get(tagName)) {
                defineCustomElement$B();
            }
            break;
        case "calcite-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$A();
            }
            break;
        case "calcite-checkbox":
            if (!customElements.get(tagName)) {
                defineCustomElement$z();
            }
            break;
        case "calcite-chip":
            if (!customElements.get(tagName)) {
                defineCustomElement$y();
            }
            break;
        case "calcite-combobox":
            if (!customElements.get(tagName)) {
                defineCustomElement$x();
            }
            break;
        case "calcite-combobox-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$w();
            }
            break;
        case "calcite-date-picker":
            if (!customElements.get(tagName)) {
                defineCustomElement$v();
            }
            break;
        case "calcite-date-picker-day":
            if (!customElements.get(tagName)) {
                defineCustomElement$u();
            }
            break;
        case "calcite-date-picker-month":
            if (!customElements.get(tagName)) {
                defineCustomElement$t();
            }
            break;
        case "calcite-date-picker-month-header":
            if (!customElements.get(tagName)) {
                defineCustomElement$s();
            }
            break;
        case "calcite-dropdown":
            if (!customElements.get(tagName)) {
                defineCustomElement$r();
            }
            break;
        case "calcite-dropdown-group":
            if (!customElements.get(tagName)) {
                defineCustomElement$q();
            }
            break;
        case "calcite-dropdown-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$p();
            }
            break;
        case "calcite-graph":
            if (!customElements.get(tagName)) {
                defineCustomElement$o();
            }
            break;
        case "calcite-handle":
            if (!customElements.get(tagName)) {
                defineCustomElement$n();
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$m();
            }
            break;
        case "calcite-input":
            if (!customElements.get(tagName)) {
                defineCustomElement$l();
            }
            break;
        case "calcite-input-date-picker":
            if (!customElements.get(tagName)) {
                defineCustomElement$k();
            }
            break;
        case "calcite-input-text":
            if (!customElements.get(tagName)) {
                defineCustomElement$j();
            }
            break;
        case "calcite-label":
            if (!customElements.get(tagName)) {
                defineCustomElement$i();
            }
            break;
        case "calcite-loader":
            if (!customElements.get(tagName)) {
                defineCustomElement$h();
            }
            break;
        case "calcite-modal":
            if (!customElements.get(tagName)) {
                defineCustomElement$g();
            }
            break;
        case "calcite-notice":
            if (!customElements.get(tagName)) {
                defineCustomElement$f();
            }
            break;
        case "calcite-option":
            if (!customElements.get(tagName)) {
                defineCustomElement$e();
            }
            break;
        case "calcite-panel":
            if (!customElements.get(tagName)) {
                defineCustomElement$d();
            }
            break;
        case "calcite-popover":
            if (!customElements.get(tagName)) {
                defineCustomElement$c();
            }
            break;
        case "calcite-progress":
            if (!customElements.get(tagName)) {
                defineCustomElement$b();
            }
            break;
        case "calcite-scrim":
            if (!customElements.get(tagName)) {
                defineCustomElement$a();
            }
            break;
        case "calcite-select":
            if (!customElements.get(tagName)) {
                defineCustomElement$9();
            }
            break;
        case "calcite-shell":
            if (!customElements.get(tagName)) {
                defineCustomElement$8();
            }
            break;
        case "calcite-slider":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "calcite-tooltip":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "delete-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "delete-dialog":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "instant-apps-filter-list":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "instant-apps-social-share":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "map-layer-picker":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { LayerTable as L, defineCustomElement as d };
