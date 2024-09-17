/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { d as defineCustomElement$2, c as calculatePCI } from './deduct-calculator2.js';
import { d as defineCustomElement$b } from './action.js';
import { d as defineCustomElement$a } from './button.js';
import { d as defineCustomElement$9 } from './icon.js';
import { d as defineCustomElement$8 } from './input.js';
import { d as defineCustomElement$7 } from './label2.js';
import { d as defineCustomElement$6 } from './loader.js';
import { d as defineCustomElement$5 } from './option.js';
import { d as defineCustomElement$4 } from './progress.js';
import { d as defineCustomElement$3 } from './select.js';

const pciCalculatorCss = ":host{display:block;--calcite-label-margin-bottom:0}.label-display{display:block;padding-bottom:1rem}.display-flex{display:flex}.display-grid{display:grid}.display-table{display:table}.display-inline-table{display:inline-table}.display-none{display:none}.display-inherit{display:inherit}.padding-top-1{padding-top:1rem}.main-input{width:300px;padding-inline-end:1rem}.float-end{float:inline-end}.position-relative{position:relative}.position-right{position:absolute;right:0px}";
const PciCalculatorStyle0 = pciCalculatorCss;

const PciCalculator$1 = /*@__PURE__*/ proxyCustomElement(class PciCalculator extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.showAddDeduct = false;
    }
    get el() { return this; }
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
    static get style() { return PciCalculatorStyle0; }
}, [1, "pci-calculator", {
        "showAddDeduct": [32]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["pci-calculator", "calcite-action", "calcite-button", "calcite-icon", "calcite-input", "calcite-label", "calcite-loader", "calcite-option", "calcite-progress", "calcite-select", "deduct-calculator"];
    components.forEach(tagName => { switch (tagName) {
        case "pci-calculator":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, PciCalculator$1);
            }
            break;
        case "calcite-action":
            if (!customElements.get(tagName)) {
                defineCustomElement$b();
            }
            break;
        case "calcite-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$a();
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$9();
            }
            break;
        case "calcite-input":
            if (!customElements.get(tagName)) {
                defineCustomElement$8();
            }
            break;
        case "calcite-label":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "calcite-loader":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "calcite-option":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "calcite-progress":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "calcite-select":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "deduct-calculator":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}
defineCustomElement$1();

const PciCalculator = PciCalculator$1;
const defineCustomElement = defineCustomElement$1;

export { PciCalculator, defineCustomElement };
