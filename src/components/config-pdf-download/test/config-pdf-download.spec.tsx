import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { ConfigPdfDownload } from '../config-pdf-download';
import * as locale from "../../../utils/locale";
import * as translations from "../../../assets/t9n/config-pdf-download/resources.json"

jest.setTimeout(30000);

afterEach(() => {
  jest.restoreAllMocks();
});

beforeEach(() => {
  jest.spyOn(locale, "getLocaleComponentStrings").mockImplementation(() => [translations] as any);
});

describe('config-pdf-download', () => {
  it('renders', async () => {
    const page = await newSpecPage({
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
