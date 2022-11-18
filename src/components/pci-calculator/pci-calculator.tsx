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

import { Component, Host, h, VNode } from '@stencil/core';
import { calcPCI, EDistressType, ESeverity } from '../../utils/pciUtils';

@Component({
  tag: 'pci-calculator',
  styleUrl: 'pci-calculator.css',
  shadow: true,
})
export class PciCalculator {

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

  protected _densityElement: HTMLCalciteInputElement;

  protected _typeElement: HTMLCalciteSelectElement;

  protected _severityElement: HTMLCalciteSelectElement;

  protected _types: string[] = Object.keys(EDistressType).filter(k => !isNaN(Number(EDistressType[k])));

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

  protected _getTypeInput(): VNode {
    return (
      <calcite-select label='' ref={(el) => { this._typeElement = el }}>
        {
          this._types.map(t => <calcite-option value={EDistressType[t].toString()}>{t}</calcite-option>)
        }
      </calcite-select>
    );
  }

  protected _getSeverityInput(): VNode {
    return (
      <calcite-select label='' ref={(el) => { this._severityElement = el }}>
        <calcite-option value={ESeverity.H}>High</calcite-option>
        <calcite-option value={ESeverity.M}>Medium</calcite-option>
        <calcite-option value={ESeverity.L}>Low</calcite-option>
      </calcite-select>
    );
  }

  protected _getCalculateInput(): VNode {
    return (
      <calcite-button
        onClick={
          () => this._calculatePCI(
            parseFloat(this._typeElement.value),
            this._severityElement.value as unknown as ESeverity,
            parseFloat(this._densityElement.value)
          )
        }
      >Calculate Deduct Value</calcite-button>
    );
  }

  protected _calculatePCI(
    type: number,
    severity: ESeverity,
    density: number
  ): void {
    if (type && severity && !isNaN(density)) {
      alert(calcPCI(type, severity, density));
    } else {
      alert("Check your settings homie");
    }
  }
}
