import { newE2EPage } from '@stencil/core/testing';

describe('solution-accordion-item', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<solution-accordion-item></solution-accordion-item>');

    const element = await page.find('solution-accordion-item');
    expect(element).toHaveClass('hydrated');
  });
});
