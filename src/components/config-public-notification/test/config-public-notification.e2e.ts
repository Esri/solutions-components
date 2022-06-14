import { newE2EPage } from '@stencil/core/testing';

describe('config-public-notification', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<config-public-notification></config-public-notification>');

    const element = await page.find('config-public-notification');
    expect(element).toHaveClass('hydrated');
  });
});
