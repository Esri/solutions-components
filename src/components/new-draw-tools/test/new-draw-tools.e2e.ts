import { newE2EPage } from '@stencil/core/testing';

describe('new-draw-tools', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<new-draw-tools></new-draw-tools>');

    const element = await page.find('new-draw-tools');
    expect(element).toHaveClass('hydrated');
  });
});
