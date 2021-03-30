import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'solutions',
  globalStyle: 'src/assets/styles/styles.css',
  outputTargets: [
    {
      type: 'dist',
      copy: [
        { src: 'assets/nls' },
        { src: 'demos' }
      ]
    },
    {
      type: 'dist-custom-elements-bundle'
    },
    {
      type: 'docs-readme'
    }
  ]
};
