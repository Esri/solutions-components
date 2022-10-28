import { newE2EPage } from '@stencil/core/testing';

xdescribe('config-layer-picker', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<config-layer-picker></config-layer-picker>');

    const element = await page.find('config-layer-picker');
    expect(element).toHaveClass('hydrated');
  });
});
