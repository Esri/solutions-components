import { newE2EPage } from '@stencil/core/testing';

describe('config-map-search', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<config-map-search></config-map-search>');

    const element = await page.find('config-map-search');
    expect(element).toHaveClass('hydrated');
  });
});
