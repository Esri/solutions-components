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
import { JsonEditor } from '../json-editor';
import * as translations from '../../../assets/nls/strings.json';
import { h } from '@stencil/core';

describe('json-editor', () => {
    it('renders', async () => {
    const page = await newSpecPage({
      components: [JsonEditor],
      template: () => (
        <json-editor translations={translations.configuration_modal.configuration} instanceId="ABC123" value = "{a:'A'}"></json-editor>
      )
    });
    expect(page.root).toEqualHtml(`
      <json-editor instance-id="ABC123" value="{a:'A'}">
        <div class="editor-container">
          <div class="editor-controls">
            <div class="editor-buttons">
              <calcite-button appearance="solid" class="edit-button" color="blue" id="ABC123-startEditing" scale="s" title="Start Editing">
                <calcite-icon icon="pencil" scale="s"></calcite-icon>
              </calcite-button>
              <calcite-button appearance="outline" class="edit-button" color="blue" id="ABC123-search" scale="s" title="Search">
                <calcite-icon icon="search" scale="s"></calcite-icon>
              </calcite-button>
              <calcite-button appearance="solid" class="edit-button" color="blue" disabled="" id="ABC123-cancelEdits" scale="s" title="Cancel Edits">
                <calcite-icon icon="reset" scale="s"></calcite-icon>
              </calcite-button>
              <calcite-button appearance="solid" class="edit-button" color="blue" disabled="" id="ABC123-saveEdits" scale="s" title="Save Edits">
                <calcite-icon icon="save" scale="s"></calcite-icon>
              </calcite-button>
            </div>
          </div>
          <div class="editor-text">
            <div class="edit-width" id="ABC123-editor"></div>
          </div>
        </div>
      </json-editor>
    `);
  });
});
