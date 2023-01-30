/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, h, H as Host, g as getElement } from './index-09deaa39.js';
import { c as calculatePCI } from './pciUtils-ecda46e5.js';

const pciCalculatorCss = ":host{display:block;--calcite-label-margin-bottom:0}.label-display{display:block;padding-bottom:1rem}.display-flex{display:flex}.display-grid{display:grid}.display-table{display:table}.display-inline-table{display:inline-table}.display-none{display:none}.display-inherit{display:inherit}.padding-top-1{padding-top:1rem}.main-input{width:300px;-webkit-padding-end:1rem;padding-inline-end:1rem}.float-end{float:inline-end}.position-relative{position:relative}.position-right{position:absolute;right:0px}";

const PciCalculator = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
  get el() { return getElement(this); }
};
PciCalculator.style = pciCalculatorCss;

export { PciCalculator as pci_calculator };

//# sourceMappingURL=pci-calculator.entry.js.map