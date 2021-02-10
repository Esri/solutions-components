import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'solutions',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'docs-readme',
    }
  ],
};
