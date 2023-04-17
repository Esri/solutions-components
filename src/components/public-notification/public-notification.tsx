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

import { Component, Element, Event, EventEmitter, Host, h, Listen, Prop, State, VNode, Watch } from "@stencil/core";
import { DistanceUnit, EPageType, ESketchType, EWorkflowType, ISearchConfiguration, ISelectionSet } from "../../utils/interfaces";
import { loadModules } from "../../utils/loadModules";
import { goToSelection, getMapLayerView, highlightFeatures } from "../../utils/mapViewUtils";
import { getSelectionSetQuery } from "../../utils/queryUtils";
import state from "../../utils/publicNotificationStore";
import NewPublicNotification_T9n from "../../assets/t9n/public-notification/resources.json";
import { getComponentClosestLanguage, getLocaleComponentStrings } from "../../utils/locale";
import * as utils from "../../utils/publicNotificationUtils";

@Component({
  tag: "public-notification",
  styleUrl: "public-notification.css",
  shadow: false,
})
export class PublicNotification {
  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLPublicNotificationElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * string[]: List of layer ids that should be shown as potential addressee layers
   */
  @Prop() addresseeLayerIds: string[] = [];

  /**
   * string | number[] |  object with r, g, b, a: https://developers.arcgis.com/javascript/latest/api-reference/esri-Color.html
   */
  @Prop() bufferColor: any = [227, 139, 79, 0.8];

  /**
   * string | number[] | object with r, g, b, a: https://developers.arcgis.com/javascript/latest/api-reference/esri-Color.html
   */
  @Prop() bufferOutlineColor: any = [255, 255, 255];

  /**
   * boolean: When true the user can define a name for each notification list
   */
  @Prop() customLabelEnabled: boolean;

  /**
   * number: The default value to show for the buffer distance
   */
  @Prop() defaultBufferDistance: number;

  /**
   * number: The default value to show for the buffer unit ("feet"|"meters"|"miles"|"kilometers")
   */
  @Prop() defaultBufferUnit: DistanceUnit;

  /**
   * The effect that will be applied when featureHighlightEnabled is true
   *
   * esri/layers/support/FeatureEffect: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-support-FeatureEffect.html
   *
   */
  @Prop() featureEffect: __esri.FeatureEffect;

  /**
   * boolean: When enabled features will be highlighted when their notification list item is clicked.
   */
  @Prop() featureHighlightEnabled: boolean;

  /**
   * esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  @Prop() mapView: __esri.MapView;

  /**
   * string: The value to show for no results
   * when left empty the default text "0 selected features from {layerTitle}" will be shown
   */
  @Prop() noResultText: string;

  /**
   * ISearchConfiguration: Configuration details for the Search widget
   */
  @Prop({mutable: true}) searchConfiguration: ISearchConfiguration;

  /**
   * string[]: List of layer ids that should be shown as potential selection layers
   * when skectching with "Use layer features" option
   */
  @Prop() selectionLayerIds: string[] = [];

  /**
   * boolean: When false no buffer distance or unit controls will be exposed
   */
  @Prop() showSearchSettings = true;

  /**
   * esri/symbols/SimpleLineSymbol | JSON representation : https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleLineSymbol.html
   *
   * A JSON representation of the instance in the ArcGIS format.
   * See the ArcGIS REST API documentation for examples of the structure of various input JSON objects.
   * https://developers.arcgis.com/documentation/common-data-types/symbol-objects.htm
   */
  @Prop() sketchLineSymbol: __esri.SimpleLineSymbol | any;

  /**
   * esri/symbols/SimpleMarkerSymbol | JSON representation: https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleMarkerSymbol.html
   *
   * A JSON representation of the instance in the ArcGIS format.
   * See the ArcGIS REST API documentation for examples of the structure of various input JSON objects.
   * https://developers.arcgis.com/documentation/common-data-types/symbol-objects.htm
   */
  @Prop() sketchPointSymbol: __esri.SimpleMarkerSymbol | any;

  /**
   * esri/symbols/SimpleFillSymbol | JSON representation: https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleFillSymbol.html
   *
   * A JSON representation of the instance in the ArcGIS format.
   * See the ArcGIS REST API documentation for examples of the structure of various input JSON objects.
   * https://developers.arcgis.com/documentation/common-data-types/symbol-objects.htm
   */
  @Prop() sketchPolygonSymbol: __esri.SimpleFillSymbol | any;

  //--------------------------------------------------------------------------
  //
  //  State (internal)
  //
  //--------------------------------------------------------------------------

  /**
   * esri/views/layers/FeatureLayerView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html
   */
  @State() addresseeLayer: __esri.FeatureLayerView;

  /**
   * boolean: When true a title will be added above the map on export
   */
  @State() _addTitle = false;

  /**
   * boolean: Enabled when we have 1 or more selection sets that is enabled in the download pages.
   * By default all selection sets are enabled for download when they are first created.
   */
  @State() _downloadActive = true;

  /**
   * boolean: When true CSV export options will be shown and a CSV file will be exported if the Export button is clicked
   */
  @State() _exportCSV = false;

  /**
   * boolean: When true PDF export options will be shown and a PDF file will be exported if the Export button is clicked
   */
  @State() _exportPDF = true;

  /**
   * number: The number of selected features
   */
  @State() _numSelected = 0;

  /**
   * utils/interfaces/EPageType: LIST | SELECT | PDF | CSV
   */
  @State() _pageType: EPageType = EPageType.LIST;

  /**
   * boolean: Save is enabled when we have 1 or more selected features
   */
  @State() _saveEnabled = false;

  /**
   * boolean: When true a loading indicator will be shown in place of the number of selected features
   */
  @State() _selectionLoading = false;

  /**
   * utils/interfaces/ISelectionSet: An array of user defined selection sets
   */
  @State() _selectionSets: ISelectionSet[] = [];

  /**
   * ESketchType: The current type of sketch
   * used to control information messages.
   */
  @State() _sketchType: ESketchType = ESketchType.INTERACTIVE;

  /**
   * utils/interfaces/EWorkflowType: SEARCH | SELECT | SKETCH
   */
  @State() _selectionWorkflowType = EWorkflowType.SEARCH;

  /**
   * boolean: When true a modal will be shown to alert users of potential changes to selection sets.
   */
  @State() _showLayerSelectionChangeModal = false;

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() protected _translations: typeof NewPublicNotification_T9n;

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

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
   * boolean: When true a image of the current map will be included in the PDF if the Export button is clicked
   */
  protected _includeMap = false;

  /**
   * esri/symbols/support/jsonUtils: https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-support-jsonUtils.html
   */
  protected _jsonUtils: __esri.symbolsSupportJsonUtils;

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
   * HTMLCalciteCheckboxElement: The remove duplicates checkbox element for CSV downloads
   */
  protected _removeDuplicatesCSV: HTMLCalciteCheckboxElement;

  /**
   * HTMLCalciteCheckboxElement: The remove duplicates checkbox element for PDF downloads
   */
  protected _removeDuplicatesPDF: HTMLCalciteCheckboxElement;

  /**
   * ISearchConfiguration: Configuration details for the Search widget
   */
  protected _searchConfiguration: ISearchConfiguration;

  /**
   * HTMLMapSelectToolsElement: The select tools element
   */
  protected _selectTools: HTMLMapSelectToolsElement;

  /**
   * string: The current buffer unit
   */
  protected _unit: string;

  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------

  /**
   * Called each time the mapView prop is changed.
   */
  @Watch("mapView")
  async mapViewWatchHandler(
    v: __esri.MapView
  ): Promise<void> {
    if (v?.popup) {
      this._popupsEnabled = v?.popup.autoOpenEnabled;
    }
  }

  /**
   * Called each time the searchConfiguration prop is changed.
   *
   * @returns Promise when complete
   */
  @Watch("searchConfiguration")
  async watchSearchConfigurationHandler(
    newValue: ISearchConfiguration,
    oldValue: ISearchConfiguration
  ): Promise<void> {
    const s_newValue = JSON.stringify(newValue);
    if (s_newValue !== JSON.stringify(oldValue)) {
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
  @Watch("sketchLineSymbol")
  async sketchLineSymbolWatchHandler(
    v: __esri.SimpleLineSymbol | any,
    oldV: __esri.SimpleLineSymbol
  ): Promise<void> {
    if (v && JSON.stringify(v) !== JSON.stringify(oldV)) {
      this._setLineSymbol(v);
    }
  }

  /**
   * Called each time the sketchPointSymbol prop is changed.
   */
  @Watch("sketchPointSymbol")
  async sketchPointSymbolWatchHandler(
    v: __esri.SimpleMarkerSymbol | any,
    oldV: __esri.SimpleMarkerSymbol
  ): Promise<void> {
    if (v && JSON.stringify(v) !== JSON.stringify(oldV)) {
      this._setPointSymbol(v);
    }
  }

  /**
   * Called each time the sketchPolygonSymbol prop is changed.
   */
  @Watch("sketchPolygonSymbol")
  async sketchPolygonSymbolWatchHandler(
    v: __esri.SimpleFillSymbol | any,
    oldV: __esri.SimpleFillSymbol
  ): Promise<void> {
    if (v && JSON.stringify(v) !== JSON.stringify(oldV)) {
      this._setPolygonSymbol(v);
    }
  }

  /**
   * Called each time the pageType prop is changed.
   */
  @Watch("_pageType")
  async pageTypeWatchHandler(
    pageType: EPageType,
    oldPageType: EPageType
  ): Promise<void> {
    this._checkPopups();
    this._clearHighlight();

    if (oldPageType === EPageType.SELECT) {
      // clear any draw shapes or buffers
      await this._clearSelection()
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
   * Emitted on demand when a buffer is generated.
   */
  @Event() labelChange: EventEmitter<string>;

  /**
   * Emitted on demand when searchConfiguration gets a new value
   */
  @Event() searchConfigurationChange: EventEmitter<ISearchConfiguration>;

  /**
   * Handle changes to the buffer distance value
   */
  @Listen("distanceChanged", { target: "window" })
  distanceChanged(event: CustomEvent): void {
    this._updateLabel(event, "distance");
    this._distance = event.detail.newValue;
  }

  /**
   * Handle changes when selection is loading
   */
  @Listen("selectionLoadingChange", { target: "window" })
  selectionLoadingChange(event: CustomEvent): void {
    this._selectionLoading = event.detail;
  }

  /**
   * Handle changes to the selection sets
   */
  @Listen("selectionSetsChanged", { target: "window" })
  selectionSetsChanged(event: CustomEvent): void {
    this._selectionSets = [...event.detail];
  }

  /**
   * Handle changes to the selection sets
   */
  @Listen("sketchTypeChange", { target: "window" })
  sketchTypeChange(event: CustomEvent): void {
    this._sketchType = event.detail;
  }

  /**
   * Handle changes to the buffer unit
   */
  @Listen("unitChanged", { target: "window" })
  unitChanged(event: CustomEvent): void {
    this._updateLabel(event, "unit");
    this._unit = event.detail.newValue;
  }

  //--------------------------------------------------------------------------
  //
  //  Functions (lifecycle)
  //
  //--------------------------------------------------------------------------

  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   */
  async componentWillLoad(): Promise<void> {
    await this._getTranslations();
    await this._initModules();
    this._initSymbols();
  }

  /**
   * Renders the component.
   */
  render(): void {
    return (
      <Host>
        <calcite-shell>
          <calcite-action-bar class="border-bottom-1 action-bar-size" expand-disabled layout="horizontal" slot="header">
            {this._getActionGroup("list-check", EPageType.LIST, this._translations.myLists)}
            {this._getActionGroup("export", EPageType.EXPORT, this._translations.export)}
          </calcite-action-bar>
          {this._getPage(this._pageType)}
        </calcite-shell>
      </Host>
    );
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
  protected async _initModules(): Promise<void> {
    const [geometryEngine, jsonUtils]: [
      __esri.geometryEngine,
      __esri.symbolsSupportJsonUtils
    ] = await loadModules([
      "esri/geometry/geometryEngine",
      "esri/symbols/support/jsonUtils"
    ]);
    this._geometryEngine = geometryEngine;
    this._jsonUtils = jsonUtils;
  }

  /**
   * Initialize the default symbols that will be used when creating new graphics
   *
   * @protected
   */
  protected _initSymbols(): void {
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
  protected _setLineSymbol(
    v: __esri.SimpleLineSymbol | any
  ): void {
    const isSymbol = v?.type === 'simple-line';
    this.sketchLineSymbol = isSymbol ? v : this._jsonUtils.fromJSON(v ? v : {
      "type": "esriSLS",
      "color": [130, 130, 130, 255],
      "width": 2,
      "style": "esriSLSSolid"
    }) as __esri.SimpleLineSymbol;
  }

  /**
   * Convert a JSON representation of a point symbol and/or set the point symbol
   *
   * @param v SimpleMarkerSymbol or a JSON representation of a point symbol
   *
   * @protected
   */
  protected _setPointSymbol(
    v: __esri.SimpleMarkerSymbol | any
  ): void {
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
    }) as __esri.SimpleMarkerSymbol;
  }

  /**
   * Convert a JSON representation of a polygon symbol and/or set the polygon symbol
   *
   * @param v SimpleFillSymbol or a JSON representation of a polygon symbol
   *
   * @protected
   */
  protected _setPolygonSymbol(
    v: __esri.SimpleFillSymbol | any
  ): void {
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
    }) as __esri.SimpleFillSymbol;
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
  protected _getActionGroup(
    icon: string,
    pageType: EPageType,
    tip: string
  ): VNode {
    return (
      <calcite-action-group class="action-center w-1-2" layout="horizontal">
        <calcite-action
          active={this._pageType === pageType}
          alignment="center"
          class="width-full height-full"
          compact={false}
          icon={icon}
          id={icon}
          onClick={() => { this._setPageType(pageType) }}
          text=""
        />
        <calcite-tooltip label="" placement="bottom" reference-element={icon}>
          <span>{tip}</span>
        </calcite-tooltip>
      </calcite-action-group>
    );
  }

  /**
   * Navigate to the defined page type
   *
   * @param pageType what page type will the action navigate to
   *
   * @protected
   */
  protected _setPageType(
    pageType: EPageType
  ): void {
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
  _getPage(
    pageType: EPageType
  ): VNode {
    let page: VNode;
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
  protected _getListPage(): VNode {
    const hasSets = this._hasSelections();
    const total = utils.getTotal(this._selectionSets);
    return hasSets ? (
      <calcite-panel>
        {this._getLabel(this._translations.myLists)}
        {this._getNotice(this._translations.listHasSetsTip, "padding-sides-1 padding-bottom-1")}
        {this._getMapLayerPicker()}
        <div class="display-block padding-sides-1 height-1-1-2">
          <div class="display-block float-left">
            <calcite-label alignment="start" class="font-bold">{this._translations.notifications}</calcite-label>
          </div>
          <div class="display-block float-right">
            <calcite-input-message class="info-blue margin-top-0" scale="m">{this._translations.uniqueCout.replace("{{n}}", total.toString())}</calcite-input-message>
          </div>
        </div>
        {
          hasSets ? this._getSelectionSetList() : (
            <div class="info-message">
              <calcite-input-message class="info-blue" scale="m">{this._translations.noNotifications}</calcite-input-message>
            </div>
          )
        }
        <div class="display-flex padding-1">
          <calcite-button onClick={() => { this._setPageType(EPageType.SELECT) }} width="full">{this._translations.add}</calcite-button>
        </div>
        {this._showModal(this._showLayerSelectionChangeModal)}
      </calcite-panel>
    ) : (
      <calcite-panel>
        <div class="padding-top-sides-1">
          <calcite-label class="font-bold">{this._translations.myLists}</calcite-label>
        </div>
        <div class="padding-sides-1">
          <calcite-label>{this._translations.notifications}</calcite-label>
        </div>
        <div class="info-message padding-bottom-1">
          <calcite-input-message class="info-blue" scale="m">{this._translations.noNotifications}</calcite-input-message>
        </div>
        {this._getNotice(this._translations.selectLayerAndAdd, "padding-sides-1 padding-bottom-1")}
        {this._getMapLayerPicker()}
        <div class="display-flex padding-1">
          <calcite-button onClick={() => { this._setPageType(EPageType.SELECT) }} width="full">{this._translations.add}</calcite-button>
        </div>
      </calcite-panel>
    );
  }

  /**
   * Create the UI element that will expose the addressee layers
   *
   * @returns addressee layer list node
   * @protected
   */
  protected _getMapLayerPicker(): VNode {
    return (
      <div class="display-flex padding-sides-1">
        <calcite-label class="font-bold width-full">{this._translations.addresseeLayer}
          <map-layer-picker
            enabledLayerIds={this.addresseeLayerIds}
            mapView={this.mapView}
            onLayerSelectionChange={(evt) => this._layerSelectionChange(evt)}
            selectedLayerIds={this.addresseeLayer ? [this.addresseeLayer?.layer.id] : []}
            selectionMode={"single"}
          />
        </calcite-label>
      </div>
    );
  }

  /**
   * Create the selection sets list node for the List page
   *
   * @returns selection sets list node
   * @protected
   */
  protected _getSelectionSetList(): VNode {
    return (
      <calcite-list class="list-border margin-sides-1">
        {
          this._selectionSets.reduce((prev, cur, i) => {
            prev.push((
              <calcite-list-item
                description={this._translations.selectedFeatures.replace("{{n}}", cur.selectedIds.length.toString())}
                label={cur.label}
                onClick={() => this._gotoSelection(cur, this.mapView)}
              >
                {this._getAction(true, "pencil", "", (evt): void => this._openSelection(cur, evt), false, "actions-end")}
                {this._getAction(true, "x", "", (evt): Promise<void> => this._deleteSelection(i, evt), false, "actions-end")}
              </calcite-list-item>
            ));
            return prev;
          }, [])
        }
      </calcite-list>
    );
  }

  /**
   * Alert the user of the potential change to the selection sets and ask if they would like to proceed.
   *
   * @returns the page node
   * @protected
   */
  protected _showModal(
    open: boolean
  ): VNode {
    return (
      <calcite-modal
        aria-labelledby="modal-title"
        background-color="grey"
        color="red"
        open={open}
        scale="s"
        width="s"
      >
        <div id="modal-title" slot="header">{this._translations.shouldProceed}</div>
        <div slot="content">{this._translations.proceedInfo}</div>
        <calcite-button
          appearance="outline"
          onClick={() => this._cancelLayerChange()}
          slot="secondary"
          width="full"
        >
          {this._translations.cancel}
        </calcite-button>
        <calcite-button
          onClick={() => this._handleLayerChange()}
          slot="primary"
          width="full"
        >
          {this._translations.proceed}
        </calcite-button>
      </calcite-modal>
    )
  }

  /**
   * Prevent the default behavior of layer selection change and close the modal.
   *
   * @returns the page node
   * @protected
   */
  protected _cancelLayerChange(): void {
    this._layerSelectionChangeEvt.preventDefault();
    this._layerSelectionChangeEvt.stopPropagation();
    this._layerSelectionChangeEvt = undefined;
    this._showLayerSelectionChangeModal = false;
  }

  /**
   * Allow the default behavior of layer selection change and close the modal.
   *
   * @returns the page node
   * @protected
   */
  protected _handleLayerChange(): void {
    this._showLayerSelectionChangeModal = false;
    const id: string = this._layerSelectionChangeEvt?.detail?.length > 0 ?
      this._layerSelectionChangeEvt.detail[0] : "";
    void this._updateAddresseeLayer(id);
  }

  /**
   * Check if any valid selection sets exist.
   *
   * @returns true if valid selection sets exist
   *
   * @protected
   */
  protected _hasSelections(): boolean {
    return this._selectionSets.length > 0;
  }

  /**
   * Check if any duplicates exist
   *
   * @returns true if duplicates are found
   *
   * @protected
   */
  protected _hasDuplicates(): boolean {
    const selectedIds = this._getSelectedIds();
    return this._getNumDuplicates(selectedIds) > 0;
  }

  /**
   * Return the number of duplicates
   *
   * @param ids the list of currently selected ids
   *
   * @returns the number of duplicates
   *
   * @protected
   */
  protected _getNumDuplicates(
    ids: number[]
  ): number {
    return ids.length - new Set(ids).size;
  }

  /**
   * Get the complete list of selected ids
   *
   * @returns all currently selected IDs
   *
   * @protected
   */
  protected _getSelectedIds(): number[] {
    return this._selectionSets.reduce((prev, cur) => {
      return prev.concat(cur.download ? cur.selectedIds : [])
    }, []);
  }

  /**
   * Create the Select page that shows the selection workflows
   *
   * @returns the page node
   * @protected
   */
  protected _getSelectPage(): VNode {
    const searchTip = this._translations.selectSearchTip;
    const selectTip = this._translations.selectLayerTip;
    const sketchTip = this._sketchType === ESketchType.INTERACTIVE ?
      this._translations.selectSketchTip :
      this._translations.selectLayerTip;

    const noticeText = this._selectionWorkflowType === EWorkflowType.SELECT ? selectTip :
      this._selectionWorkflowType === EWorkflowType.SKETCH ? sketchTip : searchTip;

    const nameLabelClass = this.customLabelEnabled ? "" : "display-none";

    // TODO find out if ... is appropriate for other languages
    const locale = getComponentClosestLanguage(this.el);
    const selectionLoading = locale && locale === "en" ?
      `${this._translations.selectionLoading}...` : this._translations.selectionLoading;

    return (
      <calcite-panel>
        {this._getLabel(this._translations.stepTwoFull.replace("{{layer}}", this.addresseeLayer?.layer.title))}
        {this._getNotice(noticeText)}
        <div class={"padding-top-sides-1"}>
          <map-select-tools
            bufferColor={this.bufferColor}
            bufferOutlineColor={this.bufferOutlineColor}
            class="font-bold"
            defaultBufferDistance={this.defaultBufferDistance}
            defaultBufferUnit={this.defaultBufferUnit}
            enabledLayerIds={this.selectionLayerIds}
            isUpdate={!!this._activeSelection}
            mapView={this.mapView}
            onSelectionSetChange={(evt) => this._updateForSelection(evt)}
            onWorkflowTypeChange={(evt) => this._updateForWorkflowType(evt)}
            ref={(el) => { this._selectTools = el }}
            searchConfiguration={this._searchConfiguration}
            selectLayerView={this.addresseeLayer}
            selectionSet={this._activeSelection}
            showBufferTools={this.showSearchSettings}
            sketchLineSymbol={this.sketchLineSymbol}
            sketchPointSymbol={this.sketchPointSymbol}
            sketchPolygonSymbol={this.sketchPolygonSymbol}
          />
        </div>
        <div class="padding-sides-1 padding-bottom-1" style={{ "align-items": "end", "display": "flex" }}>
          {
            this._selectionLoading ? (
              <div>
                <calcite-loader class="info-blue" inline={true} label={selectionLoading} scale="m" type="indeterminate" />
              </div>
            ) : (
              <calcite-icon class="info-blue padding-end-1-2" icon="feature-layer" scale="s" />
            )
          }
          <calcite-input-message class="info-blue" scale="m">
            {
              this._selectionLoading ? selectionLoading :
                this.noResultText && this._numSelected === 0 ? this.noResultText :
                  this._translations.selectedAddresses.replace(
                    "{{n}}", this._numSelected.toString()).replace("{{layer}}", this.addresseeLayer?.layer.title || ""
                    )
            }
          </calcite-input-message>
        </div>
        <div class={"padding-sides-1 " + nameLabelClass}>
          <calcite-label
            class="font-bold"
          >
            {"List name"}
            <calcite-input
              onInput={() => {
                this.labelChange.emit(this._labelName.value);
              }}
              placeholder="Insert label here..."
              ref={(el) => { this._labelName = el }}
              value={this._customLabel || ""}
            />
          </calcite-label>
        </div>
        {
          this._getPageNavButtons(
            this._translations.done,
            this._numSelected === 0,
            (): void => { void this._saveSelection() },
            this._translations.cancel,
            false,
            (): void => { void this._home() }
          )
        }
      </calcite-panel>
    );
  }

  /**
   * Create the main download page that has the shared aspects of both PDF and CSV
   * But only show the current PDF or CSV page content
   *
   * @returns the page node
   * @protected
   */
  protected _getExportPage(): VNode {
    const hasSelections = this._hasSelections();
    const numDuplicates = this._getNumDuplicates(this._getSelectedIds());
    return (
      <calcite-panel>
        <div>
          {this._getLabel(this._translations.export, true)}
          {
            hasSelections ? (
              <div>
                {this._getNotice(this._translations.exportTip, "padding-top-sides-1")}
                {this._getLabel(this._translations.myLists)}
                {this._getSelectionLists()}
                <div class="padding-sides-1">
                  <calcite-label layout="inline">
                    <calcite-checkbox
                      ref={(el) => { this._removeDuplicatesPDF = el }}
                    />
                    <div class="display-flex">
                      {this._translations.removeDuplicate}
                      <div class="info-message padding-start-1-2">
                        <calcite-input-message class="info-blue margin-top-0" scale="m">
                          {` ${this._translations.numDuplicates.replace("{{n}}", numDuplicates.toString())}`}
                        </calcite-input-message>
                      </div>
                    </div>
                  </calcite-label>
                </div>
                <div class="border-bottom" />
                {this._getPDFOptions()}
                <div class="border-bottom" />
                {this._getCSVOptions()}
                <div class="padding-1 display-flex">
                  <calcite-button
                    disabled={!this._downloadActive}
                    onClick={() => this._export()}
                    width="full"
                  >
                    {this._translations.export}
                  </calcite-button>
                </div>
              </div>
            ) : (
              this._getNotice(this._translations.downloadNoLists, "padding-sides-1 padding-bottom-1")
            )
          }
        </div>
      </calcite-panel>
    );
  }

  /**
   * Return the PDF portion of the export page
   *
   * @returns the node with all PDF export options
   *
   * @protected
   */
  protected _getPDFOptions(): VNode {
    const pdfOptionsClass = this._exportPDF ? "display-block" : "display-none";
    const titleOptionsClass = this._addTitle ? "display-block" : "display-none";
    return (
      <div>
        {this._getLabel(this._translations.pdf, true)}
        <div class="padding-1 display-flex">
          <calcite-label
            class="label-margin-0 "
          >
            {this._translations.exportPDF}
          </calcite-label>
          <calcite-switch
            checked={this._exportPDF}
            class="position-right"
            onCalciteSwitchChange={() => this._exportPDF = !this._exportPDF}
          />
        </div>
        <div class={pdfOptionsClass}>
          <div class={"padding-sides-1"}>
            <calcite-label
              class="label-margin-0"
            >
              {this._translations.selectPDFLabelOption}
            </calcite-label>
          </div>
          <div class="padding-sides-1">
            <pdf-download
              disabled={!this._downloadActive}
              layerView={this.addresseeLayer}
              ref={(el) => { this._downloadTools = el }}
            />
          </div>
          <div class="padding-top-sides-1">
            <calcite-label
              class="label-margin-0"
              layout="inline"
            >
              <calcite-checkbox
                checked={this._addTitle}
                onCalciteCheckboxChange={() => this._addTitle = !this._addTitle}
              />
              {this._translations.addTitle}
            </calcite-label>
          </div>
          <div
            class={titleOptionsClass}
          >
            {this._getLabel(this._translations.title, true, "")}
            <calcite-input-text
              class="padding-sides-1"
              placeholder={this._translations.titlePlaceholder}
            />
          </div>
          <div class="padding-top-sides-1">
            <calcite-label layout="inline">
              <calcite-checkbox
                onCalciteCheckboxChange={() => this._includeMap = !this._includeMap}
              />
              {this._translations.includeMap}
            </calcite-label>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Return the CSV portion of the export page
   *
   * @returns the node with all CSV export options
   *
   * @protected
   */
  protected _getCSVOptions(): VNode {
    return (
      <div>
        <div class="padding-top-sides-1">
          <calcite-label class="font-bold">
            {this._translations.csv}
          </calcite-label>
        </div>
        <div class="padding-sides-1 display-flex">
          <calcite-label>
            {this._translations.exportCSV}
          </calcite-label>
          <calcite-switch
            checked={this._exportCSV}
            class="position-right"
            onCalciteSwitchChange={() => this._exportCSV = !this._exportCSV}
          />
        </div>
      </div>
    );
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
  protected _getPageNavButtons(
    topLabel: string,
    topDisabled: boolean,
    topFunc: () => void,
    bottomLabel: string,
    bottomDisabled: boolean,
    bottomFunc: () => void
  ): VNode {
    return (
      <div>
        <div class="display-flex padding-top-sides-1">
          <calcite-button
            disabled={topDisabled}
            onClick={topFunc}
            width="full"
          >
            {topLabel}
          </calcite-button>
        </div>
        <div class="display-flex padding-top-1-2 padding-sides-1">
          <calcite-button
            appearance="outline"
            disabled={bottomDisabled}
            onClick={bottomFunc}
            width="full"
          >
            {bottomLabel}
          </calcite-button>
        </div>
      </div>
    )
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
  protected _getNotice(
    message: string,
    noticeClass = "padding-1"
  ): VNode {
    return (
      <calcite-notice class={noticeClass} icon="lightbulb" kind="success" open={true}>
        <div slot="message">{message}</div>
      </calcite-notice>
    );
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
  protected _getLabel(
    label: string,
    disableSpacing = false,
    labelClass = "font-bold"
  ): VNode {
    labelClass += disableSpacing ? " label-margin-0" : "";
    return (
      <div class={"padding-top-sides-1"}>
        <calcite-label
          class={labelClass}
        >
          {label}
        </calcite-label>
      </div>
    );
  }

  /**
   * Get selection set list node with checkbox for Download pages
   *
   * @returns the list node
   * @protectedlabel
   */
  protected _getSelectionLists(): VNode {
    return this._selectionSets.reduce((prev, cur) => {
      if (!this._downloadActive && cur.download) {
        this._downloadActive = true;
      }
      prev.push((
        <div class="display-flex padding-sides-1 padding-bottom-1">
          <calcite-checkbox checked={cur.download} class="align-center" onClick={() => { void this._toggleDownload(cur.id) }} />
          <calcite-list class="list-border margin-start-1-2 width-full" id="download-list">
            <calcite-list-item
              description={this._translations.selectedFeatures.replace("{{n}}", cur.selectedIds.length.toString())}
              disabled={!cur.download}
              label={cur.label}
              onClick={() => { void this._toggleDownload(cur.id) }}
            />
          </calcite-list>
        </div>
      ));
      return prev;
    }, []) || (<div />);
  }

  /**
   * Toggle the disabled state for the download options based on user selection
   *
   * @param id the selection set id to toggle
   *
   * @protected
   */
  protected async _toggleDownload(
    id: number
  ): Promise<void> {
    let isActive = false;
    this._selectionSets = this._selectionSets.map(ss => {
      ss.download = ss.id === id ? !ss.download : ss.download;
      isActive = ss.download ? true : isActive;
      return ss;
    });
    this._downloadActive = isActive;
    await this._highlightFeatures();
  }

  /**
   * Download all selection sets as PDF or CSV or alert the user that they need to choose at least 1 export format
   *
   * @protected
   */
  protected _export(): void {
    if (this._exportPDF) {
      this._downloadPDF();
    }
    if (this._exportCSV) {
      this._downloadCSV();
    }
    if (!this._exportPDF && !this._exportCSV) {
      // TODO show a message saying they need to enable at least one of the options
    }
  }

  /**
   * Download all selection sets as PDF
   *
   * @protected
   */
  protected _downloadPDF(): void {
    const ids = utils.getSelectionIds(this._getDownloadSelectionSets());
    const selectionSetNames = this._selectionSets.map(set => set.label);
    void this._downloadTools.downloadPDF(selectionSetNames, ids, this._removeDuplicatesPDF.checked);
  }

  /**
   * Download all selection sets as CSV
   *
   * @protected
   */
  protected _downloadCSV(): void {
    const ids = utils.getSelectionIds(this._getDownloadSelectionSets());
    const selectionSetNames = this._selectionSets.map(set => set.label);
    void this._downloadTools.downloadCSV(selectionSetNames, ids, this._removeDuplicatesCSV.checked);
  }

  /**
   * Get all enabled selection sets
   *
   * @returns the selection sets
   * @protected
   */
  protected _getDownloadSelectionSets(): ISelectionSet[] {
    return this._selectionSets.filter(ss => {
      return ss.download;
    });
  }

  /**
   * Update custom label UI with buffer values
   *
   * @protected
   */
  protected _updateLabel(
    evt: CustomEvent,
    type: "unit" | "distance"
  ): void {
    if (this._customLabel) {
      const oldV = type === "unit" ? `${this._distance} ${evt.detail.oldValue}` : `${evt.detail.oldValue} ${this._unit}`;
      const newV = type === "unit" ? `${this._distance} ${evt.detail.newValue}` : `${evt.detail.newValue} ${this._unit}`;
      this._customLabel = this._customLabel.replace(oldV, newV);
      this._labelName.value = this._customLabel;
      this.labelChange.emit(this._labelName.value);
    }
  }

  /**
   * Store the current workflow type
   *
   * @protected
   */
  protected _updateForWorkflowType(
    evt: CustomEvent
  ): void {
    this._selectionWorkflowType = evt.detail;
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
  protected _getAction(
    enabled: boolean,
    icon: string,
    text: string,
    onClick: any,
    indicator = false,
    slot = ""
  ): VNode {
    return (
      <calcite-action
        disabled={!enabled}
        icon={icon}
        indicator={indicator}
        onClick={onClick}
        slot={slot}
        text={text} />
    );
  }

  /**
   * Store the number of selected features and if it's more than one enable save
   *
   * @returns the page node
   * @protected
   */
  protected _updateForSelection(evt: CustomEvent): void {
    this._numSelected = evt.detail;
    this._saveEnabled = this._numSelected > 0;
  }

  /**
   * Clear the selection and navigate to the home page
   *
   * @returns Promise when the function has completed
   * @protected
   */
  protected async _home(): Promise<void> {
    await this._clearSelection();
    if (typeof this._popupsEnabled === 'boolean' && this.mapView.popup) {
      this.mapView.popup.autoOpenEnabled = this._popupsEnabled;
    }
    this._setPageType(EPageType.LIST);
  }

  /**
   * Fetch the addressee layer from the map if no selection sets exist.
   * Alert the user of the potential change to the selection sets if they exist.
   *
   * @param evt layer selection change event
   *
   * @returns Promise when the function has completed
   * @protected
   */
  protected async _layerSelectionChange(
    evt: CustomEvent
  ): Promise<void> {
    const id: string = evt?.detail?.length > 0 ? evt.detail[0] : "";
    if (id !== this.addresseeLayer?.layer.id) {
      this._showLayerSelectionChangeModal = this.addresseeLayer?.layer.id !== undefined && this._selectionSets.length > 0;
      if (this._showLayerSelectionChangeModal) {
        this._layerSelectionChangeEvt = evt;
      } else {
        await this._updateAddresseeLayer(id);
      }
    }
  }

  /**
   * Fetch the new addressee layer and update the selection sets
   *
   * @param id the id of the layer to fetch
   *
   * @returns Promise when the function has completed
   * @protected
   */
  protected async _updateAddresseeLayer(
    id: string
  ): Promise<void> {
    this.addresseeLayer = await getMapLayerView(this.mapView, id);
    await this._updateSelectionSets(this.addresseeLayer);
  }

  /**
   * Update selection sets when the addressee layer changes.
   * Will use stored search, select, and sketch geometries and any buffers to select from the new addressee layer.
   *
   * @param layerView The new addressee layer view to select from
   *
   * @returns Promise when the function has completed
   * @protected
   */
  protected async _updateSelectionSets(
    layerView: __esri.FeatureLayerView
  ): Promise<void> {
    const _selectionSets = this._selectionSets;
    const oidDefs = [];
    _selectionSets.forEach(selectionSet => {
      selectionSet.layerView = layerView;
      selectionSet.selectedIds = [];
      oidDefs.push(getSelectionSetQuery(selectionSet, this._geometryEngine));
    });

    return Promise.all(oidDefs).then(async (results): Promise<void> => {
      results.forEach((result, i) => {
        _selectionSets[i].selectedIds = result;
      });
      await this._highlightFeatures();
      this._selectionSets = [
        ..._selectionSets
      ];
    });
  }

  /**
   * Update the selection sets with any new selections from the select tools
   *
   * @returns Promise when the function has completed
   * @protected
   */
  protected async _saveSelection(): Promise<void> {
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
  protected async _clearSelection(): Promise<void> {
    await this._selectTools?.clearSelection();
    this._numSelected = 0;
    this._activeSelection = undefined;
    this._customLabel = undefined;
    this._distance = undefined;
    this._unit = undefined;
  }

  /**
   * Delete the selection at the defined index
   *
   * @param index number that defines what selection set to delete
   *
   * @protected
   */
  protected _deleteSelection(
    index: number,
    evt: CustomEvent
  ): Promise<void> {
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
  protected _gotoSelection(
    selSet: ISelectionSet,
    mapView: __esri.MapView
  ): void {
    void goToSelection(
      selSet.selectedIds,
      selSet.layerView,
      mapView,
      this.featureHighlightEnabled,
      this.featureEffect
    );
  }

  /**
   * Open the selection set for further adjustment
   *
   * @protected
   */
  protected _openSelection(
    selectionSet: ISelectionSet,
    evt: CustomEvent
  ): void {
    evt.stopPropagation();
    this._activeSelection = selectionSet;
    this._distance = this._activeSelection.distance;
    this._unit = this._activeSelection.unit;
    this._customLabel = this._activeSelection.label;
    this._pageType = EPageType.SELECT;
  }

  /**
   * Highlight any selected features in the map
   *
   * @protected
   */
  protected async _highlightFeatures(): Promise<void> {
    this._clearHighlight();
    const ids = utils.getSelectionIds(this._selectionSets);
    if (ids.length > 0) {
      state.highlightHandle = await highlightFeatures(
        ids,
        this.addresseeLayer,
        this.mapView
      );
    }
  }

  /**
   * Clear any highlighted features in the map
   *
   * @protected
   */
  protected _checkPopups(): void {
    if (typeof this._popupsEnabled !== 'boolean') {
      this._popupsEnabled = this.mapView?.popup.autoOpenEnabled;
    }
  }

  /**
   * Clear any highlighted features in the map
   *
   * @protected
   */
  protected _clearHighlight(): void {
    if (state && state.highlightHandle) {
      state.highlightHandle?.remove();
    }
  }

  /**
   * Fetches the component's translations
   *
   * @protected
   */
  protected async _getTranslations(): Promise<void> {
    const translations = await getLocaleComponentStrings(this.el);
    this._translations = translations[0] as typeof NewPublicNotification_T9n;
  }
}
