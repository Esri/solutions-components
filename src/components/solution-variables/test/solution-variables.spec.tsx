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
import { SolutionVariables } from '../solution-variables';
import * as translations from '../../../testingAssets/strings.json';
import { value } from '../../../demos/data/solution-variables-data.json';
import { h } from '@stencil/core';

describe('solution-variables', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SolutionVariables],
      template: () => (
        <solution-variables translations={translations.configuration_modal.configuration} value={value}></solution-variables>
      )
    });
    expect(page.root).toEqualHtml(`
    <solution-variables>
      <mock:shadow-root>
        <div>
          <h4 class="org-var-header">
            Solution Variables
          </h4>
        </div>
        <div class="container-border">
        <calcite-label id="variable-label">
          <calcite-tree-item>
          <solution-item-icon></solution-item-icon>
          <span class="icon-text" title="Dashboard 1">
            Dashboard 1
          </span>
          <calcite-tree slot="children">
            <calcite-tree-item>
              Item Id
            </calcite-tree-item>
            <calcite-tree-item>
              Url
            </calcite-tree-item>
          </calcite-tree>
          </calcite-tree-item>
          <calcite-tree-item>
          <solution-item-icon></solution-item-icon>
          <span class="icon-text" title="Dashboard 2">
            Dashboard 2
          </span>
          <calcite-tree slot="children">
            <calcite-tree-item>
              Item Id
            </calcite-tree-item>
            <calcite-tree-item>
              Url
            </calcite-tree-item>
          </calcite-tree>
          </calcite-tree-item>
          <calcite-tree-item>
          <solution-item-icon></solution-item-icon>
          <span class="icon-text" title="Feature Service 1">
            Feature Service 1
          </span>
          <calcite-tree slot="children">
            <calcite-tree-item>
              Item Id
            </calcite-tree-item>
            <calcite-tree-item>
              Url
            </calcite-tree-item>
            <calcite-tree-item>
              Name
            </calcite-tree-item>
            <calcite-tree-item>
            <solution-item-icon></solution-item-icon>
              <span class="icon-text" title="Layer 0">
                Layer 0
              </span>
              <calcite-tree slot="children">
                <calcite-tree-item>
                  Id
                </calcite-tree-item>
                <calcite-tree-item>
                  Url
                </calcite-tree-item>
              </calcite-tree>
            </calcite-tree-item>
            <calcite-tree-item>
              <solution-item-icon></solution-item-icon>
              <span class="icon-text" title="Layer 1">
                Layer 1
              </span>
              <calcite-tree slot="children">
                <calcite-tree-item>
                  Id
                </calcite-tree-item>
                <calcite-tree-item>
                  Url
                </calcite-tree-item>
              </calcite-tree>
            </calcite-tree-item>
          </calcite-tree>
          </calcite-tree-item>
          <calcite-tree-item>
          <solution-item-icon></solution-item-icon>
          <span class="icon-text" title="Group 1">
            Group 1
          </span>
          <calcite-tree slot="children">
            <calcite-tree-item>
              Group Id
            </calcite-tree-item>
          </calcite-tree>
          </calcite-tree-item>
        </calcite-label>
        </div>
      </mock:shadow-root>
    </solution-variables>
    `);
  });
});
