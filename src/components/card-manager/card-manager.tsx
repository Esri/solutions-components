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

import { Component, Element, Host, h, Listen, Prop, State } from '@stencil/core';
import CardManager_T9n from "../../assets/t9n/card-manager/resources.json";
import { getLocaleComponentStrings } from "../../utils/locale";
import { ECardType, IMediaCardValues } from "../../utils/interfaces";
import { queryFeaturesByID } from "../../utils/queryUtils";
import { getMapLayerView } from "../../utils/mapViewUtils";

@Component({
  tag: 'card-manager',
  styleUrl: 'card-manager.css',
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
   * any: Still need to understand what this one will look like
   */
  @Prop() commentsCardValues: any;

  /**
   * esri/views/layers/FeatureLayerView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html
   */
  @Prop() layerView: __esri.FeatureLayerView;

  /**
   * esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  @Prop() mapView: __esri.MapView;

  /**
   * IMediaCardValues[]: Array of objects that contain the name, description, and image to display
   */
  @Prop() mediaCardValues: IMediaCardValues[] = [];

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * When true the add record modal will be displayed
   */
  @State() _addRecordOpen = false;

  /**
   * When true a loading indicator will be shown in the current card
   */
  @State() _cardLoading = false;

  /**
   * Controls what card type to display
   */
  @State() _currentCardType = ECardType.INFO;

  /**
   * The current selected graphics
   */
  @State() _graphics: __esri.Graphic[];

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() _translations: typeof CardManager_T9n;

  /**
   * Reference element that controls switching between cards
   */
  protected _cardTypeElement: HTMLCalciteSegmentedControlElement;

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
    const featureSet = ids.length > 0 ? await queryFeaturesByID(ids, this.layerView.layer, 0, []) : [];
    this._cardLoading = false;
    this._graphics = featureSet;
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

  /**
   * Sets the state flag that will open the modal
   */
  @Listen("openAddRecord", { target: "window" })
  openAddRecord(): void {
    this._addRecordOpen = true;
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
    const infoChecked= this._currentCardType === ECardType.INFO;
    const mediaChecked = this._currentCardType === ECardType.MEDIA;
    const commentsChecked = this._currentCardType === ECardType.COMMENT;

    const infoCardClass = infoChecked ? "" : "display-none";
    const mediaCardClass = mediaChecked ? "" : "display-none";
    const commentsCardClass = commentsChecked ? "" : "display-none";

    // TODO ask team what I'm supposed to do with multi-select
    const graphic = this._graphics?.length > 0 ? this._graphics[0] : undefined;
    return (
      <Host>
        <div class="border-rounded overflow-auto">
          <calcite-shell class="position-relative padding-1">
            <div class="w-100 display-flex padding-bottom-1" slot="header">
              <calcite-segmented-control
                class="focus-margin"
                onCalciteSegmentedControlChange={() => this._setDisplayCard()}
                ref={(el) => { this._cardTypeElement = el }}
                width='full'
              >
                <calcite-segmented-control-item
                  checked={infoChecked}
                  value={ECardType.INFO}
                >
                  {this._translations.information}
                </calcite-segmented-control-item>
                <calcite-segmented-control-item
                  checked={mediaChecked}
                  value={ECardType.MEDIA}
                >
                  {this._translations.media}
                </calcite-segmented-control-item>
                <calcite-segmented-control-item
                  checked={commentsChecked}
                  value={ECardType.COMMENT}
                >
                  {this._translations.comments}
                </calcite-segmented-control-item>
              </calcite-segmented-control>
            </div>
            <div>
              <info-card
                class={infoCardClass}
                graphic={graphic}
                isLoading={this._cardLoading}
                mapView={this.mapView}
              />
              <media-card
                class={mediaCardClass}
                isLoading={this._cardLoading}
                values={this.mediaCardValues}
              />
              <comment-card
                class={commentsCardClass}
                isLoading={this._cardLoading}
              />
            </div>
          </calcite-shell>
        </div>
        <add-record-modal onModalClosed={() => this._addRecordClosed()} open={this._addRecordOpen}/>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------

  protected _addRecordClosed(): void {
    this._addRecordOpen = false;
  }

  /**
   * Set the current card type to display
   *
   * @protected
   */
  protected _setDisplayCard(): void {
    this._currentCardType = this._cardTypeElement.value as ECardType;
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
