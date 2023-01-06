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

import { Component, Element, Host, h, Prop, State, Watch } from '@stencil/core';
import MediaCard_T9n from "../../assets/t9n/media-card/resources.json";
import { getLocaleComponentStrings } from "../../utils/locale";
import { IMediaCardValues } from '../../utils/interfaces';

@Component({
  tag: 'media-card',
  styleUrl: 'media-card.css',
  shadow: true,
})
export class MediaCard {
  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLMediaCardElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * IMediaCardValues[]: Array of objects that contain the name, description, and image to display
   */
  @Prop() values: IMediaCardValues[] = [];

  //--------------------------------------------------------------------------
  //
  //  State (internal)
  //
  //--------------------------------------------------------------------------

  /**
   * The index controls what image from values to display
   */
  @State() _index = -1;

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() _translations: typeof MediaCard_T9n;

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------

  /**
   * Called each time the values prop is changed.
   * Reset the _index value accordingly.
   */
  @Watch("values")
  geometriesWatchHandler(values: any, oldValues: any): void {
    if (values && JSON.stringify(values) !== JSON.stringify(oldValues || [])) {
      if (values?.length > 0) {
        this._initIndex();
      } else {
        this._index = -1;
      }
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
   * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
   * Using this as the Watch on values does not fire on initial load.
   *
   * @returns Promise when complete
   */
  async componentDidLoad(): Promise<void> {
    if (this._index === -1 && this.values?.length > 0) {
      this._initIndex();
    }
  }

  /**
   * Renders the component.
   */
  render() {
    const v = this.values?.length > 0 ? this.values[this._index] : undefined;
    const total = (this.values || []).length;
    const imgNum = this._index + 1;
    return (
      <Host>
        <div>
          <div class="display-flex">
            <img class="img-container" src={v?.url} />
          </div>
          <calcite-label scale='s'>
            <span class="font-italic padding-bottom-1">
              {v?.name}
            </span>
          </calcite-label>
          <calcite-label>
            <span class="padding-bottom-1">
              {v?.description}
            </span>
          </calcite-label>
        </div>

        <div class="button-container">
          <div class="count-container">
            <calcite-label>
              <span>
                {`${imgNum} of ${total}`}
              </span>
            </calcite-label>
          </div>
          <div class="display-flex">
            <calcite-button
              appearance="outline"
              class="padding-start-1 button-width"
              color="neutral"
              disabled={imgNum === 1 || (this.values || []).length === 0}
              onClick={() => this._decrementIndex()}
            >{this._translations.previous}
            </calcite-button>
            <calcite-button
              class="padding-start-1 button-width"
              disabled={(this.values || []).length === imgNum}
              onClick={() => this._incrementIndex()}
            >{this._translations.next}
            </calcite-button>
          </div>
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
   * Resets the index to 0
   *
   * @protected
   */
  protected _initIndex(): void {
    this._index = 0;
  }

  /**
   * Adds 1 to the current index
   *
   * @protected
   */
  protected _incrementIndex(): void {
    this._index += 1;
  }

  /**
   * Subtracts 1 from the current index
   *
   * @protected
   */
  protected _decrementIndex(): void {
    this._index -= 1;
  }

  /**
   * Fetches the component's translations
   *
   * @returns Promise when complete
   * @protected
   */
  protected async _getTranslations(): Promise<void> {
    const messages = await getLocaleComponentStrings(this.el);
    this._translations = messages[0] as typeof MediaCard_T9n;
  }

}
