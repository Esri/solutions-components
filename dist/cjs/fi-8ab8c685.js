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

// Finnish [fi]

function relativeTimeFormatter(number, withoutSuffix, key, isFuture) {
  var past = {
    s: 'muutama sekunti',
    m: 'minuutti',
    mm: '%d minuuttia',
    h: 'tunti',
    hh: '%d tuntia',
    d: 'päivä',
    dd: '%d päivää',
    M: 'kuukausi',
    MM: '%d kuukautta',
    y: 'vuosi',
    yy: '%d vuotta',
    numbers: 'nolla_yksi_kaksi_kolme_neljä_viisi_kuusi_seitsemän_kahdeksan_yhdeksän'.split('_')
  };
  var future = {
    s: 'muutaman sekunnin',
    m: 'minuutin',
    mm: '%d minuutin',
    h: 'tunnin',
    hh: '%d tunnin',
    d: 'päivän',
    dd: '%d päivän',
    M: 'kuukauden',
    MM: '%d kuukauden',
    y: 'vuoden',
    yy: '%d vuoden',
    numbers: 'nollan_yhden_kahden_kolmen_neljän_viiden_kuuden_seitsemän_kahdeksan_yhdeksän'.split('_')
  };
  var words = isFuture && !withoutSuffix ? future : past;
  var result = words[key];

  if (number < 10) {
    return result.replace('%d', words.numbers[number]);
  }

  return result.replace('%d', number);
}

var locale = {
  name: 'fi',
  // Finnish
  weekdays: 'sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai'.split('_'),
  // Note weekdays are not capitalized in Finnish
  weekdaysShort: 'su_ma_ti_ke_to_pe_la'.split('_'),
  // There is no short form of weekdays in Finnish except this 2 letter format so it is used for both 'weekdaysShort' and 'weekdaysMin'
  weekdaysMin: 'su_ma_ti_ke_to_pe_la'.split('_'),
  months: 'tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesäkuu_heinäkuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu'.split('_'),
  // Note month names are not capitalized in Finnish
  monthsShort: 'tammi_helmi_maalis_huhti_touko_kesä_heinä_elo_syys_loka_marras_joulu'.split('_'),
  ordinal: function ordinal(n) {
    return n + ".";
  },
  weekStart: 1,
  yearStart: 4,
  relativeTime: {
    future: '%s päästä',
    past: '%s sitten',
    s: relativeTimeFormatter,
    m: relativeTimeFormatter,
    mm: relativeTimeFormatter,
    h: relativeTimeFormatter,
    hh: relativeTimeFormatter,
    d: relativeTimeFormatter,
    dd: relativeTimeFormatter,
    M: relativeTimeFormatter,
    MM: relativeTimeFormatter,
    y: relativeTimeFormatter,
    yy: relativeTimeFormatter
  },
  formats: {
    LT: 'HH.mm',
    LTS: 'HH.mm.ss',
    L: 'DD.MM.YYYY',
    LL: 'D. MMMM[ta] YYYY',
    LLL: 'D. MMMM[ta] YYYY, [klo] HH.mm',
    LLLL: 'dddd, D. MMMM[ta] YYYY, [klo] HH.mm',
    l: 'D.M.YYYY',
    ll: 'D. MMM YYYY',
    lll: 'D. MMM YYYY, [klo] HH.mm',
    llll: 'ddd, D. MMM YYYY, [klo] HH.mm'
  }
};
calciteInputTimePicker_entry.dayjs.locale(locale, null, true);

exports['default'] = locale;
