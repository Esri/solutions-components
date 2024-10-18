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

// Bosnian [bs]
var locale = {
  name: 'bs',
  weekdays: 'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
  months: 'januar_februar_mart_april_maj_juni_juli_august_septembar_oktobar_novembar_decembar'.split('_'),
  weekStart: 1,
  weekdaysShort: 'ned._pon._uto._sri._čet._pet._sub.'.split('_'),
  monthsShort: 'jan._feb._mar._apr._maj._jun._jul._aug._sep._okt._nov._dec.'.split('_'),
  weekdaysMin: 'ne_po_ut_sr_če_pe_su'.split('_'),
  ordinal: function ordinal(n) {
    return n;
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
calciteInputTimePicker_entry.dayjs.locale(locale, null, true);

exports['default'] = locale;
