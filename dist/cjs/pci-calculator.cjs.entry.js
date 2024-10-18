/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-4b68e4b4.js');
const pciUtils = require('./pciUtils-f1adcf64.js');

const pciCalculatorCss = ":host{display:block;--calcite-label-margin-bottom:0}.label-display{display:block;padding-bottom:1rem}.display-flex{display:flex}.display-grid{display:grid}.display-table{display:table}.display-inline-table{display:inline-table}.display-none{display:none}.display-inherit{display:inherit}.padding-top-1{padding-top:1rem}.main-input{width:300px;padding-inline-end:1rem}.float-end{float:inline-end}.position-relative{position:relative}.position-right{position:absolute;right:0px}";
const PciCalculatorStyle0 = pciCalculatorCss;

const PciCalculator = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.showAddDeduct = false;
    }
    get el() { return index.getElement(this); }
    //--------------------------------------------------------------------------
    //
    //  Properties (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * HTMLCalciteInputElement: The html element for setting deduct values
     */
    _deductValuesElement;
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
        return (index.h(index.Host, { key: '25ddbf1fb00f5af4c91cda2b11d7f0e10f3a4272' }, index.h("div", { key: 'c13a5d8278ced35b481186cd98f2f2d3d18690bc', class: pciClass }, index.h("div", { key: '3203231a8fdd3cd733c99f980035cfa113acbdd9', class: "label-display" }, index.h("calcite-label", { key: '2737467a3e3b28b76cecf0aaf7e60be0a585b3d8', class: "label-display" }, "Enter comma delimited deduct values", this._getDeductValuesInput())), index.h("div", { key: '0ee41c12738a53e914920122a57c70f20925e71d' }, this._getCalculateButton())), index.h("div", { key: '469feebb033359a3dbbc30175b88605c25a4d0d5', class: deductClass }, index.h("div", { key: '4615ba630e031b7f0166fa67e5e88ea5c1f1537b', class: "position-right" }, index.h("calcite-action", { key: 'afde404a2f1d3cbf63f6d28a8eb8bfde64da7daa', appearance: 'transparent', class: "float-end", icon: "x", onClick: () => this._toggleShowAddDeduct(), scale: "s", text: '' })), index.h("deduct-calculator", { key: 'd383b7ee41a508adab58e2dfdadfb1c7a85e4c25', class: "display-grid padding-top-1", onDeductValueComplete: (evt) => this._addDeductValue(evt) }))));
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
        return (index.h("div", { class: "display-flex" }, index.h("calcite-input", { class: "main-input", ref: (el) => { this._deductValuesElement = el; } }), index.h("calcite-action", { appearance: 'transparent', icon: "plus-circle", onClick: () => this._toggleShowAddDeduct(), scale: "s", text: '' })));
    }
    /**
     * Add the calculate PCI button
     *
     * @returns calculate PCI button
     *
     * @protected
     */
    _getCalculateButton() {
        return (index.h("calcite-button", { onClick: () => this._calculatePCI(this._deductValuesElement.value) }, "Calculate PCI"));
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
        const pci = pciUtils.calculatePCI(deductValuesString, true);
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
};
PciCalculator.style = PciCalculatorStyle0;

exports.pci_calculator = PciCalculator;
