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

import { loadModules } from "./loadModules";

export class PopupUtils {

	/**
	 * esri/arcade: https://developers.arcgis.com/javascript/latest/api-reference/esri-arcade.html
	 */
	arcade: typeof import("esri/arcade");

  /**
   * Get the popup title that honors arcade expressions
   *
   * @returns Promise resolving with the popup title
   *
   * @protected
   */
	public async getPopupTitle(
		graphic: __esri.Graphic
	): Promise<string> {
		if (!this.arcade) {
			await this._initModules()
		}
		let attributes = {};
		for (const [key, value] of Object.entries(graphic.attributes)) {
			attributes = {
				...attributes,
				[`{${key.toUpperCase()}}`]: value
			};
		}
		const layer = graphic.layer as __esri.FeatureLayer;
		const popupTitle = this._removeTags(layer?.popupTemplate?.title as string);
		if (popupTitle.includes("{expression/expr") && layer?.popupTemplate?.expressionInfos != null) {
			for (let i = 0; i < layer.popupTemplate?.expressionInfos.length; i++) {
				const info = layer.popupTemplate.expressionInfos[i];
				const profile = {
					variables: [
						{
							name: "$feature",
							type: "feature"
						}
					]
				} as __esri.Profile;
				try {
					const arcadeExecutor = await this.arcade.createArcadeExecutor(info.expression, profile);
					const arcadeTitle = arcadeExecutor.execute({ $feature: graphic });
					if (arcadeTitle != null || arcadeTitle !== "") {
						attributes[`{expression/${info.name}}`.toUpperCase()] = arcadeTitle;
					}
				} catch {
					continue;
				}
			}
		}

		return popupTitle?.replace(/{.*?}/g, (placeholder: string) => {
			return attributes[placeholder.toUpperCase()] != null ? (attributes[placeholder.toUpperCase()] as string) : "";
		});
	}

  /**
   * Remove any tags from the title
   *
   * @returns title string without tags
   *
   * @protected
   */
	protected _removeTags(str: string): string {
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
	protected async _initModules(): Promise<void> {
		const [arcade] = await loadModules([
			"esri/arcade"
		]);
		this.arcade = arcade;
	}

}
