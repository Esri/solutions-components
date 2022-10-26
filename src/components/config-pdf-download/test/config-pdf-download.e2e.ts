import { newE2EPage } from '@stencil/core/testing';

describe('config-pdf-download', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<config-pdf-download></config-pdf-download>');

    const element = await page.find('config-pdf-download');
    expect(element).toHaveClass('hydrated');
  });
});
