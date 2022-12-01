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

// This is a demo component for internal use only.
// It may eventually live somewhere else and doesn't really need to be a component.
// The main code will be whats in the supporting util file...it will be used by a survey123 form.
// It has been requested that we have a simple way to demo and test the functionality.
// I am putting here now just to keep together with other current work.

import { Component, Element, Event, EventEmitter, Host, h, VNode } from '@stencil/core';
import { calculateDeductValue, EDistressType, ESeverity } from '../../utils/pciUtils';

@Component({
  tag: 'deduct-calculator',
  styleUrl: 'deduct-calculator.css',
  shadow: true,
})
export class DeductCalculator {
  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLBufferToolsElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

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
  protected _types: string[] = Object.keys(EDistressType).filter(k => !isNaN(Number(EDistressType[k])));

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

  /**
   * Emitted on demand when the user clicks to calculate the deduct value
   */
  @Event() deductValueComplete: EventEmitter<number>;

  //--------------------------------------------------------------------------
  //
  //  Functions (lifecycle)
  //
  //--------------------------------------------------------------------------

  /**
   * Renders the component.
   */
  render() {
    return (
      <Host>
        <div class="label-display">
          <calcite-label disableSpacing={true} class="label-display">
            Density %
            {this._getDensityInput()}
          </calcite-label>
          <calcite-label disableSpacing={true} class="label-display">
            Type
            {this._getTypeInput()}
          </calcite-label>
          <calcite-label disableSpacing={true} class="label-display">
            Severity
            {this._getSeverityInput()}
          </calcite-label>
        </div>
        <div>
          {this._getCalculateInput()}
        </div>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * Render the density input
   *
   * @returns a node with a control to set the density number (float)
   *
   * @protected
   */
  protected _getDensityInput(): VNode {
    return (
      <calcite-input
        max={100}
        min={0}
        ref={(el) => { this._densityElement = el }}
        type='number'
      />
    );
  }

  /**
   * Render the distress type input
   *
   * @returns a node with a control that shows the distress type name and value
   * for example ALIGATOR_CRACKING (1)
   *
   * @protected
   */
  protected _getTypeInput(): VNode {
    return (
      <calcite-select label='' ref={(el) => { this._typeElement = el }}>
        {
          this._types.map((t, i) => <calcite-option value={EDistressType[t].toString()}>{`${t} (${i + 1})`}</calcite-option>)
        }
      </calcite-select>
    );
  }

  /**
   * Render the distress type input
   *
   * @returns a node with a control that shows the distress type name and value
   * for example ALIGATOR_CRACKING (1)
   *
   * @protected
   */
  protected _getSeverityInput(): VNode {
    return (
      <calcite-select label='' ref={(el) => { this._severityElement = el }}>
        <calcite-option value={ESeverity.H}>High</calcite-option>
        <calcite-option value={ESeverity.M}>Medium</calcite-option>
        <calcite-option value={ESeverity.L}>Low</calcite-option>
      </calcite-select>
    );
  }

  /**
   * Render calculate deduct value button
   *
   * @returns a node with a control that calculates the deduct value
   *
   * @protected
   */
  protected _getCalculateInput(): VNode {
    return (
      <calcite-button
        onClick={
          () => this._calculateDeduct(
            parseFloat(this._typeElement.value),
            this._severityElement.value as unknown as ESeverity,
            parseFloat(this._densityElement.value)
          )
        }
      >Calculate Deduct Value</calcite-button>
    );
  }

  /**
   * Calculate the deduct value based on the user inputs using the ASTM methodology
   *
   * @param type distress type 1-19 based on ASTM
   * @param severity "H" | "M" | "L" high, med, low based on ASTM
   * @param density percent density of the distress type and severity based on total sample area
   *
   * @protected
   */
  protected _calculateDeduct(
    type: number,
    severity: ESeverity,
    density: number
  ): void {
    if (type && severity && !isNaN(density)) {
      const dv = calculateDeductValue(type.toString(), severity.toString(), density.toString(), true);
      this.deductValueComplete.emit(dv);
      alert(dv);
    } else {
      alert("Type, severity, and a density number are required");
    }
  }
}
