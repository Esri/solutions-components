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
import { ConfigLayerPicker } from '../config-layer-picker';
import * as locale from "../../../utils/locale";
import * as mapViewUtils from "../../../utils/mapViewUtils";
import * as translations from "../../../assets/t9n/config-layer-picker/resources.json";

jest.setTimeout(30000);

afterEach(() => {
  jest.restoreAllMocks();
});

beforeEach(() => {
  jest.spyOn(locale, "getLocaleComponentStrings").mockImplementation(() => [
    translations
  ] as any);
});

xdescribe('config-layer-picker', () => {
  it('renders', async () => {
    const getLayersSpy = jest.spyOn(mapViewUtils, "getMapLayerNames").mockImplementation(() => [
      "A",
      "B"
    ] as any);
    const page = await newSpecPage({
      autoApplyChanges: true,
      components: [ConfigLayerPicker],
      template: () => (<config-layer-picker></config-layer-picker>),
    });
    expect(page.root).toEqualHtml(`
      <config-layer-picker default-checked="">
        <mock:shadow-root>
          <div>
            <div class="padding-block-end-1">
              <calcite-label class="label-spacing">
                Choose the potential addressee layers
              </calcite-label>
            </div>
            <div class="padding-inline-start-1">
              <check-list defaultchecked=""></check-list>
            </div>
          </div>
        </mock:shadow-root>
      </config-layer-picker>
    `);

    // set fake mapView
    page.root.mapView = {};
    expect(getLayersSpy).toHaveBeenCalledTimes(1);
  });
});
