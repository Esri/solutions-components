/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, g as getElement, h, H as Host } from './p-6eb37ed2.js';
import { E as EDistressType, a as ESeverity, b as calculateDeductValue } from './p-747d4b59.js';

const deductCalculatorCss = ":host{display:block;--calcite-label-margin-bottom:0}.label-display{display:block;padding-bottom:1rem}";
const DeductCalculatorStyle0 = deductCalculatorCss;

const DeductCalculator = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.deductValueComplete = createEvent(this, "deductValueComplete", 7);
    }
    get el() { return getElement(this); }
    //--------------------------------------------------------------------------
    //
    //  Properties (public)
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  State (internal)
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
    _densityElement;
    /**
     * HTMLCalciteSelectElement: The html element for selecting the distress type
     * 1-19 based on values defined by ASTM standard
     */
    _typeElement;
    /**
     * HTMLCalciteSelectElement: The html element for selecting the distress severity
     * "H" | "M" | "L"
     */
    _severityElement;
    /**
     * string[]: Array of the distress types
     */
    _types = Object.keys(EDistressType).filter(k => !isNaN(Number(EDistressType[k])));
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
    deductValueComplete;
    //--------------------------------------------------------------------------
    //
    //  Functions (lifecycle)
    //
    //--------------------------------------------------------------------------
    /**
     * Renders the component.
     */
    render() {
        return (h(Host, { key: '91c8f30ddfe8352072d500ba7d5fde8e798d0334' }, h("div", { key: '14e8ba737c9e11266d44696a231237fdb3e8c136', class: "label-display" }, h("calcite-label", { key: 'ea886f5642ea3788833ee1c802c9ecb581fe19be', class: "label-display" }, "Density %", this._getDensityInput()), h("calcite-label", { key: '512f01b622c0e05d6a725a3abf63b94954509617', class: "label-display" }, "Type", this._getTypeInput()), h("calcite-label", { key: '74d99dca77cc01174bd115cf8a149c01c3b61000', class: "label-display" }, "Severity", this._getSeverityInput())), h("div", { key: 'd3a43fd6a2ecffa7e2b2a24df7257b11e7c3024e' }, this._getCalculateInput())));
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
        return (h("calcite-input", { max: 100, min: 0, ref: (el) => { this._densityElement = el; }, type: "number" }));
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
        return (h("calcite-select", { label: "", ref: (el) => { this._typeElement = el; } }, this._types.map((t, i) => h("calcite-option", { value: EDistressType[t].toString() }, `${t} (${i + 1})`))));
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
        return (h("calcite-select", { label: "", ref: (el) => { this._severityElement = el; } }, h("calcite-option", { value: ESeverity.H }, "High"), h("calcite-option", { value: ESeverity.M }, "Medium"), h("calcite-option", { value: ESeverity.L }, "Low")));
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
};
DeductCalculator.style = DeductCalculatorStyle0;

export { DeductCalculator as deduct_calculator };
