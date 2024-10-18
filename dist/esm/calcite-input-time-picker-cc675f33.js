/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-904bc599.js';
import { s as submitForm, c as connectForm, d as disconnectForm, H as HiddenFormInputSlot } from './form-d45062d8.js';
import { u as updateHostInteraction, I as InteractiveContainer } from './interactive-98ed6b6f.js';
import { n as numberKeys } from './key-e6b442de.js';
import { c as connectLabel, d as disconnectLabel, g as getLabelText } from './label-272c5973.js';
import { c as componentFocusable, s as setUpLoadableComponent, a as setComponentLoaded } from './loadable-7cb2fc6f.js';
import { n as numberStringFormatter, g as getSupportedLocale, c as connectLocalized, d as disconnectLocalized } from './locale-24516fec.js';
import { a as activateFocusTrap, d as deactivateFocusTrap, c as connectFocusTrap } from './focusTrapComponent-35b3348c.js';
import { l as localizeTimeString, t as toISOTimeString, i as isValidTime, f as formatTimeString, a as formatTimePart } from './time-fbe17659.js';
import { u as updateMessages, c as connectMessages, s as setUpMessages, d as disconnectMessages } from './t9n-9a5d28cf.js';
import { d as decimalPlaces } from './math-d7c8823c.js';
import { g as getIconScale } from './component-83541c88.js';
import { V as Validation } from './Validation-cf136c56.js';
import { f as focusFirstTabbable, t as toAriaBoolean } from './dom-75c641a7.js';
import { s as syncHiddenFormInput } from './input-e01adc49.js';

var SECONDS_A_MINUTE = 60;
var SECONDS_A_HOUR = SECONDS_A_MINUTE * 60;
var SECONDS_A_DAY = SECONDS_A_HOUR * 24;
var SECONDS_A_WEEK = SECONDS_A_DAY * 7;
var MILLISECONDS_A_SECOND = 1e3;
var MILLISECONDS_A_MINUTE = SECONDS_A_MINUTE * MILLISECONDS_A_SECOND;
var MILLISECONDS_A_HOUR = SECONDS_A_HOUR * MILLISECONDS_A_SECOND;
var MILLISECONDS_A_DAY = SECONDS_A_DAY * MILLISECONDS_A_SECOND;
var MILLISECONDS_A_WEEK = SECONDS_A_WEEK * MILLISECONDS_A_SECOND; // English locales

var MS = 'millisecond';
var S = 'second';
var MIN = 'minute';
var H = 'hour';
var D = 'day';
var W = 'week';
var M = 'month';
var Q = 'quarter';
var Y = 'year';
var DATE = 'date';
var FORMAT_DEFAULT = 'YYYY-MM-DDTHH:mm:ssZ';
var INVALID_DATE_STRING = 'Invalid Date'; // regex

var REGEX_PARSE = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/;
var REGEX_FORMAT = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g;

// English [en]
// We don't need weekdaysShort, weekdaysMin, monthsShort in en.js locale
const en = {
  name: 'en',
  weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
  months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
  ordinal: function ordinal(n) {
    var s = ['th', 'st', 'nd', 'rd'];
    var v = n % 100;
    return "[" + n + (s[(v - 20) % 10] || s[v] || s[0]) + "]";
  }
};

const en$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': en
});

var padStart = function padStart(string, length, pad) {
  var s = String(string);
  if (!s || s.length >= length) return string;
  return "" + Array(length + 1 - s.length).join(pad) + string;
};

var padZoneStr = function padZoneStr(instance) {
  var negMinutes = -instance.utcOffset();
  var minutes = Math.abs(negMinutes);
  var hourOffset = Math.floor(minutes / 60);
  var minuteOffset = minutes % 60;
  return "" + (negMinutes <= 0 ? '+' : '-') + padStart(hourOffset, 2, '0') + ":" + padStart(minuteOffset, 2, '0');
};

var monthDiff = function monthDiff(a, b) {
  // function from moment.js in order to keep the same result
  if (a.date() < b.date()) return -monthDiff(b, a);
  var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month());
  var anchor = a.clone().add(wholeMonthDiff, M);
  var c = b - anchor < 0;
  var anchor2 = a.clone().add(wholeMonthDiff + (c ? -1 : 1), M);
  return +(-(wholeMonthDiff + (b - anchor) / (c ? anchor - anchor2 : anchor2 - anchor)) || 0);
};

var absFloor = function absFloor(n) {
  return n < 0 ? Math.ceil(n) || 0 : Math.floor(n);
};

var prettyUnit = function prettyUnit(u) {
  var special = {
    M: M,
    y: Y,
    w: W,
    d: D,
    D: DATE,
    h: H,
    m: MIN,
    s: S,
    ms: MS,
    Q: Q
  };
  return special[u] || String(u || '').toLowerCase().replace(/s$/, '');
};

var isUndefined = function isUndefined(s) {
  return s === undefined;
};

const U = {
  s: padStart,
  z: padZoneStr,
  m: monthDiff,
  a: absFloor,
  p: prettyUnit,
  u: isUndefined
};

var L = 'en'; // global locale

var Ls = {}; // global loaded locale

Ls[L] = en;
var IS_DAYJS = '$isDayjsObject'; // eslint-disable-next-line no-use-before-define

var isDayjs = function isDayjs(d) {
  return d instanceof Dayjs || !!(d && d[IS_DAYJS]);
};

var parseLocale = function parseLocale(preset, object, isLocal) {
  var l;
  if (!preset) return L;

  if (typeof preset === 'string') {
    var presetLower = preset.toLowerCase();

    if (Ls[presetLower]) {
      l = presetLower;
    }

    if (object) {
      Ls[presetLower] = object;
      l = presetLower;
    }

    var presetSplit = preset.split('-');

    if (!l && presetSplit.length > 1) {
      return parseLocale(presetSplit[0]);
    }
  } else {
    var name = preset.name;
    Ls[name] = preset;
    l = name;
  }

  if (!isLocal && l) L = l;
  return l || !isLocal && L;
};

var dayjs = function dayjs(date, c) {
  if (isDayjs(date)) {
    return date.clone();
  } // eslint-disable-next-line no-nested-ternary


  var cfg = typeof c === 'object' ? c : {};
  cfg.date = date;
  cfg.args = arguments; // eslint-disable-line prefer-rest-params

  return new Dayjs(cfg); // eslint-disable-line no-use-before-define
};

var wrapper = function wrapper(date, instance) {
  return dayjs(date, {
    locale: instance.$L,
    utc: instance.$u,
    x: instance.$x,
    $offset: instance.$offset // todo: refactor; do not use this.$offset in you code

  });
};

var Utils = U; // for plugin use

Utils.l = parseLocale;
Utils.i = isDayjs;
Utils.w = wrapper;

var parseDate = function parseDate(cfg) {
  var date = cfg.date,
      utc = cfg.utc;
  if (date === null) return new Date(NaN); // null is invalid

  if (Utils.u(date)) return new Date(); // today

  if (date instanceof Date) return new Date(date);

  if (typeof date === 'string' && !/Z$/i.test(date)) {
    var d = date.match(REGEX_PARSE);

    if (d) {
      var m = d[2] - 1 || 0;
      var ms = (d[7] || '0').substring(0, 3);

      if (utc) {
        return new Date(Date.UTC(d[1], m, d[3] || 1, d[4] || 0, d[5] || 0, d[6] || 0, ms));
      }

      return new Date(d[1], m, d[3] || 1, d[4] || 0, d[5] || 0, d[6] || 0, ms);
    }
  }

  return new Date(date); // everything else
};

var Dayjs = /*#__PURE__*/function () {
  function Dayjs(cfg) {
    this.$L = parseLocale(cfg.locale, null, true);
    this.parse(cfg); // for plugin

    this.$x = this.$x || cfg.x || {};
    this[IS_DAYJS] = true;
  }

  var _proto = Dayjs.prototype;

  _proto.parse = function parse(cfg) {
    this.$d = parseDate(cfg);
    this.init();
  };

  _proto.init = function init() {
    var $d = this.$d;
    this.$y = $d.getFullYear();
    this.$M = $d.getMonth();
    this.$D = $d.getDate();
    this.$W = $d.getDay();
    this.$H = $d.getHours();
    this.$m = $d.getMinutes();
    this.$s = $d.getSeconds();
    this.$ms = $d.getMilliseconds();
  } // eslint-disable-next-line class-methods-use-this
  ;

  _proto.$utils = function $utils() {
    return Utils;
  };

  _proto.isValid = function isValid() {
    return !(this.$d.toString() === INVALID_DATE_STRING);
  };

  _proto.isSame = function isSame(that, units) {
    var other = dayjs(that);
    return this.startOf(units) <= other && other <= this.endOf(units);
  };

  _proto.isAfter = function isAfter(that, units) {
    return dayjs(that) < this.startOf(units);
  };

  _proto.isBefore = function isBefore(that, units) {
    return this.endOf(units) < dayjs(that);
  };

  _proto.$g = function $g(input, get, set) {
    if (Utils.u(input)) return this[get];
    return this.set(set, input);
  };

  _proto.unix = function unix() {
    return Math.floor(this.valueOf() / 1000);
  };

  _proto.valueOf = function valueOf() {
    // timezone(hour) * 60 * 60 * 1000 => ms
    return this.$d.getTime();
  };

  _proto.startOf = function startOf(units, _startOf) {
    var _this = this;

    // startOf -> endOf
    var isStartOf = !Utils.u(_startOf) ? _startOf : true;
    var unit = Utils.p(units);

    var instanceFactory = function instanceFactory(d, m) {
      var ins = Utils.w(_this.$u ? Date.UTC(_this.$y, m, d) : new Date(_this.$y, m, d), _this);
      return isStartOf ? ins : ins.endOf(D);
    };

    var instanceFactorySet = function instanceFactorySet(method, slice) {
      var argumentStart = [0, 0, 0, 0];
      var argumentEnd = [23, 59, 59, 999];
      return Utils.w(_this.toDate()[method].apply( // eslint-disable-line prefer-spread
      _this.toDate('s'), (isStartOf ? argumentStart : argumentEnd).slice(slice)), _this);
    };

    var $W = this.$W,
        $M = this.$M,
        $D = this.$D;
    var utcPad = "set" + (this.$u ? 'UTC' : '');

    switch (unit) {
      case Y:
        return isStartOf ? instanceFactory(1, 0) : instanceFactory(31, 11);

      case M:
        return isStartOf ? instanceFactory(1, $M) : instanceFactory(0, $M + 1);

      case W:
        {
          var weekStart = this.$locale().weekStart || 0;
          var gap = ($W < weekStart ? $W + 7 : $W) - weekStart;
          return instanceFactory(isStartOf ? $D - gap : $D + (6 - gap), $M);
        }

      case D:
      case DATE:
        return instanceFactorySet(utcPad + "Hours", 0);

      case H:
        return instanceFactorySet(utcPad + "Minutes", 1);

      case MIN:
        return instanceFactorySet(utcPad + "Seconds", 2);

      case S:
        return instanceFactorySet(utcPad + "Milliseconds", 3);

      default:
        return this.clone();
    }
  };

  _proto.endOf = function endOf(arg) {
    return this.startOf(arg, false);
  };

  _proto.$set = function $set(units, _int) {
    var _C$D$C$DATE$C$M$C$Y$C;

    // private set
    var unit = Utils.p(units);
    var utcPad = "set" + (this.$u ? 'UTC' : '');
    var name = (_C$D$C$DATE$C$M$C$Y$C = {}, _C$D$C$DATE$C$M$C$Y$C[D] = utcPad + "Date", _C$D$C$DATE$C$M$C$Y$C[DATE] = utcPad + "Date", _C$D$C$DATE$C$M$C$Y$C[M] = utcPad + "Month", _C$D$C$DATE$C$M$C$Y$C[Y] = utcPad + "FullYear", _C$D$C$DATE$C$M$C$Y$C[H] = utcPad + "Hours", _C$D$C$DATE$C$M$C$Y$C[MIN] = utcPad + "Minutes", _C$D$C$DATE$C$M$C$Y$C[S] = utcPad + "Seconds", _C$D$C$DATE$C$M$C$Y$C[MS] = utcPad + "Milliseconds", _C$D$C$DATE$C$M$C$Y$C)[unit];
    var arg = unit === D ? this.$D + (_int - this.$W) : _int;

    if (unit === M || unit === Y) {
      // clone is for badMutable plugin
      var date = this.clone().set(DATE, 1);
      date.$d[name](arg);
      date.init();
      this.$d = date.set(DATE, Math.min(this.$D, date.daysInMonth())).$d;
    } else if (name) this.$d[name](arg);

    this.init();
    return this;
  };

  _proto.set = function set(string, _int2) {
    return this.clone().$set(string, _int2);
  };

  _proto.get = function get(unit) {
    return this[Utils.p(unit)]();
  };

  _proto.add = function add(number, units) {
    var _this2 = this,
        _C$MIN$C$H$C$S$unit;

    number = Number(number); // eslint-disable-line no-param-reassign

    var unit = Utils.p(units);

    var instanceFactorySet = function instanceFactorySet(n) {
      var d = dayjs(_this2);
      return Utils.w(d.date(d.date() + Math.round(n * number)), _this2);
    };

    if (unit === M) {
      return this.set(M, this.$M + number);
    }

    if (unit === Y) {
      return this.set(Y, this.$y + number);
    }

    if (unit === D) {
      return instanceFactorySet(1);
    }

    if (unit === W) {
      return instanceFactorySet(7);
    }

    var step = (_C$MIN$C$H$C$S$unit = {}, _C$MIN$C$H$C$S$unit[MIN] = MILLISECONDS_A_MINUTE, _C$MIN$C$H$C$S$unit[H] = MILLISECONDS_A_HOUR, _C$MIN$C$H$C$S$unit[S] = MILLISECONDS_A_SECOND, _C$MIN$C$H$C$S$unit)[unit] || 1; // ms

    var nextTimeStamp = this.$d.getTime() + number * step;
    return Utils.w(nextTimeStamp, this);
  };

  _proto.subtract = function subtract(number, string) {
    return this.add(number * -1, string);
  };

  _proto.format = function format(formatStr) {
    var _this3 = this;

    var locale = this.$locale();
    if (!this.isValid()) return locale.invalidDate || INVALID_DATE_STRING;
    var str = formatStr || FORMAT_DEFAULT;
    var zoneStr = Utils.z(this);
    var $H = this.$H,
        $m = this.$m,
        $M = this.$M;
    var weekdays = locale.weekdays,
        months = locale.months,
        meridiem = locale.meridiem;

    var getShort = function getShort(arr, index, full, length) {
      return arr && (arr[index] || arr(_this3, str)) || full[index].slice(0, length);
    };

    var get$H = function get$H(num) {
      return Utils.s($H % 12 || 12, num, '0');
    };

    var meridiemFunc = meridiem || function (hour, minute, isLowercase) {
      var m = hour < 12 ? 'AM' : 'PM';
      return isLowercase ? m.toLowerCase() : m;
    };

    var matches = function matches(match) {
      switch (match) {
        case 'YY':
          return String(_this3.$y).slice(-2);

        case 'YYYY':
          return Utils.s(_this3.$y, 4, '0');

        case 'M':
          return $M + 1;

        case 'MM':
          return Utils.s($M + 1, 2, '0');

        case 'MMM':
          return getShort(locale.monthsShort, $M, months, 3);

        case 'MMMM':
          return getShort(months, $M);

        case 'D':
          return _this3.$D;

        case 'DD':
          return Utils.s(_this3.$D, 2, '0');

        case 'd':
          return String(_this3.$W);

        case 'dd':
          return getShort(locale.weekdaysMin, _this3.$W, weekdays, 2);

        case 'ddd':
          return getShort(locale.weekdaysShort, _this3.$W, weekdays, 3);

        case 'dddd':
          return weekdays[_this3.$W];

        case 'H':
          return String($H);

        case 'HH':
          return Utils.s($H, 2, '0');

        case 'h':
          return get$H(1);

        case 'hh':
          return get$H(2);

        case 'a':
          return meridiemFunc($H, $m, true);

        case 'A':
          return meridiemFunc($H, $m, false);

        case 'm':
          return String($m);

        case 'mm':
          return Utils.s($m, 2, '0');

        case 's':
          return String(_this3.$s);

        case 'ss':
          return Utils.s(_this3.$s, 2, '0');

        case 'SSS':
          return Utils.s(_this3.$ms, 3, '0');

        case 'Z':
          return zoneStr;
      }

      return null;
    };

    return str.replace(REGEX_FORMAT, function (match, $1) {
      return $1 || matches(match) || zoneStr.replace(':', '');
    }); // 'ZZ'
  };

  _proto.utcOffset = function utcOffset() {
    // Because a bug at FF24, we're rounding the timezone offset around 15 minutes
    // https://github.com/moment/moment/pull/1871
    return -Math.round(this.$d.getTimezoneOffset() / 15) * 15;
  };

  _proto.diff = function diff(input, units, _float) {
    var _this4 = this;

    var unit = Utils.p(units);
    var that = dayjs(input);
    var zoneDelta = (that.utcOffset() - this.utcOffset()) * MILLISECONDS_A_MINUTE;
    var diff = this - that;

    var getMonth = function getMonth() {
      return Utils.m(_this4, that);
    };

    var result;

    switch (unit) {
      case Y:
        result = getMonth() / 12;
        break;

      case M:
        result = getMonth();
        break;

      case Q:
        result = getMonth() / 3;
        break;

      case W:
        result = (diff - zoneDelta) / MILLISECONDS_A_WEEK;
        break;

      case D:
        result = (diff - zoneDelta) / MILLISECONDS_A_DAY;
        break;

      case H:
        result = diff / MILLISECONDS_A_HOUR;
        break;

      case MIN:
        result = diff / MILLISECONDS_A_MINUTE;
        break;

      case S:
        result = diff / MILLISECONDS_A_SECOND;
        break;

      default:
        result = diff; // milliseconds

        break;
    }

    return _float ? result : Utils.a(result);
  };

  _proto.daysInMonth = function daysInMonth() {
    return this.endOf(M).$D;
  };

  _proto.$locale = function $locale() {
    // get locale object
    return Ls[this.$L];
  };

  _proto.locale = function locale(preset, object) {
    if (!preset) return this.$L;
    var that = this.clone();
    var nextLocaleName = parseLocale(preset, object, true);
    if (nextLocaleName) that.$L = nextLocaleName;
    return that;
  };

  _proto.clone = function clone() {
    return Utils.w(this.$d, this);
  };

  _proto.toDate = function toDate() {
    return new Date(this.valueOf());
  };

  _proto.toJSON = function toJSON() {
    return this.isValid() ? this.toISOString() : null;
  };

  _proto.toISOString = function toISOString() {
    // ie 8 return
    // new Dayjs(this.valueOf() + this.$d.getTimezoneOffset() * 60000)
    // .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
    return this.$d.toISOString();
  };

  _proto.toString = function toString() {
    return this.$d.toUTCString();
  };

  return Dayjs;
}();

var proto = Dayjs.prototype;
dayjs.prototype = proto;
[['$ms', MS], ['$s', S], ['$m', MIN], ['$H', H], ['$W', D], ['$M', M], ['$y', Y], ['$D', DATE]].forEach(function (g) {
  proto[g[1]] = function (input) {
    return this.$g(input, g[0], g[1]);
  };
});

dayjs.extend = function (plugin, option) {
  if (!plugin.$i) {
    // install plugin only once
    plugin(option, Dayjs, dayjs);
    plugin.$i = true;
  }

  return dayjs;
};

dayjs.locale = parseLocale;
dayjs.isDayjs = isDayjs;

dayjs.unix = function (timestamp) {
  return dayjs(timestamp * 1e3);
};

dayjs.en = Ls[L];
dayjs.Ls = Ls;
dayjs.p = {};

// eslint-disable-next-line import/prefer-default-export
var t = function t(format) {
  return format.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function (_, a, b) {
    return a || b.slice(1);
  });
};
var englishFormats = {
  LTS: 'h:mm:ss A',
  LT: 'h:mm A',
  L: 'MM/DD/YYYY',
  LL: 'MMMM D, YYYY',
  LLL: 'MMMM D, YYYY h:mm A',
  LLLL: 'dddd, MMMM D, YYYY h:mm A'
};
var u = function u(formatStr, formats) {
  return formatStr.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function (_, a, b) {
    var B = b && b.toUpperCase();
    return a || formats[b] || englishFormats[b] || t(formats[B]);
  });
};

var formattingTokens = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g;
var match1 = /\d/; // 0 - 9

var match2 = /\d\d/; // 00 - 99

var match3 = /\d{3}/; // 000 - 999

var match4 = /\d{4}/; // 0000 - 9999

var match1to2 = /\d\d?/; // 0 - 99

var matchSigned = /[+-]?\d+/; // -inf - inf

var matchOffset = /[+-]\d\d:?(\d\d)?|Z/; // +00:00 -00:00 +0000 or -0000 +00 or Z

var matchWord = /\d*[^-_:/,()\s\d]+/; // Word

var locale = {};

var parseTwoDigitYear = function parseTwoDigitYear(input) {
  input = +input;
  return input + (input > 68 ? 1900 : 2000);
};

function offsetFromString(string) {
  if (!string) return 0;
  if (string === 'Z') return 0;
  var parts = string.match(/([+-]|\d\d)/g);
  var minutes = +(parts[1] * 60) + (+parts[2] || 0);
  return minutes === 0 ? 0 : parts[0] === '+' ? -minutes : minutes; // eslint-disable-line no-nested-ternary
}

var addInput = function addInput(property) {
  return function (input) {
    this[property] = +input;
  };
};

var zoneExpressions = [matchOffset, function (input) {
  var zone = this.zone || (this.zone = {});
  zone.offset = offsetFromString(input);
}];

var getLocalePart = function getLocalePart(name) {
  var part = locale[name];
  return part && (part.indexOf ? part : part.s.concat(part.f));
};

var meridiemMatch = function meridiemMatch(input, isLowerCase) {
  var isAfternoon;
  var _locale = locale,
      meridiem = _locale.meridiem;

  if (!meridiem) {
    isAfternoon = input === (isLowerCase ? 'pm' : 'PM');
  } else {
    for (var i = 1; i <= 24; i += 1) {
      // todo: fix input === meridiem(i, 0, isLowerCase)
      if (input.indexOf(meridiem(i, 0, isLowerCase)) > -1) {
        isAfternoon = i > 12;
        break;
      }
    }
  }

  return isAfternoon;
};

var expressions = {
  A: [matchWord, function (input) {
    this.afternoon = meridiemMatch(input, false);
  }],
  a: [matchWord, function (input) {
    this.afternoon = meridiemMatch(input, true);
  }],
  Q: [match1, function (input) {
    this.month = (input - 1) * 3 + 1;
  }],
  S: [match1, function (input) {
    this.milliseconds = +input * 100;
  }],
  SS: [match2, function (input) {
    this.milliseconds = +input * 10;
  }],
  SSS: [match3, function (input) {
    this.milliseconds = +input;
  }],
  s: [match1to2, addInput('seconds')],
  ss: [match1to2, addInput('seconds')],
  m: [match1to2, addInput('minutes')],
  mm: [match1to2, addInput('minutes')],
  H: [match1to2, addInput('hours')],
  h: [match1to2, addInput('hours')],
  HH: [match1to2, addInput('hours')],
  hh: [match1to2, addInput('hours')],
  D: [match1to2, addInput('day')],
  DD: [match2, addInput('day')],
  Do: [matchWord, function (input) {
    var _locale2 = locale,
        ordinal = _locale2.ordinal;

    var _input$match = input.match(/\d+/);

    this.day = _input$match[0];
    if (!ordinal) return;

    for (var i = 1; i <= 31; i += 1) {
      if (ordinal(i).replace(/\[|\]/g, '') === input) {
        this.day = i;
      }
    }
  }],
  w: [match1to2, addInput('week')],
  ww: [match2, addInput('week')],
  M: [match1to2, addInput('month')],
  MM: [match2, addInput('month')],
  MMM: [matchWord, function (input) {
    var months = getLocalePart('months');
    var monthsShort = getLocalePart('monthsShort');
    var matchIndex = (monthsShort || months.map(function (_) {
      return _.slice(0, 3);
    })).indexOf(input) + 1;

    if (matchIndex < 1) {
      throw new Error();
    }

    this.month = matchIndex % 12 || matchIndex;
  }],
  MMMM: [matchWord, function (input) {
    var months = getLocalePart('months');
    var matchIndex = months.indexOf(input) + 1;

    if (matchIndex < 1) {
      throw new Error();
    }

    this.month = matchIndex % 12 || matchIndex;
  }],
  Y: [matchSigned, addInput('year')],
  YY: [match2, function (input) {
    this.year = parseTwoDigitYear(input);
  }],
  YYYY: [match4, addInput('year')],
  Z: zoneExpressions,
  ZZ: zoneExpressions
};

function correctHours(time) {
  var afternoon = time.afternoon;

  if (afternoon !== undefined) {
    var hours = time.hours;

    if (afternoon) {
      if (hours < 12) {
        time.hours += 12;
      }
    } else if (hours === 12) {
      time.hours = 0;
    }

    delete time.afternoon;
  }
}

function makeParser(format) {
  format = u(format, locale && locale.formats);
  var array = format.match(formattingTokens);
  var length = array.length;

  for (var i = 0; i < length; i += 1) {
    var token = array[i];
    var parseTo = expressions[token];
    var regex = parseTo && parseTo[0];
    var parser = parseTo && parseTo[1];

    if (parser) {
      array[i] = {
        regex: regex,
        parser: parser
      };
    } else {
      array[i] = token.replace(/^\[|\]$/g, '');
    }
  }

  return function (input) {
    var time = {};

    for (var _i = 0, start = 0; _i < length; _i += 1) {
      var _token = array[_i];

      if (typeof _token === 'string') {
        start += _token.length;
      } else {
        var _regex = _token.regex,
            _parser = _token.parser;
        var part = input.slice(start);

        var match = _regex.exec(part);

        var value = match[0];

        _parser.call(time, value);

        input = input.replace(value, '');
      }
    }

    correctHours(time);
    return time;
  };
}

var parseFormattedInput = function parseFormattedInput(input, format, utc, dayjs) {
  try {
    if (['x', 'X'].indexOf(format) > -1) return new Date((format === 'X' ? 1000 : 1) * input);
    var parser = makeParser(format);

    var _parser2 = parser(input),
        year = _parser2.year,
        month = _parser2.month,
        day = _parser2.day,
        hours = _parser2.hours,
        minutes = _parser2.minutes,
        seconds = _parser2.seconds,
        milliseconds = _parser2.milliseconds,
        zone = _parser2.zone,
        week = _parser2.week;

    var now = new Date();
    var d = day || (!year && !month ? now.getDate() : 1);
    var y = year || now.getFullYear();
    var M = 0;

    if (!(year && !month)) {
      M = month > 0 ? month - 1 : now.getMonth();
    }

    var h = hours || 0;
    var m = minutes || 0;
    var s = seconds || 0;
    var ms = milliseconds || 0;

    if (zone) {
      return new Date(Date.UTC(y, M, d, h, m, s, ms + zone.offset * 60 * 1000));
    }

    if (utc) {
      return new Date(Date.UTC(y, M, d, h, m, s, ms));
    }

    var newDate;
    newDate = new Date(y, M, d, h, m, s, ms);

    if (week) {
      newDate = dayjs(newDate).week(week).toDate();
    }

    return newDate;
  } catch (e) {
    return new Date(''); // Invalid Date
  }
};

const customParseFormat = (function (o, C, d) {
  d.p.customParseFormat = true;

  if (o && o.parseTwoDigitYear) {
    parseTwoDigitYear = o.parseTwoDigitYear;
  }

  var proto = C.prototype;
  var oldParse = proto.parse;

  proto.parse = function (cfg) {
    var date = cfg.date,
        utc = cfg.utc,
        args = cfg.args;
    this.$u = utc;
    var format = args[1];

    if (typeof format === 'string') {
      var isStrictWithoutLocale = args[2] === true;
      var isStrictWithLocale = args[3] === true;
      var isStrict = isStrictWithoutLocale || isStrictWithLocale;
      var pl = args[2];

      if (isStrictWithLocale) {
        pl = args[2];
      }

      locale = this.$locale();

      if (!isStrictWithoutLocale && pl) {
        locale = d.Ls[pl];
      }

      this.$d = parseFormattedInput(date, format, utc, d);
      this.init();
      if (pl && pl !== true) this.$L = this.locale(pl).$L; // use != to treat
      // input number 1410715640579 and format string '1410715640579' equal
      // eslint-disable-next-line eqeqeq

      if (isStrict && date != this.format(format)) {
        this.$d = new Date('');
      } // reset global locale to make parallel unit test


      locale = {};
    } else if (format instanceof Array) {
      var len = format.length;

      for (var i = 1; i <= len; i += 1) {
        args[1] = format[i - 1];
        var result = d.apply(this, args);

        if (result.isValid()) {
          this.$d = result.$d;
          this.$L = result.$L;
          this.init();
          break;
        }

        if (i === len) this.$d = new Date('');
      }
    } else {
      oldParse.call(this, cfg);
    }
  };
});

const localeData = (function (o, c, dayjs) {
  // locale needed later
  var proto = c.prototype;

  var getLocalePart = function getLocalePart(part) {
    return part && (part.indexOf ? part : part.s);
  };

  var getShort = function getShort(ins, target, full, num, localeOrder) {
    var locale = ins.name ? ins : ins.$locale();
    var targetLocale = getLocalePart(locale[target]);
    var fullLocale = getLocalePart(locale[full]);
    var result = targetLocale || fullLocale.map(function (f) {
      return f.slice(0, num);
    });
    if (!localeOrder) return result;
    var weekStart = locale.weekStart;
    return result.map(function (_, index) {
      return result[(index + (weekStart || 0)) % 7];
    });
  };

  var getDayjsLocaleObject = function getDayjsLocaleObject() {
    return dayjs.Ls[dayjs.locale()];
  };

  var getLongDateFormat = function getLongDateFormat(l, format) {
    return l.formats[format] || t(l.formats[format.toUpperCase()]);
  };

  var localeData = function localeData() {
    var _this = this;

    return {
      months: function months(instance) {
        return instance ? instance.format('MMMM') : getShort(_this, 'months');
      },
      monthsShort: function monthsShort(instance) {
        return instance ? instance.format('MMM') : getShort(_this, 'monthsShort', 'months', 3);
      },
      firstDayOfWeek: function firstDayOfWeek() {
        return _this.$locale().weekStart || 0;
      },
      weekdays: function weekdays(instance) {
        return instance ? instance.format('dddd') : getShort(_this, 'weekdays');
      },
      weekdaysMin: function weekdaysMin(instance) {
        return instance ? instance.format('dd') : getShort(_this, 'weekdaysMin', 'weekdays', 2);
      },
      weekdaysShort: function weekdaysShort(instance) {
        return instance ? instance.format('ddd') : getShort(_this, 'weekdaysShort', 'weekdays', 3);
      },
      longDateFormat: function longDateFormat(format) {
        return getLongDateFormat(_this.$locale(), format);
      },
      meridiem: this.$locale().meridiem,
      ordinal: this.$locale().ordinal
    };
  };

  proto.localeData = function () {
    return localeData.bind(this)();
  };

  dayjs.localeData = function () {
    var localeObject = getDayjsLocaleObject();
    return {
      firstDayOfWeek: function firstDayOfWeek() {
        return localeObject.weekStart || 0;
      },
      weekdays: function weekdays() {
        return dayjs.weekdays();
      },
      weekdaysShort: function weekdaysShort() {
        return dayjs.weekdaysShort();
      },
      weekdaysMin: function weekdaysMin() {
        return dayjs.weekdaysMin();
      },
      months: function months() {
        return dayjs.months();
      },
      monthsShort: function monthsShort() {
        return dayjs.monthsShort();
      },
      longDateFormat: function longDateFormat(format) {
        return getLongDateFormat(localeObject, format);
      },
      meridiem: localeObject.meridiem,
      ordinal: localeObject.ordinal
    };
  };

  dayjs.months = function () {
    return getShort(getDayjsLocaleObject(), 'months');
  };

  dayjs.monthsShort = function () {
    return getShort(getDayjsLocaleObject(), 'monthsShort', 'months', 3);
  };

  dayjs.weekdays = function (localeOrder) {
    return getShort(getDayjsLocaleObject(), 'weekdays', null, null, localeOrder);
  };

  dayjs.weekdaysShort = function (localeOrder) {
    return getShort(getDayjsLocaleObject(), 'weekdaysShort', 'weekdays', 3, localeOrder);
  };

  dayjs.weekdaysMin = function (localeOrder) {
    return getShort(getDayjsLocaleObject(), 'weekdaysMin', 'weekdays', 2, localeOrder);
  };
});

const localizedFormat = (function (o, c, d) {
  var proto = c.prototype;
  var oldFormat = proto.format;
  d.en.formats = englishFormats;

  proto.format = function (formatStr) {
    if (formatStr === void 0) {
      formatStr = FORMAT_DEFAULT;
    }

    var _this$$locale = this.$locale(),
        _this$$locale$formats = _this$$locale.formats,
        formats = _this$$locale$formats === void 0 ? {} : _this$$locale$formats;

    var result = u(formatStr, formats);
    return oldFormat.call(this, result);
  };
});

// Plugin template from https://day.js.org/docs/en/plugin/plugin
const preParsePostFormat = (function (option, dayjsClass) {
  var oldParse = dayjsClass.prototype.parse;

  dayjsClass.prototype.parse = function (cfg) {
    if (typeof cfg.date === 'string') {
      var locale = this.$locale();
      cfg.date = locale && locale.preparse ? locale.preparse(cfg.date) : cfg.date;
    } // original parse result


    return oldParse.bind(this)(cfg);
  }; // // overriding existing API
  // // e.g. extend dayjs().format()


  var oldFormat = dayjsClass.prototype.format;

  dayjsClass.prototype.format = function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    // original format result
    var result = oldFormat.call.apply(oldFormat, [this].concat(args)); // return modified result

    var locale = this.$locale();
    return locale && locale.postformat ? locale.postformat(result) : result;
  };

  var oldFromTo = dayjsClass.prototype.fromToBase;

  if (oldFromTo) {
    dayjsClass.prototype.fromToBase = function (input, withoutSuffix, instance, isFrom) {
      var locale = this.$locale() || instance.$locale(); // original format result

      return oldFromTo.call(this, input, withoutSuffix, instance, isFrom, locale && locale.postformat);
    };
  }
});

const updateLocale = (function (option, Dayjs, dayjs) {
  dayjs.updateLocale = function (locale, customConfig) {
    var localeList = dayjs.Ls;
    var localeConfig = localeList[locale];
    if (!localeConfig) return;
    var customConfigKeys = customConfig ? Object.keys(customConfig) : [];
    customConfigKeys.forEach(function (c) {
      localeConfig[c] = customConfig[c];
    });
    return localeConfig; // eslint-disable-line consistent-return
  };
});

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const CSS = {
    toggleIcon: "toggle-icon",
};
const IDS = {
    validationMessage: "inputTimePickerValidationMessage",
};

const inputTimePickerCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:inline-block;-webkit-user-select:none;-moz-user-select:none;user-select:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}::slotted(input[slot=hidden-form-input]){margin:0 !important;opacity:0 !important;outline:none !important;padding:0 !important;position:absolute !important;inset:0 !important;transform:none !important;-webkit-appearance:none !important;z-index:-1 !important}:host([scale=s]){--calcite-toggle-spacing:0.5rem;--calcite-internal-input-text-input-padding-inline-end:calc(var(--calcite-toggle-spacing) + 1rem)}:host([scale=m]){--calcite-toggle-spacing:0.75rem;--calcite-internal-input-text-input-padding-inline-end:calc(var(--calcite-toggle-spacing) + 1.5rem)}:host([scale=l]){--calcite-toggle-spacing:1rem;--calcite-internal-input-text-input-padding-inline-end:calc(var(--calcite-toggle-spacing) + 2rem)}.input-wrapper{position:relative}.toggle-icon{position:absolute;display:flex;cursor:pointer;align-items:center;inset-inline-end:0;inset-block:0;padding-inline:var(--calcite-toggle-spacing);--calcite-icon-color:var(--calcite-color-text-3)}.input-wrapper:hover .toggle-icon,calcite-input-text:focus+.toggle-icon{--calcite-icon-color:var(--calcite-color-text-1)}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:0.5rem}:host([scale=s]) .validation-container{padding-block-start:0.25rem}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteInputTimePickerStyle0 = inputTimePickerCss;

// some bundlers (e.g., Webpack) need dynamic import paths to be static
const supportedDayjsLocaleToLocaleConfigImport = new Map([
    ["ar", () => import('./ar-d4e9c6ca.js')],
    ["bg", () => import('./bg-e7db3070.js')],
    ["bs", () => import('./bs-154d0540.js')],
    ["ca", () => import('./ca-403d9586.js')],
    ["cs", () => import('./cs-4687cf9f.js')],
    ["da", () => import('./da-27cb521d.js')],
    ["de", () => import('./de-1fcb8b55.js')],
    ["de-at", () => import('./de-at-621e3161.js')],
    ["de-ch", () => import('./de-ch-dbe106ba.js')],
    ["el", () => import('./el-60cb7e8e.js')],
    ["en", () => Promise.resolve().then(function () { return en$1; })],
    ["en-au", () => import('./en-au-6b31eadf.js')],
    ["en-ca", () => import('./en-ca-c62e2c29.js')],
    ["en-gb", () => import('./en-gb-7b86a861.js')],
    ["es", () => import('./es-b048cf9a.js')],
    ["es-mx", () => import('./es-mx-a469d043.js')],
    ["et", () => import('./et-09e59731.js')],
    ["fi", () => import('./fi-98448a04.js')],
    ["fr", () => import('./fr-3a6bc75f.js')],
    ["fr-ch", () => import('./fr-ch-dd9aa577.js')],
    ["he", () => import('./he-510944f3.js')],
    ["hi", () => import('./hi-b7f35ddc.js')],
    ["hr", () => import('./hr-91d6e89b.js')],
    ["hu", () => import('./hu-ab576bec.js')],
    ["id", () => import('./id-5ebe99df.js')],
    ["it", () => import('./it-62f24385.js')],
    ["it-ch", () => import('./it-ch-11bc01ef.js')],
    ["ja", () => import('./ja-4073b97b.js')],
    ["ko", () => import('./ko-c1f9c746.js')],
    ["lt", () => import('./lt-f293ef90.js')],
    ["lv", () => import('./lv-cc60dc4f.js')],
    ["mk", () => import('./mk-90d4457e.js')],
    ["nl", () => import('./nl-a2e0732f.js')],
    ["nb", () => import('./nb-3d8eb4cc.js')],
    ["pl", () => import('./pl-1e1abb9b.js')],
    ["pt", () => import('./pt-1bc85b37.js')],
    ["pt-br", () => import('./pt-br-bd78f1f2.js')],
    ["ro", () => import('./ro-c1cb4571.js')],
    ["ru", () => import('./ru-deb7b95b.js')],
    ["sk", () => import('./sk-e86a1a74.js')],
    ["sl", () => import('./sl-4f70ce5c.js')],
    ["sr", () => import('./sr-bcde0bb0.js')],
    ["sv", () => import('./sv-e585fbb5.js')],
    ["th", () => import('./th-f1746070.js')],
    ["tr", () => import('./tr-065767bb.js')],
    ["uk", () => import('./uk-96e72322.js')],
    ["vi", () => import('./vi-667fe4b6.js')],
    ["zh-cn", () => import('./zh-cn-fbbbe429.js')],
    ["zh-hk", () => import('./zh-hk-d11430a1.js')],
    ["zh-tw", () => import('./zh-tw-4a1b522b.js')],
]);
dayjs.extend(customParseFormat);
dayjs.extend(localeData);
dayjs.extend(localizedFormat);
dayjs.extend(preParsePostFormat);
dayjs.extend(updateLocale);
const InputTimePicker = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.calciteInputTimePickerBeforeClose = createEvent(this, "calciteInputTimePickerBeforeClose", 6);
        this.calciteInputTimePickerBeforeOpen = createEvent(this, "calciteInputTimePickerBeforeOpen", 6);
        this.calciteInputTimePickerChange = createEvent(this, "calciteInputTimePickerChange", 7);
        this.calciteInputTimePickerClose = createEvent(this, "calciteInputTimePickerClose", 6);
        this.calciteInputTimePickerOpen = createEvent(this, "calciteInputTimePickerOpen", 6);
        this.focusOnOpen = false;
        /** whether the value of the input was changed as a result of user typing or not */
        this.userChangedValue = false;
        //--------------------------------------------------------------------------
        //
        //  Event Listeners
        //
        //--------------------------------------------------------------------------
        this.hostBlurHandler = () => {
            const inputValue = this.calciteInputEl.value;
            const delocalizedInputValue = this.delocalizeTimeString(inputValue);
            if (!delocalizedInputValue) {
                this.setValue("");
                return;
            }
            if (delocalizedInputValue !== this.value) {
                this.setValue(delocalizedInputValue);
            }
            const localizedTimeString = localizeTimeString({
                value: this.value,
                locale: this.effectiveLocale,
                numberingSystem: this.numberingSystem,
                includeSeconds: this.shouldIncludeSeconds(),
                fractionalSecondDigits: decimalPlaces(this.step),
            });
            if (localizedTimeString !== inputValue) {
                this.setInputValue(localizedTimeString);
            }
            this.deactivate();
        };
        this.calciteInternalInputFocusHandler = (event) => {
            if (!this.readOnly) {
                event.stopPropagation();
            }
        };
        this.calciteInternalInputInputHandler = (event) => {
            const { effectiveLocale: locale, numberingSystem } = this;
            if (numberingSystem && numberingSystem !== "latn") {
                const target = event.target;
                numberStringFormatter.numberFormatOptions = {
                    locale,
                    numberingSystem,
                    useGrouping: false,
                };
                const valueInNumberingSystem = numberStringFormatter
                    .delocalize(target.value)
                    .split("")
                    .map((char) => numberKeys.includes(char)
                    ? numberStringFormatter.numberFormatter.format(Number(char))
                    : char)
                    .join("");
                this.setInputValue(valueInNumberingSystem);
            }
        };
        this.timePickerChangeHandler = (event) => {
            event.stopPropagation();
            const target = event.target;
            const value = target.value;
            const includeSeconds = this.shouldIncludeSeconds();
            this.setValue(toISOTimeString(value, includeSeconds));
            this.setInputValue(localizeTimeString({
                value,
                locale: this.effectiveLocale,
                numberingSystem: this.numberingSystem,
                includeSeconds,
                fractionalSecondDigits: decimalPlaces(this.step),
            }));
        };
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.popoverBeforeOpenHandler = (event) => {
            event.stopPropagation();
            this.calciteInputTimePickerBeforeOpen.emit();
        };
        this.popoverOpenHandler = (event) => {
            event.stopPropagation();
            this.calciteInputTimePickerOpen.emit();
            activateFocusTrap(this, {
                onActivate: () => {
                    if (this.focusOnOpen) {
                        this.calciteTimePickerEl.setFocus();
                        this.focusOnOpen = false;
                    }
                },
            });
        };
        this.popoverBeforeCloseHandler = (event) => {
            event.stopPropagation();
            this.calciteInputTimePickerBeforeClose.emit();
        };
        this.popoverCloseHandler = (event) => {
            event.stopPropagation();
            this.calciteInputTimePickerClose.emit();
            deactivateFocusTrap(this, {
                onDeactivate: () => {
                    this.calciteInputEl.setFocus();
                    this.focusOnOpen = false;
                },
            });
            this.open = false;
        };
        this.keyDownHandler = (event) => {
            const { defaultPrevented, key } = event;
            if (defaultPrevented) {
                return;
            }
            if (key === "Enter") {
                if (submitForm(this)) {
                    event.preventDefault();
                    this.calciteInputEl.setFocus();
                }
                if (event.composedPath().includes(this.calciteTimePickerEl)) {
                    return;
                }
                const newValue = this.delocalizeTimeString(this.calciteInputEl.value);
                if (isValidTime(newValue)) {
                    this.setValue(newValue);
                    const localizedTimeString = localizeTimeString({
                        value: this.value,
                        locale: this.effectiveLocale,
                        numberingSystem: this.numberingSystem,
                        includeSeconds: this.shouldIncludeSeconds(),
                        fractionalSecondDigits: decimalPlaces(this.step),
                    });
                    if (newValue && this.calciteInputEl.value !== localizedTimeString) {
                        this.setInputValue(localizedTimeString);
                    }
                }
            }
            else if (key === "ArrowDown") {
                this.open = true;
                this.focusOnOpen = true;
                event.preventDefault();
            }
            else if (key === "Escape" && this.open) {
                this.open = false;
                event.preventDefault();
                this.calciteInputEl.setFocus();
            }
        };
        this.setCalcitePopoverEl = (el) => {
            this.popoverEl = el;
            this.openHandler();
        };
        this.setInputEl = (el) => {
            this.calciteInputEl = el;
        };
        this.setCalciteTimePickerEl = (el) => {
            this.calciteTimePickerEl = el;
            connectFocusTrap(this, {
                focusTrapEl: el,
                focusTrapOptions: {
                    initialFocus: false,
                    setReturnFocus: false,
                },
            });
        };
        this.setInputValue = (newInputValue) => {
            if (!this.calciteInputEl) {
                return;
            }
            this.calciteInputEl.value = newInputValue;
        };
        /**
         * Sets the value and emits a change event.
         * This is used to update the value as a result of user interaction.
         *
         * @param value The new value
         */
        this.setValue = (value) => {
            const oldValue = this.value;
            const newValue = formatTimeString(value) || "";
            if (newValue === oldValue) {
                return;
            }
            this.userChangedValue = true;
            this.value = newValue || "";
            const changeEvent = this.calciteInputTimePickerChange.emit();
            if (changeEvent.defaultPrevented) {
                this.userChangedValue = false;
                this.value = oldValue;
                this.setInputValue(localizeTimeString({
                    value: oldValue,
                    locale: this.effectiveLocale,
                    numberingSystem: this.numberingSystem,
                    includeSeconds: this.shouldIncludeSeconds(),
                    fractionalSecondDigits: decimalPlaces(this.step),
                }));
            }
        };
        /**
         * Sets the value directly without emitting a change event.
         * This is used to update the value on initial load and when props change that are not the result of user interaction.
         *
         * @param value The new value
         */
        this.setValueDirectly = (value) => {
            const includeSeconds = this.shouldIncludeSeconds();
            this.value = toISOTimeString(value, includeSeconds);
            this.setInputValue(this.value
                ? localizeTimeString({
                    value: this.value,
                    includeSeconds,
                    locale: this.effectiveLocale,
                    numberingSystem: this.numberingSystem,
                    fractionalSecondDigits: decimalPlaces(this.step),
                })
                : "");
        };
        this.onInputWrapperClick = () => {
            this.open = !this.open;
        };
        this.deactivate = () => {
            this.open = false;
        };
        this.open = false;
        this.disabled = false;
        this.focusTrapDisabled = false;
        this.form = undefined;
        this.readOnly = false;
        this.max = undefined;
        this.min = undefined;
        this.messageOverrides = undefined;
        this.messages = undefined;
        this.validationMessage = undefined;
        this.validationIcon = undefined;
        this.validity = {
            valid: false,
            badInput: false,
            customError: false,
            patternMismatch: false,
            rangeOverflow: false,
            rangeUnderflow: false,
            stepMismatch: false,
            tooLong: false,
            tooShort: false,
            typeMismatch: false,
            valueMissing: false,
        };
        this.name = undefined;
        this.numberingSystem = undefined;
        this.required = false;
        this.scale = "m";
        this.status = "idle";
        this.overlayPositioning = "absolute";
        this.placement = "auto";
        this.step = 60;
        this.value = null;
        this.calciteInputEl = undefined;
        this.defaultMessages = undefined;
        this.effectiveLocale = "";
    }
    openHandler() {
        if (this.disabled || this.readOnly) {
            this.open = false;
            return;
        }
        // we set the property instead of the attribute to ensure popover's open/close events are emitted properly
        this.popoverEl.open = this.open;
    }
    handleFocusTrapDisabled(focusTrapDisabled) {
        if (!this.open) {
            return;
        }
        focusTrapDisabled ? deactivateFocusTrap(this) : activateFocusTrap(this);
    }
    handleDisabledAndReadOnlyChange(value) {
        if (!value) {
            this.open = false;
        }
    }
    onMessagesChange() {
        /* wired up by t9n util */
    }
    numberingSystemWatcher(numberingSystem) {
        this.setInputValue(localizeTimeString({
            value: this.value,
            locale: this.effectiveLocale,
            numberingSystem,
            includeSeconds: this.shouldIncludeSeconds(),
            fractionalSecondDigits: decimalPlaces(this.step),
        }));
    }
    stepWatcher(newStep, oldStep) {
        if ((oldStep >= 60 && newStep > 0 && newStep < 60) ||
            (newStep >= 60 && oldStep > 0 && oldStep < 60)) {
            this.setValueDirectly(this.value);
        }
    }
    valueWatcher(newValue) {
        if (!this.userChangedValue) {
            this.setValueDirectly(newValue);
        }
        this.userChangedValue = false;
    }
    async effectiveLocaleWatcher(locale) {
        await Promise.all([this.loadDateTimeLocaleData(), updateMessages(this, this.effectiveLocale)]);
        this.setInputValue(localizeTimeString({
            value: this.value,
            locale,
            numberingSystem: this.numberingSystem,
            includeSeconds: this.shouldIncludeSeconds(),
            fractionalSecondDigits: decimalPlaces(this.step),
        }));
    }
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    /** Sets focus on the component. */
    async setFocus() {
        await componentFocusable(this);
        focusFirstTabbable(this.el);
    }
    /**
     * Updates the position of the component.
     *
     * @param delayed If true, delay the repositioning.
     */
    async reposition(delayed = false) {
        this.popoverEl?.reposition(delayed);
    }
    syncHiddenFormInput(input) {
        syncHiddenFormInput("time", this, input);
    }
    delocalizeTimeString(value) {
        // we need to set the corresponding locale before parsing, otherwise it defaults to English (possible dayjs bug)
        dayjs.locale(this.effectiveLocale.toLowerCase());
        const nonFractionalSecondParts = this.delocalizeTimeStringToParts(value);
        let delocalizedTimeString;
        if (this.shouldIncludeFractionalSeconds()) {
            const stepPrecision = decimalPlaces(this.step);
            const centisecondParts = this.delocalizeTimeStringToParts(value, "S");
            if (stepPrecision === 1) {
                delocalizedTimeString =
                    centisecondParts.millisecond !== 0
                        ? this.getTimeStringFromParts(centisecondParts)
                        : this.getTimeStringFromParts(nonFractionalSecondParts);
            }
            else {
                const decisecondParts = this.delocalizeTimeStringToParts(value, "SS");
                if (stepPrecision === 2) {
                    if (decisecondParts.millisecond !== 0) {
                        delocalizedTimeString = this.getTimeStringFromParts(decisecondParts);
                    }
                    else if (centisecondParts.millisecond !== 0) {
                        delocalizedTimeString = this.getTimeStringFromParts(centisecondParts);
                    }
                    else {
                        delocalizedTimeString = this.getTimeStringFromParts(nonFractionalSecondParts);
                    }
                }
                else if (stepPrecision >= 3) {
                    const millisecondParts = this.delocalizeTimeStringToParts(value, "SSS");
                    if (millisecondParts.millisecond !== 0) {
                        delocalizedTimeString = this.getTimeStringFromParts(millisecondParts);
                    }
                    else if (decisecondParts.millisecond !== 0) {
                        delocalizedTimeString = this.getTimeStringFromParts(decisecondParts);
                    }
                    else if (centisecondParts.millisecond !== 0) {
                        delocalizedTimeString = this.getTimeStringFromParts(centisecondParts);
                    }
                    else {
                        delocalizedTimeString = this.getTimeStringFromParts(nonFractionalSecondParts);
                    }
                }
            }
        }
        else {
            delocalizedTimeString = this.getTimeStringFromParts(nonFractionalSecondParts);
        }
        return delocalizedTimeString;
    }
    delocalizeTimeStringToParts(localizedTimeString, fractionalSecondFormatToken) {
        const ltsFormatString = this.localeConfig?.formats?.LTS;
        const fractionalSecondTokenMatch = ltsFormatString.match(/ss\.*(S+)/g);
        if (fractionalSecondFormatToken && this.shouldIncludeFractionalSeconds()) {
            const secondFormatToken = `ss.${fractionalSecondFormatToken}`;
            this.localeConfig.formats.LTS = fractionalSecondTokenMatch
                ? ltsFormatString.replace(fractionalSecondTokenMatch[0], secondFormatToken)
                : ltsFormatString.replace("ss", secondFormatToken);
        }
        else if (fractionalSecondTokenMatch) {
            this.localeConfig.formats.LTS = ltsFormatString.replace(fractionalSecondTokenMatch[0], "ss");
        }
        dayjs.updateLocale(this.getSupportedDayjsLocale(getSupportedLocale(this.effectiveLocale)), this.localeConfig);
        const dayjsParseResult = dayjs(localizedTimeString, ["LTS", "LT"]);
        if (dayjsParseResult.isValid()) {
            return {
                hour: dayjsParseResult.get("hour"),
                minute: dayjsParseResult.get("minute"),
                second: dayjsParseResult.get("second"),
                millisecond: dayjsParseResult.get("millisecond"),
            };
        }
        return {
            hour: null,
            minute: null,
            second: null,
            millisecond: null,
        };
    }
    getTimeStringFromParts(parts) {
        let timeString = "";
        if (!parts) {
            return timeString;
        }
        if (parts.hour !== null && parts.minute !== null) {
            timeString = `${formatTimePart(parts.hour)}:${formatTimePart(parts.minute)}`;
            if (this.shouldIncludeSeconds() && parts.second !== null) {
                timeString += `:${formatTimePart(parts.second)}`;
                if (this.shouldIncludeFractionalSeconds() && parts.millisecond !== null) {
                    const second = (parts.millisecond * 0.001).toFixed(decimalPlaces(this.step));
                    timeString += `.${second.toString().replace("0.", "")}`;
                }
            }
        }
        return timeString;
    }
    getSupportedDayjsLocale(locale) {
        const dayjsLocale = locale.toLowerCase();
        if (dayjsLocale === "no") {
            return "nb";
        }
        if (dayjsLocale === "pt-pt") {
            return "pt";
        }
        return dayjsLocale;
    }
    async loadDateTimeLocaleData() {
        let supportedLocale = getSupportedLocale(this.effectiveLocale).toLowerCase();
        supportedLocale = this.getSupportedDayjsLocale(supportedLocale);
        const { default: localeConfig } = await supportedDayjsLocaleToLocaleConfigImport.get(supportedLocale)();
        this.localeConfig = localeConfig;
        dayjs.locale(this.localeConfig, null, true);
        dayjs.updateLocale(supportedLocale, this.getExtendedLocaleConfig(supportedLocale));
    }
    getExtendedLocaleConfig(locale) {
        if (locale === "ar") {
            return {
                meridiem: (hour) => (hour > 12 ? "م" : "ص"),
                formats: {
                    LT: "HH:mm A",
                    LTS: "HH:mm:ss A",
                    L: "DD/MM/YYYY",
                    LL: "D MMMM YYYY",
                    LLL: "D MMMM YYYY HH:mm A",
                    LLLL: "dddd D MMMM YYYY HH:mm A",
                },
            };
        }
        if (locale === "en-au") {
            return {
                meridiem: (hour) => (hour > 12 ? "pm" : "am"),
            };
        }
        if (locale === "en-ca") {
            return {
                meridiem: (hour) => (hour > 12 ? "p.m." : "a.m."),
            };
        }
        if (locale === "el") {
            return {
                meridiem: (hour) => (hour > 12 ? "μ.μ." : "π.μ."),
            };
        }
        if (locale === "hi") {
            return {
                formats: {
                    LT: "h:mm A",
                    LTS: "h:mm:ss A",
                    L: "DD/MM/YYYY",
                    LL: "D MMMM YYYY",
                    LLL: "D MMMM YYYY, h:mm A",
                    LLLL: "dddd, D MMMM YYYY, h:mm A",
                },
                meridiem: (hour) => (hour > 12 ? "pm" : "am"),
            };
        }
        if (locale === "ko") {
            return {
                meridiem: (hour) => (hour > 12 ? "오후" : "오전"),
            };
        }
        if (locale === "zh-tw") {
            return {
                formats: {
                    LT: "AHH:mm",
                    LTS: "AHH:mm:ss",
                },
            };
        }
        if (locale === "zh-hk") {
            return {
                formats: {
                    LT: "AHH:mm",
                    LTS: "AHH:mm:ss",
                },
                meridiem: (hour) => (hour > 12 ? "下午" : "上午"),
            };
        }
    }
    onLabelClick() {
        this.setFocus();
    }
    shouldIncludeSeconds() {
        return this.step < 60;
    }
    shouldIncludeFractionalSeconds() {
        return decimalPlaces(this.step) > 0;
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        connectLocalized(this);
        if (isValidTime(this.value)) {
            this.setValueDirectly(this.value);
        }
        else {
            this.value = undefined;
        }
        connectLabel(this);
        connectForm(this);
        connectMessages(this);
    }
    async componentWillLoad() {
        setUpLoadableComponent(this);
        await Promise.all([setUpMessages(this), this.loadDateTimeLocaleData()]);
    }
    componentDidLoad() {
        setComponentLoaded(this);
        if (isValidTime(this.value)) {
            this.setInputValue(localizeTimeString({
                value: this.value,
                locale: this.effectiveLocale,
                numberingSystem: this.numberingSystem,
                includeSeconds: this.shouldIncludeSeconds(),
                fractionalSecondDigits: decimalPlaces(this.step),
            }));
        }
    }
    disconnectedCallback() {
        disconnectLabel(this);
        disconnectForm(this);
        disconnectLocalized(this);
        deactivateFocusTrap(this);
        disconnectMessages(this);
    }
    componentDidRender() {
        updateHostInteraction(this);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        const { disabled, messages, readOnly } = this;
        return (h(Host, { key: '7d5021d0867938190a71ecc258687504668aa919', onBlur: this.hostBlurHandler, onKeyDown: this.keyDownHandler }, h(InteractiveContainer, { key: '3df503ada54e8259f0e4e7013191942e4bc17020', disabled: this.disabled }, h("div", { key: '748dd86d90db29b4baaa1af42839b3b234e54d0b', class: "input-wrapper", onClick: this.onInputWrapperClick }, h("calcite-input-text", { key: 'af404dc58cb00afb62ecef587db4426bfc7b3495', "aria-autocomplete": "none", "aria-errormessage": IDS.validationMessage, "aria-haspopup": "dialog", "aria-invalid": toAriaBoolean(this.status === "invalid"), disabled: disabled, icon: "clock", label: getLabelText(this), lang: this.effectiveLocale, onCalciteInputTextInput: this.calciteInternalInputInputHandler, onCalciteInternalInputTextFocus: this.calciteInternalInputFocusHandler, readOnly: readOnly, ref: this.setInputEl, role: "combobox", scale: this.scale, status: this.status }, !this.readOnly && this.renderToggleIcon(this.open))), h("calcite-popover", { key: '93f1e3a580ad988617e4959a2e379f03a5128bf0', autoClose: true, focusTrapDisabled: true, label: messages.chooseTime, lang: this.effectiveLocale, onCalcitePopoverBeforeClose: this.popoverBeforeCloseHandler, onCalcitePopoverBeforeOpen: this.popoverBeforeOpenHandler, onCalcitePopoverClose: this.popoverCloseHandler, onCalcitePopoverOpen: this.popoverOpenHandler, overlayPositioning: this.overlayPositioning, placement: this.placement, ref: this.setCalcitePopoverEl, referenceElement: this.calciteInputEl, triggerDisabled: true }, h("calcite-time-picker", { key: '264696f0f4187f69999b4d751ffbe02759214e78', lang: this.effectiveLocale, messageOverrides: this.messageOverrides, numberingSystem: this.numberingSystem, onCalciteInternalTimePickerChange: this.timePickerChangeHandler, ref: this.setCalciteTimePickerEl, scale: this.scale, step: this.step, tabIndex: this.open ? undefined : -1, value: this.value })), h(HiddenFormInputSlot, { key: '73e605e12a6de2c5480e392cbfbea09025243111', component: this }), this.validationMessage && this.status === "invalid" ? (h(Validation, { icon: this.validationIcon, id: IDS.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status })) : null)));
    }
    renderToggleIcon(open) {
        return (h("span", { class: CSS.toggleIcon, slot: "action" }, h("calcite-icon", { icon: open ? "chevron-up" : "chevron-down", scale: getIconScale(this.scale) })));
    }
    static get delegatesFocus() { return true; }
    static get assetsDirs() { return ["assets"]; }
    get el() { return getElement(this); }
    static get watchers() { return {
        "open": ["openHandler"],
        "focusTrapDisabled": ["handleFocusTrapDisabled"],
        "disabled": ["handleDisabledAndReadOnlyChange"],
        "readOnly": ["handleDisabledAndReadOnlyChange"],
        "messageOverrides": ["onMessagesChange"],
        "numberingSystem": ["numberingSystemWatcher"],
        "step": ["stepWatcher"],
        "value": ["valueWatcher"],
        "effectiveLocale": ["effectiveLocaleWatcher"]
    }; }
};
InputTimePicker.style = CalciteInputTimePickerStyle0;

export { InputTimePicker as I, dayjs as d };
