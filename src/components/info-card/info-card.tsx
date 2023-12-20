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

import { Component, Element, Event, EventEmitter, Host, h, Listen, Method, Prop, State, Watch } from "@stencil/core";
import InfoCard_T9n from "../../assets/t9n/info-card/resources.json";
import { getLocaleComponentStrings } from "../../utils/locale";
import { loadModules } from "../../utils/loadModules";

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
   * When true the component will render an optimized view for mobile devices
   */
  @Prop() isMobile: boolean;

  /**
   * esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  @Prop() mapView: __esri.MapView;

  /**
   * boolean: When true the selected feature will zoomed to in the map and the row will be scrolled to within the table
   */
  @Prop() zoomAndScrollToSelected: boolean;

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
   * string: Current index of total string
   * This value is not displayed but will force a render if it changes
   */
  @State() _count = "";

  /**
   * When true the add record modal will be displayed
   */
  @State() _editRecordOpen = false;

  /**
   * When isMobile is true we will handle the display of the title so
   * we can display beside a custom back button
   */
  @State() _mobileTitle = "";

  /**
   * When true the features list view will be displayed
   */
  @State() _showListView = false;

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

  /**
   * esri/core/reactiveUtils: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-reactiveUtils.html
   */
  protected reactiveUtils: typeof import("esri/core/reactiveUtils");

  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------

  /**
   * Watch for changes to the graphic and update the feature widget
   */
  @Watch("graphics")
  async graphicsWatchHandler(): Promise<void> {
    if (!this._features) {
      await this._initFeaturesWidget();
    }
    if (this.graphics.length > 0) {
      const featureLayer = (this.graphics[0]?.layer as __esri.FeatureLayer);
      this._editEnabled = featureLayer.editingEnabled && featureLayer.capabilities.operations.supportsUpdate;
      this._features.open({
        features: this.graphics
      });
    } else {
      this._features.clear();
      this._features.close();
    }
  }

  /**
   * Watch for changes to the isMobile prop then init the Features widget
   * We need to know if the title should be displayed by the widget (non mobile)
   * or by us (mobile)
   */
  @Watch("isMobile")
  async isMobileWatchHandler(): Promise<void> {
    await this._initFeaturesWidget();
  }

  /**
   * Watch for changes to the mapView and re-init the Feature widget
   */
  @Watch("mapView")
  async mapViewWatchHandler(): Promise<void> {
    return await this._initFeaturesWidget();
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

  /**
   * Emitted on demand when the popup is closed
   */
  @Event() popupClosed: EventEmitter<void>;

  /**
   * Emitted on demand when the selected index changes
   */
  @Event() selectionChanged: EventEmitter<__esri.Graphic[]>;

  /**
   * Respond to and close the edit record display
   *
   * @returns a promise when the operation has completed
   */
  @Listen("closeEdit", { target: "window" })
  async closeEdit(): Promise<void> {
    this._editRecordOpen = false;
  }

  /**
   * Refresh the info-card graphics
   */
  @Listen("refreshGraphics", { target: "window" })
  async refreshGraphics(
    evt: CustomEvent
  ): Promise<void> {
    this.graphics = [...evt.detail];
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
    await this._initModules();
    await this._getTranslations();
  }

  /**
   * Renders the component.
   */
  render() {
    const loadingClass = this.isLoading ? "" : "display-none";
    const featureNodeClass = this.isLoading || this._editRecordOpen ? "visibility-hidden" : "position-absolute";
    const editClass = !this.isLoading && this._editRecordOpen ? "position-absolute" : "display-none";
    const editButtonClass = (!this.isLoading && this._editRecordOpen) || this._showListView ? "display-none" : "";
    const nextBackDisabled = this._features?.features?.length < 2;
    const nextBackClass = this.isMobile ? "display-none" : "";
    const shellClass = this.isMobile && !this._editRecordOpen ? "padding-top-46" : "";
    return (
      <Host>
        {this.isMobile && !this._editRecordOpen ? (
          <calcite-panel>
            <calcite-action
              class="end-border"
              icon={"chevron-left"}
              iconFlipRtl={true}
              onClick={() => this._closePopup()}
              scale="s"
              slot="header-actions-start"
              text=""
            />
            <span
              class="font-bold"
              slot="header-content"
            >
              {this._mobileTitle}
            </span>
          </calcite-panel>
        ) : undefined
        }
        <calcite-shell class={shellClass}>
          <calcite-loader
            class={loadingClass}
            label={this._translations.fetchingData}
          />
          <div
            class={"esri-widget " + featureNodeClass}
            id="features-node"
          />
          <div class={`${editButtonClass} width-100`} slot="footer">
            <div class="display-flex top-border padding-1-2">
              <calcite-button
                appearance="solid"
                id="solutions-edit"
                onClick={() => this._openEditRecord()}
                width="full"
              >
                {this._translations.edit}
              </calcite-button>
              {
                this.isMobile ? (
                  <calcite-button
                    appearance="outline"
                    class="padding-inline-start-1"
                    id="solutions-cancel"
                    onClick={() => this._closePopup()}
                    width="full"
                  >
                    {this._translations.cancel}
                  </calcite-button>
                ) : undefined
              }
              <calcite-tooltip label="" placement="bottom" reference-element="solutions-edit">
                <span>{this._translations.edit}</span>
              </calcite-tooltip>
              {
                this.isMobile ? (
                  <calcite-tooltip label="" placement="bottom" reference-element="solutions-cancel">
                    <span>{this._translations.cancel}</span>
                  </calcite-tooltip>
                ) : undefined
              }
            </div>
            <div class={`display-flex padding-1-2 button-container top-border ${nextBackClass}`}>
              <div class="min-width-100">
                <calcite-button
                  appearance="outline"
                  disabled={nextBackDisabled}
                  id="solutions-back"
                  onClick={() => this._back()}
                  width="full"
                >
                  {this._translations.back}
                </calcite-button>
                <calcite-tooltip label="" placement="top" reference-element="solutions-back">
                  <span>{this._translations.back}</span>
                </calcite-tooltip>
              </div>
              <div>
                <calcite-action
                  icon="list"
                  onClick={() => this._toggleListView()}
                  scale="s"
                  text={this._getCount()}
                  textEnabled={true}
                />
              </div>
              <div class="min-width-100">
                <calcite-button
                  appearance="outline"
                  disabled={nextBackDisabled}
                  id="solutions-next"
                  onClick={() => this._next()}
                  width="full"
                >
                  {this._translations.next}
                </calcite-button>
                <calcite-tooltip label="" placement="top" reference-element="solutions-next">
                  <span>{this._translations.next}</span>
                </calcite-tooltip>
              </div>
            </div>
          </div>
          <edit-card
            class={editClass}
            graphicIndex={this._features?.selectedFeatureIndex}
            graphics={this.graphics}
            mapView={this.mapView}
            open={this._editRecordOpen}
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
    const [Features, reactiveUtils] = await loadModules([
      "esri/widgets/Features",
      "esri/core/reactiveUtils"
    ]);
    this.Features = Features;
    this.reactiveUtils = reactiveUtils;
  }

  /**
   * Init the Feature widget so we can display the popup content
   *
   * @returns a promise when the operation has completed
   *
   * @protected
   */
  protected async _initFeaturesWidget(): Promise<void> {
    return this.isMobile !== undefined ? await this.mapView?.when(() => {
      if (!this._features) {
        this._features = new this.Features({
          view: this.mapView,
          container: "features-node",
          visibleElements: {
            actionBar: false,
            closeButton: false,
            heading: !this.isMobile
          }
        });
        this.reactiveUtils.watch(
          () => (this._features.viewModel as any).featureMenuOpen,
          (isOpen) => {
            if (!isOpen) {
              this._showListView = isOpen;
            }
          });

        this.reactiveUtils.watch(
          () => this._features.viewModel.title,
          (title) => {
            this._mobileTitle = title;
          });

        if (this.zoomAndScrollToSelected) {
          this.reactiveUtils.watch(
            () => this._features.selectedFeatureIndex,
            (i) => {
              if (i > -1) {
                this.selectionChanged.emit([this._features.selectedFeature]);
              }
            });
        }
      } else {
        this._features.view = this.mapView;
        this._features.visibleElements.actionBar = false;
        this._features.visibleElements.closeButton = false;
        this._features.visibleElements.heading = !this.isMobile;
      }
    }) : Promise.resolve();
  }

  /**
   * Close the popup and emit the selected features
   *
   * @returns void
   */
  protected _closePopup(): void {
    this.popupClosed.emit();
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
   * Open the edit record
   *
   * @returns void
   */
  protected _openEditRecord(): void {
    if (this._editEnabled) {
      this._editRecordOpen = true;
    } else {
      this._alertOpen = true;
    }
  }

  /**
   * Go to the previous feature in the features widget
   *
   * @returns void
   */
  protected _back(): void {
    this._features.previous();
    this._count = this._getCount();
  }

  /**
   * Go to the next feature in the features widget
   *
   * @returns void
   */
  protected _next(): void {
    this._features.next();
    this._count = this._getCount();
  }

  /**
   * Get the current index of total string
   *
   * @returns the index of total string
   */
  protected _getCount(): string {
    const index = (this._features?.viewModel.selectedFeatureIndex + 1).toString();
    const total = this._features?.features?.length.toString();
    return this._translations.indexOfTotal
      .replace("{{index}}", index)
      .replace("{{total}}", total);
  }

  /**
   * Toggle the visibility of the features list view
   */
  protected _toggleListView(): void {
    this._showListView = !this._showListView;
    const i = this._features.selectedFeatureIndex;
    this._features.open({
      features: this.graphics,
      featureMenuOpen: this._showListView
    });
    this._features.selectedFeatureIndex = i;
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
