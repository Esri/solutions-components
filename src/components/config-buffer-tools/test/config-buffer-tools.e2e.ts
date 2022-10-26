import { newE2EPage } from '@stencil/core/testing';

describe('config-buffer-tools', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<config-buffer-tools></config-buffer-tools>');

    const element = await page.find('config-buffer-tools');
    expect(element).toHaveClass('hydrated');
  });
});
