/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { newSpecPage } from "@stencil/core/testing";
import { CookieTest } from "../cookie-test";
xdescribe('cookie-test', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [CookieTest],
            html: `<cookie-test></cookie-test>`,
        });
        expect(page.root).toEqualHtml(`
      <cookie-test>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cookie-test>
    `);
    });
});
