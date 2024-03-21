/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { l as loadModules } from './loadModules.js';

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
class PopupUtils {
    /**
     * Get the popup title that honors arcade expressions
     * @param graphic selected graphic
     * @param map __esri.Map
     * @returns Promise resolving with the popup title
     *
     * @protected
     */
    async getPopupTitle(graphic, map) {
        var _a, _b, _c;
        if (!this.arcade) {
            await this._initModules();
        }
        let attributes = {};
        for (const [key, value] of Object.entries(graphic.attributes)) {
            attributes = Object.assign(Object.assign({}, attributes), { [`{${key.toUpperCase()}}`]: value });
        }
        const layer = graphic.layer;
        const popupTitle = this._removeTags((_a = layer === null || layer === void 0 ? void 0 : layer.popupTemplate) === null || _a === void 0 ? void 0 : _a.title);
        if (popupTitle.includes("{expression/expr") && ((_b = layer === null || layer === void 0 ? void 0 : layer.popupTemplate) === null || _b === void 0 ? void 0 : _b.expressionInfos) != null) {
            for (let i = 0; i < ((_c = layer.popupTemplate) === null || _c === void 0 ? void 0 : _c.expressionInfos.length); i++) {
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
        return popupTitle === null || popupTitle === void 0 ? void 0 : popupTitle.replace(/{.*?}/g, (placeholder) => {
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
        const [arcade] = await loadModules([
            "esri/arcade"
        ]);
        this.arcade = arcade;
    }
}

export { PopupUtils as P };
