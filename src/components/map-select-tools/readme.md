# map-select-tools



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                                                            | Type                                                                   | Default                |
| -------------- | --------------- | ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- | ---------------------- |
| `geometries`   | --              |                                                                                                        | `Geometry[]`                                                           | `undefined`            |
| `isUpdate`     | `is-update`     |                                                                                                        | `boolean`                                                              | `false`                |
| `mapView`      | --              | esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html | `MapView`                                                              | `undefined`            |
| `searchLayers` | --              |                                                                                                        | `Layer[]`                                                              | `undefined`            |
| `searchTerm`   | `search-term`   |                                                                                                        | `string`                                                               | `undefined`            |
| `selectLayer`  | --              |                                                                                                        | `FeatureLayerView`                                                     | `undefined`            |
| `selectionSet` | --              |                                                                                                        | `ISelectionSet`                                                        | `undefined`            |
| `translations` | `translations`  |                                                                                                        | `any`                                                                  | `{}`                   |
| `workflowType` | `workflow-type` |                                                                                                        | `EWorkflowType.SEARCH \| EWorkflowType.SELECT \| EWorkflowType.SKETCH` | `EWorkflowType.SEARCH` |


## Events

| Event                | Description | Type               |
| -------------------- | ----------- | ------------------ |
| `selectionSetChange` |             | `CustomEvent<any>` |


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

 - [public-notification-two](../public-notification-two)

### Depends on

- calcite-radio-group
- calcite-radio-group-item
- [map-draw-tools](../map-draw-tools)
- [refine-selection-tools](../refine-selection-tools)
- [buffer-tools](../buffer-tools)

### Graph
```mermaid
graph TD;
  map-select-tools --> calcite-radio-group
  map-select-tools --> calcite-radio-group-item
  map-select-tools --> map-draw-tools
  map-select-tools --> refine-selection-tools
  map-select-tools --> buffer-tools
  calcite-radio-group-item --> calcite-icon
  refine-selection-tools --> map-layer-picker
  refine-selection-tools --> calcite-action
  map-layer-picker --> calcite-label
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
  buffer-tools --> calcite-label
  buffer-tools --> calcite-input
  buffer-tools --> calcite-select
  buffer-tools --> calcite-option
  calcite-input --> calcite-progress
  calcite-input --> calcite-icon
  public-notification-two --> map-select-tools
  style map-select-tools fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
