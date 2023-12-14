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

export class GraphicsLayer {
  constructor(options) {
    this.title = options.title;

    this.graphics = [];

    this.removeAll = () => {
      this.graphics = [];
    };
    this.addMany = (graphics) => {
      this.graphics.concat(graphics)
    }
  }
  graphics: any[];
  title: string;
  removeAll: any;
  addMany: any;
}

export class Graphic {
  constructor(options) {
    Object.assign(this, options);
  }
  geometry: any;
  symbol: any;
}

export class Sketch {
  constructor(options) {
    Object.assign(this, options);
    this.viewModel = {
      pointSymbol: {},
      polylineSymbol: {},
      polygonSymbol: {},
    }

    this.on = () => { };
  }

  layer: any;
  view: any;
  container: any;
  creationMode: any;
  defaultCreateOptions: any;
  viewModel: any;
  visibleElements: any;
  on: any;
}

export class Search {
  constructor(options) {
    Object.assign(this, options);
    this.clear = () => {};
    this.on = () => {};
  }

  clear: any;
  view: any;
  container: any;
  searchTerm: any;
  on: any;
}

export class Geometry {
  constructor(options) {
    Object.assign(this, options);
  }

}

export class geometryEngine {
  constructor(options) {
    Object.assign(this, options);
  }

}

export class highlightHandle { remove: () => {} }

export class LayerView {
  constructor(options?) {
    Object.assign(this, options);
    this.layer = {
      createQuery: () => {
        return {};
      },
      queryFeatures: async() => {

      }
    };
  }
  layer: any;
}
