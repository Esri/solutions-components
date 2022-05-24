import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'pdf-download',
  styleUrl: 'pdf-download.css',
  shadow: true,
})
export class PdfDownload {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
