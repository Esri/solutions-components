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
        this._cardLoading = false;
        this._graphics = undefined;
        this._translations = undefined;
    }
    //--------------------------------------------------------------------------
    //
    //  Host element access
    //
    //--------------------------------------------------------------------------
    el;
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
     * Query the layer for the provided ids and store the result graphics
     */
    async featureSelectionChange(evt) {
        const ids = evt.detail;
        this._graphics = await this._getFeaturesByIds(ids);
    }
    /**
     * Get the layer view for the provided layer id
     */
    async layerSelectionChange(evt) {
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
        const messageClass = this._graphics?.length > 0 ? "display-none" : "";
        return (h(Host, { key: 'dafff11793b5ae60164964c346cbb152caceaeb9' }, h("div", { key: '02507fe9e1f4205fe8a9342b466f1ada849c8ed8', class: "overflow-auto height-full" }, h("calcite-shell", { key: '712c42c4044c1386e8bc4ff42e44f250ac4023a2', class: "position-relative " + featuresClass }, h("div", { key: 'f2bc47f58463506f7ea8011495b22cafb63e4f27' }, h("info-card", { key: '1ad1fb78dcc99a43d92ad08d4c7bbeda7c2f276d', enableEditGeometry: this.enableEditGeometry, graphics: this._graphics, isLoading: this._cardLoading, isMobile: this.isMobile, mapView: this.mapView }))), h("calcite-shell", { key: 'fa9fcada67198c182f918b939826f1f7f19f8e5b', class: "position-relative " + messageClass }, h("div", { key: '0da349d1442b6375cde177780c5f868d2e32072a', class: "padding-1" }, h("calcite-notice", { key: 'c0e04ca03c546f90c942c2eef622fbe9c8e61227', icon: "table", open: true }, h("div", { key: '85e3925e725798189b16270df31c266c55391ec7', slot: "message" }, this.customInfoText || this._translations.selectFeaturesToStart)))))));
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * Gets the Feature using its ids
     *
     * @returns Promise when complete
     * @protected
     */
    async _getFeaturesByIds(ids) {
        // only query if we have some ids...query with no ids will result in all features being returned
        const featureSet = ids.length > 0 ? await queryFeaturesByID(ids, this.layer, [], false, this.mapView.spatialReference) : [];
        // https://github.com/Esri/solutions-components/issues/365
        return featureSet.sort((a, b) => ids.indexOf(a.getObjectId()) - ids.indexOf(b.getObjectId()));
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
            }
        };
    }
    static get states() {
        return {
            "_cardLoading": {},
            "_graphics": {},
            "_translations": {}
        };
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
