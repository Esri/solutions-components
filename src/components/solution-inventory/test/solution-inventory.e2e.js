import { newE2EPage } from '@stencil/core/testing';
describe('solution-inventory', () => {
    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent('<solution-inventory></solution-inventory>');
        const element = await page.find('solution-inventory');
        expect(element).toHaveClass('hydrated');
    });
});
