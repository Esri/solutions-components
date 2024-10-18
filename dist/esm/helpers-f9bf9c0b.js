/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { l as loadModules } from './loadModules-03ba7abe.js';
import { c as createStore } from './index-39bc2e6d.js';

async function getMergedEffect(presetLayerEffect, featureLayerView, type) {
    const [jsonUtils] = await loadModules(['esri/layers/effects/jsonUtils']);
    const { toJSON, fromJSON } = jsonUtils;
    const layer = featureLayerView === null || featureLayerView === void 0 ? void 0 : featureLayerView.layer;
    if (!presetLayerEffect) {
        if (layer === null || layer === void 0 ? void 0 : layer.effect) {
            return layer.effect;
        }
        else if (layer === null || layer === void 0 ? void 0 : layer.featureEffect) {
            return type === 'includedEffect' ? layer.featureEffect.includedEffect : layer.featureEffect.excludedEffect;
        }
        else {
            return null;
        }
    }
    // CONVERT EXISTING EFFECT AND PRESET LAYER EFFECT TO JSON
    const presetLayerEffectJSON = toJSON(presetLayerEffect);
    const layerEffect = layer.effect;
    const layerFeatureEffect = layer.featureEffect;
    let existingEffect;
    if (layerFeatureEffect) {
        existingEffect = type === 'includedEffect' ? layer.featureEffect.includedEffect : layer.featureEffect.excludedEffect;
    }
    else {
        existingEffect = layerEffect;
    }
    const existingEffectJSON = existingEffect ? toJSON(existingEffect) : null;
    // RETURN PRESET LAYER EFFECT IF THERE ARE NO EXISTING EFFECTS
    if (!existingEffectJSON) {
        return fromJSON(presetLayerEffectJSON);
    }
    let effectToUse = [...existingEffectJSON];
    if (presetLayerEffectJSON) {
        // ITERATE THROUGH PRESET LAYER EFFECT JSON
        presetLayerEffectJSON.forEach(presetLayerEffectItem => {
            // ITERATE THROUGH EXISTING EFFECT JSON
            effectToUse.forEach(existingEffectToUseItem => {
                const { value } = existingEffectToUseItem;
                if (value) {
                    // ITERATE THROUGH EXISTING EFFECT JSON VALUES
                    value.forEach((effectValue, effectIndex) => {
                        // REPLACE EXISTING EFFECT VALUE IF SAME TYPE IS PRESENT IN PRESET LAYER EFFECT
                        if (effectValue.type === presetLayerEffectItem.type) {
                            value[effectIndex] = presetLayerEffectItem;
                        }
                        // OTHERWISE MODIFY EXISTING EFFECT
                        else {
                            const notMerged = !existingEffectToUseItem.value.find(existingEffectItemToMerge => existingEffectItemToMerge.type === presetLayerEffectJSON[0].type);
                            // CHECK IF PRESET LAYER EFFECT HAS BEEN MERGED, IF NOT YET MERGED APPEND PRESET LAYER EFFECT TO EXISTING EFFECT
                            if (notMerged) {
                                existingEffectToUseItem.value = [...existingEffectToUseItem.value, ...presetLayerEffectJSON];
                            }
                        }
                    });
                }
                else {
                    // HANDLE NON SCALE EFFECTS
                    const notMerged = !effectToUse.find(nonScaleEffectToUseItem => nonScaleEffectToUseItem.type === existingEffectToUseItem.type);
                    const presetNotMerged = !effectToUse.find(nonScaleEffectToUseItem => nonScaleEffectToUseItem.type === presetLayerEffectItem.type);
                    if (presetNotMerged) {
                        effectToUse = [...effectToUse, presetLayerEffectItem];
                    }
                    if (notMerged) {
                        effectToUse = [...effectToUse, existingEffectToUseItem];
                    }
                }
            });
        });
    }
    const mergedEffect = fromJSON(effectToUse);
    return mergedEffect;
}

const InteractiveLegendStore = createStore({ data: {}, relationshipRampExpandStates: {} });
const interactiveLegendState = InteractiveLegendStore.state;
const store = InteractiveLegendStore;

// data handling
function activeLayerInfoCallback(intLegendDataPromises, legendViewModel, reactiveUtils) {
    return (activeLayerInfo) => {
        var _a;
        const aclType = (_a = activeLayerInfo === null || activeLayerInfo === void 0 ? void 0 : activeLayerInfo.layer) === null || _a === void 0 ? void 0 : _a.type;
        if (aclType === 'feature' || aclType === 'group') {
            // Step 3a. Push to promises array since there are promises within function
            const intLegendDataPromise = createInteractiveLegendDataForLayer(legendViewModel, activeLayerInfo, reactiveUtils).then(res => res);
            if (intLegendDataPromise) {
                intLegendDataPromises.push(intLegendDataPromise);
            }
            const handleALIChild = (aliChild) => {
                const intLegendDataPromise = createInteractiveLegendDataForLayer(legendViewModel, aliChild, reactiveUtils).then(res => res);
                if (intLegendDataPromise) {
                    intLegendDataPromises.push(intLegendDataPromise);
                }
            };
            // Take ACLs children into account
            activeLayerInfo.children.forEach(child => {
                var _a;
                handleALIChild(child);
                if (((_a = child === null || child === void 0 ? void 0 : child.children) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                    child.children.forEach(innerALIChild => {
                        var _a;
                        handleALIChild(innerALIChild);
                        if (((_a = innerALIChild === null || innerALIChild === void 0 ? void 0 : innerALIChild.children) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                            innerALIChild.children.forEach(innerInnerALIChild => {
                                handleALIChild(innerInnerALIChild);
                            });
                        }
                    });
                }
            });
        }
    };
}
async function createInteractiveLegendDataForLayer(legendViewModel, activeLayerInfo, reactiveUtils) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    try {
        // Get first Legend Element from Active LayerInfo - only first legend element will be interactive
        const isGroup = ((_a = activeLayerInfo === null || activeLayerInfo === void 0 ? void 0 : activeLayerInfo.layer) === null || _a === void 0 ? void 0 : _a.type) === 'group';
        const someVisible = (_c = (_b = activeLayerInfo === null || activeLayerInfo === void 0 ? void 0 : activeLayerInfo.layer) === null || _b === void 0 ? void 0 : _b.layers) === null || _c === void 0 ? void 0 : _c.some(layer => layer.visible);
        const noLegendEnabled = (_e = (_d = activeLayerInfo === null || activeLayerInfo === void 0 ? void 0 : activeLayerInfo.layer) === null || _d === void 0 ? void 0 : _d.layers) === null || _e === void 0 ? void 0 : _e.every((layer) => !(layer === null || layer === void 0 ? void 0 : layer.legendEnabled));
        await reactiveUtils.whenOnce(() => (legendViewModel === null || legendViewModel === void 0 ? void 0 : legendViewModel.state) === 'ready');
        if (!isGroup || (isGroup && someVisible)) {
            if (isGroup && noLegendEnabled) {
                await reactiveUtils.whenOnce(() => { var _a; return (_a = activeLayerInfo === null || activeLayerInfo === void 0 ? void 0 : activeLayerInfo.layer) === null || _a === void 0 ? void 0 : _a.loaded; });
            }
            else {
                await reactiveUtils.whenOnce(() => activeLayerInfo === null || activeLayerInfo === void 0 ? void 0 : activeLayerInfo.ready);
            }
        }
        else {
            await reactiveUtils.whenOnce(() => activeLayerInfo === null || activeLayerInfo === void 0 ? void 0 : activeLayerInfo.legendElements);
        }
        const legendElement = (_f = activeLayerInfo === null || activeLayerInfo === void 0 ? void 0 : activeLayerInfo.legendElements) === null || _f === void 0 ? void 0 : _f[0];
        // Each active layer info will have it's own property in object - we'll use the layer ID to categorize each layer
        // Hash map for each layers interactive categories i.e. Global power plants, Hydro, Solar, Wind, etc.
        const categories = new Map();
        // Layer to access field from it's renderer to be used in expression
        const fLayer = activeLayerInfo.layer;
        // Get Feature Layer View to query
        const fLayerView = await legendViewModel.view.whenLayerView(fLayer);
        await reactiveUtils.whenOnce(() => (fLayerView === null || fLayerView === void 0 ? void 0 : fLayerView.updating) === false);
        const field = (_g = fLayer.renderer) === null || _g === void 0 ? void 0 : _g.field;
        if (legendElement !== undefined) {
            (_h = legendElement === null || legendElement === void 0 ? void 0 : legendElement.infos) === null || _h === void 0 ? void 0 : _h.forEach(legendElementInfo => {
                var _a;
                const isNestedUniqueSymbol = legendElementInfo.type === 'symbol-table';
                if (isNestedUniqueSymbol) {
                    const nestedInfos = [];
                    legendElementInfo.infos.forEach(nestedUniqueSymbolInfo => {
                        const category = {
                            count: null,
                            selected: false,
                            legendElementInfo: nestedUniqueSymbolInfo,
                        };
                        nestedInfos.push(category);
                    });
                    const category = {
                        count: null,
                        selected: false,
                        legendElementInfo,
                        nestedInfos,
                    };
                    categories.set(legendElementInfo.title, category);
                }
                else {
                    const category = {
                        count: null,
                        selected: false,
                        legendElementInfo,
                    };
                    categories.set((_a = legendElementInfo.label) !== null && _a !== void 0 ? _a : fLayer.id, category);
                }
            });
        }
        // Generated expression to apply to layer filters
        const queryExpressions = [];
        // Total feature count
        return Promise.resolve({
            activeLayerInfo,
            title: (_j = fLayerView === null || fLayerView === void 0 ? void 0 : fLayerView.layer) === null || _j === void 0 ? void 0 : _j.title,
            categories,
            field,
            queryExpressions,
            totalCount: null,
            fLayerView,
            legendElement,
        });
    }
    catch (_k) {
        return Promise.resolve(null);
    }
}
async function generateData(legendViewModel, reactiveUtils) {
    // Create data object to return
    const data = {};
    // Set up Interactive Legend Data for each layer using it's corresponding active layer info
    // Array of promises - needed due to queryFeatureCount and whenLayerView calls
    const intLegendDataPromises = [];
    // Iterate through each Active Layer Info and create data bucket for each layer
    legendViewModel.activeLayerInfos.forEach(activeLayerInfoCallback(intLegendDataPromises, legendViewModel, reactiveUtils));
    // Store resolved data
    try {
        const intLegendLayerDataObjs = await Promise.all(intLegendDataPromises);
        intLegendLayerDataObjs.forEach(intLegendLayerDataObj => { var _a, _b; return (data[(_b = (_a = intLegendLayerDataObj === null || intLegendLayerDataObj === void 0 ? void 0 : intLegendLayerDataObj.activeLayerInfo) === null || _a === void 0 ? void 0 : _a.layer) === null || _b === void 0 ? void 0 : _b.id] = intLegendLayerDataObj); });
        return Promise.resolve(data);
    }
    catch (err) {
        return Promise.reject(null);
    }
}
// data getters
function getCategoriesArray(categories) {
    return Array.from(categories).map((category) => category[1]);
}
function getCategoryData(data, layer, elementInfo, parentLegendElementInfoData, infoIndex) {
    var _a, _b, _c;
    return parentLegendElementInfoData ? (_a = parentLegendElementInfoData === null || parentLegendElementInfoData === void 0 ? void 0 : parentLegendElementInfoData.nestedInfos) === null || _a === void 0 ? void 0 : _a[infoIndex] : (_b = data === null || data === void 0 ? void 0 : data.categories) === null || _b === void 0 ? void 0 : _b.get((_c = elementInfo === null || elementInfo === void 0 ? void 0 : elementInfo.label) !== null && _c !== void 0 ? _c : layer === null || layer === void 0 ? void 0 : layer.id);
}
function getIntLegendLayerData(fLayer) {
    var _a;
    return (_a = interactiveLegendState === null || interactiveLegendState === void 0 ? void 0 : interactiveLegendState.data) === null || _a === void 0 ? void 0 : _a[fLayer === null || fLayer === void 0 ? void 0 : fLayer.id];
}
// filtering
async function handleFilter(data, info, infoIndex, filterMode, parentLegendElementInfo) {
    var _a, _b, _c, _d, _e;
    const [FeatureFilter, FeatureEffect] = await loadModules(['esri/layers/support/FeatureFilter', 'esri/layers/support/FeatureEffect']);
    const { queryExpressions, fLayerView } = data;
    generateQueryExpressions(data, info, infoIndex, parentLegendElementInfo);
    const sep = queryExpressions.every(expression => expression && expression.includes('<>')) ? ' AND ' : ' OR ';
    const where = queryExpressions.join(sep);
    const timeExtent = (_e = (_b = (_a = fLayerView === null || fLayerView === void 0 ? void 0 : fLayerView.filter) === null || _a === void 0 ? void 0 : _a.timeExtent) !== null && _b !== void 0 ? _b : (_d = (_c = fLayerView === null || fLayerView === void 0 ? void 0 : fLayerView.featureEffect) === null || _c === void 0 ? void 0 : _c.filter) === null || _d === void 0 ? void 0 : _d.timeExtent) !== null && _e !== void 0 ? _e : null;
    const { type } = filterMode;
    if (type === 'filter') {
        fLayerView.filter = new FeatureFilter({ where, timeExtent });
    }
    else {
        if (filterMode.effect) {
            const { includedEffect, excludedEffect } = filterMode.effect;
            const mergedExcludedEffect = await getMergedEffect(excludedEffect, fLayerView, 'excludedEffect');
            const mergedIncludedEffect = await getMergedEffect(includedEffect, fLayerView, 'includedEffect');
            fLayerView.featureEffect = new FeatureEffect({
                filter: new FeatureFilter({ where, timeExtent }),
                includedEffect: mergedIncludedEffect,
                excludedEffect: mergedExcludedEffect,
            });
        }
    }
    return Promise.resolve();
}
function handlePredominanceExpression(elementInfo, featureLayerView) {
    const authoringInfo = featureLayerView ? featureLayerView.layer.renderer.authoringInfo : null;
    const fields = authoringInfo ? authoringInfo.fields : null;
    const expressionArr = [];
    if (!fields) {
        return '';
    }
    if (elementInfo.hasOwnProperty('value')) {
        fields.forEach(field => {
            if (elementInfo.value === field) {
                return;
            }
            const sqlQuery = `(${elementInfo.value} > ${field} OR (${field} IS NULL AND ${elementInfo.value} IS NOT NULL AND (${elementInfo.value} > 0 OR ${elementInfo.value} < 0)))`;
            expressionArr.push(sqlQuery);
        });
        return expressionArr.join(' AND ');
    }
    else {
        const queryForZeroes = [];
        fields.forEach(field => {
            queryForZeroes.push(`${field} = 0`);
        });
        const otherExpression = [];
        if (fields.length > 2) {
            fields.forEach(field1 => {
                fields.forEach(field2 => {
                    if (field1 === field2) {
                        return;
                    }
                    const queryForMultiplePredominance = [];
                    fields.forEach(field3 => {
                        if (field1 === field3 || field2 === field3) {
                            return;
                        }
                        queryForMultiplePredominance.push(`${field1} = ${field2} AND (${field1} > ${field3} OR ${field1} >= ${field3})`);
                    });
                    otherExpression.push(`(${queryForMultiplePredominance.join(' AND ')})`);
                });
            });
            const isNull = [];
            fields.forEach(field => {
                isNull.push(`${field} IS NULL`);
            });
            const generatedOtherExpression = `(${queryForZeroes.join(' AND ')}) OR (${otherExpression.join(' OR ')}) OR (${isNull.join(' AND ')})`;
            return generatedOtherExpression;
        }
        else {
            const expressions = [];
            fields.forEach(field1 => {
                fields.forEach(field2 => {
                    if (field1 === field2) {
                        return;
                    }
                    expressions.push(`${field1} = ${field2}`);
                    expressions.push(`(${queryForZeroes.join(' AND ')})`);
                });
            });
            const zeroAndNull = [];
            fields.forEach(field1 => {
                fields.forEach(field2 => {
                    if (field1 === field2) {
                        return;
                    }
                    zeroAndNull.push(`(${field1} = 0 AND ${field2} IS NULL) OR (${field1} IS NULL AND ${field2} IS NULL)`);
                });
            });
            return `(${expressions.join(' OR ')}) OR (${zeroAndNull.join(' OR ')})`;
        }
    }
}
function generateQueryExpressions(data, info, infoIndex, parentLegendElementInfo) {
    var _a, _b, _c, _d;
    const { field, legendElement, categories, fLayerView } = data;
    const queryExpressions = data === null || data === void 0 ? void 0 : data.queryExpressions;
    if (parentLegendElementInfo) {
        const nestedCategories = Array.from(data.categories).map(entry => entry[1]);
        nestedCategories.forEach(nestedCategory => {
            var _a, _b;
            const untouched = (_a = nestedCategory.nestedInfos) === null || _a === void 0 ? void 0 : _a.every(nestedInfo => !nestedInfo.selected);
            if (untouched) {
                (_b = nestedCategory.nestedInfos) === null || _b === void 0 ? void 0 : _b.forEach(nestedInfo => {
                    const expression = field ? `${field} = '${nestedInfo.legendElementInfo.value}'` : null;
                    const expressionIndex = expression ? queryExpressions.indexOf(expression) : -1;
                    if (expression && expressionIndex !== -1) {
                        queryExpressions.splice(expressionIndex, 1);
                    }
                });
            }
        });
    }
    const legendElementInfos = legendElement === null || legendElement === void 0 ? void 0 : legendElement.infos;
    const isPredominance = checkPredominance(fLayerView);
    let queryExpression = isPredominance
        ? handlePredominanceExpression(info, fLayerView)
        : generateQueryExpression(info, field, infoIndex, legendElement, legendElementInfos, '');
    const category = categories
        ? parentLegendElementInfo
            ? (_b = (_a = categories.get(parentLegendElementInfo.title)) === null || _a === void 0 ? void 0 : _a.nestedInfos) === null || _b === void 0 ? void 0 : _b[infoIndex]
            : categories.get((_c = info.label) !== null && _c !== void 0 ? _c : (_d = fLayerView === null || fLayerView === void 0 ? void 0 : fLayerView.layer) === null || _d === void 0 ? void 0 : _d.id)
        : null;
    if (category)
        category.selected = !(category === null || category === void 0 ? void 0 : category.selected);
    const hasOneValue = legendElementInfos && legendElementInfos.length === 1;
    const expressionIndex = queryExpressions.indexOf(queryExpression);
    if (isPredominance) {
        const expressionIndex = queryExpressions.indexOf(queryExpression);
        if (queryExpressions.length === 0 || expressionIndex === -1) {
            if (queryExpressions && queryExpressions[0] === '1=0') {
                queryExpressions.splice(0, 1);
            }
            queryExpressions.push(queryExpression);
        }
        else if (queryExpressions && queryExpressions.length === 1 && queryExpression === queryExpressions[0]) {
            queryExpressions[0] = '1=0';
        }
        else if (queryExpressions && queryExpressions.length === 1) {
            queryExpressions[0] = queryExpression;
        }
        else if (queryExpressions && queryExpressions.length === 1 && queryExpression !== queryExpressions[0] && queryExpressions[0] === '1=0') {
            queryExpressions[0] = queryExpression;
        }
        else if (queryExpressions && queryExpressions.length === 1 && queryExpression === queryExpressions[0] && queryExpressions[0] === '1=0') {
            queryExpressions[0] = null;
        }
        else {
            queryExpressions.splice(expressionIndex, 1);
        }
        queryExpressions.join(' OR ');
    }
    else if (queryExpressions.length === 0 || expressionIndex === -1) {
        if (queryExpressions && queryExpressions[0] === '1=0') {
            queryExpressions.splice(0, 1);
        }
        queryExpressions.push(queryExpression);
    }
    else if (queryExpressions && queryExpressions.length === 1 && queryExpression === queryExpressions[0] && !hasOneValue) {
        queryExpressions[0] = '1=0';
    }
    else if (queryExpressions && queryExpressions.length === 1 && !hasOneValue) {
        queryExpressions[0] = queryExpression;
    }
    else if (queryExpressions && queryExpressions.length === 1 && queryExpression !== queryExpressions[0] && queryExpressions[0] === '1=0' && !hasOneValue) {
        queryExpressions[0] = queryExpression;
    }
    else if (queryExpressions && queryExpressions.length === 1 && queryExpression === queryExpressions[0] && queryExpressions[0] === '1=0' && !hasOneValue) {
        queryExpressions[0] = null;
    }
    else {
        queryExpressions.splice(expressionIndex, 1);
    }
    if (parentLegendElementInfo) {
        const expressionList = [];
        const nestedCategories = Array.from(data.categories).map(entry => entry[1]);
        nestedCategories.forEach(nestedCategory => {
            var _a, _b;
            const untouched = (_a = nestedCategory.nestedInfos) === null || _a === void 0 ? void 0 : _a.every(nestedInfo => !nestedInfo.selected);
            if (untouched) {
                (_b = nestedCategory.nestedInfos) === null || _b === void 0 ? void 0 : _b.forEach(nestedInfo => {
                    const expression = field ? `${field} = '${nestedInfo.legendElementInfo.value}'` : null;
                    if (expression)
                        expressionList.push(`${field} = '${nestedInfo.legendElementInfo.value}'`);
                });
            }
        });
        expressionList.forEach(expression => {
            if (queryExpressions.indexOf(expression) === -1) {
                queryExpressions.push(expression);
            }
        });
    }
}
function generateQueryExpression(info, field, infoIndex, legendElement, legendElementInfos, normalizationField) {
    const { value } = info;
    if ((legendElement === null || legendElement === void 0 ? void 0 : legendElement.type) === 'symbol-table') {
        // Classify data size/color ramp
        if (!info.hasOwnProperty('value') || (Array.isArray(info.value) && (legendElementInfos === null || legendElementInfos === void 0 ? void 0 : legendElementInfos.length) === 1)) {
            // Classify data size/color ramp - 'Other' category
            if ((legendElementInfos === null || legendElementInfos === void 0 ? void 0 : legendElementInfos[0].hasOwnProperty('value')) &&
                Array.isArray(legendElementInfos === null || legendElementInfos === void 0 ? void 0 : legendElementInfos[0].value) &&
                (legendElementInfos === null || legendElementInfos === void 0 ? void 0 : legendElementInfos[(legendElementInfos === null || legendElementInfos === void 0 ? void 0 : legendElementInfos.length) - 2]) &&
                (legendElementInfos === null || legendElementInfos === void 0 ? void 0 : legendElementInfos[(legendElementInfos === null || legendElementInfos === void 0 ? void 0 : legendElementInfos.length) - 2].hasOwnProperty('value')) &&
                Array.isArray(legendElementInfos === null || legendElementInfos === void 0 ? void 0 : legendElementInfos[(legendElementInfos === null || legendElementInfos === void 0 ? void 0 : legendElementInfos.length) - 2].value)) {
                const expression = normalizationField
                    ? `((${field}/${normalizationField}) > ${legendElementInfos === null || legendElementInfos === void 0 ? void 0 : legendElementInfos[0].value[1]}) OR ((${field}/${normalizationField}) < ${legendElementInfos === null || legendElementInfos === void 0 ? void 0 : legendElementInfos[(legendElementInfos === null || legendElementInfos === void 0 ? void 0 : legendElementInfos.length) - 2].value[0]}) OR ${normalizationField} = 0 OR ${normalizationField} IS NULL`
                    : `${field} > ${legendElementInfos === null || legendElementInfos === void 0 ? void 0 : legendElementInfos[0].value[1]} OR ${field} < ${legendElementInfos === null || legendElementInfos === void 0 ? void 0 : legendElementInfos[(legendElementInfos === null || legendElementInfos === void 0 ? void 0 : legendElementInfos.length) - 2].value[0]} OR ${field} IS NULL`;
                return expression;
            }
            else if ((legendElementInfos === null || legendElementInfos === void 0 ? void 0 : legendElementInfos.length) === 1) {
                return '1=0';
            }
            else {
                // Types unique symbols - 'Other' category
                const expressionList = [];
                legendElementInfos === null || legendElementInfos === void 0 ? void 0 : legendElementInfos.forEach(legendElementInfo => {
                    if (legendElementInfo === null || legendElementInfo === void 0 ? void 0 : legendElementInfo.value) {
                        const { value } = legendElementInfo;
                        const singleQuote = value.indexOf("'") !== -1 ? value.split("'").join("''") : null;
                        const expression = singleQuote
                            ? `${field} <> '${singleQuote}'`
                            : isNaN(value) || (typeof value === 'string' && !value.trim())
                                ? `${field} <> '${value}'`
                                : `${field} <> ${value} AND ${field} <> '${value}'`;
                        expressionList.push(expression);
                    }
                });
                const noExpression = expressionList.join(' AND ');
                return field && noExpression ? `${noExpression} OR ${field} IS NULL` : '';
            }
        }
        else {
            const singleQuote = value.indexOf("'") !== -1 ? value.split("'").join("''") : null;
            const isArray = Array.isArray(info.value);
            const isLastElement = (legendElementInfos === null || legendElementInfos === void 0 ? void 0 : legendElementInfos.length) - 1 === infoIndex;
            const lastElementAndNoValue = !(legendElementInfos === null || legendElementInfos === void 0 ? void 0 : legendElementInfos[(legendElementInfos === null || legendElementInfos === void 0 ? void 0 : legendElementInfos.length) - 1].hasOwnProperty('value'));
            const secondToLastElement = infoIndex === (legendElementInfos === null || legendElementInfos === void 0 ? void 0 : legendElementInfos.length) - 2;
            const expression = isArray
                ? normalizationField
                    ? isLastElement || (lastElementAndNoValue && secondToLastElement)
                        ? `(${field}/${normalizationField}) >= ${value[0]} AND (${field}/${normalizationField}) <= ${info.value[1]}`
                        : `(${field}/${normalizationField}) > ${value[0]} AND (${field}/${normalizationField}) <= ${info.value[1]}`
                    : isLastElement || (lastElementAndNoValue && secondToLastElement)
                        ? `${field} >= ${value[0]} AND ${field} <= ${value[1]}`
                        : `${field} > ${value[0]} AND ${field} <= ${value[1]}`
                : (legendElementInfos === null || legendElementInfos === void 0 ? void 0 : legendElementInfos.length) === 1 && field
                    ? isNaN(value) || !value.trim().length
                        ? `${field} <> '${value}'`
                        : `${field} <> ${value} OR ${field} <> '${value}'`
                    : singleQuote
                        ? `${field} = '${singleQuote}'`
                        : isNaN(value) || !value.trim().length
                            ? `${field} = '${value}'`
                            : `${field} = ${value} OR ${field} = '${value}'`;
            return expression;
        }
    }
    else {
        return '';
    }
}
function checkNoneSelected(data) {
    if (Array.isArray(data)) {
        return data.every(entry => !entry.selected);
    }
    else {
        return data && Array.from(data.categories.entries()).every(entry => !entry[1].selected) && data.queryExpressions[0] !== '1=0';
    }
}
function checkPredominance(fLayerView) {
    var _a, _b, _c;
    const authoringInfoType = (_c = (_b = (_a = fLayerView === null || fLayerView === void 0 ? void 0 : fLayerView.layer) === null || _a === void 0 ? void 0 : _a.renderer) === null || _b === void 0 ? void 0 : _b.authoringInfo) === null || _c === void 0 ? void 0 : _c.type;
    return authoringInfoType === 'predominance';
}
function checkRelationshipRamp(activeLayerInfo) {
    var _a;
    return ((_a = activeLayerInfo === null || activeLayerInfo === void 0 ? void 0 : activeLayerInfo.legendElements[1]) === null || _a === void 0 ? void 0 : _a.type) === 'relationship-ramp';
}
function validateInteractivity(activeLayerInfo, legendElement, legendElementIndex) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
    const fLayer = activeLayerInfo.layer;
    const field = (_a = fLayer === null || fLayer === void 0 ? void 0 : fLayer.renderer) === null || _a === void 0 ? void 0 : _a.field;
    const type = legendElement === null || legendElement === void 0 ? void 0 : legendElement.type;
    const layerView = activeLayerInfo === null || activeLayerInfo === void 0 ? void 0 : activeLayerInfo.layerView;
    const classBreakInfos = (_c = (_b = layerView === null || layerView === void 0 ? void 0 : layerView.layer) === null || _b === void 0 ? void 0 : _b.renderer) === null || _c === void 0 ? void 0 : _c.classBreakInfos;
    const uniqueValueInfos = ((_e = (_d = layerView === null || layerView === void 0 ? void 0 : layerView.layer) === null || _d === void 0 ? void 0 : _d.renderer) === null || _e === void 0 ? void 0 : _e.uniqueValueInfos) && field;
    const isSizeRamp = type === 'size-ramp';
    const isColorRamp = type === 'color-ramp';
    const opacityRamp = type === 'opacity-ramp';
    const heatmapRamp = type === 'heatmap-ramp';
    const hasMoreThanOneClassBreak = layerView && classBreakInfos && classBreakInfos.length > 1;
    const authoringInfoType = (_h = (_g = (_f = layerView === null || layerView === void 0 ? void 0 : layerView.layer) === null || _f === void 0 ? void 0 : _f.renderer) === null || _g === void 0 ? void 0 : _g.authoringInfo) === null || _h === void 0 ? void 0 : _h.type;
    const classifyDataCheckedColorRamp = authoringInfoType === 'class-breaks-color';
    const classifyDataCheckedSizeRamp = authoringInfoType === 'class-breaks-size';
    const singleSymbol = ((_j = legendElement === null || legendElement === void 0 ? void 0 : legendElement.infos) === null || _j === void 0 ? void 0 : _j.length) === 1 && !field;
    const isRelationshipRamp = authoringInfoType === 'relationship' && (legendElement === null || legendElement === void 0 ? void 0 : legendElement.type) !== 'size-ramp' && (legendElement === null || legendElement === void 0 ? void 0 : legendElement.type) !== 'symbol-table';
    const isFeatureLayer = ((_k = activeLayerInfo === null || activeLayerInfo === void 0 ? void 0 : activeLayerInfo.layer) === null || _k === void 0 ? void 0 : _k.type) === 'feature';
    const moreThanOneClassBreak = isFeatureLayer && field && !isColorRamp && !isSizeRamp && hasMoreThanOneClassBreak;
    const oneClassBreak = isFeatureLayer && field && !isColorRamp && !isSizeRamp && !hasMoreThanOneClassBreak ? true : false;
    const validate = oneClassBreak ||
        (checkPredominance(layerView) && !isSizeRamp) ||
        (classifyDataCheckedColorRamp && field) ||
        (classifyDataCheckedSizeRamp && field) ||
        (singleSymbol && !field && field !== null) ||
        isRelationshipRamp ||
        uniqueValueInfos
        ? true
        : false;
    const hasClustering = ((_l = activeLayerInfo === null || activeLayerInfo === void 0 ? void 0 : activeLayerInfo.layer) === null || _l === void 0 ? void 0 : _l.featureReduction) && ((_o = (_m = activeLayerInfo === null || activeLayerInfo === void 0 ? void 0 : activeLayerInfo.legendElements) === null || _m === void 0 ? void 0 : _m[legendElementIndex]) === null || _o === void 0 ? void 0 : _o.type) === 'size-ramp';
    const isSingleSymbol = (legendElement === null || legendElement === void 0 ? void 0 : legendElement.type) === 'symbol-table' && ((_p = legendElement === null || legendElement === void 0 ? void 0 : legendElement.infos) === null || _p === void 0 ? void 0 : _p.length) === 1;
    const hasColorRamp = !(activeLayerInfo === null || activeLayerInfo === void 0 ? void 0 : activeLayerInfo.legendElements.every(legendElement => legendElement.type !== 'color-ramp'));
    const hasSizeRamp = !(activeLayerInfo === null || activeLayerInfo === void 0 ? void 0 : activeLayerInfo.legendElements.every(legendElement => legendElement.type !== 'size-ramp'));
    const singleSymbolColor = isSingleSymbol && hasColorRamp;
    const singleSymbolSize = isSingleSymbol && hasSizeRamp;
    const isUnclassifiedSizeRamp = (_q = legendElement === null || legendElement === void 0 ? void 0 : legendElement.infos) === null || _q === void 0 ? void 0 : _q.every(info => typeof info.value === 'number');
    const isBinning = ((_s = (_r = activeLayerInfo === null || activeLayerInfo === void 0 ? void 0 : activeLayerInfo.legendElements) === null || _r === void 0 ? void 0 : _r[0]) === null || _s === void 0 ? void 0 : _s.type) === 'symbol-table' && ((_u = (_t = activeLayerInfo === null || activeLayerInfo === void 0 ? void 0 : activeLayerInfo.legendElements) === null || _t === void 0 ? void 0 : _t[1]) === null || _u === void 0 ? void 0 : _u.type) === 'color-ramp';
    const isDotDensity = authoringInfoType === 'dot-density';
    const fieldExists = checkIfFieldExists(activeLayerInfo === null || activeLayerInfo === void 0 ? void 0 : activeLayerInfo.layer, field);
    const isValidated = isFeatureLayer &&
        !hasClustering &&
        !opacityRamp &&
        !heatmapRamp &&
        !singleSymbolColor &&
        !singleSymbolSize &&
        !isUnclassifiedSizeRamp &&
        !isBinning &&
        !isDotDensity &&
        fieldExists
        ? classBreakInfos
            ? moreThanOneClassBreak || validate
            : oneClassBreak || validate
        : false;
    return isValidated;
}
// ui interactions
function showAll(data) {
    var _a, _b, _c, _d, _e;
    data.queryExpressions = [];
    if ((_b = (_a = data === null || data === void 0 ? void 0 : data.fLayerView) === null || _a === void 0 ? void 0 : _a.filter) === null || _b === void 0 ? void 0 : _b.where)
        data.fLayerView.filter.where = '';
    if ((_e = (_d = (_c = data === null || data === void 0 ? void 0 : data.fLayerView) === null || _c === void 0 ? void 0 : _c.featureEffect) === null || _d === void 0 ? void 0 : _d.filter) === null || _e === void 0 ? void 0 : _e.where)
        data.fLayerView.featureEffect = null;
    data.categories.forEach(category => {
        category.selected = false;
    });
    return data;
}
function showAllNestedUniqueSymbol(data, nestedUniqueSymbolCategoryId) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    const nestedUniqueInfoCategory = data.categories.get(nestedUniqueSymbolCategoryId);
    (_a = nestedUniqueInfoCategory === null || nestedUniqueInfoCategory === void 0 ? void 0 : nestedUniqueInfoCategory.nestedInfos) === null || _a === void 0 ? void 0 : _a.forEach(nestedInfo => {
        const expression = `${data.field} = '${nestedInfo.legendElementInfo.value}'`;
        const existingIndex = data.queryExpressions.indexOf(expression);
        if (existingIndex !== -1) {
            data.queryExpressions.splice(existingIndex, 1);
        }
        nestedInfo.selected = false;
    });
    const expressionList = [];
    const nestedCategories = Array.from(data.categories).map(entry => entry[1]);
    nestedCategories.forEach(nestedCategory => {
        var _a, _b;
        const untouched = (_a = nestedCategory.nestedInfos) === null || _a === void 0 ? void 0 : _a.every(nestedInfo => !nestedInfo.selected);
        if (untouched) {
            (_b = nestedCategory.nestedInfos) === null || _b === void 0 ? void 0 : _b.forEach(nestedInfo => {
                expressionList.push(`${data.field} = '${nestedInfo.legendElementInfo.value}'`);
            });
        }
    });
    expressionList.forEach(expression => {
        if (data.queryExpressions.indexOf(expression) === -1) {
            data.queryExpressions.push(expression);
        }
    });
    let where = data.queryExpressions.join(' OR ');
    const allUntouched = nestedCategories.every(nestedCategory => { var _a; return (_a = nestedCategory.nestedInfos) === null || _a === void 0 ? void 0 : _a.every(nestedInfo => !nestedInfo.selected); });
    if (allUntouched) {
        if ((_c = (_b = data === null || data === void 0 ? void 0 : data.fLayerView) === null || _b === void 0 ? void 0 : _b.filter) === null || _c === void 0 ? void 0 : _c.where)
            data.fLayerView.filter.where = '';
        if ((_f = (_e = (_d = data === null || data === void 0 ? void 0 : data.fLayerView) === null || _d === void 0 ? void 0 : _d.featureEffect) === null || _e === void 0 ? void 0 : _e.filter) === null || _f === void 0 ? void 0 : _f.where)
            data.fLayerView.featureEffect = null;
        data.queryExpressions = [];
    }
    else {
        if ((_h = (_g = data === null || data === void 0 ? void 0 : data.fLayerView) === null || _g === void 0 ? void 0 : _g.filter) === null || _h === void 0 ? void 0 : _h.where)
            data.fLayerView.filter.where = where;
        if ((_l = (_k = (_j = data === null || data === void 0 ? void 0 : data.fLayerView) === null || _j === void 0 ? void 0 : _j.featureEffect) === null || _k === void 0 ? void 0 : _k.filter) === null || _l === void 0 ? void 0 : _l.where)
            data.fLayerView.featureEffect.filter.where = where;
    }
    return data;
}
async function zoomTo(data, view, nestedCategory) {
    var _a, _b;
    const query = data.fLayerView.createQuery();
    if (nestedCategory) {
        const noneSelected = nestedCategory.nestedInfos.every((nestedInfo) => !nestedInfo.selected);
        if (noneSelected) {
            const expression = nestedCategory.nestedInfos.map(nestedInfo => `${data.field} = '${nestedInfo.legendElementInfo.value}'`).join(' OR ');
            query.where = expression;
        }
        else {
            const expression = nestedCategory.nestedInfos
                .filter(nestedInfo => nestedInfo.selected)
                .map(nestedInfo => `${data.field} = '${nestedInfo.legendElementInfo.value}'`)
                .join(' OR ');
            query.where = expression;
        }
    }
    else {
        const where = data.queryExpressions.join(' OR ');
        query.where = where;
    }
    try {
        const { extent } = await ((_b = (_a = data === null || data === void 0 ? void 0 : data.fLayerView) === null || _a === void 0 ? void 0 : _a.layer) === null || _b === void 0 ? void 0 : _b.queryExtent(query));
        await view.goTo(extent);
    }
    catch (_c) { }
}
// count
function calculateTotalCount(categoriesArr) {
    const totalCount = categoriesArr.map((category) => category === null || category === void 0 ? void 0 : category.count).reduce((acc, curr) => acc + curr);
    return totalCount;
}
function calculateTotalFeatureCountForNestedSymbols(categoriesArr) {
    return categoriesArr
        .map(category => { var _a; return (_a = category === null || category === void 0 ? void 0 : category.nestedInfos) === null || _a === void 0 ? void 0 : _a.map(nestedInfo => nestedInfo.count).reduce((acc, curr) => acc + curr); })
        .reduce((acc, curr) => acc + curr);
}
async function getInfoCount(extent, fLayerView, field, info, infoIndex, legendElement, nestedUniqueSymbolInfo, nestedUniqueSymbolInfoIndex) {
    var _a, _b, _c;
    if (!fLayerView)
        return;
    const fieldExists = checkIfFieldExists(fLayerView === null || fLayerView === void 0 ? void 0 : fLayerView.layer, field);
    if (!fieldExists)
        return;
    const query = ((_a = fLayerView === null || fLayerView === void 0 ? void 0 : fLayerView.layer) === null || _a === void 0 ? void 0 : _a.type) === 'feature' ? fLayerView.createQuery() : null;
    const where = checkPredominance(fLayerView)
        ? handlePredominanceExpression(info, fLayerView)
        : info.type
            ? generateQueryExpression(nestedUniqueSymbolInfo, field, nestedUniqueSymbolInfoIndex, info, info.infos)
            : generateQueryExpression(info, field, infoIndex, legendElement, legendElement.infos);
    if (query && where) {
        query.where = where === '1=0' ? '1=1' : where;
        query.geometry = extent;
    }
    try {
        const featureCount = query ? await fLayerView.queryFeatureCount(query) : null;
        return Promise.resolve({ [(_b = info.label) !== null && _b !== void 0 ? _b : (_c = fLayerView === null || fLayerView === void 0 ? void 0 : fLayerView.layer) === null || _c === void 0 ? void 0 : _c.id]: featureCount });
    }
    catch (err) {
        console.error("FAILURE AT 'getInfoCount': ", err);
    }
    return Promise.resolve(null);
}
async function handleFeatureCount(legendViewModel, data) {
    let updatedData = Object.assign({}, data);
    const { activeLayerInfos } = legendViewModel;
    let dataCount = {};
    const countPromises = {};
    activeLayerInfos.forEach(async (activeLayerInfo) => {
        var _a, _b, _c, _d;
        const legendElement = activeLayerInfo.legendElements[0];
        const fLayer = activeLayerInfo.layer;
        const fLayerView = (_b = data[(_a = activeLayerInfo === null || activeLayerInfo === void 0 ? void 0 : activeLayerInfo.layer) === null || _a === void 0 ? void 0 : _a.id]) === null || _b === void 0 ? void 0 : _b.fLayerView;
        const field = (_c = fLayer.renderer) === null || _c === void 0 ? void 0 : _c.field;
        const counts = [];
        countPromises[activeLayerInfo.layer.id] = [];
        (_d = legendElement === null || legendElement === void 0 ? void 0 : legendElement.infos) === null || _d === void 0 ? void 0 : _d.forEach((info, infoIndex) => {
            var _a;
            const isNestedUniqueSymbol = (_a = legendElement.infos) === null || _a === void 0 ? void 0 : _a.every(info => info.type === 'symbol-table');
            if (isNestedUniqueSymbol) {
                const nestedInfoCounts = [];
                info.infos.forEach((nestedUniqueSymbolInfo, nestedUniqueSymbolInfoIndex) => {
                    const infoCount = getInfoCount(legendViewModel.view.extent, fLayerView, field, info, infoIndex, legendElement, nestedUniqueSymbolInfo, nestedUniqueSymbolInfoIndex);
                    nestedInfoCounts.push(infoCount);
                });
                countPromises[activeLayerInfo.layer.id].push(nestedInfoCounts);
            }
            else {
                counts.push(getInfoCount(legendViewModel.view.extent, fLayerView, field, info, infoIndex, legendElement));
                countPromises[activeLayerInfo.layer.id] = counts;
            }
        });
        const handleALIChild = (aliChild) => {
            var _a, _b, _c, _d;
            const childCounts = [];
            const legendElement = aliChild.legendElements[0];
            const fLayer = aliChild.layer;
            const fLayerView = (_b = data[(_a = aliChild === null || aliChild === void 0 ? void 0 : aliChild.layer) === null || _a === void 0 ? void 0 : _a.id]) === null || _b === void 0 ? void 0 : _b.fLayerView;
            const field = (_c = fLayer.renderer) === null || _c === void 0 ? void 0 : _c.field;
            (_d = legendElement === null || legendElement === void 0 ? void 0 : legendElement.infos) === null || _d === void 0 ? void 0 : _d.forEach((info, infoIndex) => childCounts.push(getInfoCount(legendViewModel.view.extent, fLayerView, field, info, infoIndex, legendElement)));
            countPromises[aliChild.layer.id] = childCounts;
        };
        activeLayerInfo.children.forEach(async (aliChild) => {
            var _a;
            handleALIChild(aliChild);
            if (((_a = aliChild === null || aliChild === void 0 ? void 0 : aliChild.children) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                aliChild.children.forEach(innerALIChild => {
                    var _a;
                    handleALIChild(innerALIChild);
                    if (((_a = innerALIChild === null || innerALIChild === void 0 ? void 0 : innerALIChild.children) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                        innerALIChild.children.forEach(innerInnerALIChild => {
                            handleALIChild(innerInnerALIChild);
                        });
                    }
                });
            }
        });
    });
    for (const countPromise in countPromises) {
        let countObj = dataCount[countPromise];
        if (!countObj)
            countObj = dataCount[countPromise] = {};
        const countRes = await Promise.all(countPromises[countPromise]);
        if (countRes.every(countResItem => Array.isArray(countResItem))) {
            const countArr2d = await Promise.all(countRes.map(async (countResItem) => {
                const promise = await Promise.all(countResItem);
                const count = promise.map(promiseItem => promiseItem && Object.values(promiseItem)[0]);
                return count;
            }));
            countObj[countPromise] = countArr2d;
            dataCount[countPromise] = Object.assign({}, countObj[countPromise]);
        }
        else {
            const layerCountObj = {};
            countRes.forEach(countResItem => {
                if (!countResItem)
                    return;
                const id = Object.keys(countResItem)[0];
                layerCountObj[id] = countResItem[id];
            });
            if (countPromise)
                countObj[countPromise] = layerCountObj;
            dataCount[countPromise] = Object.assign({}, countObj[countPromise]);
        }
    }
    activeLayerInfos.forEach(activeLayerInfo => {
        var _a;
        const dataFromActiveLayerInfo = data[activeLayerInfo.layer.id];
        const layerId = activeLayerInfo.layer.id;
        (_a = dataFromActiveLayerInfo === null || dataFromActiveLayerInfo === void 0 ? void 0 : dataFromActiveLayerInfo.categories) === null || _a === void 0 ? void 0 : _a.forEach((category, key) => {
            var _a;
            const categoriesArr = Array.from(dataFromActiveLayerInfo === null || dataFromActiveLayerInfo === void 0 ? void 0 : dataFromActiveLayerInfo.categories);
            const categoryIndex = categoriesArr.findIndex((categoryArrItem) => categoryArrItem[0] === key);
            if (category === null || category === void 0 ? void 0 : category.nestedInfos) {
                category === null || category === void 0 ? void 0 : category.nestedInfos.forEach((nestedInfo, nestedInfoIndex) => {
                    var _a, _b, _c;
                    const count = (_c = (_b = dataCount === null || dataCount === void 0 ? void 0 : dataCount[(_a = activeLayerInfo === null || activeLayerInfo === void 0 ? void 0 : activeLayerInfo.layer) === null || _a === void 0 ? void 0 : _a.id]) === null || _b === void 0 ? void 0 : _b[categoryIndex]) === null || _c === void 0 ? void 0 : _c[nestedInfoIndex];
                    nestedInfo.count = !isNaN(count) ? count : null;
                });
            }
            else {
                const count = (_a = dataCount === null || dataCount === void 0 ? void 0 : dataCount[layerId]) === null || _a === void 0 ? void 0 : _a[key];
                category.count = !isNaN(count) ? count : null;
            }
        });
        const handleALIChild = (aliChild) => {
            var _a;
            const childLayerId = aliChild.layer.id;
            const dataFromActiveLayerInfo = data[childLayerId];
            (_a = dataFromActiveLayerInfo === null || dataFromActiveLayerInfo === void 0 ? void 0 : dataFromActiveLayerInfo.categories) === null || _a === void 0 ? void 0 : _a.forEach((category, key) => {
                var _a;
                const count = (_a = dataCount === null || dataCount === void 0 ? void 0 : dataCount[childLayerId]) === null || _a === void 0 ? void 0 : _a[key];
                category.count = count;
            });
        };
        activeLayerInfo.children.forEach(aliChild => {
            var _a;
            handleALIChild(aliChild);
            if (((_a = aliChild === null || aliChild === void 0 ? void 0 : aliChild.children) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                aliChild.children.forEach(innerALIChild => {
                    var _a;
                    handleALIChild(innerALIChild);
                    if (((_a = innerALIChild === null || innerALIChild === void 0 ? void 0 : innerALIChild.children) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                        innerALIChild.children.forEach(innerInnerALIChild => {
                            handleALIChild(innerInnerALIChild);
                        });
                    }
                });
            }
        });
    });
    return Promise.resolve(updatedData);
}
// nested
function getNestedInfoData(category, infoIndex) {
    var _a;
    return (_a = category === null || category === void 0 ? void 0 : category.nestedInfos) === null || _a === void 0 ? void 0 : _a[infoIndex];
}
function checkNestedUniqueSymbol(categories) {
    const categoriesArr = Array.from(categories).map((category) => category[1]);
    return categoriesArr.every((category) => !!(category === null || category === void 0 ? void 0 : category.nestedInfos));
}
function checkNestedUniqueSymbolLegendElement(activeLayerInfo) {
    var _a, _b, _c, _d;
    return !!((_d = (_c = (_b = (_a = activeLayerInfo === null || activeLayerInfo === void 0 ? void 0 : activeLayerInfo.legendElements) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.infos) === null || _c === void 0 ? void 0 : _c.every) === null || _d === void 0 ? void 0 : _d.call(_c, info => (info === null || info === void 0 ? void 0 : info.type) === 'symbol-table'));
}
function getParentLegendElementInfoData(data, parentLegendElementInfo) {
    var _a;
    return (_a = data === null || data === void 0 ? void 0 : data.categories) === null || _a === void 0 ? void 0 : _a.get(parentLegendElementInfo === null || parentLegendElementInfo === void 0 ? void 0 : parentLegendElementInfo.title);
}
// theme
function getTheme(el) {
    const calciteMode = `calcite-mode-`;
    const light = `${calciteMode}light`;
    const dark = `${calciteMode}dark`;
    const isDarkTheme = el.classList.contains(dark);
    return isDarkTheme ? dark : light;
}
// store
function updateStore(layerData) {
    if (layerData.layerId && layerData.intLegendLayerData) {
        const layerId = layerData.layerId;
        const layerDataToSet = layerData.intLegendLayerData;
        const data = Object.assign(Object.assign({}, interactiveLegendState.data), { [layerId]: layerDataToSet });
        store.set('data', data);
    }
}
// handleFilterChange - Configuration experience
function handleFilterChange(filterMode, view) {
    const { type } = filterMode;
    if (type === 'filter') {
        updateExistingFilterToFeatureFilter(view);
    }
    else if (type === 'effect') {
        updateExistingFilterToFeatureEffect(filterMode, view);
    }
}
function updateExistingFilterToFeatureFilter(view) {
    var _a, _b;
    (_b = (_a = view === null || view === void 0 ? void 0 : view.allLayerViews) === null || _a === void 0 ? void 0 : _a.filter((layerView) => { var _a; return ((_a = layerView === null || layerView === void 0 ? void 0 : layerView.layer) === null || _a === void 0 ? void 0 : _a.type) === 'feature'; })) === null || _b === void 0 ? void 0 : _b.forEach((fLayerView) => {
        const existingFilter = getExistingFilter(fLayerView);
        fLayerView.filter = existingFilter;
        fLayerView.set('featureEffect', null);
    });
}
function updateExistingFilterToFeatureEffect(filterMode, view) {
    var _a;
    (_a = view === null || view === void 0 ? void 0 : view.allLayerViews) === null || _a === void 0 ? void 0 : _a.filter((layerView) => { var _a; return ((_a = layerView === null || layerView === void 0 ? void 0 : layerView.layer) === null || _a === void 0 ? void 0 : _a.type) === 'feature'; }).forEach(async (fLayerView) => {
        if ((filterMode === null || filterMode === void 0 ? void 0 : filterMode.effect) && fLayerView) {
            const [FeatureEffect] = await loadModules(['esri/layers/support/FeatureEffect']);
            const { includedEffect, excludedEffect } = filterMode.effect;
            const mergedExcludedEffect = await getMergedEffect(excludedEffect, fLayerView, 'excludedEffect');
            const mergedIncludedEffect = await getMergedEffect(includedEffect, fLayerView, 'includedEffect');
            const existingFilter = getExistingFilter(fLayerView);
            fLayerView.featureEffect = new FeatureEffect({
                filter: existingFilter,
                includedEffect: mergedIncludedEffect,
                excludedEffect: mergedExcludedEffect,
            });
            fLayerView.set('filter', null);
        }
    });
}
function getExistingFilter(fLayerView) {
    var _a;
    return (fLayerView === null || fLayerView === void 0 ? void 0 : fLayerView.filter) || ((_a = fLayerView === null || fLayerView === void 0 ? void 0 : fLayerView.featureEffect) === null || _a === void 0 ? void 0 : _a.filter);
}
function checkIfFieldExists(fLayer, field) {
    const fields = fLayer === null || fLayer === void 0 ? void 0 : fLayer.fields;
    const fieldNames = fields && fields.map(field => field.name);
    return field ? fieldNames && fieldNames.includes(field) : true;
}
function getAllActiveLayerInfos(activeLayerInfos) {
    const arr = [];
    activeLayerInfos.forEach(acl => flattenActiveLayerInfos(acl, arr));
    return arr;
}
function flattenActiveLayerInfos(activeLayerInfo, arr) {
    arr.push(activeLayerInfo);
    if (activeLayerInfo.children && activeLayerInfo.children.length > 0) {
        activeLayerInfo.children.forEach(child => {
            flattenActiveLayerInfos(child, arr);
        });
    }
}

export { getParentLegendElementInfoData as a, getCategoryData as b, checkNoneSelected as c, handleFeatureCount as d, generateData as e, getAllActiveLayerInfos as f, getTheme as g, handleFilterChange as h, interactiveLegendState as i, createInteractiveLegendDataForLayer as j, handleFilter as k, getIntLegendLayerData as l, checkNestedUniqueSymbolLegendElement as m, checkRelationshipRamp as n, showAllNestedUniqueSymbol as o, showAll as p, getMergedEffect as q, getCategoriesArray as r, store as s, checkNestedUniqueSymbol as t, updateStore as u, validateInteractivity as v, calculateTotalFeatureCountForNestedSymbols as w, calculateTotalCount as x, getNestedInfoData as y, zoomTo as z };
