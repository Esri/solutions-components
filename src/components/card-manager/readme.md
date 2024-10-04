# card-manager



<!-- Auto Generated Below -->


## Properties

| Property                  | Attribute                     | Description                                                                                                                 | Type           | Default     |
| ------------------------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------- | -------------- | ----------- |
| `customInfoText`          | `custom-info-text`            | string: custom notice text to display                                                                                       | `string`       | `undefined` |
| `enableCreateFeatures`    | `enable-create-features`      | boolean: when true the users can have the option to create features                                                         | `boolean`      | `true`      |
| `enableEditGeometry`      | `enable-edit-geometry`        | When true the geometry of the current feature will be editable                                                              | `boolean`      | `false`     |
| `isMobile`                | `is-mobile`                   | When true the component will render an optimized view for mobile devices                                                    | `boolean`      | `undefined` |
| `layer`                   | --                            | esri/views/layers/FeatureLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html | `FeatureLayer` | `undefined` |
| `mapView`                 | --                            | esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html                   | `MapView`      | `undefined` |
| `selectedFeaturesIds`     | --                            | A list of ids that are currently selected                                                                                   | `number[]`     | `undefined` |
| `selectingFeatureFromMap` | `selecting-feature-from-map`  | boolean: When select feature from map message will shown                                                                    | `boolean`      | `undefined` |
| `zoomAndScrollToSelected` | `zoom-and-scroll-to-selected` | boolean: When true the selected feature will zoomed to in the map and the row will be scrolled to within the table          | `boolean`      | `undefined` |


## Events

| Event                      | Description                            | Type                |
| -------------------------- | -------------------------------------- | ------------------- |
| `backFromCreateWorkFlow`   | Emits when back from create work flow  | `CustomEvent<void>` |
| `createWorkFlowStarted`    | Emits when create work flow started    | `CustomEvent<void>` |
| `featureOrRecordSubmitted` | Emits when feature/record is submitted | `CustomEvent<void>` |


## Dependencies

### Used by

 - [crowdsource-manager](../crowdsource-manager)

### Depends on

- calcite-shell
- [info-card](../info-card)
- calcite-flow-item
- calcite-panel
- calcite-notice
- calcite-button
- calcite-action
- [create-feature](../create-feature)

### Graph
```mermaid
graph TD;
  card-manager --> calcite-shell
  card-manager --> info-card
  card-manager --> calcite-flow-item
  card-manager --> calcite-panel
  card-manager --> calcite-notice
  card-manager --> calcite-button
  card-manager --> calcite-action
  card-manager --> create-feature
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
  delete-button --> calcite-tooltip
  delete-button --> calcite-modal
  calcite-action --> calcite-loader
  calcite-action --> calcite-icon
  calcite-modal --> calcite-scrim
  calcite-modal --> calcite-icon
  calcite-scrim --> calcite-loader
  edit-card --> calcite-notice
  edit-card --> calcite-loader
  calcite-notice --> calcite-icon
  calcite-alert --> calcite-icon
  calcite-alert --> calcite-chip
  calcite-chip --> calcite-icon
  calcite-panel --> calcite-action
  calcite-panel --> calcite-action-menu
  calcite-panel --> calcite-scrim
  calcite-action-menu --> calcite-action
  calcite-action-menu --> calcite-popover
  calcite-popover --> calcite-action
  calcite-popover --> calcite-icon
  calcite-flow-item --> calcite-action
  calcite-flow-item --> calcite-panel
  create-feature --> calcite-notice
  create-feature --> calcite-loader
  crowdsource-manager --> card-manager
  style card-manager fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
