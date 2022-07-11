import { newE2EPage } from '@stencil/core/testing';

describe('refine-selection-tools', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<refine-selection-tools></refine-selection-tools>');

    const element = await page.find('refine-selection-tools');
    expect(element).toHaveClass('hydrated');
  });
});
