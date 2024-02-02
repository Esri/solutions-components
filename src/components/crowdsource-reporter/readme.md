# crowdsource-reporter



<!-- Auto Generated Below -->


## Properties

| Property                  | Attribute                   | Description                                                                                               | Type                   | Default     |
| ------------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------- | ---------------------- | ----------- |
| `defaultWebmap`           | `default-webmap`            | string: Item ID of the web map that should be selected by default                                         | `string`               | `""`        |
| `description`             | `description`               | string: The text that will display under the title on the landing page                                    | `string`               | `undefined` |
| `enableAnonymousAccess`   | `enable-anonymous-access`   | boolean: When true the anonymous users will be allowed to submit reports and comments                     | `boolean`              | `undefined` |
| `enableAnonymousComments` | `enable-anonymous-comments` | boolean: When true the anonymous users will be allowed to submit comments                                 | `boolean`              | `undefined` |
| `enableComments`          | `enable-comments`           | boolean: When true the user will be allowed to submit comments                                            | `boolean`              | `undefined` |
| `enableHome`              | `enable-home`               | boolean: when true the home widget will be available                                                      | `boolean`              | `true`      |
| `enableLogin`             | `enable-login`              | boolean: When true the user will be provided a login page                                                 | `boolean`              | `undefined` |
| `enableNewReports`        | `enable-new-reports`        | boolean: When true the user will be allowed to submit new reports                                         | `boolean`              | `undefined` |
| `enableSearch`            | `enable-search`             | boolean: when true the search widget will be available                                                    | `boolean`              | `true`      |
| `enableZoom`              | `enable-zoom`               | boolean: when true the zoom widget will be available                                                      | `boolean`              | `true`      |
| `isMobile`                | `is-mobile`                 | boolean: When true the application will be in mobile mode, controls the mobile or desktop view            | `boolean`              | `undefined` |
| `layerId`                 | `layer-id`                  | string: Layer id of the feature from URL params                                                           | `string`               | `undefined` |
| `layers`                  | --                          | string[]: list of layer ids                                                                               | `string[]`             | `undefined` |
| `loginTitle`              | `login-title`               | string: The text that will display at the top of the landing page                                         | `string`               | `undefined` |
| `mapInfos`                | --                          | IMapInfo[]: array of map infos (name and id)                                                              | `IMapInfo[]`           | `[]`        |
| `mapView`                 | --                          | esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html | `MapView`              | `undefined` |
| `objectId`                | `object-id`                 | string: Object id of the feature from URL params                                                          | `string`               | `undefined` |
| `reportButtonText`        | `report-button-text`        | string: The word(s) to display in the reports submit button                                               | `string`               | `undefined` |
| `reportSubmittedMessage`  | `report-submitted-message`  | string: The message to display when the report has been submitted                                         | `string`               | `undefined` |
| `reportsHeader`           | `reports-header`            | string: The word(s) to display in the reports header                                                      | `string`               | `undefined` |
| `searchConfiguration`     | --                          | ISearchConfiguration: Configuration details for the Search widget                                         | `ISearchConfiguration` | `undefined` |
| `showComments`            | `show-comments`             | boolean: When true the comments from all users will be visible                                            | `boolean`              | `undefined` |
| `theme`                   | `theme`                     | theme: "light" \| "dark" theme to be used                                                                 | `"dark" \| "light"`    | `"light"`   |


## Events

| Event         | Description                                             | Type                   |
| ------------- | ------------------------------------------------------- | ---------------------- |
| `togglePanel` | Emitted when toggle panel button is clicked in reporter | `CustomEvent<boolean>` |


## Dependencies

### Depends on

- calcite-alert
- calcite-shell
- calcite-panel
- calcite-flow
- calcite-loader
- calcite-flow-item
- calcite-action
- calcite-button
- [layer-list](../layer-list)
- calcite-notice
- [create-feature](../create-feature)
- [feature-list](../feature-list)
- instant-apps-social-share
- [info-card](../info-card)

### Graph
```mermaid
graph TD;
  crowdsource-reporter --> calcite-alert
  crowdsource-reporter --> calcite-shell
  crowdsource-reporter --> calcite-panel
  crowdsource-reporter --> calcite-flow
  crowdsource-reporter --> calcite-loader
  crowdsource-reporter --> calcite-flow-item
  crowdsource-reporter --> calcite-action
  crowdsource-reporter --> calcite-button
  crowdsource-reporter --> layer-list
  crowdsource-reporter --> calcite-notice
  crowdsource-reporter --> create-feature
  crowdsource-reporter --> feature-list
  crowdsource-reporter --> instant-apps-social-share
  crowdsource-reporter --> info-card
  calcite-alert --> calcite-icon
  calcite-alert --> calcite-chip
  calcite-chip --> calcite-icon
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
  calcite-flow-item --> calcite-action
  calcite-flow-item --> calcite-panel
  calcite-button --> calcite-loader
  calcite-button --> calcite-icon
  layer-list --> calcite-loader
  layer-list --> calcite-notice
  layer-list --> calcite-list
  layer-list --> calcite-list-item
  layer-list --> calcite-icon
  calcite-notice --> calcite-icon
  calcite-list --> calcite-scrim
  calcite-list --> calcite-stack
  calcite-list --> calcite-filter
  calcite-filter --> calcite-input
  calcite-input --> calcite-progress
  calcite-input --> calcite-icon
  calcite-list-item --> calcite-icon
  calcite-list-item --> calcite-handle
  calcite-list-item --> calcite-action
  calcite-handle --> calcite-icon
  feature-list --> calcite-panel
  feature-list --> calcite-loader
  feature-list --> calcite-notice
  feature-list --> calcite-list
  feature-list --> calcite-pagination
  feature-list --> calcite-list-item
  feature-list --> calcite-icon
  calcite-pagination --> calcite-icon
  instant-apps-social-share --> calcite-popover
  instant-apps-social-share --> calcite-button
  instant-apps-social-share --> calcite-icon
  instant-apps-social-share --> calcite-action
  info-card --> calcite-shell
  info-card --> calcite-loader
  info-card --> calcite-button
  info-card --> delete-button
  info-card --> calcite-tooltip
  info-card --> calcite-action
  info-card --> edit-card
  info-card --> calcite-alert
  info-card --> calcite-panel
  delete-button --> calcite-button
  delete-button --> calcite-action
  delete-button --> calcite-modal
  calcite-modal --> calcite-scrim
  calcite-modal --> calcite-icon
  edit-card --> calcite-notice
  edit-card --> calcite-loader
  style crowdsource-reporter fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
