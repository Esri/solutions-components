import { newE2EPage } from '@stencil/core/testing';

describe('feature-details', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<feature-details></feature-details>');

    const element = await page.find('feature-details');
    expect(element).toHaveClass('hydrated');
  });
});
