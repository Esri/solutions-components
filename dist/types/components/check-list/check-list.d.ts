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
export declare class CheckList {
  el: HTMLCheckListElement;
  /**
   * boolean: All checkboxes checked state will be set with this value on first render.
   * Default is true
   */
  defaultChecked: boolean;
  /**
   * string []: The values to render beside the checkboxes
   */
  values: string[];
  /**
   * A list of all checkbox elements for this component
   *
   * @protected
   */
  protected _elements: HTMLCalciteCheckboxElement[];
  /**
   * Returns a key/value pair that represents the checkbox value and checked state
   *
   * @returns Promise with the state of the checkboxes
   */
  getConfigInfo(): Promise<{
    [key: string]: boolean;
  }>;
  /**
   * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
   */
  componentDidLoad(): Promise<void>;
  /**
   * Renders the component.
   */
  render(): any;
  /**
   * Render a checkbox with a label for each of the types listed in the NLS
   *
   * @returns Array of label/checkbox input nodes
   * @protected
   */
  protected _renderCheckboxes(values: string[]): VNode[];
}
