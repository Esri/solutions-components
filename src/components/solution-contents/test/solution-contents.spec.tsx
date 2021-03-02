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

describe('solution-contents', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SolutionContents],
      html: `<solution-contents></solution-contents>`,
      supportsShadowDom: false
    });
    page.root.value =
      [{
        "id": "1",
        "title": "Dashboard 1"
      }, {
        "id": "2",
         "title": "Dashboard 2",
        "dependencies": [{
          "id": "3",
          "title": "Map 1",
          "dependencies": [{
            "id": "4",
            "title": "View 1",
            "dependencies": [{
              "id": "5",
              "title": "Feature Service 1"
            }]
          }]
        }]
      }, {
        "id": "6",
         "title": "Application 1",
        "dependencies": [{
          "id": "7",
          "title": "Group 1",
          "dependencies": [{
            "id": "8",
            "title": "Map 2",
            "dependencies": [{
              "id": "9",
              "title": "Feature Service 2"
            }, {
              "id": "10",
              "title": "Feature Service 3"
            }, {
              "id": "11",
              "title": "Map 3",
              "dependencies": [{
                "id": "12",
                "title": "Feature Service 4"
              }]
            }]
          }]
        }]
      }, {
        "id": "13",
        "title": "Notebook 1"
      }, {
        "id": "14",
        "title": "Survey 1"
      }];
    await page.waitForChanges();

    expect(page.root).toEqualHtml(`
      <solution-contents>
        <calcite-tree>

          <calcite-tree-item>Dashboard 1
          </calcite-tree-item>

          <calcite-tree-item>Dashboard 2
            <calcite-tree slot="children">
              <calcite-tree-item>Map 1
                <calcite-tree slot="children">
                  <calcite-tree-item>View 1
                    <calcite-tree slot="children">
                      <calcite-tree-item>Feature Service 1</calcite-tree-item>
                    </calcite-tree>
                  </calcite-tree-item>
                </calcite-tree>
              </calcite-tree-item>
            </calcite-tree>
          </calcite-tree-item>

          <calcite-tree-item>Application 1
            <calcite-tree slot="children">
              <calcite-tree-item>Group 1
                <calcite-tree slot="children">
                  <calcite-tree-item>Map 2
                    <calcite-tree slot="children">
                      <calcite-tree-item>Feature Service 2</calcite-tree-item>
                      <calcite-tree-item>Feature Service 3</calcite-tree-item>
                      <calcite-tree-item>Map 3
                        <calcite-tree slot="children">
                          <calcite-tree-item>Feature Service 4</calcite-tree-item>
                        </calcite-tree>
                      </calcite-tree-item>
                    </calcite-tree>
                  </calcite-tree-item>
                </calcite-tree>
              </calcite-tree-item>
            </calcite-tree>
          </calcite-tree-item>

          <calcite-tree-item>Notebook 1
          </calcite-tree-item>

          <calcite-tree-item>Survey 1
          </calcite-tree-item>

        </calcite-tree>
      </solution-contents>
    `);
  });
});
