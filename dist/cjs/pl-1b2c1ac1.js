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

// Polish [pl]

function plural(n) {
  return n % 10 < 5 && n % 10 > 1 && ~~(n / 10) % 10 !== 1; // eslint-disable-line
}
/* eslint-disable */


function translate(number, withoutSuffix, key) {
  var result = number + " ";

  switch (key) {
    case 'm':
      return withoutSuffix ? 'minuta' : 'minutę';

    case 'mm':
      return result + (plural(number) ? 'minuty' : 'minut');

    case 'h':
      return withoutSuffix ? 'godzina' : 'godzinę';

    case 'hh':
      return result + (plural(number) ? 'godziny' : 'godzin');

    case 'MM':
      return result + (plural(number) ? 'miesiące' : 'miesięcy');

    case 'yy':
      return result + (plural(number) ? 'lata' : 'lat');
  }
}
/* eslint-enable */


var monthFormat = 'stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia'.split('_');
var monthStandalone = 'styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień'.split('_');
var MONTHS_IN_FORMAT = /D MMMM/;

var months = function months(dayjsInstance, format) {
  if (MONTHS_IN_FORMAT.test(format)) {
    return monthFormat[dayjsInstance.month()];
  }

  return monthStandalone[dayjsInstance.month()];
};

months.s = monthStandalone;
months.f = monthFormat;
var locale = {
  name: 'pl',
  weekdays: 'niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota'.split('_'),
  weekdaysShort: 'ndz_pon_wt_śr_czw_pt_sob'.split('_'),
  weekdaysMin: 'Nd_Pn_Wt_Śr_Cz_Pt_So'.split('_'),
  months: months,
  monthsShort: 'sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru'.split('_'),
  ordinal: function ordinal(n) {
    return n + ".";
  },
  weekStart: 1,
  yearStart: 4,
  relativeTime: {
    future: 'za %s',
    past: '%s temu',
    s: 'kilka sekund',
    m: translate,
    mm: translate,
    h: translate,
    hh: translate,
    d: '1 dzień',
    dd: '%d dni',
    M: 'miesiąc',
    MM: translate,
    y: 'rok',
    yy: translate
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd, D MMMM YYYY HH:mm'
  }
};
calciteInputTimePicker_entry.dayjs.locale(locale, null, true);

exports['default'] = locale;
