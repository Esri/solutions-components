import { createIntlManager } from './stencil-intl'

// initialize the manager and export as a singleton
export default createIntlManager({
  assetPath: 'locales',
  fileNamePattern: '{tagName}.i18n.{locale}.json'
})
