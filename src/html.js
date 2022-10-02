/**
 * @typedef {import('./types/ast').Element} Element
 * @typedef {import('./types/ast').ChildElement} ChildElement
 * @typedef {import('./types/ast').Node} Node
 */

import * as parse5 from 'parse5';

import { getRender } from './state/elements.js';
import { TemplateResult } from './templateResult.js';
import { ast } from './utils/ast.js';

/**
 * @param {TemplateStringsArray} strings
 * @param {any[]} values
 * @returns {TemplateResult}
 */
export function html(strings, ...values) {
    const raw = String.raw({ raw: strings }, ...values);

    const fragment = parse5.parseFragment(raw);

    const hosts = /** @type {ChildElement[]} */(ast.filter(fragment, ast.isCustomElement));

    for (const host of hosts) {
        const renderElement = getRender(host.nodeName);

        if (renderElement) {
            const attributes = host.attrs || [];
            const attributeMap = Object.fromEntries(attributes.map(({ name, value }) => [name, value]));
            const elementResult = renderElement({ html, attrs: attributeMap, attributes });
            const elementFragment = elementResult.fragment;

            const slots = ast.filter(elementFragment, childNode => childNode.tagName === 'slot');
            const slotMap = createSlotMap(slots);
            const slottedChildElements = ast.filter(host, node => ast.hasAttribute(node, 'slot'));

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
                for (const element of host.childNodes) {
                    if (defaultSlot.parentNode) {
                        parse5.defaultTreeAdapter.insertBefore(defaultSlot.parentNode, element, defaultSlot);
                    }
                }
            }

            // Remove all slots
            slots.forEach(node => parse5.defaultTreeAdapter.detachNode(node));

            host.childNodes = elementFragment.childNodes;
            elementResult.text = parse5.serialize(elementFragment);
        }
    }

    return new TemplateResult({
        fragment: fragment,
        text: parse5.serialize(fragment)
    });
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
