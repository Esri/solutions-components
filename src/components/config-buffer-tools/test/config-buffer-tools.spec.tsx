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
import { ConfigBufferTools } from '../config-buffer-tools';
import * as locale from "../../../utils/locale";
import * as translations from "../../../assets/t9n/config-buffer-tools/resources.json";

jest.setTimeout(30000);

afterEach(() => {
  jest.restoreAllMocks();
});

beforeEach(() => {
  jest.spyOn(locale, "getLocaleComponentStrings").mockImplementation(() => [
    translations
  ] as any);
});

describe('config-buffer-tools', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      autoApplyChanges: true,
      components: [ConfigBufferTools],
      template: () => (<config-buffer-tools></config-buffer-tools>),
    });
    expect(page.root).toEqualHtml(`
     <config-buffer-tools distance="100" unit="Meters">
       <mock:shadow-root>
         <div>
           <calcite-label layout="inline">
             <calcite-checkbox checked=""></calcite-checkbox>
             Show buffer options
           </calcite-label>
         </div>
         <div class="padding-inline-start-1">
           <div class="padding-block-end-1 width-full">
             <calcite-label class="label-spacing">
               Default distance
               <calcite-input min="0" number-button-type="vertical" type="number" value="100"></calcite-input>
             </calcite-label>
           </div>
           <div class="width-full">
             <calcite-label class="label-spacing">
               Default unit
               <calcite-select label="Default unit">
                 <calcite-option label="Feet" value="Feet"></calcite-option>
                 <calcite-option label="Yards" value="Yards"></calcite-option>
                 <calcite-option label="Meters" selected="" value="Meters"></calcite-option>
                 <calcite-option label="Kilometers" value="Kilometers"></calcite-option>
                 <calcite-option label="Miles" value="Miles"></calcite-option>
               </calcite-select>
             </calcite-label>
           </div>
         </div>
       </mock:shadow-root>
     </config-buffer-tools>
    `);
  });
});
