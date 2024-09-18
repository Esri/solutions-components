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
import { h } from "@stencil/core";
import { loadModules } from "../../utils/loadModules";
import { getAllTables } from "../../utils/mapViewUtils";
export class FeatureDetails {
    constructor() {
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
    //--------------------------------------------------------------------------
    //
    //  Host element access
    //
    //--------------------------------------------------------------------------
    el;
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
        return (h("calcite-panel", { key: 'edc14da0a332fe605f7e2c661343811e294a12c3', "full-height": true }, h("info-card", { key: 'dd4fd2623c7b2d55b41bfe2381280b0d8b0f3ad4', allowEditing: false, graphics: this.graphics, highlightEnabled: false, isLoading: false, isMobile: false, mapView: this.mapView, onSelectionChanged: (e) => { this.featureSelectionChange.emit(e.detail); }, paginationEnabled: false, position: "relative", ref: el => this._infoCard = el }), (this._likeFieldAvailable || this._dislikeFieldAvailable || this._commentsAvailable) &&
            h("div", { key: '9593936d247998e41a7eb22c6741108e27f2af48', class: "buttons-container" }, this._commentsAvailable &&
                h("div", { key: 'e167be0c9ab27b53d8533249e4cee883e2df889b', class: "comment-btn" }, h("span", { key: 'd33eab166fc98a9121de8354f90087f312c09a5c' }, this._relatedFeaturesOIDs.length), h("calcite-icon", { key: '4393f5e2d961b8190d2e25203f15b178ec6a4ab2', icon: "speech-bubble", scale: 's' })), this._likeFieldAvailable &&
                h("calcite-button", { key: 'fc42846216ec819152fa2fde02266ff1bcb51538', appearance: "transparent", iconEnd: "thumbs-up", kind: this._isLikeBtnClicked ? "brand" : "neutral", loading: this._updating, onClick: this.onLikeButtonClick.bind(this), scale: 'm' }, this._likeCount ?? this._selectedGraphic.attributes[this._likeField] ?? 0), this._dislikeFieldAvailable &&
                h("calcite-button", { key: '6afae4e0599735fef2a348d87b23476c598e3216', appearance: "transparent", iconEnd: "thumbs-down", kind: this._isDislikeBtnClicked ? "brand" : "neutral", loading: this._updating, onClick: this.onDislikeButtonClick.bind(this), scale: 'm' }, this._disLikeCount ?? this._selectedGraphic.attributes[this._dislikeField] ?? 0)), this.relatedTableId && this._commentsAvailable &&
            h("feature-list", { key: '0bc1416ccf4b14138c336723d163250550f87ec5', class: "height-full", mapView: this.mapView, onFeatureSelect: (e) => { this.commentSelect.emit(e.detail); }, pageSize: 5, ref: el => this._commentsList = el, selectedLayerId: this.relatedTableId, showErrorWhenNoFeatures: false, showInitialLoading: false, showUserImageInList: this.showUserImageInCommentsList, textSize: "small", whereClause: commentsListWhereClause })));
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
        const layer = graphic.layer;
        const query = layer.createQuery();
        query.objectIds = [graphic.getObjectId()];
        const completeGraphic = await layer.queryFeatures(query);
        this._selectedGraphic = completeGraphic.features[0];
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
            const relatedTableIdFromRelnship = selectedLayer.relationships[0].relatedTableId;
            const allTables = await getAllTables(this.mapView);
            const allRelatedTables = allTables.filter((table) => selectedLayer.url === table.url && relatedTableIdFromRelnship === table.layerId);
            const relatedTable = allRelatedTables?.length > 0 ? allRelatedTables[0] : null;
            this.relatedTableId = relatedTable?.id ?? '';
            //**Get the related records for the current selected feature**
            if (this.relatedTableId) {
                //current selected feature's objectId
                const objectId = this._selectedGraphic.attributes[selectedLayer.objectIdField];
                //create relationship query to get all the related records with the current selected feature
                const relationshipQuery = new this.RelationshipQuery({
                    objectIds: [objectId],
                    outFields: ['*'],
                    relationshipId: selectedLayer.relationships[0].id
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
    static get is() { return "feature-details"; }
    static get originalStyleUrls() {
        return {
            "$": ["feature-details.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["feature-details.css"]
        };
    }
    static get properties() {
        return {
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
            "reportingOptions": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "IReportingOptions",
                    "resolved": "IReportingOptions",
                    "references": {
                        "IReportingOptions": {
                            "location": "import",
                            "path": "../../components",
                            "id": "src/components.d.ts::IReportingOptions"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "IReportingOptions: Key options for reporting"
                }
            },
            "layerItemsHash": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "ILayerItemsHash",
                    "resolved": "ILayerItemsHash",
                    "references": {
                        "ILayerItemsHash": {
                            "location": "import",
                            "path": "../layer-list/layer-list",
                            "id": "src/components/layer-list/layer-list.tsx::ILayerItemsHash"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "ILayerItemsHash: LayerDetailsHash for each layer in the map"
                }
            },
            "showUserImageInCommentsList": {
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
                    "text": "boolean: When true the profile image of the comment creator will be shown in the comments list"
                },
                "attribute": "show-user-image-in-comments-list",
                "reflect": false,
                "defaultValue": "false"
            }
        };
    }
    static get states() {
        return {
            "_likeFieldAvailable": {},
            "_likeCount": {},
            "_disLikeCount": {},
            "_dislikeFieldAvailable": {},
            "_commentsAvailable": {},
            "_isLikeBtnClicked": {},
            "_isDislikeBtnClicked": {},
            "_relatedFeaturesOIDs": {},
            "_updating": {}
        };
    }
    static get events() {
        return [{
                "method": "loadingStatus",
                "name": "loadingStatus",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted on demand when like or dislike button is clicked"
                },
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                }
            }, {
                "method": "commentSelect",
                "name": "commentSelect",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted on demand when comment is selected using the feature-list"
                },
                "complexType": {
                    "original": "__esri.Graphic",
                    "resolved": "Graphic",
                    "references": {
                        "___esri": {
                            "location": "global",
                            "id": "global::___esri"
                        }
                    }
                }
            }, {
                "method": "featureSelectionChange",
                "name": "featureSelectionChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted on demand when the selected index changes"
                },
                "complexType": {
                    "original": "{ selectedFeature: __esri.Graphic[], selectedFeatureIndex: number }",
                    "resolved": "{ selectedFeature: Graphic[]; selectedFeatureIndex: number; }",
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
            "refresh": {
                "complexType": {
                    "signature": "(graphic?: __esri.Graphic) => Promise<void>",
                    "parameters": [{
                            "name": "graphic",
                            "type": "Graphic",
                            "docs": ""
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        },
                        "___esri": {
                            "location": "global",
                            "id": "global::___esri"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Refresh the features comments which will fetch like, dislike and update the component",
                    "tags": [{
                            "name": "returns",
                            "text": "Promise that resolves when the operation is complete"
                        }]
                }
            },
            "back": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Go to the previous feature in the features widget",
                    "tags": []
                }
            },
            "next": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Go to the next feature in the features widget",
                    "tags": []
                }
            },
            "toggleListView": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Toggle the visibility of the features list view",
                    "tags": []
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "graphics",
                "methodName": "graphicsWatchHandler"
            }];
    }
}
