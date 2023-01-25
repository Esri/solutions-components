/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

const index = require('./index-7af21b6f.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */
const CSS = {
  container: "container",
  controlSection: "control-section",
  hexOptions: "color-hex-options",
  section: "section",
  header: "header",
  control: "control",
  splitSection: "section--split",
  colorModeContainer: "color-mode-container",
  colorMode: "color-mode",
  channels: "channels",
  channel: "channel",
  savedColors: "saved-colors",
  savedColorsSection: "saved-colors-section",
  saveColor: "save-color",
  deleteColor: "delete-color",
  savedColorsButtons: "saved-colors-buttons",
  headerHex: "header--hex",
  colorFieldAndSlider: "color-field-and-slider",
  colorFieldAndSliderInteractive: "color-field-and-slider--interactive",
  colorFieldAndSliderWrap: "color-field-and-slider-wrap",
  scope: "scope",
  hueScope: "scope--hue",
  colorFieldScope: "scope--color-field",
  savedColor: "saved-color"
};
const DEFAULT_COLOR = index.color("#007AC2");
const DEFAULT_STORAGE_KEY_PREFIX = "calcite-color-";
const RGB_LIMITS = {
  r: 255,
  g: 255,
  b: 255
};
const HSV_LIMITS = {
  h: 360,
  s: 100,
  v: 100
};
const TEXT = {
  b: "B",
  blue: "Blue",
  deleteColor: "Delete color",
  g: "G",
  green: "Green",
  h: "H",
  hsv: "HSV",
  hex: "Hex",
  hue: "Hue",
  noColor: "No color",
  r: "R",
  red: "Red",
  rgb: "RGB",
  s: "S",
  saturation: "Saturation",
  saveColor: "Save color",
  saved: "Saved",
  v: "V",
  value: "Value"
};
const DIMENSIONS = {
  s: {
    slider: {
      height: 10,
      width: 160
    },
    colorField: {
      height: 80,
      width: 160
    },
    thumb: {
      radius: 8
    }
  },
  m: {
    slider: {
      height: 14,
      width: 272
    },
    colorField: {
      height: 150,
      width: 272
    },
    thumb: {
      radius: 10
    }
  },
  l: {
    slider: {
      height: 16,
      width: 464
    },
    colorField: {
      height: 200,
      width: 464
    },
    thumb: {
      radius: 12
    }
  }
};

exports.CSS = CSS;
exports.DEFAULT_COLOR = DEFAULT_COLOR;
exports.DEFAULT_STORAGE_KEY_PREFIX = DEFAULT_STORAGE_KEY_PREFIX;
exports.DIMENSIONS = DIMENSIONS;
exports.HSV_LIMITS = HSV_LIMITS;
exports.RGB_LIMITS = RGB_LIMITS;
exports.TEXT = TEXT;
