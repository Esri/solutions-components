import React from 'react';
import { AddonPanel } from '@storybook/components';
import { addons, types } from '@storybook/addons';
import { ThemePicker } from './theme-picker';

const ADDON_ID = 'theme-picker';
const PANEL_ID = `${ADDON_ID}/panel`;

addons.register(ADDON_ID, (api) => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Theme',
    render: ({ active, key }) => (
      <AddonPanel active={active} key={key}>
        <ThemePicker />
      </AddonPanel>
    ),
  });
});
