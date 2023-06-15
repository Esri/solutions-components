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
import InfoCard_T9n from "../../assets/t9n/info-card/resources.json";
import { getLocaleComponentStrings } from "../../utils/locale";
import { loadModules } from "../../utils/loadModules";

@Component({
  tag: 'info-card',
  styleUrl: 'info-card.css',
  shadow: false,
})
export class InfoCard {
  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLInfoCardElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * esri/Graphic: https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html
   */
  @Prop() graphic: __esri.Graphic;

  /**
   * boolean: when true a loading indicator will be shown
   */
  @Prop() isLoading = false;

  /**
   * esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  @Prop() mapView: __esri.MapView;

  //--------------------------------------------------------------------------
  //
  //  State (internal)
  //
  //--------------------------------------------------------------------------

  /**
   * When true the add record modal will be displayed
   */
  @State() _editRecordOpen = false;

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() _translations: typeof InfoCard_T9n;

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * esri/widgets/Feature: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Feature.html
   * used for module import
   */
  protected Feature: typeof import("esri/widgets/Feature");

  /**
   * esri/widgets/Feature: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Feature.html
   * used for widget instance
   */
  protected _feature: __esri.Feature;

  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------

  /**
   * Watch for changes to the graphic and update the feature widget
   */
  @Watch("graphic")
  graphicWatchHandler(): void {
    this._initFeatureWidget();
    if (this._feature) {
      this._feature.graphic = this.graphic;
    }
  }

  /**
   * Watch for changes to the mapView and re-init the Feature widget
   */
  @Watch("mapView")
  mapViewWatchHandler(): void {
    this._initFeatureWidget();
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
    await this._initModules();
    await this._getTranslations();
  }

  /**
   * Renders the component.
   */
  render() {
    const loadingClass = this.isLoading ? "" : "display-none";
    const featureNodeClass = this.isLoading ? "display-none" : "";
    return (
      <Host>
        <calcite-shell>
          <calcite-loader
            class={loadingClass}
            label={this._translations.fetchingData}
          />
          <div
            class={"esri-widget " + featureNodeClass}
            id="feature-node"
          />
          <div class="padding-1-2 display-flex" slot="footer">
            <calcite-button
              appearance="outline"
              iconStart="pencil"
              onClick={() => this._openEditRecord()}
              width="full"
            >
              {this._translations.edit}
            </calcite-button>
          </div>
          <edit-record-modal
            graphic={this.graphic}
            mapView={this.mapView}
            onModalClosed={() => this._editRecordClosed()}
            open={this._editRecordOpen}
            slot='modals'
          />
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
   * Load esri javascript api modules
   *
   * @returns Promise resolving when function is done
   *
   * @protected
   */
  protected async _initModules(): Promise<void> {
    const [Feature] = await loadModules([
      "esri/widgets/Feature"
    ]);
    this.Feature = Feature;
  }

  /**
   * Init the Feature widget so we can display the popup content
   *
   * @protected
   */
  protected _initFeatureWidget(): void {
    if (this.mapView && !this._feature) {
      // map and spatialReference must be set for Arcade
      // expressions to execute and display content
      this._feature = new this.Feature({
        map: this.mapView.map,
        spatialReference: this.mapView.spatialReference,
        container: "feature-node"
      });
    }
  }

  /**
   * Close the edit record modal
   */
  protected _editRecordClosed(): void {
    this._editRecordOpen = false;
  }

  /**
   * Open the edit record modal
   */
  protected _openEditRecord(): void {
    this._editRecordOpen = true;
  }

  /**
   * Fetches the component's translations
   *
   * @returns Promise when complete
   * @protected
   */
  protected async _getTranslations(): Promise<void> {
    const messages = await getLocaleComponentStrings(this.el);
    this._translations = messages[0] as typeof InfoCard_T9n;
  }
}
