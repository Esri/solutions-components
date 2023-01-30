/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ee607805.js');
const pciUtils = require('./pciUtils-423cfc68.js');

const deductCalculatorCss = ":host{display:block;--calcite-label-margin-bottom:0}.label-display{display:block;padding-bottom:1rem}";

const DeductCalculator = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.deductValueComplete = index.createEvent(this, "deductValueComplete", 7);
    /**
     * string[]: Array of the distress types
     */
    this._types = Object.keys(pciUtils.EDistressType).filter(k => !isNaN(Number(pciUtils.EDistressType[k])));
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
    return (index.h(index.Host, null, index.h("div", { class: "label-display" }, index.h("calcite-label", { class: "label-display" }, "Density %", this._getDensityInput()), index.h("calcite-label", { class: "label-display" }, "Type", this._getTypeInput()), index.h("calcite-label", { class: "label-display" }, "Severity", this._getSeverityInput())), index.h("div", null, this._getCalculateInput())));
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
    return (index.h("calcite-input", { max: 100, min: 0, ref: (el) => { this._densityElement = el; }, type: 'number' }));
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
    return (index.h("calcite-select", { label: '', ref: (el) => { this._typeElement = el; } }, this._types.map((t, i) => index.h("calcite-option", { value: pciUtils.EDistressType[t].toString() }, `${t} (${i + 1})`))));
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
    return (index.h("calcite-select", { label: '', ref: (el) => { this._severityElement = el; } }, index.h("calcite-option", { value: pciUtils.ESeverity.H }, "High"), index.h("calcite-option", { value: pciUtils.ESeverity.M }, "Medium"), index.h("calcite-option", { value: pciUtils.ESeverity.L }, "Low")));
  }
  /**
   * Render calculate deduct value button
   *
   * @returns a node with a control that calculates the deduct value
   *
   * @protected
   */
  _getCalculateInput() {
    return (index.h("calcite-button", { onClick: () => this._calculateDeduct(parseFloat(this._typeElement.value), this._severityElement.value, parseFloat(this._densityElement.value)) }, "Calculate Deduct Value"));
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
      const dv = pciUtils.calculateDeductValue(type.toString(), severity.toString(), density.toString(), true);
      this.deductValueComplete.emit(dv);
      alert(dv);
    }
    else {
      alert("Type, severity, and a density number are required");
    }
  }
  get el() { return index.getElement(this); }
};
DeductCalculator.style = deductCalculatorCss;

exports.deduct_calculator = DeductCalculator;

//# sourceMappingURL=deduct-calculator.cjs.entry.js.map