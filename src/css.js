/**
 * @param {TemplateStringsArray} strings
 * @param {any[]} values
 * @returns {string}
 */
export function css(strings, ...values) {
    const raw = String.raw({ raw: strings }, ...values);

    return raw;
}
