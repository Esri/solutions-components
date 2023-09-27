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

import * as locale from '../../../utils/locale';
import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { SpatialRef } from '../spatial-ref';

describe('spatial-ref', () => {

  beforeEach(() => {
    jest.spyOn(locale, 'getLocaleComponentStrings').mockImplementation(
      () => Promise.resolve([{"spatialReferencePlaceholder": "Search for spatial reference using name or WKID"}, "en"])
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders', async () => {
    const page = await newSpecPage({
      components: [SpatialRef],
      supportsShadowDom: false,
      template: () => (
        <spatial-ref/>
      )
    });
    expect(page.root).toEqualHtml(`
      <spatial-ref default-wkid="102100" value="102100">
        <div>
          <calcite-input id="calcite-sr-search" placeholder="Search for spatial reference using name or WKID"></calcite-input>
          <calcite-tree id="calcite-sr-tree" slot="children">
            <div class="spatial-ref-container" id="solution-wkid-container">
              <calcite-tree-item aria-selected="" id="102100" selected="">
                <div>
                  WGS 1984 Web Mercator Auxiliary Sphere (102100)
                </div>
              </calcite-tree-item>
            </div>
          </calcite-tree>
        </div>
      </spatial-ref>
    `);
  });

  it('creates description for known WKID', async () => {
    await newSpecPage({
      components: [SpatialRef],
      template: () => (
        <spatial-ref></spatial-ref>
      )
    });
    const component = document.querySelector('spatial-ref');
    component.wkidToDisplay(4326)
      .then(
        result => expect(result).toEqual('GCS WGS 1984 (4326)')
      );
  });

  it('creates description for unknown WKID', async () => {
    await newSpecPage({
      components: [SpatialRef],
      template: () => (
        <spatial-ref></spatial-ref>
      )
    });
    const component = document.querySelector('spatial-ref');
    component.wkidToDisplay(0)
      .then(
        result => expect(result).toEqual('WKID 0')
      );
  });

  it('creates description for default component value', async () => {
    await newSpecPage({
      components: [SpatialRef],
      template: () => (
        <spatial-ref></spatial-ref>
      )
    });
    const component = document.querySelector('spatial-ref');
    component.createSpatialRefDisplay(null)
      .then(
        result => {
          expect(result.display).toEqual('WGS 1984 Web Mercator Auxiliary Sphere (102100)');
          expect(result.usingWkid).toBeTruthy();
          expect(result.wkid).toEqual(102100);
          expect(result.wkt).toEqual('');
        }
      );
  });

  it('creates description for WKID component value', async () => {
    await newSpecPage({
      components: [SpatialRef],
      template: () => (
        <spatial-ref></spatial-ref>
      )
    });
    const component = document.querySelector('spatial-ref');
    component.createSpatialRefDisplay("4151")
      .then(
        result => {
          expect(result.display).toEqual('GCS Swiss TRF 1995 (4151)');
          expect(result.usingWkid).toBeTruthy();
          expect(result.wkid).toEqual(4151);
          expect(result.wkt).toEqual('');
        }
      );
  });

  it('creates description for WKT component value', async () => {
    await newSpecPage({
      components: [SpatialRef],
      template: () => (
        <spatial-ref></spatial-ref>
      )
    });
    const component = document.querySelector('spatial-ref');
    component.createSpatialRefDisplay('PROJCS["Germany_Zone_5",GEOGCS["GCS_Deutsches_Hauptdreiecksnetz",DATUM["D_Deutsches_Hauptdreiecksnetz",SPHEROID["Bessel_1841",6377397.155,299.1528128]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Transverse_Mercator"],PARAMETER["False_Easting",5500000.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",15.0],PARAMETER["Scale_Factor",1.0],PARAMETER["Latitude_Of_Origin",0.0],UNIT["Meter",1.0]]')
      .then(
        result => {
          expect(result.display).toEqual('PROJCS["Germany_Zone_5",GEOGCS["GCS_Deutsches_Hauptdreiecksnetz",DATUM["D_Deutsches_Hauptdreiecksnetz",SPHEROID["Bessel_1841",6377397.155,299.1528128]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Transverse_Mercator"],PARAMETER["False_Easting",5500000.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",15.0],PARAMETER["Scale_Factor",1.0],PARAMETER["Latitude_Of_Origin",0.0],UNIT["Meter",1.0]]');
          expect(result.usingWkid).toBeFalsy();
          expect(result.wkid).toEqual(0);
          expect(result.wkt).toEqual('PROJCS["Germany_Zone_5",GEOGCS["GCS_Deutsches_Hauptdreiecksnetz",DATUM["D_Deutsches_Hauptdreiecksnetz",SPHEROID["Bessel_1841",6377397.155,299.1528128]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Transverse_Mercator"],PARAMETER["False_Easting",5500000.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",15.0],PARAMETER["Scale_Factor",1.0],PARAMETER["Latitude_Of_Origin",0.0],UNIT["Meter",1.0]]');
        }
      );
  });

  it('sets default component value', async () => {
    await newSpecPage({
      components: [SpatialRef],
      template: () => (
        <spatial-ref></spatial-ref>
      )
    });
    const component = document.querySelector('spatial-ref');
    component.getSpatialRef()
      .then(
        result => {
          expect(result.display).toEqual('WGS 1984 Web Mercator Auxiliary Sphere (102100)');
          expect(result.usingWkid).toBeTruthy();
          expect(result.wkid).toEqual(102100);
          expect(result.wkt).toEqual('');
        }
      );
  });

  it('sets WKID component value', async () => {
    await newSpecPage({
      components: [SpatialRef],
      template: () => (
        <spatial-ref value="4151"></spatial-ref>
      )
    });
    const component = document.querySelector('spatial-ref');
    component.getSpatialRef()
      .then(
        result => {
          expect(result.display).toEqual('GCS Swiss TRF 1995 (4151)');
          expect(result.usingWkid).toBeTruthy();
          expect(result.wkid).toEqual(4151);
          expect(result.wkt).toEqual('');
        }
      );
  });

  it('sets WKT component value', async () => {
    const v: string = `PROJCS["Germany_Zone_5",GEOGCS["GCS_Deutsches_Hauptdreiecksnetz",DATUM["D_Deutsches_Hauptdreiecksnetz",SPHEROID["Bessel_1841",6377397.155,299.1528128]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Transverse_Mercator"],PARAMETER["False_Easting",5500000.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",15.0],PARAMETER["Scale_Factor",1.0],PARAMETER["Latitude_Of_Origin",0.0],UNIT["Meter",1.0]]`;
    await newSpecPage({
      components: [SpatialRef],
      template: () => (
        <spatial-ref value={v}></spatial-ref>
      )
    });
    const component = document.querySelector('spatial-ref');
    component.getSpatialRef()
      .then(
        result => {
          expect(result.display).toEqual(v);
          expect(result.usingWkid).toBeFalsy();
          expect(result.wkid).toEqual(0);
          expect(result.wkt).toEqual(v);
        }
      );
  });

});