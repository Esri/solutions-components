import { Component, h, Element, Prop, State, Method, Event, EventEmitter, Watch} from '@stencil/core';
import { loadModules } from "../../utils/loadModules";
import { IReportingOptions } from '../../components';

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
   * boolean: When true button will get brand color
   */
  @State() _isLikeBtnClicked = false;

  /**
   * boolean: When true button will get brand color
   */
  @State() _isDislikeBtnClicked = false;

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
   * string[]: Valid field types for like and dislike 
   */
  protected _validFieldTypes = ["small-integer", "integer", "big-integer", "single", "long"];

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
  }

  //--------------------------------------------------------------------------
  //
  //  Methods (public)

  /**
   * Refresh the features comments which will fetch like, dislike and update the component
   * @returns Promise that resolves when the operation is complete
   */
  @Method()
  async refresh(graphic?: __esri.Graphic): Promise<void> {
    if (this.isLikeDislikeConfigured(graphic.layer as __esri.FeatureLayer)) {
      // in case of multiple features selected fetch complete feature and update like dislike for current feature 
      if (graphic && this.graphics.length > 1) {
        await this.getCompleteGraphic(graphic);
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
   * StencilJS: Called once just after the component is first connected to the DOM.
   *
   * @returns Promise when complete
   */
  async componentWillLoad(): Promise<void> {
    await this._initModules();
    await this.getCompleteGraphic(this.graphics[0]);
    this.checkLikeDislikeFields();
  }

  render() {
    return (
      <calcite-panel full-height>
        <info-card
          allowEditing={false}
          graphics={this.graphics}
          highlightEnabled={false}
          isLoading={false}
          isMobile={false}
          mapView={this.mapView}
          paginationEnabled={false}
          position="relative"
          ref={el => this._infoCard = el}
          zoomAndScrollToSelected={true}
        />
        {(this._likeFieldAvailable || this._dislikeFieldAvailable) &&
          <div class={'buttons'}>
            {this._likeFieldAvailable &&
              <calcite-button
                appearance={"transparent"}
                iconEnd="thumbs-up"
                kind={this._isLikeBtnClicked ? "brand" : "neutral"}
                onClick={this.onLikeButtonClick.bind(this)}
                scale='s'
              >{this._likeCount ?? this._selectedGraphic.attributes[this._likeField] ?? 0}</calcite-button>
            }
            {this._dislikeFieldAvailable &&
              <calcite-button
                appearance={"transparent"}
                iconEnd="thumbs-down"
                kind={this._isDislikeBtnClicked ? "brand" : "neutral"}
                onClick={this.onDislikeButtonClick.bind(this)}
                scale='s'
              >{this._disLikeCount ?? this._selectedGraphic.attributes[this._dislikeField] ?? 0}</calcite-button>
            }
          </div>}
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
    const [Graphic] = await loadModules([
      "esri/Graphic"
    ]);
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
      ;
      selectedLayer.fields.forEach((eachField: __esri.Field) => {
        if (this._validFieldTypes.indexOf(eachField.type) > -1) {
          if (eachField.name === likeField && this.reportingOptions[selectedLayer.id].like) {
            likeFieldAvailable = true;
          } else if (eachField.name === dislikeField && this.reportingOptions[selectedLayer.id].dislike) {
            dislikeFieldAvailable = true;
          }
        }
      })
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
        return
      }
      //Check if selected layer have the configured like and dislike fields
      //also, get the current value for like and dislike field from the attributes
      selectedLayer.fields.forEach((eachField: __esri.Field) => {
        if (this._validFieldTypes.indexOf(eachField.type) > -1) {
          if (eachField.name === this._likeField && this.reportingOptions[this._selectedGraphic.layer.id].like) {
            this._likeFieldAvailable = true;
            this._likeCount = this._selectedGraphic.attributes[eachField.name];
          } else if (eachField.name === this._dislikeField && this.reportingOptions[this._selectedGraphic.layer.id].dislike) {
            this._dislikeFieldAvailable = true;
            this._disLikeCount = this._selectedGraphic.attributes[eachField.name];
          }
        }
      })
      this.getFromLocalStorage()
    }
    
  }

  /**
   * On like button click highlight the like button and update the feature
   * @protected
   */
  protected onLikeButtonClick(): void {
    this.loadingStatus.emit(true);
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
    this.loadingStatus.emit(true);
    if (this._isLikeBtnClicked && this.reportingOptions[this._selectedGraphic.layer.id].like) {
      this.onLikeButtonClick()
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
  protected async updateFeaturesLikeDislikeField(fieldName: string, buttonClicked: boolean): Promise<void> {
    const attributesToUpdate = {};
    const selectedLayer = this._selectedGraphic.layer as __esri.FeatureLayer
    //Increment the value if button is clicked or else decrement it
    const selectFeatureAttr = this._selectedGraphic;
    if (buttonClicked) {
      selectFeatureAttr.attributes[fieldName] = Number(selectFeatureAttr.attributes[fieldName]) + 1
    } else {
      selectFeatureAttr.attributes[fieldName] = Number(selectFeatureAttr.attributes[fieldName]) - 1
    }
    //use the oid and like/dislike field value to update 
    attributesToUpdate[selectedLayer.objectIdField] = selectFeatureAttr.attributes[selectedLayer.objectIdField];
    attributesToUpdate[fieldName] = selectFeatureAttr.attributes[fieldName];
    const newGraphicInstance = new this.Graphic();
    newGraphicInstance.attributes = attributesToUpdate;
    // Update the feature attribute in the feature layer
    const param = { updateFeatures: [newGraphicInstance] };
    await selectedLayer.applyEdits(param).then(() => {
      this._selectedGraphic = selectFeatureAttr;
      //update the current graphics in info card so that, the updated values are reflected in popup content
      if (this._infoCard) {
        void this._infoCard.updateCurrentGraphic(this._selectedGraphic);
      }
      //store the like dislike value for the current selected graphic in local storage
      this.setInLocalStorage();
      this.loadingStatus.emit(false);
    }, (err) => {
      this.loadingStatus.emit(false);
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
    const localStorageUser = localStorage[uniqueLayerId]
    if (localStorageUser) {
      const parseArr = JSON.parse(localStorageUser)
      const res = parseArr.filter((arr) => arr.id === this._selectedGraphic.getObjectId())
      if (res.length > 0) {
        this._isLikeBtnClicked = res[0].like
        this._isDislikeBtnClicked = res[0].dislike
      }
    }
  }

  /**
   * Sets the like/dislike information for the current selected graphic in local storage
   * @protected
   */
  protected setInLocalStorage(): void {
    const uniqueLayerId = this._selectedGraphic.layer.id;
    const localStorageInfo = localStorage[uniqueLayerId]
    let information = [];
    //if information for the current layer found in local storage update it
    //else add new information for the current layer in the local storage
    if (localStorageInfo) {
      information = JSON.parse(localStorageInfo);
      const index = information.findIndex((arr) => arr.id === this._selectedGraphic.getObjectId())
      //if information for current objectid found delete it, so that we always have info for each oid in a layer only once
      if (index >= 0) {
        information.splice(index, 1)
      }
    } 
    //add the information for current selected graphic
    information.push({
      id: this._selectedGraphic.getObjectId(),
      like: this._isLikeBtnClicked && this._likeCount !== 0,
      dislike: this._isDislikeBtnClicked && this._disLikeCount !== 0
    })
    localStorage.setItem(uniqueLayerId, JSON.stringify(information));
  }
}