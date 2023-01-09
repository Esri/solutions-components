# map-card



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute | Description                                  | Type         | Default |
| ---------- | --------- | -------------------------------------------- | ------------ | ------- |
| `mapInfos` | --        | IMapInfo[]: array of map infos (name and id) | `IMapInfo[]` | `[]`    |


## Events

| Event       | Description                               | Type                                                      |
| ----------- | ----------------------------------------- | --------------------------------------------------------- |
| `expandMap` | Emitted when the expand button is clicked | `CustomEvent<EExpandType.COLLAPSE \| EExpandType.EXPAND>` |


## Dependencies

### Depends on

- calcite-action-bar
- calcite-action-group
- calcite-action
- calcite-icon
- calcite-tooltip
- calcite-block
- calcite-pick-list
- calcite-pick-list-item

### Graph
```mermaid
graph TD;
  map-card --> calcite-action-bar
  map-card --> calcite-action-group
  map-card --> calcite-action
  map-card --> calcite-icon
  map-card --> calcite-tooltip
  map-card --> calcite-block
  map-card --> calcite-pick-list
  map-card --> calcite-pick-list-item
  calcite-action-bar --> calcite-action-group
  calcite-action-group --> calcite-action-menu
  calcite-action-group --> calcite-action
  calcite-action-menu --> calcite-action
  calcite-action-menu --> calcite-popover
  calcite-action --> calcite-loader
  calcite-action --> calcite-icon
  calcite-popover --> calcite-action
  calcite-popover --> calcite-icon
  calcite-block --> calcite-scrim
  calcite-block --> calcite-icon
  calcite-block --> calcite-handle
  calcite-block --> calcite-loader
  calcite-block --> calcite-action-menu
  calcite-scrim --> calcite-loader
  calcite-handle --> calcite-icon
  calcite-pick-list-item --> calcite-icon
  calcite-pick-list-item --> calcite-action
  style map-card fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
