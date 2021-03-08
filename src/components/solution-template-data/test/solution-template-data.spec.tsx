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

describe('solution-template-data', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SolutionTemplateData],
      html: `<solution-template-data></solution-template-data>`,
    });
    expect(page.root).toEqualHtml(`
      <solution-template-data>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </solution-template-data>
    `);
  });
});
