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

// Swedish [sv]
var locale = {
  name: 'sv',
  weekdays: 'söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag'.split('_'),
  weekdaysShort: 'sön_mån_tis_ons_tor_fre_lör'.split('_'),
  weekdaysMin: 'sö_må_ti_on_to_fr_lö'.split('_'),
  months: 'januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december'.split('_'),
  monthsShort: 'jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec'.split('_'),
  weekStart: 1,
  yearStart: 4,
  ordinal: function ordinal(n) {
    var b = n % 10;
    var o = b === 1 || b === 2 ? 'a' : 'e';
    return "[" + n + o + "]";
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'YYYY-MM-DD',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY [kl.] HH:mm',
    LLLL: 'dddd D MMMM YYYY [kl.] HH:mm',
    lll: 'D MMM YYYY HH:mm',
    llll: 'ddd D MMM YYYY HH:mm'
  },
  relativeTime: {
    future: 'om %s',
    past: 'för %s sedan',
    s: 'några sekunder',
    m: 'en minut',
    mm: '%d minuter',
    h: 'en timme',
    hh: '%d timmar',
    d: 'en dag',
    dd: '%d dagar',
    M: 'en månad',
    MM: '%d månader',
    y: 'ett år',
    yy: '%d år'
  }
};
calciteInputTimePicker_entry.dayjs.locale(locale, null, true);

exports['default'] = locale;
