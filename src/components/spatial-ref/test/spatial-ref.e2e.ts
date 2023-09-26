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

import { E2EPage, newE2EPage } from '@stencil/core/testing';

describe('spatial-ref', () => {

  let page: E2EPage;
  beforeEach(async () => {
    page = await newE2EPage();
  });

  it('renders', async () => {
    await page.setContent('<spatial-ref/>');

    const spatial_ref = await page.find('spatial-ref');
    expect(spatial_ref).toHaveClass('hydrated');
    expect(await spatial_ref.getProperty('defaultWkid')).toBe(102100);
    expect(await spatial_ref.getProperty('value')).toBe('102100');
  });

  it('select first value after typing in search field', async () => {
    await page.setContent('<spatial-ref/>');

    const spatial_ref = await page.find('spatial-ref');
    expect(await spatial_ref.getProperty('value')).toBe('102100');

    const input = await page.find('calcite-input >>> input');
    await input.focus();
    await page.keyboard.type('wyoming');
    await page.waitForChanges();
    await page.keyboard.press('Enter');
    await page.waitForChanges();
    expect(await spatial_ref.getProperty('value')).toBe('2862');
  });

  it('select tabbed-to value after typing in search field', async () => {
    await page.setContent('<spatial-ref/>');

    const spatial_ref = await page.find('spatial-ref');
    expect(await spatial_ref.getProperty('value')).toBe('102100');

    const input = await page.find('calcite-input >>> input');
    await input.focus();
    await page.keyboard.type('wyoming');
    await page.waitForChanges();

    // Enter the list of suggested projections
    await page.keyboard.press('Tab');
    await page.waitForChanges();

    // And tab down to one of them
    await page.keyboard.press('Tab');
    await page.waitForChanges();
    await page.keyboard.press('Tab');
    await page.waitForChanges();
    await page.keyboard.press('Tab');
    await page.waitForChanges();

    // Select it, and use second selection to make it the current projection
    await page.keyboard.press('Enter');
    await page.waitForChanges();
    await page.keyboard.press('Enter');
    await page.waitForChanges();
    expect(await spatial_ref.getProperty('value')).toBe('2865');
  });

});
