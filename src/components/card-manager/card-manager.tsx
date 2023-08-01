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
import { getMapLayerView } from "../../utils/mapViewUtils";
import { EEditMode } from "../../utils/interfaces";

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
   * esri/views/layers/FeatureLayerView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html
   */
  @Prop() layerView: __esri.FeatureLayerView;

  /**
   * esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  @Prop() mapView: __esri.MapView;

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

  @State() _showAddRecord = false;

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
    this._cardLoading = true;
    // only query if we have some ids...query with no ids will result in all features being returned
    const featureSet = ids.length > 0 ? await queryFeaturesByID(ids, this.layerView.layer, [], false, this.mapView.spatialReference) : [];
    this._graphics = featureSet;
    this._cardLoading = false;
  }

  /**
   * Get the layer view for the provided layer id
   */
  @Listen("layerSelectionChange", { target: "window" })
  async layerSelectionChange(
    evt: CustomEvent
  ): Promise<void> {
    const id: string = evt.detail[0];
    this.layerView = await getMapLayerView(this.mapView, id);
  }

  @Listen("closeEdit", { target: "window" })
  async closeEdit(): Promise<void> {
    this._showAddRecord = false;
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
  }

  /**
   * Renders the component.
   */
  render() {
    console.log("this._showAddRecord")
    console.log(this._showAddRecord)
    const featuresClass = this._graphics?.length > 0 ? "" : "display-none";
    const messageClass = this._graphics?.length > 0 || this._showAddRecord ? "display-none" : "";
    const editClass = this._showAddRecord ? "" : "display-none";
    return (
      <Host>
        <div class="border-rounded overflow-auto">
          <calcite-shell class={"position-relative padding-1 " + featuresClass}>
            <info-card
              graphics={this._graphics}
              isLoading={this._cardLoading}
              mapView={this.mapView}
            />
          </calcite-shell>
          <div class={"padding-1 " + messageClass}>
            <calcite-notice icon={false} open>
              <div class="display-flex" slot="message">
                <calcite-icon class="align-center padding-inline-end-1" icon="check-square-f" scale="m" />
                <div class="align-center padding-inline-end-1">
                  {this._translations.selectFeaturesToStart}
                </div>
                <div>
                  <calcite-fab
                    appearance="outline-fill"
                    icon="plus"
                    onClick={() => this._addNewRecord()}
                  />
                </div>
              </div>
            </calcite-notice>
          </div>
          <calcite-shell class={"position-relative padding-1 " + editClass}>
            <div class="position-absolute">
              {/* <div class={"display-flex"}>
                <calcite-action
                  appearance="solid"
                  aria-label="Back"
                  class="back-button hydrated"
                  icon="chevron-left" // needs to handle rtl
                  onClick={() => this._backClicked()}
                  scale="s"
                  text=""
                /> */}
                <edit-card
                  editMode={EEditMode.ADD}
                  graphics={[]}
                  mapView={this.mapView}
                  open={true}
                />
              {/* </div> */}

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
   * Show the editor to add a new record
   *
   * @protected
   */
  protected _addNewRecord(): void {
    this._showAddRecord = true;
  }

  /**
   * Hide the editor
   *
   * @protected
   */
  // protected _backClicked(): void {
  //   this._showAddRecord = false;
  // }

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
