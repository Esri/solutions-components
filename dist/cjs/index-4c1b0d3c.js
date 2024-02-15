/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

class NativeDateEngine {
    constructor() {
        this._formatterCache = new Map();
        this._commonDateTimeFormatterOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            timeZoneName: 'shortOffset',
        };
    }
    get name() {
        return 'native';
    }
    create(date) {
        return new Date(date);
    }
    increase(date) {
        const oneDayInMs = 86400000;
        return new Date(date.getTime() + oneDayInMs);
    }
    formatToIsoDateString(date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}-${month.toString().padStart(2, '0')}-${day
            .toString()
            .padStart(2, '0')}`;
    }
    isoToTimeZone(isoDate, tz) {
        const date = this._toDate(isoDate);
        const formatter = this._getFormatter(tz);
        const parts = formatter.formatToParts(date);
        const [offset] = parts
            .filter(({ type }) => type === 'timeZoneName')
            .map(({ value }) => value);
        const tzOffset = this._getTimeZoneOffsetInMins(offset);
        const tzOffsetMinutes = date.getMinutes() - (date.getTimezoneOffset() - tzOffset);
        date.setMinutes(tzOffsetMinutes);
        return date;
    }
    same(date1, date2) {
        return date1.getTime() === date2.getTime();
    }
    _toDate(isoDate) {
        return new Date(isoDate);
    }
    _getFormatter(tz) {
        let formatter = this._formatterCache.get(tz);
        if (!formatter) {
            formatter = new Intl.DateTimeFormat('en-US', {
                timeZone: tz,
                ...this._commonDateTimeFormatterOptions,
            });
            this._formatterCache.set(tz, formatter);
        }
        return formatter;
    }
    _getTimeZoneOffsetInMins(gmtTimeZone) {
        const [sign, ...hoursMinutes] = gmtTimeZone.slice(3);
        const [hours, minutes] = hoursMinutes.join('').split(':');
        const signMultiplier = sign === '+' ? 1 : -1;
        return signMultiplier * (Number(hours) * 60 + Number(minutes || 0));
    }
}

exports.DateEngine = NativeDateEngine;
