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

// Indonesian [id]
var locale = {
  name: 'id',
  weekdays: 'Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu'.split('_'),
  months: 'Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember'.split('_'),
  weekdaysShort: 'Min_Sen_Sel_Rab_Kam_Jum_Sab'.split('_'),
  monthsShort: 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Agt_Sep_Okt_Nov_Des'.split('_'),
  weekdaysMin: 'Mg_Sn_Sl_Rb_Km_Jm_Sb'.split('_'),
  weekStart: 1,
  formats: {
    LT: 'HH.mm',
    LTS: 'HH.mm.ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY [pukul] HH.mm',
    LLLL: 'dddd, D MMMM YYYY [pukul] HH.mm'
  },
  relativeTime: {
    future: 'dalam %s',
    past: '%s yang lalu',
    s: 'beberapa detik',
    m: 'semenit',
    mm: '%d menit',
    h: 'sejam',
    hh: '%d jam',
    d: 'sehari',
    dd: '%d hari',
    M: 'sebulan',
    MM: '%d bulan',
    y: 'setahun',
    yy: '%d tahun'
  },
  ordinal: function ordinal(n) {
    return n + ".";
  }
};
calciteInputTimePicker_entry.dayjs.locale(locale, null, true);

exports.default = locale;
