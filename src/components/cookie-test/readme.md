# cookie-test



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute       | Description | Type       | Default                 |
| ---------------- | --------------- | ----------- | ---------- | ----------------------- |
| `firstUseVar`    | `first-use-var` |             | `string`   | `"solutions-first-use"` |
| `measurementIds` | --              |             | `string[]` | `["G-ZSDDNE856F"]`      |
| `portal`         | --              |             | `Portal`   | `undefined`             |


## Methods

### `getInstance() => Promise<Telemetry | undefined>`



#### Returns

Type: `Promise<any>`




## Dependencies

### Depends on

- calcite-panel
- calcite-button
- calcite-link

### Graph
```mermaid
graph TD;
  cookie-test --> calcite-panel
  cookie-test --> calcite-button
  cookie-test --> calcite-link
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
  calcite-button --> calcite-loader
  calcite-button --> calcite-icon
  calcite-link --> calcite-icon
  style cookie-test fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
