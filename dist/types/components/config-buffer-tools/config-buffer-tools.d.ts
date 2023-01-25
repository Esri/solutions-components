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
import { VNode } from '../../stencil-public-runtime';
import ConfigBufferTools_T9n from "../../assets/t9n/config-buffer-tools/resources.json";
export declare class ConfigBufferTools {
  el: HTMLConfigBufferToolsElement;
  /**
   * number: Default distance value.
   */
  distance: number;
  /**
   * string: Default unit value.
   * Should be a unit listed in assets/t9n/config-buffer-tools/resources
   */
  unit: string;
  /**
   * When checked the buffer tools will be show in the config
   */
  _showBufferChecked: boolean;
  /**
   * When checked the buffer tools will be avalible at runtime.
   */
  protected _showBufferElement: HTMLCalciteCheckboxElement;
  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  _translations: typeof ConfigBufferTools_T9n;
  /**
   * Returns a key/value pair that represents the checkbox value and checked state
   *
   * @returns Promise with the state of the checkboxes
   */
  getConfigInfo(): Promise<{
    [key: string]: number | string;
  }>;
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
   * Store the user defined distance
   *
   * @protected
   */
  protected _distanceChanged(evt: CustomEvent): void;
  /**
   * Store the user defined unit
   *
   * @protected
   */
  protected _unitSelectionChange(evt: CustomEvent): void;
  /**
   * Render the various unit options
   *
   * @returns Promise when complete
   * @protected
   */
  protected _renderUnitOptions(): VNode[];
  /**
   * When not checked the buffer options will be disabled in the config and not visible in the UI at runtime
   *
   * @protected
   */
  protected _setShowBufferChecked(): void;
  /**
   * Fetches the component's translations
   *
   * @returns Promise when complete
   * @protected
   */
  protected _getTranslations(): Promise<void>;
}
