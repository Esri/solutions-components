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

import { Component, Element, getAssetPath, h, Prop } from '@stencil/core';

@Component({
  tag: 'solution-item-icon',
  styleUrl: 'solution-item-icon.css',
  assetsDirs: ['item-icons']
})
export class SolutionItemIcon {

  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLSolutionItemIconElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * Contains the translations for this component.
   */
  @Prop({ mutable: true }) translations: any = {};

  /**
   * Indicate if this is portal
   */
  @Prop() isPortal = false;

  /**
   * The type for the item
   */
  @Prop() type = "";

  /**
   * The typeKeywords for the item
   */
  @Prop() typeKeywords: string[] = [];

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  render() {
    return <div title={this.type}>
      <img class="item-type-icon item-type-icon-margin"
        height="16"
        src={this._getIconUrl(this.type, this.typeKeywords)}
        width="16"
      />
    </div>;
  }

  //--------------------------------------------------------------------------
  //
  //  Variables (private)
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

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

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  /**
   * This function was copied and slightly modified from the arcgis-portal-app.
   *
   * This will construct the path to the icon based on type and typeKeyword info.
   *
   * @param type The item type
   * @param typeKeywords The item typeKeywords
   */
  private _getIconUrl(
    type: string,
    typeKeywords: string[]
  ): string {
    const
      itemType = (type && type.toLowerCase()) || "",
      imgDir = "./item-icons/",
      size = "16";  //for now we only support 16x16 pixel images
    let
      isHosted = false,
      isRouteLayer = false,
      isMarkupLayer = false,
      isTable = false,
      isSpatiotemporal = false,
      isRelational = false,
      imgName = "";
    typeKeywords = typeKeywords || [];

    if (itemType.indexOf("service") > 0 || itemType === "feature collection" || itemType === "kml" || itemType === "wms" || itemType === "wmts" || itemType === "wfs") {
      isHosted = typeKeywords.indexOf("Hosted Service") > -1;
      if (itemType === "feature service" || itemType === "feature collection" || itemType === "kml" || itemType === "wfs") {
        isTable = typeKeywords.indexOf("Table") > -1;
        isRouteLayer = typeKeywords.indexOf("Route Layer") > -1;
        isMarkupLayer = typeKeywords.indexOf("Markup") > -1;
        isSpatiotemporal = typeKeywords.indexOf("Spatiotemporal") !== -1;
        imgName = isSpatiotemporal && isTable ? "spatiotemporaltable" : (isTable ? "table" : (isRouteLayer ? "routelayer" : (isMarkupLayer ? "markup" : (isSpatiotemporal ? "spatiotemporal" : (isHosted ? "featureshosted" : "features")))));
      } else if (itemType === "map service" || itemType === "wms" || itemType === "wmts") {
        isSpatiotemporal = typeKeywords.indexOf("Spatiotemporal") !== -1;
        isRelational = typeKeywords.indexOf("Relational") !== -1;
        if (isSpatiotemporal || isRelational) {
          imgName = "mapimages";
        } else {
          imgName = (isHosted || typeKeywords.indexOf("Tiled") > -1 || itemType === "wmts") ? "maptiles" : "mapimages";
        }
      } else if (itemType === "scene service") {
        if (typeKeywords.indexOf("Line") > -1) {
          imgName = "sceneweblayerline";
        } else if (typeKeywords.indexOf("3DObject") > -1) {
          imgName = "sceneweblayermultipatch";
        } else if (typeKeywords.indexOf("Point") > -1) {
          imgName = "sceneweblayerpoint";
        } else if (typeKeywords.indexOf("IntegratedMesh") > -1) {
          imgName = "sceneweblayermesh";
        } else if (typeKeywords.indexOf("PointCloud") > -1) {
          imgName = "sceneweblayerpointcloud";
        } else if (typeKeywords.indexOf("Polygon") > -1) {
          imgName = "sceneweblayerpolygon";
        } else if (typeKeywords.indexOf("Building") > -1) {
          imgName = "sceneweblayerbuilding";
        } else {
          imgName = "sceneweblayer";
        }
      } else if (itemType === "image service") {
        imgName = typeKeywords.indexOf("Elevation 3D Layer") > -1 ? "elevationlayer" : (typeKeywords.indexOf("Tiled Imagery") > -1 ? "tiledimagerylayer" : "imagery");
      } else if (itemType === "stream service") {
        imgName = "streamlayer";
      } else if (itemType === "vector tile service") {
        imgName = "vectortile";
      } else if (itemType === "datastore catalog service") {
        imgName = "datastorecollection";
      } else if (itemType === "geocoding service") {
        imgName = "geocodeservice";
      } else if (itemType === "geoprocessing service") {
        imgName = (typeKeywords.indexOf("Web Tool") > -1 && (this.isPortal)) ? "tool" : "layers";
      } else {
        imgName = "layers";
      }
    } else if (itemType === "web map" || itemType === "cityengine web scene") {
      imgName = "maps";
    } else if (itemType === "web scene") {
      imgName = typeKeywords.indexOf("ViewingMode-Local") > -1 ? "webscenelocal" : "websceneglobal";
    } else if (itemType === "web mapping application" || itemType === "mobile application" || itemType === "application" ||
      itemType === "operation view" || itemType === "desktop application") {
      imgName = "apps";
    } else if (itemType === "map document" || itemType === "map package" || itemType === "published map" || itemType === "scene document" ||
      itemType === "globe document" || itemType === "basemap package" || itemType === "mobile basemap package" || itemType === "mobile map package" ||
      itemType === "project package" || itemType === "project template" || itemType === "pro map" || itemType === "layout" ||
      (itemType === "layer" && typeKeywords.indexOf("ArcGIS Pro") > -1) || (itemType === "explorer map" && typeKeywords.indexOf("Explorer Document"))) {
      imgName = "mapsgray";
    } else if (itemType === "service definition" || itemType === "csv" || itemType === "shapefile" || itemType === "cad drawing" || itemType === "geojson" || itemType === "360 vr experience" || itemType === "netcdf" || itemType === "administrative report") {
      imgName = "datafiles";
    } else if (itemType === "explorer add in" || itemType === "desktop add in" || itemType === "windows viewer add in" || itemType === "windows viewer configuration") {
      imgName = "appsgray";
    } else if (itemType === "arcgis pro add in" || itemType === "arcgis pro configuration") {
      imgName = "addindesktop";
    } else if (itemType === "rule package" || itemType === "file geodatabase" || itemType === "sqlite geodatabase" || itemType === "csv collection" || itemType === "kml collection" ||
      itemType === "windows mobile package" || itemType === "map template" || itemType === "desktop application template" || itemType === "gml" ||
      itemType === "arcpad package" || itemType === "code sample" || itemType === "form" || itemType === "document link" ||
      itemType === "operations dashboard add in" || itemType === "rules package" || itemType === "image" || itemType === "workflow manager package" ||
      (itemType === "explorer map" && typeKeywords.indexOf("Explorer Mapping Application") > -1 || typeKeywords.indexOf("Document") > -1)) {
      imgName = "datafilesgray";
    } else if (itemType === "network analysis service" || itemType === "geoprocessing service" ||
      itemType === "geodata service" || itemType === "geometry service" || itemType === "geoprocessing package" ||
      itemType === "locator package" || itemType === "geoprocessing sample" || itemType === "workflow manager service") {
      imgName = "toolsgray";
    } else if (itemType === "layer" || itemType === "layer package" || itemType === "explorer layer") {
      imgName = "layersgray";
    } else if (itemType === "scene package") {
      imgName = "scenepackage";
    } else if (itemType === "mobile scene package") {
      imgName = "mobilescenepackage";
    } else if (itemType === "tile package" || itemType === "compact tile package") {
      imgName = "tilepackage";
    } else if (itemType === "task file") {
      imgName = "taskfile";
    } else if (itemType === "report template") {
      imgName = "report-template";
    } else if (itemType === "statistical data collection") {
      imgName = "statisticaldatacollection";
    } else if (itemType === "insights workbook") {
      imgName = "workbook";
    } else if (itemType === "insights model") {
      imgName = "insightsmodel";
    } else if (itemType === "insights page") {
      imgName = "insightspage";
    } else if (itemType === "insights theme") {
      imgName = "insightstheme";
    } else if (itemType === "hub initiative") {
      imgName = "hubinitiative";
    } else if (itemType === "hub page") {
      imgName = "hubpage";
    } else if (itemType === "hub site application") {
      imgName = "hubsite";
    } else if (itemType === "hub event") {
      imgName = "hubevent";
    } else if (itemType === "relational database connection") {
      imgName = "relationaldatabaseconnection";
    } else if (itemType === "big data file share") {
      imgName = "datastorecollection";
    } else if (itemType === "image collection") {
      imgName = "imagecollection";
    } else if (itemType === "desktop style") {
      imgName = "desktopstyle";
    } else if (itemType === "style") {
      imgName = "style";
    } else if (itemType === "dashboard") {
      imgName = "dashboard";
    } else if (itemType === "raster function template") {
      imgName = "rasterprocessingtemplate";
    } else if (itemType === "vector tile package") {
      imgName = "vectortilepackage";
    } else if (itemType === "ortho mapping project") {
      imgName = "orthomappingproject";
    } else if (itemType === "ortho mapping template") {
      imgName = "orthomappingtemplate";
    } else if (itemType === "solution") {
      imgName = "solutions";
    } else if (itemType === "geopackage") {
      imgName = "geopackage";
    } else if (itemType === "deep learning package") {
      imgName = "deeplearningpackage";
    } else if (itemType === "real time analytic") {
      imgName = "realtimeanalytics";
    } else if (itemType === "big data analytic") {
      imgName = "bigdataanalytics";
    } else if (itemType === "feed") {
      imgName = "feed";
    } else if (itemType === "excalibur imagery project") {
      imgName = "excaliburimageryproject";
    } else if (itemType === "notebook") {
      imgName = "notebook";
    } else if (itemType === "storymap") {
      imgName = "storymap";
    } else if (itemType === "survey123 add in") {
      imgName = "survey123addin";
    } else if (itemType === "mission") {
      imgName = "mission";
    } else if (itemType === "mission report") {
      imgName = "missionreport";
    } else if (itemType === "quickcapture project") {
      imgName = "quickcaptureproject";
    } else if (itemType === "pro report") {
      imgName = "proreport";
    } else if (itemType === "urban model") {
      imgName = "urbanmodel";
    } else if (itemType === "web experience") {
      imgName = "experiencebuilder";
    } else if (itemType === "web experience template") {
      imgName = "webexperiencetemplate";
    } else if (itemType === "workflow") {
      imgName = "workflow";
    } else if (itemType === "kernel gateway connection") {
      imgName = "kernelgatewayconnection";
    } else if (itemType === "insights script") {
      imgName = "insightsscript";
    } else if (itemType === "hub initiative template") {
      imgName = "hubinitiativetemplate";
    } else if (itemType === "storymap theme") {
      imgName = "storymaptheme";
    } else if (itemType === "group") {
      imgName = "group"
    } else {
      imgName = "maps";
    }
    return imgName ? getAssetPath(imgDir + imgName + size + ".png") : null;
  }

}
