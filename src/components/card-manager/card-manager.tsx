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

import { Component, Element, Host, h, Listen, Prop, State, Event, EventEmitter } from "@stencil/core";
import CardManager_T9n from "../../assets/t9n/card-manager/resources.json";
import { getLocaleComponentStrings } from "../../utils/locale";
import { queryFeaturesByID } from "../../utils/queryUtils";
import { getLayerOrTable } from "../../utils/mapViewUtils";

@Component({
  tag: "card-manager",
  styleUrl: "card-manager.css",
  shadow: false,
})
export class CardManager {
  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLCardManagerElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * string: custom notice text to display
   */
  @Prop() customInfoText: string;

  /**
   * When true the geometry of the current feature will be editable
   */
  @Prop() enableEditGeometry = false;

  /**
   * When true the component will render an optimized view for mobile devices
   */
  @Prop() isMobile: boolean;

  /**
   * esri/views/layers/FeatureLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html
   */
  @Prop({ mutable: true }) layer: __esri.FeatureLayer;

  /**
   * esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  @Prop() mapView: __esri.MapView;

  /**
   * boolean: When true the selected feature will zoomed to in the map and the row will be scrolled to within the table
   */
  @Prop() zoomAndScrollToSelected: boolean;

  /**
   * A list of ids that are currently selected
   */
  @Prop() selectedFeaturesIds: number[];

  /**
   * boolean: when true the users can have the option to create features
   */
  @Prop() enableCreateFeatures = true;

  //--------------------------------------------------------------------------
  //
  //  State (internal)
  //
  //--------------------------------------------------------------------------

  /**
   * When true a loading indicator will be shown in the current card
   */
  @State() _cardLoading = false;

  /**
   * The current selected graphics
   */
  @State() _graphics: __esri.Graphic[];

  /**
   * When true feature component is shown
   */
  @State() _showCreateFeatureComponent = false;

  /**
   * boolean: When true show the create button
   */
  @State() _showSubmitBtn = false;

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() _translations: typeof CardManager_T9n;

  /**
   * boolean: Flag to maintain if recently any feature has been created
   */
  protected _isFeatureCreated: boolean = false;

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * HTMLCreateFeatureElement: Create Feature component instance
   */
  protected _createFeature: HTMLCreateFeatureElement;

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
  @Event() createWorkFlowStarted: EventEmitter<void>;

  /**
   * Emits when back from create work flow
   */
  @Event() backFromCreateWorkFlow: EventEmitter<void>;

  /**
   * Emits when feature/record is submitted
   */
  @Event() featureOrRecordSubmitted: EventEmitter<void>;

  /**
   * Query the layer for the provided ids and store the result graphics
   */
  @Listen("featureSelectionChange", { target: "window" })
  async featureSelectionChange(
    evt: CustomEvent
  ): Promise<void> {
    if (this._showCreateFeatureComponent && !this._isFeatureCreated) {
      void this._backFromCreateFeature();
    }
    const ids = evt.detail;
    this._graphics = await this._getFeaturesByIds(ids);
  }

  /**
   * Get the layer view for the provided layer id
   */
  @Listen("layerSelectionChange", { target: "window" })
  async layerSelectionChange(
    evt: CustomEvent
  ): Promise<void> {
    if (this._showCreateFeatureComponent) {
      void this._backFromCreateFeature();
    }
    const id: string = evt.detail[0];
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
  async componentWillLoad(): Promise<void> {
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
    const showCreateFeatureOrRecordBtn = this.enableCreateFeatures && this.layer?.capabilities?.operations?.supportsAdd;
    return (
      <Host>
        <div class="overflow-auto height-full">
          <calcite-shell class={"position-relative " + featuresClass}>
            <div class="position-static z-index-500">
              <info-card
                enableEditGeometry={this.enableEditGeometry}
                graphics={this._graphics}
                isLoading={this._cardLoading}
                isMobile={this.isMobile}
                mapView={this.mapView}
              />
            </div>
          </calcite-shell >
          <calcite-shell class={"position-relative " + messageClass}>
            <calcite-flow-item>
              <calcite-panel>
                <div class={"padding-1"}>
                  <calcite-notice icon="table" open>
                    <div slot="message">{this.customInfoText || this._translations.selectFeaturesToStart}</div>
                  </calcite-notice>
                </div>
                {showCreateFeatureOrRecordBtn && <calcite-button
                  disabled={!this.layer}
                  onClick={() => this._createFeatureBtnClicked()}
                  slot="footer"
                  width="full">
                  {isTable ? this._translations.createRecord : this._translations.createFeature}
                </calcite-button>}
              </calcite-panel>
            </calcite-flow-item>
          </calcite-shell>

          <calcite-shell class={"position-relative " + createFeatureClass}>
            <calcite-flow-item>
              <calcite-panel
                heading={heading}>
                <calcite-action
                  class="back-button hydrated"
                  icon="chevron-left"
                  onClick={this._backFromCreateFeature.bind(this)}
                  scale="s"
                  slot="header-actions-start"
                  text="back" />
                {this.getEditorComponent()}
                {this._showSubmitBtn && <calcite-button
                  appearance="solid"
                  class={"footer-top-button footer-button"}
                  onClick={() => void this._createFeature.submit()}
                  slot="footer"
                  width="full">
                  {this._translations.create}
                </calcite-button>}
              </calcite-panel>
            </calcite-flow-item>
          </calcite-shell>
        </div>
      </Host>
    );
  }

  /**
 * Returns the editor component for adding feature
 * @returns Node
 */
  protected getEditorComponent(): Node {
    return (
      <div>
        {this._showCreateFeatureComponent && <create-feature
          customizeSubmit
          mapView={this.mapView}
          onDrawComplete={() => { this._showSubmitBtn = true }}
          onEditingAttachment={(evt) => { this._showSubmitBtn = !evt.detail }}
          onProgressStatus={() => {
            setTimeout(() => {
              this._isFeatureCreated = false;
            }, 2000)
          }}
          onSuccess={this._featureCreated.bind(this)}
          ref={el => this._createFeature = el}
          selectedLayerId={this.layer?.id}
        />}
      </div>
    )
  }

  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * Gets the Feature using its ids
   *
   * @returns Promise when complete
   * @protected
   */
  protected async _getFeaturesByIds(ids: number[]): Promise<__esri.Graphic[]> {
    // only query if we have some ids...query with no ids will result in all features being returned
    const featureSet = ids.length > 0 ? await queryFeaturesByID(ids, this.layer, [], true, this.mapView.spatialReference) : [];
    // https://github.com/Esri/solutions-components/issues/365
    return featureSet.sort((a, b) => ids.indexOf(a.getObjectId()) - ids.indexOf(b.getObjectId()));
  }

  /**
   * Displays the feature creation functionality and changes the layout
   * @protected
   */
  protected _createFeatureBtnClicked(): void {
    this._showCreateFeatureComponent = true;
    this.createWorkFlowStarted.emit();
  }

  /**
   * Closes the Create feature component
   * @protected
   */
  protected async _backFromCreateFeature(): Promise<void> {
    if (this._createFeature) {
      await this._createFeature.close();
      this._showCreateFeatureComponent = false;
      this.backFromCreateWorkFlow.emit();
    }
    this._showSubmitBtn = false;
  }

  /**
   * On Submitting the form show the creator feature again
   * @protected
   */
  protected _featureCreated(): void {
    void this._createFeature.close();
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
  protected async _getTranslations(): Promise<void> {
    const messages = await getLocaleComponentStrings(this.el);
    this._translations = messages[0] as typeof CardManager_T9n;
  }
}
