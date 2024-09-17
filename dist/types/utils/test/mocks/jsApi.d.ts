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
export declare class GraphicsLayer {
    constructor(options: any);
    graphics: any[];
    title: string;
    removeAll: any;
    addMany: any;
}
export declare class Graphic {
    constructor(options: any);
    geometry: any;
    symbol: any;
}
export declare class Sketch {
    constructor(options: any);
    layer: any;
    view: any;
    container: any;
    creationMode: any;
    defaultCreateOptions: any;
    viewModel: any;
    visibleElements: any;
    on: any;
}
export declare class Search {
    constructor(options: any);
    clear: any;
    view: any;
    container: any;
    searchTerm: any;
    on: any;
}
export declare class Geometry {
    constructor(options: any);
}
export declare class geometryEngine {
    constructor(options: any);
}
export declare class highlightHandle {
    remove: () => {};
}
export declare class LayerView {
    constructor(options?: any);
    layer: any;
}
