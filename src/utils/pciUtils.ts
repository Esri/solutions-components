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
 * @protected
 */
export enum ESeverity {
  H = "H",
  M = "M",
  L = "L"
}

/**
 * Type of distress as defined by ASTM standard
 *
 * @protected
 */
export enum EDistressType {
  ALLIGATOR_CRACKING = 1,
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

/**
 * Calculate the deduct value for the given distress.
 *
 * @param type expects 1-19 as a string
 * @param severity expects "H" | "M" | "L"
 * @param density the cacluated percent density ralative to the total sample area
 * @param showDebugging used to control debugging messages to show the various
 * calculations a required steps along the way.
 * The main reason this is optional is that it provides no value when used within
 * Survey123 as we have nowhere to see the messages and I wasn't sure if writing to a
 * console in that context could have any negative side effects.
 *
 * @protected
 */
export function calculateDeductValue(
  type: string,
  severity: string,
  density: string,
  showDebugging = false
): number {
  // When called from survey123 we will get the args as strings
  // not sure if they could be numbers so a little extra conversion to make sure with the density

  // type: EDistressType
  const _type = parseInt(type);
  // severity: ESeverity
  const _severity = ESeverity[severity];
  // density: number
  const _density = parseFloat(density.toString());
  // showDebugging: boolean
  const _showDebugging = showDebugging === true || showDebugging.toString().toLowerCase() === "true";

  let calc;
  switch (_type) {
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

  const dv = calc(_severity, Math.log10(_density));
  const roundedDV = _round(dv);
  if (_showDebugging) {
    console.log(`Deduct value: ${dv}`);
    console.log(`Rounded deduct value: ${roundedDV}`);
  }
  return roundedDV;
}

/**
 * Calculate the pavement condition index (PCI)
 *
 * @param deductValues string of comma delimited deduct value numbers
 * @param numSeverities expects "1" | "2" | "3" represents the number of severities for
 * a single distress type
 * @param showDebugging used to control debugging messages to show the various
 * calculations a required steps along the way.
 * The main reason this is optional is that it provides no value when used within
 * Survey123 as we have nowhere to see the messages and I wasn't sure if writing to a
 * console in that context could have any negative side effects.
 *
 * @protected
 */
export function calculatePCI(
  deductValues: string,
  numSeverities: string,
  showDebugging = false
): number {
  // When called from survey123 we will get the args as strings
  // not sure if they could be numbers so a little extra conversion to make sure with the density

  // deductValues: number[]
  let _deductValues = deductValues.split(",").map((dv) => parseFloat(dv.toString()));
  // numSeverities: number
  const _numSeverities = parseInt(numSeverities);
  // showDebugging: boolean
  const _showDebugging = showDebugging === true || showDebugging.toString().toLowerCase() === "true";

  let pci = 0;
  // filter out non-numbers
  _deductValues = _deductValues.filter(dv => Math.abs(dv) > 0);
  if (_deductValues.length > 0) {
    const maxCDV = _getMaxCDV(_deductValues, _showDebugging);
    if (_numSeverities === 1) {
      pci = 100 - _round(maxCDV);
    } else if (_numSeverities === 2) {

    } else if (_numSeverities === 3) {

    }
  }
  return pci;
}

/**
 * Executes the polynomial equation using the provided values and density.
 * In the ASTM standard this is the step represented by finding the values
 * on the plotted graphs.
 *
 * @returns the calculated deduct value
 */
function _calc(
  density: number,
  vals: number[]
): number {
  return vals.reduce((prev, cur, i) => {
    return prev += i === 0 ? cur :
      i === 1 ? (cur * density) :
        (cur * Math.pow(density, i));
  }, 0);
}

/**
 * Round to the nerest decimal in the 10ths place
 */
function _round(
  v: number
): number {
  return Math.round(v * 10) / 10;
}

/**
 * Execute the deduct value calculation for the distress type
 *
 * @param severity The severity of the distress type
 * @param density percent density of the distress type
 *
 * @returns the calculated deduct value
 */
function _calcAlligator(
  severity: ESeverity,
  density: number
): number {
  const vals = severity === ESeverity.H ? [30.71, 29.22, 9.407, -6.981, -2.158, 3.047, -0.6578] :
    severity === ESeverity.M ? [21.62, 21.32, 5.194, -1.343, 0.2341] :
      [11.31, 16.05, 7.572, -1.471];

  return _calc(density, vals);
}

/**
 * Execute the deduct value calculation for the distress type
 *
 * @param severity The severity of the distress type
 * @param density percent density of the distress type
 *
 * @returns the calculated deduct value
 */
function _calcBleeding(
  severity: ESeverity,
  density: number
): number {
  const vals = severity === ESeverity.H ? [5.343, 6.927, 7.926, 4.265, -0.7582] :
    severity === ESeverity.M ? [2.38, 5.483, 4.128, 0.8366, 0.03659, 0.1052] :
      [0.01391, 0.5079, 1.576, 1.191, 0.1329, 0.03823];

  return _calc(density, vals);
}

/**
 * Execute the deduct value calculation for the distress type
 *
 * @param severity The severity of the distress type
 * @param density percent density of the distress type
 *
 * @returns the calculated deduct value
 */
function _calcBlockCracking(
  severity: ESeverity,
  density: number
): number {
  const vals = severity === ESeverity.H ? [7.926, 11.93, 8.826, 3.432, -1.382] :
    severity === ESeverity.M ? [2.587, 9.142, 6.647, -0.455, -0.2439, 0.1107] :
      [0.646, 4.002, 4.2, 0.4987, -0.06269];

  return _calc(density, vals);
}

/**
 * Execute the deduct value calculation for the distress type
 *
 * @param severity The severity of the distress type
 * @param density percent density of the distress type
 *
 * @returns the calculated deduct value
 */
function _calcBumpsSags(
  severity: ESeverity,
  density: number
): number {
  const vals = severity === ESeverity.H ? [52.77, 38.07, 8.964, -0.4148, -1.589, 2.478] :
    severity === ESeverity.M ? [24.66, 27.86, 15.73, 3.295, -5.27, 5.921, 7.959] :
      [8.768, 13.79, 7.064, 7.455, 6.041, -1.739, -1.371];

  return _calc(density, vals);
}

/**
 * Execute the deduct value calculation for the distress type
 *
 * @param severity The severity of the distress type
 * @param density percent density of the distress type
 *
 * @returns the calculated deduct value
 */
function _calcCorrugation(
  severity: ESeverity,
  density: number
): number {
  const vals = severity === ESeverity.H ? [34.21, 21.59, 1.863, 6.1410, -0.687, -1.885, 0.4916] :
    severity === ESeverity.M ? [15.78, 19.69, 6.276, -2.124, 0.5868, 0.06045] :
      [2.173, 5.609, 5.976, -0.7348, -0.2172, 1.494, -0.5659];

  return _calc(density, vals);
}

/**
 * Execute the deduct value calculation for the distress type
 *
 * @param severity The severity of the distress type
 * @param density percent density of the distress type
 *
 * @returns the calculated deduct value
 */
function _calcDepression(
  severity: ESeverity,
  density: number
): number {
  const vals = severity === ESeverity.H ? [17.84, 5.904, 9.406, 18.28, -2.753, -7.798, 2.402] :
    severity === ESeverity.M ? [8.471, 3.171, 10.25, 12.2, -0.9687, -4.601, 1.079] :
      [4.836, -0.7572, 4.786, 12.39, 1.233, -4.871, 0.9749];

  return _calc(density, vals);
}

/**
 * Execute the deduct value calculation for the distress type
 *
 * @param severity The severity of the distress type
 * @param density percent density of the distress type
 *
 * @returns the calculated deduct value
 */
function _calcEdgeCracking(
  severity: ESeverity,
  density: number
): number {
  const vals = severity === ESeverity.H ? [14.99, 13.5, 10.62, 5.15, -1.792, -2.826] :
    severity === ESeverity.M ? [9.177, 10.26, 5.704, -0.6812, -0.8588, 0.2123] :
      [3.049, 4.802, 4.058, -0.3556, -1.55, 1.02];

  return _calc(density, vals);
}

/**
 * Execute the deduct value calculation for the distress type
 *
 * @param severity The severity of the distress type
 * @param density percent density of the distress type
 *
 * @returns the calculated deduct value
 */
function _calcReflectionCracking(
  severity: ESeverity,
  density: number
): number {
  const vals = severity === ESeverity.H ? [14.99, 17.21, 27.63, 31.13, -20.94, -18.82, 9.985] :
    severity === ESeverity.M ? [9.9193, 10.88, 8.073, 14.8, -3.792, -9.583, 3.651] :
      [2.356, 6.664, 3.717, -1.393, 1.94, 1.785, -0.9707];

  return _calc(density, vals);
}

/**
 * Execute the deduct value calculation for the distress type
 *
 * @param severity The severity of the distress type
 * @param density percent density of the distress type
 *
 * @returns the calculated deduct value
 */
function _calcLaneShoulderDropOff(
  severity: ESeverity,
  density: number
): number {
  const vals = severity === ESeverity.H ? [7.549, 6.907, 7.284, 9.304, 2.064] :
    severity === ESeverity.M ? [4.02, 1.744, 14.36, 15.92, -40.22, 23.6] :
      [2.004, 1.065, 9.706, 11.75, -27.52, 15.04];

  return _calc(density, vals);
}

/**
 * Execute the deduct value calculation for the distress type
 *
 * @param severity The severity of the distress type
 * @param density percent density of the distress type
 *
 * @returns the calculated deduct value
 */
function _calcLongTransCracking(
  severity: ESeverity,
  density: number
): number {
  const vals = severity === ESeverity.H ? [19.56, 24.06, 12.12, 9.336, 1.532, -4.396] :
    severity === ESeverity.M ? [9.751, 15.53, 4.719, 1.369, 1.206, -1.164] :
      [2.347, 9.074, 8.424, -1.338, -1.873, 1.144];

  return _calc(density, vals);
}

/**
 * Execute the deduct value calculation for the distress type
 *
 * @param severity The severity of the distress type
 * @param density percent density of the distress type
 *
 * @returns the calculated deduct value
 */
function _calcPatchingUtilCutPatching(
  severity: ESeverity,
  density: number
): number {
  const vals = severity === ESeverity.H ? [20.15, 16.55, 5.415, 10.77, 3.257, -4.502] :
    severity === ESeverity.M ? [10.28, 12.71, 6.174, 1.928, 0.6923, -0.4673] :
      [2.523, 6.892, 5.702, 2.407, 0.2185, -0.8722];

  return _calc(density, vals);
}

/**
 * Execute the deduct value calculation for the distress type
 *
 * @param severity The severity of the distress type
 * @param density percent density of the distress type
 *
 * @returns the calculated deduct value
 */
function _calcPolishedAggregate(
  severity: ESeverity,
  density: number
): number {
  const vals = severity === "H" || severity === "M" || severity === "L" ?
    [3.417, -26.82, 71.15, -76.22, 38.52, -6.904] : [];
  return _calc(density, vals);
}

/**
 * Execute the deduct value calculation for the distress type
 *
 * @param severity The severity of the distress type
 * @param density percent density of the distress type
 *
 * @returns the calculated deduct value
 */
function _calcPotholes(
  severity: ESeverity,
  density: number
): number {
  const vals = severity === ESeverity.H ? [110.7, 60.66, 2.378, -2.664] :
    severity === ESeverity.M ? [90.47, 60.41, -0.1123, -4.746] :
      [58.19, 40.53, 2.884, -1.443, 0.1195];

  return _calc(density, vals);
}

/**
 * Execute the deduct value calculation for the distress type
 *
 * @param severity The severity of the distress type
 * @param density percent density of the distress type
 *
 * @returns the calculated deduct value
 */
function _calcRailroadCrossing(
  severity: ESeverity,
  density: number
): number {
  const vals = severity === ESeverity.H ? [20, 38.64, -62.82, 193.6, -162.7, 41.22] :
    severity === ESeverity.M ? [6.994, 23.47, -52.3, 167.3, -143.6, 37.64] :
      [1.998, -0.7488, 13.8, -0.7917, -1.981];

  return _calc(density, vals);
}

/**
 * Execute the deduct value calculation for the distress type
 *
 * @param severity The severity of the distress type
 * @param density percent density of the distress type
 *
 * @returns the calculated deduct value
 */
function _calcRutting(
  severity: ESeverity,
  density: number
): number {
  // TODO update after I hear back from Ryan -0.5325 vs -2.286
  const vals = severity === ESeverity.H ? [27.61, 25.19, 8.557, 1.65, -2.2030] :
    severity === ESeverity.M ? [18.47, 20.77, 6.617, -1.13, -2.286] :
      [8.833, 14.84, 3.129, 0.1451, 2.438, -1.279];

  return _calc(density, vals);
}

/**
 * Execute the deduct value calculation for the distress type
 *
 * @param severity The severity of the distress type
 * @param density percent density of the distress type
 *
 * @returns the calculated deduct value
 */
function _calcShoving(
  severity: ESeverity,
  density: number
): number {
  const vals = severity === ESeverity.H ? [18.7, 20.17, 10.3, 4.694, 1.331, -2.61] :
    severity === ESeverity.M ? [10.39, 14.78, 5.488, 4.001, 3.23, -2.387] :
      [4.002, 10.66, 6.332, -0.5226, -0.1923];

  return _calc(density, vals);
}

/**
 * Execute the deduct value calculation for the distress type
 *
 * @param severity The severity of the distress type
 * @param density percent density of the distress type
 *
 * @returns the calculated deduct value
 */
function _calcSlippageCracking(
  severity: ESeverity,
  density: number
): number {
  const vals = severity === ESeverity.H ? [19.73, 32.21, 25.87, -2.871, -10.55, 1.496, 0.7393] :
    severity === ESeverity.M ? [11.38, 18.55, 18.38, 1.628, -7.596, 0.5841, 0.5946] :
      [5.144, 12.95, 11.95, -0.833, -2.995, 1.325, -0.2113];

  return _calc(density, vals);
}

/**
 * Execute the deduct value calculation for the distress type
 *
 * @param severity The severity of the distress type
 * @param density percent density of the distress type
 *
 * @returns the calculated deduct value
 */
function _calcSwell(
  severity: ESeverity,
  density: number
): number {
  const vals = severity === ESeverity.H ? [34, 16.84, -23.09, 41.17, -14.84] :
    severity === ESeverity.M ? [12, 15.67, 20.59, -28.33, 21, -5.508] :
      [1.995, 11.9, -12.83, 16.74, -5.361];

  return _calc(density, vals);
}

/**
 * Execute the deduct value calculation for the distress type
 *
 * @param severity The severity of the distress type
 * @param density percent density of the distress type
 *
 * @returns the calculated deduct value
 */
function _calcWeatheringReveling(
  severity: ESeverity,
  density: number
): number {
  const vals = severity === ESeverity.H ? [16.67, 10.94, 5.897, 13.38, -0.2589, -6.328, 1.806] :
    severity === ESeverity.M ? [8.335, 4.022, 1.032, 6.267, 1.154, -3.004, 0.7874] :
      [1.761, 0.3251, -1.586, 5.783, 1.365, -3.576, 1.05];

  return _calc(density, vals);
}

/**
 * Determine maximum Corrected Deduct Value (CDV) iteratively
 *
 * @param deductValues The calculated deduct values that will be used to determine max CDV
 * @param showDebugging used to optionally show debugging messages
 *
 * @returns the max CDV value
 */
function _getMaxCDV(
  deductValues: number[],
  showDebugging: boolean
): number {
  let maxCDV;
  // If none or only one individual deduct value is greater
  // than two, the total value is used in place of the maximum CD
  const valuesGreaterThan2 = deductValues.filter(deductValue => deductValue > 2);
  if (valuesGreaterThan2.length <= 1) {
    maxCDV = valuesGreaterThan2.reduce((prev, cur) => {
      prev += cur;
      return prev;
    }, 0);
    if (showDebugging) {
      console.log("If none or only one individual deduct value is greater");
      console.log("than two, the total value is used in place of the maximum CD");
      console.log(`Max CDV: ${maxCDV}`);
    }
  } else {
    // sort in descending order (section 9.5.2 in ASTM doc)
    const sortedDVs = deductValues.sort((a, b) => b - a);

    // Determine the allowable number of deducts, m (section 9.5.3 in ASTM doc)
    const highestDV = sortedDVs[0];
    // m = allowable number of deducts including fractions (must be less than or equal to ten)
    const m = 1 + (9/98) * (100 - highestDV);

    if (showDebugging) {
      console.log(`Deduct values sorted in descending order: ${sortedDVs}`);
      console.log(`Highest deduct value: ${highestDV}`);
      console.log(`Allowable number of deducts including fractions: ${m}`);
    }

    // TODO they mention (must be less than or equal to ten) but don't say what happens if its over
    if (m <= 10) {
      const vals = _reduceDeductValues(sortedDVs, m);

      if (showDebugging) {
        console.log(`Reduce deduct values to the m largest including the fractional part: ${vals}`);
      }

      // iteratively determined cdv values
      const cdvs = _getCDVs(vals, showDebugging);
      maxCDV = Math.max(...cdvs);

      if (showDebugging) {
        console.log(`Max CDV: ${maxCDV}`);
      }
    } else {
      if (showDebugging) {
        console.log("Allowable number of deducts including fractions (must be less than or equal to ten)");
      }
    }
  }

  return maxCDV;
}

/**
 * Reduce deduct values to the m largest including the fractional part
 *
 * @param sortedDVs individual deduct values in descending order
 * @param m allowable number of deducts (9.5.3 in ASTM standard)
 *
 * @returns updated deduct values
 */
function _reduceDeductValues(
  sortedDVs: number[],
  m: number
): number[] {
  const fractionalPart = m - Math.floor(m);
  // If less than m deduct values are available, all of the deduct values are used
  return sortedDVs.length < m ? sortedDVs :
    sortedDVs.reduce((prev, cur, i) => {
      if (i + 1 < m) {
        prev.push(cur);
      } else if (fractionalPart > 0) {
        prev.push(_round(cur * fractionalPart));
      }
      return prev;
    }, []);
}

/**
 * Reduce the smallest individual deduct value greater to 2.0 and repeat
 *
 * @param vals the list of deduct values
 * @param showDebugging optionally show debugging messages
 *
 * @returns array of CDV values
 */
function _getCDVs(
  vals: number[],
  showDebugging: boolean
): number[] {
  let len = vals.length;

  const cdvs = [];
  while (len >= 1) {
    if (showDebugging) {
      console.log(`vals: ${vals}`);
    }
    cdvs.push(_getCDV(vals, showDebugging));
    len -= 1;
    vals.splice(len, 1, 2);
  }
  return cdvs;
}

/**
 * Determine the total and max number deducts higher than two and calculate the CDV
 *
 * @param vals the list of deduct values
 * @param showDebugging optionally show debugging messages
 *
 * @returns the calculated CDV
 */
function _getCDV(
  vals: number[],
  showDebugging: boolean
): number {
  // section 9.5.5.1 in ASTM doc
  const totalDV = vals.reduce((prev, cur) => prev += cur, 0);

  // section 9.5.5.2 in ASTM doc
  // the number of deducts with a value greater than 2.0
  const q = vals.reduce((prev, cur) => cur > 2 ? prev + 1 : prev, 0);

  // section 9.5.5.3 in ASTM doc
  return _calcCDV(totalDV, q, showDebugging);
}

/**
 * Determine the total and max number deducts higher than two and calculate the CDV
 *
 * @param total the sum of all deduct values
 * @param q the number of deducts with a value greater than 2.0
 * @param showDebugging optionally show debugging messages
 *
 * @returns the calculated CDV
 */
function _calcCDV(
  total: number,
  q: number,
  showDebugging: boolean
): number {
  // Determine the CDV from total deduct value and q
  const vals2 = {
    7: [-9.482, 0.6045, 0.0003563, -5.448e-06],
    6: [-8.165, 0.5724, 0.0004266, -4.254e-06],
    5: [-7.932, 0.6091, 0.0003464, -4.265e-06],
    4: [-6.78, 0.6301, 0.0007376, -6.357e-06],
    3: [-5.015, 0.7546, -0.00043, -3.075e-06],
    2: [-1.668, 0.7992, -0.0003013, -5.214e-06],
    1: [1.651e-15, 1, -4.249e-18, 1.149e-19]
  };

  const cdv = _calc(total, vals2[q >= 7 ? 7 : q])

  if (showDebugging) {
    console.log(`totalDV: ${total}`);
    console.log(`q: ${q}`);
    console.log(`CDV: ${cdv}`);
  }

  return cdv;
}
