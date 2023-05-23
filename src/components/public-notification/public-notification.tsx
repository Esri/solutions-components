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
import { DistanceUnit, EExportType, EPageType, EWorkflowType, IExportInfo, IExportInfos, IRefineIds, ISearchConfiguration, ISelectionSet } from "../../utils/interfaces";
import { loadModules } from "../../utils/loadModules";
import { goToSelection, highlightFeatures } from "../../utils/mapViewUtils";
import state from "../../utils/publicNotificationStore";
import NewPublicNotification_T9n from "../../assets/t9n/public-notification/resources.json";
import { getLocaleComponentStrings } from "../../utils/locale";
import { consolidateLabels, removeDuplicateLabels } from "../../utils/downloadUtils";
import { getAssetPath } from "@stencil/core";

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
  @Prop({ mutable: true }) searchConfiguration: ISearchConfiguration;

  /**
   * string[]: List of layer ids that should be shown as potential selection layers
   * when skectching with "Use layer features" option
   */
  @Prop() selectionLayerIds: string[] = [];

  /**
   * boolean: When true the refine selection workflow will be included in the UI
   */
  @Prop() showRefineSelection = false;

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
   * boolean: When true a map will be added on export
   */
  @State() _addMap = false;

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
   * utils/interfaces/EExportType: PDF or CSV
   */
  @State() _exportType: EExportType = EExportType.PDF;

  /**
   * boolean: When window size is 600px or less this value will be true
   */
  @State() _isMobile: boolean;

  /**
   * number: The number of duplicate labels from all selection sets
   */
  @State() _numDuplicates = 0;

  /**
   * utils/interfaces/EPageType: LIST | SELECT | EXPORT | REFINE
   */
  @State() _pageType: EPageType = EPageType.LIST;

  /**
   * boolean: Save is enabled when we have 1 or more selected features
   */
  @State() _saveEnabled = false;

  /**
   * utils/interfaces/ISelectionSet: An array of user defined selection sets
   */
  @State() _selectionSets: ISelectionSet[] = [];

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() _translations: typeof NewPublicNotification_T9n;

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
   * string: The url to the onboarding image
   */
  protected _onboardingImageUrl = "";

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
   * Text to be used as title on PDF pages
   */
  protected _title: HTMLCalciteInputTextElement;

  /**
   * number: The number of selected features
   */
  protected _numSelected = 0;

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

    if (this.mapView?.popup) {
      this.mapView.popup.autoOpenEnabled = pageType !== EPageType.LIST ? false : this._popupsEnabled;
    }

    if (pageType === EPageType.EXPORT) {
      this._numDuplicates = await this._getNumDuplicates();
    }

    this._clearHighlight();

    if (oldPageType === EPageType.SELECT || oldPageType === EPageType.REFINE) {
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
   * Emitted on demand when searchConfiguration gets a new value
   */
  @Event() searchConfigurationChange: EventEmitter<ISearchConfiguration>;

  /**
   * Handle changes to the selection sets
   */
  @Listen("selectionSetsChanged", { target: "window" })
  selectionSetsChanged(event: CustomEvent): void {
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
  connectedCallback(): void {
    this._mediaQuery = window.matchMedia("(max-width: 600px)");
    this._mediaQuery.addEventListener("change", (evt) => this._setIsMobile(evt));
  }

  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   */
  async componentWillLoad(): Promise<void> {
    await this._getTranslations();
    await this._initModules();
    this._initSymbols();
    this._onboardingImageUrl = getAssetPath(`../assets/data/images/onboarding.png`);
  }

  /**
   * Renders the component.
   */
  render(): void {
    const headerSlot = this._isMobile ? "footer" : "header";
    return (
      <Host>
        <calcite-shell>
          <calcite-action-bar class="border-bottom-1 action-bar-size" expand-disabled layout="horizontal" slot={headerSlot}>
            {this._getActionGroup("list-check", EPageType.LIST, this._translations.myLists)}
            {this.showRefineSelection ? this._getActionGroup("test-data", EPageType.REFINE, this._translations.refineSelection) : null}
            {this._getActionGroup("export", EPageType.EXPORT, this._translations.export)}
          </calcite-action-bar>
          {this._getPage(this._pageType)}
        </calcite-shell>
      </Host>
    );
  }

  /**
   * StencilJS: Called every time the component is disconnected from the DOM
   */
  disconnectedCallback(): void {
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
   * Set _isMobile to true when the view is 600px or less
   *
   * @param evt event from media query
   *
   * @protected
   */
  protected _setIsMobile(
    evt: MediaQueryListEvent
  ): void {
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
  protected _getActionGroup(
    icon: string,
    pageType: EPageType,
    tip: string
  ): VNode {
    const sizeClass = this.showRefineSelection ? " w-1-3" : " w-1-2";
    return (
      <calcite-action-group class={"action-center" + sizeClass} layout="horizontal">
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
  protected _getListPage(): VNode {
    const hasSets = this._hasSelections();
    return (
      <calcite-panel>
        {this._getLabel(this._translations.myLists)}
        {this._getNotice(hasSets ? this._translations.listHasSetsTip : this._translations.selectLayerAndAdd, "padding-sides-1 padding-bottom-1")}
        {hasSets ? this._getSelectionSetList() : (this._getOnboardingImage())}
        <div class="display-flex padding-1">
          <calcite-button onClick={() => { this._setPageType(EPageType.SELECT) }} width="full">{this._translations.add}</calcite-button>
        </div>
      </calcite-panel>
    );
  }

  /**
   * Display an image to help illustrate the basic workflow of the widget
   *
   * @returns the image node to display
   * @protected
   */
  protected _getOnboardingImage(): VNode {
    return (
      <div class="display-flex padding-sides-1">
        <img class="img-container" src={this._onboardingImageUrl} />
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
      <div class="padding-top-1-2 padding-bottom-1-2">
        <calcite-list class="list-border margin-sides-1">
          {
            this._selectionSets.reduce((prev, cur, i) => {
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
                prev.push((
                  <calcite-list-item
                    label={cur.label}
                    onClick={() => this._gotoSelection(cur, this.mapView)}
                  >
                    <div slot="content">
                      <div class="list-label">{cur.label}</div>
                      <div class="list-description">{cur?.layerView?.layer.title}</div>
                      <div class="list-description">{this._translations.selectedFeatures.replace("{{n}}", ids.length.toString())}</div>
                    </div>
                    {this._getAction(true, "pencil", "", (evt): void => this._openSelection(cur, evt), false, "actions-end")}
                    {this._getAction(true, "x", "", (evt): Promise<void> => this._deleteSelection(i, evt), false, "actions-end")}
                  </calcite-list-item>
                ));
              }
              return prev;
            }, [])
          }
        </calcite-list>
      </div>
    );
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
  protected _getSelectionSetIds(
    selectionSet: ISelectionSet
  ): number [] {
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
  protected _hasSelections(
    validateRefineSet = false
  ): boolean {
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
  protected async _getNumDuplicates(): Promise<number> {
    const exportInfos: IExportInfos = this._getExportInfos();
    const labels = await consolidateLabels(exportInfos);
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
  protected _getExportInfos(): IExportInfos {
    return this._selectionSets.reduce((prev, cur) => {
      if (cur.download) {
        if (cur.workflowType !== EWorkflowType.REFINE) {
          const id = cur.layerView.layer.id;
          this._updateIds(id, cur.layerView, cur.selectedIds, prev);
        } else {
          // REFINE stores ids differently as it can contain ids from multiple layers
          // REFINE will only ever be 1 ISelectionSet
          Object.keys(cur.refineInfos).forEach(k => {
            const refineIds: IRefineIds = cur.refineInfos[k];
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
  protected _updateIds(
    id: string,
    layerView: __esri.FeatureLayerView,
    ids: number[],
    obj: any
  ): IExportInfo {
    if (obj[id]) {
      obj[id].ids = obj[id].ids.concat(ids);
    } else {
      obj[id] = {
        layerView,
        ids
      }
    }
    return obj;
  }

  /**
   * Create the Select page that shows the selection workflows
   *
   * @returns the page node
   * @protected
   */
  protected _getSelectPage(): VNode {
    const noticeText = this._translations.selectSearchTip;
    return (
      <calcite-panel>
        {this._getLabel(this._translations.stepTwoFull, true)}
        {this._getNotice(noticeText)}
        <div>
          <map-select-tools
            bufferColor={this.bufferColor}
            bufferOutlineColor={this.bufferOutlineColor}
            class="font-bold"
            customLabelEnabled={this.customLabelEnabled}
            defaultBufferDistance={this.defaultBufferDistance}
            defaultBufferUnit={this.defaultBufferUnit}
            enabledLayerIds={this.addresseeLayerIds}
            isUpdate={!!this._activeSelection}
            mapView={this.mapView}
            noResultText={this.noResultText}
            onSelectionSetChange={(evt) => this._updateForSelection(evt)}
            ref={(el) => { this._selectTools = el }}
            searchConfiguration={this._searchConfiguration}
            selectionLayerIds={this.selectionLayerIds}
            selectionSet={this._activeSelection}
            sketchLineSymbol={this.sketchLineSymbol}
            sketchPointSymbol={this.sketchPointSymbol}
            sketchPolygonSymbol={this.sketchPolygonSymbol}
          />
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
    const hasSelections = this._hasSelections(this.showRefineSelection);
    const displayDuplicatesClass = this._numDuplicates > 0 ? "display-block" : "display-none";
    return (
      <calcite-panel>
        <div>
          {this._getLabel(this._translations.export, false)}
          {
            hasSelections ? (
              <div>
                {this._getNotice(this._translations.exportTip, "padding-sides-1")}
                {this._getLabel(this._translations.exportListsLabel)}
                {this._getExportSelectionLists()}
                <div class={"padding-sides-1 " + displayDuplicatesClass}>
                  <div class="display-flex">
                    <calcite-label layout="inline">
                      <calcite-checkbox
                        ref={(el) => { this._removeDuplicates = el }}
                      />
                      <div class="display-flex">
                        {this._translations.removeDuplicate}
                        <div class="info-message padding-start-1-2">
                          <calcite-input-message class="info-blue margin-top-0" scale="m">
                            {` ${this._translations.numDuplicates.replace("{{n}}", this._numDuplicates.toString())}`}
                          </calcite-input-message>
                        </div>
                      </div>
                    </calcite-label>
                    <calcite-icon
                      class="padding-start-1-2 icon"
                      icon="question"
                      id="remove-duplicates-icon"
                      scale="s"
                    />
                  </div>
                  <calcite-popover
                    closable={true}
                    label=""
                    referenceElement="remove-duplicates-icon"
                  >
                    <span class="tooltip-message">{this._translations.duplicatesTip}</span>
                  </calcite-popover>
                </div>

                <div class="border-bottom" />
                <div class="padding-top-sides-1">
                  <calcite-segmented-control
                    class="w-100"
                    onCalciteSegmentedControlChange={(evt) => this._exportTypeChange(evt)}
                  >
                    <calcite-segmented-control-item
                      checked={this._exportType === EExportType.PDF}
                      class="w-50 end-border"
                      value={EExportType.PDF}
                    >
                      {this._translations.pdf}

                    </calcite-segmented-control-item>
                    <calcite-segmented-control-item
                      checked={this._exportType === EExportType.CSV}
                      class="w-50"
                      value={EExportType.CSV}
                    >
                      {this._translations.csv}
                    </calcite-segmented-control-item>
                  </calcite-segmented-control>
                </div>
                <div class="padding-bottom-1">
                  {this._getExportOptions()}
                </div>
                <div class="padding-1 display-flex">
                  <calcite-button
                    disabled={!this._downloadActive}
                    onClick={() => void this._export()}
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
   * Store the user selected export type CSV || PDF
   *
   * @protected
   */
  protected _exportTypeChange(
    evt: CustomEvent
  ): void {
    this._exportType = (evt.target as HTMLCalciteSegmentedControlItemElement).value as EExportType;
  }

  /**
   * Render the export options to the user
   *
   * @protected
   */
  protected _getExportOptions(): VNode {
    const displayClass = this._exportType === EExportType.PDF ? "display-block" : "display-none";
    const titleOptionsClass = this._addTitle ? "display-block" : "display-none";
    return (
      <div class={displayClass}>
        {this._getLabel(this._translations.pdfOptions, true)}
        <div class="padding-top-sides-1">
          <calcite-label
            class="label-margin-0"
          >
            {this._translations.selectPDFLabelOption}
          </calcite-label>
        </div>
        <div class="padding-sides-1">
          <pdf-download
            disabled={!this._downloadActive}
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
        <div class={titleOptionsClass}>
          {this._getLabel(this._translations.title, true, "")}
          <calcite-input-text
            class="padding-sides-1"
            placeholder={this._translations.titlePlaceholder}
            ref={(el) => { this._title = el }}
          />
        </div>

        <div class="padding-top-sides-1">
          <calcite-label class="label-margin-0" layout="inline">
            <calcite-checkbox
              checked={this._addMap}
              onCalciteCheckboxChange={() => this._addMap = !this._addMap}
            />
            {this._translations.includeMap}
          </calcite-label>
        </div>
      </div>
    );
  }

  /**
   * Render the refine page
   *
   * @protected
   */
  protected _getRefinePage(): VNode {
    const hasSelections = this._hasSelections();
    return (
      <calcite-panel>
        {this._getLabel(this._translations.refineSelection)}
        {
          hasSelections ? (
            <div>
              {this._getNotice(this._translations.refineTip, "padding-sides-1")}
              <refine-selection
                enabledLayerIds={this.selectionLayerIds}
                mapView={this.mapView}
                selectionSets={this._selectionSets}
                sketchLineSymbol={this.sketchLineSymbol}
                sketchPointSymbol={this.sketchPointSymbol}
                sketchPolygonSymbol={this.sketchPolygonSymbol}
              />
            </div>
          ) :
            this._getNotice(this._translations.refineTipNoSelections, "padding-sides-1")
        }

      </calcite-panel>
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
      <div class="padding-bottom-1">
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
  protected _getExportSelectionLists(): VNode {
    return this._selectionSets.reduce((prev, cur) => {
      const ids = this._getSelectionSetIds(cur);

      const validSet = cur.workflowType !== EWorkflowType.REFINE || ids.length > 0;

      if (!this._downloadActive && cur.download && validSet) {
        this._downloadActive = true;
      }

      if (validSet) {
        prev.push((
          <div class="display-flex padding-sides-1 padding-bottom-1">
            <calcite-checkbox checked={cur.download} class="align-center" onClick={() => { void this._toggleDownload(cur.id) }} />
            <calcite-list class="list-border margin-start-1-2 width-full" id="download-list">
              <calcite-list-item
                disabled={!cur.download}
                label={cur.label}
                onClick={() => { void this._toggleDownload(cur.id) }}
              >
                <div slot="content">
                  <div class="list-label">{cur.label}</div>
                  <div class="list-description">{cur?.layerView?.layer.title}</div>
                  <div class="list-description">{this._translations.selectedFeatures.replace("{{n}}", ids.length.toString())}</div>
                </div>
              </calcite-list-item>
            </calcite-list>
          </div>
        ));
      }
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
    this._numDuplicates = await this._getNumDuplicates();
    await this._highlightFeatures();
  }

  /**
   * Download all selection sets as PDF or CSV or alert the user that they need to choose at least 1 export format
   *
   * @protected
   */
  protected async _export(): Promise<void> {
    const exportInfos: IExportInfos = this._getSelectionIdsAndViews(this._selectionSets, true);

    if (this._exportType === EExportType.PDF) {
      // Generate a map screenshot
      let initialImageDataUrl = "";
      if (this._addMap && this.mapView) {
        const screenshot = await this.mapView.takeScreenshot({ width: 1500, height: 2000 });
        initialImageDataUrl = screenshot?.dataUrl;
      }

      // Create the labels for each selection set
      void this._downloadTools.downloadPDF(
        exportInfos,
        this._removeDuplicates.checked,
        this._addTitle ? this._title.value : "",
        initialImageDataUrl
      );
    }

    if (this._exportType === EExportType.CSV) {
      void this._downloadTools.downloadCSV(
        exportInfos,
        this._removeDuplicates.checked
      );
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
  protected _getSelectionIdsAndViews(
    selectionSets: ISelectionSet[],
    downloadSetsOnly = false
  ): IExportInfos {
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
      } else {
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
  protected _updateExportInfos(
    exportInfos: IExportInfos,
    id: string,
    label: string,
    newIds: number[],
    layerView: __esri.FeatureLayerView
  ): IExportInfos {
    if (id && Object.keys(exportInfos).indexOf(id) > -1) {
      exportInfos[id].ids = [...new Set([
        ...exportInfos[id].ids,
        ...newIds
      ])];
      exportInfos[id].selectionSetNames.push(label)
    } else if (id) {
      exportInfos[id] = {
        ids: newIds,
        layerView: layerView,
        selectionSetNames: [label]
      }
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
    this._setPageType(EPageType.LIST);
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
    this._pageType = selectionSet.workflowType === EWorkflowType.REFINE ?
      EPageType.REFINE : EPageType.SELECT;
  }

  /**
   * Highlight any selected features in the map
   *
   * @protected
   */
  protected async _highlightFeatures(): Promise<void> {
    this._clearHighlight();
    const idSets = this._getSelectionIdsAndViews(this._selectionSets, this._pageType === EPageType.EXPORT);
    const idKeys = Object.keys(idSets);
    if (idKeys.length > 0) {
      for (let i = 0; i < idKeys.length; i++) {
        const idSet = idSets[idKeys[i]];
        state.highlightHandles.push(await highlightFeatures(
          idSet.ids,
          idSet.layerView,
          this.mapView
        ));
      }
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
    if (state && state.highlightHandles) {
      state.removeHandles();
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
