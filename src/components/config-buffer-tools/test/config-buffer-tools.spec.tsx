import { newSpecPage } from '@stencil/core/testing';
import { ConfigBufferTools } from '../config-buffer-tools';

xdescribe('config-buffer-tools', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ConfigBufferTools],
      html: `<config-buffer-tools></config-buffer-tools>`,
    });
    expect(page.root).toEqualHtml(`
      <config-buffer-tools>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </config-buffer-tools>
    `);
  });
});
