/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { l as loadModules } from './loadModules.js';
import { f as getAllTables } from './mapViewUtils.js';
import { d as defineCustomElement$s } from './action.js';
import { d as defineCustomElement$r } from './action-menu.js';
import { d as defineCustomElement$q } from './alert.js';
import { d as defineCustomElement$p } from './avatar.js';
import { d as defineCustomElement$o } from './button.js';
import { d as defineCustomElement$n } from './chip.js';
import { d as defineCustomElement$m } from './filter2.js';
import { d as defineCustomElement$l } from './handle.js';
import { d as defineCustomElement$k } from './icon.js';
import { d as defineCustomElement$j } from './input.js';
import { d as defineCustomElement$i } from './list.js';
import { d as defineCustomElement$h } from './list-item.js';
import { d as defineCustomElement$g } from './loader.js';
import { d as defineCustomElement$f } from './modal.js';
import { d as defineCustomElement$e } from './notice.js';
import { d as defineCustomElement$d } from './pagination.js';
import { d as defineCustomElement$c } from './panel.js';
import { d as defineCustomElement$b } from './popover.js';
import { d as defineCustomElement$a } from './progress.js';
import { d as defineCustomElement$9 } from './scrim.js';
import { d as defineCustomElement$8 } from './shell.js';
import { d as defineCustomElement$7 } from './stack.js';
import { d as defineCustomElement$6 } from './tooltip.js';
import { d as defineCustomElement$5 } from './delete-button2.js';
import { d as defineCustomElement$4 } from './delete-dialog2.js';
import { d as defineCustomElement$3 } from './edit-card2.js';
import { d as defineCustomElement$2 } from './feature-list2.js';
import { d as defineCustomElement$1 } from './info-card2.js';

const featureDetailsCss = ":host{display:block}.buttons-container{align-items:center;display:flex;padding:4px;color:var(--calcite-color-text-1) !important;background-color:var(--calcite-color-foreground-1) !important;border-block-start:1px solid var(--calcite-color-border-3);border-block-end:1px solid var(--calcite-color-border-3)}";
const FeatureDetailsStyle0 = featureDetailsCss;

const FeatureDetails = /*@__PURE__*/ proxyCustomElement(class FeatureDetails extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.loadingStatus = createEvent(this, "loadingStatus", 7);
        this.commentSelect = createEvent(this, "commentSelect", 7);
        this.addComment = createEvent(this, "addComment", 7);
        this.likeOrDislikeClicked = createEvent(this, "likeOrDislikeClicked", 7);
        this.featureSelectionChange = createEvent(this, "featureSelectionChange", 7);
        this.mapView = undefined;
        this.graphics = undefined;
        this.reportingOptions = undefined;
        this.layerItemsHash = undefined;
        this.showUserImageInCommentsList = false;
        this._likeFieldAvailable = false;
        this._likeCount = 0;
        this._disLikeCount = 0;
        this._dislikeFieldAvailable = false;
        this._commentsAvailable = false;
        this._isLikeBtnClicked = false;
        this._isDislikeBtnClicked = false;
        this._relatedFeaturesOIDs = undefined;
        this._updating = false;
    }
    get el() { return this; }
    //--------------------------------------------------------------------------
    //
    //  Properties (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * HTMLCreateFeatureElement: info card component instance
     */
    _infoCard;
    /**
     * HTMLFeatureListElement: Feature list component's instance to show the comments
     */
    _commentsList;
    /**
     * __esri.Graphic: The current selected feature graphic
     */
    _selectedGraphic;
    /**
     * string: Available like field in the layer
     */
    _likeField;
    /**
     * string: Available dislike field in the layer
     */
    _dislikeField;
    /**
     * esri/Graphic: https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html
     */
    Graphic;
    /**
     * https://developers.arcgis.com/javascript/latest/api-reference/esri-rest-support-RelationshipQuery.html
     * used for module import
     */
    RelationshipQuery;
    /**
     * string[]: Valid field types for like and dislike
     */
    _validFieldTypes = ["small-integer", "integer", "big-integer", "single", "long"];
    /**
     *string: related table id of selected feature
     */
    relatedTableId;
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    /**
     * Called each time the graphics prop is changed
     */
    async graphicsWatchHandler() {
        await this.getCompleteGraphic(this.graphics[0]);
        this.checkLikeDislikeFields();
        await this.processComments();
    }
    //--------------------------------------------------------------------------
    //
    //  Methods (public)
    //
    //--------------------------------------------------------------------------
    /**
     * Refresh the features comments which will fetch like, dislike and update the component
     * @returns Promise that resolves when the operation is complete
     */
    async refresh(graphic) {
        await this.getCompleteGraphic(graphic);
        await this.processComments();
        if (this.isLikeDislikeConfigured(graphic.layer)) {
            // in case of multiple features selected fetch complete feature and update like dislike for current feature
            if (graphic && this.graphics.length > 1) {
                this.checkLikeDislikeFields();
            }
        }
        else {
            this._likeFieldAvailable = false;
            this._dislikeFieldAvailable = false;
        }
    }
    /**
     * Go to the previous feature in the features widget
     */
    async back() {
        void this._infoCard.back();
    }
    /**
     * Go to the next feature in the features widget
     */
    async next() {
        void this._infoCard.next();
    }
    /**
     * Toggle the visibility of the features list view
     */
    async toggleListView() {
        void this._infoCard.toggleListView();
    }
    //--------------------------------------------------------------------------
    //
    //  Events (public)
    //
    //--------------------------------------------------------------------------
    /**
     * Emitted on demand when like or dislike button is clicked
     */
    loadingStatus;
    /**
     * Emitted on demand when comment is selected using the feature-list
     */
    commentSelect;
    /**
     * Emitted on demand when comment icon is clicked
     */
    addComment;
    /**
     * Emitted on demand when like or dislike button is clicked
     */
    likeOrDislikeClicked;
    /**
     * Emitted on demand when the selected index changes
     */
    featureSelectionChange;
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     *
     * @returns Promise when complete
     */
    async componentWillLoad() {
        await this._initModules();
        //Apply query to get complete graphic with complete attributes
        await this.getCompleteGraphic(this.graphics[0]);
        this.checkLikeDislikeFields();
        await this.processComments();
    }
    render() {
        //When related features found show comments list of only those features else comments list will be empty
        const commentsListWhereClause = this._relatedFeaturesOIDs?.length > 0 ? `objectId in(${this._relatedFeaturesOIDs})` : '1=0';
        return (h("calcite-panel", { key: 'e09b693348a5d446f6ea3c774af3c2fd14e66daf', "full-height": true }, h("info-card", { key: '4483a15e4e0bdd62c2c21bc4622d3bbddf3cd113', allowEditing: false, graphics: this.graphics, highlightEnabled: false, isLoading: false, isMobile: false, mapView: this.mapView, onSelectionChanged: (e) => { this.featureSelectionChange.emit(e.detail); }, paginationEnabled: false, position: "relative", ref: el => this._infoCard = el }), (this._likeFieldAvailable || this._dislikeFieldAvailable || this._commentsAvailable) &&
            h("div", { key: 'ac24bb5fd56a7561e78d90c3a1b10027cfab6b2b', class: "buttons-container" }, this._commentsAvailable &&
                h("calcite-button", { key: '676c5da52465f295212668f8db9b353e219070f2', appearance: "transparent", iconEnd: "speech-bubble", kind: "neutral", onClick: () => { this.addComment.emit(); }, scale: 'm' }, this._relatedFeaturesOIDs.length), this._likeFieldAvailable &&
                h("calcite-button", { key: 'b3fe54ea2fcf5361e6ec0a91bd52775d24408d77', appearance: "transparent", iconEnd: "thumbs-up", kind: this._isLikeBtnClicked ? "brand" : "neutral", loading: this._updating, onClick: this.onLikeButtonClick.bind(this), scale: 'm' }, this._likeCount ?? this._selectedGraphic.attributes[this._likeField] ?? 0), this._dislikeFieldAvailable &&
                h("calcite-button", { key: 'd83c9b9fdd287e07670ca9a5aeafd1a4cc38c0f8', appearance: "transparent", iconEnd: "thumbs-down", kind: this._isDislikeBtnClicked ? "brand" : "neutral", loading: this._updating, onClick: this.onDislikeButtonClick.bind(this), scale: 'm' }, this._disLikeCount ?? this._selectedGraphic.attributes[this._dislikeField] ?? 0)), this.relatedTableId && this._commentsAvailable &&
            h("feature-list", { key: '9d72181a778e08b632d802689a66fa21924cd5b3', class: "height-full", mapView: this.mapView, onFeatureSelect: (e) => { this.commentSelect.emit(e.detail); }, pageSize: 5, ref: el => this._commentsList = el, selectedLayerId: this.relatedTableId, showErrorWhenNoFeatures: false, showInitialLoading: false, showUserImageInList: this.showUserImageInCommentsList, textSize: "small", whereClause: commentsListWhereClause })));
    }
    /**
     * Load esri javascript api modules
     *
     * @returns Promise resolving when function is done
     *
     * @protected
     */
    async _initModules() {
        const [RelationshipQuery, Graphic] = await loadModules([
            "esri/rest/support/RelationshipQuery",
            "esri/Graphic"
        ]);
        this.RelationshipQuery = RelationshipQuery;
        this.Graphic = Graphic;
    }
    /**
     * Get complete graphic with complete attributes
     * @param graphic selected feature graphic
     * @protected
     */
    async getCompleteGraphic(graphic) {
        if (graphic) {
            const layer = graphic.layer;
            const query = layer.createQuery();
            query.objectIds = [graphic.getObjectId()];
            const completeGraphic = await layer.queryFeatures(query);
            this._selectedGraphic = completeGraphic.features[0];
        }
    }
    /**
     * Process the comments functionality.
     * If comments are configured, fetches the related comments ans creates the input for comments list
     * @protected
     */
    async processComments() {
        const selectedLayer = this._selectedGraphic.layer;
        const commentsConfigured = this.reportingOptions && this.reportingOptions[selectedLayer.id] &&
            this.reportingOptions[selectedLayer.id].comment && selectedLayer.relationships?.length > 0;
        if (commentsConfigured) {
            //Get comments table id from map
            const allTables = await getAllTables(this.mapView);
            let relatedTable = null;
            let validRelationshipId = null;
            selectedLayer.relationships.some((relationship) => {
                const relatedTables = allTables.filter((table) => selectedLayer.url === table.url && table.layerId === relationship.relatedTableId);
                if (relatedTables && relatedTables.length > 0) {
                    relatedTable = relatedTables[0];
                    validRelationshipId = relationship.id;
                    return true;
                }
            });
            this.relatedTableId = relatedTable?.id ?? '';
            //**Get the related records for the current selected feature**
            if (this.relatedTableId) {
                //current selected feature's objectId
                const objectId = this._selectedGraphic.attributes[selectedLayer.objectIdField];
                //create relationship query to get all the related records with the current selected feature
                const relationshipQuery = new this.RelationshipQuery({
                    objectIds: [objectId],
                    outFields: ['*'],
                    relationshipId: validRelationshipId
                });
                const result = await selectedLayer.queryRelatedFeatures(relationshipQuery).catch((e) => {
                    console.error(e);
                });
                const relatedOIDs = [];
                if (result[objectId]) {
                    result[objectId].features.forEach((feature) => {
                        relatedOIDs.push(feature.attributes[relatedTable.objectIdField]);
                    });
                }
                // Store the objectid's of the related features, this will be used to show the comments and its count
                this._relatedFeaturesOIDs = relatedOIDs;
                //Set comments available or not
                this._commentsAvailable = true;
            }
            else {
                this._relatedFeaturesOIDs = [];
                this._commentsAvailable = false;
            }
        }
        else {
            this._relatedFeaturesOIDs = [];
            this._commentsAvailable = false;
            this.relatedTableId = '';
        }
    }
    /**
     * Checks if the layers is configured for like dislike or not
     * @param selectedLayer Feature layer
     * @returns boolean
     * @protected
     */
    isLikeDislikeConfigured(selectedLayer) {
        let likeFieldAvailable = false;
        let dislikeFieldAvailable = false;
        // check if reporting options are configured for the current selected feature's layer
        if (this.reportingOptions && this.reportingOptions[selectedLayer.id]) {
            //return false if both like and dislike are disabled for the layer
            if (!this.reportingOptions[selectedLayer.id].like && !this.reportingOptions[selectedLayer.id].dislike) {
                return false;
            }
            const likeField = this.reportingOptions[selectedLayer.id].likeField;
            const dislikeField = this.reportingOptions[selectedLayer.id].dislikeField;
            //if both fields are not configured return false
            if (!likeField && !dislikeField) {
                return false;
            }
            //Check if selected layer have the configured like and dislike field and it is of integer types
            selectedLayer.fields.forEach((eachField) => {
                if (this._validFieldTypes.indexOf(eachField.type) > -1 && this.layerItemsHash[selectedLayer.id].supportsUpdate) {
                    if (eachField.name === likeField && this.reportingOptions[selectedLayer.id].like) {
                        likeFieldAvailable = true;
                    }
                    else if (eachField.name === dislikeField && this.reportingOptions[selectedLayer.id].dislike) {
                        dislikeFieldAvailable = true;
                    }
                }
            });
        }
        return likeFieldAvailable || dislikeFieldAvailable;
    }
    /**
     * Check if configured like or dislike fields are available in the selected layer
     * @protected
     */
    checkLikeDislikeFields() {
        this._likeFieldAvailable = false;
        this._dislikeFieldAvailable = false;
        this._isLikeBtnClicked = false;
        this._isDislikeBtnClicked = false;
        this._likeCount = 0;
        this._disLikeCount = 0;
        const selectedLayer = this._selectedGraphic.layer;
        // check if reporting options are configured for the current selected feature's layer
        if (this.reportingOptions && this.reportingOptions[selectedLayer.id]) {
            this._likeField = this.reportingOptions[selectedLayer.id].likeField;
            this._dislikeField = this.reportingOptions[selectedLayer.id].dislikeField;
            //if both fields are not found return
            if (!this._likeField && !this._dislikeField) {
                return;
            }
            //Check if selected layer have the configured like and dislike fields
            //also, get the current value for like and dislike field from the attributes
            selectedLayer.fields.forEach((eachField) => {
                if (this._validFieldTypes.indexOf(eachField.type) > -1 && this.layerItemsHash[selectedLayer.id].supportsUpdate) {
                    if (eachField.name === this._likeField && this.reportingOptions[selectedLayer.id].like) {
                        this._likeFieldAvailable = true;
                        this._likeCount = this._selectedGraphic.attributes[eachField.name];
                    }
                    else if (eachField.name === this._dislikeField && this.reportingOptions[selectedLayer.id].dislike) {
                        this._dislikeFieldAvailable = true;
                        this._disLikeCount = this._selectedGraphic.attributes[eachField.name];
                    }
                }
            });
            this.getFromLocalStorage();
        }
    }
    /**
     * On like button click highlight the like button and update the feature
     * @protected
     */
    onLikeButtonClick() {
        if (this._isDislikeBtnClicked && this.reportingOptions[this._selectedGraphic.layer.id].dislike) {
            this.onDislikeButtonClick();
        }
        this._isLikeBtnClicked = !this._isLikeBtnClicked;
        if (this._isLikeBtnClicked) {
            this._likeCount++;
        }
        else {
            this._likeCount--;
        }
        void this.updateFeaturesLikeDislikeField(this._likeField, this._isLikeBtnClicked);
    }
    /**
     * On dislike button click highlight the dislike button and update the feature
     * @protected
     */
    onDislikeButtonClick() {
        if (this._isLikeBtnClicked && this.reportingOptions[this._selectedGraphic.layer.id].like) {
            this.onLikeButtonClick();
        }
        this._isDislikeBtnClicked = !this._isDislikeBtnClicked;
        if (this._isDislikeBtnClicked) {
            this._disLikeCount++;
        }
        else {
            this._disLikeCount--;
        }
        void this.updateFeaturesLikeDislikeField(this._dislikeField, this._isDislikeBtnClicked);
    }
    /**
     * Update the feature if user click on like or dislike button
     * @param fieldName field name of the feature for like or dislike attribute
     * @param buttonClicked is like or dislike button clicked
     * @protected
     */
    async updateFeaturesLikeDislikeField(fieldName, buttonClicked) {
        const attributesToUpdate = {};
        const selectedLayer = this._selectedGraphic.layer;
        this._updating = true;
        //Increment the value if button is clicked or else decrement it
        const selectFeatureAttr = this._selectedGraphic;
        selectFeatureAttr.attributes[fieldName] = Number(selectFeatureAttr.attributes[fieldName]) + (buttonClicked ? 1 : -1);
        //use the oid and like/dislike field value to update
        attributesToUpdate[selectedLayer.objectIdField] = selectFeatureAttr.attributes[selectedLayer.objectIdField];
        attributesToUpdate[fieldName] = selectFeatureAttr.attributes[fieldName];
        const newGraphicInstance = new this.Graphic();
        newGraphicInstance.attributes = attributesToUpdate;
        // Update the feature attribute in the feature layer
        const param = { updateFeatures: [newGraphicInstance] };
        await selectedLayer.applyEdits(param).then(() => {
            this._selectedGraphic = selectFeatureAttr;
            //store the like dislike value for the current selected graphic in local storage
            this.setInLocalStorage();
            this._updating = false;
            this.likeOrDislikeClicked.emit();
        }, (err) => {
            this._updating = false;
            console.log(err);
        });
    }
    /**
     * Gets the like/dislike information form local storage and updates the like and dislike button states
     * @protected
     */
    getFromLocalStorage() {
        const uniqueLayerId = this._selectedGraphic.layer.id;
        //get the data from local storage and check current feature is liked or disliked
        const localStorageUser = localStorage[uniqueLayerId];
        if (localStorageUser) {
            const parseArr = JSON.parse(localStorageUser);
            const res = parseArr.filter((arr) => arr.id === this._selectedGraphic.getObjectId());
            if (res.length > 0) {
                this._isLikeBtnClicked = res[0].like;
                this._isDislikeBtnClicked = res[0].dislike;
            }
        }
    }
    /**
     * Sets the like/dislike information for the current selected graphic in local storage
     * @protected
     */
    setInLocalStorage() {
        const uniqueLayerId = this._selectedGraphic.layer.id;
        const localStorageInfo = localStorage[uniqueLayerId];
        let information = [];
        //if information for the current layer found in local storage update it
        //else add new information for the current layer in the local storage
        if (localStorageInfo) {
            information = JSON.parse(localStorageInfo);
            const index = information.findIndex((arr) => arr.id === this._selectedGraphic.getObjectId());
            //if information for current objectid found delete it, so that we always have info for each oid in a layer only once
            if (index >= 0) {
                information.splice(index, 1);
            }
        }
        //add the information for current selected graphic
        information.push({
            id: this._selectedGraphic.getObjectId(),
            like: this._isLikeBtnClicked && this._likeCount !== 0,
            dislike: this._isDislikeBtnClicked && this._disLikeCount !== 0
        });
        localStorage.setItem(uniqueLayerId, JSON.stringify(information));
    }
    static get watchers() { return {
        "graphics": ["graphicsWatchHandler"]
    }; }
    static get style() { return FeatureDetailsStyle0; }
}, [0, "feature-details", {
        "mapView": [16],
        "graphics": [16],
        "reportingOptions": [16],
        "layerItemsHash": [16],
        "showUserImageInCommentsList": [4, "show-user-image-in-comments-list"],
        "_likeFieldAvailable": [32],
        "_likeCount": [32],
        "_disLikeCount": [32],
        "_dislikeFieldAvailable": [32],
        "_commentsAvailable": [32],
        "_isLikeBtnClicked": [32],
        "_isDislikeBtnClicked": [32],
        "_relatedFeaturesOIDs": [32],
        "_updating": [32],
        "refresh": [64],
        "back": [64],
        "next": [64],
        "toggleListView": [64]
    }, undefined, {
        "graphics": ["graphicsWatchHandler"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["feature-details", "calcite-action", "calcite-action-menu", "calcite-alert", "calcite-avatar", "calcite-button", "calcite-chip", "calcite-filter", "calcite-handle", "calcite-icon", "calcite-input", "calcite-list", "calcite-list-item", "calcite-loader", "calcite-modal", "calcite-notice", "calcite-pagination", "calcite-panel", "calcite-popover", "calcite-progress", "calcite-scrim", "calcite-shell", "calcite-stack", "calcite-tooltip", "delete-button", "delete-dialog", "edit-card", "feature-list", "info-card"];
    components.forEach(tagName => { switch (tagName) {
        case "feature-details":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, FeatureDetails);
            }
            break;
        case "calcite-action":
            if (!customElements.get(tagName)) {
                defineCustomElement$s();
            }
            break;
        case "calcite-action-menu":
            if (!customElements.get(tagName)) {
                defineCustomElement$r();
            }
            break;
        case "calcite-alert":
            if (!customElements.get(tagName)) {
                defineCustomElement$q();
            }
            break;
        case "calcite-avatar":
            if (!customElements.get(tagName)) {
                defineCustomElement$p();
            }
            break;
        case "calcite-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$o();
            }
            break;
        case "calcite-chip":
            if (!customElements.get(tagName)) {
                defineCustomElement$n();
            }
            break;
        case "calcite-filter":
            if (!customElements.get(tagName)) {
                defineCustomElement$m();
            }
            break;
        case "calcite-handle":
            if (!customElements.get(tagName)) {
                defineCustomElement$l();
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$k();
            }
            break;
        case "calcite-input":
            if (!customElements.get(tagName)) {
                defineCustomElement$j();
            }
            break;
        case "calcite-list":
            if (!customElements.get(tagName)) {
                defineCustomElement$i();
            }
            break;
        case "calcite-list-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$h();
            }
            break;
        case "calcite-loader":
            if (!customElements.get(tagName)) {
                defineCustomElement$g();
            }
            break;
        case "calcite-modal":
            if (!customElements.get(tagName)) {
                defineCustomElement$f();
            }
            break;
        case "calcite-notice":
            if (!customElements.get(tagName)) {
                defineCustomElement$e();
            }
            break;
        case "calcite-pagination":
            if (!customElements.get(tagName)) {
                defineCustomElement$d();
            }
            break;
        case "calcite-panel":
            if (!customElements.get(tagName)) {
                defineCustomElement$c();
            }
            break;
        case "calcite-popover":
            if (!customElements.get(tagName)) {
                defineCustomElement$b();
            }
            break;
        case "calcite-progress":
            if (!customElements.get(tagName)) {
                defineCustomElement$a();
            }
            break;
        case "calcite-scrim":
            if (!customElements.get(tagName)) {
                defineCustomElement$9();
            }
            break;
        case "calcite-shell":
            if (!customElements.get(tagName)) {
                defineCustomElement$8();
            }
            break;
        case "calcite-stack":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "calcite-tooltip":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "delete-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "delete-dialog":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "edit-card":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "feature-list":
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

export { FeatureDetails as F, defineCustomElement as d };
