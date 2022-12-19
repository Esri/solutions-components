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

import { newE2EPage } from '@stencil/core/testing';
import * as locale from "../../../utils/locale";
import * as translations from "../../../assets/t9n/pdf-download/resources.json";
import { LayerView } from "../../../utils/test/mocks/jsApi";

jest.setTimeout(60000);

afterEach(() => {
  jest.restoreAllMocks();
});

beforeEach(() => {
  jest.spyOn(locale, "getLocaleComponentStrings").mockImplementation(() => [
    translations
  ] as any);
});

xdescribe('pdf-download', () => {
  it('renders', async (done) => {
    const page = await newE2EPage();
    await page.setContent('<pdf-download></pdf-download>');

    const element = await page.find('pdf-download');
    expect(element).toHaveClass('hydrated');

    expect(element).toEqualHtml(`
      <pdf-download class="hydrated">
       <mock:shadow-root>
         <calcite-select aria-disabled="true" class="hydrated" disabled="" scale="m" tabindex="-1" width="auto">
           <calcite-option class="hydrated" selected="">
             6 per page | 4 x 3-1/3
           </calcite-option>
           <calcite-option class="hydrated">
             10 per page | 4 x 2
           </calcite-option>
           <calcite-option class="hydrated">
             14 per page | 4 x 1-1/3
           </calcite-option>
           <calcite-option class="hydrated">
             20 per page | 4 x 1
           </calcite-option>
           <calcite-option class="hydrated">
             30 per page | 2-5/8 x 1
           </calcite-option>
           <calcite-option class="hydrated">
             60 per page | 1-3/4 x 2/3
           </calcite-option>
           <calcite-option class="hydrated">
             80 per page | 1-3/4 x 1/2
           </calcite-option>
         </calcite-select>
       </mock:shadow-root>
     </pdf-download>
  `);

    const layerView = new LayerView() as unknown as any;
    await element.setProperty("layerView", layerView);

    await page.waitForChanges();

    window.alert = jest.fn();

    await element.callMethod("downloadPDF", [], true);

    done();
  });
});
