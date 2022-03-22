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

import { newSpecPage } from '@stencil/core/testing';
import { SolutionSpatialRef } from '../solution-spatial-ref';
import * as translations from '../../../testingAssets/strings.json';
import { h } from '@stencil/core';
import state from '../../../utils/editStore';

describe('solution-spatial-ref', () => {
  beforeEach(() => {
    state.dispose();
    state.models = {};
    state.spatialReferenceInfo = {
      enabled: true,
      services: [{
        "Feature Service 1": true
      }, {
        "Feature Service 2": false
      }],
      spatialReference: undefined
    };
    state.featureServices = [];
  });
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SolutionSpatialRef],
      supportsShadowDom: false,
      template: () => (
        <solution-spatial-ref translations={translations.configuration_modal.configuration} services={["Feature Service 1", "Feature Service 2"]}></solution-spatial-ref>
      )
    });
    expect(page.root).toEqualHtml(`
      <solution-spatial-ref default-wkid="102100" locked="">
        <label class="switch-label"><calcite-switch scale="m" class="spatial-ref-switch"></calcite-switch>Spatial Reference Parameter</label>
        <div id="spatialRefDefn" class="spatial-ref-switch-title">
          <calcite-label>Select the spatial reference of the feature layers deployed with the solution.
            <label class="spatial-ref-default">
              <calcite-input disabled="" placeholder="Search for spatial reference using name or WKID"></calcite-input>
            </label>
          </calcite-label>
          <div class="disabled-div">
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
          <div>
            <label class="spatial-ref-item-title">Feature Services</label>
            <label class="switch-label"><calcite-switch disabled="" scale="m" switched="" class="spatial-ref-item-switch"></calcite-switch>Feature Service 1</label>
            <label class="switch-label"><calcite-switch disabled="" scale="m" class="spatial-ref-item-switch"></calcite-switch>Feature Service 2</label>
          </div>
        </div>
      </solution-spatial-ref>
    `);
  });

  it('creates description for known WKID', async () => {
    await newSpecPage({
      components: [SolutionSpatialRef],
      template: () => (
        <solution-spatial-ref translations={translations.configuration_modal.configuration}></solution-spatial-ref>
      )
    });
    const component = document.querySelector('solution-spatial-ref');
    component.wkidToDisplay(4326)
      .then(
        result => expect(result).toEqual('GCS WGS 1984 (4326)')
      );
  });

  it('creates description for unknown WKID', async () => {
    await newSpecPage({
      components: [SolutionSpatialRef],
      template: () => (
        <solution-spatial-ref translations={translations.configuration_modal.configuration}></solution-spatial-ref>
      )
    });
    const component = document.querySelector('solution-spatial-ref');
    component.wkidToDisplay(0)
      .then(
        result => expect(result).toEqual('WKID 0')
      );
  });

  it('creates description for default component value', async () => {
    await newSpecPage({
      components: [SolutionSpatialRef],
      template: () => (
        <solution-spatial-ref translations={translations.configuration_modal.configuration}></solution-spatial-ref>
      )
    });
    const component = document.querySelector('solution-spatial-ref');
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
      components: [SolutionSpatialRef],
      template: () => (
        <solution-spatial-ref translations={translations.configuration_modal.configuration}></solution-spatial-ref>
      )
    });
    const component = document.querySelector('solution-spatial-ref');
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
      components: [SolutionSpatialRef],
      template: () => (
        <solution-spatial-ref translations={translations.configuration_modal.configuration}></solution-spatial-ref>
      )
    });
    const component = document.querySelector('solution-spatial-ref');
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
      components: [SolutionSpatialRef],
      template: () => (
        <solution-spatial-ref translations={translations.configuration_modal.configuration}></solution-spatial-ref>
      )
    });
    const component = document.querySelector('solution-spatial-ref');
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
      components: [SolutionSpatialRef],
      template: () => (
        <solution-spatial-ref translations={translations.configuration_modal.configuration} value="4151"></solution-spatial-ref>
      )
    });
    const component = document.querySelector('solution-spatial-ref');
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
      components: [SolutionSpatialRef],
      template: () => (
        <solution-spatial-ref translations={translations.configuration_modal.configuration} value={v}></solution-spatial-ref>
      )
    });
    const component = document.querySelector('solution-spatial-ref');
    component.getSpatialRef()
      .then(
        result => {
          expect(result.display).toEqual('PROJCS["Germany_Zone_5",GEOGCS["GCS_Deutsches_Hauptdreiecksnetz",DATUM["D_Deutsches_Hauptdreiecksnetz",SPHEROID["Bessel_1841",6377397.155,299.1528128]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Transverse_Mercator"],PARAMETER["False_Easting",5500000.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",15.0],PARAMETER["Scale_Factor",1.0],PARAMETER["Latitude_Of_Origin",0.0],UNIT["Meter",1.0]]');
          expect(result.usingWkid).toBeFalsy();
          expect(result.wkid).toEqual(0);
          expect(result.wkt).toEqual('PROJCS["Germany_Zone_5",GEOGCS["GCS_Deutsches_Hauptdreiecksnetz",DATUM["D_Deutsches_Hauptdreiecksnetz",SPHEROID["Bessel_1841",6377397.155,299.1528128]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Transverse_Mercator"],PARAMETER["False_Easting",5500000.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",15.0],PARAMETER["Scale_Factor",1.0],PARAMETER["Latitude_Of_Origin",0.0],UNIT["Meter",1.0]]');
        }
      );
  });
});