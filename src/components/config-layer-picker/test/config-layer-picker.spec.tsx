import { newSpecPage } from '@stencil/core/testing';
import { ConfigLayerPicker } from '../config-layer-picker';

xdescribe('config-layer-picker', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ConfigLayerPicker],
      html: `<config-layer-picker></config-layer-picker>`,
    });
    expect(page.root).toEqualHtml(`
      <config-layer-picker>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </config-layer-picker>
    `);
  });
});
