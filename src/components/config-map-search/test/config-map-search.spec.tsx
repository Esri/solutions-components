import { newSpecPage } from '@stencil/core/testing';
import { ConfigMapSearch } from '../config-map-search';

describe('config-map-search', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ConfigMapSearch],
      html: `<config-map-search></config-map-search>`,
    });
    expect(page.root).toEqualHtml(`
      <config-map-search>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </config-map-search>
    `);
  });
});
