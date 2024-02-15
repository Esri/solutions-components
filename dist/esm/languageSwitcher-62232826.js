/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { l as loadModules } from './loadModules-b677d6d7.js';

async function fetchResourceData(request, resource) {
  var _a, _b, _c;
  try {
    const token = (_c = (_b = (_a = resource === null || resource === void 0 ? void 0 : resource.portalItem) === null || _a === void 0 ? void 0 : _a.portal) === null || _b === void 0 ? void 0 : _b['credential']) === null || _c === void 0 ? void 0 : _c['token'];
    const reqConfig = { responseType: 'json' };
    if (token)
      reqConfig.query = { token };
    var cacheBuster = 'cacheBuster=' + Date.now();
    const url = `${resource.url}?${cacheBuster}`;
    const reqRes = await request(url, reqConfig);
    const t9nData = reqRes.data;
    return Promise.resolve(t9nData);
  }
  catch (err) {
    console.error('Unable to get resource t9n data.');
  }
}
async function getPortalItemResource(portalItem) {
  if (!portalItem)
    return null;
  const [PortalItemResource] = await loadModules(['esri/portal/PortalItemResource']);
  const existingResourcesRes = await portalItem.fetchResources();
  const path = `t9n/${portalItem === null || portalItem === void 0 ? void 0 : portalItem.id}.json`;
  const resource = new PortalItemResource({ path, portalItem });
  const existingResourceArr = existingResourcesRes.resources.filter(resourceItem => resourceItem.resource.path === path);
  if (existingResourceArr.length === 0) {
    const type = 'application/json';
    const content = new Blob([JSON.stringify({})], { type });
    try {
      await portalItem.addResource(resource, content);
      const existingResourcesRes = await portalItem.fetchResources();
      const path = `t9n/${portalItem === null || portalItem === void 0 ? void 0 : portalItem.id}.json`;
      const existingResourceArr = existingResourcesRes.resources.filter(resourceItem => resourceItem.resource.path === path);
      const existingResource = existingResourceArr[0].resource;
      return Promise.resolve(existingResource);
    }
    catch (err) {
      console.error('ERROR: ', err);
      return Promise.reject(null);
    }
  }
  else {
    const existingResource = existingResourceArr[0].resource;
    return Promise.resolve(existingResource);
  }
}

export { fetchResourceData as f, getPortalItemResource as g };
