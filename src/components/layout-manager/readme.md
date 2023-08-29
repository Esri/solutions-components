# layout-manager



<!-- Auto Generated Below -->


## Events

| Event           | Description                           | Type                                                                              |
| --------------- | ------------------------------------- | --------------------------------------------------------------------------------- |
| `layoutChanged` | Emitted when the layout should change | `CustomEvent<ELayoutMode.GRID \| ELayoutMode.HORIZONTAL \| ELayoutMode.VERTICAL>` |


## Dependencies

### Depends on

- calcite-icon
- calcite-popover
- calcite-action
- calcite-tooltip

### Graph
```mermaid
graph TD;
  layout-manager --> calcite-icon
  layout-manager --> calcite-popover
  layout-manager --> calcite-action
  layout-manager --> calcite-tooltip
  calcite-popover --> calcite-action
  calcite-popover --> calcite-icon
  calcite-action --> calcite-loader
  calcite-action --> calcite-icon
  style layout-manager fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
