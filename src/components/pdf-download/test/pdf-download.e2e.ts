import { newE2EPage } from '@stencil/core/testing';

describe('pdf-download', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<pdf-download></pdf-download>');

    const element = await page.find('pdf-download');
    expect(element).toHaveClass('hydrated');
  });
});
