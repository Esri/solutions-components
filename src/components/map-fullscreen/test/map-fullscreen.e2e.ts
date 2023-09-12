import { newE2EPage } from '@stencil/core/testing';

xdescribe('map-fullscreen', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<map-fullscreen></map-fullscreen>');

    const element = await page.find('map-fullscreen');
    expect(element).toHaveClass('hydrated');
  });
});
