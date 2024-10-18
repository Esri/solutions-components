/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { d as dayjs } from './p-8d0d5a69.js';
import './p-4e6eb06e.js';
import './p-6adaac20.js';
import './p-621ad249.js';
import './p-7d542581.js';
import './p-91371f97.js';
import './p-d6902512.js';
import './p-233f219c.js';
import './p-d25fc2c2.js';
import './p-4a291f79.js';
import './p-ad9d1221.js';
import './p-4f82eb55.js';
import './p-895e7b9c.js';
import './p-ff336351.js';
import './p-4253e9f1.js';
import './p-a02e2069.js';
import './p-27a4a537.js';
import './p-61aebbb5.js';
import './p-efaa77a0.js';
import './p-745efeab.js';
import './p-f0c96a6a.js';

// Estonian [et]

function relativeTimeWithTense(number, withoutSuffix, key, isFuture) {
  var format = {
    s: ['mõne sekundi', 'mõni sekund', 'paar sekundit'],
    m: ['ühe minuti', 'üks minut'],
    mm: ['%d minuti', '%d minutit'],
    h: ['ühe tunni', 'tund aega', 'üks tund'],
    hh: ['%d tunni', '%d tundi'],
    d: ['ühe päeva', 'üks päev'],
    M: ['kuu aja', 'kuu aega', 'üks kuu'],
    MM: ['%d kuu', '%d kuud'],
    y: ['ühe aasta', 'aasta', 'üks aasta'],
    yy: ['%d aasta', '%d aastat']
  };

  if (withoutSuffix) {
    return (format[key][2] ? format[key][2] : format[key][1]).replace('%d', number);
  }

  return (isFuture ? format[key][0] : format[key][1]).replace('%d', number);
}

var locale = {
  name: 'et',
  // Estonian
  weekdays: 'pühapäev_esmaspäev_teisipäev_kolmapäev_neljapäev_reede_laupäev'.split('_'),
  // Note weekdays are not capitalized in Estonian
  weekdaysShort: 'P_E_T_K_N_R_L'.split('_'),
  // There is no short form of weekdays in Estonian except this 1 letter format so it is used for both 'weekdaysShort' and 'weekdaysMin'
  weekdaysMin: 'P_E_T_K_N_R_L'.split('_'),
  months: 'jaanuar_veebruar_märts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember'.split('_'),
  // Note month names are not capitalized in Estonian
  monthsShort: 'jaan_veebr_märts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets'.split('_'),
  ordinal: function ordinal(n) {
    return n + ".";
  },
  weekStart: 1,
  relativeTime: {
    future: '%s pärast',
    past: '%s tagasi',
    s: relativeTimeWithTense,
    m: relativeTimeWithTense,
    mm: relativeTimeWithTense,
    h: relativeTimeWithTense,
    hh: relativeTimeWithTense,
    d: relativeTimeWithTense,
    dd: '%d päeva',
    M: relativeTimeWithTense,
    MM: relativeTimeWithTense,
    y: relativeTimeWithTense,
    yy: relativeTimeWithTense
  },
  formats: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D. MMMM YYYY',
    LLL: 'D. MMMM YYYY H:mm',
    LLLL: 'dddd, D. MMMM YYYY H:mm'
  }
};
dayjs.locale(locale, null, true);

export { locale as default };
