import { newE2EPage } from '@stencil/core/testing';

xdescribe('map-search', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<map-search></map-search>');

    const element = await page.find('map-search');
    expect(element).toHaveClass('hydrated');
  });
});
