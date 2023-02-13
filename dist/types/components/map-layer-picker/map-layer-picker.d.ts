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
import { EventEmitter, VNode } from "../../stencil-public-runtime";
import { SelectionMode } from "../../utils/interfaces";
export declare class MapLayerPicker {
  el: HTMLMapLayerPickerElement;
  /**
   * string[]: Optional list of enabled layer ids
   *  If empty all layers will be available
   */
  enabledLayerIds: string[];
  /**
   * esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  mapView: __esri.MapView;
  /**
   * string[]: list of layer ids that have been selected by the end user
   */
  selectedLayerIds: string[];
  /**
   * SelectionMode: "single" | "multi"
   *
   * Should the component support selection against a single layer or multiple layers.
   */
  selectionMode: SelectionMode;
  /**
   * string[]: list of layer ids from the map
   */
  layerIds: string[];
  /**
   * HTMLCalciteSelectElement: The html element for selecting layers
   */
  protected _layerElement: HTMLCalciteSelectElement;
  /**
   * Called each time the mapView prop is changed.
   *
   */
  watchStateHandler(newValue: boolean, oldValue: boolean): Promise<void>;
  /**
   * Emitted on demand when a layer is selected
   *
   */
  layerSelectionChange: EventEmitter<string[]>;
  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   */
  componentWillLoad(): Promise<void>;
  /**
   * Renders the component.
   */
  render(): VNode;
  /**
   * Create a list of layers from the map
   *
   * Used for selecting a single layer.
   *
   * @returns Calcite Select component with the ids of the layers from the map
   */
  _getSelect(): VNode;
  /**
   * Create a list of layer ids from the map
   *
   * Used for selecting multiple layers
   *
   * @returns Calcite ComboBox component with the ids of the layers from the map
   */
  _getCombobox(): VNode;
  /**
   * Hydrate a select or combobox component with the ids of the layers in the map
   *
   * @returns Array of ComboBox items or Select options for the ids of the layers
   */
  _addMapLayersOptions(): VNode[];
  /**
   * Fetch the ids of the layers from the map
   *
   * @returns Promise when the operation has completed
   */
  _setLayers(): Promise<void>;
  /**
   * Create a layer id:title hash for layer name display
   *
   * @returns Promise when the operation has completed
   */
  protected _initLayerHashState(): Promise<void>;
  /**
   * Fetch the ids of the layers from the map
   *
   * @returns Promise when the operation has completed
   */
  _layerSelectionChange(evt: CustomEvent): void;
}
