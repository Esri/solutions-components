import { newE2EPage } from '@stencil/core/testing';

xdescribe('map-draw-tools', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<map-draw-tools></map-draw-tools>');

    const element = await page.find('map-draw-tools');
    expect(element).toHaveClass('hydrated');
  });
});
