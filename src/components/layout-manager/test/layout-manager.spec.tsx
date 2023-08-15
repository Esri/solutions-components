import { newSpecPage } from '@stencil/core/testing';
import { LayoutManager } from '../layout-manager';

xdescribe('layout-manager', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LayoutManager],
      html: `<layout-manager></layout-manager>`,
    });
    expect(page.root).toEqualHtml(`
      <layout-manager>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </layout-manager>
    `);
  });
});
