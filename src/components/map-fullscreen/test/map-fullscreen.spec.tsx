import { newSpecPage } from '@stencil/core/testing';
import { MapFullscreen } from '../map-fullscreen';

xdescribe('map-fullscreen', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MapFullscreen],
      html: `<map-fullscreen></map-fullscreen>`,
    });
    expect(page.root).toEqualHtml(`
      <map-fullscreen>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </map-fullscreen>
    `);
  });
});
