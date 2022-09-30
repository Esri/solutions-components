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
import { SolutionItemSharing } from '../solution-item-sharing';
import { value } from '../../../demos/data/solution-item-sharing-data.json';
import { h } from '@stencil/core';

xdescribe('solution-item-sharing', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SolutionItemSharing],
      template: () => (
        <solution-item-sharing value={value}></solution-item-sharing>
      )
    });
    expect(page.root).toEqualHtml(`
      <solution-item-sharing>
        <mock:shadow-root>
         <div class="container-border">
           <calcite-label layout="inline">
             <calcite-switch id="A" name="setting" scale="m" switched="" value="enabled"></calcite-switch>
             <solution-item-icon type="Feature Service"></solution-item-icon>
             <span class="icon-text" title="ElectionGeography_public">
              ElectionGeography_public
             </span>
           </calcite-label>
           <calcite-label layout="inline">
             <calcite-switch id="B" name="setting" scale="m" value="enabled"></calcite-switch>
             <solution-item-icon type="Web Map"></solution-item-icon>
             <span class="icon-text" title="Election Polling Places">
              Election Polling Places
             </span>
           </calcite-label>
         </div>
        </mock:shadow-root>
      </solution-item-sharing>
    `);
  });
});
