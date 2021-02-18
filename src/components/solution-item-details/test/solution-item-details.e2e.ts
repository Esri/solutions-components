import { newE2EPage } from '@stencil/core/testing';

describe('solution-item-details', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<solution-item-details></solution-item-details>');

    const element = await page.find('solution-item-details');
    expect(element).toHaveClass('hydrated');
  });
});
