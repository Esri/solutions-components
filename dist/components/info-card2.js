/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { g as getLocaleComponentStrings } from './locale.js';
import { l as loadModules } from './loadModules.js';
import { P as PopupUtils } from './popupUtils.js';
import { d as defineCustomElement$g } from './action.js';
import { d as defineCustomElement$f } from './action-menu.js';
import { d as defineCustomElement$e } from './alert.js';
import { d as defineCustomElement$d } from './button.js';
import { d as defineCustomElement$c } from './chip.js';
import { d as defineCustomElement$b } from './icon.js';
import { d as defineCustomElement$a } from './loader.js';
import { d as defineCustomElement$9 } from './modal.js';
import { d as defineCustomElement$8 } from './notice.js';
import { d as defineCustomElement$7 } from './panel.js';
import { d as defineCustomElement$6 } from './popover.js';
import { d as defineCustomElement$5 } from './scrim.js';
import { d as defineCustomElement$4 } from './shell.js';
import { d as defineCustomElement$3 } from './tooltip.js';
import { d as defineCustomElement$2 } from './delete-button2.js';
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
        return (h(Host, { key: '8714c3ab52be88e3622888c7984c9ded5759fa17' }, h("calcite-shell", { key: 'f63b166a00794815af852a1260fe7b67784428d4', style: { position: this.position } }, this._getHeader(), h("calcite-loader", { key: 'b937ff64982989f3dec3c94236932698300b0eb6', class: loadingClass, label: this._translations.fetchingData }), h("div", { key: '0f7b914839ab400b1f757eb50cd0ba5f60628336', class: "esri-widget feature-node " + featureNodeClass, id: this._featuresNodeId }), h("div", { key: '9867c94363da7d060bc718e77eab0ed139d4ba7d', class: `${editButtonClass} width-100`, slot: "footer" }, this.allowEditing &&
            h("div", { key: 'a90edcda183289259db99b9255d28d6c31809d40', class: "display-flex top-border padding-1-2" }, h("calcite-button", { key: 'b1bc47ed857efc478c11e1353216bb8925b75885', appearance: "solid", id: "solutions-edit", onClick: () => this._openEditRecord(), width: "full" }, this._translations.edit), this.isMobile && deleteEnabled ? (h("delete-button", { class: "padding-inline-start-1 width-100", id: "solutions-delete", ids: ids, layer: this._layer, onEditsComplete: () => this._closePopup() })) : undefined, h("calcite-tooltip", { key: 'd493735dadf6dd34a767332a1a179716fbfa6384', placement: "bottom", "reference-element": "solutions-edit" }, h("span", { key: '663217b0b2c078aa7ac1b99a891af5380b9521c1' }, this._translations.edit)), this.isMobile ? (h("calcite-tooltip", { placement: "bottom", "reference-element": "solutions-delete" }, h("span", null, this._translations.delete))) : undefined), this.paginationEnabled && !nextBackDisabled && h("div", { key: 'df2249f431b0df3a25c44fb6d54adec903bbe328', class: `display-flex padding-1-2 button-container top-border ${nextBackClass}` }, h("div", { key: '31b82d904e766f938c2c1fc5bd76625921e7fe10' }, h("calcite-button", { key: '49656c590d330796f1d508ef33689f909991a6ec', appearance: 'transparent', disabled: nextBackDisabled, iconStart: "chevron-left", id: "solutions-back", onClick: () => this._back(), width: "full" }), h("calcite-tooltip", { key: 'f5238fdc65fa68152961253d536be38a044aeb76', placement: "top", "reference-element": "solutions-back" }, h("span", { key: '470c4da1cd28940155bdbd30acc8b742d827a891' }, this._translations.back))), h("calcite-action", { key: 'be9e9b4d4dbabe2c11bf13043bfb33cdae093315', class: 'pagination-action', onClick: () => this._toggleListView(), scale: "s", text: "", textEnabled: true }, h("span", { key: 'd7d3313b537691ac131b958475e6547f3659c6ac', class: "pagination-count" }, this._count)), h("div", { key: '0ef506ac483cf51a958e335b16cbe9a764bb497e' }, h("calcite-button", { key: 'f3c1a25fe1a619275f32058d1fa646467e83cca5', appearance: "transparent", disabled: nextBackDisabled, iconStart: "chevron-right", id: "solutions-next", onClick: () => this._next(), width: "full" }), h("calcite-tooltip", { key: 'cddbf1200a3acd465e5ef23f34b5bf26c81ffad5', placement: "top", "reference-element": "solutions-next" }, h("span", { key: '9e9454c303b8f37f12d4ad07b3401d50bd04141d' }, this._translations.next))))), h("edit-card", { key: '3497893bbb59f3a2ace941d3bb1d98b0fa7fac0c', class: editClass, enableEditGeometry: this.enableEditGeometry, graphicIndex: this._features?.selectedFeatureIndex, graphics: this.graphics, mapView: this.mapView, open: this._editRecordOpen }), h("calcite-alert", { key: '4fa290b977bf7c619cc349176bb1e244c554b58d', icon: "layer-broken", kind: "warning", label: "", onCalciteAlertClose: () => this._alertClosed(), open: this._alertOpen, placement: "top" }, h("div", { key: '1e3998afedd33582d33e0c1556a1bcac87902761', slot: "title" }, this._translations.editDisabled), h("div", { key: '489ef148cc4da2a7d7e881d4de9cd6a71ac53809', slot: "message" }, this._translations.enableEditing)))));
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
    const components = ["info-card", "calcite-action", "calcite-action-menu", "calcite-alert", "calcite-button", "calcite-chip", "calcite-icon", "calcite-loader", "calcite-modal", "calcite-notice", "calcite-panel", "calcite-popover", "calcite-scrim", "calcite-shell", "calcite-tooltip", "delete-button", "edit-card"];
    components.forEach(tagName => { switch (tagName) {
        case "info-card":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, InfoCard);
            }
            break;
        case "calcite-action":
            if (!customElements.get(tagName)) {
                defineCustomElement$g();
            }
            break;
        case "calcite-action-menu":
            if (!customElements.get(tagName)) {
                defineCustomElement$f();
            }
            break;
        case "calcite-alert":
            if (!customElements.get(tagName)) {
                defineCustomElement$e();
            }
            break;
        case "calcite-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$d();
            }
            break;
        case "calcite-chip":
            if (!customElements.get(tagName)) {
                defineCustomElement$c();
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$b();
            }
            break;
        case "calcite-loader":
            if (!customElements.get(tagName)) {
                defineCustomElement$a();
            }
            break;
        case "calcite-modal":
            if (!customElements.get(tagName)) {
                defineCustomElement$9();
            }
            break;
        case "calcite-notice":
            if (!customElements.get(tagName)) {
                defineCustomElement$8();
            }
            break;
        case "calcite-panel":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "calcite-popover":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "calcite-scrim":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "calcite-shell":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "calcite-tooltip":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "delete-button":
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
