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

import { Component, Element, Event, EventEmitter, Host, h, Prop, State, Watch } from "@stencil/core";
import { loadModules } from "../../utils/loadModules";
import EditCard_T9n from "../../assets/t9n/edit-card/resources.json"
import { getLocaleComponentStrings } from "../../utils/locale";
import { EEditMode } from "../../utils/interfaces";

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
  @Prop() editMode: EEditMode = EEditMode.UPDATE;

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
   * esri/widgets/Editor: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Accessor.html#WatchHandle
   */
  protected _attachmentHandle: __esri.WatchHandle;

  /**
   * esri/widgets/Editor: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Accessor.html#WatchHandle
   */
  protected _editHandle: __esri.WatchHandle;

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

  protected _notice: HTMLCalciteNoticeElement;

  protected _isCreatingFeatures = false;
  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------

  /**
   * Watch for changes to the editMode and update the editor widget
   */
  @Watch("editMode")
  editModeWatchHandler(): void {
    console.log("editModeWatchHandler")
    this._initEditorWidget();
  }

  /**
   * Watch for changes to the graphics and update the editor widget
   */
  @Watch("graphicIndex")
  graphicIndexWatchHandler(): void {
    this._initEditorWidget();
  }

  /**
   * Watch for changes to the graphics and update the editor widget
   */
  @Watch("graphics")
  graphicsWatchHandler(): void {
    this._initEditorWidget();
  }

  /**
   * Watch for changes to the mapView and re-init the editor widget
   */
  @Watch("mapView")
  mapViewWatchHandler(): void {
    this._initEditorWidget();
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
    if (layerTableElements.length === 1) {
      const layerTable: HTMLLayerTableElement = layerTableElements[0] as HTMLLayerTableElement;
      this.graphics = await layerTable.getSelectedGraphics();
      const layerView = await layerTable.getLayerView();
      this._layer = layerView?.layer;
    }
  }

  componentDidRender(): void {
    if (this._notice && !this._layer?.editingEnabled) {
      this._notice.open = true;
    }
  }

  componentShouldUpdate(n: any, o:any, name: any): boolean {
    console.log("=======================================componentShouldUpdate==================================================")
    console.log(`new: ${n}`)
    console.log(`old: ${o}`)
    console.log(`name: ${name}`)
    return true;
  }

  /**
   * Renders the component.
   */
  render() {
    // This is a temp workaround hopefully...this._editingDisabled should reflect the current state but does not
    // when you use MULTI edit mode...is fine in SINGLE
    const editDisabled = !this._layer?.editingEnabled;
    //const backButtonClass = editDisabled ? "" : "display-none";
    //const backButtonClass = "";

    // console.log("this.editMode")
    // console.log(this.editMode)
    // console.log("this._isCreatingFeatures")
    // console.log(this._isCreatingFeatures)
    // console.log("this._editor?.viewModel.syncing")
    // console.log(this._editor?.viewModel.syncing)

    //let backButtonClass = "";
    //let backButtonContainerClass = "display-flex";

    console.log("=======================================RENDER==================================================")
    console.log(`this._isCreatingFeatures: ${this._isCreatingFeatures}`)

    console.log(`this._featureTemplatesViewModelState: ${this._featureTemplatesViewModelState}`)
    console.log(`this._editor.viewModel.featureTemplatesViewModel.state: ${this._editor?.viewModel?.featureTemplatesViewModel.state}`)

    console.log(`this._sketchViewModelState: ${this._sketchViewModelState}`)
    console.log(`this._editor.viewModel.sketchViewModel.state: ${this._editor?.viewModel?.sketchViewModel.state}`)

    console.log(`this._featureFormViewModelState: ${this._featureFormViewModelState}`)
    console.log(`this._editor.viewModel.featureFormViewModel.state: ${this._editor?.viewModel?.featureFormViewModel.state}`)

    if (this.editMode === EEditMode.ADD && (
      (this._isCreatingFeatures && this._featureTemplatesViewModelState === "ready") ||
      (this._sketchViewModelState === "active" && this._isCreatingFeatures) ||
      this._sketchViewModelState === "ready"
    )) {
      console.log("Show back button")
    } else {
      //backButtonClass = "display-none";
      //backButtonContainerClass = "display-none";
      console.log("DO NOT Show back button")
    }
    return (
      <Host>
        <div class="position-relative">
          {
            editDisabled ? (
              <calcite-notice
                closable={true}
                kind="warning"
                onCalciteNoticeClose={() => this._closeEdit()}
                open={true}
                ref={(el) => this._notice = el}
                width="full"
              >
                <div slot="message">
                  {this._translations.enableEditing}
                </div>
              </calcite-notice>
            ) : ((this.editMode === EEditMode.ADD && !this._isCreatingFeatures) || this.editMode === EEditMode.UPDATE) ? (
                <div
                  id="feature-form"
                  ref={(el) => this._editContainer = el}
                />
            ) : (
                  <div>
                    <calcite-action
                      appearance="solid"
                      aria-label="Back"
                      class={"back-button hydrated"}
                      icon="chevron-left" // needs to handle rtl
                      //onClick={() => this._backClicked()}
                      scale="s"
                      text=""
                    />
                    <div
                      id="feature-form"
                      ref={(el) => this._editContainer = el}
                    />
                  </div>
            )
          }
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
  protected _initEditorWidget(): void {
    //console.log("_initEditorWidget")
    if (this.mapView && this._editContainer && (this.graphics && (this.graphics.length > 0 && this.graphics[0]) || this.editMode === EEditMode.ADD) ) {
    //console.log("IN _initEditorWidget")

      if (this._editor) {
        this._editor.destroy()
      }
      console.log(this.editMode === EEditMode.UPDATE ? "update" : "create-features")
      const container = document.createElement("div");
      this._editor = new this.Editor({
        allowedWorkflows: this.editMode === EEditMode.UPDATE ? "update" : "create-features",
        layerInfos: this.editMode === EEditMode.ADD ? [{
          layer: this._layer,
          attachmentsOnUpdateEnabled: false
        }] : undefined,
        view: this.mapView,
        visibleElements: {
          snappingControls: false,
          sketchTooltipControls: false
        },
        container
      });

      if (this._editHandle && this._attachmentHandle) {
        this._editHandle.remove();
        this._attachmentHandle.remove();
      }

      this._attachmentHandle = this.reactiveUtils.when(
        () => this._editor.viewModel.state === "adding-attachment" || this._editor.viewModel.state === "editing-attachment",
        () => {
          this._shouldClose = false;
        }
      );

      this._editHandle = this.reactiveUtils.when(
        () => this._editor.viewModel.state === "ready",
        () => {
          if (this._shouldClose) {
            this._closeEdit();
          }
          if (this.editMode === EEditMode.UPDATE && this.graphicIndex > -1 && this.graphics.length > 0 && this.open && !this._shouldClose) {
            void this._editor.startUpdateWorkflowAtFeatureEdit(this.graphics[this.graphicIndex]);
            this._shouldClose = true;
          }
        }
      );

      this.reactiveUtils.when(
        () => this._editor.viewModel.state === "editing-new-feature",
        () => {
          console.log("editing-new-feature")
        }
      );

      this.reactiveUtils.when(
        () => this._editor.viewModel.state === "editing-existing-feature",
        () => {
          console.log("editing-existing-feature")
        }
      );

      this.reactiveUtils.when(
        () => this._editor.viewModel.state === "awaiting-update-feature-candidate",
        () => {
          console.log("awaiting-update-feature-candidate")
        }
      );

      this.reactiveUtils.when(
        () => this._editor.viewModel.state === "awaiting-feature-creation-info",
        () => {
          console.log("awaiting-feature-creation-info")
        }
      );

      this.reactiveUtils.when(
        () => this._editor.viewModel.state === "awaiting-feature-to-update",
        () => {
          console.log("awaiting-feature-to-update")
        }
      );

      this.reactiveUtils.when(
        () => this._editor.viewModel.state === "awaiting-feature-to-create",
        () => {
          console.log("awaiting-feature-to-create")
        }
      );

      this.reactiveUtils.when(
        () => this._editor.viewModel.state === "creating-features",
        () => {
          this._isCreatingFeatures = true;
          console.log("creating-features")
        }
      );

      this.reactiveUtils.when(
        () => this._editor.viewModel.featureTemplatesViewModel.state === "disabled",
        () => {
          this._featureTemplatesViewModelState = "disabled";
          console.log("featureTemplatesViewModel disabled")
        }
      );

      this.reactiveUtils.when(
        () => this._editor.viewModel.featureTemplatesViewModel.state === "ready",
        () => {
          this._featureTemplatesViewModelState = "ready";
          console.log("featureTemplatesViewModel ready")
        }
      );

      this.reactiveUtils.when(
        () => this._editor.viewModel.featureTemplatesViewModel.state === "loading",
        () => {
          this._featureTemplatesViewModelState = "loading";
          console.log("featureTemplatesViewModel loading")
        }
      );

      this.reactiveUtils.when(
        () => this._editor.viewModel.featureFormViewModel.state === "disabled",
        () => {
          this._featureFormViewModelState = "disabled";
          console.log("featureFormViewModel disabled")
        }
      );

      this.reactiveUtils.when(
        () => this._editor.viewModel.featureFormViewModel.state === "ready",
        () => {
          this._featureFormViewModelState = "ready";
          console.log("featureFormViewModel ready")
        }
      );

      this.reactiveUtils.when(
        () => this._editor.viewModel.sketchViewModel.state === "active",
        () => {
          this._sketchViewModelState = "active";
          this._isCreatingFeatures = true;
          console.log("sketchViewModel active")
        }
      );

      this.reactiveUtils.when(
        () => this._editor.viewModel.sketchViewModel.state === "disabled",
        () => {
          this._sketchViewModelState = "disabled";
          this._isCreatingFeatures = false;
          console.log("sketchViewModel disabled")
        }
      );

      this.reactiveUtils.when(
        () => this._editor.viewModel.sketchViewModel.state === "ready",
        () => {
          this._sketchViewModelState = "ready";
          this._isCreatingFeatures = false;
          console.log("sketchViewModel ready")
        }
      );

      this._editor.viewModel.featureFormViewModel.on("value-change", () => {
        this._featureFormViewModelState = "value-change";
        console.log("featureFormViewModel value-change")
      })

      this._editor.viewModel.featureFormViewModel.on("submit", () => {
        this._featureFormViewModelState = "submit";
        console.log("featureFormViewModel submit")
      })

      this._editor.viewModel.featureTemplatesViewModel.on("select", () => {
        this._featureTemplatesViewModelState = "select"
        console.log("featureFormViewModel select")
      });

      // had issues with destroy before adding like this
      this._editContainer.appendChild(container);
    }
  }

  protected _featureFormViewModelState: "select" | "ready" | "disabled" | "value-change" | "submit";

  protected _sketchViewModelState: "ready" | "active" | "disabled";

  protected _featureTemplatesViewModelState: "ready" | "disabled" | "loading" | "select";

  protected _closeEdit(): void {
    this.closeEdit.emit();
    this._shouldClose = false;
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
