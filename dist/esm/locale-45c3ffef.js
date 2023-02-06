/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { c as createCommonjsModule, a as commonjsGlobal } from './_commonjsHelpers-d5f9d613.js';
import { a as getAssetPath } from './index-c246d90e.js';

var esriLoader = createCommonjsModule(function (module, exports) {
(function (global, factory) {
	factory(exports) ;
}(commonjsGlobal, (function (exports) {
/* Copyright (c) 2017 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
var isBrowser = typeof window !== 'undefined';
// allow consuming libraries to provide their own Promise implementations
var utils = {
    Promise: isBrowser ? window['Promise'] : undefined
};

/* Copyright (c) 2017 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
var DEFAULT_VERSION = '4.22';
var NEXT = 'next';
function parseVersion(version) {
    if (version.toLowerCase() === NEXT) {
        return NEXT;
    }
    var match = version && version.match(/^(\d)\.(\d+)/);
    return match && {
        major: parseInt(match[1], 10),
        minor: parseInt(match[2], 10)
    };
}
/**
 * Get the CDN url for a given version
 *
 * @param version Ex: '4.22' or '3.39'. Defaults to the latest 4.x version.
 */
function getCdnUrl(version) {
    if (version === void 0) { version = DEFAULT_VERSION; }
    return "https://js.arcgis.com/" + version + "/";
}
/**
 * Get the CDN url for a the CSS for a given version and/or theme
 *
 * @param version Ex: '4.22', '3.39', or 'next'. Defaults to the latest 4.x version.
 */
function getCdnCssUrl(version) {
    if (version === void 0) { version = DEFAULT_VERSION; }
    var baseUrl = getCdnUrl(version);
    var parsedVersion = parseVersion(version);
    if (parsedVersion !== NEXT && parsedVersion.major === 3) {
        // NOTE: at 3.11 the CSS moved from the /js folder to the root
        var path = parsedVersion.minor <= 10 ? 'js/' : '';
        return "" + baseUrl + path + "esri/css/esri.css";
    }
    else {
        // assume 4.x
        return baseUrl + "esri/themes/light/main.css";
    }
}

/* Copyright (c) 2017 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
function createStylesheetLink(href) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    return link;
}
function insertLink(link, before) {
    if (before) {
        // the link should be inserted before a specific node
        var beforeNode = document.querySelector(before);
        beforeNode.parentNode.insertBefore(link, beforeNode);
    }
    else {
        // append the link to then end of the head tag
        document.head.appendChild(link);
    }
}
// check if the css url has been injected or added manually
function getCss(url) {
    return document.querySelector("link[href*=\"" + url + "\"]");
}
function getCssUrl(urlOrVersion) {
    return !urlOrVersion || parseVersion(urlOrVersion)
        // if it's a valid version string return the CDN URL
        ? getCdnCssUrl(urlOrVersion)
        // otherwise assume it's a URL and return that
        : urlOrVersion;
}
// lazy load the CSS needed for the ArcGIS API
function loadCss(urlOrVersion, before) {
    var url = getCssUrl(urlOrVersion);
    var link = getCss(url);
    if (!link) {
        // create & load the css link
        link = createStylesheetLink(url);
        insertLink(link, before);
    }
    return link;
}

/* Copyright (c) 2017 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
var defaultOptions = {};
function createScript(url) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.setAttribute('data-esri-loader', 'loading');
    return script;
}
// add a one-time load handler to script
// and optionally add a one time error handler as well
function handleScriptLoad(script, callback, errback) {
    var onScriptError;
    if (errback) {
        // set up an error handler as well
        onScriptError = handleScriptError(script, errback);
    }
    var onScriptLoad = function () {
        // pass the script to the callback
        callback(script);
        // remove this event listener
        script.removeEventListener('load', onScriptLoad, false);
        if (onScriptError) {
            // remove the error listener as well
            script.removeEventListener('error', onScriptError, false);
        }
    };
    script.addEventListener('load', onScriptLoad, false);
}
// add a one-time error handler to the script
function handleScriptError(script, callback) {
    var onScriptError = function (e) {
        // reject the promise and remove this event listener
        callback(e.error || new Error("There was an error attempting to load " + script.src));
        // remove this event listener
        script.removeEventListener('error', onScriptError, false);
    };
    script.addEventListener('error', onScriptError, false);
    return onScriptError;
}
// allow the user to configure default script options rather than passing options to `loadModules` each time
function setDefaultOptions(options) {
    if (options === void 0) { options = {}; }
    defaultOptions = options;
}
// get the script injected by this library
function getScript() {
    return document.querySelector('script[data-esri-loader]');
}
// has ArcGIS API been loaded on the page yet?
function isLoaded() {
    var globalRequire = window['require'];
    // .on() ensures that it's Dojo's AMD loader
    return globalRequire && globalRequire.on;
}
// load the ArcGIS API on the page
function loadScript(options) {
    if (options === void 0) { options = {}; }
    // we would have liked to use spread like { ...defaultOptions, ...options }
    // but TS would inject a polyfill that would require use to configure rollup w content: 'window'
    // if we have another occasion to use spread, let's do that and replace this for...in
    var opts = {};
    [defaultOptions, options].forEach(function (obj) {
        for (var prop in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                opts[prop] = obj[prop];
            }
        }
    });
    // URL to load
    var version = opts.version;
    var url = opts.url || getCdnUrl(version);
    return new utils.Promise(function (resolve, reject) {
        var script = getScript();
        if (script) {
            // the API is already loaded or in the process of loading...
            // NOTE: have to test against scr attribute value, not script.src
            // b/c the latter will return the full url for relative paths
            var src = script.getAttribute('src');
            if (src !== url) {
                // potentially trying to load a different version of the API
                reject(new Error("The ArcGIS API for JavaScript is already loaded (" + src + ")."));
            }
            else {
                if (isLoaded()) {
                    // the script has already successfully loaded
                    resolve(script);
                }
                else {
                    // wait for the script to load and then resolve
                    handleScriptLoad(script, resolve, reject);
                }
            }
        }
        else {
            if (isLoaded()) {
                // the API has been loaded by some other means
                // potentially trying to load a different version of the API
                reject(new Error("The ArcGIS API for JavaScript is already loaded."));
            }
            else {
                // this is the first time attempting to load the API
                var css = opts.css;
                if (css) {
                    var useVersion = css === true;
                    // load the css before loading the script
                    loadCss(useVersion ? version : css, opts.insertCssBefore);
                }
                // create a script object whose source points to the API
                script = createScript(url);
                // _currentUrl = url;
                // once the script is loaded...
                handleScriptLoad(script, function () {
                    // update the status of the script
                    script.setAttribute('data-esri-loader', 'loaded');
                    // return the script
                    resolve(script);
                }, reject);
                // load the script
                document.body.appendChild(script);
            }
        }
    });
}

/* Copyright (c) 2017 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
// wrap Dojo's require() in a promise
function requireModules(modules) {
    return new utils.Promise(function (resolve, reject) {
        // If something goes wrong loading the esri/dojo scripts, reject with the error.
        var errorHandler = window['require'].on('error', reject);
        window['require'](modules, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // remove error handler
            errorHandler.remove();
            // Resolve with the parameters from dojo require as an array.
            resolve(args);
        });
    });
}
// returns a promise that resolves with an array of the required modules
// also will attempt to lazy load the ArcGIS API if it has not already been loaded
function loadModules(modules, loadScriptOptions) {
    if (loadScriptOptions === void 0) { loadScriptOptions = {}; }
    if (!isLoaded()) {
        // script is not yet loaded, is it in the process of loading?
        var script = getScript();
        var src = script && script.getAttribute('src');
        if (!loadScriptOptions.url && src) {
            // script is still loading and user did not specify a URL
            // in this case we want to default to the URL that's being loaded
            // instead of defaulting to the latest 4.x URL
            loadScriptOptions.url = src;
        }
        // attempt to load the script then load the modules
        return loadScript(loadScriptOptions).then(function () { return requireModules(modules); });
    }
    else {
        // script is already loaded, just load the modules
        return requireModules(modules);
    }
}

/*
  Copyright (c) 2017 Esri
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
// re-export the functions that are part of the public API

exports.utils = utils;
exports.loadModules = loadModules;
exports.getScript = getScript;
exports.isLoaded = isLoaded;
exports.loadScript = loadScript;
exports.setDefaultOptions = setDefaultOptions;
exports.loadCss = loadCss;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=esri-loader.js.map
});

/*
 *   Copyright (c) 2022 Esri
 *   All rights reserved.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
const languageMap = new Map([
  ["ar", "ar"],
  ["bg", "bg"],
  ["bs", "bs"],
  ["ca", "ca"],
  ["cs", "cs"],
  ["da", "da"],
  ["de", "de"],
  ["el", "el"],
  ["en", "en"],
  ["es", "es"],
  ["et", "et"],
  ["fi", "fi"],
  ["fr", "fr"],
  ["he", "he"],
  ["hr", "hr"],
  ["hu", "hu"],
  ["id", "id"],
  ["it", "it"],
  ["ja", "ja"],
  ["ko", "ko"],
  ["lt", "lt"],
  ["lv", "lv"],
  ["nb", "nb"],
  ["nl", "nl"],
  ["pl", "pl"],
  ["pt-br", "pt-BR"],
  ["pt-pt", "pt-PT"],
  ["ro", "ro"],
  ["ru", "ru"],
  ["sk", "sk"],
  ["sl", "sl"],
  ["sr", "sr"],
  ["sv", "sv"],
  ["th", "th"],
  ["tr", "tr"],
  ["uk", "uk"],
  ["vi", "vi"],
  ["zh-cn", "zh-CN"],
  ["zh-hk", "zh-HK"],
  ["zh-tw", "zh-TW"],
]);

/** @license
 * Copyright 2022 Esri
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function getComponentClosestLanguage(element) {
  var _a, _b, _c;
  const closestElement = (_a = (element.closest("[lang]"))) !== null && _a !== void 0 ? _a : (_c = (_b = element.shadowRoot) === null || _b === void 0 ? void 0 : _b.ownerDocument) === null || _c === void 0 ? void 0 : _c.documentElement;
  // language set by the calling application or browser. defaults to english.
  const lang = ((closestElement === null || closestElement === void 0 ? void 0 : closestElement.lang) || (navigator === null || navigator === void 0 ? void 0 : navigator.language) || "en").toLowerCase();
  if (languageMap.has(lang)) {
    return languageMap.get(lang);
  }
  else {
    // "ru-RU" maps to "ru" use case
    return languageMap.has(lang.slice(0, 2)) ? languageMap.get(lang.slice(0, 2)) : "en";
  }
}
function fetchLocaleStringsForComponent(componentName, locale) {
  return new Promise((resolve, reject) => {
    fetch(getAssetPath(`./assets/t9n/${componentName}/resources_${locale}.json`)).then(result => {
      if (result.ok) {
        resolve(result.json());
      }
      else {
        reject();
      }
    }, () => reject());
  });
}
async function getLocaleComponentStrings(element) {
  const componentName = element.tagName.toLowerCase();
  const componentLanguage = getComponentClosestLanguage(element);
  let strings;
  try {
    strings = await fetchLocaleStringsForComponent(componentName, componentLanguage);
  }
  catch (e) {
    console.warn(`no locale for ${componentName} (${componentLanguage}) loading default locale en.`);
    strings = await fetchLocaleStringsForComponent(componentName, "en");
  }
  return [strings, componentLanguage];
}

export { esriLoader as e, getLocaleComponentStrings as g };
