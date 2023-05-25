# map-search



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute | Description                                                                                            | Type                   | Default     |
| --------------------- | --------- | ------------------------------------------------------------------------------------------------------ | ---------------------- | ----------- |
| `mapView`             | --        | esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html | `MapView`              | `undefined` |
| `searchConfiguration` | --        | ISearchConfiguration: Configuration details for the Search widget                                      | `ISearchConfiguration` | `undefined` |


## Events

| Event          | Description                                                    | Type                         |
| -------------- | -------------------------------------------------------------- | ---------------------------- |
| `searchChange` | Emitted on demand when the status of the search widget changes | `CustomEvent<ISearchResult>` |


## Methods

### `clear() => Promise<void>`

Clears the state of the search widget

#### Returns

Type: `Promise<void>`

Promise that resolves when the operation is complete


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
