import { newE2EPage } from '@stencil/core/testing';

describe('demo-map', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<demo-map></demo-map>');

    const element = await page.find('demo-map');
    expect(element).toHaveClass('hydrated');
  });
});
