import { newSpecPage } from '@stencil/core/testing';
import { CheckList } from '../check-list';

describe('check-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CheckList],
      html: `<check-list></check-list>`,
    });
    expect(page.root).toEqualHtml(`
      <check-list>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </check-list>
    `);
  });
});
