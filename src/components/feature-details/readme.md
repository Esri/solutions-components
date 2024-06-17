# feature-details



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute | Description                                                                                               | Type                | Default     |
| ------------------ | --------- | --------------------------------------------------------------------------------------------------------- | ------------------- | ----------- |
| `graphics`         | --        | esri/Graphic: https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html             | `Graphic[]`         | `undefined` |
| `layerItemsHash`   | --        | ILayerItemsHash: LayerDetailsHash for each layer in the map                                               | `ILayerItemsHash`   | `undefined` |
| `mapView`          | --        | esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html | `MapView`           | `undefined` |
| `reportingOptions` | --        | IReportingOptions: Key options for reporting                                                              | `IReportingOptions` | `undefined` |


## Events

| Event                    | Description                                                       | Type                                                                         |
| ------------------------ | ----------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `commentSelect`          | Emitted on demand when comment is selected using the feature-list | `CustomEvent<Graphic>`                                                       |
| `featureSelectionChange` | Emitted on demand when the selected index changes                 | `CustomEvent<{ selectedFeature: Graphic[]; selectedFeatureIndex: number; }>` |
| `loadingStatus`          | Emitted on demand when like or dislike button is clicked          | `CustomEvent<boolean>`                                                       |


## Methods

### `back() => Promise<void>`

Go to the previous feature in the features widget

#### Returns

Type: `Promise<void>`



### `next() => Promise<void>`

Go to the next feature in the features widget

#### Returns

Type: `Promise<void>`



### `refresh(graphic?: __esri.Graphic) => Promise<void>`

Refresh the features comments which will fetch like, dislike and update the component

#### Parameters

| Name      | Type      | Description |
| --------- | --------- | ----------- |
| `graphic` | `Graphic` |             |

#### Returns

Type: `Promise<void>`

Promise that resolves when the operation is complete

### `toggleListView() => Promise<void>`

Toggle the visibility of the features list view

#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [crowdsource-reporter](../crowdsource-reporter)

### Depends on

- calcite-panel
- [info-card](../info-card)
- calcite-icon
- calcite-button
- [feature-list](../feature-list)

### Graph
```mermaid
graph TD;
  feature-details --> calcite-panel
  feature-details --> info-card
  feature-details --> calcite-icon
  feature-details --> calcite-button
  feature-details --> feature-list
  calcite-panel --> calcite-action
  calcite-panel --> calcite-action-menu
  calcite-panel --> calcite-scrim
  calcite-action --> calcite-loader
  calcite-action --> calcite-icon
  calcite-action-menu --> calcite-action
  calcite-action-menu --> calcite-popover
  calcite-popover --> calcite-action
  calcite-popover --> calcite-icon
  calcite-scrim --> calcite-loader
  info-card --> calcite-shell
  info-card --> calcite-loader
  info-card --> calcite-button
  info-card --> delete-button
  info-card --> calcite-tooltip
  info-card --> calcite-action
  info-card --> edit-card
  info-card --> calcite-alert
  info-card --> calcite-panel
  calcite-button --> calcite-loader
  calcite-button --> calcite-icon
  delete-button --> calcite-button
  delete-button --> calcite-action
  delete-button --> calcite-modal
  calcite-modal --> calcite-scrim
  calcite-modal --> calcite-icon
  edit-card --> calcite-notice
  edit-card --> calcite-loader
  calcite-notice --> calcite-icon
  calcite-alert --> calcite-icon
  calcite-alert --> calcite-chip
  calcite-chip --> calcite-icon
  feature-list --> calcite-panel
  feature-list --> calcite-loader
  feature-list --> calcite-notice
  feature-list --> calcite-list
  feature-list --> calcite-pagination
  feature-list --> calcite-list-item
  feature-list --> calcite-icon
  calcite-list --> calcite-scrim
  calcite-list --> calcite-stack
  calcite-list --> calcite-filter
  calcite-filter --> calcite-input
  calcite-input --> calcite-progress
  calcite-input --> calcite-icon
  calcite-pagination --> calcite-icon
  calcite-list-item --> calcite-icon
  calcite-list-item --> calcite-handle
  calcite-list-item --> calcite-action
  calcite-handle --> calcite-icon
  crowdsource-reporter --> feature-details
  style feature-details fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
