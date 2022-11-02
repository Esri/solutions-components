import { newSpecPage } from '@stencil/core/testing';
import { MapLayerPicker } from '../map-layer-picker';

xdescribe('map-layer-picker', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MapLayerPicker],
      html: `<map-layer-picker></map-layer-picker>`,
    });
    expect(page.root).toEqualHtml(`
      <map-layer-picker>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </map-layer-picker>
    `);
  });
});
