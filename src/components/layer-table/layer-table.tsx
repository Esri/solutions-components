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

import { Component, Element, Host, h, Prop, State, VNode } from '@stencil/core';
import LayerTable_T9n from "../../assets/t9n/layer-table/resources.json";
import { getLocaleComponentStrings } from "../../utils/locale";
import { getMapLayerView, goToSelection } from "../../utils/mapViewUtils";
import { queryAllFeatures } from "../../utils/queryUtils";
import { queryFeaturesByID } from "../../utils/queryUtils";
import { exportCSV } from "../../utils/csvUtils";

// TODO look for options to better handle very large number of records
//  has a hard time especially with select all when we have many rows
// TODO test with data that contains domains

@Component({
  tag: 'layer-table',
  styleUrl: 'layer-table.css',
  shadow: true,
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
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() _translations: typeof LayerTable_T9n;

  /**
   * A list of indexes that are currently selected
   */
  @State() _selectedIndexes: number[] = [];

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * HTMLEditRecordModalElement: Modal used to edit multiple records
   */
  protected _editMultipleMpdal: HTMLEditRecordModalElement;

  /**
   * esri/Graphic[]: https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html
   */
  protected _graphics: __esri.Graphic[] = [];

  /**
   * esri/views/layers/FeatureLayerView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html
   */
  protected _layerView: __esri.FeatureLayerView;

  /**
   * string[]: List of field names to display
   */
  protected _fieldNames: string[] = [];

  /**
   * HTMLCalciteCheckboxElement: Element to force selection of all records
   */
  protected _selectAllElement: HTMLCalciteCheckboxElement;

  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------

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
  }

  /**
   * Renders the component.
   */
  render() {
    return (
      <Host>
        {this._getTableControlRow()}
        <div class="data-container">
          <div class="table-container">
            <div class="table">
              {this._getTableHeader()}
              {this._getTableRows()}
            </div>
          </div>
        </div>
        <edit-record-modal
          ref={(el) => this._editMultipleMpdal = el}
        />
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * Gets a row of controls that can be used for various interactions with the table
   *
   * @returns The dom node that contains the controls
   */
  protected _getTableControlRow(): VNode {
    const featuresSelected = this._selectedIndexes.length > 0;
    const multiFeaturesSelected = this._selectedIndexes.length > 1;
    return (
      <div class="display-flex table-border">
        <map-layer-picker
          mapView={this.mapView}
          onLayerSelectionChange={(evt) => this._layerSelectionChanged(evt)}
        />
        <div>
          <calcite-button
            appearance='transparent'
            color='neutral'
            disabled={!featuresSelected}
            iconStart='magnifying-glass'
            onClick={() => this._zoom()}
          >
            {this._translations.zoom}
          </calcite-button>
          <calcite-button
            appearance='transparent'
            color='neutral'
            disabled={!multiFeaturesSelected}
            iconStart='pencil'
            onClick={() => this._editMultiple()}
          >
            {this._translations.editMultiple}
          </calcite-button>
          <calcite-button
            appearance='transparent'
            color='neutral'
            disabled={!featuresSelected}
            iconStart='trash'
            onClick={() => this._delete()}
          >
            {this._translations.delete}
          </calcite-button>
          <calcite-split-button
            appearance="transparent"
            color="neutral"
            primary-text={this._translations.more}
          >
            <calcite-dropdown-group selection-mode="none">
              <calcite-dropdown-item
                iconStart='list-check-all'
                onClick={() => this._selectAll(true)}
              >
                {this._translations.selectAll}
              </calcite-dropdown-item>
              <calcite-dropdown-item
                iconStart='selected-items-filter'
                onClick={() => this._showSelected()}
              >
                {this._translations.showSelected}
              </calcite-dropdown-item>
              <calcite-dropdown-item
                iconStart='erase'
                onClick={() => this._clearSelection()}
              >
                {this._translations.clearSelection}
              </calcite-dropdown-item>
              <calcite-dropdown-item
                iconStart='refresh'
                onClick={() => this._switchSelected()}
              >
                {this._translations.switchSelected}
              </calcite-dropdown-item>
              <calcite-dropdown-item
                iconStart='export'
                onClick={() => this._exportToCSV()}
              >
                {this._translations.exportCSV}
              </calcite-dropdown-item>
            </calcite-dropdown-group>
          </calcite-split-button>
        </div>
      </div>
    );
  }

  /**
   * Gets the table header with a select all control and column headers for each field
   *
   * @returns The dom node that contains the header
   */
  protected _getTableHeader(): VNode {
    return (
      <div class="header">
        <div class="table-header-cell padding-3-4">
          <calcite-checkbox
            class="display-flex justify-center"
            onClick={() => this._selectAll(this._selectAllElement.checked)}
            ref={(el) => this._selectAllElement = el}
          />
        </div>
        {this._fieldNames.map(name => this._getTableHeaderCell(name))}
      </div>
    );
  }

  /**
   * Gets a header cell for the table header
   *
   * @param name the string to display in the cell
   *
   * @returns The dom node that contains the header cell
   */
  protected _getTableHeaderCell(
    name: string
  ): VNode {
    return (
      <div class="table-header-cell field-width">
        {name}
      </div>
    );
  }

  /**
   * Gets the table rows for all features
   *
   * @returns The dom node that contains the body of the table
   */
  protected _getTableRows(): VNode[] {
    return (
      <div class="table-body">
        {this._graphics.map((g, i) => this._getTableRow(g, i))}
      </div>
    );
  }

  /**
   * Gets the individual table row for a feature
   *
   * @param g the graphic the row is based on
   * @param index the index location of the row within the table
   *
   * @returns The dom node that contains the row
   */
  protected _getTableRow(
    g: __esri.Graphic,
    index: number
  ): VNode {
    // TODO think through this more...should build the fieldType info once up front rather
    // than on every single value...
    const checked = this._selectedIndexes.indexOf(index) > -1;
    return (
      <div class="row">
        <div class="table-cell table-border padding-3-4">
          <calcite-checkbox
            checked={checked}
            class="display-flex justify-center"
            onClick={() => this._rowSelected(index)}
            value={index}
          />
        </div>
        {
          this._fieldNames.map(name => {
            const field = this._layerView.layer.fieldsIndex.get(name);
            return this._getTableRowCell(g.attributes[name], field, checked);
          })
        }
      </div>
    );
  }

  /**
   * Gets the individual table cell for the provided field
   *
   * @param v the value to display
   * @param field the field the row is based on
   * @param rowSelected when true editable fields will render a control that will allow the value to be updated
   *
   * @returns The dom node that contains the table cell
   */
  protected _getTableRowCell(
    v: string,
    field: __esri.Field,
    rowSelected: boolean
  ): VNode {
    const editable = field.editable && rowSelected;
    const inputType = this._getInputType(field.type);
    // TODO find some domain data to test with..this has not been tested
    let domainInput;
    const domain = field.domain;
    if (domain) {
      if (domain.type === "coded-value") {
        domainInput = (
          <calcite-select label=''>
            {domain.codedValues.map(cv => {
              return (<calcite-option label={cv.name} selected={v === cv.code.toString()} value={cv.code} />);
            })}
          </calcite-select>
        )
      } else {
        // range domain
        const range = domain as __esri.RangeDomain;
        domainInput = (<calcite-input max={range.maxValue} min={range.minValue} type="number" value={v} />);
      }
    };

    return (
      <div class="table-cell table-border field-width">
        {editable && domainInput ? domainInput : editable ? (<calcite-input type={inputType} value={v} />) : v}
      </div>
    );
  }

  /**
   * Simple lookup that will get the appropriate edit control for the value type
   *
   * @param type the Esri field type
   *
   * @returns A string for the type of control to create based on the provided field type
   */
  protected _getInputType(
    type: string
  ): "number" | "datetime-local" | "text" {
    // JS API field types
    // "string" | "small-integer" | "integer" | "single" | "double" | "long" | "date" | "oid" | "geometry" | "blob" | "raster" | "guid" | "global-id" | "xml"
    // not sure about these: "geometry" | "blob" | "raster" |  | "xml"

    // Calcite input types
    // color date datetime-local email file image month number password search tel text(default) textarea time url week
    const inputTypes = {
      "string": 'text',
      "small-integer": "number",
      "integer": "number",
      "single": "number",
      "double": "number",
      "long": "number",
      "date": "datetime-local",
      "oid": "number",
      "guid": "text",
      "global-id": "text"
    };

    return Object.keys(inputTypes).indexOf(type) > -1 ? inputTypes[type] : "text";
  }

  /**
   * Select or deselect all rows
   *
   * @param checked When true all rows will be selected
   *
   * @returns void
   */
  protected _selectAll(
    checked: boolean
  ): void {
    this._selectedIndexes = checked ? this._graphics.map((_g, i) => i) : [];
  }

  // need to discuss with team
  protected _showSelected(): void {
    console.log("_showSelected");
  }

  /**
   * Clears the selected indexes
   *
   * @returns void
   */
  protected _clearSelection(): void {
    this._selectedIndexes = [];
  }

  /**
   * Select all rows that are not currently selectd
   *
   * @returns void
   */
  protected _switchSelected(): void {
    const currentIndexes = [...this._selectedIndexes];
    this._selectedIndexes = this._graphics.reduce((prev, _cur, i) => {
      if (currentIndexes.indexOf(i) < 0) {
        prev.push(i);
      }
      return prev;
    }, []);
  }

  /**
   * Export all selected rows as CSV
   *
   * @returns a promise that will resolve when the operation is complete
   */
  protected async _exportToCSV(): Promise<void> {
    // Get the attributes of the features to export
    const ids = this._getSelectedIds();
    const featureSet = await queryFeaturesByID(ids, this._layerView.layer);
    const attributes = featureSet.features.map(f => f.attributes);

    // Get the column headings from the first record
    const columnNames: Set<string> = new Set();
    const entry = attributes[0];
    Object.keys(entry).forEach(k => {
      if (entry.hasOwnProperty(k)) {
        columnNames[k] = k;
      }
    });

    void exportCSV(attributes, columnNames);
  }

  /**
   * Zoom to all selected features
   *
   * @returns a promise that will resolve when the operation is complete
   */
  protected _zoom(): void {
    const ids = this._getSelectedIds();
    void goToSelection(ids, this._layerView, this.mapView, true);
  }

  /**
   * Open the edit multiple modal
   *
   * @returns void
   */
  protected _editMultiple(): void {
    this._editMultipleMpdal.open = true;
  }

  /**
   * Delete all selected records
   *
   * @returns a promise that will resolve when the operation is complete
   */
  protected _delete(): void {
    console.log("delete")
  }

  /**
   * Get the graphics for all selected indexes
   *
   * @param indexes the indexes for the graphics to fetch
   *
   * @returns An array of selected graphics
   */
  protected _getGraphics(
    indexes: number[]
  ): __esri.Graphic[] {
    return this._graphics.filter((_g, i) => indexes.indexOf(i) > -1);
  }

  /**
   * Gets the object ids for all selected rows
   *
   * @returns An array of object ids
   */
  protected _getSelectedIds(): number[] {
    const graphics = this._getGraphics(this._selectedIndexes);
    return graphics.map(g => g.getObjectId());
  }

  /**
   * Update the selected indexes based on the current row
   *
   * @param index the index of the selected row
   *
   * @returns void
   */
  protected _rowSelected(
    index: number
  ): void {
    const indexOfSelected = this._selectedIndexes.indexOf(index);
    if (indexOfSelected > -1) {
      this._selectedIndexes.splice(indexOfSelected, 1);
      this._selectedIndexes = [...this._selectedIndexes];
    } else {
      this._selectedIndexes = [...this._selectedIndexes, index];
    }
  }

  /**
   * Handles layer selection change to show new table
   *
   * @returns a promise that will resolve when the operation is complete
   */
  protected async _layerSelectionChanged(
    evt: CustomEvent
  ): Promise<void> {
    const layerName: string = evt.detail[0];
    this._layerView = await getMapLayerView(this.mapView, layerName);
    // TODO rethink this...when we use later we need to be able to lookup with name
    this._fieldNames = this._layerView.layer.fields.map(f => f.alias || f.name);
    this._graphics = await queryAllFeatures(0, this._layerView.layer, []);
    this._selectedIndexes = [];
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
