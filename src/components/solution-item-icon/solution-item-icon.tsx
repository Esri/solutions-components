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

import { Component, Element, getAssetPath, h, Prop, VNode } from '@stencil/core';

@Component({
  tag: 'solution-item-icon',
  styleUrl: 'solution-item-icon.scss',
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

  /**
   * Renders the component.
   */
  render(): VNode {
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
  //  Properties (protected)
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
   *
   * @returns string the asset path for the given item type and typekeywords
   */
  protected _getIconUrl(
    type: string,
    typeKeywords: string[]
  ): string {
    const icon = this._getItemIcon(type, typeKeywords);
    return getAssetPath(`./item-icons/${icon}16.svg`);
  }

  /**
   * This function was copied and slightly modified from the arcgis-app-components.
   *
   * This will fetch the name of the icon based on type and typeKeyword info.
   *
   * @param type The item type
   * @param typeKeywords The item typeKeywords
   *
   * @returns string the name of the icon for the given type and typekeywords
   */
  protected _getItemIcon(
    type: string,
    typeKeywords: string[]
  ): any {
    const _type = type.toLowerCase();
    const keywords = typeKeywords || [];
    const hosted = keywords.includes("Hosted Service");

    switch (_type.trim()) {
      case "360 vr experience":
        return "360vr";
      case "3dtiles package":
        return "3dtileslayerpackage";
      case "3dtiles service":
        return keywords.includes("3DObject")
          ? "3dobjecttileslayer"
          : keywords.includes("IntegratedMesh")
          ? "integratedmeshtileslayer"
          : "3dobjecttileslayer";
      case "feature service":
      case "feature collection":
      case "kml":
      case "wfs":
        if (keywords.includes("IndoorPositioningDataService")) {
          return "indoorpositioningdataservice";
        }
        const isSpatiotemporal = keywords.includes("Spatiotemporal");
        if (keywords.includes("Table")) {
          return isSpatiotemporal ? "spatiotemporaltable" : "table";
        }
        if (keywords.includes("Route Layer")) {
          return "routelayer";
        }
        if (keywords.includes("Markup")) {
          return "markup";
        }
        if (isSpatiotemporal) {
          return "spatiotemporal";
        }
        if (keywords.includes("UtilityNetwork")) {
          return "utilitynetwork";
        }
        return hosted ? "featureshosted" : "features";
      case "group layer":
        if (keywords.includes("Map")) {
          return "layergroup2d";
        }
        if (keywords.includes("Scene")) {
          return "layergroup3d";
        }
        return "layergroup";
      case "wmts":
        return "maptiles";
      case "map service":
      case "wms":
        return hosted || keywords.includes("Tiled") ? "maptiles" : "mapimages";
      case "scene service":
        if (keywords.includes("Line")) {
          return "sceneweblayerline";
        }
        if (keywords.includes("3DObject")) {
          return "sceneweblayermultipatch";
        }
        if (keywords.includes("Point")) {
          return "sceneweblayerpoint";
        }
        if (keywords.includes("IntegratedMesh")) {
          return "sceneweblayermesh";
        }
        if (keywords.includes("PointCloud")) {
          return "sceneweblayerpointcloud";
        }
        if (keywords.includes("Polygon")) {
          return "sceneweblayerpolygon";
        }
        if (keywords.includes("Building")) {
          return "sceneweblayerbuilding";
        }
        if (keywords.includes("Voxel")) {
          return "sceneweblayervoxel";
        }
        return "sceneweblayer";
      case "image service":
        if (keywords.includes("Elevation 3D Layer")) {
          return "elevationlayer";
        }
        if (keywords.includes("Tiled Imagery")) {
          return "tiledimagerylayer";
        }
        return "imagery";
      case "stream service":
        return "streamlayer";
      case "video service":
        return keywords.includes("Live Stream") ? "livestreamvideolayer" : "mediaservice";
      case "vector tile service":
        return "vectortile";
      case "datastore catalog service":
        return "datastorecollection";
      case "geocoding service":
        return "geocodeservice";
      case "geoprocessing service":
        return keywords.includes("Web Tool") ? "tool" : "layers";
      case "geodata service":
        return "geodataservice";
      case "web map":
      case "cityengine web scene":
        return "maps";
      case "web scene":
        return keywords.includes("ViewingMode-Local") ? "webscenelocal" : "websceneglobal";
      case "application":
      case "web mapping application":
      case "mobile application":
      case "operation view":
      case "desktop application":
        return keywords.includes("configurableApp") ? "instantapps" : "apps";
      case "map document":
      case "map package":
      case "published map":
      case "scene document":
      case "globe document":
      case "basemap package":
      case "mobile basemap package":
      case "mobile map package":
      case "project package":
      case "project template":
      case "pro map":
      case "layout":
        return "mapsgray";
      case "layer":
        if (keywords.includes("ArcGIS Pro")) {
          return "mapsgray";
        }
      case "explorer map":
        if (keywords.indexOf("Explorer Document")) {
          return "mapsgray";
        }
        if (keywords.includes("Explorer Mapping Application")) {
          return "datafilesgray";
        }
      case "pro presentation":
        return "propresentation";
      case "api key":
        return "key";
      case "csv":
        return "csv";
      case "shapefile":
        return "shapefile";
      case "csv collection":
        return "csvcollection";
      case "media layer":
        return "medialayer";
      case "microsoft excel":
        return "excel";
      case "microsoft powerpoint":
        return "powerpoint";
      case "microsoft word":
        return "word";
      case "pdf":
        return "pdf";
      case "sqlite geodatabase":
        return "sqlite";
      case "administrative report":
        return "report";
      case "image":
        return "image";
      case "cad drawing":
        return "cad";
      case "service definition":
      case "geojson":
      case "360 vr experience":
      case "netcdf":
        return "data";
      case "explorer add in":
      case "desktop add in":
      case "windows viewer add in":
      case "windows viewer configuration":
        return "appsgray";
      case "arcgis pro add in":
      case "arcgis pro configuration":
        return "addindesktop";
      case "rule package":
      case "file geodatabase":
      case "kml collection":
      case "windows mobile package":
      case "map template":
      case "desktop application template":
      case "gml":
      case "arcpad package":
      case "code sample":
      case "document link":
      case "earth configuration":
      case "operations dashboard add in":
      case "rules package":
      case "workflow manager package":
        return "datafilesgray";
      case "form":
        if (keywords.includes("Survey123")) {
          return "survey";
        }
        return "datafilesgray";
      case "network analysis service":
      case "geoprocessing service":
      case "geodata service":
      case "geometry service":
      case "geoprocessing package":
      case "locator package":
      case "geoprocessing sample":
      case "workflow manager service":
        return "toolsgray";
      case "layer":
      case "layer package":
      case "explorer layer":
        return "layersgray";
      case "scene package":
        return "scenepackage";
      case "mobile scene package":
        return "mobilescenepackage";
      case "tile package":
      case "compact tile package":
        return "tilepackage";
      case "task file":
        return "taskfile";
      case "report template":
        return "reporttemplate";
      case "statistical data collection":
        return "statisticaldatacollection";
      case "analysis model":
        return "geoprocessingmodel";
      case "insights workbook":
        return "workbook";
      case "insights model":
        return "insightsmodel";
      case "insights page":
        return "insightspage";
      case "insights theme":
        return "insightstheme";
      case "hub initiative":
        return "hubinitiative";
      case "hub page":
        return "hubpage";
      case "hub event":
        return "hubevent";
      case "hub site application":
        return "hubsite";
      case "hub project":
        return "hubproject";
      case "relational database connection":
        return "relationaldatabaseconnection";
      case "image":
        return "image";
      case "image collection":
        return "imagecollection";
      case "style":
        if (keywords.includes("Dictionary")) {
          return "dictionarystyle";
        }
        return "style";
      case "desktop style":
        return "desktopstyle";
      case "dashboard":
        return "dashboard";
      case "raster function template":
        return "rasterprocessingtemplate";
      case "vector tile package":
        return "vectortilepackage";
      case "ortho mapping project":
        return "orthomappingproject";
      case "ortho mapping template":
        return "orthomappingtemplate";
      case "solution":
        return "solutions";
      case "geopackage":
        return "geopackage";
      case "deep learning package":
        return "deeplearningpackage";
      case "real time analytic":
        return "realtimeanalytics";
      case "big data analytic":
        return "bigdataanalytics";
      case "feed":
        return "feed";
      case "excalibur imagery project":
        return "excaliburimageryproject";
      case "notebook":
        return "notebook";
      case "reality mapping project":
        return "realitymappingproject";
      case "storymap":
        if (keywords.includes("storymaptemplate")) {
          return "storymapstemplate";
        }

        if (keywords.includes("storymapcollection")) {
          return "storymapcollection";
        }
        if (keywords.includes("storymapbriefing")) {
          return "storymapbriefing";
        }
        return "storymap";
      case "survey123 add in":
        return "survey123addin";
      case "mission":
        return "mission";
      case "mission report":
        return "missionreport";
      case "quickcapture project":
        return "quickcaptureproject";
      case "pro report":
        return "proreport";
      case "urban model":
        return "urbanmodel";
      case "urban project":
        return "urbanproject";
      case "web experience":
        return "experiencebuilder";
      case "web experience template":
        return "webexperiencetemplate";
      case "experience builder widget":
        return "experiencebuilderwidget";
      case "experience builder widget package":
        return "experiencebuilderwidgetpackage";
      case "workflow":
        return "workflow";
      case "insights script":
        return "insightsscript";
      case "kernel gateway connection":
        return "kernelgatewayconnection";
      case "hub initiative template":
        return "hubinitiativetemplate";
      case "storymap theme":
        return "storymaptheme";
      case "knowledge graph":
        return "knowledgegraph";
      case "knowledge studio project":
        return "knowledgestudio";
      case "knowledge graph layer":
        return "knowledgegraphlayer";
      case "native application":
        return "nativeapp";
      case "native application installer":
        return "nativeappinstaller";
      case "web link chart":
        return "linkchart";
      case "knowledge graph web investigation":
        return "investigation";
      case "ogcfeatureserver":
        return "features";
      case "pro project":
        return "proproject";
      case "insights workbook package":
        return "insightsworkbookpackage";
      case "apache parquet":
        return "apacheparquet";
      case "notebook code snippets":
      case "notebook code snippet library":
        return "notebookcodesnippets";
      case "suitability model":
        return "suitabilitymodel";
      case "esri classifier definition":
        return "classifierdefinition";
      case "esri classification schema":
        return "classificationschema";
      case "insights data engineering workbook":
        return "dataengineeringworkbook";
      case "insights data engineering model":
        return "dataengineeringmodel";
      case "deep learning studio project":
        return "deeplearningproject";
      case "data store":
        return "datastore";
      case "data pipeline":
        return "datapipeline";
      default:
        if (keywords.includes("Document")) {
          return "datafilesgray";
        }
        return _type.includes("service") ? "layers" : "maps";
    }
  }
}
