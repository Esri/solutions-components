# config-public-notification



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute      | Description                                                                                            | Type       | Default     |
| -------------- | -------------- | ------------------------------------------------------------------------------------------------------ | ---------- | ----------- |
| `isOpen`       | `is-open`      |                                                                                                        | `boolean`  | `false`     |
| `layerNames`   | --             |                                                                                                        | `string[]` | `[]`        |
| `mapView`      | --             | esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html | `MapView`  | `undefined` |
| `translations` | `translations` | Contains the translations for this component.                                                          | `any`      | `{}`        |


## Events

| Event         | Description | Type               |
| ------------- | ----------- | ------------------ |
| `configSaved` |             | `CustomEvent<any>` |


## Dependencies

### Depends on

- calcite-modal
- [config-map-search](../config-map-search)
- calcite-button

### Graph
```mermaid
graph TD;
  config-public-notification --> calcite-modal
  config-public-notification --> config-map-search
  config-public-notification --> calcite-button
  calcite-modal --> calcite-scrim
  calcite-modal --> calcite-icon
  calcite-scrim --> calcite-loader
  config-map-search --> calcite-input-message
  config-map-search --> calcite-tabs
  config-map-search --> calcite-tab-nav
  config-map-search --> calcite-tab-title
  config-map-search --> calcite-tab
  config-map-search --> calcite-radio-button-group
  config-map-search --> calcite-label
  config-map-search --> calcite-radio-button
  config-map-search --> calcite-input
  config-map-search --> calcite-pick-list
  config-map-search --> calcite-pick-list-item
  calcite-input-message --> calcite-icon
  calcite-tab-title --> calcite-icon
  calcite-input --> calcite-progress
  calcite-input --> calcite-icon
  calcite-pick-list-item --> calcite-icon
  calcite-pick-list-item --> calcite-action
  calcite-action --> calcite-loader
  calcite-action --> calcite-icon
  calcite-button --> calcite-loader
  calcite-button --> calcite-icon
  style config-public-notification fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
