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
import { SolutionContents } from '../solution-contents';
import * as translations from '../../../testingAssets/strings.json';
import { value } from '../../../demos/data/solution-contents-data.json';
import { h } from '@stencil/core';

describe('solution-contents', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SolutionContents],
      supportsShadowDom: false,
      template: () => (
        <solution-contents translations={translations.configuration_modal.configuration} value={value}></solution-contents>
      )
    });
    expect(page.root).toEqualHtml(`
      <solution-contents>
        <calcite-tree>

          <calcite-tree-item>
            <solution-item-icon type="Dashboard"></solution-item-icon>
            Dashboard 1
          </calcite-tree-item>

          <calcite-tree-item>
            <solution-item-icon type="Dashboard"></solution-item-icon>
            Dashboard 2
            <calcite-tree slot="children">
              <calcite-tree-item>
                <solution-item-icon type="Web Map"></solution-item-icon>
                Map 1
                <calcite-tree slot="children">
                  <calcite-tree-item>
                    <solution-item-icon type="Feature Service"></solution-item-icon>
                    View 1
                    <calcite-tree slot="children">
                      <calcite-tree-item>
                        <solution-item-icon type="Feature Service"></solution-item-icon>
                        Feature Service 1
                      </calcite-tree-item>
                    </calcite-tree>
                  </calcite-tree-item>
                </calcite-tree>
              </calcite-tree-item>
            </calcite-tree>
          </calcite-tree-item>

          <calcite-tree-item>
            <solution-item-icon type="QuickCapture Project"></solution-item-icon>
            Application 1
            <calcite-tree slot="children">
              <calcite-tree-item>
                <solution-item-icon type="Group"></solution-item-icon>
                Group 1
                <calcite-tree slot="children">
                  <calcite-tree-item>
                    <solution-item-icon type="Web Map"></solution-item-icon>
                    Map 2
                    <calcite-tree slot="children">
                      <calcite-tree-item>
                        <solution-item-icon type="Feature Service"></solution-item-icon>
                        Feature Service 2
                      </calcite-tree-item>
                      <calcite-tree-item>
                        <solution-item-icon type="Feature Service"></solution-item-icon>
                        Feature Service 3
                      </calcite-tree-item>
                      <calcite-tree-item>
                        <solution-item-icon type="Web Map"></solution-item-icon>
                        Map 3
                        <calcite-tree slot="children">
                          <calcite-tree-item>
                            <solution-item-icon type="Feature Service"></solution-item-icon>
                            Feature Service 4
                          </calcite-tree-item>
                        </calcite-tree>
                      </calcite-tree-item>
                    </calcite-tree>
                  </calcite-tree-item>
                </calcite-tree>
              </calcite-tree-item>
            </calcite-tree>
          </calcite-tree-item>

          <calcite-tree-item>
            <solution-item-icon type="Notebook"></solution-item-icon>
            Notebook 1
          </calcite-tree-item>

          <calcite-tree-item>
            <solution-item-icon type="Form"></solution-item-icon>
            Survey 1
          </calcite-tree-item>

        </calcite-tree>
      </solution-contents>
    `);
  });
});
