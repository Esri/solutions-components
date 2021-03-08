import { newE2EPage } from '@stencil/core/testing';

describe('solution-item-sharing', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<solution-item-sharing></solution-item-sharing>');

    const element = await page.find('solution-item-sharing');
    expect(element).toHaveClass('hydrated');
  });
});
