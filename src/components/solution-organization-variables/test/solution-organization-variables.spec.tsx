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
import { SolutionOrganizationVariables } from '../solution-organization-variables';

describe('solution-organization-variables', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SolutionOrganizationVariables],
      html: `<solution-organization-variables></solution-organization-variables>`,
    });

    page.root.value = [{
      id: "id",
      title: "title",
      value: "value"
    }, {
      id: "id2",
      title: "title2",
      value: "value2"
    }, {
      id: "id3",
      title: "title3",
      value: "value3"
    }, {
      id: "id4",
      title: "title4",
      value: "value4"
    }, {
      id: "id5",
      title: "title5",
      value: "value5"
    }, {
      id: "id6",
      title: "title6",
      value: "value6"
    }];

    await page.waitForChanges();

    expect(page.root).toEqualHtml(`
    <solution-organization-variables>
      <mock:shadow-root>
        <div>
          <h4 class="org-var-header">
            Organization Varibles
          </h4>
        </div>
        <div class="container-border">
          <calcite-label id="variable-label">
            <calcite-tree-item>
              title
            </calcite-tree-item>
            <calcite-tree-item>
              title2
            </calcite-tree-item>
            <calcite-tree-item>
              title3
            </calcite-tree-item>
            <calcite-tree-item>
              title4
            </calcite-tree-item>
            <calcite-tree-item>
              title5
            </calcite-tree-item>
            <calcite-tree-item>
              title6
            </calcite-tree-item>
          </calcite-label>
        </div>
      </mock:shadow-root>
    </solution-organization-variables>
    `);
  });
});
