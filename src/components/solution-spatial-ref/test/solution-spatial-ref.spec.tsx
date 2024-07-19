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
      enabled: false,
      enabledDefault: false,
      services: {
        "123": true,
        "456": false
      },
      spatialReference: "2865"
    });
    state.setStoreInfo("featureServices", [
      {
        id: "123",
        name: "Feature Service 1",
        enabled: true
      },
      {
        id: "456",
        name: "Feature Service 2",
        enabled: false
      }
    ]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders', async () => {
    const page = await newSpecPage({
      components: [SolutionSpatialRef],
      supportsShadowDom: false,
      template: () => (
        <solution-spatial-ref value="2865"/>
      )
    });
    expect(page.root).toEqualHtml(`
      <solution-spatial-ref default-wkid="3857" value="2865">
        <label class="switch-label">
          <calcite-switch class="spatial-ref-switch" scale="m"></calcite-switch>
        </label>
        <br>
        <br>
        <label class="switch-label spatial-ref-component">
          <calcite-switch class="spatial-ref-switch" disabled="" scale="m"></calcite-switch>
        </label>
        <div class="spatial-ref-component" id="spatialRefDefn">
          <div>
            <label class="spatial-ref-item-title"></label>
            <ul class="spatial-ref-services-list">
              <li class="spatial-ref-services-list-item">
                <label class="switch-label">
                  <calcite-switch checked class="spatial-ref-item-switch" disabled="" scale="m"></calcite-switch>
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
