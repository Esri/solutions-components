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
import * as translations from '../../../../nls/Elm_strings.json';
import { h } from '@stencil/core';

describe('solution-variables', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SolutionVariables],
      template: () => (
        <solution-variables translations={translations.configuration_modal.configuration}></solution-variables>
      )
    });

    page.root.value = [{
      id: "db1",
      title: "Dashboard 1",
      value: "{{Dashboard 1 value}}",
      dependencies: [{
        id: "db1ItemId",
        title: "Item Id",
        value: "{{db1ItemId value}}"
      }, {
        id: "db1Url",
        title: "Url",
        value: "{{db1Url value}}"
      }]
    }, {
      id: "db2",
      title: "Dashboard 2",
      value: "Dashboard 2 value",
      dependencies: [{
        id: "db2ItemId",
        title: "Item Id",
        value: "{{db2ItemId value}}"
      }, {
        id: "db2Url",
        title: "Url",
        value: "{{db2Url value}}"
      }]
    }, {
      id: "fs1",
      title: "Feature Service 1",
      value: "{{Feature Service 1 value}}",
      dependencies: [{
        id: "fs1ItemId",
        title: "Item Id",
        value: "{{fs1ItemId value}}"
      }, {
        id: "fs1Url",
        title: "Url",
        value: "{{fs1Url value}}"
      }, {
        id: "fs1Name",
        title: "Name",
        value: "{{fs1Name value}}"
      }, {
        id: "layer0",
        title: "Layer 0",
        value: "{{layer0 value}}",
        dependencies: [{
          id: "layer0Id",
          title: "Id",
          value: "{{layer0Id value}}"
        }, {
          id: "layer0Url",
          title: "Url",
          value: "{{layer0Url value}}"
        }]
      }, {
        id: "layer1",
        title: "Layer 1",
        value: "{{layer1 value}}",
        dependencies: [{
          id: "layer1Id",
          title: "Id",
          value: "{{layer1Id value}}"
        }, {
          id: "layer1Url",
          title: "Url",
          value: "{{layer1Url value}}"
        }]
      }]
    }, {
      id: "grp1",
      title: "Group 1",
      value: "{{Group 1 value}}",
      dependencies: [{
        id: "group1Id",
        title: "Group Id",
        value: "{{group1Id value}}"
      }]
    }];

    await page.waitForChanges();

    expect(page.root).toEqualHtml(`
    <solution-variables>
      <mock:shadow-root>
        <div>
          <h4 class="org-var-header">
            Solution Varibles
          </h4>
        </div>
        <div class="container-border">
        <calcite-label id="variable-label">
          <calcite-tree-item>
            Dashboard 1
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
            Dashboard 2
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
            Feature Service 1
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
                Layer 0
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
                Layer 1
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
            Group 1
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
