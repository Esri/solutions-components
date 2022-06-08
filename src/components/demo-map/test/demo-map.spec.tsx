import { newSpecPage } from '@stencil/core/testing';
import { DemoMap } from '../demo-map';

describe('demo-map', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DemoMap],
      html: `<demo-map></demo-map>`,
    });
    expect(page.root).toEqualHtml(`
      <demo-map>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </demo-map>
    `);
  });
});
