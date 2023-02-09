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
import { DistanceUnit, EExportType, EPageType, ESketchType, EWorkflowType, ISearchConfiguration, ISelectionSet } from "../../utils/interfaces";
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
   * boolean: When true the refine selection workflow will be included in the UI
   */
  showRefineSelection: boolean;
  /**
   * boolean: When false no buffer distance or unit controls will be exposed
   */
  showSearchSettings: boolean;
  /**
   * esri/views/layers/FeatureLayerView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html
   */
  addresseeLayer: __esri.FeatureLayerView;
  /**
   * boolean: Enabled when we have 1 or more selection sets that is enabled in the download pages.
   * By default all selection sets are enabled for download when they are first created.
   */
  _downloadActive: boolean;
  /**
   * number: The number of selected features
   */
  _numSelected: number;
  /**
   * utils/interfaces/EPageType: LIST | SELECT | REFINE | PDF | CSV
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
   * ESketchType: The current type of sketch
   * used to control information messages.
   */
  _sketchType: ESketchType;
  /**
   * utils/interfaces/EWorkflowType: SEARCH | SELECT | SKETCH
   */
  _selectionWorkflowType: EWorkflowType;
  /**
   * boolean: When true a modal will be shown to alert users of potential changes to selection sets.
   */
  _showLayerSelectionChangeModal: boolean;
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
   * string: The current custom label
   */
  protected _customLabel: string;
  /**
   * number: The current buffer distance
   */
  protected _distance: number;
  /**
   * HTMLPdfDownloadElement: The pdf tools element
   */
  protected _downloadTools: HTMLPdfDownloadElement;
  /**
   * esri/geometry/geometryEngine: https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-geometryEngine.html
   */
  protected _geometryEngine: __esri.geometryEngine;
  /**
   * CustomEvent: Used to prevent default behavior of layer selection change
   */
  protected _labelName: HTMLCalciteInputElement;
  /**
   * CustomEvent: Used to prevent default behavior of layer selection change
   */
  protected _layerSelectionChangeEvt: CustomEvent;
  /**
   * HTMLCalciteCheckboxElement: When enabled popups will be shown on map click
   */
  protected _popupsEnabled: boolean;
  /**
   * HTMLCalciteCheckboxElement: The remove duplicates checkbox element
   */
  protected _removeDuplicates: HTMLCalciteCheckboxElement;
  /**
   * HTMLMapSelectToolsElement: The select tools element
   */
  protected _selectTools: HTMLMapSelectToolsElement;
  /**
   * string: The current buffer unit
   */
  protected _unit: string;
  /**
   * Called each time the mapView prop is changed.
   */
  mapViewWatchHandler(v: __esri.MapView): Promise<void>;
  /**
   * Called each time the selectionSets prop is changed.
   */
  selectionSetsWatchHandler(v: ISelectionSet[], oldV: ISelectionSet[]): Promise<void>;
  /**
   * Called each time the pageType prop is changed.
   */
  pageTypeWatchHandler(pageType: EPageType, oldPageType: EPageType): Promise<void>;
  /**
   * Emitted on demand when a buffer is generated.
   */
  labelChange: EventEmitter<string>;
  /**
   * Handle changes to the buffer distance value
   */
  distanceChanged(event: CustomEvent): void;
  /**
   * Handle changes to the selection sets
   */
  selectionSetsChanged(event: CustomEvent): void;
  /**
   * Handle changes to the selection sets
   */
  sketchTypeChange(event: CustomEvent): void;
  /**
   * Handle changes to the buffer unit
   */
  unitChanged(event: CustomEvent): void;
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
   * Get a calcite action group for the current action
   *
   * @param icon the icon to display for the current action
   * @param disabled should the action be disabled
   * @param pageType what page type will the action navigate to
   * @param tip information tip to display helpful details to end user
   *
   * @protected
   */
  protected _getActionGroup(icon: string, disabled: boolean, pageType: EPageType, tip: string): VNode;
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
   * Create the UI element that will expose the addressee layers
   *
   * @returns addressee layer list node
   * @protected
   */
  protected _getMapLayerPicker(): VNode;
  /**
   * Create the selection sets list node for the List page
   *
   * @returns selection sets list node
   * @protected
   */
  protected _getSelectionSetList(): VNode;
  /**
   * Alert the user of the potential change to the selection sets and ask if they would like to proceed.
   *
   * @returns the page node
   * @protected
   */
  protected _showModal(open: boolean): VNode;
  /**
   * Prevent the default behavior of layer selection change and close the modal.
   *
   * @returns the page node
   * @protected
   */
  protected _cancelLayerChange(): void;
  /**
   * Allow the default behavior of layer selection change and close the modal.
   *
   * @returns the page node
   * @protected
   */
  protected _handleLayerChange(): Promise<void>;
  /**
   * Create the Select page that shows the selection workflows
   *
   * @returns the page node
   * @protected
   */
  protected _getSelectPage(): VNode;
  /**
   * Create the Refine page that users can interactively add/remove features from existing selection sets
   *
   * @returns the page node
   * @protected
   */
  protected _getRefinePage(): VNode;
  /**
   * Create the PDF download page that shows the download options
   *
   * @returns the page node
   * @protected
   */
  protected _getPDFPage(): VNode;
  /**
   * Create the CSV download page that shows the download options
   *
   * @returns the page node
   * @protected
   */
  protected _getCSVPage(): VNode;
  /**
   * Create the main download page that has the shared aspects of both PDF and CSV
   * But only show the current PDF or CSV page content
   *
   * @param type EExportType of the current type expected
   *
   * @returns the page node
   * @protected
   */
  protected _getDownloadPage(type: EExportType): VNode;
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
   *
   * @returns the label node
   * @protected
   */
  protected _getLabel(label: string, disableSpacing?: boolean): VNode;
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
   * Download all selection sets as PDF
   *
   * @protected
   */
  protected _downloadPDF(): void;
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
   * Update custom label UI with buffer values
   *
   * @protected
   */
  protected _updateLabel(evt: CustomEvent, type: "unit" | "distance"): void;
  /**
   * Store the current workflow type
   *
   * @protected
   */
  protected _updateForWorkflowType(evt: CustomEvent): void;
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
   * Fetch the addressee layer from the map if no selection sets exist.
   * Alert the user of the potential change to the selection sets if they exist.
   *
   * @param evt layer selection change event
   *
   * @returns Promise when the function has completed
   * @protected
   */
  protected _layerSelectionChange(evt: CustomEvent): Promise<void>;
  /**
   * Fetch the new addressee layer and update the selection sets
   *
   * @param id the id of the layer to fetch
   *
   * @returns Promise when the function has completed
   * @protected
   */
  protected _updateAddresseeLayer(id: string): Promise<void>;
  /**
   * Update selection sets when the addressee layer changes.
   * Will remove any "refine" selection set.
   * Will use stored search, select, and sketch geometries and any buffers to select from the new addressee layer.
   *
   * @param layerView The new addressee layer view to select from
   *
   * @returns Promise when the function has completed
   * @protected
   */
  protected _updateSelectionSets(layerView: __esri.FeatureLayerView): Promise<void>;
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
