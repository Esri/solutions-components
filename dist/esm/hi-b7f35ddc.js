/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { d as dayjs } from './calcite-input-time-picker-cc675f33.js';
import './index-904bc599.js';
import './form-d45062d8.js';
import './dom-75c641a7.js';
import './guid-b0fb1de3.js';
import './resources-8e2ed936.js';
import './interactive-98ed6b6f.js';
import './key-e6b442de.js';
import './label-272c5973.js';
import './component-83541c88.js';
import './loadable-7cb2fc6f.js';
import './browser-b67d8df6.js';
import './locale-24516fec.js';
import './observers-c83631e8.js';
import './focusTrapComponent-35b3348c.js';
import './config-16813c92.js';
import './time-fbe17659.js';
import './math-d7c8823c.js';
import './t9n-9a5d28cf.js';
import './Validation-cf136c56.js';
import './input-e01adc49.js';

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
