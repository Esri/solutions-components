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

import { Component, Element, Event, EventEmitter, Host, h, Prop, State, VNode } from '@stencil/core';
import MapTools_T9n from "../../assets/t9n/map-tools/resources.json";
import { getLocaleComponentStrings } from "../../utils/locale";
import { EExpandType } from "../../utils/interfaces";

@Component({
  tag: 'map-tools',
  styleUrl: 'map-tools.css',
  shadow: true,
})
export class MapTools {
  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLMapToolsElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * "horizontal" | "vertical": used to control the orientation of the tools
   */
  @Prop() layout: "horizontal" | "vertical" = "vertical";

  /**
   * esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  @Prop() mapView: __esri.MapView;

  //--------------------------------------------------------------------------
  //
  //  State (internal)
  //
  //--------------------------------------------------------------------------

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() _translations: typeof MapTools_T9n;

  /**
   * When true the tool action bar will be displayed
   */
  @State() _showTools = true;

  /**
   * When true the basemap picker will be displayed
   */
  @State() _showBasemapPicker = false;

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
   * Emitted when the expand button is clicked
   */
  @Event() expandMap: EventEmitter<EExpandType>;

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
  }

  /**
   * StencilJS: Renders the component.
   */
  render() {
    const toggleIcon = this._showTools ? "chevrons-up" : "chevrons-down";
    const toolsClass = this._showTools ? "" : "display-none";
    return (
      <Host>
        <div class="display-flex">
          <calcite-action
            alignment="center"
            class="border"
            compact={false}
            icon={toggleIcon}
            onClick={() => { this._toggleTools() }}
            text=""
          />
          <calcite-action-bar class={`border margin-top-1-2 ${toolsClass}`} expand-disabled layout={this.layout}>
            {this._getActionGroup("home", false, this._translations.home, () => this._goHome())}
            {this._getActionGroup("plus", false, this._translations.zoomIn, () => this._zoomIn())}
            {this._getActionGroup("minus", false, this._translations.zoomOut, () => this._zoomOut())}
            {this._getActionGroup("list", false, this._translations.list, () => this._showList())}
            {this._getActionGroup("magnifying-glass", false, this._translations.search, () => this._search())}
            {this._getActionGroup("expand", false, this._translations.expand, () => this._expand())}
            {this._getActionGroup("basemap", false, this._translations.basemap, () => this._toggleBasemapPicker())}
          </calcite-action-bar>
        </div>
      </Host>
    );
  }

  /**
   * Get a calcite action group for the current action
   *
   * @param icon the icon to display for the current action
   * @param disabled should the action be disabled
   * @param tip information tip to display helpful details to end user
   * @param func the associated onClick function to execute
   *
   * @returns the dom node for the action group
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
      <calcite-action-group>
        <calcite-action
          alignment="center"
          compact={false}
          disabled={disabled}
          icon={icon}
          id={icon}
          onClick={func}
          text=""
        >
          <calcite-icon icon={"cheveron-up"} scale="s" slot="icon" />
        </calcite-action>
        <calcite-tooltip label="" placement="bottom" reference-element={icon}>
          <span>{tip}</span>
        </calcite-tooltip>
      </calcite-action-group>
    );
  }

  // Need to discuss this with the team
  protected _goHome(): void {
    alert("go home")
  }

  // need to discuss this with the team
  protected _showList(): void {
    alert("show list")
  }

  // Need to discuss this with the team
  protected _search(): void {
    alert("search")
  }

  // Need to explore map fixed zoom in considerations
  protected _zoomIn(): void {
    alert("zoom in")
  }

  // Need to explore map fixed zoom out considerations
  protected _zoomOut(): void {
    alert("zoom out")
  }

  /**
   * Show/Hide the basemap picker
   *
   * @returns void
   *
   * @protected
   */
  protected _toggleBasemapPicker(): void {
    this._showBasemapPicker = !this._showBasemapPicker;
  }

  /**
   * Emit the expand map event
   *
   * @returns void
   *
   * @protected
   */
  protected _expand(): void {
    this.expandMap.emit(EExpandType.EXPAND);
  }

  /**
   * Show/Hide the map tools
   *
   * @returns void
   *
   * @protected
   */
  protected _toggleTools(): void {
    this._showTools = !this._showTools;
  }

  /**
   * Fetches the component's translations
   *
   * @returns Promise when complete
   * @protected
   */
  protected async _getTranslations(): Promise<void> {
    const messages = await getLocaleComponentStrings(this.el);
    this._translations = messages[0] as typeof MapTools_T9n;
  }
}
