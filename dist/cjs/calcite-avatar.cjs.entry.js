/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5a0af791.js');
const dom = require('./dom-6a9b6275.js');
const utils = require('./utils-357c41eb.js');
require('./guid-02e5380f.js');
require('./resources-dfe71ff2.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const CSS = {
    thumbnail: "thumbnail",
    background: "background",
    initials: "initials",
    icon: "icon",
};

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
/**
 * Convert a string to a valid hex by hashing its contents
 * and using the hash as a seed for three distinct color values
 *
 * @param string
 */
function stringToHex(string) {
    // improve random color generation for similar strings.
    string = mixStringDeterministically(string);
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let hex = "#";
    for (let j = 0; j < 3; j++) {
        const value = (hash >> (j * 8)) & 0xff;
        hex += ("00" + value.toString(16)).substr(-2);
    }
    return hex;
}
/**
 * The function splits the string into two halves, reverses each half, and then concatenates them.
 *
 * @param {string} string - The input string to be mixed.
 * @returns {string} - The mixed string.
 */
function mixStringDeterministically(string) {
    const midPoint = Math.floor(string.length / 2);
    const reversed = string.split("").reverse().join("");
    return reversed.substring(midPoint) + reversed.slice(0, midPoint);
}
/**
 * Find the hue of a color given the separate RGB color channels
 *
 * @param rgb
 */
function rgbToHue(rgb) {
    let { r, g, b } = rgb;
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;
    if (max === min) {
        return 0;
    }
    let hue = (max + min) / 2;
    switch (max) {
        case r:
            hue = (g - b) / delta + (g < b ? 6 : 0);
            break;
        case g:
            hue = (b - r) / delta + 2;
            break;
        case b:
            hue = (r - g) / delta + 4;
            break;
    }
    return Math.round(hue * 60);
}
/**
 * For a hex color, find the hue
 *
 * @param hex {string} - form of "#------"
 */
function hexToHue(hex) {
    return rgbToHue(utils.hexToRGB(hex));
}

const avatarCss = ":host{display:inline-block;overflow:hidden;border-radius:50%}:host([scale=s]){block-size:1.5rem;inline-size:1.5rem;font-size:var(--calcite-font-size--3)}:host([scale=m]){block-size:2rem;inline-size:2rem;font-size:var(--calcite-font-size--2)}:host([scale=l]){block-size:2.75rem;inline-size:2.75rem;font-size:var(--calcite-font-size-0)}.icon{display:flex}.background{display:flex;block-size:100%;inline-size:100%;align-items:center;justify-content:center;border-radius:50%}.initials{font-weight:var(--calcite-font-weight-bold);text-transform:uppercase;color:var(--calcite-color-text-2)}.thumbnail{block-size:100%;inline-size:100%;border-radius:50%}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteAvatarStyle0 = avatarCss;

const Avatar = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.scale = "m";
        this.thumbnail = undefined;
        this.fullName = undefined;
        this.username = undefined;
        this.userId = undefined;
        this.label = undefined;
        this.thumbnailFailedToLoad = false;
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    render() {
        return this.determineContent();
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    determineContent() {
        if (this.thumbnail && !this.thumbnailFailedToLoad) {
            return (index.h("img", { alt: this.label || "", class: CSS.thumbnail, onError: () => (this.thumbnailFailedToLoad = true), src: this.thumbnail }));
        }
        const initials = this.generateInitials();
        const backgroundColor = this.generateFillColor();
        return (index.h("span", { "aria-label": this.label || this.fullName, class: CSS.background, role: "figure", style: { backgroundColor } }, initials ? (index.h("span", { "aria-hidden": "true", class: CSS.initials }, initials)) : (index.h("calcite-icon", { class: CSS.icon, icon: "user", scale: this.scale }))));
    }
    /**
     * Generate a valid background color that is consistent and unique to this user
     */
    generateFillColor() {
        const { userId, username, fullName, el } = this;
        const theme = dom.getModeName(el);
        const id = userId && `#${userId.substr(userId.length - 6)}`;
        const name = username || fullName || "";
        const hex = id && utils.isValidHex(id) ? id : stringToHex(name);
        // if there is not unique information, or an invalid hex is produced, return a default
        if ((!userId && !name) || !utils.isValidHex(hex)) {
            return `var(--calcite-color-foreground-2)`;
        }
        const hue = hexToHue(hex);
        const l = theme === "dark" ? 20 : 90;
        return `hsl(${hue}, 60%, ${l}%)`;
    }
    /**
     * Use fullName or username to generate initials
     */
    generateInitials() {
        const { fullName, username } = this;
        if (fullName) {
            return fullName
                .trim()
                .split(" ")
                .map((name) => name.substring(0, 1))
                .join("");
        }
        else if (username) {
            return username.substring(0, 2);
        }
        return false;
    }
    get el() { return index.getElement(this); }
};
Avatar.style = CalciteAvatarStyle0;

exports.calcite_avatar = Avatar;
