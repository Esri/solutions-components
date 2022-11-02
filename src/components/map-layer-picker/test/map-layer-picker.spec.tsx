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

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MapLayerPicker } from '../map-layer-picker';
import * as mapViewUtils from "../../../utils/mapViewUtils";

let mapView;

beforeEach(() => {
  jest.spyOn(mapViewUtils, "getMapLayerNames").mockImplementation(() => [
    "A", "B"
  ] as any);

  mapView = {
    map: {
      layers: {
        add: () => {},
        getItemAt: () => { return -1 },
        findIndex: () => { return -1 }
      }
    }
  } as unknown as any;
});

describe('map-layer-picker', () => {
  it('renders single selection mode', async () => {
    const page = await newSpecPage({
      autoApplyChanges: true,
      components: [MapLayerPicker],
      template: () => (<map-layer-picker mapView={mapView}></map-layer-picker>),
    });
    expect(page.root).toEqualHtml(`
      <map-layer-picker selection-mode="single">
       <div class="background-w map-layer-picker-container">
         <div class="map-layer-picker">
           <calcite-select label="">
             <calcite-option label="A" value="A"></calcite-option>
             <calcite-option label="B" value="B"></calcite-option>
           </calcite-select>
         </div>
       </div>
      </map-layer-picker>
    `);

    jest.spyOn(mapViewUtils, "getMapLayerNames").mockImplementation(() => [
      "A", "B", "C"
    ] as any);

    page.root.mapView = {...mapView};

    expect(page.root).toEqualHtml(`
    <map-layer-picker selection-mode="single">
     <div class="background-w map-layer-picker-container">
       <div class="map-layer-picker">
         <calcite-select label="">
           <calcite-option label="A" value="A"></calcite-option>
           <calcite-option label="B" value="B"></calcite-option>
         </calcite-select>
       </div>
     </div>
    </map-layer-picker>
  `);
  });

  it('renders single selection mode with selectedLayers', async () => {
    const page = await newSpecPage({
      autoApplyChanges: true,
      components: [MapLayerPicker],
      template: () => (
        <map-layer-picker
          mapView={mapView}
          selectedLayers={["B"]}
        ></map-layer-picker>
      ),
    });
    expect(page.root).toEqualHtml(`
      <map-layer-picker selection-mode="single">
       <div class="background-w map-layer-picker-container">
         <div class="map-layer-picker">
           <calcite-select label="">
             <calcite-option label="A" value="A"></calcite-option>
             <calcite-option label="B" selected="" value="B"></calcite-option>
           </calcite-select>
         </div>
       </div>
      </map-layer-picker>
    `);
  });

  it('renders multi selection mode', async () => {
    const page = await newSpecPage({
      autoApplyChanges: true,
      components: [MapLayerPicker],
      template: () => (
        <map-layer-picker
          mapView={mapView}
          selectedLayers={["A"]}
          selectionMode="multi"
        ></map-layer-picker>
      ),
    });
    expect(page.root).toEqualHtml(`
      <map-layer-picker selection-mode="multi">
       <div class="background-w map-layer-picker-container">
         <div class="map-layer-picker">
          <calcite-combobox label="" selection-mode="multi">
            <calcite-combobox-item selected="" textlabel="A" value="A"></calcite-combobox-item>
            <calcite-combobox-item textlabel="B" value="B"></calcite-combobox-item>
          </calcite-combobox>
         </div>
       </div>
      </map-layer-picker>
    `);
  });
});
