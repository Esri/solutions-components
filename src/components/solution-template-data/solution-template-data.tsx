/** @license
 * Copyright 2021 Esri
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { VNode } from '@esri/calcite-components/dist/types/stencil-public-runtime';
import { Component, Host, h, Listen, Prop } from '@stencil/core';
import { IOrganizationVariableItem } from '../solution-organization-variables/solution-organization-variables';
import { IVariableItem } from '../solution-variables/solution-variables';

interface ITemplateData {
  data: any,
  isJSON: boolean,
  orgVariables: IOrganizationVariableItem[],
  solVariables: IVariableItem[]
}

@Component({
  tag: 'solution-template-data',
  styleUrl: 'solution-template-data.css',
  shadow: false
})

export class SolutionTemplateData {
  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * Contains the translations for this component.
   */
  @Prop({ mutable: true }) translations: any = {
  };

  /**
   * Contains the public value for this component.
   */
  // TODO not sure why I can't set the type here to be ITemplateData
  @Prop({ mutable: true, reflect: true }) value: any = {
    data: {},
    isJSON: true,
    orgVariables: [{
      id: "id",
      title: "title",
      value: "value"
    }, {
      id: "id2",
      title: "title2",
      value: "value2"
    }, {
      id: "id3",
      title: "title3",
      value: "value3"
    }, {
      id: "id4",
      title: "title4",
      value: "value4"
    }, {
      id: "id5",
      title: "title5",
      value: "value5"
    }, {
      id: "id6",
      title: "title6",
      value: "value6"
    }],
    solVariables: [{
      id: "db1",
      title: "Dashboard 1",
      value: "{{Dashboard 1 value}}",
      dependencies: [{
        id: "db1ItemId",
        title: "Item Id",
        value: "{{db1ItemId value}}"
      }, {
        id: "db1Url",
        title: "Url",
        value: "{{db1Url value}}"
      }]
    }, {
      id: "db2",
      title: "Dashboard 2",
      value: "Dashboard 2 value",
      dependencies: [{
        id: "db2ItemId",
        title: "Item Id",
        value: "{{db2ItemId value}}"
      }, {
        id: "db2Url",
        title: "Url",
        value: "{{db2Url value}}"
      }]
    }, {
      id: "fs1",
      title: "Feature Service 1",
      value: "{{Feature Service 1 value}}",
      dependencies: [{
        id: "fs1ItemId",
        title: "Item Id",
        value: "{{fs1ItemId value}}"
      }, {
        id: "fs1Url",
        title: "Url",
        value: "{{fs1Url value}}"
      }, {
        id: "fs1Name",
        title: "Name",
        value: "{{fs1Name value}}"
      }, {
        id: "layer0",
        title: "Layer 0",
        value: "{{layer0 value}}",
        dependencies: [{
          id: "layer0Id",
          title: "Id",
          value: "{{layer0Id value}}"
        }, {
          id: "layer0Url",
          title: "Url",
          value: "{{layer0Url value}}"
        }]
      }, {
        id: "layer1",
        title: "Layer 1",
        value: "{{layer1 value}}",
        dependencies: [{
          id: "layer1Id",
          title: "Id",
          value: "{{layer1Id value}}"
        }, {
          id: "layer1Url",
          title: "Url",
          value: "{{layer1Url value}}"
        }]
      }]
    }, {
      id: "grp1",
      title: "Group 1",
      value: "{{Group 1 value}}",
      dependencies: [{
        id: "group1Id",
        title: "Group Id",
        value: "{{group1Id value}}"
      }]
    }]
  };

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  render() {
    return (
      <Host>
        <div class="solution-data-container">
          {this.renderTemplateData(this.value)}
        </div>
      </Host>
    );
  }

  renderTemplateData(data: ITemplateData): VNode {
    return data.isJSON ? this._jsonData(data) : this._resourceData(data);
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("solutionVariableSelected")
  solutionVariableSelected(event: CustomEvent): void {
    const jsonEditor = document.getElementById("json-editor-span");
    jsonEditor.innerHTML += `itemId: ${event.detail.itemId} value: ${event.detail.value}`;
  }

  @Listen("organizationVariableSelected")
  organizationVariableSelected(event: CustomEvent): void {
    const jsonEditor = document.getElementById("json-editor-span");
    jsonEditor.innerHTML += `itemId: ${event.detail.itemId} value: ${event.detail.value}`;
  }
  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Public Methods (async)
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  _jsonData(templateData: ITemplateData): any {
    return (<calcite-shell dir="ltr" theme="light">
      <calcite-shell-center-row slot="center-row" position="start" height-scale="l" width-scale="l" class="json-editor">
        <div class="solution-data-child-container">
          <span id="json-editor-span">JSON Editor goes</span>
        </div>
      </calcite-shell-center-row>
      <calcite-shell-panel slot="contextual-panel" position="start" height-scale="l" width-scale="m">
        <div class="solution-data-child-container">
          <solution-organization-variables value={templateData.orgVariables}></solution-organization-variables>
          <solution-variables value={templateData.solVariables}></solution-variables>
        </div>
      </calcite-shell-panel>
    </calcite-shell>);
  }

  _resourceData(templateData: ITemplateData): any {
    if (templateData.data) {
      console.log("S")
    }
    return (<div>This will have file download stuff</div>);
  }
}
