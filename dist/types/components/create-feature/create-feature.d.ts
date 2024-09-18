export declare class CreateFeature {
    el: HTMLCreateFeatureElement;
    mapView: __esri.MapView;
    selectedLayerId: string;
    _editorLoading: boolean;
    protected Editor: typeof import("esri/widgets/Editor");
    protected _editor: __esri.Editor;
    protected FeatureLayer: typeof import("esri/layers/FeatureLayer");
    protected MapView: typeof import("esri/views/MapView");
    protected reactiveUtils: typeof import("esri/core/reactiveUtils");
    protected _container: HTMLDivElement;
    protected _mapViewContainer: HTMLDivElement;
    _editorLoadingWatchHandler(v: boolean): Promise<void>;
    componentWillLoad(): Promise<void>;
    componentDidLoad(): Promise<void>;
    render(): any;
    protected initModules(): Promise<void>;
    protected createEditorWidget(): Promise<void>;
    protected started: boolean;
    protected startCreate(): Promise<void>;
}
