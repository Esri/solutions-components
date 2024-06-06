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

import { Component, Element, EventEmitter, Prop, Fragment, h, Event, Watch, Method, State} from "@stencil/core";
import { loadModules } from "../../utils/loadModules";
import { getAllLayers, getLayerOrTable } from "../../utils/mapViewUtils";
import { ILayerSourceConfigItem, ILocatorSourceConfigItem, ISearchConfiguration } from "../../utils/interfaces";

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

  /**
   * ISearchConfiguration: Configuration details for the Search widget
   */
  @Prop() searchConfiguration: ISearchConfiguration;

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
   * boolean: When true the search widget will shown
   */
  @State() _showSearchWidget: boolean;

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
   * https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html
   * The Feature layer instance
   */
  protected FeatureLayer: typeof import("esri/layers/FeatureLayer");

  /**
   * "esri/widgets/Search": https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html
   * The Search instance
   */
  protected Search: typeof import("esri/widgets/Search");

  /**
   * "esri/widgets/Search": https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html
   * The Search instance
   */
  protected _search: __esri.widgetsSearch;

  /**
   * esri/core/reactiveUtils: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-reactiveUtils.html
   */
  protected reactiveUtils: typeof import("esri/core/reactiveUtils");

  /**
   * boolean: Flag to maintain the add attachment
   */
  protected _addingAttachment: boolean

  /**
   * HTMLDivElement: The node the editor will be added to
   */
  protected _container: HTMLDivElement;

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

  /**
   * Emitted on demand when editor panel changes
   */
  @Event() progressStatus: EventEmitter<number>;

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
    const showSearchWidget = this._showSearchWidget ? '' : 'display-none';
    const loaderClass = this._editorLoading ? "" : "display-none";
    const featureFormClass = this._editorLoading ? "display-none" : "";
    return (
      <Fragment>
        <calcite-loader
          class={loaderClass}
          label=""
          scale="s"
        />
        <div class={featureFormClass} id="feature-form"/>
        <div class={`search-widget ${showSearchWidget} ${featureFormClass}`} id="search-widget-ref"/>
      </Fragment>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * Init Editor widget and Search widget
   */
  protected async init(): Promise<void> {
    if (this.mapView && this.selectedLayerId) {
      await this.createEditorWidget();
      await this.createSearchWidget();
    }
  }

  /**
   * Load esri javascript api modules
   * @returns Promise resolving when function is done
   * @protected
   */
  protected async initModules(): Promise<void> {
    const [Editor, reactiveUtils, Search] = await loadModules([
      "esri/widgets/Editor",
      "esri/core/reactiveUtils",
      "esri/widgets/Search"
    ]);
    this.Editor = Editor;
    this.reactiveUtils = reactiveUtils;
    this.Search = Search;
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
    this._container = document.createElement("div");
    this._container?.classList.add("display-none");
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
      container: this._container
    });
    this.el.appendChild(this._container);

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
        if(state === 'ready') {
          this.progressStatus.emit(0.5);
          this._editorLoading = true;
        }
      });
    this._editor.viewModel.addHandles(handle);

    //Add handle to watch editor viewmodel state and then show the search widget
    const formHandle = this.reactiveUtils.watch(
      () =>  this._editor.viewModel.state,
      (state) => {
        if(state === 'creating-features'){
          this._editorLoading = true;
          this._showSearchWidget = true;
        }
      });
    this._editor.viewModel.addHandles(formHandle);
  }

  /**
   * Start creating the feature
   * @protected
   */
  protected async startCreate(): Promise<void> {
    return new Promise<any>((resolve, reject) => {
      if (this._editor.viewModel.featureTemplatesViewModel.items?.length) {
        const items: __esri.TemplateItem[] = this._editor.viewModel.featureTemplatesViewModel.items[0].get("items");
        //once the feature template is selected handle the event for formSubmit and sketch complete
        //also, hide the headers and footer in the editor as we will be showing our own submit and cancel button
        this._editor.viewModel.featureTemplatesViewModel.on('select', () => {
          this.progressStatus.emit(0.75);
          setTimeout(() => {
            //on form submit
            this._editor.viewModel.featureFormViewModel.on('submit', this.submitted.bind(this));
            //on sketch complete emit the event
            this._editor.viewModel.sketchViewModel.on("create", (evt) => {
              if (evt.state === "complete") {
                this._showSearchWidget = false;
                this.progressStatus.emit(1);
                this.drawComplete.emit();
              }
            })
            //hides the header and footer elements in editor widget
            this.hideEditorsElements().then(() => {
              resolve({});
            }, e => reject(e));
          }, 700);
        });
        //if only one feature template then directly start geometry creation for that
        //else allow feature template selection to user
        if (items.length === 1) {
          this._editor.viewModel.featureTemplatesViewModel.select(items[0]);
        }
        const resolvePromise = items.length > 1;
        this.hideEditorsElements().then(() => {
          if (resolvePromise) {
            resolve({});
          }
        }, e => resolvePromise && reject(e));
      }
    });
  }

  /**
   * Display search widget to search location
   * @protected
   */
  protected async createSearchWidget(): Promise<void> {
    let searchOptions: __esri.widgetsSearchProperties = {
      view: this.mapView,
    };
    if (this.searchConfiguration) {
      const searchConfiguration = this._getSearchConfig(this.searchConfiguration, this.mapView);
      searchOptions = {
        ...searchConfiguration
      }
    }
    this._search = new this.Search(searchOptions);
    this._search.container = 'search-widget-ref';
    this._search.popupEnabled = false;
    this._search.resultGraphicEnabled = false;

    const layer = await getLayerOrTable(this.mapView, this.selectedLayerId);
    let pointGeometry = null;
    // on search get the geometry of the searched location and pass it in sketchViewModel and go to featureForm page
    this._search.on('search-complete', (e) => {
      void this.mapView.goTo(e.results[0].results[0].extent);
      if (layer.geometryType === 'point') {
        pointGeometry = e.results[0].results[0]?.feature.geometry;
      }
    });

    //Add handle to watch if search viewModel state is ready
    const createFeatureHandle = this.reactiveUtils.watch(
      () => this._search.viewModel.state,
      (state) => {
        if (state === 'ready') {
          setTimeout(() => {
            if (this._editor.viewModel.sketchViewModel.createGraphic && pointGeometry) {
              this._editor.viewModel.sketchViewModel.createGraphic.set('geometry', pointGeometry);
              this._editor.viewModel.sketchViewModel.complete();
              void this.hideEditorsElements();
            }
          }, 100);
        }
      });
    this._search.viewModel.addHandles(createFeatureHandle);
  }

  /**
   * Initialize the search widget based on user defined configuration
   *
   * @param searchConfiguration search configuration defined by the user
   * @param view the current map view
   *
   * @protected
   */
  protected _getSearchConfig(
    searchConfiguration: ISearchConfiguration,
    view: __esri.MapView
  ): ISearchConfiguration {
    const INCLUDE_DEFAULT_SOURCES = "includeDefaultSources";
    const sources = searchConfiguration.sources;

    if (sources?.length > 0) {
      searchConfiguration[INCLUDE_DEFAULT_SOURCES] = false;

      sources.forEach((source) => {
        const isLayerSource = source.hasOwnProperty("layer");
        if (isLayerSource) {
          const layerSource = source as ILayerSourceConfigItem;
          const layerId = layerSource.layer?.id;
          const layerFromMap = layerId ? view.map.findLayerById(layerId) : null;
          const layerUrl = layerSource?.layer?.url;
          if (layerFromMap) {
            layerSource.layer = layerFromMap as __esri.FeatureLayer;
          } else if (layerUrl) {
            layerSource.layer = new this.FeatureLayer(layerUrl as any);
          }
        }
      });

      sources?.forEach((source) => {
        const isLocatorSource = source.hasOwnProperty("locator");
        if (isLocatorSource) {
          const locatorSource = (source as ILocatorSourceConfigItem);
          if (locatorSource?.name === "ArcGIS World Geocoding Service") {
            const outFields = locatorSource.outFields || ["Addr_type", "Match_addr", "StAddr", "City"];
            locatorSource.outFields = outFields;
            locatorSource.singleLineFieldName = "SingleLine";
          }

          locatorSource.url = locatorSource.url;
          delete locatorSource.url;
        }
      });
    } else {
      searchConfiguration = {
        ...searchConfiguration,
        includeDefaultSources: true
      }
    }
    return searchConfiguration;
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
      this.el.querySelector('.esri-editor').querySelectorAll('calcite-flow-item')?.forEach((flowItem) => {
        const article = flowItem.shadowRoot?.querySelector('calcite-panel')?.shadowRoot?.querySelector('article');
        //hide the header
        article?.querySelector('header')?.setAttribute('style', 'display: none');
        //hide the footer
        article?.querySelector('footer')?.setAttribute('style', 'display: none');
      });
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
