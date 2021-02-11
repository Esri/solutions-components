import { newE2EPage } from '@stencil/core/testing';
describe('solution-item', () => {
    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent('<solution-item></solution-item>');
        const element = await page.find('solution-item');
        expect(element).toHaveClass('hydrated');
    });
});
