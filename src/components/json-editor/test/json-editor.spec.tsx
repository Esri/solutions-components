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
import * as translations from '../../../testingAssets/strings.json';
import { h } from '@stencil/core';

// Mock MutationObserver because Jest environment doesn't have it
const mutationObserverMock = jest.fn(function MutationObserver(callback) {
  this.observe = jest.fn();
});
global.MutationObserver = mutationObserverMock;

describe('json-editor', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [JsonEditor],
      template: () => (
        <json-editor translations={translations.configuration_modal.configuration} instanceid="ABC123" value="{a:'A'}"></json-editor>
      )
    });
    
    expect(page.root).toEqualHtml(`
      <json-editor class="json-editor-position" instanceid="ABC123" value="{a:'A'}">
        <div class="editor-container padding-right" id="ABC123-editor-container">
          <div class="editor-controls">
            <div class="editor-buttons">
              <calcite-button appearance="solid" class="edit-button" color="blue" id="ABC123-undo" scale="s" title="Undo">
                <calcite-icon icon="undo" scale="s"></calcite-icon>
              </calcite-button>
              <calcite-button appearance="solid" class="edit-button" color="blue" id="ABC123-redo" scale="s" title="Redo">
                <calcite-icon icon="redo" scale="s"></calcite-icon>
              </calcite-button>
              <calcite-button appearance="solid" class="edit-button" color="blue" id="ABC123-diff" scale="s" title="Toggle Diff Editor">
                <calcite-icon icon="compare" scale="s"></calcite-icon>
              </calcite-button>
              <calcite-button appearance="outline" class="edit-button" color="blue" id="ABC123-search" scale="s" title="Search">
                <calcite-icon icon="search" scale="s"></calcite-icon>
              </calcite-button>
              <calcite-button appearance="solid" class="edit-button" color="blue" disabled="" id="ABC123-reset" scale="s" title="Cancel Edits">
                <calcite-icon icon="reset" scale="s"></calcite-icon>
              </calcite-button>
            </div>
          </div>
          <div class="edit-parent">
            <div class="json-edit-container" id="ABC123-container"></div>
            <div class="json-edit-container not-visible" id="ABC123-diff-container"></div>
          </div>
        </div>
      </json-editor>
    `);
  });
});
