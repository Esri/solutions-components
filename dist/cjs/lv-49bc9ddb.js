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

// Latvian [lv]
var locale = {
  name: 'lv',
  weekdays: 'svētdiena_pirmdiena_otrdiena_trešdiena_ceturtdiena_piektdiena_sestdiena'.split('_'),
  months: 'janvāris_februāris_marts_aprīlis_maijs_jūnijs_jūlijs_augusts_septembris_oktobris_novembris_decembris'.split('_'),
  weekStart: 1,
  weekdaysShort: 'Sv_P_O_T_C_Pk_S'.split('_'),
  monthsShort: 'jan_feb_mar_apr_mai_jūn_jūl_aug_sep_okt_nov_dec'.split('_'),
  weekdaysMin: 'Sv_P_O_T_C_Pk_S'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD.MM.YYYY.',
    LL: 'YYYY. [gada] D. MMMM',
    LLL: 'YYYY. [gada] D. MMMM, HH:mm',
    LLLL: 'YYYY. [gada] D. MMMM, dddd, HH:mm'
  },
  relativeTime: {
    future: 'pēc %s',
    past: 'pirms %s',
    s: 'dažām sekundēm',
    m: 'minūtes',
    mm: '%d minūtēm',
    h: 'stundas',
    hh: '%d stundām',
    d: 'dienas',
    dd: '%d dienām',
    M: 'mēneša',
    MM: '%d mēnešiem',
    y: 'gada',
    yy: '%d gadiem'
  }
};
calciteInputTimePicker_entry.dayjs.locale(locale, null, true);

exports['default'] = locale;
