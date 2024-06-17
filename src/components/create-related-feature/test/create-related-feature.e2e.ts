import { newE2EPage } from '@stencil/core/testing';

xdescribe('create-related-feature', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<create-related-feature></create-related-feature>');

    const element = await page.find('create-related-feature');
    expect(element).toHaveClass('hydrated');
  });
});
