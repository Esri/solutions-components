# map-select-tools



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute   | Description                                                                                                                               | Type               | Default     |
| ----------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ----------- |
| `geometries`      | --          | esri/geometry: https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry.html                                           | `Geometry[]`       | `undefined` |
| `isUpdate`        | `is-update` | boolean: When true a new label is not generated for the stored selection set                                                              | `boolean`          | `false`     |
| `mapView`         | --          | esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html                                    | `MapView`          | `undefined` |
| `selectLayerView` | --          | esri/views/layers/FeatureLayerView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html | `FeatureLayerView` | `undefined` |
| `selectionSet`    | --          | utils/interfaces/ISelectionSet: Used to store key details about any selections that have been made.                                       | `ISelectionSet`    | `undefined` |


## Events

| Event                | Description | Type               |
| -------------------- | ----------- | ------------------ |
| `selectionSetChange` |             | `CustomEvent<any>` |
| `workflowTypeChange` |             | `CustomEvent<any>` |


## Methods

### `clearSelection() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `getSelectType() => Promise<EWorkflowType>`



#### Returns

Type: `Promise<EWorkflowType>`



### `getSelectedIds() => Promise<number[]>`



#### Returns

Type: `Promise<number[]>`



### `getSelection() => Promise<ISelectionSet>`



#### Returns

Type: `Promise<ISelectionSet>`



### `getSelectionLabel() => Promise<string>`



#### Returns

Type: `Promise<string>`




## Dependencies

### Used by

 - [new-public-notification](../new-public-notification)
 - [public-notification](../public-notification)

### Depends on

- calcite-radio-group
- calcite-radio-group-item
- [map-draw-tools](../map-draw-tools)
- [refine-selection-tools](../refine-selection-tools)
- calcite-label
- [buffer-tools](../buffer-tools)

### Graph
```mermaid
graph TD;
  map-select-tools --> calcite-radio-group
  map-select-tools --> calcite-radio-group-item
  map-select-tools --> map-draw-tools
  map-select-tools --> refine-selection-tools
  map-select-tools --> calcite-label
  map-select-tools --> buffer-tools
  calcite-radio-group-item --> calcite-icon
  refine-selection-tools --> calcite-label
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
  new-public-notification --> map-select-tools
  public-notification --> map-select-tools
  style map-select-tools fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
