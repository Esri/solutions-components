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
import ConfigDrawTools_T9n from "../../assets/t9n/config-draw-tools/resources.json";
export declare class ConfigDrawTools {
  el: HTMLConfigDrawToolsElement;
  /**
   * boolean: All checkboxes checked state will be set with this value on first render.
   * Default is true
   */
  defaultChecked: boolean;
  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  _translations: typeof ConfigDrawTools_T9n;
  /**
   * HTMLCheckListElement: The check list element
   */
  protected _checkList: HTMLCheckListElement;
  /**
   * Returns a key/value pair that represents the checkbox value and checked state
   *
   * @returns Promise with the state of the checkboxes
   */
  getConfigInfo(): Promise<{
    [key: string]: boolean;
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
   * Fetches the component's translations
   *
   * @returns Promise when complete
   * @protected
   */
  protected _getTranslations(): Promise<void>;
}
