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
calciteInputTimePicker_entry.dayjs.locale(locale, null, true);

exports.default = locale;
