# solution-item



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute      | Description                                   | Type  | Default                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| -------------- | -------------- | --------------------------------------------- | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `translations` | `translations` | Contains the translations for this component. | `any` | `{     "itemDetailsTab": "Item Details",     "dataTab": "Data",     "propertiesTab": "Properties",     "groupDetailsTab": "Group Details",     "sharingTab": "Sharing",      // Item details     "itemDetails": {       "editThumbnail": "Edit Thumbnail",       "description": "Description",       "tags": "Tags",       "credits": "Credits",       "termsOfUse": "Terms of Use",       "snippetCountPattern": "{{n}} of 250"     },      "jsonEditing": {       "startEditing": "Start editing", // start modifying JSON in its editor       "search": "Search" // search within JSON editor     }   }` |
| `value`        | `value`        | Contains the public value for this component. | `any` | `{}`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |


## Dependencies

### Used by

 - [solution-configuration](../solution-configuration)

### Depends on

- calcite-tabs
- calcite-tab-nav
- calcite-tab-title
- calcite-tab
- [solution-item-details](../solution-item-details)
- [solution-template-data](../solution-template-data)

### Graph
```mermaid
graph TD;
  solution-item --> calcite-tabs
  solution-item --> calcite-tab-nav
  solution-item --> calcite-tab-title
  solution-item --> calcite-tab
  solution-item --> solution-item-details
  solution-item --> solution-template-data
  calcite-tab-title --> calcite-icon
  solution-item-details --> calcite-input
  solution-item-details --> calcite-label
  calcite-input --> calcite-progress
  calcite-input --> calcite-icon
  solution-template-data --> calcite-shell
  solution-template-data --> calcite-shell-center-row
  solution-template-data --> calcite-shell-panel
  solution-template-data --> solution-organization-variables
  solution-template-data --> solution-variables
  solution-organization-variables --> calcite-label
  solution-organization-variables --> calcite-tree-item
  calcite-tree-item --> calcite-icon
  solution-variables --> calcite-label
  solution-variables --> calcite-tree-item
  solution-variables --> calcite-tree
  solution-configuration --> solution-item
  style solution-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
