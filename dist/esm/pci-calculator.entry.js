/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, g as getElement, h, H as Host } from './index-b793d9aa.js';
import { c as calculatePCI } from './pciUtils-986ddad9.js';

const pciCalculatorCss = ":host{display:block;--calcite-label-margin-bottom:0}.label-display{display:block;padding-bottom:1rem}.display-flex{display:flex}.display-grid{display:grid}.display-table{display:table}.display-inline-table{display:inline-table}.display-none{display:none}.display-inherit{display:inherit}.padding-top-1{padding-top:1rem}.main-input{width:300px;padding-inline-end:1rem}.float-end{float:inline-end}.position-relative{position:relative}.position-right{position:absolute;right:0px}";
const PciCalculatorStyle0 = pciCalculatorCss;

const PciCalculator = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.showAddDeduct = false;
    }
    get el() { return getElement(this); }
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
        return (h(Host, { key: 'e19ddd889fb0474b01a9b541a4440bcb6d27cd75' }, h("div", { key: '69dca34e21fd274f274786c43377286a8a24dc37', class: pciClass }, h("div", { key: 'a8c3f266e45041a2cbd0228ccce8e75fcdc9a690', class: "label-display" }, h("calcite-label", { key: 'aed5c516d15e33b4dfc10a13b0efa97f21ed679a', class: "label-display" }, "Enter comma delimited deduct values", this._getDeductValuesInput())), h("div", { key: '786c228e29f54ee493227b1c8e8bd6e110b037a3' }, this._getCalculateButton())), h("div", { key: '7cec1f54145ad7e886af0081ee38aed095e1e0a8', class: deductClass }, h("div", { key: '8bcf946c78d410766d1f59b7d0dc9a844fd9b589', class: "position-right" }, h("calcite-action", { key: 'c33a0aedaa859f19dea94da253cda27257b9c235', appearance: 'transparent', class: "float-end", icon: "x", onClick: () => this._toggleShowAddDeduct(), scale: "s", text: '' })), h("deduct-calculator", { key: '195dbb3fff25c1fbf2e20c785a48c25527abfa2a', class: "display-grid padding-top-1", onDeductValueComplete: (evt) => this._addDeductValue(evt) }))));
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
        return (h("div", { class: "display-flex" }, h("calcite-input", { class: "main-input", ref: (el) => { this._deductValuesElement = el; } }), h("calcite-action", { appearance: 'transparent', icon: "plus-circle", onClick: () => this._toggleShowAddDeduct(), scale: "s", text: '' })));
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
};
PciCalculator.style = PciCalculatorStyle0;

export { PciCalculator as pci_calculator };
