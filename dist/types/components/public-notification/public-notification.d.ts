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
/// <reference types="arcgis-js-api" />
import NewPublicNotification_T9n from "../../assets/t9n/public-notification/resources.json";
import { EventEmitter, VNode } from "../../stencil-public-runtime";
import { DistanceUnit, EPageType, ISearchConfiguration, ISelectionSet } from "../../utils/interfaces";
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
   * esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
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
   * boolean: When true a map will be added on export
   */
  _addMap: boolean;
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
   * boolean: When true CSV export options will be shown and a CSV file will be exported if the Export button is clicked
   */
  _exportCSV: boolean;
  /**
   * boolean: When true PDF export options will be shown and a PDF file will be exported if the Export button is clicked
   */
  _exportPDF: boolean;
  /**
   * utils/interfaces/EPageType: LIST | SELECT | PDF | CSV
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
  protected _translations: typeof NewPublicNotification_T9n;
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
   * esri/symbols/support/jsonUtils: https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-support-jsonUtils.html
   */
  protected _jsonUtils: __esri.symbolsSupportJsonUtils;
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
   * Text to be used as title on PDF pages
   */
  protected _title: HTMLCalciteInputTextElement;
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
   * StencilJS: Called once just after the component is first connected to the DOM.
   */
  componentWillLoad(): Promise<void>;
  /**
   * Renders the component.
   */
  render(): void;
  /**
   * Load esri javascript api modules
   *
   * @returns Promise resolving when function is done
   *
   * @protected
   */
  protected _initModules(): Promise<void>;
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
   * Create the selection sets list node for the List page
   *
   * @returns selection sets list node
   * @protected
   */
  protected _getSelectionSetList(): VNode;
  /**
   * Check if any valid selection sets exist.
   *
   * @returns true if valid selection sets exist
   *
   * @protected
   */
  protected _hasSelections(): boolean;
  /**
   * Check if any duplicates exist
   *
   * @returns true if duplicates are found
   *
   * @protected
   */
  protected _hasDuplicates(): boolean;
  /**
   * Return the number of duplicates
   *
   * @param ids the list of currently selected ids
   *
   * @returns the number of duplicates
   *
   * @protected
   */
  protected _getNumDuplicates(ids: number[]): number;
  /**
   * Get the complete list of selected ids
   *
   * @returns all currently selected IDs
   *
   * @protected
   */
  protected _getSelectedIds(): number[];
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
   * Return the PDF portion of the export page
   *
   * @returns the node with all PDF export options
   *
   * @protected
   */
  protected _getPDFOptions(): VNode;
  /**
   * Return the CSV portion of the export page
   *
   * @returns the node with all CSV export options
   *
   * @protected
   */
  protected _getCSVOptions(): VNode;
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
   * Create an informational notice
   *
   * @param message the message to display in the notice
   * @param noticeClass any custom css for the notice (default is "padding-1")
   *
   * @returns the notice node
   * @protected
   */
  protected _getNotice(message: string, noticeClass?: string): VNode;
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
  protected _getSelectionLists(): VNode;
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
  protected _export(): void;
  /**
   * Download all selection sets as PDF
   *
   * @protected
   */
  protected _downloadPDF(): Promise<void>;
  /**
   * Download all selection sets as CSV
   *
   * @protected
   */
  protected _downloadCSV(): void;
  /**
   * Get all enabled selection sets
   *
   * @returns the selection sets
   * @protected
   */
  protected _getDownloadSelectionSets(): ISelectionSet[];
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
