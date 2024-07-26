import { config } from './stencil.config'

export const config: Config = {
  ...config,

  minifyJs: false,
  minifyCss: false,
  sourceMap: true
};
