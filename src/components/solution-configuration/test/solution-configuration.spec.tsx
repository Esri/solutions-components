/** @license
 * Copyright 2021 Esri
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

import { newSpecPage } from '@stencil/core/testing';
import { SolutionConfiguration } from '../solution-configuration';
import * as translations from '../../../../nls/Elm_strings.json';
import { h } from '@stencil/core';

describe('solution-configuration', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SolutionConfiguration],
      supportsShadowDom: false,
      template: () => (
        <solution-configuration translations={translations.configuration_modal.configuration}></solution-configuration>
      )
    });
    expect(page.root).toEqualHtml(`
      <solution-configuration>
        <div class="configuration-container">
          <div class="configuration">
            <calcite-tabs class="config-tabs">
              <calcite-tab-nav slot="tab-nav">
                <calcite-tab-title>Definition</calcite-tab-title>
                <calcite-tab-title>Spatial Reference</calcite-tab-title>
              </calcite-tab-nav>

              <calcite-tab class="config-tab" active>
                <div class="config-solution">

                  <div class="config-inventory">
                    <solution-contents id="configInventory"></solution-contents>
                  </div>

                  <div class="config-item">
                  </div>

                </div>
              </calcite-tab>
              <calcite-tab class="config-tab">
                <div class="config-solution">

                  <solution-spatial-ref></solution-spatial-ref>

                </div>
              </calcite-tab>
            </calcite-tabs>
          </div>
        </div>
      </solution-configuration>
    `);
  });
});