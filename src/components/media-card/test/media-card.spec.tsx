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
import { MediaCard } from '../media-card';

xdescribe('media-card', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MediaCard],
      html: `<media-card></media-card>`,
    });
    expect(page.root).toEqualHtml(`
      <media-card>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </media-card>
    `);
  });
});
