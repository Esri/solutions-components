import { newE2EPage } from '@stencil/core/testing';

describe('solution-variables', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<solution-variables></solution-variables>');

    const element = await page.find('solution-variables');
    expect(element).toHaveClass('hydrated');
  });
});
