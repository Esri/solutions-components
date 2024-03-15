/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { newE2EPage } from "@stencil/core/testing";
xdescribe('cookie-test', () => {
    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent('<cookie-test></cookie-test>');
        const element = await page.find('cookie-test');
        expect(element).toHaveClass('hydrated');
    });
});
