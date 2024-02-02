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
import { getLayerOrTable } from "../../utils/mapViewUtils";

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
   * HTMLDivElement: https://developer.mozilla.org/en-US/docs/Web/API/HTMLDivElement
  */
  protected _editContainer: HTMLDivElement;

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
    if (this.mapView) {
      if (this.mapView && this.selectedLayerId) {
        await getLayerOrTable(this.mapView, this.selectedLayerId);
        await this.createEditorWidget();
        await this.startCreate();
        this._editor.viewModel.featureFormViewModel.on('submit', this.submitted.bind(this));
        setTimeout(() => {
          this.el.querySelector('.esri-editor').querySelectorAll('calcite-flow-item')[1].shadowRoot.querySelector('calcite-panel').shadowRoot.querySelector('article').querySelector('header').setAttribute('style', 'display: none');
          this.el.querySelector('.esri-editor').querySelectorAll('calcite-flow-item')[1].shadowRoot.querySelector('calcite-panel').shadowRoot.querySelector('article')?.querySelector('footer')?.setAttribute('style', 'display: none');
        }, 700)
      }
    }
  }

  /**
   * Load esri javascript api modules
   * @returns Promise resolving when function is done
   * @protected
   */
  protected async initModules(): Promise<void> {
    const [Editor] = await loadModules([
      "esri/widgets/Editor"
    ]);
    this.Editor = Editor;
  }

  /**
   * Display editor widget to create the new feature
   * @protected
   */
  protected async createEditorWidget(): Promise<void> {
    if (this._editor) {
      this._editor.destroy();
    }
    const container = document.createElement("div");
    const layer = await getLayerOrTable(this.mapView, this.selectedLayerId);
    const selectedLayer = {
      layer: layer
    };
    this._editor = new this.Editor({
      allowedWorkflows: "create-features",
      view: this.mapView,
      layerInfos: [selectedLayer],
      visibleElements: {
        snappingControls: false,
        snappingControlsElements: {
          featureEnabledToggle: false, // removes "Feature to feature" toggle
          layerList: false, // removes Snapping layers list
          enabledToggle: false
        }
      },
      container,
    });
    this.el.appendChild(container);
  }

  /**
   * Start creating the feature
   * @protected
   */
  protected async startCreate(): Promise<void> {
    const layer = await getLayerOrTable(this.mapView, this.selectedLayerId);
    if (layer) {
      let template = layer.templates && layer.templates.length ? layer.templates[0] : {} as __esri.FeatureTemplate;
      if (layer.sourceJSON?.types.length && layer.sourceJSON.types[0].templates?.length) {
        template = layer.sourceJSON.types[0].templates[0];
      }
      const creationInfo: __esri.CreationInfo = {
        layer: layer,
        template: template
      };
      await this._editor.startCreateFeaturesWorkflowAtFeatureCreation(creationInfo);
      this._editor.viewModel.sketchViewModel.on("create", (evt) => {
        if (evt.state === "complete") {
          this.drawComplete.emit();
        }
      })
    }
  }

  /**
   * On creation of feature emit the event that the feature is created
   * @param evt feature submit event
   * @protected
   */
  protected async submitted(evt: any): Promise<void> {
    if (evt.invalid.length) {
      return;
    }
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
