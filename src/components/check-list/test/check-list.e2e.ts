import { newE2EPage } from '@stencil/core/testing';

describe('check-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<check-list></check-list>');

    const element = await page.find('check-list');
    expect(element).toHaveClass('hydrated');
  });
});
