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

import { Component, Element, EventEmitter, Prop, Host, h, Event, Watch, Method } from "@stencil/core";
import { loadModules } from "../../utils/loadModules";
import { getAllLayers } from "../../utils/mapViewUtils";

@Component({
  tag: "create-feature",
  styleUrl: "create-feature.css",
  shadow: false,
})
export class CreateFeature {
  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCreateFeatureElement;

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
   * string: Layer id of the feature layer in which the new feature is to be created
   */
  @Prop() selectedLayerId: string;

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
   * boolean: Flag to maintain the add attachment
   */
  protected _addingAttachment: boolean

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

  //--------------------------------------------------------------------------
  //
  //  Methods (public)
  //
  //--------------------------------------------------------------------------

  /**
   * Destroy the Editor widget instance
   * @returns Promise that resolves when the operation is complete
   */
  @Method()
  async close(): Promise<void> {
    if (this._editor) {
      this._editor.destroy();
    }
  }

  /**
   * Submit the created feature
   * @returns Promise that resolves when the operation is complete
   */
  @Method()
  async submit(): Promise<void> {
    if (this._editor) {
      this._editor.viewModel.featureFormViewModel.submit();
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Events (public)
  //
  //--------------------------------------------------------------------------

  /**
   * Emitted on demand when the feature is created successfully
   */
  @Event() success: EventEmitter<void>;

  /**
   * Emitted on demand when the feature creation is failed
   */
  @Event() fail: EventEmitter<Error>;

  /**
   * Emitted on demand when drawing is completed
   */
  @Event() drawComplete: EventEmitter<void>;

  /**
  * Emitted on demand when editing attachments
  */
  @Event() editingAttachment: EventEmitter<boolean>;

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
   * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
   */
  async componentDidLoad() {
    await this.init();
  }

  /**
   * Renders the component.
   */
  render() {
    return (
      <Host
        id="feature-form"
      />
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * Init Editor widget and starts the create workflow
   */
  protected async init(): Promise<void> {
    if (this.mapView && this.selectedLayerId) {
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

  /**
   * Display editor widget to create the new feature
   * @protected
   */
  protected async createEditorWidget(): Promise<void> {
    if (this._editor) {
      this._editor.destroy();
    }
    const layerInfos = []
    const container = document.createElement("div");
    const allMapLayers = await getAllLayers(this.mapView);
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    allMapLayers.forEach(async (eachLayer: __esri.FeatureLayer) => {
      layerInfos.push({
        layer: eachLayer,
        enabled: eachLayer?.type === "feature" && eachLayer?.id === this.selectedLayerId,
        addEnabled: true, // default is true, set to false to disable the ability to add a new feature
        updateEnabled: false, // default is true, set to false to disable the ability to edit an existing feature
        deleteEnabled: false // default is true, set to false to disable the ability to delete features
      })
    });

    this._editor = new this.Editor({
      allowedWorkflows: "create-features",
      view: this.mapView,
      layerInfos: layerInfos,
      visibleElements: {
        snappingControls: false
      },
      container
    });
    this.el.appendChild(container);

    //Add handle to watch if attachments are added/edited
    const attachmentHandle = this.reactiveUtils.watch(
      () =>  this._editor.viewModel.state,
      (state) => {
        if (state === 'adding-attachment' || state === 'editing-attachment') {
          this._addingAttachment = true;
          this.editingAttachment.emit(true);
        } else {
          if (this._addingAttachment) {
            this.editingAttachment.emit(false);
            this._addingAttachment = false;
          }
        }
      });
    this._editor.viewModel.addHandles(attachmentHandle);

    //Add handle to watch featureTemplatesViewModel ready state and then start the creation
    const handle = this.reactiveUtils.watch(
      () =>  this._editor.viewModel.featureTemplatesViewModel.state,
      (state) => {
        if(state === 'ready'){
          void this.startCreate();
        }
      });
    this._editor.viewModel.addHandles(handle);
  }

  /**
   * Start creating the feature
   * @protected
   */
  protected async startCreate(): Promise<void> {
    if (this._editor.viewModel.featureTemplatesViewModel.items?.length) {
      const items: __esri.TemplateItem[] = this._editor.viewModel.featureTemplatesViewModel.items[0].get("items");
      //once the feature template is selected handle the event for formSubmit and sketch complete
      //also, hide the headers and footer in the editor as we will be showing our own submit and cancel button
      this._editor.viewModel.featureTemplatesViewModel.on('select', () => {
        setTimeout(() => {
          //on form submit 
          this._editor.viewModel.featureFormViewModel.on('submit', this.submitted.bind(this));
          //on sketch complete emit the event
          this._editor.viewModel.sketchViewModel.on("create", (evt) => {
            if (evt.state === "complete") {
              this.drawComplete.emit();
            }
          })
          this.hideEditorsElements();
        }, 700)
        this.hideEditorsElements();
      });
      //if only one feature template then directly start geometry creation for that
      //else allow feature template selection to user
      if (items.length === 1) {
        this._editor.viewModel.featureTemplatesViewModel.select(items[0]);
      }
      //hides the header and footer elements in editor widget
      this.hideEditorsElements()
    }
  }

  /**
   * Hides the elements of editor widget
   * @protected
   */
  protected hideEditorsElements(): void {
    if(!this.customizeSubmit){
      return
    }
    setTimeout(() => {
      //hides the header and footer on the featureForm
      this.el.querySelector('.esri-editor').querySelectorAll('calcite-flow-item')?.forEach((flowItem) => {
        const article = flowItem.shadowRoot?.querySelector('calcite-panel')?.shadowRoot?.querySelector('article');
        //hide the header
        article?.querySelector('header')?.setAttribute('style', 'display: none');
        //hide the footer
        article?.querySelector('footer')?.setAttribute('style', 'display: none');
      })
    }, 700)
  }

  /**
   * On creation of feature emit the event that the feature is created
   * @param evt feature submit event
   * @protected
   */
  protected async submitted(evt: any): Promise<void> {
    //return if any attribute is invalid , focus will be shifted to the invalid attribute in feature form
    if (evt.invalid.length) {
      return;
    }
    //Submit only when valid attributes
    //emit success or fail based on the result
    if (evt.valid.length) {
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
}
