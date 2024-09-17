/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
/** @license
 * Copyright 2021 Esri
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
import { h, Host } from "@stencil/core";
import "@esri/calcite-components";
import state from "../../utils/solution-store";
import { getLocaleComponentStrings } from "../../utils/locale";
import { nodeListToArray } from "../../utils/common";
import { CSpatialRefCustomizingPrefix, CSpatialRefCustomizingSuffix, } from "../../utils/interfaces";
/**
* The wkid that will be used as the default when enableDefault is true.
*/
const cDefaultWkid = "3857";
export class SolutionSpatialRef {
    constructor() {
        this.enabled = false;
        this.enableDefault = false;
        this.featureServices = [];
        this._translations = undefined;
    }
    //--------------------------------------------------------------------------
    //
    //  Host element access
    //
    //--------------------------------------------------------------------------
    el;
    enabledChanged() {
        this._handleSpatialRefParamChange();
    }
    enableDefaultChanged() {
        this._handleDefaultSpatialRefParamChange();
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
        this._updateUIFromStore();
        return this._getTranslations();
    }
    render() {
        this._updateUIFromStore();
        return (h(Host, { key: 'f2c603befdfe68e8786ad9ecf4372c3e30a0d7c9' }, h("label", { key: '5bcd7df8edb0732f030c9b5a79070b8edfe41c93', class: "switch-label" }, h("calcite-switch", { key: '2474efeeded9c8a5caac71cab1ebd5cbe0177607', checked: this.enabled, class: "spatial-ref-switch", onCalciteSwitchChange: (event) => this.enabled = event.target.checked, scale: "m" }), this._translations.enableSpatialReference), h("br", { key: 'c6ba57097163af5d2a77240a980b3399320fd406' }), h("div", { key: '1dc102993f8c6d5f7f1c88e1d034afe2e287caa2', class: "spatial-ref-component", id: "spatialRefDefn" }, this._renderFeatureServicesList(this.featureServices)), h("label", { key: 'a08457ccda613337c88c48e718919315c2c6392d', class: "switch-label spatial-ref-component" }, h("calcite-switch", { key: '5e32b27b06b5a073c40b7f0f2fa254444b5bd3c4', checked: this.enableDefault, class: "spatial-ref-switch", disabled: !this.enabled, onCalciteSwitchChange: (event) => this.enableDefault = event.target.checked, scale: "m" }), this._translations.enableDefaultSpatialReference)));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Events
    //
    //--------------------------------------------------------------------------
    featureServiceSpatialReferenceChange;
    enableDefaultSpatialReferenceChange;
    enabledSpatialReferenceChange;
    solutionStoreHasChanges() {
        this.featureServices = state.getStoreInfo("featureServices");
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods (async)
    //
    //--------------------------------------------------------------------------
    /** Provides access to protected methods for unit testing.
     *
     *  @param methodName Name of protected method to run
     *  @param _arg1 First argument to forward to method, e.g., for "_prepareSolutionItemsForEditing", `solutionItemId`
     *  @param _arg2 Second argument to forward to method, e.g., for "_prepareSolutionItemsForEditing", `templates`
     *  @param _arg3 Third argument to forward to method, e.g., for "_prepareSolutionItemsForEditing", `authentication`
     *
     *  @returns
     */
    async _testAccess(methodName, _arg1, _arg2, _arg3) {
        switch (methodName) {
            case "_parameterizeWkid":
                return Promise.resolve(this._parameterizeWkid(_arg1));
            case "_unparameterizeWkid":
                return Promise.resolve(this._unparameterizeWkid(_arg1));
        }
        return Promise.resolve(null);
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    /**
     * Disable spatial reference variable for all feature services.
     *
     * @param services list of service names
     */
    _clearFeatureServiceDefaults(featureServices) {
        // switch all spatial-ref-item-switch
        const fsNodes = nodeListToArray(this.el.getElementsByClassName("spatial-ref-item-switch"));
        fsNodes.forEach((node) => node.checked = false);
        featureServices.forEach(service => this._updateEnabledServices({ detail: { switched: false } }, service));
    }
    /**
     * Toggles the enablement of the default spatial reference.
     */
    _handleDefaultSpatialRefParamChange() {
        this._updateStore();
        this.enableDefaultSpatialReferenceChange.emit({
            defaultWkid: this.enableDefault ? cDefaultWkid : ""
        });
    }
    ;
    /**
     * Toggles the enablement of the spatial reference parameter.
     */
    _handleSpatialRefParamChange() {
        // Update featureServices
        if (!this.enabled) {
            // Disable the default spatial reference button
            this.enableDefault = false;
            // Disable all services when the spatial reference parameter is disabled
            this._clearFeatureServiceDefaults(this.featureServices);
        }
        this._updateStore();
        this.enabledSpatialReferenceChange.emit({
            enabled: this.enabled
        });
    }
    ;
    /**
     * Converts a wkid into a parameterized form for storage in the solution item data.
     *
     * @param wkid Wkid to parameterize; unchanged if already parameterized
     * @returns Parameterized wkid
     */
    _parameterizeWkid(wkid) {
        return wkid
            ? wkid.toString().startsWith(CSpatialRefCustomizingPrefix)
                ? wkid
                : `${CSpatialRefCustomizingPrefix}${wkid}${CSpatialRefCustomizingSuffix}`
            : wkid;
    }
    ;
    /**
     * Create a switch control for each of the services
     *
     * @param services List of feature services
     * @returns a node to control each feature service
     */
    _renderFeatureServicesList(featureServices) {
        // verify they are in state
        const spatialReferenceInfo = state.getStoreInfo("spatialReferenceInfo");
        const configurableServices = featureServices.filter(service => {
            return Object.keys(spatialReferenceInfo.services).some(srefServiceId => srefServiceId === service.id);
        });
        return configurableServices.length > 0 ? (h("div", null, h("label", { class: "spatial-ref-item-title" }, this._translations.featureServicesHeading), h("ul", { class: "spatial-ref-services-list" }, configurableServices.map(configurableService => (h("li", { class: "spatial-ref-services-list-item" }, h("label", { class: "switch-label" }, h("calcite-switch", { checked: spatialReferenceInfo.services[configurableService.id], class: "spatial-ref-item-switch", disabled: !this.enabled, onCalciteSwitchChange: (event) => this._updateEnabledServices(event, configurableService), scale: "m" }), configurableService.name))))))) : (null);
    }
    /**
     * Updates the enabled/disabled state of the service in spatialReferenceInfo.
     *
     * @param event The event that triggered the change
     * @param service The service to update
     */
    _updateEnabledServices(event, service) {
        const spatialReferenceInfo = state.getStoreInfo("spatialReferenceInfo");
        const enabled = event.detail?.switched !== undefined // internal event
            ? event.detail.switched
            : event.target?.checked !== undefined // calcite event
                ? event.target.checked
                : true;
        spatialReferenceInfo.services[service.id] = enabled;
        state.setStoreInfo("spatialReferenceInfo", spatialReferenceInfo);
        // Update featureServices
        this._updateStore();
        // Report the change
        this.featureServiceSpatialReferenceChange.emit(service);
    }
    /**
     * Converts a parameterized wkid into a standard form for use in the solution item data.
     *
     * @param wkid Wkid to unparameterize; unchanged if not parameterized
     * @returns Unparameterized wkid
     */
    _unparameterizeWkid(wkid) {
        return wkid && wkid.toString().startsWith(CSpatialRefCustomizingPrefix)
            ? wkid.substring(CSpatialRefCustomizingPrefix.length, wkid.length - CSpatialRefCustomizingSuffix.length)
            : wkid;
    }
    /**
     * Updates the enabled/disabled state of the services in the featureServices part of the store.
     *
     * @param spatialReferenceInfo The spatial reference information
     */
    _updateFeatureServices(spatialReferenceInfo) {
        // If the spatial reference parameter is disabled, disable all services
        if (!spatialReferenceInfo.enabled) {
            Object.keys(spatialReferenceInfo.services).forEach(serviceId => {
                spatialReferenceInfo.services[serviceId] = false;
            });
        }
        // Copy the enabled state to the feature services
        this.featureServices.forEach(service => {
            service.enabled = spatialReferenceInfo.services[service.id];
            // Update the feature service wkid
            service.wkid = service.enabled
                ? this._parameterizeWkid(service.wkid)
                : this._unparameterizeWkid(service.wkid);
        });
        state.setStoreInfo("featureServices", this.featureServices);
    }
    /**
     * Updates the enabled and spatialReference prop in spatialReferenceInfo.
     */
    _updateStore() {
        // Update spatialReferenceInfo
        const spatialReferenceInfo = state.getStoreInfo("spatialReferenceInfo");
        spatialReferenceInfo.enabled = this.enabled;
        if (this.enabled && this.enableDefault) {
            spatialReferenceInfo.default = cDefaultWkid;
        }
        else if (spatialReferenceInfo.hasOwnProperty("default")) {
            delete spatialReferenceInfo.default;
        }
        state.setStoreInfo("spatialReferenceInfo", spatialReferenceInfo);
        // Update featureServices
        this._updateFeatureServices(spatialReferenceInfo);
    }
    _updateUIFromStore() {
        const spatialReferenceInfo = state.getStoreInfo("spatialReferenceInfo");
        this.enabled = spatialReferenceInfo.enabled;
        this.enableDefault = !!spatialReferenceInfo.default;
        this.featureServices = state.getStoreInfo("featureServices");
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
            "enabled": {
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
                "attribute": "enabled",
                "reflect": true,
                "defaultValue": "false"
            },
            "enableDefault": {
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
                    "text": "When true, a default value is used for feature services."
                },
                "attribute": "enable-default",
                "reflect": true,
                "defaultValue": "false"
            },
            "featureServices": {
                "type": "unknown",
                "mutable": true,
                "complexType": {
                    "original": "IFeatureServiceEnabledStatus[]",
                    "resolved": "IFeatureServiceEnabledStatus[]",
                    "references": {
                        "IFeatureServiceEnabledStatus": {
                            "location": "import",
                            "path": "../../utils/interfaces",
                            "id": "src/utils/interfaces.ts::IFeatureServiceEnabledStatus"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "List of services the spatial reference should apply to"
                },
                "defaultValue": "[]"
            }
        };
    }
    static get states() {
        return {
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
                    "original": "IFeatureServiceEnabledStatus",
                    "resolved": "IFeatureServiceEnabledStatus",
                    "references": {
                        "IFeatureServiceEnabledStatus": {
                            "location": "import",
                            "path": "../../utils/interfaces",
                            "id": "src/utils/interfaces.ts::IFeatureServiceEnabledStatus"
                        }
                    }
                }
            }, {
                "method": "enableDefaultSpatialReferenceChange",
                "name": "enableDefaultSpatialReferenceChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "{ defaultWkid: string }",
                    "resolved": "{ defaultWkid: string; }",
                    "references": {}
                }
            }, {
                "method": "enabledSpatialReferenceChange",
                "name": "enabledSpatialReferenceChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "{ enabled: boolean }",
                    "resolved": "{ enabled: boolean; }",
                    "references": {}
                }
            }];
    }
    static get methods() {
        return {
            "_testAccess": {
                "complexType": {
                    "signature": "(methodName: string, _arg1?: any, _arg2?: any, _arg3?: any) => Promise<any>",
                    "parameters": [{
                            "name": "methodName",
                            "type": "string",
                            "docs": "Name of protected method to run"
                        }, {
                            "name": "_arg1",
                            "type": "any",
                            "docs": "First argument to forward to method, e.g., for \"_prepareSolutionItemsForEditing\", `solutionItemId`"
                        }, {
                            "name": "_arg2",
                            "type": "any",
                            "docs": "Second argument to forward to method, e.g., for \"_prepareSolutionItemsForEditing\", `templates`"
                        }, {
                            "name": "_arg3",
                            "type": "any",
                            "docs": "Third argument to forward to method, e.g., for \"_prepareSolutionItemsForEditing\", `authentication`"
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<any>"
                },
                "docs": {
                    "text": "Provides access to protected methods for unit testing.",
                    "tags": [{
                            "name": "param",
                            "text": "methodName Name of protected method to run"
                        }, {
                            "name": "param",
                            "text": "_arg1 First argument to forward to method, e.g., for \"_prepareSolutionItemsForEditing\", `solutionItemId`"
                        }, {
                            "name": "param",
                            "text": "_arg2 Second argument to forward to method, e.g., for \"_prepareSolutionItemsForEditing\", `templates`"
                        }, {
                            "name": "param",
                            "text": "_arg3 Third argument to forward to method, e.g., for \"_prepareSolutionItemsForEditing\", `authentication`"
                        }, {
                            "name": "returns",
                            "text": undefined
                        }]
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "enabled",
                "methodName": "enabledChanged"
            }, {
                "propName": "enableDefault",
                "methodName": "enableDefaultChanged"
            }];
    }
    static get listeners() {
        return [{
                "name": "solutionStoreHasChanges",
                "method": "solutionStoreHasChanges",
                "target": "window",
                "capture": false,
                "passive": false
            }];
    }
}
