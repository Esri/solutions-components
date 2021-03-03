import { newE2EPage } from '@stencil/core/testing';

describe('solution-template-data', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<solution-template-data></solution-template-data>');

    const element = await page.find('solution-template-data');
    expect(element).toHaveClass('hydrated');
  });
});
