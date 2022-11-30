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

import { Component, Host, h, State, VNode } from '@stencil/core';
import { calculatePCI } from '../../utils/pciUtils';

@Component({
  tag: 'pci-calculator',
  styleUrl: 'pci-calculator.css',
  shadow: true,
})
export class PciCalculator {

  render() {
    const pciClass = !this.showAddDeduct ? "display-grid" : "display-none";
    const deductClass = this.showAddDeduct ? "position-relative" : "display-none";

    return (
      <Host>
        {/* PCI */}
        <div class={pciClass}>
          <div class="label-display">
            <calcite-label disableSpacing={true} class="label-display">
              Enter comma delimited deduct values
              {this._getDeductValuesInput()}
            </calcite-label>
          </div>
          <div>
            {this._getCalculateButton()}
          </div>
        </div>
        {/* Deduct */}
        <div class={deductClass}>
          <div class="position-right">
            <calcite-action
              appearance='clear'
              class="float-end"
              onClick={() => this._toggleShowAddDeduct()}
              icon="x"
              scale="s"
              text=''
            />
          </div>
          <deduct-calculator
            class="display-grid padding-top-1"
            onDeductValueComplete={(evt) => this._addDeductValue(evt)}
          />
        </div>
      </Host>
    );
  }

  @State() showAddDeduct = false;

  protected _deductValuesElement: HTMLCalciteInputElement;

  protected _getDeductValuesInput(): VNode {
    return (
      <div class="display-flex">
        <calcite-input
          class="main-input"
          ref={(el) => { this._deductValuesElement = el }}
        />
        <calcite-action
          appearance='clear'
          onClick={() => this._toggleShowAddDeduct()}
          icon="plus-circle"
          scale="s"
          text=''
        />
      </div>
    );
  }

  protected _getCalculateButton(): VNode {
    return (
      <calcite-button
        onClick={
          () => this._calculatePCI(
            this._deductValuesElement.value
          )
        }
      >Calculate PCI</calcite-button>
    );
  }

  protected _toggleShowAddDeduct() {
    this.showAddDeduct = !this.showAddDeduct;
  }

  protected _addDeductValue(
    evt: CustomEvent
  ) {
    this._toggleShowAddDeduct();
    this._deductValuesElement.value += Math.abs(parseFloat(this._deductValuesElement.value)) > 0 ? `,${evt.detail}` : evt.detail;
  }

  protected _calculatePCI(
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
