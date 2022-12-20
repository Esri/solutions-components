# config-layer-picker



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description                                                                                            | Type      | Default     |
| ---------------- | ----------------- | ------------------------------------------------------------------------------------------------------ | --------- | ----------- |
| `defaultChecked` | `default-checked` | boolean: All checkboxes checked state will be set with this value on first render. Default is true     | `boolean` | `true`      |
| `instruction`    | `instruction`     | string: Value to be shown above the check list Allows this to support multiple sets of layers.         | `string`  | `""`        |
| `mapView`        | --                | esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html | `MapView` | `undefined` |


## Methods

### `getConfigInfo() => Promise<string[]>`

Returns a list of layers that have been selected

#### Returns

Type: `Promise<string[]>`

Promise with a list of layer names to use


## Dependencies

### Depends on

- calcite-label
- calcite-combobox
- calcite-combobox-item

### Graph
```mermaid
graph TD;
  config-layer-picker --> calcite-label
  config-layer-picker --> calcite-combobox
  config-layer-picker --> calcite-combobox-item
  calcite-combobox --> calcite-chip
  calcite-combobox --> calcite-icon
  calcite-chip --> calcite-icon
  calcite-combobox-item --> calcite-icon
  style config-layer-picker fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
