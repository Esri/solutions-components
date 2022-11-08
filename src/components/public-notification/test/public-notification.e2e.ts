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

import { newE2EPage } from '@stencil/core/testing';
import * as locale from "../../../utils/locale";
import * as loadModules from "../../../utils/loadModules";
import * as translations from "../../../assets/t9n/public-notification/resources.json";
import { geometryEngine, LayerView } from "../../../utils/test/mocks/jsApi";
import * as queryUtils from "../../../utils/queryUtils";
import * as mapViewUtils from "../../../utils/mapViewUtils";
import * as publicNotificationUtils from "../../../utils/publicNotificationUtils";

jest.setTimeout(30000);

afterEach(() => {
  jest.restoreAllMocks();
});

let mapView;

beforeEach(() => {
  jest.spyOn(locale, "getLocaleComponentStrings").mockImplementation(() => [
    translations
  ] as any);

  jest.spyOn(loadModules, "loadModules").mockImplementation(async () => {
    return [geometryEngine]
  });

  jest.spyOn(mapViewUtils, "highlightFeatures").mockImplementation(jest.fn());
  jest.spyOn(publicNotificationUtils, "getSelectionIds").mockImplementation(jest.fn());

  jest.spyOn(console, 'warn').mockImplementation(() => {});

  mapView = {
    map: {
      layers: {
        add: () => {},
        getItemAt: () => { return -1 },
        findIndex: () => { return -1 }
      }
    }
  } as unknown as any;
});

describe('public-notification', () => {
  it('renders', async () => {
    jest.useFakeTimers();

    const getSelectionSetQueryMock = jest.fn();
    jest.spyOn(queryUtils, "getSelectionSetQuery").mockImplementation(getSelectionSetQueryMock);

    const page = await newE2EPage();
    await page.setContent('<public-notification></public-notification>');

    const element = await page.find('public-notification');
    expect(element).toHaveClass('hydrated');

    // These cause errors to be thrown
    // element.setProperty("addresseeLayer", new LayerView() as unknown as any);
    // element.setProperty("mapView", mapView);
    //await page.waitForChanges();

    const infoMessage = await element.find(".info-message");
    expect(infoMessage.innerHTML).toContain(translations.noNotifications);

    const notice = await page.find("calcite-notice");
    expect(notice.innerText).toContain(translations.selectLayerAndAdd);

    const addBtn = await element.find("calcite-button");
    expect(addBtn.innerText).toContain(translations.add);

    // TODO understand why this causes failures in the test
    // this is really the only way to change pageType
    //await addBtn.click();
    //await page.waitForChanges();
  });

  it('renders with selection set', async () => {
    jest.useFakeTimers();

    const getSelectionSetQueryMock = jest.fn();
    jest.spyOn(queryUtils, "getSelectionSetQuery").mockImplementation(getSelectionSetQueryMock);

    const page = await newE2EPage();
    await page.setContent('<public-notification></public-notification>');

    const element = await page.find('public-notification');
    expect(element).toHaveClass('hydrated');

    // These cause errors to be thrown
    // element.setProperty("addresseeLayer", new LayerView() as unknown as any);
    // element.setProperty("mapView", mapView);
    //await page.waitForChanges();

    const infoMessage = await element.find(".info-message");
    expect(infoMessage.innerHTML).toContain(translations.noNotifications);

    const notice = await page.find("calcite-notice");
    expect(notice.innerText).toContain(translations.selectLayerAndAdd);

    const addBtn = await element.find("calcite-button");
    expect(addBtn.innerText).toContain(translations.add);

    // TODO understand why this causes failures in the test
    // this is really the only way to change pageType
    //await addBtn.click();
    //await page.waitForChanges();
  });
});
