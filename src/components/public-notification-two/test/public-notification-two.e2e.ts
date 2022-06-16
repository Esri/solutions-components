import { newE2EPage } from '@stencil/core/testing';

describe('public-notification-two', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<public-notification-two></public-notification-two>');

    const element = await page.find('public-notification-two');
    expect(element).toHaveClass('hydrated');
  });
});
