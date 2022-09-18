
import * as parse5 from 'parse5';
import {MixElementAttribute} from '../mixElementAttribute.js';
import { HtmlTemplateResult } from './htmlTemplateResult.js';


export function html(strings: TemplateStringsArray, ...values: unknown[]): HtmlTemplateResult {
    // Replace non string values
    const resolvedValues = values.map(value => stringify(value));

    // Get the raw string of template literals
    const raw = String.raw({ raw: strings }, ...resolvedValues);

    // Create an abstract syntax tree (AST) fragment
    const fragment = parse5.parseFragment(raw);

    return new HtmlTemplateResult({raw, fragment});
}

// export function htmlOld(this: MixRenderContext | void, strings: TemplateStringsArray, ...values: unknown[]): HtmlTemplateResult {
//     const resolvedValues = values.map(value => stringify(value));
//
//     const raw = String.raw({ raw: strings }, ...resolvedValues);
//
//     const fragment = parse5.parseFragment(raw);
//     const mixElements = /** @type {ChildElement[]} */(ast.filter(fragment, ast.isCustomElement));
//
//     for (const element of mixElements) {
//         if (MixRenderContext.isContext(this)) {
//             renderMixElement(element, this);
//         } else {
//             throw new Error('(ZM-4175) Missing MixElementRenderContext');
//         }
//     }
//
//     return new HtmlTemplateResult({
//         fragment: fragment,
//         raw: parse5.serialize(fragment)
//     });
// }

function stringify(anything: unknown): string | undefined {
    let value;

    if (isString(anything)) {
        value = anything;
    } else if (isNumber(anything)) {
        value = anything.toString(10);
    } else if (isBoolean(anything)) {
        value = anything ? 'true' : 'false';
    } else if (isMixElementAttribute(anything)) {
        value = anything.value;
    }

    return value;
}

function isString(obj): obj is string {
    return typeof obj === 'string';
}

function isNumber(obj): obj is number {
    return typeof obj === 'number';
}

function isBoolean(obj): obj is boolean {
    return typeof obj === 'boolean';
}

function isMixElementAttribute(obj): obj is MixElementAttribute {
    return typeof obj === 'object' && obj.constructor.name === 'MixElementAttribute';
}

