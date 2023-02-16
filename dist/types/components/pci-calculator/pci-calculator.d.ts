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
export declare class PciCalculator {
  el: HTMLPciCalculatorElement;
  /**
   * Boolean: Show/Hide the calculate deduct value UI
   */
  showAddDeduct: boolean;
  /**
   * HTMLCalciteInputElement: The html element for setting deduct values
   */
  protected _deductValuesElement: HTMLCalciteInputElement;
  /**
   * Renders the component.
   */
  render(): any;
  /**
   * Load the calculate deduct values calculate UI
   *
   * @returns calculate deduct value UI node
   *
   * @protected
   */
  protected _getDeductValuesInput(): VNode;
  /**
   * Add the calculate PCI button
   *
   * @returns calculate PCI button
   *
   * @protected
   */
  protected _getCalculateButton(): VNode;
  /**
   * Toggle the value that controls show/hide of the deduct value UI
   *
   * @protected
   */
  protected _toggleShowAddDeduct(): void;
  /**
   * Hide the calculate deduct value UI and add the newly calculated value
   *
   * @param event the event from the calculate deduct value control
   *
   * @protected
   */
  protected _addDeductValue(evt: CustomEvent): void;
  /**
   * Calculate the PCI value based on the ASTM methodology
   *
   * @param deductValuesString string with comma delimited numbers
   * Survery123 does not accept array type arguments for passing to scripts.
   * The string will be parsed within the script that will be consumed by Survey123
   *
   * @protected
   */
  protected _calculatePCI(deductValuesString: string): void;
}
