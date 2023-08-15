import { newE2EPage } from '@stencil/core/testing';

xdescribe('map-picker', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<map-picker></map-picker>');

    const element = await page.find('map-picker');
    expect(element).toHaveClass('hydrated');
  });
});
