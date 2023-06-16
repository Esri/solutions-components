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

import { Component, Element, Event, EventEmitter, Host, h, Prop, State, VNode, Watch } from '@stencil/core';
import { loadModules } from "../../utils/loadModules";
import EditRecordModal_T9n from "../../assets/t9n/edit-record-modal/resources.json";
import { getLocaleComponentStrings } from "../../utils/locale";
import { EEditMode } from "../../utils/interfaces";

@Component({
  tag: 'edit-record-modal',
  styleUrl: 'edit-record-modal.css',
  shadow: false,
})
export class EditRecordModal {
  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLEditRecordModalElement;

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
   * esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  @Prop() mapView: __esri.MapView;

  /**
   * When true the component is displayed
   */
  @Prop({ mutable: true }) open = false;

  @Prop() editMode = EEditMode.SINGLE;

  //--------------------------------------------------------------------------
  //
  //  State (internal)
  //
  //--------------------------------------------------------------------------

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() _translations: typeof EditRecordModal_T9n;

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * esri/widgets/FeatureForm: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-FeatureForm.html
   * The feature form constructor
   */
  protected FeatureForm: typeof import("esri/widgets/FeatureForm");

  protected _featureForm: __esri.FeatureForm;

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
    this._initFeatureFormWidget();
    if (this._featureForm) {
      this._featureForm.feature = this.graphic;
    }
  }

  /**
   * Watch for changes to the mapView and re-init the Feature widget
   */
  @Watch("mapView")
  mapViewWatchHandler(): void {
    this._initFeatureFormWidget();
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

  /**
   * Emitted on demand when a buffer is generated.
   */
  @Event() modalClosed: EventEmitter<void>;

  /**
   * Emitted on demand when a buffer is generated.
   */
  @Event() modalOpened: EventEmitter<void>;

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
    const header = this.editMode === EEditMode.SINGLE ?
      this._translations.edit : this._translations.editMultiple;
    return (
      <Host>
        <div>
          <calcite-modal
            onCalciteModalClose={() => this._modalClose()}
            onCalciteModalOpen={() => this._modalOpen()}
            open={this.open}
            outsideCloseDisabled={true}
            width="s"
          >
            <div
              class="font-500"
              slot="header"
            >
              {header}
            </div>
            <div slot="content">
              <div id="feature-form"/>
            </div>
            <calcite-button
              appearance="outline"
              onClick={() => this._cancel()}
              slot="secondary"
              width="full"
            >
              {this._translations.cancel}
            </calcite-button>
            <calcite-button
              appearance="solid"
              onClick={() => this._save()}
              slot="primary"
              width="full"
            >
              {this._translations.save}
            </calcite-button>
          </calcite-modal>
        </div>
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
    const [FeatureForm] = await loadModules([
      "esri/widgets/FeatureForm"
    ]);
    this.FeatureForm = FeatureForm;
  }

  /**
   * Init the Feature widget so we can display the popup content
   *
   * @protected
   */
  protected _initFeatureFormWidget(): void {
    if (this.mapView && !this._featureForm) {
      const elements = this._getFormTemplateElements();

      this._featureForm = new this.FeatureForm({
        container: "feature-form",
        feature: this.graphic,
        formTemplate: {
          elements
        }
      });
    }
  }

  protected _getFormTemplateElements(): any {
    if (this.graphic) {
      const layer = this.graphic.layer as __esri.FeatureLayer;
      return layer.fields.reduce((prev, cur) => {
        if (cur.editable) {
          prev.push({
            type: "field",
            fieldName: cur.name,
            label: cur.alias
          });
        }
        return prev;
      }, []);
    }
  }

  protected _getFieldInputs(): VNode[] {
    // TODO don't follow what these are so just hard-coding for now
    const labels = [
      this._translations.label,
      this._translations.label,
      this._translations.label,
      this._translations.label,
      this._translations.label
    ];

    return labels.map(label => {
      return (
        <div class="padding-bottom-1">
          <calcite-label class="font-bold">
            {label}
            <calcite-input placeholder={this._translations.textField} type="text" />
          </calcite-label>
        </div>
      );
    });
  }

  /**
   * Closes the modal
   *
   * @returns void
   */
  protected _cancel(): void {
    this.open = false;
  }

  protected _save(): void {
    this.open = false;
  }

  /**
   * Emit the modal close event
   *
   * @returns void
   */
  protected _modalClose(): void {
    this.modalClosed.emit();
  }

  /**
   * Emit the modal open event
   *
   * @returns void
   */
  protected _modalOpen(): void {
    this.modalOpened.emit();
  }

  /**
   * Fetches the component's translations
   *
   * @returns Promise when complete
   * @protected
   */
  protected async _getTranslations(): Promise<void> {
    const messages = await getLocaleComponentStrings(this.el);
    this._translations = messages[0] as typeof EditRecordModal_T9n;
  }

}
