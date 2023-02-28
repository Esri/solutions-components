# map-select-tools



<!-- Auto Generated Below -->


## Properties

| Property                | Attribute                 | Description                                                                                                                                                | Type                                            | Default               |
| ----------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | --------------------- |
| `bufferColor`           | `buffer-color`            | string \| number[] \|  object with r, g, b, a: https://developers.arcgis.com/javascript/latest/api-reference/esri-Color.html                               | `any`                                           | `[227, 139, 79, 0.8]` |
| `bufferOutlineColor`    | `buffer-outline-color`    | string \| number[] \| object with r, g, b, a: https://developers.arcgis.com/javascript/latest/api-reference/esri-Color.html                                | `any`                                           | `[255, 255, 255]`     |
| `defaultBufferDistance` | `default-buffer-distance` | number: The default value to show for the buffer distance                                                                                                  | `number`                                        | `undefined`           |
| `defaultBufferUnit`     | `default-buffer-unit`     | number: The default value to show for the buffer unit                                                                                                      | `"feet" \| "kilometers" \| "meters" \| "miles"` | `undefined`           |
| `enabledLayerIds`       | --                        | string[]: Optional list of enabled layer ids  If empty all layers will be available                                                                        | `string[]`                                      | `[]`                  |
| `geometries`            | --                        | esri/geometry: https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry.html                                                            | `Geometry[]`                                    | `[]`                  |
| `isUpdate`              | `is-update`               | boolean: When true a new label is not generated for the stored selection set                                                                               | `boolean`                                       | `false`               |
| `mapView`               | --                        | esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html                                                     | `MapView`                                       | `undefined`           |
| `searchConfiguration`   | --                        | ISearchConfiguration: Configuration details for the Search widget                                                                                          | `ISearchConfiguration`                          | `undefined`           |
| `selectLayerView`       | --                        | esri/views/layers/FeatureLayerView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html                  | `FeatureLayerView`                              | `undefined`           |
| `selectionSet`          | --                        | utils/interfaces/ISelectionSet: Used to store key details about any selections that have been made.                                                        | `ISelectionSet`                                 | `undefined`           |
| `showBufferTools`       | `show-buffer-tools`       | boolean: When true the buffer tools will be available for use                                                                                              | `boolean`                                       | `true`                |
| `sketchLineSymbol`      | --                        | esri/symbols/SimpleLineSymbol \| JSON representation : https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleLineSymbol.html    | `SimpleLineSymbol`                              | `undefined`           |
| `sketchPointSymbol`     | --                        | esri/symbols/SimpleMarkerSymbol \| JSON representation: https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleMarkerSymbol.html | `SimpleMarkerSymbol`                            | `undefined`           |
| `sketchPolygonSymbol`   | --                        | esri/symbols/SimpleFillSymbol \| JSON representation: https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleFillSymbol.html     | `SimpleFillSymbol`                              | `undefined`           |


## Events

| Event                    | Description                                       | Type                                                                                                        |
| ------------------------ | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `selectionLoadingChange` | Emitted on demand when selection starts or ends.  | `CustomEvent<boolean>`                                                                                      |
| `selectionSetChange`     | Emitted on demand when the selection set changes. | `CustomEvent<number>`                                                                                       |
| `sketchTypeChange`       | Emitted on demand when the sketch type changes.   | `CustomEvent<ESketchType.INTERACTIVE \| ESketchType.LAYER>`                                                 |
| `workflowTypeChange`     | Emitted on demand when the workflow type changes. | `CustomEvent<EWorkflowType.REFINE \| EWorkflowType.SEARCH \| EWorkflowType.SELECT \| EWorkflowType.SKETCH>` |


## Methods

### `clearSelection() => Promise<void>`

Clear any selection results

#### Returns

Type: `Promise<void>`

Promise when the results have been cleared

### `getSelection() => Promise<ISelectionSet>`

Get the new selection set

#### Returns

Type: `Promise<ISelectionSet>`

Promise with the new selection set


## Dependencies

### Used by

 - [public-notification](../public-notification)

### Depends on

- calcite-radio-group
- calcite-radio-group-item
- calcite-label
- calcite-checkbox
- [map-draw-tools](../map-draw-tools)
- [refine-selection-tools](../refine-selection-tools)
- [buffer-tools](../buffer-tools)

### Graph
```mermaid
graph TD;
  map-select-tools --> calcite-radio-group
  map-select-tools --> calcite-radio-group-item
  map-select-tools --> calcite-label
  map-select-tools --> calcite-checkbox
  map-select-tools --> map-draw-tools
  map-select-tools --> refine-selection-tools
  map-select-tools --> buffer-tools
  calcite-radio-group-item --> calcite-icon
  refine-selection-tools --> map-layer-picker
  refine-selection-tools --> calcite-action
  map-layer-picker --> calcite-select
  map-layer-picker --> calcite-combobox
  map-layer-picker --> calcite-combobox-item
  map-layer-picker --> calcite-option
  calcite-select --> calcite-icon
  calcite-combobox --> calcite-chip
  calcite-combobox --> calcite-icon
  calcite-chip --> calcite-icon
  calcite-combobox-item --> calcite-icon
  calcite-action --> calcite-loader
  calcite-action --> calcite-icon
  buffer-tools --> calcite-option
  buffer-tools --> calcite-input
  buffer-tools --> calcite-select
  buffer-tools --> calcite-slider
  calcite-input --> calcite-progress
  calcite-input --> calcite-icon
  calcite-slider --> calcite-graph
  public-notification --> map-select-tools
  style map-select-tools fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
