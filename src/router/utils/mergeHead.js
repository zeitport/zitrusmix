import { ast } from '../../utils/ast.js';

/**
 * @typedef {import('../../types/ast').Node} Node
 * @typedef {import('../../types/ast').Document} Document
 * @typedef {import('../../types/ast').DocumentFragment} DocumentFragment
 */

/**
 * @param {Document} document
 * @param {DocumentFragment} fragment
 */
export function mergeHead(document, fragment) {
    const documentHead = ast.find(document, node => node.tagName === 'head');

    if (documentHead) {
        const documentHeadNodes = documentHead?.childNodes.filter(isTag);
        const fragementHeadNodes = fragment.childNodes.filter(isTag);

        const headNodeMap = new Map();

        for (const node of fragementHeadNodes) {
            headNodeMap.set(getReference(node), node);
        }

        for (const node of documentHeadNodes) {
            headNodeMap.set(getReference(node), node);
        }

        documentHead.childNodes = [...headNodeMap.values()];
    }
}

function isTag(node) {
    return Boolean(node.tagName);
}

/**
 * @param {Node} node
 * @returns {string | Node}
 */
function getReference(node) {
    /**
     * @type {string | Node}
     */
    let reference = node;

    if (node.tagName === 'title') {
        reference = node.tagName;
    } else if (node.tagName === 'meta') {
        const name = ast.getAttribute(node, 'name');
        reference = `${node.tagName}-${name}`;
    }

    return reference;
}
