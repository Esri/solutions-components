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

import { Component, Element, Host, h, Prop, State, VNode } from '@stencil/core';
import CrowdsourceManager_T9n from "../../assets/t9n/crowdsource-manager/resources.json";
import { getLocaleComponentStrings } from "../../utils/locale";
import { ELayoutMode, IMapInfo } from '../../utils/interfaces';

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

  /**
   * IMapInfo[]: array of map infos (name and id)
   */
  @Prop() mapInfos: IMapInfo[] = [];

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
  @State() _layoutMode: ELayoutMode = ELayoutMode.GRID;

  /**
   * Controls the layout of the application
   */
  @State() _panelOpen = true;

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
        <calcite-panel
          class="width-full height-full"
          heading={this._translations.header}
        >
          <div class="display-flex" slot="header-actions-end">
            <div class="header-text">Layout</div>
            {this._getAction("grid-background", ELayoutMode.GRID)}
            {this._getAction("horizontal-background", ELayoutMode.VERTICAL)}
            {this._getAction("vertical-background", ELayoutMode.HORIZONTAL)}
          </div>
          {this._getBody(this._layoutMode)}
        </calcite-panel>
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
    layoutMode: ELayoutMode
  ): VNode {
    return (
      <div>
        <calcite-action
          alignment="center"
          appearance="transparent"
          compact={false}
          id={imgClass}
          onClick={() => { this._setLayoutMode(layoutMode) }}
          text=""
        >
          <div class={imgClass + " img-background"} />
        </calcite-action>
        <calcite-tooltip label="" placement="bottom" reference-element={imgClass}>
          <span>tip</span>
        </calcite-tooltip>
      </div>
    );
  }

  protected _getBody(
    layoutMode: ELayoutMode
  ): VNode {
    const shellClass = "width-full height-full pad-top-51";
    return layoutMode === ELayoutMode.GRID ? this._getGridLayout(shellClass) :
      layoutMode === ELayoutMode.HORIZONTAL ? this._getHorizontalLayout(shellClass) :
        this._getVerticalLayout(shellClass);
  }

  protected _getGridLayout(
    shellClass: string
  ): VNode {
    const icon = this._panelOpen ? "chevrons-left" : "chevrons-right";
    const tooltip = this._panelOpen ? "Close" : "Open";
    const id = "toggle-vertical";
    return (
      <calcite-shell
        class={shellClass}
      >
        <div class="width-full height-full display-flex">
          {this._getMap()}
          <div class="width-2-3 height-full">
            <div class="divider-w">
              <calcite-action
                icon={icon}
                id={id}
                onclick={() => this._toggleLayout()}
                text=""
              />
              <calcite-tooltip label={tooltip} placement="bottom" reference-element={id}>
                <span>{tooltip}</span>
              </calcite-tooltip>
            </div>
          </div>
        </div>
      </calcite-shell>
    );
  }

  protected _getHorizontalLayout(
    shellClass: string
  ): VNode {
    const icon = this._panelOpen ? "chevrons-up" : "chevrons-down";
    const tooltip = this._panelOpen ? "Close" : "Open";
    const id = "toggle-horizontal";
    return (
      <calcite-shell
        class={shellClass}
      >
        <div class="width-full height-full">
          {this._getMap()}
          <div class="height-1-2 width-full">
            <calcite-panel>
              <calcite-action
                icon={icon}
                id={id}
                onclick={() => this._toggleLayout()}
                slot="header-actions-start"
                text=""
              />
              <calcite-tooltip label={tooltip} placement="bottom" reference-element={id}>
                <span>{tooltip}</span>
              </calcite-tooltip>
            </calcite-panel>
          </div>
        </div>
      </calcite-shell>
    );
  }

  protected _getVerticalLayout(
    shellClass: string
  ): VNode {
    const icon = this._panelOpen ? "chevrons-left" : "chevrons-right";
    const tooltip = this._panelOpen ? "Close" : "Open";
    const id = "toggle-vertical";
    return (
      <calcite-shell
        class={shellClass}
      >
        <div class="width-full height-full display-flex">
          {this._getMap()}
          <div class="width-1-2 height-full">
            <div class="divider-w">
              <calcite-action
                icon={icon}
                id={id}
                onclick={() => this._toggleLayout()}
                text=""
              />
              <calcite-tooltip label={tooltip} placement="bottom" reference-element={id}>
                <span>{tooltip}</span>
              </calcite-tooltip>
            </div>
          </div>
        </div>
      </calcite-shell>
    );
  }

  protected _getMap(): VNode {
    const sizeClass = this._layoutMode === ELayoutMode.VERTICAL ?
      `height-full ${ this._panelOpen ? "width-1-2" : "width-0"}` :
      this._layoutMode === ELayoutMode.HORIZONTAL ?
      `${this._panelOpen ? "height-1-2" : "height-0"} width-full` :
      `height-1-2 ${this._panelOpen ? "width-1-3" : "width-0"}`;
    return (
      <div class={sizeClass}>
        <map-card mapInfos={this.mapInfos}/>
      </div>
    );
  }

  protected _setLayoutMode(
    layoutMode: ELayoutMode
  ): void {
    this._layoutMode = layoutMode;
  }

  protected _toggleLayout(): void {
    this._panelOpen = !this._panelOpen;
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
