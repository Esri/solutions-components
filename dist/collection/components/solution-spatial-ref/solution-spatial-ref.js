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
import "@esri/calcite-components";
import state from "../../utils/solution-store";
import { h, Host } from "@stencil/core";
import { getLocaleComponentStrings } from "../../utils/locale";
import { nodeListToArray } from "../../utils/common";
export class SolutionSpatialRef {
    constructor() {
        this.defaultWkid = 102100;
        this.loaded = false;
        this.locked = true;
        this.services = [];
        this.value = this.defaultWkid.toString();
        this._srSearchText = undefined;
        this._translations = undefined;
    }
    lockedChanged(newLocked) {
        if (!newLocked) {
            // By default enable all Feature Services on first load
            this._setFeatureServiceDefaults(this.services);
        }
        this.lockedSpatialReferenceChange.emit({
            locked: newLocked
        });
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     */
    componentWillLoad() {
        return this._getTranslations();
    }
    /**
     * Renders the component.
     */
    render() {
        return (h(Host, null, h("div", { class: "spatial-ref" }, h("div", { class: "spatial-ref-desc" }, h("calcite-label", null, this._translations.paramDescription)), h("label", { class: "switch-label" }, h("calcite-switch", { checked: !this.locked, class: "spatial-ref-switch", onCalciteSwitchChange: (event) => this._updateLocked(event), scale: "m" }), this._translations.specifyParam), h("div", { class: "spatial-ref-component", id: "spatialRefDefn" }, h("calcite-label", null, this._translations.spatialReferenceInfo, h("label", { class: "spatial-ref-default" }, h("spatial-ref", { defaultWkid: this.defaultWkid, disabled: this.locked, value: this.value }))), this._getFeatureServices(this.services)))));
    }
    /**
     * Saves changes to the embedded spatial reference value
     */
    spatialReferenceChange(event) {
        this.value = event.detail.newValue;
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods (async)
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    /**
     * Toggles the ability to set the default spatial reference.
     */
    _updateLocked(event) {
        this.locked = !event.target.checked;
        this._updateStore();
        if (!this.loaded) {
            // when this is switched on when loading we have reloaded a solution that
            // has a custom wkid param and we should honor the settings they already have in the templates
            if (event.target.checked) {
                // By default enable all Feature Services on first load
                this._setFeatureServiceDefaults(this.services);
            }
            this.loaded = true;
        }
    }
    ;
    /**
     * Enable spatial reference variable for all feature services.
     *
     * @param services list of service names
     */
    _setFeatureServiceDefaults(services) {
        // switch all spatial-ref-item-switch
        const fsNodes = nodeListToArray(this.el.getElementsByClassName("spatial-ref-item-switch"));
        fsNodes.forEach((node) => node.checked = true);
        services.forEach(name => this._updateEnabledServices({ detail: { switched: true } }, name));
    }
    /**
     * Create a switch control for each of the services
     *
     * @param services List of feature services
     * @returns a node to control each feature service
     */
    _getFeatureServices(services) {
        // verify they are in state
        const spatialReferenceInfo = state.getStoreInfo("spatialReferenceInfo");
        const _services = services.filter(s => {
            return Object.keys(spatialReferenceInfo.services).some(stateService => stateService === s);
        });
        return _services && _services.length > 0 ? (h("div", null, h("label", { class: "spatial-ref-item-title" }, this._translations.featureServicesHeading), _services.map(name => (h("label", { class: "switch-label" }, h("calcite-switch", { checked: spatialReferenceInfo.services[name], class: "spatial-ref-item-switch", disabled: this.locked, onCalciteSwitchChange: (event) => this._updateEnabledServices(event, name), scale: "m" }), name))))) : (null);
    }
    /**
     * Updates the enabled and spatialReference prop in spatialReferenceInfo.
     */
    _updateStore() {
        const spatialReferenceInfo = state.getStoreInfo("spatialReferenceInfo");
        spatialReferenceInfo.enabled = !this.locked;
        spatialReferenceInfo.spatialReference = this.value;
        state.setStoreInfo("spatialReferenceInfo", spatialReferenceInfo);
    }
    /**
     * Updates the enabled/disabled state of the service in spatialReferenceInfo.
     */
    _updateEnabledServices(event, name) {
        const spatialReferenceInfo = state.getStoreInfo("spatialReferenceInfo");
        spatialReferenceInfo.services[name] = event.target.checked;
        state.setStoreInfo("spatialReferenceInfo", spatialReferenceInfo);
        this.featureServiceSpatialReferenceChange.emit({
            name,
            enabled: event.target.checked
        });
    }
    /**
     * Fetches the component's translations
     *
     * @protected
     */
    async _getTranslations() {
        const translations = await getLocaleComponentStrings(this.el);
        this._translations = translations[0];
    }
    static get is() { return "solution-spatial-ref"; }
    static get originalStyleUrls() {
        return {
            "$": ["solution-spatial-ref.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["solution-spatial-ref.css"]
        };
    }
    static get properties() {
        return {
            "defaultWkid": {
                "type": "number",
                "mutable": true,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The wkid that will be used as the default when no user selection has been made."
                },
                "attribute": "default-wkid",
                "reflect": true,
                "defaultValue": "102100"
            },
            "locked": {
                "type": "boolean",
                "mutable": true,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "When true, all but the main switch are disabled to prevent interaction."
                },
                "attribute": "locked",
                "reflect": true,
                "defaultValue": "true"
            },
            "services": {
                "type": "unknown",
                "mutable": true,
                "complexType": {
                    "original": "string[]",
                    "resolved": "string[]",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "List of service names the spatial reference should apply to"
                },
                "defaultValue": "[]"
            },
            "value": {
                "type": "string",
                "mutable": true,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Contains the public value for this component, which is a wkid or a wkt."
                },
                "attribute": "value",
                "reflect": true,
                "defaultValue": "this.defaultWkid.toString()"
            }
        };
    }
    static get states() {
        return {
            "loaded": {},
            "_srSearchText": {},
            "_translations": {}
        };
    }
    static get events() {
        return [{
                "method": "featureServiceSpatialReferenceChange",
                "name": "featureServiceSpatialReferenceChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "{ name: string, enabled: boolean }",
                    "resolved": "{ name: string; enabled: boolean; }",
                    "references": {}
                }
            }, {
                "method": "lockedSpatialReferenceChange",
                "name": "lockedSpatialReferenceChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "{ locked: boolean }",
                    "resolved": "{ locked: boolean; }",
                    "references": {}
                }
            }];
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "locked",
                "methodName": "lockedChanged"
            }];
    }
    static get listeners() {
        return [{
                "name": "spatialReferenceChange",
                "method": "spatialReferenceChange",
                "target": "window",
                "capture": false,
                "passive": false
            }];
    }
}
