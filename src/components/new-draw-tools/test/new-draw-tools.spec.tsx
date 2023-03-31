import { newSpecPage } from '@stencil/core/testing';
import { NewDrawTools } from '../new-draw-tools';

describe('new-draw-tools', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [NewDrawTools],
      html: `<new-draw-tools></new-draw-tools>`,
    });
    expect(page.root).toEqualHtml(`
      <new-draw-tools>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </new-draw-tools>
    `);
  });
});
