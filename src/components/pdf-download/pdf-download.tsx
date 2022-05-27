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
        <div style={{ "padding-bottom": "1rem" }}>
          <calcite-combobox label="Format">
            {this._renderItems()}
          </calcite-combobox>
          <slot />
          <calcite-button label="Download" style={{ "padding-top": "1rem", "float": "right" }}>Download</calcite-button>
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
