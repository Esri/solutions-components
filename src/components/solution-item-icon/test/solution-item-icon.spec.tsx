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
import { SolutionItemIcon } from '../solution-item-icon';
import { value } from '../../../demos/data/solution-item-icon-data.json';
import { h } from '@stencil/core';

describe('solution-item-icon', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SolutionItemIcon],
      template: () => (
        <solution-item-icon type={value.type} typeKeywords={value.typeKeywords}></solution-item-icon>
      )
    });
    expect(page.root).toEqualHtml(`
      <solution-item-icon>
        <div title="Feature Service">
          <img class="item-type-icon item-type-icon-margin" height="16" src="/item-icons/featureshosted16.png" width="16">
        </div>
      </solution-item-icon>
    `);
  });
});
