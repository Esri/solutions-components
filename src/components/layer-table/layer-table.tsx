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

import { Component, Element, Event, EventEmitter, Host, h, Listen, Method, Prop, State, VNode, Watch } from "@stencil/core";
import LayerTable_T9n from "../../assets/t9n/layer-table/resources.json";
import { loadModules } from "../../utils/loadModules";
import { getLocaleComponentStrings } from "../../utils/locale";
import { getLayer, getMapLayerIds, goToSelection } from "../../utils/mapViewUtils";
import { queryFeaturesByID, queryAllIds } from "../../utils/queryUtils";
import * as downloadUtils from "../../utils/downloadUtils";
import { IExportInfos, IMapClick } from "../../utils/interfaces";

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
   * esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  @Prop() mapView: __esri.MapView;

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
   * boolean: When true a alert will be shown to indicate a problem or confirm the current action
   */
  @State() _alertOpen = false;

  /**
   * boolean: When true a loading indicator will be shown in place of the layer table
   */
  @State() _fetchingData = false;

  /**
   * esri/views/layers/FeatureLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html
   */
  @State() _layer: __esri.FeatureLayer;

  /**
   * number[]: A list of indexes that are currently selected
   */
  @State() _selectedIndexes: number[] = [];

  /**
   * boolean: When true only selected records will be shown in the table
   */
  @State() _showOnlySelected = false;

  /**
   * boolean: When true the user has defined a sort order that should override the default order
   */
  @State() _sortActive = false;

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
   * any: The function that the alerts action should execute
   */
  protected _alertActionFunction: any;

  /**
   * string: The alerts action text...will be displayed when _alertShowAction is True
   */
  protected _alertActionText: string;

  /**
   * string: main icon of the alert
   */
  protected _alertIcon: string;

  /**
   * "warning" | "danger": the kind of alert to display
   */
  protected _alertKind: "warning" | "danger";

  /**
   * boolean: When true a action link will be deisplayed
   */
  protected _alertShowAction: boolean;

  /**
   * string: main message of the alert
   */
  protected _alertMessage: string;

  /**
   * string: the alerts title
   */
  protected _alertTitle: string;

  /**
   * number[]: A list of all IDs for the current layer
   */
  protected _allIds: number[] = [];

  /**
   * boolean: When false alerts will be shown to indicate that the layer must have editing enabled for edit actions
   */
  protected _editEnabled: boolean;

  /**
   * esri/core/reactiveUtils: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-reactiveUtils.html
   */
  protected reactiveUtils: typeof import("esri/core/reactiveUtils");

  /**
   * HTMLCalciteCheckboxElement: Element to force selection of all records
   */
  protected _selectAllElement: HTMLCalciteCheckboxElement;

  /**
   * esri/widgets/FeatureTable: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-FeatureTable.html
   */
  protected _table: __esri.FeatureTable;

  /**
   * HTMLDivElement: Element to hold the FeatureTable
   */
  protected _tableNode: HTMLDivElement;

  /**
   * bool: When true the table is being sorted
   */
  protected _tableSorting = false;

  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------

  /**
   * watch for changes in map view and get the first layer
   */
  @Watch("mapView")
  async mapViewWatchHandler(): Promise<void> {
    this._fetchingData = true;
    const mapLayerIds = await getMapLayerIds(this.mapView);
    this._layer = await getLayer(this.mapView, mapLayerIds[0]);
    this.reactiveUtils.on(
      () => this.mapView,
      "click",
      (event) => {
        void this._mapClicked(event);
      }
    );
    this._fetchingData = false;
  }

  /**
   * watch for changes in layer view and verify if it has editing enabled
   */
  @Watch("_layer")
  async _layerWatchHandler(): Promise<void> {
    this._fetchingData = true;
    await this._resetTable();
    this._fetchingData = false;
  }

  /**
   * When sortActive is false the user has not defined a sort and we should use the default sort
   */
  @Watch("_sortActive")
  async _sortActiveWatchHandler(): Promise<void> {
    if (!this._sortActive) {
      await this._sortTable();
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Methods (public)
  //
  //--------------------------------------------------------------------------

  /**
   * Get the selected graphics
   *
   * @returns Promise that resolves when the operation is complete
   */
  @Method()
  async getSelectedGraphics(): Promise<__esri.Graphic[]> {
    return this._selectedIndexes.length > 0 ?
      await this._getGraphics(this._selectedIndexes) : [];
  }

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
    if (this.zoomAndScrollToSelected) {
      const g: __esri.Graphic = evt.detail;
      const oid = g.getObjectId();
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
  }

  /**
   * Renders the component.
   */
  render() {
    if (!this._layer) {
      return null;
    }
    const tableNodeClass = this._fetchingData ? "display-none" : "";
    const loadingClass = this._fetchingData ? "" : "display-none";
    const alertActionClass = this._alertShowAction ? "" : "display-none";
    return (
      <Host>
        <calcite-shell>
          {this._getTableControlRow("header")}
          <div class="height-full width-full">
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
          </div>
          <calcite-alert
            icon={this._alertIcon}
            kind={this._alertKind}
            label=""
            onCalciteAlertClose={() => this._alertClosed()}
            open={this._alertOpen}
            placement="top"
          >
            <div slot="title">
              {this._alertTitle}
            </div>
            <div slot="message">
              {this._alertMessage}
            </div>
            <calcite-link
              class={alertActionClass}
              onClick={this._alertActionFunction}
              slot="link"
            >
              {this._alertActionText}
            </calcite-link>
          </calcite-alert>
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
    const [FeatureTable, reactiveUtils] = await loadModules([
      "esri/widgets/FeatureTable",
      "esri/core/reactiveUtils"
    ]);
    this.FeatureTable = FeatureTable;
    this.reactiveUtils = reactiveUtils;
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
    const featuresSelected = this._selectedIndexes.length > 0;
    return (
      <div class="display-flex table-border height-51" slot={slot}>
        <calcite-action-bar
          expandDisabled={true}
          expanded={true}
          layout="horizontal"
        >
          <div class="border-end">
            <map-layer-picker
              appearance="transparent"
              mapView={this.mapView}
              onLayerSelectionChange={(evt) => this._layerSelectionChanged(evt)}
              placeholderIcon="layers"
              scale="l"
              type="dropdown"
            />
          </div>
          <calcite-action
            appearance="solid"
            disabled={!featuresSelected}
            icon="magnifying-glass"
            id="magnifying-glass"
            label={this._translations.zoom}
            onClick={() => this._zoom()}
            text={this._translations.zoom}
            textEnabled={true}
          />
          <calcite-tooltip label="" placement="bottom" reference-element="magnifying-glass">
            <span>{this._translations.zoom}</span>
          </calcite-tooltip>
          <calcite-action
            appearance="solid"
            icon="filter"
            id="filter"
            onClick={() => this._filter()}
            text={this._translations.filters}
            text-enabled="true"
            textEnabled={true}
          />
          <calcite-tooltip label="" placement="bottom" reference-element="filter">
            <span>{this._translations.filters}</span>
          </calcite-tooltip>
          <calcite-action
            appearance="solid"
            disabled={!featuresSelected}
            id="trash"
            onClick={() => this._delete()}
            text=""
          >
            <calcite-button
              appearance="transparent"
              iconStart="trash"
              kind="danger"
            >
              {this._translations.delete}
            </calcite-button>
          </calcite-action>
          <calcite-tooltip label="" placement="bottom" reference-element="trash">
            <span>{this._translations.delete}</span>
          </calcite-tooltip>
          <calcite-action
            appearance="solid"
            disabled={!featuresSelected}
            icon="erase"
            id="erase"
            onClick={() => this._clearSelection()}
            text={this._translations.clearSelection}
            text-enabled="true"
            textEnabled={true}
          />
          <calcite-tooltip label="" placement="bottom" reference-element="erase">
            <span>{this._translations.clearSelection}</span>
          </calcite-tooltip>
        </calcite-action-bar>
        <calcite-dropdown>
          <calcite-action
            appearance="solid"
            label=""
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
            <calcite-dropdown-item
              iconStart="list-check-all"
              onClick={() => this._selectAll()}
            >
              {this._translations.selectAll}
            </calcite-dropdown-item>
            <calcite-dropdown-item
              iconStart="selected-items-filter"
              onClick={() => this._toggleShowSelected()}
            >
              {
                this._showOnlySelected ? this._translations.showAll :
                  this._translations.showSelected
              }
            </calcite-dropdown-item>
            <calcite-dropdown-item
              iconStart="refresh"
              onClick={() => this._switchSelected()}
            >
              {this._translations.switchSelected}
            </calcite-dropdown-item>
            <calcite-dropdown-item
              iconStart="refresh"
              onClick={() => this._refresh()}
            >
              {this._translations.refresh}
            </calcite-dropdown-item>
            <calcite-dropdown-item
              iconStart="export"
              onClick={() => void this._exportToCSV()}
            >
              {this._translations.exportCSV}
            </calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>
      </div>
    );
  }

  /**
   * Store a reference to the table node after it's first created
   * and initializes the FeatureTable
   *
   * @param node HTMLDivElement The node representing the DOM element that will contain the widget.
   *
   * @returns void
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
   *
   * @returns void
   */
  protected async _getTable(
    node: HTMLDivElement
  ): Promise<void> {
    if (this._layer) {
      await this._layer.when(async () => {
        this._table = new this.FeatureTable({
          layer: this._layer,
          view: this.mapView,
          //editingEnabled: this._editEnabled,
          highlightEnabled: true,
          multiSortEnabled: false,
          visibleElements: {
            header: false,
            menu: false
          },
          container: node
        } as __esri.FeatureTableProperties);

        await this._table.when(async () => {
          this._table.highlightIds.on("change", () => {
            this._selectedIndexes = this._table.highlightIds.toArray();
            if (this._showOnlySelected) {
              if (this._selectedIndexes.length > 0) {
                this._table.filterBySelection();
              } else {
                this._toggleShowSelected();
              }
            }
            this.featureSelectionChange.emit(this._selectedIndexes);
          });

          this.reactiveUtils.watch(
            () => this._table.activeSortOrders,
            (sortOrders) => {
              this._sortActive = sortOrders.length > 0 && sortOrders[0]?.direction === "asc" || sortOrders[0]?.direction === "desc";
            });
        });
      });
    }
  }

  /**
   * Reset basic table props
   *
   * @returns void
   */
  protected async _resetTable(): Promise<void> {
    if (this._layer && this._table) {
      this._clearSelection();
      this._allIds = [];
      this.featureSelectionChange.emit(this._selectedIndexes);
      this._table.layer = this._layer;
      this._editEnabled = this._layer.editingEnabled;
      this._table.view = this.mapView;
      this._table.editingEnabled = this._editEnabled;
      this._table.clearSelectionFilter();
      this._showOnlySelected = false;
      this._sortActive = false;
      await this._sortTable();
    }
  }

  /**
   * Sort the objectid field in descending order
   *
   * @returns void
   */
  protected async _sortTable(): Promise<void> {
    if (this._table && this._layer && !this._sortActive) {
      if (!this._tableSorting && this.showNewestFirst) {
        this._tableSorting = true;
        await this._table.when(async () => {
          await this._layer.when(async () => {
            this._table.sortColumn(this._layer.objectIdField, "desc");
            this._tableSorting = false;
          });
        });
      }
    }
  }

  /**
   * Handle map click events to keep table and map click selection in sync
   *
   * @param evt IMapClick map click event details
   *
   * @returns void
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
        if (index > -1) {
          this._table.highlightIds.removeAt(index);
        } else {
          this._table.highlightIds.add(id);
        }
      });
      if (this._showOnlySelected) {
        this._table.filterBySelection();
      }
    }
  }

  /**
   * Set the alertOpen member to false when the alert is closed
   *
   * @returns void
   */
  protected _alertClosed(): void {
    this._alertOpen = false;
  }

  /**
   * Select or deselect all rows
   *
   * @returns void
   */
  protected _selectAll(): void {
    const ids = this._allIds;
    this._table.highlightIds.addMany(ids);
    this._selectedIndexes = ids;
  }

  /**
   * Toggle the show only selected flag
   *  When showOnly is true only the selected features will be shown in the table
   *
   * @returns void
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
   *
   * @returns void
   */
  protected _clearSelection(): void {
    this._selectedIndexes = [];
    this._table.highlightIds.removeAll();
  }

  /**
   * Show the filter options
   *
   * @returns void
   */
  protected _filter(): void {
    alert("do whatever this button is supposed to do")
  }

  /**
   * Select all rows that are not currently selectd
   *
   * @returns void
   */
  protected _switchSelected(): void {
    const currentIndexes = [...this._selectedIndexes];
    this._selectedIndexes = this._allIds.reduce((prev, _cur, i) => {
      if (currentIndexes.indexOf(i) < 0) {
        prev.push(i);
      }
      return prev;
    }, []);
    this._table.highlightIds.removeAll();
    this._table.highlightIds.addMany(this._selectedIndexes);
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
      selectionSetNames: [],
      ids,
      layer: this._layer
    }
    void downloadUtils.downloadCSV(
      exportInfos,
      false, // formatUsingLayerPopup
      true, // addColumnTitle
    );
  }

  /**
   * Refreshes the table and maintains the curent scroll position
   *
   * @returns void
   */
  protected _refresh(): void {
    void this._table.refresh();
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
   * Delete all selected records or shows an alert if the layer does not have editing enabled
   *
   * @returns a promise that will resolve when the operation is complete
   */
  protected _delete(): void {
    if (this._editEnabled) {
      this._alertIcon = "trash";
      this._alertTitle = this._translations.deleteRows;
      this._alertActionText = this._translations.delete;
      this._alertShowAction = true;
      this._alertMessage = this._translations.confirm;
      this._alertKind = "danger";
      this._alertActionFunction = () => {
        void this._layer.applyEdits({
          deleteFeatures: this._table.highlightIds.toArray()
        });
        this._alertOpen = false;
      }
    } else {
      this._alertIcon = "layer-broken";
      this._alertTitle = this._translations.deleteDisabled;
      this._alertShowAction = false;
      this._alertMessage = this._translations.enableEditing;
      this._alertKind = "warning";
    }
    this._alertOpen = true;
  }

  /**
   * Get the graphics for all selected indexes
   *
   * @param ids the ids for the graphics to fetch
   *
   * @returns An array of selected graphics
   */
  protected async _getGraphics(
    ids: number[]
  ): Promise<__esri.Graphic[]> {
    return ids.length > 0 ? queryFeaturesByID(
      ids,
      this._table.layer as __esri.FeatureLayer,
      [],
      false,
      this.mapView.spatialReference
    ) : [];
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
    if (id !== this._layer.id || this._allIds.length === 0) {
      this._fetchingData = true;
      this._layer = await getLayer(this.mapView, id);
      this._allIds = await queryAllIds(this._layer)
      if (!this._table) {
        await this._getTable(this._tableNode);
      }
      await this._table.when(() => {
        this._table.highlightIds.removeAll();
      });
      this._selectedIndexes = [];
      this._table.layer = this._layer;
      this._table.render();
    }
    this._sortActive = false;
    await this._sortTable();
    this._fetchingData = false;
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
