/**
 * @typedef {import('../../types/ast').Element} Element
 * @typedef {import('../../types/ast').ChildElement} ChildElement
 * @typedef {import('../../types/ast').Node} Node
 */

import * as parse5 from 'parse5';
import { log } from '../log.js';
import { elements } from '../state/elements.js';

import { ast } from '../utils/ast.js';
import { html } from './html.js';

/**
 * @param {Element} node
 */
export function renderMixElement(node) {
    const ElementConstructor = elements.get(node.nodeName);

    if (ElementConstructor) {
        const element = new ElementConstructor();
        const attributes = node.attrs || [];
        const attributeMap = Object.fromEntries(attributes.map(({ name, value }) => [name, value]));
        const elementResult = element.render({ html, attrs: attributeMap, attributes});
        const elementFragment = elementResult.fragment;

        // Use scopeds class names
        if (ElementConstructor.styles) {
            const styledElements = ast.filter(elementFragment, node => ast.hasAttribute(node, 'class'));
            for (const node of styledElements) {
                const value = ast.getAttribute(node, 'class');
                const classNames = value?.split(' ') || [];
                const scopedClassNames = classNames.map(className => `${className}-${ElementConstructor.styles?.moduleId}`);
                ast.setAttribute(node, 'class', scopedClassNames.join(' '));
            }
        }

        // Detect slots
        const slots = ast.filter(elementFragment, childNode => childNode.tagName === 'slot');
        const slotMap = createSlotMap(slots);
        const slottedChildElements = ast.filter(node, node => ast.hasAttribute(node, 'slot'));

        // Move slotted childs to slots
        for (const element of slottedChildElements) {
            const slotName = ast.getAttribute(element, 'slot');

            if (slotName) {
                parse5.defaultTreeAdapter.detachNode(element);
                ast.setAttribute(element, 'slot', null);

                const slot = slotMap.get(slotName);

                if (slot) {
                    if (slot.parentNode) {
                        parse5.defaultTreeAdapter.insertBefore(slot.parentNode, element, slot);
                    }
                } else {
                    throw new Error(`No slot with name "${slotName}" found.`);
                }
            }
        }

        // Move other childs to unnamed slot
        const defaultSlot = slotMap.get(null);
        if (defaultSlot) {
            for (const element of node.childNodes) {
                if (defaultSlot.parentNode) {
                    parse5.defaultTreeAdapter.insertBefore(defaultSlot.parentNode, element, defaultSlot);
                }
            }
        }

        // Remove all slots
        slots.forEach(node => parse5.defaultTreeAdapter.detachNode(node));

        node.childNodes = elementFragment.childNodes;
        elementResult.text = parse5.serialize(elementFragment);
    } else {
        log.warn('No render function found for "${node.nodeName}".');
    }
}

/**
 * @param {Node[]} slots
 * @returns {Map<string | null, Element>}
 */
function createSlotMap(slots) {
    const slotMap = new Map();

    for (const slot of slots) {
        const name = ast.getAttribute(slot, 'name') || null;
        slotMap.set(name, slot);
    }

    return slotMap;
}
