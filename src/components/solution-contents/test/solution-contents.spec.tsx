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
        "title": "Dashboard 1",
        "type": "Dashboard",
        "typeKeywords": ["Dashboard", "Operations Dashboard"]
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
              "title": "Feature Service 1",
              "type": "Feature Service",
              "typeKeywords": [
                "ArcGIS Server",
                "Data",
                "Feature Access",
                "Feature Service",
                "Metadata",
                "Multilayer",
                "Service",
                "Hosted Service"
              ]
            }],
            "type": "Feature Service",
            "typeKeywords": [
              "ArcGIS Server",
              "Data",
              "Feature Access",
              "Feature Service",
              "Multi Services View",
              "Service",
              "Singlelayer",
              "Hosted Service",
              "View Service"
            ]
          }],
          "type": "Web Map",
          "typeKeywords": [
            "ArcGIS Online",
            "Collector",
            "Data Editing",
            "Explorer Web Map",
            "Map",
            "Online Map",
            "Web Map"
          ]
        }],
        "type": "Dashboard",
        "typeKeywords": ["Dashboard", "Operations Dashboard"]
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
              "title": "Feature Service 2",
              "type": "Feature Service",
              "typeKeywords": [
                "ArcGIS Server",
                "Data",
                "Feature Access",
                "Feature Service",
                "Metadata",
                "Multilayer",
                "Service",
                "Hosted Service"
              ]
            }, {
              "id": "10",
              "title": "Feature Service 3",
              "type": "Feature Service",
              "typeKeywords": [
                "ArcGIS Server",
                "Data",
                "Feature Access",
                "Feature Service",
                "Metadata",
                "Multilayer",
                "Service",
                "Hosted Service"
              ]
            }, {
              "id": "11",
              "title": "Map 3",
              "dependencies": [{
                "id": "12",
                "title": "Feature Service 4",
                "type": "Feature Service",
                "typeKeywords": [
                  "ArcGIS Server",
                  "Data",
                  "Feature Access",
                  "Feature Service",
                  "Metadata",
                  "Multilayer",
                  "Service",
                  "Hosted Service"
                ]
              }],
              "type": "Web Map",
              "typeKeywords": [
                "ArcGIS Online",
                "Collector",
                "Data Editing",
                "Explorer Web Map",
                "Map",
                "Online Map",
                "Web Map"
              ]
            }],
            "type": "Web Map",
            "typeKeywords": [
              "ArcGIS Online",
              "Collector",
              "Data Editing",
              "Explorer Web Map",
              "Map",
              "Online Map",
              "Web Map"
            ]
          }]
        }],
        "type": "QuickCapture Project",
        "typeKeywords": [
          "QuickCapture",
          "QuickCapture Project"
        ]
      }, {
        "id": "13",
        "title": "Notebook 1",
        "type": "Notebook",
        "typeKeywords": []
      }, {
        "id": "14",
        "title": "Survey 1",
        "type": "Form",
        "typeKeywords": [
          "Form",
          "Ready To Use",
          "Survey123",
          "Survey123 Connect",
          "xForm"
        ]
      }];
    await page.waitForChanges();

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
                <solution-item-icon></solution-item-icon>
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
