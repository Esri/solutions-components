# map-search



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute      | Description                                                                                               | Type        | Default     |
| -------------- | -------------- | --------------------------------------------------------------------------------------------------------- | ----------- | ----------- |
| `mapView`      | --             | esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html    | `SceneView` | `undefined` |
| `portal`       | --             | esri/portal/Portal: https://developers.arcgis.com/javascript/latest/api-reference/esri-portal-Portal.html | `Portal`    | `undefined` |
| `translations` | `translations` | Contains the translations for this component.                                                             | `any`       | `{}`        |


## Dependencies

### Used by

 - [public-notification](../public-notification)

### Depends on

- calcite-label
- calcite-input
- calcite-combobox
- calcite-combobox-item

### Graph
```mermaid
graph TD;
  map-search --> calcite-label
  map-search --> calcite-input
  map-search --> calcite-combobox
  map-search --> calcite-combobox-item
  calcite-input --> calcite-progress
  calcite-input --> calcite-icon
  calcite-combobox --> calcite-chip
  calcite-combobox --> calcite-icon
  calcite-chip --> calcite-icon
  calcite-combobox-item --> calcite-icon
  public-notification --> map-search
  style map-search fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
