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

export enum ESeverity {
  H="H",
  M="M",
  L="L"
}

export enum EDistressType {
  ALLIGATOR_CRACKING=1,
  BLEEDING,
  BLOCK_CRACKING,
  BUMPS_SAGS,
  CORRUGATION,
  DEPRESSION,
  EDGE_CRACKING,
  REFLECTION_CRACKING,
  LANE_SHOULDER_DROP_OFF,
  LONG_TRANS_CRACKING,
  PATCHING_UTIL_CUT_PATCHING,
  POLISHED_AGGREGATE,
  POTHOLES,
  RAILROAD_CROSSING,
  RUTTING,
  SHOVING,
  SLIPPAGE_CRACKING,
  SWELL,
  WEATHERING_RAVELING
}

export function calcLog(
  type: EDistressType,
  severity: ESeverity,
  density: number
) {
  let calc;
  switch (type) {
    case EDistressType.ALLIGATOR_CRACKING:
      calc = _calcAlligator;
      break;
    case EDistressType.BLEEDING:
      calc = _calcBleeding;
      break;
    case EDistressType.BLOCK_CRACKING:
      calc = _calcBlockCracking;
      break;
    case EDistressType.BUMPS_SAGS:
      calc = _calcBumpsSags;
      break;
    case EDistressType.CORRUGATION:
      calc = _calcCorrugation;
      break;
    case EDistressType.DEPRESSION:
      calc = _calcDepression;
      break;
    case EDistressType.EDGE_CRACKING:
      calc = _calcEdgeCracking;
      break;
    case EDistressType.REFLECTION_CRACKING:
      calc = _calcReflectionCracking;
      break;
    case EDistressType.LANE_SHOULDER_DROP_OFF:
      calc = _calcLaneShoulderDropOff;
      break;
    case EDistressType.LONG_TRANS_CRACKING:
      calc = _calcLongTransCracking;
      break;
    case EDistressType.PATCHING_UTIL_CUT_PATCHING:
      calc = _calcPatchingUtilCutPatching;
      break;
    case EDistressType.POLISHED_AGGREGATE:
      calc = _calcPolishedAggregate;
      break;
    case EDistressType.POTHOLES:
      calc = _calcPotholes;
      break;
    case EDistressType.RAILROAD_CROSSING:
      calc = _calcRailroadCrossing;
      break;
    case EDistressType.RUTTING:
      calc = _calcRutting;
      break;
    case EDistressType.SHOVING:
      calc = _calcShoving;
      break;
    case EDistressType.SLIPPAGE_CRACKING:
      calc = _calcSlippageCracking;
      break;
    case EDistressType.SWELL:
      calc = _calcSwell;
      break;
    case EDistressType.WEATHERING_RAVELING:
      calc = _calcWeatheringReveling;
      break;
  }
  return calc(severity, density);
}

function _calcAlligator(
  severity: ESeverity,
  density: number
) {
  let calc;
  switch (severity) {
    case ESeverity.H:
      calc = `Alligator High: ${density}`;
      break;
    case ESeverity.M:
      calc = `Alligator Med: ${density}`;
      break;
    case ESeverity.L:
      calc = `Alligator Low: ${density}`;
      break;
  }
  return calc;
}

function _calcBleeding(
  severity: ESeverity,
  density: number
) {
  let calc;
  switch (severity) {
    case ESeverity.H:
      calc = `Bleeding High: ${density}`;
      break;
    case ESeverity.M:
      calc = `Bleeding Med: ${density}`;
      break;
    case ESeverity.L:
      calc = `Bleeding Low: ${density}`;
      break;
  }
  return calc;
}

function _calcBlockCracking(
  severity: ESeverity,
  density: number
) {
  let calc;
  switch (severity) {
    case ESeverity.H:
      calc = `Block Cracking High: ${density}`;
      break;
    case ESeverity.M:
      calc = `Block Cracking Med: ${density}`;
      break;
    case ESeverity.L:
      calc = `Block Cracking Low: ${density}`;
      break;
  }
  return calc;
}

function _calcBumpsSags(
  severity: ESeverity,
  density: number
) {
  let calc;
  switch (severity) {
    case ESeverity.H:
      calc = `Bumps Sags High: ${density}`;
      break;
    case ESeverity.M:
      calc = `Bumps Sags Med: ${density}`;
      break;
    case ESeverity.L:
      calc = `Bumps Sags Low: ${density}`;
      break;
  }
  return calc;
}

function _calcCorrugation(
  severity: ESeverity,
  density: number
) {
  let calc;
  switch (severity) {
    case ESeverity.H:
      calc = `Corrugation High: ${density}`;
      break;
    case ESeverity.M:
      calc = `Corrugation Med: ${density}`;
      break;
    case ESeverity.L:
      calc = `Corrugation Low: ${density}`;
      break;
  }
  return calc;
}

function _calcDepression(
  severity: ESeverity,
  density: number
) {
  let calc;
  switch (severity) {
    case ESeverity.H:
      calc = `Depression High: ${density}`;
      break;
    case ESeverity.M:
      calc = `Depression Med: ${density}`;
      break;
    case ESeverity.L:
      calc = `Depression Low: ${density}`;
      break;
  }
  return calc;
}

function _calcEdgeCracking(
  severity: ESeverity,
  density: number
) {
  let calc;
  switch (severity) {
    case ESeverity.H:
      calc = `Edge Cracking High: ${density}`;
      break;
    case ESeverity.M:
      calc = `Edge Cracking Med: ${density}`;
      break;
    case ESeverity.L:
      calc = `Edge Cracking Low: ${density}`;
      break;
  }
  return calc;
}

function _calcReflectionCracking(
  severity: ESeverity,
  density: number
) {
  let calc;
  switch (severity) {
    case ESeverity.H:
      calc = `Reflection Cracking High: ${density}`;
      break;
    case ESeverity.M:
      calc = `Reflection Cracking Med: ${density}`;
      break;
    case ESeverity.L:
      calc = `Reflection Cracking Low: ${density}`;
      break;
  }
  return calc;
}

function _calcLaneShoulderDropOff(
  severity: ESeverity,
  density: number
) {
  let calc;
  switch (severity) {
    case ESeverity.H:
      calc = `Lane Shoulder Drop Off High: ${density}`;
      break;
    case ESeverity.M:
      calc = `Lane Shoulder Drop Off Med: ${density}`;
      break;
    case ESeverity.L:
      calc = `Lane Shoulder Drop Off Low: ${density}`;
      break;
  }
  return calc;
}

function _calcLongTransCracking(
  severity: ESeverity,
  density: number
) {
  let calc;
  switch (severity) {
    case ESeverity.H:
      calc = `Long Trans Cracking High: ${density}`;
      break;
    case ESeverity.M:
      calc = `Long Trans Cracking Med: ${density}`;
      break;
    case ESeverity.L:
      calc = `Long Trans Cracking Low: ${density}`;
      break;
  }
  return calc;
}

function _calcPatchingUtilCutPatching(
  severity: ESeverity,
  density: number
) {
  let calc;
  switch (severity) {
    case ESeverity.H:
      calc = `Patching Util Cut Patching High: ${density}`;
      break;
    case ESeverity.M:
      calc = `Patching Util Cut Patching Med: ${density}`;
      break;
    case ESeverity.L:
      calc = `Patching Util Cut Patching Low: ${density}`;
      break;
  }
  return calc;
}

function _calcPolishedAggregate(
  severity: ESeverity,
  density: number
) {
  let calc;
  switch (severity) {
    case ESeverity.H:
      calc = `Polished Aggregate High: ${density}`;
      break;
    case ESeverity.M:
      calc = `Polished Aggregate Med: ${density}`;
      break;
    case ESeverity.L:
      calc = `Polished Aggregate Low: ${density}`;
      break;
  }
  return calc;
}

function _calcPotholes(
  severity: ESeverity,
  density: number
) {
  let calc;
  switch (severity) {
    case ESeverity.H:
      calc = `Potholes High: ${density}`;
      break;
    case ESeverity.M:
      calc = `Potholes Med: ${density}`;
      break;
    case ESeverity.L:
      calc = `Potholes Low: ${density}`;
      break;
  }
  return calc;
}

function _calcRailroadCrossing(
  severity: ESeverity,
  density: number
) {
  let calc;
  switch (severity) {
    case ESeverity.H:
      calc = `Railroad Crossing High: ${density}`;
      break;
    case ESeverity.M:
      calc = `Railroad Crossing Med: ${density}`;
      break;
    case ESeverity.L:
      calc = `Railroad Crossing Low: ${density}`;
      break;
  }
  return calc;
}

function _calcRutting(
  severity: ESeverity,
  density: number
) {
  let calc;
  switch (severity) {
    case ESeverity.H:
      calc = `Rutting High: ${density}`;
      break;
    case ESeverity.M:
      calc = `Rutting Med: ${density}`;
      break;
    case ESeverity.L:
      calc = `Rutting Low: ${density}`;
      break;
  }
  return calc;
}

function _calcShoving(
  severity: ESeverity,
  density: number
) {
  let calc;
  switch (severity) {
    case ESeverity.H:
      calc = `Shoving High: ${density}`;
      break;
    case ESeverity.M:
      calc = `Shoving Med: ${density}`;
      break;
    case ESeverity.L:
      calc = `Shoving Low: ${density}`;
      break;
  }
  return calc;
}

function _calcSlippageCracking(
  severity: ESeverity,
  density: number
) {
  let calc;
  switch (severity) {
    case ESeverity.H:
      calc = `Slippage Cracking High: ${density}`;
      break;
    case ESeverity.M:
      calc = `Slippage Cracking Med: ${density}`;
      break;
    case ESeverity.L:
      calc = `Slippage Cracking Low: ${density}`;
      break;
  }
  return calc;
}

function _calcSwell(
  severity: ESeverity,
  density: number
) {
  let calc;
  switch (severity) {
    case ESeverity.H:
      calc = `Swell High: ${density}`;
      break;
    case ESeverity.M:
      calc = `Swell Med: ${density}`;
      break;
    case ESeverity.L:
      calc = `Swell Low: ${density}`;
      break;
  }
  return calc;
}

function _calcWeatheringReveling(
  severity: ESeverity,
  density: number
) {
  let calc;
  switch (severity) {
    case ESeverity.H:
      calc = `Weathering Reveling High: ${density}`;
      break;
    case ESeverity.M:
      calc = `Weathering Reveling Med: ${density}`;
      break;
    case ESeverity.L:
      calc = `Weathering Reveling Low: ${density}`;
      break;
  }
  return calc;
}
