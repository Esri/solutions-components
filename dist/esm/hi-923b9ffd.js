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

// Hindi [hi]
var locale = {
  name: 'hi',
  weekdays: 'रविवार_सोमवार_मंगलवार_बुधवार_गुरूवार_शुक्रवार_शनिवार'.split('_'),
  months: 'जनवरी_फ़रवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितम्बर_अक्टूबर_नवम्बर_दिसम्बर'.split('_'),
  weekdaysShort: 'रवि_सोम_मंगल_बुध_गुरू_शुक्र_शनि'.split('_'),
  monthsShort: 'जन._फ़र._मार्च_अप्रै._मई_जून_जुल._अग._सित._अक्टू._नव._दिस.'.split('_'),
  weekdaysMin: 'र_सो_मं_बु_गु_शु_श'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'A h:mm बजे',
    LTS: 'A h:mm:ss बजे',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY, A h:mm बजे',
    LLLL: 'dddd, D MMMM YYYY, A h:mm बजे'
  },
  relativeTime: {
    future: '%s में',
    past: '%s पहले',
    s: 'कुछ ही क्षण',
    m: 'एक मिनट',
    mm: '%d मिनट',
    h: 'एक घंटा',
    hh: '%d घंटे',
    d: 'एक दिन',
    dd: '%d दिन',
    M: 'एक महीने',
    MM: '%d महीने',
    y: 'एक वर्ष',
    yy: '%d वर्ष'
  }
};
dayjs.locale(locale, null, true);

export { locale as default };
