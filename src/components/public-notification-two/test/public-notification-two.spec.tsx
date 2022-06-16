import { newSpecPage } from '@stencil/core/testing';
import { PublicNotificationTwo } from '../public-notification-two';

describe('public-notification-two', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PublicNotificationTwo],
      html: `<public-notification-two></public-notification-two>`,
    });
    expect(page.root).toEqualHtml(`
      <public-notification-two>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </public-notification-two>
    `);
  });
});
