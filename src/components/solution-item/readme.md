# solution-item



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute      | Description | Type  | Default                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| -------------- | -------------- | ----------- | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `translations` | `translations` |             | `any` | `{     "itemDetailsTab": "Item Details",     "dataTab": "Data",     "propertiesTab": "Properties",     "groupDetailsTab": "Group Details",     "sharingTab": "Sharing",      // Item details     "itemDetails": {       "editThumbnail": "Edit Thumbnail",       "description": "Description",       "tags": "Tags",       "credits": "Credits",       "termsOfUse": "Terms of Use",       "snippetCountPattern": "{{n}} of 250"     },      "jsonEditing": {       "startEditing": "Start editing", // start modifying JSON in its editor       "search": "Search" // search within JSON editor     }   }` |
| `value`        | `value`        |             | `any` | `{}`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |


## Dependencies

### Used by

 - [solution-configuration](../solution-configuration)

### Depends on

- calcite-tabs
- calcite-tab-nav
- calcite-tab-title
- calcite-tab
- [solution-item-details](../solution-item-details)

### Graph
```mermaid
graph TD;
  solution-item --> calcite-tabs
  solution-item --> calcite-tab-nav
  solution-item --> calcite-tab-title
  solution-item --> calcite-tab
  solution-item --> solution-item-details
  calcite-tab-title --> calcite-icon
  solution-item-details --> calcite-input
  solution-item-details --> calcite-label
  calcite-input --> calcite-progress
  calcite-input --> calcite-icon
  solution-configuration --> solution-item
  style solution-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
