/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

const calciteInputTimePicker_entry = require('./calcite-input-time-picker-bb2db82c.js');
require('./index-105cf2b9.js');
require('./form-fed676d6.js');
require('./dom-c9c2c835.js');
require('./guid-ae73cd27.js');
require('./resources-9447c777.js');
require('./interactive-3ab7044d.js');
require('./browser-d08a5f99.js');
require('./key-c5504030.js');
require('./label-32573e1d.js');
require('./component-ac7c3bd8.js');
require('./loadable-5a794992.js');
require('./locale-d237c9d5.js');
require('./observers-db4527e4.js');
require('./focusTrapComponent-faae7d7e.js');
require('./time-ff8d50c7.js');
require('./math-318a1646.js');
require('./t9n-993a84de.js');
require('./openCloseComponent-19a769d0.js');
require('./Validation-b02c6710.js');

// Norwegian Bokmål [nb]
var locale = {
  name: 'nb',
  weekdays: 'søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag'.split('_'),
  weekdaysShort: 'sø._ma._ti._on._to._fr._lø.'.split('_'),
  weekdaysMin: 'sø_ma_ti_on_to_fr_lø'.split('_'),
  months: 'januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
  monthsShort: 'jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.'.split('_'),
  ordinal: function ordinal(n) {
    return n + ".";
  },
  weekStart: 1,
  yearStart: 4,
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D. MMMM YYYY',
    LLL: 'D. MMMM YYYY [kl.] HH:mm',
    LLLL: 'dddd D. MMMM YYYY [kl.] HH:mm'
  },
  relativeTime: {
    future: 'om %s',
    past: '%s siden',
    s: 'noen sekunder',
    m: 'ett minutt',
    mm: '%d minutter',
    h: 'en time',
    hh: '%d timer',
    d: 'en dag',
    dd: '%d dager',
    M: 'en måned',
    MM: '%d måneder',
    y: 'ett år',
    yy: '%d år'
  }
};
calciteInputTimePicker_entry.dayjs.locale(locale, null, true);

exports.default = locale;
