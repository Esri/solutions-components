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

import { Component, Element, Event, EventEmitter, Host, h, Listen, Prop, State, Watch } from "@stencil/core";
import { loadModules } from "../../utils/loadModules";
import EditCard_T9n from "../../assets/t9n/edit-card/resources.json"
import { getLocaleComponentStrings } from "../../utils/locale";
import { getAllLayers } from "../../utils/mapViewUtils";

@Component({
  tag: 'edit-card',
  styleUrl: 'edit-card.css',
  shadow: false,
})
export class EditCard {
  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLEditCardElement;

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
   * The index of the current graphic
   */
  @Prop() graphicIndex = 0;

  //--------------------------------------------------------------------------
  //
  //  State (internal)
  //
  //--------------------------------------------------------------------------

  /**
   * boolean: When true a loading indicator will be shown while the editor loads
   */
  @State() _editorLoading = false;

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() _translations: typeof EditCard_T9n;

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

 /**
   * esri/core/Accessor: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Accessor.html#WatchHandle
   */
 protected _activeWorkflowHandle: __esri.WatchHandle;

 /**
   * esri/core/Accessor: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Accessor.html#WatchHandle
   */
 protected _addRelatedRecordHandle: __esri.WatchHandle;

  /**
   * esri/core/Accessor: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Accessor.html#WatchHandle
   */
  protected _attachmentHandle: __esri.WatchHandle;

  /**
   * esri/core/Accessor: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Accessor.html#WatchHandle
   */
  protected _editHandle: __esri.WatchHandle;

  /**
   * esri/core/Accessor: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Accessor.html#WatchHandle
   */
  protected _layerEditHandle: __esri.WatchHandle;

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
   * esri/layers/FeatureLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html
   */
  protected _layer: __esri.FeatureLayer;

  /**
   * HTMLDivElement: https://developer.mozilla.org/en-US/docs/Web/API/HTMLDivElement
   */
  protected _editContainer: HTMLDivElement;

  /**
   * any[]: Collection of edit controls created in "MULTI" edit mode
   * These can be calcite-input-text, calcite-input-number, calcite-input-date-picker, calcite-input-time-picker, or calcite-combobox
   */
  protected _editControlElements: any[];

  /**
   * boolean: When true edit controls will be disabled
   */
  protected _editingDisabled: boolean;

  /**
   * boolean: When true the Editor widget should be closed
   */
  protected _shouldClose = false;

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
   * Watch for changes to the graphics and update the feature widget
   */
  @Watch("graphics")
  async graphicsWatchHandler(): Promise<void> {
    if (this.graphics.length === 0) {
      await this._closeEdit();
    }
  }

  @Watch("open")
  async openWatchHandler(v: boolean): Promise<void> {
    if (v && this.graphics?.length > 0 && this.graphicIndex > -1) {
      this._editorLoading = true;
      await this._initEditorWidget();
      if (this.graphicIndex > -1 && this.graphics.length > 0 && this.open && !this._shouldClose) {
        await this._startUpdate();
      }
      this._editorLoading = false;
    }
    if (!v) {
      await this._closeEdit();
    }
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
   * Emitted on demand when the Editor widget should be closed
   */
  @Event() closeEdit: EventEmitter<void>;

  /**
   * Emitted on demand when edits are completed on current edit layer
   */
  @Event() editsComplete: EventEmitter<void>;

  @Listen("featureSelectionChange", { target: "window" })
  async featureSelectionChange(): Promise<void> {
    await this._closeEdit();
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
   * Special handeling when used with layer-table.
   * This allows us to only fetch graphics when the modal is opened rather than with every render of the layer-table.
   *
   * @returns Promise when complete
   */
  async componentWillRender(): Promise<void> {
    if (this.graphics?.length > 0 && this.graphics[0]?.layer) {
      this._layer = this.graphics[0].layer as __esri.FeatureLayer;
      if (this._layerEditHandle) {
        this._layerEditHandle.remove();
      }
      this._layerEditHandle = this._layer.on("edits", () => {
        this.editsComplete.emit();
        void this._closeEdit();
      });
    }
  }

  /**
   * Renders the component.
   */
  render() {
    // This is a temp workaround hopefully...this._editingDisabled should reflect the current state but does not
    // when you use MULTI edit mode...is fine in SINGLE
    const editDisabled = this.graphics?.length > 0 && this.graphics[0] ?
      !(this.graphics[0].layer as __esri.FeatureLayer).editingEnabled : true;
      const tableNodeClass = this._editorLoading ? "display-none" : "position-absolute";
      const loadingClass = this._editorLoading ? "" : "display-none";
    return (
      <Host>
        <div class="position-absolute">
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
          <div class="position-absolute" slot="content">
            <div
              class={tableNodeClass}
              id="feature-form"
              ref={(el) => this._editContainer = el}
            />
            <calcite-loader
              class={loadingClass}
              scale="s"
            />
          </div>
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
    const [Editor, reactiveUtils] = await loadModules([
      "esri/widgets/Editor",
      "esri/core/reactiveUtils"
    ]);
    this.Editor = Editor;
    this.reactiveUtils = reactiveUtils;
  }

  /**
   * Init the Editor widget so we can display the popup content
   *
   * @returns void
   */
  protected async _initEditorWidget(): Promise<void> {
    if (this.mapView && this.graphics && this.graphics.length > 0 && this.graphics[0]) {
      if (this._editor) {
        this._editor.destroy()
      }
      const container = document.createElement("div");
      const layers = await getAllLayers(this.mapView)
      const layerInfos = layers.map(layer => {
        return { layer } as __esri.LayerInfo
      });
      this._editor = new this.Editor({
        allowedWorkflows: "update",
        view: this.mapView,
        layerInfos,
        visibleElements: {
          snappingControls: false,
          sketchTooltipControls: false
        },
        container
      });

      if (this._editHandle && this._attachmentHandle && this._activeWorkflowHandle) {
        this._editHandle.remove();
        this._attachmentHandle.remove();
        this._activeWorkflowHandle.remove();
      }

      this._attachmentHandle = this.reactiveUtils.when(
        () => this._editor.viewModel.state === "adding-attachment" ||
          this._editor.viewModel.state === "editing-attachment" ||
          this._editor.viewModel.state === "creating-features",
        () => {
          this._shouldClose = false;
        }
      );

      this._editHandle = this.reactiveUtils.when(
        () => this._editor.viewModel.state === "ready",
        () => {
          if (this._shouldClose) {
            void this._closeEdit();
          } else if (this.graphicIndex > -1 && this.graphics.length > 0 && this.open && !this._shouldClose) {
            void this._startUpdate();
          }
        }
      );

      this._activeWorkflowHandle = this.reactiveUtils.watch(
        () => (this._editor.viewModel.activeWorkflow as any)?.activeWorkflow,
        (activeWorkflow) => {
          if (activeWorkflow?.type === "update-table-record" || activeWorkflow?.type === "create-features") {
            this._shouldClose = false;
          }
        }
      );

      // had issues with destroy before adding like this
      this._editContainer.appendChild(container);
    }
  }

  /**
   * Close the edit widget
   *
   * @returns void
   */
  protected async _closeEdit(): Promise<void> {
    this._shouldClose = true;
    if (this._editor?.activeWorkflow) {
      await this._editor?.cancelWorkflow();
    }
    this._editor?.destroy();
    this._shouldClose = false;
    this.closeEdit.emit();
  }

  /**
   * Start the update workflow for the editor widget
   *
   * @returns void
   */
  protected async _startUpdate(): Promise<void> {
    await this._editor.startUpdateWorkflowAtFeatureEdit(this.graphics[this.graphicIndex]);
    this._shouldClose = true;
  }

  /**
   * Fetches the component's translations
   *
   * @returns Promise when complete
   */
  protected async _getTranslations(): Promise<void> {
    const messages = await getLocaleComponentStrings(this.el);
    this._translations = messages[0] as typeof EditCard_T9n;
  }

}
