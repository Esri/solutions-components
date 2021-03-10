import { newE2EPage } from '@stencil/core/testing';

describe('solution-item-icon', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<solution-item-icon></solution-item-icon>');

    const element = await page.find('solution-item-icon');
    expect(element).toHaveClass('hydrated');
  });
});
