import { Config } from '@stencil/core';
import { sass } from "@stencil/sass";

export const config: Config = {
  namespace: 'solutions',
  globalStyle: 'src/assets/styles/styles.scss',
  sourceMap: true,
  outputTargets: [
    {
      type: 'dist',
      copy: [
        { src: 'assets/nls' },
        { src: 'demos' },
        { src: 'utils' }
      ]
    },
    {
      type: 'dist-custom-elements-bundle'
    },
    {
      type: 'docs-readme'
    }
  ],
  plugins: [
    sass({
      injectGlobalPaths: ["src/assets/styles/variables.scss"]
    })
  ],
  preamble: 'Copyright 2021 Esri\nLicensed under the Apache License, Version 2.0\nhttp://www.apache.org/licenses/LICENSE-2.0'
};
