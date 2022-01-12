# arcgis-hub-input-color



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                                                       | Type      | Default     |
| ------------- | ------------- | --------------------------------------------------------------------------------- | --------- | ----------- |
| `disabled`    | `disabled`    | A boolean value indicating whether the control is disabled                        | `boolean` | `false`     |
| `placeholder` | `placeholder` |                                                                                   | `string`  | `undefined` |
| `required`    | `required`    | A boolean value indicating whether the control should consider empty values valid | `boolean` | `false`     |
| `value`       | `value`       | The color                                                                         | `string`  | `undefined` |


## Events

| Event                       | Description                                             | Type                              |
| --------------------------- | ------------------------------------------------------- | --------------------------------- |
| `arcgisHubInputColorChange` | This custom event is emitted when the color is changed. | `CustomEvent<IChangeEventDetail>` |


## Dependencies

### Depends on

- calcite-popover-manager
- calcite-input
- calcite-button
- calcite-popover
- calcite-color-picker

### Graph
```mermaid
graph TD;
  arcgis-hub-input-color --> calcite-popover-manager
  arcgis-hub-input-color --> calcite-input
  arcgis-hub-input-color --> calcite-button
  arcgis-hub-input-color --> calcite-popover
  arcgis-hub-input-color --> calcite-color-picker
  calcite-input --> calcite-progress
  calcite-input --> calcite-icon
  calcite-button --> calcite-loader
  calcite-button --> calcite-icon
  calcite-popover --> calcite-action
  calcite-popover --> calcite-icon
  calcite-action --> calcite-loader
  calcite-action --> calcite-icon
  calcite-color-picker --> calcite-tab-title
  calcite-color-picker --> calcite-tab
  calcite-color-picker --> calcite-input
  calcite-color-picker --> calcite-color-picker-hex-input
  calcite-color-picker --> calcite-tabs
  calcite-color-picker --> calcite-tab-nav
  calcite-color-picker --> calcite-button
  calcite-color-picker --> calcite-color-picker-swatch
  calcite-tab-title --> calcite-icon
  calcite-color-picker-hex-input --> calcite-input
  calcite-color-picker-hex-input --> calcite-color-picker-swatch
  style arcgis-hub-input-color fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
