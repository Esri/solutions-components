import React, { useState } from 'react';
import { useGlobals } from '@storybook/api';
import { Button,  } from '@storybook/components';
import * as themes from './themes';

/*
  A panel that allows setting the theme defined in globals.currentTheme
*/

// TODO: there are better ways to do this....
const containerStyle = {
  padding: '10px',
};

const toolbarStyle = {
  display: 'flex',
  gap: '1rem',
};

const swatchesStyle = {
  marginTop: '10px',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '5px',
};

const labelStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '5px 10px',
  border: 'solid 1px lightgray',
};

export const ThemePicker = _ => {
  const [globals, updateGlobals] = useGlobals();

  const [namedTheme, setNamedTheme] = useState(0);

  const setColor = evt => {
    const { name, value } = evt.target;
    const currentTheme = { ...globals.currentTheme, [name]: value };
    applyTheme(currentTheme);
  }

  const applyNamedTheme = themeName => {
    const theme = themes[themeName];
    setNamedTheme(themeName);
    theme && applyTheme(theme);
  };

  const applyTheme = theme => {
    updateGlobals({ currentTheme: theme })
  }

  const currentTheme = globals.currentTheme || {};

  return (
    <div className="theme-picker" style={containerStyle}>
      <div className="theme-picker-toolbar" style={toolbarStyle}>
        {Object.keys(themes).map((theme, idx) => {
            const themeName = theme.replace('Theme', '');
            return <Button key={idx} secondary outline small onClick={_ => applyNamedTheme(theme)}>{themeName}</Button>;
          }
        )}
      </div>
      <div className="theme-picker-swatches" style={swatchesStyle}>
        {Object.keys(currentTheme).map((key, idx) => (
          <label key={idx} style={labelStyle}>{key}: <input type="color" name={key} value={currentTheme[key]} onChange={setColor} /></label>
        ))}
      </div>
    </div>
  );
};