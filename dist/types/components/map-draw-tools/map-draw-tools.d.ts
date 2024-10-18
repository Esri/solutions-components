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
import { EventEmitter, VNode } from "../../stencil-public-runtime";
import { EDrawMode, ESelectionType, ISketchGraphicsChange } from "../../utils/interfaces";
import MapDrawTools_T9n from "../../assets/t9n/map-draw-tools/resources.json";
export declare class MapDrawTools {
    el: HTMLMapDrawToolsElement;
    /**
     * boolean: sketch is used by multiple components...need a way to know who should respond...
     */
    active: boolean;
    /**
     * utils/interfaces: Controls how the draw tools are rendered
     *
     * SKETCH mode supports snapping
     * REFINE mode supports undo/redo
     */
    drawMode: EDrawMode;
    /**
     * boolean: when true you will be able to make additional modifications to the sketched geometry
     */
    editGraphicsEnabled: boolean;
    /**
     * esri/Graphic: https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html
     */
    graphics: __esri.Graphic[];
    /**
     * esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
     */
    mapView: __esri.MapView;
    /**
     * esri/symbols/SimpleMarkerSymbol: https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleMarkerSymbol.html
     */
    pointSymbol: __esri.SimpleMarkerSymbol;
    /**
     * esri/symbols/SimpleLineSymbol: https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleLineSymbol.html
     */
    polylineSymbol: __esri.SimpleLineSymbol;
    /**
     * esri/symbols/SimpleFillSymbol: https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleFillSymbol.html
     */
    polygonSymbol: __esri.SimpleFillSymbol;
    /**
     * boolean: when eanbled the user can redo the previous operation
     */
    redoEnabled: boolean;
    /**
     * boolean: when eanbled the user can undo the previous operation
     */
    undoEnabled: boolean;
    /**
     * Contains the translations for this component.
     * All UI strings should be defined here.
     */
    _translations: typeof MapDrawTools_T9n;
    /**
     * utils/interfaces/ESelectionType: POINT, LINE, POLY, RECT
     */
    _selectionMode: ESelectionType;
    /**
     * esri/layers/GraphicsLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GraphicsLayer.html?#constructors-summary
     */
    protected GraphicsLayer: typeof import("esri/layers/GraphicsLayer");
    /**
     * esri/widgets/Sketch/SketchViewModel: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Sketch-SketchViewModel.html
     * The sketch view model constructor
     */
    protected SketchViewModel: typeof import("esri/widgets/Sketch/SketchViewModel");
    /**
     * esri/widgets/Sketch: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Sketch.html#constructors-summary
     */
    protected Sketch: typeof import("esri/widgets/Sketch");
    /**
     * esri/layers/GraphicsLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GraphicsLayer.html
     * The graphics layer used to show selections.
     */
    protected _sketchGraphicsLayer: __esri.GraphicsLayer;
    /**
     * esri/widgets/Sketch/SketchViewModel: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Sketch-SketchViewModel.html
     */
    protected _sketchViewModel: __esri.SketchViewModel;
    /**
     * esri/widgets/Sketch: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Sketch.html#constructors-summary
     */
    protected _sketchWidget: __esri.Sketch;
    /**
     * The container element for the sketch widget
     */
    protected _sketchElement: HTMLElement;
    /**
     * Called each time the graphics prop is changed.
     */
    graphicsWatchHandler(v: any, oldV: any): void;
    /**
     * Called each time the mapView prop is changed.
     */
    mapViewWatchHandler(v: any, oldV: any): void;
    /**
     * Clears the user drawn graphics
     *
     * @returns Promise that resolves when the operation is complete
     */
    clear(): Promise<void>;
    /**
     * Set the sketch widget to update mode with the current graphic
     *
     * @returns Promise that resolves when the operation is complete
     */
    updateGraphics(): Promise<void>;
    /**
     * Emitted on demand when selection starts or ends.
     */
    selectionLoadingChange: EventEmitter<boolean>;
    /**
     * Emitted on demand when the sketch graphics change.
     */
    sketchGraphicsChange: EventEmitter<ISketchGraphicsChange>;
    /**
     * Emitted on demand when the undo action is clicked.
     */
    drawUndo: EventEmitter<void>;
    /**
     * Emitted on demand when the redo action is clicked.
     */
    drawRedo: EventEmitter<void>;
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     *
     * @returns Promise when complete
     */
    componentWillLoad(): Promise<void>;
    /**
     * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
     *
     * @returns Promise when complete
     */
    componentDidLoad(): void;
    /**
     * StencilJS: Called every time the component is disconnected from the DOM
     */
    disconnectedCallback(): void;
    /**
     * Renders the component.
     */
    render(): VNode;
    /**
     * Load esri javascript api modules
     *
     * @returns Promise resolving when function is done
     *
     * @protected
     */
    protected _initModules(): Promise<void>;
    /**
     * Initialize the graphics layer and the tools that support creating new graphics
     *
     * @protected
     */
    protected _init(): void;
    /**
     * Initialize the graphics layer
     *
     * @returns Promise when the operation has completed
     * @protected
     */
    protected _initGraphicsLayer(): void;
    /**
     * Initialize the skecth widget
     *
     * @protected
     */
    protected _initSketch(): void;
    /**
     * Clear any stored graphics and remove all graphics from the graphics layer
     *
     * @protected
     */
    protected _clearSketch(): void;
    /**
     * Emit the undo event
     *
     * @protected
     */
    protected _undo(): void;
    /**
     * Emit the undo event
     *
     * @protected
     */
    protected _redo(): void;
    /**
     * Set the sketch widget to update mode with the current graphic
     *
     * reshape tool only supports a single graphic
     *
     * @protected
     */
    protected _updateGraphics(): void;
    /**
     * Any time graphics are added update the symbology so they will always be consistent
     * regardless of where they are from.
     * https://github.com/Esri/solutions-components/issues/246
     *
     * reshape tool only supports a single graphic
     *
     * @protected
     */
    protected _updateGraphicsSymbols(graphics: __esri.Graphic[]): void;
    /**
     * Fetches the component's translations
     *
     * @protected
     */
    protected _getTranslations(): Promise<void>;
}
