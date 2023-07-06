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

import { Component, Element, Host, h, Listen, Prop, State, VNode } from "@stencil/core";
import CrowdsourceManager_T9n from "../../assets/t9n/crowdsource-manager/resources.json";
import { getLocaleComponentStrings } from "../../utils/locale";
import { ELayoutMode, IMapInfo } from "../../utils/interfaces";

@Component({
  tag: "crowdsource-manager",
  styleUrl: "crowdsource-manager.css",
  shadow: false,
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
   * Stores the current map view
   */
  @State() _mapView: __esri.MapView;

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

  /**
   * Listen for mapChanged event to be fired then store the new mapView so components will be updated
   */
  @Listen("mapChanged", { target: "window" })
  async mapChanged(
    evt: CustomEvent
  ): Promise<void> {
    this._mapView = evt.detail;
    this._mapView.popupEnabled = false;
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
    return (
      <Host>
        <calcite-shell>
          <calcite-panel
            class="width-full height-full"
            heading={this._translations.header}
          >
            <div class="display-flex" slot="header-actions-end">
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
              {this._getAction("horizontal-background", ELayoutMode.VERTICAL, this._translations.horizontal)}
              {this._getAction("vertical-background", ELayoutMode.HORIZONTAL, this._translations.vertical)}
            </div>
            {this._getBody(this._layoutMode, this._panelOpen)}
          </calcite-panel>
        </calcite-shell>
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

  protected _getDividerIcon(
    layoutMode: ELayoutMode,
    panelOpen: boolean
  ): string {
    let icon = "";
    switch (layoutMode) {
      case ELayoutMode.HORIZONTAL:
        icon = panelOpen ? "chevrons-up" : "chevrons-down";
        break;
      default:
        icon = panelOpen ? "chevrons-left" : "chevrons-right";
        break;
    }
    return icon;
  }

  protected _getMapSizeClass(
    layoutMode: ELayoutMode,
    panelOpen: boolean
  ): string {
    let sizeClass = "";
    switch (layoutMode) {
      case ELayoutMode.HORIZONTAL:
        sizeClass = `${panelOpen ? "height-1-2" : "height-0"} width-full position-relative`;
        break;
      case ELayoutMode.GRID:
        sizeClass = `height-full position-relative ${panelOpen ? "width-1-3" : "width-0"}`;
        break;
      case ELayoutMode.VERTICAL:
        sizeClass = `height-full position-relative ${panelOpen ? "width-1-2" : "width-0"}`;
        break;
    }
    return sizeClass;
  }

  protected _getTableSizeClass(
    layoutMode: ELayoutMode,
    panelOpen: boolean
  ): string {
    let sizeClass = "";
    switch (layoutMode) {
      case ELayoutMode.HORIZONTAL:
        sizeClass = `${panelOpen ? "height-1-2" : "height-full"} width-full display-flex flex-column`;
        break;
      case ELayoutMode.GRID:
        sizeClass = `${panelOpen ? "width-2-3" : "width-full"} height-full display-flex`;
        break;
      case ELayoutMode.VERTICAL:
        sizeClass = `${panelOpen ? "width-1-2" : "width-full"} height-full display-flex`;
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
      <calcite-panel class={"width-full height-full"}>
        <div class={`width-full height-full ${displayFlex}`}>
          {this._getMap(layoutMode, panelOpen)}
          {this._getTable(layoutMode, panelOpen)}
        </div>
      </calcite-panel>
    );
  }

  protected _getMap(
    layoutMode: ELayoutMode,
    panelOpen: boolean
  ): VNode {
    const mapSizeClass = this._getMapSizeClass(layoutMode, panelOpen);
    return (
      <div class={`${mapSizeClass} overflow-hidden`}>
        <div class="adjusted-height-50 overflow-hidden" >
          <map-card mapInfos={this.mapInfos}/>
        </div>
        <div class="padding-1-2">
          <card-manager class="adjusted-height-50" mapView={this?._mapView}/>
        </div>
      </div>
    );
  }

  protected _getTable(
    layoutMode: ELayoutMode,
    panelOpen: boolean
  ): VNode {
    const tableSizeClass = this._getTableSizeClass(layoutMode, panelOpen)
    const icon = this._getDividerIcon(layoutMode, panelOpen);
    const tooltip = panelOpen ? this._translations.close : this._translations.open;
    const id = "toggle-layout";
    const toggleLayout = layoutMode === ELayoutMode.HORIZONTAL ? "horizontal" : "vertical";
    const toggleSlot = layoutMode === ELayoutMode.HORIZONTAL ? "header" : "panel-start";
    return (
      <calcite-shell class={tableSizeClass}>
        <calcite-action-bar
          class="border"
          expandDisabled={true}
          layout={toggleLayout}
          slot={toggleSlot}
        >
          <calcite-action
            class="toggle-node"
            icon={icon}
            id={id}
            onClick={() => this._toggleLayout()}
            text=""
          />
          <calcite-tooltip
            label={tooltip}
            placement="bottom"
            reference-element={id}
          >
            <span>{tooltip}</span>
          </calcite-tooltip>
        </calcite-action-bar>
        <div class="width-full height-full position-relative">
          <layer-table mapView={this?._mapView} />
        </div>
      </calcite-shell>
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
