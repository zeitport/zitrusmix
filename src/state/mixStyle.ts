/**
 * @typedef {import('../../types/zitrusmix.js').ElementName} ElementName
 * @typedef {import('../tags/cssTemplateResult.js').CssTemplateResult} CssTemplateResult
 */


export const mixStyle = {
    /**
     * @type {Map<ElementName, CssTemplateResult>}
     */
    map: new Map(),

    /**
     * @type {string}
     */
    css: '',

    /**
     * @type {string}
     */
    sourceMap: ''
};
