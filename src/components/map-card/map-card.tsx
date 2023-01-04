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
import MapCard_T9n from "../../assets/t9n/map-card/resources.json";
import { getLocaleComponentStrings } from "../../utils/locale";

@Component({
  tag: 'map-card',
  styleUrl: 'map-card.css',
  shadow: true,
})
export class MapCard {
  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLMapCardElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  @Prop() mapView: __esri.MapView;

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() _translations: typeof MapCard_T9n;

  @State() _mapListExpanded = false;

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

  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   */
  async componentWillLoad(): Promise<void> {
    await this._getTranslations();
    //await this._initModules();
  }

  render() {
    return (
      <Host>
        {this._getToolbar()}
        <slot name="map"></slot>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------

  protected _getToolbar():VNode {
    return (
      <div class="display-flex">
        <calcite-action-bar class="border-bottom-1 action-bar-size" expand-disabled layout="horizontal" slot="header">
          {this._getMapPicker()}
          {this._getActionGroup("home", false, this._translations.home, () => this._goHome())}
          {this._getActionGroup("list", false, this._translations.list, () => this._showList())}
          {this._getActionGroup("magnifying-glass-plus", false, this._translations.search, () => this._search())}
          {this._getActionGroup("plus", false, this._translations.zoomIn, () => this._zoomIn())}
          {this._getActionGroup("minus", false, this._translations.zoomOut, () => this._zoomOut())}
          {this._getActionGroup("expand", false, this._translations.expand, () => this._expand())}
        </calcite-action-bar>
      </div>
    );
  }

  /**
   * Get a calcite action group for the current action
   *
   * @param icon the icon to display for the current action
   * @param disabled should the action be disabled
   * @param pageType what page type will the action navigate to
   * @param tip information tip to display helpful details to end user
   *
   * @protected
   */
  protected _getActionGroup(
    icon: string,
    disabled: boolean,
    tip: string,
    func: any
  ): VNode {
    return (
      <calcite-action-group class="action-center width-1-6" layout="horizontal">
        <calcite-action
          //active={this._pageType === pageType}
          alignment="center"
          class="width-full height-full"
          compact={false}
          disabled={disabled}
          icon={icon}
          id={icon}
          onClick={func}
          text=""
        >
          <calcite-icon scale="s" slot="icon" icon={"cheveron-up"}/>
        </calcite-action>
        <calcite-tooltip label="" placement="bottom" reference-element={icon}>
          <span>{tip}</span>
        </calcite-tooltip>
      </calcite-action-group>
    );
  }

  protected _getMapPicker(): VNode {
    const mapListIcon = this._mapListExpanded ? "chevron-up" :"chevron-down";
    return (
      <calcite-action-group class="action-center width-1-6" layout="horizontal">
        <calcite-block class="action-center block-button width-full height-full" onClick={() => this._chooseMap()} heading=''>
          <calcite-icon scale="s" slot="icon" icon="map"></calcite-icon>
          <calcite-icon scale="s" slot="icon" icon={mapListIcon}></calcite-icon>
        </calcite-block>
        <calcite-tooltip label="" placement="bottom">
          <span>{this._translations.mapName}</span>
        </calcite-tooltip>
      </calcite-action-group>
    );
  }

  protected _chooseMap(): void {
    alert("pick a map")
  }

  protected _goHome(): void {
    alert("go home")
  }

  protected _showList(): void {
    alert("show list")
  }

  protected _search(): void {
    alert("search")
  }

  protected _zoomIn(): void {
    alert("zoom in")
  }

  protected _zoomOut(): void {
    alert("zoom out")
  }

  protected _expand(): void {
    alert("expand")
  }

  /**
   * Fetches the component's translations
   *
   * @returns Promise when complete
   * @protected
   */
   protected async _getTranslations(): Promise<void> {
    const messages = await getLocaleComponentStrings(this.el);
    this._translations = messages[0] as typeof MapCard_T9n;
  }

}
