/** @license
 * Copyright 2021 Esri
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


export function saveEdits(
  srInfo: any,
  models: any
) {
  let hasChanges = false;
  let hasDataErrors = false;
  let hasPropsErrors = false;
  //const models = await demo.getEditModels();
  Object.keys(models).forEach(k => {
    const m = models[k];
    if (m.updateItemValues && Object.keys(m.updateItemValues).length > 0) {
      alert(`item: ${m.itemId} has item updates ${JSON.stringify(m.updateItemValues)}`)
    }

    // parse and stringify to avoid any formatting differences
    let dataOriginValue, dataModelValue;
    let propsOriginValue, propsModelValue;
    try {
      dataOriginValue = JSON.parse(m.dataOriginValue);
      dataModelValue = JSON.parse(m.dataModel.getValue());
    } catch (e) {
      alert(`${m.name} (${m.itemId}):  has errors in data`);
      hasDataErrors = true;
      console.error(e);
    }

    try {
      propsOriginValue = JSON.parse(m.propsOriginValue);
      propsModelValue = JSON.parse(m.propsModel.getValue());
    } catch (e) {
      alert(`${m.name} (${m.itemId}):  has errors in props`);
      hasPropsErrors = true;
      console.error(e);
    }

    if (dataOriginValue && dataModelValue && propsOriginValue && propsModelValue) {
      if (JSON.stringify(dataOriginValue) !== JSON.stringify(dataModelValue)) {
        alert(`${m.name} (${m.itemId}):  has data changes`);
        hasChanges = true;
      }
      if (JSON.stringify(propsOriginValue) !== JSON.stringify(propsModelValue)) {
        alert(`${m.name} (${m.itemId}):  has props changes`);
        hasChanges = true;
      }
    }

    //share info
    if (m.shareInfo) {
      alert(`${m.name || m.title} should be ${m.shareInfo.type}d with group: ${m.shareInfo.groupId}`)
    }

  });
  if (hasDataErrors || hasPropsErrors || (window.monaco.editor.getModelMarkers({}) || []).length > 0) {
    alert("errors found..cannot get edits");
  } else if (!hasChanges) {
    alert("no JSON changes found");
  }

  saveSRChanges(srInfo);
}

export function saveSRChanges(
  srInfo: any
) {
  const serviceEnabled = Object.keys(srInfo.services).some(k => srInfo.services[k]);
  if (srInfo && srInfo.enabled && serviceEnabled) {
    alert(`sr param set (${srInfo.spatialReference.wkid}): ${JSON.stringify(srInfo.services)}`);
    const paramToAdd = {
      "params": {
        "wkid": {
          "label": "Spatial Reference",
          "default": srInfo.spatialReference.wkid.toString(),
          "valueType": "spatialReference",
          "attributes": {
            "required": "true"
          }
        }
      }
    };
    alert(`Add this to the solution item: ${JSON.stringify(paramToAdd)}`);
  }
}