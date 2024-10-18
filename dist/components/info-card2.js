/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { g as getLocaleComponentStrings } from './locale.js';
import { l as loadModules } from './loadModules.js';
import { P as PopupUtils } from './popupUtils.js';
import { d as defineCustomElement$h } from './action.js';
import { d as defineCustomElement$g } from './action-menu.js';
import { d as defineCustomElement$f } from './alert.js';
import { d as defineCustomElement$e } from './button.js';
import { d as defineCustomElement$d } from './chip.js';
import { d as defineCustomElement$c } from './icon.js';
import { d as defineCustomElement$b } from './loader.js';
import { d as defineCustomElement$a } from './modal.js';
import { d as defineCustomElement$9 } from './notice.js';
import { d as defineCustomElement$8 } from './panel.js';
import { d as defineCustomElement$7 } from './popover.js';
import { d as defineCustomElement$6 } from './scrim.js';
import { d as defineCustomElement$5 } from './shell.js';
import { d as defineCustomElement$4 } from './tooltip.js';
import { d as defineCustomElement$3 } from './delete-button2.js';
import { d as defineCustomElement$2 } from './delete-dialog2.js';
import { d as defineCustomElement$1 } from './edit-card2.js';

const infoCardCss = ":host{display:block;--calcite-label-margin-bottom:0}.padding-1-2{padding:0.5rem}.display-none{display:none !important}.display-flex{display:flex}.position-absolute{position:absolute;top:0;right:0;bottom:0;left:0;overflow:auto}.feature-node{position:relative !important}.feature-node .esri-features__footer{display:none !important}.button-container{justify-content:center;align-items:center}.top-border{border-top:1px solid var(--calcite-color-border-1)}.width-100{width:100%}.esri-features__container{padding:0.5rem !important;background-color:var(--calcite-color-foreground-1) !important;height:100% !important}.overflow-hidden{overflow:hidden}.height-40{height:40px}.end-border{border-inline-end:1px solid var(--calcite-color-border-1)}.font-bold{font-weight:bold}.visibility-hidden{visibility:hidden;height:0px}.padding-inline-start-1{padding-inline-start:1rem}.border-width-0{border-width:0px}.pagination-action{position:relative;left:3px}.pagination-count{color:var(--calcite-color-brand);border-bottom:1px solid var(--calcite-color-brand);font-weight:bold}";
const InfoCardStyle0 = infoCardCss;

const InfoCard = /*@__PURE__*/ proxyCustomElement(class InfoCard extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.popupClosed = createEvent(this, "popupClosed", 7);
        this.selectionChanged = createEvent(this, "selectionChanged", 7);
        this.enableEditGeometry = false;
        this.graphics = undefined;
        this.isLoading = false;
        this.isMobile = undefined;
        this.mapView = undefined;
        this.allowEditing = true;
        this.highlightEnabled = true;
        this.paginationEnabled = true;
        this.position = 'absolute';
        this._alertOpen = false;
        this._count = "";
        this._editRecordOpen = false;
        this._mobileTitle = "";
        this._showListView = false;
        this._translations = undefined;
    }
    get el() { return this; }
    //--------------------------------------------------------------------------
    //
    //  Properties (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * esri/widgets/Feature: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Feature.html
     * used for module import
     */
    Features;
    /**
     * boolean: When false alerts will be shown to indicate that the layer must have editing enabled for edit actions
     */
    _editEnabled;
    /**
     * esri/widgets/Feature: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Feature.html
     * used for widget instance
     */
    _features;
    /**
     * esri/widgets/FeatureLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html
     */
    _layer;
    /**
     * IPopupUtils: When false alerts will be shown to indicate that the layer must have editing enabled for edit actions
     */
    _popupUtils;
    /**
     * string: unique id for the features node
     */
    _featuresNodeId = 'features-node' + new Date().getMilliseconds().toString();
    /**
     * esri/core/reactiveUtils: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-reactiveUtils.html
     */
    reactiveUtils;
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
     * Refresh the feature info
     * @returns Promise when complete
     */
    async refresh() {
        await this.setGraphics();
    }
    /**
     * Go to the previous feature in the features widget
     */
    async back() {
        this._features.previous();
        this._count = this._getCount();
    }
    /**
     * Go to the next feature in the features widget
     */
    async next() {
        this._features.next();
        this._count = this._getCount();
    }
    /**
     * Toggle the visibility of the features list view
     */
    async toggleListView() {
        this._showListView = !this._showListView;
        const i = this._features.selectedFeatureIndex;
        this._features.open({
            features: this.graphics,
            featureMenuOpen: this._showListView
        });
        this._features.selectedFeatureIndex = i;
    }
    /**
     * update the current graphics to the features widget
     */
    async updateCurrentGraphic(selectedGraphic) {
        this._features.selectedFeatureWidget.graphic = selectedGraphic;
    }
    //--------------------------------------------------------------------------
    //
    //  Events (public)
    //
    //--------------------------------------------------------------------------
    /**
     * Emitted on demand when the popup is closed
     */
    popupClosed;
    /**
     * Emitted on demand when the selected index changes
     */
    selectionChanged;
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
        this._showListView = false;
        if (this._features?.viewModel) {
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
        if (this.graphics?.length > 0) {
            await this.setGraphics();
        }
    }
    /**
     * Renders the component.
     */
    render() {
        const loadingClass = this.isLoading ? "" : "display-none";
        const featureNodeClass = this.isLoading || this._editRecordOpen ? "visibility-hidden" : "position-absolute";
        const editClass = !this.isLoading && this._editRecordOpen ? "position-absolute" : "display-none";
        const editButtonClass = (!this.isLoading && this._editRecordOpen) || this._showListView ? "display-none" : "";
        const nextBackDisabled = this._features?.features?.length < 2;
        const nextBackClass = this.isMobile ? "display-none" : "";
        const id = this._features?.selectedFeature?.getObjectId();
        const ids = parseInt(id?.toString(), 10) > -1 ? [id] : [];
        const deleteEnabled = this._layer?.editingEnabled && this._layer?.capabilities?.operations?.supportsDelete;
        return (h(Host, { key: 'e200fd8d903d1c3295247a45f352ae62394501d5' }, h("calcite-shell", { key: '0b467ed0b480944660ef2194b302070d56cb70e4', style: { position: this.position } }, this._getHeader(), h("calcite-loader", { key: 'cf6172f533f67274b04ac61af75f44ffe62cbc9e', class: loadingClass, label: this._translations.fetchingData }), h("div", { key: '06f3e0c61e14fe73c0fadd58c3cf2c7c03efff6d', class: "esri-widget feature-node " + featureNodeClass, id: this._featuresNodeId }), h("div", { key: '0f964afa075abbd27db827f90d189b9bc2a7c9d4', class: `${editButtonClass} width-100`, slot: "footer" }, this.allowEditing &&
            h("div", { key: 'd518934d172425ecb46e6b28ea683427d8982382', class: "display-flex top-border padding-1-2" }, h("calcite-button", { key: '4d4f3583b6448e33e3d3ad1aba8c9178f71d75b8', appearance: "solid", id: "solutions-edit", onClick: () => this._openEditRecord(), width: "full" }, this._translations.edit), this.isMobile && deleteEnabled ? (h("delete-button", { class: "padding-inline-start-1 width-100", id: "solutions-delete", ids: ids, layer: this._layer, onEditsComplete: () => this._closePopup() })) : undefined, h("calcite-tooltip", { key: '5358ba4079f1906d23b6df5b1facb84eec9692d3', placement: "bottom", "reference-element": "solutions-edit" }, h("span", { key: '8466cfb97ce12e46a06ed665afe974377911e101' }, this._translations.edit)), this.isMobile ? (h("calcite-tooltip", { placement: "bottom", "reference-element": "solutions-delete" }, h("span", null, this._translations.delete))) : undefined), this.paginationEnabled && !nextBackDisabled && h("div", { key: '61c551cc2b0c0a2981daa9bf67c7e13318508ca6', class: `display-flex padding-1-2 button-container top-border ${nextBackClass}` }, h("div", { key: '379dc6697743caedf8fdbea16423b83e9e823a5b' }, h("calcite-button", { key: '616a52367d2f56db0104ce279951a81fcf60a376', appearance: 'transparent', disabled: nextBackDisabled, iconFlipRtl: "both", iconStart: "chevron-left", id: "solutions-back", onClick: () => this._back(), width: "full" }), h("calcite-tooltip", { key: 'f7f83e145c25591de025650fd358ca6200c4b6c5', placement: "top", "reference-element": "solutions-back" }, h("span", { key: '8afbde57b91ee8597de237db87efda7eabc10d69' }, this._translations.back))), h("calcite-action", { key: '23344d4abac515d089b8770d63181a989971aa33', class: 'pagination-action', iconFlipRtl: true, onClick: () => this._toggleListView(), scale: "s", text: "", textEnabled: true }, h("span", { key: 'a4c784c5a2c7dfeb9442a58f86961a3242f55055', class: "pagination-count" }, this._count)), h("div", { key: '75e33452a93e9a77f30505957e87b8758ab8d2dd' }, h("calcite-button", { key: '0283a96c401e1929588e28d6ec014eb28b93d1f1', appearance: "transparent", disabled: nextBackDisabled, iconFlipRtl: "both", iconStart: "chevron-right", id: "solutions-next", onClick: () => this._next(), width: "full" }), h("calcite-tooltip", { key: '658a26b1bca471b96799cb81ee941f0556619dc9', placement: "top", "reference-element": "solutions-next" }, h("span", { key: '9892d4ee61a1b5656711bb0a188282d9b46bd3f9' }, this._translations.next))))), h("edit-card", { key: '541268c24631ab526bf1b65313d39f3ca606cb6d', class: editClass, enableEditGeometry: this.enableEditGeometry, graphicIndex: this._features?.selectedFeatureIndex, graphics: this.graphics, mapView: this.mapView, open: this._editRecordOpen }), h("calcite-alert", { key: '1cdff00f5d7e72b5db220750d290593a1baf68c4', icon: "layer-broken", kind: "warning", label: "", onCalciteAlertClose: () => this._alertClosed(), open: this._alertOpen, placement: "top" }, h("div", { key: 'bb250c5906f0e998a794b5c02c22f9643fab16a9', slot: "title" }, this._translations.editDisabled), h("div", { key: 'd330d1ce74473fc76630d2607ab3ca2584aabbd7', slot: "message" }, this._translations.enableEditing)))));
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
        if (!this._features) {
            await this._initFeaturesWidget();
        }
        if (this.graphics.length > 0) {
            this._layer = this.graphics[0]?.layer;
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
        return this.isMobile !== undefined ? await this.mapView?.when(() => {
            if (!this._features) {
                this._features = new this.Features({
                    view: this.mapView,
                    container: this._featuresNodeId,
                    visibleElements: {
                        actionBar: false,
                        closeButton: false,
                        heading: !this.isMobile
                    }
                });
                this._features.viewModel.highlightEnabled = this.highlightEnabled;
                this.reactiveUtils.watch(() => this._features.viewModel.featureMenuOpen, (isOpen) => {
                    this._count = this._getCount();
                    if (!isOpen) {
                        this._showListView = isOpen;
                    }
                });
                this.reactiveUtils.watch(() => this._features.selectedFeatureIndex, (i) => {
                    if (i > -1) {
                        this.selectionChanged.emit({ selectedFeature: [this._features.selectedFeature], selectedFeatureIndex: this._features.selectedFeatureIndex });
                    }
                });
            }
            else {
                this._features.view = this.mapView;
                this._features.visibleElements.actionBar = false;
                this._features.visibleElements.closeButton = false;
                this._features.visibleElements.heading = !this.isMobile;
            }
        }) : Promise.resolve();
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
        const index = (this._features?.viewModel.selectedFeatureIndex + 1).toString();
        const total = this._features?.features?.length.toString();
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
    static get watchers() { return {
        "graphics": ["graphicsWatchHandler"],
        "isMobile": ["isMobileWatchHandler"],
        "mapView": ["mapViewWatchHandler"]
    }; }
    static get style() { return InfoCardStyle0; }
}, [0, "info-card", {
        "enableEditGeometry": [4, "enable-edit-geometry"],
        "graphics": [16],
        "isLoading": [4, "is-loading"],
        "isMobile": [4, "is-mobile"],
        "mapView": [16],
        "allowEditing": [4, "allow-editing"],
        "highlightEnabled": [4, "highlight-enabled"],
        "paginationEnabled": [4, "pagination-enabled"],
        "position": [1],
        "_alertOpen": [32],
        "_count": [32],
        "_editRecordOpen": [32],
        "_mobileTitle": [32],
        "_showListView": [32],
        "_translations": [32],
        "getSelectedFeature": [64],
        "refresh": [64],
        "back": [64],
        "next": [64],
        "toggleListView": [64],
        "updateCurrentGraphic": [64]
    }, [[8, "closeEdit", "closeEdit"], [8, "layerSelectionChange", "layerSelectionChange"], [8, "refreshGraphics", "refreshGraphics"]], {
        "graphics": ["graphicsWatchHandler"],
        "isMobile": ["isMobileWatchHandler"],
        "mapView": ["mapViewWatchHandler"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["info-card", "calcite-action", "calcite-action-menu", "calcite-alert", "calcite-button", "calcite-chip", "calcite-icon", "calcite-loader", "calcite-modal", "calcite-notice", "calcite-panel", "calcite-popover", "calcite-scrim", "calcite-shell", "calcite-tooltip", "delete-button", "delete-dialog", "edit-card"];
    components.forEach(tagName => { switch (tagName) {
        case "info-card":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, InfoCard);
            }
            break;
        case "calcite-action":
            if (!customElements.get(tagName)) {
                defineCustomElement$h();
            }
            break;
        case "calcite-action-menu":
            if (!customElements.get(tagName)) {
                defineCustomElement$g();
            }
            break;
        case "calcite-alert":
            if (!customElements.get(tagName)) {
                defineCustomElement$f();
            }
            break;
        case "calcite-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$e();
            }
            break;
        case "calcite-chip":
            if (!customElements.get(tagName)) {
                defineCustomElement$d();
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$c();
            }
            break;
        case "calcite-loader":
            if (!customElements.get(tagName)) {
                defineCustomElement$b();
            }
            break;
        case "calcite-modal":
            if (!customElements.get(tagName)) {
                defineCustomElement$a();
            }
            break;
        case "calcite-notice":
            if (!customElements.get(tagName)) {
                defineCustomElement$9();
            }
            break;
        case "calcite-panel":
            if (!customElements.get(tagName)) {
                defineCustomElement$8();
            }
            break;
        case "calcite-popover":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "calcite-scrim":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "calcite-shell":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "calcite-tooltip":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "delete-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "delete-dialog":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "edit-card":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { InfoCard as I, defineCustomElement as d };
