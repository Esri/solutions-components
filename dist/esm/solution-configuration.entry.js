/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, h, H as Host, g as getElement } from './index-c246d90e.js';
import { r as request, N as NODEJS_DEFAULT_REFERER_HEADER, c as cleanUrl, e as encodeQueryString, A as ArcGISAuthError, g as getProp, s as state } from './solution-store-e7ab55c3.js';
import { g as getLocaleComponentStrings } from './locale-78c0a2c5.js';
import './index-ac7f66eb.js';
import './interfaces-3b23a5f9.js';
import './_commonjsHelpers-8fd39c50.js';

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
//--------------------------------------------------------------------------
//
//  Public Functions
//
//--------------------------------------------------------------------------
/**
 * Sort the solution items
 *
 * @param templates a list of item templates from the solution
 *
 * @returns a sorted list of solution items
 */
function getInventoryItems(templates) {
  const hierarchy = getItemHierarchy(templates);
  const ids = hierarchy.reduce((prev, cur) => {
    prev.push(cur.id);
    return prev;
  }, []);
  return templates.reduce((prev, cur) => {
    if (ids.indexOf(cur.itemId) > -1) {
      const hierarchyItems = hierarchy.filter(hi => hi.id === cur.itemId);
      prev.push(_getItemFromTemplate(cur, templates, hierarchyItems[0].dependencies));
    }
    return prev;
  }, []);
}
/**
 * Create item hierarchy that will avoid issues from cylical dependencies
 *
 * @param templates a list of item templates from the solution
 *
 * @returns a hierarchy for item and item dependency display
 */
function getItemHierarchy(templates) {
  const hierarchy = [];
  // Get the template specified by id out of a list of templates
  function getTemplateInSolution(templates, id) {
    const iTemplate = templates.findIndex((template) => id === template.itemId);
    return iTemplate >= 0 ? templates[iTemplate] : null;
  }
  // Hierarchically list the dependencies of specified node
  function traceItemId(id, accumulatedHierarchy, alreadyVisitedIds = []) {
    // Get the dependencies of the node
    const template = getTemplateInSolution(templates, id);
    /* istanbul ignore else */
    if (template) {
      const templateEntry = {
        id,
        dependencies: []
      };
      // Visit each dependency, but only if this template is not in the alreadyVisitedIds list to avoid infinite loops
      /* istanbul ignore else */
      if (alreadyVisitedIds.indexOf(id) < 0) {
        // Add dependency to alreadyVisitedIds list
        alreadyVisitedIds.push(id);
        template.dependencies.forEach((dependencyId) => {
          // Remove dependency from list of templates to visit in the top-level loop
          const iDependencyTemplate = templateItemIds.indexOf(dependencyId);
          /* istanbul ignore else */
          if (iDependencyTemplate >= 0) {
            templateItemIds.splice(iDependencyTemplate, 1);
          }
          traceItemId(dependencyId, templateEntry.dependencies, alreadyVisitedIds);
        });
      }
      accumulatedHierarchy.push(templateEntry);
    }
  }
  // Start with top-level nodes and add in the rest of the nodes to catch cycles without top-level nodes
  let templateItemIds = _getTopLevelItemIds(templates);
  const otherItems = templates
    .filter((template) => templateItemIds.indexOf(template.itemId) < 0) // only keep non-top-level nodes
    .sort((a, b) => b.dependencies.length - a.dependencies.length); // sort so that nodes with more dependencies come first--reduces stubs
  templateItemIds = templateItemIds.concat(otherItems.map((template) => template.itemId));
  // Step through the list of nodes; we'll also remove nodes as we visit them
  let itemId = templateItemIds.shift();
  while (typeof itemId !== "undefined") {
    traceItemId(itemId, hierarchy);
    itemId = templateItemIds.shift();
  }
  return hierarchy;
}
/**
 * Explore the solution item templates for variables we will allow users to insert at runtime
 *
 * @param templates a list of item templates from the solution
 * @param translations nls translation object
 *
 * @returns a list of variables from the solution item templates
 */
function getSolutionVariables(templates, translations) {
  const vars = [];
  templates.forEach(t => {
    const item = {
      id: t.itemId,
      title: t.item.title || t.item.name,
      type: t.type,
      value: undefined,
      dependencies: [{
          id: t.itemId,
          title: translations.itemId,
          value: `{{${t.itemId}.itemId}}`,
        }]
    };
    if (t.item.url) {
      item.dependencies.push({
        id: t.itemId,
        title: translations.url,
        value: `{{${t.itemId}.url}}`,
      });
    }
    if (t.type === "Feature Service") {
      // TODO need to set source service name var...
      // TODO need to set soure service shape field name "{{d05b3cf1ffcb4a4fa677627dfb18609e.name}}.Shape"
      item.dependencies.push({
        id: t.itemId,
        title: translations.solutionExtent,
        value: `{{${t.itemId}.solutionExtent}}`,
      });
      _addLayersOrTables(t.properties.layers || [], item, t, translations);
      _addLayersOrTables(t.properties.tables || [], item, t, translations);
    }
    vars.push(item);
  });
  return vars;
}
/**
 * Set key organization variables we will allow users to insert at runtime
 *
 * @param translations nls translation object
 *
 * @returns a list of variables for the organization
 */
function getOrganizationVariables(translations) {
  const orgVars = [{
      id: "",
      title: translations.geocodeUrl,
      value: "{{organization.helperServices.geocode:getDefaultLocatorURL}}"
    }, {
      id: "",
      title: translations.geometryUrl,
      value: "{{organization.helperServices.geometry.url}}"
    }, {
      id: "",
      title: translations.portalBaseUrl,
      value: "{{portalBaseUrl}}"
    }, {
      id: "",
      title: translations.routeUrl,
      value: "{{organization.helperServices.route.url}}"
    }, {
      id: "",
      title: translations.solutionItemExtent,
      value: "{{solutionItemExtent}}"
    }];
  return orgVars;
}
//--------------------------------------------------------------------------
//
//  Private Functions
//
//--------------------------------------------------------------------------
/**
 * Explore a solution item template for variables we will allow users to insert at runtime.
 * This function will update the item argument that is passed in with the var details.
 *
 * @param children a list of layers or tables from a template
 * @param item an object that store key details for a given variable
 * @param template one of the templates from the current solution
 * @param translations nls translations object
 *
 */
function _addLayersOrTables(children, item, template, translations) {
  children.forEach(l => {
    const name = l.name && l.name.indexOf("||") > -1 ? l.name.split("||")[1].replace("}}", "").trim() : l.name;
    item.dependencies.push({
      id: template.itemId,
      title: `${name} (${translations.id})`,
      value: `{{${template.itemId}.layer${l.id}.id}}`,
    });
    item.dependencies.push({
      id: template.itemId,
      title: `${name} (${translations.name})`,
      value: `{{${template.itemId}.layer${l.id}.name||${name}}}`,
    });
  });
}
/**
 * Capture key details from the solution item template
 *
 * @param template one of the templates from the current solution
 * @param templates full list of templates
 * @param dependencies list of hierarchical dependencies
 *
 * @returns an IInventoryItem that is used by other components to work with this template
 */
function _getItemFromTemplate(template, templates, dependencies) {
  return {
    id: template.itemId || "",
    title: template.item.title || "",
    dependencies: _getDependencies(dependencies, templates),
    type: template.item.type || "",
    typeKeywords: template.item.typeKeywords || [] /*,
    solutionItem: {
      itemId: template.itemId,
      itemDetails: _getItemDetails(template.item, template.type === "Group"),
      isResource: _getIsResource(template),
      data: template.data,
      properties: template.properties,
      type: template.type,
      groupDetails: _getGroupDetails(template, templates)
    }*/
  };
}
/**
 * Capture key details from the solution item template
 *
 * @param dependencies list of dependencies from a template
 * @param templates full list of templates
 *
 * @returns a list of IInventoryItem that are used by other components to work with the templates
 */
function _getDependencies(dependencies, templates) {
  const dependencyItems = [];
  const depIds = dependencies.reduce((prev, cur) => {
    prev.push(cur.id);
    dependencyItems.push(cur);
    return prev;
  }, []);
  return templates.reduce((prev, curr) => {
    const i = depIds.indexOf(curr.itemId);
    if (i > -1) {
      prev.push(_getItemFromTemplate(curr, templates, dependencyItems[i].dependencies));
    }
    return prev;
  }, []);
}
/**
 * Capture the key item details for a given template
 *
 * @param item the templates item
 * @param isGroup boolean to indicate if the item is a group
 * @param itemId the item id of the template
 *
 * @returns a IItemDetails object for the current item
 */
/*
function _getItemDetails(
  item: any,
  isGroup: boolean
): IItemDetails {
  return {
    title: item.title || "",
    snippet: item.snippet || "",
    description: item.description || "",
    tags: item.tags || [],
    accessInformation: !isGroup ? item.accessInformation || "" : "",
    licenseInfo: !isGroup ? item.licenseInfo || "" : ""
  };
}
*/
/**
 * Capture the key item details for a given group template
 *
 * @param template one of the templates from the current solution
 * @param templates full list of templates
 *
 * @returns a list of IItemShare objects
 */
/*
function _getGroupDetails(
  template: any,
  templates: any[]
): IItemShare[] {
  return template.type === "Group" ? templates.reduce((prev, cur) => {
    if (cur.itemId !== template.itemId && cur.type !== "Group") {
      prev.push({
        id: cur.itemId,
        title: cur.item.name || cur.item.title,
        isShared: (cur.groups || []).indexOf(template.itemId) > -1,
        shareItem: (cur.groups || []).indexOf(template.itemId) > -1,
        type: cur.type,
        typeKeywords: cur.item.typeKeywords
      });
    }
    return prev;
  }, []) : [];
}
*/
/**
 * Used to understand if we are dealing with a binary object that will support upload/download
 *
 * @param template one of the templates from the current solution
 *
 * @returns true if this item supports upload/download
 */
/*
function _getIsResource(
  template: any
): boolean {
  return template.type !== "Group" && template.resources.some(r => r.indexOf("_info_thumbnail") < 0) &&
    (template.data === null || JSON.stringify(template.data) === "{}");
}
*/
/**
 * Sort the template ids based on their dependencies
 *
 * @param templates full list of templates
 *
 * @returns a list of Itop level item ids
 */
function _getTopLevelItemIds(templates) {
  // Find the top-level nodes. Start with all nodes, then remove those that other nodes depend on
  const topLevelItemCandidateIds = templates.map((template) => template.itemId);
  templates.forEach((template) => {
    (template.dependencies || []).forEach((dependencyId) => {
      const iNode = topLevelItemCandidateIds.indexOf(dependencyId);
      if (iNode >= 0) {
        // Node is somebody's dependency, so remove the node from the list of top-level nodes
        // If iNode == -1, then it's a shared dependency and it has already been removed
        topLevelItemCandidateIds.splice(iNode, 1);
      }
    });
  });
  return topLevelItemCandidateIds;
}

/* Copyright (c) 2017-2020 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
function decodeParam(param) {
    var _a = param.split("="), key = _a[0], value = _a[1];
    return { key: decodeURIComponent(key), value: decodeURIComponent(value) };
}
/**
 * Decodes the passed query string as an object.
 *
 * @param query A string to be decoded.
 * @returns A decoded query param object.
 */
function decodeQueryString(query) {
    return query
        .replace(/^#/, "")
        .split("&")
        .reduce(function (acc, entry) {
        var _a = decodeParam(entry), key = _a.key, value = _a.value;
        acc[key] = value;
        return acc;
    }, {});
}

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
function fetchToken(url, requestOptions) {
    var options = requestOptions;
    // we generate a response, so we can't return the raw response
    options.rawResponse = false;
    return request(url, options).then(function (response) {
        var r = {
            token: response.access_token,
            username: response.username,
            expires: new Date(
            // convert seconds in response to milliseconds and add the value to the current time to calculate a static expiration timestamp
            Date.now() + (response.expires_in * 1000 - 1000)),
            ssl: response.ssl === true
        };
        if (response.refresh_token) {
            r.refreshToken = response.refresh_token;
        }
        return r;
    });
}

/* Copyright (c) 2017-2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
function generateToken(url, requestOptions) {
    var options = requestOptions;
    /* istanbul ignore else */
    if (typeof window !== "undefined" &&
        window.location &&
        window.location.host) {
        options.params.referer = window.location.host;
    }
    else {
        options.params.referer = NODEJS_DEFAULT_REFERER_HEADER;
    }
    return request(url, options);
}

/**
 * Used to test if a URL is an ArcGIS Online URL
 */
var arcgisOnlineUrlRegex = /^https?:\/\/(\S+)\.arcgis\.com.+/;
function isOnline(url) {
    return arcgisOnlineUrlRegex.test(url);
}
function normalizeOnlinePortalUrl(portalUrl) {
    if (!arcgisOnlineUrlRegex.test(portalUrl)) {
        return portalUrl;
    }
    switch (getOnlineEnvironment(portalUrl)) {
        case "dev":
            return "https://devext.arcgis.com/sharing/rest";
        case "qa":
            return "https://qaext.arcgis.com/sharing/rest";
        default:
            return "https://www.arcgis.com/sharing/rest";
    }
}
function getOnlineEnvironment(url) {
    if (!arcgisOnlineUrlRegex.test(url)) {
        return null;
    }
    var match = url.match(arcgisOnlineUrlRegex);
    var subdomain = match[1].split(".").pop();
    if (subdomain.includes("dev")) {
        return "dev";
    }
    if (subdomain.includes("qa")) {
        return "qa";
    }
    return "production";
}
function isFederated(owningSystemUrl, portalUrl) {
    var normalizedPortalUrl = cleanUrl(normalizeOnlinePortalUrl(portalUrl)).replace(/https?:\/\//, "");
    var normalizedOwningSystemUrl = cleanUrl(owningSystemUrl).replace(/https?:\/\//, "");
    return new RegExp(normalizedOwningSystemUrl, "i").test(normalizedPortalUrl);
}
function canUseOnlineToken(portalUrl, requestUrl) {
    var portalIsOnline = isOnline(portalUrl);
    var requestIsOnline = isOnline(requestUrl);
    var portalEnv = getOnlineEnvironment(portalUrl);
    var requestEnv = getOnlineEnvironment(requestUrl);
    if (portalIsOnline && requestIsOnline && portalEnv === requestEnv) {
        return true;
    }
    return false;
}

/* Copyright (c) 2018-2020 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Validates that the user has access to the application
 * and if they user should be presented a "View Only" mode
 *
 * This is only needed/valid for Esri applications that are "licensed"
 * and shipped in ArcGIS Online or ArcGIS Enterprise. Most custom applications
 * should not need or use this.
 *
 * ```js
 * import { validateAppAccess } from '@esri/arcgis-rest-auth';
 *
 * return validateAppAccess('your-token', 'theClientId')
 * .then((result) => {
 *    if (!result.value) {
 *      // redirect or show some other ui
 *    } else {
 *      if (result.viewOnlyUserTypeApp) {
 *        // use this to inform your app to show a "View Only" mode
 *      }
 *    }
 * })
 * .catch((err) => {
 *  // two possible errors
 *  // invalid clientId: {"error":{"code":400,"messageCode":"GWM_0007","message":"Invalid request","details":[]}}
 *  // invalid token: {"error":{"code":498,"message":"Invalid token.","details":[]}}
 * })
 * ```
 *
 * Note: This is only usable by Esri applications hosted on *arcgis.com, *esri.com or within
 * an ArcGIS Enterprise installation. Custom applications can not use this.
 *
 * @param token platform token
 * @param clientId application client id
 * @param portal Optional
 */
function validateAppAccess(token, clientId, portal) {
    if (portal === void 0) { portal = "https://www.arcgis.com/sharing/rest"; }
    var url = portal + "/oauth2/validateAppAccess";
    var ro = {
        method: "POST",
        params: {
            f: "json",
            client_id: clientId,
            token: token,
        },
    };
    return request(url, ro);
}

/* Copyright (c) 2017-2019 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
function defer() {
    var deferred = {
        promise: null,
        resolve: null,
        reject: null,
    };
    deferred.promise = new Promise(function (resolve, reject) {
        deferred.resolve = resolve;
        deferred.reject = reject;
    });
    return deferred;
}
/**
 * ```js
 * import { UserSession } from '@esri/arcgis-rest-auth';
 * UserSession.beginOAuth2({
 *   // register an app of your own to create a unique clientId
 *   clientId: "abc123",
 *   redirectUri: 'https://yourapp.com/authenticate.html'
 * })
 *   .then(session)
 * // or
 * new UserSession({
 *   username: "jsmith",
 *   password: "123456"
 * })
 * // or
 * UserSession.deserialize(cache)
 * ```
 * Used to authenticate both ArcGIS Online and ArcGIS Enterprise users. `UserSession` includes helper methods for [OAuth 2.0](/arcgis-rest-js/guides/browser-authentication/) in both browser and server applications.
 */
var UserSession = /** @class */ (function () {
    function UserSession(options) {
        this.clientId = options.clientId;
        this._refreshToken = options.refreshToken;
        this._refreshTokenExpires = options.refreshTokenExpires;
        this.username = options.username;
        this.password = options.password;
        this._token = options.token;
        this._tokenExpires = options.tokenExpires;
        this.portal = options.portal
            ? cleanUrl(options.portal)
            : "https://www.arcgis.com/sharing/rest";
        this.ssl = options.ssl;
        this.provider = options.provider || "arcgis";
        this.tokenDuration = options.tokenDuration || 20160;
        this.redirectUri = options.redirectUri;
        this.refreshTokenTTL = options.refreshTokenTTL || 20160;
        this.server = options.server;
        this.federatedServers = {};
        this.trustedDomains = [];
        // if a non-federated server was passed explicitly, it should be trusted.
        if (options.server) {
            // if the url includes more than '/arcgis/', trim the rest
            var root = this.getServerRootUrl(options.server);
            this.federatedServers[root] = {
                token: options.token,
                expires: options.tokenExpires,
            };
        }
        this._pendingTokenRequests = {};
    }
    Object.defineProperty(UserSession.prototype, "token", {
        /**
         * The current ArcGIS Online or ArcGIS Enterprise `token`.
         */
        get: function () {
            return this._token;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserSession.prototype, "tokenExpires", {
        /**
         * The expiration time of the current `token`.
         */
        get: function () {
            return this._tokenExpires;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserSession.prototype, "refreshToken", {
        /**
         * The current token to ArcGIS Online or ArcGIS Enterprise.
         */
        get: function () {
            return this._refreshToken;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserSession.prototype, "refreshTokenExpires", {
        /**
         * The expiration time of the current `refreshToken`.
         */
        get: function () {
            return this._refreshTokenExpires;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserSession.prototype, "trustedServers", {
        /**
         * Deprecated, use `federatedServers` instead.
         *
         * @deprecated
         */
        get: function () {
            console.log("DEPRECATED: use federatedServers instead");
            return this.federatedServers;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Begins a new browser-based OAuth 2.0 sign in. If `options.popup` is `true` the
     * authentication window will open in a new tab/window and the function will return
     * Promise&lt;UserSession&gt;. Otherwise, the user will be redirected to the
     * authorization page in their current tab/window and the function will return `undefined`.
     *
     * @browserOnly
     */
    /* istanbul ignore next */
    UserSession.beginOAuth2 = function (options, win) {
        if (win === void 0) { win = window; }
        if (options.duration) {
            console.log("DEPRECATED: 'duration' is deprecated - use 'expiration' instead");
        }
        var _a = __assign({
            portal: "https://www.arcgis.com/sharing/rest",
            provider: "arcgis",
            expiration: 20160,
            popup: true,
            popupWindowFeatures: "height=400,width=600,menubar=no,location=yes,resizable=yes,scrollbars=yes,status=yes",
            state: options.clientId,
            locale: "",
        }, options), portal = _a.portal, provider = _a.provider, clientId = _a.clientId, expiration = _a.expiration, redirectUri = _a.redirectUri, popup = _a.popup, popupWindowFeatures = _a.popupWindowFeatures, state = _a.state, locale = _a.locale, params = _a.params;
        var url;
        if (provider === "arcgis") {
            url = portal + "/oauth2/authorize?client_id=" + clientId + "&response_type=token&expiration=" + (options.duration || expiration) + "&redirect_uri=" + encodeURIComponent(redirectUri) + "&state=" + state + "&locale=" + locale;
        }
        else {
            url = portal + "/oauth2/social/authorize?client_id=" + clientId + "&socialLoginProviderName=" + provider + "&autoAccountCreateForSocial=true&response_type=token&expiration=" + (options.duration || expiration) + "&redirect_uri=" + encodeURIComponent(redirectUri) + "&state=" + state + "&locale=" + locale;
        }
        // append additional params
        if (params) {
            url = url + "&" + encodeQueryString(params);
        }
        if (!popup) {
            win.location.href = url;
            return undefined;
        }
        var session = defer();
        win["__ESRI_REST_AUTH_HANDLER_" + clientId] = function (errorString, oauthInfoString) {
            if (errorString) {
                var error = JSON.parse(errorString);
                session.reject(new ArcGISAuthError(error.errorMessage, error.error));
                return;
            }
            if (oauthInfoString) {
                var oauthInfo = JSON.parse(oauthInfoString);
                session.resolve(new UserSession({
                    clientId: clientId,
                    portal: portal,
                    ssl: oauthInfo.ssl,
                    token: oauthInfo.token,
                    tokenExpires: new Date(oauthInfo.expires),
                    username: oauthInfo.username,
                }));
            }
        };
        win.open(url, "oauth-window", popupWindowFeatures);
        return session.promise;
    };
    /**
     * Completes a browser-based OAuth 2.0 sign in. If `options.popup` is `true` the user
     * will be returned to the previous window. Otherwise a new `UserSession`
     * will be returned. You must pass the same values for `options.popup` and
     * `options.portal` as you used in `beginOAuth2()`.
     *
     * @browserOnly
     */
    /* istanbul ignore next */
    UserSession.completeOAuth2 = function (options, win) {
        if (win === void 0) { win = window; }
        var _a = __assign({ portal: "https://www.arcgis.com/sharing/rest", popup: true }, options), portal = _a.portal, clientId = _a.clientId, popup = _a.popup;
        function completeSignIn(error, oauthInfo) {
            try {
                var handlerFn = void 0;
                var handlerFnName = "__ESRI_REST_AUTH_HANDLER_" + clientId;
                if (popup) {
                    // Guard b/c IE does not support window.opener
                    if (win.opener) {
                        if (win.opener.parent && win.opener.parent[handlerFnName]) {
                            handlerFn = win.opener.parent[handlerFnName];
                        }
                        else if (win.opener && win.opener[handlerFnName]) {
                            // support pop-out oauth from within an iframe
                            handlerFn = win.opener[handlerFnName];
                        }
                    }
                    else {
                        // IE
                        if (win !== win.parent && win.parent && win.parent[handlerFnName]) {
                            handlerFn = win.parent[handlerFnName];
                        }
                    }
                    // if we have a handler fn, call it and close the window
                    if (handlerFn) {
                        handlerFn(error ? JSON.stringify(error) : undefined, JSON.stringify(oauthInfo));
                        win.close();
                        return undefined;
                    }
                }
            }
            catch (e) {
                throw new ArcGISAuthError("Unable to complete authentication. It's possible you specified popup based oAuth2 but no handler from \"beginOAuth2()\" present. This generally happens because the \"popup\" option differs between \"beginOAuth2()\" and \"completeOAuth2()\".");
            }
            if (error) {
                throw new ArcGISAuthError(error.errorMessage, error.error);
            }
            return new UserSession({
                clientId: clientId,
                portal: portal,
                ssl: oauthInfo.ssl,
                token: oauthInfo.token,
                tokenExpires: oauthInfo.expires,
                username: oauthInfo.username,
            });
        }
        var params = decodeQueryString(win.location.hash);
        if (!params.access_token) {
            var error = void 0;
            var errorMessage = "Unknown error";
            if (params.error) {
                error = params.error;
                errorMessage = params.error_description;
            }
            return completeSignIn({ error: error, errorMessage: errorMessage });
        }
        var token = params.access_token;
        var expires = new Date(Date.now() + parseInt(params.expires_in, 10) * 1000 - 60 * 1000);
        var username = params.username;
        var ssl = params.ssl === "true";
        return completeSignIn(undefined, {
            token: token,
            expires: expires,
            ssl: ssl,
            username: username,
        });
    };
    /**
     * Request session information from the parent application
     *
     * When an application is embedded into another application via an IFrame, the embedded app can
     * use `window.postMessage` to request credentials from the host application. This function wraps
     * that behavior.
     *
     * The ArcGIS API for Javascript has this built into the Identity Manager as of the 4.19 release.
     *
     * Note: The parent application will not respond if the embedded app's origin is not:
     * - the same origin as the parent or *.arcgis.com (JSAPI)
     * - in the list of valid child origins (REST-JS)
     *
     *
     * @param parentOrigin origin of the parent frame. Passed into the embedded application as `parentOrigin` query param
     * @browserOnly
     */
    UserSession.fromParent = function (parentOrigin, win) {
        /* istanbul ignore next: must pass in a mockwindow for tests so we can't cover the other branch */
        if (!win && window) {
            win = window;
        }
        // Declare handler outside of promise scope so we can detach it
        var handler;
        // return a promise that will resolve when the handler receives
        // session information from the correct origin
        return new Promise(function (resolve, reject) {
            // create an event handler that just wraps the parentMessageHandler
            handler = function (event) {
                // ensure we only listen to events from the parent
                if (event.source === win.parent && event.data) {
                    try {
                        return resolve(UserSession.parentMessageHandler(event));
                    }
                    catch (err) {
                        return reject(err);
                    }
                }
            };
            // add listener
            win.addEventListener("message", handler, false);
            win.parent.postMessage({ type: "arcgis:auth:requestCredential" }, parentOrigin);
        }).then(function (session) {
            win.removeEventListener("message", handler, false);
            return session;
        });
    };
    /**
     * Begins a new server-based OAuth 2.0 sign in. This will redirect the user to
     * the ArcGIS Online or ArcGIS Enterprise authorization page.
     *
     * @nodeOnly
     */
    UserSession.authorize = function (options, response) {
        if (options.duration) {
            console.log("DEPRECATED: 'duration' is deprecated - use 'expiration' instead");
        }
        var _a = __assign({ portal: "https://arcgis.com/sharing/rest", expiration: 20160 }, options), portal = _a.portal, clientId = _a.clientId, expiration = _a.expiration, redirectUri = _a.redirectUri;
        response.writeHead(301, {
            Location: portal + "/oauth2/authorize?client_id=" + clientId + "&expiration=" + (options.duration || expiration) + "&response_type=code&redirect_uri=" + encodeURIComponent(redirectUri),
        });
        response.end();
    };
    /**
     * Completes the server-based OAuth 2.0 sign in process by exchanging the `authorizationCode`
     * for a `access_token`.
     *
     * @nodeOnly
     */
    UserSession.exchangeAuthorizationCode = function (options, authorizationCode) {
        var _a = __assign({
            portal: "https://www.arcgis.com/sharing/rest",
            refreshTokenTTL: 20160,
        }, options), portal = _a.portal, clientId = _a.clientId, redirectUri = _a.redirectUri, refreshTokenTTL = _a.refreshTokenTTL;
        return fetchToken(portal + "/oauth2/token", {
            params: {
                grant_type: "authorization_code",
                client_id: clientId,
                redirect_uri: redirectUri,
                code: authorizationCode,
            },
        }).then(function (response) {
            return new UserSession({
                clientId: clientId,
                portal: portal,
                ssl: response.ssl,
                redirectUri: redirectUri,
                refreshToken: response.refreshToken,
                refreshTokenTTL: refreshTokenTTL,
                refreshTokenExpires: new Date(Date.now() + (refreshTokenTTL - 1) * 60 * 1000),
                token: response.token,
                tokenExpires: response.expires,
                username: response.username,
            });
        });
    };
    UserSession.deserialize = function (str) {
        var options = JSON.parse(str);
        return new UserSession({
            clientId: options.clientId,
            refreshToken: options.refreshToken,
            refreshTokenExpires: new Date(options.refreshTokenExpires),
            username: options.username,
            password: options.password,
            token: options.token,
            tokenExpires: new Date(options.tokenExpires),
            portal: options.portal,
            ssl: options.ssl,
            tokenDuration: options.tokenDuration,
            redirectUri: options.redirectUri,
            refreshTokenTTL: options.refreshTokenTTL,
        });
    };
    /**
     * Translates authentication from the format used in the [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/).
     *
     * ```js
     * UserSession.fromCredential({
     *   userId: "jsmith",
     *   token: "secret"
     * });
     * ```
     *
     * @returns UserSession
     */
    UserSession.fromCredential = function (credential) {
        // At ArcGIS Online 9.1, credentials no longer include the ssl and expires properties
        // Here, we provide default values for them to cover this condition
        var ssl = typeof credential.ssl !== "undefined" ? credential.ssl : true;
        var expires = credential.expires || Date.now() + 7200000; /* 2 hours */
        return new UserSession({
            portal: credential.server.includes("sharing/rest")
                ? credential.server
                : credential.server + "/sharing/rest",
            ssl: ssl,
            token: credential.token,
            username: credential.userId,
            tokenExpires: new Date(expires),
        });
    };
    /**
     * Handle the response from the parent
     * @param event DOM Event
     */
    UserSession.parentMessageHandler = function (event) {
        if (event.data.type === "arcgis:auth:credential") {
            return UserSession.fromCredential(event.data.credential);
        }
        if (event.data.type === "arcgis:auth:error") {
            var err = new Error(event.data.error.message);
            err.name = event.data.error.name;
            throw err;
        }
        else {
            throw new Error("Unknown message type.");
        }
    };
    /**
     * Returns authentication in a format useable in the [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/).
     *
     * ```js
     * esriId.registerToken(session.toCredential());
     * ```
     *
     * @returns ICredential
     */
    UserSession.prototype.toCredential = function () {
        return {
            expires: this.tokenExpires.getTime(),
            server: this.portal,
            ssl: this.ssl,
            token: this.token,
            userId: this.username,
        };
    };
    /**
     * Returns information about the currently logged in [user](https://developers.arcgis.com/rest/users-groups-and-items/user.htm). Subsequent calls will *not* result in additional web traffic.
     *
     * ```js
     * session.getUser()
     *   .then(response => {
     *     console.log(response.role); // "org_admin"
     *   })
     * ```
     *
     * @param requestOptions - Options for the request. NOTE: `rawResponse` is not supported by this operation.
     * @returns A Promise that will resolve with the data from the response.
     */
    UserSession.prototype.getUser = function (requestOptions) {
        var _this = this;
        if (this._pendingUserRequest) {
            return this._pendingUserRequest;
        }
        else if (this._user) {
            return Promise.resolve(this._user);
        }
        else {
            var url = this.portal + "/community/self";
            var options = __assign(__assign({ httpMethod: "GET", authentication: this }, requestOptions), { rawResponse: false });
            this._pendingUserRequest = request(url, options).then(function (response) {
                _this._user = response;
                _this._pendingUserRequest = null;
                return response;
            });
            return this._pendingUserRequest;
        }
    };
    /**
     * Returns information about the currently logged in user's [portal](https://developers.arcgis.com/rest/users-groups-and-items/portal-self.htm). Subsequent calls will *not* result in additional web traffic.
     *
     * ```js
     * session.getPortal()
     *   .then(response => {
     *     console.log(portal.name); // "City of ..."
     *   })
     * ```
     *
     * @param requestOptions - Options for the request. NOTE: `rawResponse` is not supported by this operation.
     * @returns A Promise that will resolve with the data from the response.
     */
    UserSession.prototype.getPortal = function (requestOptions) {
        var _this = this;
        if (this._pendingPortalRequest) {
            return this._pendingPortalRequest;
        }
        else if (this._portalInfo) {
            return Promise.resolve(this._portalInfo);
        }
        else {
            var url = this.portal + "/portals/self";
            var options = __assign(__assign({ httpMethod: "GET", authentication: this }, requestOptions), { rawResponse: false });
            this._pendingPortalRequest = request(url, options).then(function (response) {
                _this._portalInfo = response;
                _this._pendingPortalRequest = null;
                return response;
            });
            return this._pendingPortalRequest;
        }
    };
    /**
     * Returns the username for the currently logged in [user](https://developers.arcgis.com/rest/users-groups-and-items/user.htm). Subsequent calls will *not* result in additional web traffic. This is also used internally when a username is required for some requests but is not present in the options.
     *
     *    * ```js
     * session.getUsername()
     *   .then(response => {
     *     console.log(response); // "casey_jones"
     *   })
     * ```
     */
    UserSession.prototype.getUsername = function () {
        if (this.username) {
            return Promise.resolve(this.username);
        }
        else if (this._user) {
            return Promise.resolve(this._user.username);
        }
        else {
            return this.getUser().then(function (user) {
                return user.username;
            });
        }
    };
    /**
     * Gets an appropriate token for the given URL. If `portal` is ArcGIS Online and
     * the request is to an ArcGIS Online domain `token` will be used. If the request
     * is to the current `portal` the current `token` will also be used. However if
     * the request is to an unknown server we will validate the server with a request
     * to our current `portal`.
     */
    UserSession.prototype.getToken = function (url, requestOptions) {
        if (canUseOnlineToken(this.portal, url)) {
            return this.getFreshToken(requestOptions);
        }
        else if (new RegExp(this.portal, "i").test(url)) {
            return this.getFreshToken(requestOptions);
        }
        else {
            return this.getTokenForServer(url, requestOptions);
        }
    };
    /**
     * Get application access information for the current user
     * see `validateAppAccess` function for details
     *
     * @param clientId application client id
     */
    UserSession.prototype.validateAppAccess = function (clientId) {
        return this.getToken(this.portal).then(function (token) {
            return validateAppAccess(token, clientId);
        });
    };
    UserSession.prototype.toJSON = function () {
        return {
            clientId: this.clientId,
            refreshToken: this.refreshToken,
            refreshTokenExpires: this.refreshTokenExpires,
            username: this.username,
            password: this.password,
            token: this.token,
            tokenExpires: this.tokenExpires,
            portal: this.portal,
            ssl: this.ssl,
            tokenDuration: this.tokenDuration,
            redirectUri: this.redirectUri,
            refreshTokenTTL: this.refreshTokenTTL,
        };
    };
    UserSession.prototype.serialize = function () {
        return JSON.stringify(this);
    };
    /**
     * For a "Host" app that embeds other platform apps via iframes, after authenticating the user
     * and creating a UserSession, the app can then enable "post message" style authentication by calling
     * this method.
     *
     * Internally this adds an event listener on window for the `message` event
     *
     * @param validChildOrigins Array of origins that are allowed to request authentication from the host app
     */
    UserSession.prototype.enablePostMessageAuth = function (validChildOrigins, win) {
        /* istanbul ignore next: must pass in a mockwindow for tests so we can't cover the other branch */
        if (!win && window) {
            win = window;
        }
        this._hostHandler = this.createPostMessageHandler(validChildOrigins);
        win.addEventListener("message", this._hostHandler, false);
    };
    /**
     * For a "Host" app that has embedded other platform apps via iframes, when the host needs
     * to transition routes, it should call `UserSession.disablePostMessageAuth()` to remove
     * the event listener and prevent memory leaks
     */
    UserSession.prototype.disablePostMessageAuth = function (win) {
        /* istanbul ignore next: must pass in a mockwindow for tests so we can't cover the other branch */
        if (!win && window) {
            win = window;
        }
        win.removeEventListener("message", this._hostHandler, false);
    };
    /**
     * Manually refreshes the current `token` and `tokenExpires`.
     */
    UserSession.prototype.refreshSession = function (requestOptions) {
        // make sure subsequent calls to getUser() don't returned cached metadata
        this._user = null;
        if (this.username && this.password) {
            return this.refreshWithUsernameAndPassword(requestOptions);
        }
        if (this.clientId && this.refreshToken) {
            return this.refreshWithRefreshToken();
        }
        return Promise.reject(new ArcGISAuthError("Unable to refresh token."));
    };
    /**
     * Determines the root of the ArcGIS Server or Portal for a given URL.
     *
     * @param url the URl to determine the root url for.
     */
    UserSession.prototype.getServerRootUrl = function (url) {
        var root = cleanUrl(url).split(/\/rest(\/admin)?\/services(?:\/|#|\?|$)/)[0];
        var _a = root.match(/(https?:\/\/)(.+)/), protocol = _a[1], domainAndPath = _a[2];
        var _b = domainAndPath.split("/"), domain = _b[0], path = _b.slice(1);
        // only the domain is lowercased because in some cases an org id might be
        // in the path which cannot be lowercased.
        return "" + protocol + domain.toLowerCase() + "/" + path.join("/");
    };
    /**
     * Returns the proper [`credentials`] option for `fetch` for a given domain.
     * See [trusted server](https://enterprise.arcgis.com/en/portal/latest/administer/windows/configure-security.htm#ESRI_SECTION1_70CC159B3540440AB325BE5D89DBE94A).
     * Used internally by underlying request methods to add support for specific security considerations.
     *
     * @param url The url of the request
     * @returns "include" or "same-origin"
     */
    UserSession.prototype.getDomainCredentials = function (url) {
        if (!this.trustedDomains || !this.trustedDomains.length) {
            return "same-origin";
        }
        return this.trustedDomains.some(function (domainWithProtocol) {
            return url.startsWith(domainWithProtocol);
        })
            ? "include"
            : "same-origin";
    };
    /**
     * Return a function that closes over the validOrigins array and
     * can be used as an event handler for the `message` event
     *
     * @param validOrigins Array of valid origins
     */
    UserSession.prototype.createPostMessageHandler = function (validOrigins) {
        var _this = this;
        // return a function that closes over the validOrigins and
        // has access to the credential
        return function (event) {
            // Verify that the origin is valid
            // Note: do not use regex's here. validOrigins is an array so we're checking that the event's origin
            // is in the array via exact match. More info about avoiding postMessage xss issues here
            // https://jlajara.gitlab.io/web/2020/07/17/Dom_XSS_PostMessage_2.html#tipsbypasses-in-postmessage-vulnerabilities
            var isValidOrigin = validOrigins.indexOf(event.origin) > -1;
            // JSAPI handles this slightly differently - instead of checking a list, it will respond if
            // event.origin === window.location.origin || event.origin.endsWith('.arcgis.com')
            // For Hub, and to enable cross domain debugging with port's in urls, we are opting to
            // use a list of valid origins
            // Ensure the message type is something we want to handle
            var isValidType = event.data.type === "arcgis:auth:requestCredential";
            var isTokenValid = _this.tokenExpires.getTime() > Date.now();
            if (isValidOrigin && isValidType) {
                var msg = {};
                if (isTokenValid) {
                    var credential = _this.toCredential();
                    // arcgis:auth:error with {name: "", message: ""}
                    // the following line allows us to conform to our spec without changing other depended-on functionality
                    // https://github.com/Esri/arcgis-rest-js/blob/master/packages/arcgis-rest-auth/post-message-auth-spec.md#arcgisauthcredential
                    credential.server = credential.server.replace("/sharing/rest", "");
                    msg = { type: "arcgis:auth:credential", credential: credential };
                }
                else {
                    // Return an error
                    msg = {
                        type: "arcgis:auth:error",
                        error: {
                            name: "tokenExpiredError",
                            message: "Session token was expired, and not returned to the child application",
                        },
                    };
                }
                event.source.postMessage(msg, event.origin);
            }
        };
    };
    /**
     * Validates that a given URL is properly federated with our current `portal`.
     * Attempts to use the internal `federatedServers` cache first.
     */
    UserSession.prototype.getTokenForServer = function (url, requestOptions) {
        var _this = this;
        // requests to /rest/services/ and /rest/admin/services/ are both valid
        // Federated servers may have inconsistent casing, so lowerCase it
        var root = this.getServerRootUrl(url);
        var existingToken = this.federatedServers[root];
        if (existingToken &&
            existingToken.expires &&
            existingToken.expires.getTime() > Date.now()) {
            return Promise.resolve(existingToken.token);
        }
        if (this._pendingTokenRequests[root]) {
            return this._pendingTokenRequests[root];
        }
        this._pendingTokenRequests[root] = this.fetchAuthorizedDomains().then(function () {
            return request(root + "/rest/info", {
                credentials: _this.getDomainCredentials(url),
            })
                .then(function (response) {
                if (response.owningSystemUrl) {
                    /**
                     * if this server is not owned by this portal
                     * bail out with an error since we know we wont
                     * be able to generate a token
                     */
                    if (!isFederated(response.owningSystemUrl, _this.portal)) {
                        throw new ArcGISAuthError(url + " is not federated with " + _this.portal + ".", "NOT_FEDERATED");
                    }
                    else {
                        /**
                         * if the server is federated, use the relevant token endpoint.
                         */
                        return request(response.owningSystemUrl + "/sharing/rest/info", requestOptions);
                    }
                }
                else if (response.authInfo &&
                    _this.federatedServers[root] !== undefined) {
                    /**
                     * if its a stand-alone instance of ArcGIS Server that doesn't advertise
                     * federation, but the root server url is recognized, use its built in token endpoint.
                     */
                    return Promise.resolve({
                        authInfo: response.authInfo,
                    });
                }
                else {
                    throw new ArcGISAuthError(url + " is not federated with any portal and is not explicitly trusted.", "NOT_FEDERATED");
                }
            })
                .then(function (response) {
                return response.authInfo.tokenServicesUrl;
            })
                .then(function (tokenServicesUrl) {
                // an expired token cant be used to generate a new token
                if (_this.token && _this.tokenExpires.getTime() > Date.now()) {
                    return generateToken(tokenServicesUrl, {
                        params: {
                            token: _this.token,
                            serverUrl: url,
                            expiration: _this.tokenDuration,
                            client: "referer",
                        },
                    });
                    // generate an entirely fresh token if necessary
                }
                else {
                    return generateToken(tokenServicesUrl, {
                        params: {
                            username: _this.username,
                            password: _this.password,
                            expiration: _this.tokenDuration,
                            client: "referer",
                        },
                    }).then(function (response) {
                        _this._token = response.token;
                        _this._tokenExpires = new Date(response.expires);
                        return response;
                    });
                }
            })
                .then(function (response) {
                _this.federatedServers[root] = {
                    expires: new Date(response.expires),
                    token: response.token,
                };
                delete _this._pendingTokenRequests[root];
                return response.token;
            });
        });
        return this._pendingTokenRequests[root];
    };
    /**
     * Returns an unexpired token for the current `portal`.
     */
    UserSession.prototype.getFreshToken = function (requestOptions) {
        var _this = this;
        if (this.token && !this.tokenExpires) {
            return Promise.resolve(this.token);
        }
        if (this.token &&
            this.tokenExpires &&
            this.tokenExpires.getTime() > Date.now()) {
            return Promise.resolve(this.token);
        }
        if (!this._pendingTokenRequests[this.portal]) {
            this._pendingTokenRequests[this.portal] = this.refreshSession(requestOptions).then(function (session) {
                _this._pendingTokenRequests[_this.portal] = null;
                return session.token;
            });
        }
        return this._pendingTokenRequests[this.portal];
    };
    /**
     * Refreshes the current `token` and `tokenExpires` with `username` and
     * `password`.
     */
    UserSession.prototype.refreshWithUsernameAndPassword = function (requestOptions) {
        var _this = this;
        var options = __assign({ params: {
                username: this.username,
                password: this.password,
                expiration: this.tokenDuration,
            } }, requestOptions);
        return generateToken(this.portal + "/generateToken", options).then(function (response) {
            _this._token = response.token;
            _this._tokenExpires = new Date(response.expires);
            return _this;
        });
    };
    /**
     * Refreshes the current `token` and `tokenExpires` with `refreshToken`.
     */
    UserSession.prototype.refreshWithRefreshToken = function (requestOptions) {
        var _this = this;
        if (this.refreshToken &&
            this.refreshTokenExpires &&
            this.refreshTokenExpires.getTime() < Date.now()) {
            return this.refreshRefreshToken(requestOptions);
        }
        var options = __assign({ params: {
                client_id: this.clientId,
                refresh_token: this.refreshToken,
                grant_type: "refresh_token",
            } }, requestOptions);
        return fetchToken(this.portal + "/oauth2/token", options).then(function (response) {
            _this._token = response.token;
            _this._tokenExpires = response.expires;
            return _this;
        });
    };
    /**
     * Exchanges an unexpired `refreshToken` for a new one, also updates `token` and
     * `tokenExpires`.
     */
    UserSession.prototype.refreshRefreshToken = function (requestOptions) {
        var _this = this;
        var options = __assign({ params: {
                client_id: this.clientId,
                refresh_token: this.refreshToken,
                redirect_uri: this.redirectUri,
                grant_type: "exchange_refresh_token",
            } }, requestOptions);
        return fetchToken(this.portal + "/oauth2/token", options).then(function (response) {
            _this._token = response.token;
            _this._tokenExpires = response.expires;
            _this._refreshToken = response.refreshToken;
            _this._refreshTokenExpires = new Date(Date.now() + (_this.refreshTokenTTL - 1) * 60 * 1000);
            return _this;
        });
    };
    /**
     * ensures that the authorizedCrossOriginDomains are obtained from the portal and cached
     * so we can check them later.
     *
     * @returns this
     */
    UserSession.prototype.fetchAuthorizedDomains = function () {
        var _this = this;
        // if this token is for a specific server or we don't have a portal
        // don't get the portal info because we cant get the authorizedCrossOriginDomains
        if (this.server || !this.portal) {
            return Promise.resolve(this);
        }
        return this.getPortal().then(function (portalInfo) {
            /**
             * Specific domains can be configured as secure.esri.com or https://secure.esri.com this
             * normalizes to https://secure.esri.com so we can use startsWith later.
             */
            if (portalInfo.authorizedCrossOriginDomains &&
                portalInfo.authorizedCrossOriginDomains.length) {
                _this.trustedDomains = portalInfo.authorizedCrossOriginDomains
                    .filter(function (d) { return !d.startsWith("http://"); })
                    .map(function (d) {
                    if (d.startsWith("https://")) {
                        return d;
                    }
                    else {
                        return "https://" + d;
                    }
                });
            }
            return _this;
        });
    };
    return UserSession;
}());

const solutionConfigurationCss = ".configuration-container{position:relative;height:100%;width:100%}.configuration{position:absolute;top:0px;right:0px;bottom:0px;left:0px;display:flex;padding:0.5rem;border:1px #808080 solid}.config-tabs{width:100%}.config-tab{width:100%}.config-solution{position:absolute;top:3.5rem;right:-1px;bottom:-1px;left:-1px;display:flex;padding:0.5rem}.config-inventory{display:inline;max-width:-moz-min-content;max-width:min-content;flex-grow:0;overflow-y:auto}.config-inventory-hide{display:none;max-width:-moz-min-content;max-width:min-content;flex-grow:0;overflow-y:auto}.config-item{position:relative;display:inline;flex-grow:1;overflow-y:auto;-webkit-margin-start:0.5rem;margin-inline-start:0.5rem}solution-contents{position:relative;height:100%}solution-item{position:relative;height:100%}solution-spatial-ref{position:relative;height:100%;width:100%;overflow-y:auto}";

const SolutionConfiguration = class {
  async serializedAuthenticationWatchHandler() {
    this.authentication = this.serializedAuthentication ? UserSession.deserialize(this.serializedAuthentication) : new UserSession({});
  }
  async valueWatchHandler() {
    await this._loadSolution(this.solutionItemId);
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this._solutionStoreHasChanges = false;
    this._solutionEditorHasChanges = false;
    this._solutionEditorHasErrors = false;
    this._canSave = false;
    this.authentication = new UserSession({});
    this.serializedAuthentication = "";
    this.solutionItemId = "";
    this.showLoading = false;
    this._currentEditItemId = "";
    this._organizationVariables = "";
    this._solutionContentsComponent = undefined;
    this._solutionIsLoaded = false;
    this._solutionVariables = "";
    this._templateHierarchy = [];
    this._translations = undefined;
    this._treeOpen = true;
    if (this.serializedAuthentication) {
      this.authentication = UserSession.deserialize(this.serializedAuthentication);
    }
    void this._loadSolution(this.solutionItemId);
    window.addEventListener("solutionStoreHasChanges", (evt) => {
      this._updateSaveability(this._solutionStoreHasChanges = evt.detail, this._solutionEditorHasChanges, this._solutionEditorHasErrors);
    });
    window.addEventListener("solutionEditorHasChanges", (evt) => {
      this._updateSaveability(this._solutionStoreHasChanges, this._solutionEditorHasChanges = evt.detail, this._solutionEditorHasErrors);
    });
    window.addEventListener("solutionEditorHasErrors", (evt) => {
      this._updateSaveability(this._solutionStoreHasChanges, this._solutionEditorHasChanges, this._solutionEditorHasErrors = evt.detail);
    });
  }
  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   *
   * @returns Promise when complete
   */
  async componentWillLoad() {
    return this._getTranslations();
  }
  /**
   * Renders the component.
   */
  render() {
    const wkid = getProp(state.getStoreInfo("spatialReferenceInfo"), "spatialReference");
    const hasServices = state.getStoreInfo("featureServices").length > 0;
    const solutionData = state.getStoreInfo("solutionData");
    this._solutionVariables = JSON.stringify(getSolutionVariables(solutionData.templates, this._translations));
    this._organizationVariables = JSON.stringify(getOrganizationVariables(this._translations));
    return (h(Host, null, !this._solutionIsLoaded
      ? h("calcite-loader", { active: true, label: '' })
      : null, h("div", { class: "configuration-container" }, h("div", { class: "configuration" }, h("calcite-tabs", { class: "config-tabs" }, h("calcite-tab-nav", { slot: "tab-nav" }, h("calcite-tab-title", null, this._translations.definitionTab), hasServices ?
      h("calcite-tab-title", null, this._translations.spatialReferenceTab) :
      null), h("calcite-tab", { class: "config-tab", selected: true }, h("div", { class: "config-solution" }, h("div", { class: this._treeOpen ? "config-inventory" : "config-inventory-hide" }, h("solution-contents", { id: "configInventory", key: `${this.solutionItemId}-contents`, ref: (el) => (this._solutionContentsComponent = el) })), h("calcite-button", { appearance: "transparent", class: "collapse-btn", "icon-start": this._treeOpen ? "chevrons-left" : "chevrons-right", id: "collapse-vars", onClick: () => this._toggleTree(), scale: "s", title: this._treeOpen ? this._translations.collapse : this._translations.expand }), h("div", { class: "config-item" }, h("solution-item", { authentication: this.authentication, "item-id": this._currentEditItemId, key: `${this.solutionItemId}-item`, "organization-variables": this._organizationVariables, "solution-item-id": this.solutionItemId, "solution-variables": this._solutionVariables })))), hasServices
      ? h("calcite-tab", { class: "config-tab" }, h("div", { class: "config-solution" }, h("solution-spatial-ref", { defaultWkid: wkid, id: "configure-solution-spatial-ref", key: `${this.solutionItemId}-spatial-ref`, locked: !wkid, services: state.getStoreInfo("featureServices").map(fs => fs.name) })))
      : null)))));
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  _solutionItemSelected(event) {
    this._currentEditItemId = event.detail;
  }
  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  //
  //  Public Methods (async)
  //
  //--------------------------------------------------------------------------
  /*
  @Method()
  async getEditModels(): Promise<ISolutionItems> {
    return Promise.resolve(state.items);
  }
  */
  async getSpatialReferenceInfo() {
    return Promise.resolve(state.getStoreInfo("spatialReferenceInfo"));
  }
  /*
  @Method()
  async getSourceTemplates(): Promise<any> {
    return Promise.resolve(this._templates);
  }
  */
  async saveSolution() {
    this._solutionIsLoaded = false;
    await state.saveSolution();
    this._solutionIsLoaded = true;
    this.solutionItemId = null;
  }
  async unloadSolution() {
    this.solutionItemId = null;
  }
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  /**
   * Update the store with the initial values
   *
   * @param templates the solution items templates
   * @param isReset (defaults to false) indicates if we are resetting the controls after save
   */
  /*
  protected _initState(
    templates: any[],
    isReset = false
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      if (isReset) {
        // clear models and state so we can refresh after save
        this.modelsSet = false;
        state.reset();
      }
      getModels(templates, this.authentication, this.solutionItemId).then(models => {
        state.models = models;

        state.featureServices = getFeatureServices(templates);
        state.getStoreInfo("spatialReferenceInfo") = getSpatialReferenceInfo(state.featureServices, this._sourceItemData);

        if (isReset) {
          // reset for undo/redo stack and diff editor tracking
          const jsonEditors = Array.from(this.el.getElementsByTagName("json-editor"));
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          jsonEditors.forEach(e => void e.reset());
        }

        this.modelsSet = true;
        resolve(true);
      }, () => reject);
    });
  }
  */
  /**
   * Set Props with the initial values
   *
   * @protected
   */
  _initProps() {
    const solutionData = state.getStoreInfo("solutionData");
    this._templateHierarchy = [...getInventoryItems(solutionData.templates)];
    if (this._solutionContentsComponent) {
      this._solutionContentsComponent.templateHierarchy = this._templateHierarchy;
    }
    let firstItem;
    if (this._templateHierarchy.length > 0) {
      // Start with the first item in the contents
      firstItem = state.getItemInfo(this._templateHierarchy[0].id);
    }
    this._currentEditItemId = firstItem ? firstItem.itemId : "";
  }
  /**
   * Loads a solution.
   *
   * @param solutionItemId AGO id of solution to load
   *
   * @returns Resolved promise when task is done
   *
   * @protected
   */
  async _loadSolution(solutionItemId) {
    if (solutionItemId) {
      this._solutionIsLoaded = false;
      await state.loadSolution(solutionItemId, this.authentication);
      this._initProps();
      this._solutionIsLoaded = true;
    }
    else {
      this._reset();
    }
    return Promise.resolve();
  }
  /**
   * Resets internal variables.
   *
   * @protected
   */
  _reset() {
    this._currentEditItemId = "";
    this._organizationVariables = "";
    this._solutionVariables = "";
    this._templateHierarchy = [];
  }
  /**
   * Toggle _treeOpen prop to show/hide content tree.
   *
   * @protected
   */
  _toggleTree() {
    this._treeOpen = !this._treeOpen;
  }
  /**
   * Dispatches an event indicating if the configuration is saveable or not. It's not saveable if there are no
   * changes or if there's an error in the JSON editor.
   *
   * @param solutionStoreHasChanges Are there changes in the configuration editor's internal store?
   * @param solutionEditorHasChanges Are there changes in the configuration editor's JSON editor?
   * @param solutionEditorHasErrors Are there errors in the configuration editor's JSON editor?
   *
   * @protected
   */
  _updateSaveability(solutionStoreHasChanges, solutionEditorHasChanges, solutionEditorHasErrors) {
    const updateSaveability = (solutionStoreHasChanges || solutionEditorHasChanges) && !solutionEditorHasErrors;
    if (this._canSave !== updateSaveability) {
      window.dispatchEvent(new CustomEvent("solutionCanSave", {
        detail: updateSaveability,
        bubbles: true,
        cancelable: false,
        composed: true
      }));
    }
    this._canSave = updateSaveability;
  }
  /**
   * Save all edits from the current configuration
   *
   * @returns a response that will indicate success or failure and any associated messages
   */
  /*
  protected async _save() {
    const templateUpdates = await this._updateTemplates();
    const data = this._setSrInfo(templateUpdates.templates);
    return templateUpdates.errors.length === 0 ? save(
      this.solutionItemId,
      data,
      state.models,
      this.authentication,
      this._translations
    ).then(saveResult => {
      // need to trigger re-render...and re-fetch
      this._fetchData = true;
      this.modelsSet = false;
      return Promise.resolve(saveResult)
    }).catch(e => Promise.reject(e)) : Promise.reject({
      success: false,
      message: `The following templates have errors: ${templateUpdates.errors.join(", ")}`
    } as IResponse);
  }
  */
  /**
   * Update the solutions templates based on the stored changes
   *
   * @returns an object that contains the updated templates as well as any errors that were found
   */
  /*
  protected async _updateTemplates(): Promise<IUpdateTemplateResponse> {
    const errors = [];
    const models = await this.getEditModels();
    let templates = this._updateGroupDependencies(models, this._templates);
    Object.keys(models).forEach(k => {
      const m = models[k];
      templates = templates.map(t => {
        if (t.itemId === m.itemId) {
          this._setItem(t, m);
          const hasDataError = this._setData(t, m);
          const hasPropError = this._setProps(t, m);
          if (hasDataError || hasPropError) {
            errors.push(m.itemId);
          }
        }
        return t;
      });
    });
    errors.concat(window.monaco.editor.getModelMarkers({}));
    return Promise.resolve({
      templates,
      errors
    });
  }
  */
  /**
   * Review all models and store itemIds that should be added or removed from group dependencies
   *
   * @param models the corresponding models for the current templates
   *
   * @returns group info (an object with keys of groupIds and
   * arrays of itemIds that should be added or removed from group dependencies)
   */
  /*
  protected _getGroupInfo(
    models: any
  ): any {
    const groupInfo = {}
    Object.keys(models).forEach(k => {
      const m = models[k];
      if (m.shareInfo) {
        const groupId = m.shareInfo.groupId;
        const type = m.shareInfo.shared ? "share" : "unshare";
        if (groupInfo[groupId]) {
          groupInfo[groupId][type].push(m.itemId);
        } else {
          groupInfo[groupId] = {};
          groupInfo[groupId][type] = [m.itemId];
          if (m.shareInfo.shared) {
            groupInfo[groupId]["unshare"] = [];
          } else {
            groupInfo[groupId]["share"] = [];
          }
        }
      }
    });
    return groupInfo;
  }
  */
  /**
   * Updates group dependency arrays by adding or removing itemIds
   *
   * @param templates the current templates to update
   * @param models the corresponding models for the current templates
   *
   * @returns updated templates array
   */
  /*
  protected _updateGroupDependencies(
    models: any,
    templates: any[]
  ): any[] {
    const groupInfo = this._getGroupInfo(models);
    Object.keys(groupInfo).forEach(k => {
      templates.some(t => {
        if (t.itemId === k) {
          // add share items as deps
          groupInfo[k].share.forEach(s => {
            if (t.dependencies.indexOf(s) < 0) {
              t.dependencies.push(s);
            }
          });

          // remove unshare items from deps
          groupInfo[k].unshare.forEach(s => {
            const index = t.dependencies.indexOf(s);
            if (index > -1) {
              t.dependencies.splice(index, 1);
            }
          });
          return true;
        } else {
          return false;
        }
      })
    })
    return templates;
  }
  */
  /**
   * Add group IDs to items that should be shared
   * This function will update the provided template when shareInfo is available
   *
   * @param template the current template to update
   * @param shareInfo the corresponding shareInfo from the model for the current template
   *
   */
  /*
  protected _updateItemGroups(
    template: any,
    shareInfo: any
  ): void {
    if (shareInfo) {
      const groupIndex = template.groups.indexOf(shareInfo.groupId);
      if (groupIndex < 0 && shareInfo.shared) {
        template.groups.push(shareInfo.groupId);
      }
      if (groupIndex > -1 && !shareInfo.shared) {
        template.groups.splice(groupIndex, 1);
      }
    }
  }
  */
  /**
   * Set a templates data property with changes from the models
   *
   * @param template the current template to update
   * @param model the corresponding model for the current template (stores any user changes)
   *
   * @returns a boolean that indicates if any errors were detected
   */
  /*
  protected _setData(
    template: any,
    model: any
  ): boolean {
    return this._setTemplateProp(
      template,
      model.dataOriginalValue,
      model.dataCurrentValue,
      "data"
    );
  }
  */
  /**
   * Set a templates properties property with changes from the models
   *
   * @param template the current template to update
   * @param model the corresponding model for the current template (stores any user changes)
   *
   * @returns a boolean that indicates if any errors were detected
   */
  /*
  protected _setProps(
    template: any,
    model: any
  ): boolean {
    return this._setTemplateProp(
      template,
      model.propsOriginalValue,
      model.propsCurrentValue,
      "properties"
    );
  }
  */
  /**
   * Generic function used to set properties or data property on a given template
   *
   * @param template the current template to update
   * @param originValue the original value from the solution template
   * @param modelValue the current value from the model (will contain any edits that have been made)
   * @param path the path to the property we should update if any changes are found
   *
   * @returns a boolean that indicates if any errors were detected
   */
  /*
  protected _setTemplateProp(
    template: any,
    originValue: any,
    modelValue: any,
    path: string
  ): boolean {
    let hasError = false;
    try {
      const _originValue = JSON.parse(originValue);
      const _modelValue = JSON.parse(modelValue);

      if (_originValue && _modelValue && (JSON.stringify(_originValue) !== JSON.stringify(_modelValue))) {
        setProp(template, path, _modelValue);
      }
    } catch (e) {
      console.error(e);
      hasError = true;
    }
    return hasError;
  }
  */
  /**
   * Set a templates item property with changes from the models
   *
   * @param template the current template to update
   * @param model the corresponding model for the current template (stores any user changes)
   *
   * This function will update the template argument when edits are found
   */
  /*
  protected _setItem(
    template: any,
    model: any
  ): void {
    this._updateItemGroups(template, model.shareInfo);
    if (model.updateItemValues && Object.keys(model.updateItemValues).length > 0) {
      Object.keys(model.updateItemValues).forEach(k => {
        template.item[k] = model.updateItemValues[k];
      });
    }
  }
  */
  /**
   * Set spatial reference info in the solutions data
   *
   * @param templates a list of item templates from the solution
   *
   * @returns a cloned copy of the solutions data that has been updated with spatial reference info
   *
   */
  /*
  protected _setSrInfo(
    templates: any[]
  ): any {
    const srInfo: any = state.getStoreInfo("spatialReferenceInfo");

    const serviceEnabled = typeof srInfo?.services === "undefined" ?
      false : Object.keys(srInfo.services).some(k => srInfo.services[k]);

    const data = cloneObject(this._sourceItemData);
    data.templates = templates;
    if (srInfo && srInfo.enabled && serviceEnabled) {
      const wkid = srInfo.spatialReference.wkid.toString();

      const wkidParam = {
        "label": "Spatial Reference",
        "default": wkid,
        "valueType": "spatialReference",
        "attributes": {
          "required": "true"
        }
      };

      const params = getProp(data, "params");
      const hasWkid = params && params.wkid;
      setCreateProp(
        data,
        hasWkid ? "params.wkid.default" : "params.wkid",
        hasWkid ? wkid : params ? wkidParam : wkid
      );
    } else if (!srInfo.enabled) {
      if (getProp(data, "params.wkid")) {
        delete (data.params.wkid);
      }
    }
    return data;
  }
  */
  /**
   * Fetches the component's translations
   *
   * @protected
   */
  async _getTranslations() {
    const translations = await getLocaleComponentStrings(this.el);
    this._translations = translations[0];
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "serializedAuthentication": ["serializedAuthenticationWatchHandler"],
    "solutionItemId": ["valueWatchHandler"]
  }; }
};
SolutionConfiguration.style = solutionConfigurationCss;

export { SolutionConfiguration as solution_configuration };
