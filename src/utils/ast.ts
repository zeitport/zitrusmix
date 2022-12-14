import type {Element, ChildNode} from 'parse5/dist/tree-adapters/default.js';


/**
 * @type {nodeCallbackFn}
 */
const all = (_) => true;

/**
 * @param {Node} node
 * @param {string} attributeName
 * @returns {string | undefined}
 */
export function getAttribute(node, attributeName) {
    const attribute = node.attrs?.find(attr => attr.name === attributeName);

    return attribute?.value;
}

/**
 * @param {Node} node
 * @param {string} attributeName
 * @param {string | null | undefined} value
 */
export function setAttribute(node, attributeName, value) {
    if (node.attrs) {
        if (value) {
            const attribute = node.attrs.find(attr => attr.name === attributeName);

            if (attribute) {
                attribute.value = value;
            }
        } else {
            node.attrs = node.attrs.filter(attr => attr.name !== attributeName);
        }
    }
}

/**
 * @param {Node} node
 * @param {string} attributeName
 * @returns {boolean}
 */
export function hasAttribute(node, attributeName) {
    const attribute = node.attrs?.find(attr => attr.name === attributeName);

    return Boolean(attribute);
}

/**
 * @param {Node} node
 * @returns {Map<string, string>}
 */
export function getAttributeMap(node) {
    const attributes = new Map();

    if (node.attrs) {
        for (const attribute of node.attrs) {
            attributes.set(attribute.name, attribute.value);
        }
    }

    return attributes;
}


/**
 * @param {Node} node
 * @returns {node is Element}
 */
export function isCustomElement(node) {
    return node.nodeName?.includes('-') || false;
}

/**
 * @param {Element | Node} node
 * @param {ElementCallbackFn} selector
 * @param {ElementCallbackFn} recursive
 * @returns {Generator<Element, null>}
 */
export function* traverse(node, selector = all, recursive = all) {
    if (isElement(node)) {
        if (selector(node)) {
            yield node;
        }
    }

    if (node.childNodes) {
        for (const childNode of node.childNodes) {
            if (isElement(childNode) && recursive(childNode)) {
                yield* traverse(childNode, selector);
            }
        }
    }

    return null;
}

export function* traverseHighest(node, selector = all) {
    if (isElement(node) && selector(node)) {
        yield node;
    } else {
        if (node.childNodes) {
            for (const childNode of node.childNodes) {
                if (isElement(childNode)) {
                    yield* traverseHighest(childNode, selector);
                }
            }
        }
    }

    return null;
}

/**
 * @param {Node} node
 * @param {ElementCallbackFn} selector
 * @returns {Array<Element>}
 */
export function filter(node, selector = all) {
    return [...traverse(node, selector)];
}

/**
 * @param {Node} node
 * @param {ElementCallbackFn} selector
 * @returns {Element | null}
 */
export function find(node, selector = all) {
    return traverse(node, selector).next().value;
}

/**
 * @param {Node} node
 * @returns {node is Element}
 */
export function isElement(node) {
    return Boolean(node.tagName && node.childNodes);
}

export const ast = {
    getAttribute,
    getAttributeMap,
    hasAttribute,
    setAttribute,
    isCustomElement,
    traverse,
    filter,
    find,
    traverseHighest
};

export interface Node {
    tagName?: string;
    nodeName?: string;
    childNodes?: Array<Node>;
    attrs?: Array<Attribute>;
}

export interface Attribute {
    name: string;
    value: string;
}

export type ChildElement = ChildNode & Element;

export type nodeCallbackFn = (node: ChildNode) => boolean;
export type ElementCallbackFn = (element: Element) => boolean;
