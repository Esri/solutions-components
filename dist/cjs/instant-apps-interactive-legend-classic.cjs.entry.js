/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5a0af791.js');
const helpers = require('./helpers-3a8234e8.js');
const _commonjsHelpers = require('./_commonjsHelpers-baf43783.js');
const loadModules = require('./loadModules-8567855e.js');
require('./index-da709a10.js');
require('./esri-loader-08dc41bd.js');

const DPI = 96;
function pt2px(pt) {
    if (!pt) {
        return 0;
    }
    return (pt / 72) * DPI;
}

var maquette_umd = {exports: {}};

(function (module, exports) {
(function (global, factory) {
    factory(exports) ;
})(_commonjsHelpers.commonjsGlobal, (function (exports) {
    var NAMESPACE_W3 = "http://www.w3.org/";
    var NAMESPACE_SVG = "".concat(NAMESPACE_W3, "2000/svg");
    var NAMESPACE_XLINK = "".concat(NAMESPACE_W3, "1999/xlink");
    var emptyArray = [];
    var extend = function (base, overrides) {
        var result = {};
        Object.keys(base).forEach(function (key) {
            result[key] = base[key];
        });
        if (overrides) {
            Object.keys(overrides).forEach(function (key) {
                result[key] = overrides[key];
            });
        }
        return result;
    };
    var same = function (vnode1, vnode2) {
        if (vnode1.vnodeSelector !== vnode2.vnodeSelector) {
            return false;
        }
        if (vnode1.properties && vnode2.properties) {
            if (vnode1.properties.key !== vnode2.properties.key) {
                return false;
            }
            return vnode1.properties.bind === vnode2.properties.bind;
        }
        return !vnode1.properties && !vnode2.properties;
    };
    var checkStyleValue = function (styleValue) {
        if (typeof styleValue !== "string") {
            throw new Error("Style values must be strings");
        }
    };
    var findIndexOfChild = function (children, sameAs, start) {
        if (sameAs.vnodeSelector !== "") {
            // Never scan for text-nodes
            for (var i = start; i < children.length; i++) {
                if (same(children[i], sameAs)) {
                    return i;
                }
            }
        }
        return -1;
    };
    var checkDistinguishable = function (childNodes, indexToCheck, parentVNode, operation) {
        var childNode = childNodes[indexToCheck];
        if (childNode.vnodeSelector === "") {
            return; // Text nodes need not be distinguishable
        }
        var properties = childNode.properties;
        var key = properties
            ? properties.key === undefined
                ? properties.bind
                : properties.key
            : undefined;
        if (!key) {
            // A key is just assumed to be unique
            for (var i = 0; i < childNodes.length; i++) {
                if (i !== indexToCheck) {
                    var node = childNodes[i];
                    if (same(node, childNode)) {
                        throw {
                            error: new Error("".concat(parentVNode.vnodeSelector, " had a ").concat(childNode.vnodeSelector, " child ").concat(operation === "added" ? operation : "removed", ", but there is now more than one. You must add unique key properties to make them distinguishable.")),
                            parentNode: parentVNode,
                            childNode: childNode,
                        };
                    }
                }
            }
        }
    };
    var nodeAdded = function (vNode) {
        if (vNode.properties) {
            var enterAnimation = vNode.properties.enterAnimation;
            if (enterAnimation) {
                enterAnimation(vNode.domNode, vNode.properties);
            }
        }
    };
    var removedNodes = [];
    var requestedIdleCallback = false;
    var visitRemovedNode = function (node) {
        (node.children || []).forEach(visitRemovedNode);
        if (node.properties && node.properties.afterRemoved) {
            node.properties.afterRemoved.apply(node.properties.bind || node.properties, [
                node.domNode,
            ]);
        }
    };
    var processPendingNodeRemovals = function () {
        requestedIdleCallback = false;
        removedNodes.forEach(visitRemovedNode);
        removedNodes.length = 0;
    };
    var scheduleNodeRemoval = function (vNode) {
        removedNodes.push(vNode);
        if (!requestedIdleCallback) {
            requestedIdleCallback = true;
            if (typeof window !== "undefined" && "requestIdleCallback" in window) {
                window.requestIdleCallback(processPendingNodeRemovals, { timeout: 16 });
            }
            else {
                setTimeout(processPendingNodeRemovals, 16);
            }
        }
    };
    var nodeToRemove = function (vNode) {
        var domNode = vNode.domNode;
        if (vNode.properties) {
            var exitAnimation = vNode.properties.exitAnimation;
            if (exitAnimation) {
                domNode.style.pointerEvents = "none";
                var removeDomNode = function () {
                    if (domNode.parentNode) {
                        domNode.parentNode.removeChild(domNode);
                        scheduleNodeRemoval(vNode);
                    }
                };
                exitAnimation(domNode, removeDomNode, vNode.properties);
                return;
            }
        }
        if (domNode.parentNode) {
            domNode.parentNode.removeChild(domNode);
            scheduleNodeRemoval(vNode);
        }
    };
    var setProperties = function (domNode, properties, projectionOptions) {
        if (!properties) {
            return;
        }
        var eventHandlerInterceptor = projectionOptions.eventHandlerInterceptor;
        var propNames = Object.keys(properties);
        var propCount = propNames.length;
        var _loop_1 = function (i) {
            var propName = propNames[i];
            var propValue = properties[propName];
            if (propName === "className") {
                throw new Error('Property "className" is not supported, use "class".');
            }
            else if (propName === "class") {
                toggleClasses(domNode, propValue, true);
            }
            else if (propName === "classes") {
                // object with string keys and boolean values
                var classNames = Object.keys(propValue);
                var classNameCount = classNames.length;
                for (var j = 0; j < classNameCount; j++) {
                    var className = classNames[j];
                    if (propValue[className]) {
                        domNode.classList.add(className);
                    }
                }
            }
            else if (propName === "styles") {
                // object with string keys and string (!) values
                var styleNames = Object.keys(propValue);
                var styleCount = styleNames.length;
                for (var j = 0; j < styleCount; j++) {
                    var styleName = styleNames[j];
                    var styleValue = propValue[styleName];
                    if (styleValue) {
                        checkStyleValue(styleValue);
                        projectionOptions.styleApplyer(domNode, styleName, styleValue);
                    }
                }
            }
            else if (propName !== "key" && propValue !== null && propValue !== undefined) {
                var type = typeof propValue;
                if (type === "function") {
                    if (propName.lastIndexOf("on", 0) === 0) {
                        // lastIndexOf(,0)===0 -> startsWith
                        if (eventHandlerInterceptor) {
                            propValue = eventHandlerInterceptor(propName, propValue, domNode, properties); // intercept eventhandlers
                        }
                        if (propName === "oninput") {
                            (function () {
                                // record the evt.target.value, because IE and Edge sometimes do a requestAnimationFrame between changing value and running oninput
                                var oldPropValue = propValue;
                                propValue = function (evt) {
                                    oldPropValue.apply(this, [evt]);
                                    evt.target["oninput-value"] = evt.target.value; // may be HTMLTextAreaElement as well
                                };
                            })();
                        }
                    }
                    domNode[propName] = propValue;
                }
                else if (projectionOptions.namespace === NAMESPACE_SVG) {
                    if (propName === "href") {
                        domNode.setAttributeNS(NAMESPACE_XLINK, propName, propValue);
                    }
                    else {
                        // all SVG attributes are read-only in DOM, so...
                        domNode.setAttribute(propName, propValue);
                    }
                }
                else if (type === "string" && propName !== "value" && propName !== "innerHTML") {
                    domNode.setAttribute(propName, propValue);
                }
                else {
                    domNode[propName] = propValue;
                }
            }
        };
        for (var i = 0; i < propCount; i++) {
            _loop_1(i);
        }
    };
    var addChildren = function (domNode, children, projectionOptions) {
        if (!children) {
            return;
        }
        for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
            var child = children_1[_i];
            createDom(child, domNode, undefined, projectionOptions);
        }
    };
    var initPropertiesAndChildren = function (domNode, vnode, projectionOptions) {
        addChildren(domNode, vnode.children, projectionOptions); // children before properties, needed for value property of <select>.
        if (vnode.text) {
            domNode.textContent = vnode.text;
        }
        setProperties(domNode, vnode.properties, projectionOptions);
        if (vnode.properties && vnode.properties.afterCreate) {
            vnode.properties.afterCreate.apply(vnode.properties.bind || vnode.properties, [
                domNode,
                projectionOptions,
                vnode.vnodeSelector,
                vnode.properties,
                vnode.children,
            ]);
        }
    };
    var createDom = function (vnode, parentNode, insertBefore, projectionOptions) {
        var _a;
        var domNode;
        var start = 0;
        var vnodeSelector = vnode.vnodeSelector;
        var doc = parentNode.ownerDocument;
        if (vnodeSelector === "") {
            if (vnode.domNode) {
                vnode.domNode.nodeValue = vnode.text;
            }
            else {
                domNode = vnode.domNode = doc.createTextNode(vnode.text);
                if (insertBefore !== undefined) {
                    parentNode.insertBefore(domNode, insertBefore);
                }
                else {
                    parentNode.appendChild(domNode);
                }
            }
        }
        else {
            for (var i = 0; i <= vnodeSelector.length; ++i) {
                var c = vnodeSelector.charAt(i);
                if (i === vnodeSelector.length || c === "." || c === "#") {
                    var type = vnodeSelector.charAt(start - 1);
                    var found = vnodeSelector.slice(start, i);
                    if (type === ".") {
                        domNode.classList.add(found);
                    }
                    else if (type === "#") {
                        domNode.id = found;
                    }
                    else {
                        if (found === "svg") {
                            projectionOptions = extend(projectionOptions, {
                                namespace: NAMESPACE_SVG,
                            });
                        }
                        if (projectionOptions.namespace !== undefined) {
                            domNode = vnode.domNode = doc.createElementNS(projectionOptions.namespace, found);
                        }
                        else {
                            domNode = vnode.domNode =
                                vnode.domNode ||
                                    (((_a = vnode.properties) === null || _a === void 0 ? void 0 : _a.is)
                                        ? doc.createElement(found, { is: vnode.properties.is })
                                        : doc.createElement(found));
                            if (found === "input" && vnode.properties && vnode.properties.type !== undefined) {
                                // IE8 and older don't support setting input type after the DOM Node has been added to the document
                                domNode.setAttribute("type", vnode.properties.type);
                            }
                        }
                        if (insertBefore !== undefined) {
                            parentNode.insertBefore(domNode, insertBefore);
                        }
                        else if (domNode.parentNode !== parentNode) {
                            parentNode.appendChild(domNode);
                        }
                    }
                    start = i + 1;
                }
            }
            initPropertiesAndChildren(domNode, vnode, projectionOptions);
        }
    };
    var updateDom;
    /**
     * Adds or removes classes from an Element
     * @param domNode the element
     * @param classes a string separated list of classes
     * @param on true means add classes, false means remove
     */
    var toggleClasses = function (domNode, classes, on) {
        if (!classes) {
            return;
        }
        classes.split(" ").forEach(function (classToToggle) {
            if (classToToggle) {
                domNode.classList.toggle(classToToggle, on);
            }
        });
    };
    var updateProperties = function (domNode, previousProperties, properties, projectionOptions) {
        if (!properties) {
            return;
        }
        var propertiesUpdated = false;
        var propNames = Object.keys(properties);
        var propCount = propNames.length;
        for (var i = 0; i < propCount; i++) {
            var propName = propNames[i];
            // assuming that properties will be nullified instead of missing is by design
            var propValue = properties[propName];
            var previousValue = previousProperties[propName];
            if (propName === "class") {
                if (previousValue !== propValue) {
                    toggleClasses(domNode, previousValue, false);
                    toggleClasses(domNode, propValue, true);
                }
            }
            else if (propName === "classes") {
                var classList = domNode.classList;
                var classNames = Object.keys(propValue);
                var classNameCount = classNames.length;
                for (var j = 0; j < classNameCount; j++) {
                    var className = classNames[j];
                    var on = !!propValue[className];
                    var previousOn = !!previousValue[className];
                    if (on === previousOn) {
                        continue;
                    }
                    propertiesUpdated = true;
                    if (on) {
                        classList.add(className);
                    }
                    else {
                        classList.remove(className);
                    }
                }
            }
            else if (propName === "styles") {
                var styleNames = Object.keys(propValue);
                var styleCount = styleNames.length;
                for (var j = 0; j < styleCount; j++) {
                    var styleName = styleNames[j];
                    var newStyleValue = propValue[styleName];
                    var oldStyleValue = previousValue[styleName];
                    if (newStyleValue === oldStyleValue) {
                        continue;
                    }
                    propertiesUpdated = true;
                    if (newStyleValue) {
                        checkStyleValue(newStyleValue);
                        projectionOptions.styleApplyer(domNode, styleName, newStyleValue);
                    }
                    else {
                        projectionOptions.styleApplyer(domNode, styleName, "");
                    }
                }
            }
            else {
                if (!propValue && typeof previousValue === "string") {
                    propValue = "";
                }
                if (propName === "value") {
                    // value can be manipulated by the user directly and using event.preventDefault() is not an option
                    var domValue = domNode[propName];
                    if (domValue !== propValue && // The 'value' in the DOM tree !== newValue
                        (domNode["oninput-value"]
                            ? domValue === domNode["oninput-value"] // If the last reported value to 'oninput' does not match domValue, do nothing and wait for oninput
                            : propValue !== previousValue) // Only update the value if the vdom changed
                    ) {
                        // The edge cases are described in the tests
                        domNode[propName] = propValue; // Reset the value, even if the virtual DOM did not change
                        domNode["oninput-value"] = undefined;
                    } // else do not update the domNode, otherwise the cursor position would be changed
                    if (propValue !== previousValue) {
                        propertiesUpdated = true;
                    }
                }
                else if (propValue !== previousValue) {
                    var type = typeof propValue;
                    if (type !== "function" || !projectionOptions.eventHandlerInterceptor) {
                        // Function updates are expected to be handled by the EventHandlerInterceptor
                        if (projectionOptions.namespace === NAMESPACE_SVG) {
                            if (propName === "href") {
                                domNode.setAttributeNS(NAMESPACE_XLINK, propName, propValue);
                            }
                            else {
                                // all SVG attributes are read-only in DOM, so...
                                domNode.setAttribute(propName, propValue);
                            }
                        }
                        else if (type === "string" && propName !== "innerHTML") {
                            if (propName === "role" && propValue === "") {
                                domNode.removeAttribute(propName);
                            }
                            else {
                                domNode.setAttribute(propName, propValue);
                            }
                        }
                        else if (domNode[propName] !== propValue) {
                            // Comparison is here for side-effects in Edge with scrollLeft and scrollTop
                            domNode[propName] = propValue;
                        }
                        propertiesUpdated = true;
                    }
                }
            }
        }
        return propertiesUpdated;
    };
    var updateChildren = function (vnode, domNode, oldChildren, newChildren, projectionOptions) {
        if (oldChildren === newChildren) {
            return false;
        }
        oldChildren = oldChildren || emptyArray;
        newChildren = newChildren || emptyArray;
        var oldChildrenLength = oldChildren.length;
        var newChildrenLength = newChildren.length;
        var oldIndex = 0;
        var newIndex = 0;
        var i;
        var textUpdated = false;
        while (newIndex < newChildrenLength) {
            var oldChild = oldIndex < oldChildrenLength ? oldChildren[oldIndex] : undefined;
            var newChild = newChildren[newIndex];
            if (oldChild !== undefined && same(oldChild, newChild)) {
                textUpdated = updateDom(oldChild, newChild, projectionOptions) || textUpdated;
                oldIndex++;
            }
            else {
                var findOldIndex = findIndexOfChild(oldChildren, newChild, oldIndex + 1);
                if (findOldIndex >= 0) {
                    // Remove preceding missing children
                    for (i = oldIndex; i < findOldIndex; i++) {
                        nodeToRemove(oldChildren[i]);
                        checkDistinguishable(oldChildren, i, vnode, "removed");
                    }
                    textUpdated =
                        updateDom(oldChildren[findOldIndex], newChild, projectionOptions) || textUpdated;
                    oldIndex = findOldIndex + 1;
                }
                else {
                    // New child
                    createDom(newChild, domNode, oldIndex < oldChildrenLength ? oldChildren[oldIndex].domNode : undefined, projectionOptions);
                    nodeAdded(newChild);
                    checkDistinguishable(newChildren, newIndex, vnode, "added");
                }
            }
            newIndex++;
        }
        if (oldChildrenLength > oldIndex) {
            // Remove child fragments
            for (i = oldIndex; i < oldChildrenLength; i++) {
                nodeToRemove(oldChildren[i]);
                checkDistinguishable(oldChildren, i, vnode, "removed");
            }
        }
        return textUpdated;
    };
    updateDom = function (previous, vnode, projectionOptions) {
        var domNode = previous.domNode;
        var textUpdated = false;
        if (previous === vnode) {
            return false; // By contract, VNode objects may not be modified anymore after passing them to maquette
        }
        var updated = false;
        if (vnode.vnodeSelector === "") {
            if (vnode.text !== previous.text) {
                var newTextNode = domNode.ownerDocument.createTextNode(vnode.text);
                domNode.parentNode.replaceChild(newTextNode, domNode);
                vnode.domNode = newTextNode;
                textUpdated = true;
                return textUpdated;
            }
            vnode.domNode = domNode;
        }
        else {
            if (vnode.vnodeSelector.lastIndexOf("svg", 0) === 0) {
                // lastIndexOf(needle,0)===0 means StartsWith
                projectionOptions = extend(projectionOptions, {
                    namespace: NAMESPACE_SVG,
                });
            }
            if (previous.text !== vnode.text) {
                updated = true;
                if (vnode.text === undefined) {
                    domNode.removeChild(domNode.firstChild); // the only textnode presumably
                }
                else {
                    domNode.textContent = vnode.text;
                }
            }
            vnode.domNode = domNode;
            updated =
                updateChildren(vnode, domNode, previous.children, vnode.children, projectionOptions) ||
                    updated;
            updated =
                updateProperties(domNode, previous.properties, vnode.properties, projectionOptions) ||
                    updated;
            if (vnode.properties && vnode.properties.afterUpdate) {
                vnode.properties.afterUpdate.apply(vnode.properties.bind || vnode.properties, [
                    domNode,
                    projectionOptions,
                    vnode.vnodeSelector,
                    vnode.properties,
                    vnode.children,
                ]);
            }
        }
        if (updated && vnode.properties && vnode.properties.updateAnimation) {
            vnode.properties.updateAnimation(domNode, vnode.properties, previous.properties);
        }
        return textUpdated;
    };
    var createProjection = function (vnode, projectionOptions) {
        return {
            getLastRender: function () { return vnode; },
            update: function (updatedVnode) {
                if (vnode.vnodeSelector !== updatedVnode.vnodeSelector) {
                    throw new Error("The selector for the root VNode may not be changed. (consider using dom.merge and add one extra level to the virtual DOM)");
                }
                var previousVNode = vnode;
                vnode = updatedVnode;
                updateDom(previousVNode, updatedVnode, projectionOptions);
            },
            domNode: vnode.domNode,
        };
    };

    var DEFAULT_PROJECTION_OPTIONS = {
        namespace: undefined,
        performanceLogger: function () { return undefined; },
        eventHandlerInterceptor: undefined,
        styleApplyer: function (domNode, styleName, value) {
            if (styleName.charAt(0) === "-") {
                // CSS variables must be set using setProperty
                domNode.style.setProperty(styleName, value);
            }
            else {
                // properties like 'backgroundColor' must be set as a js-property
                domNode.style[styleName] = value;
            }
        },
    };
    var applyDefaultProjectionOptions = function (projectorOptions) {
        return extend(DEFAULT_PROJECTION_OPTIONS, projectorOptions);
    };
    var dom = {
        /**
         * Creates a real DOM tree from `vnode`. The [[Projection]] object returned will contain the resulting DOM Node in
         * its [[Projection.domNode|domNode]] property.
         * This is a low-level method. Users will typically use a [[Projector]] instead.
         * @param vnode - The root of the virtual DOM tree that was created using the [[h]] function. NOTE: [[VNode]]
         * objects may only be rendered once.
         * @param projectionOptions - Options to be used to create and update the projection.
         * @returns The [[Projection]] which also contains the DOM Node that was created.
         */
        create: function (vnode, projectionOptions) {
            projectionOptions = applyDefaultProjectionOptions(projectionOptions);
            createDom(vnode, document.createElement("div"), undefined, projectionOptions);
            return createProjection(vnode, projectionOptions);
        },
        /**
         * Appends a new child node to the DOM which is generated from a [[VNode]].
         * This is a low-level method. Users will typically use a [[Projector]] instead.
         * @param parentNode - The parent node for the new child node.
         * @param vnode - The root of the virtual DOM tree that was created using the [[h]] function. NOTE: [[VNode]]
         * objects may only be rendered once.
         * @param projectionOptions - Options to be used to create and update the [[Projection]].
         * @returns The [[Projection]] that was created.
         */
        append: function (parentNode, vnode, projectionOptions) {
            projectionOptions = applyDefaultProjectionOptions(projectionOptions);
            createDom(vnode, parentNode, undefined, projectionOptions);
            return createProjection(vnode, projectionOptions);
        },
        /**
         * Inserts a new DOM node which is generated from a [[VNode]].
         * This is a low-level method. Users wil typically use a [[Projector]] instead.
         * @param beforeNode - The node that the DOM Node is inserted before.
         * @param vnode - The root of the virtual DOM tree that was created using the [[h]] function.
         * NOTE: [[VNode]] objects may only be rendered once.
         * @param projectionOptions - Options to be used to create and update the projection, see [[createProjector]].
         * @returns The [[Projection]] that was created.
         */
        insertBefore: function (beforeNode, vnode, projectionOptions) {
            projectionOptions = applyDefaultProjectionOptions(projectionOptions);
            createDom(vnode, beforeNode.parentNode, beforeNode, projectionOptions);
            return createProjection(vnode, projectionOptions);
        },
        /**
         * Merges a new DOM node which is generated from a [[VNode]] with an existing DOM Node.
         * This means that the virtual DOM and the real DOM will have one overlapping element.
         * Therefore the selector for the root [[VNode]] will be ignored, but its properties and children will be applied to the Element provided.
         * This is a low-level method. Users wil typically use a [[Projector]] instead.
         * @param element - The existing element to adopt as the root of the new virtual DOM. Existing attributes and child nodes are preserved.
         * @param vnode - The root of the virtual DOM tree that was created using the [[h]] function. NOTE: [[VNode]] objects
         * may only be rendered once.
         * @param projectionOptions - Options to be used to create and update the projection, see [[createProjector]].
         * @returns The [[Projection]] that was created.
         */
        merge: function (element, vnode, projectionOptions) {
            projectionOptions = applyDefaultProjectionOptions(projectionOptions);
            vnode.domNode = element;
            initPropertiesAndChildren(element, vnode, projectionOptions);
            return createProjection(vnode, projectionOptions);
        },
        /**
         * Replaces an existing DOM node with a node generated from a [[VNode]].
         * This is a low-level method. Users will typically use a [[Projector]] instead.
         * @param element - The node for the [[VNode]] to replace.
         * @param vnode - The root of the virtual DOM tree that was created using the [[h]] function. NOTE: [[VNode]]
         * objects may only be rendered once.
         * @param projectionOptions - Options to be used to create and update the [[Projection]].
         * @returns The [[Projection]] that was created.
         */
        replace: function (element, vnode, projectionOptions) {
            projectionOptions = applyDefaultProjectionOptions(projectionOptions);
            createDom(vnode, element.parentNode, element, projectionOptions);
            element.parentNode.removeChild(element);
            return createProjection(vnode, projectionOptions);
        },
    };

    var toTextVNode = function (data) {
        return {
            vnodeSelector: "",
            properties: undefined,
            children: undefined,
            text: data.toString(),
            domNode: null,
        };
    };
    var appendChildren = function (parentSelector, insertions, main) {
        for (var i = 0, length_1 = insertions.length; i < length_1; i++) {
            var item = insertions[i];
            if (Array.isArray(item)) {
                appendChildren(parentSelector, item, main);
            }
            else {
                if (item !== null && item !== undefined && item !== false) {
                    if (typeof item === "string") {
                        item = toTextVNode(item);
                    }
                    main.push(item);
                }
            }
        }
    };
    function h(selector, properties, children) {
        if (Array.isArray(properties)) {
            children = properties;
            properties = undefined;
        }
        else if ((properties && (typeof properties === "string" || properties.vnodeSelector)) ||
            (children && (typeof children === "string" || children.vnodeSelector))) {
            throw new Error("h called with invalid arguments");
        }
        var text;
        var flattenedChildren;
        // Recognize a common special case where there is only a single text node
        if (children && children.length === 1 && typeof children[0] === "string") {
            text = children[0];
        }
        else if (children) {
            flattenedChildren = [];
            appendChildren(selector, children, flattenedChildren);
            if (flattenedChildren.length === 0) {
                flattenedChildren = undefined;
            }
        }
        return {
            vnodeSelector: selector,
            properties: properties,
            children: flattenedChildren,
            text: text === "" ? undefined : text,
            domNode: null,
        };
    }

    var createParentNodePath = function (node, rootNode) {
        var parentNodePath = [];
        while (node && node !== rootNode) {
            parentNodePath.push(node);
            node = node.parentNode;
        }
        return parentNodePath;
    };
    var find;
    if (Array.prototype.find) {
        find = function (items, predicate) { return items.find(predicate); };
    }
    else {
        find = function (items, predicate) { return items.filter(predicate)[0]; };
    }
    var findVNodeByParentNodePath = function (vnode, parentNodePath) {
        var result = vnode;
        parentNodePath.forEach(function (node) {
            result =
                result && result.children
                    ? find(result.children, function (child) { return child.domNode === node; })
                    : undefined;
        });
        return result;
    };
    var createEventHandlerInterceptor = function (projector, getProjection, performanceLogger) {
        return function (propertyName, eventHandler, domNode, properties) { return modifiedEventHandler; };
        function modifiedEventHandler(evt) {
            performanceLogger("domEvent", evt);
            var projection = getProjection();
            var parentNodePath = createParentNodePath(evt.currentTarget, projection.domNode);
            parentNodePath.reverse();
            var matchingVNode = findVNodeByParentNodePath(projection.getLastRender(), parentNodePath);
            projector.scheduleRender();
            var result;
            if (matchingVNode) {
                /* eslint-disable prefer-rest-params */
                result = matchingVNode.properties["on".concat(evt.type)].apply(matchingVNode.properties.bind || this, arguments);
                /* eslint-enable prefer-rest-params */
            }
            performanceLogger("domEventProcessed", evt);
            return result;
        }
    };
    /**
     * Creates a [[Projector]] instance using the provided projectionOptions.
     *
     * For more information, see [[Projector]].
     *
     * @param projectorOptions   Options that influence how the DOM is rendered and updated.
     */
    var createProjector = function (projectorOptions) {
        var projector;
        var projectionOptions = applyDefaultProjectionOptions(projectorOptions);
        var performanceLogger = projectionOptions.performanceLogger;
        var renderCompleted = true;
        var scheduled;
        var stopped = false;
        var projections = [];
        var renderFunctions = []; // matches the projections array
        var addProjection = function (
        /* one of: dom.append, dom.insertBefore, dom.replace, dom.merge */
        domFunction, 
        /* the parameter of the domFunction */
        node, renderFunction) {
            var projection;
            var getProjection = function () { return projection; };
            projectionOptions.eventHandlerInterceptor = createEventHandlerInterceptor(projector, getProjection, performanceLogger);
            projection = domFunction(node, renderFunction(), projectionOptions);
            projections.push(projection);
            renderFunctions.push(renderFunction);
        };
        var doRender = function () {
            scheduled = undefined;
            if (!renderCompleted) {
                return; // The last render threw an error, it should have been logged in the browser console.
            }
            renderCompleted = false;
            performanceLogger("renderStart", undefined);
            for (var i = 0; i < projections.length; i++) {
                var updatedVnode = renderFunctions[i]();
                performanceLogger("rendered", undefined);
                projections[i].update(updatedVnode);
                performanceLogger("patched", undefined);
            }
            performanceLogger("renderDone", undefined);
            renderCompleted = true;
        };
        projector = {
            renderNow: doRender,
            scheduleRender: function () {
                if (!scheduled && !stopped) {
                    scheduled = requestAnimationFrame(doRender);
                }
            },
            stop: function () {
                if (scheduled) {
                    cancelAnimationFrame(scheduled);
                    scheduled = undefined;
                }
                stopped = true;
            },
            resume: function () {
                stopped = false;
                renderCompleted = true;
                projector.scheduleRender();
            },
            append: function (parentNode, renderFunction) {
                addProjection(dom.append, parentNode, renderFunction);
            },
            insertBefore: function (beforeNode, renderFunction) {
                addProjection(dom.insertBefore, beforeNode, renderFunction);
            },
            merge: function (domNode, renderFunction) {
                addProjection(dom.merge, domNode, renderFunction);
            },
            replace: function (domNode, renderFunction) {
                addProjection(dom.replace, domNode, renderFunction);
            },
            detach: function (renderFunction) {
                for (var i = 0; i < renderFunctions.length; i++) {
                    if (renderFunctions[i] === renderFunction) {
                        renderFunctions.splice(i, 1);
                        return projections.splice(i, 1)[0];
                    }
                }
                throw new Error("renderFunction was not found");
            },
        };
        return projector;
    };

    /**
     * Creates a [[CalculationCache]] object, useful for caching [[VNode]] trees.
     * In practice, caching of [[VNode]] trees is not needed, because achieving 60 frames per second is almost never a problem.
     * For more information, see [[CalculationCache]].
     *
     * @param <Result> The type of the value that is cached.
     */
    var createCache = function () {
        var cachedInputs;
        var cachedOutcome;
        return {
            invalidate: function () {
                cachedOutcome = undefined;
                cachedInputs = undefined;
            },
            result: function (inputs, calculation) {
                if (cachedInputs) {
                    for (var i = 0; i < inputs.length; i++) {
                        if (cachedInputs[i] !== inputs[i]) {
                            cachedOutcome = undefined;
                        }
                    }
                }
                if (!cachedOutcome) {
                    cachedOutcome = calculation();
                    cachedInputs = inputs;
                }
                return cachedOutcome;
            },
        };
    };

    /**
     * Creates a {@link Mapping} instance that keeps an array of result objects synchronized with an array of source objects.
     * See {@link http://maquettejs.org/docs/arrays.html|Working with arrays}.
     *
     * @param <Source>       The type of source items. A database-record for instance.
     * @param <Target>       The type of target items. A [[MaquetteComponent]] for instance.
     * @param getSourceKey   `function(source)` that must return a key to identify each source object. The result must either be a string or a number.
     * @param createResult   `function(source, index)` that must create a new result object from a given source. This function is identical
     *                       to the `callback` argument in `Array.map(callback)`.
     * @param updateResult   `function(source, target, index)` that updates a result to an updated source.
     */
    var createMapping = function (getSourceKey, createResult, updateResult) {
        var keys = [];
        var results = [];
        return {
            results: results,
            map: function (newSources) {
                var newKeys = newSources.map(getSourceKey);
                var oldTargets = results.slice();
                var oldIndex = 0;
                for (var i = 0; i < newSources.length; i++) {
                    var source = newSources[i];
                    var sourceKey = newKeys[i];
                    if (sourceKey === keys[oldIndex]) {
                        results[i] = oldTargets[oldIndex];
                        updateResult(source, oldTargets[oldIndex], i);
                        oldIndex++;
                    }
                    else {
                        var found = false;
                        for (var j = 1; j < keys.length + 1; j++) {
                            var searchIndex = (oldIndex + j) % keys.length;
                            if (keys[searchIndex] === sourceKey) {
                                results[i] = oldTargets[searchIndex];
                                updateResult(newSources[i], oldTargets[searchIndex], i);
                                oldIndex = searchIndex + 1;
                                found = true;
                                break;
                            }
                        }
                        if (!found) {
                            results[i] = createResult(source, i);
                        }
                    }
                }
                results.length = newSources.length;
                keys = newKeys;
            },
        };
    };

    exports.createCache = createCache;
    exports.createMapping = createMapping;
    exports.createProjector = createProjector;
    exports.dom = dom;
    exports.h = h;

}));
}(maquette_umd, maquette_umd.exports));

const projector = maquette_umd.exports.createProjector();
const separatorWidth = 10;
const separatorHeight = 20;
const univariateSymbolPadding = 10;
const univariateCardStylePadding = 20;
const CSS$1 = {
    // univariate above-and-below
    univariateAboveAndBelowSymbol: 'esri-univariate-above-and-below-ramp__symbol',
    colorRamp: 'esri-legend__color-ramp',
};
function renderSeparator(rampAlignment = 'vertical') {
    const style = 'stroke:rgb(200, 200, 200);stroke-width:1';
    return rampAlignment === 'vertical' ? (index.h("svg", { height: "4", width: "10" }, index.h("line", { x1: "0", y1: "2", x2: "10", y2: "2", style: style }))) : (index.h("svg", { height: "10", width: "10" }, index.h("line", { x1: "5", y1: "0", x2: "5", y2: "10", style: style })));
}
function getSeparatorPreview(opacity, rampAlignment = 'vertical') {
    const separator = document.createElement('div');
    separator.style.height = `${separatorHeight}px`;
    separator.className = CSS$1.univariateAboveAndBelowSymbol;
    if (opacity != null) {
        separator.style.opacity = opacity.toString();
    }
    projector.append(separator, renderSeparator.bind(null, rampAlignment));
    return separator;
}
function updateUnivariateSizeRampElement(sizeRampElement, opacity, rampAlignment = 'vertical', isAboveAndBelow) {
    sizeRampElement.infos.forEach((stop, index) => {
        // Replace middle stop preview with separator
        if (isAboveAndBelow && index === 2) {
            stop.preview = getSeparatorPreview(opacity, rampAlignment);
        }
        else {
            const { size } = stop;
            const previewSize = pt2px(size) + (rampAlignment === 'horizontal' ? univariateCardStylePadding : univariateSymbolPadding);
            const isPreviewDiv = stop.preview.tagName.toLowerCase() === 'div';
            const preview = isPreviewDiv ? stop.preview : document.createElement('div');
            if (preview)
                preview.className = CSS$1.univariateAboveAndBelowSymbol;
            if (rampAlignment === 'horizontal') {
                if (preview)
                    preview.style.width = `${previewSize}px`;
            }
            else {
                if (preview)
                    preview.style.height = `${previewSize}px`;
            }
            if (!isPreviewDiv) {
                if (preview)
                    preview.appendChild(stop.preview);
            }
            stop.preview = preview;
        }
    });
}
// Used to align the colorRamp at the middle of first size symbol
function getUnivariateColorRampMargin(sizeRampElement, style = 'classic') {
    const stops = sizeRampElement.infos;
    const firstSize = stops[0].size;
    const lastSize = stops[stops.length - 1].size;
    if (style === 'classic') {
        return (pt2px(firstSize) + univariateSymbolPadding) / 2;
    }
    return (pt2px(firstSize) - pt2px(lastSize)) / 2;
}
async function getUnivariateColorRampPreview(colorRampElement, options) {
    if (!colorRampElement) {
        return Promise.resolve(null);
    }
    const colors = colorRampElement.infos.map(stop => stop.color);
    const [symbolUtils] = await loadModules.loadModules(['esri/symbols/support/symbolUtils']);
    const colorRampDiv = symbolUtils.renderColorRampPreviewHTML(options.type === 'full'
        ? colors
        : options.type === 'above'
            ? colors.slice(0, 3) // First 3 colors
            : colors.slice(2, 5), // Last 3 colors
    {
        width: options.width,
        height: options.height,
        align: options.rampAlignment,
        effectList: options.effectList,
    });
    colorRampDiv.className = CSS$1.colorRamp;
    if (options.opacity != null) {
        colorRampDiv.style.opacity = options.opacity.toString();
    }
    return Promise.resolve(colorRampDiv);
}
function getUnivariateSizeRampSize(sizeRampElement, type, isAboveAndBelow, rampAlignment = 'vertical') {
    let sizeRampHeight = 0;
    const stops = sizeRampElement.infos;
    const midIndex = Math.floor(stops.length / 2);
    const startIndex = type === 'full' || type === 'above' ? 0 : midIndex;
    const endIndex = type === 'full' || type === 'below' ? stops.length - 1 : midIndex;
    for (let index = startIndex; index <= endIndex; index++) {
        if (isAboveAndBelow && index === midIndex) {
            sizeRampHeight += rampAlignment === 'horizontal' ? separatorWidth : separatorHeight;
        }
        else {
            const size = stops[index].size;
            const previewSize = pt2px(size) + (rampAlignment === 'horizontal' ? univariateCardStylePadding : univariateSymbolPadding);
            sizeRampHeight += previewSize;
        }
    }
    return Math.round(sizeRampHeight);
}
function getUnivariateColorRampSize(sizeRampElement, type, isAboveAndBelow, rampAlignment = 'vertical') {
    const sizeRampSize = getUnivariateSizeRampSize(sizeRampElement, type, isAboveAndBelow, rampAlignment);
    const stops = sizeRampElement.infos;
    const midIndex = Math.floor(stops.length / 2);
    const startIndex = type === 'full' || type === 'above' ? 0 : midIndex;
    const endIndex = type === 'full' || type === 'below' ? stops.length - 1 : midIndex;
    const symbolSize = type === 'full' ? stops[startIndex].size + stops[endIndex].size : type === 'above' ? stops[startIndex].size : stops[endIndex].size;
    const separatorSize = isAboveAndBelow ? (rampAlignment === 'vertical' ? separatorHeight : separatorWidth) : 0;
    const padding = rampAlignment === 'vertical' ? univariateSymbolPadding * (type === 'full' ? 2 : 1) : univariateCardStylePadding * (type === 'full' ? 2 : 1);
    return Math.round(sizeRampSize - (pt2px(symbolSize) / 2 + separatorSize / 2 + padding / 2));
}
function getUnivariateAboveAndBelowRampElements(legendElement, opacity, rampAlignment = 'vertical') {
    const elements = legendElement.infos;
    let sizeRampElement = elements.find(({ type }) => type === 'size-ramp');
    let colorRampElement = elements.find(({ type }) => type === 'color-ramp');
    if (sizeRampElement) {
        sizeRampElement = Object.assign({}, sizeRampElement);
        sizeRampElement.infos = [...sizeRampElement.infos];
        updateUnivariateSizeRampElement(sizeRampElement, opacity, rampAlignment, true);
    }
    if (colorRampElement) {
        colorRampElement = Object.assign({}, colorRampElement);
        colorRampElement.infos = [...colorRampElement.infos];
    }
    // For card style
    if (rampAlignment === 'horizontal') {
        sizeRampElement === null || sizeRampElement === void 0 ? void 0 : sizeRampElement.infos.reverse();
        colorRampElement === null || colorRampElement === void 0 ? void 0 : colorRampElement.infos.reverse();
    }
    return { sizeRampElement, colorRampElement };
}
function getUnivariateColorSizeRampElements(legendElement, rampAlignment = 'vertical') {
    const elements = legendElement.infos;
    let sizeRampElement = elements.find(({ type }) => type === 'size-ramp');
    let colorRampElement = elements.find(({ type }) => type === 'color-ramp');
    if (sizeRampElement) {
        sizeRampElement = Object.assign({}, sizeRampElement);
        sizeRampElement.infos = [...sizeRampElement.infos];
        updateUnivariateSizeRampElement(sizeRampElement, null, rampAlignment, false);
    }
    if (colorRampElement) {
        colorRampElement = Object.assign({}, colorRampElement);
        colorRampElement.infos = [...colorRampElement.infos];
    }
    // For card style
    if (rampAlignment === 'horizontal') {
        sizeRampElement === null || sizeRampElement === void 0 ? void 0 : sizeRampElement.infos.reverse();
        colorRampElement === null || colorRampElement === void 0 ? void 0 : colorRampElement.infos.reverse();
    }
    return { sizeRampElement, colorRampElement };
}

function isImageryStretchedLegend(_layer, _legendType) {
    return !0;
}

const instantAppsInteractiveLegendClassicCss = ".sc-instant-apps-interactive-legend-classic-h{display:block;--instant-apps-interactive-legend-heading-font-size:1rem;--instant-apps-interactive-legend-heading-font-weight:normal;--instant-apps-interactive-legend-caption-font-weight:normal;--instant-apps-interactive-legend-secondary-color:var(--calcite-color-text-1);--instant-apps-interactive-legend-field-name-font-size:1rem;--instant-apps-interactive-legend-total-feature-count-font-size:0.875rem;--instant-apps-interactive-legend-info-font-size:0.875rem;--instant-apps-interactive-legend-info-item-background--selected:#c7ebff;--instant-apps-interactive-legend-info-item-background--selected--dark:#009af2;--instant-apps-interactive-legend-info-item-background--hover:#e9e9e9;--instant-apps-interactive-legend-info-item-background--hover--dark:#4a4a4a;--instant-apps-interactive-legend-info-item-color--selected:var(--calcite-color-text-2);--instant-apps-interactive-legend-secondary-background-color:var(--calcite-color-background);--instant-apps-interactive-legend-ui-margin:20px 15px;--instant-apps-interactive-legend-ui-padding:20px 15px}.sc-instant-apps-interactive-legend-classic-h .esri-legend__service.sc-instant-apps-interactive-legend-classic{padding:0}.sc-instant-apps-interactive-legend-classic-h .esri-legend__layer-body.sc-instant-apps-interactive-legend-classic,.sc-instant-apps-interactive-legend-classic-h .esri-legend__layer.sc-instant-apps-interactive-legend-classic,.sc-instant-apps-interactive-legend-classic-h .esri-legend__layer-table.sc-instant-apps-interactive-legend-classic,.sc-instant-apps-interactive-legend-classic-h .esri-legend__group-layer-child.sc-instant-apps-interactive-legend-classic,.sc-instant-apps-interactive-legend-classic-h .esri-legend__layer-child-table.sc-instant-apps-interactive-legend-classic{margin:0;overflow:hidden}.sc-instant-apps-interactive-legend-classic-h .esri-legend__layer-caption.sc-instant-apps-interactive-legend-classic{display:flex;align-items:center;font-size:var(--instant-apps-interactive-legend-field-name-font-size);background-color:var(--instant-apps-interactive-legend-secondary-background-color);color:var(--instant-apps-interactive-legend-secondary-color)}.sc-instant-apps-interactive-legend-classic-h .esri-legend__layer-caption.sc-instant-apps-interactive-legend-classic calcite-action.sc-instant-apps-interactive-legend-classic{margin-right:5px}.sc-instant-apps-interactive-legend-classic-h .instant-apps-interactive-legend__layer-caption-btn-container.sc-instant-apps-interactive-legend-classic{white-space:nowrap}.sc-instant-apps-interactive-legend-classic-h .instant-apps-interactive-legend__layer-caption-btn-container.sc-instant-apps-interactive-legend-classic calcite-button.sc-instant-apps-interactive-legend-classic{margin:2px}.sc-instant-apps-interactive-legend-classic-h .esri-legend__layer-caption.sc-instant-apps-interactive-legend-classic{font-weight:var(--instant-apps-interactive-legend-caption-font-weight)}.sc-instant-apps-interactive-legend-classic-h .esri-legend__layer-cell.esri-legend__layer-cell--info.sc-instant-apps-interactive-legend-classic{font-size:var(--instant-apps-interactive-legend-info-font-size);text-align:left}.sc-instant-apps-interactive-legend-classic-h .esri-legend__layer-cell.sc-instant-apps-interactive-legend-classic,.sc-instant-apps-interactive-legend-classic-h .esri-legend__layer-row.sc-instant-apps-interactive-legend-classic{display:flex;align-items:center}.sc-instant-apps-interactive-legend-classic-h .instant-apps-interactive-legend__non-interactive.sc-instant-apps-interactive-legend-classic .esri-legend__layer-body.sc-instant-apps-interactive-legend-classic{display:block;margin:var(--instant-apps-interactive-legend-ui-margin)}.sc-instant-apps-interactive-legend-classic-h .instant-apps-interactive-legend__non-interactive.instant-apps-interactive-legend__nested-unique-symbol.sc-instant-apps-interactive-legend-classic>.esri-legend__layer-body.sc-instant-apps-interactive-legend-classic{margin:0}.sc-instant-apps-interactive-legend-classic-h .instant-apps-interactive-legend__non-interactive.sc-instant-apps-interactive-legend-classic .esri-legend__layer-row.sc-instant-apps-interactive-legend-classic{display:table-row}.sc-instant-apps-interactive-legend-classic-h .instant-apps-interactive-legend__non-interactive.sc-instant-apps-interactive-legend-classic .esri-legend__layer-cell.sc-instant-apps-interactive-legend-classic{display:table-cell}.sc-instant-apps-interactive-legend-classic-h .esri-legend__layer-cell--symbols.sc-instant-apps-interactive-legend-classic{justify-content:center;width:20%}.sc-instant-apps-interactive-legend-classic-h .esri-legend__layer-cell--info.sc-instant-apps-interactive-legend-classic{width:65%}.sc-instant-apps-interactive-legend-classic-h .instant-apps-interactive-legend__layer-row--interactive.sc-instant-apps-interactive-legend-classic{margin:1px;background:transparent;border:none;width:100%}.sc-instant-apps-interactive-legend-classic-h .esri-legend__layer-cell--info.sc-instant-apps-interactive-legend-classic{color:var(--instant-apps-interactive-legend-secondary-color)}.sc-instant-apps-interactive-legend-classic-h .esri-legend__layer-row.sc-instant-apps-interactive-legend-classic,.sc-instant-apps-interactive-legend-classic-h .esri-legend__layer-caption.sc-instant-apps-interactive-legend-classic{padding:var(--instant-apps-interactive-legend-ui-padding)}.sc-instant-apps-interactive-legend-classic-h .instant-apps-interactive-legend__layer-row--interactive.sc-instant-apps-interactive-legend-classic{position:relative}.sc-instant-apps-interactive-legend-classic-h .instant-apps-interactive-legend-element-info--selected.sc-instant-apps-interactive-legend-classic{background-color:var(--instant-apps-interactive-legend-info-item-background--selected)}.sc-instant-apps-interactive-legend-classic-h .calcite-mode-dark.sc-instant-apps-interactive-legend-classic .instant-apps-interactive-legend-element-info--selected.sc-instant-apps-interactive-legend-classic{cursor:pointer;background-color:var(--instant-apps-interactive-legend-info-item-background--selected--dark)}.sc-instant-apps-interactive-legend-classic-h .calcite-mode-dark.sc-instant-apps-interactive-legend-classic .instant-apps-interactive-legend-element-info--selected.sc-instant-apps-interactive-legend-classic .esri-legend__layer-cell--info.sc-instant-apps-interactive-legend-classic{color:var(--calcite-color-text-inverse)}.sc-instant-apps-interactive-legend-classic-h .hide.sc-instant-apps-interactive-legend-classic{display:none}@media (min-width: 992px){.sc-instant-apps-interactive-legend-classic-h .instant-apps-interactive-legend__layer-row--interactive.sc-instant-apps-interactive-legend-classic{cursor:pointer}.sc-instant-apps-interactive-legend-classic-h .instant-apps-interactive-legend__layer-row--interactive.sc-instant-apps-interactive-legend-classic:hover{background-color:var(--instant-apps-interactive-legend-info-item-background--hover)}.sc-instant-apps-interactive-legend-classic-h .instant-apps-interactive-legend__layer-row--interactive.sc-instant-apps-interactive-legend-classic:hover.instant-apps-interactive-legend-element-info--selected{background-color:#e2f2fe}.sc-instant-apps-interactive-legend-classic-h .calcite-mode-dark.sc-instant-apps-interactive-legend-classic .instant-apps-interactive-legend__layer-row--interactive.sc-instant-apps-interactive-legend-classic:hover{background-color:var(--instant-apps-interactive-legend-info-item-background--hover--dark)}.sc-instant-apps-interactive-legend-classic-h .calcite-mode-dark.sc-instant-apps-interactive-legend-classic .instant-apps-interactive-legend__layer-row--interactive.sc-instant-apps-interactive-legend-classic:hover.instant-apps-interactive-legend-element-info--selected{background-color:#26a9f4}}";
const InstantAppsInteractiveLegendClassicStyle0 = instantAppsInteractiveLegendClassicCss;

const CSS = {
    // jsapi styles
    service: 'esri-legend__service',
    label: 'esri-legend__service-label',
    layer: 'esri-legend__layer',
    groupLayer: 'esri-legend__group-layer',
    groupLayerChild: 'esri-legend__group-layer-child',
    layerTable: 'esri-legend__layer-table',
    layerTableSizeRamp: 'esri-legend__layer-table--size-ramp',
    layerChildTable: 'esri-legend__layer-child-table',
    layerCaption: 'esri-legend__layer-caption',
    layerBody: 'esri-legend__layer-body',
    layerRow: 'esri-legend__layer-row',
    layerCell: 'esri-legend__layer-cell',
    layerInfo: 'esri-legend__layer-cell esri-legend__layer-cell--info',
    imageryLayerStretchedImage: 'esri-legend__imagery-layer-image--stretched',
    imageryLayerCellStretched: 'esri-legend__imagery-layer-cell--stretched',
    imageryLayerInfoStretched: 'esri-legend__imagery-layer-info--stretched',
    symbolContainer: 'esri-legend__layer-cell esri-legend__layer-cell--symbols',
    symbol: 'esri-legend__symbol',
    rampContainer: 'esri-legend__ramps',
    sizeRamp: 'esri-legend__size-ramp',
    colorRamp: 'esri-legend__color-ramp',
    opacityRamp: 'esri-legend__opacity-ramp',
    borderlessRamp: 'esri-legend__borderless-ramp',
    rampTick: 'esri-legend__ramp-tick',
    rampFirstTick: 'esri-legend__ramp-tick-first',
    rampLastTick: 'esri-legend__ramp-tick-last',
    rampLabelsContainer: 'esri-legend__ramp-labels',
    rampLabel: 'esri-legend__ramp-label',
    univariateAboveAndBelowSymbol: 'esri-univariate-above-and-below-ramp__symbol',
    univariateAboveAndBelowLabel: 'esri-univariate-above-and-below-ramp__label',
    message: 'esri-legend__message',
    header: 'esri-widget__heading',
    hidden: 'esri-hidden',
    // instant-apps-interactive-legend
    interactiveLegendHeader: 'instant-apps-interactive-legend__header',
    layerCaptionBtnContainer: 'instant-apps-interactive-legend__layer-caption-btn-container',
    interactiveLayerRow: 'instant-apps-interactive-legend__layer-row--interactive',
    infoSelected: 'instant-apps-interactive-legend-element-info--selected',
};
const GRADIENT_WIDTH = 24;
const univariateRampContainerStyles = { display: 'flex', alignItems: 'flex-start' };
const univariateColorRampContainerStyles = { marginLeft: '3px' };
const univariateColorRampStyles = { display: 'table-cell', verticalAlign: 'middle' };
const InstantAppsInteractiveLegendClassic = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calculatingFeatureCount = false;
        this.legendvm = undefined;
        this.zoomTo = false;
        this.featureCount = false;
        this.filterMode = {
            type: 'filter',
        };
        this.messages = undefined;
        this.isLoading = true;
        this.intLegendId = undefined;
    }
    handleFilterModeChange() {
        helpers.handleFilterChange(this.filterMode, this.legendvm.view);
    }
    async componentWillLoad() {
        const observer = new MutationObserver(() => {
            index.forceUpdate(this.el);
        });
        observer.observe(this.el, {
            attributes: true,
        });
        const [intl, reactiveUtils, Handles] = await loadModules.loadModules(['esri/intl', 'esri/core/reactiveUtils', 'esri/core/Handles']);
        this.reactiveUtils = reactiveUtils;
        this.handles = new Handles();
        this.intl = intl;
    }
    async componentDidLoad() {
        this.initLegend();
    }
    async initLegend() {
        try {
            await this.reactiveUtils.whenOnce(() => { var _a; return (_a = this.legendvm) === null || _a === void 0 ? void 0 : _a.view; });
            const initLegendCallback = async () => {
                var _a, _b, _c, _d;
                try {
                    // Initial data setup
                    // Loads map/basemap
                    const map = await ((_c = (_b = (_a = this.legendvm) === null || _a === void 0 ? void 0 : _a.view) === null || _b === void 0 ? void 0 : _b.map) === null || _c === void 0 ? void 0 : _c.load());
                    await ((_d = map === null || map === void 0 ? void 0 : map.basemap) === null || _d === void 0 ? void 0 : _d.load());
                    // Loads all layers in webmap and waits until all settled promises
                    const allLayers = map === null || map === void 0 ? void 0 : map.allLayers;
                    const promises = allLayers === null || allLayers === void 0 ? void 0 : allLayers.map(layer => layer.load());
                    const settled = await Promise.allSettled(promises);
                    const settledLayerPromises = settled
                        .map(settledLayer => ((settledLayer === null || settledLayer === void 0 ? void 0 : settledLayer.status) === 'fulfilled' && (settledLayer === null || settledLayer === void 0 ? void 0 : settledLayer.value) ? settledLayer.value : null))
                        .filter(layer => !!layer);
                    // Wait until all layer views are settled/available
                    const lvPromises = [];
                    settledLayerPromises.forEach(layer => {
                        var _a;
                        if ((_a = this.legendvm) === null || _a === void 0 ? void 0 : _a.view) {
                            lvPromises.push(this.legendvm.view.whenLayerView(layer));
                        }
                    });
                    await Promise.allSettled(lvPromises);
                    // Generate data once all layers/layer views are complete
                    const data = await helpers.generateData(this.legendvm, this.reactiveUtils);
                    helpers.store.set('data', Object.assign(Object.assign({}, helpers.interactiveLegendState.data), data));
                    this.isLoading = false;
                    this.setupWatchersAndListeners();
                }
                catch (err) {
                    console.error(err);
                    this.isLoading = false;
                }
            };
            this.legendvm.view.when(initLegendCallback);
            this.legendvm.view.map.layers.on('after-changes', initLegendCallback);
        }
        catch (_a) {
            this.isLoading = false;
        }
    }
    disconnectedCallback() {
        var _a, _b;
        (_a = this.handles) === null || _a === void 0 ? void 0 : _a.removeAll();
        (_b = this.handles) === null || _b === void 0 ? void 0 : _b.destroy();
        this.handles = null;
    }
    render() {
        var _a, _b, _c;
        const filteredLayers = this.renderFilteredLayers();
        return this.isLoading ? (index.h("calcite-loader", { key: "interactive-legend-loader", scale: "m", label: (_a = this.messages) === null || _a === void 0 ? void 0 : _a.loading, text: (_b = this.messages) === null || _b === void 0 ? void 0 : _b.loading })) : (index.h("div", { key: "interactive-legend-classic-container", class: helpers.getTheme(this.el) }, (filteredLayers === null || filteredLayers === void 0 ? void 0 : filteredLayers.length) > 0 ? filteredLayers : index.h("div", { class: CSS.message }, (_c = this.messages) === null || _c === void 0 ? void 0 : _c.noLegend)));
    }
    renderFilteredLayers() {
        var _a, _b;
        const activeLayerInfos = (_b = (_a = this.legendvm) === null || _a === void 0 ? void 0 : _a.activeLayerInfos) === null || _b === void 0 ? void 0 : _b.toArray();
        return activeLayerInfos.map(activeLayerInfo => this.renderLegendForLayer(activeLayerInfo)).filter(layer => !!layer);
    }
    renderLegendForLayer(activeLayerInfo, isChild) {
        var _a, _b;
        if (!activeLayerInfo.ready) {
            return null;
        }
        const hasChildren = !!activeLayerInfo.children.length;
        if (hasChildren) {
            const layers = activeLayerInfo.children.map(childActiveLayerInfo => this.renderLegendForLayer(childActiveLayerInfo, true)).toArray();
            return (index.h("instant-apps-interactive-legend-group-legend-element", { class: helpers.getTheme(this.el), legendvm: this.legendvm, featureCount: this.featureCount, activeLayerInfo: activeLayerInfo, isChild: isChild }, index.h("div", { style: {
                    paddingLeft: '20px',
                }, id: `${(_a = activeLayerInfo === null || activeLayerInfo === void 0 ? void 0 : activeLayerInfo.layer) === null || _a === void 0 ? void 0 : _a.id}-legend-layer`, slot: "content" }, layers)));
        }
        const legendElements = activeLayerInfo.legendElements;
        if (legendElements && !legendElements.length) {
            return null;
        }
        const filteredElements = legendElements
            .map((legendElement, legendElementIndex) => this.renderLegendForElement(legendElement, activeLayerInfo.layer, activeLayerInfo.effectList, activeLayerInfo, legendElementIndex))
            .filter(element => !!element);
        if (!filteredElements.length) {
            return null;
        }
        return (index.h("instant-apps-interactive-legend-layer-element", { class: helpers.getTheme(this.el), legendvm: this.legendvm, featureCount: this.featureCount, activeLayerInfo: activeLayerInfo, messages: this.messages, isChild: isChild }, index.h("div", { slot: "content", id: `${(_b = activeLayerInfo === null || activeLayerInfo === void 0 ? void 0 : activeLayerInfo.layer) === null || _b === void 0 ? void 0 : _b.id}-legend-layer`, class: CSS.layer }, filteredElements)));
    }
    renderLegendForElement(legendElement, layer, effectList, activeLayerInfo, legendElementIndex, isChild, parentLegendElementInfo) {
        const isColorRamp = legendElement.type === 'color-ramp', isOpacityRamp = legendElement.type === 'opacity-ramp', isSizeRamp = legendElement.type === 'size-ramp';
        let content = null;
        const isInteractive = helpers.validateInteractivity(activeLayerInfo, legendElement, legendElementIndex);
        // build symbol table or size ramp
        const isRelationshipRamp = (legendElement === null || legendElement === void 0 ? void 0 : legendElement.type) === 'relationship-ramp';
        if (legendElement.type === 'symbol-table' || isSizeRamp) {
            const rows = legendElement.infos
                .map((info, infoIndex) => {
                return this.renderLegendForElementInfo(info, layer, effectList, isSizeRamp, legendElement, activeLayerInfo, legendElementIndex, infoIndex, isInteractive, parentLegendElementInfo ? parentLegendElementInfo : null);
            })
                .filter((row) => !!row);
            if (rows.length) {
                content = index.h("div", { class: CSS.layerBody }, rows);
            }
        }
        else if (legendElement.type === 'color-ramp' || legendElement.type === 'opacity-ramp' || legendElement.type === 'heatmap-ramp' || legendElement.type === 'stretch-ramp') {
            content = this.renderLegendForRamp(legendElement, layer.opacity);
        }
        else if (legendElement.type === 'relationship-ramp') {
            content = (index.h("instant-apps-interactive-legend-relationship", { class: helpers.getTheme(this.el), key: "relationship-ramp", filterMode: this.filterMode, activeLayerInfo: activeLayerInfo, legendElement: legendElement, messages: this.messages }));
        }
        else if (legendElement.type === 'pie-chart-ramp') {
            content = this.renderPieChartRamp(legendElement);
        }
        else if (legendElement.type === 'univariate-above-and-below-ramp') {
            content = this.renderUnivariateAboveAndBelowRamp(legendElement, layer.opacity, effectList);
        }
        else if (legendElement.type === 'univariate-color-size-ramp') {
            content = this.renderUnivariateColorSizeRamp(legendElement, layer.opacity, effectList);
        }
        if (!content)
            return null;
        const titleObj = legendElement.title;
        let title = null;
        if (typeof titleObj === 'string') {
            title = titleObj;
        }
        else if (titleObj) {
            const genTitle = this.getTitle(this.messages, titleObj, isColorRamp || isOpacityRamp);
            if (this.isRendererTitle(titleObj, isColorRamp || isOpacityRamp) && titleObj.title) {
                title = `${titleObj.title} (${genTitle})`;
            }
            else {
                title = genTitle;
            }
        }
        return (index.h("instant-apps-interactive-legend-legend-element", { class: helpers.getTheme(this.el), activeLayerInfo: activeLayerInfo, isSizeRamp: isSizeRamp, isChild: isChild, isColorRamp: isColorRamp, isRelationshipRamp: isRelationshipRamp, isInteractive: isInteractive, zoomTo: this.zoomTo, legendElement: legendElement, titleText: title, legendvm: this.legendvm, legendElementIndex: legendElementIndex, messages: this.messages }, index.h("div", { slot: "content" }, content)));
    }
    renderPieChartRamp(legendElement) {
        var _a;
        return index.h("div", { innerHTML: `${(_a = legendElement.preview) === null || _a === void 0 ? void 0 : _a.outerHTML}` });
    }
    async renderUnivariateAboveAndBelowRamp(legendElement, opacity, effectList) {
        const { sizeRampElement, colorRampElement } = getUnivariateAboveAndBelowRampElements(legendElement, opacity);
        if (!sizeRampElement) {
            return null;
        }
        const colorRampAboveHeight = getUnivariateColorRampSize(sizeRampElement, 'above', true);
        const colorRampBelowHeight = getUnivariateColorRampSize(sizeRampElement, 'below', true);
        const colorRampWidth = 12;
        const colorRampAbovePreview = (await getUnivariateColorRampPreview(colorRampElement, {
            width: colorRampWidth,
            height: colorRampAboveHeight,
            rampAlignment: 'vertical',
            opacity,
            type: 'above',
            effectList,
        }));
        const colorRampBelowPreview = (await getUnivariateColorRampPreview(colorRampElement, {
            width: colorRampWidth,
            height: colorRampBelowHeight,
            rampAlignment: 'vertical',
            opacity,
            type: 'below',
            effectList,
        }));
        const colorRampTopMargin = getUnivariateColorRampMargin(sizeRampElement);
        const labels = sizeRampElement.infos.map(stop => stop.label);
        const aboveRampLabels = labels.map((label, index$1) => {
            const isStartLabel = index$1 === 0;
            const isMidLabel = index$1 === 2;
            return isStartLabel ? index.h("div", { class: label ? (colorRampAbovePreview ? CSS.univariateAboveAndBelowLabel : CSS.rampLabel) : '' }, label) : isMidLabel ? index.h("div", null) : null;
        });
        const endIndex = labels.length - 1;
        const midIndex = Math.floor(labels.length / 2);
        const belowRampLabels = labels.map((label, index$1) => {
            const isEndLabel = index$1 === endIndex;
            const isMidLabel = index$1 === midIndex;
            return isMidLabel || isEndLabel ? index.h("div", { class: label ? (colorRampAbovePreview ? CSS.univariateAboveAndBelowLabel : CSS.rampLabel) : '' }, label) : null;
        });
        const sizeRampPreviewStyles = { display: 'table-cell', verticalAlign: 'middle' };
        const colorRampPreviewStyles = { marginTop: `${colorRampTopMargin}px` };
        const colorRampAboveLabelStyles = { height: `${colorRampAboveHeight}px` };
        const colorRampBelowLabelStyles = { height: `${colorRampBelowHeight}px` };
        return (index.h("div", { key: "univariate-above-and-below-ramp-preview", style: univariateRampContainerStyles }, index.h("div", { class: CSS.layerBody }, sizeRampElement.infos.map((info, i) => (index.h("div", { class: `${CSS.layerRow} ${CSS.sizeRamp}` }, index.h("div", { class: CSS.symbol, style: sizeRampPreviewStyles, innerHTML: `${info.preview.outerHTML}` }), !colorRampAbovePreview && i % 2 === 0 ? index.h("div", { class: CSS.layerInfo }, labels[i]) : null)))), colorRampAbovePreview ? (index.h("div", { style: colorRampPreviewStyles, key: "color-ramp-preview" }, index.h("div", { style: univariateColorRampContainerStyles }, index.h("div", { style: univariateColorRampStyles }, index.h("div", { class: CSS.rampContainer }, colorRampAbovePreview)), index.h("div", { style: univariateColorRampStyles }, index.h("div", { class: CSS.rampLabelsContainer, style: colorRampAboveLabelStyles }, aboveRampLabels))), index.h("div", { style: univariateColorRampContainerStyles }, index.h("div", { style: univariateColorRampStyles }, index.h("div", { class: CSS.rampContainer }, colorRampBelowPreview)), index.h("div", { style: univariateColorRampStyles }, index.h("div", { class: CSS.rampLabelsContainer, style: colorRampBelowLabelStyles }, belowRampLabels))))) : null));
    }
    renderUnivariateColorSizeRamp(legendElement, opacity, effectList) {
        const { sizeRampElement, colorRampElement } = getUnivariateColorSizeRampElements(legendElement);
        if (!sizeRampElement) {
            return null;
        }
        const colorRampTopMargin = getUnivariateColorRampMargin(sizeRampElement);
        const colorRampWidth = 12;
        const colorRampHeight = getUnivariateColorRampSize(sizeRampElement, 'full', false);
        const colorRampPreview = getUnivariateColorRampPreview(colorRampElement, {
            width: colorRampWidth,
            height: colorRampHeight,
            rampAlignment: 'vertical',
            opacity,
            type: 'full',
            effectList,
        });
        const endIndex = sizeRampElement.infos.length - 1;
        const labels = sizeRampElement.infos.map((stop, index$1) => index$1 === 0 || index$1 === endIndex ? index.h("div", { class: stop.label ? (colorRampElement ? CSS.univariateAboveAndBelowLabel : CSS.rampLabel) : '' }, stop.label) : null);
        const sizeRampPreviewStyles = { display: 'table-cell', verticalAlign: 'middle' };
        const colorRampPreviewStyles = { marginTop: `${colorRampTopMargin}px` };
        const colorRampLabelStyles = { height: `${colorRampHeight}px` };
        return (index.h("div", { key: "univariate-above-and-below-ramp-preview", style: univariateRampContainerStyles }, index.h("div", { class: CSS.layerBody }, sizeRampElement.infos.map(info => (index.h("div", { class: `${CSS.layerRow} ${CSS.sizeRamp}` }, index.h("div", { class: CSS.symbol, style: sizeRampPreviewStyles, innerHTML: `${info.preview.outerHTML}` }))))), index.h("div", { style: colorRampPreviewStyles, key: "color-ramp-preview" }, index.h("div", { style: univariateColorRampContainerStyles }, index.h("div", { style: univariateColorRampStyles }, index.h("div", { class: CSS.rampContainer }, colorRampPreview)), index.h("div", { style: univariateColorRampStyles }, index.h("div", { class: CSS.rampLabelsContainer, style: colorRampLabelStyles }, labels))))));
    }
    renderLegendForRamp(legendElement, opacity) {
        var _a;
        const rampStops = legendElement.infos;
        const isOpacityRamp = legendElement.type === 'opacity-ramp';
        const isHeatmapRamp = legendElement.type === 'heatmap-ramp';
        const isStretchRamp = legendElement.type === 'stretch-ramp';
        const rampDiv = legendElement.preview;
        const opacityRampClass = isOpacityRamp ? CSS.opacityRamp : '';
        if (rampDiv) {
            rampDiv.classList.add(CSS.colorRamp);
            if (opacityRampClass)
                rampDiv.classList.add(opacityRampClass);
        }
        if (opacity != null && rampDiv) {
            rampDiv.style.opacity = opacity.toString();
        }
        const labelsContent = rampStops.map(stop => (index.h("div", { class: stop.label ? CSS.rampLabel : '' }, isHeatmapRamp ? this.messages[stop.label] || stop.label : isStretchRamp ? this.getStretchStopLabel(stop) : stop.label)));
        const symbolContainerStyles = { width: `${GRADIENT_WIDTH}px` }, rampLabelsContainerStyles = { height: (_a = rampDiv === null || rampDiv === void 0 ? void 0 : rampDiv.style) === null || _a === void 0 ? void 0 : _a.height };
        return (index.h("div", { class: CSS.layerRow }, index.h("div", { class: CSS.symbolContainer, style: Object.assign({}, symbolContainerStyles) }, index.h("div", { ref: el => {
                var _a;
                if (el === null || el === void 0 ? void 0 : el.firstChild)
                    (_a = el === null || el === void 0 ? void 0 : el.firstChild) === null || _a === void 0 ? void 0 : _a.remove();
                el === null || el === void 0 ? void 0 : el.appendChild(rampDiv);
            }, class: CSS.rampContainer })), index.h("div", { class: CSS.layerInfo }, index.h("div", { class: CSS.rampLabelsContainer, style: Object.assign({}, rampLabelsContainerStyles) }, labelsContent))));
    }
    getStretchStopLabel(stop) {
        return stop.label
            ? this.messages[stop.label] +
                ': ' +
                (typeof stop.value === 'string'
                    ? stop.value
                    : this.intl.formatNumber(stop.value, {
                        style: 'decimal',
                        notation: stop.value.toString().includes('e') ? 'scientific' : 'standard',
                    }))
            : '';
    }
    renderLegendForElementInfo(elementInfo, layer, effectList, isSizeRamp, legendElement, activeLayerInfo, legendElementIndex, infoIndex, isInteractive, parentLegendElementInfo) {
        var _a, _b;
        // nested
        if (elementInfo.type) {
            return this.renderLegendForElement(elementInfo, layer, effectList, activeLayerInfo, legendElementIndex, true, elementInfo);
        }
        let content;
        const isStretched = !isImageryStretchedLegend();
        if (elementInfo.preview) {
            content = index.h("div", { class: CSS.symbol, innerHTML: `${elementInfo.preview.outerHTML}` });
        }
        else if (elementInfo.src) {
            content = this.renderImage(elementInfo, layer, isStretched);
        }
        if (!content) {
            return null;
        }
        const imageryLayerInfoStretched = '';
        const sizeRamp = isSizeRamp ? ` ${CSS.sizeRamp}` : '';
        let selected;
        const data = helpers.getIntLegendLayerData(layer);
        const parentLegendElementInfoData = helpers.getParentLegendElementInfoData(data, parentLegendElementInfo);
        if (helpers.interactiveLegendState.data) {
            const category = helpers.getCategoryData(data, layer, elementInfo, parentLegendElementInfoData, infoIndex);
            // If no items are selected, then apply 'selected' style to all -- UX
            const intLegendData = (parentLegendElementInfoData ? parentLegendElementInfoData === null || parentLegendElementInfoData === void 0 ? void 0 : parentLegendElementInfoData.nestedInfos : data);
            const noneSelected = helpers.checkNoneSelected(intLegendData);
            selected = ((_a = data === null || data === void 0 ? void 0 : data.categories) === null || _a === void 0 ? void 0 : _a.size) === 1 ? !(category === null || category === void 0 ? void 0 : category.selected) : noneSelected || (category === null || category === void 0 ? void 0 : category.selected);
        }
        const interactive = parentLegendElementInfoData && !(elementInfo === null || elementInfo === void 0 ? void 0 : elementInfo.value) ? false : isInteractive;
        return interactive ? (
        // Regular LegendElementInfo
        index.h("button", { onClick: this.applyFilter(elementInfo, layer, infoIndex, parentLegendElementInfo), class: `${CSS.layerRow} ${CSS.interactiveLayerRow}${selected ? ` ${CSS.infoSelected}` : ''}` }, index.h("div", { class: `${CSS.symbolContainer}${imageryLayerInfoStretched}${sizeRamp}` }, content), index.h("div", { class: `${CSS.layerInfo}${imageryLayerInfoStretched}` }, this.getTitle(this.messages, elementInfo.label, false) || ''), this.featureCount ? (index.h("instant-apps-interactive-legend-count", { class: helpers.getTheme(this.el), categoryId: parentLegendElementInfoData ? legendElement.title : (_b = elementInfo.label) !== null && _b !== void 0 ? _b : layer === null || layer === void 0 ? void 0 : layer.id, activeLayerInfo: activeLayerInfo, legendvm: this.legendvm, messages: this.messages, selected: selected, legendElement: legendElement, infoIndex: infoIndex })) : null)) : (index.h("div", { class: CSS.layerRow }, index.h("div", { class: `${CSS.symbolContainer}${imageryLayerInfoStretched}${sizeRamp}` }, content), index.h("div", { class: `${CSS.layerInfo}${imageryLayerInfoStretched}` }, this.getTitle(this.messages, elementInfo.label, false) || '')));
    }
    renderImage(elementInfo, layer, isStretched) {
        const { label, src, opacity } = elementInfo;
        const imageryLayerStretchedImage = isStretched ? ` ${CSS.imageryLayerStretchedImage}` : '';
        const symbol = !isStretched ? ` ${CSS.symbol}` : '';
        const dynamicStyles = {
            opacity: `${opacity != null ? opacity : layer.opacity}`,
        };
        return (index.h("img", { alt: this.getTitle(this.messages, label, false), src: src,
            // border={0}
            width: elementInfo.width, height: elementInfo.height, class: `$${imageryLayerStretchedImage}${symbol}`, style: dynamicStyles }));
    }
    getTitle(messages, titleInfo, // RendererTitle | DotDensityTitle | RampTitle | StretchMultibandTitle | ClusterTitle | string,
    isRamp) {
        var _a, _b;
        if (!titleInfo) {
            return undefined;
        }
        if (typeof titleInfo === 'string' || typeof titleInfo === 'number') {
            return titleInfo;
        }
        if ('value' in titleInfo || 'unit' in titleInfo) {
            return this.intl.substitute((_a = messages === null || messages === void 0 ? void 0 : messages.dotValue) !== null && _a !== void 0 ? _a : '', titleInfo);
        }
        if ('colorName' in titleInfo || 'bandName' in titleInfo) {
            return messages[titleInfo.colorName] + ': ' + (messages[titleInfo.bandName] || titleInfo.bandName);
        }
        if ('showCount' in titleInfo) {
            return titleInfo.showCount ? messages['clusterCountTitle'] : null;
        }
        // let bundleKey: "showField" | keyof LegendMessages = null;
        let bundleKey = null;
        if (this.isRampTitle(titleInfo, isRamp)) {
            bundleKey = titleInfo.ratioPercentTotal
                ? 'showRatioPercentTotal'
                : titleInfo.ratioPercent
                    ? 'showRatioPercent'
                    : titleInfo.ratio
                        ? 'showRatio'
                        : titleInfo.normField
                            ? 'showNormField'
                            : titleInfo.field
                                ? 'showField'
                                : null;
        }
        else if (this.isRendererTitle(titleInfo, isRamp)) {
            bundleKey = titleInfo.normField ? 'showNormField' : titleInfo.normByPct ? 'showNormPct' : titleInfo.field ? 'showField' : null;
        }
        return bundleKey
            ? (_b = this.intl) === null || _b === void 0 ? void 0 : _b.substitute(bundleKey === 'showField' ? '{field}' : messages[bundleKey], {
                field: titleInfo.field,
                normField: titleInfo.normField,
            })
            : '';
    }
    isRampTitle(_titleInfo, isRamp) {
        return isRamp;
    }
    isRendererTitle(_titleInfo, isRamp) {
        return !isRamp;
    }
    setupWatchersAndListeners() {
        // Refreshes interactive legend data on active layer info update
        var _a, _b, _c, _d, _e, _f, _g;
        const featureLayers = (_d = (_c = (_b = (_a = this.legendvm) === null || _a === void 0 ? void 0 : _a.view) === null || _b === void 0 ? void 0 : _b.map) === null || _c === void 0 ? void 0 : _c.allLayers) === null || _d === void 0 ? void 0 : _d.filter(layer => (layer === null || layer === void 0 ? void 0 : layer.type) === 'feature');
        featureLayers.forEach(async (fLayer) => {
            var _a, _b, _c, _d;
            try {
                const fLayerView = await ((_b = (_a = this.legendvm) === null || _a === void 0 ? void 0 : _a.view) === null || _b === void 0 ? void 0 : _b.whenLayerView(fLayer));
                const id = `fLayerViewScale-${fLayer === null || fLayer === void 0 ? void 0 : fLayer.id}`;
                if (!((_c = this.handles) === null || _c === void 0 ? void 0 : _c.has(id))) {
                    (_d = this.handles) === null || _d === void 0 ? void 0 : _d.add(fLayerView.watch('visibleAtCurrentScale', async () => this.createDataForLayer(fLayer)), id);
                }
            }
            catch (_e) { }
        });
        featureLayers === null || featureLayers === void 0 ? void 0 : featureLayers.forEach(fLayer => {
            var _a, _b, _c;
            const id = `fLayer-${fLayer === null || fLayer === void 0 ? void 0 : fLayer.id}`;
            if (!((_a = this.handles) === null || _a === void 0 ? void 0 : _a.has(id))) {
                (_b = this.handles) === null || _b === void 0 ? void 0 : _b.add((_c = this.reactiveUtils) === null || _c === void 0 ? void 0 : _c.watch(() => fLayer === null || fLayer === void 0 ? void 0 : fLayer.visible, async () => this.createDataForLayer(fLayer)), id);
            }
        });
        (_e = this.handles) === null || _e === void 0 ? void 0 : _e.add(this.reactiveUtils.when(() => this.legendvm, () => {
            this.reactiveUtils.watch(() => { var _a, _b; return (_b = (_a = this.legendvm) === null || _a === void 0 ? void 0 : _a.view) === null || _b === void 0 ? void 0 : _b.updating; }, () => {
                var _a, _b;
                if (this.calculatingFeatureCount)
                    return;
                if ((_b = (_a = this.legendvm) === null || _a === void 0 ? void 0 : _a.view) === null || _b === void 0 ? void 0 : _b.updating) {
                    this.calculatingFeatureCount = true;
                    this.reactiveUtils.when(() => { var _a, _b; return !((_b = (_a = this.legendvm) === null || _a === void 0 ? void 0 : _a.view) === null || _b === void 0 ? void 0 : _b.updating); }, async () => {
                        const data = await helpers.handleFeatureCount(this.legendvm, helpers.interactiveLegendState.data);
                        helpers.store.set('data', Object.assign(Object.assign({}, helpers.interactiveLegendState.data), data));
                        this.calculatingFeatureCount = false;
                    }, { once: true, initial: true });
                }
            }, { initial: true });
        }, { initial: true, once: true }));
        (_f = this.handles) === null || _f === void 0 ? void 0 : _f.add(this.reactiveUtils.on(() => { var _a; return (_a = this.legendvm) === null || _a === void 0 ? void 0 : _a.activeLayerInfos; }, 'change', async (activeLayerInfo) => {
            var _a;
            const data = await helpers.generateData(this.legendvm, this.reactiveUtils);
            helpers.store.set('data', Object.assign(Object.assign({}, helpers.interactiveLegendState.data), data));
            index.forceUpdate(this.el);
            (_a = this.handles) === null || _a === void 0 ? void 0 : _a.add(this.reactiveUtils.on(() => activeLayerInfo.children, 'change', async () => {
                const data = await helpers.generateData(this.legendvm, this.reactiveUtils);
                helpers.store.set('data', Object.assign(Object.assign({}, helpers.interactiveLegendState.data), data));
                index.forceUpdate(this.el);
            }));
        }));
        (_g = this.handles) === null || _g === void 0 ? void 0 : _g.add(this.reactiveUtils.on(() => { var _a, _b, _c; return (_c = (_b = (_a = this.legendvm) === null || _a === void 0 ? void 0 : _a.view) === null || _b === void 0 ? void 0 : _b.map) === null || _c === void 0 ? void 0 : _c.layers; }, 'after-changes', async () => {
            const data = await helpers.handleFeatureCount(this.legendvm, helpers.interactiveLegendState.data);
            helpers.store.set('data', Object.assign(Object.assign({}, helpers.interactiveLegendState.data), data));
            this.calculatingFeatureCount = false;
        }));
    }
    async createDataForLayer(fLayer) {
        var _a;
        const data = helpers.store.get('data');
        const dataForLayer = data === null || data === void 0 ? void 0 : data[fLayer === null || fLayer === void 0 ? void 0 : fLayer.id];
        const ALIs = helpers.getAllActiveLayerInfos((_a = this.legendvm) === null || _a === void 0 ? void 0 : _a.activeLayerInfos);
        const ali = ALIs === null || ALIs === void 0 ? void 0 : ALIs.find(ali => { var _a; return ((_a = ali === null || ali === void 0 ? void 0 : ali.layer) === null || _a === void 0 ? void 0 : _a.id) === (fLayer === null || fLayer === void 0 ? void 0 : fLayer.id); });
        if (!dataForLayer && ali) {
            const dataForLayer = (await helpers.createInteractiveLegendDataForLayer(this.legendvm, ali, this.reactiveUtils));
            helpers.updateStore({ intLegendLayerData: dataForLayer, layerId: fLayer === null || fLayer === void 0 ? void 0 : fLayer.id });
            if (this.featureCount) {
                const data = await helpers.handleFeatureCount(this.legendvm, helpers.interactiveLegendState.data);
                helpers.store.set('data', Object.assign(Object.assign({}, helpers.interactiveLegendState.data), data));
            }
        }
    }
    applyFilter(elementInfo, layer, infoIndex, parentLegendElementInfo) {
        return async () => {
            var _a;
            const dataFromActiveLayerInfo = Object.assign({}, (_a = helpers.interactiveLegendState.data) === null || _a === void 0 ? void 0 : _a[layer === null || layer === void 0 ? void 0 : layer.id]);
            if (parentLegendElementInfo) {
                await helpers.handleFilter(dataFromActiveLayerInfo, elementInfo, infoIndex, this.filterMode, parentLegendElementInfo);
            }
            else {
                await helpers.handleFilter(dataFromActiveLayerInfo, elementInfo, infoIndex, this.filterMode);
            }
            helpers.updateStore({ intLegendLayerData: dataFromActiveLayerInfo, layerId: layer === null || layer === void 0 ? void 0 : layer.id });
        };
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "filterMode": ["handleFilterModeChange"]
    }; }
};
InstantAppsInteractiveLegendClassic.style = InstantAppsInteractiveLegendClassicStyle0;

exports.instant_apps_interactive_legend_classic = InstantAppsInteractiveLegendClassic;
