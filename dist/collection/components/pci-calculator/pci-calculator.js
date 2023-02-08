/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
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
import { Host, h } from '@stencil/core';
import { calculatePCI } from '../../utils/pciUtils';
export class PciCalculator {
  constructor() {
    this.showAddDeduct = false;
  }
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
  //--------------------------------------------------------------------------
  //
  //  Functions (lifecycle)
  //
  //--------------------------------------------------------------------------
  /**
   * Renders the component.
   */
  render() {
    const pciClass = !this.showAddDeduct ? "display-grid" : "display-none";
    const deductClass = this.showAddDeduct ? "position-relative" : "display-none";
    return (h(Host, null, h("div", { class: pciClass }, h("div", { class: "label-display" }, h("calcite-label", { class: "label-display" }, "Enter comma delimited deduct values", this._getDeductValuesInput())), h("div", null, this._getCalculateButton())), h("div", { class: deductClass }, h("div", { class: "position-right" }, h("calcite-action", { appearance: 'clear', class: "float-end", icon: "x", onClick: () => this._toggleShowAddDeduct(), scale: "s", text: '' })), h("deduct-calculator", { class: "display-grid padding-top-1", onDeductValueComplete: (evt) => this._addDeductValue(evt) }))));
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------
  /**
   * Load the calculate deduct values calculate UI
   *
   * @returns calculate deduct value UI node
   *
   * @protected
   */
  _getDeductValuesInput() {
    return (h("div", { class: "display-flex" }, h("calcite-input", { class: "main-input", ref: (el) => { this._deductValuesElement = el; } }), h("calcite-action", { appearance: 'clear', icon: "plus-circle", onClick: () => this._toggleShowAddDeduct(), scale: "s", text: '' })));
  }
  /**
   * Add the calculate PCI button
   *
   * @returns calculate PCI button
   *
   * @protected
   */
  _getCalculateButton() {
    return (h("calcite-button", { onClick: () => this._calculatePCI(this._deductValuesElement.value) }, "Calculate PCI"));
  }
  /**
   * Toggle the value that controls show/hide of the deduct value UI
   *
   * @protected
   */
  _toggleShowAddDeduct() {
    this.showAddDeduct = !this.showAddDeduct;
  }
  /**
   * Hide the calculate deduct value UI and add the newly calculated value
   *
   * @param event the event from the calculate deduct value control
   *
   * @protected
   */
  _addDeductValue(evt) {
    this._toggleShowAddDeduct();
    this._deductValuesElement.value += Math.abs(parseFloat(this._deductValuesElement.value)) > 0 ? `,${evt.detail}` : evt.detail;
  }
  /**
   * Calculate the PCI value based on the ASTM methodology
   *
   * @param deductValuesString string with comma delimited numbers
   * Survery123 does not accept array type arguments for passing to scripts.
   * The string will be parsed within the script that will be consumed by Survey123
   *
   * @protected
   */
  _calculatePCI(deductValuesString) {
    const pci = calculatePCI(deductValuesString, true);
    const rating = pci <= 10 ? "Failed" :
      pci <= 25 ? "Serious" :
        pci <= 40 ? "Very Poor" :
          pci <= 55 ? "Poor" :
            pci <= 70 ? "Fair" :
              pci <= 85 ? "Satisfactory" : "Good";
    console.log(`PCI: ${pci}`);
    console.log(`Rating: ${rating}`);
    alert("See debug console for results");
  }
  static get is() { return "pci-calculator"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["pci-calculator.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["pci-calculator.css"]
    };
  }
  static get states() {
    return {
      "showAddDeduct": {}
    };
  }
  static get elementRef() { return "el"; }
}
//# sourceMappingURL=pci-calculator.js.map
