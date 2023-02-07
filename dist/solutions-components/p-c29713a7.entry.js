/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './p-c2f00d41.js';
import { E as EDistressType, a as ESeverity, b as calculateDeductValue } from './p-cc815aca.js';

const deductCalculatorCss = ":host{display:block;--calcite-label-margin-bottom:0}.label-display{display:block;padding-bottom:1rem}";

const DeductCalculator = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.deductValueComplete = createEvent(this, "deductValueComplete", 7);
    /**
     * string[]: Array of the distress types
     */
    this._types = Object.keys(EDistressType).filter(k => !isNaN(Number(EDistressType[k])));
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (lifecycle)
  //
  //--------------------------------------------------------------------------
  /**
   * Renders the component.
   */
  render() {
    return (h(Host, null, h("div", { class: "label-display" }, h("calcite-label", { class: "label-display" }, "Density %", this._getDensityInput()), h("calcite-label", { class: "label-display" }, "Type", this._getTypeInput()), h("calcite-label", { class: "label-display" }, "Severity", this._getSeverityInput())), h("div", null, this._getCalculateInput())));
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
  _getDensityInput() {
    return (h("calcite-input", { max: 100, min: 0, ref: (el) => { this._densityElement = el; }, type: 'number' }));
  }
  /**
   * Render the distress type input
   *
   * @returns a node with a control that shows the distress type name and value
   * for example ALLIGATOR_CRACKING (1)
   *
   * @protected
   */
  _getTypeInput() {
    return (h("calcite-select", { label: '', ref: (el) => { this._typeElement = el; } }, this._types.map((t, i) => h("calcite-option", { value: EDistressType[t].toString() }, `${t} (${i + 1})`))));
  }
  /**
   * Render the distress type input
   *
   * @returns a node with a control that shows the distress type name and value
   * for example ALLIGATOR_CRACKING (1)
   *
   * @protected
   */
  _getSeverityInput() {
    return (h("calcite-select", { label: '', ref: (el) => { this._severityElement = el; } }, h("calcite-option", { value: ESeverity.H }, "High"), h("calcite-option", { value: ESeverity.M }, "Medium"), h("calcite-option", { value: ESeverity.L }, "Low")));
  }
  /**
   * Render calculate deduct value button
   *
   * @returns a node with a control that calculates the deduct value
   *
   * @protected
   */
  _getCalculateInput() {
    return (h("calcite-button", { onClick: () => this._calculateDeduct(parseFloat(this._typeElement.value), this._severityElement.value, parseFloat(this._densityElement.value)) }, "Calculate Deduct Value"));
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
  _calculateDeduct(type, severity, density) {
    if (type && severity && !isNaN(density)) {
      const dv = calculateDeductValue(type.toString(), severity.toString(), density.toString(), true);
      this.deductValueComplete.emit(dv);
      alert(dv);
    }
    else {
      alert("Type, severity, and a density number are required");
    }
  }
  get el() { return getElement(this); }
};
DeductCalculator.style = deductCalculatorCss;

export { DeductCalculator as deduct_calculator };
