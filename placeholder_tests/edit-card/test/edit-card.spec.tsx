import { newSpecPage } from '@stencil/core/testing';
import { EditCard } from '../edit-card';

xdescribe('edit-card', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [EditCard],
      html: `<edit-card></edit-card>`,
    });
    expect(page.root).toEqualHtml(`
      <edit-card>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </edit-card>
    `);
  });
});
