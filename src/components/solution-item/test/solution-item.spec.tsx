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
import { SolutionItem } from '../solution-item';

describe('solution-item', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SolutionItem],
      html: `<solution-item></solution-item>`,
    });
    expect(page.root).toEqualHtml(`
      <solution-item>
        <div class="configuration-container">
          <div class="configuration">
            <calcite-tabs class="config-tabs">
              <calcite-tab-nav slot="tab-nav">
                <calcite-tab-title>Item Details</calcite-tab-title>
                <calcite-tab-title>Data</calcite-tab-title>
                <calcite-tab-title>Properties</calcite-tab-title>
              </calcite-tab-nav>

              <calcite-tab class="config-tab" active>
                <solution-item-details></solution-item-details>
              </calcite-tab>
              <calcite-tab class="config-tab">
                solution-item-json/solution-item-json
              </calcite-tab>
              <calcite-tab class="config-tab">
                solution-item-json/solution-item-json
              </calcite-tab>
            </calcite-tabs>
          </div>
        </div>
      </solution-item>
    `);
  });
});