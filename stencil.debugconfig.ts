import autoprefixer from "autoprefixer";
import { Config } from '@stencil/core';
import { sass } from "@stencil/sass";
import { postcss } from "@stencil/postcss";
import tailwindcss from "tailwindcss";
import tailwindConfig from "./tailwind.config";
import { generatePreactTypes } from "./support/preact";

export const config: Config = {
  namespace: 'solutions',
  globalStyle: 'src/assets/styles/styles.scss',
  minifyJs: false,
  minifyCss: false,
  sourceMap: true,
  outputTargets: [
    {
      type: 'dist',
      copy: [
        {
          src: 'assets/t9n',
          dest: '../assets/t9n'
        },
        {
          src: 'assets/data',
          dest: '../assets/data'
        },
        { src: 'demos' },
        { src: 'utils' }
      ]
    },
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
  preamble: 'Copyright 2022 Esri\nLicensed under the Apache License, Version 2.0\nhttp://www.apache.org/licenses/LICENSE-2.0'
};
