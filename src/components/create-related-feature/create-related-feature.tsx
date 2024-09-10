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

import { Component, h, Prop, Element, Event, EventEmitter, Method, Watch, State } from '@stencil/core';
import { loadModules } from "../../utils/loadModules";

@Component({
  tag: 'create-related-feature',
  styleUrl: 'create-related-feature.css',
  shadow: false,
})
export class CreateRelatedFeature {

  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCreateRelatedFeatureElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  @Prop() mapView: __esri.MapView;

  /**
 *  __esri.FeatureLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html
 */
  @Prop() table: __esri.FeatureLayer;

  /**
 *  __esri.Graphic: https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html
 */
  @Prop() selectedFeature: __esri.Graphic;

  /**
   * boolean: Set this to true when have a custom submit button in the app.
   * This will hide the header and footer elements of the editor and user needs to execute the submit method manually.
   */
  @Prop() customizeSubmit?: boolean = false;

  //--------------------------------------------------------------------------
  //
  //  State (internal)
  //
  //--------------------------------------------------------------------------

  /**
   * boolean: When true a loading indicator will be shown while the editor loads
   */
  @State() _editorLoading = false;

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * esri/widgets/Editor: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Editor.html
   * The Editor constructor
   */
  protected Editor: typeof import("esri/widgets/Editor");

  /**
 * esri/widgets/Editor: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Editor.html
 * The Editor instance
 */
  protected _editor: __esri.Editor;

  /**
   * esri/core/reactiveUtils: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-reactiveUtils.html
   */
  protected reactiveUtils: typeof import("esri/core/reactiveUtils");

  /**
   * HTMLDivElement: The node the editor will be added to
   */
  protected _container: HTMLDivElement;

  /**
   * boolean: Flag to maintain the add attachment
   */
  protected _addingAttachment: boolean;

  /**
   * boolean: Flag to maintain form submission using submit button
   */
  protected _isSubmitBtnClicked = false;

  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------
  /**
  * Called each time the mapView prop is changed.
  */
  @Watch("mapView")
  async mapViewWatchHandler(): Promise<void> {
    await this.mapView.when(async () => {
      await this.init();
    });
  }

  /**
   * When _editorLoading is true the container node will be hidden while starting the create workflow
   */
  @Watch("_editorLoading")
  async _editorLoadingWatchHandler(v: boolean): Promise<void> {
    if (v) {
      this._container?.classList.add("display-none");
      await this.startCreate();
      this._container?.classList.remove("display-none");
      this._editorLoading = false;
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Methods (public)
  //
  //--------------------------------------------------------------------------

  /**
   * Destroy the Editor widget instance
   */
  @Method()
  async close(): Promise<void> {
    if (this._editor) {
      this._editor.destroy();
    }
  }

  /**
   * Submit the comment
   */
  @Method()
  async submit(): Promise<void> {
    if (this._editor) {
      this._isSubmitBtnClicked = true;
      this._editor.viewModel.featureFormViewModel.submit();
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Events (public)
  //
  //--------------------------------------------------------------------------

  /**
   * Emitted on demand when the comment is submitted successfully
   */
  @Event() success: EventEmitter<void>;

  /**
   * Emitted on demand when the comment submission is failed
   */
  @Event() fail: EventEmitter<Error>;

  /**
   * Emitted on demand when any action is pending or completed
   */
  @Event() isActionPending: EventEmitter<boolean>;

  /**
   * Emitted on demand when form is ready
   */
  @Event() formReady: EventEmitter<void>;

  //--------------------------------------------------------------------------
  //
  //  Functions (lifecycle)
  //
  //--------------------------------------------------------------------------

  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   * @returns Promise when complete
   */
  async componentWillLoad(): Promise<void> {
    await this.initModules();
  }

  /**
   * Init Editor widget and starts the create workflow
   */
  protected async init(): Promise<void> {
    if (this.mapView) {
      await this.createEditorWidget();
    }
  }

  /**
   * Load esri javascript api modules
   * @returns Promise resolving when function is done
   * @protected
   */
  protected async initModules(): Promise<void> {
    const [Editor, reactiveUtils] = await loadModules([
      "esri/widgets/Editor",
      "esri/core/reactiveUtils"
    ]);
    this.Editor = Editor;
    this.reactiveUtils = reactiveUtils;
  }

  render() {
    const loaderClass = this._editorLoading ? "" : "display-none";
    return (
      <calcite-loader
        class={loaderClass}
        label=""
        scale="s"
      />
    );
  }

  /**
   * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
   */
  async componentDidLoad() {
    await this.init();
  }

  /**
   * Display editor widget to create the new feature
   * @protected
   */
  protected async createEditorWidget(): Promise<void> {
    if (this._editor) {
      this._editor.destroy();
    }
    this._container = document.createElement("div");
    this._container?.classList.add("display-none");

    this._editor = new this.Editor({
      view: this.mapView,
      visibleElements: {
        snappingControls: false
      },
      container: this._container
    });
    this.el.appendChild(this._container);

    //Add handle to watch featureTemplatesViewModel ready state and then start the creation
    const handle = this.reactiveUtils.watch(
      () => this._editor.viewModel.featureTemplatesViewModel.state,
      (state) => {
        if (state === 'ready') {
          this._editorLoading = true;
        }
      });
    this._editor.viewModel.addHandles(handle);

    // Add handle to watch if attachments are added/edited
    const attachmentHandle = this.reactiveUtils.watch(
      () => this._editor.viewModel.state,
      (state) => {
        if (state === 'adding-attachment' || state === 'editing-attachment') {
          this._addingAttachment = true;
          this.isActionPending.emit(true);
        } else {
          if (this._addingAttachment) {
            this.isActionPending.emit(false);
            this._addingAttachment = false;
          }
        }
      });
    this._editor.viewModel.addHandles(attachmentHandle);

    //Add handle to watch featureFormViewModel ready state
    const formHandle = this.reactiveUtils.watch(
      () => this._editor.viewModel.featureFormViewModel?.state,
      (state) => {
        if (state === 'ready') {
          this.formReady.emit();
        }
      });
    this._editor.viewModel.addHandles(formHandle);
  }

  /**
   * Start creating the feature feature form
   * @protected
   */
  protected async startCreate(): Promise<void> {
    const parentLayer = this.selectedFeature.layer as __esri.FeatureLayer;
    const childTable = this.table;
    const parentRelationship = parentLayer.relationships[0];
    const childRelationship = childTable.relationships.find((rel) => parentLayer.layerId === rel.relatedTableId);
    const queryResult = await parentLayer.queryFeatures({
      objectIds: [this.selectedFeature.getObjectId()],
      outFields: [parentLayer.objectIdField, parentRelationship.keyField],
    });
    const parentFeature = queryResult.features[0];
    const template = childTable.templates[0];
    const attributeOverrides = this.makeAttributesForRelatedFeature(parentFeature, parentRelationship, childRelationship);
    const creationInfo = {
      attributeOverrides,
      layer: childTable,
      template,
    };
    await this._editor.startCreateFeaturesWorkflowAtFeatureCreation(creationInfo);
    //hides the header and footer elements in editor widget
    await this.hideEditorsElements();
    this._editor.viewModel.featureFormViewModel.on('submit', this.submitted.bind(this));
  }

  /**
   * Hides the elements of editor widget
   * @protected
   */
  protected async hideEditorsElements(): Promise<void> {
    if (!this.customizeSubmit) {
      return;
    }
    await this.timeout(700);
    //hides the header and footer on the featureForm
    this.el.querySelector('.esri-editor')?.querySelectorAll('calcite-flow-item')?.forEach((flowItem) => {
      const article = flowItem.shadowRoot?.querySelector('calcite-panel')?.shadowRoot?.querySelector('article');
      //hide the header
      article?.querySelector('header')?.setAttribute('style', 'display: none');
      //hide the footer
      article?.querySelector('footer')?.setAttribute('style', 'display: none');
    });
  }

  /**
   * Makes attributes for related feature
   * @param parentFeature Parent feature
   * @param parentRelationship Parent relationship
   * @param childRelationship Child relationship
   * @returns Attributes for related feature
   * @protected
   */
  protected makeAttributesForRelatedFeature(
    parentFeature: __esri.Graphic,
    parentRelationship: __esri.Relationship,
    childRelationship: __esri.Relationship
  ): object {
    const parentKeyField = parentRelationship.keyField;
    let parentKeyValue;
    if (parentFeature.attributes.hasOwnProperty(parentKeyField)) {
      parentKeyValue = parentFeature.getAttribute(parentKeyField);
    } else if (parentFeature.attributes.hasOwnProperty(parentKeyField.toLowerCase())) {
      parentKeyValue = parentFeature.getAttribute(parentKeyField.toLowerCase());
    } else if (parentFeature.attributes.hasOwnProperty(parentKeyField.toUpperCase())) {
      parentKeyValue = parentFeature.getAttribute(parentKeyField.toUpperCase());
    }

    let childKeyField = childRelationship.keyField;

    // get the field from table which name is same as childKeyField and use that field name as childKeyField
    const field = this.table.fields.find((field) => field.name.toLocaleLowerCase() === childKeyField.toLocaleLowerCase());
    childKeyField = field.name;

    const childAttributes = {
      [childKeyField]: parentKeyValue,
    };
    return childAttributes;
  }

  /**
   * On creation of feature emit the event that the feature is created
   * @param evt feature submit event
   * @protected
   */
  protected async submitted(evt: any): Promise<void> {
    //return if any attribute is invalid , focus will be shifted to the invalid attribute in feature form
    if (evt.invalid.length) {
      this._isSubmitBtnClicked = false;
      return;
    }
    //Submit only when valid attributes
    //emit success or fail based on the result
    if (evt.valid.length && this._isSubmitBtnClicked) {
      this._isSubmitBtnClicked = false;
      try {
        await this._editor.activeWorkflow.commit();
        //throw errors if any failures
        if (this._editor.viewModel.failures?.length) {
          this._editor.viewModel.failures.some((failure) => {
            if (failure.error) {
              throw (failure.error)
            }
          })
        }
      } catch (e) {
        this.fail.emit(e);
        return
      }
      this.success.emit();
    }
  }

  /**
   * call setTimeout in Promise wrapper
   * @param delay The time, in milliseconds that the timer should wait before the promise is resolved
   * @protected
   */
  protected timeout(delay: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, delay));
  }
}
