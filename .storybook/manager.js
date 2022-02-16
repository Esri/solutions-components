import { addons } from '@storybook/addons';
import theme from './theme';

// this is the storybook theme
addons.setConfig({
  theme,
  enableShortcuts: false
});
