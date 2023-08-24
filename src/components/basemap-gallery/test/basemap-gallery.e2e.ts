import { newE2EPage } from '@stencil/core/testing';

xdescribe('basemap-gallery', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<basemap-gallery></basemap-gallery>');

    const element = await page.find('basemap-gallery');
    expect(element).toHaveClass('hydrated');
  });
});
