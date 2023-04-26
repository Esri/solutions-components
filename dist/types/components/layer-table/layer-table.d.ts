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
import { VNode } from '../../stencil-public-runtime';
import LayerTable_T9n from "../../assets/t9n/layer-table/resources.json";
export declare class LayerTable {
  el: HTMLCrowdsourceManagerElement;
  /**
   * esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  mapView: __esri.MapView;
  /**
   * esri/views/layers/FeatureLayerView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html
   */
  _layerView: __esri.FeatureLayerView;
  /**
   * A list of indexes that are currently selected
   */
  _selectedIndexes: number[];
  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  _translations: typeof LayerTable_T9n;
  /**
   * esri/widgets/FeatureTable: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-FeatureTable.html
   */
  protected FeatureTable: typeof import("esri/widgets/FeatureTable");
  /**
   * HTMLEditRecordModalElement: Modal used to edit multiple records
   */
  protected _editMultipleMpdal: HTMLEditRecordModalElement;
  /**
   * string[]: List of field names to display
   */
  protected _fieldNames: string[];
  /**
   * esri/Graphic[]: https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html
   */
  protected _graphics: __esri.Graphic[];
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
  mapViewWatchHandler(): Promise<void>;
  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   *
   * @returns Promise when complete
   */
  componentWillLoad(): Promise<void>;
  /**
   * Renders the component.
   */
  render(): any;
  /**
   * Load esri javascript api modules
   *
   * @returns Promise resolving when function is done
   *
   * @protected
   */
  protected _initModules(): Promise<void>;
  /**
   * Gets a row of controls that can be used for various interactions with the table
   *
   * @returns The dom node that contains the controls
   */
  protected _getTableControlRow(): VNode;
  /**
   * Store a reference to the table node after it's first created
   * and initializes the FeatureTable
   *
   * @returns void
   */
  private onTableNodeCreate;
  /**
   * Initialize the FeatureTable
   *
   * @returns void
   */
  protected _getTable(node: HTMLDivElement): void;
  /**
   * Select or deselect all rows
   *
   * @param checked When true all rows will be selected
   *
   * @returns void
   */
  protected _selectAll(checked: boolean): void;
  protected _showSelected(): void;
  /**
   * Clears the selected indexes
   *
   * @returns void
   */
  protected _clearSelection(): void;
  /**
   * Select all rows that are not currently selectd
   *
   * @returns void
   */
  protected _switchSelected(): void;
  /**
   * Export all selected rows as CSV
   *
   * @returns a promise that will resolve when the operation is complete
   */
  protected _exportToCSV(): void;
  /**
   * Zoom to all selected features
   *
   * @returns a promise that will resolve when the operation is complete
   */
  protected _zoom(): void;
  /**
   * Open the edit multiple modal
   *
   * @returns void
   */
  protected _editMultiple(): void;
  /**
   * Delete all selected records
   *
   * @returns a promise that will resolve when the operation is complete
   */
  protected _delete(): void;
  /**
   * Get the graphics for all selected indexes
   *
   * @param indexes the indexes for the graphics to fetch
   *
   * @returns An array of selected graphics
   */
  protected _getGraphics(indexes: number[]): __esri.Graphic[];
  /**
   * Gets the object ids for all selected rows
   *
   * @returns An array of object ids
   */
  protected _getSelectedIds(): number[];
  /**
   * Update the selected indexes based on the current row
   *
   * @param index the index of the selected row
   *
   * @returns void
   */
  protected _rowSelected(index: number): void;
  /**
   * Handles layer selection change to show new table
   *
   * @returns a promise that will resolve when the operation is complete
   */
  protected _layerSelectionChanged(evt: CustomEvent): Promise<void>;
  /**
   * Fetches the component's translations
   *
   * @returns Promise when complete
   * @protected
   */
  protected _getTranslations(): Promise<void>;
}
