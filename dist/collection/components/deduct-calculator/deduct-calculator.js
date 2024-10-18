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
import { Host, h } from "@stencil/core";
import { calculateDeductValue, EDistressType, ESeverity } from "../../utils/pciUtils";
export class DeductCalculator {
    //--------------------------------------------------------------------------
    //
    //  Host element access
    //
    //--------------------------------------------------------------------------
    el;
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
        return (h(Host, { key: '3053ca7a4e457a5259622c3fd72c04f2f68c21be' }, h("div", { key: 'f6d4ffbd6811f4eae23a950afac0fd1c68b24c9d', class: "label-display" }, h("calcite-label", { key: 'acaa80f5f10a3343e7e73d9cb33948ae4481e09e', class: "label-display" }, "Density %", this._getDensityInput()), h("calcite-label", { key: '577ce996676878f7e7236308a191ea9db073d88e', class: "label-display" }, "Type", this._getTypeInput()), h("calcite-label", { key: '626db25056ce49eb7b4160aee3e9cf898dd5400a', class: "label-display" }, "Severity", this._getSeverityInput())), h("div", { key: 'fa95eac25a03f7e30770ebc9ac7df02cba8cd187' }, this._getCalculateInput())));
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
    static get is() { return "deduct-calculator"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["deduct-calculator.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["deduct-calculator.css"]
        };
    }
    static get events() {
        return [{
                "method": "deductValueComplete",
                "name": "deductValueComplete",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted on demand when the user clicks to calculate the deduct value"
                },
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                }
            }];
    }
    static get elementRef() { return "el"; }
}
