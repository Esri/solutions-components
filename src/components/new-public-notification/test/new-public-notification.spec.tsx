import { newSpecPage } from '@stencil/core/testing';
import { NewPublicNotification } from '../new-public-notification';

describe('new-public-notification', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [NewPublicNotification],
      html: `<new-public-notification></new-public-notification>`,
    });
    expect(page.root).toEqualHtml(`
      <new-public-notification>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </new-public-notification>
    `);
  });
});
