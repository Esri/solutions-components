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

import { Component, Element, Host, h, Method, Prop, State, Watch } from "@stencil/core";
import InfoCard_T9n from "../../assets/t9n/info-card/resources.json";
import { getLocaleComponentStrings } from "../../utils/locale";
import { loadModules } from "../../utils/loadModules";
import { EEditMode } from "../../utils/interfaces";

@Component({
  tag: "info-card",
  styleUrl: "info-card.css",
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
  @Prop() graphics: __esri.Graphic[];

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
   * boolean: When true a alert will be shown to indicate a problem or confirm the current action
   */
  @State() _alertOpen = false;

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
  protected Features: typeof import("esri/widgets/Features");

  /**
   * boolean: When false alerts will be shown to indicate that the layer must have editing enabled for edit actions
   */
  protected _editEnabled: boolean;

  /**
   * esri/widgets/Feature: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Feature.html
   * used for widget instance
   */
  protected _features: __esri.Features;

  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------

  /**
   * Watch for changes to the graphic and update the feature widget
   */
  @Watch("graphics")
  graphicsWatchHandler(): void {
    this._initFeaturesWidget();
    if (this._features) {
      this._features.features = this.graphics;
      this._features.visible = this.graphics.length > 0 && this.graphics[0] !== undefined;
      if (this._features.visible) {
        this._editEnabled = (this.graphics[0]?.layer as __esri.FeatureLayer).editingEnabled;
      }
    }
  }

  /**
   * Watch for changes to the mapView and re-init the Feature widget
   */
  @Watch("mapView")
  mapViewWatchHandler(): void {
    this._initFeaturesWidget();
  }

  //--------------------------------------------------------------------------
  //
  //  Methods (public)
  //
  //--------------------------------------------------------------------------

  /**
   * Get the current selected feature from the Features widget
   *
   * @returns Promise resolving with the current feature
   */
  @Method()
  async getSelectedFeature(): Promise<any> {
    return this._features.selectedFeature;
  }

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
            id="features-node"
          />
          <div class="padding-1-2 display-flex" slot="footer">
            <calcite-button
              appearance="outline"
              iconStart="pencil"
              id="solutions-edit"
              onClick={() => this._openEditRecord()}
              width="full"
            >
              {this._translations.edit}
            </calcite-button>
            <calcite-tooltip label="" placement="bottom" reference-element="solutions-edit">
              <span>{this._translations.edit}</span>
            </calcite-tooltip>
          </div>
          <edit-record-modal
            editMode={EEditMode.SINGLE}
            graphicIndex={this._features?.selectedFeatureIndex}
            graphics={this.graphics}
            mapView={this.mapView}
            onModalClosed={() => this._editRecordClosed()}
            open={this._editRecordOpen}
            slot="modals"
          />
          <calcite-alert
            icon={"layer-broken"}
            kind={"warning"}
            label=""
            onCalciteAlertClose={() => this._alertClosed()}
            open={this._alertOpen}
            placement="top"
          >
            <div slot="title">
              {this._translations.editDisabled}
            </div>
            <div slot="message">
              {this._translations.enableEditing}
            </div>
          </calcite-alert>
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
    const [Features] = await loadModules([
      "esri/widgets/Features"
    ]);
    this.Features = Features;
  }

  /**
   * Init the Feature widget so we can display the popup content
   *
   * @protected
   */
  protected _initFeaturesWidget(): void {
    if (this.mapView && !this._features) {
      this._features = new this.Features({
        view: this.mapView,
        container: "features-node",
        visible: true,
        visibleElements: {
          actionBar: false,
          closeButton: false,
          heading: false
        },
        viewModel: {
          featureViewModelAbilities: {
            attachmentsContent: false
          }
        }
      });
    }
  }

  /**
   * Set the alertOpen member to false when the alert is closed
   *
   * @returns void
   */
  protected _alertClosed(): void {
    this._alertOpen = false;
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
    if (this._editEnabled) {
      this._editRecordOpen = true;
    } else {
      this._alertOpen = true;
    }
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
