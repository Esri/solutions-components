# edit-record-modal



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                                                                                                                                                       | Type                                  | Default            |
| -------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- | ------------------ |
| `editMode`     | `edit-mode`     | "MULTI" \| "SINGLE": "SINGLE" edit mode is intended to be used to edit a single existing feature                     "MULTI" edit mode is intended to apply edits across a collection of features | `EEditMode.MULTI \| EEditMode.SINGLE` | `EEditMode.SINGLE` |
| `graphicIndex` | `graphic-index` | The index of the current graphic                                                                                                                                                                  | `number`                              | `0`                |
| `graphics`     | --              | esri/Graphic[]: https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html                                                                                                   | `Graphic[]`                           | `undefined`        |
| `mapView`      | --              | esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html                                                                                         | `MapView`                             | `undefined`        |
| `open`         | `open`          | When true the component is displayed                                                                                                                                                              | `boolean`                             | `false`            |


## Events

| Event         | Description                                | Type                |
| ------------- | ------------------------------------------ | ------------------- |
| `modalClosed` | Emitted on demand when the modal is closed | `CustomEvent<void>` |
| `modalOpened` | Emitted on demand when the modal is opened | `CustomEvent<void>` |


## Dependencies

### Used by

 - [info-card](../info-card)
 - [layer-table](../layer-table)

### Depends on

- calcite-modal
- calcite-notice
- calcite-button
- calcite-label
- calcite-input-text
- calcite-input-number
- calcite-input-date-picker
- calcite-combobox
- calcite-combobox-item

### Graph
```mermaid
graph TD;
  edit-record-modal --> calcite-modal
  edit-record-modal --> calcite-notice
  edit-record-modal --> calcite-button
  edit-record-modal --> calcite-label
  edit-record-modal --> calcite-input-text
  edit-record-modal --> calcite-input-number
  edit-record-modal --> calcite-input-date-picker
  edit-record-modal --> calcite-combobox
  edit-record-modal --> calcite-combobox-item
  calcite-modal --> calcite-scrim
  calcite-modal --> calcite-icon
  calcite-scrim --> calcite-loader
  calcite-notice --> calcite-icon
  calcite-button --> calcite-loader
  calcite-button --> calcite-icon
  calcite-input-text --> calcite-progress
  calcite-input-text --> calcite-icon
  calcite-input-number --> calcite-progress
  calcite-input-number --> calcite-icon
  calcite-input-date-picker --> calcite-input
  calcite-input-date-picker --> calcite-date-picker
  calcite-input-date-picker --> calcite-icon
  calcite-input --> calcite-progress
  calcite-input --> calcite-icon
  calcite-date-picker --> calcite-date-picker-month-header
  calcite-date-picker --> calcite-date-picker-month
  calcite-date-picker-month-header --> calcite-icon
  calcite-date-picker-month --> calcite-date-picker-day
  calcite-combobox --> calcite-chip
  calcite-combobox --> calcite-icon
  calcite-chip --> calcite-icon
  calcite-combobox-item --> calcite-icon
  info-card --> edit-record-modal
  layer-table --> edit-record-modal
  style edit-record-modal fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
