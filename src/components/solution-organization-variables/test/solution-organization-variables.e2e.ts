import { newE2EPage } from '@stencil/core/testing';

describe('solution-organization-variables', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<solution-organization-variables></solution-organization-variables>');

    const element = await page.find('solution-organization-variables');
    expect(element).toHaveClass('hydrated');
  });
});
