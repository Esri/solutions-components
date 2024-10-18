/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { c as createStore } from './p-dc9d4be3.js';
import { d as EUpdateType, C as CSpatialRefCustomizingPrefix } from './p-80cb7c73.js';
import { E as EFileType, J as JSZip, S as SolutionTemplateFormatVersion } from './p-d0d020a5.js';
import './p-7530a02f.js';
import { c as cleanUrl, r as request, d as blobToFile, f as checkUrlPathTermination, h as getThumbnailFile, i as getItemDataAsJson, b as getPropWithDefault, s as setCreateProp, a as getProp, j as setProp } from './p-9bb44f57.js';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

/* Copyright (c) 2017 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Helper that returns the appropriate portal url for a given request. `requestOptions.portal` is given
 * precedence over `authentication.portal`. If neither `portal` nor `authentication` is present,
 * `www.arcgis.com/sharing/rest` is returned.
 *
 * @param requestOptions - Request options that may have authentication manager
 * @returns Portal url to be used in API requests
 */
function getPortalUrl(requestOptions) {
    if (requestOptions === void 0) { requestOptions = {}; }
    // use portal in options if specified
    if (requestOptions.portal) {
        return cleanUrl(requestOptions.portal);
    }
    // if auth was passed, use that portal
    if (requestOptions.authentication) {
        // the portal url is already scrubbed in the auth package
        return requestOptions.authentication.portal;
    }
    // default to arcgis.com
    return "https://www.arcgis.com/sharing/rest";
}

/* Copyright (c) 2017-2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Serialize an item and its data into a json format accepted by the Portal API for create and update operations
 *
 * @param item Item to be serialized
 * @returns a formatted json object to be sent to Portal
 */
function serializeItem(item) {
    // create a clone so we're not messing with the original
    var clone = JSON.parse(JSON.stringify(item));
    // binary data needs POSTed as a `file`
    // JSON object literals should be passed as `text`.
    if (clone.data) {
        (typeof Blob !== "undefined" && item.data instanceof Blob) ||
            // Node.js doesn't implement Blob
            item.data.constructor.name === "ReadStream"
            ? (clone.file = item.data)
            : (clone.text = item.data);
        delete clone.data;
    }
    return clone;
}
/**
 * `requestOptions.owner` is given priority, `requestOptions.item.owner` will be checked next. If neither are present, `authentication.getUserName()` will be used instead.
 */
function determineOwner(requestOptions) {
    if (requestOptions.owner) {
        return Promise.resolve(requestOptions.owner);
    }
    else if (requestOptions.item && requestOptions.item.owner) {
        return Promise.resolve(requestOptions.item.owner);
    }
    else if (requestOptions.authentication &&
        requestOptions.authentication.getUsername) {
        return requestOptions.authentication.getUsername();
    }
    else {
        return Promise.reject(new Error("Could not determine the owner of this item. Pass the `owner`, `item.owner`, or `authentication` option."));
    }
}
/**
 * checks if the extent is a valid BBox (2 element array of coordinate pair arrays)
 * @param extent
 * @returns
 */
function isBBox(extent) {
    return (Array.isArray(extent) &&
        Array.isArray(extent[0]) &&
        Array.isArray(extent[1]));
}
/**
 * Given a Bbox, convert it to a string. Some api endpoints expect a string
 *
 * @param {BBox} extent
 * @return {*}  {string}
 */
function bboxToString(extent) {
    return extent.join(",");
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { updateItem } from "@esri/arcgis-rest-portal";
 * //
 * updateItem({
 *   item: {
 *     id: "3ef",
 *     description: "A three hour tour"
 *   },
 *   authentication
 * })
 *   .then(response)
 * ```
 * Update an Item. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/update-item.htm) for more information.
 *
 * @param requestOptions - Options for the request.
 * @returns A Promise that updates an item.
 */
function updateItem$1(requestOptions) {
    return determineOwner(requestOptions).then(function (owner) {
        var url = requestOptions.folderId
            ? getPortalUrl(requestOptions) + "/content/users/" + owner + "/" + requestOptions.folderId + "/items/" + requestOptions.item.id + "/update"
            : getPortalUrl(requestOptions) + "/content/users/" + owner + "/items/" + requestOptions.item.id + "/update";
        // serialize the item into something Portal will accept
        requestOptions.params = __assign(__assign({}, requestOptions.params), serializeItem(requestOptions.item));
        // convert extent, if present, into a string from bbox
        // processParams was previously doing this sort of work,
        // however now we need to let array of arrays through
        // Thus for extents we need to move this logic here
        if (requestOptions.params.extent && isBBox(requestOptions.params.extent)) {
            requestOptions.params.extent = bboxToString(requestOptions.params.extent);
        }
        /* istanbul ignore if */
        if (requestOptions.params.file &&
            requestOptions.params.file.constructor &&
            requestOptions.params.file.constructor.name === 'ReadStream') {
            // dataSize is not an official parameter for the ArcGIS REST API but is needed 
            // to encode the ReadStream with an appropriate length. This is to overcome 
            // the form-data library bug:
            // https://github.com/form-data/form-data/issues/508
            requestOptions.params.dataSize = requestOptions.dataSize;
        }
        return request(url, requestOptions);
    });
}
/**
 * ```js
 * import { updateItemResource } from "@esri/arcgis-rest-portal";
 * //
 * updateItemResource({
 *   id: '3ef',
 *   resource: file,
 *   name: 'bigkahuna.jpg',
 *   authentication
 * })
 *   .then(response)
 * ```
 * Update a resource associated with an item. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/update-resources.htm) for more information.
 *
 * @param requestOptions - Options for the request
 * @returns A Promise that updates an item resource.
 */
function updateItemResource(requestOptions) {
    return determineOwner(requestOptions).then(function (owner) {
        var url = getPortalUrl(requestOptions) + "/content/users/" + owner + "/items/" + requestOptions.id + "/updateResources";
        // mix in user supplied params
        requestOptions.params = __assign({ file: requestOptions.resource, fileName: requestOptions.name, resourcesPrefix: requestOptions.prefix, text: requestOptions.content }, requestOptions.params);
        // only override the access specified previously if 'private' is passed explicitly
        if (typeof requestOptions.private !== "undefined") {
            requestOptions.params.access = requestOptions.private
                ? "private"
                : "inherit";
        }
        return request(url, requestOptions);
    });
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { addItemResource } from "@esri/arcgis-rest-portal";
 * //
 * // Add a file resource
 * addItemResource({
 *   id: '3ef',
 *   resource: file,
 *   name: 'bigkahuna.jpg',
 *   authentication
 * })
 *   .then(response)
 * //
 * // Add a text resource
 * addItemResource({
 *   id: '4fg',
 *   content: "Text content",
 *   name: 'bigkahuna.txt',
 *   authentication
 * })
 *   .then(response)
 * ```
 * Add a resource associated with an item. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/add-resources.htm) for more information.
 *
 * @param requestOptions - Options for the request
 * @returns A Promise to add item resources.
 */
function addItemResource(requestOptions) {
    return determineOwner(requestOptions).then(function (owner) {
        var url = getPortalUrl(requestOptions) + "/content/users/" + owner + "/items/" + requestOptions.id + "/addResources";
        requestOptions.params = __assign({ file: requestOptions.resource, fileName: requestOptions.name, resourcesPrefix: requestOptions.prefix, text: requestOptions.content, access: requestOptions.private ? "private" : "inherit" }, requestOptions.params);
        return request(url, requestOptions);
    });
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Remove a resource associated with an item
 *
 * @param requestOptions - Options for the request
 * @returns A Promise that deletes an item resource.
 */
function removeItemResource(requestOptions) {
    return determineOwner(requestOptions).then(function (owner) {
        var url = getPortalUrl(requestOptions) + "/content/users/" + owner + "/items/" + requestOptions.id + "/removeResources";
        // mix in user supplied params
        requestOptions.params = __assign(__assign({}, requestOptions.params), { resource: requestOptions.resource });
        // only override the deleteAll param specified previously if it is passed explicitly
        if (typeof requestOptions.deleteAll !== "undefined") {
            requestOptions.params.deleteAll = requestOptions.deleteAll;
        }
        return request(url, requestOptions);
    });
}

/* Copyright (c) 2018-2019 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Returns an array with arrays of the given size.
 *
 * @param arr Array to split
 * @param size Size of every group
 */
function chunkArray(arr, size) {
    const results = [];
    let index = 0;
    while (index < arr.length) {
        results.push(arr.slice(index, index + size));
        index += size;
    }
    return results;
}

/** @license
 * Copyright 2018 Esri
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
 * Updates an item.
 *
 * @param itemInfo The base info of an item; note that this content will be serialized, which doesn't work
 * for binary content
 * @param authentication Credentials for request
 * @param folderId Item's folder
 * @param additionalParams Updates that are put under the `params` property, which is not serialized
 * @return
 */
function updateItem(itemInfo, authentication, folderId, additionalParams) {
    return new Promise((resolve, reject) => {
        const updateOptions = {
            item: itemInfo,
            folderId: folderId,
            authentication: authentication,
            params: {
                ...(additionalParams ?? {}),
            },
        };
        updateItem$1(updateOptions).then((response) => (response.success ? resolve(response) : reject(response)), (err) => reject(err));
    });
}

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
// ------------------------------------------------------------------------------------------------------------------ //
/**
 * Generates IAssociatedFileCopyResults object.
 *
 * @param fileInfo Info about item that was to be copied
 * @param fetchedFromSource Status of fetching item from source
 * @param copiedToDestination Status of copying item to destination
 * @returns IAssociatedFileCopyResults object
 */
function createCopyResults(fileInfo, fetchedFromSource, copiedToDestination) {
    return {
        ...fileInfo,
        fetchedFromSource,
        copiedToDestination,
    };
}

/** @license
 * Copyright 2020 Esri
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
 * Extracts an item's resource folder and filename from the filename used to store a copy in a storage item.
 *
 * @param storageResourceFilename Filename used to store the resource, metadata, or thumbnail of an item
 * @param storageVersion Version of the Solution template
 * @returns Folder and filename for storing information in an item, as well as the type (resource, metadata,
 * or thumbnail) of the information; the folder property is only meaningful for the resource type
 * @see generateResourceStorageFilename
 * @see generateMetadataStorageFilename
 * @see generateThumbnailStorageFilename
 * @see convertItemResourceToStorageResource
 */
function convertStorageResourceToItemResource(storageResourceFilename, storageVersion = 0) {
    const nameParts = storageResourceFilename.split("/");
    let filename = nameParts.pop();
    let folder = "";
    const firstPrefixPart = nameParts.shift(); // undefined if there's no folder
    // Handle special "folders"
    let type = EFileType.Resource;
    if (firstPrefixPart) {
        if (firstPrefixPart.endsWith("_info_thumbnail")) {
            type = EFileType.Thumbnail;
        }
        else if (firstPrefixPart.endsWith("_info_metadata")) {
            type = EFileType.Metadata;
            filename = "metadata.xml";
        }
        else if (firstPrefixPart.endsWith("_info_data")) {
            type = EFileType.Data;
        }
        else if (firstPrefixPart.endsWith("_info_dataz")) {
            filename = filename.replace(/\.zip$/, "");
            type = EFileType.Data;
            // Otherwise, strip off item id
        }
        else if (storageVersion < 1) {
            // Version 0
            const folderStart = firstPrefixPart.indexOf("_");
            if (folderStart > 0) {
                folder = firstPrefixPart.substr(folderStart + 1);
            }
        }
        else {
            // Version ≥ 1
            folder = nameParts.join("/"); // folder is optional, in which case this will be ""
        }
    }
    return { type, folder, filename };
}

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
// ------------------------------------------------------------------------------------------------------------------ //
/**
 * Copies a resource into a zipfile.
 *
 * @param file Information about the source and destination of the file such as its URL, folder, filename
 * @param zipInfo Information about a zipfile such as its name and its zip object
 * @returns The result of the copy
 */
function copyResourceIntoZip(file, zipInfo) {
    // Add it to the zip
    if (file.folder) {
        zipInfo.zip.folder(file.folder).file(file.filename, file.file, { binary: true });
    }
    else {
        zipInfo.zip.file(file.filename, file.file, { binary: true });
    }
    zipInfo.filelist.push(file);
    return createCopyResults(file, true);
}

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
// ------------------------------------------------------------------------------------------------------------------ //
/**
 * Copies a zipfile into an AGO item.
 *
 * @param zipInfo Information about a zipfile such as its name and its zip object
 * @param destinationItemId Id of item to receive copy of resource/metadata/thumbnail
 * @param destinationAuthentication Credentials for the request to the storage
 * @returns A promise which resolves to the result of the copy
 */
function copyZipIntoItem(zipInfo, destinationItemId, destinationAuthentication) {
    return new Promise((resolve) => {
        zipInfo.zip
            .generateAsync({ type: "blob" })
            .then((content) => {
            return blobToFile(content, zipInfo.filename, "application/zip");
        })
            .then((zipfile) => {
            const addResourceOptions = {
                id: destinationItemId,
                resource: zipfile,
                authentication: destinationAuthentication,
                params: {
                    archive: true,
                },
            };
            return addItemResource(addResourceOptions);
        })
            .then(() => resolve(createCopyResults(zipInfo, true, true)), () => resolve(createCopyResults(zipInfo, true, false)));
    });
}

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
// ------------------------------------------------------------------------------------------------------------------ //
/**
 * Copies the files for storing the resources, metadata, and thumbnail of an item or group to a storage item
 * with a specified path by collecting files into zip files.
 *
 * @param files List of item files' URLs and folder/filenames for storing the files
 * @param destinationItemId Id of item to receive copy of resource/metadata/thumbnail
 * @param destinationAuthentication Credentials for the request to the storage
 * @param filesPerZip Number of files to include per zip file; AGO limits zips to 50 files
 * @returns A promise which resolves to a list of the result of the copies
 */
function copyFilesAsResources(files, destinationItemId, destinationAuthentication, filesPerZip = 40) {
    return new Promise((resolve) => {
        let awaitAllItems = [];
        const zipInfos = [];
        if (files.length > 0) {
            // Bundle the resources into chunked zip updates because AGO tends to have problems with
            // many updates in a row to the same item: it claims success despite randomly failing.
            // Note that AGO imposes a limit of 50 files per zip, so we break the list of resource
            // file info into chunks below this threshold and start a zip for each
            // https://developers.arcgis.com/rest/users-groups-and-items/add-resources.htm
            const chunkedResourceFiles = chunkArray(files, filesPerZip);
            chunkedResourceFiles.forEach((chunk, index) => {
                // Create a zip for this chunk
                const zipInfo = {
                    filename: `resources${index}.zip`,
                    zip: new JSZip(),
                    filelist: [],
                };
                awaitAllItems = awaitAllItems.concat(chunk.map((file) => copyResourceIntoZip(file, zipInfo)));
                zipInfos.push(zipInfo);
            });
        }
        if (awaitAllItems.length > 0) {
            // Wait until the Resource zip file(s) are prepared
            void Promise.all(awaitAllItems).then((results) => {
                // We have three types of results:
                // | fetchedFromSource | copiedToDestination |             interpretation            |        |
                // +-------------------+---------------------+------------------------------------------------+
                // |       false       |          *          | could not fetch file from source               |
                // |       true        |        true         | file has been fetched and sent to AGO          |
                // |       true        |      undefined      | file has been fetched and will be sent via zip |
                // Filter out copiedToDestination===undefined; we'll get their status when we send their zip
                results = results.filter((result) => !(result.fetchedFromSource && typeof result.copiedToDestination === "undefined"));
                // Now send the resources to AGO
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                _copyAssociatedFileZips(zipInfos, destinationItemId, destinationAuthentication).then((zipResults) => {
                    resolve(results.concat(zipResults));
                });
            });
        }
        else {
            // No data, metadata, or resources to send; we're done
            resolve([]);
        }
    });
}
/**
 * Copies one or more zipfiles to a storage item.
 *
 * @param zipInfos List of zip files containing files to store
 * @param destinationItemId Id of item to receive copy of resource/metadata/thumbnail
 * @param destinationAuthentication Credentials for the request to the storage
 * @returns A promise which resolves to a list of the result of the copies
 * @private
 */
function _copyAssociatedFileZips(zipInfos, destinationItemId, destinationAuthentication) {
    return new Promise((resolve) => {
        const results = [];
        // Filter out empty zips, which can happen when none of the files in the chunk going into a zip
        // can be fetched; e.g., the only file is metadata.xml, and the source item doesn't have metadata
        const nonEmptyZipInfos = zipInfos.filter((zipInfo) => Object.keys(zipInfo.zip.files).length > 0);
        if (nonEmptyZipInfos.length > 0) {
            // Send the zip(s) to AGO
            void _sendZipsSeriallyToItem(nonEmptyZipInfos, destinationItemId, destinationAuthentication).then((zipResults) => {
                resolve(zipResults);
            });
        }
        else {
            // No resources to send; we're done
            resolve(results);
        }
    });
}
/**
 * Copies one or more zipfiles to a storage item in a serial fashion, waiting a bit between sends.
 *
 * @param zipInfos List of zip files containing files to store
 * @param destinationItemId Id of item to receive copy of resource/metadata/thumbnail
 * @param destinationAuthentication Credentials for the request to the storage
 * @returns A promise which resolves to a list of the result of the copies
 */
function _sendZipsSeriallyToItem(zipInfos, destinationItemId, destinationAuthentication) {
    return new Promise((resolve) => {
        let allResults = [];
        // Remove zip from bottom of list
        const zipInfoToSend = zipInfos.pop();
        // Send predecessors in list
        let sendOthersPromise = Promise.resolve([]);
        if (zipInfos.length > 0) {
            sendOthersPromise = _sendZipsSeriallyToItem(zipInfos, destinationItemId, destinationAuthentication);
        }
        void sendOthersPromise
            .then((response) => {
            allResults = response;
            // Stall a little to give AGO time to catch up
            return new Promise((resolveSleep) => {
                setTimeout(() => resolveSleep(), 1000);
            });
        })
            .then(() => {
            // Now send the zip removed from bottom of the input list
            return copyZipIntoItem(zipInfoToSend, destinationItemId, destinationAuthentication);
        })
            .then((zipResult) => {
            // Save the result of copying this zip as a status for each of the files that it contains
            zipResult.filelist.forEach((fileInfo) => {
                allResults.push(createCopyResults(fileInfo, true, zipResult.copiedToDestination));
            });
            resolve(allResults);
        });
    });
}

/** @license
 * Copyright 2018 Esri
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
 * Copies the files for storing the resources, metadata, and thumbnail of an item or group to a storage item
 * with a specified path.
 *
 * @param files List of item files and paths for storing the files
 * @param storageItemId Id of item to receive copy of resource/metadata
 * @param storageAuthentication Credentials for the request to the storage
 * @returns A promise which resolves to a list of the filenames under which the resource/metadata are stored
 */
function copyFilesToStorageItem(files, storageItemId, storageAuthentication) {
    return new Promise((resolve) => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        void copyFilesAsResources(files, storageItemId, storageAuthentication).then((results) => {
            resolve(results
                // Filter out failures
                .filter((result) => result.fetchedFromSource && result.copiedToDestination)
                // Return folder and filename in storage item's resources
                .map((result) => result.folder + "/" + result.filename));
        });
    });
}
/**
 * Generates the URL for reading an item's resource given the filename of the resource.
 *
 * @param sourcePortalSharingUrl Server/sharing
 * @param itemId Id of item
 * @param sourceResourceFilename Either filename or folder/filename to resource
 * @returns URL string
 */
function generateSourceResourceUrl(sourcePortalSharingUrl, itemId, sourceResourceFilename) {
    return (checkUrlPathTermination(sourcePortalSharingUrl) + "content/items/" + itemId + "/resources/" + sourceResourceFilename);
}
/**
 * Generates a list of full URLs and folder/filename combinations used to store the resources, metadata,
 * and thumbnail of an item.
 *
 * @param portalSharingUrl Server/sharing
 * @param storageItemId Id of storage item
 * @param resourceFilenames List of resource filenames for an item, e.g., ["file1", "myFolder/file2"]
 * @param storageVersion Version of the Solution template
 * @returns List of item files' URLs and folder/filenames for storing the files
 */
function generateStorageFilePaths(portalSharingUrl, storageItemId, resourceFilenames = [], storageVersion = 0) {
    return resourceFilenames.map((resourceFilename) => {
        return {
            url: generateSourceResourceUrl(portalSharingUrl, storageItemId, resourceFilename),
            ...convertStorageResourceToItemResource(resourceFilename, storageVersion),
        };
    });
}
function isSupportedFileType(filename) {
    // Supported file formats are: .json, .xml, .txt, .png, .pbf, .zip, .jpeg, .jpg, .gif, .bmp, .gz, .svg,
    // .svgz, .geodatabase (https://developers.arcgis.com/rest/users-groups-and-items/add-resources.htm)
    const filenameExtension = filename.match(/\.([a-z]+)$/i);
    const supportedExtensions = "|.json|.xml|.txt|.png|.pbf|.zip|.jpeg|.jpg|.gif|.bmp|.gz|.svg|.svgz|.geodatabase|";
    return !!filenameExtension && supportedExtensions.indexOf("|" + filenameExtension[0] + "|") >= 0;
}
/**
 * Gets the thumbnail of an item or group.
 *
 * @param authentication Credentials for the request to the storage
 * @param filePaths List of item files' URLs and folder/filenames for storing the files
 * @returns A promise which resolves to a boolean indicating if the copies were successful
 */
function getThumbnailFromStorageItem(authentication, filePaths) {
    let thumbnailUrl;
    let thumbnailFilename;
    filePaths.forEach((path) => {
        if (path.type === EFileType.Thumbnail) {
            thumbnailUrl = path.url;
            thumbnailFilename = path.filename;
        }
    });
    if (!thumbnailUrl) {
        return Promise.resolve(null);
    }
    return getThumbnailFile(thumbnailUrl, thumbnailFilename, authentication);
}
/**
 * Removes the item's resource that matches the filename with new content
 *
 * @param itemId Id of the item to remove
 * @param filename Name of the resource file to remove
 * @param authentication Credentials for the request to the storage
 * @returns A promise which resolves with a success true/false response
 */
function removeItemResourceFile(itemId, filename, authentication) {
    return removeItemResource({
        id: itemId,
        resource: filename,
        authentication: authentication,
    });
}
/**
 * Updates the item's resource that matches the filename with new content
 *
 * @param itemId Id of the item to update
 * @param filename Name of the resource file to update; prefix optional (e.g., a/b/file.txt)
 * @param resource The new content to update the resource with
 * @param authentication Credentials for the request to the storage
 * @returns A promise which resolves with a success true/false response
 */
function updateItemResourceFile(itemId, filename, resource, authentication) {
    // Prefix has to be specified separately
    const prefixedFilenameParts = filename.split("/");
    const prefix = prefixedFilenameParts.length > 1
        ? prefixedFilenameParts.slice(0, prefixedFilenameParts.length - 1).join("/")
        : undefined;
    const suffix = prefixedFilenameParts[prefixedFilenameParts.length - 1];
    return updateItemResource({
        id: itemId,
        prefix: prefix,
        name: suffix,
        resource,
        authentication: authentication,
    });
}

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
const EmptySolutionStore = {
    solutionItemId: "",
    defaultWkid: undefined,
    solutionData: { metadata: {}, templates: [] },
    templateEdits: {},
    featureServices: [],
    spatialReferenceInfo: {
        enabled: false,
        services: {}
    }
};
class SolutionStore {
    static _instance;
    _store;
    _hasChanges = false;
    _authentication;
    /**
     * Creates singleton instance when accessed; default export from module.
     *
     * @returns Static instance of the class
     */
    static get Store() {
        return this._instance || (this._instance = new this());
    }
    /**
     * Creates an empty store.
     *
     * @protected
     */
    constructor() {
        this._store = createStore({
            ...EmptySolutionStore
        });
    }
    /**
     * Returns the stored information of an item.
     *
     * @param itemId Id of item to fetch
     *
     * @returns Item information or `undefined` if not found
     */
    getItemInfo(itemId) {
        const templates = this._store.get("solutionData").templates;
        let template;
        templates.some((t) => {
            if (itemId == t.itemId) {
                template = t;
                return true;
            }
            return false;
        });
        return template;
    }
    /**
     * Returns a top-level store property: solutionItemId, defaultWkid, etc.
     *
     * @param propName Name of property
     *
     * @returns Value of property
     */
    getStoreInfo(propName) {
        return this._store.get(propName);
    }
    /**
     * Loads a Solution into the store from AGO.
     *
     * @param solutionItemId Id of the solution represented in the store
     * @param authentication Credentials for fetching information to be loaded into the store
     *
     * @returns Promise that resolves when task is done
     */
    async loadSolution(solutionItemId, authentication) {
        this._authentication = authentication;
        const solutionData = await getItemDataAsJson(solutionItemId, authentication);
        if (solutionData) {
            const defaultWkid = getPropWithDefault(solutionData, "params.wkid.default", "");
            await this._prepareSolutionItemsForEditing(solutionItemId, solutionData.templates, authentication);
            const featureServices = this._getFeatureServices(solutionData.templates);
            const spatialReferenceInfo = this._getSpatialReferenceInfo(featureServices, defaultWkid);
            this._store.set("solutionItemId", solutionItemId);
            this._store.set("defaultWkid", defaultWkid);
            this._store.set("solutionData", solutionData);
            this._store.set("featureServices", featureServices);
            this._store.set("spatialReferenceInfo", spatialReferenceInfo);
        }
        this._flagStoreHasChanges(false);
    }
    /**
     * Queues the replacement of the thumbnail associated with a template item in the store.
     *
     * @param itemEdit Details of the template to modify, containing the new thumbnail in the `thumbnail`
     * property
     */
    replaceItemThumbnail(itemEdit) {
        // Flag the current thumbnail and any replacements for removal
        itemEdit.resourceFilePaths.forEach((path) => {
            if (path.type === EFileType.Thumbnail) {
                if (path.updateType === EUpdateType.None) {
                    // Existing thumbnail not yet flagged for removal
                    path.updateType = EUpdateType.Remove;
                }
                else if (path.updateType === EUpdateType.Add || path.updateType === EUpdateType.Update) {
                    // An earlier replacement
                    path.updateType = EUpdateType.Obsolete;
                }
            }
        });
        // Remove any replacements already queued
        itemEdit.resourceFilePaths =
            itemEdit.resourceFilePaths.filter((path) => path.updateType != EUpdateType.Obsolete);
        // Add the new thumbnail to the store item
        itemEdit.resourceFilePaths.push({
            blob: itemEdit.thumbnail,
            filename: itemEdit.thumbnail.name,
            type: EFileType.Thumbnail,
            updateType: EUpdateType.Add
        });
        // Update the store
        this.setItemInfo(itemEdit);
    }
    /**
     * Writes a Solution into AGO from the store. Must use `loadSolution` to continue with solution.
     *
     * @returns Promise that resolves when task is done
     */
    async saveSolution() {
        // Update the templates in the original solution item data
        const solutionItemId = this._store.get("solutionItemId");
        const solutionData = this._store.get("solutionData");
        const spatialReferenceInfo = this._store.get("spatialReferenceInfo");
        const featureServices = this._store.get("featureServices");
        await this._prepareSolutionItemsForStorage(solutionItemId, solutionData.templates, this._authentication);
        // Update the templates in the solution item data
        this._updateFSSpatialReferenceInfoInTemplates(featureServices, solutionData.templates);
        // Update the solution-level information about the spatial reference parameter
        if (spatialReferenceInfo.enabled) {
            const solutionSpatialReferenceData = {
                "label": "Spatial Reference",
                "valueType": "spatialReference",
                "attributes": {
                    "required": true
                }
            };
            if (spatialReferenceInfo.default) {
                solutionSpatialReferenceData.default = spatialReferenceInfo.default;
            }
            setCreateProp(solutionData, "params.wkid", solutionSpatialReferenceData);
        }
        else {
            setCreateProp(solutionData, "params.wkid", {});
        }
        const itemInfo = {
            id: solutionItemId,
            text: solutionData
        };
        await updateItem(itemInfo, this._authentication);
    }
    /**
     * Stores information for item.
     *
     * @param itemEdit Item information
     */
    setItemInfo(itemEdit) {
        const solutionData = this._store.get("solutionData");
        const templates = solutionData.templates;
        templates.some((t) => {
            if (itemEdit.itemId == t.itemId) {
                t = itemEdit;
                this._store.set("solutionData", solutionData);
                this._flagStoreHasChanges(true);
                return true;
            }
            return false;
        });
    }
    /**
     * Sets a top-level store property: solutionItemId, defaultWkid, etc.
     *
     * @param propName Name of property
     * @param value Value of property
     */
    setStoreInfo(propName, value) {
        this._store.set(propName, value);
        this._flagStoreHasChanges(true);
    }
    //------------------------------------------------------------------------------------------------------------------//
    /** Provides access to protected methods for unit testing.
     *
     *  @param methodName Name of protected method to run
     *  @param arg1 First argument to forward to method, e.g., for "_prepareSolutionItemsForEditing", `solutionItemId`
     *  @param arg2 Second argument to forward to method, e.g., for "_prepareSolutionItemsForEditing", `templates`
     *  @param arg3 Third argument to forward to method, e.g., for "_prepareSolutionItemsForEditing", `authentication`
     *
     *  @returns
     */
    _testAccess(methodName, arg1, arg2, arg3) {
        switch (methodName) {
            case "_emptyTheStore":
                this._emptyTheStore();
                break;
            case "_getFeatureServices":
                return this._getFeatureServices(arg1);
            case "_getItemsSharedWithThisGroup":
                return this._getItemsSharedWithThisGroup(arg1, arg2);
            case "_getResourceFilePaths":
                return this._getResourceFilePaths(arg1, arg2, arg3);
            case "_getResourceStorageName":
                return this._getResourceStorageName(arg1, arg2);
            case "_getSpatialReferenceInfo":
                return this._getSpatialReferenceInfo(arg1, arg2);
            case "_prepareSolutionItemsForEditing":
                return this._prepareSolutionItemsForEditing(arg1, arg2, arg3);
            case "_prepareSolutionItemsForStorage":
                return this._prepareSolutionItemsForStorage(arg1, arg2, arg3);
            case "_splitFilename":
                return this._splitFilename(arg1);
            case "_updateFSSpatialReferenceInfoInTemplates":
                return this._updateFSSpatialReferenceInfoInTemplates(arg1, arg2);
        }
        return null;
    }
    /**
     * Returns the store to the empty state.
     *
     * @protected
     */
    _emptyTheStore() {
        this._store.set("solutionItemId", EmptySolutionStore.solutionItemId);
        this._store.set("defaultWkid", EmptySolutionStore.defaultWkid);
        this._store.set("solutionData", EmptySolutionStore.solutionData);
        this._store.set("templateEdits", EmptySolutionStore.templateEdits);
        this._store.set("featureServices", EmptySolutionStore.featureServices);
        this._store.set("spatialReferenceInfo", EmptySolutionStore.spatialReferenceInfo);
    }
    /**
     * Sets the store's flag indicating if it has changes and dispatches an event when
     * the flag value changes.
     *
     * @param flagHasChanges Current state of change in the store; if it doesn't match the value saved in this
     * object, an event is dispatched with the new value and the saved value is updated
     *
     * @protected
     */
    _flagStoreHasChanges(flagHasChanges) {
        // Event for notifying if the store has changes or not
        window.dispatchEvent(new CustomEvent("solutionStoreHasChanges", {
            detail: flagHasChanges,
            bubbles: true,
            cancelable: false,
            composed: true
        }));
        this._hasChanges = flagHasChanges;
    }
    /**
     * Gets a list of Feature Services that are not views.
     *
     * @param templates A list of item templates from the solution
     *
     * @returns a list of feature services
     *
     * @protected
     */
    _getCustomizableFeatureServices(templates) {
        return templates.reduce((prev, cur) => {
            if (cur.type === "Feature Service" && cur.item.typeKeywords.indexOf("View Service") < 0) {
                prev.push(cur);
            }
            return prev;
        }, []);
    }
    /**
     * Gets a list of Feature Services that are not views along with an enabled property that indicates
     * if the service currently uses a spatial reference variable.
     *
     * @param templates A list of item templates from the solution
     *
     * @returns a list of feature service names and an enabled property to indicate
     * if they currently use a spatial reference variable.
     *
     * @protected
     */
    _getFeatureServices(templates) {
        const customizableFeatureServices = this._getCustomizableFeatureServices(templates);
        return customizableFeatureServices.map((fs) => {
            const name = fs.item.title || fs.item.name;
            const wkid = getProp(fs, "properties.service.spatialReference.wkid");
            return {
                id: fs.itemId,
                name,
                enabled: wkid.toString().startsWith(CSpatialRefCustomizingPrefix),
                wkid
            };
        });
    }
    /**
     * Capture the key item details for a given group template
     *
     * @param template one of the templates from the current solution
     * @param templates full list of templates
     *
     * @returns a list of IItemShare objects
     *
     * @protected
     */
    _getItemsSharedWithThisGroup(template, templates) {
        return templates.reduce((prev, cur) => {
            if (cur.itemId !== template.itemId && cur.type !== "Group") {
                prev.push({
                    id: cur.itemId,
                    title: cur.item.name || cur.item.title,
                    isShared: (cur.groups || []).indexOf(template.itemId) > -1,
                    shareItem: (cur.groups || []).indexOf(template.itemId) > -1,
                    type: cur.type,
                    typeKeywords: cur.item.typeKeywords
                });
            }
            return prev;
        }, []);
    }
    /**
     * Generate storage file paths from the solution template
     *
     * @param solutionId the id of the current solution
     * @param template the current template from the solution
     * @param portal Portal where file is to be found
     *
     * @returns a list of resource file infos
     *
     * @protected
     */
    _getResourceFilePaths(solutionId, template, portal) {
        const resourceFilePaths = generateStorageFilePaths(portal, solutionId, template.resources, SolutionTemplateFormatVersion);
        return resourceFilePaths.map((fp) => {
            fp.updateType = EUpdateType.None;
            return fp;
        });
    }
    /**
     * Generates a resource name from a storage file path.
     *
     * @param templateItemId The id of the template item whose resource this is; used as a prefix in the resource name
     * @param resourcePath Resource file infos
     *
     * @returns The resource name to use when attaching a resource to the item.
     *
     * @protected
     */
    _getResourceStorageName(templateItemId, resourcePath) {
        /* Converts
          {
            "url": "https://myorg.maps.arcgis.com/sharing/rest/content/items/ca924c6db7d247b9a31fa30532fb5913/resources/79036430a6274e17ae915d0278b8569c_info_metadata/metadata.xml",
            "type": 2,
            "folder": "",
            "filename": "metadata.xml",
            "updateType": 3
          }
          to
          ca924c6db7d247b9a31fa30532fb5913_info_metadata/metadata.xml
        */
        let prefix = templateItemId;
        switch (resourcePath.type) {
            case EFileType.Data:
                prefix = `${prefix}_info_data`;
                break;
            case EFileType.Info:
                prefix = `${prefix}_info`;
                break;
            case EFileType.Metadata:
                prefix = `${prefix}_info_metadata`;
                break;
            case EFileType.Resource:
                break;
            case EFileType.Thumbnail:
                prefix = `${prefix}_info_thumbnail`;
                break;
        }
        let filenameToUse = resourcePath.filename;
        if (resourcePath.type == EFileType.Data && filenameToUse && !isSupportedFileType(filenameToUse)) {
            filenameToUse = filenameToUse + ".zip";
            prefix += "z";
        }
        const filename = resourcePath.folder ? resourcePath.folder + "/" + filenameToUse : filenameToUse;
        return prefix + "/" + filename;
    }
    /**
     * Extracts basic spatial reference information that is used to determine if a custom spatial reference parameter will
     * be exposed while deploying this solution and if so what feature services will support it and what will the default wkid be
     *
     * @param services a list of objects with service name and enabled property (indicates if they currently use a spatial reference var)
     * @param defaultWkid the default wkid
     *
     * @returns an object that stores if a custom spatial reference parameter is enabled/disabled,
     * a list of services and if they are enabled/disabled, and the default wkid
     *
     * @protected
     */
    _getSpatialReferenceInfo(services, defaultWkid) {
        const defaultServices = {};
        services.forEach(service => {
            defaultServices[service.name] = service.enabled;
        });
        const spatialReferenceInfo = {
            enabled: false,
            services: defaultServices
        };
        if (defaultWkid) {
            spatialReferenceInfo.default = defaultWkid;
        }
        return spatialReferenceInfo;
    }
    /**
     * Create and store template items for the editor.
     *
     * @param solutionItemId Id of the solution represented in the store
     * @param templates A list of item templates from the solution
     * @param authentication Credentials for fetching information to be loaded into the store
     *
     * @returns a promise that resolves when the templates are ready
     *
     * @protected
     */
    async _prepareSolutionItemsForEditing(solutionItemId, templates, authentication) {
        const thumbnailPromises = [];
        // Augment the template with paths to resources and group information, if relevant
        templates.forEach((t) => {
            t.resourceFilePaths = this._getResourceFilePaths(solutionItemId, t, authentication.portal);
            thumbnailPromises.push(t.resourceFilePaths.length > 0 ?
                getThumbnailFromStorageItem(authentication, t.resourceFilePaths) :
                Promise.resolve());
            t.groupDetails = t.type === "Group" ? this._getItemsSharedWithThisGroup(t, templates) : [];
        });
        // Augment the template with its thumbnail file
        const thumbnails = await Promise.all(thumbnailPromises);
        templates.forEach((t, i) => {
            t.thumbnail = thumbnails[i] ? thumbnails[i] : undefined;
        });
        return Promise.resolve();
    }
    /**
     * Prepares template items for sending to AGO by updating the resources held by the solution item.
     *
     * @param solutionItemId Id of the solution represented in the store
     * @param templates A list of item templates from the solution
     * @param authentication Credentials for fetching information to be loaded into the store
     *
     * @returns a promise that resolves when the templates are ready
     *
     * @protected
     */
    async _prepareSolutionItemsForStorage(solutionItemId, templates, authentication) {
        const resourceAdds = [];
        // Update the resources and remove the augmentation from a template
        const pendingTasks = [];
        templates.forEach((t) => {
            // Run through the resourceFilePaths for the item seeking modifications to be made to the solution item's
            // collection of resources; queue them for batching
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            t.resourceFilePaths.forEach(async (path) => {
                const storageName = this._getResourceStorageName(t.itemId, path);
                switch (path.updateType) {
                    case EUpdateType.Add:
                        const { prefix, suffix } = this._splitFilename(storageName);
                        t.resources.push(storageName);
                        resourceAdds.push({
                            itemId: t.itemId,
                            file: path.blob,
                            folder: prefix,
                            filename: suffix
                        });
                        break;
                    case EUpdateType.Update:
                        // eslint-disable-next-line @typescript-eslint/no-misused-promises
                        pendingTasks.push(new Promise(async (resolve) => {
                            try {
                                await updateItemResourceFile(solutionItemId, storageName, path.blob, authentication);
                            }
                            catch (err) {
                                console.log("Unable to update " + storageName + " for item " + t.itemId + ": " + JSON.stringify(err));
                            }
                            resolve();
                        }));
                        break;
                    case EUpdateType.Remove:
                        // eslint-disable-next-line @typescript-eslint/no-misused-promises
                        pendingTasks.push(new Promise(async (resolve) => {
                            try {
                                await removeItemResourceFile(solutionItemId, storageName, authentication);
                                t.resources = t.resources.filter((path) => path !== storageName);
                            }
                            catch (err) {
                                console.log("Unable to remove " + storageName + " for item " + t.itemId + ": " + JSON.stringify(err));
                            }
                            resolve();
                        }));
                        break;
                }
                return Promise.resolve();
            });
            delete t.resourceFilePaths;
            delete t.thumbnail;
            delete t.groupDetails;
        });
        // Update the resources
        return Promise.all(pendingTasks)
            .then(async () => {
            if (resourceAdds.length > 0) {
                await copyFilesToStorageItem(resourceAdds, solutionItemId, authentication);
            }
            return Promise.resolve();
        });
    }
    /**
     * Stores basic spatial reference information that is used to determine if a custom spatial reference parameter will
     * be exposed while deploying this solution and if so what feature services will support it and what will the default wkid be
     *
     * @param featureServices The configuration settings for a custom spatial reference by feature service
     * @param templates The templates in the current solution, which will be updated in place if
     * `spatialReferenceInfo.enabled` is true
     *
     * @protected
     */
    _updateFSSpatialReferenceInfoInTemplates(featureServices, templates) {
        const customizableFeatureServices = this._getCustomizableFeatureServices(templates);
        // Enable or disable this feature in each service
        customizableFeatureServices.forEach((fsTemplate) => {
            const fsEnablement = featureServices.find((fs) => fs.id === fsTemplate.itemId);
            if (fsEnablement) {
                const spatialReference = getPropWithDefault(fsTemplate, "properties.service.spatialReference", {});
                spatialReference.wkid = fsEnablement.wkid;
                if (fsEnablement.enabled && spatialReference.latestWkid) {
                    delete spatialReference.latestWkid;
                }
                setProp(fsTemplate, "properties.service.spatialReference", spatialReference);
            }
        });
        // Copy the updates back into the templates
        templates.forEach((t) => {
            const customizedTemplate = customizableFeatureServices.find((fs) => fs.itemId === t.itemId);
            if (customizedTemplate) {
                t.properties.service.spatialReference = {
                    ...customizedTemplate.properties.service.spatialReference
                };
                const nWkid = Number.parseInt(t.properties.service.spatialReference.wkid);
                if (!isNaN(nWkid)) {
                    t.properties.service.spatialReference.wkid = nWkid;
                }
            }
        });
    }
    /**
     * Splits a pathed filename into a last term and a prefix; e.g., "a/b/c" returns "c" with a prefix of "a/b".
     *
     * @param filename Filename with optional path
     *
     * @returns An object consisting of a `prefix` (undefined if `filename` does not contain a path) and a `suffix`--the
     * filename at the end of a path
     *
     * @protected
     */
    _splitFilename(filename) {
        const filenameParts = filename.split("/");
        return {
            prefix: filenameParts.length > 1 ? filenameParts.slice(0, filenameParts.length - 1).join("/") : undefined,
            suffix: filenameParts[filenameParts.length - 1]
        };
    }
}
const state = SolutionStore.Store;

export { state as s };
