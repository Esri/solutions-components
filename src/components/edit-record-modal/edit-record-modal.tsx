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

import { Component, Element, Event, EventEmitter, Host, h, Prop, State, VNode, Watch } from "@stencil/core";
import { loadModules } from "../../utils/loadModules";
import EditRecordModal_T9n from "../../assets/t9n/edit-record-modal/resources.json";
import { getLocaleComponentStrings } from "../../utils/locale";
import { EEditMode } from "../../utils/interfaces";

@Component({
  tag: "edit-record-modal",
  styleUrl: "edit-record-modal.css",
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
   * esri/Graphic[]: https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html
   */
  @Prop({mutable: true}) graphics: __esri.Graphic[];

  /**
   * esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  @Prop() mapView: __esri.MapView;

  /**
   * When true the component is displayed
   */
  @Prop({ mutable: true }) open = false;

  /**
   * "MULTI" | "SINGLE": "SINGLE" edit mode is intended to be used to edit a single existing feature
   *                     "MULTI" edit mode is intended to apply edits across a collection of features
   */
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

  /**
   * esri/widgets/FeatureForm: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-FeatureForm.html
   * The feature form instance
   */
  protected _featureForm: __esri.FeatureForm;

  /**
   * esri/layers/FeatureLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html
   */
  protected _layer: __esri.FeatureLayer;

  /**
   * any[]: Collection of edit controls created in "MULTI" edit mode
   * These can be calcite-input-text, calcite-input-number, calcite-input-date-picker, calcite-input-time-picker, or calcite-combobox
   */
  protected _editControlElements: any[];

  /**
   * Key value pair: Store the field name and new value to be used to apply edits in "MULTI" edit mode.
   */
  protected _edits: {[key: string]: any} = {};

  /**
   * boolean: When true edit controls will be disabled
   */
  protected _editingDisabled: boolean;

  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------

  /**
   * Watch for changes to the graphics and update the feature widget
   */
  @Watch("graphics")
  graphicsWatchHandler(): void {
    this._initFeatureFormWidget();
    if (this.editMode === EEditMode.SINGLE && this._featureForm && this.graphics[0]) {
      this._featureForm.feature = this.graphics[0];
      this._featureForm.disabled = !this._featureForm.layer.editingEnabled;

      this._editingDisabled = !this._featureForm.layer.editingEnabled;
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
   * Emitted on demand when the modal is closed
   */
  @Event() modalClosed: EventEmitter<void>;

  /**
   * Emitted on demand when the modal is opened
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
   * Special handeling when used with layer-table.
   * This allows us to only fetch graphics when the modal is opened rather than with every render of the layer-table.
   *
   * @returns Promise when complete
   */
  async componentWillRender(): Promise<void> {
    const layerTableElements: HTMLCollection = document.getElementsByTagName("layer-table");
    if (layerTableElements.length === 1 && this.editMode === EEditMode.MULTI) {
      const layerTable: HTMLLayerTableElement = layerTableElements[0] as HTMLLayerTableElement;
      this.graphics = await layerTable.getSelectedGraphics();
    }
    if (this.graphics.length > 0 && this.graphics[0]?.layer) {
      this._layer = this.graphics[0].layer as __esri.FeatureLayer;
    }
  }

  /**
   * Renders the component.
   */
  render() {
    const header = this.editMode === EEditMode.SINGLE ?
      this._translations.edit : this._translations.editMultiple;

    // This is a temp workaround hopefully...this._editingDisabled should reflect the current state but does not
    // when you use MULTI edit mode...is fine in SINGLE
    const editDisabled = this.graphics.length > 0 && this.graphics[0] ?
      !(this.graphics[0].layer as __esri.FeatureLayer).editingEnabled : true;

    return (
      <Host>
        <div>
          <calcite-modal
            docked={true}
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
            {
              editDisabled ? (
                <calcite-notice
                  kind="warning"
                  open={true}
                  slot="content-top"
                  width="full"
                >
                  <div slot="message">
                    {this._translations.enableEditing}
                  </div>
                </calcite-notice>
              ) : undefined
            }
            <div slot="content">
              {
                this.editMode === EEditMode.MULTI ?
                  this._getFieldInputs(editDisabled) : (<div id="feature-form" />)
              }
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
   * @returns void
   */
  protected _initFeatureFormWidget(): void {
    if (this.editMode === EEditMode.SINGLE && this.mapView && !this._featureForm) {
      const feature: __esri.Graphic = this.graphics[0];
      const elements = this._getFormTemplateElements();
      this._featureForm = new this.FeatureForm({
        container: "feature-form",
        feature,
        formTemplate: {
          elements
        },
        map: this.mapView.map
      });
    }
  }

  /**
   * Get the default Form Template to be used in the FeatureForm
   *
   * @returns A default Form Template
   */
  protected _getFormTemplateElements(): any {
    if (this.graphics.length > 0 && this._layer) {
      return this._layer.fields.reduce((prev, cur) => {
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

  /**
   * Get the controls for all editable fields when using "MULTI" edit mode
   *
   * @returns Array of input nodes to display
   */
  protected _getFieldInputs(
    editDisabled: boolean
  ): VNode[] {
    if (this.graphics.length > 0 && this._layer) {
      const fields = this._layer.fields.filter(f => f.editable);
      this._editControlElements = [];
      return fields.map(field => {
        return (
          <div>
            {this._getFieldInput(field, editDisabled)}
          </div>
        );
      });
    }
  }

  /**
   * Get the input for all editable fields when using "MULTI" edit mode
   *
   * @param field An editable field to create an input for user interaction
   *
   * @returns Input node to display
   */
  _getFieldInput(
    field: __esri.Field,
    editDisabled: boolean
  ): VNode {
    let fieldNode: VNode;
    switch (field.type) {
      case "string":
        fieldNode = (
          <calcite-label>
            {field.alias}
            {
              field.domain ? this._getDomainInput(field, editDisabled) : (
                <calcite-input-text
                  disabled={editDisabled}
                  id={field.name}
                  maxLength={field.length}
                  onCalciteInputTextChange={evt => this._stringInputChanged(evt)}
                  placeholder={this._translations.textField}
                  ref={(el) => this._editControlElements.push(el)}
                />)
            }
          </calcite-label>
        );
        break;
      case "small-integer" || "integer" || "single" || "double" || "long":
        fieldNode = (
          <calcite-label>
            {field.alias}
            {
              field.domain ? this._getDomainInput(field, editDisabled) :
              (<calcite-input-number
                disabled={editDisabled}
                id={field.name}
                maxLength={field.length}
                onCalciteInputNumberChange={(evt) => this._numberInputChanged(evt)}
                placeholder={this._translations.textField}
                ref={(el) => this._editControlElements.push(el)}
              />)
            }
          </calcite-label>
        );
        break;
      case "date":
        fieldNode = (
          <calcite-label>
            {field.alias}
            <calcite-input-date-picker
              disabled={editDisabled}
              id={`${field.name}--date`}
              onCalciteInputDatePickerChange={evt => this._dateInputChanged(evt)}
              overlayPositioning="fixed"
              placement="top"
              ref={(el) => this._editControlElements.push(el)}
            />
            {/* Don't see how to tell if this should be on or not...thought maybe checking valueType but
             it's null for the fields I tested but this time picker is still shown for fields in the FeatureForm.

             Not showing by default for now...will change as necessary after I speak with the team
             */}
            {/* <calcite-input-time-picker
              id={`${field.name}--time`}
              onCalciteInputTimePickerChange={evt => this._timeInputChanged(evt)}
            /> */}
          </calcite-label>
        );
        break;
      default:
        fieldNode = (
          <calcite-label>
            {field.alias}
            <calcite-input-text
              disabled={editDisabled}
              id={field.name}
              maxLength={field.length}
              onCalciteInputTextChange={evt => this._stringInputChanged(evt)}
              placeholder={this._translations.textField}
              ref={(el) => this._editControlElements.push(el)}
            />
          </calcite-label>
        );
        break;
    }
    return fieldNode;
  }

  /**
   * Get the input for a field with a domain when using "MULTI" edit mode
   *
   * @param field An editable field that has a domain to create an input for user interaction
   *
   * @returns Input node to display
   */
  protected _getDomainInput(
    field: __esri.Field,
    editDisabled: boolean
  ): VNode {
    let node;
    const domain = field.domain;
    switch (domain.type) {
      case "coded-value":
        node = (
          <calcite-combobox
            clearDisabled={true}
            disabled={editDisabled}
            id={field.name}
            label={field.alias}
            onCalciteComboboxChange={evt => this._domainInputChanged(evt)}
            placeholder={this._translations.selectValue}
            ref={(el) => this._editControlElements.push(el)}
            selectionMode="single"
          >
            {
              domain.codedValues.map(cv => {
                return (<calcite-combobox-item textLabel={cv.name} value={cv.code}/>)
              })
            }
          </calcite-combobox>
        );
        break;

      // need to look into this one more
      //case "inherited":
      //break;

      case "range":
        node = (
          <calcite-input-number
            disabled={editDisabled}
            max={domain.maxValue}
            maxLength={field.length}
            min={domain.minValue}
          />
        );
        break;
    }
    return node;
  }

  /**
   * Store the selected date value
   *
   * @param evt the event from the user interaction
   *
   * @returns void
   */
  protected _dateInputChanged(
    evt: CustomEvent
  ): void {
    const target = evt.target as HTMLCalciteDatePickerElement;
    // should we only store this if it has a value?
    // If we do we prevent the ability to delete values across the seletced features
    // If we don't we could delete values that they may not want to delete
    this._edits[target.id.replace("--date", "")] = target.value;
  }

  /**
   * Store the selected text value
   *
   * @param evt the event from the user interaction
   *
   * @returns void
   */
  protected _domainInputChanged(
    evt: CustomEvent
  ): void {
    const target = evt.target as HTMLCalciteInputTextElement;
    // should we only store this if it has a value?
    // If we do we prevent the ability to delete values across the seletced features
    // If we don't we could delete values that they may not want to delete
    this._edits[target.id] = target.value;
  }

  /**
   * Store the selected number value
   *
   * @param evt the event from the user interaction
   *
   * @returns void
   */
  protected _numberInputChanged(
    evt: CustomEvent
  ): void {
    const target = evt.target as HTMLCalciteInputNumberElement;
    // should we only store this if it has a value?
    // If we do we prevent the ability to delete values across the seletced features
    // If we don't we could delete values that they may not want to delete
    this._edits[target.id] = target.value;
  }

  /**
   * Store the selected string value
   *
   * @param evt the event from the user interaction
   *
   * @returns void
   */
  protected _stringInputChanged(
    evt: CustomEvent
  ): void {
    const target = evt.target as HTMLCalciteInputTextElement;
    // should we only store this if it has a value?
    // If we do we prevent the ability to delete values across the seletced features
    // If we don't we could delete values that they may not want to delete
    this._edits[target.id] = target.value;
  }

  /**
   * Store the selected time value
   *
   * @param evt the event from the user interaction
   *
   * @returns void
   */
  protected _timeInputChanged(
    evt: CustomEvent
  ): void {
    const target = evt.target as HTMLCalciteInputTimePickerElement;
    // should we only store this if it has a value?
    // If we do we prevent the ability to delete values across the seletced features
    // If we don't we could delete values that they may not want to delete
    this._edits[target.id.replace("--time", "")] = target.value;
  }

  /**
   * Closes the modal
   *
   * @returns void
   */
  protected _cancel(): void {
    this.open = false;
    this._clearInputs();
  }

  /**
   * Clear the input controls so they do not retain values on close
   *
   * @returns void
   */
  protected _clearInputs(): void {
    if (this.editMode === EEditMode.MULTI) {
      this._editControlElements?.forEach(c => {
        console.log(c);
        // TODO figure out a way to clear these as the following does not work
        // console.log(c.value);
        // console.log("c.selectedItems")
        // console.log(c.selectedItems)
        // c.value = undefined;
        // c.selectedItems = undefined;
      });
    }
  }

  /**
   * Apply the edits to the layer
   *
   * @returns void
   */
  protected _save(): void {
    const attributes = this.editMode === EEditMode.SINGLE ?
      this._featureForm.getValues() : this._edits;
    if (attributes) {
      console.log(attributes);
      // Holding off on this for a moment until we talk through a few things for MULTI edit
      // this._layer.applyEdits({
      //   updateFeatures: [{ attributes } as any]
      // });
    }
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
   */
  protected async _getTranslations(): Promise<void> {
    const messages = await getLocaleComponentStrings(this.el);
    this._translations = messages[0] as typeof EditRecordModal_T9n;
  }
}
