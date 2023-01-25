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
import ConfigLayerPicker_T9n from "../../assets/t9n/config-layer-picker/resources.json";
export declare class ConfigLayerPicker {
  el: HTMLConfigLayerPickerElement;
  /**
   * boolean: All checkboxes checked state will be set with this value on first render.
   * Default is true
   */
  defaultChecked: boolean;
  /**
   * string: Value to be shown above the check list
   * Allows this to support multiple sets of layers.
   */
  instruction: string;
  /**
   * esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  mapView: __esri.MapView;
  /**
   * string[]: list of layer names from the map
   */
  _layerNames: string[];
  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  _translations: typeof ConfigLayerPicker_T9n;
  /**
   * HTMLCheckListElement: The check list element
   */
  protected _checkList: HTMLCalciteComboboxElement;
  /**
   * Called each time the mapView prop is changed.
   *
   */
  watchStateHandler(): Promise<void>;
  /**
   * Returns a list of layers that have been selected
   *
   * @returns Promise with a list of layer names to use
   */
  getConfigInfo(): Promise<string[]>;
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
  _getComboboxItems(): VNode[];
  /**
   * Fetch the names of the layers from the map
   *
   * @returns Promise when the operation has completed
   */
  _setLayers(): Promise<void>;
  /**
   * Fetches the component's translations
   *
   * @returns Promise when complete
   * @protected
   */
  protected _getTranslations(): Promise<void>;
}
