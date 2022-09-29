import { newSpecPage } from '@stencil/core/testing';
import { PublicNotificationTwo } from '../public-notification';

xdescribe('public-notification', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PublicNotificationTwo],
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
