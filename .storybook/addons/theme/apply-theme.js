import { useEffect } from '@storybook/addons';

/*
  A global decorator that applies the theme defined in globals.currentTheme
*/

const applyTheme = theme => {
  Object.entries(theme).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
  });
};

export const withTheme = (StoryFn, context) => {
  const { globals } = context;
  const currentTheme = globals.currentTheme;

  useEffect(() => {
    applyTheme(currentTheme);
  }, [currentTheme]);

  return StoryFn();
};
