import { newSpecPage } from '@stencil/core/testing';
import { MapLegend } from '../map-legend';

xdescribe('map-legend', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MapLegend],
      html: `<map-legend></map-legend>`,
    });
    expect(page.root).toEqualHtml(`
      <map-legend>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </map-legend>
    `);
  });
});
