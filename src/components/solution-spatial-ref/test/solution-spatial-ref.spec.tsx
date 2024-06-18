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

import * as locale from '../../../utils/locale';
import state from "../../../utils/solution-store";
import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { SolutionSpatialRef } from '../solution-spatial-ref';

describe('solution-spatial-ref', () => {

  beforeEach(() => {
    jest.spyOn(locale, 'getLocaleComponentStrings').mockImplementation(
      () => Promise.resolve([{"spatialReferencePlaceholder": "Search for spatial reference using name or WKID"}, "en"])
    );

    state._testAccess("_emptyTheStore");
    state.setStoreInfo("spatialReferenceInfo", {
      enabled: true,
      services: {
        "Feature Service 1": true,
        "Feature Service 2": false
      },
      spatialReference: undefined
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders', async () => {
    const page = await newSpecPage({
      components: [SolutionSpatialRef],
      supportsShadowDom: false,
      template: () => (
        <solution-spatial-ref services={["Feature Service 1", "Feature Service 2"]}></solution-spatial-ref>
      )
    });
    expect(page.root).toEqualHtml(`
      <solution-spatial-ref default-wkid="102100" locked="" value="102100">
        <label class="switch-label">
          <calcite-switch class="spatial-ref-switch" scale="m"></calcite-switch>
        </label>
        <div class="spatial-ref-component" id="spatialRefDefn">
          <calcite-label>
            <label class="spatial-ref-default">
              <spatial-ref defaultwkid="102100" disabled="" value="102100"></spatial-ref>
            </label>
          </calcite-label>
          <div>
            <label class="spatial-ref-item-title"></label>
            <ul class="spatial-ref-services-list">
              <li class="spatial-ref-services-list-item">
                <label class="switch-label">
                  <calcite-switch checked="" class="spatial-ref-item-switch" disabled="" scale="m"></calcite-switch>
                  Feature Service 1
                </label>
              </li>
              <li class="spatial-ref-services-list-item">
                <label class="switch-label">
                  <calcite-switch class="spatial-ref-item-switch" disabled="" scale="m"></calcite-switch>
                  Feature Service 2
                </label>
              </li>
            </ul>
          </div>
        </div>
      </solution-spatial-ref>
    `);
  });

});
