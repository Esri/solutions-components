import { newSpecPage } from '@stencil/core/testing';
import { CookieTest } from '../cookie-test';

xdescribe('cookie-test', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CookieTest],
      html: `<cookie-test></cookie-test>`,
    });
    expect(page.root).toEqualHtml(`
      <cookie-test>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cookie-test>
    `);
  });
});
