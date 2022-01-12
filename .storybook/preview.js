import { withDirection } from './decorators/direction';
import { withLocale } from './decorators/locale';
import { withTheme } from './addons/theme/apply-theme';

//import { defineCustomElements } from '../dist/esm/loader.js';
//import { setAssetPath } from '../dist/components';
import { defineCustomElements, setAssetPath } from '../dist/custom-elements';//???

import { extractArgTypes, extractComponentDescription, setStencilDocJson } from '@pxtrn/storybook-addon-docs-stencil';
import docJson from '../dist/docs.json';
import { defaultTheme } from './addons/theme/themes';

// TODO: revisit this...
// this is so calcite-components assets can be loaded when running locally and when deployed to gh-pages
const url = new URL(document.currentScript.src);
url.pathname = url.pathname.startsWith('/solutions-components/') ? '/solutions-components/' : '/';
setAssetPath(`${url.href}solutions-components/solutions-components`);
defineCustomElements();

setStencilDocJson(docJson);

export const parameters = {
  options: {
    storySort: {
      order: [
        'Guides',
        ['License'],
        'Components'
      ]
    },
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    hideNoControlsWarning: true,
    matchers: {
      color: /(background|fill|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    extractArgTypes,
    extractComponentDescription,
  },
}

export const globalTypes = {
  dir: {
    name: 'Direction',
    description: 'Direction css property on ancestor element',
    defaultValue: 'ltr',
    toolbar: {
      icon: 'transfer',
      items: ['ltr', 'rtl'],
      showName: true,
    },
  },
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: 'en',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', right: '🇺🇸', title: 'English' },
        { value: 'fr', right: '🇫🇷', title: 'Français' },
        { value: 'es', right: '🇪🇸', title: 'Español' },
        { value: 'zh-cn', right: '🇨🇳', title: '中文' },
        { value: 'ko', right: '🇰🇷', title: '한국어' },
      ],
      showName: true,
    },
  },
  currentTheme: {
    defaultValue: defaultTheme
  }
};

export const decorators = [ withDirection, withLocale, withTheme ];
