/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { d as dayjs } from './calcite-input-time-picker-60dbdc25.js';
import './index-b793d9aa.js';
import './form-ba965042.js';
import './dom-b5c50286.js';
import './guid-4c746a7f.js';
import './resources-defbb49f.js';
import './interactive-742ba555.js';
import './browser-552eb2d0.js';
import './key-58898f0a.js';
import './label-0b82858a.js';
import './component-c2c32481.js';
import './loadable-73f289b6.js';
import './locale-21e40b0c.js';
import './observers-e2484555.js';
import './focusTrapComponent-6ec0f681.js';
import './config-2fa7bb77.js';
import './time-a215e415.js';
import './math-8c04292e.js';
import './t9n-2fb3af62.js';
import './Validation-63949b7d.js';
import './input-d11f5ac8.js';

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
dayjs.locale(locale, null, true);

export { locale as default };
