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
import { EventEmitter, VNode } from "../../stencil-public-runtime";
import LayerTable_T9n from "../../assets/t9n/layer-table/resources.json";
import { AppLayout, IColumnsInfo, IMapClick, IMapInfo, IToolInfo, IToolSizeInfo, TooltipPlacement } from "../../utils/interfaces";
import "@esri/instant-apps-components/dist/components/instant-apps-social-share";
import { LayerExpression } from "@esri/instant-apps-components";
export declare class LayerTable {
    el: HTMLCrowdsourceManagerElement;
    /**
     * AppLayout: the current app layout
     */
    appLayout: AppLayout;
    /**
     * string: Global ID of the feature to select
     */
    defaultGlobalId: string[];
    /**
     * string: when provided this layer ID will be used when the app loads
     */
    defaultLayerId: string;
    /**
     * number: when provided this will be used to select a feature in the table by default
     */
    defaultOid: number[];
    /**
     * boolean: when true the layer table will auto refresh the data
     */
    enableAutoRefresh: boolean;
    /**
     * boolean: when true the layer table will support drag/drop of columns to adjust order
     */
    enableColumnReorder: boolean;
    /**
     * boolean: when true the export to csv button will be available
     */
    enableCSV: boolean;
    /**
     * boolean: when true edits can be applied directly within the table
     */
    enableInlineEdit: boolean;
    /**
     * boolean: when true the share widget will be available
     */
    enableShare: boolean;
    /**
     * When true the component will render an optimized view for mobile devices
     */
    isMobile: boolean;
    /**
     * boolean: when true the map is hidden and map specific controls should be hidden
     */
    mapHidden: boolean;
    /**
     * IMapInfo: key configuration details about the current map
     */
    mapInfo: IMapInfo;
    /**
     * esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
     */
    mapView: __esri.MapView;
    /**
     * boolean: When true only editable layers that support the update capability will be available
     */
    onlyShowUpdatableLayers: boolean;
    /**
     * number[]: A list of ids that are currently selected
     */
    selectedIds: number[];
    /**
     * boolean: When true the share options will include embed option
     */
    shareIncludeEmbed: boolean;
    /**
     * boolean: When true the share options will include social media sharing
     */
    shareIncludeSocial: boolean;
    /**
     * boolean: when true the table will be sorted by objectid in descending order by default
     */
    showNewestFirst: boolean;
    /**
     * boolean: When true the selected feature will zoomed to in the map and the row will be scrolled to within the table
     */
    zoomAndScrollToSelected: boolean;
    /**
     * number: default scale to zoom to when zooming to a single point feature
     */
    zoomToScale: number;
    /**
     * boolean: create filter modal optional (default true) boolean value to create filter modal in layer table
     */
    createFilterModal: boolean;
    /**
     * number[]: A list of all IDs for the current layer
     */
    _allIds: number[];
    /**
     * IToolSizeInfo[]: The controls that currently fit based on toolbar size
     */
    _controlsThatFit: IToolSizeInfo[];
    /**
     * boolean: When true a loading indicator will be shown beside the button text
     */
    _csvExporting: boolean;
    /**
     * boolean: When true a loading indicator will be shown in place of the layer table
     */
    _fetchingData: boolean;
    /**
     * boolean: When true an indicator will be shown on the action
     */
    _filterActive: boolean;
    /**
     * boolean: When true the filter component will be displayed
     */
    _filterOpen: boolean;
    /**
     * esri/views/layers/FeatureLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html
     */
    _layer: __esri.FeatureLayer;
    /**
     * boolean: When true the select all will be displayed in an active state
     */
    _selectAllActive: boolean;
    /**
     * boolean: When true the delete dialog will be shown
     */
    _deleteDialogOpen: boolean;
    /**
     * boolean: When true the show/hide fields list is forced open
     */
    _showHideOpen: boolean;
    /**
     * boolean: When true only selected records will be shown in the table
     */
    _showOnlySelected: boolean;
    /**
     * IToolInfo[]: Key details used for creating the tools
     */
    _toolInfos: IToolInfo[];
    /**
     * Contains the translations for this component.
     * All UI strings should be defined here.
     */
    _translations: typeof LayerTable_T9n;
    /**
     * any[] Contains full text search info object
     */
    _fullTextSearchInfo: any[];
    /**
    * string Placeholder string to show fields included in full text search
    */
    _searchPlaceHolder: string;
    /**
     * number Total number of records currently displayed in the table. This takes into account all active filters.
     */
    _size: number;
    /**
     * esri/widgets/FeatureTable: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-FeatureTable.html
     */
    protected FeatureTable: typeof import("esri/widgets/FeatureTable");
    /**
     * esri/widgets/FeatureTable/support/TableTemplate: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-FeatureTable-support-TableTemplate.html
     */
    protected TableTemplate: typeof import("esri/widgets/FeatureTable/support/TableTemplate");
    /**
     * IColumnsInfo: Key/value pair with fieldname/(visible in table)
     */
    protected _columnsInfo: IColumnsInfo;
    /**
     * boolean: When true the ctrl key is currently pressed
     */
    protected _ctrlIsPressed: boolean;
    /**
     * number: The id of the most recently selected row from the table
     */
    protected _currentId: number;
    /**
     * boolean: When false alerts will be shown to indicate that the layer must have editing enabled for edit actions
     */
    protected _editEnabled: boolean;
    /**
     * boolean: When true the default filter provided via url param has been honored and should now be ignored
     */
    protected _defaultFilterHonored: boolean;
    /**
     * boolean: When true the default global id provided via url param has been honored and should now be ignored
     */
    protected _defaultGlobalIdHonored: boolean;
    /**
     * boolean: When true the default OID provided via url param has been honored and should now be ignored
     */
    protected _defaultOidHonored: boolean;
    /**
     * IToolSizeInfo[]: The default list of tool size info for tools that should display outside of the dropdown
     */
    protected _defaultVisibleToolSizeInfos: IToolSizeInfo[];
    /**
     * string: The current layers definition expression
     */
    protected _definitionExpression: string;
    /**
     * boolean: When false alerts will be shown to indicate that the layer must have delete and editing enabled
     */
    protected _deleteEnabled: boolean;
    /**
     * HTMLInstantAppsFilterListElement: Component from Instant Apps that supports interacting with the current filter config
     */
    protected _filterList: HTMLInstantAppsFilterListElement;
    /**
     * string: The current floor expression
     */
    protected _floorExpression: string;
    /**
     * string: The name of the floor field for the current layer
     */
    protected _floorField: string;
    /**
     * string: The name of the floor facility
     */
    protected _floorFacility: string;
    /**
     * string: The name of the floor level
     */
    protected _floorLevel: string;
    /**
     * string: The name of the floor site
     */
    protected _floorSite: string;
    /**
     * LayerExpression[]: All layer expressions from the current filter config for the currently selected layer
     */
    protected _layerExpressions: LayerExpression[];
    /**
     * boolean: When true the table has been successfully loaded
     */
    protected _loaded: boolean;
    /**
     * IHandle: The map click handle
     */
    protected _mapClickHandle: IHandle;
    /**
     * boolean: When true the observer has been set and we don't need to set it again
     */
    protected _observerSet: boolean;
    /**
     * number: The id of the previous current id and is used for multi select
     */
    protected _previousCurrentId: number;
    /**
     * esri/core/reactiveUtils: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-reactiveUtils.html
     */
    protected reactiveUtils: typeof import("esri/core/reactiveUtils");
    /**
     * IHandle: The layers refresh handle
     */
    protected _refreshHandle: IHandle;
    /**
     * ResizeObserver: The observer that watches for toolbar size changes
     */
    protected _resizeObserver: ResizeObserver;
    /**
     * HTMLCalciteCheckboxElement: Element to force selection of all records
     */
    protected _selectAllElement: HTMLCalciteCheckboxElement;
    /**
     * boolean: When true the current selection was done via the map and we will ignore shift->Select
     */
    protected _selectionFromMap: boolean;
    /**
     * HTMLInstantAppsSocialShareElement: Element to support app sharing to social media
     */
    protected _shareNode: HTMLInstantAppsSocialShareElement;
    /**
     * boolean: When true the shift key is currently pressed
     */
    protected _shiftIsPressed: boolean;
    /**
     * HTMLCalciteDropdownElement: Dropdown the will support show/hide of table columns
     */
    protected _showHideDropdown: HTMLCalciteDropdownElement;
    /**
     * boolean: When true any onChange handeling will be skipped
     */
    protected _skipOnChange: boolean;
    /**
     * HTMLCalciteDropdownElement: Dropdown the will support overflow tools that won't fit in the current display
     */
    protected _moreDropdown: HTMLCalciteDropdownElement;
    /**
     * esri/widgets/FeatureTable: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-FeatureTable.html
     */
    protected _table: __esri.FeatureTable;
    /**
     * HTMLDivElement: Element to hold the FeatureTable
     */
    protected _tableNode: HTMLDivElement;
    /**
     * any: Timeout used to limit redundancy for toolbar resizing
     */
    protected _timeout: any;
    /**
     * HTMLDivElement: The toolbars containing node
     */
    protected _toolbar: HTMLDivElement;
    /**
     * IToolSizeInfo[]: Id and Width for the current tools
     */
    protected _toolbarSizeInfos: IToolSizeInfo[];
    /**
     * string the current search expression
     */
    protected _searchExpression: string;
    /**
     * Update the url params when the appLayout changes
     */
    appLayoutWatchHandler(): void;
    /**
     * Handle url defaults when defaultOid is set
     */
    defaultOidWatchHandler(): Promise<void>;
    /**
     * Handle url defaults when defaultGlobalId is set
     */
    defaultGlobalIdWatchHandler(): Promise<void>;
    /**
     * Reset the toolInfos when export csv is enabled/disabled
     */
    enableCSVWatchHandler(): void;
    /**
     * Update the table when enableInlineEdit is enabled/disabled
     */
    enableInlineEditWatchHandler(): void;
    /**
     * Update the toolbar when the share button is enabled/disabled
     */
    enableShareWatchHandler(): void;
    /**
     * watch for changes to the list of controls that will currently fit in the display
     */
    _controlsThatFitWatchHandler(): void;
    /**
     * Reset the toolInfos when mapHidden prop changes so we can show/hide any map dependant tool(s)
     */
    mapHiddenWatchHandler(): void;
    /**
     * When isMobile is false we need to init the tool infos for the dynamic toolbar
     */
    isMobileWatchHandler(): void;
    /**
     * watch for changes in map info and update the toolbar
     */
    mapInfoWatchHandler(): Promise<void>;
    /**
     * watch for changes in map view and get the first layer
     */
    mapViewWatchHandler(): Promise<void>;
    /**
     * watch for changes in layer view and verify if it has editing enabled
     */
    _layerWatchHandler(): Promise<void>;
    /**
     * watch for selection changes
     */
    selectedIdsWatchHandler(): Promise<void>;
    /**
     * Reset the filter
     */
    filterReset(): Promise<void>;
    /**
     * Updates the filter
     */
    filterUpdate(): Promise<void>;
    /**
     * Closes the filter
     */
    closeFilter(): Promise<void>;
    /**
     * refresh the feature table
     */
    refresh(): Promise<void>;
    /**
     * Emitted on demand when a layer is selected
     */
    featureSelectionChange: EventEmitter<number[]>;
    /**
     * Emitted on demand when filter action is clicked
     */
    toggleFilter: EventEmitter<void>;
    /**
     * Scroll and zoom to the selected feature from the Features widget.
     *
     * @param evt CustomEvent the graphic for the current selection
     */
    selectionChanged(evt: CustomEvent): Promise<void>;
    /**
     * Handles layer selection change to show new table
     *
     * @param evt CustomEvent the id for the current layer
     */
    layerSelectionChange(evt: CustomEvent): Promise<void>;
    /**
     * Refresh the table when edits are completed
     */
    editsComplete(evt: CustomEvent): Promise<void>;
    /**
     * Refresh the table when floor filter facility is changed
     */
    facilityChanged(evt: CustomEvent): Promise<void>;
    /**
     * Refresh the table when floor filter level is changed
     */
    levelChanged(evt: CustomEvent): Promise<void>;
    /**
     * Refresh the table when floor filter site is changed
     */
    siteChanged(evt: CustomEvent): Promise<void>;
    /**
     * Refresh the table when
     */
    noLayersFound(): void;
    /**
     * Clears the selection from table
     */
    clearSelection(): void;
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     *
     * @returns Promise when complete
     */
    componentWillLoad(): Promise<void>;
    /**
     * Renders the component.
     */
    render(): any;
    protected _deleteDialog: any;
    /**
     * Called once after the component is loaded
     */
    componentDidLoad(): Promise<void>;
    /**
     * Called after the component is rendered
     */
    componentDidRender(): void;
    /**
     * Load esri javascript api modules
     *
     * @returns Promise resolving when function is done
     *
     * @protected
     */
    protected _initModules(): Promise<void>;
    /**
     * Search using the fullTextSearch on layer and filter the table
     *
     * @param event The input change event
     */
    protected _searchTextChanged(event: any): Promise<void>;
    /**
     * Search using the fullTextSearch on layer and filter the table
     *
     */
    protected _searchFullText(): Promise<void>;
    /**
     * Clears the applied search expression on the layer
     *
     */
    protected _clearSearchDefinitionExpression(): void;
    /**
     * Update the search expression in layer
     * @param searchedIds Array of objectIds satisfying the full search text
     */
    protected _updateSearchDefinitionExpression(searchedIds: number[]): Promise<void>;
    /**
     * Validates if full text search is enabled and and indexes for fullTextSearch available on the layer
     */
    protected _canShowFullTextSearch(): boolean;
    /**
     * Create list of full text search info
     */
    protected _getFullTextSearchInfo(): void;
    /**
     * Update the toolbar when its size changes
     */
    protected _onResize(): void;
    /**
     * Gets a row of controls that can be used for various interactions with the table
     *
     * @param slot string optional slot to display the control within
     *
     * @returns The dom node that contains the controls
     */
    protected _getTableControlRow(slot?: string): VNode;
    /**
     * Gets a row of controls that can be used for various interactions with the table
     *
     * @param slot string optional slot to display the control within
     *
     * @returns The dom node that contains the controls
     */
    protected _getActionBar(): VNode;
    /**
     * Get the actions that are used for various interactions with the table
     *
     * @returns VNode[] the action nodes
     */
    protected _getActions(): VNode[];
    /**
     * Get the list of fields as dropdown items and store the current selected state so
     * we can show/hide the appropriate fields
     *
     * @returns Node with the fields as dropdown items
     */
    _getFieldlist(): VNode;
    /**
     * Update actions enabled prop based on number of selected indexes
     */
    _validateEnabledActions(): void;
    /**
     * Update actions active prop based on a stored value
     */
    _validateActiveActions(): void;
    /**
     * Get the full list of toolInfos.
     * Order is important. They should be listed in the order they should display in the UI from
     * Left to Right for the action bar and Top to Bottom for the dropdown.
     */
    protected _initToolInfos(): void;
    /**
     * Applies a definition expression when floor field and level are available
     *
     * @returns boolean
     */
    protected _updateFloorDefinitionExpression(): void;
    /**
     * Returns true when one ore more features are selected
     *
     * @returns boolean
     */
    protected _featuresSelected(): boolean;
    /**
     * Return true when we have no features
     *
     * @returns boolean
     */
    protected _featuresEmpty(): boolean;
    /**
     * Return true when we have at least 1 layer expression for the current layer
     *
     * @returns boolean
     */
    protected _hasFilterExpressions(): boolean;
    /**
     * Add/Remove tools from the action bar and dropdown based on available size
     */
    protected _updateToolbar(): void;
    /**
     * Validate if controls that fit the current display has changed or
     * is different from what is currently displayed
     */
    _setControlsThatFit(controlsThatFit: IToolSizeInfo[], skipControls: string[]): void;
    /**
     * Get the id and size for the toolbars current items
     */
    protected _setToolbarSizeInfos(): void;
    /**
     * Get a list of toolInfos that should display outside of the dropdown
     *
     * @returns IToolInfo[] the list of toolInfos that should not display in the overflow dropdown
     */
    protected _getActionItems(): IToolInfo[];
    /**
     * Get a list of toolInfos that should display in the dropdown
     *
     * @param id string the id for the dropdown and its tooltip
     *
     * @returns VNode the dropdown node
     */
    protected _getDropdown(id: string): VNode;
    /**
     * Get a list of toolInfos that should display in the dropdown
     *
     * @returns IToolInfo[] the list of toolInfos that should display in the dropdown
     */
    protected _getDropdownItems(): IToolInfo[];
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
    protected _getAction(active: boolean, icon: string, indicator: boolean, label: string, func: any, disabled: boolean, loading: boolean, slot?: string): VNode;
    /**
     * Show the delete dialog
     *
     * @param
     *
     */
    protected _showDelete(): void;
    /**
     * Get an action and tooltip for share
     *
     * @param icon string the name of the icon to display, will also be used in its id
     *
     * @returns VNode The node representing the DOM element that will contain the action
     */
    protected _getShare(icon: string): VNode;
    /**
     * Called each time the values that are used for custom url params change
     */
    _updateShareUrl(): void;
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
    protected _getToolTip(placement: TooltipPlacement, referenceElement: string, text: string): VNode;
    /**
     * Get an id with a prefix to the user supplied value
     *
     * @param id the unique value for the id
     *
     * @returns the new id with the prefix value
     */
    protected _getId(id: string): string;
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
    private _getDangerAction;
    /**
     * Return all currently selected IDs from the table
     *
     * @param number[] the selected ids
     */
    protected _getIds(): number[];
    /**
     * Store a reference to the table node after it's first created
     * and initializes the FeatureTable
     *
     * @param node HTMLDivElement The node representing the DOM element that will contain the widget.
     */
    private onTableNodeCreate;
    /**
     * Initialize the FeatureTable
     *
     * @param node HTMLDivElement The node representing the DOM element that will contain the widget.
     */
    protected _getTable(node: HTMLDivElement, columnTemplates?: __esri.FieldColumnTemplate[]): Promise<void>;
    protected _handleOnChange(evt: any): Promise<void>;
    /**
     * Handle any updates after a selection change has occured and emit the results
     */
    protected _finishOnChange(): void;
    /**
     * Reset the tables column templates when we get new column config
     */
    protected _resetColumnTemplates(): void;
    /**
     * Reset basic table props
     */
    protected _resetTable(): Promise<void>;
    /**
     * Finish the table loading tasks
     */
    protected finishLoading(): Promise<void>;
    /**
     * Update the current IDs when that layers data is modified
     */
    protected _initLayerRefresh(): Promise<void>;
    /**
     * Reset _allIds when the layers data has changed and refresh the selection ids and table
     */
    protected _updateAllIds(): Promise<void>;
    /**
     * Handle default OID or GlobalID from url parameters
     */
    protected _handleDefaults(): Promise<void>;
    /**
     * Store the column names and current hidden status to support show/hide of columns
     * @param fieldNames optional list of names from new config options
     */
    protected _initColumnsInfo(fieldNames?: string[]): void;
    /**
     * Select the feature that was specified via url params
     */
    protected _selectDefaultFeature(oids: number[]): Promise<void>;
    /**
     * Verify edit capabilities of the layer
     */
    protected _checkEditEnabled(): void;
    /**
     * Sort the table with the configured field and the sort order
     */
    protected _sortTable(): Promise<void>;
    /**
     * Open show/hide dropdown
     */
    protected _forceShowHide(): void;
    /**
     * Toggle show/hide dropdown
     */
    protected _toggleShowHide(): void;
    /**
     * Open show/hide dropdown
     */
    protected _closeShowHide(): void;
    /**
     * Close show/hide dropdown when the user clicks outside of it
     * @param e clicked event from mouse
     * @protected
     */
    protected _handleDocumentClick(e: MouseEvent): void;
    /**
     * Keep track of key down for ctrl and shift
     */
    protected _handleKeyDown(e: KeyboardEvent): void;
    /**
     * Keep track of key up for ctrl and shift
     */
    protected _handleKeyUp(e: KeyboardEvent): void;
    /**
     * Show filter component in modal
     *
     * @returns node to interact with any configured filters for the current layer
     * @protected
     */
    protected _filterModal(): VNode;
    /**
     * Reset the filter active prop
     * @protected
     */
    protected _handleFilterListReset(): Promise<void>;
    /**
     * Check if the layers definitionExpression has been modified
     * @protected
     */
    protected _handleFilterUpdate(): Promise<void>;
    /**
     * Close the filter modal
     * @protected
     */
    protected _closeFilter(): Promise<void>;
    /**
     * Handle map click events to keep table and map click selection in sync
     *
     * @param evt IMapClick map click event details
     * @protected
     */
    protected _mapClicked(evt: IMapClick): Promise<void>;
    /**
     * Select or deselect all rows
     * @protected
     */
    protected _selectAll(): void;
    /**
     * Toggle the show only selected flag
     *  When showOnly is true only the selected features will be shown in the table
     * @protected
     */
    protected _toggleShowSelected(): void;
    /**
     * Clears the selected indexes
     * @protected
     */
    protected _clearSelection(): void;
    /**
     * When true the filter modal will be displayed
     * @protected
     */
    protected _toggleFilter(): void;
    /**
     * Store any filters for the current layer.
     * Should only occur on layer change
     * @protected
     */
    protected _initLayerExpressions(): void;
    /**
     * Select all rows that are not currently selectd
     * @protected
     */
    protected _switchSelected(): void;
    /**
     * Export all selected rows as CSV
     *
     * @returns a promise that will resolve when the operation is complete
     * @protected
     */
    protected _exportToCSV(): Promise<void>;
    /**
     * Set the loading prop in the stored toolInfos
     * @protected
     */
    protected _updateToolInfoLoading(name: string, isLoading: boolean): void;
    /**
     * Refreshes the table and maintains the current scroll position
     * @protected
     */
    protected _refresh(): Promise<void>;
    /**
     * Zoom to all selected features
     *
     * @returns a promise that will resolve when the operation is complete
     * @protected
     */
    protected _zoom(): Promise<void>;
    /**
     * Handles layer selection change to show new table
     *
     * @param evt CustomEvent the id for the current layer
     *
     * @returns a promise that will resolve when the operation is complete
     * @protected
     */
    protected _layerSelectionChanged(evt: CustomEvent): Promise<void>;
    /**
     * Get any columnt templates for the current map
     *
     * @param id item ID of the current map
     *
     * @returns a list of column templates if they exist
     * @protected
     */
    protected _getColumnTemplates(id: string, fieldInfos: __esri.Field[]): __esri.FieldColumnTemplate[];
    private _sortFields;
    /**
     * Get the menu config that adds the ability to hide the current column
     * @protected
     */
    protected _getMenuConfig(name: string): any;
    /**
     * Hide the table column for the provided name
     * @protected
     */
    protected _handleHideClick(name: string): void;
    /**
     * Fetches the component's translations
     *
     * @returns Promise when complete
     * @protected
     */
    protected _getTranslations(): Promise<void>;
}
