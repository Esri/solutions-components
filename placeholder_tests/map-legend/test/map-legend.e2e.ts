import { newE2EPage } from '@stencil/core/testing';

xdescribe('map-legend', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<map-legend></map-legend>');

    const element = await page.find('map-legend');
    expect(element).toHaveClass('hydrated');
  });
});
