import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'solutions',
  globalStyle: 'src/assets/styles/styles.css',
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
  preamble: 'Copyright 2021 Esri\nLicensed under the Apache License, Version 2.0\nhttp://www.apache.org/licenses/LICENSE-2.0'
};
