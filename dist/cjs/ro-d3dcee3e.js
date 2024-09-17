/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

const calciteInputTimePicker_entry = require('./calcite-input-time-picker-de202530.js');
require('./index-5a0af791.js');
require('./form-5229f1c8.js');
require('./dom-6a9b6275.js');
require('./guid-02e5380f.js');
require('./resources-dfe71ff2.js');
require('./interactive-89f913ba.js');
require('./browser-69696af0.js');
require('./key-d6da79d8.js');
require('./label-26ee0ddb.js');
require('./component-a4c6a35d.js');
require('./loadable-2e2626dc.js');
require('./locale-42c21404.js');
require('./observers-8fed90f3.js');
require('./focusTrapComponent-a4531bc7.js');
require('./config-afe9063b.js');
require('./time-d48f5d3e.js');
require('./math-2911c0c9.js');
require('./t9n-42ba6ea3.js');
require('./Validation-aa47298a.js');
require('./input-33270a99.js');

// Romanian [ro]
var locale = {
  name: 'ro',
  weekdays: 'Duminică_Luni_Marți_Miercuri_Joi_Vineri_Sâmbătă'.split('_'),
  weekdaysShort: 'Dum_Lun_Mar_Mie_Joi_Vin_Sâm'.split('_'),
  weekdaysMin: 'Du_Lu_Ma_Mi_Jo_Vi_Sâ'.split('_'),
  months: 'Ianuarie_Februarie_Martie_Aprilie_Mai_Iunie_Iulie_August_Septembrie_Octombrie_Noiembrie_Decembrie'.split('_'),
  monthsShort: 'Ian._Febr._Mart._Apr._Mai_Iun._Iul._Aug._Sept._Oct._Nov._Dec.'.split('_'),
  weekStart: 1,
  formats: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY H:mm',
    LLLL: 'dddd, D MMMM YYYY H:mm'
  },
  relativeTime: {
    future: 'peste %s',
    past: 'acum %s',
    s: 'câteva secunde',
    m: 'un minut',
    mm: '%d minute',
    h: 'o oră',
    hh: '%d ore',
    d: 'o zi',
    dd: '%d zile',
    M: 'o lună',
    MM: '%d luni',
    y: 'un an',
    yy: '%d ani'
  },
  ordinal: function ordinal(n) {
    return n;
  }
};
calciteInputTimePicker_entry.dayjs.locale(locale, null, true);

exports['default'] = locale;
