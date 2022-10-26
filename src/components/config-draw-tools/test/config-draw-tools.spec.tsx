import { newSpecPage } from '@stencil/core/testing';
import { ConfigDrawTools } from '../config-draw-tools';

describe('config-draw-tools', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ConfigDrawTools],
      html: `<config-draw-tools></config-draw-tools>`,
    });
    expect(page.root).toEqualHtml(`
      <config-draw-tools>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </config-draw-tools>
    `);
  });
});
