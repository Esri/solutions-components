# public-notification



<!-- Auto Generated Below -->


## Properties

| Property                  | Attribute                   | Description                                                                                                                                                                                                                                                                                                                                                                                                 | Type                                            | Default               |
| ------------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | --------------------- |
| `addresseeLayerIds`       | --                          | string[]: List of layer ids that should be shown as potential addressee layers                                                                                                                                                                                                                                                                                                                              | `string[]`                                      | `[]`                  |
| `bufferColor`             | `buffer-color`              | string \| number[] \|  object with r, g, b, a: https://developers.arcgis.com/javascript/latest/api-reference/esri-Color.html                                                                                                                                                                                                                                                                                | `any`                                           | `[227, 139, 79, 0.8]` |
| `bufferOutlineColor`      | `buffer-outline-color`      | string \| number[] \| object with r, g, b, a: https://developers.arcgis.com/javascript/latest/api-reference/esri-Color.html                                                                                                                                                                                                                                                                                 | `any`                                           | `[255, 255, 255]`     |
| `customLabelEnabled`      | `custom-label-enabled`      | boolean: When true the user can define a name for each notification list                                                                                                                                                                                                                                                                                                                                    | `boolean`                                       | `undefined`           |
| `defaultBufferDistance`   | `default-buffer-distance`   | number: The default value to show for the buffer distance                                                                                                                                                                                                                                                                                                                                                   | `number`                                        | `undefined`           |
| `defaultBufferUnit`       | `default-buffer-unit`       | number: The default value to show for the buffer unit ("feet"\|"meters"\|"miles"\|"kilometers")                                                                                                                                                                                                                                                                                                             | `"feet" \| "kilometers" \| "meters" \| "miles"` | `undefined`           |
| `featureEffect`           | --                          | The effect that will be applied when featureHighlightEnabled is true  esri/layers/support/FeatureEffect: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-support-FeatureEffect.html                                                                                                                                                                                               | `FeatureEffect`                                 | `undefined`           |
| `featureHighlightEnabled` | `feature-highlight-enabled` | boolean: When enabled features will be highlighted when their notification list item is clicked.                                                                                                                                                                                                                                                                                                            | `boolean`                                       | `undefined`           |
| `mapView`                 | --                          | esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html                                                                                                                                                                                                                                                                                                      | `MapView`                                       | `undefined`           |
| `noResultText`            | `no-result-text`            | string: The value to show for no results when left empty the default text "0 selected features from {layerTitle}" will be shown                                                                                                                                                                                                                                                                             | `string`                                        | `undefined`           |
| `searchConfiguration`     | --                          | ISearchConfiguration: Configuration details for the Search widget                                                                                                                                                                                                                                                                                                                                           | `ISearchConfiguration`                          | `undefined`           |
| `selectionLayerIds`       | --                          | string[]: List of layer ids that should be shown as potential selection layers when skectching with "Use layer features" option                                                                                                                                                                                                                                                                             | `string[]`                                      | `[]`                  |
| `showRefineSelection`     | `show-refine-selection`     | boolean: When true the refine selection workflow will be included in the UI                                                                                                                                                                                                                                                                                                                                 | `boolean`                                       | `false`               |
| `showSearchSettings`      | `show-search-settings`      | boolean: When false no buffer distance or unit controls will be exposed                                                                                                                                                                                                                                                                                                                                     | `boolean`                                       | `true`                |
| `sketchLineSymbol`        | `sketch-line-symbol`        | esri/symbols/SimpleLineSymbol \| JSON representation : https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleLineSymbol.html  A JSON representation of the instance in the ArcGIS format. See the ArcGIS REST API documentation for examples of the structure of various input JSON objects. https://developers.arcgis.com/documentation/common-data-types/symbol-objects.htm    | `any`                                           | `undefined`           |
| `sketchPointSymbol`       | `sketch-point-symbol`       | esri/symbols/SimpleMarkerSymbol \| JSON representation: https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleMarkerSymbol.html  A JSON representation of the instance in the ArcGIS format. See the ArcGIS REST API documentation for examples of the structure of various input JSON objects. https://developers.arcgis.com/documentation/common-data-types/symbol-objects.htm | `any`                                           | `undefined`           |
| `sketchPolygonSymbol`     | `sketch-polygon-symbol`     | esri/symbols/SimpleFillSymbol \| JSON representation: https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleFillSymbol.html  A JSON representation of the instance in the ArcGIS format. See the ArcGIS REST API documentation for examples of the structure of various input JSON objects. https://developers.arcgis.com/documentation/common-data-types/symbol-objects.htm     | `any`                                           | `undefined`           |


## Events

| Event                       | Description                                                 | Type                                |
| --------------------------- | ----------------------------------------------------------- | ----------------------------------- |
| `searchConfigurationChange` | Emitted on demand when searchConfiguration gets a new value | `CustomEvent<ISearchConfiguration>` |


## Dependencies

### Depends on

- calcite-shell
- calcite-action-bar
- calcite-action-group
- calcite-action
- calcite-tooltip
- calcite-panel
- calcite-button
- calcite-list
- calcite-list-item
- [map-select-tools](../map-select-tools)
- calcite-label
- calcite-checkbox
- calcite-input-message
- calcite-segmented-control
- calcite-segmented-control-item
- [pdf-download](../pdf-download)
- calcite-input-text
- [refine-selection](../refine-selection)
- calcite-notice

### Graph
```mermaid
graph TD;
  public-notification --> calcite-shell
  public-notification --> calcite-action-bar
  public-notification --> calcite-action-group
  public-notification --> calcite-action
  public-notification --> calcite-tooltip
  public-notification --> calcite-panel
  public-notification --> calcite-button
  public-notification --> calcite-list
  public-notification --> calcite-list-item
  public-notification --> map-select-tools
  public-notification --> calcite-label
  public-notification --> calcite-checkbox
  public-notification --> calcite-input-message
  public-notification --> calcite-segmented-control
  public-notification --> calcite-segmented-control-item
  public-notification --> pdf-download
  public-notification --> calcite-input-text
  public-notification --> refine-selection
  public-notification --> calcite-notice
  calcite-action-bar --> calcite-action-group
  calcite-action-group --> calcite-action-menu
  calcite-action-group --> calcite-action
  calcite-action-menu --> calcite-action
  calcite-action-menu --> calcite-popover
  calcite-action --> calcite-loader
  calcite-action --> calcite-icon
  calcite-popover --> calcite-action
  calcite-popover --> calcite-icon
  calcite-panel --> calcite-action
  calcite-panel --> calcite-action-menu
  calcite-panel --> calcite-scrim
  calcite-scrim --> calcite-loader
  calcite-button --> calcite-loader
  calcite-button --> calcite-icon
  calcite-list --> calcite-scrim
  calcite-list --> calcite-filter
  calcite-filter --> calcite-input
  calcite-input --> calcite-progress
  calcite-input --> calcite-icon
  calcite-list-item --> calcite-icon
  map-select-tools --> map-draw-tools
  map-select-tools --> calcite-label
  map-select-tools --> calcite-switch
  map-select-tools --> buffer-tools
  map-select-tools --> map-layer-picker
  map-select-tools --> calcite-loader
  map-select-tools --> calcite-icon
  map-select-tools --> calcite-input-message
  map-select-tools --> calcite-input
  map-draw-tools --> calcite-action
  buffer-tools --> calcite-option
  buffer-tools --> calcite-input
  buffer-tools --> calcite-select
  buffer-tools --> calcite-slider
  calcite-select --> calcite-icon
  calcite-slider --> calcite-graph
  map-layer-picker --> calcite-select
  map-layer-picker --> calcite-combobox
  map-layer-picker --> calcite-combobox-item
  map-layer-picker --> calcite-option
  calcite-combobox --> calcite-chip
  calcite-combobox --> calcite-icon
  calcite-chip --> calcite-icon
  calcite-combobox-item --> calcite-icon
  calcite-input-message --> calcite-icon
  calcite-segmented-control-item --> calcite-icon
  pdf-download --> calcite-select
  pdf-download --> calcite-option
  calcite-input-text --> calcite-progress
  calcite-input-text --> calcite-icon
  refine-selection --> calcite-segmented-control
  refine-selection --> calcite-segmented-control-item
  refine-selection --> map-draw-tools
  refine-selection --> calcite-list
  refine-selection --> calcite-list-item
  calcite-notice --> calcite-icon
  style public-notification fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
