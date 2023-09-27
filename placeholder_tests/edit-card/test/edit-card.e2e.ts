import { newE2EPage } from '@stencil/core/testing';

xdescribe('edit-card', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<edit-card></edit-card>');

    const element = await page.find('edit-card');
    expect(element).toHaveClass('hydrated');
  });
});
