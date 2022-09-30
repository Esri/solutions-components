import { newE2EPage } from '@stencil/core/testing';

xdescribe('buffer-tools', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<buffer-tools></buffer-tools>');

    const element = await page.find('buffer-tools');
    expect(element).toHaveClass('hydrated');
  });
});
