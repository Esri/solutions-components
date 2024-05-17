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

import { Component, Element, Prop, VNode, h, State, Event, Watch, EventEmitter, Method } from "@stencil/core";
import { loadModules } from "../../utils/loadModules";
import { PopupUtils } from "../../utils/popupUtils";
import { IPopupUtils, ISortingInfo } from "../../utils/interfaces";
import { getFeatureLayerView, getLayerOrTable, highlightFeatures } from "../../utils/mapViewUtils";
import FeatureList_T9n from "../../assets/t9n/feature-list/resources.json";
import { getLocaleComponentStrings } from "../../utils/locale";

@Component({
  tag: "feature-list",
  styleUrl: "feature-list.css",
  shadow: false,
})
export class FeatureList {
  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLFeatureListElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * string: Layer id of the feature layer to show the list
   */
  @Prop() selectedLayerId: string;

  /**
   * esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  @Prop() mapView: __esri.MapView;

  /**
   * string: Message to be displayed when features are not found
   */
  @Prop() noFeaturesFoundMsg?: string;

  /**
   * number: Number features to be fetched per page, by default 100 features will be fetched
   */
  @Prop() pageSize?: number = 100;

  /**
   * boolean: Highlight feature on map optional (default false) boolean to indicate if we should highlight and zoom to the extent of the feature geometry
   */
  @Prop() highlightOnMap?: boolean = false;

  /**
   * boolean: Highlight feature on map optional (default false) boolean to indicate if we should highlight when hover on Feature in list
   */
  @Prop() highlightOnHover?: boolean = false;

  /**
   * ISortingInfo: Sorting field and order using which features list will be sorted
   */
  @Prop() sortingInfo?: ISortingInfo;

  /**
   * string: where clause to filter the features list
   */
  @Prop() whereClause?: string;

  /**
   * string(small/large): Controls the font size of the title
   */
  @Prop() textSize?: "small" | "large" = "large";

  /**
   * boolean: Show initial loading indicator when creating list
   */
  @Prop() showInitialLoading?: boolean = true;
  
  //--------------------------------------------------------------------------
  //
  //  State (internal)
  //
  //--------------------------------------------------------------------------

  /**
   * calcite-list-item list of features with popup titles
   */
  @State() _featureItems = [];

  /**
   * number: Total number of feature count
   */
  @State() _featuresCount = 0;

  /**
   * boolean: Check if selected layer's features fetching process is completed
   */
  @State() _isLoading = false;

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() _translations: typeof FeatureList_T9n;

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * "esri/Color": https://developers.arcgis.com/javascript/latest/api-reference/esri-Color.html
   * The Color instance
   */
  protected Color: typeof import("esri/Color");

  /**
   * IPopupUtils: To fetch the list label using popup titles
   */
  protected _popupUtils: IPopupUtils;

  /**
   * __esri.FeatureLayer: Selected feature layer from the layer list
   */
  protected _selectedLayer: __esri.FeatureLayer;

  /**
   * __esri.Handle: Highlight handle of the selections
   */
  protected _highlightHandle: __esri.Handle;

  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------

  /**
   * Watch for selectedLayerId change and update layer instance and features list for new layerId
   */
  @Watch("selectedLayerId")
  async selectedLayerWatchHandler(): Promise<void> {
    this._selectedLayer = await getLayerOrTable(this.mapView, this.selectedLayerId);
    await this.initializeFeatureItems();
  }

  /**
   * Watch for sorting field or order change and update the features list
   */
  @Watch("sortingInfo")
  async sortingInfoWatchHandler(): Promise<void> {
    await this.initializeFeatureItems();
  }
  
  /**
   * Watch for whereclause change and update the features list
   */
  @Watch("whereClause")
  async whereClauseHandler(): Promise<void> {
    await this.initializeFeatureItems();
  }

  //--------------------------------------------------------------------------
  //
  //  Methods (public)

  /**
   * Refresh the feature list which will fetch the latest features and update the features list
   * @returns Promise that resolves when the operation is complete
   */
  @Method()
  async refresh(): Promise<void> {
    await this.initializeFeatureItems();
  }

  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Events (public)
  //
  //--------------------------------------------------------------------------

  /**
   * Emitted on demand when feature is selected using the list
   */
  @Event() featureSelect: EventEmitter<__esri.Graphic>;

  //--------------------------------------------------------------------------
  //
  //  Functions (lifecycle)
  //
  //--------------------------------------------------------------------------

  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   * @returns Promise when complete
   */
  async componentWillLoad(): Promise<void> {
    await this.initModules();
    await this._getTranslations();
    this._isLoading = this.showInitialLoading;
    this._popupUtils = new PopupUtils();
    if (this.mapView && this.selectedLayerId) {
      this._selectedLayer = await getLayerOrTable(this.mapView, this.selectedLayerId);
    }
  }

  /**
   * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
   */
  async componentDidLoad() {
    await this.initializeFeatureItems();
  }

  /**
   * Renders the component.
   */
  render() {
    return (
      <calcite-panel
        full-height
        full-width>
        {this._isLoading && <calcite-loader label="" scale="m" />}
        {this._featureItems.length === 0 && !this._isLoading &&
          <calcite-notice
            class="error-msg"
            icon="feature-details"
            kind="info"
            open>
            <div slot="message">
              {this.noFeaturesFoundMsg ? this.noFeaturesFoundMsg : this._translations.featureErrorMsg}
            </div>
          </calcite-notice>}
        <calcite-list
          selection-appearance="border"
          selection-mode="none" >
          {!this._isLoading && this._featureItems.length > 0 && this._featureItems}
        </calcite-list>
        {this._featuresCount > this.pageSize &&
          <div
            class="width-full"
            slot="footer">
            <calcite-pagination
              class="pagination"
              full-width
              onCalcitePaginationChange={this.pageChanged.bind(this)}
              page-size={this.pageSize} start-item="1" total-items={this._featuresCount} />
          </div>
        }
      </calcite-panel>);
  }

  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------

    /**
   * Load esri javascript api modules
   * @returns Promise resolving when function is done
   * @protected
   */
    protected async initModules(): Promise<void> {
      const [Color] = await loadModules([
        "esri/Color"
      ]);
      this.Color = Color;
    }

  /**
   * Return the where condition string considering the defined where clause and layer's definition expression 
   * @protected
   */
  protected getWhereCondition(): string {
    //By Default load all the features
    let whereClause = '1=1';
    //if where clause is defined use it
    if (this.whereClause) {
      whereClause = this.whereClause;
    }
    //if layer has definitionExpression append it to the where clause
    if (this._selectedLayer?.definitionExpression) {
      whereClause = whereClause + ' AND ' + this._selectedLayer.definitionExpression;
    }
    return whereClause;
  }

  /**
   * Initialize the features list using the selected layer
   * @protected
   */
  protected async initializeFeatureItems(): Promise<void> {
    if (this._selectedLayer) {
      this._isLoading = this.showInitialLoading;
      this._featureItems = await this.queryPage(0);
      const query: any = {
        where: this.getWhereCondition()
      };
      this._featuresCount = await this._selectedLayer.queryFeatureCount(query);
      this._isLoading = false;
    }
  }

  /**
   * On page change get the next updated feature list
   * @param event page change event
   * @protected
   */
  protected async pageChanged(event: any): Promise<void> {
    this._isLoading = true;
    if (this._highlightHandle) {
      this._highlightHandle.remove();
      this._highlightHandle = null;
    }
    const page = event.target.startItem - 1;
    this._featureItems = await this.queryPage(page);
    this._isLoading = false;
  }

 /**
  * On feature click in feature list highlight the feature on the map
  * @param event feature clicked event
  * @param selectedFeature selected feature graphic
  * @protected
  */
  protected async featureClicked(event: any, selectedFeature: __esri.Graphic): Promise<void> {
    //clear previous highlight and remove the highlightHandle
    this.clearHighlights();
    //highlight on map only if it is selected item
    if (this.highlightOnMap) {
      const selectedFeatureObjectId = Number(event.target.value);
      const selectedLayerView = await getFeatureLayerView(this.mapView, this.selectedLayerId);
      this._highlightHandle = await highlightFeatures([selectedFeatureObjectId], selectedLayerView, this.mapView, true);
    }
    await this.emitSelectedFeature(selectedFeature);
  }

  /**
   * Emit selected feature with its complete graphics and attributes
   * @param graphic selected feature graphic
   * @protected
   */
    protected async emitSelectedFeature(graphic: __esri.Graphic): Promise<void> {
      const layer = graphic.layer as __esri.FeatureLayer;
      const query = layer.createQuery();
      query.returnGeometry = true;
      query.objectIds = [graphic.getObjectId()];
      const completeGraphic = await layer.queryFeatures(query);
      this.featureSelect.emit(completeGraphic.features[0]);
    }

  /**
   * On feature hover in feature list highlight the feature on the map
   * @param selectedFeature mouse hovered feature graphic
   * @protected
   */
  protected async onFeatureHover(selectedFeature: __esri.Graphic): Promise<void> {
    //clear previous highlight and remove the highlightHandle
    this.clearHighlights();
    if (this.highlightOnHover) {
      const oId = selectedFeature.getObjectId();
      const selectedLayerView = await getFeatureLayerView(this.mapView, this.selectedLayerId);
      selectedLayerView.highlightOptions = {color: new this.Color("#FFFF00")};
      this._highlightHandle = selectedLayerView.highlight([oId]);
    }
  }

  /**
   * Clears the highlight
   * @protected
   */
    protected clearHighlights():void {
      //if a feature is already highlighted, then remove the highlight
      if(this._highlightHandle) {
        this._highlightHandle.remove();
       }
    }

  /**
   * Query the selected feature layer, in descending order of object id's
   * @param page 0th page number in the pagination item
   * @returns List of features items to be rendered
   * @protected
   */
  protected async queryPage(page: number): Promise<VNode[]> {
    const featureLayer = this._selectedLayer;
    const sortField: string = this.sortingInfo?.field ? this.sortingInfo.field : featureLayer.objectIdField;
    const sortOrder: 'asc' | 'desc' = this.sortingInfo?.order ? this.sortingInfo.order : 'desc';
    const query: any = {
      start: page,
      num: this.pageSize,
      outFields: ["*"],
      returnGeometry: true,
      where: this.getWhereCondition(),
      outSpatialReference: this.mapView.spatialReference.toJSON()
    };
    //sort only when sort field and order is valid
    if (sortField && sortOrder) {
      query.orderByFields = [sortField.toString() + " " + sortOrder];
    }
    const featureSet =  await featureLayer.queryFeatures(query);
    return await this.createFeatureItem(featureSet);
  }

  /**
   * Creates list of items using the popup titles
   * @param featureSet Queried FeatureSet
   * @returns List of features items to be rendered
   * @protected
   */
  protected async createFeatureItem(featureSet: any): Promise<VNode[]> {
    const currentFeatures = featureSet?.features;
    const items = currentFeatures.map(async (feature) => {
      const popupTitle = await this._popupUtils.getPopupTitle(feature, this.mapView.map);
      return this.getFeatureItem(feature, popupTitle);
    });
    return Promise.all(items);
  }

  /**
   * Get each feature item
   * @param selectedFeature Each individual feature instance to be listed
   * @param popupTitle feature popup title
   * @returns individual feature item to be rendered
   * @protected
   */
  protected getFeatureItem(selectedFeature: __esri.Graphic, popupTitle: string): VNode {
    //get the object id value of the feature
    const oId = selectedFeature.attributes[this._selectedLayer.objectIdField].toString();
    //use object id if popupTitle is null or undefined
    popupTitle = popupTitle ?? oId;
    const popupTitleClass = this.textSize === 'small' ? 'feature-list-popup-title-small' : 'feature-list-popup-title'
    return (
      <calcite-list-item
        onCalciteListItemSelect={(e) => { void this.featureClicked(e, selectedFeature) }}
        onMouseLeave={() => { void this.clearHighlights() }}
        onMouseOver={() => { void this.onFeatureHover(selectedFeature) }}
        value={oId}>
        {/* --TODO ellipsis-- */}
        <div
          class={popupTitleClass}
          slot="content-start">
          {popupTitle}
        </div>
        <calcite-icon
          icon="chevron-right"
          scale="s"
          slot="content-end" />
      </calcite-list-item>);
  }

  /**
   * Fetches the component's translations
   * @returns Promise when complete
   * @protected
   */
  protected async _getTranslations(): Promise<void> {
    const messages = await getLocaleComponentStrings(this.el);
    this._translations = messages[0] as typeof FeatureList_T9n;
  }
}
