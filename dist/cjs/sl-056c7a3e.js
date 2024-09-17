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

// Slovenian [sl]

function dual(n) {
  return n % 100 == 2; // eslint-disable-line
}

function threeFour(n) {
  return n % 100 == 3 || n % 100 == 4; // eslint-disable-line
}
/* eslint-disable */


function translate(number, withoutSuffix, key, isFuture) {
  var result = number + " ";

  switch (key) {
    case 's':
      // a few seconds / in a few seconds / a few seconds ago
      return withoutSuffix || isFuture ? 'nekaj sekund' : 'nekaj sekundami';

    case 'm':
      // a minute / in a minute / a minute ago
      return withoutSuffix ? 'ena minuta' : 'eno minuto';

    case 'mm':
      // 9 minutes / in 9 minutes / 9 minutes ago
      if (dual(number)) {
        return result + (withoutSuffix || isFuture ? 'minuti' : 'minutama');
      }

      if (threeFour(number)) {
        return result + (withoutSuffix || isFuture ? 'minute' : 'minutami');
      }

      return result + (withoutSuffix || isFuture ? 'minut' : 'minutami');

    case 'h':
      // an hour / in an hour / an hour ago
      return withoutSuffix ? 'ena ura' : isFuture ? 'eno uro' : 'eno uro';

    case 'hh':
      // 9 hours / in 9 hours / 9 hours ago
      if (dual(number)) {
        return result + (withoutSuffix || isFuture ? 'uri' : 'urama');
      }

      if (threeFour(number)) {
        return result + (withoutSuffix || isFuture ? 'ure' : 'urami');
      }

      return result + (withoutSuffix || isFuture ? 'ur' : 'urami');

    case 'd':
      // a day / in a day / a day ago
      return withoutSuffix || isFuture ? 'en dan' : 'enim dnem';

    case 'dd':
      // 9 days / in 9 days / 9 days ago
      if (dual(number)) {
        return result + (withoutSuffix || isFuture ? 'dneva' : 'dnevoma');
      }

      return result + (withoutSuffix || isFuture ? 'dni' : 'dnevi');

    case 'M':
      // a month / in a month / a month ago
      return withoutSuffix || isFuture ? 'en mesec' : 'enim mesecem';

    case 'MM':
      // 9 months / in 9 months / 9 months ago
      if (dual(number)) {
        // 2 minutes / in 2 minutes
        return result + (withoutSuffix || isFuture ? 'meseca' : 'mesecema');
      }

      if (threeFour(number)) {
        return result + (withoutSuffix || isFuture ? 'mesece' : 'meseci');
      }

      return result + (withoutSuffix || isFuture ? 'mesecev' : 'meseci');

    case 'y':
      // a year / in a year / a year ago
      return withoutSuffix || isFuture ? 'eno leto' : 'enim letom';

    case 'yy':
      // 9 years / in 9 years / 9 years ago
      if (dual(number)) {
        // 2 minutes / in 2 minutes
        return result + (withoutSuffix || isFuture ? 'leti' : 'letoma');
      }

      if (threeFour(number)) {
        return result + (withoutSuffix || isFuture ? 'leta' : 'leti');
      }

      return result + (withoutSuffix || isFuture ? 'let' : 'leti');
  }
}
/* eslint-enable */


var locale = {
  name: 'sl',
  weekdays: 'nedelja_ponedeljek_torek_sreda_četrtek_petek_sobota'.split('_'),
  months: 'januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december'.split('_'),
  weekStart: 1,
  weekdaysShort: 'ned._pon._tor._sre._čet._pet._sob.'.split('_'),
  monthsShort: 'jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.'.split('_'),
  weekdaysMin: 'ne_po_to_sr_če_pe_so'.split('_'),
  ordinal: function ordinal(n) {
    return n + ".";
  },
  formats: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D. MMMM YYYY',
    LLL: 'D. MMMM YYYY H:mm',
    LLLL: 'dddd, D. MMMM YYYY H:mm',
    l: 'D. M. YYYY'
  },
  relativeTime: {
    future: 'čez %s',
    past: 'pred %s',
    s: translate,
    m: translate,
    mm: translate,
    h: translate,
    hh: translate,
    d: translate,
    dd: translate,
    M: translate,
    MM: translate,
    y: translate,
    yy: translate
  }
};
calciteInputTimePicker_entry.dayjs.locale(locale, null, true);

exports['default'] = locale;
