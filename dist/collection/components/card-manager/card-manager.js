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
import { Host, h } from "@stencil/core";
import { getLocaleComponentStrings } from "../../utils/locale";
import { queryFeaturesByID } from "../../utils/queryUtils";
import { getLayerOrTable } from "../../utils/mapViewUtils";
export class CardManager {
    constructor() {
        this.customInfoText = undefined;
        this.enableEditGeometry = false;
        this.isMobile = undefined;
        this.layer = undefined;
        this.mapView = undefined;
        this.zoomAndScrollToSelected = undefined;
        this.selectedFeaturesIds = undefined;
        this.enableCreateFeatures = true;
        this.selectingFeatureFromMap = undefined;
        this._cardLoading = false;
        this._graphics = undefined;
        this._showCreateFeatureComponent = false;
        this._showSubmitBtn = false;
        this._translations = undefined;
    }
    //--------------------------------------------------------------------------
    //
    //  Host element access
    //
    //--------------------------------------------------------------------------
    el;
    /**
     * boolean: Flag to maintain if recently any feature has been created
     */
    _isFeatureCreated = false;
    //--------------------------------------------------------------------------
    //
    //  Properties (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * HTMLCreateFeatureElement: Create Feature component instance
     */
    _createFeature;
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
     * Emits when create work flow started
     */
    createWorkFlowStarted;
    /**
     * Emits when back from create work flow
     */
    backFromCreateWorkFlow;
    /**
     * Emits when feature/record is submitted
     */
    featureOrRecordSubmitted;
    /**
     * Query the layer for the provided ids and store the result graphics
     */
    async featureSelectionChange(evt) {
        if (this._showCreateFeatureComponent && !this._isFeatureCreated) {
            void this._backFromCreateFeature();
        }
        const ids = evt.detail;
        this._graphics = await this._getFeaturesByIds(ids);
    }
    /**
     * Get the layer view for the provided layer id
     */
    async layerSelectionChange(evt) {
        if (this._showCreateFeatureComponent) {
            void this._backFromCreateFeature();
        }
        const id = evt.detail[0];
        this.layer = await getLayerOrTable(this.mapView, id);
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (lifecycle)
    //
    //--------------------------------------------------------------------------
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     *
     * @returns Promise when complete
     */
    async componentWillLoad() {
        await this._getTranslations();
        if (this.selectedFeaturesIds?.length > 0) {
            this._graphics = await this._getFeaturesByIds(this.selectedFeaturesIds);
        }
    }
    /**
     * Renders the component.
     */
    render() {
        const featuresClass = this._graphics?.length > 0 ? "" : "display-none";
        const createFeatureClass = this._graphics?.length === 0 && this._showCreateFeatureComponent ? "" : "display-none";
        const messageClass = this._graphics?.length > 0 || this._showCreateFeatureComponent ? "display-none" : "";
        const isTable = this.layer?.isTable;
        const heading = isTable ? this._translations.createRecord : this._translations.createFeature;
        const guideMsg = this.customInfoText ? this.customInfoText : this.selectingFeatureFromMap ? this._translations.selectFeaturesFromMapToStart : this._translations.selectFeaturesToStart;
        const showCreateFeatureOrRecordBtn = this.enableCreateFeatures && this.layer?.capabilities?.operations?.supportsAdd;
        return (h(Host, { key: '7360aa9c48dd0c3e4a14fe0833b99c301388f93c' }, h("div", { key: '9d610f0c4728c238eceb790e97a4e06b77f1a2d1', class: "overflow-auto height-full" }, h("calcite-shell", { key: '4b6a02205a971c7ff61aab567b2f2a3c5d288f8d', class: "position-relative " + featuresClass }, h("div", { key: '96ee8ce138265dd4b562ac0a33b79a0db4497842', class: "position-static z-index-500" }, h("info-card", { key: '7db359bc1016281fd01b737dc5c424fe78995422', enableEditGeometry: this.enableEditGeometry, graphics: this._graphics, isLoading: this._cardLoading, isMobile: this.isMobile, mapView: this.mapView }))), h("calcite-shell", { key: 'afc8d06e9aa3213a9ca10c929497ed4618a28e91', class: "position-relative " + messageClass }, h("calcite-flow-item", { key: '46db92a6e259eefea3293310e3e2f43d7639db97' }, h("calcite-panel", { key: 'd2bc23ae7bcf2b7b7b48a35efc0697e0d1f9e23e' }, h("div", { key: '8f7fd13f9ec99beec1d7231dda03eba403a70a69', class: "padding-1" }, h("calcite-notice", { key: '2fbe94292c1dd91ee1691b8e3d295225ff5b534b', icon: this.selectingFeatureFromMap ? "map" : "table", iconFlipRtl: true, open: true }, h("div", { key: '9f91099e4bfa0675c5b098a73b2f132b80ee76b0', slot: "message" }, guideMsg))), !this.isMobile && showCreateFeatureOrRecordBtn && h("calcite-button", { key: 'c1b04e776f3750712992d736e09726cc26eae5db', disabled: !this.layer, onClick: () => this._createFeatureBtnClicked(), slot: "footer", width: "full" }, isTable ? this._translations.createRecord : this._translations.createFeature)))), h("calcite-shell", { key: 'a71d4b0abd1ec1a4ed14a2cb3dcb10a075f54bf0', class: "position-relative " + createFeatureClass }, h("calcite-flow-item", { key: '85047b527f5995a912b527325f287c3596caf630' }, h("calcite-panel", { key: 'd335be81502e0feb803ee9ad4e501d4c85f184f5', heading: heading }, h("calcite-action", { key: 'b179c3185dbada3bd052d38b98b75cf29240655c', class: "back-button hydrated", icon: "chevron-left", onClick: this._backFromCreateFeature.bind(this), scale: "s", slot: "header-actions-start", text: "" }), this.getEditorComponent(), this._showSubmitBtn && h("calcite-button", { key: 'f3b6655e3effdb6b09e64acd651a09d6028a6df9', appearance: "solid", class: "footer-top-button footer-button", onClick: () => void this._createFeature.submit(), slot: "footer", width: "full" }, this._translations.create)))))));
    }
    /**
   * Returns the editor component for adding feature
   * @returns Node
   */
    getEditorComponent() {
        return (h("div", null, this._showCreateFeatureComponent && h("create-feature", { customizeSubmit: true, mapView: this.mapView, onDrawComplete: () => { this._showSubmitBtn = true; }, onEditingAttachment: (evt) => { this._showSubmitBtn = !evt.detail; }, onProgressStatus: () => {
                setTimeout(() => {
                    this._isFeatureCreated = false;
                }, 2000);
            }, onSuccess: this._featureCreated.bind(this), ref: el => this._createFeature = el, selectedLayerId: this.layer?.id, showGuidingMsgWhileDrawing: false })));
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * Gets the Feature using its ids
     * @param ids list of ids that are currently selected
     * @returns Promise when complete
     * @protected
     */
    async _getFeaturesByIds(ids) {
        // only query if we have some ids...query with no ids will result in all features being returned
        const featureSet = ids.length > 0 ? await queryFeaturesByID(ids, this.layer, [], true, this.mapView.spatialReference) : [];
        // https://github.com/Esri/solutions-components/issues/365
        return featureSet.sort((a, b) => ids.indexOf(a.getObjectId()) - ids.indexOf(b.getObjectId()));
    }
    /**
     * Displays the feature creation functionality and changes the layout
     * @protected
     */
    _createFeatureBtnClicked() {
        this._showCreateFeatureComponent = true;
        this.createWorkFlowStarted.emit();
    }
    /**
     * Closes the Create feature component
     * @protected
     */
    async _backFromCreateFeature() {
        if (this._createFeature) {
            this._showCreateFeatureComponent = false;
            this.backFromCreateWorkFlow.emit();
        }
        this._showSubmitBtn = false;
    }
    /**
     * On Submitting the form show the creator feature again
     * @protected
     */
    _featureCreated() {
        this._showCreateFeatureComponent = false;
        this._showSubmitBtn = false;
        this._isFeatureCreated = true;
        this.featureOrRecordSubmitted.emit();
        setTimeout(() => {
            this._showCreateFeatureComponent = true;
        }, 50);
    }
    /**
     * Fetches the component's translations
     *
     * @returns Promise when complete
     * @protected
     */
    async _getTranslations() {
        const messages = await getLocaleComponentStrings(this.el);
        this._translations = messages[0];
    }
    static get is() { return "card-manager"; }
    static get originalStyleUrls() {
        return {
            "$": ["card-manager.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["card-manager.css"]
        };
    }
    static get properties() {
        return {
            "customInfoText": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "string: custom notice text to display"
                },
                "attribute": "custom-info-text",
                "reflect": false
            },
            "enableEditGeometry": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "When true the geometry of the current feature will be editable"
                },
                "attribute": "enable-edit-geometry",
                "reflect": false,
                "defaultValue": "false"
            },
            "isMobile": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "When true the component will render an optimized view for mobile devices"
                },
                "attribute": "is-mobile",
                "reflect": false
            },
            "layer": {
                "type": "unknown",
                "mutable": true,
                "complexType": {
                    "original": "__esri.FeatureLayer",
                    "resolved": "FeatureLayer",
                    "references": {
                        "___esri": {
                            "location": "global",
                            "id": "global::___esri"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "esri/views/layers/FeatureLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html"
                }
            },
            "mapView": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "__esri.MapView",
                    "resolved": "MapView",
                    "references": {
                        "___esri": {
                            "location": "global",
                            "id": "global::___esri"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html"
                }
            },
            "zoomAndScrollToSelected": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "boolean: When true the selected feature will zoomed to in the map and the row will be scrolled to within the table"
                },
                "attribute": "zoom-and-scroll-to-selected",
                "reflect": false
            },
            "selectedFeaturesIds": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "number[]",
                    "resolved": "number[]",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "A list of ids that are currently selected"
                }
            },
            "enableCreateFeatures": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "boolean: when true the users can have the option to create features"
                },
                "attribute": "enable-create-features",
                "reflect": false,
                "defaultValue": "true"
            },
            "selectingFeatureFromMap": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "boolean: When select feature from map message will shown"
                },
                "attribute": "selecting-feature-from-map",
                "reflect": false
            }
        };
    }
    static get states() {
        return {
            "_cardLoading": {},
            "_graphics": {},
            "_showCreateFeatureComponent": {},
            "_showSubmitBtn": {},
            "_translations": {}
        };
    }
    static get events() {
        return [{
                "method": "createWorkFlowStarted",
                "name": "createWorkFlowStarted",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emits when create work flow started"
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }, {
                "method": "backFromCreateWorkFlow",
                "name": "backFromCreateWorkFlow",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emits when back from create work flow"
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }, {
                "method": "featureOrRecordSubmitted",
                "name": "featureOrRecordSubmitted",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emits when feature/record is submitted"
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }];
    }
    static get elementRef() { return "el"; }
    static get listeners() {
        return [{
                "name": "featureSelectionChange",
                "method": "featureSelectionChange",
                "target": "window",
                "capture": false,
                "passive": false
            }, {
                "name": "layerSelectionChange",
                "method": "layerSelectionChange",
                "target": "window",
                "capture": false,
                "passive": false
            }];
    }
}
