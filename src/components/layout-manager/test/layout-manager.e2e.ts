import { newE2EPage } from '@stencil/core/testing';

xdescribe('layout-manager', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<layout-manager></layout-manager>');

    const element = await page.find('layout-manager');
    expect(element).toHaveClass('hydrated');
  });
});
