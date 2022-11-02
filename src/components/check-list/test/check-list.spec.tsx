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

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { CheckList } from '../check-list';

describe('check-list', () => {
  it('renders values', async () => {
    const values = ["A", "B", "C"];
    const page = await newSpecPage({
      components: [CheckList],
      template: () => (<check-list values={values}></check-list>),
    });
    // TODO understand why the checkboxes don't show the checked prop??
    expect(page.root).toEqualHtml(`
      <check-list default-checked="">
        <mock:shadow-root>
          <div>
            <calcite-label layout="inline">
              <calcite-checkbox value="A"></calcite-checkbox>
              A
            </calcite-label>
            <calcite-label layout="inline">
              <calcite-checkbox value="B"></calcite-checkbox>
              B
            </calcite-label>
            <calcite-label layout="inline">
              <calcite-checkbox value="C"></calcite-checkbox>
              C
            </calcite-label>
          </div>
        </mock:shadow-root>
      </check-list>
    `);
    expect(page.root.defaultChecked).toEqual(true);
  });
});
