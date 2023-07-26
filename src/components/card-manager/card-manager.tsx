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

import { Component, Element, Host, h, Listen, Prop, State, Watch } from "@stencil/core";
import CardManager_T9n from "../../assets/t9n/card-manager/resources.json";
import { getLocaleComponentStrings } from "../../utils/locale";
import { ECardType, IMediaCardValues } from "../../utils/interfaces";
import { queryAttachments, queryFeaturesByID } from "../../utils/queryUtils";
import { getMapLayerView } from "../../utils/mapViewUtils";

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

  /**
   * The graphic that is currently selected in info-card features widget
   */
  protected _currentGraphic: __esri.Graphic;

  /**
   * The current graphics attachments
   */
  protected _attachments: any;

  /**
   * Check the layers capabilities to see if queryAttachments is supported
   *
   * queryAttachments will return an error if the layer's capabilities.data.supportsAttachment property is false.
   * Attachments for multiple features can be queried if the layer's capabilities.operations.supportsQueryAttachments is true.
   */
  protected _attachmentsSupported: boolean;

  /**
   * Reference to the info card to be used to check for the current graphic
   */
  protected _infoCard: HTMLInfoCardElement;

  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------

  /**
   * watch for changes in the card type
   */
  @Watch("_currentCardType")
  async _currentCardTypeWatchHandler(): Promise<void> {
    if (this._currentCardType === ECardType.MEDIA) {
      // check the info-card for the current feature
      // doing this because the Features widget does not expose an event for next/prev
      this._currentGraphic = await this._infoCard.getSelectedFeature();
      await this._setMediaCardValues([this._currentGraphic.getObjectId()]);
    }
  }

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
   * Query the current graphic for any attachments
   */
  protected async _setMediaCardValues(
    ids: number[]
  ): Promise<void> {
    if (this._attachmentsSupported) {
      this._attachments = await queryAttachments(this.layerView.layer, ids);
      this.mediaCardValues = Object.keys(this._attachments).length > 0 ? ids.reduce((prev, cur) => {
        const attachments = this._attachments[cur];
        attachments.forEach(attachment => {
          prev.push({
            name: attachment.name,
            description: "",
            url: attachment.url
          });
        });
        return prev;
      }, []) : [];
    }
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
    this._attachmentsSupported = this._checkAttachmentSupport();
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
    const featuresClass = this._graphics?.length > 0 ? "" : "display-none";
    const messageClass = this._graphics?.length > 0 ? "display-none" : "";
    const mediaClass = this._attachmentsSupported ? "" : "display-none";

    return (
      <Host>
        <div class="border-rounded overflow-auto">
          <calcite-shell class={"position-relative padding-1 " + featuresClass}>
            <div class="w-100 display-flex padding-bottom-1" slot="header">
              <calcite-segmented-control
                class="focus-margin"
                onCalciteSegmentedControlChange={() => this._setDisplayCard()}
                ref={(el) => { this._cardTypeElement = el }}
                width="full"
              >
                <calcite-segmented-control-item
                  checked={infoChecked}
                  id="information"
                  value={ECardType.INFO}
                >
                  {this._translations.information}
                </calcite-segmented-control-item>
                <calcite-tooltip label="" placement="bottom" reference-element="information">
                  <span>{this._translations.information}</span>
                </calcite-tooltip>
                <calcite-segmented-control-item
                  checked={mediaChecked}
                  class={mediaClass}
                  id="media"
                  value={ECardType.MEDIA}
                >
                  {this._translations.media}
                </calcite-segmented-control-item>
                <calcite-tooltip label="" placement="bottom" reference-element="media">
                  <span>{this._translations.media}</span>
                </calcite-tooltip>
                <calcite-segmented-control-item
                  checked={commentsChecked}
                  id="comments"
                  value={ECardType.COMMENT}
                >
                  {this._translations.comments}
                </calcite-segmented-control-item>
                <calcite-tooltip label="" placement="bottom" reference-element="comments">
                  <span>{this._translations.comments}</span>
                </calcite-tooltip>
              </calcite-segmented-control>
            </div>
            <div>
              <info-card
                class={infoCardClass}
                graphics={this._graphics}
                isLoading={this._cardLoading}
                mapView={this.mapView}
                ref={(el) => { this._infoCard = el }}
              />
              <media-card
                class={`${mediaCardClass} ${mediaClass}` }
                isLoading={this._cardLoading}
                values={this.mediaCardValues}
              />
              <comment-card
                class={commentsCardClass}
                isLoading={this._cardLoading}
              />
            </div>
          </calcite-shell>
          <div class={"padding-1 " + messageClass}>
            <calcite-notice icon="table" open>
              <div slot="message">{this._translations.selectFeaturesToStart}</div>
            </calcite-notice>
          </div>
        </div>
        <add-record-modal onModalClosed={() => this._addRecordClosed()} open={this._addRecordOpen} />
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * Set the add record open flag when the modal is closed
   */
  protected _addRecordClosed(): void {
    this._addRecordOpen = false;
  }

  /**
   * Check the layers capabilities to see if attachments are supported
   */
  protected _checkAttachmentSupport(): boolean {
    const supportsAttachment = this.layerView.layer?.capabilities?.data?.supportsAttachment;
    // Need to talk through this when we meet next week
    //const supportsMultiFeaturesAttachment = this.layerView.layer.capabilities.operations.supportsQueryAttachments;
    return supportsAttachment;
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
