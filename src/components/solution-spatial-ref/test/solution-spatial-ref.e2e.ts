import { newE2EPage } from '@stencil/core/testing';

describe('solution-spatial-ref', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<solution-spatial-ref></solution-spatial-ref>');

    const element = await page.find('solution-spatial-ref');
    expect(element).toHaveClass('hydrated');
  });
});
