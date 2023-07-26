# add-record-modal



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                          | Type      | Default |
| -------- | --------- | ------------------------------------ | --------- | ------- |
| `open`   | `open`    | When true the component is displayed | `boolean` | `false` |


## Events

| Event         | Description                           | Type                |
| ------------- | ------------------------------------- | ------------------- |
| `modalClosed` | Emitted on demand the modal is closed | `CustomEvent<void>` |
| `modalOpened` | Emitted on demand the modal is opened | `CustomEvent<void>` |


## Dependencies

### Depends on

- calcite-modal
- calcite-label
- calcite-input
- calcite-button

### Graph
```mermaid
graph TD;
  add-record-modal --> calcite-modal
  add-record-modal --> calcite-label
  add-record-modal --> calcite-input
  add-record-modal --> calcite-button
  calcite-modal --> calcite-scrim
  calcite-modal --> calcite-icon
  calcite-scrim --> calcite-loader
  calcite-input --> calcite-progress
  calcite-input --> calcite-icon
  calcite-button --> calcite-loader
  calcite-button --> calcite-icon
  style add-record-modal fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
