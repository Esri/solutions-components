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

import { Component, Host, h, VNode } from '@stencil/core';
import * as libs from '../../../../solutions-libraries/generatePDF/dist/labelFormats.json';
import '@esri/calcite-components';

@Component({
  tag: 'pdf-download',
  styleUrl: 'pdf-download.css',
  shadow: true,
})
export class PdfDownload {
  render() {
    return (
      <Host>
        <div class="download-container">
          <calcite-combobox label="Format">
            {this._renderItems()}
          </calcite-combobox>
          <slot />
          <calcite-button class="download-btn" label="Download">Download</calcite-button>
        </div>
     </Host>
    );
  }

  _renderItems(): VNode[] {
    const s: any = libs;
    return (s.default || s).map((l) => {
      return (<calcite-combobox-item 
        onClick={() => this._itemClicked(l)} 
        textLabel={`PDF label ${l.descriptionPDF.labelsPerPage} per page`}
        value={l}/>
      );
    });
  }

  _itemClicked(v: any): void {
    console.log(v)
  }

}
