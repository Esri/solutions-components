/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
/**
 * Exported for testing purposes only
 */
const minMaxStepTypes = ["date", "datetime-local", "month", "number", "range", "time", "week"];
/**
 * Exported for testing purposes only
 */
const patternTypes = ["email", "password", "search", "tel", "text", "url"];
/**
 * Exported for testing purposes only
 */
const minMaxLengthTypes = ["email", "password", "search", "tel", "text", "textarea", "url"];
function updateConstraintValidation(inputComponent, input, propName, matchesType) {
    const attributeName = propName.toLowerCase();
    const value = inputComponent[propName];
    if (matchesType && value != null) {
        input.setAttribute(attributeName, `${value}`);
    }
    else {
        // we remove the attribute to ensure validation-constraints are properly reset
        input.removeAttribute(attributeName);
    }
}
/**
 * Synchronizes the hidden form input with the validation-related input properties.
 *
 * Note: loss of precision is expected due to the hidden input's value and validation-constraint props being strings.
 *
 * @param type - The input type.
 * @param inputComponent
 * @param hiddenFormInput
 */
function syncHiddenFormInput(type, inputComponent, hiddenFormInput) {
    hiddenFormInput.type = type === "textarea" ? "text" : type;
    const isMinMaxStepType = minMaxStepTypes.includes(type);
    const numericInputComponent = inputComponent;
    updateConstraintValidation(numericInputComponent, hiddenFormInput, "min", isMinMaxStepType);
    updateConstraintValidation(numericInputComponent, hiddenFormInput, "max", isMinMaxStepType);
    updateConstraintValidation(numericInputComponent, hiddenFormInput, "step", isMinMaxStepType);
    const isMinMaxLengthType = minMaxLengthTypes.includes(type);
    const textualInputComponent = inputComponent;
    updateConstraintValidation(textualInputComponent, hiddenFormInput, "minLength", isMinMaxLengthType);
    updateConstraintValidation(textualInputComponent, hiddenFormInput, "maxLength", isMinMaxLengthType);
    const isPatternType = patternTypes.includes(type);
    updateConstraintValidation(textualInputComponent, hiddenFormInput, "pattern", isPatternType);
}

exports.syncHiddenFormInput = syncHiddenFormInput;
