# feature-details



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute | Description                                                                                               | Type                | Default     |
| ------------------ | --------- | --------------------------------------------------------------------------------------------------------- | ------------------- | ----------- |
| `graphics`         | --        | esri/Graphic: https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html             | `Graphic[]`         | `undefined` |
| `mapView`          | --        | esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html | `MapView`           | `undefined` |
| `reportingOptions` | --        | IReportingOptions: Key options for reporting                                                              | `IReportingOptions` | `undefined` |


## Events

| Event           | Description                                              | Type                   |
| --------------- | -------------------------------------------------------- | ---------------------- |
| `loadingStatus` | Emitted on demand when like or dislike button is clicked | `CustomEvent<boolean>` |


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
- calcite-button

### Graph
```mermaid
graph TD;
  feature-details --> calcite-panel
  feature-details --> info-card
  feature-details --> calcite-button
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
  crowdsource-reporter --> feature-details
  style feature-details fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
