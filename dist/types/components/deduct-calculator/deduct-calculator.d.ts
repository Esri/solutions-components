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
import { EventEmitter, VNode } from '../../stencil-public-runtime';
import { ESeverity } from '../../utils/pciUtils';
export declare class DeductCalculator {
  el: HTMLBufferToolsElement;
  /**
   * HTMLCalciteInputElement: The html element for setting the density value
   */
  protected _densityElement: HTMLCalciteInputElement;
  /**
   * HTMLCalciteSelectElement: The html element for selecting the distress type
   * 1-19 based on values defined by ASTM standard
   */
  protected _typeElement: HTMLCalciteSelectElement;
  /**
   * HTMLCalciteSelectElement: The html element for selecting the distress severity
   * "H" | "M" | "L"
   */
  protected _severityElement: HTMLCalciteSelectElement;
  /**
   * string[]: Array of the distress types
   */
  protected _types: string[];
  /**
   * Emitted on demand when the user clicks to calculate the deduct value
   */
  deductValueComplete: EventEmitter<string>;
  /**
   * Renders the component.
   */
  render(): any;
  /**
   * Render the density input
   *
   * @returns a node with a control to set the density number (float)
   *
   * @protected
   */
  protected _getDensityInput(): VNode;
  /**
   * Render the distress type input
   *
   * @returns a node with a control that shows the distress type name and value
   * for example ALLIGATOR_CRACKING (1)
   *
   * @protected
   */
  protected _getTypeInput(): VNode;
  /**
   * Render the distress type input
   *
   * @returns a node with a control that shows the distress type name and value
   * for example ALLIGATOR_CRACKING (1)
   *
   * @protected
   */
  protected _getSeverityInput(): VNode;
  /**
   * Render calculate deduct value button
   *
   * @returns a node with a control that calculates the deduct value
   *
   * @protected
   */
  protected _getCalculateInput(): VNode;
  /**
   * Calculate the deduct value based on the user inputs using the ASTM methodology
   *
   * @param type distress type 1-19 based on ASTM
   * @param severity "H" | "M" | "L" high, med, low based on ASTM
   * @param density percent density of the distress type and severity based on total sample area
   *
   * @protected
   */
  protected _calculateDeduct(type: number, severity: ESeverity, density: number): void;
}
