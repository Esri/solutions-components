# info-card



<!-- Auto Generated Below -->


## Properties

| Property                  | Attribute                     | Description                                                                                                        | Type        | Default     |
| ------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------ | ----------- | ----------- |
| `graphics`                | --                            | esri/Graphic: https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html                      | `Graphic[]` | `undefined` |
| `isLoading`               | `is-loading`                  | boolean: when true a loading indicator will be shown                                                               | `boolean`   | `false`     |
| `mapView`                 | --                            | esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html          | `MapView`   | `undefined` |
| `zoomAndScrollToSelected` | `zoom-and-scroll-to-selected` | boolean: When true the selected feature will zoomed to in the map and the row will be scrolled to within the table | `boolean`   | `undefined` |


## Events

| Event              | Description                                       | Type                   |
| ------------------ | ------------------------------------------------- | ---------------------- |
| `selectionChanged` | Emitted on demand when the selected index changes | `CustomEvent<Graphic>` |


## Methods

### `getSelectedFeature() => Promise<any>`

Get the current selected feature from the Features widget

#### Returns

Type: `Promise<any>`

Promise resolving with the current feature


## Dependencies

### Used by

 - [card-manager](../card-manager)

### Depends on

- calcite-shell
- calcite-loader
- calcite-button
- calcite-tooltip
- calcite-action
- [edit-card](../edit-card)
- calcite-alert

### Graph
```mermaid
graph TD;
  info-card --> calcite-shell
  info-card --> calcite-loader
  info-card --> calcite-button
  info-card --> calcite-tooltip
  info-card --> calcite-action
  info-card --> edit-card
  info-card --> calcite-alert
  calcite-button --> calcite-loader
  calcite-button --> calcite-icon
  calcite-action --> calcite-loader
  calcite-action --> calcite-icon
  edit-card --> calcite-notice
  edit-card --> calcite-loader
  calcite-notice --> calcite-icon
  calcite-alert --> calcite-icon
  calcite-alert --> calcite-chip
  calcite-chip --> calcite-icon
  card-manager --> info-card
  style info-card fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*