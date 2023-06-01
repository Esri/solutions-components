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

import { Component, Element, Host, h, Prop, State } from '@stencil/core';
import CardManager_T9n from "../../assets/t9n/card-manager/resources.json";
import { getLocaleComponentStrings } from "../../utils/locale";
import { ECardType, IInfoCardValues, IMediaCardValues } from "../../utils/interfaces";

@Component({
  tag: 'card-manager',
  styleUrl: 'card-manager.css',
  shadow: true,
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
   * IInfoCardValues: key value pairs to show in the info card component
   */
  @Prop() infoCardValues: IInfoCardValues = {};

  /**
   * IMediaCardValues[]: Array of objects that contain the name, description, and image to display
   */
  @Prop() mediaCardValues: IMediaCardValues[] = [];

  /**
   * any: Still need to understand what this one will look like
   */
  @Prop() commentsCardValues: any;

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() _translations: typeof CardManager_T9n;

  /**
   * Controls what card type to display
   */
  @State() _currentCardType = ECardType.INFO;

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
    return (
      <Host>
        <calcite-shell class="position-relative">
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
          <div class="display-inline-table">
            <div>
              <info-card
                class={infoCardClass}
                values={this.infoCardValues}
              />
              <media-card
                class={mediaCardClass}
                values={this.mediaCardValues}
              />
              <comment-card
                class={commentsCardClass}
              />
            </div>
          </div>
        </calcite-shell>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------

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
