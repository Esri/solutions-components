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
/**
 * Effect of the distresses on ride quality.
 *
 * L - Low. Individual bumps or settlements, or both, cause the vehicle to bounce slightly,
 * but create little discomfort.
 *
 * M - Medium. Individual bumps or settlements, or both, cause the vehicle to bounce significantly,
 * creating some discomfort.
 *
 * H - High. Individual bumps or settlements, or both, cause the vehicle to bounce excessively,
 * creating substantial discomfort, safety hazard, or high potential vehicle damage.
 *
 * @returns Promise resolving when function is done
 *
 */
export declare enum ESeverity {
  H = "H",
  M = "M",
  L = "L"
}
/**
 * Type of distress as defined by ASTM standard
 *
 */
export declare enum EDistressType {
  ALLIGATOR_CRACKING = 1,
  BLEEDING = 2,
  BLOCK_CRACKING = 3,
  BUMPS_SAGS = 4,
  CORRUGATION = 5,
  DEPRESSION = 6,
  EDGE_CRACKING = 7,
  REFLECTION_CRACKING = 8,
  LANE_SHOULDER_DROP_OFF = 9,
  LONG_TRANS_CRACKING = 10,
  PATCHING_UTIL_CUT_PATCHING = 11,
  POLISHED_AGGREGATE = 12,
  POTHOLES = 13,
  RAILROAD_CROSSING = 14,
  RUTTING = 15,
  SHOVING = 16,
  SLIPPAGE_CRACKING = 17,
  SWELL = 18,
  RAVELING = 19,
  WEATHERING = 20
}
/**
 * Values to use for multi-severity case corrections
 *
 */
export interface ICorrection {
  pci: number;
  dv: number[];
}
/**
 * Calculate the deduct value for the given distress.
 *
 * @param type expects 1-19 as a string
 * @param severity expects "H" | "M" | "L"
 * @param density the calculated percent density ralative to the total sample area
 * @param showDebugging used to control debugging messages to show the various
 * calculations a required steps along the way.
 * The main reason this is optional is that it provides no value when used within
 * Survey123 as we have nowhere to see the messages and I wasn't sure if writing to a
 * console in that context could have any negative side effects.
 *
 * @returns pipe delimited string: type|severity|roundedDeductValue|density
 */
export declare function calculateDeductValue(type: string, severity: string, density: string, showDebugging?: boolean): string;
/**
 * Calculate the pavement condition index (PCI)
 *
 * @param deductValues string of comma delimited values
 * @param showDebugging used to control debugging messages to show the various
 * calculations a required steps along the way.
 * The main reason this is optional is that it provides no value when used within
 * Survey123 as we have nowhere to see the messages and I wasn't sure if writing to a
 * console in that context could have any negative side effects.
 *
 * @returns the calculated PCI
 */
export declare function calculatePCI(deductValues: string, showDebugging?: boolean): number;
