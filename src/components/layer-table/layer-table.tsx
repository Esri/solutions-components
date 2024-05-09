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
import LayerTable_T9n from "../../assets/t9n/layer-table/resources.json";
import { loadModules } from "../../utils/loadModules";
import { getLocaleComponentStrings } from "../../utils/locale";
import { getLayerOrTable, goToSelection } from "../../utils/mapViewUtils";
import { queryAllIds, queryFeatureIds, queryFeaturesByGlobalID } from "../../utils/queryUtils";
import * as downloadUtils from "../../utils/downloadUtils";
import { EditType, IColumnsInfo, IExportInfos, ILayerDef, IMapClick, IMapInfo, IToolInfo, IToolSizeInfo, TooltipPlacement } from "../../utils/interfaces";
import "@esri/instant-apps-components/dist/components/instant-apps-social-share";
import { LayerExpression } from "@esri/instant-apps-components";

@Component({
  tag: "layer-table",
  styleUrl: "layer-table.css",
  shadow: false, // FeatureTable styles don't load in shadow dom
})
export class LayerTable {
  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLCrowdsourceManagerElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * string: Global ID of the feature to select
   */
  @Prop() defaultGlobalId: string[];

  /**
   * string: when provided this layer ID will be used when the app loads
   */
  @Prop() defaultLayerId: string;

  /**
   * number: when provided this will be used to select a feature in the table by default
   */
  @Prop() defaultOid: number[];

  /**
   * boolean: when true the layer table will auto refresh the data
   */
  @Prop() enableAutoRefresh: boolean;

  /**
   * boolean: when true the layer table will support drag/drop of columns to adjust order
   */
  @Prop() enableColumnReorder = true;

  /**
   * boolean: when true the export to csv button will be available
   */
  @Prop() enableCSV: boolean;

  /**
   * boolean: when true edits can be applied directly within the table
   */
  @Prop() enableInlineEdit: boolean;

  /**
   * boolean: when true the share widget will be available
   */
  @Prop() enableShare: boolean;

  /**
   * When true the component will render an optimized view for mobile devices
   */
  @Prop() isMobile: boolean;

  /**
   * IMapInfo: key configuration details about the current map
   */
  @Prop() mapInfo: IMapInfo;

  /**
   * esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  @Prop() mapView: __esri.MapView;

  /**
   * boolean: When true only editable layers that support the update capability will be available
   */
  @Prop() onlyShowUpdatableLayers: boolean;

  /**
   * number[]: A list of ids that are currently selected
   */
  @Prop() selectedIds: number[] = [];

  /**
   * boolean: When true the share options will include embed option
   */
  @Prop() shareIncludeEmbed: boolean;

  /**
   * boolean: When true the share options will include social media sharing
   */
  @Prop() shareIncludeSocial: boolean;

  /**
   * boolean: when true the table will be sorted by objectid in descending order by default
   */
  @Prop() showNewestFirst: boolean;

  /**
   * boolean: When true the selected feature will zoomed to in the map and the row will be scrolled to within the table
   */
  @Prop() zoomAndScrollToSelected: boolean;

  //--------------------------------------------------------------------------
  //
  //  State (internal)
  //
  //--------------------------------------------------------------------------

  /**
   * number[]: A list of all IDs for the current layer
   */
  @State() _allIds: number[] = [];

  /**
   * IToolSizeInfo[]: The controls that currently fit based on toolbar size
   */
  @State() _controlsThatFit: IToolSizeInfo[];

  /**
   * boolean: When true a loading indicator will be shown beside the button text
   */
  @State() _csvExporting = false;

  /**
   * boolean: When true a loading indicator will be shown in place of the layer table
   */
  @State() _fetchingData = false;

  /**
   * boolean: When true an indicator will be shown on the action
   */
  @State() _filterActive = false;

  /**
   * boolean: When true the filter component will be displayed
   */
  @State() _filterOpen = false;

  /**
   * esri/views/layers/FeatureLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html
   */
  @State() _layer: __esri.FeatureLayer;

  /**
   * boolean: When true the select all will be displayed in an active state
   */
  @State() _selectAllActive = false;

  /**
   * boolean: When true the show/hide fields list is forced open
   */
  @State() _showHideOpen = false;

  /**
   * boolean: When true only selected records will be shown in the table
   */
  @State() _showOnlySelected = false;

  /**
   * IToolInfo[]: Key details used for creating the tools
   */
  @State() _toolInfos: IToolInfo[];

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() _translations: typeof LayerTable_T9n;

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

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
  protected _ctrlIsPressed = false;

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
  protected _defaultFilterHonored = false;

  /**
   * boolean: When true the default global id provided via url param has been honored and should now be ignored
   */
  protected _defaultGlobalIdHonored = false;

  /**
   * boolean: When true the default OID provided via url param has been honored and should now be ignored
   */
  protected _defaultOidHonored = false;

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
  protected _floorExpression: string

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
   * IHandle: The map click handle
   */
  protected _mapClickHandle: IHandle;

  /**
   * boolean: When true the observer has been set and we don't need to set it again
   */
  protected _observerSet = false;

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
   * HTMLInstantAppsSocialShareElement: Element to support app sharing to social media
   */
  protected _shareNode: HTMLInstantAppsSocialShareElement;

  /**
   * boolean: When true the shift key is currently pressed
   */
  protected _shiftIsPressed = false;

  /**
   * HTMLCalciteDropdownElement: Dropdown the will support show/hide of table columns
   */
  protected _showHideDropdown: HTMLCalciteDropdownElement;

  /**
   * boolean: When true any onChange handeling will be skipped
   */
  protected _skipOnChange = false;

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

  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------

  /**
   * Handle url defaults when defaultOid is set
   */
  @Watch("defaultOid")
  async defaultOidWatchHandler(): Promise<void> {
    await this._handleDefaults();
  }

  /**
   * Handle url defaults when defaultGlobalId is set
   */
  @Watch("defaultGlobalId")
  async defaultGlobalIdWatchHandler(): Promise<void> {
    await this._handleDefaults();
  }

  /**
   * Reset the toolInfos when export csv is enabled/disabled
   */
  @Watch("enableCSV")
  enableCSVWatchHandler(): void {
    if (this._toolInfos?.length > 0) {
      this._initToolInfos();
    }
  }

  /**
   * Update the table when enableInlineEdit is enabled/disabled
   */
  @Watch("enableInlineEdit")
  enableInlineEditWatchHandler(): void {
    if (this._table) {
      this._table.editingEnabled = this._editEnabled && this.enableInlineEdit;
    }
  }

  /**
   * Update the toolbar when the share button is enabled/disabled
   */
  @Watch("enableShare")
  enableShareWatchHandler(): void {
    // this should be caught by component did render and is when I test locally
    // however have had reported case where it is not somehow on devext so adding explicit check here
    if (this._toolbar) {
      this._updateToolbar();
    }
  }

  /**
   * watch for changes to the list of controls that will currently fit in the display
   */
  @Watch("_controlsThatFit")
  _controlsThatFitWatchHandler(): void {
    const ids = this._controlsThatFit ? this._controlsThatFit.reduce((prev, cur) => {
      prev.push(cur.id)
      return prev;
    }, []) : [];
    this._toolInfos = this._toolInfos?.map(ti => {
      if (ti && this._controlsThatFit) {
        const id = this._getId(ti.icon);
        ti.isOverflow = ids.indexOf(id) < 0;
        return ti;
      }
    })
  }

  /**
   * When isMobile is false we need to init the tool infos for the dynamic toolbar
   */
  @Watch("isMobile")
  isMobileWatchHandler(): void {
    if (!this._toolInfos && !this.isMobile) {
      this._initToolInfos();
    }
  }

  /**
   * watch for changes in map info and update the toolbar
   */
  @Watch("mapInfo")
  async mapInfoWatchHandler(): Promise<void> {
    this._resetColumnTemplates();
    this._initLayerExpressions();
    this._initToolInfos();
    this._updateToolbar();
  }

  /**
   * watch for changes in map view and get the first layer
   */
  @Watch("mapView")
  async mapViewWatchHandler(): Promise<void> {
    if (this._mapClickHandle) {
      this._mapClickHandle.remove();
    }
    if (this.mapView) {
      this._floorExpression = undefined;
      this._updateShareUrl();
      this._mapClickHandle = this.reactiveUtils.on(
        () => this.mapView,
        "click",
        (event) => {
          void this._mapClicked(event);
        }
      );
    }
  }

  /**
   * watch for changes in layer view and verify if it has editing enabled
   */
  @Watch("_layer")
  async _layerWatchHandler(): Promise<void> {
    this._fetchingData = true;
    await this._layer?.when(async () => {
      this._definitionExpression = this._layer.definitionExpression;
      this._floorField = this._layer.floorInfo?.floorField;
      this._updateFloorDefinitionExpression();
      await this._resetTable();
      this._initLayerExpressions();
      this._updateShareUrl();
      this._fetchingData = false;
    })
  }

  /**
   * watch for selection changes
   */
  @Watch("selectedIds")
  async selectedIdsWatchHandler(): Promise<void> {
    this._updateShareUrl();
    this._validateEnabledActions();
    if (this._selectAllActive && this.selectedIds.length !== this._allIds.length) {
      this._selectAllActive = false;
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
   * Emitted on demand when a layer is selected
   */
  @Event() featureSelectionChange: EventEmitter<number[]>;

  /**
   * Scroll and zoom to the selected feature from the Features widget.
   *
   * @param evt CustomEvent the graphic for the current selection
   */
  @Listen("selectionChanged", { target: "window" })
  async selectionChanged(
    evt: CustomEvent
  ): Promise<void> {
    const g: __esri.Graphic = evt.detail.selectedFeature[0];
    const oid = g.getObjectId();
    if (this.zoomAndScrollToSelected) {
      const i: number = this._table.viewModel.getObjectIdIndex(oid);
      this._table.scrollToIndex(i);
      const layer = g.layer;
      const layerViews = this.mapView.allLayerViews.toArray();
      let layerView: __esri.FeatureLayerView;
      layerViews.some(lv => {
        if (lv.layer.title === layer.title && lv.layer.type === 'feature') {
          layerView = lv as __esri.FeatureLayerView;
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
  @Listen("editsComplete", { target: "window" })
  async editsComplete(
    evt: CustomEvent
  ): Promise<void> {
    const editType: EditType = evt.detail;
    if (editType === "delete" || editType === "add") {
      this._allIds = await queryAllIds(this._layer);
    }
    await this._refresh();
  }

  /**
   * Refresh the table when floor filter facility is changed
   */
  @Listen("facilityChanged", { target: "window" })
  async facilityChanged(
    evt: CustomEvent
  ): Promise<void> {
    this._floorFacility = evt.detail;
    this._updateFloorDefinitionExpression();
  }

  /**
   * Refresh the table when floor filter level is changed
   */
  @Listen("levelChanged", { target: "window" })
  async levelChanged(
    evt: CustomEvent
  ): Promise<void> {
    this._floorLevel = evt.detail;
    this._updateFloorDefinitionExpression();
  }

  /**
   * Refresh the table when floor filter site is changed
   */
  @Listen("siteChanged", { target: "window" })
  async siteChanged(
    evt: CustomEvent
  ): Promise<void> {
    this._floorSite = evt.detail;
    this._updateFloorDefinitionExpression();
  }

  /**
   * Refresh the table when
   */
  @Listen("noLayersFound", { target: "window" })
  noLayersFound(): void {
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
  async componentWillLoad(): Promise<void> {
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
    return (
      <Host>
        <calcite-shell>
          {this._getTableControlRow("header")}
          <div class={`width-full ${tableHeightClass}`}>
            <calcite-panel class="height-full width-full">
              <calcite-loader
                class={loadingClass}
                label={this._translations.fetchingData}
                scale="l"
              />
              <div
                class={tableNodeClass}
                ref={this.onTableNodeCreate}
              />
            </calcite-panel>
            {
              !this.isMobile ? (
                <div class="bottom-left text-color height-19">
                  {
                    this._translations.recordsSelected
                      .replace("{{total}}", total)
                      .replace("{{selected}}", selected)
                  }
                </div>
              ) : undefined
            }
          </div>
        </calcite-shell>
        {this._filterModal()}
      </Host>
    );
  }

  /**
   * Called once after the component is loaded
   */
  async componentDidLoad(): Promise<void> {
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
  componentDidRender(): void {
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
  protected async _initModules(): Promise<void> {
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
  protected _onResize(): void {
    this._updateToolbar()
  }

  /**
   * Gets a row of controls that can be used for various interactions with the table
   *
   * @param slot string optional slot to display the control within
   *
   * @returns The dom node that contains the controls
   */
  protected _getTableControlRow(
    slot?: string
  ): VNode {
    const id = "more-table-options";
    return (
      <div
        class="display-flex border-bottom height-51"
        ref={(el) => this._toolbar = el}
        slot={slot}
      >
        {this._getActionBar()}
        {!this.isMobile ? this._getDropdown(id) : undefined}
        {this.enableShare && !this.isMobile ? this._getShare("share") : undefined}
      </div>
    );
  }

  /**
   * Gets a row of controls that can be used for various interactions with the table
   *
   * @param slot string optional slot to display the control within
   *
   * @returns The dom node that contains the controls
   */
  protected _getActionBar(): VNode {
    const containerClass = this.isMobile ? "width-full" : "";
    const mobileClass = this.isMobile ? "border-top" : "";
    return (
      <calcite-action-bar
        class={containerClass}
        expandDisabled={true}
        expanded={true}
        id={this._getId("bar")}
        layout="horizontal"
      >
        <div class={`border-end ${containerClass} ${mobileClass}`} id="solutions-map-layer-picker-container">
          <map-layer-picker
            appearance="transparent"
            defaultLayerId={this.defaultLayerId}
            display="inline-flex"
            height={50}
            isMobile={this.isMobile}
            mapView={this.mapView}
            onLayerSelectionChange={(evt) => void this._layerSelectionChanged(evt)}
            onlyShowUpdatableLayers={this.onlyShowUpdatableLayers}
            placeholderIcon="layers"
            scale="l"
            showSingleLayerAsLabel={true}
            showTables={true}
            type="dropdown"
          />
        </div>
        {!this.isMobile ? this._getActions() : undefined}
      </calcite-action-bar>
    );
  }

  /**
   * Get the actions that are used for various interactions with the table
   *
   * @returns VNode[] the action nodes
   */
  protected _getActions(): VNode[] {
    const actions = this._getActionItems();
    return actions?.reduce((prev, cur) => {
      if (cur && !cur.isOverflow) {
        prev.push(
          cur.isDanger ?
            this._getDangerAction(cur.icon, cur.label, cur.func, cur.disabled) :
            cur.isSublist ? (
              <calcite-dropdown
                closeOnSelectDisabled={true}
                id={this._getId(cur.icon)}
                onCalciteDropdownBeforeClose={() => this._forceShowHide()}
                ref={(el) => this._showHideDropdown = el}
              >
                {this._getAction(
                  cur.active,
                  this._showHideOpen ? "chevron-down" : cur.icon,
                  cur.indicator,
                  cur.label,
                  cur.func,
                  cur.disabled,
                  cur.loading,
                  "trigger"
                )}
                {this._showHideOpen ? this._getFieldlist() : undefined}
              </calcite-dropdown>
            ) :
            this._getAction(cur.active, cur.icon, cur.indicator, cur.label, cur.func, cur.disabled, cur.loading)
        )
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
  _getFieldlist(): VNode {
    return this._columnsInfo ? (
      <calcite-dropdown-group
        selection-mode="multiple"
      >
        {
          Object.keys(this._columnsInfo).map(k => {
            const selected = this._columnsInfo[k];
            return (
              <calcite-dropdown-item
                id={k}
                onClick={(e) => {
                  const target = e.target as HTMLCalciteDropdownItemElement;
                  this._columnsInfo[target.id] = target.selected;
                  if (!target.selected) {
                    this._table.hideColumn(target.id);
                  } else {
                    this._table.showColumn(target.id);
                  }
                }}
                selected={selected}
              >
                {k}
              </calcite-dropdown-item>
            )
          })
        }
      </calcite-dropdown-group>
    ) : undefined;
  }

  /**
   * Update actions enabled prop based on number of selected indexes
   */
  _validateEnabledActions(): void {
    const featuresSelected = this._featuresSelected();
    const selectionDependant = [
      "zoom-to-object",
      "trash",
      "erase",
      "selected-items-filter"
    ];
    this._toolInfos?.forEach(ti => {
      if (ti && selectionDependant.indexOf(ti.icon) > -1) {
        ti.disabled = !featuresSelected;
      }
    });
  }

  /**
   * Update actions active prop based on a stored value
   */
  _validateActiveActions(): void {
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
  protected _initToolInfos(): void {
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
      }];

      this._defaultVisibleToolSizeInfos = undefined;
    }
  }

  /**
   * Applies a definition expression when floor field and level are available
   *
   * @returns boolean
   */
  protected _updateFloorDefinitionExpression(): void {
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
  protected _featuresSelected(): boolean {
    return this.selectedIds.length > 0;
  }

  /**
   * Return true when we have no features
   *
   * @returns boolean
   */
  protected _featuresEmpty(): boolean {
    return this._allIds.length === 0;
  }

  /**
   * Return true when we have at least 1 layer expression for the current layer
   *
   * @returns boolean
   */
  protected _hasFilterExpressions(): boolean {
    let layerExpressions;
    if (this.mapInfo?.filterConfig?.layerExpressions && this._layer?.id) {
      layerExpressions = this.mapInfo.filterConfig.layerExpressions.filter(
        (exp) => exp.id === this._layer.id);
    }
    return layerExpressions?.length > 0;
  }

  /**
   * Add/Remove tools from the action bar and dropdown based on available size
   */
  protected _updateToolbar(): void {
    if (this._timeout) {
      clearTimeout(this._timeout)
    }

    if (!this.isMobile && this._toolbar && this._toolInfos) {
      this._timeout = setTimeout(() => {
        clearTimeout(this._timeout)

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
                } else {
                  prev.push(cur);
                }
              }
              return prev;
            }, []).reverse();

            this._setControlsThatFit(controlsThatFit, skipControls);
          }
        } else {
          if (this._defaultVisibleToolSizeInfos) {
            const currentTools = this._toolbarSizeInfos.reduce((prev, cur) => {
              prev.push(cur.id);
              return prev;
            }, []);

            let forceFinish = false;
            const controlsThatFit = [...this._defaultVisibleToolSizeInfos].reduce((prev, cur) => {
              if (!forceFinish && skipControls.indexOf(cur.id) < 0 &&
                (currentTools.indexOf(cur.id) > -1 || (controlsWidth + cur.width) <= toolbarWidth)
              ) {
                if (currentTools.indexOf(cur.id) < 0) {
                  controlsWidth += cur.width;
                }
                prev.push(cur);
              } else if (skipControls.indexOf(cur.id) < 0 && (controlsWidth + cur.width) > toolbarWidth) {
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
  _setControlsThatFit(
    controlsThatFit: IToolSizeInfo[],
    skipControls: string[]
  ): void {
    let update = JSON.stringify(controlsThatFit) !== JSON.stringify(this._controlsThatFit);
    const actionbar = document.getElementById("solutions-action-bar");
    actionbar.childNodes.forEach((n: any) => {
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
  protected _setToolbarSizeInfos(): void {
    let hasWidth = false;
    this._toolbarSizeInfos = [];
    this._toolbar.childNodes.forEach((c: any, i) => {
      // handle the action bar
      if (i === 0) {
        c.childNodes.forEach((actionbarChild: any) => {
          this._toolbarSizeInfos.push({
            id: actionbarChild.id,
            width: actionbarChild.offsetWidth
          });
          if (!hasWidth) {
            hasWidth = actionbarChild.offsetWidth > 0;
          }
        });
      } else if (!c.referenceElement) {
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
  protected _getActionItems(): IToolInfo[] {
    return this._toolInfos?.filter(toolInfo => toolInfo && !toolInfo.isOverflow)
  }

  /**
   * Get a list of toolInfos that should display in the dropdown
   *
   * @param id string the id for the dropdown and its tooltip
   *
   * @returns VNode the dropdown node
   */
  protected _getDropdown(
    id: string
  ): VNode {
    const dropdownItems = this._getDropdownItems();
    return dropdownItems.length > 0 ? (
      <calcite-dropdown
        closeOnSelectDisabled={true}
        disabled={this._layer === undefined}
        id="solutions-more"
        onCalciteDropdownBeforeClose={() => this._forceShowHide()}
        ref={(el) => this._moreDropdown = el}
      >
      <calcite-action
        appearance="solid"
        id={id}
        label=""
        onClick={() => this._closeShowHide()}
        slot="trigger"
        text=""
      >
        <calcite-button
          appearance="transparent"
          iconEnd="chevron-down"
          kind="neutral"
        >
          {this._translations.more}
        </calcite-button>
      </calcite-action>
      <calcite-dropdown-group selection-mode="none">
        {
          dropdownItems.map(item => {
            return (
              <calcite-dropdown-group
                class={item.disabled ? "disabled" : ""}
                selectionMode={item.disabled ? "none" : "single"}
              >
                <calcite-dropdown-item
                  disabled={item.loading}
                  iconStart={item.isSublist && this._showHideOpen ? "chevron-down" : item.loading ? "" : item.icon}
                  id="solutions-subset-list"
                  onClick={item.func}
                >
                  {item.loading ? (
                    <div class={"display-flex"}>
                      <calcite-loader
                        inline={true}
                        label={item.label}
                        scale="m"
                      />
                      {item.label}
                    </div>
                  ) : item.label}
                </calcite-dropdown-item>
              </calcite-dropdown-group>
            )
          })
        }
      </calcite-dropdown-group>
      {this._showHideOpen ? this._getFieldlist() : undefined}
    </calcite-dropdown>
    ) : undefined;
  }

  /**
   * Get a list of toolInfos that should display in the dropdown
   *
   * @returns IToolInfo[] the list of toolInfos that should display in the dropdown
   */
  protected _getDropdownItems(): IToolInfo[] {
    return this._toolInfos?.filter(toolInfo => toolInfo && toolInfo.isOverflow)
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
  protected _getAction(
    active: boolean,
    icon: string,
    indicator: boolean,
    label: string,
    func: any,
    disabled: boolean,
    loading: boolean,
    slot?: string
  ): VNode {
    const _disabled = this._layer === undefined ? true : disabled;
    return (
      <div class={"display-flex"} id={this._getId(icon)} slot={slot}>
        <calcite-action
          active={active}
          appearance="solid"
          disabled={_disabled}
          icon={icon}
          id={icon}
          indicator={indicator}
          label={label}
          loading={loading}
          onClick={func}
          text={label}
          textEnabled={true}
        />
        {this._getToolTip("bottom", icon, label)}
      </div>
    )
  }

  /**
   * Get an action and tooltip for share
   *
   * @param icon string the name of the icon to display, will also be used in its id
   *
   * @returns VNode The node representing the DOM element that will contain the action
   */
  protected _getShare(
    icon: string
  ): VNode {
    return (
      <div class="share-action" id={this._getId(icon)}>
        <instant-apps-social-share
          autoUpdateShareUrl={false}
          class="instant-app-share"
          embed={this.shareIncludeEmbed}
          popoverButtonIconScale="s"
          ref={el => this._shareNode = el}
          scale="m"
          shareButtonColor="neutral"
          shareButtonType="action"
          socialMedia={this.shareIncludeSocial}
          view={this.mapView}
        />
        {this._getToolTip("bottom", icon, this._translations.share)}
      </div>
    )
  }

  /**
   * Called each time the values that are used for custom url params change
   */
  _updateShareUrl(): void {
    const url = this._shareNode?.shareUrl;
    if (!url) {
      return;
    }
    const urlObj = new URL(url);

    //set the additional search params
    if (this.mapInfo?.id) {
      urlObj.searchParams.set("webmap", this.mapInfo.id);
    } else {
      urlObj.searchParams.delete("webmap");

    }

    if (this._layer?.id) {
      urlObj.searchParams.set("layer", this._layer.id);
    } else {
      urlObj.searchParams.delete("layer");
    }

    if (this.selectedIds?.length > 0) {
      urlObj.searchParams.set("oid", this.selectedIds.join(","));
    } else {
      urlObj.searchParams.delete("oid");
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
  protected _getToolTip(
    placement: TooltipPlacement,
    referenceElement: string,
    text: string
  ): VNode {
    return document.getElementById(referenceElement) ? (
      <calcite-tooltip
        placement={placement}
        reference-element={referenceElement}
      >
        <span>{text}</span>
      </calcite-tooltip>
    ) : undefined;
  }

  /**
   * Get an id with a prefix to the user supplied value
   *
   * @param id the unique value for the id
   *
   * @returns the new id with the prefix value
   */
  protected _getId(
    id: string
  ): string {
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
  private _getDangerAction(
    icon: string,
    label: string,
    func: any,
    disabled: boolean
  ): VNode {
    const _disabled = this._layer === undefined ? true : disabled;
    return (
      <div class="display-flex" id={this._getId(icon)}>
        {icon === "trash" ? (
          <delete-button
            buttonType="action"
            class="display-flex"
            disabled={_disabled}
            icon={icon}
            ids={this._getIds()}
            layer={this._layer}
          />
        ) : (
          <calcite-action
            appearance="solid"
            disabled={_disabled}
            id={icon}
            onClick={func}
            text=""
          >
            <calcite-button
              appearance="transparent"
              iconStart={icon}
              kind="danger"
            >
              {label}
            </calcite-button>
          </calcite-action>
        )}
        {this._getToolTip("bottom", icon, label)}
      </div>
    )
  }

  /**
   * Return all currently selected IDs from the table
   *
   * @param number[] the selected ids
   */
  protected _getIds(): number[] {
    return this._table.highlightIds.toArray();
  }

  /**
   * Store a reference to the table node after it's first created
   * and initializes the FeatureTable
   *
   * @param node HTMLDivElement The node representing the DOM element that will contain the widget.
   */
  private onTableNodeCreate = (
    node: HTMLDivElement
  ) => {
    this._tableNode = node;
  }

  /**
   * Initialize the FeatureTable
   *
   * @param node HTMLDivElement The node representing the DOM element that will contain the widget.
   */
  protected async _getTable(
    node: HTMLDivElement,
    columnTemplates?: __esri.FieldColumnTemplate[]
  ): Promise<void> {
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
        } as __esri.FeatureTableProperties);
      });

      await this._table.when(() => {
        this._table.highlightIds.on("change", (evt) => {
          void this._handleOnChange(evt);
        });
      });
    }
  }

  protected async _handleOnChange(evt: any): Promise<void> {
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
          } else {
            this._skipOnChange = false;
          }
        } else {
          // https://github.com/Esri/solutions-components/issues/365
          this.selectedIds = ids.reverse();
        }
      } else if (this._ctrlIsPressed) {
        this.selectedIds = ids.reverse();
      } else if (this._shiftIsPressed) {
        this._skipOnChange = true;
        this._previousCurrentId = this._currentId;
        this._currentId = [...this._table.highlightIds.toArray()].reverse()[0];
        if (this._previousCurrentId !== this._currentId) {
          // query the layer based on current sort and filters then grab between the current id and previous id
          const orderBy = this._table.activeSortOrders.reduce((prev, cur) => {
            prev.push(`${cur.fieldName} ${cur.direction}`)
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
    } else {
      this._skipOnChange = false;
    }
    this._currentId = [...this._table.highlightIds.toArray()].reverse()[0];
  }

  /**
   * Handle any updates after a selection change has occured and emit the results
   */
  protected _finishOnChange(): void {
    if (this._showOnlySelected) {
      if (this._featuresSelected()) {
        this._table.filterBySelection();
      } else {
        this._toggleShowSelected();
      }
    }
    this.featureSelectionChange.emit(this.selectedIds);
  }

  /**
   * Reset the tables column templates when we get new column config
   */
  protected _resetColumnTemplates(): void {
    const columnTemplates = this._getColumnTemplates(this._layer?.id, this._layer?.fields);
    const hasChange = columnTemplates?.some((ct, i) => {
      return JSON.stringify(this._table?.tableTemplate.columnTemplates[i]) !== JSON.stringify(ct)
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
  protected async _resetTable(): Promise<void> {
    this._clearSelection();
    this._allIds = await queryAllIds(this._layer);

    if (!this._table) {
      const columnTemplates = this._getColumnTemplates(this._layer.id, this._layer?.fields);
      await this._getTable(this._tableNode, columnTemplates);
    } else {
      this._table.view = this.mapView;
      this._table.layer = this._layer;
    }

    await this._initLayerRefresh();
    this._checkEditEnabled();
    this._table.editingEnabled = this._editEnabled && this.enableInlineEdit;

    await this.reactiveUtils.once(
      () => this._table.state === "loaded")
      .then(async () => {
        this._table.highlightIds.removeAll();
        this._table.clearSelectionFilter();
        this._resetColumnTemplates();
        this._showOnlySelected = false;
        await this._handleDefaults();
        await this._sortTable()
        this._initToolInfos();
        this._updateToolbar();
      });
  }

  /**
   * Update the current IDs when that layers data is modified
   */
  protected async _initLayerRefresh(): Promise<void> {
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
  protected async _updateAllIds(): Promise<void> {
    this._allIds = await queryAllIds(this._layer);
    this.selectedIds = this.selectedIds.filter(id => this._allIds.indexOf(id) > -1)
    await this._refresh();
  }

  /**
   * Handle default OID or GlobalID from url parameters
   */
  protected async _handleDefaults(): Promise<void> {
    if (!this._defaultOidHonored && this.defaultOid?.length > 0 && this.defaultOid[0] > -1 && this._table) {
      await this._selectDefaultFeature(this.defaultOid);
      this._defaultOidHonored = true
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
  protected _initColumnsInfo(
    fieldNames?: string[]
  ): void {
    // this._table.columns is not reflecting correct list when new
    // tableTemplate.columnTemplates have been defined on an existing FeatureTable
    // TODO review for better solution post 2024 R01 release
    const columnsInfo = this._table?.columns.reduce((prev, cur: any) => {
      if (!fieldNames || (fieldNames?.indexOf(cur.name) > -1)) {
        prev[cur.name] = !cur.hidden;
      }
      return prev;
    }, {});

    const oldColumnNames = this._table?.columns.map((c: any) => c.name);
    const newColumnNames = fieldNames ? fieldNames.filter(n => oldColumnNames.indexOf(n) < 0) : [];
    newColumnNames.forEach(c => {
      columnsInfo[c] = true;
    });

    this._columnsInfo = fieldNames ? fieldNames.reduce((prev, cur) => {
      prev[cur] = columnsInfo[cur]
      return prev;
    }, {}) : columnsInfo;
  }

  /**
   * Select the feature that was specified via url params
   */
  protected async _selectDefaultFeature(
    oids: number[]
  ): Promise<void> {
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
  protected _checkEditEnabled(): void {
    this._editEnabled = this._layer.editingEnabled && this._layer.capabilities.operations.supportsUpdate;
    this._deleteEnabled = this._layer.editingEnabled && this._layer.capabilities.operations.supportsDelete;
  }

  /**
   * Sort the objectid field in descending order
   */
  protected async _sortTable(): Promise<void> {
    if (this._table && this._layer && this.showNewestFirst) {
      await this._table.when();
      await this._layer.when(() => {
        this._table.sortColumn(this._layer.objectIdField, "desc");
      });
    }
  }

  /**
   * Open show/hide dropdown
   */
  protected _forceShowHide(): void {
    if(this._showHideDropdown) {
      this._showHideDropdown.open = this._showHideOpen;
    }
    if(this._moreDropdown) {
      this._moreDropdown.open = this._showHideOpen;
    }
  }

  /**
   * Toggle show/hide dropdown
   */
  protected _toggleShowHide(): void {
    this._showHideOpen = !this._showHideOpen;
  }

  /**
   * Open show/hide dropdown
   */
  protected _closeShowHide(): void {
    this._showHideOpen = false;
  }

  /**
   * Close show/hide dropdown when the user clicks outside of it
   */
  protected _handleDocumentClick(
    e: MouseEvent
  ): void {
    const id = (e.target as any)?.id;
    if (this._showHideOpen && Object.keys(this._columnsInfo).indexOf(id) < 0 && id !== "solutions-subset-list" && id !== "chevron-right"){
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
  protected _handleKeyDown(
    e: KeyboardEvent
  ): void {
    this._ctrlIsPressed = e.ctrlKey;
    this._shiftIsPressed = e.shiftKey;
  }

  /**
   * Keep track of key up for ctrl and shift
   */
  protected _handleKeyUp(
    e: KeyboardEvent
  ): void {
    this._ctrlIsPressed = e.ctrlKey;
    this._shiftIsPressed = e.shiftKey;
  }

  /**
   * Show filter component in modal
   *
   * @returns node to interact with any configured filters for the current layer
   */
  protected _filterModal(): VNode {
    return (
      <calcite-modal
        aria-labelledby="modal-title"
        class="modal"
        kind="brand"
        onCalciteModalClose={() => void this._closeFilter()}
        open={this._filterOpen}
        widthScale="s"
      >
        <div
          class="display-flex align-center"
          id="modal-title"
          slot="header"
        >
          {this._translations?.filter?.replace("{{title}}", this._layer?.title)}
        </div>
        <div slot="content">
          <instant-apps-filter-list
            autoUpdateUrl={false}
            closeBtn={true}
            closeBtnOnClick={async () => this._closeFilter()}
            comboboxOverlayPositioning="fixed"
            layerExpressions={this._layerExpressions}
            onFilterListReset={() => this._handleFilterListReset()}
            onFilterUpdate={() => this._handleFilterUpdate()}
            ref={(el) => this._filterList = el}
            view={this.mapView}
            zoomBtn={false}
          />
        </div>
      </calcite-modal>
    );
  }

  /**
   * Reset the filter active prop
   */
  protected _handleFilterListReset(): void {
    this._filterActive = false;
    this._updateShareUrl();
  }

  /**
   * Check if the layers definitionExpression has been modified
   */
  protected _handleFilterUpdate(): void {
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
  }

  /**
   * Close the filter modal
   */
  protected async _closeFilter(): Promise<void> {
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
  protected async _mapClicked(
    evt: IMapClick
  ): Promise<void> {
    const opts = {
      include: this._layer
    };
    const hitTestResult = await this.mapView.hitTest(evt.screenPoint, opts);
    if (hitTestResult.results.length > 0) {
      hitTestResult.results.forEach((result: any) => {
        const id = (result.graphic as __esri.Graphic).getObjectId();
        const index = this._table.highlightIds.indexOf(id);
        if (index < 0) {
          this._table.highlightIds.add(id);
        }
      });
      if (this._showOnlySelected) {
        this._table.filterBySelection();
      }
    } else {
      this._clearSelection();
    }
  }

  /**
   * Select or deselect all rows
   */
  protected _selectAll(): void {
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
  protected _toggleShowSelected(): void {
    this._showOnlySelected = !this._showOnlySelected;
    if (this._showOnlySelected) {
      this._table.filterBySelection();
    } else {
      this._table.clearSelectionFilter();
    }
  }

  /**
   * Clears the selected indexes
   */
  protected _clearSelection(): void {
    this.selectedIds = [];
    this._table?.highlightIds.removeAll();
    this._finishOnChange();
  }

  /**
   * When true the filter modal will be displayed
   */
  protected _toggleFilter(): void {
    this._filterOpen = !this._filterOpen;
  }

  /**
   * Store any filters for the current layer.
   * Should only occur on layer change
   */
  protected _initLayerExpressions(): void {
    const layerExpressions = this.mapInfo?.filterConfig?.layerExpressions;
    this._layerExpressions = layerExpressions ? layerExpressions.filter(
      (exp) => exp.id === this._layer?.id) : [];
    this._filterList.layerExpressions = this._layerExpressions;
    this._filterActive = this._layerExpressions.filter(lyrExp => {
      return lyrExp.expressions.filter(exp => exp.active).length > 0
    }).length > 0;
  }

  /**
   * Select all rows that are not currently selectd
   */
  protected _switchSelected(): void {
    const currentIndexes = [...this.selectedIds];
    this._table.highlightIds.removeAll();
    const ids = this._allIds.reduce((prev, _cur) => {
      if (currentIndexes.indexOf(_cur) < 0) {
        prev.push(_cur);
      }
      return prev;
    }, []).sort((a,b) => a - b);
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
  protected async _exportToCSV(): Promise<void> {
    const exportInfos: IExportInfos = {};
    const ids = this._table.highlightIds.toArray();
    exportInfos[this._layer.id] = {
      selectionSetNames: [this._layer.title],
      ids,
      layer: this._layer
    }
    const fields = this._table.columns.toArray().reduce((prev, cur) => {
      if (!(cur as any).hidden) {
        prev.push((cur as any).name.toLocaleLowerCase());
      }
      return prev;
    }, []);

    this._updateToolInfoLoading("export", true);
    this._csvExporting = true;

    await downloadUtils.downloadCSV(
      null,//???
      exportInfos,
      false, // formatUsingLayerPopup
      false, // removeDuplicates
      true, // addColumnTitle
      fields,
      true,
      true
    );

    this._updateToolInfoLoading("export", false);
    this._csvExporting = false;
  }

  /**
   * Set the loading prop in the stored toolInfos
   */
  protected _updateToolInfoLoading(
    name: string,
    isLoading: boolean
  ): void {
    this._toolInfos.some(tool => {
      if (tool?.icon === name) {
        tool.loading = isLoading;
        return true;
      }
    });
  }

  /**
   * Refreshes the table and maintains the curent scroll position
   */
  protected async _refresh(): Promise<void> {
    await this._table.refresh();
    this.featureSelectionChange.emit(this.selectedIds);
  }

  /**
   * Zoom to all selected features
   *
   * @returns a promise that will resolve when the operation is complete
   */
  protected _zoom(): void {
    this._table.zoomToSelection();
  }

  /**
   * Handles layer selection change to show new table
   *
   * @param evt CustomEvent the id for the current layer
   *
   * @returns a promise that will resolve when the operation is complete
   */
  protected async _layerSelectionChanged(
    evt: CustomEvent
  ): Promise<void> {
    const id: string = evt.detail[0];
    if (id !== this._layer?.id || this._featuresEmpty()) {
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
  protected _getColumnTemplates(
    id: string,
    fieldInfos: __esri.Field[]
  ): __esri.FieldColumnTemplate[] {
    let layerOption: ILayerDef;
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
          } as __esri.FieldColumnTemplate;
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
        } as __esri.FieldColumnTemplate;
      });
    }

    return fieldOrder ?
      columnTemplates?.sort(this._sortFields.bind(this, fieldOrder)) :
      columnTemplates;
  }

  private _sortFields(
    sorter: string[],
    a: __esri.FieldColumnTemplate,
    b: __esri.FieldColumnTemplate,
  ): number {
    return sorter?.indexOf(a.fieldName) - sorter.indexOf(b.fieldName);
  }

  /**
   * Get the menu config that adds the ability to hide the current column
   */
  protected _getMenuConfig(
    name: string
  ): any {
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
  protected _handleHideClick(
    name: string
  ): void {
    this._columnsInfo[name] = false;
    this._table.hideColumn(name);
    this._table.tableTemplate.columnTemplates.forEach((columnTemplate: __esri.FieldColumnTemplate) => {
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
  protected async _getTranslations(): Promise<void> {
    const messages = await getLocaleComponentStrings(this.el);
    this._translations = messages[0] as typeof LayerTable_T9n;
  }

}
