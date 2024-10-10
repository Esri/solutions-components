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

import { Component, Element, EventEmitter, Prop, Fragment, h, Event, Watch, Method, State } from "@stencil/core";
import { loadModules } from "../../utils/loadModules";
import { getAllLayers, getLayerOrTable } from "../../utils/mapViewUtils";
import CreateFeature_T9n from "../../assets/t9n/create-feature/resources.json";
import { ILayerSourceConfigItem, ILocatorSourceConfigItem, ISearchConfiguration } from "../../utils/interfaces";
import { getLocaleComponentStrings } from "../../utils/locale";

type ICurrentPage = "templatePicker" | "drawing" | "featureForm";

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

  /**
   * boolean: When true the application will be in mobile mode, controls the mobile or desktop view
   */
  @Prop() isMobile: boolean;

  /**
   * string: selected floor level
   */
  @Prop() floorLevel: string;

  /**
   * string: selected floor level
   */
  @Prop() formElements: any;

  /**
   * boolean: When true the Search box will be displayed
   */
  @Prop() enableSearch?: boolean = false;

  /**
   * boolean: When true the notice message with the current state should be shown
   */
  @Prop() showGuidingMsg?: boolean = true;

  /**
   * boolean: When false the notice message at drawing page will be hidden
   */
  @Prop() showGuidingMsgWhileDrawing?: boolean = true;

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
   * ICurrentPage: specifies the current page
   */
  @State() _currentPage: ICurrentPage = "templatePicker";

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() _translations: typeof CreateFeature_T9n;

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
   * esri/form/ExpressionInfo: https://developers.arcgis.com/javascript/latest/api-reference/esri-form-ExpressionInfo.html
   * The ExpressionInfo constructor
   */
  protected ExpressionInfo: typeof import("esri/form/ExpressionInfo");

  /**
   * esri/form/elements/FieldElement: https://developers.arcgis.com/javascript/latest/api-reference/esri-form-elements-FieldElement.html
   * The FieldElement constructor
   */
  protected FieldElement: typeof import("esri/form/elements/FieldElement");

  /**
   * esri/form/FormTemplate: https://developers.arcgis.com/javascript/latest/api-reference/esri-form-FormTemplate.html
   */
  protected FormTemplate: typeof import("esri/form/FormTemplate");

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
   * esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   * The MapView instance
   */
  protected MapView: typeof import("esri/views/MapView");

  /**
   * esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   * Updated map view instance
   */
  protected _updatedMapView: __esri.MapView;

  /**
   * esri/widgets/Search: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html
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
   * HTMLDivElement: The node for the map view
   */
  protected _mapViewContainer: HTMLDivElement;

  /**
   * boolean: Flag to maintain form submission using submit button
   */
  protected _isSubmitBtnClicked = false;

  /**
   * __esri.FeatureLayer: selected feature layer;
   */
  protected _selectedLayer: __esri.FeatureLayer;

  /**
   * HTMLDivElement: refrence for search div element
   */
  protected _searchDiv: HTMLDivElement;

  /**
   * HTMLCalciteNoticeElement: calcite notice refrence element
   */
  protected _calciteNotice: HTMLCalciteNoticeElement;

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
   * Called each time when isMobile prop is changed.
   */
  @Watch("isMobile")
  async isMobileHandler(): Promise<void> {
    // emit an event when mode is changed to back to the feature selection panel (to avoid multiple maps conflict)
    this.modeChanged.emit();
  }

  /**
   * When _editorLoading is true the container node will be hidden while starting the create workflow
   */
  @Watch("_editorLoading")
  async _editorLoadingWatchHandler(v: boolean): Promise<void> {
    if (v) {
      this._container?.classList.add("display-none");
      if (this._selectedLayer?.isTable) {
        const template = this._selectedLayer.templates[0];
        const creationInfo = {
          layer: this._selectedLayer,
          template
        };
        await this._editor.startCreateFeaturesWorkflowAtFeatureCreation(creationInfo);
        await this.hideEditorsElements();
      } else {
        await this.startCreate();
      }
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

  /**
   * refresh the feature form
   * @returns Promise that resolves when the operation is complete
   */
  @Method()
  async refresh(floorLevel: string): Promise<void> {
    if (this._editor) {
      void this._setFloorLevel(floorLevel);
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

  /**
   * Emitted on switched form mobile to desktop or vice versa
   */
  @Event() modeChanged: EventEmitter<void>;

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
    await this._getTranslations();
    await this.initModules();
  }

  /**
   * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
   */
  async componentDidLoad() {
    await this.init();
  }

  /**
   * Called after each render
   * Used to adjust the map top in case of mobile
   */
  componentDidRender() {
    // update the map top according to space occupied by notice msg and search
    if (this.isMobile) {
      // get the height of notice, search and add 80px(editor msg) height to adjust the map top 
      const top = this._calciteNotice.offsetHeight + this._searchDiv.offsetHeight  + 80;
      this._mapViewContainer.style.top = `${top}px`;
    }
  }

  /**
   * StencilJS: Called every time the component is disconnected from the DOM,
   */
  disconnectedCallback(): void {
    if (this._editor) {
      this._editor.destroy();
    }
  }

  /**
   * Renders the component.
   */
  render() {
    const showSearchWidget = this._currentPage === 'drawing' ? "" : "display-none";
    const loaderClass = this._editorLoading ? "" : "display-none";
    const featureFormClass = this._editorLoading ? "display-none" : "";
    const mobileMapClass = this.isMobile ? "show-map" : "display-none";
    // hide guiding msg for drawing page when showGuidingMsgWhileDrawing is false
    const showGuidingMsg = this.showGuidingMsg && (this.showGuidingMsgWhileDrawing || this._currentPage !== "drawing");
    let guidingMsg = this._translations.chooseCategoryMsg;
    if (this._currentPage === 'drawing') {
      guidingMsg = this._translations.provideLocationMsg;
    } else if (this._currentPage === 'featureForm') {
      guidingMsg = this._translations.provideDetailsMsg;
    }
    return (
      <Fragment>
        {showGuidingMsg && <calcite-notice
          class="notice-msg"
          icon="lightbulb"
          kind="success"
          open
          ref={el => this._calciteNotice = el}>
          <div slot="message">{guidingMsg}</div>
        </calcite-notice>}
        <calcite-loader
          class={loaderClass}
          label=""
          scale="s"
        />
        <div class={featureFormClass} id="feature-form" />
        {this.enableSearch &&
          <div class={`search-widget ${showSearchWidget} ${featureFormClass}`}
            id="search-widget-ref"
            ref={el => this._searchDiv = el} />}
        <div class={`${mobileMapClass}`} ref={(el) => { this._mapViewContainer = el }} />
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
      this._updatedMapView = this.mapView;
      // In mobile mode show the map in panel
      await (this.isMobile ? this.createMobileMapView() : this._loadWidgets());
    }
  }

  /**
   * Load esri javascript api modules
   * @returns Promise resolving when function is done
   * @protected
   */
  protected async initModules(): Promise<void> {
    const [Editor, reactiveUtils, Search, ExpressionInfo, FieldElement, FormTemplate, MapView] = await loadModules([
      "esri/widgets/Editor",
      "esri/core/reactiveUtils",
      "esri/widgets/Search",
      "esri/form/ExpressionInfo",
      "esri/form/elements/FieldElement",
      "esri/form/FormTemplate",
      "esri/views/MapView"
    ]);
    this.Editor = Editor;
    this.reactiveUtils = reactiveUtils;
    this.Search = Search;
    this.ExpressionInfo = ExpressionInfo;
    this.FieldElement = FieldElement;
    this.FormTemplate = FormTemplate;
    this.MapView = MapView;
  }

  /**
   * updates the map view (in case of mobile)
   * @protected
   */
  protected async createMobileMapView(): Promise<void> {
    this._mapViewContainer.classList.add('hide-map');
    await new this.MapView({
      map: this.mapView.map,
      container: this._mapViewContainer,
      zoom: this.mapView.zoom
    }).when((view: __esri.MapView) => {
      // update the mapView and load all widgets
      this._updatedMapView = view;
      void this._loadWidgets();
    }, (e) => {
      console.log(e);
    });
  }

  /**
   * Loads the Editor and Search widgets
   * @protected
   */
  protected async _loadWidgets(): Promise<void> {
    await this.createEditorWidget();
    if (this.enableSearch) {
      await this.createSearchWidget();
    }
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
    const allMapLayers = await getAllLayers(this._updatedMapView);
    this._selectedLayer = await getLayerOrTable(this.mapView, this.selectedLayerId);
    // if layer is selected then only use the layerInfos while initializing the editor widget
    if (!this._selectedLayer?.isTable) {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      allMapLayers.forEach(async (eachLayer: __esri.FeatureLayer) => {
        layerInfos.push({
          layer: eachLayer,
          enabled: eachLayer?.type === "feature" && eachLayer?.id === this.selectedLayerId,
          addEnabled: true, // default is true, set to false to disable the ability to add a new feature
          updateEnabled: false, // if true, enable ability to edit an existing feature
          deleteEnabled: false // default is true, set to false to disable the ability to delete features
        })
      });
    }

    this._editor = new this.Editor({
      view: this._updatedMapView,
      layerInfos: layerInfos,
      visibleElements: {
        snappingControls: false,
        createFeaturesSection: true,
        editFeaturesSection: false
      },
      container: this._container
    });
    if (this._mapViewContainer) {
      this.el.insertBefore(this._container, this._mapViewContainer);
    } else {
      this.el.appendChild(this._container);
    }

    //Add handle to watch if attachments are added/edited
    const attachmentHandle = this.reactiveUtils.watch(
      () => this._editor.viewModel.state,
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
      () => this._editor.viewModel.featureTemplatesViewModel.state,
      (state) => {
        if (state === 'ready' && this._editor.viewModel?.activeWorkflow?.type !== "create-features") {
          this.progressStatus.emit(0.5);
          this._editorLoading = true;
        }
      });
    this._editor.viewModel.addHandles(handle);

    //Add handle to watch featureFormViewModel ready state
    const formHandle = this.reactiveUtils.watch(
      () => this._editor.viewModel.featureFormViewModel?.state,
      (state) => {
        if (state === 'ready') {
          this._mapViewContainer?.classList?.replace("show-map", "hide-map");
          this._editor.viewModel.featureFormViewModel.on('submit', this.submitted.bind(this));
          void this._setFloorLevel(this.floorLevel);
          this._currentPage = 'featureForm';
          this.progressStatus.emit(1);
          this.drawComplete.emit();
        }
      });
    this._editor.viewModel.addHandles(formHandle);

    //Add handle to watch editor viewmodel state and then show the search widget
    const createFeatureHandle = this.reactiveUtils.watch(
      () => this._editor.viewModel.state,
      (state) => {
        if (state === 'creating-features') {
          if (this._editor.viewModel.featureFormViewModel.state === 'disabled') {
            this._mapViewContainer?.classList?.replace("hide-map", "show-map");
            if (this._selectedLayer && !this._selectedLayer.isTable) {
              this._currentPage = 'drawing';
            }
          }
        }
      });
    this._editor.viewModel.addHandles(createFeatureHandle);
  }

  /**
   * Start creating the feature
   * @protected
   */
  protected async startCreate(): Promise<void> {
    // hides the header elements on template picker page
    await this.hideEditorsElements();
    return new Promise<any>((resolve, reject) => {
      if (this._editor.viewModel.featureTemplatesViewModel.items?.length) {
        const items: __esri.TemplateItem[] = this._editor.viewModel.featureTemplatesViewModel.items[0].get("items");
        //once the feature template is selected handle the event for formSubmit and sketch complete
        //also, hide the headers and footer in the editor as we will be showing our own submit and cancel button
        this._editor.viewModel.featureTemplatesViewModel.on('select', () => {
          this.progressStatus.emit(0.75);
          setTimeout(() => {
            //hides the header and footer elements in editor widget
            this.hideEditorsElements().then(() => {
              resolve({});
            }, e => reject(e));
          }, 700);
        });
        //if only one feature template then directly start geometry creation for that
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
      view: this._updatedMapView,
    };
    if (this.searchConfiguration) {
      const searchConfiguration = this._getSearchConfig(this.searchConfiguration, this._updatedMapView);
      searchOptions = {
        ...searchConfiguration
      }
    }
    this._search = new this.Search(searchOptions);
    this._search.container = 'search-widget-ref';
    this._search.popupEnabled = false;
    this._search.resultGraphicEnabled = false;

    let pointGeometry = null;
    // on search get the geometry of the searched location and pass it in sketchViewModel and go to featureForm page
    this._search.on('search-complete', (e) => {
      void this._updatedMapView.goTo(e.results[0].results[0].extent);
      if (this._selectedLayer.geometryType === 'point') {
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
   * Add the floor level value to form
   * @param level selected floor level
   *
   * @protected
   */
  protected async _setFloorLevel(level: string): Promise<void> {
    if (!level) {
      return;
    }
    const layer = this._selectedLayer;
    if (layer?.floorInfo?.floorField) {
      const layerField = layer.fields.find((field) => field.name === layer.floorInfo.floorField);
      // if layer field is present and form template is not present only then we can set value of floorfield into feature form otherwise create a mannual formtemplate to add the floorfeild element
      if (layerField && !layer?.formTemplate) {
        this._editor.viewModel.featureFormViewModel.setValue(layerField.name, level);
        layerField.editable = false;
      } else if (layer.formTemplate && this.formElements) {
        const floorInfoExpression = new this.ExpressionInfo({
          expression: `"${level}"`,
          name: "floor-info-test",
          title: "Floor Info",
          returnType: "string"
        });
        const levelIdFieldElement = new this.FieldElement({
          label: layer.floorInfo.floorField,
          editableExpression: 'false',
          fieldName: layer.floorInfo.floorField,
          input: {
            type: "text-box",
            maxLength: 50,
            minLength: 0
          },
          valueExpression: floorInfoExpression.name
        });
        this._updatedMapView.map.editableLayers.forEach((layer: __esri.FeatureLayer) => {
          const orgElements = this.formElements.orgElements;
          const orgExpressionInfos = this.formElements.orgExpressionInfos;
          const elements = [...orgElements];
          elements.push(levelIdFieldElement);
          // Creating formtemplate
          const floorInfoTemplate = new this.FormTemplate({
            title: layer.formTemplate.title,
            description: layer.formTemplate.description,
            elements,
            expressionInfos: [floorInfoExpression].concat(orgExpressionInfos)
          });
          layer.formTemplate = floorInfoTemplate;
        });
      }
    }
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

  /**
   * Fetches the component's translations
   * @returns Promise when complete
   * @protected
   */
  protected async _getTranslations(): Promise<void> {
    const messages = await getLocaleComponentStrings(this.el);
    this._translations = messages[0] as typeof CreateFeature_T9n;
  }
}
