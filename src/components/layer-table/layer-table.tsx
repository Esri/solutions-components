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
import { getMapLayerView } from "../../utils/mapViewUtils";
import { queryAllFeatures } from "../../utils/queryUtils";

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
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * esri/Graphic[]: https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html
   */
  @State() _graphics: __esri.Graphic[] = [];

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() _translations: typeof LayerTable_T9n;

  /**
   * esri/views/layers/FeatureLayerView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html
   */
  protected _layerView: __esri.FeatureLayerView;

  protected _fieldNames: string[] = [];

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
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------

  protected _getTableControlRow(): VNode {
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
            iconStart='magnifying-glass'
          >
            {this._translations.zoom}
          </calcite-button>
          <calcite-button
            appearance='transparent'
            color='neutral'
            iconStart='pencil'
          >
            {this._translations.editMultiple}
          </calcite-button>
          <calcite-button
            appearance='transparent'
            color='neutral'
            iconStart='trash'
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
                onClick={() => this._selectAll()}
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

  protected _getTableHeader(): VNode {
    return (
      <div class="header">
        <div class="table-header-cell padding-3-4">
          <calcite-checkbox
            class="display-flex justify-center"
            onClick={() => this._selectAll()}
          />
        </div>
        {this._fieldNames.map(name => this._getTableHeaderCell(name))}
      </div>
    );
  }

  protected _getTableHeaderCell(
    name: string
  ): VNode {
    return (
      <div class="table-header-cell">
        {name}
      </div>
    );
  }

  protected _getTableRows(): VNode[] {
    return (
      <div class="body">
        {this._graphics.map(g => this._getTableRow(g))}
      </div>
    );
  }

  protected _getTableRow(
    g: __esri.Graphic
  ): VNode {
    return (
      <div class="row">
        <div class="table-cell table-border">
          <calcite-checkbox
            class="display-flex justify-center"
            onClick={(evt) => this._rowSelected(evt)}
          />
        </div>
        {this._fieldNames.map(name => this._getTableRowCell(g.attributes[name]))}
      </div>
    );
  }

  protected _getTableRowCell(
    v: string
  ): VNode {
    return (
      <div class="table-cell table-border value-cell">
        {v}
      </div>
    );
  }

  protected _selectAll(): void {
    console.log("_selectAll");
  }

  protected _showSelected(): void {
    console.log("_showSelected");
  }

  protected _clearSelection(): void {
    console.log("_clearSelection");
  }

  protected _switchSelected(): void {
    console.log("_switchSelected");
  }

  protected _exportToCSV(): void {
    console.log("_exportToCSV");
  }

  protected _rowSelected(
    evt: MouseEvent
  ): void {
    console.log(evt);
  }

  protected async _layerSelectionChanged(
    evt: CustomEvent
  ): Promise<void> {
    const layerName:string = evt.detail[0];
    this._layerView = await getMapLayerView(this.mapView, layerName);
    this._fieldNames = this._layerView.layer.fields.map(f => f.alias || f.name);
    this._graphics = await queryAllFeatures(0, this._layerView.layer, []);
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
