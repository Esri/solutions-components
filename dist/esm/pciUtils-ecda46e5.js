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
var ESeverity;
(function (ESeverity) {
  ESeverity["H"] = "H";
  ESeverity["M"] = "M";
  ESeverity["L"] = "L";
})(ESeverity || (ESeverity = {}));
/**
 * Type of distress as defined by ASTM standard
 *
 */
var EDistressType;
(function (EDistressType) {
  EDistressType[EDistressType["ALLIGATOR_CRACKING"] = 1] = "ALLIGATOR_CRACKING";
  EDistressType[EDistressType["BLEEDING"] = 2] = "BLEEDING";
  EDistressType[EDistressType["BLOCK_CRACKING"] = 3] = "BLOCK_CRACKING";
  EDistressType[EDistressType["BUMPS_SAGS"] = 4] = "BUMPS_SAGS";
  EDistressType[EDistressType["CORRUGATION"] = 5] = "CORRUGATION";
  EDistressType[EDistressType["DEPRESSION"] = 6] = "DEPRESSION";
  EDistressType[EDistressType["EDGE_CRACKING"] = 7] = "EDGE_CRACKING";
  EDistressType[EDistressType["REFLECTION_CRACKING"] = 8] = "REFLECTION_CRACKING";
  EDistressType[EDistressType["LANE_SHOULDER_DROP_OFF"] = 9] = "LANE_SHOULDER_DROP_OFF";
  EDistressType[EDistressType["LONG_TRANS_CRACKING"] = 10] = "LONG_TRANS_CRACKING";
  EDistressType[EDistressType["PATCHING_UTIL_CUT_PATCHING"] = 11] = "PATCHING_UTIL_CUT_PATCHING";
  EDistressType[EDistressType["POLISHED_AGGREGATE"] = 12] = "POLISHED_AGGREGATE";
  EDistressType[EDistressType["POTHOLES"] = 13] = "POTHOLES";
  EDistressType[EDistressType["RAILROAD_CROSSING"] = 14] = "RAILROAD_CROSSING";
  EDistressType[EDistressType["RUTTING"] = 15] = "RUTTING";
  EDistressType[EDistressType["SHOVING"] = 16] = "SHOVING";
  EDistressType[EDistressType["SLIPPAGE_CRACKING"] = 17] = "SLIPPAGE_CRACKING";
  EDistressType[EDistressType["SWELL"] = 18] = "SWELL";
  EDistressType[EDistressType["RAVELING"] = 19] = "RAVELING";
  EDistressType[EDistressType["WEATHERING"] = 20] = "WEATHERING";
})(EDistressType || (EDistressType = {}));
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
function calculateDeductValue(type, severity, density, showDebugging = false) {
  // When called from survey123 we will get the args as strings
  // not sure if they could be numbers so a little extra conversion to make sure with the density
  const _type = parseInt(type);
  const _severity = ESeverity[severity];
  const _density = parseFloat(density.toString());
  // When called from survey123 all distress types and severities will be passed in
  // We only need to calculate the deduct value if we have a valid density
  if (Number.isNaN(_density) || _density === 0) {
    return "";
  }
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
    case EDistressType.RAVELING:
      calc = _calcRaveling;
      break;
    case EDistressType.WEATHERING:
      calc = _calcWeathering;
      break;
  }
  const dv = calc(_severity, Math.log10(_density));
  const roundedDV = _round(dv);
  const formattedDV = `${type}|${severity}|${roundedDV}|${_density}`;
  if (_showDebugging) {
    console.log(`Deduct value: ${dv}`);
    console.log(`Rounded deduct value: ${roundedDV}`);
    console.log(`Formatted devduct value (type|severity|roundedDV|density): ${formattedDV}`);
  }
  return formattedDV;
}
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
function calculatePCI(deductValues, showDebugging = false) {
  // When called from survey123 we will get the args as strings
  // When comparing multi-severities calculatePCI will be called multiple times
  // When called from _evaluateMultiSeverity we will just recieve a comma delimited string
  // When its just comma delimited we don't need to re-evaluate the multiple severities
  let _deductValues = deductValues.indexOf("|") > -1 ?
    _evaluateMultiSeverity(deductValues, showDebugging) :
    deductValues.split(",").map(dv => parseFloat(dv));
  const _showDebugging = showDebugging === true || showDebugging.toString().toLowerCase() === "true";
  let pci = 0;
  // filter out non-numbers
  _deductValues = _deductValues.filter(dv => Math.abs(dv) > 0);
  if (_deductValues.length > 0) {
    const maxCDV = _getMaxCDV(_deductValues, _showDebugging);
    pci = 100 - _round(maxCDV);
  }
  return pci;
}
/**
 * Determine if corrections are required when we have multiple severities of a single distress type.
 *
 * @param deductValues string of comma delimited values e.g. "1|L|10|0.52,1|H|7|0.58"
 * @param showDebugging used to control debugging messages to show the various
 * calculations a required steps along the way.
 *
 * @returns an object that will contain any corrections for the current distress type
 */
function _evaluateMultiSeverity(deductValues, showDebugging) {
  const updates = {};
  const _dvObject = _parseDeductValues(deductValues);
  const multiSeverityKeys = Object.keys(_dvObject).filter(k => Object.keys(_dvObject[k]).length > 1);
  if (multiSeverityKeys.length > 0) {
    multiSeverityKeys.forEach(k => {
      let hDeductValue;
      let mDeductValue;
      let lDeductValue;
      let hDensity;
      let mDensity;
      let lDensity;
      // need to know if 2 or 3 severity case
      Object.keys(_dvObject[k]).forEach(_k => {
        if (_k === "H") {
          hDeductValue = _dvObject[k][_k].deductValue;
          hDensity = _dvObject[k][_k].density;
        }
        else if (_k === "M") {
          mDeductValue = _dvObject[k][_k].deductValue;
          mDensity = _dvObject[k][_k].density;
        }
        else {
          lDeductValue = _dvObject[k][_k].deductValue;
          lDensity = _dvObject[k][_k].density;
        }
      });
      const func = (hDensity && mDensity && lDensity) ?
        _getThreeSeverityCaseUpdates : _getTwoSeverityCaseUpdates;
      const update = func(k, hDeductValue, mDeductValue, lDeductValue, hDensity, mDensity, lDensity, showDebugging);
      if (update) {
        updates[k] = update;
        if (showDebugging) {
          console.log("updates");
          console.log(updates);
        }
      }
    });
  }
  return _getFinalDeductValues(deductValues, updates);
}
/**
 * Determine if corrections are required when we have 3 severities of a single distress type.
 *
 * @param type the distress type 1-19 as a string
 * @param hDeductValue high severity deduct value
 * @param mDeductValue med severity deduct value
 * @param lDeductValue low severity deduct value
 * @param hDensity high severity density
 * @param mDensity med severity density
 * @param lDensity low severity density
 * @param showDebugging used to control debugging messages to show the various
 * calculations a required steps along the way.
 *
 * @returns undefined or an object that will contain any corrections for the current distress type
 */
function _getThreeSeverityCaseUpdates(type, hDeductValue, mDeductValue, lDeductValue, hDensity, mDensity, lDensity, showDebugging) {
  const pci1 = calculatePCI(`${hDeductValue},${mDeductValue},${lDeductValue}`, true);
  if (showDebugging) {
    console.log("pci1");
    console.log(pci1);
  }
  const lm = lDensity + mDensity;
  const lmPCI2 = _getPCI2(type, "M", lm.toString(), hDeductValue, showDebugging);
  const mh = mDensity + hDensity;
  const mhPCI2 = _getPCI2(type, "H", mh.toString(), lDeductValue, showDebugging);
  const lh = lDensity + hDensity;
  const lhPCI2 = _getPCI2(type, "H", lh.toString(), mDeductValue, showDebugging);
  const lmh = lDensity + mDensity + hDensity;
  const lmhPCI2 = _getPCI2(type, "H", lmh.toString(), 0, showDebugging);
  if (showDebugging) {
    console.log("low med pci2");
    console.log(lmPCI2.pci);
    console.log("med high pci2");
    console.log(mhPCI2.pci);
    console.log("low high pci2");
    console.log(lhPCI2.pci);
    console.log("low med high pci2");
    console.log(lmhPCI2.pci);
  }
  const pcis = [lmPCI2, mhPCI2, lhPCI2, lmhPCI2];
  const highest = pcis.reduce((prev, cur) => {
    return cur.pci > pci1 && (!prev || cur.pci > prev.pci) ? cur : prev;
  }, undefined);
  return highest ? highest.dv : undefined;
}
/**
 * Determine if corrections are required when we have 2 severities of a single distress type.
 *
 * @param type the distress type 1-19 as a string
 * @param hDeductValue high severity deduct value
 * @param mDeductValue med severity deduct value
 * @param lDeductValue low severity deduct value
 * @param hDensity high severity density
 * @param mDensity med severity density
 * @param lDensity low severity density
 * @param showDebugging used to control debugging messages to show the various
 * calculations a required steps along the way.
 *
 * @returns undefined or an object that will contain any corrections for the current distress type
 */
function _getTwoSeverityCaseUpdates(type, hDeductValue, mDeductValue, lDeductValue, hDensity, mDensity, lDensity, showDebugging) {
  const hDV = hDeductValue || mDeductValue;
  const lDV = lDeductValue || mDeductValue;
  const pci1 = calculatePCI(`${hDV},${lDV}`, true);
  if (showDebugging) {
    console.log("pci1");
    console.log(pci1);
  }
  const hDen = hDensity || mDensity;
  const lDen = lDensity || mDensity;
  const sumDen = hDen + lDen;
  const highestSeverity = hDen === hDensity ? "H" : "M";
  const pci2 = _getPCI2(type, highestSeverity, sumDen.toString(), 0, showDebugging);
  if (showDebugging) {
    console.log("pci2");
    console.log(pci2.pci);
  }
  return pci2.pci > pci1 ? pci2.dv : undefined;
}
/**
 * Used to test for highest PCI when we have multiple severity cases for a single distress type.
 *
 * @param type the distress type 1-19 as a string
 * @param severity expects "H" | "M" | "L"
 * @param density the calculated percent density ralative to the total sample area
 * @param secondDeductValue optional deduct value will be 0 for all 2 severity cases and will be a non 0 number for 3 severity cases
 * @param showDebugging used to control debugging messages to show the various
 * calculations a required steps along the way.
 *
 * @returns ICorrection that contains the new PCI as well as the deduct values that should be used for corrections
 */
function _getPCI2(type, severity, density, secondDeductValue, showDebugging) {
  const deductValue = calculateDeductValue(type, severity, density);
  const splitVal = deductValue.split("|");
  const newDV = parseFloat(splitVal[2]);
  return {
    pci: calculatePCI(`${splitVal[2]},${secondDeductValue}`, showDebugging),
    dv: secondDeductValue ? [newDV, secondDeductValue] : [newDV]
  };
}
/**
 * Parse the deduct value string into individual values for type, severity, deduct value, and density
 *
 * @param deductValues string of comma delimited values for type, severity, deduct value, and density
 *
 * @returns an object with the parsed values
 */
function _parseDeductValues(deductValues) {
  return deductValues.split(",").reduce((prev, cur) => {
    const splitVal = cur.split("|");
    const type = splitVal[0];
    const severity = splitVal[1];
    const deductValue = parseFloat(splitVal[2]);
    const density = parseFloat(splitVal[3]);
    if (!prev[type]) {
      prev[type] = {};
    }
    prev[type][severity] = {
      deductValue,
      density
    };
    return prev;
  }, {});
}
/**
 * Replace any deduct values for the given distress types when it is determined that corrections
 * are required for a multi-severity case
 *
 * @param deductValues string of comma delimited values for type, severity, deduct value, and density
 * @param updates will contain the new corrected deduct value(s) that should be substituted for the original deduct value
 *
 * @returns an object with the parsed and updated deduct values to use for final PCI calculation
 */
function _getFinalDeductValues(deductValues, updates) {
  const skipAdditionalTypes = [];
  return deductValues.split(",").reduce((prev, cur) => {
    //0: type, 1: severity, 2: deductValue, 3: density
    const splitVal = cur.split("|");
    const type = splitVal[0];
    const deductValue = parseFloat(splitVal[2]);
    if (Object.keys(updates).length > 0 && updates[type]) {
      skipAdditionalTypes.push(type);
      prev.push(...updates[type]);
      delete (updates[type]);
    }
    else if (skipAdditionalTypes.indexOf(type) < 0) {
      prev.push(deductValue);
    }
    return prev;
  }, []);
}
/**
 * Executes the polynomial equation using the provided values and density.
 * In the ASTM standard this is the step represented by finding the values
 * on the plotted graphs.
 *
 * @returns the calculated deduct value
 */
function _calc(density, vals) {
  return vals.reduce((prev, cur, i) => {
    return prev += i === 0 ? cur :
      i === 1 ? (cur * density) :
        (cur * Math.pow(density, i));
  }, 0);
}
/**
 * Round to the nerest decimal in the 10ths place
 */
function _round(v) {
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
function _calcAlligator(severity, density) {
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
function _calcBleeding(severity, density) {
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
function _calcBlockCracking(severity, density) {
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
function _calcBumpsSags(severity, density) {
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
function _calcCorrugation(severity, density) {
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
function _calcDepression(severity, density) {
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
function _calcEdgeCracking(severity, density) {
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
function _calcReflectionCracking(severity, density) {
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
function _calcLaneShoulderDropOff(severity, density) {
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
function _calcLongTransCracking(severity, density) {
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
function _calcPatchingUtilCutPatching(severity, density) {
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
function _calcPolishedAggregate(severity, density) {
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
function _calcPotholes(severity, density) {
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
function _calcRailroadCrossing(severity, density) {
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
function _calcRutting(severity, density) {
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
function _calcShoving(severity, density) {
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
function _calcSlippageCracking(severity, density) {
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
function _calcSwell(severity, density) {
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
function _calcRaveling(severity, density) {
  const vals = severity === ESeverity.H ? [16.77, 10.67, 5.758, 12.9, -0.0633, -5.659, 1.48] :
    severity === ESeverity.M ? [8.512, 5.106, 1.63, 3.469, 1.028, -1.211, 0.1938] :
      [];
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
function _calcWeathering(severity, density) {
  const vals = severity === ESeverity.H ? [3.673, 3.349, 2.598, -1.233, 2.754, 2.434, -1.485] :
    severity === ESeverity.M ? [1.12, 0.9769, 0.93, -0.5955, 1.041, 1.111, -0.614] :
      [-0.0386, -0.0736, 0.834, 1.63, -0.0287, -0.639, 0.1515];
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
function _getMaxCDV(deductValues, showDebugging) {
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
  }
  else {
    // sort in descending order (section 9.5.2 in ASTM doc)
    const sortedDVs = deductValues.sort((a, b) => b - a);
    // Determine the allowable number of deducts, m (section 9.5.3 in ASTM doc)
    const highestDV = sortedDVs[0];
    // m = allowable number of deducts including fractions (must be less than or equal to ten)
    const m = 1 + (9 / 98) * (100 - highestDV);
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
    }
    else {
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
function _reduceDeductValues(sortedDVs, m) {
  const fractionalPart = m - Math.floor(m);
  // If less than m deduct values are available, all of the deduct values are used
  return sortedDVs.length < m ? sortedDVs :
    sortedDVs.reduce((prev, cur, i) => {
      if (i + 1 < m) {
        prev.push(cur);
      }
      else if (fractionalPart > 0) {
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
function _getCDVs(vals, showDebugging) {
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
function _getCDV(vals, showDebugging) {
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
function _calcCDV(total, q, showDebugging) {
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
  const cdv = _calc(total, vals2[q >= 7 ? 7 : q]);
  if (showDebugging) {
    console.log(`totalDV: ${total}`);
    console.log(`q: ${q}`);
    console.log(`CDV: ${cdv}`);
  }
  return cdv;
}

export { EDistressType as E, ESeverity as a, calculateDeductValue as b, calculatePCI as c };
