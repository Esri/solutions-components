import { Component, Element, Prop, Host, h, Watch, State} from "@stencil/core";
import { loadModules } from "../../utils/loadModules";
import { getAllLayers } from "../../utils/mapViewUtils";

@Component({
  tag: "create-feature",
  styleUrl: "create-feature.css",
  shadow: false,
})
export class CreateFeature {

  @Element() el: HTMLCreateFeatureElement;

  @Prop() mapView: __esri.MapView;

  @Prop() selectedLayerId: string;

  @State() _editorLoading = false;

  protected Editor: typeof import("esri/widgets/Editor");

  protected _editor: __esri.Editor;

  protected FeatureLayer: typeof import("esri/layers/FeatureLayer");

  protected MapView: typeof import("esri/views/MapView");

  protected reactiveUtils: typeof import("esri/core/reactiveUtils");

  protected _container: HTMLDivElement;

  protected _mapViewContainer: HTMLDivElement;

  @Watch("_editorLoading")
  async _editorLoadingWatchHandler(v: boolean): Promise<void> {
    console.log(`_editorLoadingWatchHandler: ${v}`)
    if (v) {
      void this.startCreate();
      this._editorLoading = false;
    }
  }

  async componentWillLoad(): Promise<void> {
    await this.initModules();
  }

  async componentDidLoad() {
    if (this.mapView && this.selectedLayerId) {
      await this.createEditorWidget();
    }
  }

  render() {
    return (<Host><div id="feature-form"/></Host>);
  }

  protected async initModules(): Promise<void> {
    const [Editor, reactiveUtils, MapView] = await loadModules([
      "esri/widgets/Editor",
      "esri/core/reactiveUtils",
      "esri/views/MapView"
    ]);
    this.Editor = Editor;
    this.reactiveUtils = reactiveUtils;
    this.MapView = MapView;
  }

  protected async createEditorWidget(): Promise<void> {
    if (this._editor) {
      this._editor.destroy();
    }
    const layerInfos = []
    this._container = document.createElement("div");
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

    // THIS MAKES IT NOT WORK AT ALL
    if (this.handle) {
      this.handle.remove();
    }
    this.handle = this.reactiveUtils.watch(
      () =>  this._editor.viewModel.featureTemplatesViewModel.state,
      (state) => {
        console.log(`create-feature featureTemplatesViewModel.state: ${state}`)

        if(state === 'ready') {
          if (!this.started) {
            this.started = true;
            //void this.startCreate();
          }
          this._editorLoading = true;
        }
      });
    //this._editor.viewModel.addHandles(handle);
  }

  protected handle: IHandle;

  protected started = false;

  protected async startCreate(): Promise<void> {
    console.log('create-feature startCreate')
    return new Promise<any>((resolve) => {
      if (this._editor.viewModel.featureTemplatesViewModel.items?.length) {
        const items: __esri.TemplateItem[] = this._editor.viewModel.featureTemplatesViewModel.items[0]?.get("items");
        this._editor.viewModel.featureTemplatesViewModel.on('select', () => {
          console.log('create-feature select')
          setTimeout(() => {
            this._editorLoading = false;
            resolve({});
          }, 700);
        });
        if (items.length === 1) {
          this._editor.viewModel.featureTemplatesViewModel.select(items[0]);
        }
      }
    });
  }
}
