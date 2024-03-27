/** @license
 * Copyright 2024 Esri
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

import { newE2EPage } from '@stencil/core/testing';

xdescribe('consent-manager', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<consent-manager></consent-manager>');

    const element = await page.find('consent-manager');
    expect(element).toHaveClass('hydrated');
  });
});
