import { newSpecPage } from '@stencil/core/testing';
import { PublicNotification } from '../public-notification';

describe('public-notification', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PublicNotification],
      html: `<public-notification></public-notification>`,
    });
    expect(page.root).toEqualHtml(`
      <public-notification>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </public-notification>
    `);
  });
});
