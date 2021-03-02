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
import { SolutionItemDetails } from '../solution-item-details';

describe('solution-item-details', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SolutionItemDetails],
      html: `<solution-item-details></solution-item-details>`,
      supportsShadowDom: false
    });
    expect(page.root).toEqualHtml(`
      <solution-item-details>
        <div class="parent-container">
          <div class="inputBottomSeparation">
            <calcite-input id="item-title" value=""></calcite-input>
          </div>

          <div class="inputBottomSeparation">

            <input class="display-none" type="file" accept=".jpg,.gif,.png,image/jpg,image/gif,image/png" />

            <button class="font-size--3 btn-link inline-block">
              <svg viewBox="0 0 16 16" width="16" height="16" class="icon-inline icon-inline--on-left">
                <path d="M14.792 2.666l-1.414-1.413a.965.965 0 0 0-1.385-.03l-1.444 1.444-8.763 8.72L.03 15.481a.371.371 0 0 0 .488.488l4.096-1.756 8.763-8.72-.001-.001.002.002 1.443-1.444a.965.965 0 0 0-.03-1.385zM1.569 14.431l.554-1.293.74.739zm2.338-.924l-1.414-1.414 7.963-7.92 1.414 1.415zm8.67-8.626l-1.413-1.414 1.29-1.29a.306.306 0 0 1 .433 0l.981.98a.306.306 0 0 1 0 .433z"></path>
              </svg> Edit Thumbnail
            </button>

            <div class="flex">
              <div class="img-container">
                <img class="scale-down" width="200" height="133" />
              </div>
              <div class="snippet-count-container">
                <calcite-input id="item-snippet" maxlength="250" type="textarea" value=""></calcite-input>
                <label id="item-snippet-count" class="font-size--3"></label>
              </div>
            </div>
          </div>

          <calcite-label>Description
            <label id="item-description-label">
              <calcite-input id="item-description" type="textarea" value=""></calcite-input>
            </label>
          </calcite-label>

          <calcite-label>Tags
            <label id="item-tags-label">
              <calcite-input id="item-tags" value=""></calcite-input>
            </label>
          </calcite-label>

          <calcite-label>Credits
            <label id="item-credits-label">
              <calcite-input id="item-credits" value=""></calcite-input>
            </label>
          </calcite-label>

          <calcite-label>
            <label id="item-terms-label">Terms of Use
              <calcite-input id="item-terms" type="textarea" value=""></calcite-input>
            </label>
          </calcite-label>
        </div>
      </solution-item-details>
    `);
  });
});