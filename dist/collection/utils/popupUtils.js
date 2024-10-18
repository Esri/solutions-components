/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
/** @license
 * Copyright 2022 Esri
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
import { _prepareAttributeValue } from "./downloadUtils";
import { loadModules } from "./loadModules";
export class PopupUtils {
    /**
     * esri/arcade: https://developers.arcgis.com/javascript/latest/api-reference/esri-arcade.html
     */
    arcade;
    /**
     * esri/intl: https://developers.arcgis.com/javascript/latest/api-reference/esri-intl.html
     */
    intl;
    /**
     * Get the popup title that honors arcade expressions
     * @param graphic selected graphic
     * @param map __esri.Map
     * @returns Promise resolving with the popup title
     *
     * @protected
     */
    async getPopupTitle(graphic, map) {
        if (!this.arcade) {
            await this._initModules();
        }
        let attributes = {};
        for (const [key, value] of Object.entries(graphic.attributes)) {
            attributes = {
                ...attributes,
                [`{${key.toUpperCase()}}`]: value
            };
        }
        const layer = graphic.layer;
        const popupTitle = this._removeTags(layer?.popupTemplate?.title);
        //resolve arcade expression from the popup title
        if (popupTitle.includes("{expression/expr") && layer?.popupTemplate?.expressionInfos != null) {
            for (let i = 0; i < layer.popupTemplate?.expressionInfos.length; i++) {
                const info = layer.popupTemplate.expressionInfos[i];
                //create arcade profile for popup
                const profile = this.arcade.createArcadeProfile('popup');
                try {
                    const arcadeExecutor = await this.arcade.createArcadeExecutor(info.expression, profile);
                    const arcadeTitle = await arcadeExecutor.executeAsync({ $feature: graphic, $layer: layer, $map: map });
                    if (arcadeTitle != null || arcadeTitle !== "") {
                        attributes[`{expression/${info.name}}`.toUpperCase()] = arcadeTitle;
                    }
                }
                catch (e) {
                    //log error in console to understand if the arcade expressions are failing
                    console.error(e);
                    continue;
                }
            }
        }
        //Format field values
        if (layer.popupTemplate?.fieldInfos) {
            layer.fields.forEach((field) => {
                const attributeValue = graphic.attributes[field.name];
                //get the field info from popupTemplate
                const fieldInfo = layer.popupTemplate.fieldInfos.find((fInfo) => fInfo.fieldName.toLowerCase() === field.name.toLowerCase());
                //format the attribute value
                const formattedAttributeValue = _prepareAttributeValue(attributeValue, field.type, field.domain, fieldInfo?.format, this.intl);
                attributes[`{${field.name.toUpperCase()}}`] = formattedAttributeValue ?? attributeValue;
            });
        }
        return popupTitle?.replace(/{.*?}/g, (placeholder) => {
            return attributes[placeholder.toUpperCase()] != null ? attributes[placeholder.toUpperCase()] : "";
        });
    }
    /**
     * Remove any tags from the title
     *
     * @returns title string without tags
     *
     * @protected
     */
    _removeTags(str) {
        if (str == null || str === "") {
            return "";
        }
        return str.toString().replace(/(<([^>]+)>)/gi, "");
    }
    /**
     * Load esri javascript api modules
     *
     * @returns Promise resolving when function is done
     *
     * @protected
     */
    async _initModules() {
        const [arcade, intl] = await loadModules([
            "esri/arcade",
            "esri/intl"
        ]);
        this.arcade = arcade;
        this.intl = intl;
    }
}
