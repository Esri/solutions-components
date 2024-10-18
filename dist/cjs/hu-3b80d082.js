/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

const calciteInputTimePicker_entry = require('./calcite-input-time-picker-74396a94.js');
require('./index-4b68e4b4.js');
require('./form-6dd8050a.js');
require('./dom-795d4a33.js');
require('./guid-e84a8375.js');
require('./resources-18f799c7.js');
require('./interactive-a128ac30.js');
require('./key-47c9469a.js');
require('./label-726fc287.js');
require('./component-5d190962.js');
require('./loadable-1c888c87.js');
require('./browser-333a21c5.js');
require('./locale-da840314.js');
require('./observers-18d87cb5.js');
require('./focusTrapComponent-b19fd5d5.js');
require('./config-e76d9931.js');
require('./time-a92ca33f.js');
require('./math-089392ef.js');
require('./t9n-ed5c03a7.js');
require('./Validation-55fc2417.js');
require('./input-8c28213d.js');

// Hungarian [hu]
var locale = {
  name: 'hu',
  weekdays: 'vasárnap_hétfő_kedd_szerda_csütörtök_péntek_szombat'.split('_'),
  weekdaysShort: 'vas_hét_kedd_sze_csüt_pén_szo'.split('_'),
  weekdaysMin: 'v_h_k_sze_cs_p_szo'.split('_'),
  months: 'január_február_március_április_május_június_július_augusztus_szeptember_október_november_december'.split('_'),
  monthsShort: 'jan_feb_márc_ápr_máj_jún_júl_aug_szept_okt_nov_dec'.split('_'),
  ordinal: function ordinal(n) {
    return n + ".";
  },
  weekStart: 1,
  relativeTime: {
    future: '%s múlva',
    past: '%s',
    s: function s(_, _s, ___, isFuture) {
      return "n\xE9h\xE1ny m\xE1sodperc" + (isFuture || _s ? '' : 'e');
    },
    m: function m(_, s, ___, isFuture) {
      return "egy perc" + (isFuture || s ? '' : 'e');
    },
    mm: function mm(n, s, ___, isFuture) {
      return n + " perc" + (isFuture || s ? '' : 'e');
    },
    h: function h(_, s, ___, isFuture) {
      return "egy " + (isFuture || s ? 'óra' : 'órája');
    },
    hh: function hh(n, s, ___, isFuture) {
      return n + " " + (isFuture || s ? 'óra' : 'órája');
    },
    d: function d(_, s, ___, isFuture) {
      return "egy " + (isFuture || s ? 'nap' : 'napja');
    },
    dd: function dd(n, s, ___, isFuture) {
      return n + " " + (isFuture || s ? 'nap' : 'napja');
    },
    M: function M(_, s, ___, isFuture) {
      return "egy " + (isFuture || s ? 'hónap' : 'hónapja');
    },
    MM: function MM(n, s, ___, isFuture) {
      return n + " " + (isFuture || s ? 'hónap' : 'hónapja');
    },
    y: function y(_, s, ___, isFuture) {
      return "egy " + (isFuture || s ? 'év' : 'éve');
    },
    yy: function yy(n, s, ___, isFuture) {
      return n + " " + (isFuture || s ? 'év' : 'éve');
    }
  },
  formats: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'YYYY.MM.DD.',
    LL: 'YYYY. MMMM D.',
    LLL: 'YYYY. MMMM D. H:mm',
    LLLL: 'YYYY. MMMM D., dddd H:mm'
  }
};
calciteInputTimePicker_entry.dayjs.locale(locale, null, true);

exports['default'] = locale;
