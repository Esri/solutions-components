import { newE2EPage } from '@stencil/core/testing';

describe('refine-selection', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<refine-selection></refine-selection>');

    const element = await page.find('refine-selection');
    expect(element).toHaveClass('hydrated');
  });
});
