/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

const esriLoader = require('./esri-loader-08dc41bd.js');

/*
 *   Copyright (c) 2024 Esri
 *   All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.
 *   This material is licensed for use under the Esri Master License Agreement (MLA), and is bound by the terms of that agreement.
 *   You may redistribute and use this code without modification, provided you adhere to the terms of the MLA and include this copyright notice.
 *   See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
 */
const loadModules = async (moduleNames, options) => {
    esriLoader.esriLoader.exports.setDefaultOptions({ url: 'https://js.arcgis.com/4.30/' });
    const mods = await esriLoader.esriLoader.exports.loadModules(moduleNames, options);
    return mods.map(mod => (mod.__esModule && mod.default ? mod.default : mod));
};

exports.loadModules = loadModules;
