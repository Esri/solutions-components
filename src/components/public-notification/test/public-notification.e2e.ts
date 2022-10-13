import { newE2EPage } from '@stencil/core/testing';

xdescribe('public-notification', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<public-notification></public-notification>');

    const element = await page.find('public-notification');
    expect(element).toHaveClass('hydrated');
  });
});
