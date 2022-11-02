import { newSpecPage } from '@stencil/core/testing';
import { MapDrawTools } from '../map-draw-tools';

xdescribe('map-draw-tools', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MapDrawTools],
      html: `<map-draw-tools></map-draw-tools>`,
    });
    expect(page.root).toEqualHtml(`
      <map-draw-tools>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </map-draw-tools>
    `);
  });
});
