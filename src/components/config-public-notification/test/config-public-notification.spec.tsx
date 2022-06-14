import { newSpecPage } from '@stencil/core/testing';
import { ConfigPublicNotification } from '../config-public-notification';

describe('config-public-notification', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ConfigPublicNotification],
      html: `<config-public-notification></config-public-notification>`,
    });
    expect(page.root).toEqualHtml(`
      <config-public-notification>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </config-public-notification>
    `);
  });
});
