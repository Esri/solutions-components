/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

const calciteInputTimePicker_entry = require('./calcite-input-time-picker-bb2db82c.js');
require('./index-105cf2b9.js');
require('./form-fed676d6.js');
require('./dom-c9c2c835.js');
require('./guid-ae73cd27.js');
require('./resources-9447c777.js');
require('./interactive-3ab7044d.js');
require('./browser-d08a5f99.js');
require('./key-c5504030.js');
require('./label-32573e1d.js');
require('./component-ac7c3bd8.js');
require('./loadable-5a794992.js');
require('./locale-d237c9d5.js');
require('./observers-db4527e4.js');
require('./focusTrapComponent-faae7d7e.js');
require('./time-ff8d50c7.js');
require('./math-318a1646.js');
require('./t9n-993a84de.js');
require('./openCloseComponent-19a769d0.js');
require('./Validation-b02c6710.js');

// Portuguese (Brazil) [pt-br]
var locale = {
  name: 'pt-br',
  weekdays: 'domingo_segunda-feira_terça-feira_quarta-feira_quinta-feira_sexta-feira_sábado'.split('_'),
  weekdaysShort: 'dom_seg_ter_qua_qui_sex_sáb'.split('_'),
  weekdaysMin: 'Do_2ª_3ª_4ª_5ª_6ª_Sá'.split('_'),
  months: 'janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro'.split('_'),
  monthsShort: 'jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez'.split('_'),
  ordinal: function ordinal(n) {
    return n + "\xBA";
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D [de] MMMM [de] YYYY',
    LLL: 'D [de] MMMM [de] YYYY [às] HH:mm',
    LLLL: 'dddd, D [de] MMMM [de] YYYY [às] HH:mm'
  },
  relativeTime: {
    future: 'em %s',
    past: 'há %s',
    s: 'poucos segundos',
    m: 'um minuto',
    mm: '%d minutos',
    h: 'uma hora',
    hh: '%d horas',
    d: 'um dia',
    dd: '%d dias',
    M: 'um mês',
    MM: '%d meses',
    y: 'um ano',
    yy: '%d anos'
  }
};
calciteInputTimePicker_entry.dayjs.locale(locale, null, true);

exports.default = locale;
