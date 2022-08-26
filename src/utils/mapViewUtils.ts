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
import { ISelectionSet } from './interfaces';

export async function getMapLayerNames(
  mapView: __esri.MapView
): Promise<string[]> {
  let layerNames = [];
  await mapView.when(() => {
    layerNames = mapView.map.layers.toArray().map((l) => {
      return l.title;
    });
  });
  return layerNames;
}

export async function getMapLayerView(
  mapView: __esri.MapView,
  title: string
): Promise<__esri.FeatureLayerView> {
  const layer = await getMapLayer(mapView, title);
  return layer ? await mapView.whenLayerView(layer) : undefined;
}

export async function getMapLayer(
  mapView: __esri.MapView,
  title: string
): Promise<__esri.FeatureLayer> {
  let layers = [];
  await mapView.when(() => {
    layers = mapView.map.layers.toArray().filter((l) => {
      return l.title === title;
    });
  });
  return layers.length > 0 ? layers[0] : undefined;
}

export async function highlightFeatures(
  mapView: __esri.MapView,
  layer: __esri.FeatureLayerView,
  ids: number[],
  updateExtent: boolean = false
): Promise<__esri.Handle> {
  if (ids.length > 0) {
    if (updateExtent) {
      const query = layer.createQuery();
      query.objectIds = ids;
      await layer.queryExtent(query).then((result) => {
        mapView.goTo(result.extent);
      });
    }
    return layer.highlight(ids);
  } else {
    return undefined;
  }
}

export function flashSelection(
  selectionSet: ISelectionSet
): void {
  const objectIds = selectionSet.selectedIds;
  const featureFilter = {
    objectIds
  } as __esri.FeatureFilter;
  selectionSet.layerView.featureEffect = {
    filter: featureFilter,
    includedEffect: "bloom(1.3, 0.1px, 5%)",
    excludedEffect: "blur(5px) grayscale(90%) opacity(40%)"
  } as __esri.FeatureEffect;

  setTimeout(() => {
    selectionSet.layerView.featureEffect = undefined;
  }, 1300);
}
