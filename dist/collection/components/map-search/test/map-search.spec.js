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
import { MapSearch } from '../map-search';
import * as locale from "../../../utils/locale";
import * as translations from "../../../assets/t9n/map-search/resources.json";
jest.setTimeout(30000);
afterEach(() => {
    jest.restoreAllMocks();
});
let mapView;
beforeEach(() => {
    jest.spyOn(locale, "getLocaleComponentStrings").mockImplementation(() => [
        translations
    ]);
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
describe('map-search', () => {
    xit('renders', async () => {
        const page = await newSpecPage({
            components: [MapSearch],
            template: () => (h("map-search", { mapView: mapView })),
        });
        expect(page.root).toEqualHtml(`
      <map-search>
        <div class="search-widget"></div>
      </map-search>
    `);
        await page.root.clear();
    });
});
