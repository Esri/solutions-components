import { newSpecPage } from '@stencil/core/testing';
import { BufferTools } from '../buffer-tools';

describe('buffer-tools', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BufferTools],
      html: `<buffer-tools></buffer-tools>`,
    });
    expect(page.root).toEqualHtml(`
      <buffer-tools>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </buffer-tools>
    `);
  });
});
