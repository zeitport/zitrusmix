import * as parse5 from 'parse5';
import {Element} from 'parse5/dist/tree-adapters/default.js';
import {log} from '../log.js';
import {elements} from '../state/elements.js';
import {ast} from '../utils/ast.js';
import {HtmlTemplateResult} from './htmlTemplateResult.js';
import {MixRenderContext} from './mixRenderContext.js';

export async function renderMixElement(mixElement: Element, renderContext: MixRenderContext): Promise<HtmlTemplateResult> {
    const ElementConstructor = elements.get(mixElement.nodeName);

    if (!ElementConstructor) {
        log.error('No render function found for "${node.nodeName}".');
        throw new Error('#TODO');
    }

    const element = new ElementConstructor();
    const attributes = mixElement.attrs || [];
    const attributeMap = Object.fromEntries(attributes.map(({name, value}) => [name, value]));

    for (const attributeName of Object.keys(attributeMap)) {
        const attribute = element.getAttribute(attributeName);

        if (attribute) {
            attribute.value = attributeMap[attributeName];
        } else {
            log.warn(`(ZM-4643) Attribute "${attributeName}" is not declared on element "${ElementConstructor.name}".`);
        }
    }

    // #TODO: map attributes
    const elementResult = await element.render(renderContext);
    const elementFragment = elementResult.fragment;

    // Use scoped class names
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
    const slottedChildElements = ast.filter(mixElement, node => ast.hasAttribute(node, 'slot'));

    // Move slotted child nodes to slots
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

    // Move other child nodes to unnamed slot
    const defaultSlot = slotMap.get(null);
    if (defaultSlot) {
        for (const element of mixElement.childNodes) {
            if (defaultSlot.parentNode) {
                parse5.defaultTreeAdapter.insertBefore(defaultSlot.parentNode, element, defaultSlot);
            }
        }
    }

    // Remove all slots
    slots.forEach(node => parse5.defaultTreeAdapter.detachNode(node));

    mixElement.childNodes = elementFragment.childNodes;
    elementResult.raw = parse5.serialize(elementFragment);

    return elementResult;
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
