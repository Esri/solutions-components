/** @license
 * Copyright 2023 Esri
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

import { Component, Element, Event, EventEmitter, Host, h, State, VNode } from "@stencil/core";
import LayoutManager_T9n from "../../assets/t9n/layout-manager/resources.json";
import { getLocaleComponentStrings } from "../../utils/locale";
import { ELayoutMode } from "../../utils/interfaces";

@Component({
  tag: 'layout-manager',
  styleUrl: 'layout-manager.css',
  shadow: true,
})
export class LayoutManager {
  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLLayoutManagerElement;

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
  @State() _translations: typeof LayoutManager_T9n;

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * Controls the layout of the application
   */
  protected _layoutMode: ELayoutMode = ELayoutMode.GRID;

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
   * Emitted when the layout should change
   */
  @Event() layoutChanged: EventEmitter<ELayoutMode>;

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
    return (
      <Host>
        <div class="display-flex">
          <div class="display-flex action-center">
            <calcite-icon
              class="icon icon-color"
              icon="information"
              id="app-information-icon"
              scale="s"
            />
            <calcite-popover
              closable={true}
              label=""
              referenceElement="app-information-icon"
            >
              <span class="tooltip-message">
                {this._translations.appInfo}
              </span>
            </calcite-popover>
          </div>
          <div class="header-text">
            {this._translations.layout}
          </div>
          {this._getAction("grid-background", ELayoutMode.GRID, this._translations.grid)}
          {this._getAction("vertical-background", ELayoutMode.VERTICAL, this._translations.vertical)}
          {this._getAction("horizontal-background", ELayoutMode.HORIZONTAL, this._translations.horizontal)}
        </div>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------

  protected _getAction(
    imgClass: string,
    layoutMode: ELayoutMode,
    tip: string
  ): VNode {
    return (
      <div>
        <calcite-action
          alignment="center"
          appearance="transparent"
          compact={false}
          id={imgClass}
          indicator={layoutMode === this._layoutMode}
          onClick={() => { this._setLayoutMode(layoutMode) }}
          text=""
        >
          <div class={imgClass + " img-background"} />
        </calcite-action>
        <calcite-tooltip label="" placement="bottom" reference-element={imgClass}>
          <span>{tip}</span>
        </calcite-tooltip>
      </div>
    );
  }

  protected _setLayoutMode(
    layoutMode: ELayoutMode
  ): void {
    this._layoutMode = layoutMode;
    this.layoutChanged.emit(this._layoutMode);
  }

  /**
   * Fetches the component's translations
   *
   * @returns Promise when complete
   * @protected
   */
  protected async _getTranslations(): Promise<void> {
    const messages = await getLocaleComponentStrings(this.el);
    this._translations = messages[0] as typeof LayoutManager_T9n;
  }

}
