import { newE2EPage } from '@stencil/core/testing';
describe('solution-configuration', () => {
    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent('<solution-configuration></solution-configuration>');
        const element = await page.find('solution-configuration');
        expect(element).toHaveClass('hydrated');
    });
});
