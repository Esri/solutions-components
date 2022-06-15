# config-map-search



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute         | Description | Type      | Default |
| --------------- | ----------------- | ----------- | --------- | ------- |
| `layers`        | --                |             | `any[]`   | `[]`    |
| `useLayerUrl`   | `use-layer-url`   |             | `boolean` | `true`  |
| `useLocatorUrl` | `use-locator-url` |             | `boolean` | `true`  |


## Methods

### `getConfig() => Promise<ISearchConfig>`



#### Returns

Type: `Promise<ISearchConfig>`




## Dependencies

### Used by

 - [config-public-notification](../config-public-notification)

### Depends on

- calcite-input-message
- calcite-tabs
- calcite-tab-nav
- calcite-tab-title
- calcite-tab
- calcite-radio-button-group
- calcite-label
- calcite-radio-button
- calcite-input
- calcite-pick-list
- calcite-pick-list-item

### Graph
```mermaid
graph TD;
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
  config-public-notification --> config-map-search
  style config-map-search fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
