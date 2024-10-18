/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import './solution-resource-f5809979.js';
import './index-e14fade9.js';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

/* Copyright (c) 2017 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Checks parameters to see if we should use FormData to send the request
 * @param params The object whose keys will be encoded.
 * @return A boolean indicating if FormData will be required.
 */
function requiresFormData(params) {
    return Object.keys(params).some(function (key) {
        var value = params[key];
        if (!value) {
            return false;
        }
        if (value && value.toParam) {
            value = value.toParam();
        }
        var type = value.constructor.name;
        switch (type) {
            case "Array":
                return false;
            case "Object":
                return false;
            case "Date":
                return false;
            case "Function":
                return false;
            case "Boolean":
                return false;
            case "String":
                return false;
            case "Number":
                return false;
            default:
                return true;
        }
    });
}
/**
 * Converts parameters to the proper representation to send to the ArcGIS REST API.
 * @param params The object whose keys will be encoded.
 * @return A new object with properly encoded values.
 */
function processParams(params) {
    var newParams = {};
    Object.keys(params).forEach(function (key) {
        var _a, _b;
        var param = params[key];
        if (param && param.toParam) {
            param = param.toParam();
        }
        if (!param &&
            param !== 0 &&
            typeof param !== "boolean" &&
            typeof param !== "string") {
            return;
        }
        var type = param.constructor.name;
        var value;
        // properly encodes objects, arrays and dates for arcgis.com and other services.
        // ported from https://github.com/Esri/esri-leaflet/blob/master/src/Request.js#L22-L30
        // also see https://github.com/Esri/arcgis-rest-js/issues/18:
        // null, undefined, function are excluded. If you want to send an empty key you need to send an empty string "".
        switch (type) {
            case "Array":
                // Based on the first element of the array, classify array as an array of arrays, an array of objects
                // to be stringified, or an array of non-objects to be comma-separated
                // eslint-disable-next-line no-case-declarations
                var firstElementType = (_b = (_a = param[0]) === null || _a === void 0 ? void 0 : _a.constructor) === null || _b === void 0 ? void 0 : _b.name;
                value =
                    firstElementType === "Array" ? param : // pass thru array of arrays
                        firstElementType === "Object" ? JSON.stringify(param) : // stringify array of objects
                            param.join(","); // join other types of array elements
                break;
            case "Object":
                value = JSON.stringify(param);
                break;
            case "Date":
                value = param.valueOf();
                break;
            case "Function":
                value = null;
                break;
            case "Boolean":
                value = param + "";
                break;
            default:
                value = param;
                break;
        }
        if (value || value === 0 || typeof value === "string" || Array.isArray(value)) {
            newParams[key] = value;
        }
    });
    return newParams;
}

/* Copyright (c) 2017 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Encodes keys and parameters for use in a URL's query string.
 *
 * @param key Parameter's key
 * @param value Parameter's value
 * @returns Query string with key and value pairs separated by "&"
 */
function encodeParam(key, value) {
    // For array of arrays, repeat key=value for each element of containing array
    if (Array.isArray(value) && value[0] && Array.isArray(value[0])) {
        return value.map(function (arrayElem) { return encodeParam(key, arrayElem); }).join("&");
    }
    return encodeURIComponent(key) + "=" + encodeURIComponent(value);
}
/**
 * Encodes the passed object as a query string.
 *
 * @param params An object to be encoded.
 * @returns An encoded query string.
 */
function encodeQueryString(params) {
    var newParams = processParams(params);
    return Object.keys(newParams)
        .map(function (key) {
        return encodeParam(key, newParams[key]);
    })
        .join("&");
}

/* Copyright (c) 2017 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Encodes parameters in a [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) object in browsers or in a [FormData](https://github.com/form-data/form-data) in Node.js
 *
 * @param params An object to be encoded.
 * @returns The complete [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) object.
 */
function encodeFormData(params, forceFormData) {
    // see https://github.com/Esri/arcgis-rest-js/issues/499 for more info.
    var useFormData = requiresFormData(params) || forceFormData;
    var newParams = processParams(params);
    if (useFormData) {
        var formData_1 = new FormData();
        Object.keys(newParams).forEach(function (key) {
            if (typeof Blob !== "undefined" && newParams[key] instanceof Blob) {
                /* To name the Blob:
                 1. look to an alternate request parameter called 'fileName'
                 2. see if 'name' has been tacked onto the Blob manually
                 3. if all else fails, use the request parameter
                */
                var filename = newParams["fileName"] || newParams[key].name || key;
                formData_1.append(key, newParams[key], filename);
            }
            /* istanbul ignore next */
            else if (newParams[key].constructor &&
                newParams[key].constructor.name === 'ReadStream' &&
                // TODO: only specify the knownLength option if a valid value is given.
                // If we can verify in all REST API that the option is need for
                // node ReadStream, it can throw an error for the missing dataSize value.
                // Note that such change will be a breaking change.
                Number.isInteger(newParams["dataSize"])) {
                // have to cast the formData to any so that I can use the unofficial API
                // in the form-data library to handle Node ReadStream. See
                // https://github.com/form-data/form-data/issues/508
                formData_1.append(key, newParams[key], {
                    knownLength: newParams["dataSize"]
                });
            }
            else {
                formData_1.append(key, newParams[key]);
            }
        });
        return formData_1;
    }
    else {
        return encodeQueryString(params);
    }
}

/* Copyright (c) 2017 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
// TypeScript 2.1 no longer allows you to extend built in types. See https://github.com/Microsoft/TypeScript/issues/12790#issuecomment-265981442
// and https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
//
// This code is from MDN https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Custom_Error_Types.
var ArcGISRequestError = /** @class */ (function () {
    /**
     * Create a new `ArcGISRequestError`  object.
     *
     * @param message - The error message from the API
     * @param code - The error code from the API
     * @param response - The original response from the API that caused the error
     * @param url - The original url of the request
     * @param options - The original options and parameters of the request
     */
    function ArcGISRequestError(message, code, response, url, options) {
        message = message || "UNKNOWN_ERROR";
        code = code || "UNKNOWN_ERROR_CODE";
        this.name = "ArcGISRequestError";
        this.message =
            code === "UNKNOWN_ERROR_CODE" ? message : code + ": " + message;
        this.originalMessage = message;
        this.code = code;
        this.response = response;
        this.url = url;
        this.options = options;
    }
    return ArcGISRequestError;
}());
ArcGISRequestError.prototype = Object.create(Error.prototype);
ArcGISRequestError.prototype.constructor = ArcGISRequestError;

/* Copyright (c) 2017-2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
var NODEJS_DEFAULT_REFERER_HEADER = "@esri/arcgis-rest-js";
var DEFAULT_ARCGIS_REQUEST_OPTIONS = {
    httpMethod: "POST",
    params: {
        f: "json",
    },
};
var ArcGISAuthError = /** @class */ (function (_super) {
    __extends(ArcGISAuthError, _super);
    /**
     * Create a new `ArcGISAuthError`  object.
     *
     * @param message - The error message from the API
     * @param code - The error code from the API
     * @param response - The original response from the API that caused the error
     * @param url - The original url of the request
     * @param options - The original options of the request
     */
    function ArcGISAuthError(message, code, response, url, options) {
        if (message === void 0) { message = "AUTHENTICATION_ERROR"; }
        if (code === void 0) { code = "AUTHENTICATION_ERROR_CODE"; }
        var _this = _super.call(this, message, code, response, url, options) || this;
        _this.name = "ArcGISAuthError";
        _this.message =
            code === "AUTHENTICATION_ERROR_CODE" ? message : code + ": " + message;
        return _this;
    }
    ArcGISAuthError.prototype.retry = function (getSession, retryLimit) {
        var _this = this;
        if (retryLimit === void 0) { retryLimit = 3; }
        var tries = 0;
        var retryRequest = function (resolve, reject) {
            getSession(_this.url, _this.options)
                .then(function (session) {
                var newOptions = __assign(__assign({}, _this.options), { authentication: session });
                tries = tries + 1;
                return request(_this.url, newOptions);
            })
                .then(function (response) {
                resolve(response);
            })
                .catch(function (e) {
                if (e.name === "ArcGISAuthError" && tries < retryLimit) {
                    retryRequest(resolve, reject);
                }
                else if (e.name === "ArcGISAuthError" && tries >= retryLimit) {
                    reject(_this);
                }
                else {
                    reject(e);
                }
            });
        };
        return new Promise(function (resolve, reject) {
            retryRequest(resolve, reject);
        });
    };
    return ArcGISAuthError;
}(ArcGISRequestError));
/**
 * Checks for errors in a JSON response from the ArcGIS REST API. If there are no errors, it will return the `data` passed in. If there is an error, it will throw an `ArcGISRequestError` or `ArcGISAuthError`.
 *
 * @param data The response JSON to check for errors.
 * @param url The url of the original request
 * @param params The parameters of the original request
 * @param options The options of the original request
 * @returns The data that was passed in the `data` parameter
 */
function checkForErrors(response, url, params, options, originalAuthError) {
    // this is an error message from billing.arcgis.com backend
    if (response.code >= 400) {
        var message = response.message, code = response.code;
        throw new ArcGISRequestError(message, code, response, url, options);
    }
    // error from ArcGIS Online or an ArcGIS Portal or server instance.
    if (response.error) {
        var _a = response.error, message = _a.message, code = _a.code, messageCode = _a.messageCode;
        var errorCode = messageCode || code || "UNKNOWN_ERROR_CODE";
        if (code === 498 ||
            code === 499 ||
            messageCode === "GWM_0003" ||
            (code === 400 && message === "Unable to generate token.")) {
            if (originalAuthError) {
                throw originalAuthError;
            }
            else {
                throw new ArcGISAuthError(message, errorCode, response, url, options);
            }
        }
        throw new ArcGISRequestError(message, errorCode, response, url, options);
    }
    // error from a status check
    if (response.status === "failed" || response.status === "failure") {
        var message = void 0;
        var code = "UNKNOWN_ERROR_CODE";
        try {
            message = JSON.parse(response.statusMessage).message;
            code = JSON.parse(response.statusMessage).code;
        }
        catch (e) {
            message = response.statusMessage || response.message;
        }
        throw new ArcGISRequestError(message, code, response, url, options);
    }
    return response;
}
/**
 * ```js
 * import { request } from '@esri/arcgis-rest-request';
 * //
 * request('https://www.arcgis.com/sharing/rest')
 *   .then(response) // response.currentVersion === 5.2
 * //
 * request('https://www.arcgis.com/sharing/rest', {
 *   httpMethod: "GET"
 * })
 * //
 * request('https://www.arcgis.com/sharing/rest/search', {
 *   params: { q: 'parks' }
 * })
 *   .then(response) // response.total => 78379
 * ```
 * Generic method for making HTTP requests to ArcGIS REST API endpoints.
 *
 * @param url - The URL of the ArcGIS REST API endpoint.
 * @param requestOptions - Options for the request, including parameters relevant to the endpoint.
 * @returns A Promise that will resolve with the data from the response.
 */
function request(url, requestOptions) {
    if (requestOptions === void 0) { requestOptions = { params: { f: "json" } }; }
    var options = __assign(__assign(__assign({ httpMethod: "POST" }, DEFAULT_ARCGIS_REQUEST_OPTIONS), requestOptions), {
        params: __assign(__assign({}, DEFAULT_ARCGIS_REQUEST_OPTIONS.params), requestOptions.params),
        headers: __assign(__assign({}, DEFAULT_ARCGIS_REQUEST_OPTIONS.headers), requestOptions.headers),
    });
    var missingGlobals = [];
    var recommendedPackages = [];
    // don't check for a global fetch if a custom implementation was passed through
    if (!options.fetch && typeof fetch !== "undefined") {
        options.fetch = fetch.bind(Function("return this")());
    }
    else {
        missingGlobals.push("`fetch`");
        recommendedPackages.push("`node-fetch`");
    }
    if (typeof Promise === "undefined") {
        missingGlobals.push("`Promise`");
        recommendedPackages.push("`es6-promise`");
    }
    if (typeof FormData === "undefined") {
        missingGlobals.push("`FormData`");
        recommendedPackages.push("`isomorphic-form-data`");
    }
    if (!options.fetch ||
        typeof Promise === "undefined" ||
        typeof FormData === "undefined") {
        throw new Error("`arcgis-rest-request` requires a `fetch` implementation and global variables for `Promise` and `FormData` to be present in the global scope. You are missing " + missingGlobals.join(", ") + ". We recommend installing the " + recommendedPackages.join(", ") + " modules at the root of your application to add these to the global scope. See https://bit.ly/2KNwWaJ for more info.");
    }
    var httpMethod = options.httpMethod, authentication = options.authentication, rawResponse = options.rawResponse;
    var params = __assign({ f: "json" }, options.params);
    var originalAuthError = null;
    var fetchOptions = {
        method: httpMethod,
        /* ensures behavior mimics XMLHttpRequest.
        needed to support sending IWA cookies */
        credentials: options.credentials || "same-origin",
    };
    // the /oauth2/platformSelf route will add X-Esri-Auth-Client-Id header
    // and that request needs to send cookies cross domain
    // so we need to set the credentials to "include"
    if (options.headers &&
        options.headers["X-Esri-Auth-Client-Id"] &&
        url.indexOf("/oauth2/platformSelf") > -1) {
        fetchOptions.credentials = "include";
    }
    return (authentication
        ? authentication.getToken(url, { fetch: options.fetch }).catch(function (err) {
            /**
             * append original request url and requestOptions
             * to the error thrown by getToken()
             * to assist with retrying
             */
            err.url = url;
            err.options = options;
            /**
             * if an attempt is made to talk to an unfederated server
             * first try the request anonymously. if a 'token required'
             * error is thrown, throw the UNFEDERATED error then.
             */
            originalAuthError = err;
            return Promise.resolve("");
        })
        : Promise.resolve(""))
        .then(function (token) {
        if (token.length) {
            params.token = token;
        }
        if (authentication && authentication.getDomainCredentials) {
            fetchOptions.credentials = authentication.getDomainCredentials(url);
        }
        // Custom headers to add to request. IRequestOptions.headers with merge over requestHeaders.
        var requestHeaders = {};
        if (fetchOptions.method === "GET") {
            // Prevents token from being passed in query params when hideToken option is used.
            /* istanbul ignore if - window is always defined in a browser. Test case is covered by Jasmine in node test */
            if (params.token &&
                options.hideToken &&
                // Sharing API does not support preflight check required by modern browsers https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request
                typeof window === "undefined") {
                requestHeaders["X-Esri-Authorization"] = "Bearer " + params.token;
                delete params.token;
            }
            // encode the parameters into the query string
            var queryParams = encodeQueryString(params);
            // dont append a '?' unless parameters are actually present
            var urlWithQueryString = queryParams === "" ? url : url + "?" + encodeQueryString(params);
            if (
            // This would exceed the maximum length for URLs specified by the consumer and requires POST
            (options.maxUrlLength &&
                urlWithQueryString.length > options.maxUrlLength) ||
                // Or if the customer requires the token to be hidden and it has not already been hidden in the header (for browsers)
                (params.token && options.hideToken)) {
                // the consumer specified a maximum length for URLs
                // and this would exceed it, so use post instead
                fetchOptions.method = "POST";
                // If the token was already added as a Auth header, add the token back to body with other params instead of header
                if (token.length && options.hideToken) {
                    params.token = token;
                    // Remove existing header that was added before url query length was checked
                    delete requestHeaders["X-Esri-Authorization"];
                }
            }
            else {
                // just use GET
                url = urlWithQueryString;
            }
        }
        /* updateResources currently requires FormData even when the input parameters dont warrant it.
    https://developers.arcgis.com/rest/users-groups-and-items/update-resources.htm
        see https://github.com/Esri/arcgis-rest-js/pull/500 for more info. */
        var forceFormData = new RegExp("/items/.+/updateResources").test(url);
        if (fetchOptions.method === "POST") {
            fetchOptions.body = encodeFormData(params, forceFormData);
        }
        // Mixin headers from request options
        fetchOptions.headers = __assign(__assign({}, requestHeaders), options.headers);
        /* istanbul ignore next - karma reports coverage on browser tests only */
        if (typeof window === "undefined" && !fetchOptions.headers.referer) {
            fetchOptions.headers.referer = NODEJS_DEFAULT_REFERER_HEADER;
        }
        /* istanbul ignore else blob responses are difficult to make cross platform we will just have to trust the isomorphic fetch will do its job */
        if (!requiresFormData(params) && !forceFormData) {
            fetchOptions.headers["Content-Type"] =
                "application/x-www-form-urlencoded";
        }
        return options.fetch(url, fetchOptions);
    })
        .then(function (response) {
        if (!response.ok) {
            // server responded w/ an actual error (404, 500, etc)
            var status_1 = response.status, statusText = response.statusText;
            throw new ArcGISRequestError(statusText, "HTTP " + status_1, response, url, options);
        }
        if (rawResponse) {
            return response;
        }
        switch (params.f) {
            case "json":
                return response.json();
            case "geojson":
                return response.json();
            case "html":
                return response.text();
            case "text":
                return response.text();
            /* istanbul ignore next blob responses are difficult to make cross platform we will just have to trust that isomorphic fetch will do its job */
            default:
                return response.blob();
        }
    })
        .then(function (data) {
        if ((params.f === "json" || params.f === "geojson") && !rawResponse) {
            var response = checkForErrors(data, url, params, options, originalAuthError);
            if (originalAuthError) {
                /* If the request was made to an unfederated service that
                didn't require authentication, add the base url and a dummy token
                to the list of trusted servers to avoid another federation check
                in the event of a repeat request */
                var truncatedUrl = url
                    .toLowerCase()
                    .split(/\/rest(\/admin)?\/services\//)[0];
                options.authentication.federatedServers[truncatedUrl] = {
                    token: [],
                    // default to 24 hours
                    expires: new Date(Date.now() + 86400 * 1000),
                };
                originalAuthError = null;
            }
            return response;
        }
        else {
            return data;
        }
    });
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Helper method to ensure that user supplied urls don't include whitespace or a trailing slash.
 */
function cleanUrl(url) {
    // Guard so we don't try to trim something that's not a string
    if (typeof url !== "string") {
        return url;
    }
    // trim leading and trailing spaces, but not spaces inside the url
    url = url.trim();
    // remove the trailing slash to the url if one was included
    if (url[url.length - 1] === "/") {
        url = url.slice(0, -1);
    }
    return url;
}

/** @license
 * Copyright 2018 Esri
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
/**
 * Extracts JSON from a Blob.
 *
 * @param blob Blob to use as source
 * @returns A promise that will resolve with JSON or null
 */
function blobToJson(blob) {
    return new Promise((resolve) => {
        blobToText(blob).then((blobContents) => {
            try {
                resolve(JSON.parse(blobContents));
            }
            catch (err) {
                resolve(null);
            }
        }, () => resolve(null));
    });
}
/**
 * Converts a Blob to a File.
 *
 * @param blob Blob to use as source
 * @param filename Name to use for file
 * @param mimeType MIME type to override blob's MIME type
 * @returns File created out of Blob and filename
 */
function blobToFile(blob, filename, mimeType) {
    return new File([blob], filename ? filename : "", {
        type: mimeType ?? blob.type, // Blobs default to type=""
    });
}
/**
 * Extracts text from a Blob.
 *
 * @param blob Blob to use as source
 * @returns A promise that will resolve with text read from blob
 */
function blobToText(blob) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = function (evt) {
            // Disable needed because Node requires cast
            const blobContents = evt.target.result;
            resolve(blobContents ? blobContents : ""); // not handling ArrayContents variant
        };
        reader.readAsText(blob);
    });
}
/**
 * Checks that a URL path ends with a slash.
 *
 * @param url URL to check
 * @returns URL, appended with slash if missing
 */
function checkUrlPathTermination(url) {
    return url ? (url.endsWith("/") ? url : url + "/") : url;
}
/**
 * Gets a property out of a deeply nested object.
 * Does not handle anything but nested object graph
 *
 * @param obj Object to retrieve value from
 * @param path Path into an object, e.g., "data.values.webmap", where "data" is a top-level property
 *             in obj
 * @returns Value at end of path
 */
function getProp(obj, path) {
    return path.split(".").reduce(function (prev, curr) {
        /* istanbul ignore next no need to test undefined scenario */
        return prev ? prev[curr] : undefined;
    }, obj);
}
/**
 * Get a property out of a deeply nested object
 * Does not handle anything but nested object graph
 *
 * @param obj Object to retrieve value from
 * @param path Path into an object, e.g., "data.values.webmap", where "data" is a top-level property
 *             in obj
 * @param defaultV Optional value to use if any part of path--including final value--is undefined
 * @returns Value at end of path
 */
function getPropWithDefault(obj, path, defaultV) {
    const value = path.split(".").reduce(function (prev, curr) {
        /* istanbul ignore next no need to test undefined scenario */
        return prev ? prev[curr] : undefined;
    }, obj);
    if (typeof value === "undefined") {
        return defaultV;
    }
    else {
        return value;
    }
}
/**
 * Sets a deeply nested property of an object.
 * Creates the full path if it does not exist.
 *
 * @param obj Object to set value of
 * @param path Path into an object, e.g., "data.values.webmap", where "data" is a top-level property in obj
 * @param value The value to set at the end of the path
 */
function setCreateProp(obj, path, value) {
    const pathParts = path.split(".");
    pathParts.reduce((a, b, c) => {
        if (c === pathParts.length - 1) {
            a[b] = value;
            return value;
        }
        else {
            if (!a[b]) {
                a[b] = {};
            }
            return a[b];
        }
    }, obj);
}
/**
 * Sets a deeply nested property of an object.
 * Does nothing if the full path does not exist.
 *
 * @param obj Object to set value of
 * @param path Path into an object, e.g., "data.values.webmap", where "data" is a top-level property in obj
 * @param value The value to set at the end of the path
 */
function setProp(obj, path, value) {
    if (getProp(obj, path)) {
        const pathParts = path.split(".");
        pathParts.reduce((a, b, c) => {
            if (c === pathParts.length - 1) {
                a[b] = value;
                return value;
            }
            else {
                return a[b];
            }
        }, obj);
    }
}

/** @license
 * Copyright 2018 Esri
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
/**
 * Gets a Blob from a web site.
 *
 * @param url Address of Blob
 * @param authentication Credentials for the request
 * @param requestOptions - Options for the request, including parameters relevant to the endpoint.
 * @returns Promise that will resolve with Blob or an AGO-style JSON failure response
 */
function getBlob(url, authentication, requestOptions = {}) {
    if (!url) {
        return Promise.reject("Url must be provided");
    }
    const blobRequestOptions = {
        authentication: authentication,
        rawResponse: true,
        ...requestOptions,
    };
    return request(url, blobRequestOptions).then((response) => {
        return response.blob();
    });
}

/** @license
 * Copyright 2018 Esri
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
// ------------------------------------------------------------------------------------------------------------------ //
const ZIP_FILE_HEADER_SIGNATURE = "PK";
/**
 * Gets a Blob from a web site and casts it as a file using the supplied name.
 *
 * @param url Address of Blob
 * @param filename Name to use for file
 * @param authentication Credentials for the request
 * @returns Promise that will resolve with a File, undefined if the Blob is null, or an AGO-style JSON failure response
 */
function getBlobAsFile(url, filename, authentication, ignoreErrors = [], mimeType) {
    return new Promise((resolve, reject) => {
        // Get the blob from the URL
        getBlobCheckForError(url, authentication, ignoreErrors).then((blob) => (!blob ? resolve(null) : resolve(blobToFile(blob, filename, mimeType))), reject);
    });
}
/**
 * Gets a Blob from a web site and checks for a JSON error packet in the Blob.
 *
 * @param url Address of Blob
 * @param authentication Credentials for the request
 * @param ignoreErrors List of HTTP error codes that should be ignored
 * @returns Promise that will resolve with Blob or an AGO-REST JSON failure response
 */
function getBlobCheckForError(url, authentication, ignoreErrors = []) {
    return new Promise((resolve, reject) => {
        // Get the blob from the URL
        getBlob(url, authentication).then((blob) => {
            // Reclassify text/plain blobs as needed
            _fixTextBlobType(blob).then((adjustedBlob) => {
                if (adjustedBlob.type === "application/json") {
                    // Blob may be an error
                    // eslint-disable-next-line @typescript-eslint/no-floating-promises
                    blobToJson(adjustedBlob).then((json) => {
                        // Check for valid JSON with an error
                        if (json?.error) {
                            const code = json.error.code;
                            if (code !== undefined && ignoreErrors.indexOf(code) >= 0) {
                                resolve(null); // Error, but ignored
                            }
                            else {
                                reject(json); // Other error; fail with error
                            }
                        }
                        else {
                            resolve(adjustedBlob);
                        }
                    });
                }
                else {
                    resolve(adjustedBlob);
                }
            }, reject);
        }, reject);
    });
}
/**
 * Gets the data information of an AGO item in its JSON form.
 *
 * @param itemId Id of an item whose data information is sought
 * @param filename Name to use for file
 * @param authentication Credentials for the request to AGO
 * @returns Promise that will resolve with JSON, or an AGO-style JSON failure response
 */
function getItemDataAsJson(itemId, authentication) {
    return new Promise((resolve) => {
        getItemDataBlob(itemId, authentication).then((blob) => resolve(blobToJson(blob)), () => resolve(null));
    });
}
/**
 * Gets the data information of an AGO item in its raw (Blob) form.
 *
 * @param itemId Id of an item whose data information is sought
 * @param authentication Credentials for the request to AGO
 * @returns A promise that will resolve with the data Blob or null if the item doesn't have a data section
 */
function getItemDataBlob(itemId, authentication) {
    return new Promise((resolve) => {
        const url = getItemDataBlobUrl(itemId, authentication);
        getBlobCheckForError(url, authentication, [400, 500]).then((blob) => resolve(_fixTextBlobType(blob)), () => resolve(null));
    });
}
/**
 * Gets the URL to the data information of an AGO item in its raw (Blob) form.
 *
 * @param itemId Id of an item whose data information is sought
 * @param authentication Credentials for the request to AGO
 * @returns URL string
 */
function getItemDataBlobUrl(itemId, authentication) {
    return `${getPortalSharingUrlFromAuth(authentication)}/content/items/${itemId}/data`;
}
/**
 * Gets a JSON from a web site.
 *
 * @param url Address of JSON
 * @param authentication Credentials for the request
 * @returns Promise that will resolve with JSON
 */
function getJson(url, authentication) {
    // Get the blob from the URL
    const requestOptions = { httpMethod: "GET" };
    return getBlob(url, authentication, requestOptions)
        .then((blob) => {
        // Reclassify text/plain blobs as needed
        return _fixTextBlobType(blob);
    })
        .then((adjustedBlob) => {
        if (adjustedBlob.type === "application/json") {
            // Blob may be an error
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            return blobToJson(adjustedBlob);
        }
        else {
            return Promise.resolve(null);
        }
    });
}
/**
 * Extracts the portal sharing url from a supplied authentication.
 *
 * @param authentication Credentials for the request to AGO
 * @returns Portal sharing url to be used in API requests, defaulting to `https://www.arcgis.com/sharing/rest`
 */
function getPortalSharingUrlFromAuth(authentication) {
    // If auth was passed, use that portal
    return getProp(authentication, "portal") || "https://www.arcgis.com/sharing/rest";
}
function getThumbnailFile(url, filename, authentication) {
    return new Promise((resolve) => {
        getBlobAsFile(url, filename, authentication, [500]).then(resolve, () => resolve(null));
    });
}
// ------------------------------------------------------------------------------------------------------------------ //
/**
 * Fixes the types of Blobs incorrectly typed as text/plain.
 *
 * @param blob Blob to check
 * @returns Promise resolving to original Blob, unless it's originally typed as text/plain but is
 * really JSON, ZIP, or XML
 * @private
 */
function _fixTextBlobType(blob) {
    return new Promise((resolve, reject) => {
        if (blob && blob.size > 0 && (blob.type.startsWith("text/plain") || blob.type.startsWith("application/json"))) {
            blobToText(blob).then((blobText) => {
                // Convertible to JSON?
                try {
                    JSON.parse(blobText);
                    // Yes; reclassify as JSON
                    resolve(new Blob([blob], { type: "application/json" }));
                }
                catch (ignored) {
                    // Nope; test for ZIP file
                    if (blobText.length > 4 && blobText.substr(0, 4) === ZIP_FILE_HEADER_SIGNATURE) {
                        // Yes; reclassify as ZIP
                        resolve(new Blob([blob], { type: "application/zip" }));
                    }
                    else if (blobText.startsWith("<")) {
                        // Reclassify as XML; since the blob started out as text/plain, it's more likely that is
                        // meant to be human-readable, so we'll use text/xml instead of application/xml
                        resolve(new Blob([blob], { type: "text/xml" }));
                    }
                    else {
                        // Leave as text
                        resolve(blob);
                    }
                }
            }, 
            // Faulty blob
            reject);
        }
        else {
            // Empty or not typed as plain text, so simply return
            if (blob) {
                resolve(blob);
            }
            else {
                reject();
            }
        }
    });
}

export { ArcGISAuthError as A, NODEJS_DEFAULT_REFERER_HEADER as N, __assign as _, getProp as a, getPropWithDefault as b, cleanUrl as c, blobToFile as d, encodeQueryString as e, checkUrlPathTermination as f, getJson as g, getThumbnailFile as h, getItemDataAsJson as i, setProp as j, request as r, setCreateProp as s };
