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
import { MapDrawTools } from '../map-draw-tools';
import * as locale from "../../../utils/locale";
import * as translations from "../../../assets/t9n/map-draw-tools/resources.json";
import { GraphicsLayer } from "../../../utils/test/mocks/jsApi";
jest.setTimeout(30000);
afterEach(() => {
    jest.restoreAllMocks();
});
let mapView;
beforeEach(() => {
    jest.spyOn(locale, "getLocaleComponentStrings").mockImplementation(() => [
        translations
    ]);
    jest.spyOn(console, 'warn').mockImplementation(() => { });
    mapView = {
        map: {
            layers: {
                add: () => { },
                getItemAt: () => { return -1; },
                findIndex: () => { return -1; }
            }
        }
    };
});
describe('map-draw-tools', () => {
    xit('renders without border', async () => {
        const page = await newSpecPage({
            autoApplyChanges: true,
            components: [MapDrawTools],
            template: () => (h("map-draw-tools", { mapView: mapView })),
            supportsShadowDom: false
        });
        expect(page.root).toEqualHtml(`
      <map-draw-tools>
        <div>
          <div></div>
        </div>
      </map-draw-tools>
    `);
    });
    xit('renders with border', async () => {
        const page = await newSpecPage({
            autoApplyChanges: true,
            components: [MapDrawTools],
            template: () => (h("map-draw-tools", { border: true, mapView: mapView })),
            supportsShadowDom: false
        });
        expect(page.root).toEqualHtml(`
      <map-draw-tools>
        <div class="border">
          <div></div>
        </div>
      </map-draw-tools>
    `);
    });
    xit('watch and clear graphics', async () => {
        const page = await newSpecPage({
            autoApplyChanges: true,
            components: [MapDrawTools],
            template: () => (h("map-draw-tools", { graphics: ["B"], mapView: mapView })),
            supportsShadowDom: false
        });
        expect(page.root.graphics.length).toEqual(1);
        page.root.graphics = ["A"];
        expect(page.root.graphics.length).toEqual(1);
        await page.root.clear();
        expect(page.root.graphics.length).toEqual(0);
    });
    xit('watch mapView', async () => {
        const page = await newSpecPage({
            autoApplyChanges: true,
            components: [MapDrawTools],
            template: () => (h("map-draw-tools", { mapView: mapView })),
            supportsShadowDom: false
        });
        mapView.map.layers.findIndex = () => { return 1; };
        mapView.map.layers.getItemAt = () => { return new GraphicsLayer({ title: "A" }); };
        page.root.mapView = Object.assign({}, mapView);
        expect(page.root).toBeDefined();
    });
});
