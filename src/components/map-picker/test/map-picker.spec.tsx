import { newSpecPage } from '@stencil/core/testing';
import { MapPicker } from '../map-picker';

xdescribe('map-picker', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MapPicker],
      html: `<map-picker></map-picker>`,
    });
    expect(page.root).toEqualHtml(`
      <map-picker>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </map-picker>
    `);
  });
});
