import { newE2EPage } from '@stencil/core/testing';

describe('arcgis-hub-input-color', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<arcgis-hub-input-color></arcgis-hub-input-color>');

    const element = await page.find('arcgis-hub-input-color');
    expect(element).toHaveAttribute('hydrated');
  });
});
