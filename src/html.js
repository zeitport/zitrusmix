import { parseFragment, serialize, defaultTreeAdapter } from 'parse5';

import { elements } from './elements.js';
import { TemplateResult } from './templateResult.js';
import { isCustomElement } from './utils/isCustomElement.js';
import { nodeTree } from './utils/nodeTree.js';

/**
 * @typedef {import('parse5/dist/tree-adapters/default.js').Node} Node
 * @typedef {import('parse5/dist/common/token').Attribute} Attribute
 */

/**
 * @returns {TemplateResult}
 */
export function html(strings, ...values) {
    const raw = String.raw({ raw: strings }, ...values);

    const documentFragment = parseFragment(raw);

    const hosts = documentFragment.childNodes.filter(isCustomElement);

    for (const host of hosts) {
        const renderCustomElement = elements.get(host.nodeName);

        if (renderCustomElement) {
            const attributes = Object.fromEntries(host.attrs.map(({ name, value }) => [name, value]));
            const elementResult = renderCustomElement({ html, attrs: attributes, attributes });
            const elementFragment = elementResult.fragment;

            const slots = nodeTree.filter(elementFragment, childNode => childNode.tagName === 'slot');
            const slotMap = createSlotMap(slots);
            const slottedChildElements = nodeTree.filter(host, node => hasAttribute(node, 'slot'));

            // Move slotted childs to slots
            for (const element of slottedChildElements) {
                const slotName = getAttribute(element, 'slot');

                if (slotName) {
                    defaultTreeAdapter.detachNode(element);
                    setAttribute(element, 'slot', null);

                    const slot = slotMap.get(slotName);

                    if (slot) {
                        defaultTreeAdapter.insertBefore(slot.parentNode, element, slot);
                    } else {
                        throw new Error(`No slot with name "${slotName}" found.`);
                    }
                }
            }

            // Move other childs to unnamed slot
            const defaultSlot = slotMap.get(null);
            if (defaultSlot) {
                for(const element of host.childNodes) {
                    defaultTreeAdapter.insertBefore(defaultSlot.parentNode, element, defaultSlot);
                }
            }

            // Remove all slots
            slots.forEach(defaultTreeAdapter.detachNode);

            host.childNodes = elementFragment.childNodes;
            elementResult.text = serialize(elementFragment);
        }
    }

    return new TemplateResult({
        fragment: documentFragment,
        text: serialize(documentFragment)
    });
}

/**
 * @returns {Map<string | null, Node>}
 */
function createSlotMap(slots) {
    const slotMap = new Map();

    for (const slot of slots) {
        const name = getAttribute(slot, 'name') || null;
        slotMap.set(name, slot);
    }

    return slotMap;
}

/**
 * @param {Node} node
 * @param {string} attributeName
 * @param {string} expectedValue
 * @returns {string}
 */
function getAttribute(node, attributeName) {
    const attribute = node.attrs?.find(attr => attr.name === attributeName);

    return attribute?.value;
}

/**
 * @param {Node} node
 * @param {string} attributeName
 * @param {string} value
 */
function setAttribute(node, attributeName, value) {
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
 */
function hasAttribute(node, attributeName) {
    const attribute = node.attrs?.find(attr => attr.name === attributeName);

    return Boolean(attribute);
}
