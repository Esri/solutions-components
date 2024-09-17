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

// Lithuanian [lt]
var monthFormat = 'sausio_vasario_kovo_balandžio_gegužės_birželio_liepos_rugpjūčio_rugsėjo_spalio_lapkričio_gruodžio'.split('_');
var monthStandalone = 'sausis_vasaris_kovas_balandis_gegužė_birželis_liepa_rugpjūtis_rugsėjis_spalis_lapkritis_gruodis'.split('_'); // eslint-disable-next-line no-useless-escape

var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?|MMMM?(\[[^\[\]]*\]|\s)+D[oD]?/;

var months = function months(dayjsInstance, format) {
  if (MONTHS_IN_FORMAT.test(format)) {
    return monthFormat[dayjsInstance.month()];
  }

  return monthStandalone[dayjsInstance.month()];
};

months.s = monthStandalone;
months.f = monthFormat;
var locale = {
  name: 'lt',
  weekdays: 'sekmadienis_pirmadienis_antradienis_trečiadienis_ketvirtadienis_penktadienis_šeštadienis'.split('_'),
  weekdaysShort: 'sek_pir_ant_tre_ket_pen_šeš'.split('_'),
  weekdaysMin: 's_p_a_t_k_pn_š'.split('_'),
  months: months,
  monthsShort: 'sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd'.split('_'),
  ordinal: function ordinal(n) {
    return n + ".";
  },
  weekStart: 1,
  relativeTime: {
    future: 'už %s',
    past: 'prieš %s',
    s: 'kelias sekundes',
    m: 'minutę',
    mm: '%d minutes',
    h: 'valandą',
    hh: '%d valandas',
    d: 'dieną',
    dd: '%d dienas',
    M: 'mėnesį',
    MM: '%d mėnesius',
    y: 'metus',
    yy: '%d metus'
  },
  format: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'YYYY-MM-DD',
    LL: 'YYYY [m.] MMMM D [d.]',
    LLL: 'YYYY [m.] MMMM D [d.], HH:mm [val.]',
    LLLL: 'YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]',
    l: 'YYYY-MM-DD',
    ll: 'YYYY [m.] MMMM D [d.]',
    lll: 'YYYY [m.] MMMM D [d.], HH:mm [val.]',
    llll: 'YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]'
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'YYYY-MM-DD',
    LL: 'YYYY [m.] MMMM D [d.]',
    LLL: 'YYYY [m.] MMMM D [d.], HH:mm [val.]',
    LLLL: 'YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]',
    l: 'YYYY-MM-DD',
    ll: 'YYYY [m.] MMMM D [d.]',
    lll: 'YYYY [m.] MMMM D [d.], HH:mm [val.]',
    llll: 'YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]'
  }
};
dayjs.locale(locale, null, true);

export { locale as default };
