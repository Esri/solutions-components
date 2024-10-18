/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
/**
 * Do not edit directly
 * Generated on Wed, 01 May 2024 00:07:12 GMT
 */
const calciteContainerSizeWidthXxs = {"min":"0","max":"320px"}; // Small handheld devices and mini-windows
const calciteContainerSizeWidthXs = {"min":"321px","max":"476px"}; // Handheld devices
const calciteContainerSizeWidthSm = {"min":"477px","max":"768px"}; // Small tablets
const calciteContainerSizeWidthMd = {"min":"769px","max":"1152px"}; // Small laptops
const calciteContainerSizeWidthLg = {"min":"1153px","max":"1440px"}; // Large laptops and desktop computers

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
/**
 * A breakpoints lookup object.
 */
const breakpoints = {
    width: {
        large: cssLengthToNumber(calciteContainerSizeWidthLg.max),
        medium: cssLengthToNumber(calciteContainerSizeWidthMd.max),
        small: cssLengthToNumber(calciteContainerSizeWidthSm.max),
        xsmall: cssLengthToNumber(calciteContainerSizeWidthXs.max),
        xxsmall: cssLengthToNumber(calciteContainerSizeWidthXxs.max),
    },
};
function cssLengthToNumber(length) {
    return parseInt(length);
}

export { breakpoints as b };
