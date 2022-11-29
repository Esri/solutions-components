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

import { Component, Host, h, VNode } from '@stencil/core';
import { calculatePCI } from '../../utils/pciUtils';

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
            Enter comma delimited deduct values
            {this._getDeductValuesInput()}
          </calcite-label>
        </div>
        <div>
          {this._getCalculateInput()}
        </div>
      </Host>
    );
  }

  protected _deductValuesElement: HTMLCalciteInputElement;

  protected _getDeductValuesInput(): VNode {
    return (
      <calcite-input
        ref={(el) => { this._deductValuesElement = el }}
      />
    );
  }

  protected _getCalculateInput(): VNode {
    return (
      <calcite-button
        onClick={
          () => this._calculateDeduct(
            this._deductValuesElement.value
          )
        }
      >Calculate PCI</calcite-button>
    );
  }

  protected _calculateDeduct(
    deductValueString: string
  ): void {
    const deductValues: number[] = deductValueString.split(",").map(parseFloat);
    const pci = calculatePCI(deductValues, 1, true);
    const rating = pci <= 10 ? "Failed" :
      pci <= 25 ? "Serious" :
      pci <= 40 ? "Very Poor" :
      pci <= 55 ? "Poor" :
      pci <= 70 ? "Fair" :
      pci <= 85 ? "Satisfactory" : "Good";

    console.log(`PCI: ${pci}`);
    console.log(`Rating: ${rating}`)
    alert("See debug console for results");
  }

}
