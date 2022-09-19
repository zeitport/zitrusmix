
export const nodeTree = {
    traverse,
    filter
};

/**
 * @typedef {{tagName: string, nodeName: string, childNodes?: Array<Node>}} Node
 */

/**
 * @typedef {function(node: any): boolean} nodeCallbackFn
 */

/**
 * @type {nodeCallbackFn}
 */
const all = (_) => true;

/**
 * @param {Node} parentNode
 * @param {nodeCallbackFn} selector
 */
function* traverse(parentNode, selector = all) {
    for(const childNode of parentNode.childNodes) {
        if (selector(childNode)) {
            yield childNode;
        }

        if (childNode.childNodes) {
            yield* traverse(childNode, selector);
        }
    }
}

/**
 * @param {Node} parentNode
 * @param {nodeCallbackFn} selector
 * @returns {Array<Node>}
 */
function filter(parentNode, selector = all) {
    return [...traverse(parentNode, selector)];
}

