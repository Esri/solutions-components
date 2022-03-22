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
import { dispose } from '../../../utils/editStore';

beforeEach(async () => {
  dispose();
});

describe('solution-template-data', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SolutionTemplateData],
      template: () => (
        <solution-template-data translations={translations.configuration_modal.configuration} value={data}></solution-template-data>
      )
    });
    expect(page.root).toEqualHtml(`
    <solution-template-data instanceid="" itemid="" vars-open="">
      <div class="solution-data-container">
        <calcite-shell class="light var-container" dir="ltr">
          <calcite-panel class="json-editor">
            <div class="calcite-match-height solution-data-child-container">
              <json-editor instanceid="" value=""></json-editor>
            </div>
          </calcite-panel>
          <calcite-shell-panel height-scale="l" position="end" slot="contextual-panel" width-scale="xs">
            <div class="solution-data-child-container">
              <calcite-button appearance="transparent" class="collapse-btn" icon-start="chevrons-right" id="collapse-vars" scale="s" title="Cancel Edits"></calcite-button>
              <div class="org-vars" id="orgVars">
                <solution-organization-variables></solution-organization-variables>
              </div>
              <div class="sol-vars" id="solVars">
                <solution-variables></solution-variables>
              </div>
            </div>
          </calcite-shell-panel>
        </calcite-shell>
      </div>
    </solution-template-data>
    `);
  });
});
