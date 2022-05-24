import { newE2EPage } from '@stencil/core/testing';

describe('map-layer-picker', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<map-layer-picker></map-layer-picker>');

    const element = await page.find('map-layer-picker');
    expect(element).toHaveClass('hydrated');
  });
});
