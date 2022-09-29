import { newSpecPage } from '@stencil/core/testing';
import { PdfDownload } from '../pdf-download';

xdescribe('pdf-download', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PdfDownload],
      html: `<pdf-download></pdf-download>`,
    });
    expect(page.root).toEqualHtml(`
      <pdf-download>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </pdf-download>
    `);
  });
});
