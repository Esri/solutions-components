/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { g as getLocaleComponentStrings } from './locale.js';
import { q as queryFeaturesByID } from './queryUtils.js';
import { g as getLayerOrTable } from './mapViewUtils.js';
import { d as defineCustomElement$k } from './action.js';
import { d as defineCustomElement$j } from './action-menu.js';
import { d as defineCustomElement$i } from './alert.js';
import { d as defineCustomElement$h } from './button.js';
import { d as defineCustomElement$g } from './chip.js';
import { d as defineCustomElement$f } from './flow-item.js';
import { d as defineCustomElement$e } from './icon.js';
import { d as defineCustomElement$d } from './loader.js';
import { d as defineCustomElement$c } from './modal.js';
import { d as defineCustomElement$b } from './notice.js';
import { d as defineCustomElement$a } from './panel.js';
import { d as defineCustomElement$9 } from './popover.js';
import { d as defineCustomElement$8 } from './scrim.js';
import { d as defineCustomElement$7 } from './shell.js';
import { d as defineCustomElement$6 } from './tooltip.js';
import { d as defineCustomElement$5 } from './create-feature2.js';
import { d as defineCustomElement$4 } from './delete-button2.js';
import { d as defineCustomElement$3 } from './delete-dialog2.js';
import { d as defineCustomElement$2 } from './edit-card2.js';
import { d as defineCustomElement$1 } from './info-card2.js';

const cardManagerCss = ":host{display:block !important}.display-flex{display:flex}.display-none{display:none}.w-100{width:100%}.padding-bottom-1{padding-bottom:1rem}.padding-1{padding:1rem}.position-relative{position:relative}.focus-margin{margin:1px 1px 0px 1px}.overflow-auto{overflow:auto}.height-full{height:100%}.position-static{position:static !important}.z-index-500{z-index:500 !important}card-manager{display:block}";
const CardManagerStyle0 = cardManagerCss;

const CardManager = /*@__PURE__*/ proxyCustomElement(class CardManager extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.createWorkFlowStarted = createEvent(this, "createWorkFlowStarted", 7);
        this.backFromCreateWorkFlow = createEvent(this, "backFromCreateWorkFlow", 7);
        this.featureOrRecordSubmitted = createEvent(this, "featureOrRecordSubmitted", 7);
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
    get el() { return this; }
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
    static get style() { return CardManagerStyle0; }
}, [0, "card-manager", {
        "customInfoText": [1, "custom-info-text"],
        "enableEditGeometry": [4, "enable-edit-geometry"],
        "isMobile": [4, "is-mobile"],
        "layer": [1040],
        "mapView": [16],
        "zoomAndScrollToSelected": [4, "zoom-and-scroll-to-selected"],
        "selectedFeaturesIds": [16],
        "enableCreateFeatures": [4, "enable-create-features"],
        "selectingFeatureFromMap": [4, "selecting-feature-from-map"],
        "_cardLoading": [32],
        "_graphics": [32],
        "_showCreateFeatureComponent": [32],
        "_showSubmitBtn": [32],
        "_translations": [32]
    }, [[8, "featureSelectionChange", "featureSelectionChange"], [8, "layerSelectionChange", "layerSelectionChange"]]]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["card-manager", "calcite-action", "calcite-action-menu", "calcite-alert", "calcite-button", "calcite-chip", "calcite-flow-item", "calcite-icon", "calcite-loader", "calcite-modal", "calcite-notice", "calcite-panel", "calcite-popover", "calcite-scrim", "calcite-shell", "calcite-tooltip", "create-feature", "delete-button", "delete-dialog", "edit-card", "info-card"];
    components.forEach(tagName => { switch (tagName) {
        case "card-manager":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, CardManager);
            }
            break;
        case "calcite-action":
            if (!customElements.get(tagName)) {
                defineCustomElement$k();
            }
            break;
        case "calcite-action-menu":
            if (!customElements.get(tagName)) {
                defineCustomElement$j();
            }
            break;
        case "calcite-alert":
            if (!customElements.get(tagName)) {
                defineCustomElement$i();
            }
            break;
        case "calcite-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$h();
            }
            break;
        case "calcite-chip":
            if (!customElements.get(tagName)) {
                defineCustomElement$g();
            }
            break;
        case "calcite-flow-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$f();
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$e();
            }
            break;
        case "calcite-loader":
            if (!customElements.get(tagName)) {
                defineCustomElement$d();
            }
            break;
        case "calcite-modal":
            if (!customElements.get(tagName)) {
                defineCustomElement$c();
            }
            break;
        case "calcite-notice":
            if (!customElements.get(tagName)) {
                defineCustomElement$b();
            }
            break;
        case "calcite-panel":
            if (!customElements.get(tagName)) {
                defineCustomElement$a();
            }
            break;
        case "calcite-popover":
            if (!customElements.get(tagName)) {
                defineCustomElement$9();
            }
            break;
        case "calcite-scrim":
            if (!customElements.get(tagName)) {
                defineCustomElement$8();
            }
            break;
        case "calcite-shell":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "calcite-tooltip":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "create-feature":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "delete-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "delete-dialog":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "edit-card":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "info-card":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { CardManager as C, defineCustomElement as d };
