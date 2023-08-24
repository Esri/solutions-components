import { newSpecPage } from '@stencil/core/testing';
import { BasemapGallery } from '../basemap-gallery';

xdescribe('basemap-gallery', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BasemapGallery],
      html: `<basemap-gallery></basemap-gallery>`,
    });
    expect(page.root).toEqualHtml(`
      <basemap-gallery>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </basemap-gallery>
    `);
  });
});
