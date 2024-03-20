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
        this.isMobile = undefined;
        this.layer = undefined;
        this.mapView = undefined;
        this.zoomAndScrollToSelected = undefined;
        this._cardLoading = false;
        this._graphics = undefined;
        this._translations = undefined;
    }
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
        this._cardLoading = true;
        // only query if we have some ids...query with no ids will result in all features being returned
        const featureSet = ids.length > 0 ? await queryFeaturesByID(ids, this.layer, [], false, this.mapView.spatialReference) : [];
        // https://github.com/Esri/solutions-components/issues/365
        this._graphics = featureSet.sort((a, b) => ids.indexOf(a.getObjectId()) - ids.indexOf(b.getObjectId()));
        this._cardLoading = false;
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
    }
    /**
     * Renders the component.
     */
    render() {
        var _a, _b;
        const featuresClass = ((_a = this._graphics) === null || _a === void 0 ? void 0 : _a.length) > 0 ? "" : "display-none";
        const messageClass = ((_b = this._graphics) === null || _b === void 0 ? void 0 : _b.length) > 0 ? "display-none" : "";
        return (h(Host, null, h("div", { class: "overflow-auto height-full" }, h("calcite-shell", { class: "position-relative " + featuresClass }, h("div", null, h("info-card", { graphics: this._graphics, isLoading: this._cardLoading, isMobile: this.isMobile, mapView: this.mapView, zoomAndScrollToSelected: this.zoomAndScrollToSelected }))), h("calcite-shell", { class: "position-relative " + messageClass }, h("div", { class: "padding-1" }, h("calcite-notice", { icon: "table", open: true }, h("div", { slot: "message" }, this._translations.selectFeaturesToStart)))))));
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (protected)
    //
    //--------------------------------------------------------------------------
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
                "mutable": false,
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
