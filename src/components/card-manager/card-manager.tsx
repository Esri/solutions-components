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

import { Component, Element, Host, h, Listen, Prop, State } from "@stencil/core";
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

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
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
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() _translations: typeof CardManager_T9n;

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
   * Query the layer for the provided ids and store the result graphics
   */
  @Listen("featureSelectionChange", { target: "window" })
  async featureSelectionChange(
    evt: CustomEvent
  ): Promise<void> {
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
    if(this.selectedFeaturesIds?.length > 0) {
      this._graphics = await this._getFeaturesByIds(this.selectedFeaturesIds);
    }
  }

  /**
   * Renders the component.
   */
  render() {
    const featuresClass = this._graphics?.length > 0 ? "" : "display-none";
    const messageClass = this._graphics?.length > 0 ? "display-none" : "";

    return (
      <Host>
        <div class="overflow-auto height-full">
          <calcite-shell class={"position-relative " + featuresClass}>
            <div>
              <info-card
                enableEditGeometry={this.enableEditGeometry}
                graphics={this._graphics}
                isLoading={this._cardLoading}
                isMobile={this.isMobile}
                mapView={this.mapView}
              />
            </div>
          </calcite-shell>
          <calcite-shell class={"position-relative " + messageClass}>
            <div class={"padding-1"}>
              <calcite-notice icon="table" open>
                <div slot="message">{this.customInfoText || this._translations.selectFeaturesToStart}</div>
              </calcite-notice>
            </div>
          </calcite-shell>
        </div>
      </Host>
    );
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
    const featureSet = ids.length > 0 ? await queryFeaturesByID(ids, this.layer, [], false, this.mapView.spatialReference) : [];
    // https://github.com/Esri/solutions-components/issues/365
    return featureSet.sort((a, b) => ids.indexOf(a.getObjectId()) - ids.indexOf(b.getObjectId()));
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
