import { newSpecPage } from '@stencil/core/testing';
import { ConfigPdfDownload } from '../config-pdf-download';

xdescribe('config-pdf-download', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ConfigPdfDownload],
      html: `<config-pdf-download></config-pdf-download>`,
    });
    expect(page.root).toEqualHtml(`
      <config-pdf-download>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </config-pdf-download>
    `);
  });
});
