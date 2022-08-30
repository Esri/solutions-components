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

import { newSpecPage } from '@stencil/core/testing';
import { SolutionContents } from '../solution-contents';
import { value } from '../../../demos/data/solution-contents-data.json';
import { h } from '@stencil/core';

describe('solution-contents', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SolutionContents],
      supportsShadowDom: false,
      template: () => (
        <solution-contents value={value}></solution-contents>
      )
    });
    expect(page.root).toEqualHtml(`
      <solution-contents>
        <calcite-tree>

          <calcite-tree-item>
            <solution-item-icon type="Dashboard"></solution-item-icon>
            <span class="icon-text" title="Dashboard 1">
              Dashboard 1
            </span>
          </calcite-tree-item>

          <calcite-tree-item>
            <solution-item-icon type="Dashboard"></solution-item-icon>
            <span class="icon-text" title="Dashboard 2">
              Dashboard 2
            </span>
            <calcite-tree slot="children">
              <calcite-tree-item>
                <solution-item-icon type="Web Map"></solution-item-icon>
                <span class="icon-text" title="Map 1">
                  Map 1
                </span>
                <calcite-tree slot="children">
                  <calcite-tree-item>
                    <solution-item-icon type="Feature Service"></solution-item-icon>
                    <span class="icon-text" title="View 1">
                      View 1
                    </span>
                    <calcite-tree slot="children">
                      <calcite-tree-item>
                        <solution-item-icon type="Feature Service"></solution-item-icon>
                        <span class="icon-text" title="Feature Service 1">
                          Feature Service 1
                        </span>
                      </calcite-tree-item>
                    </calcite-tree>
                  </calcite-tree-item>
                </calcite-tree>
              </calcite-tree-item>
            </calcite-tree>
          </calcite-tree-item>

          <calcite-tree-item>
            <solution-item-icon type="QuickCapture Project"></solution-item-icon>
            <span class="icon-text" title="Application 1">
              Application 1
            </span>
            <calcite-tree slot="children">
              <calcite-tree-item>
                <solution-item-icon type="Group"></solution-item-icon>
                <span class="icon-text" title="Group 1">
                  Group 1
                </span>
                <calcite-tree slot="children">
                  <calcite-tree-item>
                    <solution-item-icon type="Web Map"></solution-item-icon>
                    <span class="icon-text" title="Map 2">
                      Map 2
                    </span>
                    <calcite-tree slot="children">
                      <calcite-tree-item>
                        <solution-item-icon type="Feature Service"></solution-item-icon>
                        <span class="icon-text" title="Feature Service 2">
                          Feature Service 2
                        </span>
                      </calcite-tree-item>
                      <calcite-tree-item>
                        <solution-item-icon type="Feature Service"></solution-item-icon>
                        <span class="icon-text" title="Feature Service 3">
                          Feature Service 3
                        </span>
                      </calcite-tree-item>
                      <calcite-tree-item>
                        <solution-item-icon type="Web Map"></solution-item-icon>
                        <span class="icon-text" title="Map 3">
                          Map 3
                        </span>
                        <calcite-tree slot="children">
                          <calcite-tree-item>
                            <solution-item-icon type="Feature Service"></solution-item-icon>
                            <span class="icon-text" title="Feature Service 4">
                              Feature Service 4
                            </span>
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
            <span class="icon-text" title="Notebook 1">
              Notebook 1
            </span>
          </calcite-tree-item>

          <calcite-tree-item>
            <solution-item-icon type="Form"></solution-item-icon>
            <span class="icon-text" title="Survey 1">
              Survey 1
            </span>
          </calcite-tree-item>

        </calcite-tree>
      </solution-contents>
    `);
  });
});
