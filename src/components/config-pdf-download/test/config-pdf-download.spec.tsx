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
import { ConfigPdfDownload } from '../config-pdf-download';
import * as locale from "../../../utils/locale";
import * as translations from "../../../assets/t9n/config-pdf-download/resources.json";

jest.setTimeout(30000);

afterEach(() => {
  jest.restoreAllMocks();
});

beforeEach(() => {
  jest.spyOn(locale, "getLocaleComponentStrings").mockImplementation(() => [
    translations
  ] as any);
});

describe('config-pdf-download', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      autoApplyChanges: true,
      components: [ConfigPdfDownload],
      template: () => (<config-pdf-download></config-pdf-download>),
    });
    expect(page.root).toEqualHtml(`
     <config-pdf-download default-checked="">
       <mock:shadow-root>
         <div>
           <div class="padding-block-end-1">
             <calcite-label class="label-spacing">
               Available label formats
             </calcite-label>
           </div>
           <div class="padding-block-end-1 padding-inline-start-1">
             <check-list defaultchecked=""></check-list>
           </div>
           <div class="padding-block-end-1">
             <calcite-label class="label-spacing">
               CSV options
             </calcite-label>
           </div>
           <div class="padding-block-end-1 padding-inline-start-1">
             <check-list defaultchecked=""></check-list>
           </div>
         </div>
        </mock:shadow-root>
      </config-pdf-download>
    `);
  });
});
