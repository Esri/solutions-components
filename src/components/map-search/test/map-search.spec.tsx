import { newSpecPage } from '@stencil/core/testing';
import { MapSearch } from '../map-search';

xdescribe('map-search', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MapSearch],
      html: `<map-search></map-search>`,
    });
    expect(page.root).toEqualHtml(`
      <map-search>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </map-search>
    `);
  });
});
