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
import { DistanceUnit, EExportType, EPageType, IExportInfo, IExportInfos, ISearchConfiguration, ISelectionSet } from "../../utils/interfaces";
import NewPublicNotification_T9n from "../../assets/t9n/public-notification/resources.json";
export declare class PublicNotification {
    el: HTMLPublicNotificationElement;
    /**
     * string[]: List of layer ids that should be shown as potential addressee layers
     */
    addresseeLayerIds: string[];
    /**
     * string | number[] |  object with r, g, b, a: https://developers.arcgis.com/javascript/latest/api-reference/esri-Color.html
     */
    bufferColor: any;
    /**
     * string | number[] | object with r, g, b, a: https://developers.arcgis.com/javascript/latest/api-reference/esri-Color.html
     */
    bufferOutlineColor: any;
    /**
     * boolean: When true the user can define a name for each notification list
     */
    customLabelEnabled: boolean;
    /**
     * number: The default value to show for the buffer distance
     */
    defaultBufferDistance: number;
    /**
     * number: The default value to show for the buffer unit ("feet"|"meters"|"miles"|"kilometers")
     */
    defaultBufferUnit: DistanceUnit;
    /**
     * string: The default value to use for the export title
     */
    defaultExportTitle: string;
    /**
     * number: The default number of labels per page to export
     */
    defaultNumLabelsPerPage: number;
    /**
     * boolean: When true users will be allowed to optionally use features from a layer as the selection geometry
     */
    enableLayerFeatures: boolean;
    /**
     * boolean: When true users will be allowed to optionally create a buffer around the selection geometry
     */
    enableSearchDistance: boolean;
    /**
     * boolean: When true sketch tools will be provided to allow users to draw a selection geometry
     */
    enableSketchTools: boolean;
    /**
     * The effect that will be applied when featureHighlightEnabled is true
     *
     * esri/layers/support/FeatureEffect: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-support-FeatureEffect.html
     *
     */
    featureEffect: __esri.FeatureEffect;
    /**
     * boolean: When enabled features will be highlighted when their notification list item is clicked.
     */
    featureHighlightEnabled: boolean;
    /**
     * string: The current user locale.
     */
    locale: string;
    /**
     * esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
     */
    mapView: __esri.MapView;
    /**
     * string: The value to show for no results
     * when left empty the default text "0 selected features from {layerTitle}" will be shown
     */
    noResultText: string;
    /**
     * ISearchConfiguration: Configuration details for the Search widget
     */
    searchConfiguration: ISearchConfiguration;
    /**
     * string[]: List of layer ids that should be shown as potential selection layers
     * when skectching with "Use layer features" option
     */
    selectionLayerIds: string[];
    /**
     * boolean: When true the refine selection workflow will be included in the UI
     */
    showRefineSelection: boolean;
    /**
     * boolean: When false no buffer distance or unit controls will be exposed
     */
    showSearchSettings: boolean;
    /**
     * esri/symbols/SimpleLineSymbol | JSON representation : https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleLineSymbol.html
     *
     * A JSON representation of the instance in the ArcGIS format.
     * See the ArcGIS REST API documentation for examples of the structure of various input JSON objects.
     * https://developers.arcgis.com/documentation/common-data-types/symbol-objects.htm
     */
    sketchLineSymbol: __esri.SimpleLineSymbol | any;
    /**
     * esri/symbols/SimpleMarkerSymbol | JSON representation: https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleMarkerSymbol.html
     *
     * A JSON representation of the instance in the ArcGIS format.
     * See the ArcGIS REST API documentation for examples of the structure of various input JSON objects.
     * https://developers.arcgis.com/documentation/common-data-types/symbol-objects.htm
     */
    sketchPointSymbol: __esri.SimpleMarkerSymbol | any;
    /**
     * esri/symbols/SimpleFillSymbol | JSON representation: https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleFillSymbol.html
     *
     * A JSON representation of the instance in the ArcGIS format.
     * See the ArcGIS REST API documentation for examples of the structure of various input JSON objects.
     * https://developers.arcgis.com/documentation/common-data-types/symbol-objects.htm
     */
    sketchPolygonSymbol: __esri.SimpleFillSymbol | any;
    /**
     * boolean: When true a graphics will be added to the map on export
     */
    _exportGraphics: boolean;
    /**
     * boolean: When true a map will be added on export
     */
    _addMap: boolean;
    /**
     * boolean: When true the selected results will be added on export
     */
    _addResults: boolean;
    /**
     * boolean: When true a title will be added above the map on export
     */
    _addTitle: boolean;
    /**
     * boolean: Enabled when we have 1 or more selection sets that is enabled in the download pages.
     * By default all selection sets are enabled for download when they are first created.
     */
    _downloadActive: boolean;
    /**
     * utils/interfaces/EExportType: PDF or CSV
     */
    _exportType: EExportType;
    /**
     * boolean: Flag that will control a loading indicator on the export button
     */
    _fetchingData: boolean;
    /**
     * boolean: When window size is 600px or less this value will be true
     */
    _isMobile: boolean;
    /**
     * number: The number of duplicate labels from all selection sets
     */
    _numDuplicates: number;
    /**
     * utils/interfaces/EPageType: LIST | SELECT | EXPORT | REFINE
     */
    _pageType: EPageType;
    /**
     * boolean: Save is enabled when we have 1 or more selected features
     */
    _saveEnabled: boolean;
    /**
     * utils/interfaces/ISelectionSet: An array of user defined selection sets
     */
    _selectionSets: ISelectionSet[];
    /**
     * Contains the translations for this component.
     * All UI strings should be defined here.
     */
    _translations: typeof NewPublicNotification_T9n;
    /**
     * ISelectionSet: The current active selection set
     */
    protected _activeSelection: ISelectionSet;
    /**
     * HTMLPdfDownloadElement: The pdf tools element
     */
    protected _downloadTools: HTMLPdfDownloadElement;
    /**
     * esri/geometry/geometryEngine: https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-geometryEngine.html
     */
    protected _geometryEngine: __esri.geometryEngine;
    /**
     * esri/Graphic: https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html
     */
    protected Graphic: typeof import("esri/Graphic");
    /**
     * esri/symbols/support/jsonUtils: https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-support-jsonUtils.html
     */
    protected _jsonUtils: __esri.symbolsSupportJsonUtils;
    /**
     * string: The url to the onboarding image
     */
    protected _onboardingImageUrl: string;
    /**
     * HTMLCalciteCheckboxElement: When enabled popups will be shown on map click
     */
    protected _popupsEnabled: boolean;
    /**
     * HTMLCalciteCheckboxElement: The remove duplicates checkbox element for PDF downloads
     */
    protected _removeDuplicates: HTMLCalciteCheckboxElement;
    /**
     * ISearchConfiguration: Configuration details for the Search widget
     */
    protected _searchConfiguration: ISearchConfiguration;
    /**
     * HTMLMapSelectToolsElement: The select tools element
     */
    protected _selectTools: HTMLMapSelectToolsElement;
    /**
     * MediaQueryList: Information about the media query to know when we have went into mobile mode
     */
    protected _mediaQuery: MediaQueryList;
    /**
     * Component that contains the text to be used as the title for PDF pages
     */
    protected _titleElement: HTMLCalciteInputTextElement;
    /**
     * Text to be used as title on PDF pages
     */
    protected _titleValue: any;
    /**
     * number: The number of selected features
     */
    protected _numSelected: number;
    /**
     * Called each time the mapView prop is changed.
     */
    mapViewWatchHandler(v: __esri.MapView): Promise<void>;
    /**
     * Called each time the searchConfiguration prop is changed.
     *
     * @returns Promise when complete
     */
    watchSearchConfigurationHandler(newValue: ISearchConfiguration, oldValue: ISearchConfiguration): Promise<void>;
    /**
     * Called each time the sketchLineSymbol prop is changed.
     */
    sketchLineSymbolWatchHandler(v: __esri.SimpleLineSymbol | any, oldV: __esri.SimpleLineSymbol): Promise<void>;
    /**
     * Called each time the sketchPointSymbol prop is changed.
     */
    sketchPointSymbolWatchHandler(v: __esri.SimpleMarkerSymbol | any, oldV: __esri.SimpleMarkerSymbol): Promise<void>;
    /**
     * Called each time the sketchPolygonSymbol prop is changed.
     */
    sketchPolygonSymbolWatchHandler(v: __esri.SimpleFillSymbol | any, oldV: __esri.SimpleFillSymbol): Promise<void>;
    /**
     * Called each time the pageType prop is changed.
     */
    pageTypeWatchHandler(pageType: EPageType, oldPageType: EPageType): Promise<void>;
    /**
     * Emitted on demand when searchConfiguration gets a new value
     */
    searchConfigurationChange: EventEmitter<ISearchConfiguration>;
    /**
     * Handle changes to the selection sets
     */
    selectionSetsChanged(event: CustomEvent): void;
    /**
     * StencilJS: Called every time the component is connected to the DOM
     */
    connectedCallback(): void;
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     */
    componentWillLoad(): Promise<void>;
    /**
     * Renders the component.
     */
    render(): void;
    /**
     * StencilJS: Called once just after the component is first loaded.
     */
    componentDidLoad(): Promise<void>;
    /**
     * StencilJS: Called every time the component is disconnected from the DOM
     */
    disconnectedCallback(): void;
    /**
     * Load esri javascript api modules
     *
     * @returns Promise resolving when function is done
     *
     * @protected
     */
    protected _initModules(): Promise<void>;
    /**
     * Load the search configuration
     *
     * @returns Promise resolving when function is done
     *
     * @protected
     */
    protected _initSearchConfiguration(v: ISearchConfiguration): void;
    /**
     * Initialize the default symbols that will be used when creating new graphics
     *
     * @protected
     */
    protected _initSymbols(): void;
    /**
     * Convert a JSON representation of a line symbol and/or set the line symbol
     *
     * @param v SimpleLineSymbol or a JSON representation of a line symbol
     *
     * @protected
     */
    protected _setLineSymbol(v: __esri.SimpleLineSymbol | any): void;
    /**
     * Convert a JSON representation of a point symbol and/or set the point symbol
     *
     * @param v SimpleMarkerSymbol or a JSON representation of a point symbol
     *
     * @protected
     */
    protected _setPointSymbol(v: __esri.SimpleMarkerSymbol | any): void;
    /**
     * Convert a JSON representation of a polygon symbol and/or set the polygon symbol
     *
     * @param v SimpleFillSymbol or a JSON representation of a polygon symbol
     *
     * @protected
     */
    protected _setPolygonSymbol(v: __esri.SimpleFillSymbol | any): void;
    /**
     * Set _isMobile to true when the view is 600px or less
     *
     * @param evt event from media query
     *
     * @protected
     */
    protected _setIsMobile(evt: MediaQueryListEvent): void;
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
    protected _getActionGroup(icon: string, pageType: EPageType, tip: string): VNode;
    /**
     * Navigate to the defined page type
     *
     * @param pageType what page type will the action navigate to
     *
     * @protected
     */
    protected _setPageType(pageType: EPageType): void;
    /**
     * Navigate to the defined page type
     *
     * @param pageType what page type will the action navigate to
     *
     * @returns the page node
     * @protected
     */
    _getPage(pageType: EPageType): VNode;
    /**
     * Create the List page that shows as the initial home screen
     * This page is also used to show and selection sets that have been created
     *
     * @returns the page node
     * @protected
     */
    protected _getListPage(): VNode;
    /**
     * Display an image to help illustrate the basic workflow of the widget
     *
     * @returns the image node to display
     * @protected
     */
    protected _getOnboardingImage(): VNode;
    /**
     * Create the selection sets list node for the List page
     *
     * @returns selection sets list node
     * @protected
     */
    protected _getSelectionSetList(): VNode;
    /**
     * Get the ids for a given selection set
     * For most sets this will be selectedIds
     * For the Refine set we are only concerned with IDs from ADD operations on any of the layers
     *
     * @returns an array of the IDs
     *
     * @protected
     */
    protected _getSelectionSetIds(selectionSet: ISelectionSet): number[];
    /**
     * Check if any valid selection sets exist.
     *
     * @returns true if valid selection sets exist
     *
     * @protected
     */
    protected _hasSelections(validateRefineSet?: boolean): boolean;
    /**
     * Check if any duplicate labels exist
     *
     * @returns true if duplicates are found
     *
     * @protected
     */
    protected _getNumDuplicates(): Promise<number>;
    /**
     * Get key details about what to export
     *
     * @returns IExportInfos that contain ids and layer
     *
     * @protected
     */
    protected _getExportInfos(): IExportInfos;
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
    protected _updateIds(id: string, layerView: __esri.FeatureLayerView, ids: number[], obj: any): IExportInfo;
    /**
     * Create the Select page that shows the selection workflows
     *
     * @returns the page node
     * @protected
     */
    protected _getSelectPage(): VNode;
    /**
     * Create the main download page that has the shared aspects of both PDF and CSV
     * But only show the current PDF or CSV page content
     *
     * @returns the page node
     * @protected
     */
    protected _getExportPage(): VNode;
    /**
     * Store the user selected export type CSV || PDF
     *
     * @protected
     */
    protected _exportTypeChange(evt: CustomEvent): void;
    /**
     * Render the export options to the user
     *
     * @protected
     */
    protected _getExportOptions(): VNode;
    /**
     * Toggle the _addMap state variable and update the graphics on the map
     *
     * @protected
     */
    protected _handleAddMapChange(): void;
    /**
     * Toggle the _exportGraphics state variable and update the graphics on the map
     *
     * @protected
     */
    protected _handleExportGraphicsChange(): void;
    /**
     * Get the "sketch" or "buffer" graphics layer
     *
     * @param type The type of managed layer to fetch "sketch" | "buffer"
     *
     * @protected
     */
    protected _getManagedLayer(type: "sketch" | "buffer"): __esri.GraphicsLayer;
    /**
     * Update the export graphics by adding or removeing them
     *
     * @param clear When true the graphics layers will be cleared prior to adding any new graphics, defaults to false
     *
     * @protected
     */
    protected _updateExportGraphics(clear?: boolean): void;
    /**
     * Remove all buffer and sketch graphics
     *
     * @protected
     */
    _removeExportGraphics(): void;
    /**
     * Add all buffer and sketch graphics that are flagged for download
     *
     * @protected
     */
    protected _addExportGraphics(): void;
    /**
     * Render the refine page
     *
     * @protected
     */
    protected _getRefinePage(): VNode;
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
    protected _getPageNavButtons(topLabel: string, topDisabled: boolean, topFunc: () => void, bottomLabel: string, bottomDisabled: boolean, bottomFunc: () => void): VNode;
    /**
     * Store the user defined title value
     */
    protected _changeTitle(): void;
    /**
     * Create an informational notice
     *
     * @param message the message to display in the notice
     * @param noticeClass any custom css for the notice (default is "padding-1")
     *
     * @returns the notice node
     * @protected
     */
    protected _getNotice(message: string, noticeClass?: string, messageClass?: string): VNode;
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
    protected _getLabel(label: string, disableSpacing?: boolean, labelClass?: string): VNode;
    /**
     * Get selection set list node with checkbox for Download pages
     *
     * @returns the list node
     * @protectedlabel
     */
    protected _getExportSelectionLists(): VNode;
    /**
     * Toggle the disabled state for the download options based on user selection
     *
     * @param id the selection set id to toggle
     *
     * @protected
     */
    protected _toggleDownload(id: number): Promise<void>;
    /**
     * Download all selection sets as PDF or CSV or alert the user that they need to choose at least 1 export format
     *
     * @protected
     */
    protected _export(): Promise<void>;
    /**
    * Sort selection sets by layer and retain key export details
    *
    * @param selectionSets selection sets to evaluate
    *
    * @returns key export details from the selection sets
    * @protected
    */
    protected _getSelectionIdsAndViews(selectionSets: ISelectionSet[], downloadSetsOnly?: boolean): IExportInfos;
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
    protected _updateExportInfos(exportInfos: IExportInfos, id: string, label: string, newIds: number[], layerView: __esri.FeatureLayerView): IExportInfos;
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
    protected _getAction(enabled: boolean, icon: string, text: string, onClick: any, indicator?: boolean, slot?: string): VNode;
    /**
     * Store the number of selected features and if it's more than one enable save
     *
     * @returns the page node
     * @protected
     */
    protected _updateForSelection(evt: CustomEvent): void;
    /**
     * Clear the selection and navigate to the home page
     *
     * @returns Promise when the function has completed
     * @protected
     */
    protected _home(): Promise<void>;
    /**
     * Update the selection sets with any new selections from the select tools
     *
     * @returns Promise when the function has completed
     * @protected
     */
    protected _saveSelection(): Promise<void>;
    /**
     * Clear any selections
     *
     * @returns Promise when the function has completed
     * @protected
     */
    protected _clearSelection(): Promise<void>;
    /**
     * Delete the selection at the defined index
     *
     * @param index number that defines what selection set to delete
     *
     * @protected
     */
    protected _deleteSelection(index: number, evt: CustomEvent): Promise<void>;
    /**
     * Pan to the current selection
     *
     * @param selSet ISelectionSet to pan to
     * @param mapView Current MapView to pan within
     *
     * @protected
     */
    protected _gotoSelection(selSet: ISelectionSet, mapView: __esri.MapView): void;
    /**
     * Open the selection set for further adjustment
     *
     * @protected
     */
    protected _openSelection(selectionSet: ISelectionSet, evt: CustomEvent): void;
    /**
     * Highlight any selected features in the map
     *
     * @protected
     */
    protected _highlightFeatures(): Promise<void>;
    /**
     * Clear any highlighted features in the map
     *
     * @protected
     */
    protected _checkPopups(): void;
    /**
     * Clear any highlighted features in the map
     *
     * @protected
     */
    protected _clearHighlight(): void;
    /**
     * Fetches the component's translations
     *
     * @protected
     */
    protected _getTranslations(): Promise<void>;
}
