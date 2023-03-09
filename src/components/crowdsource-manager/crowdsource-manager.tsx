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

import { Component, Element, Host, h, State, VNode } from '@stencil/core';
import CrowdsourceManager_T9n from "../../assets/t9n/crowdsource-manager/resources.json";
import { getLocaleComponentStrings } from "../../utils/locale";
import { ELayoutMode } from '../../utils/interfaces';

@Component({
  tag: 'crowdsource-manager',
  styleUrl: 'crowdsource-manager.css',
  shadow: true,
})
export class CrowdsourceManager {
  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLCrowdsourceManagerElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  State (internal)
  //
  //--------------------------------------------------------------------------

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() _translations: typeof CrowdsourceManager_T9n;

  /**
   * Controls the layout of the application
   */
  @State() _layoutMode: ELayoutMode;

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

  async componentWillLoad(): Promise<void> {
    await this._getTranslations();
  }

  render() {
    return (
      <Host>
        <div>
          <calcite-shell>
            <div class="header" slot='header'>
              <calcite-label class="header-title">
                {this._translations.header}
              </calcite-label>
              <calcite-label class="header-controls-label" layout="inline">
                {this._translations.layout}
                <calcite-action-bar class="header-controls" expand-disabled layout="horizontal">
                  {this._getActionGroup("grid-background", ELayoutMode.GRID)}
                  {this._getActionGroup("horizontal-background", ELayoutMode.HORIZONTAL)}
                  {this._getActionGroup("vertical-background", ELayoutMode.VERTICAL)}
                </calcite-action-bar>
              </calcite-label>
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

  protected _getActionGroup(
    imgClass: string,
    layoutMode: ELayoutMode
  ): VNode {
    return (
      <div class="action-center background-transparent">
        <calcite-action
          alignment="center"
          appearance="transparent"
          compact={false}
          onClick={() => { this._updateLayout(layoutMode) }}
          text=""
        >
          <div class={imgClass + " img-background"} />
        </calcite-action>
        <calcite-tooltip label="" placement="bottom">
          <span>tip</span>
        </calcite-tooltip>
      </div>
    );
  }

  protected _updateLayout(
    layoutMode: ELayoutMode
  ): void {
    this._layoutMode = layoutMode;
  }

  /**
   * Fetches the component's translations
   *
   * @returns Promise when complete
   * @protected
   */
  protected async _getTranslations(): Promise<void> {
    const messages = await getLocaleComponentStrings(this.el);
    this._translations = messages[0] as typeof CrowdsourceManager_T9n;
  }

}
