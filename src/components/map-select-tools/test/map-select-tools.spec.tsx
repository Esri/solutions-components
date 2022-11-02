import { newSpecPage } from '@stencil/core/testing';
import { MapSelectTools } from '../map-select-tools';

xdescribe('map-select-tools', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MapSelectTools],
      html: `<map-select-tools></map-select-tools>`,
    });
    expect(page.root).toEqualHtml(`
      <map-select-tools>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </map-select-tools>
    `);
  });
});
