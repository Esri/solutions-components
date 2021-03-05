import { newE2EPage } from '@stencil/core/testing';

describe('solution-resource-item', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<solution-resource-item></solution-resource-item>');

    const element = await page.find('solution-resource-item');
    expect(element).toHaveClass('hydrated');
  });
});
