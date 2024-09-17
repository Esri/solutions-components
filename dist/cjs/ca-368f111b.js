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

// Catalan [ca]
var locale = {
  name: 'ca',
  weekdays: 'Diumenge_Dilluns_Dimarts_Dimecres_Dijous_Divendres_Dissabte'.split('_'),
  weekdaysShort: 'Dg._Dl._Dt._Dc._Dj._Dv._Ds.'.split('_'),
  weekdaysMin: 'Dg_Dl_Dt_Dc_Dj_Dv_Ds'.split('_'),
  months: 'Gener_Febrer_Març_Abril_Maig_Juny_Juliol_Agost_Setembre_Octubre_Novembre_Desembre'.split('_'),
  monthsShort: 'Gen._Febr._Març_Abr._Maig_Juny_Jul._Ag._Set._Oct._Nov._Des.'.split('_'),
  weekStart: 1,
  formats: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM [de] YYYY',
    LLL: 'D MMMM [de] YYYY [a les] H:mm',
    LLLL: 'dddd D MMMM [de] YYYY [a les] H:mm',
    ll: 'D MMM YYYY',
    lll: 'D MMM YYYY, H:mm',
    llll: 'ddd D MMM YYYY, H:mm'
  },
  relativeTime: {
    future: 'd\'aquí %s',
    past: 'fa %s',
    s: 'uns segons',
    m: 'un minut',
    mm: '%d minuts',
    h: 'una hora',
    hh: '%d hores',
    d: 'un dia',
    dd: '%d dies',
    M: 'un mes',
    MM: '%d mesos',
    y: 'un any',
    yy: '%d anys'
  },
  ordinal: function ordinal(n) {
    var ord;
    if (n === 1 || n === 3) ord = 'r';else if (n === 2) ord = 'n';else if (n === 4) ord = 't';else ord = 'è';
    return "" + n + ord;
  }
};
calciteInputTimePicker_entry.dayjs.locale(locale, null, true);

exports['default'] = locale;
