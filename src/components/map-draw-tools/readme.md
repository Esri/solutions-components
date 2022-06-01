# map-draw-tools



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute      | Description                                                                                               | Type            | Default     |
| --------------- | -------------- | --------------------------------------------------------------------------------------------------------- | --------------- | ----------- |
| `graphicsLayer` | --             |                                                                                                           | `GraphicsLayer` | `undefined` |
| `mapView`       | --             | esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html    | `MapView`       | `undefined` |
| `portal`        | --             | esri/portal/Portal: https://developers.arcgis.com/javascript/latest/api-reference/esri-portal-Portal.html | `Portal`        | `undefined` |
| `translations`  | `translations` | Contains the translations for this component.                                                             | `any`           | `{}`        |


## Dependencies

### Used by

 - [public-notification](../public-notification)

### Depends on

- calcite-button

### Graph
```mermaid
graph TD;
  map-draw-tools --> calcite-button
  calcite-button --> calcite-loader
  calcite-button --> calcite-icon
  public-notification --> map-draw-tools
  style map-draw-tools fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
