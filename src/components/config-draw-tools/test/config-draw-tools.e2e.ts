import { newE2EPage } from '@stencil/core/testing';

describe('config-draw-tools', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<config-draw-tools></config-draw-tools>');

    const element = await page.find('config-draw-tools');
    expect(element).toHaveClass('hydrated');
  });
});
