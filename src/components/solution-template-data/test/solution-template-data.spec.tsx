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
import { SolutionTemplateData } from '../solution-template-data';
import * as translations from '../../../testingAssets/strings.json';
import * as data from '../../../demos/data/solution-template-data-data.json';
import { h } from '@stencil/core';

describe('solution-template-data', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SolutionTemplateData],
      template: () => (
        <solution-template-data translations={translations.configuration_modal.configuration} value={data}></solution-template-data>
      )
    });
    expect(page.root).toEqualHtml(`
    <solution-template-data>
      <div class="solution-data-container">
        <calcite-shell dir="ltr" theme="light">
          <calcite-shell-center-row class="json-editor" height-scale="l" position="start" slot="center-row" width-scale="l">
            <div class="padding-1 solution-data-child-container">
              <json-editor instanceid="" value="{a:'A'}"></json-editor>
            </div>
          </calcite-shell-center-row>
          <calcite-shell-panel height-scale="l" position="start" slot="contextual-panel" width-scale="m">
            <div class="solution-data-child-container">
              <div class="org-vars">
                <solution-organization-variables></solution-organization-variables>
              </div>
              <div class="sol-vars">
                <solution-variables></solution-variables>
              </div>
            </div>
          </calcite-shell-panel>
        </calcite-shell>
      </div>
    </solution-template-data>
    `);
  });

  it('renders a resource type item', async () => {
    const page = await newSpecPage({
      components: [SolutionTemplateData],
      template: () => (
        <solution-template-data translations={translations.configuration_modal.configuration}></solution-template-data>
      )
    });
    page.root.isResource = true;

    page.root.value = {
      resourceItem: {
        name: "Survey1.zip",
        url: ""
      }
    };

    await page.waitForChanges();

    expect(page.root).toEqualHtml(`
    <solution-template-data>
      <div class="solution-data-container">
        <solution-resource-item></solution-resource-item>
      </div>
    </solution-template-data>
    `);
  });
});
