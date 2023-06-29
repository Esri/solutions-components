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

import { Component, Element, Event, EventEmitter, Host, h, Method, Prop, State, VNode, Watch } from "@stencil/core";
import LayerTable_T9n from "../../assets/t9n/layer-table/resources.json";
import { loadModules } from "../../utils/loadModules";
import { getLocaleComponentStrings } from "../../utils/locale";
import { getMapLayerView, getMapLayerIds } from "../../utils/mapViewUtils";
import { queryFeaturesByID, queryAllIds } from "../../utils/queryUtils";
import * as downloadUtils from "../../utils/downloadUtils";
import { EEditMode, IExportInfos } from "../../utils/interfaces";

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
   * boolean: When true the edit multiple modal is shown
   */
  @State() _editMultipleOpen = false;

  /**
   * boolean: When true a loading indicator will be shown in place of the layer table
   */
  @State() _fetchingData = false;

  /**
   * esri/views/layers/FeatureLayerView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html
   */
  @State() _layerView: __esri.FeatureLayerView;

  /**
   * number[]: A list of indexes that are currently selected
   */
  @State() _selectedIndexes: number[] = [];

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
   * HTMLCalciteCheckboxElement: Element to force selection of all records
   */
  protected _selectAllElement: HTMLCalciteCheckboxElement;

  /**
   * boolean: When true only selected records will be shown in the table
   */
  protected _showOnlySelected = false;

  /**
   * esri/widgets/FeatureTable: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-FeatureTable.html
   */
  protected _table: __esri.FeatureTable;

  /**
   * HTMLDivElement: Element to hold the FeatureTable
   */
  protected _tableNode: HTMLDivElement;

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
    const mapLayerIds = await getMapLayerIds(this.mapView);
    this._layerView = await getMapLayerView(this.mapView, mapLayerIds[0]);
  }

  /**
   * watch for changes in layer view and verify if it has editing enabled
   */
  @Watch("_layerView")
  async _layerViewWatchHandler(): Promise<void> {
    this._editEnabled = this._layerView?.layer.editingEnabled;
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
    if (!this._layerView) {
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
          <edit-record-modal
            editMode={EEditMode.MULTI}
            onModalClosed={() => this._editMultipleClosed()}
            open={this._editMultipleOpen}
            slot="modals"
          />
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
    const [FeatureTable] = await loadModules([
      "esri/widgets/FeatureTable"
    ]);
    this.FeatureTable = FeatureTable;
  }

  /**
   * Gets a row of controls that can be used for various interactions with the table
   *
   * @returns The dom node that contains the controls
   */
  protected _getTableControlRow(
    slot?: string
  ): VNode {
    const featuresSelected = this._selectedIndexes.length > 0;
    const multiFeaturesSelected = this._selectedIndexes.length > 1;
    return (
      <div class="display-flex table-border height-51" slot={slot}>
        <div class="min-width-400 border-end">
          <map-layer-picker
            appearance="solid"
            mapView={this.mapView}
            onLayerSelectionChange={(evt) => this._layerSelectionChanged(evt)}
            placeholderIcon="layers"
            scale="l"
            type="dropdown"
          />
        </div>
        <calcite-action-bar
          expandDisabled={true}
          expanded={true}
          layout="horizontal"
        >
          <calcite-action
            appearance="solid"
            disabled={!featuresSelected}
            icon="magnifying-glass"
            label={this._translations.zoom}
            onClick={() => this._zoom()}
            text={this._translations.zoom}
            textEnabled={true}
          />
          <calcite-action
            appearance="solid"
            disabled={!multiFeaturesSelected}
            icon="pencil"
            label={this._translations.editMultiple}
            onClick={() => this._editMultiple()}
            text={this._translations.editMultiple}
            textEnabled={true}
          />
          <calcite-action
            appearance="solid"
            icon="filter"
            onClick={() => this._filter()}
            text={this._translations.filters}
            text-enabled="true"
            textEnabled={true}
          />
          <calcite-action
            appearance="solid"
            disabled={!featuresSelected}
            icon="trash"
            onClick={() => this._delete()}
            text={this._translations.delete}
            text-enabled
            textEnabled={true}
          />
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
              onClick={() => this._showSelected()}
            >
              {this._translations.showSelected}
            </calcite-dropdown-item>
            <calcite-dropdown-item
              iconStart="erase"
              onClick={() => this._clearSelection()}
            >
              {this._translations.clearSelection}
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
   * Cloase the edit multiple modal
   */
  protected _editMultipleClosed(): void {
    this._editMultipleOpen = false;
  }

  /**
   * Store a reference to the table node after it's first created
   * and initializes the FeatureTable
   *
   * @returns void
   */
  private onTableNodeCreate = (node: HTMLDivElement) => {
    this._tableNode = node;
    this._getTable(node);
  }

  /**
   * Initialize the FeatureTable
   *
   * @returns void
   */
  protected _getTable(node: HTMLDivElement): void {
    if (this._layerView?.layer) {
      this._table = new this.FeatureTable({
        layer: this._layerView.layer,
        view: this.mapView,
        editingEnabled: this._editEnabled,
        highlightOnRowSelectEnabled: true,
        multiSortEnabled: false,
        visibleElements: {
          header: false,
          menu: false
        },
        container: node
      } as __esri.FeatureTableProperties);

      this._table.highlightIds.on("change", () => {
        this._selectedIndexes = this._table.highlightIds.toArray();
        this.featureSelectionChange.emit(this._selectedIndexes);
      });
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
   * @param checked When true all rows will be selected
   *
   * @returns void
   */
  protected _selectAll(): void {
    const ids = this._allIds;
    this._table.highlightIds.addMany(ids);
    this._selectedIndexes = ids;
  }

  // need to discuss with team
  protected _showSelected(): void {
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
    exportInfos[this._layerView.layer.id] = {
      selectionSetNames: [],
      ids,
      layerView: this._layerView
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
   * Open the edit multiple modal or shows an alert if the layer does not have editing enabled
   *
   * @returns void
   */
  protected _editMultiple(): void {
    if (this._editEnabled) {
      this._editMultipleOpen = true;
    } else {
      this._alertIcon = "layer-broken";
      this._alertTitle = this._translations.editMultipleDisabled;
      this._alertShowAction = false;
      this._alertMessage = this._translations.enableEditing;
      this._alertKind = "warning";
      this._alertOpen = true;
    }
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
        void this._layerView.layer.applyEdits({
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
   * @param indexes the indexes for the graphics to fetch
   *
   * @returns An array of selected graphics
   */
  protected async _getGraphics(
    ids: number[]
  ): Promise<__esri.Graphic[]> {
    return ids.length > 0 ? queryFeaturesByID(ids, this._table.layer as __esri.FeatureLayer, []) : [];
  }

  /**
   * Handles layer selection change to show new table
   *
   * @returns a promise that will resolve when the operation is complete
   */
  protected async _layerSelectionChanged(
    evt: CustomEvent
  ): Promise<void> {
    const id: string = evt.detail[0];
    if (id !== this._layerView?.layer.id || this._allIds.length === 0) {
      this._fetchingData = true;
      this._table.highlightIds.removeAll();
      this._layerView = await getMapLayerView(this.mapView, id);
      this._allIds = await queryAllIds(this._layerView.layer)
      this._selectedIndexes = [];
      this._table.layer = this._layerView.layer;
      this._table.render();
      this._fetchingData = false;
    }
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
