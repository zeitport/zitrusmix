/**
 * @typedef {import('../../types/ast').Element} Element
 * @typedef {import('../../types/ast').ChildElement} ChildElement
 * @typedef {import('../../types/ast').Node} Node
 */

import * as parse5 from 'parse5';

import { HtmlTemplateResult } from './htmlTemplateResult.js';
import { ast } from '../utils/ast.js';
import { renderMixElement } from './renderMixElement.js';

/**
 * @param {TemplateStringsArray} strings
 * @param {any[]} values
 * @returns {HtmlTemplateResult}
 */
export function html(strings, ...values) {
    const raw = String.raw({ raw: strings }, ...values);

    const fragment = parse5.parseFragment(raw);
    const mixElements = /** @type {ChildElement[]} */(ast.filter(fragment, ast.isCustomElement));

    for (const element of mixElements) {
        renderMixElement(element);
    }

    return new HtmlTemplateResult({
        fragment: fragment,
        text: parse5.serialize(fragment)
    });
}


