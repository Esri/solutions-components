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
import { loadModules } from "../../utils/loadModules";
import { PopupUtils } from "../../utils/popupUtils";
export class InfoCard {
    constructor() {
        this.graphics = undefined;
        this.isLoading = false;
        this.isMobile = undefined;
        this.mapView = undefined;
        this.zoomAndScrollToSelected = undefined;
        this.allowEditing = true;
        this.highlightEnabled = true;
        this._alertOpen = false;
        this._count = "";
        this._editRecordOpen = false;
        this._mobileTitle = "";
        this._showListView = false;
        this._translations = undefined;
    }
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    /**
     * Watch for changes to the graphic and update the feature widget
     */
    async graphicsWatchHandler() {
        await this.setGraphics();
    }
    /**
     * Watch for changes to the isMobile prop then init the Features widget
     * We need to know if the title should be displayed by the widget (non mobile)
     * or by us (mobile)
     */
    async isMobileWatchHandler() {
        await this._initFeaturesWidget();
    }
    /**
     * Watch for changes to the mapView and re-init the Feature widget
     */
    async mapViewWatchHandler() {
        return await this._initFeaturesWidget();
    }
    //--------------------------------------------------------------------------
    //
    //  Methods (public)
    //
    //--------------------------------------------------------------------------
    /**
     * Get the current selected feature from the Features widget
     *
     * @returns Promise resolving with the current feature
     */
    async getSelectedFeature() {
        return this._features.selectedFeature;
    }
    /**
     * Respond to and close the edit record display
     *
     * @returns a promise when the operation has completed
     */
    async closeEdit() {
        this._editRecordOpen = false;
    }
    /**
     * Reset key properties when the layer selection changes
     */
    async layerSelectionChange() {
        var _a;
        this._showListView = false;
        if ((_a = this._features) === null || _a === void 0 ? void 0 : _a.viewModel) {
            this._features.viewModel.featureMenuOpen = false;
            this._features.close();
        }
    }
    /**
     * Refresh the info-card graphics
     */
    async refreshGraphics(evt) {
        this.graphics = [...evt.detail];
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
        await this._initModules();
        await this._getTranslations();
        this._popupUtils = new PopupUtils();
    }
    /**
     * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
     * @returns Promise when complete
     */
    async componentDidLoad() {
        var _a;
        if (((_a = this.graphics) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            await this.setGraphics();
        }
    }
    /**
     * Renders the component.
     */
    render() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const loadingClass = this.isLoading ? "" : "display-none";
        const featureNodeClass = this.isLoading || this._editRecordOpen ? "visibility-hidden" : "position-absolute";
        const editClass = !this.isLoading && this._editRecordOpen ? "position-absolute" : "display-none";
        const editButtonClass = (!this.isLoading && this._editRecordOpen) || this._showListView ? "display-none" : "";
        const nextBackDisabled = ((_b = (_a = this._features) === null || _a === void 0 ? void 0 : _a.features) === null || _b === void 0 ? void 0 : _b.length) < 2;
        const nextBackClass = this.isMobile ? "display-none" : "";
        const id = (_d = (_c = this._features) === null || _c === void 0 ? void 0 : _c.selectedFeature) === null || _d === void 0 ? void 0 : _d.getObjectId();
        const ids = parseInt(id === null || id === void 0 ? void 0 : id.toString(), 10) > -1 ? [id] : [];
        const deleteEnabled = ((_e = this._layer) === null || _e === void 0 ? void 0 : _e.editingEnabled) && ((_h = (_g = (_f = this._layer) === null || _f === void 0 ? void 0 : _f.capabilities) === null || _g === void 0 ? void 0 : _g.operations) === null || _h === void 0 ? void 0 : _h.supportsDelete);
        return (h(Host, null, h("calcite-shell", null, this._getHeader(), h("calcite-loader", { class: loadingClass, label: this._translations.fetchingData }), h("div", { class: "esri-widget " + featureNodeClass, id: "features-node" }), h("div", { class: `${editButtonClass} width-100`, slot: "footer" }, this.allowEditing &&
            h("div", { class: "display-flex top-border padding-1-2" }, h("calcite-button", { appearance: "solid", id: "solutions-edit", onClick: () => this._openEditRecord(), width: "full" }, this._translations.edit), this.isMobile && deleteEnabled ? (h("delete-button", { class: "padding-inline-start-1 width-100", id: "solutions-delete", ids: ids, layer: this._layer, onEditsComplete: () => this._closePopup() })) : undefined, h("calcite-tooltip", { label: "", placement: "bottom", "reference-element": "solutions-edit" }, h("span", null, this._translations.edit)), this.isMobile ? (h("calcite-tooltip", { label: "", placement: "bottom", "reference-element": "solutions-delete" }, h("span", null, this._translations.delete))) : undefined), !nextBackDisabled && h("div", { class: `display-flex padding-1-2 button-container top-border ${nextBackClass}` }, h("div", { class: "min-width-100" }, h("calcite-button", { appearance: "outline", disabled: nextBackDisabled, id: "solutions-back", onClick: () => this._back(), width: "full" }, this._translations.back), h("calcite-tooltip", { label: "", placement: "top", "reference-element": "solutions-back" }, h("span", null, this._translations.back))), h("div", null, h("calcite-action", { icon: "list", onClick: () => this._toggleListView(), scale: "s", text: this._count, textEnabled: true })), h("div", { class: "min-width-100" }, h("calcite-button", { appearance: "outline", disabled: nextBackDisabled, id: "solutions-next", onClick: () => this._next(), width: "full" }, this._translations.next), h("calcite-tooltip", { label: "", placement: "top", "reference-element": "solutions-next" }, h("span", null, this._translations.next))))), h("edit-card", { class: editClass, graphicIndex: (_j = this._features) === null || _j === void 0 ? void 0 : _j.selectedFeatureIndex, graphics: this.graphics, mapView: this.mapView, open: this._editRecordOpen }), h("calcite-alert", { icon: "layer-broken", kind: "warning", label: "", onCalciteAlertClose: () => this._alertClosed(), open: this._alertOpen, placement: "top" }, h("div", { slot: "title" }, this._translations.editDisabled), h("div", { slot: "message" }, this._translations.enableEditing)))));
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * Load esri javascript api modules
     *
     * @returns Promise resolving when function is done
     *
     * @protected
     */
    async _initModules() {
        const [Features, reactiveUtils] = await loadModules([
            "esri/widgets/Features",
            "esri/core/reactiveUtils"
        ]);
        this.Features = Features;
        this.reactiveUtils = reactiveUtils;
    }
    /**
     * Initializes the features widget if not created and updates the feature widget and other required states
     *
     * @protected
     */
    async setGraphics() {
        var _a;
        if (!this._features) {
            await this._initFeaturesWidget();
        }
        if (this.graphics.length > 0) {
            this._layer = (_a = this.graphics[0]) === null || _a === void 0 ? void 0 : _a.layer;
            this._editEnabled = this._layer.editingEnabled && this._layer.capabilities.operations.supportsUpdate;
            this._mobileTitle = await this._popupUtils.getPopupTitle(this.graphics[0], this.mapView.map);
            this._features.open({
                features: this.graphics
            });
        }
        else {
            this._features.clear();
            this._features.close();
        }
        this._count = this._getCount();
    }
    /**
     * Init the Feature widget so we can display the popup content
     *
     * @returns a promise when the operation has completed
     *
     * @protected
     */
    async _initFeaturesWidget() {
        var _a;
        return this.isMobile !== undefined ? await ((_a = this.mapView) === null || _a === void 0 ? void 0 : _a.when(() => {
            if (!this._features) {
                this._features = new this.Features({
                    view: this.mapView,
                    container: "features-node",
                    visibleElements: {
                        actionBar: false,
                        closeButton: false,
                        heading: !this.isMobile
                    }
                });
                this._features.viewModel.highlightEnabled = this.highlightEnabled;
                this.reactiveUtils.watch(() => this._features.viewModel.featureMenuOpen, (isOpen) => {
                    if (!isOpen) {
                        this._showListView = isOpen;
                    }
                });
                if (this.zoomAndScrollToSelected) {
                    this.reactiveUtils.watch(() => this._features.selectedFeatureIndex, (i) => {
                        if (i > -1) {
                            this.selectionChanged.emit([this._features.selectedFeature]);
                        }
                    });
                }
            }
            else {
                this._features.view = this.mapView;
                this._features.visibleElements.actionBar = false;
                this._features.visibleElements.closeButton = false;
                this._features.visibleElements.heading = !this.isMobile;
            }
        })) : Promise.resolve();
    }
    /**
     * Get the mobile header
     *
     * @returns the header node to display when in mobile mode
     *
     * @protected
     */
    _getHeader() {
        return this.isMobile && !this._editRecordOpen ? (h("calcite-panel", { class: "border-width-0", slot: "header" }, h("calcite-action", { class: "end-border", icon: "chevron-left", iconFlipRtl: true, onClick: () => this._closePopup(), scale: "s", slot: "header-actions-start", text: "" }), h("span", { class: "font-bold", slot: "header-content" }, this._mobileTitle))) : undefined;
    }
    /**
     * Close the popup and emit the selected features
     */
    _closePopup() {
        this.popupClosed.emit();
    }
    /**
     * Set the alertOpen member to false when the alert is closed
     */
    _alertClosed() {
        this._alertOpen = false;
    }
    /**
     * Open the edit record
     */
    _openEditRecord() {
        if (this._editEnabled) {
            this._editRecordOpen = true;
        }
        else {
            this._alertOpen = true;
        }
    }
    /**
     * Go to the previous feature in the features widget
     */
    _back() {
        this._features.previous();
        this._count = this._getCount();
    }
    /**
     * Go to the next feature in the features widget
     */
    _next() {
        this._features.next();
        this._count = this._getCount();
    }
    /**
     * Get the current index of total string
     *
     * @returns the index of total string
     */
    _getCount() {
        var _a, _b, _c;
        const index = (((_a = this._features) === null || _a === void 0 ? void 0 : _a.viewModel.selectedFeatureIndex) + 1).toString();
        const total = (_c = (_b = this._features) === null || _b === void 0 ? void 0 : _b.features) === null || _c === void 0 ? void 0 : _c.length.toString();
        return this._translations.indexOfTotal
            .replace("{{index}}", index)
            .replace("{{total}}", total);
    }
    /**
     * Toggle the visibility of the features list view
     */
    _toggleListView() {
        this._showListView = !this._showListView;
        const i = this._features.selectedFeatureIndex;
        this._features.open({
            features: this.graphics,
            featureMenuOpen: this._showListView
        });
        this._features.selectedFeatureIndex = i;
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
    static get is() { return "info-card"; }
    static get originalStyleUrls() {
        return {
            "$": ["info-card.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["info-card.css"]
        };
    }
    static get properties() {
        return {
            "graphics": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "__esri.Graphic[]",
                    "resolved": "Graphic[]",
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
                    "text": "esri/Graphic: https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html"
                }
            },
            "isLoading": {
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
                    "text": "boolean: when true a loading indicator will be shown"
                },
                "attribute": "is-loading",
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
            "allowEditing": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "boolean: If true will show edit button"
                },
                "attribute": "allow-editing",
                "reflect": false,
                "defaultValue": "true"
            },
            "highlightEnabled": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "boolean: If true will highlights the features on map using Features Widget"
                },
                "attribute": "highlight-enabled",
                "reflect": false,
                "defaultValue": "true"
            }
        };
    }
    static get states() {
        return {
            "_alertOpen": {},
            "_count": {},
            "_editRecordOpen": {},
            "_mobileTitle": {},
            "_showListView": {},
            "_translations": {}
        };
    }
    static get events() {
        return [{
                "method": "popupClosed",
                "name": "popupClosed",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted on demand when the popup is closed"
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }, {
                "method": "selectionChanged",
                "name": "selectionChanged",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted on demand when the selected index changes"
                },
                "complexType": {
                    "original": "__esri.Graphic[]",
                    "resolved": "Graphic[]",
                    "references": {
                        "___esri": {
                            "location": "global",
                            "id": "global::___esri"
                        }
                    }
                }
            }];
    }
    static get methods() {
        return {
            "getSelectedFeature": {
                "complexType": {
                    "signature": "() => Promise<any>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<any>"
                },
                "docs": {
                    "text": "Get the current selected feature from the Features widget",
                    "tags": [{
                            "name": "returns",
                            "text": "Promise resolving with the current feature"
                        }]
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "graphics",
                "methodName": "graphicsWatchHandler"
            }, {
                "propName": "isMobile",
                "methodName": "isMobileWatchHandler"
            }, {
                "propName": "mapView",
                "methodName": "mapViewWatchHandler"
            }];
    }
    static get listeners() {
        return [{
                "name": "closeEdit",
                "method": "closeEdit",
                "target": "window",
                "capture": false,
                "passive": false
            }, {
                "name": "layerSelectionChange",
                "method": "layerSelectionChange",
                "target": "window",
                "capture": false,
                "passive": false
            }, {
                "name": "refreshGraphics",
                "method": "refreshGraphics",
                "target": "window",
                "capture": false,
                "passive": false
            }];
    }
}
