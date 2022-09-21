import { newE2EPage } from '@stencil/core/testing';

describe('new-public-notification', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<new-public-notification></new-public-notification>');

    const element = await page.find('new-public-notification');
    expect(element).toHaveClass('hydrated');
  });
});
