# map-layer-picker



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute      | Description                                                                                               | Type      | Default     |
| -------------- | -------------- | --------------------------------------------------------------------------------------------------------- | --------- | ----------- |
| `mapView`      | --             | esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html    | `MapView` | `undefined` |
| `portal`       | --             | esri/portal/Portal: https://developers.arcgis.com/javascript/latest/api-reference/esri-portal-Portal.html | `Portal`  | `undefined` |
| `translations` | `translations` | Contains the translations for this component.                                                             | `any`     | `{}`        |


## Dependencies

### Used by

 - [public-notification](../public-notification)

### Depends on

- calcite-label
- calcite-combobox
- calcite-combobox-item

### Graph
```mermaid
graph TD;
  map-layer-picker --> calcite-label
  map-layer-picker --> calcite-combobox
  map-layer-picker --> calcite-combobox-item
  calcite-combobox --> calcite-chip
  calcite-combobox --> calcite-icon
  calcite-chip --> calcite-icon
  calcite-combobox-item --> calcite-icon
  public-notification --> map-layer-picker
  style map-layer-picker fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
