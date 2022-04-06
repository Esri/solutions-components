import autoprefixer from "autoprefixer";
import { Config } from '@stencil/core';
import { sass } from "@stencil/sass";
import { postcss } from "@stencil/postcss";
import tailwindcss from "tailwindcss";
import tailwindConfig from "./tailwind.config";
import { generatePreactTypes } from "./support/preact";

export const config: Config = {
  buildEs5: "prod",
  namespace: 'solutions',
  globalStyle: 'src/assets/styles/styles.scss',
  outputTargets: [
    { type: "dist-hydrate-script" },
    {
      type: 'dist',
      copy: [
        { src: 'assets/nls' },
        { src: 'demos' },
        { src: 'utils' }
      ]
    },
    { type: "dist-custom-elements-bundle" },
    { type: "dist-custom-elements", autoDefineCustomElements: true },
    {
      type: 'docs-readme'
    },
    { type: "custom", name: "preact", generator: generatePreactTypes },
  ],
  plugins: [
    sass({
      injectGlobalPaths: ["src/assets/styles/includes.scss"]
    }),
    postcss({
      plugins: [
        tailwindcss(tailwindConfig),
        autoprefixer()
      ]
    })
  ],
  preamble: 'Copyright 2021 Esri\nLicensed under the Apache License, Version 2.0\nhttp://www.apache.org/licenses/LICENSE-2.0'
};
