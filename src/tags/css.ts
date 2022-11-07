import {CssTemplateResult} from './cssTemplateResult.js';

/**
 * @param {TemplateStringsArray} strings
 * @param {any[]} values
 * @returns {CssTemplateResult}
 */
export function css(strings, ...values) {
    const raw = String.raw({ raw: strings }, ...values);

    return new CssTemplateResult({raw});
}
