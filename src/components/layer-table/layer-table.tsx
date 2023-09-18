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
import { getLayerOrTable, getMapLayerIds, goToSelection } from "../../utils/mapViewUtils";
import { queryFeaturesByID, queryAllIds } from "../../utils/queryUtils";
import * as downloadUtils from "../../utils/downloadUtils";
import { IExportInfos, ILayerInfo, IMapClick, IMapInfo } from "../../utils/interfaces";

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
   * boolean: when true the layer table will auto refresh the data
   */
  @Prop() enableAutoRefresh: boolean;

  /**
   * boolean: when true edits can be applied directly within the table
   */
  @Prop() enableInlineEdit: boolean;

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
   * boolean: When true a loading indicator will be shown in the delete button
   */
  @State() _isDeleting = false;

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
   * boolean: When true the user will be asked to confirm the delete operation
   */
  protected _confirmDelete: boolean;

  /**
   * number[]: A list of all IDs for the current layer
   */
  protected _allIds: number[] = [];

  /**
   * boolean: When false alerts will be shown to indicate that the layer must have editing enabled for edit actions
   */
  protected _editEnabled: boolean;

  /**
   * boolean: When false alerts will be shown to indicate that the layer must have delete and editing enabled
   */
  protected _deleteEnabled: boolean;

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
    this._layer = await getLayerOrTable(this.mapView, mapLayerIds[0]);
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
    const total = this._allIds.length.toString();
    const selected = this._selectedIndexes.length.toString();
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
            <div class="bottom-left background text-color">
              {
                this._translations.recordsSelected
                  .replace("{{total}}", total)
                  .replace("{{selected}}", selected)
              }
            </div>
          </div>
          {this._getEditDisabledWarning()}
        </calcite-shell>
        {this._deleteMessage()}
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
              onlyShowUpdatableLayers={this.onlyShowUpdatableLayers}
              placeholderIcon="layers"
              scale="l"
              type="dropdown"
            />
          </div>
          {
            this._getAction(
              "magnifying-glass",
              this._translations.zoom,
              () => this._zoom(),
              !featuresSelected
            )
          }
          {
            this._getAction(
              "filter",
              this._translations.filters,
              () => this._filter(),
              false
            )
          }
          {
            this._deleteEnabled ? this._getDangerAction(
              "trash",
              this._translations.delete,
              () => this._delete(),
              !featuresSelected
            ) : undefined
          }
          {
            this._getAction(
              "erase",
              this._translations.clearSelection,
              () => this._clearSelection(),
              !featuresSelected
            )
          }
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
              iconStart="compare"
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
   * Get an action and tooltip
   *
   * @param icon string the name of the icon to display, will also be used as the id
   * @param label string the text to display and label the action
   * @param func any the function to execute
   * @param disabled boolean when true the user will not be able to interact with the action
   *
   * @returns VNode The node representing the DOM element that will contain the action
   */
  private _getAction(
    icon: string,
    label: string,
    func: any,
    disabled: boolean
  ): VNode {
    return (
      <div class={"display-flex"}>
        <calcite-action
          appearance="solid"
          disabled={disabled}
          icon={icon}
          id={icon}
          label={label}
          onClick={func}
          text={label}
          textEnabled={true}
        />
        <calcite-tooltip
          label=""
          placement="bottom"
          reference-element={icon}
        >
          <span>{label}</span>
        </calcite-tooltip>
      </div>
    )
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
    return (
      <div class="display-flex">
        <calcite-action
          appearance="solid"
          disabled={disabled}
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
        <calcite-tooltip
          label=""
          placement="bottom"
          reference-element={icon}
        >
          <span>{label}</span>
        </calcite-tooltip>
      </div>
    )
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
    node: HTMLDivElement,
    columnTemplates?: __esri.FieldColumnTemplate[] | __esri.GroupColumnTemplate[]
  ): Promise<void> {
    if (this._layer) {
      await this._layer.when(() => {
        this._table = new this.FeatureTable({
          autoRefreshEnabled: this.enableAutoRefresh,
          layer: this._layer,
          view: this.mapView,
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

      this._checkEditEnabled();

      await this._table.when(() => {
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
            this._sortActive = (sortOrders.length > 0 && sortOrders[0]?.direction === "asc" || sortOrders[0]?.direction === "desc") ||
              sortOrders[0]?.direction === null && sortOrders[0]?.fieldName === this._layer.objectIdField;
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
      await this._layer.when(() => {
        const columnTemplates = this._getColumnTemplates(this._layer.id);
        this._table.layer = this._layer;
        this._table.tableTemplate.columnTemplates = columnTemplates;
        this._table.view = this.mapView;
        this._checkEditEnabled();
        this._table.editingEnabled = this._editEnabled && this.enableInlineEdit;
      });

      await this._table.when(() => {
        this._table.clearSelectionFilter();
      });

      this._showOnlySelected = false;
      this._sortActive = false;
      await this._sortTable();
    }
  }

  /**
   * Verify edit capabilities of the layer
   *
   * @returns void
   */
  protected _checkEditEnabled(): void {
    this._editEnabled = this._layer.editingEnabled && this._layer.capabilities.operations.supportsUpdate;
    this._deleteEnabled = this._layer.editingEnabled && this._layer.capabilities.operations.supportsDelete;
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
        await this._table.when();
        await this._layer.when(() => {
          this._table.sortColumn(this._layer.objectIdField, "desc");
          this._tableSorting = false;
        });
      }
    }
  }

  /**
   * Show warning when editing is disabled
   *
   * @returns node with warning message
   */
  protected _getEditDisabledWarning(): VNode {
    return (
      <calcite-alert
        icon="layer-broken"
        kind="warning"
        label=""
        onCalciteAlertClose={() => this._alertClosed()}
        open={this._alertOpen && !this._confirmDelete}
        placement="top"
      >
        <div slot="title">
          {this._translations.deleteDisabled}
        </div>
        <div slot="message">
          {this._translations.enableEditing}
        </div>
      </calcite-alert>
    );
  }

  /**
   * Show delete confirmation message
   *
   * @returns node to confirm or deny the delete operation
   */
  protected _deleteMessage(): VNode {
    return (
      <calcite-modal
        aria-labelledby="modal-title"
        kind="danger"
        open={this._confirmDelete}
      >
        <div
          class="display-flex align-center"
          id="modal-title"
          slot="header"
        >
          <calcite-icon
            aria-hidden="true"
            class="padding-end-1 danger-color"
            icon="exclamation-mark-triangle"
            scale="m"
          />
          {this._translations.deleteFeature}
        </div>
        <div slot="content">
          {this._translations.confirm}
        </div>
        <calcite-button
          appearance="outline"
          kind="danger"
          onClick={() => this._alertClosed()}
          slot="secondary"
          width="full"
        >
          {this._translations.cancel}
        </calcite-button>
        <calcite-button
          kind="danger"
          loading={this._isDeleting}
          onClick={() => void this._deleteFeatures()}
          slot="primary" width="full">
          {this._translations.delete}
        </calcite-button>
      </calcite-modal>
    );
  }

  /**
   * Delete the currently selected features
   *
   * @returns void
   */
  protected async _deleteFeatures(): Promise<void> {
    this._isDeleting = true;
    const deleteFeatures = this._table.highlightIds.toArray().map((objectId) => {
      return {objectId};
    })
    await this._layer.applyEdits({
      deleteFeatures
    });
    await this._table.refresh();
    this._allIds = await queryAllIds(this._layer);
    this._isDeleting = false;
    this._alertClosed();
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
    this._confirmDelete = false;
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
    this._table.highlightIds.removeAll();
    const ids = this._allIds.reduce((prev, _cur) => {
      if (currentIndexes.indexOf(_cur) < 0) {
        prev.push(_cur);
      }
      return prev;
    }, []);
    this._table.highlightIds.addMany(ids);
    this._selectedIndexes = ids;
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
    void downloadUtils.downloadCSV(
      null,//???
      exportInfos,
      false, // formatUsingLayerPopup
      false, // removeDuplicates
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
      this._confirmDelete = true;
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
      const columnTemplates = this._getColumnTemplates(id);
      this._layer = await getLayerOrTable(this.mapView, id);
      this._allIds = await queryAllIds(this._layer)
      if (!this._table) {
        await this._getTable(this._tableNode, columnTemplates);
      } else if (columnTemplates) {
        this._table.tableTemplate.columnTemplates = columnTemplates;
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
   * Get any columnt templates for the current map
   *
   * @param id item ID of the current map
   *
   * @returns a list of column templates if they exist
   */
  protected _getColumnTemplates(
    id: string
  ): __esri.FieldColumnTemplate[] | __esri.GroupColumnTemplate[] {
    let layerInfo: ILayerInfo;
    this.mapInfo.layerInfos?.some(li => {
      if (li.id === id) {
        layerInfo = li;
        return true;
      }
    });
    return layerInfo?.columnTemplates;
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
