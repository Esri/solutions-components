import { newE2EPage } from '@stencil/core/testing';

xdescribe('map-select-tools', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<map-select-tools></map-select-tools>');

    const element = await page.find('map-select-tools');
    expect(element).toHaveClass('hydrated');
  });
});
