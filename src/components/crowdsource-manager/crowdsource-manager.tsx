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
          {this._getBody(this._layoutMode, this._panelOpen)}
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
          indicator={layoutMode === this._layoutMode}
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

  protected _getDividerIcon(
    layoutMode: ELayoutMode,
    panelOpen: boolean
  ): string {
    let icon = "";
    switch (layoutMode) {
      case ELayoutMode.HORIZONTAL:
        icon = panelOpen ? "chevrons-up" : "chevrons-down";
        break;
      case ELayoutMode.GRID || ELayoutMode.VERTICAL:
        icon = panelOpen ? "chevrons-left" : "chevrons-right";
    }
    return icon;
  }

  protected _getSizeClass(
    layoutMode: ELayoutMode,
    panelOpen: boolean
  ): string {
    let sizeClass = "";
    switch (layoutMode) {
      case ELayoutMode.HORIZONTAL:
        sizeClass = `${panelOpen ? "height-1-2" : "height-0"} width-full`;
        break;
      case ELayoutMode.GRID:
        sizeClass = `height-full ${panelOpen ? "width-1-3" : "width-0"}`;
        break;
      case ELayoutMode.VERTICAL:
        sizeClass = `height-full ${panelOpen ? "width-1-2" : "width-0"}`;
        break;
    }
    return sizeClass;
  }

  protected _getBody(
    layoutMode: ELayoutMode,
    panelOpen: boolean
  ): VNode {
    const displayFlex = layoutMode === ELayoutMode.HORIZONTAL ? "" : "display-flex";
    return (
      <calcite-shell class={"width-full height-full pad-top-51"}>
        <div class={`width-full height-full ${displayFlex}`}>
          {this._getMap(layoutMode, panelOpen)}
          {this._getTable(layoutMode, panelOpen)}
        </div>
      </calcite-shell>
    );
  }

  protected _getMap(
    layoutMode: ELayoutMode,
    panelOpen: boolean
  ): VNode {
    const mapSizeClass = this._getSizeClass(layoutMode, panelOpen);
    return (
      <div class={`${mapSizeClass} overflow-hidden`}>
        <div style={{ "overflow": "hidden" }} >
          <map-card mapInfos={this.mapInfos} />
        </div>
      </div>
    );
  }

  protected _getTable(
    layoutMode: ELayoutMode,
    panelOpen: boolean
  ): VNode {
    const tableSizeClass = layoutMode === ELayoutMode.HORIZONTAL ?
      "height-1-2 width-full display-flex" : layoutMode === ELayoutMode.VERTICAL ?
        "width-1-2 height-full display-flex" : "width-2-3 height-full display-flex";
    const icon = this._getDividerIcon(layoutMode, panelOpen);
    const tooltip = panelOpen ? "Close" : "Open";
    const id = "toggle-layout";
    return (
      <div class={tableSizeClass}>
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
      <div>
        H
      </div>
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
