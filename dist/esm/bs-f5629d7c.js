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
dayjs.locale(locale, null, true);

export { locale as default };
