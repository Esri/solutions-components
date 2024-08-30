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

import { Component, h, Element, Prop, State, Method, Event, EventEmitter, Watch } from '@stencil/core';
import { loadModules } from "../../utils/loadModules";
import { getAllTables } from '../../utils/mapViewUtils';
import { IReportingOptions } from '../../components';
import { ILayerItemsHash } from "../layer-list/layer-list";

@Component({
  tag: 'feature-details',
  styleUrl: 'feature-details.css',
  shadow: false,
})
export class FeatureDetails {
  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLFeatureDetailsElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  @Prop() mapView: __esri.MapView;

  /**
   * esri/Graphic: https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html
   */
  @Prop() graphics: __esri.Graphic[];

  /**
   * IReportingOptions: Key options for reporting
   */
  @Prop() reportingOptions: IReportingOptions;

  /**
   * ILayerItemsHash: LayerDetailsHash for each layer in the map
   */
  @Prop() layerItemsHash: ILayerItemsHash;

  //--------------------------------------------------------------------------
  //
  //  State (internal)
  //
  //--------------------------------------------------------------------------

  /**
   * boolean: When true configured like field is available in selected layer
   */
  @State() _likeFieldAvailable = false;

  /**
   * number: Increment the liked count for feature when like button is clicked
   */
  @State() _likeCount = 0;

  /**
   * number: Decrement the disliked count for feature when dislike button is clicked
   */
  @State() _disLikeCount = 0;

  /**
   * boolean: When true configured dislike field is available in selected layer
   */
  @State() _dislikeFieldAvailable = false;

  /**
   * boolean: When true comments are configured and its table is available in selected layer
   */
  @State() _commentsAvailable = false;

  /**
   * boolean: When true button will get brand color
   */
  @State() _isLikeBtnClicked = false;

  /**
   * boolean: When true button will get brand color
   */
  @State() _isDislikeBtnClicked = false;

  /**
   * string[]: objects ids of the related features (comments)
   */
  @State() _relatedFeaturesOIDs: string[];

  /**
   * boolean: When performing any operations set this to true (This will be used to show loading on like/dislike buttons)
   */
  @State() _updating = false;

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * HTMLCreateFeatureElement: info card component instance
   */
  protected _infoCard: HTMLInfoCardElement;

  /**
   * HTMLFeatureListElement: Feature list component's instance to show the comments
   */
  protected _commentsList: HTMLFeatureListElement;

  /**
   * __esri.Graphic: The current selected feature graphic
   */
  protected _selectedGraphic: __esri.Graphic;

  /**
   * string: Available like field in the layer
   */
  protected _likeField: string;

  /**
   * string: Available dislike field in the layer
   */
  protected _dislikeField: string;

  /**
   * esri/Graphic: https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html
   */
  protected Graphic: typeof import("esri/Graphic");

  /**
   * https://developers.arcgis.com/javascript/latest/api-reference/esri-rest-support-RelationshipQuery.html
   * used for module import
   */
  protected RelationshipQuery: typeof import("esri/rest/support/RelationshipQuery");

  /**
   * string[]: Valid field types for like and dislike
   */
  protected _validFieldTypes = ["small-integer", "integer", "big-integer", "single", "long"];

  /**
   *string: related table id of selected feature
   */
  protected relatedTableId: string

  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------

  /**
   * Called each time the graphics prop is changed
   */
  @Watch("graphics")
  async graphicsWatchHandler(): Promise<void> {
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
  @Method()
  async refresh(graphic?: __esri.Graphic): Promise<void> {
    await this.getCompleteGraphic(graphic);
    await this.processComments();
    if (this.isLikeDislikeConfigured(graphic.layer as __esri.FeatureLayer)) {
      // in case of multiple features selected fetch complete feature and update like dislike for current feature
      if (graphic && this.graphics.length > 1) {
        this.checkLikeDislikeFields();
      }
    } else {
      this._likeFieldAvailable = false;
      this._dislikeFieldAvailable = false;
    }
  }

  /**
   * Go to the previous feature in the features widget
   */
  @Method()
  async back(): Promise<void> {
    void this._infoCard.back();
  }

  /**
   * Go to the next feature in the features widget
   */
  @Method()
  async next(): Promise<void> {
    void this._infoCard.next();
  }

  /**
   * Toggle the visibility of the features list view
   */
  @Method()
  async toggleListView(): Promise<void> {
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
  @Event() loadingStatus: EventEmitter<boolean>;

  /**
   * Emitted on demand when comment is selected using the feature-list
   */
  @Event() commentSelect: EventEmitter<__esri.Graphic>;

  /**
   * Emitted on demand when the selected index changes
   */
  @Event() featureSelectionChange: EventEmitter<{ selectedFeature: __esri.Graphic[], selectedFeatureIndex: number }>;

  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   *
   * @returns Promise when complete
   */
  async componentWillLoad(): Promise<void> {
    await this._initModules();
    //Apply query to get complete graphic with complete attributes
    await this.getCompleteGraphic(this.graphics[0]);
    this.checkLikeDislikeFields();
    await this.processComments();
  }

  render() {
    //When related features found show comments list of only those features else comments list will be empty
    const commentsListWhereClause = this._relatedFeaturesOIDs?.length > 0 ? `objectId in(${this._relatedFeaturesOIDs})` : '1=0';
    return (
      <calcite-panel full-height>
        <info-card
          allowEditing={false}
          graphics={this.graphics}
          highlightEnabled={false}
          isLoading={false}
          isMobile={false}
          mapView={this.mapView}
          onSelectionChanged={(e) => { this.featureSelectionChange.emit(e.detail) }}
          paginationEnabled={false}
          position="relative"
          ref={el => this._infoCard = el}
        />
        {(this._likeFieldAvailable || this._dislikeFieldAvailable || this._commentsAvailable) &&
          <div class="buttons-container">
            {this._commentsAvailable &&
              <div class="comment-btn">
                <span>{this._relatedFeaturesOIDs.length}</span>
                <calcite-icon
                  icon="speech-bubble"
                  scale='s'
                />
              </div>
            }
            {this._likeFieldAvailable &&
              <calcite-button
                appearance={"transparent"}
                iconEnd="thumbs-up"
                kind={this._isLikeBtnClicked ? "brand" : "neutral"}
                loading={this._updating}
                onClick={this.onLikeButtonClick.bind(this)}
                scale='m'
              >{this._likeCount ?? this._selectedGraphic.attributes[this._likeField] ?? 0}</calcite-button>
            }
            {this._dislikeFieldAvailable &&
              <calcite-button
                appearance={"transparent"}
                iconEnd="thumbs-down"
                kind={this._isDislikeBtnClicked ? "brand" : "neutral"}
                loading={this._updating}
                onClick={this.onDislikeButtonClick.bind(this)}
                scale='m'
              >{this._disLikeCount ?? this._selectedGraphic.attributes[this._dislikeField] ?? 0}</calcite-button>
            }
          </div>}
        {this.relatedTableId && this._commentsAvailable &&
          <feature-list
            class="height-full"
            mapView={this.mapView}
            onFeatureSelect={(e) => { this.commentSelect.emit(e.detail) }}
            pageSize={5}
            ref={el => this._commentsList = el}
            selectedLayerId={this.relatedTableId}
            showErrorWhenNoFeatures={false}
            showInitialLoading={false}
            textSize={"small"}
            whereClause={commentsListWhereClause}
          />}
      </calcite-panel>
    );
  }

  /**
   * Load esri javascript api modules
   *
   * @returns Promise resolving when function is done
   *
   * @protected
   */
  protected async _initModules(): Promise<void> {
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
  protected async getCompleteGraphic(graphic: __esri.Graphic): Promise<void> {
    const layer = graphic.layer as __esri.FeatureLayer
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
  protected async processComments(): Promise<void> {
    const selectedLayer = this._selectedGraphic.layer as __esri.FeatureLayer;
    const commentsConfigured = this.reportingOptions && this.reportingOptions[selectedLayer.id] &&
      this.reportingOptions[selectedLayer.id].comment && selectedLayer.relationships?.length > 0;
    if (commentsConfigured) {
      //Get comments table id from map
      const relatedTableIdFromRelnship = selectedLayer.relationships[0].relatedTableId;
      const allTables = await getAllTables(this.mapView);
      const allRelatedTables = allTables.filter((table: __esri.FeatureLayer) => selectedLayer.url === table.url && relatedTableIdFromRelnship === table.layerId);
      const relatedTable = allRelatedTables?.length > 0 ? allRelatedTables[0] as __esri.FeatureLayer : null;
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
      } else {
        this._relatedFeaturesOIDs = [];
        this._commentsAvailable = false;
      }
    } else {
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
  protected isLikeDislikeConfigured(selectedLayer: __esri.FeatureLayer): boolean {
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
      selectedLayer.fields.forEach((eachField: __esri.Field) => {
        if (this._validFieldTypes.indexOf(eachField.type) > -1 && this.layerItemsHash[selectedLayer.id].supportsUpdate) {
          if (eachField.name === likeField && this.reportingOptions[selectedLayer.id].like) {
            likeFieldAvailable = true;
          } else if (eachField.name === dislikeField && this.reportingOptions[selectedLayer.id].dislike) {
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
  protected checkLikeDislikeFields(): void {
    this._likeFieldAvailable = false;
    this._dislikeFieldAvailable = false;
    this._isLikeBtnClicked = false;
    this._isDislikeBtnClicked = false;
    this._likeCount = 0;
    this._disLikeCount = 0
    const selectedLayer = this._selectedGraphic.layer as __esri.FeatureLayer;
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
      selectedLayer.fields.forEach((eachField: __esri.Field) => {
        if (this._validFieldTypes.indexOf(eachField.type) > -1 && this.layerItemsHash[selectedLayer.id].supportsUpdate) {
          if (eachField.name === this._likeField && this.reportingOptions[selectedLayer.id].like) {
            this._likeFieldAvailable = true;
            this._likeCount = this._selectedGraphic.attributes[eachField.name];
          } else if (eachField.name === this._dislikeField && this.reportingOptions[selectedLayer.id].dislike) {
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
  protected onLikeButtonClick(): void {
    if (this._isDislikeBtnClicked && this.reportingOptions[this._selectedGraphic.layer.id].dislike) {
      this.onDislikeButtonClick();
    }
    this._isLikeBtnClicked = !this._isLikeBtnClicked;
    if (this._isLikeBtnClicked) {
      this._likeCount++;
    } else {
      this._likeCount--;
    }
    void this.updateFeaturesLikeDislikeField(this._likeField, this._isLikeBtnClicked);
  }

  /**
   * On dislike button click highlight the dislike button and update the feature
   * @protected
   */
  protected onDislikeButtonClick(): void {
    if (this._isLikeBtnClicked && this.reportingOptions[this._selectedGraphic.layer.id].like) {
      this.onLikeButtonClick();
    }
    this._isDislikeBtnClicked = !this._isDislikeBtnClicked;
    if (this._isDislikeBtnClicked) {
      this._disLikeCount++;
    } else {
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
  protected async updateFeaturesLikeDislikeField(
    fieldName: string,
    buttonClicked: boolean
  ): Promise<void> {
    const attributesToUpdate = {};
    const selectedLayer = this._selectedGraphic.layer as __esri.FeatureLayer;
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
  protected getFromLocalStorage(): void {
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
  protected setInLocalStorage(): void {
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
}
